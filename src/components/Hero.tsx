"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSX, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type HeroSlide = {
  id: number;
  bg: string;
  reverse?: boolean;
  image: string;
  tag: string;
  title: string;
  description: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    bg: "bg-[#e9f6f6]",
    image: "/feature.png",
    tag: "Fashion Sale",
    title: "Minimal Men's Style",
    description:
      "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.",
  },
  {
    id: 2,
    bg: "bg-[#e5e9fd]",
    reverse: true,
    image: "/feature.png",
    tag: "Fashion Sale",
    title: "Minimal Women's Style",
    description:
      "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.",
  },
];

export default function HeroCarousel(): JSX.Element {
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    heroSlides.forEach((slide, i) => {
      const content = contentRefs.current[i];
      const image = imageRefs.current[i];

      if (content && image) {
        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.out" },
        });

        // Animate content first
        tl.from(content, {
          x: slide.reverse ? -100 : 100,
          opacity: 0,
        })
          // Animate image slightly overlapping
          .from(
            image,
            {
              x: slide.reverse ? 100 : -100,
              opacity: 0,
            },
            "-=0.8" // start 0.8s before content animation ends for smooth overlap
          );
      }
    });
  }, []);

  return (
    <section className="relative">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        {/* Left Arrow */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20 border-0 shadow-sm bg-black/40 hover:bg-black/90 text-white hover:text-white rounded-none h-24 p-5 transition duration-150">
          <span className="text-5xl">‹</span>
        </CarouselPrevious>

        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div
                className={`h-screen max-h-175 py-12 flex items-center ${slide.bg}`}
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    {/* Image */}
                    <div
                      ref={(el) => {
                        if (el) imageRefs.current[index] = el;
                      }}
                      className={`flex justify-center ${
                        slide.reverse ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        width={500}
                        height={500}
                        src={slide.image}
                        alt="Fashion Model"
                        className="max-w-md w-full rounded-md object-cover"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div
                      ref={(el) => {
                        if (el) contentRefs.current[index] = el;
                      }}
                      className={`text-center md:text-left max-w-lg ${
                        slide.reverse ? "md:order-1" : ""
                      }`}
                    >
                      <span className="block text-red-500 font-[cursive] font-light text-heading-2 mb-3">
                        {slide.tag}
                      </span>

                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {slide.title}
                      </h1>

                      <p className="text-gray-600 leading-relaxed mb-8">
                        {slide.description}
                      </p>

                      <button
                        type="button"
                        className="bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-widest hover:text-gray-900 hover:bg-transparent border border-gray-900 transition-all duration-150"
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Right Arrow */}
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-20 border-0 shadow-sm bg-black/40 hover:bg-black/90 text-white hover:text-white rounded-none h-24 p-5 transition duration-150">
          <span className="text-5xl">›</span>
        </CarouselNext>
      </Carousel>
    </section>
  );
}
