import type { CartItem } from "./custom-types";
import { getSalePrice } from "./products";
import localforage from "localforage";

// Fetch array containing itemID and quantities of items in cart
export async function getCart() {
  let cart: CartItem[] = (await localforage.getItem("cart")) ?? [];
  return cart;
}

// Add (addQuantity) instaces of item with ID to saved cart values
export async function addToCart(
  myItemId: string,
  itemSize: number,
  addQuantity = 1
) {
  let cart: CartItem[] = await getCart();

  // If item is already in the cart, increase its quantity; else add it
  const existing = cart.find((item) => item.itemId === myItemId);
  if (existing) existing.quantity += addQuantity;
  else
    cart.push({
      itemId: myItemId,
      selectedSize: itemSize,
      quantity: addQuantity,
    });

  // Save updated cart state
  await localforage.setItem("cart", cart);
}

// Remove (rmvQuantity) instaces of item with ID from saved cart values
export async function removeFromCart(myItemId: string, rmvQuantity: number) {
  const cart: CartItem[] = await getCart();
  const index = cart.findIndex((item) => item.itemId === myItemId);

  // Decrease item quantity in cart
  if (index > -1) {
    cart[index].quantity -= rmvQuantity;

    // Remove items with no quantity
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    // Save updated cart state
    await localforage.setItem("cart", cart);
    return true;
  } else return false;
}

// Gets sum total of cart items according to their sale prices
export async function cartSum() {
  const cart = await getCart();
  const pricePromises = Promise.all(
    cart.map(async (item) => {
      const truePrice = await getSalePrice(item.itemId);
      return truePrice ? item.quantity * item.selectedSize * truePrice : 0;
    })
  );
  const cartSum = (await pricePromises).reduce((acc, curr) => acc + curr, 0);
  return cartSum;
}

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
