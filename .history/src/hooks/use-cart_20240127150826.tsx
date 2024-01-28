import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { AlertTriangle } from 'lucide-react';
import { Product } from '@/types';

export type PCCustom = {
  idd:string
  price:number
  motherboard: Product;
  processor: Product;
  gpu: Product;
  ram: Product[];
  disk: Product;
  power: Product;
  case: Product;
  screen?: Product;
  cooling?: Product;
}

// Define a union type that includes both Product and PCCustom
export type CartItem = (Product | PCCustom)&{
  number:number
};

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: CartItem) => {
      // Check if data is a Product

      if ('id' in data) {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) =>'id' in item && item.id === data.id);

        if (existingItem) {
          return toast('Item already in cart.');
        } 

        set({ items: [...get().items, data] });
        toast.success('Item added to cart.');
      }else{
        console.log(  get().items)
        set({ items: [...get().items, data] });
      
        toast.success('Item added to cart.');
      }
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => ('idd' in item && item.idd === id))] });
      set({ items: [...get().items.filter((item) => ('id' in item && item.id === id))] });
      toast.success('Item removed from cart.');
    },
    removeAll: () => set({ items: [] }),
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
