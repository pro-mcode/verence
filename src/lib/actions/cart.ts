"use server";

import { db } from "@/lib/db";
import { carts, cartItems } from "@/lib/db/schema/carts";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { guestSession } from "@/lib/auth/actions";
import { guests } from "../db/schema";

/* ---------------- TYPES ---------------- */

export type CartItemInput = {
  productVariantId: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  productVariantId: string;
  quantity: number;
};

export type Cart = {
  id: string;
  userId?: string | null;
  guestId?: string | null;
  items: CartItem[];
};

/* ---------------- HELPERS ---------------- */

async function findGuestCart(guestId: string) {
  return db.query.carts.findFirst({
    where: eq(carts.guestId, guestId),
  });
}

async function findUserCart(userId: string) {
  return db.query.carts.findFirst({
    where: eq(carts.userId, userId),
  });
}

/* ---------------- GET OR CREATE ---------------- */
export async function getOrCreateCart(userId?: string | null): Promise<Cart> {
  const guest = await guestSession();

  // 1️⃣ Find existing cart
  let cart = userId
    ? await db.query.carts.findFirst({ where: eq(carts.userId, userId) })
    : guest.sessionToken
    ? await db.query.carts.findFirst({
        where: eq(carts.guestId, guest.sessionToken),
      })
    : null;

  let validGuestId: string | null = null;

  // 2️⃣ Ensure guest exists if using guest session
  if (!userId && guest.sessionToken) {
    validGuestId = guest.sessionToken;

    const existingGuest = await db.query.guests.findFirst({
      where: eq(guests.id, validGuestId),
    });

    if (!existingGuest) {
      const now = new Date();
      try {
        await db.insert(guests).values({
          id: validGuestId,
          sessionToken: validGuestId,
          createdAt: now,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ignore duplicate key errors (in case two requests happen at the same time)
        if (!err.message.includes("duplicate key")) throw err;
      }
    }
  }

  // 3️⃣ Create cart if none exists
  if (!cart) {
    const id = uuidv4();
    const now = new Date();

    const newCartData = {
      id,
      userId: userId ?? null,
      guestId: validGuestId,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(carts).values(newCartData);
    cart = newCartData;
  }

  // 4️⃣ Fetch cart items
  const items = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, cart.id),
  });

  return {
    id: cart.id,
    userId: cart.userId,
    guestId: cart.guestId,
    items: items.map((i) => ({
      id: i.id,
      productVariantId: i.productVariantId,
      quantity: i.quantity,
    })),
  };
}

/* ---------------- MERGE GUEST → USER CART ---------------- */

export async function mergeGuestCartToUser(userId: string) {
  const guest = await guestSession();
  if (!guest.sessionToken) return;

  const guestCart = await findGuestCart(guest.sessionToken);
  if (!guestCart) return;

  const userCart = await findUserCart(userId);

  if (!userCart) {
    await db
      .update(carts)
      .set({ userId, guestId: null })
      .where(eq(carts.id, guestCart.id));
    return;
  }

  const guestItems = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, guestCart.id),
  });

  await db.transaction(async (tx) => {
    for (const item of guestItems) {
      const existing = await tx.query.cartItems.findFirst({
        where: and(
          eq(cartItems.cartId, userCart.id),
          eq(cartItems.productVariantId, item.productVariantId)
        ),
      });

      if (existing) {
        await tx
          .update(cartItems)
          .set({ quantity: existing.quantity + item.quantity })
          .where(eq(cartItems.id, existing.id));
      } else {
        await tx.insert(cartItems).values({
          id: uuidv4(),
          cartId: userCart.id,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        });
      }
    }

    await tx.delete(cartItems).where(eq(cartItems.cartId, guestCart.id));
    await tx.delete(carts).where(eq(carts.id, guestCart.id));
  });
}

/* ---------------- ADD ITEM ---------------- */

export async function addItemToCart(
  input: { productVariantId: string; quantity: number },
  userId?: string | null
) {
  if (!input.productVariantId) {
    throw new Error("productVariantId is required and must be a valid UUID");
  }

  const cart = await getOrCreateCart(userId);

  const existing = await db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productVariantId, input.productVariantId)
    ),
  });

  if (existing) {
    await db
      .update(cartItems)
      .set({ quantity: existing.quantity + input.quantity })
      .where(eq(cartItems.id, existing.id));
  } else {
    await db.insert(cartItems).values({
      id: uuidv4(),
      cartId: cart.id,
      productVariantId: input.productVariantId,
      quantity: input.quantity,
    });
  }
}

/* ---------------- REMOVE ITEM ---------------- */

export async function removeItemFromCart(itemId: string) {
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
}

/* ---------------- CLEAR CART ---------------- */

export async function clearCart(userId?: string | null) {
  const cart = await getOrCreateCart(userId);
  await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));
}

/* ---------------- GET ITEMS ---------------- */
export async function getCartItems(userId?: string | null) {
  const guest = await guestSession();

  // 1️⃣ Find cart WITHOUT creating a new one
  const cart = userId
    ? await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
      })
    : guest.sessionToken
    ? await db.query.carts.findFirst({
        where: eq(carts.guestId, guest.sessionToken),
      })
    : null;

  if (!cart) return [];

  // 2️⃣ Fetch items with relations
  const items = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, cart.id),
    with: {
      variant: {
        with: {
          color: true,
          size: true,
          images: true,
        },
      },
    },
  });

  // 3️⃣ Normalize data for UI
  return items.map((item) => ({
    id: item.id,
    productVariantId: item.productVariantId,
    quantity: item.quantity,
    price: Number(item.variant?.price ?? 0),
    imageUrl: item.variant?.images?.[0]?.url ?? "/placeholder.png",
    color: item.variant?.color?.name ?? null,
    size: item.variant?.size?.name ?? null,
  }));
}
