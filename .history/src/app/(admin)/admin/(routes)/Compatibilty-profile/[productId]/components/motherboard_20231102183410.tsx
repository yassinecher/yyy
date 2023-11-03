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

          
        <div className='sm:w-full md:w-96 w-96'>
            <Input onChange={handleSearch} type='text' value={searchTerm} placeholder='Search'/>
        </div>

            {filteredMotherboards.length>0?         (<>        <div className="rounded-md p-2 w-max flex border-slate-500  border-2 ">{filteredMotherboards.map((prod: { id: React.Key | null | undefined; images: string | any[]; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) => (
          <div className='flex' key={prod.id}>
            {prod.images.length > 0 ? (
              <Image src={prod.images[0].url} className='rounded-none h-20' width={40} height={40} />
            ) : (
              <></>
            )}
            <span>{prod.name}</span>
          </div>
        ))}</div></>) :
            <>
            <div>
                
            </div>
            
            </>

            }
        
      </div>
       

  )
}


export default MotherboardCOl