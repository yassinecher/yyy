
import Image from 'next/image'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Product, Case, Cooling, Cpu, Gpu, HDD, Motherboard, Power, PreCustmizedPc, Prod, RAM } from '@/types';
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
}


const NormalComp: React.FC<nProps> = ({item, motherboards, gpus, cpus, cases, powersupplies, cooling, diks, rams }) => {
  return (
    <div>       
        
        {item? <><div className='flex cursor-pointer flex-col justify-between  bg-slate-100 rounded-lg  text-slate-800  dark:bg-slate-800 dark:text-slate-100'>


<div className='w-full pb-3 group '>
    {
        item.images.length > 0 ? <>

            <div className="aspect-square rounded-xl bg-gray-100 relative">
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
    {item.name} <br />
    {item.price.toString()} TND <br />


    <Sheet>
  <SheetTrigger>Changer</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>


</div>


</div>
</>:<></>}    </div>
  )
}

export default NormalComp