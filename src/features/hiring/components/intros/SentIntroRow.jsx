import { useState } from "react";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import IntroStatusPill from "./IntroStatusPill";
import CopyEmail from "./CopyEmail";
import { expiresText, jobLine, matchText, shortDate } from "../../lib/intros";
import { INTROS_PAGE_COPY as COPY } from "../../../../../constants/hiring";

// One request on /hiring/intros: who, which job, where it stands.
const SentIntroRow = ({ intro, onWithdraw }) => {
  const [busy, setBusy] = useState(false);
  const withdraw = async () => {
    setBusy(true);
    try {
      await onWithdraw(intro.id);
    } finally {
      setBusy(false);
    }
  };

  const met = intro.match.met.length;

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/candidate/${intro.candidate.username}`} className="text-[15px] font-semibold text-white hover:text-purple-300">
              {intro.candidate.name}
            </Link>
            <span className="text-sm text-neutral-500">@{intro.candidate.username}</span>
            <IntroStatusPill status={intro.status} />
          </div>
          <p className="mt-1 text-sm text-neutral-300">
            {intro.job.title} <span className="text-neutral-500">· {jobLine(intro.job)}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-neutral-500">
            <span>Sent {shortDate(intro.createdAt)}{intro.sentBy?.name ? ` by ${intro.sentBy.name}` : ""}</span>
            {intro.status === "pending" && intro.expiresAt && <span>{expiresText(intro.expiresAt)}</span>}
            {intro.respondedAt && intro.status !== "pending" && <span>Answered {shortDate(intro.respondedAt)}</span>}
            <span className="inline-flex items-center gap-1"><Layers size={12} aria-hidden="true" />{matchText(met, intro.match.total)}</span>
          </div>
        </div>
        {intro.status === "pending" && (
          <button type="button" disabled={busy} onClick={withdraw}
            className="shrink-0 self-start rounded-md border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-50">
            {COPY.withdraw}
          </button>
        )}
      </div>
      {intro.status === "accepted" && intro.contactEmail && <CopyEmail email={intro.contactEmail} />}
    </li>
  );
};

export default SentIntroRow;
