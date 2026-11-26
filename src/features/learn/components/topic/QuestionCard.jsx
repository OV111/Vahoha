import { useState } from "react";
import { Check, CircleHelp, X } from "lucide-react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";

const KIND_LABEL = { choice: "Check yourself", predict: "What does it print?", "find-bug": "Find AI's mistake" };

const optionTone = {
  open: "cursor-pointer border-(--lesson-line) hover:border-purple-500",
  picked: "cursor-pointer border-purple-500 bg-purple-500/15",
  right: "border-emerald-500/70 bg-emerald-500/10",
  wrong: "border-amber-400/70 bg-amber-400/10",
  muted: "border-(--lesson-line) text-neutral-400",
};

const confidenceButton =
  "min-h-11 rounded-lg px-5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 enabled:cursor-pointer";

function Feedback({ question, answer, misconceptions }) {
  const right = answer.optionId === question.answerId;
  const wrongIdea = misconceptions.find(
    (m) => m.id === question.options.find((o) => o.id === answer.optionId)?.misconceptionId,
  );
  return (
    <div className={`mt-5 rounded-lg p-5 text-sm leading-relaxed ${right ? "bg-emerald-500/10" : "bg-amber-400/10"}`}>
      <p className={`font-semibold ${right ? "text-emerald-300" : "text-amber-200"}`}>
        {right ? "Right." : answer.confidence === "sure" ? "Not quite, and you were sure. Worth a second look." : "Not quite."}
      </p>
      {!right && wrongIdea && (
        <p className="mt-2 text-neutral-100">
          You may think {wrongIdea.belief}. {wrongIdea.correction}
        </p>
      )}
      <p className="mt-2 text-neutral-200">{question.why}</p>
    </div>
  );
}

/** Pick an option, then say how sure you are: that second click is what submits. */
export default function QuestionCard({ question, answer, misconceptions, onAnswer }) {
  const [picked, setPicked] = useState(null);

  const toneOf = (id) => {
    if (!answer) return picked === id ? "picked" : "open";
    if (id === question.answerId) return "right";
    return id === answer.optionId ? "wrong" : "muted";
  };

  return (
    <div className="my-7 rounded-2xl bg-(--lesson-raised) p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[13px] font-medium text-purple-200">
        <CircleHelp size={17} aria-hidden="true" /> {KIND_LABEL[question.kind]}
      </p>
      <MarkdownMessage content={question.prompt} className="mt-3 text-base font-medium leading-snug text-white" />
      {question.code && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-(--lesson-code) p-4 font-mono text-[13px] leading-relaxed text-neutral-100">
          {question.code}
        </pre>
      )}

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {question.options.map((option) => {
          const tone = toneOf(option.id);
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={Boolean(answer)}
                aria-pressed={(answer?.optionId ?? picked) === option.id}
                onClick={() => setPicked(option.id)}
                className={`flex h-full min-h-12 w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm leading-snug text-neutral-100 transition-colors ${optionTone[tone]}`}
              >
                {option.text}
                {tone === "right" && <Check size={17} className="shrink-0 text-emerald-300" aria-label="Right answer" />}
                {tone === "wrong" && <X size={17} className="shrink-0 text-amber-300" aria-label="Your answer" />}
              </button>
            </li>
          );
        })}
      </ul>

      {!answer && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-[13px] text-neutral-300">How sure are you?</span>
          <button
            type="button"
            disabled={!picked}
            onClick={() => onAnswer(picked, "unsure")}
            className={`${confidenceButton} bg-white/10 text-white enabled:hover:bg-white/15`}
          >
            Not sure
          </button>
          <button
            type="button"
            disabled={!picked}
            onClick={() => onAnswer(picked, "sure")}
            className={`${confidenceButton} bg-purple-600 text-white enabled:hover:bg-purple-500`}
          >
            Sure
          </button>
        </div>
      )}
      <div role="status">{answer && <Feedback question={question} answer={answer} misconceptions={misconceptions} />}</div>
    </div>
  );
}
