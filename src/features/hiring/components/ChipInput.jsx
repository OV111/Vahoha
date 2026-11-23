import { useState } from "react";
import { X } from "lucide-react";

// Free-text tags (the job's stack): type and press Enter or comma; Backspace on
// an empty field removes the last one.
const ChipInput = ({ id, value, onChange, max, itemMax, placeholder }) => {
  const [text, setText] = useState("");

  const add = () => {
    const item = text.trim().replace(/,$/, "").slice(0, itemMax);
    if (item && !value.some((v) => v.toLowerCase() === item.toLowerCase()) && value.length < max) onChange([...value, item]);
    setText("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30">
      {value.map((v) => (
        <span key={v} className="inline-flex items-center gap-1 rounded-md bg-white/10 py-0.5 pr-1 pl-2 text-[13px] text-neutral-100">
          {v}
          <button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(value.filter((x) => x !== v))} className="rounded p-0.5 hover:bg-white/10">
            <X size={11} aria-hidden="true" />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !text && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={add}
        disabled={value.length >= max}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm text-white placeholder:text-neutral-500 outline-none"
      />
    </div>
  );
};

export default ChipInput;
