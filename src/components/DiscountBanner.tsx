import React from "react";

const DiscountBanner = () => {
  return (
    <div className="bg-black text-body font-bold text-white text-center p-4 w-full">
      Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer{"  "}
      <span className="text-main-100 text-body font-bold border-b border-main-100 hover:tracking-wider transition-all duration-150 cursor-pointer">
        Shop Now
      </span>
    </div>
  );
};

export default DiscountBanner;
