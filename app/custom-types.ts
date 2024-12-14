import type { ReactNode } from "react";
import type { URL } from "url";

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
