"use client";

import { useEffect, useState } from "react";



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
     {(parseInt(value.toString())).toString()}<div className="pl-2">TND </div> 
    </div>
  );
}

export default Currency;
