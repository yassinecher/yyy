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
import { Search } from '@/components/ui/search'
import Container from '@/components/ui/container'
import Skeleton from '@/components/ui/skeleton'
import SearchComponent from '@/components/search-filters/motherboard/motherboard-search'
import { Product } from '@prisma/client'

export const Motherboard = () => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
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
        <DialogTrigger asChild >
          <Card className="m-3  ">
            <CardContent>
              <div className='flex flex-col md:flex-row'>
                <button className='md:w-[20%]  m-3 bg-transparent border-transparent hover:bg-transparent hover:border-transparent '>
                  <Card className="   ">
                    <CardHeader>
                      <CardTitle className='text-center'>Carte mére</CardTitle>
                    </CardHeader>
                    <CardContent>



                      <div className='flex align-middle items-center justify-center'>


                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
                          <g data-name="Main Board" fill="currentColor" >
                            <rect width="30" height="2" x="24" y="10" fill="currentColor" ></rect>
                            <rect width="30" height="2" x="24" y="18" fill="currentColor" ></rect>
                            <rect width="30" height="2" x="24" y="26" fill="currentColor" ></rect>
                            <rect width="8" height="4" x="10" y="10" fill="currentColor" ></rect>
                            <path d="M28,36V54H46V36H28Zm3,5a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H33a2,2,0,0,1-2-2Z" fill="currentColor" ></path>
                            <circle cx="53" cy="37" r="1" fill="currentColor" ></circle><circle cx="53" cy="53" r="1" fill="currentColor" ></circle>
                            <rect width="8" height="8" x="10" y="20" fill="currentColor" ></rect><circle cx="53" cy="45" r="1" fill="currentColor" ></circle>
                            <rect width="4" height="4" x="10" y="44" fill="currentColor" ></rect><rect width="4" height="4" x="10" y="38" fill="currentColor" ></rect>
                            <rect width="4" height="4" x="16" y="50" fill="currentColor" ></rect><rect width="8.001" height="8" x="33" y="41" fill="currentColor" ></rect>
                            <rect width="4" height="4" x="16" y="44" fill="currentColor" ></rect><rect width="4" height="4" x="10" y="50" fill="currentColor"></rect>
                            <path d="M5,60H59a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H5A1,1,0,0,0,4,5V59A1,1,0,0,0,5,60Zm43-6a2,2,0,0,1-2,2H28a2,2,0,0,1-2-2V36a2,2,0,0,1,2-2H46a2,2,0,0,1,2,2Zm5,2a3,3,0,1,1,3-3A3,3,0,0,1,53,56Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,48Zm0-8a3,3,0,1,1,3-3A3,3,0,0,1,53,40ZM22,9a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1Zm0,8a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1ZM8,9A1,1,0,0,1,9,8H19a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,19a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1V29a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1ZM8,37a1,1,0,0,1,1-1H21a1,1,0,0,1,1,1V55a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1Z" fill="currentColor" ></path><rect width="4" height="4" x="16" y="38" fill="currentColor" ></rect></g></svg>
                      </div>
                    </CardContent></Card>
                </button>
                <Card className="md:w-[80%]  justify-center flex align-middle items-center m-3 cursor-pointer ">
                  <CardContent className='p-0 '>



                    <div className='color-[#f59e0b] '>

                      <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} version="1.1" x="0px" y="0px" viewBox="0 0 44 55" enable-background="new 0 0 44 44" ><g><path fill="#f59e0b" d="M41.9,21H23V2.1c0-0.6-0.5-1-1-1c-0.6,0-1,0.5-1,1V21H2.1c-0.6,0-1,0.5-1,1s0.5,1,1,1H21v18.8   c0,0.6,0.5,1,1,1c0.6,0,1-0.5,1-1V23h18.8c0.6,0,1-0.5,1-1S42.5,21,41.9,21z" /></g></svg>

                    </div>
                  </CardContent></Card>
              </div>
            </CardContent>
          </Card>


        </DialogTrigger>
        <DialogContent  className='min-w-full min-h-[80%] flex flex-col' >
          <DialogHeader>
            <DialogTitle>
              Carte mére store
            </DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-6 gap-3 h-[70vh]' >
            <div className='col-span-1'>
            <SearchComponent setProducts={ setData} setLoading={setLoading} />
            <Button className='w-full my-3' >Filter</Button>
            </div>
            <div className='col-span-5' >
               {loading===true?<>
               <div>
               <Container>
      <div className="w-full h-full p-8">
      
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />


        </div>
      </div>
    </Container>
               </div>
               </>:<>
                 {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && <p>No results found.</p>}

      {!loading && data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name} -  ${item.price.toString()}</li>
          ))}
        </ul>
      )}
               
               </>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
