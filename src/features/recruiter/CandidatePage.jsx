import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, ExternalLink, GitPullRequest, Layers, ShieldCheck, Sparkles, Trophy, Users, Workflow } from "lucide-react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { recruiterApi } from "./recruiterApi";
import HireCta from "../hiring/components/HireCta";
import RecruiterActions from "../hiring/components/RecruiterActions";

/**
 * Public candidate scorecard: /candidate/:username. No account needed.
 * Laid out for how a recruiter reads it: who is this and are they available
 * (header), the four numbers that matter (stats), then the proof behind them
 * (main column), with the recruiter's own tools beside it (side column).
 * A section the developer chose not to share is simply absent.
 */

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";

const PANEL = "rounded-2xl border border-white/10 bg-white/[0.02] p-5";

function Section({ title, icon: Icon, count, children }) {
  return (
    <section className={PANEL}>
      <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-white">
        <Icon size={16} className="text-purple-400" aria-hidden="true" />
        {title}
        {count > 0 && <span className="text-sm font-normal text-neutral-500 tabular-nums">{count}</span>}
      </h2>
      {children}
    </section>
  );
}

const Empty = ({ children }) => <p className="text-sm text-neutral-500">{children}</p>;

// A number the developer chose not to share is "—", never 0.
function Stat({ label, value, hint }) {
  return (
    <div className={`${PANEL} flex flex-col gap-1`}>
      <span className="text-[12px] font-medium tracking-wide text-neutral-500 uppercase">{label}</span>
      <span className="text-2xl font-semibold text-white tabular-nums">{value ?? "—"}</span>
      {hint && <span className="text-[12px] text-neutral-500">{hint}</span>}
    </div>
  );
}

function ScoreBar({ score }) {
  const tone = score >= 90 ? "bg-emerald-400" : score >= 80 ? "bg-purple-400" : "bg-amber-400";
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 sm:w-32" aria-hidden="true">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, score)}%` }} />
      </div>
      <span className="w-10 text-right font-mono text-sm text-neutral-300 tabular-nums">{score}%</span>
    </div>
  );
}

const initialOf = (name) => (name?.trim()?.[0] ?? "?").toUpperCase();

export default function CandidatePage() {
  const { username } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    recruiterApi
      .scorecard(username)
      .then(setCard)
      .catch((err) => setError(err.status === 404 ? "This scorecard doesn't exist or isn't shared." : err.message));
  }, [username]);

  if (error) return <p className="p-8 text-sm text-red-400">{error}</p>;
  if (!card) return <LoadingSuspense />;

  const firstName = card.name?.split(" ")[0];
  const avgScore = card.exams?.length
    ? Math.round(card.exams.reduce((sum, e) => sum + e.bestScore, 0) / card.exams.length)
    : null;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      {/* Who, and are they available */}
      <header className={`${PANEL} flex flex-col gap-4 sm:flex-row sm:items-center`}>
        <div
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-500/15 text-2xl font-semibold text-purple-300"
        >
          {initialOf(card.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold text-white">
            {card.name}
            {card.openToWork && (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                Open to work
              </span>
            )}
          </h1>
          {card.headline && <p className="mt-1 text-sm font-medium text-purple-300">{card.headline}</p>}
          <p className="mt-1 text-sm text-neutral-500">
            @{card.username} · member since {formatDate(card.activity.memberSince)} · last active{" "}
            {formatDate(card.activity.lastActiveAt)}
          </p>
        </div>
      </header>

      {/* The four numbers that matter */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Layers passed" value={card.exams?.length} hint="Server-graded tests" />
        <Stat label="Avg test score" value={avgScore == null ? null : `${avgScore}%`} hint="Pass mark is 80%" />
        <Stat label="Capstones" value={card.capstones?.length} hint="Reviewed and defended" />
        <Stat label="Team projects" value={card.teams?.length} hint="Merged pull requests" />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* The proof */}
        <div className="flex min-w-0 flex-col gap-6">
          {card.capstones && (
            <Section title="Capstones" icon={Trophy} count={card.capstones.length}>
              {card.capstones.length === 0 ? (
                <Empty>No capstone passed yet.</Empty>
              ) : (
                <ul className="flex flex-col gap-3">
                  {card.capstones.map((c) => (
                    <li key={c.verifyPath} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-4">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-semibold text-white">
                          <BadgeCheck size={16} className="text-emerald-400" aria-hidden="true" />
                          {c.track.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-neutral-400">
                          Review {c.reviewScore ?? "—"}% · Defense {c.defenseScore ?? "—"}% · {formatDate(c.issuedAt)}
                        </p>
                      </div>
                      <Link to={c.verifyPath} className="inline-flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200">
                        Verify certificate <ExternalLink size={12} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          {card.exams && (
            <Section title="Layers passed" icon={Layers} count={card.exams.length}>
              {card.exams.length === 0 ? (
                <Empty>No layer tests passed yet.</Empty>
              ) : (
                <ul className="flex flex-col divide-y divide-white/5">
                  {card.exams.map((e) => (
                    <li key={`${e.path}:${e.layer}`} className="flex items-center justify-between gap-4 py-2.5">
                      <span className="min-w-0 truncate text-sm text-neutral-200">{e.layerTitle ?? e.layer}</span>
                      <ScoreBar score={e.bestScore} />
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          {card.teams && (
            <Section title="Team projects" icon={Users} count={card.teams.length}>
              {card.teams.length === 0 ? (
                <Empty>No team project yet.</Empty>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {card.teams.map((t) => (
                    <li key={t.evidencePath} className="flex flex-col gap-2 rounded-xl border border-white/10 p-4">
                      <p className="font-semibold text-white">{t.name}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <GitPullRequest size={12} aria-hidden="true" /> {t.mergedPulls} merged PRs
                        </span>
                        <span>{t.reviewsGiven} reviews given</span>
                        {t.defense && <span>Defense {t.defense.score}% ({t.defense.passed ? "passed" : "not passed"})</span>}
                        {t.peerRating && <span>Peers {t.peerRating.average}/5</span>}
                      </div>
                      <Link to={t.evidencePath} className="mt-auto inline-flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200">
                        Team evidence <ExternalLink size={12} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          {card.maps?.length > 0 && (
            <Section title="Project maps" icon={Workflow} count={card.maps.length}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {card.maps.map((m) => (
                  <li key={m.publicId} className="flex flex-col gap-1 rounded-xl border border-white/10 p-4">
                    <p className="font-semibold text-white">{m.title}</p>
                    <p className="text-[13px] text-neutral-400">Capstone: {m.trackId} · updated {formatDate(m.updatedAt)}</p>
                    <Link to={`/map/${m.publicId}`} className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm text-purple-300 hover:text-purple-200">
                      Open map <ExternalLink size={12} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* The recruiter's side */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--navbar-h,64px)+16px)]">
          <HireCta name={firstName} />
          <RecruiterActions username={card.username} name={firstName} />

          {card.strengths && (
            <Section title="Strong topics" icon={Sparkles}>
              {card.strengths.length === 0 ? (
                <Empty>Not enough evidence yet.</Empty>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {card.strengths.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-200">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          <section className={`${PANEL} text-[13px] leading-relaxed text-neutral-400`}>
            <h2 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-white">
              <ShieldCheck size={16} className="text-purple-400" aria-hidden="true" /> How to read this
            </h2>
            <p>
              Every result comes from a server-graded test, an AI-reviewed capstone with a timed defense, or merged
              pull requests. {firstName || "The developer"} chose which sections to share.
            </p>
            <p className="mt-2 text-neutral-500">Effort points (XP): {card.xpTotal}. XP measures activity, not skill.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
