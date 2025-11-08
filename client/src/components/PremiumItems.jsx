import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';

const PremiumItems = () => {
    const navigate = useNavigate();
    const { products, getProductsData } = useContext(AppContext);

    useEffect(() => {
        getProductsData();
    }, []);

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-semibold mt-14">Premium Items</h2>

            <div className='w-full overflow-x-scroll pt-6'>
                <div className="flex gap-6">
                    {products.slice(0, 15).map((product, index) => (
                        <div key={index} onClick={() => { navigate(`/${product.category}/${product._id}`); scrollTo(0, 0) }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumItems;