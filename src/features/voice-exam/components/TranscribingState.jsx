import { useEffect, useState } from "react";
import { Check } from "lucide-react";

// How long each step usually takes, measured roughly: upload and Whisper are under a
// second each, grading a few seconds. The request is one call, so the steps move on by
// time; 2.5 s per step was slower than the real answer, so only the first step ever showed.
// The last step never shows as done: it stays active until the answer is back.
const STEP_MS = {
  "Uploading your recording": 600,
  "Turning your speech into text": 900,
  "Saving your answer": 400,
};
const DEFAULT_STEP_MS = 1800;

const stepsFor = (sending, isLast) => {
  const check = isLast
    ? "Grading your whole exam"
    : "Checking what you covered";
  const next = isLast
    ? "Putting your result together"
    : "Picking your next question";
  if (sending === "audio")
    return [
      "Uploading your recording",
      "Turning your speech into text",
      check,
      next,
    ];
  if (sending === "text") return ["Saving your answer", check, next];
  return ["One moment"];
};

/**
 * Waiting state between turns. No evaluative wording on purpose:
 * the examiner never signals whether an answer was good or bad.
 *
 * @param {{ sending: "audio"|"text"|null, isLast: boolean }} props
 */
const TranscribingState = ({ sending, isLast }) => {
  const steps = stepsFor(sending, isLast);
  const [active, setActive] = useState(0);
  const stepsKey = steps.join("|"); // stable across renders, unlike the array itself

  useEffect(() => {
    if (active >= steps.length - 1) return undefined;
    const ms = STEP_MS[stepsKey.split("|")[active]] ?? DEFAULT_STEP_MS;
    const id = setTimeout(() => setActive((a) => a + 1), ms);
    return () => clearTimeout(id);
  }, [active, steps.length, stepsKey]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-neutral-800 bg-neutral-950 px-5 py-10 sm:px-8 sm:py-12"
    >
      <div className="mx-auto max-w-sm">
        <div className="mb-8 flex justify-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2.5 rounded-full bg-emerald-400 motion-safe:animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        <ol className="space-y-4">
          {steps.map((label, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    done
                      ? "border-emerald-400 bg-emerald-400 text-neutral-950"
                      : current
                        ? "border-emerald-400"
                        : "border-neutral-800"
                  }`}
                >
                  {done ? (
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  ) : current ? (
                    <span className="size-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  ) : null}
                </span>
                <span
                  className={`text-[15px] ${done ? "text-neutral-400" : current ? "text-neutral-50" : "text-neutral-600"}`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Usually under 15 seconds. Stay on this page.
        </p>
      </div>
    </div>
  );
};

export default TranscribingState;
