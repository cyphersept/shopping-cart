import { NavLink, Outlet, useRouteError } from "react-router";
import { NavBar } from "~/components/NavBar";
import { Logo } from "../components/Logo";
import { isRouteErrorResponse } from "react-router";
import { Footer } from "~/components/Footer";

export default function NavBarLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        {/* <ErrorBoundary>
        </ErrorBoundary> */}
      </main>
      <Footer />
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
