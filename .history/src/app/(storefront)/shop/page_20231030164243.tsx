
import prismadb from '@/lib/prismadb'
import PaginationControls from './_componenets/PaginationControls' 
import Image from 'next/image'
import React from 'react'



 const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const prods=await prismadb.product.findMany()
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '5'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  
  
  const entries = prods.slice(start, end)

  return (
    <div className='flex flex-col gap-2 items-center'>
      {entries.map((entry) => (
        <p >{entry.name}</p>
      ))}

      <PaginationControls
        hasNextPage={end < entries.length}
        hasPrevPage={start > 0}
      />
    </div>
  )
}
export default Home