import { useEffect, useState } from "react";
import {
  Mic,
  Square,
  AlertTriangle,
  RotateCcw,
  Keyboard,
  Clock,
} from "lucide-react";
import { useRecorder } from "../hooks/useRecorder";
import { useMicLevel } from "../hooks/useMicLevel";
import useCountdown from "@/hooks/useCountdown";
import { formatClock } from "../lib/formatClock";

const RING = 2 * Math.PI * 58; // circumference of the progress ring around the mic button
const LOW_TIME_SEC = 120;

function ProgressDots({ n, total }) {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 < n
              ? "w-1.5 bg-emerald-400"
              : i + 1 === n
                ? "w-5 bg-emerald-400"
                : "w-1.5 bg-neutral-700"
          }`}
        />
      ))}
    </span>
  );
}

function Wave({ levels, active }) {
  return (
    <div
      className="flex h-10 w-full max-w-xs items-center gap-[3px]"
      aria-hidden="true"
    >
      {levels.map((level, i) => (
        <span
          key={i}
          className={`w-full rounded-full transition-[height] duration-75 ${active ? "bg-emerald-400" : "bg-neutral-800"}`}
          style={{ height: `${Math.max(8, level * 100)}%` }}
        />
      ))}
    </div>
  );
}

/**
 * The core screen: one question, one big record button, countdowns.
 * Graded mode deliberately shows no live transcript (it invites self-editing).
 * Typed fallback has paste disabled so an LLM answer cannot be dropped in.
 *
 * @param {{
 *   attempt: import("../lib/examStates").AttemptView,
 *   isBusy: boolean,
 *   unsent: { text?: string, audio?: Blob } | null,   an answer the server never confirmed
 *   onResend: () => void,
 *   onDiscardUnsent: () => void,
 *   onSubmitAudio: (blob: Blob) => void,
 *   onSubmitText: (text: string) => void,
 *   onAbandon: () => void,
 * }} props
 */
const RecordingPanel = ({
  attempt,
  isBusy,
  unsent,
  onResend,
  onDiscardUnsent,
  onSubmitAudio,
  onSubmitText,
  onAbandon,
}) => {
  const { currentPrompt, segmentLimitSec, secondsLeft } = attempt;
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [confirmLeave, setConfirmLeave] = useState(false);

  const recorder = useRecorder({
    maxSec: segmentLimitSec,
    onStop: onSubmitAudio,
  });
  const mic = useMicLevel();
  // Keyed on the prompt: every server answer restarts the clock from its fresh
  // secondsLeft, even if two answers happen to carry the same number.
  const overallLeft = useCountdown(secondsLeft, currentPrompt.n);
  const segmentLeft = Math.max(0, segmentLimitSec - recorder.elapsedSec);
  const lowTime = overallLeft <= LOW_TIME_SEC;

  // The wave follows the recorder: it also stops when the recorder hits its time limit on its own.
  const { isRecording } = recorder;
  const { status: micStatus, start: startMic, stop: stopMic } = mic;
  useEffect(() => {
    if (isRecording && micStatus === "idle") startMic();
    if (!isRecording && micStatus === "listening") stopMic();
  }, [isRecording, micStatus, startMic, stopMic]);

  const submitTyped = () => {
    if (text.trim()) onSubmitText(text.trim());
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="flex items-center gap-3 text-neutral-400">
          <ProgressDots n={currentPrompt.n} total={currentPrompt.total} />
          Question {currentPrompt.n} of {currentPrompt.total}
        </span>
        <span
          className={`flex items-center gap-1.5 tabular-nums ${lowTime ? "text-amber-300" : "text-neutral-400"}`}
          aria-label={`Exam time left ${formatClock(overallLeft)}`}
        >
          <Clock size={14} aria-hidden="true" />
          {formatClock(overallLeft)}
        </span>
      </div>

      {currentPrompt.kind === "followup" && (
        <p className="mt-6 text-sm font-medium text-emerald-300">Follow-up</p>
      )}
      <h2
        className={`max-w-prose text-xl font-medium leading-snug text-neutral-50 sm:text-2xl ${
          currentPrompt.kind === "followup" ? "mt-2" : "mt-6"
        }`}
      >
        {currentPrompt.text}
      </h2>

      {(recorder.error || mic.status === "denied") && !typing && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          {recorder.error ??
            "Microphone access was denied. You can type your answer instead."}
        </div>
      )}

      {unsent && !isBusy && (
        <div className="mt-6 rounded-xl border border-amber-800/60 bg-amber-950/30 p-4 text-sm text-amber-200">
          <p>
            Your {unsent.audio ? "recording" : "answer"} wasn&apos;t sent, but
            it&apos;s still saved here.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onResend}
              className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 font-semibold text-neutral-950 hover:bg-emerald-400"
            >
              <RotateCcw size={15} aria-hidden="true" /> Send again
            </button>
            <button
              type="button"
              onClick={onDiscardUnsent}
              className="min-h-11 underline"
            >
              Discard and answer again
            </button>
          </div>
        </div>
      )}

      {unsent ? null : !typing ? (
        <div className="mt-10 flex flex-col items-center">
          {/* The ring fills as this answer's time is used up. */}
          <div className="relative size-36">
            <svg
              viewBox="0 0 128 128"
              className="absolute inset-0 -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                strokeWidth="4"
                className="stroke-neutral-800"
              />
              {isRecording && (
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className={
                    segmentLeft <= 15
                      ? "stroke-amber-400"
                      : "stroke-emerald-400"
                  }
                  strokeDasharray={RING}
                  strokeDashoffset={RING * (segmentLeft / segmentLimitSec)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              )}
            </svg>
            <button
              type="button"
              onClick={isRecording ? recorder.stop : recorder.start}
              disabled={!recorder.isSupported || isBusy}
              aria-label={
                isRecording ? "Stop and submit your answer" : "Start answering"
              }
              className={`absolute inset-3 flex items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500 ${
                isRecording
                  ? "bg-rose-500 text-white hover:bg-rose-400"
                  : "bg-emerald-500 text-neutral-950 hover:bg-emerald-400"
              }`}
            >
              {isRecording ? (
                <Square size={30} fill="currentColor" aria-hidden="true" />
              ) : (
                <Mic size={36} aria-hidden="true" />
              )}
            </button>
          </div>

          <p
            className="mt-5 text-[15px] font-medium text-neutral-100"
            role="status"
          >
            {isRecording
              ? "Listening… tap to stop and submit"
              : "Tap to start answering"}
          </p>
          <p className="mt-1 text-sm tabular-nums text-neutral-500">
            {isRecording
              ? `${formatClock(segmentLeft)} left for this answer`
              : `Up to ${formatClock(segmentLimitSec)} for this answer`}
          </p>

          <div className="mt-5 flex w-full justify-center">
            <Wave levels={mic.levels} active={isRecording} />
          </div>

          {!isRecording && (
            <button
              type="button"
              onClick={() => setTyping(true)}
              className="mt-6 flex min-h-11 items-center gap-2 text-sm text-neutral-400 underline hover:text-neutral-200"
            >
              <Keyboard size={15} aria-hidden="true" /> Type your answer instead
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            rows={8}
            aria-label="Your answer"
            placeholder="Type your answer in your own words. Pasting is turned off."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-[15px] leading-relaxed text-neutral-100 placeholder:text-neutral-500 focus:border-emerald-500/60 focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={submitTyped}
              disabled={!text.trim() || isBusy}
              className="min-h-12 rounded-xl bg-emerald-500 px-6 font-semibold text-neutral-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              Submit answer
            </button>
            <button
              type="button"
              onClick={() => setTyping(false)}
              className="flex min-h-11 items-center gap-2 text-sm text-neutral-400 underline hover:text-neutral-200"
            >
              <Mic size={15} aria-hidden="true" /> Use the microphone
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 border-t border-neutral-900 pt-4 text-center text-sm">
        {/* Leaving counts as a try, so it asks once instead of ending on a stray tap. */}
        {confirmLeave ? (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-neutral-400">
            <span>Leave the exam? It counts as one of today&apos;s tries.</span>
            <button
              type="button"
              onClick={onAbandon}
              className="min-h-11 font-medium text-rose-300 underline"
            >
              Leave exam
            </button>
            <button
              type="button"
              onClick={() => setConfirmLeave(false)}
              className="min-h-11 text-neutral-200 underline"
            >
              Keep going
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmLeave(true)}
            disabled={isRecording}
            className="min-h-11 text-neutral-500 underline hover:text-neutral-300 disabled:opacity-40"
          >
            Leave exam
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordingPanel;
