'use client'
import Navbar from '@/components/front/Header';
import Provider from '@/components/custom/Provider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';
const inter = Inter({ subsets: ['latin'] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <Provider>
      <html lang="en">
        <body className={inter.className}>
    
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          > <Navbar/>
            <ToastProvider />
          
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
        
         
          </>
  );
}
