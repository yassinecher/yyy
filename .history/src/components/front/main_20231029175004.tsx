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
function Main( slides:SlidesColumn[] ) {
    const theme = createTheme({
        /** Put your mantine theme override here */
      });
  return (
    <div className='bg-main'>
      
            
   <section>
<Slideshow/>
   </section>
        
   </div>
  )
}

export default Main