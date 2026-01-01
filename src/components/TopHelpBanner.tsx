"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { HELP_LISTS } from "@/lib/constants";

export default function TopHelpBanner() {
  const [hoveredItem, setHoveredItem] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Animate panel and content
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
            ease: "power3.out",
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

  const openPanel = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setHoveredItem(true);
  };

  const closePanel = () => {
    closeTimeout.current = setTimeout(() => {
      setHoveredItem(false);
    }, 120); // 👈 grace period (key!)
  };

  return (
    <nav className="relative">
      {/* Help trigger */}
      <p
        tabIndex={0}
        onMouseEnter={openPanel}
        onFocus={openPanel}
        onMouseLeave={closePanel}
        onBlur={closePanel}
        className="text-xs font-semibold text-dark-900 hover:text-gray-500
    border-r-[1.3px] border-r-dark-900 px-4 cursor-pointer transition-all duration-300"
      >
        Help
      </p>
      {/* Hover Panel */}
      {hoveredItem && (
        <div
          ref={panelRef}
          tabIndex={-1}
          onMouseEnter={openPanel}
          onFocus={openPanel}
          onMouseLeave={closePanel}
          onBlur={closePanel}
          className="absolute right-0 top-7 p-4 bg-white w-70 shadow-xl z-60"
        >
          <div ref={contentRef}>
            <h3 className="text-heading-4 mb-4">Help</h3>
            <ul className="space-y-3 text-xs font-semibold text-gray-600">
              {HELP_LISTS.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-dark-900">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
