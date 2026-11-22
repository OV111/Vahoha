import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Info, Loader2, X } from "lucide-react";
import JobChoice from "./JobChoice";
import { sendIntro } from "../../api/hiringApi";
import { INTRO_MESSAGE, INTRO_REQUEST_COPY as COPY } from "../../../../../constants/hiring";

// Modal form: pick an open job, write the message, send. Escape and a backdrop
// click close it, as with ConfirmDialog.
const IntroRequestDialog = ({ username, name, jobs, onClose, onSent }) => {
  const [jobId, setJobId] = useState(jobs.length === 1 ? jobs[0].id : null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const length = message.trim().length;
  const short = INTRO_MESSAGE.min - length;
  const ready = jobId && short <= 0 && length <= INTRO_MESSAGE.max;

  const submit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setBusy(true);
    try {
      const intro = await sendIntro({ username, jobId, message: message.trim() });
      toast.success(COPY.sent);
      onSent(intro);
    } catch (err) {
      toast.error(err.message);
      // 409: someone on the team already asked; the panel reloads to show it.
      if (err.status === 409) onSent(null);
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4" onClick={() => !busy && onClose()}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-t-2xl border border-white/10 bg-[#111113] p-5 sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="intro-title" className="text-base font-semibold text-white">{COPY.title(name)}</h2>
            <p className="mt-1 text-sm text-neutral-400">{COPY.hint}</p>
          </div>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Close"
            className="rounded-md p-1 text-neutral-400 hover:bg-white/5 hover:text-white disabled:opacity-50">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-[13px] text-neutral-400">{COPY.jobLabel}</legend>
          <JobChoice jobs={jobs} value={jobId} onChange={setJobId} />
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor="intro-message" className="text-[13px] text-neutral-400">{COPY.messageLabel}</label>
          <textarea
            id="intro-message"
            rows={5}
            maxLength={INTRO_MESSAGE.max}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={COPY.placeholder}
            className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <div className="flex justify-between text-xs tabular-nums">
            <span className="text-neutral-500">{short > 0 ? COPY.tooShort(short) : ""}</span>
            <span className="text-neutral-600">{message.length}/{INTRO_MESSAGE.max}</span>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[13px] text-neutral-400">
          <Info size={14} className="mt-0.5 shrink-0 text-purple-400" aria-hidden="true" />
          {COPY.preview}
        </p>

        <button type="submit" disabled={!ready || busy}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40">
          {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
          {COPY.send}
        </button>
      </form>
    </div>
  );
};

export default IntroRequestDialog;
