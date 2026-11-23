import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { fetchSentIntrosSummary } from "../../api/hiringApi";
import { INTROS_SUMMARY_COPY as COPY } from "../../../../../constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

const Count = ({ n, label, tone }) => (
  <span className="flex flex-col">
    <span className={`text-2xl font-semibold tabular-nums ${tone}`}>{n}</span>
    <span className="text-xs text-neutral-500">{label}</span>
  </span>
);

// Hiring home: where the company's intro requests stand.
const IntrosSummaryCard = ({ className = "" }) => {
  const [summary, setSummary] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSentIntrosSummary()
      .then((s) => !cancelled && setSummary(s))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.02] p-5 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="flex items-center gap-2 font-semibold text-white">
          <Send size={16} className="text-purple-400" aria-hidden="true" /> {COPY.title}
        </h2>
        <Link to="/hiring/intros" className="inline-flex items-center gap-1 text-sm text-purple-500 hover:underline">
          {COPY.link} <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      {!summary ? (
        <div className="flex min-h-40"><LoadingSuspense fill size={32} /></div>
      ) : (
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="flex gap-8">
            <Count n={summary.pending} label="Pending" tone="text-amber-300" />
            <Count n={summary.accepted} label="Accepted" tone="text-emerald-300" />
          </div>
          <span className="text-sm text-neutral-400 tabular-nums">{COPY.sentToday(summary.sentToday, summary.dailyLimit)}</span>
        </div>
      )}
    </section>
  );
};

export default IntrosSummaryCard;
