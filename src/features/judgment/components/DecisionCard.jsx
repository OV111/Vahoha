import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CONFIDENCE_LEVELS, MAX_WHY_CHARS, MIN_WHY_CHARS } from "../lib/constants";

/** The event of this week: pick an option, say why, say how sure you are. */
const DecisionCard = ({ event, step, total, isBusy, onDecide }) => {
  const [optionId, setOptionId] = useState(null);
  const [why, setWhy] = useState("");
  const [confidence, setConfidence] = useState(null);

  const ready = optionId && why.trim().length >= MIN_WHY_CHARS && confidence;
  const isLast = step === total;

  const submit = (e) => {
    e.preventDefault();
    if (ready) onDecide({ eventId: event.id, optionId, why: why.trim(), confidence });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
        Week {event.week} · Decision {step} of {total}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white">{event.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">{event.body}</p>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium text-neutral-200">What do you do?</legend>
        <div className="flex flex-col gap-2.5">
          {event.options.map((o) => (
            <label
              key={o.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors duration-150 ${
                optionId === o.id ? "border-emerald-500/70 bg-emerald-950/30 text-white" : "border-neutral-800 text-neutral-300 hover:border-neutral-700"
              }`}
            >
              <input
                type="radio"
                name="option"
                value={o.id}
                checked={optionId === o.id}
                onChange={() => setOptionId(o.id)}
                className="mt-0.5 accent-emerald-400"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-neutral-200">Why? What are you trading off?</span>
        <textarea
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          maxLength={MAX_WHY_CHARS}
          rows={3}
          placeholder="What risk you're taking, what it costs, what you gave up…"
          className="w-full resize-y rounded-xl border border-neutral-800 bg-black px-3.5 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-emerald-500/70 focus:outline-none"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium text-neutral-200">How sure are you this is the best call?</legend>
        <div className="grid grid-cols-3 gap-2">
          {CONFIDENCE_LEVELS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setConfidence(c.value)}
              aria-pressed={confidence === c.value}
              className={`rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors duration-150 sm:text-sm ${
                confidence === c.value ? "border-emerald-500/70 bg-emerald-950/30 text-white" : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              {c.label} <span className="text-neutral-500">{c.value}%</span>
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!ready || isBusy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition-colors duration-150 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        {isBusy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {isBusy ? (isLast ? "A senior is reviewing your decisions…" : "Moving time forward…") : isLast ? "Decide and see the debrief" : "Decide"}
      </button>
    </form>
  );
};

export default DecisionCard;
