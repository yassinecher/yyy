
export interface Product {
  id: string;
  category: Category;
  name: string;
  price: Number;
  images: Image[]
};

export interface Image {
  id: string;
  url: string;
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
