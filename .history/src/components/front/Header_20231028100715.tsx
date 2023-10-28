"use client";


import { useState } from 'react';
import * as React from "react"
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
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "@/components/ui/navigation-menu"
 
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
import { HeaderNavigation } from './headerNavigation';

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

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]
  return (
    <>  <>
    {session?.user.role === "admin" ? (  <Link href={"/admin"}>
        <button className='bg-red-700 w-full text-white '>Admin Panel</button></Link>) : <></>}
   </>
    


      <div className="">
        <div className="flex h-24 items-center px-4  content-between justify-around">

          

        
          <Button className='w-1/3' variant={'outline'} onClick={() => setOpen(!open)}>
            <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            Search...</Button>
            <div className="m-5 text-xl font-bold relative logo-container flex flex-col content-center">
            <div className="image-container">
              <div className="block1 rounded-full">
                <img
                  src="/images/logo (3).png"
                  className="h-10 w-10   max-md:w-12 max-md:h-12  rounded-full max-w-full"
                  alt=""
                />
              </div>
            </div>
            <div className='max-md:mx-auto px-3 title ml-2 font-semibold '>Gaming Gear TN</div>

          </div>
          <div className="wave">



  <div className="image-container wave__btn flex align-middle content-center justify-center items-center">
              <div className=" rounded-full">
                <img
                  src="/images/logo (3).png"
                  className=" w-full  max-md:w-12 max-md:h-12  rounded-full max-w-full"
                  alt=""
                />
              </div>
            </div>

  <div className="wave__container">
    <div className="wave__circle"></div>
    <div className="wave__circle"></div>
    <div className="wave__circle"></div>
  </div>
</div>
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

          <div className=" flex items-center space-x-3">
          <Button variant={'ghost'} size={'icon'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
            </Button>
            <Button variant={'default'}>
              Build your pc
            </Button>
            
            {session ? (<UserAccountNav />) : <Link className={buttonVariants()} href='/sign-in'>
              <Button variant={"secondary"}> Sign in</Button>
     
    </Link>}
  
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

            <HeaderNavigation/>

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
       
           
          </div>
        </div>
      </div>

    </>
  );
}
export default Header