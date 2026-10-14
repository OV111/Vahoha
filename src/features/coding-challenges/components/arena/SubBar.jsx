import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT_MONO } from "../../lib/arenaTheme";

export default function SubBar({ breadcrumb, challengeId, pager, onBack }) {
  return (
    <div
      className="flex items-center justify-between px-4 shrink-0"
      style={{ height: "38px", borderBottom: `1px solid ${C.border}`, background: C.surface, fontFamily: FONT_MONO }}
    >
      <div className="flex min-w-0 items-center gap-1.5 text-[12px]">
        <button
          onClick={onBack}
          aria-label="Back to challenges"
          className="relative shrink-0 transition-colors cursor-pointer max-md:after:absolute max-md:after:-inset-3 max-md:after:content-['']"
          style={{ color: C.muted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <ChevronLeft size={13} />
        </button>
        {breadcrumb.map((seg) => (
          <span key={seg} className="flex items-center gap-1.5 max-sm:hidden">
            <span style={{ color: C.muted }}>{seg}</span>
            <span style={{ color: C.faint }}>/</span>
          </span>
        ))}
        <span className="truncate font-semibold" style={{ color: C.text }}>{challengeId}</span>
      </div>

      <div className="flex items-center gap-1 text-[12px] max-sm:hidden" style={{ color: C.muted }}>
        <button
          className="flex items-center gap-0.5 px-2 py-0.5 rounded transition-colors cursor-pointer"
          style={{ border: `1px solid ${C.faint}` }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4a4a4a"; e.currentTarget.style.color = C.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.faint; e.currentTarget.style.color = C.muted; }}
        >
          <ChevronLeft size={11} /> Prev
        </button>
        <span className="px-2" style={{ color: C.text }}>
          <span style={{ color: C.amber }}>{pager?.current ?? "-"}</span>
          <span style={{ color: C.faint }}> / </span>
          {pager?.total ?? "-"}
        </span>
        <button
          className="flex items-center gap-0.5 px-2 py-0.5 rounded transition-colors cursor-pointer"
          style={{ border: `1px solid ${C.faint}` }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4a4a4a"; e.currentTarget.style.color = C.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.faint; e.currentTarget.style.color = C.muted; }}
        >
          Next <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}
