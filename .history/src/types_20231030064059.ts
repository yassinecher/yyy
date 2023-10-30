import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: Decimal;
  images: Image[]
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
