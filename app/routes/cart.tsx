import { formatPrice } from "~/products";
import { CloseButton } from "../components/CloseButton";
import type { CartItem } from "~/custom-types";
import { useCart } from "~/cart";
import { QuantitySelect } from "~/components/AddToCart";
import { useState } from "react";

export default function CartMenu() {
  const { cart, cartSum } = useCart();
  const cartItems =
    cart.length === 0 ? (
      <div className={"text-lg text-slate-500 mb-auto"}>No items yet</div>
    ) : (
      <ul className="list-none flex flex-col gap-4 grow overflow-y-auto snap-y pb-6 ">
        {cart.map((item, index) => (
          <CartEntry item={item} index={index} key={item.product.itemId} />
        ))}
      </ul>
    );

  return (
    <aside className="absolute right-0 top-0 h-screen flex flex-col shadow-xl shadow-black bg-slate-900 [&>*]:px-8">
      <header className="text-4xl flex justify-between items-end py-6 gap-4">
        <h2>My Cart ({cart.length ?? 0}) </h2>
        <CloseButton />
      </header>

      {cartItems}

      <footer className="border-t border-slate-50 flex flex-col py-6">
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Subtotal: </span>
          <span>${cartSum(cart).toFixed(2)} </span>
        </div>
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Shipping: </span>
          <span>$4.99</span>
        </div>
        <button className="text-xl bg-indigo-500 rounded-lg p-4 mt-4 ">
          Proceed to Checkout
        </button>
      </footer>
    </aside>
  );
}

function CartEntry({ item, index }: { item: CartItem; index: number }) {
  const { cart, changeQuantityInCart } = useCart();
  const product = cart[index]?.product;

  const [quantity, setQuantity] = useState(item.quantity);
  const updateQuantity = (n: number) => {
    setQuantity(n);
    changeQuantityInCart(product, n);
  };

  if (!product) return <></>;
  else
    return (
      <li className="h-32 w-full flex gap-4 snap-start">
        <img
          className="h-full w-auto"
          src={product.imgSrc}
          alt={"Image of " + product.name}
        />
        <div className="flex flex-col  ">
          <h3 className="whitespace-nowrap overflow-hidden overflow-ellipsis capitalize text-xl ">
            {product.name}
          </h3>
          <div className="text-slate-400 text-sm">ID: {product.itemId}</div>
          <div className="my-1">
            {formatPrice(product.price * cart[index].selectedSize)} ·{" "}
            {cart[index].selectedSize} oz
          </div>
          <div>
            <QuantitySelect quantity={quantity} setQuantity={updateQuantity} />
          </div>
        </div>
      </li>
    );
}
