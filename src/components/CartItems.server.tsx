// components/cart/CartItems.server.tsx
import { getCartItems } from "@/lib/actions/cart";
import { JSX } from "react";

export default async function CartItemsServer({
  userId,
  children,
}: {
  userId?: string | null;
  children: (items: Awaited<ReturnType<typeof getCartItems>>) => JSX.Element;
}) {
  const items = await getCartItems(userId);
  return children(items);
}
