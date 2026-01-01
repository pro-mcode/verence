"use client";

import { useEffect, useRef, useState } from "react";
import { User, X } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";

type UserInfo = {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
};

export default function UserMenu({ user }: { user: UserInfo | null }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut(); // calls server action
      setOpen(false); // close modal
      router.refresh(); // re-fetch server components (Navbar, layout)
    } catch (err) {
      console.error("Sign out failed", err);
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open user menu"
        className="text-dark-900 transition-colors hover:text-dark-700"
      >
        <div className="rounded-full hover:bg-light-300 transition p-2">
          <User className="h-5 w-5" />
        </div>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6">
          <div
            ref={modalRef}
            className="w-full max-w-sm rounded-xl bg-light-100 shadow-xl ring-1 ring-light-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-light-300 px-5 py-4">
              <div className="flex flex-col">
                <span className="text-body-medium text-dark-900">
                  {user?.name ? user.name.slice(0, 25) : "Account"}
                  {user?.name && user.name.length > 25 ? "…" : ""}
                </span>
                {user?.email && (
                  <span className="text-caption text-dark-700">
                    {user.email.slice(0, 35)}
                    {user.email.length > 35 ? "…" : ""}
                  </span>
                )}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-dark-700 hover:text-dark-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col divide-y divide-light-300">
              <li>
                <Link
                  href="/account"
                  className="block px-5 py-4 text-body text-dark-900 hover:bg-light-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="block px-5 py-4 text-body text-dark-900 hover:bg-light-200"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href={"wishlists"}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 text-body text-dark-900 hover:bg-light-200"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="block px-5 py-4 text-body text-dark-900 hover:bg-light-200"
                >
                  Settings
                </Link>
              </li>
            </ul>

            {/* Footer */}
            <div className="border-t border-light-300 px-5 py-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-full bg-dark-900 py-3 text-body-medium text-light-100 transition hover:opacity-90"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href={"/sign-up"}
                    className="bg-gray-100 text-center text-dark-900 border border-dark-900 text-body-medium font-semibold block w-full rounded-full py-2.5 hover:bg-gray-200 transition-all duration-150 mb-3"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/sign-in"
                    className=" bg-dark-900 text-center text-body-medium font-semibold text-light-100 block w-full rounded-full py-3 transition-all duration-150 hover:opacity-90"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
