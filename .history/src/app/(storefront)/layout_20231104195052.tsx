
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
import Footer from '@/components/front/Footer';
export type LocalCathegorilab = {
  id: string, // Changed "String" to "string"
  index: number,
  catId: string, // Changed "String" to "string"
  Label: string, // Changed "String" to "string"
};

export type LocalCathegoryCollection = {
  id: string, // Changed "String" to "string"
  Label: string, // Changed "String" to "string"
  index: number,
  CathegoryCollectiondata: LocalCathegorilab[];
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =  await getServerSession(authOptions)
  const cathegories = await prismadb.category.findMany() 
  const noscategy = await prismadb.cathegoryCollection.findMany()

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
              <Footer/>
              <ToastProvider />
            
            </div>

          </ThemeProvider></Provider>
    
        
         
          </>
  );
}