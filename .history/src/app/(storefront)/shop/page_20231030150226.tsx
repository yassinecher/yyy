'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

function page() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    function isNumber(value: any): boolean {
        return typeof value === 'number';
      }
     
    if(page&& parseInt(page)){
        console.log(parseInt(page))
        
    }
    const category = searchParams.get('category')
  return (
    <div>{search}</div>
  )
}

export default page