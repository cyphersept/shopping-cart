import type { Product } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { AllProductsContext } from "~/contexts";
import { ProductCard } from "~/components/ProductElement";
import { useContext } from "react";

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
  const products: Product[] = useContext(AllProductsContext);
  return (
    <ul className={"list-none flex flex-wrap " + classes}>
      {products.map((p) => (
        <ProductCard key={p.itemId} product={p} />
      ))}
    </ul>
  );
}
