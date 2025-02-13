import type { LinkObj } from "~/custom-types";

export function IconLink({ url, text, icon }: LinkObj) {
  return (
    <a href={url} className={text} aria-label={text}>
      {icon}
    </a>
  );
}
