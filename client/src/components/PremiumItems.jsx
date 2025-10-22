import React from 'react';
import { premiumItems } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const PremiumItems = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-semibold mt-14">Premium Items</h2>

            <div className='w-full overflow-x-scroll pt-6'>
                <div className="flex gap-6">
                    {premiumItems.map((product, index) => (
                        <div key={index} onClick={() => navigate(`/${product.category}/${product.id}`)}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumItems;