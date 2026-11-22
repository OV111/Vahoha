import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, MotionConfig } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

/**
 * A dark, styled replacement for <select>. A native select's open list is drawn
 * by the OS (white on Windows) and can't be themed, so this draws its own.
 *
 * Follows the ARIA "select-only combobox" pattern: the button is the combobox,
 * the list is a listbox. Keyboard: Enter/Space/↓ open, ↑/↓ move, Home/End jump,
 * Enter selects, Escape or Tab closes, typing a letter jumps to the first match.
 *
 * options: [{ value, label }]. `value` is matched with String() so "" works.
 */
export default function Dropdown({ label, value, options, onChange, className = "", align = "left" }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const selectedIndex = Math.max(0, options.findIndex((o) => String(o.value) === String(value)));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };
  const choose = (i) => {
    onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    const last = options.length - 1;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") return setOpen(false);
    if (e.key === "ArrowDown") return e.preventDefault(), setActive((a) => Math.min(last, a + 1));
    if (e.key === "ArrowUp") return e.preventDefault(), setActive((a) => Math.max(0, a - 1));
    if (e.key === "Home") return e.preventDefault(), setActive(0);
    if (e.key === "End") return e.preventDefault(), setActive(last);
    if (e.key === "Enter" || e.key === " ") return e.preventDefault(), choose(active);
    if (e.key.length === 1) {
      const i = options.findIndex((o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} className={`relative ${className}`}>
        <button
          type="button"
          role="combobox"
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-[13px] text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 ${
            open ? "border-purple-500/60 bg-white/[0.06]" : "border-white/10 bg-white/[0.04] hover:border-white/25"
          }`}
        >
          <span className="truncate">{selected?.label}</span>
          <ChevronDown
            size={14}
            className={`shrink-0 text-neutral-500 transition-transform duration-200 ${open ? "rotate-180 text-purple-300" : ""}`}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence>
          {open && (
            <Motion.ul
              ref={listRef}
              id={`${id}-list`}
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className={`absolute top-full z-40 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-xl border border-white/10 bg-neutral-950 p-1 shadow-2xl shadow-black/60 ${
                align === "right" ? "right-0" : "left-0"
              }`}
            >
              {options.map((o, i) => {
                const isSelected = i === selectedIndex;
                return (
                  <li
                    key={String(o.value)}
                    id={`${id}-opt-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onPointerEnter={() => setActive(i)}
                    onClick={() => choose(i)}
                    className={`flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] ${
                      i === active ? "bg-white/[0.07] text-white" : "text-neutral-300"
                    } ${isSelected ? "font-medium text-purple-200" : ""}`}
                  >
                    {o.label}
                    {isSelected && <Check size={14} className="text-purple-400" aria-hidden="true" />}
                  </li>
                );
              })}
            </Motion.ul>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
