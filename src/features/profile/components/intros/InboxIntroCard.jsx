import { useState } from "react";
import { Ban, Flag, Globe, Loader2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import IntroStatusPill from "@/features/hiring/components/intros/IntroStatusPill";
import CopyEmail from "@/features/hiring/components/intros/CopyEmail";
import { expiresText, shortDate } from "@/features/hiring/lib/intros";
import TrustBadge from "./TrustBadge";
import IntroJobDetails from "./IntroJobDetails";
import ReportIntroForm from "./ReportIntroForm";
import { INBOX_COPY as COPY } from "../../../../../constants/hiring";

const SECONDARY =
  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-neutral-400 hover:bg-white/5 hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400";

const CompanyHeader = ({ intro }) => (
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[15px] font-semibold text-white">{intro.company.name}</p>
        <TrustBadge level={intro.company.trustLevel} />
      </div>
      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-neutral-400">
        <span>{intro.recruiter.name}{intro.recruiter.role ? ` · ${intro.recruiter.role}` : ""}</span>
        {intro.company.website && (
          <a href={intro.company.website} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-purple-400 hover:underline">
            <Globe size={12} aria-hidden="true" />{intro.company.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </p>
    </div>
    <div className="flex flex-col items-end gap-1 text-xs text-neutral-500">
      <IntroStatusPill status={intro.status} />
      <span>{intro.status === "pending" && intro.expiresAt ? expiresText(intro.expiresAt) : shortDate(intro.createdAt)}</span>
    </div>
  </div>
);

// One intro request in the developer's inbox. `onAction(id, action)` runs
// accept / decline / block; `onReport(id, body)` sends a report.
const InboxIntroCard = ({ intro, onAction, onReport }) => {
  const [busy, setBusy] = useState(null);
  const [confirmBlock, setConfirmBlock] = useState(false);
  const [reporting, setReporting] = useState(false);

  const run = async (action) => {
    setBusy(action);
    try {
      await onAction(intro.id, action);
    } finally {
      setBusy(null);
    }
  };

  const block = () => {
    setConfirmBlock(false);
    run("block");
  };

  const report = async (body) => {
    if (await onReport(intro.id, body)) setReporting(false);
  };

  const pending = intro.status === "pending";

  return (
    <li className={`flex flex-col gap-4 rounded-2xl border p-5 ${pending ? "border-purple-500/30 bg-purple-500/[0.03]" : "border-white/10 bg-white/[0.02]"}`}>
      <CompanyHeader intro={intro} />
      <IntroJobDetails job={intro.job} match={intro.match} />
      <blockquote className="border-l-2 border-purple-500/50 pl-3 text-sm whitespace-pre-line text-neutral-200">{intro.message}</blockquote>

      {intro.status === "accepted" && intro.recruiterEmail && <CopyEmail email={intro.recruiterEmail} note={COPY.sharedEmail} />}

      {reporting ? (
        <ReportIntroForm introId={intro.id} onSubmit={report} onCancel={() => setReporting(false)} />
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {pending && (
            <>
              <button type="button" disabled={Boolean(busy)} onClick={() => run("accept")}
                className="inline-flex items-center gap-1.5 rounded-md bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">
                {busy === "accept" && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                {COPY.accept}
              </button>
              <button type="button" disabled={Boolean(busy)} onClick={() => run("decline")}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-50">
                {busy === "decline" && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                {COPY.decline}
              </button>
            </>
          )}
          <span className="ml-auto flex gap-1">
            {pending && (
              <button type="button" disabled={Boolean(busy)} onClick={() => setConfirmBlock(true)} className={SECONDARY}>
                {busy === "block" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Ban size={14} aria-hidden="true" />}
                {COPY.block}
              </button>
            )}
            {intro.reported ? (
              <span className="px-3 py-1.5 text-sm text-neutral-500">Reported</span>
            ) : (
              <button type="button" disabled={Boolean(busy)} onClick={() => setReporting(true)} className={SECONDARY}>
                <Flag size={14} aria-hidden="true" /> {COPY.report}
              </button>
            )}
          </span>
        </div>
      )}

      {confirmBlock && (
        <ConfirmDialog
          title={COPY.blockConfirm.title}
          body={COPY.blockConfirm.body}
          confirmLabel={COPY.blockConfirm.confirm}
          onConfirm={block}
          onCancel={() => setConfirmBlock(false)}
        />
      )}
    </li>
  );
};

export default InboxIntroCard;
