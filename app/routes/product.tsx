import { useLoaderData } from "react-router";
import { getProductById, init } from "~/products";
import type { Route } from "./+types/product";
import type { Product } from "~/custom-types";
import { ProductPage } from "~/components/ProductElement";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const productId = params.itemId;
  const products = await init();
  const product = getProductById(productId, products);

  return { product };
}

export default function Product() {
  const { product }: { product: Product } = useLoaderData();
  return (
    <>
      <ProductPage product={product} />
    </>
  );
}
