import { NavLink, useRouteError } from "react-router";
import { Logo } from "../components/Logo";
import type { LinkObj } from "~/custom-types";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartContext } from "~/contexts";

export function NavBar() {
  const { cart, showCart, setShowCart } = useCartContext();
  const navStyle = "px-2 py-4 text-lg hover-slide ";
  const navLinks: LinkObj[] = [
    { url: "/", text: "Home" },
    { url: "/shop", text: "Shop" },
    { url: "/about", text: "About" },
  ];
  return (
    <nav className="flex bg-heather-600 items-center gap-6 px-4 z-30 shadow-lg text-heather-50">
      <Logo classes="!mr-[calc(100vw-45.5rem)] text-4xl p-4" />
      <NavList navLinks={navLinks} navStyle={navStyle} />
      <button
        type="button"
        onClick={() => {
          setShowCart(!showCart);
          console.log("Cart clicked. New value: " + showCart);
        }}
        className="flex px-2 py-4 text-lg hover-slide "
      >
        Cart ({cart.reduce((prev, curr) => prev + curr.quantity, 0)})
      </button>
    </nav>
  );
}

export function NavList(p: { navLinks: LinkObj[]; navStyle?: string }) {
  const list = p.navLinks.map((l) => (
    <div className="text-lg" key={l.text}>
      <NavLink
        viewTransition
        className={({ isActive, isPending }) =>
          isPending
            ? "pending " + p.navStyle
            : isActive
            ? "active " + p.navStyle
            : p.navStyle
        }
        to={l.url}
      >
        {l.text}
      </NavLink>
    </div>
  ));
  return list;
}
