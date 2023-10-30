
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
  const total=perpage / await prismadb.product.count()

  return (
    <div className='flex flex-col gap-2 items-center'>
       

      <PaginationControls
        hasNextPage={pageIndex <total}
        hasPrevPage={pageIndex > 1}
        pagetotal={total}
        perpage={perpage}
      />
    </div>
  )
}
export default Home