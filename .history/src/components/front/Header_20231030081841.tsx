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
import { MainNav } from './main-nav';

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
    <>  <>
    {session?.user.role === "admin" ? (  <Link href={"/admin"}>
        <button className='bg-red-700 w-full text-white '>Admin Panel</button></Link>) : <></>}
   </>
    


      <div className="dark:bg-black opacity-90  bg-white sticky top-0 z-50">
        <div className="grid grid-cols-3  max-sm:grid-cols-none max-sm:flex items-center  content-around justify-between">
<div className='w-full p-3 max-sm:hidden'>
<Button className='w-full mx-2 ' variant={'outline'} onClick={() => setOpen(!open)}>
            <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            Search...</Button>
</div>
           

        

          <div className="flex  items-center  content-around w-full  justify-center align-middle">
        
   

            <div className="m-5  text-xl font-bold relative logo-container flex  content-center items-center align-middle">
            <div className="image-container">
              <div className="block1 rounded-full">
                <img
                  src="/images/logo (3).png"
                  className="h-10 w-10  rounded-full max-w-full"
                  alt=""
                />
              </div>
            </div>
            <div className='max-md:mx-auto px-3 title ml-2 font-semibold '>Gaming Gear TN</div>

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
         
          <div className=" flex items-center justify-end space-x-3">
         
          <Button variant={'ghost'} size={'icon'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
            </Button>
           <div className='max-sm:hidden'>
           {session ? (<UserAccountNav />) : <Link href='/sign-in'>
              <Button variant={"default"}> Sign in</Button>
     
    </Link>}
           </div>
            

  <div className='pr-5'>       <ThemeToggle  /></div>
     

          </div>
        </div>
        <div className='w-full p-3 hidden max-sm:flex'>
<Button className='w-full mx-0 ' variant={'outline'} onClick={() => setOpen(!open)}>
            <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            Search...</Button>
  <Button variant={'ghost'} onClick={()=>setIsMenuOpen(!isMenuOpen)}>

  <svg fill="currentColor" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
	 viewBox="0 0 297 297">
<g>
	<g>
		<g>
			<path d="M66.102,0H15.804C7.089,0,0,7.089,0,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804V15.804C81.907,7.089,74.817,0,66.102,0z"/>
			<path d="M173.649,0h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804V15.804C189.453,7.089,182.364,0,173.649,0z"/>
			<path d="M66.102,107.547H15.804C7.089,107.547,0,114.636,0,123.351v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C81.907,114.636,74.817,107.547,66.102,107.547z"/>
			<path d="M173.649,107.547h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C189.453,114.636,182.364,107.547,173.649,107.547z"/>
			<path d="M281.196,0h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804V15.804C297,7.089,289.911,0,281.196,0z"/>
			<path d="M281.196,107.547h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C297,114.636,289.911,107.547,281.196,107.547z"/>
			<path d="M66.102,215.093H15.804C7.089,215.093,0,222.183,0,230.898v50.298C0,289.911,7.089,297,15.804,297h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C81.907,222.183,74.817,215.093,66.102,215.093z"/>
			<path d="M173.649,215.093h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C189.453,222.183,182.364,215.093,173.649,215.093z"/>
			<path d="M281.196,215.093h-50.298c-8.715,0-15.804,7.089-15.804,15.804v50.298c0,8.715,7.089,15.804,15.804,15.804h50.298
				c8.715,0,15.804-7.089,15.804-15.804v-50.298C297,222.183,289.911,215.093,281.196,215.093z"/>
		</g>
	</g>
</g>
</svg>

  </Button>
</div>
      </div>
      

      
      <div >
        <div className=" flex items-center align-middle  max-lg:hidden justify-center">
         <div className=" tr-left border-r-orange-50 ">

         </div >
          <div className="w-full bg-orange-50 flex justify-center h-14 ">
              <div className='m-auto flex justify-center'>
              <MainNav />
              <Button className='ml-5 dark:bg-amber-500 dark:text-white bg-amber-500' variant={'default'}>
              Build your pc
              </Button>
              </div>
       

       
           
          </div>
          <div className=" tr-right border-l-orange-50 ">

</div >
        </div>
      </div>
<div  className={` ${isMenuOpen ? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-full flex-col dark:bg-black bg-orange-50 opacity-90 z-50`}>
  <div  className='flex justify-end w-full'>
    <Button  onClick={()=>setIsMenuOpen(!isMenuOpen)} className='m-3 ' variant={'ghost'}>

    <svg fill="currentColor" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
	 viewBox="0 0 297 297" >

		<path d="M221.489,92.552c-26.303-26.474-60.365-42.391-97.105-45.635l24.789-28.828c1.612-1.877,2.062-4.488,1.169-6.795
			c-0.892-2.307-2.982-3.935-5.438-4.237l-57.06-7.006c-2.225-0.277-4.441,0.583-5.904,2.284L31.262,61.272
			c-1.766,2.054-2.123,4.967-0.907,7.387l34.913,69.446c1.008,2.003,2.95,3.371,5.176,3.644l57.059,7.006
			c2.455,0.308,4.89-0.778,6.312-2.81c1.423-2.033,1.608-4.683,0.482-6.893l-18.08-35.478
			c52.329,5.561,94.611,49.316,94.611,100.486v86.232c0,3.705,3.003,6.708,6.708,6.708h43.115c3.705,0,6.708-3.003,6.708-6.708
			V204.06C267.359,161.924,251.068,122.323,221.489,92.552z"/>

</svg>

    </Button>
  
  </div>

</div>
    </>
  );
}
export default Header