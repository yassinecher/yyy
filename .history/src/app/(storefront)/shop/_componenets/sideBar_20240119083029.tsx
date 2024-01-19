'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import { Category } from '@prisma/client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { LoadingOverlay } from '@mantine/core'
import Skeleton from '@/components/ui/skeleton'
import { Filter, filterItem } from '../../build-pc/page'
import { Input } from '@/components/ui/input'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]


function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
  }
  
interface ProductListProps {
  title: String,
  items: Product[],
  categories:Category[]
  isloadingg:boolean
  header:string
  filter:any[]
}
 const Sidebar :React.FC<ProductListProps> = ({
    title,
    items,
    categories,
    isloadingg,
    header,
    filter
  }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categorie,setCategorie]=useState({
    id: 'category',
    name: 'Category',
    options:categories.map((item)=>({
      value:item.name,
      label:item.name,
      checked:false
    }))
  })
  const [isLoading,setIsloading]=useState(isloadingg)
  const [filters, setfilters]=useState([categorie])
  const [filterList, setFilterList] = useState<any>({
   
})
  const router = useRouter()
 const handleCheckboxChange=(val:any,x:any)=>{

 }
  useEffect(()=>{
    filter.map((e)=>{
      Object.entries(e).map(([filterKey, filtera]) => {


        console.log(filtera)})
    }) 
      
  setIsloading(false)
  },[items])
  console.log(filter)
  return (
    <div className="w-full">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black dark:bg-white dark:bg-black  bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-black  py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 ">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-black  p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 dark:border-gray-800">
                  

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 dark:border-gray-800 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-black  px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{header}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100">
                    Sort
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-black  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
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

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
              

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 dark:border-gray-800 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-black  py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                          <RadioGroup   defaultValue="option-one" >
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">

                                <RadioGroupItem onClick={(e)=>{
                              setIsloading(true)
                             router.push(`/shop?categorie=${option.label}`)
                             router.refresh()
                          }} value={option.value}       id={`filter-${section.id}-${optionIdx}`} />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}</RadioGroup>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {
                      filter.map((e)=>{
                        return  Object.entries(e).map(([filterKey, filtera]) => {


                                    // Check if the current property is one of the specified properties
                                    const filterData = filtera as Filter;
                                    console.log(filterData)
                                          if(filterData&&filterData.title&&filterData.list&&filterList[filterKey ]){
                                            return (
                                              <CheckboxGroup
                                                  key={filterKey}
                                                  label={filterData.title.toString()}
                                                  items={filterData.list}
                                                  onChange={(value) => handleCheckboxChange(filterKey , value)}
                                                  selectedItems={filterList[filterKey ].map((item: { searchKey: any }) => item.searchKey)}
                                              />
                                          );
                                          }
                                          return
                                     // Skip rendering for other properties
                                })

                                return
                      })
                }
                
                                
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3"> <div className="space-y-4">
              <h3 className="font-bold text-3xl">{title}</h3>
              {isLoading?<>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />
                <Skeleton className="w-full h-72 rounded-xl" />

                </div>
                
              
              </>:<>
              {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
              </>

              }
     
    </div></div>
            </div>
          </section>
        </main>
      </div>
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
export default Sidebar