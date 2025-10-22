import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import MainLoader from '../components/MainLoader';

const Shop = () => {
  const { category } = useParams();
  const [filterProduct, setFilterProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { products, getProductsData, } = useContext(AppContext);

  const applyFilter = () => {
    if (category) {
      setFilterProduct(products.filter(product => product.category === category))
    } else {
      setFilterProduct(products)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [products, category])

  useEffect(() => {
    getProductsData();
  }, [])

  return (
    <div className='p-4 md:px-20'>
      <p className='text-gray-600 '>Browse through product categories</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        <div className={`h-[74vh] overflow-y-scroll  flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden'} sm:flex`}>
          {categories.map(item => (
            <p
              key={item.id}
              onClick={() => { navigate(category === item.name ? '/shop' : `/shop/${item.name}`); setShowFilter(false) }}
              className={`w-[90vw] sm:w-auto flex items-center gap-2 pl-3 py-1.5 pr-20 border border-gray-300 rounded transition-all cursor-pointer text-nowrap ${category === item.name ? 'bg-indigo-100 text-black' : '' }`}
            >
              <img src={item.img} alt={item.name} className='w-8 h-8' />
              {item.name}
            </p>
          ))}
        </div>
        { products.length > 0 ? (
            <div className='w-full grid grid-cols-2 sm:grid-cols-5 gap-4 gap-y-6 h-[74vh] overflow-y-scroll items-start'>
              {
                filterProduct?.map((product, index) => (
                  <div onClick={() => { navigate(`/${product.category}/${product._id}`); scrollTo(0, 0) }} key={index}>
                    <ProductCard product={product} />
                  </div>
                ))
              }
            </div>
          ) : <div className='w-full h-[74vh] flex justify-center items-center'><MainLoader /></div>
        }
      </div>
    </div>
  )
}

export default Shop