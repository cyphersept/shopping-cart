import { Form, useLoaderData } from "react-router";
import { getProductById } from "~/products";
import type { Route } from "./+types/product";
import type { Product } from "~/custom-types";
import { ProductElement } from "~/components/ProductElement";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const product = await getProductById(params.itemId);
  if (!product) throw new Response("Not Found", { status: 404 });

  return { product };
}

export default function Product() {
  const { product }: { product: Product } = useLoaderData();
  return (
    <>
      <ProductElement product={product} type="PAGE" />
    </>
  );
}
