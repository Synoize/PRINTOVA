import React from 'react';
import { bestsellerProduct } from '../assets/assets';
import { MoveRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const Bestseller = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Bestseller</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bestsellerProduct.map((product, index) => (
          <div key={index} onClick={() => navigate(`/${product.category}/${product.id}`)}>
            <ProductCard product={product}/>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 ">
        <button onClick={() => { navigate(`/shop`); scrollTo(0, 0) }} className="flex items-center gap-2 text-gray-600 border border-gray-400 px-6 py-2 rounded hover:text-[#013e70] font-medium cursor-pointer group">
          See more <MoveRightIcon className=' group-hover:text-[#013e70] group-hover:translate-x-1 transition duration-300' />
        </button>
      </div>
    </div>
  );
};

export default Bestseller;