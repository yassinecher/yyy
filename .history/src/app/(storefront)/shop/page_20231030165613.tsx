
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
  const total=await prismadb.product.count()
  const page = searchParams['page'] ?? '1'
  let pageIndex
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  const perpage=10
  if (isNumber(parseInt(page.toString()))) {
    pageIndex=parseInt(page.toString())
  }else{
    pageIndex=1
  }


  return (
    <div className='flex flex-col gap-2 items-center'>
       

      <PaginationControls
        hasNextPage={pageIndex <total}
        hasPrevPage={pageIndex > 0}
        pagetotal={total}
      />
    </div>
  )
}
export default Home