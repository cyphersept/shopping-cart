import { createContext, useContext } from "react";
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

export const AllProductsContext = createContext<Product[]>([]);
export const ProductContext = createContext<PCType | undefined>(undefined);
export const CartItemContext = createContext<CICType | undefined>(undefined);

// Display names for each context
AllProductsContext.displayName = "AllProductsContext";
ProductContext.displayName = "ProductContext";
CartItemContext.displayName = "CartItemContext";

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
