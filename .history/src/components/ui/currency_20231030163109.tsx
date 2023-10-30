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
    <div className="pr-2">TND </div>  {Number(Number(value).toFixed())}
    </div>
  );
}

export default Currency;
