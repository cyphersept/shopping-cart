import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { CallToAction } from "~/components/CallToAction";
import { HeroBanner } from "~/components/Hero";
import { Featured } from "~/components/Featured";
import { productImages, banner } from "~/images";
import { SVGFrame } from "~/components/SVGFrame";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <HeroBanner
        content={{
          title: "Natural Cure",
          imgSrc: banner,
          description:
            "Creating delicious, organic blends and all-natural herbal remedies for every ailment and occasion since 1973.",
        }}
        link={{ text: "Shop Now", url: "/shop" }}
      />
      <Featured
        title="Shop Categories"
        items={[
          { url: "/shop", text: "Featured", imgSrc: productImages[0] },
          { url: "/shop", text: "New Products", imgSrc: productImages[1] },
          { url: "/shop", text: "Deals", imgSrc: productImages[2] },
        ]}
      />
      <CallToAction />
    </>
  );
}
