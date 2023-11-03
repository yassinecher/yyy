"use client"
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Product } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Card, CardHeader } from '@/components/ui/card'
import { CardBody, Image } from '@nextui-org/react'
import { ProdCol } from '@/types'
import prismadb from '@/lib/prismadb'

type motherboardpar={
motherboards:ProdCol []
}

const MotherboardCOl: React.FC<motherboardpar> = ({motherboards}) => {
    

    const [searchTerm, setSearchTerm] = useState('');
    const [motherboardList, setSotherboardList] = useState([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);

   
      };
const filteredMotherboards = motherboards.filter((prod) => {
    // You can customize this filter logic based on your requirements.
    // This example filters products whose name contains the search term.
    if(searchTerm.length>0){
        return prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return 
   
  });
  return (
    <div>

          
        <h3 className='font-semibold'>Motherboard</h3>
        <div className='m-5 mx-0 p-3 border-1 border-slate-200  dark:border-slate-800 rounded-lg grid col-span-6'>
            {motherboardList.length==0?<>
            <div className='h-52 w-36 bg-slate-100 rounded-lg  dark:bg-slate-800 flex align-middle items-center '>

            </div>
            </>:   <></>}
             
        </div>
        
      </div>
       

  )
}


export default MotherboardCOl