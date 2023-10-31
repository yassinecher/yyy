import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import "./Searchbar.css";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Product } from '@/types';
import Image from 'next/image';
import Loading from '@/app/(storefront)/loading';

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw  Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q');
  const [dataa,setdata]=useState<Product[]>([])
  const { data, error, isLoading } = useSWR<Product[]>(
    `/api/search?q=${searchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false },
  );
useEffect(()=>{
  
if(data){
    setdata(data)

}else{setdata([])}
console.log(dataa)


},[data])
  return (
    <div>
      <Button className='w-full mx-2 ' variant={'outline'} onClick={() => setOpen(!open)}>
        <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
       
        </svg>
        Search...
      </Button>
      <CommandDialog  open={open} onOpenChange={setOpen}>
        <CommandInput aria-checked={dataa.length>0} onValueChange={(e) => {
          router.push(`./?q=${e}`);
          console.log(e);
        
          // Log the updated query
        }}  placeholder="search..." className='border-0 outline-0 focus:outline-none focus:outline-0 focus:outline-transparent focus:border-0 focus:shadow-none' />
        <CommandList  >
          <CommandEmpty>No results found.</CommandEmpty>
         
            <CommandGroup heading="Results" content="dazz">
              {dataa?.map((p) => (
                <CommandItem key={p.name}>
                  <div className='flex justify-between w-full items-center'>
                    <div className='flex items-center'>
                      <Image className='rounded mr-5 w-10 h-10' src={p.images[0].url} alt='product image' width={30} height={30} />
                      {p.name}
                    </div>
                    <div className='flex items-center'>
                      <div>{p.price} TND</div>
                      <div className='flex items-center ml-5'>
                        <Button variant={'outline'}>view</Button>
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
        
          <CommandGroup heading="Categories">
            <CommandItem>Gaming PC</CommandItem>
            <CommandItem>Motherboard</CommandItem>
            <CommandItem>PC Case</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
