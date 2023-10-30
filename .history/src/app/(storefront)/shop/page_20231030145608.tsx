'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

function page() {
    const searchParams = useSearchParams()
 
    const search = searchParams.get('search')
    const page = searchParams.get('page')
    const category = searchParams.get('category')
  return (
    <div>{search}</div>
  )
}

export default page