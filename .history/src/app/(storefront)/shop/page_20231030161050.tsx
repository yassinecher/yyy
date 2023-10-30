'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import getPagesTotal from '@/actions/get-pagesTotal';
import gettoatl from '@/actions/get-pagesTotal';
import { DataTable } from '@/components/ui/data-table';
import ProductList from '@/components/product-list';

const Page = async() => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page')?? '1';;
  
  // Check if a value is a number
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  const [pageIndex, setPageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const pageSize = 10;
  if (isNumber(parseInt(page))) {
    setPageIndex(parseInt(page));
  }
    const totalItems = await gettoatl("") // Make sure the action URL is correctly set
    setPageTotal(Math.ceil(totalItems / pageSize));
    
  

 

  return (
    <div>
      <div className="container mx-auto py-10">
       <ProductList items={[]}title='' />
    </div>
    </div>
  );
};

export default Page;
