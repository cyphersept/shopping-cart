import { Logo } from "./Logo";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Socials } from "./Socials";
import { Form } from "react-router";
import { NavList } from "./NavBar";

export function Footer() {
  const socials = [
    { url: "", label: "twitter link", icon: <FaTwitter /> },
    { url: "", label: "instagram link", icon: <FaInstagram /> },
    { url: "", label: "facebook link", icon: <FaFacebook /> },
  ];
  return (
    <footer className="flex flex-wrap justify-center mt-auto p-16 gap-x-16 gap-y-4 text-lg bg-slate-500 ">
      <div className="cta md:w-[calc(50%-2rem)] align-text-bottom ">
        Sign up to our newsletter to get the latest deals delivered straight to
        your inbox!
      </div>
      <Form className=" md:w-[calc(50%-2rem)] flex flex-wrap gap-x-16 gap-y-4 items-baseline">
        <label className="">
          Your email
          <input
            type="email"
            name="email"
            id="email"
            className="ml-4 w-auto border-b-2 border-white "
          />
        </label>
        <button
          type="submit"
          className="rounded-xl border-slate-50 border-2 box-content py-2 px-8 transition-shadow hover:shadow-inner shadow-slate-700  "
        >
          Subscribe Now
        </button>
      </Form>
      <div className=" md:w-[calc(50%-2rem)] text-2xl">
        <Logo />
        <Socials linkData={socials} classes="text-4xl gap-4 mt-4" />
      </div>
      <Sitemaps classes=" md:w-[calc(50%-2rem)] " />
    </footer>
  );
}

function Sitemaps({ classes }: { classes: string }) {
  const help = [
    { url: "/faq", text: "FAQ" },
    { url: "/support", text: "Support" },
    { url: "/contact", text: "Contact" },
  ];
  const other = [
    { url: "/privacy", text: "Privacy" },
    { url: "/sitemap", text: "Sitemap" },
    { url: "/subscription", text: "Subscription" },
  ];
  return (
    <div className={"section flex gap-16 " + classes}>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Help</h3>
        <NavList navLinks={help} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Other</h3>
        <NavList navLinks={other} />
      </div>
    </div>
  );
}
