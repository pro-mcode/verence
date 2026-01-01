"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, InfoIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

gsap.registerPlugin(ScrollTrigger);

interface LatestItemsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
}

export default function LatestItemsClient({
  products,
}: LatestItemsClientProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".latest-item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Latest Items</h2>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: true }}
        className="relative w-full"
      >
        <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 z-10 border-0 shadow-none bg-main-500 text-white">
          <span className="text-5xl">‹</span>
        </CarouselPrevious>

        <CarouselContent>
          {products.map(
            ({ id, name, imageUrl, subtitle, price, salePrice }) => (
              <CarouselItem
                key={id}
                className="basis-full md:basis-1/2 lg:basis-1/3 px-3 latest-item "
              >
                <div className="relative overflow-hidden">
                  <div className="relative group">
                    <Image
                      width={500}
                      height={500}
                      src={imageUrl ?? "/placeholder.jpg"}
                      alt={name}
                      className="w-full h-105 object-cover transition-transform duration-300 group-hover:scale-102"
                    />

                    <span className="absolute top-3 right-3 text-body text-gray-500">
                      {subtitle ?? ""}
                    </span>

                    <span className="absolute text-xs font-bold top-3 left-3 bg-white px-3 py-1 rounded-md text-main-500 shadow-sm">
                      Collection
                    </span>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:hidden group-hover:flex items-center space-x-2 bg-white">
                      <button className="p-3 sm:p-4 hover:bg-main-500 hover:text-white transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                      </button>
                      <button className="p-3 sm:p-4 hover:bg-main-500 hover:text-white transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => router.push(`/products/${id}`)}
                        className="p-3 sm:p-4 hover:bg-main-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <InfoIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-heading-4 font-medium text-gray-600">
                      {name}
                    </h3>
                    <div className="mt-2 flex items-center justify-center space-x-3">
                      {price != null && salePrice != null ? (
                        <>
                          <span className="font-semibold text-gray-900">
                            ${salePrice}
                          </span>

                          <span className="font-semibold text-gray-400 line-through">
                            ${price}
                          </span>

                          <span className="text-sm font-bold text-green-600">
                            {Math.round(((price - salePrice) / price) * 100)}%
                            off
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-gray-900">
                          ${price ?? "—"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>

        <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 z-10 border-0 shadow-none bg-main-500 text-white">
          <span className="text-5xl">›</span>
        </CarouselNext>
      </Carousel>
    </section>
  );
}
