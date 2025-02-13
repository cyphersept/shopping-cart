import { formatPrice } from "~/products";
import { CloseButton } from "./Button";
import type { CartItem } from "~/custom-types";
import { QuantitySelect } from "~/components/AddToCart";
import { useCartContext } from "~/contexts";
import { changeQuantityInCart, cartSum } from "~/cart";
import { SlideButton } from "~/components/Button";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartMenu() {
  const { cart, showCart, setShowCart } = useCartContext();
  const cartNone = (
    <div className={"px-8 text-lg text-slate-500 mb-auto"}>No items yet</div>
  );
  const cartList = (
    <ul className="px-8 list-none h-full flex flex-col gap-4 grow overflow-y-auto snap-y pb-6 ">
      {cart.map((item) => (
        <CartEntry item={item} key={item.product.itemId + item.selectedSize} />
      ))}
    </ul>
  );
  const cartItems = cart.length === 0 ? cartNone : cartList;
  const anim = showCart === true ? "" : "opacity-0 translate-x-[125%] ";

  return (
    <aside
      className={
        "fixed right-0 top-0 h-screen z-40 max-h-screen flex flex-col shadow-xl shadow-black dark:bg-obsidian/70 backdrop-blur-sm transition-all translate-x-0 delay-100 duration-200 " +
        anim
      }
    >
      <div className="h-1/2 flex flex-col grow w-full bg-gradient-to-t from-violet-300/30 via-heather-50 to-heather-100 dark:from-violet-300/50 dark:via-heather-700/30 dark:to-obsidian ">
        <header className="px-8 text-4xl flex justify-between items-end py-6 gap-4">
          <h2>
            My Cart ({cart.reduce((prev, curr) => prev + curr.quantity, 0)})
          </h2>
          <CloseButton classes="-mr-1 " onClick={() => setShowCart(false)} />
        </header>

        <div className="grow h-1/2">{cartItems}</div>
      </div>

      <footer className="px-8 border-t-4 border-double border-heather-200 text-heather-50 pt-4 pb-6 bg-heather-700 dark:bg-[#34304f]">
        <div className="flex space-between">
          <span className="font-bold inline-block mr-auto">Subtotal: </span>
          <span>${cartSum(cart).toFixed(2)} </span>
        </div>
        <div className="flex space-between mb-4">
          <span className="font-bold inline-block mr-auto">Shipping: </span>
          <span>$4.99</span>
        </div>

        <SlideButton classes="text-xl !w-full py-[0.5em]">
          <span>Proceed to Checkout</span>
        </SlideButton>
      </footer>
    </aside>
  );
}

function CartEntry({ item }: { item: CartItem }) {
  const { cart, setCart } = useCartContext();
  const product = item.product;
  const size = item.selectedSize;
  const updateQuantity = (n: number) => {
    setCart([...changeQuantityInCart(cart, product, size, n)]);
  };
  const deleteItem = () => {
    setCart([...changeQuantityInCart(cart, product, size, 0 - item.quantity)]);
  };

  if (!product) return <></>;
  else
    return (
      <li className="h-28 w-full flex gap-4 snap-start relative">
        <img
          className="h-28 w-auto"
          src={product.imgSrc}
          alt={"Image of " + product.name}
        />
        <div className="flex flex-col  ">
          <h3 className="whitespace-nowrap overflow-hidden overflow-ellipsis capitalize text-lg ">
            {product.name}
          </h3>
          <div className="text-heather-600 dark:text-slate-400 text-sm">
            ID: {product.itemId}
          </div>
          <div className="mt-auto mb-0.5">
            {formatPrice(product.price * item.selectedSize)} ·{" "}
            {item.selectedSize} oz
          </div>
          <div className="flex gap-2 -mr-2 h-8">
            <QuantitySelect
              quantity={item.quantity}
              setQuantity={updateQuantity}
            />
            <button
              type="button"
              aria-label="Remove item"
              className="py-2 pl-2 transition-transform hover:-translate-y-1 active:!translate-y-0"
              onClick={deleteItem}
            >
              <FaRegTrashAlt className="text-lg text-heather-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </li>
    );
}
