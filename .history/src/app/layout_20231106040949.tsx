
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


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =  await getServerSession(authOptions)
  return (
    <>
  
      <html lang="en">
        <head>
        <meta name="viewport" content="height=device-height initial-scale=1"></meta>
        </head>
        <body className={inter.className}>

            {children}
        
        </body>
      </html>
    
        
         
          </>
  );
}
