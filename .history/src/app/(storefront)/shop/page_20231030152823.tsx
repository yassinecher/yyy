"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import gettoatl from '@/actions/get-pagesTotal'

const page= async()=> {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    function isNumber(value: any): boolean {
        return typeof value === 'number';
      }

   const [pageIndex,setPageIndex]=useState(0)
   const [pageTotal,setPageTotal]=useState(0)
    if(page&& parseInt(page)){
        setPageIndex(parseInt(page))
    }

   const pageSize = 10;
   const totalItems = await gettoatl("");
   console.log(totalItems)
   setPageTotal(totalItems/10)
   const productList=await prismadb.product.findMany(
    {
        where:{
          

        }, 
        take: pageSize,

    }
   )
  return (
    <div>{search}</div>
  )
}

export default page