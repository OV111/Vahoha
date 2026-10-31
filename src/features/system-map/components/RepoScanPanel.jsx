import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Check, ExternalLink, ScanSearch, X } from "lucide-react";
import { scanRepo } from "../systemMapApi";
import { compareScan } from "../lib/drift";
import { DEFAULT_LENS, lensInfo } from "../lib/lenses";
import { KIND_ICONS } from "../lib/nodeKinds";
import EvidenceList from "./EvidenceList";

const button =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-not-allowed disabled:opacity-50";

const repoUrlOf = (repo) => (repo ? `https://github.com/${repo.fullName}` : "");

function Section({ title, children }) {
  return (
    <div className="mt-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{title}</h3>
      <ul className="mt-2 space-y-2">{children}</ul>
    </div>
  );
}

function PartRow({ part, repo, decision, onDecide }) {
  const Icon = KIND_ICONS[part.kind] ?? Box;
  return (
    <li className="rounded-xl border border-neutral-800 bg-black/40 p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-amber-300">
            <Icon size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              {part.title}
              {part.sub && <span className="ml-2 font-normal text-neutral-400">{part.sub}</span>}
            </p>
            {part.why && <p className="mt-0.5 text-sm text-neutral-300">{part.why}</p>}
            <EvidenceList repo={repo} items={part.evidence} />
          </div>
        </div>
        <div className="flex gap-2" role="group" aria-label={`Add ${part.title}?`}>
          <button
            type="button"
            aria-pressed={decision === true}
            onClick={() => onDecide(true)}
            className={`${button} ${decision === true ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300" : ""}`}
          >
            <Check size={14} aria-hidden="true" /> Accept
          </button>
          <button
            type="button"
            aria-pressed={decision === false}
            onClick={() => onDecide(false)}
            className={`${button} ${decision === false ? "border-neutral-500 bg-neutral-800 text-neutral-300" : ""}`}
          >
            <X size={14} aria-hidden="true" /> Skip
          </button>
        </div>
      </div>
    </li>
  );
}

/**
 * "Suggest from my repo": scan a public GitHub repo, review what it proves,
 * and add only what the learner accepts. Re-scanning shows drift: parts the
 * map has that the repo no longer shows.
 */
