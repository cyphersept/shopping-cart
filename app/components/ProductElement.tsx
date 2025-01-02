import type { Product } from "~/custom-types";
import { useEffect, useState } from "react";
import { Pill, Separator } from "~/components/TextDecorations";
import { NavLink } from "react-router";
import { ReviewStars } from "./Reviews";
import { AddToCart } from "./AddToCart";
import { ProductContext, useProductContext } from "~/contexts";
import { formatPrice } from "~/products";
import { BackButton, JumpButton } from "./Button";

// Compact inline card display for a product
export function ProductCard({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const priceString = formatPrice(product.price * product.sizes[sizeIndex]);
  const glass =
    " bg-violet-900/20 shadow-xl bg-gradient-to-t from-heather-100/60 via-heather-400/30 to-heather-600/40 dark:from-heather-400/60 dark:to-heather-800/20 dark:text-heather-200 dark:shadow-heather-600/30";

  return (
    <ProductContext.Provider value={{ product, sizeIndex, setSizeIndex }}>
      <li className={"card p-6 flex flex-col gap-4 grow " + glass}>
        <img
          src={product.imgSrc}
          alt={"Image of " + product.name}
          className="object-cover aspect-[4/3] shadow-lg drop-shadow-sm shadow-obsidian/15"
          loading="lazy"
        />
        <h3 className="text-2xl capitalize pb-1 dark:text-heather-50">
          <NavLink
            viewTransition
            to={"product/" + product.itemId}
            className="hover-slide pb-2"
          >
            {product.name} — {priceString}
          </NavLink>
        </h3>
        <TagList tags={product.tags} classes="" />
        <SizeList classes="mb-auto" />
        <div className="mt-1">
          <AddToCart />
        </div>
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
      <section className="p-16 flex gap-16 w-full bg-gradient-to-t from-violet-300/20 via-heather-50 to-heather-100 dark:from-violet-200/60 dark:via-heather-700/30 dark:to-obsidian ">
        <div className="grow w-auto  mt-4 relative">
          <BackButton classes="text-xl py-3 absolute top-0 -translate-y-full w-full" />
          <img
            src={product.imgSrc}
            alt={"Image of " + product.name}
            loading="lazy"
          />
        </div>

        <section className="flex flex-col gap-6 min-w-[35%] w-96">
          <h1 className="text-6xl capitalize ">{product.name}</h1>
          <ReviewStars
            count={product.reviews}
            avg={product.rating}
            classes="dark:text-heather-200"
          />
          <h2 className="text-3xl">{priceString}</h2>
          <Separator />
          <div>
            <h2 className="text-2xl mb-2">Description</h2>
            <div className="flex flex-col gap-2 dark:text-heather-200">
              {paragraphs}
            </div>
          </div>
          <TagList tags={product.tags} pClasses="!bg-heather-200" />
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
function TagList({
  tags,
  classes,
  pClasses,
}: {
  tags: string[];
  classes?: string;
  pClasses?: string;
}) {
  return (
    <ul className={"capitalize flex gap-2 list-none " + classes}>
      {tags.map((t) => (
        <Pill
          key={t}
          classes={
            "text-heather-950 bg-heather-50 dark:bg-heather-200 shadow-sm " +
            pClasses
          }
        >
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
