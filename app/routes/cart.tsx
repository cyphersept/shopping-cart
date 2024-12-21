import { createContext } from "react";
import { getProductById } from "~/products";
import { CloseButton } from "../components/CloseButton";
import type { CartItem } from "~/custom-types";
import type { Route } from "../+types/root";
import { getCart } from "~/cart";
import { useLoaderData } from "react-router";
import { ProductElement } from "~/components/ProductElement";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const cart = await getCart();
  if (!cart) throw new Response("Not Found", { status: 404 });
  return { cart };
}

const cartPlaceholder = { itemId: "", selectedSize: 0, quantity: 0 };
export const CartItemContext = createContext<CartItem>(cartPlaceholder);

export default function CartMenu() {
  const { cart }: { cart: CartItem[] } = useLoaderData();
  const cartItems = cart.map((item) => <CartEntry item={item} />);

  return (
    <aside className="absolute right-0 top-0 h-screen flex flex-col shadow-xl shadow-black bg-slate-900 [&>*]:px-8">
      <header className="text-4xl flex justify-between items-end py-6 gap-4">
        <h2>My Cart ({cart.length}) </h2>
        <CloseButton />
      </header>
      {cart.length === 0 ? (
        <div className="text-lg text-slate-500">No items yet</div>
      ) : (
        <ul className="list-none">{cartItems}</ul>
      )}
      <footer className="mt-auto border-t border-slate-50 flex flex-col py-6">
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Subtotal: </span>
          <span>$Placeholder </span>
        </div>
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Shipping: </span>
          <span>$Placeholder </span>
        </div>
        <button className="text-xl bg-indigo-500 rounded-lg p-4 mt-4 ">
          Proceed to Checkout
        </button>
      </footer>
    </aside>
  );
}

async function CartEntry({ item }: { item: CartItem }) {
  const product = await getProductById(item.itemId);
  return product ? (
    <CartItemContext.Provider value={item}>
      <ProductElement key={item.itemId} product={product} type="CART" />
    </CartItemContext.Provider>
  ) : (
    <></>
  );
}
