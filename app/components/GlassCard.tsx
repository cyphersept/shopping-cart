import type { PropsWithChildren } from "react";

interface GlassCardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function GlassCard({
  children,
  ...otherProps
}: PropsWithChildren<GlassCardProps>) {
  return (
    <div className="rounded-lg shadow-2xl backdrop-blur-lg bg-gradient-to-b from-violet-200/40 via-heather-400/40 to-heather-500/30 transition-transform hover:-translate-y-4 ">
      <img src={link.imgSrc} alt="" className="rounded-md" />
      <img
        src={separator}
        alt=""
        className="mt-4 mb-3 mx-2 mix-blend-multiply"
      />
      <p className="text-2xl text-center -mx-2 min-w-24">{link.text}</p>
    </div>
  );
}
