import { useState } from "react";
import { Mic, ShieldCheck, Clock, AlertTriangle } from "lucide-react";

/**
 * Before the attempt exists: what to expect, consent, microphone check.
 * The consent checkbox gates the start button. Persisting consent is the
 * backend's job (voice_exam_consents) and is not wired yet.
 *
 * @param {{ eligibility: import("../lib/examStates").Eligibility|null, isBusy: boolean, onBegin: () => void }} props
 */
const PreExam = ({ eligibility, isBusy, onBegin }) => {
  const [consented, setConsented] = useState(false);
  const [micStatus, setMicStatus] = useState("idle"); // idle | testing | ok | denied

  const testMic = async () => {
    setMicStatus("testing");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // permission check only, release immediately
      setMicStatus("ok");
    } catch {
      setMicStatus("denied");
    }
  };

  const blocked = eligibility && !eligibility.eligible;

  return (
    <div className="bg-white dark:bg-neutral-800/60 dark:backdrop-blur-sm rounded-xl px-8 py-8">
      <h2 className="text-[17px] font-semibold text-[#1a1f36] dark:text-white mb-4">Before you start</h2>

      <ul className="space-y-3 text-[14px] text-[#1a1f36] dark:text-zinc-200 mb-6">
        <li className="flex gap-3">
          <Clock size={16} className="mt-1 shrink-0 text-[#697386]" />
          You explain the layer in up to 5 minutes, then answer a few follow-up questions, one at a time. The clock does not pause.
        </li>
        <li className="flex gap-3">
          <Mic size={16} className="mt-1 shrink-0 text-[#697386]" />
          You are graded on what you say, not on accent, pace or confidence.
        </li>
        <li className="flex gap-3">
          <ShieldCheck size={16} className="mt-1 shrink-0 text-[#697386]" />
          Your audio is deleted after grading. The transcript is kept for regrade requests.
        </li>
      </ul>

      {blocked && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm px-4 py-3 mb-5">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <div>
            {eligibility.reasons.map((reason) => (
              <p key={reason}>{reason}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={testMic}
          disabled={micStatus === "testing"}
          className="min-h-[44px] rounded-full border border-neutral-300 dark:border-neutral-600 text-[#1a1f36] dark:text-zinc-200 px-4 text-sm"
        >
          {micStatus === "testing" ? "Checking…" : "Test microphone"}
        </button>
        {micStatus === "ok" && <span className="text-sm text-green-600">Microphone works</span>}
        {micStatus === "denied" && (
          <span className="text-sm text-red-600">No access. You can type your answers instead.</span>
        )}
      </div>

      <label className="flex items-start gap-3 text-[14px] text-[#1a1f36] dark:text-zinc-200 mb-6 min-h-[44px]">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-1"
        />
        I agree to my voice being recorded and transcribed for this exam.
      </label>

      <button
        type="button"
        onClick={onBegin}
        disabled={!consented || blocked || isBusy}
        className="min-h-[44px] rounded-full bg-[#1a1f36] dark:bg-white text-white dark:text-[#1a1f36] px-6 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isBusy ? "Starting…" : "Begin exam"}
      </button>
    </div>
  );
};

export default PreExam;
