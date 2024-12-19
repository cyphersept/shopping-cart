import { Pill } from "./TextDecorations";
import { MdAvTimer, MdColorize, MdFreeCancellation } from "react-icons/md";

export function CallToAction() {
  return (
    <section className="text-indigo-950 bg-stone-200 p-16 flex flex-col items-center gap-4 font-serif">
      <h2 className="text-5xl">Love our tea?</h2>
      <p className="text-xl text-center">
        Sign up for a yearly subscription and save 40%! You'll get an extra tea
        as a thank you from us. No strings attached, simple one-click
        cancellation at any time.
      </p>

      <ul className="flex gap-16 items-center my-4">
        <li className="flex flex-col items-center gap-4">
          <Pill classes="bg-slate-300">
            <MdColorize className="text-[6rem]" />
          </Pill>
          <Pill classes="bg-slate-300">Pick your favourite tea</Pill>
        </li>
        <li className="flex flex-col items-center gap-4">
          <Pill classes="bg-slate-300">
            <MdAvTimer className="text-[6rem]" />
          </Pill>
          <Pill classes="bg-slate-300">Choose delivery frequency</Pill>
        </li>
        <li className="flex flex-col items-center gap-4">
          <Pill classes="bg-slate-300">
            <MdFreeCancellation className="text-[6rem]" />
          </Pill>
          <Pill classes="bg-slate-300">Cancel or change anytime</Pill>
        </li>
      </ul>
      <button
        type="button"
        className="bg-indigo-400 px-4 pt-2 pb-3 text-2xl rounded-xl "
      >
        Subscribe now
      </button>
      <p>
        Existing subscriber?
        <span className="underline text-sm"> Manage your subscription</span>.
      </p>
    </section>
  );
}
