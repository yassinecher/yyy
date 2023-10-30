
import prismadb from '@/lib/prismadb'
import PaginationControls from './_componenets/PaginationControls' 
import Image from 'next/image'
import React from 'react'
import ProductList from '@/components/product-list'
import { Product } from '@/types'



 const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {


  const page = searchParams['page'] ?? '1'
  let pageIndex=1
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  const perpage=10
  if (isNumber(parseInt(page.toString()))) {
    pageIndex=parseInt(page.toString())
  }

  const total=Math.ceil( await prismadb.product.count()/perpage)
  const ski=total*(pageIndex-1)
  const prods=await prismadb.product.findMany({
    where :{
        isFeatured:true
       },
       include:{
         images:true,
         category:true
       },
       skip:ski,
       take:perpage
  }) 
  const formattedproducts: Product[] = prods.map((item) => ({
    id: item.id,
    name: item.name,
    images:item.images,
    price: parseFloat(item.price.toString()),
    category: item.category,
    description:item.description

  }));
  return (
    <div className='flex flex-col gap-2 items-center'>
       


       <ProductList items={formattedproducts} title=''/>
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