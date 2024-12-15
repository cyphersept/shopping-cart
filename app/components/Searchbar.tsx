import { useState } from "react";

export function SearchBar({ classes = "" }) {
  const [show, setShow] = useState(true);
  const o = show ? " opacity-full " : " opacity-0 ";
  return (
    <div className="searchbar relative">
      <label className={"absolute p-2 z-10" + classes + o} htmlFor="searchbar">
        Search...
      </label>
      <input
        type="text"
        className="p-2 left-0 w-auto border-b border-slate-50  "
        title="searchbar"
        onChange={(e) => {
          setShow(e.target.value === "");
        }}
      />
    </div>
  );
}
