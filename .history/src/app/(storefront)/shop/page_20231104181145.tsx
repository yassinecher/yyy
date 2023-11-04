
import prismadb from '@/lib/prismadb'
import PaginationControls from './_componenets/PaginationControls' 
import Image from 'next/image'
import React from 'react'
import ProductList from '@/components/product-list'
import { Product } from '@/types'
import {Pagination} from "@nextui-org/pagination";
import Sidebar from './_componenets/sideBar'

 const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {


  const page = searchParams['page'] ?? '1'
  const categoryy = searchParams['categorie'] ?? ''
  const search = searchParams['search'] ?? ''
 
  const categorie= await prismadb.category.findMany()
  let pageIndex=1
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  const perpage=10
  if (isNumber(parseInt(page.toString()))&&parseInt(page.toString())>0) {
    pageIndex=parseInt(page.toString())
  }else{
     pageIndex=1
  }

  const prods=await prismadb.product.findMany({
    where :{
        isFeatured:true,
        categoryId:categoryy.toString()
       },
       include:{
         images:true,
         category:true,
         cases:true,
         cpus:true,
         gpus:true,
         memories:true,
         motherboard:true,
         orderItems:true,
         powersupplies:true,
         storages:true,
         additionalDetails:true
       },
     
       take:10,
      
     
  }) 
  console.log(pageIndex)
  const formattedproducts: Product[] = prods.map((item) => ({
    id: item.id,
    name: item.name,
    images:item.images,
    price: parseFloat(item.price.toString()),
    category: item.category,
    description:item.description,
    additionalDetails: item?.additionalDetails
  }));
 
  
  const total=Math.ceil(prods.length/perpage)
  let ski=total*(pageIndex-1)
  if(ski<0){
    ski=0
  }
  return (
    <div className=' dark:bg-[#000000e6] bg-[#ffffffe6] my-10 container rounded-lg'>
       

<Sidebar categories={categorie} title={search.toString()}  items={formattedproducts}  />

<div className='flex items-center justify-end p-7'>

      <PaginationControls
        hasNextPage={pageIndex <total}
        hasPrevPage={pageIndex > 1}
        pagetotal={total}
        perpage={perpage}

        pageindex={pageIndex}
      />
    
</div>

    </div>
  )
}
export default Home