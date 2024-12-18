import { NavLink, Outlet, useRouteError } from "react-router";
import { Logo } from "../components/Logo";
import type { LinkObj } from "~/custom-types";

export function NavBar() {
  const navStyle = "p-4 text-lg hover-slide ";
  const navLinks: LinkObj[] = [
    { url: "/", text: "Home" },
    { url: "/shop", text: "Shop" },
    { url: "/about", text: "About" },
  ];
  return (
    <nav className="flex bg-violet-400 items-center gap-4">
      <Logo classes="mr-auto text-4xl p-4" />
      <NavList navLinks={navLinks} navStyle={navStyle} />
    </nav>
  );
}

export function NavList(p: { navLinks: LinkObj[]; navStyle?: string }) {
  const list = p.navLinks.map((l) => (
    <div className="text-lg" key={l.url}>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "hover-slide p-4 pending"
            : isActive
            ? "hover-slide p-4 active"
            : "hover-slide p-4"
        }
        to={l.url}
      >
        {l.text}
      </NavLink>
    </div>
  ));
  return list;
}
