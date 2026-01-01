"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { NAV_LINKS } from "@/lib/constants";
import { ArrowRightIcon } from "lucide-react";
import { PANEL_DATA } from "@/lib/constants";
import { signOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";

// types
interface PanelCategory {
  featured?: string[];
  shoes?: string[];
  clothings?: string[];
  accessories?: string[];
  men?: string[];
  women?: string[];
  kids?: string[];
}

// Mapping nav item label → panel category

type ProductCategory = keyof PanelCategory;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MobileNavSidebar({ user }: any) {
  const [open, setOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(
    null
  );

  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Slide sidebar in/out
  useEffect(() => {
    if (!sidebarRef.current) return;

    if (open) {
      gsap.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: -300,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveNavItem(null);
      setActiveCategory(null);
    }
  }, [open]);

  // Animate content inside sidebar when category changes
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.children,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power3.out", stagger: 0.05 }
    );
  }, [activeNavItem, activeCategory]);

  return (
    <>
      {/* Hamburger button */}
      <button className="lg:hidden p-2" onClick={() => setOpen(true)}>
        <span className="sr-only">Open menu</span>
        <span className="h-0.5 w-6 bg-dark-900 mb-1 block"></span>
        <span className="h-0.5 w-6 bg-dark-900 mb-1 block"></span>
        <span className="h-0.5 w-6 bg-dark-900 block"></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 "
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform -translate-x-full overflow-y-auto"
      >
        {/* Logo & Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-300 h-16">
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className="text-lg font-bold text-black"
          >
            VERENCE
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-light-300 transition-colors"
          >
            <span className="sr-only">Close menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-dark-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* First level: nav items */}
          <>
            {!activeNavItem && (
              <>
                <ul className="space-y-6 py-6">
                  {NAV_LINKS.map((link) => {
                    const hasPanel = !!PANEL_DATA[link.label];
                    return (
                      <li key={link.label}>
                        {hasPanel ? (
                          <button
                            className="flex items-center justify-between w-full group text-lg font-bold
                     hover:text-gray-600 hover:tracking-wider transition-all duration-150"
                            onClick={() => setActiveNavItem(link.label)}
                            aria-expanded={activeNavItem === link.label}
                          >
                            <span>{link.label}</span>
                            <ArrowRightIcon
                              className="group-hover:text-gray-600 group-hover:translate-x-0.5
                       transition-all duration-150"
                            />
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between w-full text-lg font-bold
                     hover:text-gray-600 hover:tracking-wider transition-all duration-150"
                          >
                            <span>{link.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Only render this block at first level */}
                <h3 className="text-dark-700 text-body-large mb-3 mt-12">
                  Become a Verence Member for the best products, insights and
                  more.{" "}
                  <span className="text-dark-900 font-medium tracking-wide cursor-pointer">
                    Learn more
                  </span>
                </h3>
                <div className="flex flex-col gap-2 mt-6 w-full">
                  {user ? (
                    <Link
                      href={"sign-in"}
                      onClick={handleSignOut}
                      className="bg-dark-900 text-center text-body-medium font-semibold text-light-100 block w-full rounded-full py-3 transition-all duration-150 hover:opacity-90"
                    >
                      Sign Out
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={"/sign-up"}
                        className="bg-gray-100 text-center text-dark-900 border border-dark-900 text-body-medium font-semibold block w-full rounded-full py-2.5 hover:bg-gray-200 transition-all duration-150 mb-1"
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
                  {/* <Link
                    href={"/sign-up"}
                    className="bg-gray-100 text-center text-dark-900 border border-dark-900 text-body font-bold rounded-4xl py-3 px-4 hover:bg-gray-200 transition-all duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href={"/sign-in"}
                    className="bg-dark-900/95 text-center text-white text-body font-bold rounded-4xl py-3 px-4 hover:bg-dark-900/85 transition-all duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link> */}
                </div>
              </>
            )}
          </>

          {/* Second level: categories + featured items */}
          {activeNavItem && !activeCategory && (
            <div ref={contentRef}>
              <button
                className="mb-6 text-body font-semibold text-dark-900/70 hover:text-gray-500"
                onClick={() => setActiveNavItem(null)}
              >
                ← All
              </button>
              <Link
                onClick={() => setOpen(false)}
                href={NAV_LINKS.find((l) => l.label === activeNavItem)!.href}
                className="block text-lg font-semibold mb-6"
              >
                {activeNavItem}
              </Link>

              <ul className="space-y-6">
                {/* Featured items first */}
                {activeNavItem &&
                  PANEL_DATA[activeNavItem]?.featured?.map((item) => (
                    <li key={`featured-${item}`}>
                      <Link
                        href="/products"
                        className="text-body font-medium block text-dark-700 hover:text-dark-900"
                        onClick={() => setOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}

                {/* Other categories */}
                {Object.keys(PANEL_DATA[activeNavItem]!)
                  .filter((cat) => cat !== "featured")
                  .map((cat) => (
                    <li
                      key={cat}
                      onClick={() => setActiveCategory(cat as ProductCategory)}
                      className="group flex items-center justify-between"
                    >
                      <button className="w-full text-left font-medium text-dark-700 hover:text-dark-900 capitalize">
                        {cat}
                      </button>
                      <ArrowRightIcon className="text-dark-700 hover:text-dark-900 group-hover:translate-x-0.5 transition-all duration-150" />
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Third level: items */}
          {activeNavItem && activeCategory && (
            <div ref={contentRef}>
              <button
                className="mb-6 text-body-medium font-semibold text-dark-900/70 hover:text-gray-500"
                onClick={() => setActiveCategory(null)}
              >
                ← {activeNavItem}
              </button>
              <h4 className="text-lg font-semibold mb-6 capitalize">
                {activeCategory}
              </h4>
              <ul className="space-y-4">
                {(activeNavItem &&
                  activeCategory &&
                  PANEL_DATA[activeNavItem]?.[activeCategory]?.map((item) => (
                    <li key={item}>
                      <Link
                        href="/products"
                        className="text-body font-medium block text-dark-700 hover:text-dark-900"
                      >
                        {item}
                      </Link>
                    </li>
                  ))) ||
                  null}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
