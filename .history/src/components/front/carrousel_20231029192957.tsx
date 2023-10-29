import React from 'react';
import { Zoom } from 'react-slideshow-image';
import './Carousel.css'
import 'react-slideshow-image/dist/styles.css';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import Link from 'next/link';


export type SlidesColumn = {
    id: string
    title: string;
    imageUrl: string;
    description: string;
    url: string;
    createdAt: string;
    discount:number
  }
interface SlideshowProps {
    slides: SlidesColumn[];
  }
const Slideshow : React.FC<SlideshowProps> = ({slides} ) => {

  
    return (
        <Card className=' my-10 border-0 p-0 h-[500px] max-sm:h-full max-sm:pb-3 bg-orange-50 dark:bg-black  opacity-90  max-sm:rounded-none  '>
  
  <CardContent className='p-0 m-0'>
 
        <Zoom cssClass='card'  scale={1.4}  duration={5000} infinite canSwipe indicators={true}
  onChange={function noRefCheck(){}}
  onStartChange={function noRefCheck(){}}
  >
        {slides.map((each, index) => (
            <div key={index} style={{ width: "100%" }} className='container flex max-sm:  max-sm:flex-col-reverse flex-row align-middle items-center h-full  '>
                <div className='basis-2/3 p-28 dark:text-white max-sm:p-0 max-sm:flex max-sm:align-middle max-sm:content-center max-sm:flex-col '>
                    <h1 className='font-black tracking-wider text-2xl'>{each.title}</h1>
                    <p className='py-10'>{each.description}</p>
                    
                   <div className='flex items-center'><Link  className='max-sm:w-full'    href={each.url}><Button  className='max-sm:w-full' variant={"default"} >Shop</Button></Link> <Label className='pl-5'>{each.discount>0? <>{each.discount}</>:<></>} </Label></div> 
                </div>
                <div className='basis-1/3 '>
                <img style={{ width: "100%" }} className='slideImage p-10' alt="Slide Image" src={each.imageUrl} />
                </div>
                
            </div>
        ))}
    </Zoom>
  </CardContent>
 
</Card>

       
    );
};

export default Slideshow;