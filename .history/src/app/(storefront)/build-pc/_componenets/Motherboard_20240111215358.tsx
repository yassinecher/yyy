"use client"
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import React, { MouseEventHandler, useEffect, useState } from 'react'
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

import { Filter, filterItem } from '../page'
import ProductCard from '@/components/ui/product-card'
import Image from 'next/image'
import { Product } from "@/types";
import IconButton from '@/components/ui/icon-button'
import { Expand, ShoppingCart } from 'lucide-react'
import usePreviewModal from '@/hooks/use-preview-modal'
import useCart from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import Currency from '@/components/ui/currency'
import { Fragment } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import {Disclosure, Menu, Transition } from '@headlessui/react'
import { Pagination } from '@nextui-org/pagination'
type checkItem ={
  id: number,
  searchKey:string
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


export type checkItemGroups ={
  motherboardchipset:checkItem[],
  motherboardcpusupport:checkItem[],
  motherboardformat:checkItem[],
  motherboardmanufacturer:checkItem[],
  motherboardramslots:checkItem[],
}
export const Motherboard = (props:{
  motherboardchipset:Filter
  motherboardcpusupport:Filter
  motherboardformat:Filter
  motherboardmanufacturer:Filter,
  motherboardramslots:Filter
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterList,setFilterList]=useState<checkItemGroups>({
    motherboardchipset:[],
  motherboardcpusupport:[],
  motherboardformat:[],
  motherboardmanufacturer:[],
  motherboardramslots:[],
  })


  const [selectedSort, setSelectedSort] = useState('Les plus populaires');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTime, setSearchTime] = useState(0);
  const sortOptions = [
    { name: 'Les plus populaires', href: '#', current: selectedSort === 'Les plus populaires' },
    { name: 'Meilleure note', href: '#', current: selectedSort === 'Meilleure note' },
    { name: 'Les plus récents', href: '#', current: selectedSort === 'Les plus récents' },
    { name: 'Prix : Croissant', href: '#', current: selectedSort === 'Prix : Croissant' },
    { name: 'Prix : Décroissant', href: '#', current: selectedSort === 'Prix : Décroissant' },
  ];
  const [total,setTotal]=useState(0)
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedFilterList = encodeURIComponent(JSON.stringify(filterList));
      const startTime = performance.now();
      // Make a GET request with the encoded filterList in the URL
      const response = await fetch(`/api/motherboard/component?q=${searchTerm}&sort=${selectedSort}&units=10&page=${currentPage}&filterList=${encodedFilterList}`);
      const dataa = await response.json();
      const endTime = performance.now();
     
      // Calculate the time taken
      const timeTaken = ((endTime - startTime)/ 1000);
      setSearchTime(timeTaken)
   
      setData(dataa.data);
      setTotalPages(dataa.total);
      setLoading(false);
      console.log(dataa);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };
    // Function to handle checkbox change
    const handleCheckboxChange = (filterKey: keyof checkItemGroups, value: string) => {
      setFilterList((prevFilterList) => {
        const existingIndex = prevFilterList[filterKey].findIndex((item) => item.searchKey === value);
  
        if (existingIndex !== -1) {
          // If the item exists, remove it from the list
          prevFilterList[filterKey].splice(existingIndex, 1);
        } else {
          // If the item doesn't exist, add it to the list
          prevFilterList[filterKey].push({ id: Date.now(), searchKey: value });
        }
  
        return { ...prevFilterList };
      });
      console.log(filterList)
    };
    const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = (id: any) => {
    router.push(`/product/${id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    
  };
   
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
  };
    

  const handleSortClick = (name: React.SetStateAction<string>) => {
    setSelectedSort(name);
    // Add any additional logic you need when a sort option is clicked
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    fetchData();
  }, []);
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

                      <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} version="1.1" x="0px" y="0px" viewBox="0 0 44 55" ><g><path fill="#f59e0b" d="M41.9,21H23V2.1c0-0.6-0.5-1-1-1c-0.6,0-1,0.5-1,1V21H2.1c-0.6,0-1,0.5-1,1s0.5,1,1,1H21v18.8   c0,0.6,0.5,1,1,1c0.6,0,1-0.5,1-1V23h18.8c0.6,0,1-0.5,1-1S42.5,21,41.9,21z" /></g></svg>

                    </div>
                  </CardContent></Card>
              </div>
            </CardContent>
          </Card>



        </DialogTrigger>
        <DialogContent  className='  min-w-full lg:min-w-[80%] min-h-full lg:min-h-[80%]  flex flex-col' >
          <DialogHeader>
            <DialogTitle>
              <div className='flex justify-between pt-3'>
                <h1>  Carte mére store</h1>
              <Menu as="div" className="relative inline-block text-left pr-5">
                <div className='flex'>
                   <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100">
                    Sort ( <div className='text-sm group inline-flex justify-center pr-3 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100'>{selectedSort } </div>
                )
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-black  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item  key={option.name}>
                          {({ active }) => (
                            <a
                            onClick={() => handleSortClick(option.name)}
                             
                              className={classNames(
                                option.current ? 'cursor-pointer text-[#db8d08] font-medium  dark:text-gray-100' : 'cursor-pointer text-gray-500',
                                active ? 'bg-gray-100  ' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-6 gap-3 h-[70vh]' >
            <div className='col-span-2 overflow-y-auto overflow-x-hidden pr-3'>
            <SearchComponent
            fetchData={fetchData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} 
            setProducts={ setData} 
            setLoading={setLoading}
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            setTotalPages={setTotalPages} 
            totalPages={totalPages} />
            
           {props.motherboardmanufacturer.list.length>0?<>
           <br />
           <div className='text-small'>
           {props.motherboardmanufacturer.title}
           </div>
                  
                {Object.entries(props).map(([filterKey, filter]) => (
        <CheckboxGroup
          key={filterKey}
          label={filter.title.toString()}
          items={filter.list}
          onChange={(value) => handleCheckboxChange(filterKey as keyof checkItemGroups, value)}
          selectedItems={filterList[filterKey as keyof checkItemGroups].map((item) => item.searchKey)}
        />
      ))}
          
           </> :<></>}
        
            
            </div>
            <div className='col-span-4 overflow-y-auto overflow-x-hidden ' >
               {loading===true?<>
               <div>
               <Container>
      <div className="w-full h-full p-8">
      
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />
            <Skeleton className="w-full h-48 rounded-xl" />


        </div>
      </div>
    </Container>
               </div>
               </>:<>
            
                 {loading && <p>Loading...</p>}

      {!loading &&data&& data.length === 0 && <p>No results found.</p>}

      {!loading && data.length > 0 && (
        <> <div className='text-sm'>({totalPages}) Résultats en {searchTime.toFixed(2)} seconds  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.map((item,key) => (
         
          
            <div key={key} className="dark:bg-[#000000e6] bg-[#ffffffe6]  group cursor-pointer rounded-xl border p-3 space-y-1">
           {/* Image & actions */}
           <div className="aspect-square rounded-xl bg-gray-100 dark:bg-transparent relative">
             <Image 
               src={item.images?.[0]?.url} 
               alt="" 
               fill
               className="aspect-square object-cover rounded-md"
             />
             <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
               <div className="flex gap-x-6 justify-center">
                 <IconButton 
                   onClick={(e)=>{onPreview(e);previewModal.onOpen(item) }} 
                   icon={<Expand size={20} className="text-gray-600" />}
                 />
                 <IconButton
                   onClick={(e)=>{onAddToCart(e), cart.addItem(item)}} 
                   icon={<ShoppingCart size={20} className="text-gray-600" />} 
                 />
               </div>
             </div>
           </div>
           {/* Description */}
           <div>
             <p className="font-semibold text-sm">{item.name}</p>
             <p className="text-sm text-gray-500">{item.category?.name}</p>
           </div>
           {/* Price & Reiew */}
           <div className="flex items-center justify-between text-xs">
             <Currency value={item?.price} /> 
           </div>
         </div>
         
              
           
          ))}
     </div>
     </> )}
               
               </>}
            </div>
           

          </div>
          
          <DialogFooter>

            <div className='grid grid-cols-6 gap-4 w-full' >
            <div className='w-full flex justify-end col-span-2 '>
               <Button className=' my-3 pl-10 pr-7 mx-auto w-full' onClick={()=>{
       
       setCurrentPage(0)

       fetchData()
     }} >Filter</Button>
               </div>
               {totalPages>0?  
               <div  className='col-span-4 flex justify-end'>

{!loading && data.length > 0 && (<>

  <Pagination
              
              isCompact showControls
                total={parseInt((totalPages/10).toFixed(0))}
                color="secondary"
                page={currentPage+1}
                onChange={(e)=>{
                setCurrentPage(e-1)
                }}
              /> 
</>)} </div>:<></>}

            </div>
        
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


// You can create a reusable CheckboxGroup component for rendering checkboxes
const CheckboxGroup = (props: {
  label: string;
  items: filterItem[];

  onChange: (value: string) => void;
  selectedItems: string[];
}) => {
  return (
    <div> 
       <br/>
      <p>{props.label}</p>
      {props.items.map((item) => (
        <div key={item.name}>
            <div className='flex items-center appearance-none'>
                <Input type='checkbox' className='appearance-none forced-colors  focus:outline-none focus-visible:outline-none w-3 h-3 m-2 outline-none'
                  value={item.name}
                  checked={props.selectedItems.includes(item.name)}
                  onChange={() => props.onChange(item.name)}
                />
                  <label className='text-sm'>{item.name} ({item.number})</label>
                <div>
              
                </div>
                
                </div>
               
        
        
        </div>
      ))}
    </div>
  );
};