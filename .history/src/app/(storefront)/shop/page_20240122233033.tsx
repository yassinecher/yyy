
import prismadb from '@/lib/prismadb'
import PaginationControls from './_componenets/PaginationControls' 
import Image from 'next/image'
import React, { useEffect } from 'react'
import ProductList from '@/components/product-list'
import { Product } from '@/types'
import {Pagination} from "@nextui-org/pagination";
import Sidebar from './_componenets/sideBar'
import { HeadsetFilters, LaptopFilters, MicFilters, MouseFilters, MousepadFilters, casesFilters, coolingFilters, cpusFilters, gpusFilters, keyboardFilters, memoriesFilters, motherboardFilters, powersuppliesFilters, screensFilters, storagesFilters } from './_componenets/Filters'

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

  const sort = searchParams['sort' ]?? '';
  const maxDt = searchParams['maxDt'] ?? '';
  const minDt = searchParams['minDt'] ?? '';
  // Use the split method to convert the string into an array of words
  const wordList = search.toString().split(' ');
  
 
  let pageIndex=1
  function isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  const perpage=12
  let totalprod=0
  if (isNumber(parseInt(page.toString()))&&parseInt(page.toString())>0) {
    pageIndex=parseInt(page.toString())
  }else{
     pageIndex=1
  }
  let prods
  const whereClause: Record<string, any> = {

  };
  if (search) {
    if(wordList.filter((i)=>i!=' ').length>0){
      whereClause.AND = wordList.filter((i)=>i!=' ').map((word) => ({
        name: {
          contains: word,
          mode: 'insensitive',
        },
      }));
    }else{
      whereClause.name = wordList.filter((i)=>i!=' ').map((word) => ({

          contains: word,
          mode: 'insensitive',
        
      }));
    }
    
  }


  if(maxDt.length>0&&maxDt.length){
    whereClause.price = {
      lte: parseInt(maxDt.toString()),
    };
    if (minDt.length>0&&minDt.length ) {
      whereClause.price = {
        ...(whereClause.price || {}),
        gte: parseInt(minDt.toString()),
      };
    }
  }




  if(categoryy.toString().length>0){
       
    whereClause.category={
      name:categoryy.toString()
      }

      
  }

  prods=await prismadb.product.findMany({
    where:whereClause,
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
      additionalDetails:true,
   
    },
    skip:(perpage*(pageIndex-1)),
    take:perpage,
    
   
}) 
totalprod = await prismadb.product.count({
 where:whereClause,
});

  const categorie= await prismadb.category.findMany({
    where:{
      products:{some:whereClause}
    }
})
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
if(prods.findIndex((e)=>e.gpus.length==1)>-1 ){
  filters[i]=await gpusFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.Headset.length==1)>-1 ){
  filters[i]=await HeadsetFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.Laptop.length==1)>-1 ){
  filters[i]=await LaptopFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.Mic.length==1)>-1 ){
  filters[i]=await MicFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.Mouse.length==1)>-1 ){
  filters[i]=await MouseFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.Mousepad.length==1)>-1 ){
  filters[i]=await MousepadFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.cases.length==1)>-1 ){
  filters[i]=await casesFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.cooling.length==1)>-1 ){
  filters[i]=await coolingFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.keyboard.length==1)>-1 ){
  filters[i]=await keyboardFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.memories.length==1)>-1 ){
  filters[i]=await memoriesFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.powersupplies.length==1)>-1 ){
  filters[i]=await powersuppliesFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.screens.length==1)>-1 ){
  filters[i]=await screensFilters() as unknown as HomeFilter
  i++
  console.log(filters)
}
if(prods.findIndex((e)=>e.storages.length==1)>-1 ){
  filters[i]=await storagesFilters() as unknown as HomeFilter
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
 
  
  const total=Math.ceil(totalprod/perpage)
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
       

<Sidebar   hasNextPage={pageIndex <total}
        hasPrevPage={pageIndex > 1}
        pagetotal={total}
        perpage={perpage}
     
        pageindex={pageIndex} 
        totalprod={totalprod}
        header={header} 
        category={categoryy.toString()}
        filter={filters} 
        isloadingg={false} 
        categories={categorie} 
        titlee={search.toString()}  
        items={formattedproducts}  />


    </div>
  )
}
export default Home