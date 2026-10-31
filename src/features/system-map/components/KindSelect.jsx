import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Box, Check, ChevronDown } from "lucide-react";
import { KIND_ICONS } from "../lib/nodeKinds";

/**
 * The part-type picker in the Inspector. Headless UI's Listbox (the same
 * library as profile/components/SearchSelect) gives the keyboard handling,
 * ARIA roles and a popup anchored outside the panel, so the list is never
 * clipped by the canvas; the look is ours and shows each type's icon and
 * one-line meaning.
 *
 * @param {{ id?: string, options: { kind: string, label: string, sub: string }[], value: string, onChange: (kind: string) => void }} props
 */
export default function KindSelect({ id, options, value, onChange }) {
  const selected = options.find((o) => o.kind === value) ?? options[0];
  const Icon = KIND_ICONS[selected?.kind] ?? Box;

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton
        id={id}
        className="group mt-1 flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-neutral-700 bg-black px-3 text-left text-sm text-white transition-colors hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-purple-400 data-open:border-purple-400"
      >
        <Icon size={15} aria-hidden="true" className="shrink-0 text-amber-300" />
        <span className="min-w-0 flex-1 truncate">{selected?.label}</span>
        <ChevronDown size={15} aria-hidden="true" className="shrink-0 text-neutral-400 transition-transform group-data-open:rotate-180" />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        transition
        className="thin-scrollbar z-50 max-h-72 w-(--button-width) min-w-60 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-xl shadow-black/60 outline-none [--anchor-gap:6px] transition duration-100 ease-out data-closed:opacity-0"
      >
        {options.map((option) => {
          const OptionIcon = KIND_ICONS[option.kind] ?? Box;
          return (
            <ListboxOption
              key={option.kind}
              value={option.kind}
              className="group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-200 select-none data-focus:bg-neutral-900"
            >
              <OptionIcon size={15} aria-hidden="true" className="shrink-0 text-amber-300" />
              <span className="min-w-0 flex-1">
                <span className="block truncate group-data-selected:text-purple-300">{option.label}</span>
                <span className="block truncate text-xs text-neutral-500">{option.sub}</span>
              </span>
              <Check size={14} aria-hidden="true" className="invisible shrink-0 text-purple-300 group-data-selected:visible" />
            </ListboxOption>
          );
        })}
      </ListboxOptions>
    </Listbox>
  );
}
