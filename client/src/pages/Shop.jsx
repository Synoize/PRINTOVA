import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { categories } from '../assets/assets';

const Shop = () => {
  const { category } = useParams();
  const [filterProduct, setFilterProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { products, getProductsData, } = useContext(AppContext);

  console.log(products);
  

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
              className={`w-[90vw] sm:w-auto flex items-center gap-2 pl-3 py-1.5 pr-20 border border-gray-300 rounded transition-all cursor-pointer text-nowrap ${category === item.name ? 'bg-indigo-100 text-black' : ''
                }`}
            >
              <img src={item.img} alt={item.name} className='w-8 h-8'/>
              {item.name}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-3 sm:grid-cols-6 gap-4 gap-y-6 h-[74vh] overflow-y-scroll items-start'>
          {
            filterProduct?.map((item, index) => (
              <div onClick={() => { navigate(`/shop/${item._id}`); scrollTo(0, 0) }} className='border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50 w-full h-40 object-contain' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-gray-900 text-sm sm:text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-xs sm:text-sm'>{item.category}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Shop