import { Link } from "react-router-dom";
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
import { PROGRESS_COPY as COPY } from "../../../constants/progress";
import { PAGE } from "../../../constants/layout";
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

const Skeleton = ({ className }) => <div className={`animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900 ${className}`} />;

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
            <div className="space-y-4" aria-busy="true" aria-label="Loading progress">
              <Skeleton className="h-36" />
              <Skeleton className="h-64" />
            </div>
          )}
          {mastery.error && <LoadError error={mastery.error} onRetry={mastery.reload} />}

          {data && <NextStepCard nextAction={data.nextAction} />}
          {data && data.summary.total === 0 && <NoTopics />}
          {data && data.summary.total > 0 &&
            (data.detail ? <TopicList topics={data.topics} /> : <LockedTopics count={data.lockedTopicCount} />)}
        </div>

        <aside className="order-first space-y-6 lg:order-2" aria-label="Your path and activity">
          {journey.loading && <Skeleton className="h-64" />}
          {journey.error && <LoadError error={journey.error} onRetry={journey.reload} />}
          {journey.data && <PathCard journey={journey.data} />}
          {journey.data && <ActivityCard journey={journey.data} />}

          {readiness.data && <ReadinessCard readiness={readiness.data} />}
          {readiness.error && <LoadError error={readiness.error} onRetry={readiness.reload} />}
        </aside>
      </div>
    </div>
  );
};

export default ProgressPage;
