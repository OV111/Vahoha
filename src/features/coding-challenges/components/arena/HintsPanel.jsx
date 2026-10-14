import { useState } from "react";
import { Eye, Lock } from "lucide-react";
import { C, FONT_MONO } from "../../lib/arenaTheme";
import { renderInlineCode } from "../../lib/richText";

export default function HintsPanel({ hints, onReveal }) {
  // Reveal state lives in the parent now — a hint is only "revealed" once the
  // server has charged for it and handed back the text.
  const [pending, setPending] = useState(null);

  const reveal = async (id) => {
    setPending(id);
    try {
      await onReveal?.(id);
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex h-full flex-col" style={{ background: C.surface }}>
      <p className="shrink-0 border-b px-4 py-3 text-[12px] leading-relaxed" style={{ color: C.muted, borderColor: C.border }}>
        Hints guide you without giving the answer, and unlock one at a time.
      </p>

      <div
        className="thin-scrollbar flex flex-col divide-y flex-1 overflow-y-auto"
        style={{ borderColor: C.border }}
      >
        {hints.map((hint) => (
          <div key={hint.id} className="px-4 py-4 flex flex-col gap-3" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: hint.revealed ? C.green : C.faint }}
              />
              <span className="text-[10px] font-bold tracking-widest" style={{ color: C.muted, fontFamily: FONT_MONO }}>
                HINT {String(hint.id).padStart(2, "0")} ·{" "}
                <span style={{ color: hint.revealed ? C.green : C.faint }}>
                  {hint.revealed ? "REVEALED" : "LOCKED"}
                </span>
              </span>
            </div>

            {hint.revealed ? (
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "#b4b4b4" }}
                dangerouslySetInnerHTML={{ __html: renderInlineCode(hint.text) }}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <div className="h-2 rounded-sm w-full" style={{ background: C.faint }} />
                <div className="h-2 rounded-sm w-4/5" style={{ background: C.faint, opacity: 0.7 }} />
                <div className="h-2 rounded-sm w-3/5" style={{ background: C.faint, opacity: 0.4 }} />
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[11px]" style={{ color: hint.revealed ? C.faint : "#7a7a7a", fontFamily: FONT_MONO }}>
                cost:{" "}
                <span style={{ color: hint.revealed ? C.faint : hint.cost === 0 ? C.green : C.rose }}>
                  {hint.cost === 0 ? "0 xp" : `-${hint.cost} xp`}
                </span>
                {" · "}
                <span style={{ color: C.faint }}>
                  {hint.cost === 0 ? "free" : hint.revealed ? "paid" : "still passable"}
                </span>
              </span>

              {hint.revealed ? (
                <span className="flex items-center gap-1 text-[11px]" style={{ color: C.faint }}>
                  <Lock size={9} /> revealed
                </span>
              ) : (
                <button
                  onClick={() => reveal(hint.id)}
                  disabled={pending === hint.id}
                  className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded transition-colors cursor-pointer"
                  style={{
                    border: `1px solid ${pending === hint.id ? C.purple : C.faint}`,
                    color: pending === hint.id ? C.purple : "#9a9a9a",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.faint; e.currentTarget.style.color = "#9a9a9a"; }}
                >
                  <Eye size={10} />
                  reveal — {hint.cost === 0 ? "free" : `${hint.cost} xp`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
