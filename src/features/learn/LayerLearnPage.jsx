import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Code2, Play, ShieldCheck } from "lucide-react";
import useLearnLayer from "./hooks/useLearnLayer";
import LearnState from "./components/LearnState";
import LayerPath from "./components/LayerPath";
import { hasLessonContent, loadLessonContent } from "./content";
import { lessonMeta } from "./content/manifest";
import { finishedLessons } from "./lib/lessonProgress";
import { EXAM_RULES } from "../../../constants/exam";

const whenIdle = (fn) =>
  "requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500);

/**
 * Once the page is idle, download what the most likely next click needs: the
 * lesson page's code and the Up next lesson. Both are cached as modules, so
 * the click then opens without a wait. Failures are ignored: it's a head start,
 * not a requirement.
 */
function usePrefetchNext(trackId, layerId, slug) {
  useEffect(() => {
    if (!slug) return;
    const id = whenIdle(() => {
      import("./TopicPage").catch(() => {});
      if (hasLessonContent(trackId, layerId, slug)) loadLessonContent(trackId, layerId, slug).catch(() => {});
    });
    return () => ("cancelIdleCallback" in window ? cancelIdleCallback(id) : clearTimeout(id));
  }, [trackId, layerId, slug]);
}

// Cards are opaque so the path line passes behind them, not through them.
const cardBase = "block rounded-2xl border bg-neutral-950 transition-colors";

function LessonCard({ lesson, href, state, minutes, written, section }) {
  const dot = {
    done: "border-purple-500 bg-purple-500 text-white",
    next: "border-purple-400 ring-4 ring-purple-500/20",
    todo: "border-neutral-700",
  }[state];

  return (
    <Link
      to={href}
      className={`${cardBase} group px-5 py-4 ${
        state === "next"
          ? "border-purple-700/70 bg-[#0f0816] hover:border-purple-500"
          : "border-neutral-800 hover:border-neutral-600"
      }`}
    >
      {section && <span className="mb-2 block text-xs text-neutral-500">{section}</span>}
      <span className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 ${dot}`}
        >
          {state === "done" && <Check size={10} strokeWidth={3} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[15px] leading-snug ${state === "done" ? "text-neutral-400" : "text-neutral-100"}`}>
            {lesson.title}
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 text-xs">
            {state === "next" && <span className="text-purple-300">Up next</span>}
            {state === "done" && <span className="text-neutral-500">Done</span>}
            {written ? (
              <span className="text-purple-300/80">Interactive{minutes ? `, ${minutes} min` : ""}</span>
            ) : (
              <span className="text-neutral-500">Reading list</span>
            )}
          </span>
        </span>
        <ArrowRight
          size={14}
          className="mt-1 shrink-0 text-neutral-600 transition-colors group-hover:text-neutral-300"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function PhaseLabel({ n, title }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center rounded-full border border-neutral-700 text-sm tabular-nums text-neutral-300">
        {n}
      </span>
      <span className="text-xl font-semibold text-neutral-50">{title}</span>
    </span>
  );
}

/**
 * One layer as a road: its lessons wind left and right, then the road runs
 * into Build (the project) and Prove (the test). The top button always points
 * at the single next thing to do.
 */
