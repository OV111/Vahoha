import React, { useState } from "react";
import { InterviewCard, LearnCard, QuickRow } from "./ConceptCards";
import { MOCK_CHAPTER, MOCK_CONCEPTS, MODES, ROLES, estimateMinutes } from "./digestData";
import { useDigest } from "./useDigest";

const mono = { fontFamily: "monospace" };

/**
 * Digest for one book, shown on the book detail page.
 * Two separate controls: Role ("who am I", rarely changes, remembered)
 * and Mode ("what do I want now", changes every visit, so it is a tab bar).
 */
export default function DigestSection({ bookId, accent = "#a855f7" }) {
  const d = useDigest(bookId, MOCK_CONCEPTS);
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpand = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const total = d.shown.length;
  const pct = total === 0 ? 0 : Math.round((d.seenCount / total) * 100);
  const gotCount = [...d.graded.values()].filter((v) => v === "got").length;
  const tabId = (id) => `digest-tab-${id}`;

  return (
    <section
      aria-labelledby="digest-heading"
      style={{ background: "#0f0f12", border: "1px solid #1e1e1e", borderRadius: 2 }}
    >
      {/* header: title + role */}
      <div
        className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        style={{ background: "#0a0a0c", borderBottom: "1px dotted #1e1e1e" }}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>
            // digest <span style={{ color: "#555" }}>· preview</span>
          </p>
          <h2 id="digest-heading" className="mt-1 text-lg font-bold" style={{ color: "#e5e5e5" }}>
            The parts you actually need
          </h2>
        </div>
        <label className="flex items-center gap-3 text-sm" style={{ color: "#8a8a8a" }}>
          <span className="font-mono text-xs uppercase tracking-wider">Reading as</span>
          <select
            value={d.role}
            onChange={(e) => d.setRole(e.target.value)}
            className="min-h-11 px-3 text-sm focus-visible:outline-2"
            style={{ background: "#0f0f12", border: "1px solid #2a2a2a", color: "#e5e5e5", borderRadius: 2, outlineColor: accent }}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* mode tabs */}
      <div
        role="tablist"
        aria-label="Digest mode"
        className="flex gap-6 overflow-x-auto px-4 sm:px-6"
        style={{ borderBottom: "1px solid #1e1e1e", scrollbarWidth: "none" }}
      >
        {MODES.map((m) => {
          const active = d.mode === m.id;
          return (
            <button
              key={m.id}
              id={tabId(m.id)}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls="digest-panel"
              onClick={() => d.setMode(m.id)}
              className="relative shrink-0 py-3 font-mono text-xs uppercase tracking-wider transition-colors before:absolute before:-inset-x-2 before:-inset-y-1 before:content-[''] focus-visible:outline-2"
              style={{
                color: active ? "#fff" : "#6a6a6a",
                borderBottom: `2px solid ${active ? accent : "transparent"}`,
                marginBottom: -1,
                outlineColor: accent,
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* chapter line + progress */}
      <div className="px-4 pb-1 pt-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "#8a8a8a" }}>
            {MOCK_CHAPTER}
          </p>
          <p className="font-mono text-xs" style={{ color: "#555" }}>
            {total} {total === 1 ? "idea" : "ideas"} · ~{estimateMinutes(total, d.mode)} min
          </p>
        </div>
        {d.mode === "interview" ? (
          <p className="mt-2 text-xs" style={{ ...mono, color: "#555" }} aria-live="polite">
            {gotCount} of {total} got
          </p>
        ) : (
          <div className="mt-3" aria-hidden={total === 0}>
            <div style={{ height: 2, background: "#1a1a1a" }}>
              <div style={{ height: 2, width: `${pct}%`, background: accent, transition: "width .25s" }} />
            </div>
            <p className="mt-1 text-xs" style={{ ...mono, color: "#555" }}>
              {d.seenCount} of {total} marked known
            </p>
          </div>
        )}
      </div>

      {/* panel */}
      <div id="digest-panel" role="tabpanel" aria-labelledby={tabId(d.mode)}>
        {total === 0 ? (
          <div className="px-4 py-10 text-center sm:px-6">
            <p className="text-sm" style={{ color: "#8a8a8a" }}>
              Nothing in this chapter for {ROLES.find((r) => r.id === d.role)?.label.toLowerCase()}.
            </p>
            <button
              type="button"
              onClick={() => d.setShowAll(true)}
              className="relative mt-3 font-mono text-xs uppercase tracking-wider before:absolute before:-inset-3 before:content-['']"
              style={{ color: accent }}
            >
              Show everything
            </button>
          </div>
        ) : (
          <ul>
            {d.shown.map((c) => {
              const isKnown = d.known.has(c.id);
              if (d.mode === "interview")
                return (
                  <InterviewCard
                    key={c.id}
                    concept={c}
                    accent={accent}
                    revealed={d.revealed.has(c.id)}
                    grade={d.graded.get(c.id)}
                    onToggleReveal={d.toggleReveal}
                    onGrade={d.grade}
                  />
                );
              if (d.mode === "quick")
                return <QuickRow key={c.id} concept={c} isKnown={isKnown} onKnow={d.markKnown} onUndo={d.undoKnown} />;
              return (
                <LearnCard
                  key={c.id}
                  concept={c}
                  accent={accent}
                  isKnown={isKnown}
                  expanded={expanded.has(c.id)}
                  onToggleExpand={toggleExpand}
                  onKnow={d.markKnown}
                  onUndo={d.undoKnown}
                />
              );
            })}
          </ul>
        )}
      </div>

      {/* footer: always show that something was filtered out */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6"
        style={{ background: "#0a0a0c", borderTop: "1px dotted #1e1e1e" }}
        aria-live="polite"
      >
        <p className="text-xs" style={{ ...mono, color: "#555" }}>
          {d.showAll
            ? "Showing everything in this chapter"
            : d.cut.length > 0
              ? `${d.cut.length} ${d.cut.length === 1 ? "idea" : "ideas"} left out for this role`
              : "Nothing left out"}
        </p>
        {(d.showAll || d.cut.length > 0) && (
          <button
            type="button"
            onClick={() => d.setShowAll(!d.showAll)}
            className="relative font-mono text-xs uppercase tracking-wider before:absolute before:-inset-3 before:content-['']"
            style={{ color: accent }}
          >
            {d.showAll ? "Back to my cut" : "Show everything"}
          </button>
        )}
      </div>
    </section>
  );
}
