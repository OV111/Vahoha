import { useCallback, useEffect, useState } from "react";
import { Check, FileJson, Globe, Lock } from "lucide-react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { libraryAdminApi } from "../../../services/libraryAdminApi";

const card = "rounded-md border border-neutral-800 bg-neutral-950 p-5";
const button =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400";
const primary = `${button} bg-purple-600 text-white hover:bg-purple-700`;
const secondary = `${button} border border-neutral-700 text-neutral-200 hover:bg-neutral-900`;

function VisibilityBadge({ visibility }) {
  const isPublic = visibility === "public";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs ${
        isPublic ? "bg-green-500/10 text-green-300" : "bg-neutral-800 text-neutral-400"
      }`}
    >
      {isPublic ? <Globe size={12} aria-hidden="true" /> : <Lock size={12} aria-hidden="true" />}
      {isPublic ? "Public" : "Admin only"}
    </span>
  );
}

function ErrorBox({ error }) {
  if (!error) return null;
  return (
    <div role="alert" className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-200">
      <p>{error.message}</p>
      {error.issues?.length > 0 && (
        <ul className="mt-2 space-y-1 font-mono text-xs text-red-300">
          {error.issues.map((issue, i) => (
            <li key={i}>
              {issue.field}: {issue.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Upload a reviewed distill/import JSON: check the plan first, then apply it. */
function ImportPanel({ onImported }) {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    setPlan(null);
    setDone(null);
    setError(null);
    setData(null);
    if (!file) return setFileName("");
    setFileName(file.name);
    try {
      setData(JSON.parse(await file.text()));
    } catch {
      setError(new Error("This file is not valid JSON."));
    }
  };

  const run = async (apply) => {
    setBusy(true);
    setError(null);
    try {
      const res = await libraryAdminApi.importDigest(data, { apply, reviewed });
      setPlan(res.plan);
      if (apply) {
        setDone(res.result);
        onImported();
      }
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section aria-labelledby="import-heading" className={card}>
      <h2 id="import-heading" className="text-base font-semibold text-neutral-100">
        Import a digest
      </h2>
      <p className="mt-1 max-w-[65ch] text-sm text-neutral-400">
        A JSON file from the distill script, after you have read it. Concepts are written as unreviewed unless you
        tick the box. Importing never makes a digest public.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className={`${secondary} cursor-pointer`}>
          <FileJson size={16} aria-hidden="true" />
          {fileName || "Choose a .json file"}
          <input type="file" accept="application/json,.json" onChange={pickFile} className="sr-only" />
        </label>
        <button type="button" className={secondary} disabled={!data || busy} onClick={() => run(false)}>
          Check
        </button>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={(e) => setReviewed(e.target.checked)}
            className="h-4 w-4 accent-purple-600"
          />
          Mark as reviewed
        </label>
        <button type="button" className={primary} disabled={!plan || busy || Boolean(done)} onClick={() => run(true)}>
          Import
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <ErrorBox error={error} />
        {plan && (
          <dl className="grid max-w-md grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <dt className="text-neutral-500">Book</dt>
            <dd className="text-neutral-200">{plan.sourceExists ? "Exists" : "Will be created"}</dd>
            <dt className="text-neutral-500">Concepts</dt>
            <dd className="text-neutral-200">
              {plan.total} ({plan.kept} kept, {plan.total - plan.kept} dropped)
            </dd>
            <dt className="text-neutral-500">New / overwritten</dt>
            <dd className="text-neutral-200">
              {plan.newCount} / {plan.overwrittenCount}
            </dd>
          </dl>
        )}
        {done && (
          <p role="status" className="text-sm text-green-300">
            Imported: {done.inserted} new, {done.changed} changed.
          </p>
        )}
      </div>
    </section>
  );
}

function DigestList({ digests, selectedId, onSelect }) {
  if (digests.length === 0) {
    return <p className="text-sm text-neutral-400">No digests yet. Import one above.</p>;
  }
  return (
    <ul className="space-y-2">
      {digests.map((d) => {
        const selected = String(d._id) === selectedId;
        return (
          <li key={d._id}>
            <button
              type="button"
              onClick={() => onSelect(String(d._id))}
              aria-pressed={selected}
              className={`flex min-h-11 w-full flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-purple-400 ${
                selected ? "border-purple-500 bg-purple-500/5" : "border-neutral-800 bg-neutral-950 hover:bg-neutral-900"
              }`}
            >
              <span className="font-medium text-neutral-100">{d.title}</span>
              <span className="flex items-center gap-3 text-sm text-neutral-400">
                {d.reviewed}/{d.total} reviewed · {d.kept} kept
                <VisibilityBadge visibility={d.digestVisibility} />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** One book's concepts: tick each as reviewed, then publish. Keyed by book, so it reloads on switch. */
function DigestReview({ sourceId, onChanged }) {
  const [digest, setDigest] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let stale = false;
    libraryAdminApi
      .concepts(sourceId)
      .then((d) => !stale && setDigest(d))
      .catch((err) => !stale && setError(err));
    return () => {
      stale = true;
    };
  }, [sourceId]);

  const toggleReviewed = async (key, reviewed) => {
    const set = (value) =>
      setDigest((d) => ({ ...d, concepts: d.concepts.map((c) => (c.key === key ? { ...c, reviewed: value } : c)) }));
    set(reviewed);
    setError(null);
    try {
      await libraryAdminApi.setReviewed(sourceId, key, reviewed);
      onChanged();
    } catch (err) {
      set(!reviewed);
      setError(err);
    }
  };

  const toggleVisibility = async () => {
    const next = digest.digestVisibility === "public" ? "admin" : "public";
    setBusy(true);
    setError(null);
    try {
      await libraryAdminApi.setVisibility(sourceId, next);
      setDigest((d) => ({ ...d, digestVisibility: next }));
      onChanged();
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  if (!digest) return error ? <ErrorBox error={error} /> : <div className="flex min-h-[40vh]"><LoadingSuspense fill /></div>;

  const isPublic = digest.digestVisibility === "public";
  return (
    <section aria-labelledby="review-heading" className={card}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="review-heading" className="text-base font-semibold text-neutral-100">
            {digest.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Learners only ever see reviewed concepts, and only after you publish.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <VisibilityBadge visibility={digest.digestVisibility} />
          <button type="button" className={isPublic ? secondary : primary} disabled={busy} onClick={toggleVisibility}>
            {isPublic ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <ErrorBox error={error} />
      </div>

      <ul className="mt-4 divide-y divide-neutral-800">
        {digest.concepts.map((c) => (
          <li key={c.key} className="flex gap-3 py-4">
            <label className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-start justify-center pt-1">
              <input
                type="checkbox"
                checked={c.reviewed === true}
                onChange={(e) => toggleReviewed(c.key, e.target.checked)}
                aria-label={`Reviewed: ${c.title}`}
                className="h-4 w-4 accent-purple-600"
              />
            </label>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium text-neutral-100">{c.title}</h3>
                {c.keep ? (
                  <span className="rounded-sm bg-purple-500/10 px-1.5 py-0.5 text-xs text-purple-300">Keep</span>
                ) : (
                  <span className="rounded-sm bg-neutral-800 px-1.5 py-0.5 text-xs text-neutral-400">
                    Dropped: {c.dropReason}
                  </span>
                )}
                {c.reviewed && <Check size={14} className="text-green-400" aria-label="Reviewed" />}
              </div>
              <p className="mt-1 text-sm text-neutral-300">{c.summary}</p>
              {c.example && (
                <pre className="mt-2 overflow-x-auto rounded-sm bg-black p-2 font-mono text-xs text-neutral-300">
                  {c.example}
                </pre>
              )}
              {c.beyondBook && (
                <p className="mt-2 border-l-2 border-amber-500 pl-2 text-sm text-amber-200">
                  <span className="font-medium">Beyond the book: </span>
                  {c.beyondBook}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * /admin/library: import book digests, review them concept by concept, and
 * publish. Admin-only: the API answers 404 to everyone else, and so does this page.
 */
export default function AdminLibraryPage() {
  const [digests, setDigests] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const loadDigests = useCallback(
    () =>
      libraryAdminApi
        .digests()
        .then(setDigests)
        .catch(setLoadError),
    [],
  );

  useEffect(() => {
    loadDigests();
  }, [loadDigests]);

  if (loadError?.status === 404 && !digests) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 text-neutral-300 sm:px-8">
        <p>Not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 bg-black px-5 pb-24 pt-28 text-neutral-200 sm:px-8">
      <header>
        <h1 className="text-2xl font-semibold text-neutral-50">Library digests</h1>
        <p className="mt-1 text-sm text-neutral-400">Import, review and publish book digests.</p>
      </header>

      <ImportPanel onImported={loadDigests} />

      <section aria-labelledby="digests-heading" className="space-y-3">
        <h2 id="digests-heading" className="text-base font-semibold text-neutral-100">
          Digests
        </h2>
        <ErrorBox error={loadError} />
        {digests ? (
          <DigestList digests={digests} selectedId={selectedId} onSelect={setSelectedId} />
        ) : (
          !loadError && <div className="flex min-h-40"><LoadingSuspense fill size={32} /></div>
        )}
      </section>

      {selectedId && <DigestReview key={selectedId} sourceId={selectedId} onChanged={loadDigests} />}
    </div>
  );
}
