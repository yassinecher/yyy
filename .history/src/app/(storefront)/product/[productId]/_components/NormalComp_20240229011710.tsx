
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Product, Case, Cooling, Cpu, Gpu, HDD, Motherboard, Power, PreCustmizedPc, Prod, RAM } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface  nProps{
item: Prod|undefined
cases?: Case[];
cooling?: Cooling[];
cpus?: Cpu[];
diks?: HDD[];
gpus?: Gpu[];
motherboards?: Motherboard[];
powersupplies?: Power[];
rams?: RAM[];
setItem:(v:Prod | undefined)=>void
}


const NormalComp: React.FC<nProps> = ({item, setItem,motherboards, gpus, cpus, cases, powersupplies, cooling, diks, rams }) => {
  const [open , setOpen]=useState(false)
  return (
    <div>       
        
        {item? <><div className='flex cursor-pointer flex-col h-full justify-between  rounded-lg  '>

<div className='flex flex-col h-full justify-between'>
  <div className='w-full  pb-3 group '>
    {
        item.images.length > 0 ? <>

            <div className="aspect-square rounded-xl  relative">
                <Image
                    src={item.images[0].url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md rounded-b-none"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">

                    </div>
                </div>

            </div>




        </> : <>
            <div className='flex justify-center py-10 border-b-1 border-slate-200'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
                    <g>
                        <path d="M31.5,34.5v443h449v-443H31.5z M57.5,61.5h399v316.478l-57.26-99.177L323,146.747l-76.24,132.053l-23.813,41.246   l-0.706-1.223L179.5,244.795l-42.741,74.029L98.264,385.5H57.5V61.5z" />
                        <circle cx="139" cy="133" r="40.5" />
                    </g>
                </svg>
            </div>


        </>
    }
   <div className=' dark:text-purple-300'>{item.name} </div> 
    {item.price.toString()} TND <br />


</div>

<div>

<Sheet  onOpenChange={(e)=>setOpen(e)} open={open}>
  <SheetTrigger className='w-full'><Button variant={'outline'} className='w-full mt-3 border-purple-500 bg-opacity-70'>Changer</Button></SheetTrigger>
  <SheetContent >
    <SheetHeader>
      <SheetTitle>Vous pouver selection un de ces Produits.</SheetTitle>
     {motherboards?<>
       { motherboards.length==0?<>
       
       Vous Ne pouvez pas changer cette Carte mére
       </>:<>
       <div className=''>
       <div className='max-h-[89vh] pb-3 grid grid-cols-2 gap-2  overflow-y-auto '>
       {motherboards.map((mot)=>{
        return(<>
        {
            mot.products[0].id!=item.id?<>
            <div className='flex flex-col h-full justify-end '>
              <div className='pb-3'>
              <div className="aspect-square rounded-xl  relative">
                <Image
                    src={mot.products[0].images[0].url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md rounded-b-none"
                />
              

            </div>
         
            <div className=' dark:text-purple-300'>   {mot.products[0].name}</div> 
    {   mot.products[0].price.toString()} TND <br />
              </div>
          
            <Button variant={'outline'} onClick={()=>{setItem(mot.products[0]);setOpen(false)}}>Selectionner</Button>
            <Link target='_blanc' className='text-sm underline my-1' href={"/product/"+mot.products[0].id}>
Voir la page de produit
</Link>
            </div>
          
            </>:<>
            
            
            
            </>
        }
 
        
        </>)
     })}
       </div>
       </div>
   
     </>}
    
     </>:<></>}
     {cpus?<>
       { cpus.length==0?<>
       
       Vous Ne pouvez pas changer cette Carte mére
       </>:<>
       <div className=''>
       <div className='max-h-[89vh] pb-3 grid grid-cols-2 gap-2  overflow-y-auto '>
       {cpus.map((mot)=>{
        return(<>
        {
            mot.products[0].id!=item.id?<>
            <div className='flex flex-col h-full justify-end '>
              <div className='pb-3'>
              <div className="aspect-square rounded-xl  relative">
                <Image
                    src={mot.products[0].images[0].url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md rounded-b-none"
                />
              

            </div>
         
            <div className=' dark:text-purple-300'>   {mot.products[0].name}</div> 
    {   mot.products[0].price.toString()} TND <br />
              </div>
          
            <Button variant={'outline'} onClick={()=>{setItem(mot.products[0]);setOpen(false)}}>Selectionner</Button>
            <Link target='_blanc' className='text-sm underline my-1' href={"/product/"+mot.products[0].id}>
Voir la page de produit
</Link>
            </div>
          
            </>:<>
            
            
            
            </>
        }
 
        
        </>)
     })}
       </div>
       </div>
   
     </>}
    
     </>:<></>}
     {cases?<>
       { cases.length==0?<>
       
       Vous Ne pouvez pas changer cette Carte mére
       </>:<>
       <div className=''>
       <div className='max-h-[89vh] pb-3 grid grid-cols-2 gap-2  overflow-y-auto '>
       {cases.map((mot)=>{
        return(<>
        {
            mot.product[0].id!=item.id?<>
            <div className='flex flex-col h-full justify-end '>
              <div className='pb-3'>
              <div className="aspect-square rounded-xl  relative">
                <Image
                    src={mot.product[0].images[0].url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md rounded-b-none"
                />
              

            </div>
         
            <div className=' dark:text-purple-300'>   {mot.product[0].name}</div> 
    {   mot.product[0].price.toString()} TND <br />
              </div>
          
            <Button variant={'outline'} onClick={()=>{setItem(mot.product[0]);setOpen(false)}}>Selectionner</Button>
            <Link target='_blanc' className='text-sm underline my-1' href={"/product/"+mot.product[0].id}>
Voir la page de produit
</Link>
            </div>
          
            </>:<>
            
            
            
            </>
        }
 
        
        </>)
     })}
       </div>
       </div>
   
     </>}
    
     </>:<></>}
    </SheetHeader>
  </SheetContent>
</Sheet>


</div>
</div>

</div>
</>:<>
<Sheet  onOpenChange={(e)=>setOpen(e)} open={open}>
  <SheetTrigger className='w-full'><Button variant={'outline'} className='w-full mt-3 border-purple-500 bg-opacity-70'>Ajouter un Produit</Button></SheetTrigger>
  <SheetContent >
    <SheetHeader>
      <SheetTitle>Vous pouver selection un de ces Produits.</SheetTitle>
     {motherboards?<>
       { motherboards.length==0?<>
       
       Vous Ne pouvez pas changer cette Produit
       </>:<>
       <div className=''>
       <div className='max-h-[89vh] pb-3 grid grid-cols-2 gap-2  overflow-y-auto '>
       {motherboards.map((mot)=>{
        return(<>
        {
           
            <div className='flex flex-col h-full justify-end '>
              <div className='pb-3'>
              <div className="aspect-square rounded-xl  relative">
                <Image
                    src={mot.products[0].images[0].url}
                    alt=""
                    fill
                    className="aspect-square object-cover rounded-md rounded-b-none"
                />
              

            </div>
         
            <div className=' dark:text-purple-300'>   {mot.products[0].name}</div> 
    {   mot.products[0].price.toString()} TND <br />
              </div>
          
            <Button variant={'outline'} onClick={()=>{setItem(mot.products[0]);setOpen(false)}}>Selectionner</Button>
            <Link target='_blanc' className='text-sm underline my-1' href={"/product/"+mot.products[0].id}>
Voir la page de produit
</Link>
            </div>
          
        }
 
        
        </>)
     })}
       </div>
       </div>
   
     </>}
    
     </>:<></>}
    </SheetHeader>
  </SheetContent>
</Sheet></>}    </div>
  )
}

export default NormalComp