import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { INPUT_CLASS } from "./field";

/**
 * A select you can type into: the input filters a long list (time zones,
 * countries) as you type. Built on Headless UI's Combobox, which supplies the
 * keyboard handling, ARIA roles and popup positioning but no styles, so the
 * look stays ours (INPUT_CLASS, the same as every other field).
 *
 * `options` is [{ value, label }]. `onChange` receives the chosen value, so it
 * is a drop-in for a native <select>'s `e.target.value`.
 */
export default function SearchSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select…",
  emptyText = "No matches",
}) {
  const [query, setQuery] = useState("");
  const selected = options.find((o) => o.value === value) ?? null;

  // Plain substring match on the label, e.g. "yerev" or "+04".
  const q = query.trim().toLowerCase();
  const visible = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;

  return (
    <Combobox
      value={selected}
      onChange={(option) => onChange(option?.value ?? "")}
      onClose={() => setQuery("")}
      immediate
    >
      <div className="relative">
        <ComboboxInput
          id={id}
          className={`${INPUT_CLASS} pr-9`}
          placeholder={placeholder}
          autoComplete="off"
          displayValue={(option) => option?.label ?? ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ComboboxButton
          aria-label="Show options"
          className="group absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-400"
        >
          <ChevronDown size={16} className="transition-transform group-data-open:rotate-180" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom start"
        transition
        className="z-50 mt-1 max-h-64 w-(--input-width) overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-xl outline-none [--anchor-gap:4px] empty:invisible dark:border-white/10 dark:bg-neutral-950 transition duration-100 ease-out data-closed:opacity-0"
      >
        {visible.length === 0 && (
          <div className="px-3 py-2 text-sm text-gray-500 dark:text-[#8A8A93]">{emptyText}</div>
        )}
        {visible.map((option) => (
          <ComboboxOption
            key={option.value}
            value={option}
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-base md:text-sm text-gray-700 select-none data-focus:bg-gray-100 data-selected:text-purple-600 dark:text-gray-200 dark:data-focus:bg-white/10 dark:data-selected:text-purple-400"
          >
            <span className="truncate">{option.label}</span>
            <Check size={14} className="invisible shrink-0 group-data-selected:visible" />
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
