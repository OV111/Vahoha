import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { hasVoiceExam } from "@/features/voice-exam/lib/pilotLayers";
import { useVerifiedLayers } from "@/features/voice-exam/hooks/useVerifiedLayers";
import useLearnLayer from "./hooks/useLearnLayer";
import LearnState from "./components/LearnState";
import LayerContents from "./components/layer/LayerContents";
import { AfterTopics, UpNext } from "./components/layer/LayerAside";
import { hasTopic, topicLoader, topicMeta } from "./content/topics";
import { useLayerStatuses } from "./lib/lessonStatus";
import { nextLesson } from "./lib/nextLesson";

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
      topicLoader(trackId, layerId, slug)?.().catch(() => {});
    });
    return () => ("cancelIdleCallback" in window ? cancelIdleCallback(id) : clearTimeout(id));
  }, [trackId, layerId, slug]);
}

/** Only ready topics count: one that isn't written yet can't be finished. */
function Progress({ rows }) {
  const ready = rows.filter((l) => l.written);
  const done = ready.filter((l) => l.state === "done").length;
  const coming = rows.length - ready.length;
  if (rows.length === 0) return null;
  return (
    <div className="grid max-w-xl gap-2">
      <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full bg-purple-500" style={{ width: `${ready.length ? (done / ready.length) * 100 : 0}%` }} />
      </div>
      <p className="text-[13px] text-neutral-400">
        {ready.length > 0 && `${done} of ${ready.length} ready topics done`}
        {ready.length > 0 && coming > 0 && ", "}
        {coming > 0 && `${coming} coming soon`}
      </p>
    </div>
  );
}

/**
 * One layer: its topics as a contents list that carries the next step, and what
 * comes after the topics beside it.
 */
export default function LayerLearnPage() {
  const { trackId, layerId } = useParams();
  const { status, track, layer, lessons, layerCount } = useLearnLayer(trackId, layerId);
  const statuses = useLayerStatuses(trackId, layerId);
  const isWritten = (slug) => hasTopic(trackId, layerId, slug);
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

  const rows = lessons.map((lesson) => ({
    ...lesson,
    href: `${base}/${lesson.slug}`,
    state: statuses[lesson.slug] === "done" ? "done" : lesson === next ? "next" : "todo",
    written: isWritten(lesson.slug),
    ...topicMeta(track.id, layer.id, lesson.slug), // minutes and mystery, when written
  }));

  const row = rows.find((l) => l.state === "next");
  let upNext = null;
  if (lessons.length === 0) upNext = { title: "Layer test", to: testHref, label: "Take the test" };
  else if (!row) upNext = { title: "Topics done", detail: "Now build the layer project.", to: challengesHref, label: "Start building" };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 px-4 pb-24 pt-5 lg:px-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-x-4">
      <header className="grid content-start gap-4">
        <Link to="/learn" className="inline-flex min-h-11 w-fit items-center gap-2 text-[13px] text-neutral-400 hover:text-white">
          <ArrowLeft size={16} aria-hidden="true" /> My learning
        </Link>
        <div>
          <p className="text-[13px] text-neutral-400">
            {track.title}, layer {layer.order}
            {layerCount > 0 && ` of ${layerCount}`}
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-balance text-white">{layer.title}</h1>
          <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-neutral-300">
            {layer.outcome ? `After this layer you can ${layer.outcome}` : layer.description}
          </p>
        </div>
        <Progress rows={rows} />
      </header>

      {upNext && (
        <div className="xl:col-start-2 xl:row-start-1 xl:self-end">
          <UpNext {...upNext} />
        </div>
      )}

      <div className="xl:row-start-2">
        {lessons.length === 0 ? (
          <p className="text-sm text-neutral-400">
            Topics for this layer are still being written. You can already take the test.
          </p>
        ) : (
          <LayerContents lessons={rows} resuming={Boolean(row) && statuses[row.slug] === "in_progress"} />
        )}
      </div>

      <div className="xl:col-start-2 xl:row-start-2">
        <AfterTopics
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
