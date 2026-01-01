"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  highlight?: boolean;
};

const cards: Card[] = [
  {
    id: 1,
    category: "Fashion Tips",
    title: "What Curling Irons Are The Best Ones",
    description:
      "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus..",
    image: "/shoes/shoe-1.jpg",
  },
  {
    id: 2,
    category: "Fashion Tips",
    title: "Vogue’s Ultimate Guide To Autumn / Winter 2019 Shoes",
    description:
      "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus..",
    image: "/shoes/shoe-1.jpg",
  },
  {
    id: 3,
    category: "Fashion Tips",
    title: "What Curling Irons Are The Best Ones",
    description:
      "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus..",
    image: "/shoes/shoe-1.jpg",
  },
];

const Articles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    /* SLIDE UP ON SCROLL */
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="bg-light-200 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-bold mb-12">
          Latest Articles
        </h2>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12  will-change-transform"
        >
          {cards.map((card, index) => (
            <article
              key={card.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="w-full max-w-120 mx-auto group hover:border hover:border-dark-700 transition-all duration-150"
            >
              <Image
                width={250}
                height={250}
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover"
              />
              <div className="group-hover:px-4 group-hover:pb-2 transition-all duration-150">
                <p className="text-sm font-medium text-gray-500 mt-4">
                  {card.category}
                </p>

                <h3 className="text-xl font-semibold my-4 hover:text-red transition-colors duration-150">
                  {card.title}
                </h3>

                <p className="text-body-medium text-medium text-gray-600 mt-3">
                  {card.description}
                </p>

                <a
                  href="#"
                  className="inline-block mt-4 text-body font-semibold underline hover:tracking-wider transition-all duration-150"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
