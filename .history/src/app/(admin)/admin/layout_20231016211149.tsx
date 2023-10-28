import { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { Separator } from "@/registry/new-york/ui/separator"
import { ThemeProvider } from "@/components/providers"
import AdminNavbar from "@/components/admin/AdminNavbar"

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples app built using the components.",
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
  
  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
          <div className="h-full border bg-background text-foreground shadow w-full">
          <div className="hidden flex-col md:flex bg-background text-foreground">
        <AdminNavbar/>
            {children}
            </div>  </div>
          </ThemeProvider>
  
    </>
  )
}
