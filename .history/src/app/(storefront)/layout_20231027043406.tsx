

import Provider from '@/components/custom/Provider';
import Navbar from '@/components/front/Header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
         <Navbar/>
          {children}
          </>
  );
}
