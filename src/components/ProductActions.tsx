// "use client";

// import { ShoppingBag, Heart } from "lucide-react";
// import { useState } from "react";
// import { useBag } from "@/lib/context/bag";

// type Props = {
//   product: {
//     id: string;
//     name: string;
//   };
//   displayPrice: number;
//   galleryImage: string;
//   variantIndex: number;
// };

// export default function ProductActions({
//   product,
//   displayPrice,
//   galleryImage,
//   variantIndex,
// }: Props) {
//   const { addItem } = useBag();
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   return (
//     <div className="flex flex-col gap-3">
//       <button
//         onClick={() => {
//           //   if (!selectedSize) {
//           //     alert("Please select a size");
//           //     return;
//           //   }
//           addItem({
//             id: product.id,
//             name: product.name,
//             price: displayPrice,
//             quantity: 1,
//             size: selectedSize,
//             color: selectedColor ?? undefined,
//             imageUrl: galleryImage,
//           });
//         }}
//         className="flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
//       >
//         <ShoppingBag className="h-5 w-5" />
//         Add to Bag
//       </button>
//       <button className="flex items-center justify-center gap-2 rounded-full border border-light-300 px-6 py-4 text-body-medium text-dark-900 transition hover:border-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]">
//         <Heart className="h-5 w-5" />
//         Favorite
//       </button>
//     </div>
//   );
// }

// import { useBag } from "@/lib/context/bag";

// const { addItem } = useBag();

// <button
//   onClick={() => addItem({ productVariantId: selectedVariantId, quantity: 1 })}
// >
//   Add to Bag
// </button>;

"use client";

import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { useBag } from "@/lib/context/bag";

type Props = {
  product: {
    id: string;
    name: string;
  };
  displayPrice: number;
  galleryImage: string;
  variantId: string;
};

export default function ProductActions({
  product,
  displayPrice,
  galleryImage,
  variantId,
}: Props) {
  const { addItem } = useBag();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Add to Bag */}
      <button
        onClick={async () => {
          //   if (!selectedSize) {
          //     alert("Please select a size");
          //     return;
          //   }

          await addItem({
            productVariantId: variantId,
            quantity: 1,
            // optional fields for sidebar display
            name: product.name,
            imageUrl: galleryImage,
            size: selectedSize,
            color: selectedColor ?? undefined,
            price: displayPrice,
          });
        }}
        className="flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
      >
        <ShoppingBag className="h-5 w-5" />
        Add to Bag
      </button>

      {/* Favorite */}
      <button className="flex items-center justify-center gap-2 rounded-full border border-light-300 px-6 py-4 text-body-medium text-dark-900 transition hover:border-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]">
        <Heart className="h-5 w-5" />
        Favorite
      </button>
    </div>
  );
}
