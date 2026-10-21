import React from "react";
import { checkOptionState } from "./digestData";

// Small buttons with an invisible 44px-ish hit area: the visible control stays
// compact, the ::before extends the tap target.
const hit = "relative before:absolute before:-inset-2.5 before:content-['']";

const mono = { fontFamily: "monospace" };

function ActionButton({ children, onClick, accent, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${hit} font-mono text-xs uppercase tracking-wider transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4`}
      style={{ color: accent ?? "#8a8a8a", outlineColor: accent ?? "#a855f7" }}
      {...rest}
    >
      {children}
    </button>
  );
}

function CodeBlock({ code }) {
  return (
    <pre
      className="mt-3 overflow-x-auto p-3 text-xs leading-relaxed"
      style={{ ...mono, background: "#0a0a0c", border: "1px solid #1e1e1e", color: "#d4d4d4", borderRadius: 2 }}
    >
      <code>{code}</code>
    </pre>
  );
}

// A hidden ("I already know this") idea collapses to a slim row with Undo.
function KnownRow({ concept, onUndo }) {
  return (
    <li
      className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
      style={{ borderBottom: "1px dotted #1a1a1a" }}
    >
      <span className="text-sm" style={{ color: "#555" }}>
        <span aria-hidden="true">✓ </span>
        {concept.title} <span className="font-mono text-xs">· marked as known</span>
      </span>
      <ActionButton onClick={() => onUndo(concept.id)} accent="#a855f7">
        Undo
      </ActionButton>
    </li>
  );
}

const OPTION_BORDER = { idle: "#2a2a2a", right: "#4ade80", wrong: "#f87171" };

// "Check yourself": the read-then-prove step. Graded on the server; a right
// answer is self-study evidence only and never counts as a layer pass.
function CheckBlock({ concept, accent, result, isChecked, onAnswer, onRetry }) {
  const { check } = concept;
  const answered = result && !result.pending;
  return (
    <div className="mt-4 p-3" style={{ border: "1px dotted #2a2a2a", borderRadius: 2 }}>
      <p className="font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
        Check yourself
        {isChecked && <span style={{ color: "#555" }}> · ✓ checked</span>}
      </p>
      <p className="mt-2 text-sm" style={{ color: "#d4d4d4" }}>
        {check.question}
      </p>
      <ul className="mt-3 space-y-2">
        {check.options.map((option, i) => (
          <li key={option}>
            <button
              type="button"
              disabled={Boolean(result)}
              aria-pressed={result?.picked === i}
              onClick={() => onAnswer(concept.id, i)}
              className="min-h-11 w-full px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 enabled:hover:bg-[#141418]"
              style={{
                border: `1px solid ${OPTION_BORDER[checkOptionState(i, result)]}`,
                borderRadius: 2,
                color: "#d4d4d4",
                outlineColor: accent,
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {answered && (
        <div className="mt-3 text-sm" style={{ color: "#a5a5a5" }} aria-live="polite">
          <span
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: result.correct ? "#4ade80" : "#f87171" }}
          >
            {result.correct ? "Right " : "Not quite "}
          </span>
          {result.explanation}
          {!result.correct && (
            <div className="mt-3">
              <ActionButton onClick={() => onRetry(concept.id)} accent={accent}>
                Try again
              </ActionButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LearnCard({
  concept,
  accent,
  isKnown,
  expanded,
  onToggleExpand,
  onKnow,
  onUndo,
  checkResult,
  isChecked,
  onAnswer,
  onRetry,
}) {
  if (isKnown) return <KnownRow concept={concept} onUndo={onUndo} />;
  const panelId = `detail-${concept.id}`;
  return (
    <li className="px-4 py-6 sm:px-6" style={{ borderBottom: "1px dotted #1a1a1a" }}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-bold" style={{ color: "#e5e5e5" }}>
          {concept.title}
        </h3>
        <ActionButton onClick={() => onKnow(concept.id)}>I know this</ActionButton>
      </div>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#b5b5b5" }}>
        {concept.summary}
      </p>
      {concept.example && <CodeBlock code={concept.example} />}
      <p className="mt-3 text-sm" style={{ color: "#8a8a8a" }}>
        <span className="font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
          Why it matters{" "}
        </span>
        {concept.why}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ActionButton
          onClick={() => onToggleExpand(concept.id)}
          accent={accent}
          aria-expanded={expanded}
          aria-controls={panelId}
        >
          {expanded ? "Collapse ▴" : "Expand ▾"}
        </ActionButton>
      </div>
      {expanded && (
        <div
          id={panelId}
          className="mt-3 p-3 text-sm leading-relaxed"
          style={{ background: "#0a0a0c", borderLeft: `2px solid ${accent}`, color: "#a5a5a5" }}
        >
          <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#555" }}>
            // from the book{" "}
          </span>
          {concept.detail}
          {concept.beyondBook && (
            <p className="mt-2">
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#555" }}>
                // beyond the book{" "}
              </span>
              {concept.beyondBook}
            </p>
          )}
        </div>
      )}
      {concept.check && onAnswer && (
        <CheckBlock
          concept={concept}
          accent={accent}
          result={checkResult}
          isChecked={isChecked}
          onAnswer={onAnswer}
          onRetry={onRetry}
        />
      )}
    </li>
  );
}

export function QuickRow({ concept, isKnown, onKnow, onUndo }) {
  if (isKnown) return <KnownRow concept={concept} onUndo={onUndo} />;
  return (
    <li
      className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6"
      style={{ borderBottom: "1px dotted #1a1a1a" }}
    >
      <p className="text-sm leading-relaxed" style={{ color: "#b5b5b5" }}>
        <strong style={{ color: "#e5e5e5" }}>{concept.title}.</strong>{" "}
        {concept.summary.split(". ")[0].replace(/\.$/, "")}.
      </p>
      <ActionButton onClick={() => onKnow(concept.id)}>I know this</ActionButton>
    </li>
  );
}

export function InterviewCard({ concept, accent, revealed, grade, onToggleReveal, onGrade }) {
  const { interview } = concept;
  const panelId = `answer-${concept.id}`;
  return (
    <li className="px-4 py-6 sm:px-6" style={{ borderBottom: "1px dotted #1a1a1a" }}>
      <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "#555" }}>
        // question
      </p>
      <h3 className="mt-1 text-base font-bold leading-snug" style={{ color: "#e5e5e5" }}>
        {interview.question}
      </h3>

      {!revealed ? (
        <div className="mt-4">
          <ActionButton
            onClick={() => onToggleReveal(concept.id)}
            accent={accent}
            aria-expanded={false}
            aria-controls={panelId}
          >
            Show answer
          </ActionButton>
        </div>
      ) : (
        <div id={panelId} className="mt-4 space-y-3 text-sm leading-relaxed" aria-live="polite">
          <p style={{ color: "#b5b5b5" }}>
            <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#22c55e" }}>
              Answer{" "}
            </span>
            {interview.answer}
          </p>
          <p style={{ color: "#b5b5b5" }}>
            <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#f87171" }}>
              Trap{" "}
            </span>
            {interview.trap}
          </p>
          <p style={{ color: "#b5b5b5" }}>
            <span className="font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
              Follow-up{" "}
            </span>
            {interview.followUp}
          </p>
          <div className="flex items-center gap-6 pt-1">
            <ActionButton
              onClick={() => onGrade(concept.id, "got")}
              accent={grade === "got" ? "#22c55e" : undefined}
              aria-pressed={grade === "got"}
            >
              Got it
            </ActionButton>
            <ActionButton
              onClick={() => onGrade(concept.id, "missed")}
              accent={grade === "missed" ? "#f87171" : undefined}
              aria-pressed={grade === "missed"}
            >
              Missed it
            </ActionButton>
            <ActionButton onClick={() => onToggleReveal(concept.id)}>Hide</ActionButton>
          </div>
        </div>
      )}
    </li>
  );
}
