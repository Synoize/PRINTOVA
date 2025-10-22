import React from "react";
import { MoveRightIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { bestsellerProduct } from "../assets/assets";

const RecommendedProduct = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col items-center mb-10 mt-16">
                <p className="text-3xl font-medium">
                    Featured <span className="text-blue">Products</span>
                </p>
                <div className="w-28 h-0.5 bg-blue mt-2"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {bestsellerProduct.map((product, index) => (
                    <div key={index} onClick={() => navigate(`/${product.category}/${product.id}`)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="flex justify-center my-8 ">
                <button className="flex items-center gap-2 text-gray-600 border border-gray-400 px-6 py-2 rounded hover:text-[#013e70] font-medium cursor-pointer group">
                    See more <MoveRightIcon className=' group-hover:text-[#013e70] group-hover:translate-x-1 transition duration-300' />
                </button>
            </div>
        </div>
    )
}

export default RecommendedProduct