"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { LocalCathegoryCollection } from "@/app/(storefront)/layout"
import { Category } from "@prisma/client"
import { Button } from "../ui/button"
import { useState } from "react"

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
interface HeaderProps {
  cathegories?: Category[] | null
  noscategy:LocalCathegoryCollection[]
}

 const HeaderNavigation: React.FC<HeaderProps>=({noscategy ,cathegories})=> {
 

  const [catstodisplay,setCatstodisplay]=useState<String[]>(noscategy[0].CathegoryCollectiondata.map((item)=>item.Label))
  
  const [selected,setSelected]=useState(0)


  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuTrigger  className=" text-black dark:bg-transparent dark:text-black bg-transparent rounded-none hover:bg-transparent active:bg-transparent ">TOUTES NOS CATÉGORIES
          </NavigationMenuTrigger>
          <NavigationMenuContent className="  ">
            <ul className="  dark:border-black dark:bg-gray-800 grid gap-3 md:w-[400px] rounded-none lg:w-[800px]  lg:grid-cols-3 ">
              <li className="  dark:text-white  row-span-1 h-full flex flex-col bg-amber-100 ">
                 {
                  noscategy.map((item,key)=>(<>
                   <Button onClick={()=>{setCatstodisplay(noscategy[key].CathegoryCollectiondata.map((item)=>item.Label));setSelected(key)}} className={`${selected==key? 'bg-amber-500 text-white ':" bg-transparent text-black"}px-7  hover:bg-white hover:text-black dark:hover:bg-gray-900 dark:hover:text-white py-9 rounded-none justify-start text-left rounded-none"`}>{item.Label}</Button>
                  
                  </>))
                 }
              </li>
              <div className="col-span-2 grid grid-cols-2 m-5">
                {
                  catstodisplay.map((item)=>(<>
                       <ListItem className="hover:dark:bg-amber-100" href={`/shop?categorie=${item}`} title={item.toString()}>
                       
                       </ListItem>
                  </>))
                }
         
          
              </div>
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black dark:bg-transparent dark:text-black rounded-none hover:bg-transparent active:bg ">Peripherals</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px]  gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          
        </NavigationMenuItem>


        <NavigationMenuItem>
       
        </NavigationMenuItem>


      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default HeaderNavigation