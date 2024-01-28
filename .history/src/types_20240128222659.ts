
export interface Product {
  id: string;
  category: Category;
  dicountPrice: number;
  name: string;
  price: number;
  description:string
  images: Image[]
  additionalDetails:Field[] 
  stock:number
};

export interface Image {
  id: string;
  url: string;
}
export interface Field {
  id: string;
  name: string;
  value: string;
}


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

export interface ProdCol {
  id: string;
  name: string;
  price: number;
  description:string
  images: Image[]
};
