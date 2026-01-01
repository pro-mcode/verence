import type { FC } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const NewsletterFooter: FC = () => {
  return (
    <section className="py-14 border-b border-gray-300">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="text-gray-700 text-center max-w-md lg:text-left">
          <h3 className="text-2xl font-bold mb-2">Subscribe Newsletter</h3>
          <p className="text-gray-600">
            Subscribe newsletter to get 5% on all products.
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-4 w-full max-w-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent text-dark-900 border border-gray-600 text-sm font-medium flex-1 px-4 py-3 outline-none"
          />
          <button
            type="button"
            className="bg-dark-900 text-white px-6 font-semibold hover:bg-dark-900/80 transition-all duration-150"
          >
            Subscribe
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 text-gray-400">
          <Twitter className="hover:text-dark-900 cursor-pointer" />
          <Facebook className="hover:text-dark-900 cursor-pointer" />
          <Instagram className="hover:text-dark-900 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default NewsletterFooter;
