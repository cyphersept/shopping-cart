import type { Product } from "~/custom-types";
import { useEffect, useState } from "react";
import { addToCart } from "~/cart";
import { Pill, Separator } from "~/components/TextDecorations";
import { NavLink } from "react-router";
import { ReviewStars } from "./Reviews";
import { AddToCart } from "./AddToCart";

interface CardProps {
  product: Product;
  full?: boolean;
}
interface JumpButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  classes?: string;
  isSelected: boolean;
}
interface SizeListProps {
  sizes: number[];
  selected: number;
  onClick: (arg0: number, arg1: number) => void;
  classes?: string;
  detailed?: boolean;
}

export function ProductCard({ product, full }: CardProps) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [currPrice, setCurrPrice] = useState(
    product.price * product.sizes[sizeIndex]
  );

  // Displays price as pretty currency string
  const formattedPrice =
    currPrice % 1 === 0 ? "$" + currPrice : "$" + currPrice.toFixed(2);

  // Selects a different product size
  const selectSize = (size: number, index: number) => {
    setCurrPrice(size * product.price);
    setSizeIndex(index);
  };

  // Adds the current product to cart at the selected size
  const cartAddFunc = () => addToCart(product.itemId, product.sizes[sizeIndex]);

  const paragraphs = product.description
    .split(/\r?\n/)
    .map((p, i) => <p key={i}>{p}</p>);

  return full ? (
    <section className="card p-16 flex gap-16 w-full ">
      <div className="grow w-auto ">
        <img src={product.imgSrc} alt={"Image of " + product.name} />
      </div>

      <section className="flex flex-col gap-6 min-w-[35%] w-96">
        <h1 className="text-6xl capitalize ">{product.name}</h1>
        <ReviewStars count={product.reviews} avg={product.rating} />
        <h2 className="text-3xl mb-"> {formattedPrice}</h2>
        <Separator />
        <div>
          <h2 className="text-2xl mb-2">Description</h2>
          <div className="flex flex-col gap-2">{paragraphs}</div>
        </div>
        <TagList tags={product.tags} />
        <div>
          <h2 className="text-2xl mb-3">Sizes Available</h2>
          <SizeList
            sizes={product.sizes}
            selected={sizeIndex}
            onClick={selectSize}
            detailed={true}
          />
        </div>
        <AddToCart product={product} sizeIndex={sizeIndex} detailed={true} />
      </section>
    </section>
  ) : (
    <li className="card p-4 flex flex-col gap-4 border border-slate-50 w-80">
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
      <TagList tags={product.tags} classes="" />
      <SizeList
        sizes={product.sizes}
        selected={sizeIndex}
        onClick={selectSize}
        classes="mb-auto"
      />
      <AddToCart product={product} sizeIndex={sizeIndex} />
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
function SizeList({
  sizes,
  selected,
  onClick,
  classes,
  detailed,
}: SizeListProps) {
  return (
    <ul className={"normal-case flex gap-2 list-none flex-wrap " + classes}>
      {sizes.map((t, index) => (
        <li key={t}>
          <JumpButton
            onClick={() => onClick(t, index)}
            classes={detailed ? "py-2 px-6" : ""}
            isSelected={index === selected}
          >
            {t} oz
          </JumpButton>
        </li>
      ))}
    </ul>
  );
}

function JumpButton({
  children,
  onClick,
  classes,
  isSelected,
}: JumpButtonProps) {
  const [effect, setEffect] = useState(false);
  const anim = effect ? " animate-lift " : "";
  const baseClasses = classes ? classes : "py-[0.25em] px-[0.5em] ";
  const style =
    "rounded-lg transition-colors whitespace-nowrap " + anim + baseClasses;
  return (
    <button
      type="button"
      className={
        isSelected
          ? style + " bg-indigo-400"
          : style + " bg-slate-700 hover:bg-slate-800 "
      }
      onClick={() => {
        onClick();
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {children}
    </button>
  );
}
