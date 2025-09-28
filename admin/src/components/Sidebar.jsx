import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { ClientContext } from '../context/ClientContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext);
    const {cToken} = useContext(ClientContext);

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-gray-600 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-12 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
                    {/* <img src={assets.home_icon} alt="" /> */}
                    <p className='hidden sm:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
                    {/* <img src={assets.appointment_icon} alt="" /> */}
                    <p className='hidden sm:block'>All Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-doctor'}>
                    {/* <img src={assets.add_icon} alt="" /> */}
                    <p className='hidden sm:block'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-list'}>
                    {/* <img src={assets.people_icon} alt="" /> */}
                    <p className='hidden sm:block'>Doctors List</p>
                </NavLink>
            </ul>
        }
        {
            cToken && <ul className='text-gray-600 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-12 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-dashboard'}>
                    {/* <img src={assets.home_icon} alt="" /> */}
                    <p className='hidden sm:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-appointments'}>
                    {/* <img src={assets.appointment_icon} alt="" /> */}
                    <p className='hidden sm:block'>All Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-profile'}>
                    {/* <img src={assets.people_icon} alt="" /> */}
                    <p className='hidden sm:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar