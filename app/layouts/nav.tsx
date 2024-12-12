import { NavLink, Outlet, useRouteError } from "react-router";
import { NavBar } from "~/components/NavBar";
import { Logo } from "../components/Logo";
import type { LinkObj } from "~/custom-types";
import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";

export default function NavBarLayout() {
  const navStyle = "p-4 text-lg hover-slide ";
  const navLinks: LinkObj[] = [
    { url: "/", text: "Home" },
    { url: "/shop", text: "Shop" },
    { url: "/about", text: "About" },
  ];
  return (
    <>
      <NavBar />
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
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
