import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Bone, BoneControl, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";
import useMyLayer from "./hooks/useMyLayer";
import { useLayerStatuses } from "./lib/lessonStatus";
import { buildLessons } from "./lib/curriculum";
import { nextLesson } from "./lib/nextLesson";
import { loadTopicWork } from "./lib/topicWork";
import { hasTopic, topicMeta } from "./content/topics";
import { LEARN_HOME_COPY as COPY, LEARN_PHASES } from "@/constants/learn";

function ActionCard({ eyebrow, title, detail, to, label }) {
  return (
    <section className="rounded-2xl border border-purple-800/60 bg-purple-950/20 p-6 sm:p-9">
      {eyebrow && <p className="text-[15px] text-neutral-400">{eyebrow}</p>}
      <h1 className="mt-2 text-[32px] font-semibold leading-tight text-balance text-neutral-50 sm:text-[38px]">{title}</h1>
      {detail && <p className="mt-3 text-[17px] leading-relaxed text-neutral-400">{detail}</p>}
      <Link
        to={to}
        className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-purple-600 px-7 text-[15px] font-medium text-white transition-colors hover:bg-purple-500"
      >
        {label} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </section>
  );
}

const CardSkeleton = () => (
  <SkeletonRegion label="Loading your path">
    <BonePanel className="rounded-2xl p-6 sm:p-9">
      <Bone className="h-4 w-24" />
      <Bone className="mt-5 h-9 w-3/4" />
      <Bone soft className="mt-5 h-4 w-1/2" />
      <BoneControl className="mt-8 h-12 w-36 rounded-xl" />
    </BonePanel>
  </SkeletonRegion>
);

function CapstoneRow({ passedCount, layerCount }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-neutral-300">
      <span>
        {COPY.capstone}: {passedCount} of {layerCount} layers passed
      </span>
      <div className="h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-neutral-800" aria-hidden="true">
        <div className="h-full bg-emerald-500" style={{ width: `${(passedCount / layerCount) * 100}%` }} />
      </div>
      <Link to="/roadmaps" className="inline-flex min-h-11 items-center text-neutral-400 hover:text-white">
        {COPY.map}
      </Link>
    </div>
  );
}

function NextUp({ track, layer, layerCount, passedCount }) {
  const statuses = useLayerStatuses(track.id, layer.id);
  const written = (slug) => hasTopic(track.id, layer.id, slug);
  const lesson = nextLesson(buildLessons(layer), statuses, written);
  const base = `/learn/${track.id}/${layer.id}`;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 text-[15px] text-neutral-400">
        <span>
          {track.title}, layer {layer.order} of {layerCount}: {layer.title}
        </span>
        <Link to={base} className="inline-flex min-h-11 items-center hover:text-white">
          {COPY.seeLayer}
        </Link>
      </div>
      {lesson ? (
        <LessonCard base={base} lesson={lesson} track={track} layer={layer} started={Object.keys(statuses).length > 0} />
      ) : (
        <ActionCard title={COPY.layerReadTitle} detail={COPY.layerReadBody} to={base} label={COPY.seeLayer} />
      )}
      <CapstoneRow passedCount={passedCount} layerCount={layerCount} />
    </>
  );
}

function LessonCard({ base, lesson, track, layer, started }) {
  const meta = topicMeta(track.id, layer.id, lesson.slug);
  const answered = meta ? Object.keys(loadTopicWork(meta.topicId).answers).length : 0;
  const progress = answered > 0 ? `${answered} answered` : meta && `about ${meta.minutes} min`;
  // Without a written topic there is no mystery: the title leads and nothing repeats below it.
  const detail = meta ? `${lesson.title}, ${progress}` : lesson.description;
  return (
    <ActionCard
      eyebrow={started ? COPY.continue : COPY.startHere}
      title={meta?.mystery ?? lesson.title}
      detail={detail}
      to={`${base}/${lesson.slug}`}
      label={answered > 0 ? COPY.continue : COPY.start}
    />
  );
}

function Content({ my }) {
  if (my.status === "loading") return <CardSkeleton />;
  if (my.status === "error") return <p role="alert" className="text-[17px] text-neutral-300">{COPY.loadError}</p>;
  if (my.status === "no-path")
    return <ActionCard title={COPY.noPathTitle} detail={COPY.noPathBody} to="/roadmaps" label={COPY.noPathCta} />;
  if (my.status === "path-done")
    return (
      <ActionCard
        eyebrow={my.track.title}
        title={COPY.pathDoneTitle}
        detail={COPY.pathDoneBody}
        to={`/capstone/${my.track.id}`}
        label={COPY.pathDoneCta}
      />
    );
  return <NextUp track={my.track} layer={my.layer} layerCount={my.layerCount} passedCount={my.passedCount} />;
}

/** "What do I do now?": one card with the next lesson on the learner's path. */
export default function LearnHomePage() {
  const my = useMyLayer();
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <Content my={my} />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-neutral-50">{COPY.howTitle}</h2>
        <p className="mt-2 text-[17px] text-neutral-400">{COPY.howBody}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {LEARN_PHASES.map((phase) => (
            <div key={phase.title}>
              <h3 className="text-lg font-semibold text-neutral-100">{phase.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-400">{phase.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
