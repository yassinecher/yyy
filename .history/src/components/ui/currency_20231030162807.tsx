"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('tn-TN', {
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
    <div className="font-semibold">
      {formatter.format(Number(Number(value).toFixed()))}
    </div>
  );
}

export default Currency;
