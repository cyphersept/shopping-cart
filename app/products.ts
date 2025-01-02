import { nanoid } from "nanoid";
import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";
import type { Product, SaleInfo, SortType } from "./custom-types";
import { productImages } from "./images";
import { LoremIpsum } from "lorem-ipsum";
import localforage from "localforage";
import { useEffect, useState } from "react";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 20,
    min: 6,
  },
});

// Generates list of random products if one does not already exist
export async function init() {
  const productList: Product[] = (await localforage.getItem("products")) ?? [];
  if (productList.length == 0) {
    const newProducts = generateProducts(18);
    await localforage.setItem("products", newProducts);
    return newProducts;
  } else return productList;
}

// export async function getProducts() {
//   const result: Product[] = (await localforage.getItem("products")) ?? [];
//   return result;
// }

// Displays price as pretty currency string
export function formatPrice(price: number) {
  return price % 1 === 0 ? "$" + price : "$" + price.toFixed(2);
}

export function useProducts() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    const init = async () => {
      const productList: Product[] =
        (await localforage.getItem("products")) ?? [];
      if (productList.length == 0) {
        const newProducts = generateProducts(18);
        setProducts(newProducts);
        localforage.setItem("products", newProducts);
      } else setProducts(productList);
    };
    init();
  }, []);
}

// Returns product for a given product ID
export function getProductById(targetId: string, products: Product[]) {
  return products.find((item) => item.itemId === targetId) ?? false;
}

// Find products matching query string in search set
export function findProducts(query: string, list: Product[], keys: string[]) {
  return matchSorter(list, query, { keys: keys });
}

// Sort products according to given order
export function sortProducts(sort: SortType, list: Product[]) {
  let sorted = list;
  switch (sort) {
    case "new":
      sorted = list.sort((a, b) => (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0));
      break;
    case "best":
      sorted = list.sort((a, b) => -1 * (a.rating - b.rating));
      break;
    case "asc":
      sorted = list.sort((a, b) => a.price * a.sizes[0] - b.price * b.sizes[0]);
      break;
    case "desc":
      sorted = list.sort(
        (a, b) => -1 * (a.price * a.sizes[0] - b.price * b.sizes[0])
      );
      break;
    case "az":
      sorted = list.sort((a, b) =>
        [a.name, b.name].sort()[0] == a.name ? -1 : 1
      );
      break;
  }

  return sorted;
}

// Generate a new product
function productFactory(customProduct?: Partial<Product>) {
  const sizes = [1, 1.5, 2, 3, 4, 8];
  const prices = [4, 5, 6, 7, 9, 11, 12, 15, 18, 19, 21, 24, 28, 29, 30];
  const tag1 = [
    "Green Tea",
    "White Tea",
    "Black Tea",
    "Rooibos Tea",
    "Oolong Tea",
    "Tisane",
  ];
  const tag2 = ["Herbal Tea", "Fruit Tea", "Floral Tea"];

  const defaultProduct: Product = {
    itemId: nanoid(12),
    name: lorem.generateWords(2).substring(0, 17),
    description: lorem.generateParagraphs(2),
    tags: [getRandomFromArr(tag1), getRandomFromArr(tag2)],
    sizes: getRandomSubarray(sizes).sort((a, b) => a - b),
    price: getRandomFromArr(prices),
    imgSrc: "",
    reviews: Math.floor(Math.random() * 500),
    rating: Math.floor(Math.random() * 150 + 350) / 100,
    isNew: false,
  };

  return { ...defaultProduct, ...customProduct } as Product;
}

// Creates dummy content objects for [count] products
export function generateProducts(count: number) {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const currSrc = productImages[i % productImages.length];
    products.push(productFactory({ imgSrc: currSrc, isNew: i < 3 }));
  }
  return products;
}

// Selects one random element from an array
function getRandomFromArr(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

// Selects a random selection of elements from an array
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
// export async function getSalePrice(targetId: string) {
//   const product = await getProductById(targetId);

//   // Return false if product not found
//   if (!product) return false;

//   const sales: SaleInfo[] = await getSales();
//   const matchingSales = sales.filter((s) => s.itemId === targetId);

//   // Applies each sale formula to the base price
//   matchingSales.reduce((acc, s) => s.formula(acc), product.price);
// }

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
