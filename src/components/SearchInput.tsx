"use client";

import { useState } from "react";
import { LucideSearch } from "lucide-react";
import Link from "next/link";

export default function SearchInput({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="peer inset-0 block w-full rounded-full border border-gray-300 bg-white px-4 py-3 pr-12 text-body text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-black/90 transition-all z-20"
      />

      {/* Floating label */}
      <label
        className={`absolute left-4 z-10   text-body pointer-events-none transition-all duration-200
          ${
            focused || value
              ? "text-xs bg-white rounded-2xl px-1 bottom-11 text-dark-900"
              : "text-body top-1/2 -translate-y-1/2 text-gray-400"
          }
        `}
      >
        Search products...
      </label>

      {/* Search button */}
      <Link
        href={"wishlists"}
        type="submit"
        onClick={handleClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <LucideSearch className="w-5 h-5 text-gray-500" />
      </Link>
    </div>
  );
}
