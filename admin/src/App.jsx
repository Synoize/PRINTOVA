import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext'
import { ClientContext } from './context/ClientContext'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddClient from './pages/Admin/AddClient';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { cToken } = useContext(ClientContext)

  return aToken || cToken ? (
    <div className='bg-slate-50'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='max-h-screen w-full overflow-y-auto'>
          <Routes>
            {/* Admin Route */}
            <Route path={'*'} element={<ErrorPage/>} />
            <Route path={''} element={<></>} />
            <Route path={'/dashboard'} element={<AddClient />} />
            <Route path={'/all-products'} element={<AddClient />} />
            <Route path={'/all-orders'} element={<AddClient />} />
            <Route path={'/add-client'} element={<AddClient />} />
            <Route path={'/all-clients'} element={<AddClient />} />

            {/* Client Route */}
            <Route path={'/client-dashboard'} element={<AddClient />} />
            <Route path={'/orders'} element={<AddClient />} />
            <Route path={'/add-product'} element={<AddClient />} />
            <Route path={'/my-products'} element={<AddClient />} />
            <Route path={'/client-profile'} element={<AddClient />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App