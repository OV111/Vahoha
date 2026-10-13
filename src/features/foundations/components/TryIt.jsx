import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

const TYPE_LABELS = {
  build: "Build",
  "break-fix": "Break & fix",
  observe: "Observe",
  predict: "Predict",
  trace: "Trace",
};

function CopyButton({ text }) {
  const [status, setStatus] = useState("idle"); // idle | copied | failed

  // Drop the "Copied" label after a moment; the cleanup stops a stale timer
  // from updating an unmounted button.
  useEffect(() => {
    if (status === "idle") return;
    const id = setTimeout(() => setStatus("idle"), 1600);
    return () => clearTimeout(id);
  }, [status]);

  const copy = () =>
    // The Clipboard API needs a secure context (https or localhost) and can be
    // denied, so a failure is shown rather than silently ignored.
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus("copied"))
      .catch(() => setStatus("failed"));

  return (
    <button type="button" className="f-copy" onClick={copy}>
      {status === "copied" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"}
      </span>
    </button>
  );
}

// Guess first, then reveal: picking an option locks the guess and shows why.
function Predict({ predict }) {
  const [guess, setGuess] = useState(null);
  const revealed = guess !== null;

  return (
    <div className="f-predict">
      <p className="f-predict-label">Your guess</p>
      <div className="f-predict-options" role="group" aria-label="Your guess">
        {predict.options.map((option) => {
          const state = !revealed
            ? ""
            : option === predict.answer
              ? "is-answer"
              : option === guess
                ? "is-wrong"
                : "";
          return (
            <button
              key={option}
              type="button"
              className={`f-predict-option ${state}`}
              aria-pressed={guess === option}
              disabled={revealed}
              onClick={() => setGuess(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
      {revealed && (
        <p className="f-predict-why">
          <b>{guess === predict.answer ? "Right." : `It's "${predict.answer}".`}</b> {predict.why}
        </p>
      )}
    </div>
  );
}

function TryItItem({ item, index }) {
  return (
    <li className="f-try">
      <p className="f-try-head">
        <span className="f-check-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="f-try-type">{TYPE_LABELS[item.type]}</span>
      </p>
      <h3 className="f-try-title">{item.title}</h3>

      <ol className="f-try-steps">
        {item.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      {item.command && (
        <div className="f-code">
          <pre>
            <code>{item.command}</code>
          </pre>
          <CopyButton text={item.command} />
        </div>
      )}

      {item.windows && (
        <p className="f-try-note">
          <b>Windows</b> {item.windows}
        </p>
      )}

      {item.predict && <Predict predict={item.predict} />}

      {item.expect && (
        <p className="f-try-note">
          <b>What you should see</b> {item.expect}
        </p>
      )}
    </li>
  );
}

export function TryItList({ items, topicSlug }) {
  return (
    <ol className="f-tries">
      {items.map((item, i) => (
        // Keyed by topic so a guess on one lesson doesn't carry into the next.
        <TryItItem key={`${topicSlug}-${i}`} item={item} index={i} />
      ))}
    </ol>
  );
}

export function ExplainBack({ explainBack }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="f-explain">
      <p className="f-explain-prompt">{explainBack.prompt}</p>
      <p className="f-hint">Say it out loud or write it down before you look.</p>
      {open ? (
        <p className="f-check-a f-explain-answer">
          <b>Model answer</b> {explainBack.modelAnswer}
        </p>
      ) : (
        <button type="button" className="f-check-reveal" onClick={() => setOpen(true)}>
          Show model answer
        </button>
      )}
    </div>
  );
}
