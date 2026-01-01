"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Category = {
  title: string;
  image: string;
  subtitle?: string;
  href: string;
};

const categories: Category[] = [
  {
    title: "Men's Fashion",
    image: "/shoes/shoe-1.jpg",
    subtitle: "Shop Now",
    href: "/products?gender=men",
  },
  {
    title: "Women's Fashion",
    image: "/shoes/shoe-2.webp",
    subtitle: "Shop Now",
    href: "/products?gender=women",
  },
  {
    title: "Kids Fashion",
    image: "/shoes/shoe-3.webp",
    subtitle: "Shop Now",
    href: "/products?gender=unisex",
  },
];

const CategoryBanner: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* ----------------  Animation ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".category-item", {
        opacity: 0,
        yPercent: 20, // slide up from below
        duration: 1,
        ease: "expo.out",
        stagger: 0.15, // animate each item sequentially
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // animate only once
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  /* ---------------- Hover Animations ---------------- */
  const handleMouseEnter = (index: number) => {
    const title = titleRefs.current[index];
    const subtitle = subtitleRefs.current[index];

    if (title) {
      gsap.to(title, {
        y: -10,
        duration: 0.35,
        ease: "power1.out",
      });
    }

    if (subtitle) {
      gsap.set(subtitle, {
        display: "block",
        y: 20,
        opacity: 0,
        letterSpacing: "0.05em",
      });

      gsap.to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const title = titleRefs.current[index];
    const subtitle = subtitleRefs.current[index];

    if (title) {
      gsap.to(title, {
        y: 0,
        duration: 0.35,
        ease: "power1.in",
      });
    }

    if (subtitle) {
      gsap.to(subtitle, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(subtitle, { display: "none" });
        },
      });
    }
  };

  return (
    <section ref={sectionRef}>
      <div className="max-w-400 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="category-item relative overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <Image
                width={500}
                height={500}
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-101"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
                <h3
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className="text-2xl font-semibold mb-2"
                >
                  {item.title}
                </h3>

                {item.subtitle && (
                  <span
                    ref={(el) => {
                      subtitleRefs.current[index] = el;
                    }}
                    className="hidden text-main-100 text-body-medium font-bold border-b-2 border-b-main-100 pb-1 w-fit mx-auto tracking-wide opacity-0"
                  >
                    {item.subtitle}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
