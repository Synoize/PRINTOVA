import React from 'react'
import HeaderSlider from '../components/HeaderSlider'
import NewsLetter from '../components/NewsLetter'
import FeaturedProduct from '../components/FeaturedProduct'
import Categories from '../components/Categories'
import Bestseller from '../components/BestSeller'
import PremiumItems from '../components/PremiumItems'

const Home = () => {
  return (
    <div className="p-4 md:px-20">
      <HeaderSlider/>
      <Categories/>
      <Bestseller/>
      <FeaturedProduct/>
      <PremiumItems/>
      <NewsLetter/>
    </div>
  )
}

export default Home