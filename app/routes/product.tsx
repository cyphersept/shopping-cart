import { Form, useLoaderData } from "react-router";
import { getProductById } from "~/products";
import type { Route } from "./+types/product";
import type { Product } from "~/custom-types";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const product = await getProductById(params.itemId);
  if (!product) throw new Response("Not Found", { status: 404 });

  return { product };
}

export default function ProductCard() {
  const { product } = useLoaderData();

  return <li className="list-image-none"></li>;
}
