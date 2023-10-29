import React from 'react'
import './main.css'
import { CardsCarousel } from './carrousel'
import { MantineProvider, createTheme } from '@mantine/core'
function Main() {
    const theme = createTheme({
        /** Put your mantine theme override here */
      });
  return (
    <div className='bg-main'>
          <MantineProvider theme={theme}>
            
   <section>
   <CardsCarousel/>
   </section>
          </MantineProvider>
   </div>
  )
}

export default Main