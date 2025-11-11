import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ConfirmLogout from './ConfirmLogout';
import { assets } from '../assets/assets';
import { ChevronDown, Clock, Mail, Menu, Search, TicketPercent, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';


const Navbar = () => {
    const navigate = useNavigate();

    const { token, userData } = useContext(AppContext)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='flex flex-col border-b border-b-gray-400'>
            <div className='flex justify-between items-center text-sm bg-blue py-4 px-4 md:px-10 text-white'>
                <p className='flex items-center gap-2'><Mail /> info@printcreation.com</p>
                <p className='items-center gap-2 hidden md:flex'><TicketPercent /> Get more deals with offer</p>
                <p className='items-center gap-2 hidden md:flex'><Clock /> 24 * 7 hours available</p>
            </div>
            <div className='flex justify-between items-center w-full py-4 md:px-10 pl-4 text-sm '>
                <img onClick={() => { navigate('/'); scrollTo(0, 0) }} src={assets.logo} alt="PRINTOVA" className='w-34 cursor-pointer' />

                <div className='flex items-center gap-4'>
                    <ul className='hidden md:flex items-start gap-6 font-medium'>
                        <NavLink to={'/'}>
                            <li className='py-1'>HOME</li>
                            <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                        </NavLink>
                        <NavLink to={'/shop'}>
                            <li className='py-1'>SHOP</li>
                            <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                        </NavLink>
                        <NavLink to={'/about'}>
                            <li className='py-1'>ABOUT</li>
                            <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                        </NavLink>
                        <NavLink to={'/contact'}>
                            <li className='py-1'>CONTACT</li>
                            <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                        </NavLink>
                    </ul>

                </div>

                <div className="flex items-center gap-4">
                    {
                        token && (
                            <div className="hidden lg:flex group hover:border focus:border border-gray-400 rounded-full px-3 py-2 items-center gap-2 transition-all duration-300 focus-within:border-gray-800">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="outline-none w-0 group-hover:w-48 focus:w-48 transition-all duration-300 hidden sm:block"
                                />
                                <button>
                                    <Search className="inline-block h-4 w-4 mb-0.5" />
                                </button>
                            </div>
                        )
                    }

                    {token && userData
                        ? (
                            <div className='flex items-center gap-2 cursor-pointer group relative z-20'>
                                <img className='w-8 rounded-full shadow-sm' src={userData.image} alt="" />
                                <ChevronDown className='w-2.5' />
                                <div className='absolute top-1 right-0 pt-14 text-base font-medium text-gray-600 x-20 hidden group-hover:block z-50'>
                                    <div className='border-t-4 border-[#013e70] min-w-48 bg-slate-50 rounded flex flex-col gap-4 p-4'>
                                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => navigate('/cart')} className='hover:text-black cursor-pointer'>Cart</p>
                                        <p onClick={() => navigate('/my-orders')} className='hover:text-black cursor-pointer'>My Orders</p>
                                        <p onClick={() => { setShowConfirm(true) }} className='text-red-500 cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                                {
                                    showConfirm && <ConfirmLogout item={{ setShowConfirm }} />
                                }
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className='bg-blue text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
                        )
                    }

                    <Menu onClick={() => setShowMenu(true)} className='w-6 md:hidden' />

                    {/* Mobile Menu */}
                    <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all`}>
                        <div className='flex justify-between items-center text-sm bg-blue py-4 px-4 md:px-10 text-white'>
                            <p className='flex items-center gap-2'><Mail /> info@printcreation.com</p>
                            <p className='items-center gap-2 hidden md:flex'><TicketPercent /> Get more deals with offer</p>
                            <p className='items-center gap-2 hidden md:flex'><Clock /> 24 * 7 hours available</p>
                        </div>
                        <div className='flex items-center justify-between px-4 py-4'>
                            <img className='w-34' src={assets.logo} alt="" />
                            <X className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} />
                        </div>
                        <ul className={`flex flex-col items-center gap-5 mt-5 px-5 text-sm font-medium`}>
                            <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/'}>
                                <li className='py-1'>HOME</li>
                                <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                            </NavLink>
                            <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/shop'}>
                                <li className='py-1'>SHOP</li>
                                <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                            </NavLink>
                            <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/about'}>
                                <li className='py-1'>ABOUT</li>
                                <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                            </NavLink>
                            <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/contact'}>
                                <li className='py-1'>CONTACT</li>
                                <hr className='border-none outline-none h-0.5 bg-blue w-3/5 m-auto hidden rounded-full' />
                            </NavLink>
                            {!token ? <NavLink onClick={() => { setShowMenu(false); scrollTo(0, 0) }} to={'/login'}><p className='px-8 py-2 rounded-full inline-block'>LOGIN</p></NavLink> : <p onClick={() => { setShowMenu(false); scrollTo(0, 0); setShowConfirm(true) }} className='text-red-600 hover:text-red-500 cursor-pointer'>LOGOUT</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar