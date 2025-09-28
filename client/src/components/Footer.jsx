import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Facebook, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
    return (
        <div className='md:mx-10 mx-4 border-t border-t-gray-400'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
                {/* Left Section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Print Creation, we believe every print tells a story. From eye-catching posters and vibrant t-shirts to professional books, corporate flex banners, and customized merchandise — we bring your ideas to life with precision and creativity.</p>

                    <div className="flex justify-start mt-6">
                        <a
                            href="https://facebook.com/printova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center border hover:bg-blue-800/40 hover:text-white transition"
                        >
                            <Facebook />
                        </a>
                        <a
                            href="https://x.com/printova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center border-y hover:bg-blue-800/40 hover:text-white transition"
                        >
                            <Twitter />
                        </a>
                        <a
                            href="https://linkedin.com/in/printova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center border hover:bg-blue-800/40 hover:text-white transition"
                        >
                            <Linkedin />
                        </a>
                    </div>
                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <NavLink to={"/"} className="hover:text-gray-800">Home</NavLink>
                        <NavLink to={"/about"} className="hover:text-gray-800">About Us</NavLink>
                        <NavLink to={"/contact"} className="hover:text-gray-800">Contact Us</NavLink>
                        <NavLink to={"/privacy-policy"} className="hover:text-gray-800">Privacy Policy</NavLink>
                    </ul>

                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 **********</li>
                        <li>info@printcreation.com</li>
                        <li>Location: Awanti bai chowk, Kohka, Bhilai, Chhattisgarh</li>
                    </ul>
                </div>
            </div>

            {/* Copyright Text */}
            <div className='border-t border-t-gray-400'>
                <p className='py-5 text-sm text-center '> Copyright {new Date().getFullYear()} © PRINTOVA. All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer