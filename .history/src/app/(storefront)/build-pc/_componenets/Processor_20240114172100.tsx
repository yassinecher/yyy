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

import { Filter, ProfileType, filterItem } from '../page'
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
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Pagination } from '@nextui-org/pagination'
import { AllProductsCompatibility } from './comps'

type checkItem = {
  id: number,
  searchKey: string
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


export type checkItemGroups = {
  motherboardchipset: checkItem[],
  motherboardcpusupport: checkItem[],
  motherboardformat: checkItem[],
  motherboardmanufacturer: checkItem[],
  motherboardramslots: checkItem[],
}
export const Processor = (props: {
  selectedCompatibility: AllProductsCompatibility | undefined
  setProcessorId: (values: Product) => void;
  processorId: Product | undefined,
  profiles: ProfileType[],
  motherboardchipset: Filter
  motherboardcpusupport: Filter
  motherboardformat: Filter
  motherboardmanufacturer: Filter,
  motherboardramslots: Filter,

}) => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterList, setFilterList] = useState<checkItemGroups>({
    motherboardchipset: [],
    motherboardcpusupport: [],
    motherboardformat: [],
    motherboardmanufacturer: [],
    motherboardramslots: [],
  })


  const [selectedSort, setSelectedSort] = useState('Les plus populaires');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTime, setSearchTime] = useState(0);
  const sortOptions = [
    { name: 'Les plus populaires', href: '#', current: selectedSort === 'Les plus populaires' },
    { name: 'Les plus récents', href: '#', current: selectedSort === 'Les plus récents' },
    { name: 'Prix : Croissant', href: '#', current: selectedSort === 'Prix : Croissant' },
    { name: 'Prix : Décroissant', href: '#', current: selectedSort === 'Prix : Décroissant' },
  ];
  const [total, setTotal] = useState(0)
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedFilterList = encodeURIComponent(JSON.stringify(filterList));
      const startTime = performance.now();
      // Make a GET request with the encoded filterList in the URL
      const response = await fetch(`/api/processor/component?q=${searchTerm}&sort=${selectedSort}&units=10&page=${currentPage}&filterList=${encodedFilterList}`);
      const dataa = await response.json();
      const endTime = performance.now();

      // Calculate the time taken
      const timeTaken = ((endTime - startTime) / 1000);
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
  }, [currentPage, selectedSort]);
  useEffect(() => {
    fetchData();
  }, []);
  const checkcompatibility = (Product: Product) => {


    return true
  }
  const [openDialog, steOpenDialog] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div>
      <Card className="m-3" >
        <CardContent>
          <div className='flex lg:flex-row flex-col '>
            <button onClick={() => steOpenDialog(true)} className='lg:w-1/5 w-full min-w-md:max-w-lg  m-3 bg-transparent border-transparent hover:bg-transparent hover:border-transparent '>
              <Card className="   ">
                <CardHeader>
                  <CardTitle className='text-center'>Processeur</CardTitle>
                </CardHeader>
                <CardContent>



                  <div className='flex align-middle items-center justify-center'>

                    <svg fill="currentColor" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426 426">
                      <g>
                        <path d="M416,176.619c5.523,0,10-4.477,10-10s-4.477-10-10-10h-49.152v-26.381H416c5.523,0,10-4.477,10-10s-4.477-10-10-10h-49.152   V69.152c0-5.523-4.477-10-10-10h-41.086V10c0-5.523-4.477-10-10-10s-10,4.477-10,10v49.152H269.38V10c0-5.523-4.477-10-10-10   s-10,4.477-10,10v49.152H223V10c0-5.523-4.477-10-10-10s-10,4.477-10,10v49.152h-26.381V10c0-5.523-4.477-10-10-10s-10,4.477-10,10   v49.152h-26.381V10c0-5.523-4.477-10-10-10s-10,4.477-10,10v49.152H69.152c-5.523,0-10,4.477-10,10v41.086H10   c-5.523,0-10,4.477-10,10s4.477,10,10,10h49.152v26.381H10c-5.523,0-10,4.477-10,10s4.477,10,10,10h49.152V203H10   c-5.523,0-10,4.477-10,10s4.477,10,10,10h49.152v26.381H10c-5.523,0-10,4.477-10,10s4.477,10,10,10h49.152v26.381H10   c-5.523,0-10,4.477-10,10s4.477,10,10,10h49.152v41.086c0,5.523,4.477,10,10,10h41.086V416c0,5.523,4.477,10,10,10s10-4.477,10-10   v-49.152h26.381V416c0,5.523,4.477,10,10,10s10-4.477,10-10v-49.152H203V416c0,5.523,4.477,10,10,10s10-4.477,10-10v-49.152h26.38   V416c0,5.523,4.477,10,10,10s10-4.477,10-10v-49.152h26.381V416c0,5.523,4.477,10,10,10s10-4.477,10-10v-49.152h41.086   c5.523,0,10-4.477,10-10v-41.086H416c5.523,0,10-4.477,10-10s-4.477-10-10-10h-49.152v-26.381H416c5.523,0,10-4.477,10-10   s-4.477-10-10-10h-49.152V223H416c5.523,0,10-4.477,10-10s-4.477-10-10-10h-49.152v-26.381H416z M346.848,203h-8.821   c-5.523,0-10,4.477-10,10s4.477,10,10,10h8.821v26.381h-8.821c-5.523,0-10,4.477-10,10s4.477,10,10,10h8.821v26.381h-8.821   c-5.523,0-10,4.477-10,10s4.477,10,10,10h8.821v31.086h-31.086v-8.821c0-5.523-4.477-10-10-10s-10,4.477-10,10v8.821H269.38v-8.821   c0-5.523-4.477-10-10-10s-10,4.477-10,10v8.821H223v-8.821c0-5.523-4.477-10-10-10s-10,4.477-10,10v8.821h-26.381v-8.821   c0-5.523-4.477-10-10-10s-10,4.477-10,10v8.821h-26.381v-8.821c0-5.523-4.477-10-10-10s-10,4.477-10,10v8.821H79.152v-31.086h8.821   c5.523,0,10-4.477,10-10s-4.477-10-10-10h-8.821v-26.381h8.821c5.523,0,10-4.477,10-10s-4.477-10-10-10h-8.821V223h8.821   c5.523,0,10-4.477,10-10s-4.477-10-10-10h-8.821v-26.381h8.821c5.523,0,10-4.477,10-10s-4.477-10-10-10h-8.821v-26.381h8.821   c5.523,0,10-4.477,10-10s-4.477-10-10-10h-8.821V79.152h31.086v8.821c0,5.523,4.477,10,10,10s10-4.477,10-10v-8.821h26.381v8.821   c0,5.523,4.477,10,10,10s10-4.477,10-10v-8.821H203v8.821c0,5.523,4.477,10,10,10s10-4.477,10-10v-8.821h26.38v8.821   c0,5.523,4.477,10,10,10s10-4.477,10-10v-8.821h26.381v8.821c0,5.523,4.477,10,10,10s10-4.477,10-10v-8.821h31.086v31.086h-8.821   c-5.523,0-10,4.477-10,10s4.477,10,10,10h8.821v26.381h-8.821c-5.523,0-10,4.477-10,10s4.477,10,10,10h8.821V203z" />
                        <path d="m266.774,149.225h-107.549c-5.523,0-10,4.477-10,10v107.55c0,5.523 4.477,10 10,10h107.549c5.523,0 10-4.477 10-10v-107.55c0-5.523-4.477-10-10-10zm-10,107.55h-87.549v-87.55h87.549v87.55z" />
                      </g>
                    </svg>
                  </div>
                </CardContent></Card>
            </button>
            <Card className="lg:w-4/5 w-full min-w-md:max-w-lg justify-center flex align-middle items-center m-3">
              <CardContent className='p-0 w-full h-full'>

                {props.processorId ? <>
                  <div className="dark:bg-[#000000e6] bg-[#ffffffe6] flex flex-row justify-between group items-center rounded-xl space-x-3">
                    {/* Image & actions */}
                    <div className="flex-shrink-0">
                      <div className="aspect-square rounded-xl bg-gray-100 ml-3 dark:bg-transparent relative" style={{ height: '150px' }}>
                        <Image
                          src={props.processorId.images?.[0]?.url}
                          alt=""
                          fill
                          className="aspect-square object-cover rounded-md h-full w-full"
                        />
                        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                          {/* Add your actions or content here */}
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="flex-grow  p-3">
                      <p className="font-semibold text-sm ">{props.processorId.name}</p>
                      <p className="text-xs text-gray-500">
                        {showFullDescription ? props.processorId.description : `${props.processorId.description.slice(0, 100)}...`}
                        {props.processorId.description.length > 100 && (
                          <span className=" font-bold  cursor-pointer" onClick={toggleDescription}>
                            {showFullDescription ? ' See Less' : ' See More'}
                          </span>
                        )}
                      </p>  </div>
                    {/* Compatiblité */}
                    {props.selectedCompatibility ? <>
                      <div className="">
                        <div className='font-bold my-2'>
                        Compatibilité:
                        </div>
              
                        <div className="text-left grid grid-cols-3 text-xs max-w-screen-md mx-auto border border-gray-300 rounded">
  <div className="p-3 border-b border-r border-gray-300">
    <p className={`mb-3 ${props.selectedCompatibility.processorCompatibility.motherboardCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Carte mère compatibilité
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.motherboardCompatibility.error ? 'text-red-600' : 'text-green-600'}>
      : {props.selectedCompatibility.processorCompatibility.motherboardCompatibility.message}
    </p>
  </div>

  <div className="p-3 border-b border-r border-gray-300">
    <p className={`mb-3 ${props.selectedCompatibility.processorCompatibility.ramCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Ram compatibilité
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.ramCompatibility.error ? 'text-red-600' : 'text-green-600'}>
      : {props.selectedCompatibility.processorCompatibility.ramCompatibility.message}
    </p>
  </div>

  <div className="p-3 border-b border-gray-300">
    <p className={`mb-3 ${props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Disque dur compatibilité
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.error ? 'text-red-600' : 'text-green-600'}>
      : {props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.message}
    </p>
  </div>

  <div className="p-3 border-b border-r border-gray-300">
    <p className={`mb-3 ${props.selectedCompatibility.processorCompatibility.powerCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Boîte d'alimentation compatibilité
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.powerCompatibility.error ? 'text-red-600' : 'text-green-600'}>
      : {props.selectedCompatibility.processorCompatibility.powerCompatibility.message}
    </p>
  </div>

  <div className="p-3 border-b border-r border-gray-300">
    <p className={`mb-3 ${props.selectedCompatibility.processorCompatibility.caseCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Boîtier compatibilité
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.caseCompatibility.error ? 'text-red-600' : 'text-green-600'}>
      : {props.selectedCompatibility.processorCompatibility.caseCompatibility.message}
    </p>
  </div>
</div>




                      </div>
                    </> : <></>}
                    {/* Price & Review */}
                    <div className="flex-shrink-0  p-3">
                      <div className=' text-center flex flex-col   '>
                        <div className='p-3 '>
                          <Currency value={props.processorId?.price} />
                        </div>
                        <Button onClick={() => steOpenDialog(!openDialog)}>Changer</Button>
                        <a href="zz" className='underline mt-2' target='_blank'>
                          Voir en store
                        </a>

                      </div>

                    </div>
                  </div>

                </> : <>
                  <div onClick={() => steOpenDialog(!openDialog)} className='color-[#f59e0b]  cursor-pointer  w-full h-full flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} version="1.1" x="0px" y="0px" viewBox="0 0 44 55" ><g><path fill="#f59e0b" d="M41.9,21H23V2.1c0-0.6-0.5-1-1-1c-0.6,0-1,0.5-1,1V21H2.1c-0.6,0-1,0.5-1,1s0.5,1,1,1H21v18.8   c0,0.6,0.5,1,1,1c0.6,0,1-0.5,1-1V23h18.8c0.6,0,1-0.5,1-1S42.5,21,41.9,21z" /></g></svg>


                  </div>
                </>}


              </CardContent></Card>
          </div>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onOpenChange={() => steOpenDialog(!openDialog)}>
        <DialogTrigger asChild >



        </DialogTrigger>
        <DialogContent className='  min-w-full lg:min-w-[80%] min-h-full lg:min-h-[80%]  flex flex-col' >
          <DialogHeader>
            <DialogTitle>
              <div className='flex justify-between pt-3'>
                <h1>  Processeur store</h1>
                <Menu as="div" className="relative inline-block text-left pr-5">
                  <div className='flex'>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100">
                      Sort ( <div className='text-sm group inline-flex justify-center  font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100'>{selectedSort} </div>
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
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                onClick={() => {
                                  handleSortClick(option.name)
                                  setCurrentPage(0)
                                }}

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
                setProducts={setData}
                setLoading={setLoading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
                totalPages={totalPages} />

              {props.motherboardmanufacturer.list.length > 0 ? <>
                <br />
                <div className='text-small'>
                  {props.motherboardmanufacturer.title}
                </div>

                {Object.entries(props).map(([filterKey, filter]) => {
                  // Check if the current property is one of the specified properties
                  if (['motherboardchipset', 'motherboardcpusupport', 'motherboardformat', 'motherboardmanufacturer', 'motherboardramslots'].includes(filterKey)) {
                    // Type assertion to ensure 'filter' is of the expected type
                    const filterData = filter as Filter;

                    return (
                      <CheckboxGroup
                        key={filterKey}
                        label={filterData.title.toString()}
                        items={filterData.list}
                        onChange={(value) => handleCheckboxChange(filterKey as keyof checkItemGroups, value)}
                        selectedItems={filterList[filterKey as keyof checkItemGroups].map((item) => item.searchKey)}
                      />
                    );
                  }

                  return null; // Skip rendering for other properties
                })}
              </> : <></>}


            </div>
            <div className='col-span-4 overflow-y-auto overflow-x-hidden ' >
              {loading === true ? <>
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
              </> : <>

                {loading && <p>Loading...</p>}

                {!loading && data && data.length === 0 && <p>No results found.</p>}

                {!loading && data.length > 0 && (
                  <> <div className='text-sm'>({totalPages}) Résultats en {searchTime.toFixed(2)} seconds  </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {data.map((item, key) => (


                        <div key={key} className="dark:bg-[#000000e6] bg-[#ffffffe6] flex flex-col justify-between group cursor-pointer rounded-xl border p-3 space-y-1">
                          {/* Image & actions */}
                          <div>
                            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-transparent relative">
                              <Image
                                src={item.images?.[0]?.url}
                                alt=""
                                fill
                                className="aspect-square object-cover rounded-md"
                              />
                              <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">

                              </div>
                            </div>
                            {/* Description */}
                            <div>
                              <p className="font-semibold text-sm ">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.category?.name}</p>
                            </div>
                            {/* Price & Reiew */}
                            <div className="flex items-center justify-between text-xs">
                              <Currency value={item?.price} />
                            </div>
                          </div>

                          <Button type='submit' onClick={() => { props.setProcessorId(item); steOpenDialog(false) }} className={'w-full ' + `${checkcompatibility(item) ? 'bg-green-400 hover:bg-green-600 ' : 'bg-red-400 hover:bg-red-600'}`}>Ajouter</Button>
                        </div>



                      ))}
                    </div>
                  </>)}

              </>}
            </div>


          </div>

          <DialogFooter>

            <div className='grid grid-cols-6 gap-4 w-full' >
              <div className='w-full flex justify-end col-span-2 '>
                <Button className=' my-3 pl-10 pr-7 mx-auto w-full' onClick={() => {

                  setCurrentPage(0)

                  fetchData()
                }} >Filter</Button>
              </div>
              {totalPages > 0 ?
                <div className='col-span-4 flex justify-end'>

                  {!loading && data.length > 0 && (<>

                    <Pagination

                      isCompact showControls
                      total={parseInt((totalPages / 10).toFixed(0))}
                      color="secondary"
                      page={currentPage + 1}
                      onChange={(e) => {
                        setCurrentPage(e - 1)
                      }}
                    />
                  </>)} </div> : <></>}

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
      <br />
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