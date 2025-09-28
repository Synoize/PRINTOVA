import React from 'react'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-7xl font-bold text-blue">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <div className="flex gap-4 mt-6">
        <a href="/"
          className="px-6 py-3 bg-blue text-white rounded-lg shadow transition">
          Go to Homepage
        </a>
        <a href="/shop"
          className="px-6 py-3 border border-blue text-blue rounded-lg hover:bg-blue-800/5 transition">
          Browse Products
        </a>
      </div>


      <div className="mt-12 w-full max-w-3xl">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">Explore Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a href="/category/stationery" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
            Stationery
          </a>
          <a href="/category/tshirts" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
            Custom T-Shirts
          </a>
          <a href="/category/gadgets" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
            Gadgets
          </a>
          <a href="/category/printing" className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
            Printing Services
          </a>
        </div>
      </div>
    </div>

  )
}

export default ErrorPage