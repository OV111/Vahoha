import { Fragment } from "react";
import { motion as Motion, MotionConfig } from "motion/react";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

// Numbered circles joined by lines. Done steps show a check, the current one a
// ring; the line between two steps fills as you pass it. `steps` are labels,
// `current` is an index into them.
const JoinStepper = ({ steps, current }) => (
  <MotionConfig reducedMotion="user">
    <ol className="mb-8 flex items-start" aria-label={`Step ${current + 1} of ${steps.length}`}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={label}>
            <li className="flex w-14 shrink-0 flex-col items-center gap-2" aria-current={active ? "step" : undefined}>
              <Motion.span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors duration-300 ${
                  done
                    ? "border-purple-500 bg-purple-500 text-white"
                    : active
                      ? "border-purple-500 bg-purple-500/15 text-purple-200"
                      : "border-neutral-700 bg-neutral-900 text-neutral-500"
                }`}
                animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : i + 1}
              </Motion.span>
              <span className={`text-center text-[11px] leading-tight sm:text-xs ${active ? "text-white" : done ? "text-purple-300" : "text-neutral-500"}`}>
                {label}
              </span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="relative mt-4 h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                <Motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-purple-500"
                  initial={false}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  </MotionConfig>
);

export default JoinStepper;
