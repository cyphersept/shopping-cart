import { PiFlowerLotusDuotone } from "react-icons/pi";

export function Logo({ classes }: { classes: string }) {
  return (
    <div className={"logo flex items-center gap-2 " + classes}>
      <PiFlowerLotusDuotone className="text-[calc(4em/3)]" />
      <span>Shopping App</span>
    </div>
  );
}
