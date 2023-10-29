import React from 'react';
import { Zoom } from 'react-slideshow-image';
import './Carousel.css'
import 'react-slideshow-image/dist/styles.css';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const Slideshow = () => {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
 
    return (
        <Card className='mx-24 my-10 border-0 p-0 h-[500px] bg-orange-50 dark:bg-black  '>
  
  <CardContent className='p-0 m-0'>
 
        <Zoom cssClass='card'  scale={1.4}  duration={5000} infinite canSwipe indicators={true}
  onChange={function noRefCheck(){}}
  onStartChange={function noRefCheck(){}}
  >
        {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }} className='flex flex-row align-middle items-center h-full'>
                <div className='basis-2/3 p-28'>
                    <h1 className='font-black tracking-wider text-2xl'>Title</h1>
                    <p className='py-10'>azdazdazdazdzadzadza
                    zadazdzadzad
                    zadazdzadzadzadzadzad</p>
                    <Button>Shop</Button>
                </div>
                <div className='basis-1/3'>
                <img style={{ objectFit: "fill", width: "100%" }} className='slideImage' alt="Slide Image" src={each} />
                </div>
                
            </div>
        ))}
    </Zoom>
  </CardContent>
 
</Card>

       
    );
};

export default Slideshow;