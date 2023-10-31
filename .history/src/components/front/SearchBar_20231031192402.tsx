import React, { useState } from 'react';
import { Button } from '../ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import "./Searchbar.css";

import { useRouter } from "next/navigation";
import useSWR from "swr";
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
  const searchQuery = "";
  
  const { data, error } = useSWR<Product[]>(
    `/api/search?q=${searchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false },
  );

  return (
    <div>
      <Button className='w-full mx-2 ' variant={'outline'} onClick={() => setOpen(!open)}>
        <svg className='mr-3' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  
        </svg>
        Search...
      </Button>
      <CommandDialog  open={open} onOpenChange={setOpen}>
        <CommandInput onValueChange={(e) => router.push(`/?q=${e}`)} placeholder="search..." className='border-0 outline-0 focus:outline-none focus:outline-0 focus:outline-transparent focus:border-0 focus:shadow-none ' />
        <CommandList   >
          {searchQuery.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Results">
                {data?.map((p) => (
                  <CommandItem key={p.id}>
                    <div className='flex justify-between w-full items-center'>
                      <div className='flex items-center'>
                        <Image className='rounded mr-5 w-10 h-10' src={p.images[0].url} alt='product image' width={30} height={30}  />
                        {p.name}
                      </div>
                      <div className='flex items-center'>
                        <div>{p.price} TND </div>
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
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
