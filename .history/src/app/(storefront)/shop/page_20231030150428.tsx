'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

function page() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    function isNumber(value: any): boolean {
        return typeof value === 'number';
      }
   const [pageIndex,setPageIndex]=useState(0)
    if(page&& parseInt(page)){
           
    }
    const category = searchParams.get('category')
  return (
    <div>{search}</div>
  )
}

export default page