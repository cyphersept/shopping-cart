import { NavLink } from "react-router";
import type { LinkObj } from "~/custom-types";
import bgLeft from "../images/stencil_left.png";
import bgRight from "../images/stencil_right.png";
import separator from "../images/separator.svg";

export function Featured({
  title,
  items,
}: {
  title: string;
  items: LinkObj[];
}) {
  const bgClass = "absolute h-full w-auto mix-blend-soft-light top-0 ";
  return (
    <section className="relative p-16 bg-gradient-to-t bg-heather-700 text-heather-50 overflow-hidden">
      <img src={bgLeft} alt="" className={bgClass + "-left-8"} />
      <img src={bgRight} alt="" className={bgClass + "-right-12"} />
      <div className="flex flex-col gap-8 relative z-10">
        <h2 className="text-5xl text-center">{title}</h2>
        <div className="flex justify-center items-start gap-16">
          {items.map((link) => (
            <FeatureLink link={link} key={link.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureLink({ link }: { link: LinkObj }) {
  return (
    <NavLink
      to={link.url}
      className="flex flex-col items-center w-52 h-[17.2rem] p-8 pb-4 rounded-lg shadow-2xl backdrop-blur-lg bg-gradient-to-b from-violet-200/40 via-heather-400/40 to-heather-500/30 transition-transform hover:-translate-y-4 "
    >
      <img src={link.imgSrc} alt="" className="rounded-md" />
      <img
        src={separator}
        alt=""
        className="mt-4 mb-3 mx-2 mix-blend-multiply"
      />
      <p className="text-2xl text-center -mx-2 min-w-24">{link.text}</p>
    </NavLink>
  );
}
