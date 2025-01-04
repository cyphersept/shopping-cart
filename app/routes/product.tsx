import { Form, useLoaderData } from "react-router";
import { getProductById } from "~/products";
import type { Route } from "./+types/product";
import type { Product } from "~/custom-types";
import { ProductPage } from "~/components/ProductElement";
import { useContext } from "react";
import { AllProductsContext } from "~/contexts";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { productId: params.itemId };
}

export default function Product() {
  const { productId }: { productId: string } = useLoaderData();
  const products = useContext(AllProductsContext);
  if (products.length === 0)
    throw new Response("Products list not found", { status: 404 });
  const product = getProductById(productId, products);
  if (!product)
    throw new Response("Product not found in list", { status: 404 });
  return (
    <>
      <ProductPage product={product} />
    </>
  );
}
