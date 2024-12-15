import { nanoid } from "nanoid";
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";
import type { Product, SaleInfo } from "./custom-types";

const ProductList: Product[] = [];

export function getProducts(query?: string) {
  return query ? findProducts(query) : ProductList;
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

function productFactory(customProduct?: Partial<Product>) {
  const sizes = [4, 8, 16, 32];
  const prices = [9, 11, 12, 15, 18, 19, 21, 24, 28, 29, 31, 34, 36];
  const defaultProduct: Product = {
    itemId: nanoid(12),
    name: "My New Product",
    description: "Product description here",
    tags: [],
    sizes: getRandomSubarray(sizes),
    price: prices[Math.floor(Math.random() * prices.length)],
    imgSrc: "",
    reviews: Math.floor(Math.random() * 500),
    rating: Math.floor(Math.random() * 200 + 300) / 100,
  };

  return { ...defaultProduct, ...customProduct } as Product;
}

function getRandomSubarray(array: any[]) {
  if (array.length === 0 || array.length === 1) {
    return array;
  }

  const randomLength = Math.floor(Math.random() * array.length) + 1;
  const randomIndices: typeof array = [];

  while (randomIndices.length < randomLength) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  return randomIndices.map((index) => array[index]);
}

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
