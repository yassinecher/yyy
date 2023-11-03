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
  
  return ( 
    <div className="font-semibold flex">
     {formatter.format(Number(value))}<div className="pl-2"> </div> 
    </div>
  );
}

export default Currency;
