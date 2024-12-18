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

  // Displays price as pretty currency string
  const formattedPrice =
    currPrice % 1 === 0 ? "$" + currPrice : "$" + currPrice.toFixed(2);

  // Selects a different product size
  const selectSize = (size: number, index: number) => {
    setCurrPrice(size * product.price);
    setSelectIndex(index);
  };

  // Adds the current product to cart at the selected size
  const cartAddFunc = () =>
    addToCart(product.itemId, product.sizes[selectIndex]);

  return full ? (
    <section className="card p-16 flex gap-16 w-full ">
      <div className="shrink w-auto ">
        <img src={product.imgSrc} alt={"Image of " + product.name} />
      </div>

      <section className="flex flex-col gap-4 min-w-[33%]">
        <h1 className="text-6xl capitalize ">{product.name}</h1>
        <TagList tags={product.tags} />
        <SizeList
          sizes={product.sizes}
          selected={selectIndex}
          onClick={selectSize}
        />
        <AddToCart onClick={cartAddFunc} />
      </section>
    </section>
  ) : (
    <li className="card p-4 flex flex-col gap-4 border border-slate-50">
      <img
        src={product.imgSrc}
        alt={"Image of " + product.name}
        className="object-cover aspect-[4/3] "
      />
      <h3 className="text-2xl capitalize pb-1">
        <NavLink to={"product/" + product.itemId} className="hover-slide pb-2">
          {product.name} — {formattedPrice}
        </NavLink>
      </h3>
      <TagList tags={product.tags} />
      <SizeList
        sizes={product.sizes}
        selected={selectIndex}
        onClick={selectSize}
      />
      <AddToCart onClick={cartAddFunc} />
    </li>
  );
}

// Displays relevant tags about the product
function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="capitalize flex gap-2 list-none">
      {tags.map((t) => (
        <Pill key={t} classes="text-indigo-900 bg-indigo-200">
          {t}
        </Pill>
      ))}
    </ul>
  );
}

// Selectable list of sizes
function SizeList({
  sizes,
  selected,
  onClick,
}: {
  sizes: number[];
  selected: number;
  onClick: (arg0: number, arg1: number) => void;
}) {
  const style = "py-[0.25em] px-[0.5em] rounded-lg transition-colors";
  return (
    <ul className={"normal-case flex gap-2 list-none"}>
      {sizes.map((t, index) => (
        <li key={t}>
          <button
            type="button"
            key={t}
            className={
              index === selected
                ? style + " bg-indigo-400"
                : style + " bg-slate-700"
            }
            onClick={() => onClick(t, index)}
          >
            {t} oz
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddToCart({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="p-[0.5em] bg-indigo-400 rounded-md"
      onClick={onClick}
    >
      Add to Cart
    </button>
  );
}
