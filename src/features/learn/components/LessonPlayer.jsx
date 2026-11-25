import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import MentorPanel from "@/features/mentor/components/MentorPanel";
import { mentorOrigin } from "@/features/mentor/lib/mentorOrigin";
import LessonHeader from "./player/LessonHeader";
import LessonFooter from "./player/LessonFooter";
import LessonFinished from "./player/LessonFinished";
import LessonOutline from "./player/LessonOutline";
import SidePanel from "./player/SidePanel";
import StepContent from "./player/StepContent";
import useLessonSession, { solved } from "../hooks/useLessonSession";
import { finishedLessons } from "../lib/lessonProgress";
import { LESSON_PARTS, partOf } from "../lib/lessonParts";
import "../learn.css";

const BLOCKED_HINT = {
  check: "Pick an answer to continue",
  try: "Make it work to continue",
  explain: "Write your explanation to continue",
};

// Shortcuts never fire while the learner is typing.
const isTyping = (el) => el?.closest?.("textarea, input, select, [contenteditable='true'], .cm-editor");
const isControl = (el) => el?.closest?.("button, a, summary");

const printedExactly = (lines, expected) =>
  lines.length === expected.length && lines.every((l, i) => l.level === "log" && l.text === expected[i]);

/** Arrow keys and Enter move between steps; 1 to 4 answer a question. */
function useLessonKeys(session, paused) {
  const { step, index, work, back, forward, setAnswer } = session;
  useEffect(() => {
    const onKey = (e) => {
      if (paused || isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || (e.key === "Enter" && !isControl(e.target))) forward();
      if (e.key === "ArrowLeft") back();
      const option = Number(e.key) - 1;
      if (step?.kind === "check" && work.answers[index] == null && step.options[option] !== undefined) setAnswer(option);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
}

/** Smaller screens: the outline folds into a bar that names the current step. */
function OutlineMenu({ step, children }) {
  const ref = useRef(null);
  return (
    <details
      ref={ref}
      onClick={(e) => {
        if (e.target.closest("button")) ref.current.open = false;
      }}
      className="group border-b border-(--lesson-line) bg-(--lesson-rail) xl:hidden"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 text-[15px] [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 truncate text-neutral-300">
          <span className="font-medium text-white">{step ? LESSON_PARTS[partOf(step)] : "Lesson outline"}</span>
          {step && `, ${step.short}`}
        </span>
        <ChevronDown
          size={17}
          className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="max-h-[60dvh] overflow-y-auto px-3 pb-5 pt-2">{children}</div>
    </details>
  );
}

/**
 * A written lesson as a workspace: the outline on the left, the current step in
 * the middle, live code on the right. Wide screens give each column its own
 * scroll, so the outline and the code stay put while the text moves.
 */
export default function LessonPlayer({ track, layer, lesson, lessons, content, next, testHref, labHref }) {
  const { steps } = content;
  const { auth } = useAuthStore();
  const navigate = useNavigate();
  const [mentorOpen, setMentorOpen] = useState(false);
  const closeMentor = useCallback(() => setMentorOpen(false), []);
  const session = useLessonSession({ trackId: track.id, layerId: layer.id, slug: lesson.slug, steps });
  const { index, step, finished, work, engaged } = session;
  useLessonKeys(session, mentorOpen);

  // A guest has no mentor: the page itself sends them to sign in.
  const origin = mentorOrigin("lesson", { topic: lesson.title, path: track.id, layer: layer.id });
  const askMentor = () => (auth ? setMentorOpen(true) : navigate("/mentor", { state: origin }));

  const onResult = (lines) => {
    if (step.kind !== "try" || solved(work.tries[index])) return;
    session.setTry(printedExactly(lines, step.expect) ? "passed" : "failed");
  };

  const checks = steps.map((s, i) => [s, i]).filter(([s]) => s.kind === "check");
  const score = {
    right: checks.filter(([s, i]) => work.answers[i] === s.answer).length,
    answered: checks.filter(([, i]) => work.answers[i] != null).length,
    total: checks.length,
  };

  const layerHref = `/learn/${track.id}/${layer.id}`;
  const outline = <LessonOutline steps={steps} index={index} furthest={session.furthest} onOpen={session.goTo} />;

  return (
    <div className="lesson-shell flex min-h-dvh flex-col lg:h-dvh">
      <LessonHeader
        layerHref={layerHref}
        layerTitle={layer.title}
        title={lesson.title}
        draft={content.status === "draft"}
        total={steps.length}
        index={index}
        onMentor={askMentor}
      />
      <OutlineMenu step={step}>{outline}</OutlineMenu>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-68 shrink-0 overflow-y-auto border-r border-(--lesson-line) bg-(--lesson-rail) px-3 py-6 xl:block">
          {outline}
        </aside>

        {finished ? (
          <div className="min-w-0 flex-1 overflow-y-auto px-5 py-12 sm:px-10">
            <LessonFinished
              lesson={lesson}
              lessons={lessons}
              content={content}
              score={score}
              completed={engaged}
              doneSlugs={new Set([...finishedLessons(track.id, layer.id), ...(engaged ? [lesson.slug] : [])])}
              next={next}
              layerHref={layerHref}
              testHref={testHref}
              labHref={labHref}
            />
          </div>
        ) : (
          <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[minmax(0,1fr)] content-start pb-18 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:content-normal lg:pb-0">
            <div className="flex min-h-0 min-w-0 flex-col">
              {/* Keyed: a new step starts at the top of its own scroll. */}
              <section key={index} aria-label={step.short} className="min-h-0 flex-1 lg:overflow-y-auto">
                <div className="mx-auto max-w-[70ch] px-5 py-8 sm:px-10 sm:py-11">
                  <StepContent
                    step={step}
                    content={content}
                    answer={work.answers[index]}
                    result={work.tries[index]}
                    explain={work.explain}
                    onAnswer={session.setAnswer}
                    onShowFix={() => session.setTry("shown")}
                    onExplain={session.setExplain}
                  />
                </div>
              </section>
              <LessonFooter
                canBack={index > 0}
                canContinue={session.canContinue}
                blockedHint={BLOCKED_HINT[step.kind]}
                isLast={index === steps.length - 1}
                onBack={session.back}
                onNext={session.forward}
              />
            </div>

            <aside
              aria-label={step.kind === "explain" ? "Pictures" : "Code"}
              className="min-h-0 min-w-0 border-t border-(--lesson-line) bg-(--lesson-code) lg:overflow-y-auto lg:border-l lg:border-t-0"
            >
              <SidePanel
                steps={steps}
                index={index}
                locked={step.kind === "check" && step.type === "predict" && work.answers[index] == null}
                fixShown={work.tries[index] === "shown"}
                onResult={onResult}
              />
            </aside>
          </div>
        )}
      </div>

      <MentorPanel open={mentorOpen} onClose={closeMentor} origin={origin.origin} subtitle={lesson.title} />
    </div>
  );
}
