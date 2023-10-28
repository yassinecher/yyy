
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {


 

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
       
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
       
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
