import React from 'react';
import { bestsellerProduct } from '../assets/assets';
import { MoveRightIcon, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bestseller = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Bestseller</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bestsellerProduct.map((product, index) => (
          <div key={index} onClick={() => navigate(`/shop/${product.category}/${product.name}`)} className="rounded-lg border border-gray-400 hover:-translate-y-1 transition duration-300 cursor-pointer">
            <div className="bg-gray-100 h-32 md:h-38 w-full rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm md:text-lg line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-xs md:text-sm line-clamp-2">{product.description}</p>

              <div className="flex items-center my-2">
                <span className="text-yellow-400 space-x-1">
                  <Star className='inline-block h-4 w-4 mb-0.5' />
                  <Star className='inline-block h-4 w-4 mb-0.5' />
                  <Star className='inline-block h-4 w-4 mb-0.5' />
                  <Star className='inline-block h-4 w-4 mb-0.5' />
                </span>
                <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
              </div>

              <div className="flex justify-between items-center gap-2 ">
                <span className="text-sm md:text-lg font-bold text-gray-800">₹{product.price}</span>
                <button className="text-xs md:text-sm px-2 md:px-4 py-2 border rounded-md border-gray-400 hover:bg-gray-100 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 ">
        <button className="flex items-center gap-2 text-gray-600 border border-gray-400 px-6 py-2 rounded hover:text-[#013e70] font-medium cursor-pointer group">
          See more <MoveRightIcon className=' group-hover:text-[#013e70] group-hover:translate-x-1 transition duration-300' />
        </button>
      </div>
    </div>
  );
};

export default Bestseller;