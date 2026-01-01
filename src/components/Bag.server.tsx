import CartItemsServer from "./CartItems.server";
import BagSidebar from "./BagSidebar";

export default async function BagSidebarServer({
  open,
  userId,
}: {
  open: boolean;
  userId?: string | null;
}) {
  return (
    <CartItemsServer userId={userId}>
      {(items) => (
        <BagSidebar
          open={open}
          items={items}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </CartItemsServer>
  );
}
