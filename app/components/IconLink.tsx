import type { IconLinkObj } from "~/custom-types";

export function IconLink({ url, label, icon }: IconLinkObj) {
  return (
    <a href={url} className={label} aria-label={label}>
      {icon}
    </a>
  );
}
