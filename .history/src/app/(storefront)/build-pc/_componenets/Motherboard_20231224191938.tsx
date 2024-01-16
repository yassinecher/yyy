"use client"
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Motherboard = async () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/motherboard?page=${currentPage}`);
      setData(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
        <Card className="w-[200px]   ">
        <CardContent>
        <div className='flex'>
       <button className=' m-3 bg-transparent border-transparent hover:bg-transparent hover:border-transparent '>
       <Card className="w-[200px]   ">
      <CardHeader>
        <CardTitle className='text-center'>Carte mére</CardTitle>
      </CardHeader>
      <CardContent>
     

      
      <div className='flex align-middle items-center justify-center'>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
  <g data-name="Main Board" fill="#000000" >
    <rect width="30" height="2" x="24" y="10" fill="#000000" ></rect>
    <rect width="30" height="2" x="24" y="18" fill="#000000" ></rect>
    <rect width="30" height="2" x="24" y="26" fill="#000000" ></rect>
    <rect width="8" height="4" x="10" y="10" fill="#000000" ></rect>
    <path d="M28,36V54H46V36H28Zm3,5a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H33a2,2,0,0,1-2-2Z" fill="#000000" ></path>
    <circle cx="53" cy="37" r="1" fill="#000000" ></circle><circle cx="53" cy="53" r="1" fill="#000000" ></circle>
    <rect width="8" height="8" x="10" y="20" fill="#000000" ></rect><circle cx="53" cy="45" r="1" fill="#000000" ></circle>
    <rect width="4" height="4" x="10" y="44" fill="#000000" ></rect><rect width="4" height="4" x="10" y="38" fill="#000000" ></rect>
    <rect width="4" height="4" x="16" y="50" fill="#000000" ></rect><rect width="8.001" height="8" x="33" y="41" fill="#000000" ></rect>
    <rect width="4" height="4" x="16" y="44" fill="#000000" ></rect><rect width="4" height="4" x="10" y="50" fill="#000000"></rect>
    <path d="M5,60H59a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H5A1,1,0,0,0,4,5V59A1,1,0,0,0,5,60Zm43-6a2,2,0,0,1-2,2H28a2,2,0,0,1-2-2V36a2,2,0,0,1,2-2H46a2,2,0,0,1,2,2Zm5,2a3,3,0,1,1,3-3A3,3,0,0,1,53,56Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,48Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,40ZM22,9a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1ZM8,9A1,1,0,0,1,9,8H19a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,19a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1V29a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,37a1,1,0,0,1,1-1H21a1,1,0,0,1,1,1V55a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1Z" fill="#000000" ></path><rect width="4" height="4" x="16" y="38" fill="#000000" ></rect></g></svg>
</div>
        </CardContent></Card>
       </button>
       <Card className="w-[200px] m-3 ">
      <CardHeader>
        <CardTitle className='text-center'>Carte mére</CardTitle>
      </CardHeader>
      <CardContent>
     

      
      <div className='flex align-middle items-center justify-center'>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
  <g data-name="Main Board" fill="#000000" >
    <rect width="30" height="2" x="24" y="10" fill="#000000" ></rect>
    <rect width="30" height="2" x="24" y="18" fill="#000000" ></rect>
    <rect width="30" height="2" x="24" y="26" fill="#000000" ></rect>
    <rect width="8" height="4" x="10" y="10" fill="#000000" ></rect>
    <path d="M28,36V54H46V36H28Zm3,5a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H33a2,2,0,0,1-2-2Z" fill="#000000" ></path>
    <circle cx="53" cy="37" r="1" fill="#000000" ></circle><circle cx="53" cy="53" r="1" fill="#000000" ></circle>
    <rect width="8" height="8" x="10" y="20" fill="#000000" ></rect><circle cx="53" cy="45" r="1" fill="#000000" ></circle>
    <rect width="4" height="4" x="10" y="44" fill="#000000" ></rect><rect width="4" height="4" x="10" y="38" fill="#000000" ></rect>
    <rect width="4" height="4" x="16" y="50" fill="#000000" ></rect><rect width="8.001" height="8" x="33" y="41" fill="#000000" ></rect>
    <rect width="4" height="4" x="16" y="44" fill="#000000" ></rect><rect width="4" height="4" x="10" y="50" fill="#000000"></rect>
    <path d="M5,60H59a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H5A1,1,0,0,0,4,5V59A1,1,0,0,0,5,60Zm43-6a2,2,0,0,1-2,2H28a2,2,0,0,1-2-2V36a2,2,0,0,1,2-2H46a2,2,0,0,1,2,2Zm5,2a3,3,0,1,1,3-3A3,3,0,0,1,53,56Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,48Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,40ZM22,9a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1ZM8,9A1,1,0,0,1,9,8H19a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,19a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1V29a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,37a1,1,0,0,1,1-1H21a1,1,0,0,1,1,1V55a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1Z" fill="#000000" ></path><rect width="4" height="4" x="16" y="38" fill="#000000" ></rect></g></svg>
</div>
        </CardContent></Card>
       </div>
        </CardContent>
        </Card>
     
       
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
