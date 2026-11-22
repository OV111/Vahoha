import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { searchLayers } from "../api/hiringApi";

// Picks the roadmap layers a job requires: search by title, click to add,
// x to remove. `value` is [{ layerId, title, track }].
const LayerPicker = ({ value, onChange, max }) => {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q.trim(), 250);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const chosen = new Set(value.map((l) => l.layerId));
  const full = value.length >= max;

  useEffect(() => {
    if (debounced.length < 2) return undefined;
    let cancelled = false;
    searchLayers(debounced)
      .then((rows) => !cancelled && setResults(rows))
      .catch(() => !cancelled && setResults([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  const typing = (text) => {
    setQ(text);
    if (text.trim().length >= 2) setLoading(true);
    else setResults([]);
  };

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {value.map((l) => (
            <li key={l.layerId} className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 py-1 pr-1.5 pl-3 text-[13px] text-purple-100">
              <span>{l.title}</span>
              <span className="text-purple-300/60">· {l.track}</span>
              <button type="button" onClick={() => onChange(value.filter((x) => x.layerId !== l.layerId))}
                aria-label={`Remove ${l.title}`} className="rounded-full p-0.5 hover:bg-white/10">
                <X size={12} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!full && (
        <div className="relative">
          <input
            type="search"
            value={q}
            onChange={(e) => typing(e.target.value)}
            placeholder="Search layers, e.g. Authentication, REST APIs, Testing"
            aria-label="Search roadmap layers"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          {loading && <Loader2 size={14} className="absolute top-1/2 right-3 -translate-y-1/2 animate-spin text-neutral-500" aria-hidden="true" />}
        </div>
      )}

      {!full && q.trim().length >= 2 && !loading && (
        <ul className="max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-neutral-950 p-1">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-neutral-500">No layers match “{q.trim()}”.</li>
          ) : (
            results.map((l) => (
              <li key={l.layerId}>
                <button type="button" disabled={chosen.has(l.layerId)}
                  onClick={() => {
                    onChange([...value, l]);
                    typing("");
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-200 hover:bg-white/[0.06] disabled:opacity-40">
                  <span>
                    {l.title} <span className="text-neutral-500">· {l.track}</span>
                  </span>
                  <Plus size={14} className="shrink-0 text-purple-400" aria-hidden="true" />
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      {full && <p className="text-xs text-neutral-500">That's the maximum of {max} layers.</p>}
    </div>
  );
};

export default LayerPicker;
