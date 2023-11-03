"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu";
import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin`,
      label: 'Overview',
      active: pathname === `/admin`,
    },
  
    
    {
      href: `/admin/categories`,
      label: 'Categories',
      active: pathname === `/admin/categories`,
    },
    
    {
      href: `/admin/orders`,
      label: 'Orders',
      active: pathname === `/admin/orders`,
    },
    
    
    {
      href: `/admin/mainpage`,
      label: 'Mainpage',
      active: pathname === `/admin/mainpage`,
    },
 
    {
      href: `/admin/settings`,
      label: 'Settings',
      active: pathname === `/admin/settings`,
    },
  ]
  const components: { label: string; href: string,active:boolean }[] = [
 
     {
      href: `/admin/motherboards`,
      label: 'Motherboards',
      active: pathname === `/admin/motherboards*`,
    },
    {
      href: `/admin/processors`,
      label: 'Cpus',
      active: pathname === `/admin/processors`,
    },
    {
      href: `/admin/Gpus`,
      label: 'Gpus',
      active: pathname === `/admin/Gpus`,
    },
    {
      href: `/admin/memories`,
      label: 'Ram',
      active: pathname === `/admin/memories`,
    },
    {
      href: `/admin/Storage`,
      label: 'Storage',
      active: pathname === `/admin/Storage`,
    },
    {
      href: `/admin/PowerSuppliy`,
      label: 'Power Suppliy',
      active: pathname === `/admin/PowerSuppliy`,
    },
    {
      href: `/admin/PcCase`,
      label: 'Pc Case',
      active: pathname === `/admin/PcCase`,
    },

    {
      href: `/admin/products`,
      label: 'Products',
      active: pathname === `/admin/products`,
    },
  
  ]
  const isActiveRoute = (pattern:any) => {
    console.log( pathname==pattern!=="/admin")
    console.log( pattern)
    if(
     
      pathname.match("/admin") && pattern!=="/admin"
     
    )
    {
      return false
    }else{
      return pathname.startsWith(pattern);
    }
   
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    > 
      <Link
          key={`/admin`}
          href={`/admin`}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isActiveRoute(`/admin`) ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {'Overview'}
        </Link>
       <NavigationMenu className="list-none">
            <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black dark:bg-transparent dark:text-black rounded-none hover:bg-transparent active:bg ">PC Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px]  list-none gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem className="hover:bg-slate-100"
                  key={component.label}
                  title={component.label}
                  href={component.href}
                >
                 Manage your {component.label} list 
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> 
        </NavigationMenu>
       

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isActiveRoute(route.href) ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
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
