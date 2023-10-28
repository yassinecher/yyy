import { redirect } from 'next/navigation';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
 

 
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
