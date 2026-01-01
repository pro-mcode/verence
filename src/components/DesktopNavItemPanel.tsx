"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { NAV_LINKS, PANEL_DATA } from "@/lib/constants";

type SaleGroup = "men" | "women" | "kids";

export default function DesktopNavItemPanel() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ---------------- OPEN / CLOSE ---------------- */

  const openPanel = (label: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setHoveredItem(label);
  };

  const closePanel = () => {
    closeTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 120);
  };

  /* ---------------- GSAP ---------------- */

  useEffect(() => {
    if (!panelRef.current) return;

    if (hoveredItem) {
      gsap.killTweensOf(panelRef.current);
      gsap.fromTo(
        panelRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power3.out" }
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.15,
          }
        );
      }
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power3.in",
      });
    }
  }, [hoveredItem]);

  return (
    <nav className="">
      {/* NAV LINKS */}
      <ul className="hidden lg:flex items-center gap-6 px-6 py-4 ml-28">
        {NAV_LINKS.map((link) => {
          const hasPanel = !!PANEL_DATA[link.label];

          return (
            <li
              key={link.label}
              tabIndex={0}
              className="relative"
              onMouseEnter={() => hasPanel && openPanel(link.label)}
              onFocus={() => hasPanel && openPanel(link.label)}
              onMouseLeave={closePanel}
              onBlur={closePanel}
            >
              <Link
                href={link.href}
                className="text-body font-bold text-dark-900 pb-1
                hover:border-b-2 hover:border-dark-900 tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Overlay */}
      {hoveredItem && (
        <div className="fixed inset-x-0 top-26 bottom-0 bg-black/40" />
      )}

      {/* PANEL */}
      <div
        ref={panelRef}
        tabIndex={-1}
        onMouseEnter={() => hoveredItem && openPanel(hoveredItem)}
        onFocus={() => hoveredItem && openPanel(hoveredItem)}
        onMouseLeave={closePanel}
        onBlur={closePanel}
        className="absolute left-0 right-0 top-full z-40 py-8 bg-white w-screen shadow-xl"
        style={{ height: 0, opacity: 0 }}
      >
        {hoveredItem && PANEL_DATA[hoveredItem] && (
          <div
            ref={contentRef}
            className="max-w-5xl mx-auto grid grid-cols-4 gap-6 p-6"
          >
            {/* Featured */}
            {PANEL_DATA[hoveredItem].featured && (
              <Section title="New & Featured">
                {PANEL_DATA[hoveredItem].featured!.map((item) => (
                  <NavItem key={item} label={item} />
                ))}
              </Section>
            )}

            {/* Shoes */}
            {PANEL_DATA[hoveredItem].shoes && (
              <Section title="Shoes">
                {PANEL_DATA[hoveredItem].shoes!.map((item) => (
                  <NavItem key={item} label={item} />
                ))}
              </Section>
            )}

            {/* Clothings */}
            {PANEL_DATA[hoveredItem].clothings && (
              <Section title="Clothings">
                {PANEL_DATA[hoveredItem].clothings!.map((item) => (
                  <NavItem key={item} label={item} />
                ))}
              </Section>
            )}

            {/* Accessories */}
            {PANEL_DATA[hoveredItem].accessories && (
              <Section title="Accessories">
                {PANEL_DATA[hoveredItem].accessories!.map((item) => (
                  <NavItem key={item} label={item} />
                ))}
              </Section>
            )}

            {/* Sale */}
            {hoveredItem === "Sale" &&
              (["men", "women", "kids"] as SaleGroup[]).map((group) => (
                <Section key={group} title={group}>
                  {(PANEL_DATA.Sale[group] ?? []).map((item) => (
                    <NavItem key={item} label={item} />
                  ))}
                </Section>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/* ---------------- SMALL HELPERS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3 capitalize">{title}</h4>
      <ul className="space-y-2 text-xs font-semibold text-gray-600">
        {children}
      </ul>
    </div>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <li>
      <Link
        href={`/products?category=${label.toLowerCase()}`}
        className="hover:text-dark-900"
      >
        {label}
      </Link>
    </li>
  );
}
