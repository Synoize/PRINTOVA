import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { categories } from "../assets/assets";
import { MoveRightIcon } from "lucide-react";

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                    Explore all Categories
                </h2>
                <button onClick={() => { navigate(`/shop`); scrollTo(0, 0) }} className="flex items-center gap-2 text-gray-600 text-nowrap border border-gray-400 px-4 md:px-6 py-2 rounded-full hover:text-[#013e70] font-medium cursor-pointer group text-sm">
                    See more <MoveRightIcon className=' group-hover:text-[#013e70] group-hover:translate-x-1 transition duration-300' />
                </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-6">
                {categories.slice(0, 9).map((category, index) => (
                    <Link onClick={() => scrollTo(0,0)} key={index} to={`/shop/${category.name}`} className="flex flex-col items-center hover:-translate-y-1 transition duration-300 cursor-pointer">
                        <div
                            key={category.id}
                            className="p-2 md:p-4 mb-3 rounded-lg border border-gray-300 "
                        >
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                            />
                        </div>
                        <p className="text-center text-sm line-clamp-2">{category.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
