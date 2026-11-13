import { useId, useState } from "react";
import { Check, ChevronRight, Loader2, TriangleAlert } from "lucide-react";
import { THINKING_COPY as COPY } from "../../../../constants/mentorTools";
import { describeStep, summarizeTrace } from "../lib/toolSteps";
import ThinkingSpinner from "./ThinkingSpinner";

const MAX_RUNNING_LINES = 3;
const MAX_FINISHED_LINES = 2;

function StepMarker({ state }) {
  if (state === "running") {
    return <Loader2 size={12} className="shrink-0 text-white/70 motion-safe:animate-spin" aria-hidden="true" />;
  }
  if (state === "failed") {
    return <TriangleAlert size={12} className="shrink-0 text-amber-300/80" aria-hidden="true" />;
  }
  return <Check size={12} className="shrink-0 text-white/60" aria-hidden="true" />;
}

/**
 * One step. `showSources` lists what it used as links; they open in a new tab so
 * the conversation stays where it is, and only appear in the expanded list.
 */
function StepRow({ step, showSources = false }) {
  return (
    <li className={`flex items-start gap-2 ${step.quiet ? "text-[11px] text-white/55" : "text-[12px] text-white/70"}`}>
      <span className="mt-0.75">
        <StepMarker state={step.state} />
      </span>
      <div className="min-w-0 break-words">
        {step.state === "running" ? step.text : step.outcome}
        {showSources && step.sources?.length > 0 && (
          <ul aria-label={COPY.sourcesLabel} className="mt-1 space-y-0.5">
            {step.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={COPY.sourceOpens(source.title)}
                  className="inline-block text-purple-300 underline underline-offset-2 hover:text-purple-200 focus-visible:outline-2 focus-visible:outline-purple-500 max-md:py-1.5"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

const MoreLine = ({ children }) => <li className="pl-5 text-[11px] text-white/55">{children}</li>;

/**
 * While the mentor works: the brand mark, "Thinking…", and the step it is on.
 * Only the current step is announced to screen readers; the visible list changes
 * in bursts when tools run in parallel and would otherwise be read out line by line.
 */
function LiveTrace({ steps }) {
  const running = steps.filter((s) => s.state === "running");
  const finished = steps.filter((s) => s.state !== "running");
  const shownFinished = finished.slice(-MAX_FINISHED_LINES);
  const shownRunning = running.slice(0, MAX_RUNNING_LINES);

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <span className="sr-only">{running[0]?.text ?? (steps.length > 0 ? COPY.composing : COPY.thinking)}</span>
      <div aria-hidden="true">
        <div className="flex items-center gap-2">
          <ThinkingSpinner thinking size={20} />
          <span className="vh-shimmer text-[13px] font-medium">{COPY.thinking}</span>
        </div>
        {steps.length > 0 && (
          <ul className="mt-2 ml-7 space-y-1">
            {finished.length > shownFinished.length && (
              <MoreLine>{COPY.earlierSteps(finished.length - shownFinished.length)}</MoreLine>
            )}
            {shownFinished.map((step, i) => (
              <StepRow key={`done-${i}`} step={step} />
            ))}
            {shownRunning.map((step, i) => (
              <StepRow key={`run-${i}`} step={step} />
            ))}
            {running.length > shownRunning.length && (
              <MoreLine>{COPY.moreSteps(running.length - shownRunning.length)}</MoreLine>
            )}
            {/* Every tool is done but the first word has not arrived: the model is writing. */}
            {running.length === 0 && (
              <li className="flex items-center gap-2 text-[12px] text-white/70">
                <Loader2 size={12} className="shrink-0 text-white/70 motion-safe:animate-spin" aria-hidden="true" />
                {COPY.composing}
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Once the answer is on screen the steps shrink to one line that expands on demand. */
function CollapsedTrace({ steps, summary }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const parts = [summary.running ? COPY.working : COPY.thought(summary.seconds)];
  if (summary.toolCount > 0) parts.push(COPY.usedTools(summary.toolCount));
  if (summary.sourceCount > 0) parts.push(COPY.sources(summary.sourceCount));

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        className="-ml-1 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg px-1 text-[12px] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 max-md:min-h-11"
      >
        {summary.running && <Loader2 size={12} className="shrink-0 motion-safe:animate-spin" aria-hidden="true" />}
        <span>{parts.join(" · ")}</span>
        <ChevronRight
          size={13}
          className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>
      <ul
        id={listId}
        hidden={!open}
        aria-label={COPY.stepsLabel}
        className="mb-2 ml-1 mt-1 space-y-1.5 border-l border-white/10 pl-3"
      >
        {steps.map((step, i) => (
          <StepRow key={i} step={step} showSources />
        ))}
      </ul>
    </div>
  );
}

/**
 * The mentor's visible work for one turn.
 *
 * `calls` are the consecutive tool_call messages of the turn (none yet is fine
 * while `live`). `streaming` says whether a reply is still being produced: with
 * it off, any call still marked running is shown as unfinished rather than spinning.
 */
export default function ThinkingTrace({ calls, live = false, streaming = false }) {
  const steps = calls.map((call) => describeStep(call, { settled: !streaming }));

  if (live) return <LiveTrace steps={steps} />;
  if (steps.length === 0) return null;
  return <CollapsedTrace steps={steps} summary={summarizeTrace(calls, steps)} />;
}
