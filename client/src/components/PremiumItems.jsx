import React from 'react';
import { Star } from 'lucide-react';
import { premiumItems } from '../assets/assets';

const PremiumItems = () => {
   
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-semibold mt-14">Premium Items</h2>

            <div className='w-full overflow-x-scroll pt-6'>
                <div className="flex gap-6">
                    {premiumItems.map((product, index) => (
                        <div key={index} className="rounded-lg border border-gray-400 min-w-60 hover:-translate-y-1 transition duration-300 cursor-pointer">
                            <div className="bg-gray-100 h-38 w-full rounded-t-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-contain p-4"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

                                <div className="flex items-center my-2">
                                    <span className="text-yellow-400 space-x-1">
                                        <Star className='inline-block h-4 w-4 mb-0.5'/>
                                        <Star className='inline-block h-4 w-4 mb-0.5'/>
                                        <Star className='inline-block h-4 w-4 mb-0.5'/>
                                        <Star className='inline-block h-4 w-4 mb-0.5'/>
                                    </span>
                                    <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
                                </div>

                                <div className="flex justify-between items-center gap-4 ">
                                    <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                                    <button className="text-sm px-4 py-2 border rounded-md border-gray-400 hover:bg-gray-100 transition-colors">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumItems;