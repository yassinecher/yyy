'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import getPagesTotal from '@/actions/get-pagesTotal';
import gettoatl from '@/actions/get-pagesTotal';
import { DataTable } from '@/components/ui/data-table';
import ProductList from '@/components/product-list';
import getProducts from '@/actions/get-products';
import { Product } from '@/types';

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page')?? '1';;
  
  // Check if a value is a number
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  const [pageindex, setPageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const fetchTotalItems = async () => {
    const totalItems = await gettoatl("") // Make sure the action URL is correctly set
    setPageTotal(Math.ceil(totalItems / pageSize));
    
  };
  useEffect(() => {
    if (isNumber(parseInt(page))) {
      setPageIndex(parseInt(page));
    }
    
    const fetchTotalItems = async () => {
      const totalItems = await gettoatl("") // Make sure the action URL is correctly set
      setPageTotal(Math.ceil(totalItems / pageSize));
       
    };
    const fetchProducts = async ()=>{
        const productss = await getProducts({ pageindex, });
        setProducts(productss)
    }
    fetchProducts()
    
    fetchTotalItems();
  }, [page]);

  const pageSize = 10;

  return (
    <div>
      <div className="container mx-auto py-10">
       <ProductList items={products}title='' />
    </div>
    </div>
  );
};

export default Page;
