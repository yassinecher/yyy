import Navbar from "@/components/front/Header";
import Main from "@/components/front/main";
import prismadb from "@/lib/prismadb";
import { MantineProvider, createTheme } from '@mantine/core';
import getProducts from "@/actions/get-products";
import { format } from "date-fns";
type SlidesColumn = {
  id: string
  title: string;
  imageUrl: string;
  description: string;
  url: string;
  createdAt: string;
  discount:number;
}
type ProductColumn = {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: Image[]
}
export interface Image {
  id: string;
  url: string;
}
export interface Category {
  id: string;
  name: string;
};
export default async function Home() {
  const slides = await prismadb.slide.findMany({
  });
  const formattedslides: SlidesColumn[] = slides.map((item) => ({
    id: item.id,
    title: item.title,
    description:item.description,
    imageUrl:item.imageUrl,
    url:item.url,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    discount:item.discount
  }));
  const featured = await prismadb.product.findMany({ 
   where :{
    isFeatured:true
   },
   include:{
     images:true,
     category:true
   }
 
   });
   const formattedproducts: ProductColumn[] = featured.map((item) => ({
    id: item.id,
    name: item.name,
    images:item.images,
    price:item.price,
  }));
  return <>
  
   <Main slides={formattedslides} featured={featured} />
  
   </>;
}
