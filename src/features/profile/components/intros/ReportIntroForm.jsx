import { useState } from "react";
import { Loader2 } from "lucide-react";
import OptionCards from "@/features/hiring/components/OptionCards";
import { INBOX_COPY as COPY, REPORT_DETAILS_MAX, REPORT_REASONS } from "@/constants/hiring";

// Shown inside the intro card, so the developer keeps the request in view
// while saying what's wrong with it.
const ReportIntroForm = ({ introId, onSubmit, onCancel }) => {
  const [reason, setReason] = useState(null);
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!reason) return;
    setBusy(true);
    try {
      await onSubmit({ reason, details: details.trim() || undefined });
    } finally {
      setBusy(false);
    }
  };

  const detailsId = `report-details-${introId}`;

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
      <p className="text-sm font-medium text-white">{COPY.reportTitle}</p>
      <OptionCards name={`report-${introId}`} options={REPORT_REASONS} value={reason} onChange={setReason} sideBySide />
      <label htmlFor={detailsId} className="text-[13px] text-neutral-400">{COPY.reportDetails}</label>
      <textarea
        id={detailsId}
        rows={3}
        maxLength={REPORT_DETAILS_MAX}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} disabled={busy}
          className="rounded-md px-3 py-1.5 text-sm text-neutral-300 hover:bg-white/5 disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={!reason || busy}
          className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40">
          {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
          {COPY.reportSend}
        </button>
      </div>
    </form>
  );
};

export default ReportIntroForm;
