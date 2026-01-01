"use client";
import { useState } from "react";
import TopHelpBanner from "./TopHelpBanner";
import Link from "next/link";
import WishlistPanel from "./WishlistPanel";

const TopBanner = () => {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  return (
    <div className="relative hidden bg-light-200 md:flex items-center justify-end h-10 pr-6">
      <Link
        href={"find-a-store"}
        className="text-xs font-semibold text-dark-900 hover:text-gray-500 border-r-[1.3px] border-r-dark-900 px-4 transition-all duration-300 cursor-pointer"
      >
        Find a store
      </Link>
      <TopHelpBanner />
      <p
        onClick={() => setWishlistOpen(true)}
        className="text-xs font-semibold text-dark-900 hover:text-gray-500 border-r-[1.3px] border-r-dark-900 px-4 transition-all duration-300 cursor-pointer"
      >
        Wishlists
      </p>
      <WishlistPanel
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={[
          { id: "1", name: "Running Shoes", price: "$120" },
          { id: "2", name: "Hoodie", price: "$65" },
        ]}
      />
      <Link
        href={"sign-in"}
        className="text-xs font-semibold text-dark-900 hover:text-gray-500 px-4 transition-all duration-300 cursor-pointer"
      >
        Sign In
      </Link>
    </div>
  );
};

export default TopBanner;
