import Navbar from "@/components/front/Header";
import Main from "@/components/front/main";
import prismadb from "@/lib/prismadb";
import { MantineProvider, createTheme } from '@mantine/core';
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
  return <>
  
   <Main slides={formattedslides}  />
  
   </>;
}
