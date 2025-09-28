import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-20 pb-10 md:py-28">
      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now & get more <br className="md:hidden"/>offer deals
      </h1>
      <p className="md:text-base text-gray-500/80 max-w-4xl mt-6">
        Whether you're a new customer or a loyal buyer, there’s always something special waiting for you—from welcome discounts and weekend accessory sales to exclusive bundle offers.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 mt-12 hover:scale-98 transition duration-300">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 h-full text-white bg-blue rounded-md rounded-l-none">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
