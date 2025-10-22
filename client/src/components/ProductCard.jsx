import { Star } from 'lucide-react'
import React from 'react'

const ProductCard = ({product}) => {
    
    return (
        <div className="rounded-lg border border-gray-300 hover:-translate-y-1 transition duration-300 cursor-pointer">
            <div className="bg-gray-100 h-32 md:h-38 w-full rounded-t-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-4"
                />
            </div>

            <div className="p-4 pt-2">
                <h3 className="font-semibold text-sm md:text-lg line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-xs md:text-sm line-clamp-2">{product.description}</p>

                <div className="flex items-center mb-1">
                    <span className="text-yellow-400 space-x-1">
                        <Star className='inline-block h-4 w-4 mb-0.5' />
                        <Star className='inline-block h-4 w-4 mb-0.5' />
                        <Star className='inline-block h-4 w-4 mb-0.5' />
                        <Star className='inline-block h-4 w-4 mb-0.5' />
                    </span>
                    <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
                </div>

                <div className="flex justify-between items-center gap-2 ">
                    <p className="text-lg font-medium text-gray-800">₹{product.offerPrice}<strike className="text-xs text-gray-400 font-normal ml-1">{product.price}</strike></p>
                    <button className="text-xs md:text-sm text-nowrap px-2 md:px-4 py-2 border rounded-md border-gray-400 hover:bg-gray-100 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard