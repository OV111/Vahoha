import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { hasVoiceExam } from "@/features/voice-exam/lib/pilotLayers";
import { useVerifiedLayers } from "@/features/voice-exam/hooks/useVerifiedLayers";
import useLearnLayer from "./hooks/useLearnLayer";
import LearnState from "./components/LearnState";
import LayerSteps from "./components/layer/LayerSteps";
import LayerGoals from "./components/layer/LayerGoals";
import { hasLessonContent, loadLessonContent } from "./content";
import { lessonMeta } from "./content/manifest";
import { useLayerStatuses } from "./lib/lessonStatus";
import { nextLesson } from "./lib/nextLesson";
import { loadDraft } from "./lib/lessonDraft";

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

/**
 * One layer: its lessons as a list in teaching order, then Build and Test. The
 * top button always points at the single next thing to do.
 */
export default function LayerLearnPage() {
  const { trackId, layerId } = useParams();
  const { status, track, layer, lessons, layerCount } = useLearnLayer(trackId, layerId);
  const statuses = useLayerStatuses(trackId, layerId);
  const isWritten = (slug) => hasLessonContent(trackId, layerId, slug);
  const next = nextLesson(lessons, statuses, isWritten);
  usePrefetchNext(trackId, layerId, next?.slug);
  const { auth } = useAuthStore();
  const verifiedLayers = useVerifiedLayers(Boolean(auth));

  if (status !== "ready") return <LearnState status={status} />;

  const base = `/learn/${track.id}/${layer.id}`;
  const testHref = `/roadmaps/exam/${layer.id}?path=${track.domain.id}`;
  const challengesHref = `/coding-challenges?track=${track.id}&layer=${layer.id}`;
  const voiceHref = hasVoiceExam(layer.id)
    ? `/voice-exam/${layer.id}?path=${track.domain.id}&track=${track.id}`
    : null;

  const rows = lessons.map((lesson) => {
    const done = statuses[lesson.slug] === "done";
    return {
      ...lesson,
      href: `${base}/${lesson.slug}`,
      state: done ? "done" : lesson === next ? "next" : "todo",
      written: isWritten(lesson.slug),
      minutes: lessonMeta(track.id, layer.id, lesson.slug)?.minutes,
    };
  });
  const doneCount = rows.filter((l) => l.state === "done").length;

  let cta;
  if (next) {
    const resuming = loadDraft(track.id, layer.id, next.slug);
    cta = { to: `${base}/${next.slug}`, label: `${resuming ? "Continue" : "Start"}: ${next.title}` };
  } else if (lessons.length === 0) cta = { to: testHref, label: "Take the layer test" };
  else cta = { to: challengesHref, label: "Lessons done: start building" };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <Link to="/learn" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-neutral-400 hover:text-white">
        <ArrowLeft size={15} aria-hidden="true" /> My learning
      </Link>

      <header className="mt-5">
        <p className="text-[15px] text-neutral-400">
          {track.title}, layer {layer.order}
          {layerCount > 0 && ` of ${layerCount}`}
        </p>
        <h1 className="mt-1 text-[34px] font-semibold leading-tight text-balance text-neutral-50">{layer.title}</h1>
        <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-neutral-400">{layer.description}</p>
      </header>

      {lessons.length > 0 && (
        <div className="mt-7 flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800" aria-hidden="true">
            <div className="h-full bg-purple-500" style={{ width: `${(doneCount / lessons.length) * 100}%` }} />
          </div>
          <span className="shrink-0 text-[15px] text-neutral-400">
            {doneCount} of {lessons.length} lessons done
          </span>
        </div>
      )}

      <Link
        to={cta.to}
        className="mt-6 inline-flex min-h-12 max-w-full items-center gap-2.5 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white transition-colors hover:bg-purple-500"
      >
        <Play size={14} fill="currentColor" aria-hidden="true" className="shrink-0" />
        <span className="truncate">{cta.label}</span>
      </Link>

      <div className="mt-10">
        {lessons.length === 0 ? (
          <p className="mb-8 text-[15px] text-neutral-400">
            Lessons for this layer are still being written. You can already take the test.
          </p>
        ) : (
          <LayerSteps lessons={rows} />
        )}
        <LayerGoals
          challenge={layer.challenge}
          challengesHref={challengesHref}
          testHref={testHref}
          voiceHref={voiceHref}
          verified={verifiedLayers.has(layer.id)}
        />
      </div>
    </div>
  );
}
