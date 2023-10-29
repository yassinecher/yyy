'use client'
import React from 'react'
import './main.css'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core'
import Slideshow from './carrousel';
function Main() {
    const theme = createTheme({
        /** Put your mantine theme override here */
      });
  return (
    <div className='bg-main'>
      
            
   <section>
<Slideshow
   </section>
        
   </div>
  )
}

export default Main