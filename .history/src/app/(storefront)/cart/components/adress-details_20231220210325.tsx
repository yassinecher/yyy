"use client"
import axios from 'axios';
import React from 'react'

import { Product } from '@/types';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
const Adressdetails = (props:{data:Product[]}) => {

    
    const onCheckout = async () => {
        const response = await axios.post(`/api/checkout`, {
          productIds: props.data.map((item) => item.id)
        });
        
        window.location = response.data.url;
      }
  return (
    <div>Adress-details
     




              <Button disabled={props.data.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  )
}

export default Adressdetails