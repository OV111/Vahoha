import { useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import useMentorStore from "@/stores/useMentorStore";
import { rateMessage } from "@/services/mentorApi";
import { MESSAGE_FEEDBACK_COPY as COPY } from "../../../../constants/mentor";

/** Action row under an agent response: Copy, and 👍/👎 once the answer is saved. */
function ActionButton({ icon, label, onClick, active, pressed }) {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      className="w-9 h-9 md:w-7 md:h-7 relative max-md:after:absolute max-md:after:-inset-1 rounded-md flex items-center justify-center transition-colors text-white/60 hover:text-white hover:bg-white/8 cursor-pointer"
    >
      <Icon
        size={15}
        strokeWidth={1.5}
        className={active ? "text-purple-400" : undefined}
        fill={pressed ? "currentColor" : "none"}
      />
    </button>
  );
}

function Feedback({ messageId, feedback }) {
  // After a 👎: the optional reason chips, then a short thank-you once one is picked.
  const [step, setStep] = useState(null);

  const save = async (next) => {
    const sessionId = useMentorStore.getState().activeSessionId;
    if (!sessionId) return;
    const { setMessageFeedback } = useMentorStore.getState();
    // Optimistic: the button reacts at once and goes back if the save fails.
    setMessageFeedback(messageId, next);
    try {
      await rateMessage(sessionId, messageId, { vote: next?.vote ?? null, reason: next?.reason ?? null });
    } catch {
      setMessageFeedback(messageId, feedback);
      setStep(null);
    }
  };

  const vote = (v) => {
    // Clicking the active vote again clears it.
    if (feedback?.vote === v) {
      setStep(null);
      return save(null);
    }
    setStep(v === "down" ? "reason" : null);
    return save({ vote: v });
  };

  const pickReason = (reason) => {
    setStep("thanks");
    save({ vote: "down", reason });
  };

  return (
    <>
      <ActionButton
        icon={ThumbsUp}
        label={COPY.up}
        onClick={() => vote("up")}
        active={feedback?.vote === "up"}
        pressed={feedback?.vote === "up"}
      />
      <ActionButton
        icon={ThumbsDown}
        label={COPY.down}
        onClick={() => vote("down")}
        active={feedback?.vote === "down"}
        pressed={feedback?.vote === "down"}
      />
      {step === "reason" && feedback?.vote === "down" && (
        <div className="basis-full flex flex-wrap items-center gap-1.5 mt-1.5 pl-1.5" role="group" aria-label={COPY.question}>
          <span className="text-[12px] text-white/50 mr-1">{COPY.question}</span>
          {COPY.reasons.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => pickReason(r.id)}
              className="rounded-full border border-white/12 px-2.5 py-1 text-[12px] text-white/70 transition-colors hover:border-purple-500/60 hover:text-white cursor-pointer"
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
      {step === "thanks" && (
        <p className="basis-full mt-1.5 pl-1.5 text-[12px] text-white/50" role="status">
          {COPY.thanks}
        </p>
      )}
    </>
  );
}

export default function MessageActions({ content, messageId, feedback }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable (insecure context) — fail silently */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 mt-1 -ml-1.5">
      <ActionButton
        icon={copied ? Check : Copy}
        label={copied ? "Copied" : "Copy"}
        onClick={copy}
        active={copied}
      />
      {/* Answers saved before ids existed, or stopped mid-stream, can't be rated. */}
      {messageId && <Feedback messageId={messageId} feedback={feedback} />}
    </div>
  );
}
