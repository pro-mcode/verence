import { getCartItems } from "@/lib/actions/cart";
import BagSidebar from "./BagSidebar";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default async function CartItems(props: Props) {
  const items = await getCartItems();

  return (
    <>
      <BagSidebar {...props} items={items} />
      <h3>Cart</h3>
    </>
  );
}
