"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X, Heart } from "lucide-react";

type WishlistItem = {
  id: string;
  name: string;
  price?: string;
};

interface WishlistPanelProps {
  open: boolean;
  onClose: () => void;
  items?: WishlistItem[];
}

export default function WishlistPanel({
  open,
  onClose,
  items = [],
}: WishlistPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- GSAP ---------------- */

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        pointerEvents: "auto",
      });

      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        pointerEvents: "none",
      });
    }
  }, [open]);

  /* ---------------- ESC CLOSE ---------------- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-100 opacity-0 pointer-events-none"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        className="fixed top-0 right-0 h-full w-95 max-w-full
        bg-white z-110 shadow-2xl translate-x-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Heart size={18} /> Wishlist
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Heart className="mx-auto mb-4" />
              <p className="font-medium">Your wishlist is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <span className="font-medium">{item.name}</span>
                  {item.price && (
                    <span className="text-sm text-gray-600">{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Link
            href={"wishlists"}
            onClick={onClose}
            className="block text-center bg-dark-900 text-white
            rounded-full py-3 font-semibold hover:bg-dark-900/90"
          >
            View Full Wishlist
          </Link>
        </div>
      </aside>
    </>
  );
}
