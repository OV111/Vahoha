import useMentorStore from "@/stores/useMentorStore";
import { CONTEXT_METER } from "../../../../constants/mentor";
import { fullTokens, isCount } from "../lib/formatTokens";

const TONES = {
  ok: { bar: "bg-white/45", text: "text-white/45" },
  warn: { bar: "bg-amber-400", text: "text-amber-300/90" },
  full: { bar: "bg-red-400", text: "text-red-300/90" },
};

const toneFor = (percent) =>
  percent >= CONTEXT_METER.redAt ? TONES.full : percent >= CONTEXT_METER.amberAt ? TONES.warn : TONES.ok;

/**
 * How full the model's context window was on the last reply.
 *
 * Reads `lastUsage` from the store (set by the `usage` stream event), so it
 * stays empty until a reply has finished and while the server is too old to
 * send the window size. Nothing is guessed: no numbers, no meter.
 */
export default function ContextMeter() {
  const usage = useMentorStore((s) => s.lastUsage);

  if (!usage || !isCount(usage.promptTokens) || !isCount(usage.contextWindowTokens)) return null;
  if (usage.contextWindowTokens <= 0) return null;

  const percent = Math.min(100, Math.round((usage.promptTokens / usage.contextWindowTokens) * 100));
  const tone = toneFor(percent);
  const trimmed = isCount(usage.trimmedMessages) && usage.trimmedMessages > 0;
  const description = CONTEXT_METER.describe(
    fullTokens(usage.promptTokens),
    fullTokens(usage.contextWindowTokens),
  );

  return (
    <div
      className="flex items-center gap-2 min-w-0 shrink-0"
      title={trimmed ? `${description}. ${CONTEXT_METER.trimmedHint}.` : description}
    >
      <div
        role="meter"
        aria-label={CONTEXT_METER.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}%. ${description}`}
        className="h-1 w-14 sm:w-20 overflow-hidden rounded-full bg-white/10"
      >
        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${percent}%` }} />
      </div>
      <span className={`hidden sm:inline text-[11px] tabular-nums ${tone.text}`}>
        {CONTEXT_METER.label} {percent}%
      </span>
      {trimmed && (
        <span className="hidden lg:inline text-[11px] text-amber-300/80">
          {CONTEXT_METER.trimmedHint}
        </span>
      )}
    </div>
  );
}
