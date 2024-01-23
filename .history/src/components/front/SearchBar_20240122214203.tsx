import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import "./Searchbar.css";

import { useRouter } from "next/navigation";      // Importing from the correct package
import useSWR from "swr";
import { Loader } from '../ui/loader';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import Image from 'next/image';
import { Expand, Eye,Loader2 } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import { Icon } from '@radix-ui/react-select';
import IconButton from '../ui/icon-button';
import { Category } from '@prisma/client';
import { get } from 'http';

const fetchPosts = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
};
const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const [cats, setcats] = useState<Category[]| undefined>([]);
    const router = useRouter();
    const searchParams = useSearchParams()
    const [dataToDis, setDataToDis] = useState<Product[] | undefined>([])

    // Define searchQuery using router.query inside the component.

    const [searchQuery, setSearchQuery] = useState("")
    const encodedSearchQuery = encodeURI(searchQuery ?? "");

    const { data, error, isLoading } = useSWR<Product[]>(
        `/api/search?q=${searchQuery}`,
        fetchPosts,
        { revalidateOnFocus: true },
    );
  
    useEffect(() => {
        const fetcha = async () => {
            try {
               
             

                const response = await fetch(`api/categories`)
                const dataa = await response.json(); 
                const data=dataa as unknown as Category[]
                console.log(data.slice(0,4));
                setcats(data.slice(0,4));
            } catch (error) {
                console.error(error);
            }
        };
    
        fetcha(); // Call the asynchronous function
    
        // Since the dependency array is empty, this effect runs once after the initial render
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <Button className='w-full mx-2 ' variant={'outline'} onClick={() => setOpen(!open)}>
                <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
                Search...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput onValueChange={(e) => setSearchQuery(e)} placeholder="search..." className='border-0 outline-0 focus:outline-none focus:outline-0  focus:outline-transparent focus:border-0 focus:shadow-none ' />
                <CommandList   >
                    {
                        isLoading == true ?
                            <CommandEmpty><div className='flex items-center align-middle w-full '><LoaderIcon className='mx-auto' /></div></CommandEmpty>
                            : <></>
                    }

                    {
                        data&&data?.length>0 ? <CommandGroup heading="Results">

                            {
                                data?.map((p) => {
                                    return (<>
                                        <CommandItem value={p.name} ><div onClick={()=>{router.push(`/product/${p.id}`);setOpen(false);setSearchQuery('')} } className='flex justify-between w-full items-center'>
                                            <div className='flex items-center'>
                                                {p.images.length>0 ? <Image className='rounded mr-5 w-10 h-10' src={p.images[0].url} alt={'product image'} width={30} height={30} /> :<></>}
                                               
                                                {p.name}</div> <div className='flex items-center'><div>{p.price} TND </div><div className='flex items-center ml-5'>
                                                   
                                                          <IconButton onClick={()=>{router.push(`/product/${p.id}`);setOpen(false);setSearchQuery('')}}  className=' bg-white bg-opacity-20'

              icon={<Eye size={15} className="text-black" />}
            />
                                        </div></div></div></CommandItem>
                                    </>)
                                })
                            }

                        </CommandGroup> : <></>
                    }



                    <CommandGroup heading="Cathegories">
                           {
                            cats?<>
                            {cats.map((e)=>{
                                <CommandItem >Gaming Pc</CommandItem>


                            })}
                            
                            </>:<></>
                           }
                        
                    </CommandGroup>






                </CommandList>
            </CommandDialog>
        </div>
    );
};

export default SearchBar;