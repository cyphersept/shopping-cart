import { useState, type ReactElement, type ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export function Accordion(props: {
  inner: ReactElement;
  title?: string;
  classes?: string;
}) {
  const [openState, setOpenState] = useState(false);
  const toggle = () => setOpenState(!openState);
  const scale = openState ? "scale-100 " : "scale-y-0 ";
  const arrowIcon = openState ? <FaChevronUp /> : <FaChevronDown />;
  return (
    <div className={"accordion " + props.classes}>
      <button
        type="button"
        onClick={toggle}
        className="p-4 text-lg font-bold w-full flex items-center justify-between"
      >
        {props.title}
        {arrowIcon}
      </button>
      <div className={scale + "p-2 transition-transform"}>{props.inner}</div>
    </div>
  );
}
