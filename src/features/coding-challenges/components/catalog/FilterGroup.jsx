import { ChevronDown, Check } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

/**
 * Hover-triggered single-select dropdown used for Path / Layer / Type / Level.
 * Options are plain strings, or { value, label, meta } when the shown text
 * differs from the value (Path: "MERN Stack" for "mern", with a count).
 */
const normalize = (opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt);

export default function FilterGroup({
  label,
  allLabel,
  options,
  active,
  onSelect,
  isOpen,
  onOpen,
  onClose,
}) {
  const opts = options.map(normalize);
  const current = opts.find((o) => o.value === active);
  const buttonText = active === "all" || active == null ? (allLabel ?? label) : (current?.label ?? active);

  return (
    <div className="max-sm:static sm:relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#1f1f1f] bg-[#141414] px-2.5 py-1.5 text-xs font-medium text-[#888] transition-all duration-200 hover:border-purple-900/60 hover:bg-purple-950/40 hover:text-purple-300 sm:px-3"
      >
        <span className="max-w-[180px] truncate">{buttonText}</span>
        <Motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </Motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <Motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 z-50 mt-1.5 min-w-[120px] max-sm:left-6 max-sm:right-6 whitespace-nowrap overflow-hidden rounded-md border border-[#1f1f1f] bg-[#0d0d0d] shadow-lg shadow-black/30"
          >
            {opts.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => onSelect(opt.value)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-xs sm:py-2 font-medium text-[#888] transition-colors hover:bg-purple-950/40 hover:text-purple-300"
                >
                  <span>{opt.label}</span>
                  <span className="flex items-center gap-2">
                    {opt.meta != null && (
                      <span className="font-mono text-[10px] text-[#555]">{opt.meta}</span>
                    )}
                    <Check
                      className={`h-3 w-3 text-purple-400 ${active === opt.value ? "" : "invisible"}`}
                    />
                  </span>
                </button>
              </li>
            ))}
          </Motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
