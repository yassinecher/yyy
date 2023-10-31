
import Provider from '@/components/custom/Provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';
import Header from '@/components/front/Header';
import Navbar from '@/components/custom/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
const inter = Inter({ subsets: ['latin'] });
import './globals.css'
import prismadb from '@/lib/prismadb';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =  await getServerSession(authOptions)
  const cathegories = await prismadb.category.findMany() 
  return (
    <>
  
   
         
           
            <Provider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem

          >
            
            <div className='OverlayS'>  <Header session={session} cathegories={cathegories} />
        
          
            {children}
          {children}
              <ToastProvider />
            
            </div>

          </ThemeProvider></Provider>
    
        
         
          </>
  );
}
