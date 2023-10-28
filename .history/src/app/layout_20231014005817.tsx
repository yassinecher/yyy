import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import { authOptions } from '@/lib/auth';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
        <main className='h-screen flex flex-col justify-center items-center'>
        
          {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
