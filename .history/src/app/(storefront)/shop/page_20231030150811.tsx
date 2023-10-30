'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import prismadb from '@/lib/prismadb'

const page= async()=> {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    function isNumber(value: any): boolean {
        return typeof value === 'number';
      }
   const [pageIndex,setPageIndex]=useState(0)
    if(page&& parseInt(page)){
        setPageIndex(parseInt(page))
    }
   const pageSize = 10;
   const productList=prismadb.product.findMany(
    {
        where:{
            
        },

    }
   )
  return (
    <div>{search}</div>
  )
}

export default page