import Gallery from '@/components/gallery';
import Info from '@/components/info';
import {Product, Case, Cooling, Cpu, Gpu, HDD, Motherboard, Power, PreCustmizedPc, Prod, RAM } from '@/types';
import { Table } from '@nextui-org/react';
import {  } from '@prisma/client';
import Image from 'next/image';


import React from 'react'


  interface ProductFormProps {
    cases: Case[];
    cooling: Cooling[];
    cpus: Cpu[];
    diks: HDD[];
    gpus: Gpu[];
    motherboards: Motherboard[];
    powersupplies: Power[];
    rams: RAM[];
    initialData:PreCustmizedPc&Prod
  }
  

const CustomPcTemplate : React.FC<ProductFormProps>= ({initialData,motherboards,gpus,cpus,cases,powersupplies,cooling,diks,rams}) => {
  
  
    const calculePrix=()=>{
        return 5
    }
    const formattedproduct:Product = {
        id: initialData?.id,
        name: initialData?.name,
        images: initialData?.images,
        dicountPrice: parseFloat(initialData.dicountPrice.toString()),
        stock: parseInt(initialData.stock.toString()),
        price:calculePrix(),
        description: initialData.description,
        additionalDetails: [],
        category: {
            id:'',
            name:''
        }
    }
    
   

  
    return (
    <div>  <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
    <div>
    {parseInt(initialData.dicountPrice.toString())>0?<>
<div className=" w-full flex justify-end  ">
<Image src={'/images/remise.png'} className="dark:invisible absolute  z-20 -mr-6 rotate-[25deg] ml-auto" alt="" width={100} height={100} />
<Image src={'/images/remise-dark.png'} className="invisible dark:visible absolute  z-20 -mr-6 rotate-[25deg] ml-auto" alt="" width={100} height={100} />

</div>
</>:<></>}
        <Gallery images={initialData.images} />
    </div>
  
    <div className="mt-10 md:mx-0 sm:mx-0 lg:mx-20 col-span-2 sm:mt-16 sm:px-0 lg:mt-0">
      <Info data={formattedproduct} />
      <Table>

        
      </Table>
    </div>
  </div>
  
  
  
  </div>
  )
}

export default CustomPcTemplate