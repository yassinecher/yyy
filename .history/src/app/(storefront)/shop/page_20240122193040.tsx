
import prismadb from '@/lib/prismadb'
import PaginationControls from './_componenets/PaginationControls' 
import Image from 'next/image'
import React, { useEffect } from 'react'
import ProductList from '@/components/product-list'
import { Product } from '@/types'
import {Pagination} from "@nextui-org/pagination";
import Sidebar from './_componenets/sideBar'
import { cpusFilters, motherboardFilters } from './_componenets/Filters'

export type HomeFilter={
  title:String
  data:any[]
}



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
  const perpage=12
  if (isNumber(parseInt(page.toString()))&&parseInt(page.toString())>0) {
    pageIndex=parseInt(page.toString())
  }else{
     pageIndex=1
  }
  let prods
  if(categoryy.length==0){
    prods=await prismadb.product.findMany({
    
         include:{
           motherboard:true,
           cpus:true,
           gpus:true,
           images:true,
           category:true, 
           additionalDetails:true
         },
         skip:(perpage*(pageIndex-1)),
         take:perpage,
    }) 
  }else{
     prods=await prismadb.product.findMany({
      where :{
          category:{name:categoryy.toString()}
         },
         include:{
          motherboard:true,
          cases:true,
          cooling:true,
          Headset:true,
          keyboard:true,
          Laptop:true,
          memories:true,
          Mic:true,
          Mouse:true,
          Mousepad:true,
          powersupplies:true,
          PreBuiltPcmodel:true,
          screens:true,
          storages:true,
          cpus:true,
          gpus:true,
           images:true,
           category:true, 
           additionalDetails:true
         },
         skip:(perpage*(pageIndex-1)),
         take:perpage,
    }) 
  }
 
let filters: any[]=[]
let i=0
if(prods.findIndex((e)=>e.motherboard.length==1)>-1 ){
  filters[i]=await motherboardFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.cpus.length==1)>-1 ){
  filters[i]=await cpusFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}

console.log(prods.findIndex((e)=>e.motherboard))
  const formattedproducts: Product[] = prods.map((item) => ({
    id: item.id,
    name: item.name,
    images:item.images,
    stock:parseInt(item.stock.toString()),
    price: parseFloat(item.price.toString()),
    category: item.category,
    description:item.description,
    additionalDetails: item?.additionalDetails
  }));
 
  
  const total=Math.ceil(await  prismadb.product.count({
    where :{
  
      category:{name:categoryy.toString()}
     },   
  })/perpage)
  console.log(total)
  let ski=total*(pageIndex-1)
  if(ski<0){
    ski=0
  }
  let header='store'
  if(categoryy.length>0){
    header=categoryy.toString()
  }

  const lfilters=filters
  return (
    <div className=' dark:bg-[#000000e6] bg-[#ffffffe6] my-10 container rounded-lg'>
       

<Sidebar header={header}   filter={filters} isloadingg={false} categories={categorie} title={search.toString()}  items={formattedproducts}  />

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