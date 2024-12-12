import { NavLink, Outlet } from "react-router";
import { Logo } from "../components/Logo";
import type { LinkObj } from "~/custom-types";

export default function NavBarLayout() {
  const navStyle = "p-4 text-lg hover-slide ";
  const navLinks: LinkObj[] = [
    { url: "/", text: "Home" },
    { url: "/shop", text: "Shop" },
    { url: "/about", text: "About" },
  ];
  return (
    <>
      <nav className="flex bg-violet-400 items-center gap-4">
        <Logo classes="mr-auto text-4xl p-4" />
        {navLinks.map((l) => (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? navStyle + "pending"
                : isActive
                ? navStyle + "active"
                : navStyle
            }
            key={l.url}
            to={l.url}
          >
            {l.text}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
