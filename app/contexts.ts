import { createContext, useContext, useState } from "react";
import type { CartItem, Product } from "./custom-types";

interface PCType {
  product: Product;
  sizeIndex: number;
  setSizeIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface CICType {
  cartItem: CartItem;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

interface CartType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const AllProductsContext = createContext<Product[]>([]);
export const ProductContext = createContext<PCType | undefined>(undefined);
export const CartItemContext = createContext<CICType | undefined>(undefined);
export const CartContext = createContext<CartType | undefined>(undefined);

// Display names for each context
AllProductsContext.displayName = "AllProductsContext";
ProductContext.displayName = "ProductContext";
CartItemContext.displayName = "CartItemContext";
CartContext.displayName = "CartContext";

// Throws error if value is not set for typed context with undefined defaults
export function useProductContext() {
  const myContext = useContext(ProductContext);
  if (myContext === undefined)
    throw new Error(ProductContext.displayName + " not found");
  return myContext;
}

export function useCartItemContext() {
  const myContext = useContext(CartItemContext);
  if (myContext === undefined)
    throw new Error(CartItemContext.displayName + " not found");
  return myContext;
}

export function useCartContext() {
  const myContext = useContext(CartContext);
  if (myContext === undefined)
    throw new Error(CartContext.displayName + " not found");
  return myContext;
}
