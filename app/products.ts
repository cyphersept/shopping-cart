import { nanoid } from "nanoid";
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";
import type { Product, SaleInfo } from "./custom-types";

const ProductList: Product[] = [];

export function getProducts() {
  return ProductList;
}

export function getProductById(targetId: string) {
  return ProductList.find((item) => item.itemId === targetId) ?? false;
}

export async function findProducts(query: string) {
  const products: Product[] = (await localforage.getItem("products")) ?? [];
  const searchKeys = ["name", "description", "tags", "seo"];
  return matchSorter(products, query, { keys: searchKeys });
}

export async function sortProducts(list: Product[]) {}

// Applies all relevant sales to an item's list price to find sale price
export async function getSalePrice(targetId: string) {
  const product = await getProductById(targetId);

  // Return false if product not found
  if (!product) return false;

  const sales: SaleInfo[] = await getSales();
  const matchingSales = sales.filter((s) => s.itemId === targetId);

  // Applies each sale formula to the base price
  matchingSales.reduce((acc, s) => s.formula(acc), product.price);
}

// Get list of all ongoing sales
export async function getSales() {
  const sales: SaleInfo[] = (await localforage.getItem("sales")) ?? [];
  return sales;
}

let SaleList: SaleInfo[] = [];

// export async function getContacts(query) {
//   await fakeNetwork(`getContacts:${query}`);
//   let contacts = await localforage.getItem("contacts");
//   if (!contacts) contacts = [];
//   if (query) {
//     contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
//   }
//   return contacts.sort(sortBy("last", "createdAt"));
// }
