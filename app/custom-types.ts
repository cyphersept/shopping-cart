import type { URL } from "url";

export interface LinkObj {
  url: string;
  text: string;
}

export interface Product {
  itemId: string;
  name: string;
  description: string;
  tags: string[];
  seo: string;
  price: number;
  imgSrc: string;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}

export interface SaleInfo {
  itemId: string;
  formula: (basePrice: number) => number;
  startDate: Date;
  endDate: Date;
}
