import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSX } from "react";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Everybody is different, which is why we offer styles for every body. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.",
    author: "Petey Cruiser",
    role: "Designer at Colorlib",
    avatar: "/google.svg",
  },
  {
    id: 2,
    quote:
      "Everybody is different, which is why we offer styles for every body. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.",
    author: "Alex Morgan",
    role: "Creative Director",
    avatar: "/apple.svg",
  },
];

export default function TestimonialCarousel(): JSX.Element {
  return (
    <section className="bg-light-200 py-18 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
          Customer Testimonial
        </h2>

        <Carousel
          opts={{
            loop: true,
          }}
          className="relative w-full mx-auto"
        >
          {/* Left Arrow */}
          <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 border-0 shadow-none bg-transparent text-gray-400 hover:text-gray-900 hover:bg-transparent">
            <span className="text-4xl">‹</span>
          </CarouselPrevious>

          <CarouselContent>
            {testimonials.map((item) => (
              <CarouselItem key={item.id}>
                <div className="flex flex-col items-center gap-10 ">
                  <p className="text-body-large leading-relaxed text-gray-800 max-w-2xl">
                    {item.quote}
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />

                    <div className="text-left">
                      <p className="font-semibold text-gray-900">
                        {item.author}
                      </p>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Right Arrow */}
          <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 border-0 shadow-none bg-transparent text-gray-400 hover:text-gray-900 hover:bg-transparent">
            {/* <span className="text-5xl">›</span> */}
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}
