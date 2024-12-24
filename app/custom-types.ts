import type { ReactNode } from "react";
export interface LinkObj {
  url: string;
  text: string;
}

export interface IconLinkObj {
  url: string;
  label: string;
  icon: ReactNode;
}

export interface HeroObj {
  title: string;
  description: string;
  imgSrc: string;
  button?: ReactNode;
}

export interface Product {
  itemId: string;
  name: string;
  description: string;
  tags: string[];
  sizes: number[];
  price: number;
  imgSrc: string;
  reviews: number;
  rating: number;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export interface SaleInfo {
  itemId: string;
  formula: (basePrice: number) => number;
  startDate: Date;
  endDate: Date;
}
