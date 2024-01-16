"use client"
import axios from 'axios';
import React from 'react'

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
const Adressdetails = (props:{data:Product[]}) => {

    
    const onCheckout = async () => {
        const response = await axios.post(`/api/checkout`, {
          productIds: props.data.map((item) => item.id)
        });
        
        window.location = response.data.url;
      }
  return (
    <div>Adress-details


              <Button onClick={onCheckout} disabled={props.data.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  )
}

export default Adressdetails