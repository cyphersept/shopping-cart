import { Outlet, useRouteError } from "react-router";
import { NavBar } from "~/components/NavBar";
import { isRouteErrorResponse } from "react-router";
import { Footer } from "~/components/Footer";
import { init } from "~/products";
import { AllProductsContext } from "~/contexts";
import { useEffect, useState } from "react";
import type { Product } from "~/custom-types";

export default function NavBarLayout() {
  const [products, setProducts] = useState([] as Product[]);

  // Find cart stored in cookies
  useEffect(() => {
    const fetchData = async () => {
      const productData = await init();
      setProducts(productData);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <>
      <NavBar />
      <AllProductsContext.Provider value={products}>
        <main>
          <Outlet />
          {/* <ErrorBoundary>
        </ErrorBoundary> */}
        </main>
      </AllProductsContext.Provider>
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
