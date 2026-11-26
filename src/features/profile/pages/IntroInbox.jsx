import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Inbox } from "lucide-react";
import PageShell from "@/features/profile/components/PageShell";
import InboxIntroCard from "@/features/profile/components/intros/InboxIntroCard";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import useIntroStore from "@/features/profile/hooks/useIntroStore";
import { answerIntro, fetchInbox, reportIntro } from "@/features/hiring/api/hiringApi";
import { INBOX_COPY as COPY } from "@/constants/hiring";

const DONE_TOAST = { accept: COPY.accepted, decline: COPY.declined, block: COPY.blocked };

// Unanswered requests first, then newest first.
const byPendingThenNewest = (a, b) =>
  (b.status === "pending") - (a.status === "pending") || new Date(b.createdAt) - new Date(a.createdAt);

// /my-profile/intros: companies asking the developer for an intro about a job.
// Contact details only move after the developer accepts.
export default function IntroInbox() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const setPending = useIntroStore((s) => s.setPending);

  useEffect(() => {
    let cancelled = false;
    fetchInbox()
      .then((data) => !cancelled && setRows(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  const pending = rows?.filter((r) => r.status === "pending").length ?? 0;

  useEffect(() => {
    if (rows) setPending(pending);
  }, [rows, pending, setPending]);

  const replace = (updated) => setRows((list) => list.map((r) => (r.id === updated.id ? updated : r)));

  const onAction = async (id, action) => {
    try {
      replace(await answerIntro(id, action));
      toast.success(DONE_TOAST[action]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onReport = async (id, body) => {
    try {
      replace(await reportIntro(id, body));
      toast.success(COPY.reported);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  return (
    <PageShell title={COPY.title} subtitle={rows ? COPY.subtitle(pending) : null}>
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}
      {!rows && !error && <div className="flex min-h-[50vh]"><LoadingSuspense fill /></div>}
      {rows && rows.length === 0 && (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-white/[0.05] text-neutral-400">
            <Inbox size={22} aria-hidden="true" />
          </span>
          <p className="mt-4 max-w-sm text-sm text-neutral-400">{COPY.empty}</p>
        </div>
      )}
      {rows && rows.length > 0 && (
        <ul className="mt-6 flex max-w-3xl flex-col gap-4">
          {[...rows].sort(byPendingThenNewest).map((intro) => (
            <InboxIntroCard key={intro.id} intro={intro} onAction={onAction} onReport={onReport} />
          ))}
        </ul>
      )}
    </PageShell>
  );
}
