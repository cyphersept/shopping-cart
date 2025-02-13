import { useLoaderData } from "react-router";
import { formatPrice, getProductById, init } from "~/products";
import type { Route } from "./+types/product";
import type { CartItem, Product } from "~/custom-types";
import { useCartContext } from "~/contexts";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const productId = params.itemId;
  const products = await init();
  const product = getProductById(productId, products);

  return { product };
}

export function Checkout() {}

function CheckoutItemList() {
  const { cart } = useCartContext();
  const cartNone = (
    <div className={"px-8 text-lg text-slate-500 mb-auto"}>No items yet</div>
  );
  const cartList = (
    <ul className="px-8 list-none h-full flex flex-col gap-4 grow overflow-y-auto snap-y pb-6 ">
      {cart.map((item) => (
        <Item item={item} key={item.product.itemId + item.selectedSize} />
      ))}
    </ul>
  );
  const cartItems = cart.length === 0 ? cartNone : cartList;
}

function Item({ item }: { item: CartItem }) {
  const product = item.product;
  return (
    <li className="h-28 w-full flex gap-4 snap-start relative">
      <img
        className="h-28 w-auto"
        src={product.imgSrc}
        alt={"Image of " + product.name}
      />
      <div className="flex flex-col  ">
        <h3 className="whitespace-nowrap capitalize text-lg ">
          {product.name}
        </h3>
        <div className="text-heather-600 dark:text-slate-400 text-sm">
          ID: {product.itemId}
        </div>
        <div className="mt-auto mb-0.5">
          {formatPrice(product.price * item.selectedSize)} · {item.selectedSize}{" "}
          oz
        </div>
        <div className="flex gap-2 -mr-2 h-8">{item.quantity}</div>
      </div>
    </li>
  );
}
