"use client";
import React, { JSX, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NewestBanner = {
  id: string;
  name: string;
  imageUrl: string;
};

const products: NewestBanner[] = [
  {
    id: "1",
    name: "New summer gym shoes",
    imageUrl: "/shoes/shoe-1.jpg",
  },
  {
    id: "2",
    name: "free balance cyclic shoes",
    imageUrl: "/shoes/shoe-2.webp",
  },
];

export default function NewestBannerClient(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
        ease: "power1.inOut",
      });

      timeline.from("h3, h2, p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="newest"
      className="flex flex-col sm:flex-row w-full"
    >
      {products.map(({ id, name, imageUrl }) => (
        <div
          key={id}
          className="relative overflow-hidden min-w-full sm:min-w-[50%] h-160"
        >
          <Image
            src={imageUrl}
            alt={name}
            width={800}
            height={800}
            className="w-full h-160 object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          {/* Text */}
          <div className="absolute left-6 bottom-6 space-y-2 text-white">
            <h3 className="text-body font-semibold">New Arrivals</h3>
            <h2 className="text-heading-3 text-shadow-sm mb-4 capitalize">
              {name}
            </h2>
            <p className="text-sm font-bold bg-white text-black w-fit px-4 py-2 rounded-2xl hover:opacity-70 cursor-pointer">
              Shop Now
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
