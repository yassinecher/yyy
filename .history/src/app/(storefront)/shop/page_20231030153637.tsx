import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import getPagesTotal from '@/actions/get-pagesTotal';

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');
  
  // Check if a value is a number
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  const [pageIndex, setPageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    if (isNumber(parseInt(page))) {
      setPageIndex(parseInt(page?));
    }
    
    const fetchTotalItems = async () => {
      const totalItems = await getPagesTotal(''); // Make sure the action URL is correctly set
      setPageTotal(Math.ceil(totalItems / pageSize));
    };
    
    fetchTotalItems();
  }, [page]);

  const pageSize = 10;

  return (
    <div>
      <div>Search: {search}</div>
      <div>Page Index: {pageIndex}</div>
      <div>Total Pages: {pageTotal}</div>
    </div>
  );
};

export default Page;
