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
     


    <Dialog>
      <DialogTrigger asChild>
        <Button  disabled={props.data.length === 0} className="w-full mt-6" >Checkout</Button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[425px] w-4/5">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

           
    </div>
  )
}

export default Adressdetails