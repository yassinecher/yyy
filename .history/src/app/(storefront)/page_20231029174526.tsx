import Navbar from "@/components/front/Header";
import Main from "@/components/front/main";
import prismadb from "@/lib/prismadb";
import { MantineProvider, createTheme } from '@mantine/core';

export default async function Home() {
  const slides = await prismadb.slide.findMany({
  });
  return <>
  
   <Main/>
  
   </>;
}
