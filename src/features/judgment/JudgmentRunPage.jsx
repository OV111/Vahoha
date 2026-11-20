import { useParams } from "react-router-dom";
import { AlertTriangle, Compass, Loader2 } from "lucide-react";
import { useJudgmentRun } from "./hooks/useJudgmentRun";
import Meters from "./components/Meters";
import DecisionCard from "./components/DecisionCard";
import RunHistory from "./components/RunHistory";
import Debrief from "./components/Debrief";

// /judgment/run/:runId — one run, driven by what the server says the world looks like.
const JudgmentRunPage = () => {
  const { runId } = useParams();
  const { run, error, isBusy, decide } = useJudgmentRun(runId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-300">
        <Compass size={15} aria-hidden="true" /> Judgment simulator
        {run && <span className="text-neutral-500">· {run.scenario.title}</span>}
      </h1>

      {error && (
        <div role="alert" className="mb-5 flex items-center gap-2 rounded-2xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          <AlertTriangle size={16} className="shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {!run && !error && (
        <div className="flex justify-center py-16 text-neutral-500">
          <Loader2 size={20} className="animate-spin" aria-label="Loading" />
        </div>
      )}

      {run && (
        <div className="flex flex-col gap-5">
          <Meters meters={run.meters} start={run.scenario.start} />
          {run.debrief ? (
            <Debrief debrief={run.debrief} />
          ) : (
            run.event && (
              <DecisionCard
                key={run.event.id} // a fresh form for every event
                event={run.event}
                step={run.step}
                total={run.scenario.decisions}
                isBusy={isBusy}
                onDecide={decide}
              />
            )
          )}
          <RunHistory history={run.history} />
        </div>
      )}
    </div>
  );
};

export default JudgmentRunPage;
