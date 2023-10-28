

import React, { useState } from 'react';

import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';


 const Header = async () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const session =  await getServerSession(authOptions)
  return (
    <>
<div className="mt-4 flex items-center justify-between max-lg:hidden">
            <div className="flex gap-x-2 py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span className="text-sm font-medium">California</span>
            </div>
          </div>

      <div className=" text-white relative z-0">
        <div className="border-b border-gray-700 py-3 px-6">
          <div className="md:flex justify-between">
            <div className="flex items-center max-md:my-5 ">

              <div className="w-full text-xl font-bold relative logo-container flex justify-center items-center">
                <div className="image-container">
                  <div className="block1 rounded-full">
                    <img
                      src="/images/logo (3).png"
                      className="h-7 w-7 max-md:w-12 max-md:h-12  rounded-full max-w-full"
                      alt=""
                    />
                  </div>
                </div>
                <div className='max-md:mx-auto px-3 title ml-2 font-semibold '>Gaming Gear TN</div>
           
              </div>
              <button
                  onClick={toggleMenu}
                  className=" md:hidden flex items-center px-3 py-2 border rounded text-yellow-100 border-transparent "
                >

                  <svg
                    className="fill-current h-5 w-5"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
            </div>

            <div className="lg:ml-6 flex flex-1 ">

              <div className='block2 w-full m-auto   lg:ml-6 flex flex-1'>
                <div className="flex cursor-pointer select-none items-center  align-middle  max-md:hidden cat  bg-transparent  px-4 text-white hover:bg-[#f0f0f0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="text-sm font-medium ">Categories</span>
                </div>
                <input type="text" placeholder='Search' className='w-full  bg-transparent border-transparent p-2 outline-none ' />
              </div>

             
            </div>
         
            <div className="ml-2 flex max-md:hidden">
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Orders</span>
              </div>

              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Favorites</span>
              </div>

              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-700">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">3</span>
                </div>
                <span className="text-sm font-medium">Cart</span>
              </div>

              <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-700">
                
                <Link href={"login"} className="text-sm font-medium">Sign in</Link>
              </div>
            </div>
          
          </div>

          <div
                className={`w-full flex-grow md:hidden lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'menu-open' : 'menu-closed'
                  }`}
              >
                <div className="text-sm lg:flex-grow">
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-yellow-100 hover:text-white mr-4"
                  >
                    Docs
                  </a>
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-yellow-100 hover:text-white mr-4"
                  >
                    Examples
                  </a>
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-yellow-100 hover:text-white"
                  >
                    Blog
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
                  >
                    Download
                  </a>
                </div>
              </div>
      
          <div className="mt-4 flex items-center justify-between max-lg:hidden">
            <div className="flex gap-x-2 py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span className="text-sm font-medium">California</span>
            </div>

            <div className="flex gap-x-8 ">
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Best seller</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">New Releases</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Books</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Computers</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Fashion</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Health</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Pharmacy</span>
              <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Toys & Games</span>
            </div>

            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-700">Become a seller</span>
          </div>
        </div>
      </div>

    </>
  );
}
export default Header