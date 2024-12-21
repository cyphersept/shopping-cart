import type { Product } from "~/custom-types";
import { useContext, useEffect, useState } from "react";
import { Pill, Separator } from "~/components/TextDecorations";
import { NavLink } from "react-router";
import { ReviewStars } from "./Reviews";
import { AddToCart } from "./AddToCart";
import { ProductContext } from "~/products";
import { CartItemContext } from "~/routes/Cart";

function getPrice(product: Product, sizeIndex: number) {
  // Price of the currently selected product size
  const value = product.price * product.sizes[sizeIndex];
  // Displays price as pretty currency string
  const toString = value % 1 === 0 ? "$" + value : "$" + value.toFixed(2);
  return { value, toString };
}

interface ProductElementType {
  product: Product;
  type: "CARD" | "PAGE" | "FEATURE" | "CART";
}

// Selects appropriate component for displaying product information
export function ProductElement({ product, type }: ProductElementType) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const displayElement = {
    CARD: <ProductCard />,
    PAGE: <ProductPage />,
    FEATURE: <ProductPage />,
    CART: <ProductInCart />,
  }[type];

  return (
    <ProductContext.Provider value={{ product, sizeIndex, setSizeIndex }}>
      {displayElement}
    </ProductContext.Provider>
  );
}

// Compact inline card display for a product
function ProductCard() {
  const { product, sizeIndex } = useContext(ProductContext);

  return (
    <li className="card p-4 flex flex-col gap-4 border border-slate-50 w-80">
      <img
        src={product.imgSrc}
        alt={"Image of " + product.name}
        className="object-cover aspect-[4/3] "
      />
      <h3 className="text-2xl capitalize pb-1">
        <NavLink to={"product/" + product.itemId} className="hover-slide pb-2">
          {product.name} — {getPrice(product, sizeIndex).toString}
        </NavLink>
      </h3>
      <TagList tags={product.tags} classes="" />
      <SizeList classes="mb-auto" />
      <AddToCart />
    </li>
  );
}

// Full page detailed information about a product
function ProductPage() {
  const { product, sizeIndex } = useContext(ProductContext);

  const paragraphs = product.description
    .split(/\r?\n/)
    .map((p, i) => <p key={i}>{p}</p>);

  return (
    <section className="card p-16 flex gap-16 w-full ">
      <div className="grow w-auto ">
        <img src={product.imgSrc} alt={"Image of " + product.name} />
      </div>

      <section className="flex flex-col gap-6 min-w-[35%] w-96">
        <h1 className="text-6xl capitalize ">{product.name}</h1>
        <ReviewStars count={product.reviews} avg={product.rating} />
        <h2 className="text-3xl">{getPrice(product, sizeIndex).toString}</h2>
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
  );
}

function ProductInCart() {
  const { product, sizeIndex } = useContext(ProductContext);
  const { quantity, selectedSize } = useContext(CartItemContext);
  return (
    <li className="h-32 w-full flex gap-4">
      <img src={product.imgSrc} alt={"Image of " + product.name} />
      <div className="flex flex-col">
        <h3 className="overflow-ellipsis">{product.name}</h3>
        <div className="text-slate-400">
          {getPrice(product, sizeIndex).toString} · {selectedSize}
        </div>
      </div>
    </li>
  );
}

// Displays relevant tags about the product
function TagList({ tags, classes }: { tags: string[]; classes?: string }) {
  return (
    <ul className={"capitalize flex gap-2 list-none " + classes}>
      {tags.map((t) => (
        <Pill key={t} classes="text-indigo-900 bg-indigo-200">
          {t}
        </Pill>
      ))}
    </ul>
  );
}

// Selectable list of sizes
function SizeList({ classes = "", btnClasses = "" }) {
  const { product } = useContext(ProductContext);

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
  const { sizeIndex, setSizeIndex } = useContext(ProductContext);
  const [effect, setEffect] = useState(false);
  const style = [
    "rounded-lg transition-colors whitespace-nowrap",
    effect ? "animate-lift" : "",
    classes ? classes : "py-[0.25em] px-[0.5em]",
  ].join(" ");
  return (
    <button
      type="button"
      className={
        index === sizeIndex
          ? style + " bg-indigo-400"
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
