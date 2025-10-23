import React, { useContext, useEffect, useState } from "react";
import { MoveRightIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RecommendedProduct = ({productId, category}) => {

    const navigate = useNavigate();
    const { products } = useContext(AppContext);

    const [relProducts, setRelProducts] = useState([])

    useEffect(() => {
        if (products?.length > 0 && category) {
            const productsData = products.filter((product) => product.category === category && product._id !== productId)
            setRelProducts(productsData)
        }
    }, [products, category, productId]);
    
    return (
        <div>
            <div className="flex flex-col items-center mb-10 mt-16">
                <p className="text-3xl font-medium">
                    Featured <span className="text-blue">Products</span>
                </p>
                <div className="w-28 h-0.5 bg-blue mt-2"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {relProducts.slice(0, 5).map((product, index) => (
                    <div key={index} onClick={() => navigate(`/${product.category}/${product.id}`)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="flex justify-center my-8 ">
                <button onClick={() => { navigate(`/shop/${category}`); scrollTo(0, 0) }} className="flex items-center gap-2 text-gray-600 border border-gray-400 px-6 py-2 rounded hover:text-[#013e70] font-medium cursor-pointer group">
                    See more <MoveRightIcon className=' group-hover:text-[#013e70] group-hover:translate-x-1 transition duration-300' />
                </button>
            </div>
        </div>
    )
}

export default RecommendedProduct