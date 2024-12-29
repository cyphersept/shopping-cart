import { IconLink } from "./IconLink";
import type { LinkObj } from "~/custom-types";

export function Socials(props: { linkData: LinkObj[]; classes: string }) {
  return (
    <div className={"socials flex align-middle " + props.classes}>
      {props.linkData.map((obj) => (
        <IconLink
          key={obj.text}
          url={obj.url}
          label={obj.text}
          icon={obj.icon}
        />
      ))}
    </div>
  );
}
