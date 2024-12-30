import { useState, type ReactElement, type ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export function Accordion(props: {
  inner: ReactElement;
  title?: string;
  classes?: string;
  defaultOpen?: boolean;
}) {
  const [openState, setOpenState] = useState(props.defaultOpen ?? false);
  const toggle = () => setOpenState(!openState);
  const s = " shadow-[inset_0_1px_0_0_theme(colors.slate.50)] ";
  const o = openState
    ? " max-h-60 duration-300 ease-out"
    : " max-h-0 duration-400 ease-in-out";
  const arrowIcon = openState ? <FaChevronUp /> : <FaChevronDown />;
  const up = openState ? " -rotate-180" : " rotate-0";

  return (
    <div
      className={
        "accordion border-t border-violet-900/80 dark:border-slate-50 " +
        props.classes
      }
    >
      <button
        type="button"
        onClick={toggle}
        className={
          "p-2 text-lg font-bold w-full flex items-center justify-between"
        }
      >
        {props.title}
        <FaChevronDown className={"transition-transform" + up} />
      </button>
      <div className={"overflow-hidden transition-[max-height]" + o}>
        <div className="px-4 pt-2 pb-6">{props.inner}</div>
      </div>
    </div>
  );
}
