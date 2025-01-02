import { isSortType, type Product, type SortType } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { AllProductsContext } from "~/contexts";
import { ProductCard } from "~/components/ProductElement";
import { useContext } from "react";
import type { Route } from "../+types/root";
import { useLoaderData } from "react-router";
import { findProducts, sortProducts } from "~/products";

interface LoaderType {
  q: string;
  type: string;
  max: string;
  sort: string;
  sizes: number[];
}

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

  return { q, type, max, sort, sizes };
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
    <section className="p-12 flex gap-12 bg-heather-100 dark:bg-obsidian">
      <aside>
        <SearchFilters />
      </aside>
      <ShopList classes="grow" products={products} />
    </section>
  );
}

function ShopList({ products = [] as Product[], classes = "" }) {
  const styles =
    "list-none grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] h-fit gap-8 ";
  return (
    <ul className={styles + classes}>
      {products.map((p) => (
        <ProductCard key={p.itemId} product={p} />
      ))}
    </ul>
  );
}
