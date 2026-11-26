import { Link } from "react-router-dom";
import {
  ShieldCheck,
  RotateCcw,
  Clock,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

const STATUS = {
  solid: {
    label: "Solid",
    chip: "border-emerald-800/60 bg-emerald-950/40 text-emerald-300",
    bar: "bg-emerald-400",
  },
  shallow: {
    label: "Shallow",
    chip: "border-amber-800/60 bg-amber-950/40 text-amber-300",
    bar: "bg-amber-400",
  },
  missing: {
    label: "Missing",
    chip: "border-rose-900/60 bg-rose-950/40 text-rose-300",
    bar: "bg-rose-400",
  },
  // A stated misconception: a different gap from leaving something out.
  incorrect: {
    label: "Incorrect",
    chip: "border-rose-700/70 bg-rose-950/70 text-rose-200",
    bar: "bg-rose-600",
  },
};
const ORDER = ["incorrect", "missing", "shallow", "solid"];

const button =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

// One bar split by status: how the whole answer went, before the details.
function Breakdown({ concepts }) {
  const counts = ORDER.map((s) => [
    s,
    concepts.filter((c) => c.status === s).length,
  ]).filter(([, n]) => n > 0);
  return (
    <div>
      <div
        className="flex h-2 gap-1 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        {counts.map(([s, n]) => (
          <span
            key={s}
            className={`${STATUS[s].bar} rounded-full`}
            style={{ flexGrow: n }}
          />
        ))}
      </div>
      <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-neutral-400">
        {counts.map(([s, n]) => (
          <span key={s}>
            {n} {STATUS[s].label.toLowerCase()}
          </span>
        ))}
      </p>
    </div>
  );
}

/**
 * Pass or fail first, then each part with the words that earned or lost the credit.
 * Free users see which parts to fix (names only); detailed users also see the quotes.
 * "Names only" still gives direction, which the mentor gate depends on.
 *
 * @param {{
 *   result: import("@/features/voice-exam/lib/examStates").ExamResult,
 *   layerTitle?: string|null,
 *   detailed?: boolean,
 *   practice?: boolean,   already verified before this run, so a fail changes nothing
 *   onClose: () => void,
 * }} props
 */
const ResultPanel = ({
  result,
  layerTitle,
  detailed = false,
  practice = false,
  onClose,
}) => {
  // Weakest first: the parts to work on are what a learner looks for.
  const concepts = [...result.concepts].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status),
  );
  const layer = layerTitle ?? "This layer";
  // Older results have no `spoken`; they were all graded the same way.
  const typed = result.spoken === false;
  const title = practice
    ? result.passed
      ? "Practice passed"
      : "Practice run"
    : result.passed
      ? "Verified"
      : "Not verified yet";
  const summary = practice
    ? `${layer} stays Verified either way. This run didn't count.`
    : result.passed
      ? `${layer} now shows as Verified on your profile${typed ? ", marked as typed" : ""}.`
      : "You covered some of it. Work on the parts below and try again.";

  return (
    <div className="space-y-5">
      <section
        className={`rounded-2xl border bg-neutral-950 p-5 sm:p-8 ${
          result.passed
            ? "border-emerald-500/60 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]"
            : "border-neutral-800"
        }`}
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
              result.passed
                ? "bg-emerald-400 text-neutral-950"
                : "border border-neutral-700 text-neutral-300"
            }`}
          >
            {result.passed ? (
              <ShieldCheck size={24} aria-hidden="true" />
            ) : (
              <RotateCcw size={22} aria-hidden="true" />
            )}
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-neutral-50 sm:text-[28px]">
              {title}
            </h2>
            <p className="mt-1 text-[15px] text-neutral-400">{summary}</p>
            {typed && result.passed && !practice && (
              <p className="mt-2 text-sm text-neutral-500">
                Answer out loud next time to get the spoken badge.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Breakdown concepts={concepts} />
        </div>

        <ul className="mt-6 divide-y divide-neutral-900">
          {concepts.map((c) => (
            <li key={c.label} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[15px] text-neutral-100">{c.label}</span>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS[c.status].chip}`}
                >
                  {STATUS[c.status].label}
                </span>
              </div>
              {detailed && c.misconception && (
                <div className="mt-2 text-sm">
                  <p className="text-rose-300">This part was wrong:</p>
                  <blockquote className="mt-1 border-l-2 border-rose-800 pl-3 italic text-neutral-400">
                    &ldquo;{c.misconception.quote}&rdquo;
                  </blockquote>
                </div>
              )}
              {detailed && c.quote && !c.misconception && (
                <blockquote className="mt-2 border-l-2 border-neutral-700 pl-3 text-sm italic text-neutral-400">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
              )}
              {detailed &&
                !c.quote &&
                !c.misconception &&
                !c.missed?.length && (
                  <p className="mt-2 text-sm text-neutral-500">
                    Nothing in your answers covered this.
                  </p>
                )}
              {/* Copied from the rubric, never written by the AI, so it can't state something untrue. */}
              {detailed && c.status !== "solid" && c.missed?.length > 0 && (
                <div className="mt-2 text-sm">
                  <p className="text-neutral-300">Still to show:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-neutral-400">
                    {c.missed.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {!result.passed && !practice && (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
          <h3 className="text-[15px] font-semibold text-neutral-100">
            What to do next
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            The mentor already knows which parts were weak. Ask it to walk you
            through them.
          </p>
          {result.retryAvailableAt && (
            <p className="mt-3 flex items-center gap-2 text-sm text-amber-300">
              <Clock size={15} aria-hidden="true" />
              You can retry from{" "}
              {new Date(result.retryAvailableAt).toLocaleString(undefined, {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
              .
            </p>
          )}
        </section>
      )}

      {result.transcript?.length > 0 && (
        <details className="group rounded-2xl border border-neutral-800 bg-neutral-950 px-5 sm:px-6">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium text-neutral-100 [&::-webkit-details-marker]:hidden">
            What was graded
            {/* The arrow points down when closed and flips up when open, so it's clear how to close it again. */}
            <span className="flex items-center gap-2 text-sm font-normal text-neutral-400">
              <span className="group-open:hidden">Show your answers</span>
              <span className="hidden group-open:inline">Hide</span>
              <ChevronDown
                size={18}
                className="transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </summary>
          <ol className="space-y-5 pb-6">
            {result.transcript.map((turn, i) => (
              <li key={i}>
                <p className="text-sm font-medium text-neutral-300">
                  {turn.prompt}
                </p>
                <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-neutral-400">
                  {turn.text}
                </p>
              </li>
            ))}
          </ol>
        </details>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {result.passed ? (
          <Link
            to="/my-profile"
            className={`${button} bg-emerald-500 text-neutral-950 hover:bg-emerald-400 focus-visible:outline-emerald-300`}
          >
            <ShieldCheck size={17} aria-hidden="true" /> See it on your profile
          </Link>
        ) : (
          <Link
            to="/mentor"
            className={`${button} bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-300`}
          >
            <MessageSquare size={17} aria-hidden="true" /> Review with the
            mentor
          </Link>
        )}
        <button
          type="button"
          onClick={onClose}
          className={`${button} border border-neutral-700 text-neutral-100 hover:bg-neutral-900 focus-visible:outline-neutral-400`}
        >
          Back to the layer
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