export default function LayerLearnPage() {
  const { trackId, layerId } = useParams();
  const { status, track, layer, lessons, layerCount } = useLearnLayer(trackId, layerId);
  // Read once per layer; finishing a lesson navigates away and back, which re-reads it.
  const finished = useMemo(() => finishedLessons(trackId, layerId), [trackId, layerId]);
  usePrefetchNext(trackId, layerId, lessons.find((l) => !finished.has(l.slug))?.slug);

  if (status !== "ready") return <LearnState status={status} />;

  const base = `/learn/${track.id}/${layer.id}`;
  const testHref = `/roadmaps/exam/${layer.id}?path=${track.domain.id}`;
  const challengesHref = `/coding-challenges?track=${track.id}&layer=${layer.id}`;

  const nextLesson = lessons.find((l) => !finished.has(l.slug));
  const doneCount = lessons.filter((l) => finished.has(l.slug)).length;

  let cta;
  if (lessons.length === 0) cta = { to: testHref, label: "Take the layer test" };
  else if (!nextLesson) cta = { to: challengesHref, label: "Lessons done: start building" };
  else if (doneCount === 0) cta = { to: `${base}/${nextLesson.slug}`, label: `Start: ${nextLesson.title}` };
  else cta = { to: `${base}/${nextLesson.slug}`, label: `Continue: ${nextLesson.title}` };

  const stops = [
    ...lessons.map((lesson, i) => ({
      key: lesson.slug,
      side: i % 2 === 0 ? "left" : "right",
      node: (
        <LessonCard
          lesson={lesson}
          href={`${base}/${lesson.slug}`}
          state={finished.has(lesson.slug) ? "done" : lesson === nextLesson ? "next" : "todo"}
          minutes={lessonMeta(track.id, layer.id, lesson.slug)?.minutes}
          written={hasLessonContent(track.id, layer.id, lesson.slug)}
          section={i === 0 || lessons[i - 1].section !== lesson.section ? lesson.section : null}
        />
      ),
    })),
    {
      key: "build",
      side: "center",
      node: (
        <section aria-label="Build" className={`${cardBase} border-neutral-800 p-6`}>
          <PhaseLabel n={2} title="Build" />
          <p className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
            <Code2 size={14} aria-hidden="true" /> Project
          </p>
          <p className="mt-1.5 text-[17px] leading-relaxed text-neutral-100">{layer.challenge}</p>
          <Link
            to={challengesHref}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-purple-300 hover:text-purple-200"
          >
            Practice challenges for this layer <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </section>
      ),
    },
    {
      key: "prove",
      side: "center",
      node: (
        <section aria-label="Prove" className={`${cardBase} border-neutral-800 p-6`}>
          <PhaseLabel n={3} title="Prove" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[17px] text-neutral-100">
                <ShieldCheck size={16} className="text-purple-300" aria-hidden="true" /> Layer test
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {EXAM_RULES.questionsPerExam} questions in {EXAM_RULES.timeLimitSecs / 60} minutes.{" "}
                {EXAM_RULES.passThreshold}% to pass and unlock the next layer.
              </p>
            </div>
            <Link
              to={testHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-purple-500/60 px-5 text-sm font-medium text-purple-200 transition-colors hover:bg-purple-600/20"
            >
              Take the test <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      ),
    },
  ];

  // The purple part of the road ends where the next lesson begins
  // (or at Build when every lesson is done).
  const nextIndex = nextLesson ? lessons.indexOf(nextLesson) : lessons.length;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <Link to="/roadmaps" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-neutral-400 hover:text-white">
        <ArrowLeft size={15} aria-hidden="true" /> {track.title}
      </Link>

      <header className="mt-6">
        <p className="text-sm text-neutral-500">
          Layer {layer.order}
          {layerCount > 0 && ` of ${layerCount}`}
        </p>
        <h1 className="mt-1 text-[34px] font-semibold leading-tight text-neutral-50">{layer.title}</h1>
        <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-neutral-400">{layer.description}</p>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          to={cta.to}
          className="inline-flex min-h-12 max-w-full items-center gap-2.5 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white transition-colors hover:bg-purple-500"
        >
          <Play size={14} fill="currentColor" aria-hidden="true" className="shrink-0" />
          <span className="truncate">{cta.label}</span>
        </Link>
        {lessons.length > 0 && (
          <span className="text-sm text-neutral-500">
            {doneCount} of {lessons.length} lessons done
          </span>
        )}
      </div>

      <div className="mt-14">
        <PhaseLabel n={1} title="Learn" />
        <p className="mt-1 pl-[38px] text-sm text-neutral-500">
          {lessons.length} lessons, {layer.estimatedTime}
        </p>
      </div>

      <div className="mt-8">
        {lessons.length === 0 && (
          <p className="mb-12 text-[15px] text-neutral-400">
            Lessons for this layer are still being written. You can already take the test.
          </p>
        )}
        <LayerPath stops={stops} nextIndex={nextIndex} />
      </div>
    </div>
  );
}
