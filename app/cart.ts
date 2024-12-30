import { useEffect, useState } from "react";
import type { CartItem, Product } from "./custom-types";
import localforage from "localforage";

// Fetch array containing itemID and quantities of items in cart
export async function getSavedCart() {
  let cart: CartItem[] = (await localforage.getItem("cart")) ?? [];
  return cart;
}

// Add (addQuantity) instaces of item with ID to saved cart values
export function addToCart(
  cart: CartItem[],
  myProd: Product,
  itemSize: number,
  quantity: number
) {
  // If item is already in the cart, increase its quantity; else add it
  const existing = cart[findInCart(cart, myProd, itemSize)];
  if (existing) existing.quantity += quantity;
  else
    cart.push({
      product: myProd,
      selectedSize: itemSize,
      quantity: quantity,
    });

  // Update cart and save state
  localforage.setItem("cart", cart);
  return cart;
}

// Remove items from cart
export function removeFromCart(
  cart: CartItem[],
  myProd: Product,
  itemSize: number,
  quantity: number
) {
  const index = findInCart(cart, myProd, itemSize);

  // Decrease item quantity in cart
  if (index > -1) {
    cart[index].quantity -= quantity;

    // Remove items with no quantity
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    // Updates cart and saves state
    localforage.setItem("cart", cart);
  }
  return cart;
}

export function changeQuantityInCart(
  cart: CartItem[],
  myProd: Product,
  itemSize: number,
  quantity: number
) {
  const index = findInCart(cart, myProd, itemSize);

  // Change item quantity in cart
  if (index > -1) {
    console.log(cart);
    cart[index].quantity = quantity;

    // Remove items with no quantity
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    // Updates cart and saves state
    console.log(cart);
    localforage
      .setItem("cart", cart)
      .then(() => console.log("Cart saved to localforage"));
  }
  return cart;
}

// Calculate subtotal for each item in cart
export function cartSum(input: CartItem[]) {
  const sum = input
    .map((item) => {
      const p = item.product;
      const itemSubtotal = !p ? 0 : p.price * item.selectedSize * item.quantity;
      return itemSubtotal;
    })
    // Add up costs of each item
    .reduce((acc, curr) => acc + curr, 0);
  return sum;
}

function findInCart(cart: CartItem[], myProd: Product, itemSize: number) {
  return cart.findIndex(
    (item) =>
      item.product.itemId === myProd.itemId && item.selectedSize === itemSize
  );
}

// Gets sum total of cart items according to their sale prices

export function calcTaxShipping(base: number, taxRate: number, ship: number) {
  return base * taxRate + ship;
}

// export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let contact = { id, createdAt: Date.now() };
//   let contacts = await getContacts();
//   contacts.unshift(contact);
//   await set(contacts);
//   return contact;
// }

// export async function getContact(id) {
//   await fakeNetwork(`contact:${id}`);
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   return contact ?? null;
// }

// export async function updateContact(id, updates) {
//   await fakeNetwork();
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   if (!contact) throw new Error("No contact found for", id);
//   Object.assign(contact, updates);
//   await set(contacts);
//   return contact;
// }

// export async function deleteContact(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex(contact => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// // fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise(res => {
//     setTimeout(res, Math.random() * 800);
//   });
// }
