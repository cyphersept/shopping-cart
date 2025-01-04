import { isSortType, type Product, type SortType } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { AllProductsContext } from "~/contexts";
import { ProductCard } from "~/components/ProductElement";
import { useContext, useRef, useState } from "react";
import type { Route } from "../+types/root";
import { useLoaderData, useNavigation } from "react-router";
import { findProducts, sortProducts } from "~/products";
import { BackButton } from "~/components/Button";

export async function clientLoader({ request }: Route.LoaderArgs) {
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

  return { q, type, max, sort, sizes, loaded: true };
}

export default function Shop() {
  const { q, type, max, sort, sizes } = useLoaderData() as Awaited<
    ReturnType<typeof clientLoader>
  >;
  let products = useContext(AllProductsContext);
  if (q) products = findProducts(q + "", products, ["name", "tags"]);
  if (type) products = findProducts(type, products, ["tags"]);
  if (max) products = products.filter((p) => p.sizes[0] * p.price < max);
  if (sizes.length > 0)
    products = products.filter((p) =>
      sizes.every((size) => p.sizes.includes(size))
    );
  if (sort) products = sortProducts(sort, products);
  return (
    <div className="p-12 flex gap-12 bg-heather-100 dark:bg-obsidian">
      <aside>
        <SearchFilters />
      </aside>
      <section className="grow">
        <h1 className="text-5xl mb-6">Results ({products.length}):</h1>
        <ShopList products={products} />
      </section>
    </div>
  );
}

function ShopList({ products = [] as Product[] }) {
  const fade = "opacity-0 ";
  const parentRef = useRef<HTMLUListElement>(null);
  const [animate, setAnimate] = useState("");
  const [prev, setPrev] = useState(products);
  if (products !== prev && animate !== fade) {
    setAnimate(fade);
    setTimeout(() => {
      setAnimate("");
      setPrev(products);
    }, 250);
  }

  return (
    <ul
      className={
        "list-none grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 will-change-contents transition-all duration-200 " +
        animate
      }
      onTransitionEnd={() => []}
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
