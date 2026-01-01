"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
};

const WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "1",
    name: "Air Motion Runner",
    price: "$120",
    image: "/shoes/shoe-1.jpg",
    href: "/product/air-motion-runner",
  },
  {
    id: "2",
    name: "Classic Hoodie",
    price: "$65",
    image: "/shoes/shoe-2.webp",
    href: "/product/classic-hoodie",
  },
];

export default function WishlistPage() {
  const hasItems = WISHLIST_ITEMS.length > 0;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Heart className="text-red-500" /> Wishlist
        </h1>
        {hasItems && (
          <p className="text-sm text-gray-600">
            {WISHLIST_ITEMS.length} item
            {WISHLIST_ITEMS.length > 1 && "s"}
          </p>
        )}
      </header>

      {/* Empty State */}
      {!hasItems && (
        <div className="text-center py-24">
          <Heart size={48} className="mx-auto mb-6 text-gray-300" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save items you love to keep track of them.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-dark-900
            text-white font-semibold hover:bg-dark-900/90"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Wishlist Grid */}
      {hasItems && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WISHLIST_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group border rounded-xl overflow-hidden
              hover:shadow-lg transition-shadow bg-white"
            >
              {/* Image */}
              <Link href={item.href} className="block relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link href={item.href}>
                  <h3 className="font-semibold text-dark-900 mb-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{item.price}</p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2
                    rounded-full bg-dark-900 text-white py-2 text-sm
                    font-semibold hover:bg-dark-900/90"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>

                  <button
                    aria-label="Remove from wishlist"
                    className="p-2 rounded-full border hover:bg-gray-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
