import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart, { PCCustom } from "@/hooks/use-cart";
import { Product } from "@/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


interface CartItemProps {
  data: PCCustom; 
}

const PcCartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.idd);
  };
  
  return ( 
    <li className="flex py-6 border-b">
      <Card className="w-full">
        <CardTitle>
        <div className=" relative p-3 flex justify-between">
            <p className=" text-lg font-semibold text-black">
              PC personalisé
            </p>
            <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
           </div>
          </div>
      
        </CardTitle>
        <CardContent>
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.case.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        

          <div className="mt-1 flex text-sm">
           
          </div>
          <Currency value={data.price} />
        </div>
      </div>
        </CardContent>
      </Card>
    
    </li>
  );
}
 
export default PcCartItem;
