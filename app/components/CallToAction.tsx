import type { ReactNode } from "react";
import { MdAvTimer, MdColorize, MdFreeCancellation } from "react-icons/md";
import { SlideButton } from "./Button";
import { NavLink } from "react-router";
import border from "../images/border_top_tint.png";

export function CallToAction() {
  return (
    <section className="text-indigo-950 bg-heather-100 dark:bg-obsidian dark:text-heather-200  00 p-16 flex flex-col items-center gap-4 font-serif relative overflow-hidden [&>*]:z-10">
      <h2 className="text-5xl dark:text-heather-50">Love our tea?</h2>
      <p className="text-xl text-center [word-spacing:1.5px]">
        Sign up for a yearly subscription and save 40% on each order! You'll get
        an extra tea as a thank you from us. No strings attached, simple
        one-click cancellation at any time.
      </p>

      <ul className="flex gap-16 items-center my-4">
        <CTAItem icon={<MdColorize />} text="Pick your favourite tea" />
        <CTAItem icon={<MdAvTimer />} text="Choose delivery frequency" />
        <CTAItem
          icon={<MdFreeCancellation />}
          text="Cancel or change anytime"
        />
      </ul>
      <div>
        <SlideButton classes="dark:bg-heather-700 dark:outline-heather-700 dark:border-heather-200 ">
          <NavLink to="/subscription">Subscribe Now</NavLink>
        </SlideButton>
        <p className="text-stroke bg-gradient-to-b from-transparent to-transparent via-heather-100 z-[5] text-indigo-950 dark:bg-none dark:text-heather-400 mt-4 mb-12">
          Existing subscriber?
          <span className="underline text-sm"> Manage your subscription</span>.
        </p>
      </div>
      <img
        src={border}
        alt=""
        className="absolute w-full h-auto opacity-90 dark:opacity-60 dark:mix-blend-color-burn -scale-y-100 -bottom-4 mix-blend-multiply !z-0"
      />
    </section>
  );
}

function CTAItem({ icon, text }: { icon: ReactNode; text: string }) {
  const glass =
    "bg-violet-900/20 shadow-lg bg-gradient-to-t from-violet-200/40 via-heather-400/30 to-violet-950/25 dark:from-heather-400/40 dark:to-heather-800/20 ";
  const hJump = " transition-transform hover:-translate-y-4 ";
  return (
    <li
      className={
        "flex flex-col items-center gap-2 p-6 rounded-lg w-48 " + hJump + glass
      }
    >
      <div className="text-[6rem]">{icon}</div>
      <span className="text-center text-lg -mx-2">{text}</span>
    </li>
  );
}
