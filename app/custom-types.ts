import type { ReactNode } from "react";
export interface LinkObj {
  url: string;
  text: string;
  icon?: ReactNode;
  imgSrc?: string;
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
  isNew: boolean;
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

const sortTypes = ["new", "best", "desc", "asc", "az", null] as const;
export type SortType = (typeof sortTypes)[number];

export function isSortType(str: string | null): SortType {
  const sort = sortTypes.find((option) => option === str);
  return sort ? sort : null;
}
