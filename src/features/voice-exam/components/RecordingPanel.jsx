import { useState } from "react";
import { Mic, Square, AlertTriangle } from "lucide-react";
import { useRecorder } from "../hooks/useRecorder";
import useCountdown from "@/hooks/useCountdown";
import { formatClock } from "../lib/formatClock";

/**
 * The core screen: one question, one big record button, countdowns.
 * Graded mode deliberately shows no live transcript (it invites self-editing).
 * Typed fallback has paste disabled so an LLM answer cannot be dropped in.
 *
 * @param {{
 *   attempt: import("../lib/examStates").AttemptView,
 *   isBusy: boolean,
 *   onSubmitAudio: (blob: Blob) => void,
 *   onSubmitText: (text: string) => void,
 *   onAbandon: () => void,
 * }} props
 */
const RecordingPanel = ({ attempt, isBusy, onSubmitAudio, onSubmitText, onAbandon }) => {
  const { currentPrompt, segmentLimitSec, secondsLeft } = attempt;
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");

  const recorder = useRecorder({ maxSec: segmentLimitSec, onStop: onSubmitAudio });
  // Keyed on the prompt: every server answer restarts the clock from its fresh
  // secondsLeft, even if two answers happen to carry the same number.
  const overallLeft = useCountdown(secondsLeft, currentPrompt.n);
  const segmentLeft = Math.max(0, segmentLimitSec - recorder.elapsedSec);

  const submitTyped = () => {
    if (text.trim()) onSubmitText(text.trim());
  };

  return (
    <div className="bg-white dark:bg-neutral-800/60 dark:backdrop-blur-sm rounded-xl px-8 py-8">
      <div className="flex items-center justify-between text-[12.5px] text-[#697386] dark:text-zinc-400 mb-4">
        <span>
          Question {currentPrompt.n} of {currentPrompt.total}
        </span>
        <span>Exam time left {formatClock(overallLeft)}</span>
      </div>

      <p className="text-[18px] leading-relaxed font-medium text-[#1a1f36] dark:text-white mb-8">
        {currentPrompt.text}
      </p>

      {recorder.error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm px-4 py-3 mb-5">
          <AlertTriangle size={16} className="shrink-0" />
          {recorder.error}
        </div>
      )}

      {!typing ? (
        <div className="flex flex-col items-center gap-3">
          {!recorder.isRecording ? (
            <button
              type="button"
              onClick={recorder.start}
              disabled={!recorder.isSupported || isBusy}
              className="min-h-[44px] flex items-center gap-2 rounded-full bg-[#1a1f36] dark:bg-white text-white dark:text-[#1a1f36] px-7 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Mic size={16} />
              Start answering
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={recorder.stop}
                className="min-h-[44px] flex items-center gap-2 rounded-full bg-red-600 text-white px-7 text-sm font-medium animate-pulse"
              >
                <Square size={16} />
                Stop and submit
              </button>
              <span className="text-[13px] text-[#697386] dark:text-zinc-400">
                {formatClock(segmentLeft)} left for this answer
              </span>
            </>
          )}

          {!recorder.isRecording && (
            <button
              type="button"
              onClick={() => setTyping(true)}
              className="min-h-[44px] text-[13px] text-[#697386] dark:text-zinc-400 underline"
            >
              Type your answer instead
            </button>
          )}
        </div>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            rows={8}
            placeholder="Type your answer. Pasting is disabled."
            className="w-full rounded-lg bg-neutral-50 dark:bg-neutral-900/60 px-4 py-3 text-[14px] text-[#1a1f36] dark:text-zinc-200 mb-4"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={submitTyped}
              disabled={!text.trim() || isBusy}
              className="min-h-[44px] rounded-full bg-[#1a1f36] dark:bg-white text-white dark:text-[#1a1f36] px-6 text-sm font-medium disabled:opacity-40"
            >
              Submit answer
            </button>
            <button
              type="button"
              onClick={() => setTyping(false)}
              className="min-h-[44px] text-[13px] text-[#697386] dark:text-zinc-400 underline"
            >
              Use microphone
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onAbandon}
          className="min-h-[44px] text-[12.5px] text-neutral-400 underline"
        >
          Abandon exam
        </button>
      </div>
    </div>
  );
};

export default RecordingPanel;
