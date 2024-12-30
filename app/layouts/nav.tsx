import { Outlet, useRouteError } from "react-router";
import { NavBar } from "~/components/NavBar";
import { isRouteErrorResponse } from "react-router";
import { Footer } from "~/components/Footer";
import { init } from "~/products";
import { AllProductsContext, CartContext } from "~/contexts";
import { useEffect, useState } from "react";
import type { CartItem, Product } from "~/custom-types";
import { getSavedCart } from "~/cart";

export default function NavBarLayout() {
  const [products, setProducts] = useState([] as Product[]);
  const [cart, setCart] = useState([] as CartItem[]);

  // Find cart and product list stored in cookies
  useEffect(() => {
    Promise.all([init(), getSavedCart()]).then(([products, cart]) => {
      setProducts(products);
      setCart(cart);
    });
  }, []);
  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <NavBar />
        <AllProductsContext.Provider value={products}>
          <main>
            <Outlet />
            {/* <ErrorBoundary>
        </ErrorBoundary> */}
          </main>
        </AllProductsContext.Provider>
      </CartContext.Provider>
      <Footer />
    </>
  );
}

export function HydrateFallback() {
  return (
    <div id="loading-splash">
      <div id="loading-splash-spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "NESTED An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "NESTED The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
