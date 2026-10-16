import { Search, X } from "lucide-react";
import Seo from "@/seo/Seo";
import CandidateCard from "./components/CandidateCard";
import useCandidates from "./hooks/useCandidates";

/**
 * /candidates: developers who opted in via "Show me to recruiters", ranked by
 * a published evidence score. Everything here comes from what each developer
 * chose to share, so a row can never show more than their scorecard does.
 */

const FIELD =
  "rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] text-neutral-200 outline-none transition-colors focus:border-purple-500/60";

const MIN_LAYERS = [
  { value: "", label: "Any layers" },
  { value: "1", label: "1+ layers" },
  { value: "2", label: "2+ layers" },
  { value: "3", label: "3+ layers" },
  { value: "5", label: "5+ layers" },
];

const SORTS = [
  { value: "score", label: "Best evidence" },
  { value: "layers", label: "Most layers" },
  { value: "active", label: "Recently active" },
];

function Toggle({ on, onChange, children }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange(!on)}
      className={`rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
        on
          ? "border-purple-500/60 bg-purple-500/15 text-purple-200"
          : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/25"
      }`}
    >
      {children}
    </button>
  );
}

function Skeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex animate-pulse gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="h-11 w-11 rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-white/10" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ScoreRules({ rules }) {
  if (!rules) return null;
  const { layers, capstone, teams } = rules;
  return (
    <details className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-neutral-400">
      <summary className="cursor-pointer font-medium text-neutral-200">How the evidence score works</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
        <li>Passed layers: {layers.perLayer} points each, up to {layers.maxLayers * layers.perLayer}.</li>
        <li>Exam quality: the average best score on those layers, up to {rules.quality.max}.</li>
        <li>Capstone: {capstone.first} points for one issued capstone, {capstone.second} for two or more.</li>
        <li>Team projects: {teams.perTeam} points each, up to {teams.maxTeams * teams.perTeam}.</li>
        <li>
          Only verified results count, and only the sections a developer chose to share. XP and activity are not
          part of the score.
        </li>
      </ul>
    </details>
  );
}

export default function CandidatesPage() {
  const c = useCandidates();
  const { data, loading, error, filters } = c;
  const trackTitle = (ids) => data?.facets.tracks.find((t) => t.trackId === ids[0])?.title ?? null;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-10">
      <Seo noindex path="/candidates" title="Candidates | Vahoha" />

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Candidates</h1>
        <p className="text-[14px] text-neutral-400">
          Developers who chose to be found. Every number comes from a verified test, capstone or team project.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-[200px] flex-1">
          <span className="sr-only">Search by name or username</span>
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          <input
            type="search"
            value={c.search}
            onChange={(e) => c.setSearch(e.target.value)}
            placeholder="Search name or username"
            className={`${FIELD} w-full pl-8`}
          />
        </label>

        <select aria-label="Track" value={filters.track} onChange={(e) => c.setTrack(e.target.value)} className={FIELD}>
          <option value="">All tracks</option>
          {(data?.facets.tracks ?? []).map((t) => (
            <option key={t.trackId} value={t.trackId}>
              {t.title} ({t.count})
            </option>
          ))}
        </select>

        <select aria-label="Minimum layers passed" value={filters.minLayers} onChange={(e) => c.setMinLayers(e.target.value)} className={FIELD}>
          {MIN_LAYERS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <Toggle on={filters.openToWork} onChange={c.setOpenToWork}>Open to work</Toggle>
        <Toggle on={filters.hasCapstone} onChange={c.setHasCapstone}>Has capstone</Toggle>

        <select aria-label="Sort by" value={filters.sort} onChange={(e) => c.setSort(e.target.value)} className={`${FIELD} ml-auto`}>
          {SORTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex min-h-5 items-center justify-between text-[13px] text-neutral-400" aria-live="polite">
        <span>{data && !error ? `${data.total} ${data.total === 1 ? "developer" : "developers"}` : ""}</span>
        {c.activeCount > 0 && (
          <button type="button" onClick={c.clearAll} className="flex items-center gap-1 font-medium text-purple-300 hover:text-purple-200">
            <X size={13} aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-[14px] text-red-300">
          {error.message}{" "}
          <button type="button" onClick={c.retry} className="font-medium underline underline-offset-2">Try again</button>
        </div>
      ) : loading && !data ? (
        <Skeleton />
      ) : data.facets.totalOptedIn === 0 ? (
        <p className="rounded-xl border border-dashed border-white/10 p-8 text-center text-[14px] text-neutral-400">
          No developers have opted in yet. They appear here after switching on “Show me to recruiters” in their settings.
        </p>
      ) : data.items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/10 p-8 text-center text-[14px] text-neutral-400">
          No developers match these filters.{" "}
          <button type="button" onClick={c.clearAll} className="font-medium text-purple-300 hover:text-purple-200">Clear filters</button>
        </p>
      ) : (
        <ul className={`flex flex-col gap-3 transition-opacity ${loading ? "opacity-60" : ""}`} aria-busy={loading}>
          {data.items.map((row) => (
            <CandidateCard key={row.username} c={row} trackTitle={trackTitle(row.tracks)} />
          ))}
        </ul>
      )}

      {data && data.pages > 1 && (
        <nav className="flex items-center justify-center gap-3 text-[13px]" aria-label="Pages">
          <button
            type="button"
            disabled={data.page <= 1}
            onClick={() => c.setPage(data.page - 1)}
            className={`${FIELD} disabled:opacity-40`}
          >
            Previous
          </button>
          <span className="text-neutral-400">Page {data.page} of {data.pages}</span>
          <button
            type="button"
            disabled={data.page >= data.pages}
            onClick={() => c.setPage(data.page + 1)}
            className={`${FIELD} disabled:opacity-40`}
          >
            Next
          </button>
        </nav>
      )}

      <ScoreRules rules={data?.rules} />
    </main>
  );
}
