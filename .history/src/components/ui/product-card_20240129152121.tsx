"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency  from "@/components/ui/currency";
import IconButton  from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart, { CartItem } from "@/hooks/use-cart";
import { Product } from "@/types";

export interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    const data1:CartItem={...data,number:1}
    cart.addItem(data1);
  };
  
  return ( 
    <div onClick={handleClick} className="dark:bg-[#000000e6] bg-[#ffffffe6]  group cursor-pointer rounded-xl border p-3 ">
      {/* Image & actions */}

    {data.dicountPrice>0?<>
    <div className=" w-full flex justify-end  ">
    <Image src={'/images/remise.png'} className="dark:invisible absolute  z-50 -mr-3 -mt-3 rotate-[25deg] ml-auto" alt="" width={70} height={70} />
    <Image src={'/images/remise-dark.png'} className="dark:visible absolute  z-50 -mr-3 -mt-3 rotate-[25deg] ml-auto" alt="" width={70} height={70} />
  
    </div>
     </>:<></>}
     <div className="space-y-4">
     <div className="aspect-square rounded-xl bg-gray-100 dark:bg-transparent relative">
        <Image 
          src={data.images?.[0]?.url} 
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div> 
      {/* Price & Reiew */}
      <div className="flex items-center justify-between text-sm h-3">
      {data?.dicountPrice>0?<><span className=" text-red-500 border-red-400 border-opacity-30 strikethrough"><Currency value={data?.dicountPrice} /> </span>  </>:<></>} <Currency value={data?.price} /> 
       </div>
</div>
 
    </div>
  );
}

export default ProductCard;
