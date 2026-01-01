// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { db } from "@/lib/db";
// import { carts, cartItems } from "@/lib/db/schema/carts";
// import { eq } from "drizzle-orm";
// import { guestSession } from "@/lib/auth/actions";
// import { v4 as uuidv4 } from "uuid";

// export type BagItem = {
//   id: string;
//   productVariantId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   size?: string;
//   color?: string;
//   imageUrl?: string;
// };

// type BagContextType = {
//   items: BagItem[];
//   open: boolean;
//   toggleOpen: () => void;
//   addItem: (item: Omit<BagItem, "id">) => Promise<void>;
//   removeItem: (id: string) => Promise<void>;
//   clear: () => Promise<void>;
// };

// const BagContext = createContext<BagContextType | undefined>(undefined);

// export function BagProvider({ children }: { children: React.ReactNode }) {
//   const [items, setItems] = useState<BagItem[]>([]);
//   const [open, setOpen] = useState(false);
//   const [cartId, setCartId] = useState<string | null>(null);

//   const toggleOpen = () => setOpen((prev) => !prev);

//   useEffect(() => {
//     (async () => {
//       // 1️⃣ Get guest session
//       const guest = await guestSession();
//       if (!guest.sessionToken) return;

//       let sessionCartId = cartId;

//       if (!sessionCartId) {
//         // Try to find existing cart for this guest
//         const existingCart = await db.query.carts.findFirst({
//           where: eq(carts.guestId, guest.sessionToken),
//         });

//         if (existingCart) {
//           sessionCartId = existingCart.id;
//         } else {
//           // Create new cart
//           const newCartId = uuidv4();
//           await db.insert(carts).values({
//             id: newCartId,
//             guestId: guest.sessionToken,
//           });
//           sessionCartId = newCartId;
//         }

//         setCartId(sessionCartId);
//       }

//       // 2️⃣ Load items
//       if (sessionCartId) {
//         const dbItems = await db.query.cartItems.findMany({
//           where: eq(cartItems.cartId, sessionCartId),
//         });

//         setItems(
//           dbItems.map((i) => ({
//             id: i.id,
//             productVariantId: i.productVariantId,
//             quantity: i.quantity,
//             name: "", // optionally fetch product name
//             price: 0, // optionally fetch price
//           }))
//         );
//       }
//     })();
//   }, [cartId]);
//   const addItem = async (item: Omit<BagItem, "id">) => {
//     if (!cartId) return;

//     // Check if variant exists in cart
//     const existing = await db.query.cartItems.findFirst({
//       where: eq(cartItems.productVariantId, item.productVariantId),
//     });

//     if (existing) {
//       // Update quantity
//       await db
//         .update(cartItems)
//         .set({ quantity: existing.quantity + item.quantity })
//         .where(eq(cartItems.id, existing.id));
//     } else {
//       // Insert new
//       await db.insert(cartItems).values({
//         id: uuidv4(),
//         cartId,
//         productVariantId: item.productVariantId,
//         quantity: item.quantity,
//       });
//     }

//     setItems((prev) => [...prev, { ...item, id: existing?.id ?? uuidv4() }]);
//   };

//   const removeItem = async (id: string) => {
//     if (!cartId) return;

//     await db.delete(cartItems).where(eq(cartItems.id, id));
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const clear = async () => {
//     if (!cartId) return;

//     await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
//     setItems([]);
//   };

//   return (
//     <BagContext.Provider
//       value={{ items, open, toggleOpen, addItem, removeItem, clear }}
//     >
//       {children}
//     </BagContext.Provider>
//   );
// }

// export function useBag() {
//   const context = useContext(BagContext);
//   if (!context) throw new Error("useBag must be used within BagProvider");
//   return context;
// }
