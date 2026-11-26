import { Link } from "react-router-dom";
import { Lightbulb, RotateCcw } from "lucide-react";
import { CALIBRATION_TEXT, VERDICTS } from "@/features/judgment/lib/constants";

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-neutral-800 bg-black px-4 py-3">
    <p className="text-xs text-neutral-500">{label}</p>
    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
  </div>
);

/** The end of a run: score, calibration, and what a senior would have weighed at each step. */
const Debrief = ({ debrief }) => {
  const { score, summary, aiReviewed, decisions } = debrief;
  const principles = [...new Map(decisions.map((d) => [d.principle.id, d.principle])).values()];

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Debrief</p>
        <div className="mt-3 flex items-end gap-3">
          <span className="text-5xl font-bold text-white">{score.judgment}</span>
          <span className="pb-1.5 text-sm text-neutral-400">Judgment score / 100</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Decisions" value={`${score.choices}/100`} />
          <Stat label="Reasoning" value={score.reasoning === null ? "—" : `${score.reasoning}/100`} />
          <Stat label="Confidence" value={score.calibration.label[0].toUpperCase() + score.calibration.label.slice(1)} />
        </div>
        <p className="mt-4 text-sm text-neutral-300">{CALIBRATION_TEXT[score.calibration.label]}</p>
        {summary && <p className="mt-3 text-sm leading-relaxed text-neutral-200">{summary}</p>}
        {!aiReviewed && (
          <p className="mt-3 text-xs text-neutral-500">The AI review of your reasons wasn't available this time, so the score counts your decisions only.</p>
        )}
      </section>

      <section aria-label="Your decisions" className="flex flex-col gap-3">
        {decisions.map((d) => (
          <article key={d.eventId} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-white">{d.title}</h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${VERDICTS[d.verdict].chip}`}>
                {VERDICTS[d.verdict].label}
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-300">
              <span className="text-neutral-500">You chose: </span>{d.chosen}
            </p>
            <p className="mt-1 text-sm italic text-neutral-400">
              “{d.why}” · {d.confidence}% sure
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-200">{d.senior}</p>
            {d.best && (
              <p className="mt-2 text-sm text-emerald-300">
                <span className="text-neutral-500">A senior would pick: </span>{d.best}
              </p>
            )}
            {d.feedback && (
              <p className="mt-3 rounded-xl bg-black px-3.5 py-2.5 text-sm text-neutral-300">
                <span className="font-medium text-neutral-100">On your reasoning ({d.reasoning}/3): </span>{d.feedback}
              </p>
            )}
            <p className="mt-3 text-xs text-neutral-500">Principle: {d.principle.title}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-200">
          <Lightbulb size={15} className="text-amber-300" aria-hidden="true" /> Principles to keep
        </h2>
        <ul className="flex flex-col gap-2.5">
          {principles.map((p) => (
            <li key={p.id} className="text-sm text-neutral-300">
              <span className="font-medium text-white">{p.title}.</span> {p.text}
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/judgment"
        className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 hover:border-neutral-700"
      >
        <RotateCcw size={15} aria-hidden="true" /> Back to the simulator
      </Link>
    </div>
  );
};

export default Debrief;
