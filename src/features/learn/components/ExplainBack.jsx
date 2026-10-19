import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";

// Short enough not to nag, long enough that "idk" can't unlock the answer.
const MIN_EXPLAIN_CHARS = 40;

/**
 * Write first, then compare. The learner explains in their own words before
 * the model answer appears, then ticks which key ideas they covered.
 * Controlled by the player so the text survives Back and Continue.
 * AI feedback against `mustMention` replaces the self-check in a later stage.
 */
export default function ExplainBack({ step, value, onChange }) {
  const ready = value.text.trim().length >= MIN_EXPLAIN_CHARS;
  const set = (patch) => onChange({ ...value, ...patch });

  const toggle = (idea) =>
    set({ covered: value.covered.includes(idea) ? value.covered.filter((c) => c !== idea) : [...value.covered, idea] });

  return (
    <div>
      <MarkdownMessage content={step.prompt} className="text-[19px] font-medium leading-snug text-neutral-50" />
      <p className="mt-2 text-sm text-neutral-500">Putting it in your own words is what makes it stick.</p>

      <label htmlFor="explain-back" className="sr-only">
        Your explanation
      </label>
      <textarea
        id="explain-back"
        value={value.text}
        onChange={(e) => set({ text: e.target.value })}
        readOnly={value.revealed}
        rows={6}
        placeholder="Explain it as if to a friend who has never seen it."
        className="mt-5 w-full resize-y rounded-xl border border-neutral-700 bg-neutral-950 p-4 text-[15px] leading-relaxed text-neutral-100 placeholder:text-neutral-600 focus:border-purple-500 focus:outline-none"
      />

      {!value.revealed ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">
            {ready ? "Done? Compare it." : `${Math.max(0, MIN_EXPLAIN_CHARS - value.text.trim().length)} more characters`}
          </p>
          <button
            type="button"
            disabled={!ready}
            onClick={() => set({ revealed: true })}
            className="inline-flex min-h-11 items-center rounded-xl border border-purple-500/60 px-4 text-sm font-medium text-purple-200 transition-colors enabled:cursor-pointer enabled:hover:bg-purple-600/20 disabled:opacity-40"
          >
            Compare with the model answer
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl bg-neutral-900/70 p-4">
            <p className="text-sm font-medium text-neutral-400">Model answer</p>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-200">{step.modelAnswer}</p>
          </div>
          <fieldset>
            <legend className="text-[15px] text-neutral-200">
              Which of these did yours cover? {value.covered.length} of {step.mustMention.length}
            </legend>
            <ul className="mt-2">
              {step.mustMention.map((idea) => (
                <li key={idea}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-neutral-300">
                    <input
                      type="checkbox"
                      checked={value.covered.includes(idea)}
                      onChange={() => toggle(idea)}
                      className="size-4 accent-purple-500"
                    />
                    {idea}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      )}
    </div>
  );
}
