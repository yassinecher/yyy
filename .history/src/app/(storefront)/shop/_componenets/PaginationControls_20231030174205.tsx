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
            router.push(`/shop?page=${Number(e) }`)
            router.refresh()
        }}
      />
    
    </div>
    
    </div>
  )
}

export default PaginationControls