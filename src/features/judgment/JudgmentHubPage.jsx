import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight, Compass, Loader2 } from "lucide-react";
import { fetchScenarios, startRun } from "./api/judgmentApi";

const HOW = [
  { title: "Decide", body: "Each week something happens. Pick what you'd do and say why." },
  { title: "Live with it", body: "Time moves on. Shortcuts you took can come back weeks later." },
  { title: "Debrief", body: "See what a senior would have weighed, and how well you know your own limits." },
];

// /judgment — the scenarios a learner can play.
const JudgmentHubPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [starting, setStarting] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchScenarios()
      .then((d) => !cancelled && setData(d))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  const open = async (scenario) => {
    if (scenario.activeRunId) return navigate(`/judgment/run/${scenario.activeRunId}`);
    setStarting(scenario.id);
    setError(null);
    try {
      const run = await startRun(scenario.id);
      navigate(`/judgment/run/${run.id}`);
    } catch (err) {
      setError(err.message);
      setStarting(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="flex items-center gap-2 text-sm font-medium text-emerald-300">
        <Compass size={15} aria-hidden="true" /> Judgment simulator
      </h1>
      <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Make the calls AI can't make for you.</p>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">
        Run a small product for a few weeks. There's no single right answer, only trade-offs and their consequences.
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-3">
        {HOW.map((h, i) => (
          <li key={h.title} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-xs font-semibold text-emerald-300">{i + 1}. {h.title}</p>
            <p className="mt-1.5 text-sm text-neutral-400">{h.body}</p>
          </li>
        ))}
      </ol>

      {error && (
        <div role="alert" className="mt-6 flex items-center gap-2 rounded-2xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          <AlertTriangle size={16} className="shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {!data && !error && (
        <div className="flex justify-center py-16 text-neutral-500">
          <Loader2 size={20} className="animate-spin" aria-label="Loading" />
        </div>
      )}

      {data && (
        <>
          <ul className="mt-8 flex flex-col gap-3">
            {data.scenarios.map((s) => (
              <li key={s.id} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {s.path} · {s.decisions} decisions · {s.weeks} weeks
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.summary}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-neutral-500">
                    {s.bestScore === null ? "Not played yet" : `Best score ${s.bestScore} · played ${s.runs}×`}
                  </span>
                  <button
                    type="button"
                    onClick={() => open(s)}
                    disabled={Boolean(starting)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition-colors duration-150 hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {starting === s.id && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
                    {s.activeRunId ? "Continue" : s.runs ? "Play again" : "Start"}
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-500">
            {data.quota.used} of {data.quota.limit} new simulations used today.
          </p>
        </>
      )}
    </div>
  );
};

export default JudgmentHubPage;
