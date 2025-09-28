import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext';
import { ClientContext } from '../context/ClientContext';

const ErrorPage = () => {
  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(ClientContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto text-center px-6">
      <h1 className="text-7xl font-bold text-blue">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <div className="flex gap-4 mt-6">
        <a href={aToken ? "/admin-dashboard" : cToken ? "/client-dashboard" : "/"}
          className="px-6 py-3 bg-blue text-white rounded-lg shadow transition">
          Open Dashboard
        </a>
        <a href={aToken ? "/all-products" : cToken ? "/my-products" : "/"}
          className="px-6 py-3 border border-blue text-blue rounded-lg hover:bg-blue-800/5 transition">
          Browse Products
        </a>
      </div>

    </div>
  )
}

export default ErrorPage