"use client";

import React, { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'TND',
  signDisplay:"never",

  currencyDisplay: 'none',
  maximumFractionDigits: 0,
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold flex">
      <div className="pr-2">{formatter.format(Number(value))}</div>
      TND
    </div>
  );
};

export default Currency;
