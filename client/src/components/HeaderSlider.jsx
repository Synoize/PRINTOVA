import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import {MoveRightIcon } from "lucide-react";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "You have an IDEA, Get printed with us Today!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.paperprinter,
    },
    {
      id: 2,
      title: "You have an IDEA, Get printed with us Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.paperprinter,
    },
    {
      id: 3,
      title: "You have an IDEA, Get printed with us Today!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.paperprinter,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-2 md:mt-6 rounded-xl min-w-full"
          >
            {/* Text content */}
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-blue pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-start md:items-center md:gap-6 gap-4 mt-4 md:mt-6">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-blue rounded-full text-white font-medium cursor-pointer">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-2 py-2.5 font-medium cursor-pointer">
                  {slide.buttonText2}
                  <MoveRightIcon/>
                </button>
              </div>
            </div>

            {/* Image content */}
            <div className="flex items-center flex-1 justify-center">
              <img
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2 my-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-blue" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
