"use client";

import { useEffect, useState } from "react";


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'TND',
});
interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const number =Number(value) ;

  // Convert the number to a string
  const numberString = number.toFixed(3);
  
  // Remove trailing zeros using a regular expression
  const formattedNumberString = numberString.replace('.', '');
  return ( 
    <div className="font-semibold flex">
     {Number(formattedNumberString)}<div className="pl-2"> </div> 
    </div>
  );
}

export default Currency;
