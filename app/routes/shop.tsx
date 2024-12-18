import type { Route } from "./+types/shop";
import type { Product } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { Pill } from "~/components/Pill";
import { getProducts, init } from "~/products";
import { useLoaderData } from "react-router";
import { ProductCard } from "~/components/ProductCard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await init();
  const products = await getProducts();
  if (!products) throw new Response("Not Found", { status: 404 });
  return { products };
}

export default function Shop() {
  return (
    <section className="p-12 flex gap-12">
      <aside>
        <SearchFilters />
      </aside>
      <ShopList classes="grow" />
    </section>
  );
}

function ShopList({ classes = "" }) {
  const { products }: { products: Product[] } = useLoaderData();
  return (
    <ul className={"list-none " + classes}>
      {products.map((p) => (
        <ProductCard key={p.itemId} product={p} />
      ))}
    </ul>
  );
}
