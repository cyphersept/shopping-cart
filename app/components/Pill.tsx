import type { ReactNode } from "react";

interface PillProps {
  children?: React.ReactNode;
  classes: string;
}

export function Pill({ children, ...props }: PillProps): React.ReactElement {
  return (
    <div
      className={
        "rounded-xl color-slate-800 bg-violet-200 px-[1em] py-[0.5em] text-center " +
        props.classes
      }
    >
      {children}
    </div>
  );
}
