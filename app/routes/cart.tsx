import { formatPrice } from "~/products";
import { CloseButton } from "../components/CloseButton";
import type { CartItem } from "~/custom-types";
import { QuantitySelect } from "~/components/AddToCart";
import { useState } from "react";
import { useCartContext } from "~/contexts";
import { changeQuantityInCart, cartSum } from "~/cart";
import { SlideButton } from "~/components/Button";

export default function CartMenu() {
  const { cart } = useCartContext();
  const cartItems =
    cart.length === 0 ? (
      <div className={"text-lg text-slate-500 mb-auto"}>No items yet</div>
    ) : (
      <ul className="list-none flex flex-col gap-4 grow overflow-y-auto snap-y pb-6 ">
        {cart.map((item) => (
          <CartEntry
            item={item}
            key={item.product.itemId + item.selectedSize}
          />
        ))}
      </ul>
    );

  return (
    <aside className="absolute right-0 top-0 h-screen z-40 flex flex-col shadow-xl shadow-black dark:bg-obsidian/70 backdrop-blur-sm [&>*]:px-8">
      <div className="h-full w-full bg-gradient-to-t from-violet-300/30 via-heather-50 to-heather-100 dark:from-violet-300/50 dark:via-heather-700/30 dark:to-obsidian ">
        <header className="text-4xl flex justify-between items-end py-6 gap-4">
          <h2>My Cart ({cart.length ?? 0}) </h2>
          <CloseButton />
        </header>

        {cartItems}
      </div>

      <footer className="border-t-4 border-double border-heather-200 text-heather-50 py-6 bg-heather-700 dark:bg-[#34304f]">
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Subtotal: </span>
          <span>${cartSum(cart).toFixed(2)} </span>
        </div>
        <div className="flex space-between mb-6">
          <span className="font-bold inline-block mr-auto">Shipping: </span>
          <span>$4.99</span>
        </div>
        <div>
          <SlideButton classes="text-xl ">
            <span>Proceed to Checkout</span>
          </SlideButton>
        </div>
      </footer>
    </aside>
  );
}

function CartEntry({ item }: { item: CartItem }) {
  const { cart, setCart } = useCartContext();
  const product = item.product;
  const size = item.selectedSize;

  const [quantity, setQuantity] = useState(item.quantity);
  const updateQuantity = (n: number) => {
    setQuantity(n);
    setCart([...changeQuantityInCart(cart, product, size, n)]);
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
          <div className="text-heather-600 dark:text-slate-400 text-sm">
            ID: {product.itemId}
          </div>
          <div className="my-1">
            {formatPrice(product.price * item.selectedSize)} ·{" "}
            {item.selectedSize} oz
          </div>
          <div>
            <QuantitySelect quantity={quantity} setQuantity={updateQuantity} />
          </div>
        </div>
      </li>
    );
}
