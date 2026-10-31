import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, FileCode2, FileImage, FileJson, Share2 } from "lucide-react";

const ITEMS = [
  { id: "png", label: "Image (PNG)", hint: "for slides and docs", Icon: FileImage },
  { id: "svg", label: "Vector (SVG)", hint: "sharp at any size", Icon: FileCode2 },
  { id: "mermaid", label: "Copy as Mermaid", hint: "GitHub draws it in a README", Icon: Share2 },
  { id: "json", label: "Map file (JSON)", hint: "to import again later", Icon: FileJson },
];

/**
 * The Export button and its menu. `onExport(id)` does the work and may return
 * a promise; the menu closes as soon as an item is picked.
 */
export default function ExportMenu({ onExport, buttonClass, disabled }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id) => {
    setOpen(false);
    onExport(id);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={buttonClass}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Export"
        title="Export"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <Download size={14} aria-hidden="true" /> <span className="max-sm:hidden">Export</span>
        <ChevronDown size={12} aria-hidden="true" className="max-sm:hidden" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Export as"
          className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-xl shadow-black/60"
        >
          {ITEMS.map(({ id, label, hint, Icon }, i) => (
            <button
              key={id}
              ref={i === 0 ? firstItemRef : undefined}
              type="button"
              role="menuitem"
              onClick={() => pick(id)}
              className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-900 focus-visible:bg-neutral-900 focus-visible:outline-none"
            >
              <Icon size={15} aria-hidden="true" />
              <span>
                <span className="block">{label}</span>
                <span className="block text-xs text-neutral-500">{hint}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
