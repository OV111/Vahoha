import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FlaskConical, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";
import CheckQuestion from "./CheckQuestion";
import ExplainBack from "./ExplainBack";
import GoDeeper from "./GoDeeper";
import { CodePanelSkeleton } from "./LearnSkeletons";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { markLessonFinished } from "../lib/lessonProgress";
import "../learn.css";

// CodeMirror is the heaviest part of the lesson page. Loading it on demand lets
// the step text paint first; the import starts as soon as the player renders.
const CodePanel = lazy(() => import("./CodePanel"));

const DONE = "done";
const emptyExplain = { text: "", revealed: false, covered: [] };

// Arrow keys move between steps, but never while the learner is typing.
const isTyping = (el) => el?.closest?.("textarea, input, select, [contenteditable='true'], .cm-editor");

/** Which step's code the panel shows: this step's, or the latest one before it. */
const codeIndexFor = (steps, index) => {
  for (let i = index; i >= 0; i--) if (steps[i].code) return i;
  return -1;
};

function ProgressBar({ total, index }) {
  return (
    <div
      className="flex flex-1 gap-1"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={Math.min(index + 1, total)}
      aria-label="Lesson progress"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < index ? "bg-purple-500" : i === index ? "bg-purple-300" : "bg-neutral-800"
          }`}
        />
      ))}
    </div>
  );
}

function NavButtons({ index, canContinue, blockedHint, isLast, onBack, onNext }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        disabled={index === 0}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-neutral-400 transition-colors enabled:cursor-pointer enabled:hover:text-white disabled:opacity-30"
      >
        <ArrowLeft size={15} aria-hidden="true" /> Back
      </button>
      <div className="flex items-center gap-3">
        {!canContinue && <span className="hidden text-sm text-neutral-500 sm:inline">{blockedHint}</span>}
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white transition-colors enabled:cursor-pointer enabled:hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {isLast ? "Finish" : "Continue"} <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// Answers live in memory until progress is saved server-side, so a reload or a
// deep link can reach this screen with questions unanswered: say so honestly.
function scoreLine({ right, answered, total }) {
  if (answered === 0) return "Answer the questions in this lesson to see how much stuck.";
  const skipped = total - answered;
  return [
    `${right} of ${answered} questions right.`,
    right < answered && "Go back to the ones you missed before the layer test.",
    skipped > 0 && `You skipped ${skipped}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function Finished({ lesson, content, score, next, testHref, layerTitle, labHref }) {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-[28px] font-semibold leading-tight text-neutral-50">You finished this lesson</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-neutral-300">{scoreLine(score)}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {/* A lesson with a lab: practice first (LAB_SYSTEM.md flow), the next lesson stays one click away. */}
        {labHref && (
          <Link
            to={labHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white hover:bg-purple-500"
          >
            <FlaskConical size={15} aria-hidden="true" /> Practice it in the lab
          </Link>
        )}
        {next ? (
          <Link
            to={next.href}
            className={labHref
              ? "inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-700 px-5 text-[15px] text-neutral-200 hover:border-purple-500"
              : "inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white hover:bg-purple-500"}
          >
            Next lesson: {next.title} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <Link
            to={testHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white hover:bg-purple-500"
          >
            Take the {layerTitle} test <ArrowRight size={15} aria-hidden="true" />
          </Link>
        )}
        <Link
          to="/ai-agent"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-purple-500"
        >
          <Sparkles size={14} aria-hidden="true" /> Ask the mentor
        </Link>
      </div>

      <section className="mt-14" aria-labelledby="go-deeper">
        <h2 id="go-deeper" className="text-xl font-semibold text-neutral-50">
          Go deeper
        </h2>
        <p className="mt-1 text-[15px] text-neutral-400">Optional. The parts most developers skip.</p>
        <div className="mt-5">
          <GoDeeper levels={content.deeper} docs={lesson.resources} />
        </div>
      </section>
    </div>
  );
}

/**
 * A written lesson, one step per screen, with live code beside it.
 * The current step lives in the URL (?step=4), so Back, refresh and shared
 * links all land on the same screen.
 */
export default function LessonPlayer({ track, layer, lesson, content, next, testHref, labHref }) {
  const { steps } = content;
  const [params, setParams] = useSearchParams();
  const [answers, setAnswers] = useState({}); // step index -> picked option
  const [explain, setExplain] = useState(emptyExplain);

  const raw = params.get("step");
  const index = raw === DONE ? steps.length : Math.min(Math.max(Number.parseInt(raw, 10) - 1 || 0, 0), steps.length - 1);
  const finished = index === steps.length;
  const step = steps[index];

  const canContinue =
    finished || step.kind === "read" || (step.kind === "check" ? answers[index] != null : explain.revealed);
  const blockedHint = step?.kind === "check" ? "Pick an answer to continue" : "Write your explanation to continue";

  const goTo = (i) => {
    setParams({ step: i >= steps.length ? DONE : String(i + 1) });
    window.scrollTo({ top: 0 });
  };
  const back = () => index > 0 && goTo(index - 1);
  const forward = () => canContinue && !finished && goTo(index + 1);

  // Opening ?step=done directly isn't finishing; working through the steps is.
  const engaged = Object.keys(answers).length > 0;
  useEffect(() => {
    if (finished && engaged) markLessonFinished(track.id, layer.id, lesson.slug);
  }, [finished, engaged, track.id, layer.id, lesson.slug]);

  useEffect(() => {
    const onKey = (e) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") forward();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const codeIndex = finished || step.kind === "explain" ? -1 : codeIndexFor(steps, index);
  const hasPanel = codeIndex !== -1;
  const predictLocked = step?.kind === "check" && step.type === "predict" && answers[index] == null;

  const checks = steps.map((s, i) => [s, i]).filter(([s]) => s.kind === "check");
  const score = {
    right: checks.filter(([s, i]) => answers[i] === s.answer).length,
    answered: checks.filter(([, i]) => answers[i] != null).length,
    total: checks.length,
  };

  const stepLabel =
    step?.kind === "check" ? "Your turn" : step?.kind === "explain" ? "Explain it back" : `Step ${index + 1} of ${steps.length}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6 lg:px-8 lg:pb-16">
      <header className="flex items-center gap-4">
        <Link
          to={`/learn/${track.id}/${layer.id}`}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{layer.title}</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <ProgressBar total={steps.length} index={index} />
        <span className="shrink-0 text-sm tabular-nums text-neutral-500">
          {finished ? "Done" : `${index + 1} / ${steps.length}`}
        </span>
      </header>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-sm font-medium text-neutral-300">{lesson.title}</h1>
        {content.status === "draft" && <span className="text-xs text-amber-400/80">Draft, not yet reviewed</span>}
      </div>

      {finished ? (
        <div className="mt-10">
          <Finished
            lesson={lesson}
            content={content}
            score={score}
            next={next}
            testHref={testHref}
            labHref={labHref}
            layerTitle={layer.title}
          />
        </div>
      ) : (
        <div
          className={
            hasPanel
              ? "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12"
              : "mx-auto mt-8 max-w-2xl"
          }
        >
          <section aria-label={stepLabel} className="min-w-0">
            <p className="text-sm text-purple-300">{stepLabel}</p>
            <div className="mt-3 max-w-[62ch]">
              {step.kind === "read" && (
                <>
                  <h2 className="text-[28px] font-semibold leading-tight text-neutral-50">{step.title}</h2>
                  <MarkdownMessage content={step.body} className="mt-5 text-[17px] leading-[1.7] text-neutral-300" />
                </>
              )}
              {step.kind === "check" && (
                <CheckQuestion
                  step={step}
                  picked={answers[index]}
                  onPick={(i) => setAnswers((prev) => ({ ...prev, [index]: i }))}
                />
              )}
              {step.kind === "explain" && <ExplainBack step={step} value={explain} onChange={setExplain} />}
            </div>

            <div className="mt-12 hidden lg:block">
              <NavButtons
                index={index}
                canContinue={canContinue}
                blockedHint={blockedHint}
                isLast={index === steps.length - 1}
                onBack={back}
                onNext={forward}
              />
            </div>
          </section>

          {hasPanel && (
            <aside aria-label="Code" className="h-[460px] min-w-0 lg:sticky lg:top-24 lg:h-[calc(100dvh-8rem)]">
              <Suspense
                fallback={
                  <CodePanelSkeleton>
                    <LoadingSuspense fill />
                  </CodePanelSkeleton>
                }
              >
                <CodePanel
                  key={codeIndex}
                  source={steps[codeIndex].code.source}
                  lockedReason={predictLocked ? "Answer the question first, then run it to check." : null}
                />
              </Suspense>
            </aside>
          )}
        </div>
      )}

      {!finished && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-800 bg-black/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur lg:hidden">
          <NavButtons
            index={index}
            canContinue={canContinue}
            blockedHint={blockedHint}
            isLast={index === steps.length - 1}
            onBack={back}
            onNext={forward}
          />
        </div>
      )}
    </div>
  );
}
