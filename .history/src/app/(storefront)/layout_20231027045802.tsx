
import Provider from '@/components/custom/Provider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';
import Header from '@/components/front/Header';
const inter = Inter({ subsets: ['latin'] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
  
      <html lang="en">
        <body className={inter.className}>
        <Provider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          >
             
             <Header/>
            <ToastProvider />
          
            {children}
          </ThemeProvider></Provider>
        </body>
      </html>
    
        
         
          </>
  );
}
