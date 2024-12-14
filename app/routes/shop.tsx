import { Form, useLoaderData } from "react-router";
import { getProducts } from "~/products";
import type { Route } from "./+types/shop";
import type { Product } from "~/custom-types";
import { Accordion } from "~/components/Accordion";
import { useState } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // const product = await getProducts;
  // if (!product) throw new Response("Not Found", { status: 404 });
  // return { product };
}

export default function Shop() {
  //const { product } = useLoaderData();
  return (
    <>
      <Filters />
      <li className="list-image-none"></li>
    </>
  );
}

function Filters() {
  const price = (
    <Form>
      <label htmlFor="">
        Cost
        <input type="range" name="max-price" id="max-price" />
      </label>
    </Form>
  );
  return (
    <Form className="w-60">
      <Accordion title="Price" inner={price} />
    </Form>
  );
}
