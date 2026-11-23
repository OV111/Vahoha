import { useRef } from "react";
import { motion as Motion, MotionConfig } from "motion/react";

/**
 * One box per digit, like Apple's verification screens: typing moves to the
 * next box, Backspace goes back, arrows move, and pasting (or the phone's
 * "from Messages/Mail" suggestion) fills every box at once. `onComplete` fires
 * when the last digit lands, so the user never has to press a button.
 */
const CodeInput = ({ length = 6, value, onChange, onComplete, error = false, disabled = false }) => {
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focus = (i) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  const commit = (next) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    onChange(clean);
    if (clean.length === length) onComplete?.(clean);
    return clean;
  };

  // From any text (a whole log line, an email body), take the code itself: the
  // last run of exactly `length` digits, else all digits. Taking every digit
  // would mix in numbers from the address ("recruiter1@...") and break the code.
  const extractCode = (text) => {
    const runs = (String(text).match(/\d+/g) ?? []).filter((run) => run.length === length);
    return runs.length ? runs.at(-1) : String(text).replace(/\D/g, "");
  };

  const handleChange = (i, raw) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;
    // A full code at once: phone autofill, or a paste that skipped onPaste.
    if (typed.length >= length) {
      const filled = commit(extractCode(raw));
      return focus(filled.length);
    }
    // Typing into a box that already held a digit: keep only the new keystroke.
    const digit = typed.length > 1 ? typed.replace(digits[i], "").slice(-1) || typed.slice(-1) : typed;
    const next = (value.slice(0, i) + digit + value.slice(i + 1)).slice(0, length);
    commit(next);
    focus(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) commit(value.slice(0, i) + value.slice(i + 1));
      else if (i > 0) {
        commit(value.slice(0, i - 1) + value.slice(i));
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft") focus(i - 1);
    else if (e.key === "ArrowRight") focus(i + 1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const filled = commit(extractCode(e.clipboardData.getData("text")));
    focus(filled.length);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Motion.div
        role="group"
        aria-label="Verification code"
        className="flex justify-center gap-2 sm:gap-3"
        animate={error ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            maxLength={length}
            value={d}
            disabled={disabled}
            autoFocus={i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`h-14 w-11 rounded-xl border text-center text-2xl font-semibold text-white tabular-nums caret-purple-400 transition-[border-color,background-color,box-shadow] duration-150 outline-none sm:h-16 sm:w-13 ${
              error
                ? "border-red-500/70 bg-red-500/[0.06]"
                : d
                  ? "border-purple-500/60 bg-purple-500/[0.08]"
                  : "border-white/10 bg-white/[0.04]"
            } focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 disabled:opacity-50`}
          />
        ))}
      </Motion.div>
    </MotionConfig>
  );
};

export default CodeInput;
