import prismadb from '@/lib/prismadb'
import axios from 'axios'
import React from 'react'

export const Motherboard = async() => {
  const mothernoard = await prismadb.product.findMany({
    where: {
      motherboard: {
        some: {}
      }
    }
  });
  return (
    <div>

    </div>
  )
}
