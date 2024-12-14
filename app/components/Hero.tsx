import type { HeroObj } from "~/custom-types";

export function HeroBanner(content: HeroObj) {
  return (
    <header className="flex items-center gap-8 p-16 relative">
      <img
        src={content.imgSrc}
        alt=""
        className="absolute left-0 right-0 bottom-0 top-0 w-full h-full -z-10"
      />
      <h1>{content.title}</h1>
      <p className="text-xl">{content.description}</p>
    </header>
  );
}
