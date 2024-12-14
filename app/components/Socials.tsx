import { IconLink } from "./IconLink";
import type { IconLinkObj } from "~/custom-types";

export function Socials(props: { linkData: IconLinkObj[]; classes: string }) {
  return (
    <div className={"socials flex align-middle " + props.classes}>
      {props.linkData.map((obj) => (
        <IconLink url={obj.url} label={obj.label} icon={obj.icon} />
      ))}
    </div>
  );
}
