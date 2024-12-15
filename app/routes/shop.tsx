import type { Route } from "./+types/shop";
import type { Product } from "~/custom-types";
import { SearchFilters } from "~/components/Filters";
import { Pill } from "~/components/Pill";
import { SearchBar } from "~/components/Searchbar";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // const product = await getProducts;
  // if (!product) throw new Response("Not Found", { status: 404 });
  // return { product };
}

export default function Shop() {
  //const { product } = useLoaderData();
  return (
    <section className="p-12">
      <SearchFilters />
      <SearchBar />
    </section>
  );
}

function Card(product: Product) {
  const tagList = (
    <ul className="capitalize flex gap-2 list-none">
      {product.tags.map((t) => (
        <Pill key={t} color="slate-800" bg="violet-200">
          {t}
        </Pill>
      ))}
    </ul>
  );
  return (
    <li className="card p-4 flex flex-col gap-4">
      <img src={product.imgSrc} alt={"Image of " + product.name} />
      <h3 className="">{product.name}</h3>
      <Pill color="violet-200" rounded="md">
        {"$" + product.price}
      </Pill>
    </li>
  );
}
