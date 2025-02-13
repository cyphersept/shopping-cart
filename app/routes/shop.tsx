import { isSortType, type Product, type SortType } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { ProductCard } from "~/components/ProductElement";
import { useRef, useState } from "react";
import type { Route } from "../+types/root";
import { useLoaderData, useNavigation } from "react-router";
import { findProducts, init, sortProducts } from "~/products";
import { ImSpinner3 } from "react-icons/im";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const products = await init();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const type = url.searchParams.get("type");
  const sort: SortType = isSortType(url.searchParams.get("sort"));
  const maxStr = url.searchParams.get("max");
  const max = maxStr && !isNaN(parseInt(maxStr)) ? parseInt(maxStr) : null;
  const sizes = [0]
    .concat(
      url.searchParams.has("sm") ? [1, 1.5] : [],
      url.searchParams.has("md") ? [2, 3] : [],
      url.searchParams.has("lg") ? [4] : [],
      url.searchParams.has("xl") ? [8] : []
    )
    .slice(1);

  return { products, q, type, max, sort, sizes, loaded: true };
}

export default function Shop() {
  const { products, q, type, max, sort, sizes } = useLoaderData() as Awaited<
    ReturnType<typeof clientLoader>
  >;
  let prodList = products;
  if (q) prodList = findProducts(q + "", prodList, ["name", "tags"]);
  if (type) prodList = findProducts(type, prodList, ["tags"]);
  if (max) prodList = prodList.filter((p) => p.sizes[0] * p.price < max);
  if (sizes.length > 0)
    prodList = prodList.filter((p) =>
      sizes.every((size) => p.sizes.includes(size))
    );
  if (sort) prodList = sortProducts(sort, prodList);
  return (
    <div className="p-12 flex gap-12 bg-heather-100 dark:bg-obsidian">
      <aside>
        <SearchFilters />
      </aside>
      <section className="grow">
        <h1 className="text-5xl mb-6">Results ({prodList.length}):</h1>
        <ShopList products={prodList} />
      </section>
    </div>
  );
}

export function HydrateFallback() {
  return (
    <div className="p-12 flex gap-12 bg-heather-100 dark:bg-obsidian">
      <aside>
        <SearchFilters />
      </aside>
      <section className="grow">
        <h1 className="text-5xl mb-6">Loading...</h1>
        <div className=" text-xl text-heather-400">
          <ImSpinner3 className="animate-spin inline mr-[1em]"></ImSpinner3>
          <span>Loading, please wait...</span>
        </div>
      </section>
    </div>
  );
}

function ShopList({ products = [] as Product[] }) {
  const fade = " opacity-0 ";
  const parentRef = useRef<HTMLUListElement>(null);
  const [animate, setAnimate] = useState("");
  const [prev, setPrev] = useState([] as Product[]);
  if (products !== prev && animate !== fade) {
    // Prevent flicker on first-time render
    if (prev.length === 0) {
      setAnimate(fade);
      setPrev(products);
      setTimeout(() => {
        setAnimate("");
      }, 150);
    } else {
      setAnimate(fade);
      setTimeout(() => {
        setAnimate("");
        setPrev(products);
      }, 250);
    }
  }

  return (
    <ul
      className={
        "list-none grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 will-change-contents transition-all duration-300 " +
        animate
      }
      ref={parentRef}
    >
      {prev.length === 0 ? (
        <li className="text-3xl text-heather-500">No items found.</li>
      ) : (
        prev.map((p) => <ProductCard key={p.itemId} product={p} />)
      )}
    </ul>
  );
}
