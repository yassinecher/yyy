import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Carousel.css'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const Slideshow = () => {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
 
    return (
        <Card className='m-24 p-0 h-[500px]'>
  
  <CardContent>
 
        <Zoom cssClass='f-full'  scale={1.4}  duration={5000} infinite canSwipe indicators={true}
  onChange={function noRefCheck(){}}
  onStartChange={function noRefCheck(){}}
  >
        {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
                <img style={{ objectFit: "cover", width: "100%" }} alt="Slide Image" src={each} />
            </div>
        ))}
    </Zoom>
  </CardContent>
 
</Card>

       
    );
};

export default Slideshow;