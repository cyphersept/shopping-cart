import { NavLink } from "react-router";
import type { HeroObj, LinkObj } from "~/custom-types";
import { SlideButton } from "./Button";

export function HeroBanner({
  content,
  link,
}: {
  content: HeroObj;
  link?: LinkObj;
}) {
  return (
    <header className="flex w-full min-h-96 py-20 items-center relative">
      <img
        src={content.imgSrc}
        alt=""
        className="absolute w-full h-full object-cover -scale-[1] "
      />
      <div className="z-10 w-3/5 ml-16 flex flex-col items-start gap-6">
        <h1 className="text-7xl text-heather-50 text-shadow">
          {content.title}
        </h1>
        <p className="text-2xl text-slate-600">{content.description}</p>
        {link && (
          <SlideButton>
            <NavLink to={link.url}>{link.text}</NavLink>
          </SlideButton>
        )}
      </div>
    </header>
  );
}
