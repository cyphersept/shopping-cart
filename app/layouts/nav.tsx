import { Outlet, useRouteError } from "react-router";
import { NavBar } from "~/components/NavBar";
import { isRouteErrorResponse } from "react-router";
import { Footer } from "~/components/Footer";
import { ImSpinner3 } from "react-icons/im";
import { useState } from "react";
import CartMenu from "~/routes/cart";
import { ShowCartContext } from "~/contexts";

export default function NavBarLayout() {
  const [showCart, setShowCart] = useState(true);
  return (
    <div
      className={
        showCart
          ? "h-screen overflow-y-hidden [scrollbar-gutter:stable]"
          : "[scrollbar-gutter:stable]"
      }
    >
      <NavBar />
      <CartMenu />
      <main className="relative">
        <Outlet />
        {/* <ErrorBoundary>
        </ErrorBoundary> */}
      </main>
      <Footer />
    </div>
  );
}

export function HydrateFallback() {
  return (
    <>
      <NavBar />
      <main className="p-16 text-xl text-heather-400 mx-auto">
        <ImSpinner3 className="animate-spin inline mr-[1em]"></ImSpinner3>
        <span>Loading, please wait...</span>
      </main>
    </>
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
