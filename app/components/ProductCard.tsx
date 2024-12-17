import type { Product } from "~/custom-types";
import { useState } from "react";
import { addToCart } from "~/cart";
import { Pill } from "~/components/Pill";
import { NavLink } from "react-router";

interface CardProps {
  product: Product;
  full?: boolean;
}

export function ProductCard({ product, full }: CardProps) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [currPrice, setCurrPrice] = useState(
    product.price * product.sizes[selectIndex]
  );
  const formattedPrice =
    currPrice % 1 === 0 ? "$" + currPrice : "$" + currPrice.toFixed(2);
  const sizeStyle =
    "py-[0.25em] px-[0.5em] normal-case rounded-lg transition-colors ";

  const tagList = (
    <ul className="capitalize flex gap-2 list-none">
      {product.tags.map((t) => (
        <Pill key={t} classes="text-indigo-900 bg-indigo-200">
          {t}
        </Pill>
      ))}
    </ul>
  );

  const sizeList = (
    <ul className={"capitalize flex gap-2 list-none"}>
      {product.sizes.map((t, index) => (
        <li>
          <button
            type="button"
            key={t}
            className={
              index === selectIndex
                ? sizeStyle + "bg-indigo-400"
                : sizeStyle + "bg-slate-700"
            }
            onClick={() => {
              setCurrPrice(t * product.price);
              setSelectIndex(index);
            }}
          >
            {t} oz
          </button>
        </li>
      ))}
    </ul>
  );
  return full ? (
    <section className="card p-4 flex gap-16 ">
      <img
        src={product.imgSrc}
        alt={"Image of " + product.name}
        className="object-cover aspect-[4/3] "
      />

      <section className="flex flex-col gap-4">
        <h1 className="text-6xl capitalize ">{product.name}</h1>
        {tagList}
        {sizeList}
        <button
          type="button"
          className="p-[0.5em] bg-indigo-400 rounded-md"
          onClick={() => addToCart(product.itemId, product.sizes[selectIndex])}
        >
          Add to Cart
        </button>
      </section>
    </section>
  ) : (
    <li className="card p-4 flex flex-col gap-4 border border-slate-50">
      <img
        src={product.imgSrc}
        alt={"Image of " + product.name}
        className="object-cover aspect-[4/3] "
      />
      <h3 className="text-2xl capitalize">
        <NavLink to={"product/" + product.itemId} className={"hover-slide"}>
          {product.name} — {formattedPrice}
        </NavLink>
      </h3>
      {tagList}
      {sizeList}
      <button
        type="button"
        className="p-[0.5em] bg-indigo-400 rounded-md"
        onClick={() => addToCart(product.itemId, product.sizes[selectIndex])}
      >
        Add to Cart
      </button>
    </li>
  );
}
