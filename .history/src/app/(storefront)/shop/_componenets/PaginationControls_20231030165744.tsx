'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  pagetotal:number
  perpage:number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    pagetotal,
    perpage
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page =perpage

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/shop?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        prev page
      </button>

      <div>
        {page} /{pagetotal}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/shop?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        next page
      </button>
    </div>
  )
}

export default PaginationControls