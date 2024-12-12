import { Form, useLoaderData } from "react-router";
import { getProductById } from "~/products";
import type { Route } from "./+types/product";
import type { Product } from "~/custom-types";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductById(params.itemId);
  return { product };
}

export default function ProductCard() {
  const { product } = useLoaderData();

  return <li className="list-image-none"></li>;
}
