'use client'
import React from 'react'
import './main.css'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core'
import Slideshow from './carrousel';
type SlidesColumn = {
  id: string
  title: string;
  imageUrl: string;
  description: string;
  url: string;
  createdAt: string;
}
interface SlideshowProps {
  slides: SlidesColumn[];
}
const Main : React.FC<SlideshowProps> = ({slides} ) => {
    const theme = createTheme({
        /** Put your mantine theme override here */
      });
  return (
    <div className='bg-main'>
      
            
   <section>
<Slideshow slides={slides}/>
   </section>
        
   </div>
  )
}

export default Main