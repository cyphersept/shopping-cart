import type { Product } from "~/custom-types";
import { useEffect, useState } from "react";
import { Pill, Separator } from "~/components/TextDecorations";
import { NavLink } from "react-router";
import { ReviewStars } from "./Reviews";
import { AddToCart } from "./AddToCart";
import { ProductContext, useProductContext } from "~/contexts";
import { formatPrice } from "~/products";

// Compact inline card display for a product
export function ProductCard({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const priceString = formatPrice(product.price * product.sizes[sizeIndex]);

  return (
    <ProductContext.Provider value={{ product, sizeIndex, setSizeIndex }}>
      <li className="card p-4 flex flex-col gap-4 border border-slate-50 w-80">
        <img
          src={product.imgSrc}
          alt={"Image of " + product.name}
          className="object-cover aspect-[4/3] "
          loading="lazy"
        />
        <h3 className="text-2xl capitalize pb-1">
          <NavLink
            to={"product/" + product.itemId}
            className="hover-slide pb-2"
          >
            {product.name} — {priceString}
          </NavLink>
        </h3>
        <TagList tags={product.tags} classes="" />
        <SizeList classes="mb-auto" />
        <AddToCart />
      </li>
    </ProductContext.Provider>
  );
}

// Full page detailed information about a product
export function ProductPage({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const priceString = formatPrice(product.price * product.sizes[sizeIndex]);

  const paragraphs = product.description
    .split(/\r?\n/)
    .map((p, i) => <p key={i}>{p}</p>);

  return (
    <ProductContext.Provider value={{ product, sizeIndex, setSizeIndex }}>
      <section className="card p-16 flex gap-16 w-full ">
        <div className="grow w-auto ">
          <img
            src={product.imgSrc}
            alt={"Image of " + product.name}
            loading="lazy"
          />
        </div>

        <section className="flex flex-col gap-6 min-w-[35%] w-96">
          <h1 className="text-6xl capitalize ">{product.name}</h1>
          <ReviewStars count={product.reviews} avg={product.rating} />
          <h2 className="text-3xl">{priceString}</h2>
          <Separator />
          <div>
            <h2 className="text-2xl mb-2">Description</h2>
            <div className="flex flex-col gap-2">{paragraphs}</div>
          </div>
          <TagList tags={product.tags} />
          <div>
            <h2 className="text-2xl mb-3">Sizes Available</h2>
            <SizeList btnClasses="py-2 px-6" />
          </div>
          <AddToCart detailed={true} />
        </section>
      </section>
    </ProductContext.Provider>
  );
}

// Displays relevant tags about the product
function TagList({ tags, classes }: { tags: string[]; classes?: string }) {
  return (
    <ul className={"capitalize flex gap-2 list-none " + classes}>
      {tags.map((t) => (
        <Pill key={t} classes="text-heather-950 bg-heather-200">
          {t}
        </Pill>
      ))}
    </ul>
  );
}

// Selectable list of sizes
function SizeList({ classes = "", btnClasses = "" }) {
  const { product } = useProductContext();

  return (
    <ul className={"normal-case flex gap-2 list-none flex-wrap " + classes}>
      {product.sizes.map((size, index) => (
        <li key={size}>
          <JumpButton index={index} classes={btnClasses}>
            {size} oz
          </JumpButton>
        </li>
      ))}
    </ul>
  );
}

function JumpButton({
  children,
  index,
  classes,
}: {
  children: React.ReactNode;
  index: number;
  classes?: string;
}) {
  const { sizeIndex, setSizeIndex } = useProductContext();
  const [effect, setEffect] = useState(false);
  const style = [
    "rounded-lg transition-colors text-white whitespace-nowrap ",
    effect ? "animate-lift" : "",
    classes ? classes : "py-[0.25em] px-[0.5em]",
  ].join(" ");
  return (
    <button
      type="button"
      className={
        index === sizeIndex
          ? style + " bg-heather-500"
          : style + " bg-slate-700 hover:bg-slate-800 "
      }
      onClick={() => {
        setSizeIndex(index);
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {children}
    </button>
  );
}
