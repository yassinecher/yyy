
'use client'
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
const fetchPosts = async (url: string) => {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
  
    return response.json();
  };
const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
     const searchParams = useSearchParams()
    const [dataToDis,setDataToDis]=useState<Product[]|undefined>([])
 
    // Define searchQuery using router.query inside the component.

      const [searchQuery,setSearchQuery]=useState(searchParams.get('q')??"")
      const encodedSearchQuery = encodeURI(searchQuery?? "");
    
      const { data, error } = useSWR<Product[]>(
        `/api/search?q=${encodedSearchQuery}`,
        fetchPosts,
        { revalidateOnFocus: false },
      );



    useEffect(()=>{
console.log (data)
console.log (searchQuery.length)
if(data){
    if(searchQuery.length==0){
        setDataToDis([])
    }else{
        setDataToDis(data)
    }
  
}else{
    setDataToDis(undefined)
}
    },[searchQuery])
      if (error) {
        return <div>Error: {error.message}</div>;
      }
  return (
    <div>
      <Button className='w-full mx-2 ' variant={'outline'} onClick={() => setOpen(!open)}>
        <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Search...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput onValueChange={(e)=>setSearchQuery(e)} placeholder="Type a command or search..." className='border-0 outline-0 focus:outline-none focus:outline-0  focus:outline-transparent focus:border-0 focus:shadow-none ' />
        <CommandList><CommandEmpty>No results found.</CommandEmpty>
                     
      
 
               {dataToDis&& (searchQuery.length!=0) ?( <>    <CommandGroup heading="Results">
                {
                    dataToDis?.map((p)=>{
                        return(<>
                          <CommandItem><div className='flex justify-between w-full items-center'><div className='flex items-center'><Image className='rounded mr-5 w-10 h-10' src={p.images[0].url} alt={'product image'} width={30} height={30}  /> {p.name}</div> <div className='flex items-center'><div>{p.price} TND </div><div className='flex items-center ml-5'><Button variant={'outline'}>view</Button></div></div></div></CommandItem>
                        </>)
                    })
                }  </CommandGroup>

                </>):( <></>)}
           {
            searchQuery.length===0?(<>
             <CommandGroup heading="Suggestions">
           
           <CommandItem>Calendar</CommandItem>
           <CommandItem>Search Emoji</CommandItem>
           <CommandItem>Calculator</CommandItem>
         </CommandGroup>
            </>):(<>
            
            </>)
           }
             
          
      
           
        
      
        
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
