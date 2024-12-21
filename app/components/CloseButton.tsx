import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

export function CloseButton({ classes }: { classes?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="close cart"
      className={"text-slate-400 " + classes}
      onClick={() => navigate(-1)}
    >
      <HiXMark />
    </button>
  );
}
