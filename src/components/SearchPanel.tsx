"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { LucideX, Search } from "lucide-react";
import { useIsMobile } from "@/lib/utils/isMobile";
import SearchInput from "./SearchInput";

type SearchPanelProps = object;

const popularSearches: string[] = [
  "Men's Shoes",
  "Women's Fashion",
  "Summer Collection",
  "Accessories",
  "Trending Styles",
];

export const SearchPanel: React.FC<SearchPanelProps> = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /* ---------------- Close handler ---------------- */
  const handleClick = () => {
    setIsSearchOpen(false);
  };

  /* ---------------- GSAP Slide In/Out ---------------- */
  useEffect(() => {
    if (!panelRef.current) return;

    if (isSearchOpen) {
      gsap.to(panelRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(panelRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [isSearchOpen]);

  return (
    <nav>
      {/* Search Trigger */}
      {isMobile ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-full hover:bg-light-300 hover:text-dark-700 transition p-2"
          aria-label="Open Search"
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-light-300 px-3 py-1.5 w-28 mr-1"
          aria-label="Open Search"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm font-medium text-gray-500">Search</span>
        </button>
      )}

      {/* Search Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-50 w-full md:w-full h-full md:h-auto md:pb-10 bg-white shadow-lg transform translate-x-full opacity-0"
      >
        {/* Header */}
        <div className="px-6 border-b h-16 pt-3.5">
          <div className="flex justify-between items-center mx-auto max-w-7xl lg:px-8">
            <h3 className="text-lg font-bold text-black">VERENCE</h3>
            <button
              onClick={handleClick}
              className="p-2 rounded-md hover:bg-gray-200 transition"
              aria-label="Close Search"
            >
              <LucideX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-3xl mx-auto">
          {/* Search Input */}
          <SearchInput handleClick={handleClick} />

          {/* Popular Searches */}
          <div className="mt-6">
            <h3 className="text-gray-500 mb-3 font-medium">Popular Searches</h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
