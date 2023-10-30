'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

function page() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    if(page&& parseInt(page)){
        console.log(page)
    }
    const category = searchParams.get('category')
  return (
    <div>{search}</div>
  )
}

export default page