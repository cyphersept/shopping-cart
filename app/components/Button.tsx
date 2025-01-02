import { useState, type PropsWithChildren } from "react";
import { useProductContext } from "~/contexts";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  classes?: string;
}

export function SlideButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <NoSlideButton
      type={props.type ?? "button"}
      classes={
        "before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-heather-300 before:mix-blend-multiply before:transition-all before:duration-500 hover:before:w-full grow [&>*]:z-10 " +
        props.classes
      }
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </NoSlideButton>
  );
}

export function NoSlideButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={props.type ?? "button"}
      className={
        "text-2xl border-double border-4 outline-4 font-serif outline outline-heather-500 py-3 px-6 text-heather-50 bg-heather-500 relative shadow-2xl transition-all grow [&>*]:relative [&>*]:-top-0.5 " +
        props.classes
      }
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}

export function JumpButton({
  children,
  index,
  classes,
}: {
  children: React.ReactNode;
  index: number;
  classes?: string;
}) {
  const { sizeIndex, setSizeIndex } = useProductContext();
  const [effect, setEffect] = useState(false);
  const style = [
    "rounded-lg transition-colors text-white shadow-sm whitespace-nowrap ",
    effect ? "animate-lift" : "",
    classes ? classes : "py-[0.25em] px-[0.5em]",
  ].join(" ");
  return (
    <button
      type="button"
      className={
        index === sizeIndex
          ? style + " bg-heather-500 dark:bg-heather-400"
          : style + " bg-indigo-900 hover:bg-black saturate-50"
      }
      onClick={() => {
        setSizeIndex(index);
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {children}
    </button>
  );
}
