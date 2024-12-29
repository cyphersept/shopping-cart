import { FloralFrame } from "~/images/frame";

export function SVGFrame({ classes }: { classes?: string }) {
  return (
    <div className={classes ?? "w-full h-full"}>
      <FloralFrame />
    </div>
  );
}
