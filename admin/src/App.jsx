import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext'
import { ClientContext } from './context/ClientContext'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { cToken } = useContext(ClientContext)

  return aToken || cToken ? (
    <div className='bg-slate-50'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path={''} element={<></>} />
          {/* <Route path={'/admin-dashboard'} element={<Dashboard />} />
          <Route path={'/add-doctor'} element={<AddDoctor />} /> */}

          {/* Doctor Route */}
          {/* <Route path={'/doctor-dashboard'} element={<DoctorDashboard/>} /> */}
          {/* <Route path={'/doctor-profile'} element={<DoctorProfile/>} /> */}
        </Routes>
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