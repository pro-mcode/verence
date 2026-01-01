// "use client";

// import { useEffect, useState, useTransition } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { X } from "lucide-react";

// import { getCartItems, removeItemFromCart } from "@/lib/actions/cart";

// type BagSidebarProps = {
//   open: boolean;
//   onClose: () => void;
// };

// type CartItem = {
//   id: string;
//   productVariantId: string;
//   quantity: number;
//   name?: string;
//   price?: number;
//   imageUrl?: string;
//   size?: string;
//   color?: string;
// };

// export default function BagSidebar({ open, onClose }: BagSidebarProps) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isPending, startTransition] = useTransition();

//   // Load cart items
//   useEffect(() => {
//     if (!open) return;

//     startTransition(async () => {
//       const data = await getCartItems();
//       setItems(data);
//     });
//   }, [open]);

//   const total = items.reduce(
//     (acc, item) => acc + (item.price ?? 0) * item.quantity,
//     0
//   );

//   async function handleRemove(itemId: string) {
//     startTransition(async () => {
//       await removeItemFromCart(itemId);
//       setItems((prev) => prev.filter((i) => i.id !== itemId));
//     });
//   }

// return (
//   <div
//     className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-light-100 shadow-xl transition-transform duration-300 ${
//       open ? "translate-x-0" : "translate-x-full"
//     }`}
//   >
//     {/* Header */}
//     <div className="flex items-center justify-between border-b border-light-300 p-4">
//       <h2 className="text-heading-3 text-dark-900">Your Bag</h2>
//       <button
//         onClick={onClose}
//         className="p-1 text-dark-700 hover:text-dark-900"
//       >
//         <X className="h-5 w-5" />
//       </button>
//     </div>

//     {/* Items */}
//     <div className="flex-1 overflow-y-auto p-4">
//       {items.length === 0 ? (
//         <p className="text-body text-dark-700">Your cart is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {items.map((item) => (
//             <li
//               key={item.id}
//               className="flex gap-4 border-b border-light-300 pb-4"
//             >
//               <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-light-200">
//                 <Image
//                   src={item.imageUrl ?? "/placeholder.png"}
//                   alt={item.name ?? "Product"}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-body-medium text-dark-900">
//                   {item.name ?? "Product"}
//                 </h3>

//                 {item.size && (
//                   <p className="text-caption text-dark-700">
//                     Size: {item.size}
//                   </p>
//                 )}

//                 {item.color && (
//                   <p className="text-caption text-dark-700">
//                     Color: {item.color}
//                   </p>
//                 )}

//                 <p className="text-body text-dark-900">
//                   ${(item.price ?? 0).toFixed(2)}
//                 </p>

//                 <p className="text-caption text-dark-700">
//                   Qty: {item.quantity}
//                 </p>
//               </div>

//               <button
//                 disabled={isPending}
//                 onClick={() => handleRemove(item.id)}
//                 className="text-caption text-dark-700 hover:text-dark-900"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>

//     {/* Checkout */}
//     {items.length > 0 && (
//       <div className="border-t border-light-300 p-4">
//         <p className="mb-4 text-body-medium text-dark-900">
//           Total: ${total.toFixed(2)}
//         </p>

//         <Link
//           href="/checkout"
//           onClick={onClose}
//           className="block w-full rounded-full bg-dark-900 py-3 text-center text-body-medium text-light-100 transition hover:opacity-90"
//         >
//           Checkout
//         </Link>
//       </div>
//     )}
//   </div>
// );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { removeItemFromCart } from "@/lib/actions/cart";
import { useTransition } from "react";

type CartItem = {
  id: string;
  quantity: number;
  price: number;
  imageUrl: string;
  size: string | null;
  color: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
};

export default function BagSidebar({ open, onClose, items }: Props) {
  const [isPending, startTransition] = useTransition();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  console.log(items.length);

  function handleRemove(id: string) {
    startTransition(async () => {
      await removeItemFromCart(id);
    });
  }

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-light-100 shadow-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-light-300 p-4">
        <h2 className="text-heading-3 text-dark-900">Your Bag</h2>
        <button
          onClick={onClose}
          className="p-1 text-dark-700 hover:text-dark-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-body text-dark-700">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 border-b border-light-300 pb-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-light-200">
                  <Image
                    src={item.imageUrl ?? "/placeholder.png"}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-body-medium text-dark-900">
                    {/* {item.name ?? "Product"} */}
                    Product
                  </h3>

                  {item.size && (
                    <p className="text-caption text-dark-700">
                      Size: {item.size}
                    </p>
                  )}

                  {item.color && (
                    <p className="text-caption text-dark-700">
                      Color: {item.color}
                    </p>
                  )}

                  <p className="text-body text-dark-900">
                    ${(item.price ?? 0).toFixed(2)}
                  </p>

                  <p className="text-caption text-dark-700">
                    Qty: {item.quantity}
                  </p>
                </div>

                <button
                  disabled={isPending}
                  onClick={() => handleRemove(item.id)}
                  className="text-caption text-dark-700 hover:text-dark-900"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Checkout */}
      {items.length > 0 && (
        <div className="border-t border-light-300 p-4">
          <p className="mb-4 text-body-medium text-dark-900">
            Total: ${total.toFixed(2)}
          </p>

          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full rounded-full bg-dark-900 py-3 text-center text-body-medium text-light-100 transition hover:opacity-90"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
