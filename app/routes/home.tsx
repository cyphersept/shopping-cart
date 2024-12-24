import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { CallToAction } from "~/components/CallToAction";
import { HeroBanner } from "~/components/Hero";
import bannerImg from "../images/banner.jpg";

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
          title: "All-natural herbal teas for every occasion",
          imgSrc: bannerImg,
          description:
            "All-natural herbal rememdies for every ailment and occasion",
        }}
      />
      <Welcome />
      <CallToAction />
    </>
  );
}
