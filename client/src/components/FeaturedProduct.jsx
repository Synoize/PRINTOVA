import React from "react";
import { featuredProduct } from "../assets/assets";
import { MoveRightIcon } from "lucide-react";

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-xl md:text-2xl font-semibold">Featured Products</p>
        <div className="w-28 h-0.5 bg-blue mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-2">
        {featuredProduct.map(({ id, image, title, description, more }) => (
          <div key={id} className="relative group bg-[#E6E9F2]">
            <img
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-gray-800 space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button className="flex items-center gap-1.5 bg-blue px-4 py-2 rounded text-white">
                {more} <MoveRightIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
