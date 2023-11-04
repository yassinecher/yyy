'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from "@nextui-org/react";
import { Button } from '@mantine/core'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  pagetotal:number
  perpage:number
  pageindex:number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    pagetotal,
    perpage,
    pageindex
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cat= searchParams.get('categorie') ?? ''
  const search= searchParams.get('search-key') ?? ''
  const page = searchParams.get('page') ?? '1'
  const per_page =perpage

  return (
    <div className='flex gap-2'>

<div className="flex flex-col gap-5">
    


      <Pagination
      isCompact showControls
        total={pagetotal}
        color="secondary"
        page={pageindex}
        onChange={(e)=>{
          if(cat.length>0){
              if(search.length>0){
                router.push(`/shop?search-key=${search}&categorie=${cat}&page=${Number(e) }`)
              }else{
                router.push(`/shop?categorie=${cat}page=${Number(e) }`)
              }
          }else{
              router.push(`/shop?page=${Number(e) }`)
          }
           
          
            router.refresh()
        }}
      />
    
    </div>
    
    </div>
  )
}

export default PaginationControls