export default function RepoScanPanel({ signedIn, repo, nodes, lens = DEFAULT_LENS, onApply, onClose }) {
  const [url, setUrl] = useState(() => repoUrlOf(repo));
  const [state, setState] = useState({ status: "idle" });
  const [decisions, setDecisions] = useState({});
  const [seenLens, setSeenLens] = useState(lens);

  // A scan reads the repo for one lens's parts. After the learner switches lens its
  // results (and what they ticked) no longer fit the map, so start again. Adjusting
  // state while rendering is React's way to reset on a prop change, without an effect.
  if (seenLens !== lens) {
    setSeenLens(lens);
    setState({ status: "idle" });
    setDecisions({});
  }

  const lensTitle = lensInfo(lens).title;
  const scan = state.status === "done" ? state.scan : null;
  const drift = useMemo(() => (scan ? compareScan(nodes, scan) : null), [nodes, scan]);
  const titleOf = (id) => nodes.find((n) => n.id === id)?.data.title ?? "a part";

  const run = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setState({ status: "loading" });
    setDecisions({});
    try {
      setState({ status: "done", scan: await scanRepo(url.trim(), lens) });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  };

  const accepted = drift ? drift.newParts.filter((p) => decisions[p.key] === true) : [];
  const canApply = drift && (accepted.length > 0 || drift.matched.length > 0);

  const apply = () => {
    const added = onApply(scan, new Set(accepted.map((p) => p.key)));
    setState({ status: "applied", added, linked: drift.matched.length });
  };

  return (
    <section aria-label="Suggest from my repo" className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Suggest parts from your repo</h2>
          <p className="mt-0.5 text-sm text-neutral-400">
            Reads your repo for {lensTitle} parts: your dependencies and config files. Nothing is added until you accept it.
          </p>
        </div>
        {/* A small icon in the corner; the invisible ::before keeps a 44px tap area around it. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close repo suggestions"
          title="Close"
          className="relative -mt-1 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors before:absolute before:-inset-1.5 before:content-[''] hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      {!signedIn ? (
        <p className="mt-4 text-sm text-neutral-300">
          <Link to="/get-started" className="text-purple-300 underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          to scan your repo.
        </p>
      ) : (
        <form onSubmit={run} className="mt-4 flex flex-wrap items-end gap-2">
          <label className="min-w-0 flex-1 basis-full text-xs font-medium text-neutral-400 sm:basis-0">
            Public GitHub repo
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/you/your-project"
              className="mt-1 min-h-11 w-full rounded-lg border border-neutral-700 bg-black px-3 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-purple-400"
            />
          </label>
          <button type="submit" disabled={state.status === "loading" || !url.trim()} className={`${button} border-purple-500/60 bg-purple-600 text-white hover:bg-purple-500`}>
            <ScanSearch size={14} aria-hidden="true" /> {state.status === "loading" ? "Reading the repo…" : "Scan"}
          </button>
        </form>
      )}

      <div aria-live="polite">
        {state.status === "error" && <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{state.message}</p>}

        {state.status === "applied" && (
          <p className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            Added {state.added} part{state.added === 1 ? "" : "s"}
            {state.linked > 0 && ` and linked repo evidence to ${state.linked} you already had`}.
          </p>
        )}

        {scan && (
          <div className="mt-4">
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-neutral-300">
              Found {scan.parts.length} part{scan.parts.length === 1 ? "" : "s"} in
              <a href={scan.repo.htmlUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-purple-300 hover:underline">
                {scan.repo.fullName} <ExternalLink size={12} aria-hidden="true" />
              </a>
              {scan.ai && <span className="text-xs text-amber-300">Names and notes written by AI. Check them.</span>}
            </p>

            {scan.parts.length === 0 && (
              <p className="mt-3 text-sm text-neutral-400">
                Nothing recognisable yet. The scan reads files like package.json, requirements.txt and docker-compose.yml.
              </p>
            )}

            {drift.newParts.length > 0 && (
              <Section title={`New parts · ${drift.newParts.length}`}>
                {drift.newParts.map((part) => (
                  <PartRow
                    key={part.key}
                    part={part}
                    repo={scan.repo}
                    decision={decisions[part.key]}
                    onDecide={(yes) => setDecisions((d) => ({ ...d, [part.key]: yes }))}
                  />
                ))}
              </Section>
            )}

            {drift.matched.length > 0 && (
              <Section title={`Already on your map · ${drift.matched.length}`}>
                {drift.matched.map(({ part, nodeId }) => (
                  <li key={part.key} className="flex items-center gap-2 text-sm text-neutral-300">
                    <Check size={14} className="shrink-0 text-emerald-400" aria-hidden="true" />
                    {part.title}
                    {part.sub && <span className="text-neutral-500">({part.sub})</span>} matches “{titleOf(nodeId)}”
                  </li>
                ))}
              </Section>
            )}

            {drift.gone.length > 0 && (
              <Section title={`No longer found in the repo · ${drift.gone.length}`}>
                {drift.gone.map((n) => (
                  <li key={n.id} className="text-sm text-amber-300">
                    {n.data.title}
                    <span className="text-neutral-400"> was found in an earlier scan. If it was removed from the code, delete it from the map.</span>
                  </li>
                ))}
              </Section>
            )}

            {(drift.newParts.length > 0 || canApply) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {drift.newParts.length > 0 && (
                  <button
                    type="button"
                    className={button}
                    onClick={() => setDecisions(Object.fromEntries(drift.newParts.map((p) => [p.key, true])))}
                  >
                    Accept all
                  </button>
                )}
                {canApply && (
                  <button type="button" onClick={apply} className={`${button} border-purple-500/60 bg-purple-600 text-white hover:bg-purple-500`}>
                    {accepted.length > 0
                      ? `Add ${accepted.length} part${accepted.length === 1 ? "" : "s"}`
                      : "Link repo evidence to my parts"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
