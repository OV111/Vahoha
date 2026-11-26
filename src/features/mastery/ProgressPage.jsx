import { Bone, BoneControl, BoneLines, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import MentorPanel from "@/features/mentor/components/MentorPanel";
import { AlertTriangle } from "lucide-react";
import useMastery from "./hooks/useMastery";
import useJourney from "./hooks/useJourney";
import useReadiness from "./hooks/useReadiness";
import PathCard from "./components/PathCard";
import ActivityCard from "./components/ActivityCard";
import NextStepCard from "./components/NextStepCard";
import TopicList from "./components/TopicList";
import LockedTopics from "./components/LockedTopics";
import ReadinessCard from "./components/ReadinessCard";
import { PROGRESS_COPY as COPY } from "@/constants/progress";
import { PAGE } from "@/constants/layout";
import { TEXT, MUTED, BORDER, FOCUS } from "./lib/tone";

const LoadError = ({ error, onRetry }) => (
  <div
    role="alert"
    className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/5 dark:text-amber-200"
  >
    <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
    <p className="flex-1">{error.message}</p>
    <button type="button" onClick={onRetry} className={`cursor-pointer rounded font-medium underline ${FOCUS}`}>
      {COPY.retry}
    </button>
  </div>
);

const NextStepSkeleton = () => (
  <BonePanel className="rounded-xl p-5 sm:p-6">
    <p className={`text-sm font-medium ${MUTED}`}>{COPY.nextStep}</p>
    <Bone className="mt-2 h-6 w-1/2" />
    <Bone soft className="mt-2.5 h-3.5 w-3/4" />
    <div className="mt-5 flex gap-3">
      <BoneControl className="h-9 w-32" />
      <BoneControl className="h-9 w-32" />
    </div>
  </BonePanel>
);

const TOPIC_WIDTHS = ["w-1/2", "w-2/3", "w-2/5", "w-3/5"];

const TopicsSkeleton = () => (
  <div className="space-y-3">
    {TOPIC_WIDTHS.map((width) => (
      <BonePanel key={width} className="rounded-xl p-5">
        <BoneLines widths={[width, "w-1/4"]} />
      </BonePanel>
    ))}
  </div>
);

const PathSkeleton = () => (
  <BonePanel className="rounded-xl p-5">
    <Bone className="my-1 h-4 w-1/2" />
    <Bone className="mt-5 h-2.5 w-full" />
    <BoneLines className="mt-4" widths={["w-2/5", "w-3/5", "w-1/3"]} />
  </BonePanel>
);

const NoTopics = () => (
  <section className={`rounded-xl border border-dashed px-6 py-8 ${BORDER}`}>
    <h2 className={`text-base font-semibold ${TEXT}`}>{COPY.topics.noneTitle}</h2>
    <p className={`mt-1 max-w-md text-sm ${MUTED}`}>{COPY.topics.noneBody}</p>
    <Link to="/roadmaps" className={`mt-3 inline-block rounded text-sm text-purple-600 hover:underline dark:text-purple-400 ${FOCUS}`}>
      {COPY.topics.noneCta}
    </Link>
  </section>
);

/**
 * The learner's progress, in the order they need it: where am I on my path,
 * what do I do next, which topics need work, how close am I to a job.
 *
 * Three independent requests, so one failing never hides the others. All the
 * judgement (statuses, the next step, what a free user may see) is the server's;
 * this page only lays it out.
 */
const ProgressPage = () => {
  const mastery = useMastery();
  const journey = useJourney();
  const readiness = useReadiness();
  const data = mastery.data;
  // { origin, prompt, subtitle } while the mentor panel is open over this page.
  const [mentor, setMentor] = useState(null);
  const closeMentor = useCallback(() => setMentor(null), []);

  return (
    // `dark` pins this page to dark styles: MainLayout's background is always
    // black, so the light variants would put light cards on it for anyone who
    // chose the light theme elsewhere.
    <div className={`dark ${PAGE.dashboard} py-16 pt-28`}>
      <header className="mb-10">
        <h1 className={`text-3xl font-semibold tracking-tight ${TEXT}`}>{COPY.title}</h1>
        <p className={`mt-2 max-w-xl text-sm ${MUTED}`}>{COPY.intro}</p>
      </header>

      {/* Main (what to work on) left, context (path, activity, readiness) right.
          On narrow screens the side column comes first: it is short, and it
          answers "where am I" before the list of topics. */}
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-12 lg:order-1">
          {mastery.loading && (
            <SkeletonRegion label="Loading progress" className="space-y-12">
              <NextStepSkeleton />
              <TopicsSkeleton />
            </SkeletonRegion>
          )}
          {mastery.error && <LoadError error={mastery.error} onRetry={mastery.reload} />}

          {data && <NextStepCard nextAction={data.nextAction} onAskMentor={setMentor} />}
          {data && data.summary.total === 0 && <NoTopics />}
          {data && data.summary.total > 0 &&
            (data.detail ? (
              <TopicList topics={data.topics} onAskMentor={setMentor} />
            ) : (
              <LockedTopics count={data.lockedTopicCount} />
            ))}
        </div>

        <aside className="order-first space-y-6 lg:order-2" aria-label="Your path and activity">
          {journey.loading && (
            <SkeletonRegion label="Loading your path">
              <PathSkeleton />
            </SkeletonRegion>
          )}
          {journey.error && <LoadError error={journey.error} onRetry={journey.reload} />}
          {journey.data && <PathCard journey={journey.data} />}
          {journey.data && <ActivityCard journey={journey.data} />}

          {readiness.data && <ReadinessCard readiness={readiness.data} />}
          {readiness.error && <LoadError error={readiness.error} onRetry={readiness.reload} />}
        </aside>
      </div>

      <MentorPanel
        open={Boolean(mentor)}
        onClose={closeMentor}
        origin={mentor?.origin}
        initialPrompt={mentor?.prompt}
        subtitle={mentor?.subtitle}
      />
    </div>
  );
};

export default ProgressPage;
