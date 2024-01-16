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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type checkItem = {
  id: number,
  searchKey: string
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


export type checkItemGroupsCPU = {
  cPUSupport: checkItem[],
  processorModel: checkItem[],
}
export const Processor = (props: {
  selectedCompatibility: AllProductsCompatibility | undefined
  setProcessorId: (values: Product) => void;
  processorId: Product | undefined,
  profiles: ProfileType[],
  processorModel: Filter
  cPUSupport: Filter
  motherboardId: Product | undefined,
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState< number[]>([0, 5000]);
 
  const [filterList, setFilterList] = useState<checkItemGroupsCPU>({
    cPUSupport: [],
    processorModel: [],
  })


  const [selectedSort, setSelectedSort] = useState('Les plus populaires');
  const [searchTerm, setSearchTerm] = useState('');
  const [compatible, setcompatible] = useState(false);
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
      const response = await fetch(`/api/processor/component?minDt=${priceFilter[0]}&maxDt=${priceFilter[1]}&q=${searchTerm}&sort=${selectedSort}&units=10&page=${currentPage}&filterList=${encodedFilterList}${compatible && props.motherboardId ? `&motherboardId=${props.motherboardId.id}` : ''}`);
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
  const handleCheckboxChange = (filterKey: keyof checkItemGroupsCPU, value: string) => {
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
  function haveCommonElement<T>(set1: T[], array2: T[]): boolean {
    const array1 = Array.from(set1);

    for (const item of array1) {
        if (array2.includes(item)) {
            return true;
        }
    }

    return false;
}
  const checkcompatibility = (Product: Product) => {
    const mb=props.motherboardId
    if(mb){
        const MProfiles = props.profiles.filter((e) => e.motherboards.find((ee) => ee.productId == mb.id))

        const PProfiles = props.profiles.filter((e) => e.CPUs.find((ee) => ee.productId == Product.id))
              
        if(haveCommonElement(MProfiles,PProfiles)){
             return true
        }
        return false
    }

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
                  <CardTitle className='text-center'>Bloc d'alimentation
                  <p className='text-xs text-[#f59e0b] p-1'>(*Obligatoire)</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>



                  <div className='flex align-middle items-center justify-center'>
                  <svg width="100" height="100" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M152,16V120H88V311.005l104,96v89H320V407.005l104-96V120H360V16H328V120H184V16ZM392,152V297L288,393V464H224V393L120,297V152Z" />
                  </svg>
                  </div>
                </CardContent></Card>
            </button>
            <Card className="lg:w-4/5 w-full min-w-md:max-w-lg justify-center flex  md:flex-row flex-col align-middle items-center m-3">
              <CardContent className='p-0 w-full h-full'>

                {props.processorId ? <>
                  <div className="dark:bg-[#000000e6] bg-[#ffffffe6] flex md:flex-row flex-col justify-between group items-center rounded-xl space-x-3">
                    {/* Image & actions */}
                    <div className="flex-shrink-0">
                      <div className="aspect-square mt-3 rounded-xl bg-gray-100 ml-3 dark:bg-transparent relative" style={{ height: '150px' }}>
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
                      <div className="w-4/5">
                        <div className='font-bold my-2 text-sm'>
                        Compatibilité:
                        </div>
              
                        <div className="text-left  grid  text-xs max-w-screen-md mx-auto border border-gray-300 rounded mb-3 mr-3">
  <div className="p-1 pl-3 border-b  border-gray-300 hover:dark:bg-slate-950 hover:bg-amber-50 hover:bg-opacity-40  hover:font-bold cursor-pointer">
    <p className={`mb-1 ${props.selectedCompatibility.processorCompatibility.motherboardCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Carte mère :
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.motherboardCompatibility.error ? 'text-red-600' : 'text-green-600'}>
       {props.selectedCompatibility.processorCompatibility.motherboardCompatibility.message}
    </p>
  </div>

  <div className="p-1 pl-3 border-b  border-gray-300 hover:dark:bg-slate-950 hover:bg-amber-50 hover:bg-opacity-40  hover:font-bold cursor-pointer">
    <p className={`mb-1 ${props.selectedCompatibility.processorCompatibility.ramCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Ram :
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.ramCompatibility.error ? 'text-red-600' : 'text-green-600'}>
       {props.selectedCompatibility.processorCompatibility.ramCompatibility.message}
    </p>
  </div>

  <div className="p-1 pl-3 border-b border-gray-300 hover:dark:bg-slate-950 hover:bg-amber-50 hover:bg-opacity-40  hover:font-bold cursor-pointer">
    <p className={`mb-1 ${props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Disque dur compatibilité :
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.error ? 'text-red-600' : 'text-green-600'}>
       {props.selectedCompatibility.processorCompatibility.hardDiskCompatibility.message}
    </p>
  </div>

  <div className="p-1 pl-3 border-b border-gray-300 hover:dark:bg-slate-950 hover:bg-amber-50 hover:bg-opacity-40  hover:font-bold cursor-pointer">
    <p className={`mb-1 ${props.selectedCompatibility.processorCompatibility.powerCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Boîte d&apos;alimentation compatibilité :
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.powerCompatibility.error ? 'text-red-600' : 'text-green-600'}>
       {props.selectedCompatibility.processorCompatibility.powerCompatibility.message}
    </p>
  </div>

  <div className="p-1 pl-3  border-gray-300 hover:dark:bg-slate-950 hover:bg-amber-50 hover:bg-opacity-40  hover:font-bold cursor-pointer">
    <p className={`mb-1 ${props.selectedCompatibility.processorCompatibility.caseCompatibility.error ? 'text-red-600' : 'text-green-600'}`}>
      Boîtier compatibilité :
    </p>
    <p className={props.selectedCompatibility.processorCompatibility.caseCompatibility.error ? 'text-red-600' : 'text-green-600'}>
       {props.selectedCompatibility.processorCompatibility.caseCompatibility.message}
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
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
                fetchData={fetchData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                
                setLoading={setLoading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
                totalPages={totalPages} />
 

              {props.processorModel.list.length > 0 ? <>
                <br />
                {
                  props.motherboardId?<>
                        <div >
          <div className='flex items-center appearance-none'>
            <Input type='checkbox' className='appearance-none forced-colors  focus:outline-none focus-visible:outline-none w-3 h-3 m-2 outline-none'
              
              checked={compatible}
              onChange={(e) => setcompatible(e.target.checked)}
            />
            <label className='text-sm'>Compatible avec Carte mére</label>
            <div>

            </div>

          </div>



        </div>   
                  </>:<></>
                }
          
                {Object.entries(props).map(([filterKey, filter]) => {
                  // Check if the current property is one of the specified properties
                  if (['processorModel', 'cPUSupport'].includes(filterKey)) {
                    // Type assertion to ensure 'filter' is of the expected type
                    const filterData = filter as Filter;

                    return (
                      <CheckboxGroup
                        key={filterKey}
                        label={filterData.title.toString()}
                        items={filterData.list}
                        onChange={(value) => handleCheckboxChange(filterKey as keyof checkItemGroupsCPU, value)}
                        selectedItems={filterList[filterKey as keyof checkItemGroupsCPU].map((item) => item.searchKey)}
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
                          <Popover>
  <PopoverTrigger><Button variant={'ghost'}  className='my-2 w-full border'>Details</Button></PopoverTrigger>
  <PopoverContent>
    <Label className='font-bold'>Description :</Label>
    <p className='text-sm'>
    {item.description}
    </p>

  </PopoverContent>
</Popover>
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