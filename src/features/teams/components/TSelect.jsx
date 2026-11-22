import { Fragment } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

/**
 * The Teams dropdown. A native <select> opens an OS-drawn list (light blue
 * highlight on Windows) that CSS can't theme, so this uses Headless UI's
 * Listbox for keyboard handling and ARIA, with the teams-theme look.
 *
 * Pass flat `options` ({ value, label, disabled? }) or `groups`
 * ({ label, options }) for a sectioned list.
 */
export default function TSelect({ value, onChange, options, groups, disabled, label, className = "" }) {
  const sections = groups ?? [{ label: null, options: options ?? [] }];
  const all = sections.flatMap((s) => s.options);
  const selected = all.find((o) => o.value === value);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <ListboxButton aria-label={label} className={`t-select ${className}`}>
        <span className="min-w-0 flex-1 truncate">{selected?.label ?? "Select"}</span>
        <ChevronDown size={14} aria-hidden="true" className="t-select-chevron" />
      </ListboxButton>

      <ListboxOptions anchor="bottom start" transition className="t-select-list teams-theme-popover">
        {sections.map((section, i) => (
          <Fragment key={section.label ?? i}>
            {section.label && <div className="t-select-group">{section.label}</div>}
            {section.options.map((o) => (
              <ListboxOption key={o.value} value={o.value} disabled={o.disabled} className="t-select-option">
                <span className="min-w-0 flex-1 truncate">{o.label}</span>
                <Check size={13} aria-hidden="true" className="t-select-check" />
              </ListboxOption>
            ))}
          </Fragment>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
