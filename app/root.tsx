import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { useEffect, useState } from "react";
import type { CartItem, Product } from "./custom-types";
import { init } from "./products";
import { getSavedCart } from "./cart";
import { AllProductsContext, CartContext } from "./contexts";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    as: "font",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Corben:wght@400;700&display=swap",
    as: "font",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [products, setProducts] = useState([] as Product[]);
  const [cart, setCart] = useState([] as CartItem[]);
  const [showCart, setShowCart] = useState(false);

  // Find cart and product list stored in cookies
  useEffect(() => {
    const getProducts = async () => {
      setProducts(await init());
      setCart(await getSavedCart());
    };
    getProducts();
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart, showCart, setShowCart }}>
      <AllProductsContext.Provider value={products}>
        <Outlet />
      </AllProductsContext.Provider>
    </CartContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
