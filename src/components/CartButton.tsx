"use client";

import { ShoppingBag } from "lucide-react";
import { addItemToCart } from "@/lib/actions/cart";
import { Heart } from "lucide-react";

export function AddToCartButton({ variantId }: { variantId: string }) {
  return (
    <>
      <button
        className="flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
        onClick={async () => {
          await addItemToCart({
            productVariantId: variantId,
            quantity: 1,
          });
        }}
      >
        <ShoppingBag className="h-5 w-5" />
        Add to cart
      </button>
      {/* Favorite */}
      <button className="flex items-center justify-center gap-2 rounded-full border border-light-300 px-6 py-4 text-body-medium text-dark-900 transition hover:border-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]">
        <Heart className="h-5 w-5" />
        Favorite
      </button>
    </>
  );
}
