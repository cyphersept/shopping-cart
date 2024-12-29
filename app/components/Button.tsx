import type { PropsWithChildren } from "react";

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
    <button
      type={props.type ?? "button"}
      className={
        "text-2xl my-4 border-double border-4 outline-4 outline outline-heather-500 py-3 px-20 text-heather-50 bg-heather-500 relative shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-heather-200 before:mix-blend-multiply before:transition-all before:duration-500 hover:before:w-full grow [&>*]:relative [&>*]:z-10 " +
        props.classes
      }
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
