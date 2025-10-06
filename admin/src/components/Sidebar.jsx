import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { ClientContext } from '../context/ClientContext'
import { BadgePlus, LayoutDashboard, ShoppingBasket, ShoppingCart, User, UserPen, Users } from 'lucide-react'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext);
    const {cToken} = useContext(ClientContext);

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-gray-600 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-12 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
                    <LayoutDashboard size={20} />
                    <p className='hidden sm:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/products'}>
                    <ShoppingBasket size={20} />
                    <p className='hidden sm:block'>All Products</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-orders'}>
                    <ShoppingCart size={20} />
                    <p className='hidden sm:block'>All Orders</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/clients'}>
                    <Users size={20} />
                    <p className='hidden sm:block'>All Clients</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/users'}>
                    <User size={20} />
                    <p className='hidden sm:block'>All Users</p>
                </NavLink>
            </ul>
        }
        {
            cToken && <ul className='text-gray-600 mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-12 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-dashboard'}>
                    <LayoutDashboard size={20} />
                    <p className='hidden sm:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-products'}>
                    <BadgePlus size={20} />
                    <p className='hidden sm:block'>Add Products</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/my-products'}>
                    <ShoppingBasket size={20} />
                    <p className='hidden sm:block'>My Products</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-orders'}>
                    <ShoppingCart size={20} />
                    <p className='hidden sm:block'>All Orders</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/client-profile'}>
                    <UserPen size={20} />
                    <p className='hidden sm:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar