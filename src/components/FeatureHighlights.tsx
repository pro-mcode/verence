"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FC } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Types ---------------- */
interface FeatureItem {
  image: string;
  title: string;
  subtitle: string;
}

/* ---------------- Data ---------------- */
const features: FeatureItem[] = [
  {
    image: "/free-delivery.svg",
    title: "Fast & Free Delivery",
    subtitle: "Free delivery on all orders",
  },
  {
    image: "/secure-payment.svg",
    title: "Secure Payment",
    subtitle: "Free delivery on all orders",
  },
  {
    image: "/money-back.svg",
    title: "Money Back Guarantee",
    subtitle: "Free delivery on all orders",
  },
  {
    image: "/online-support.svg",
    title: "Online Support",
    subtitle: "Free delivery on all orders",
  },
];

/* ---------------- Component ---------------- */
const FeatureHighlights: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 px-6">
        {features.map(({ image, title, subtitle }, index) => (
          <div
            key={index}
            className="feature-item text-center flex flex-col justify-center items-center gap-4 lg:border-r border-gray-300 lg:last:border-r-0"
          >
            <Image
              src={image}
              alt={title}
              width={40}
              height={40}
              className="w-10 h-10"
            />

            <div>
              <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureHighlights;
