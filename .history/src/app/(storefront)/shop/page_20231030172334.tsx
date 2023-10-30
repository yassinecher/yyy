
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
  const perpage=1
  if (isNumber(parseInt(page.toString()))&&parseInt(page.toString())>0) {
    pageIndex=parseInt(page.toString())
  }else{
     pageIndex=1
  }
  
  const total=Math.ceil( await prismadb.product.count()/perpage)
  let ski=total*(pageIndex-1)
  if(ski<0){
    ski=0
  }
  const prods=await prismadb.product.findMany({
    where :{
        isFeatured:true
       },
       include:{
         images:true,
         category:true
       },
     
       take:perpage,
     
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
        pageindex={pageIndex}
      />
    </div>
  )
}
export default Home