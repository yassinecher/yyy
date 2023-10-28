"use client";


import React, { useState } from 'react';

import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';
import UserAccountNav from '../custom/UserAccountNav';
import { Button, buttonVariants } from '../ui/button';
import './Header.css'
import { Category } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { ThemeToggle } from '../theme-toggle';

interface HeaderProps {
  session?: Session | null; // Define the session prop
  cathegories?: Category[] | null
}

const Header: React.FC<HeaderProps> = ({ session, cathegories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [open, setOpen] = React.useState(false)


  return (
    <>

      <div className="border-b">
        <div className="flex h-24 items-center px-4">

          <div className="m-5 text-xl font-bold relative logo-container flex justify-center items-center">
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
          <Button className='w-1/2 mx-10' variant={'outline'} onClick={() => setOpen(!open)}>
            <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            Search...</Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <div className="ml-auto flex items-center space-x-4">
            <Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
            </Button>
            <ThemeToggle />

          </div>
        </div>
      </div>



      <div className="  relative z-0">
        <div className="border-b border-gray-700 py-3 px-6">
          <div className="md:flex justify-between">
            <div className="flex items-center max-md:my-5 ">


              <button
                onClick={toggleMenu}
                className=" md:hidden flex items-center px-3 py-2 border rounded  border-transparent "
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

            <div className="lg:ml-6 flex flex-auto items-center justify-center ">

              <div className=' m-auto  w-full items-center justify-center flex flex-1'>


              </div>


            </div>

            <div className="ml-2 flex max-md:hidden">


              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Favorites</span>
              </div>

              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-700">
                <div className="relative">
                
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs ">3</span>
                </div>
                <span className="text-sm font-medium">Cart</span>
              </div>


              <>
                {session?.user.role === "admin" ? (<Link href={"/admin"}><Button >Admin Panel</Button></Link>) : <></>}
                {session ? (<UserAccountNav />) : <Link className={buttonVariants()} href='/sign-in'>
                  Sign in
                </Link>}</>

            </div>

          </div>

          <div
            className={`w-full flex-grow md:hidden lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'menu-open' : 'menu-closed'
              }`}
          >
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover: mr-4"
              >
                Docs
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover: mr-4"
              >
                Examples
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover:"
              >
                Blog
              </a>
            </div>
            <div>
              <a
                href="#"
                className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0"
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