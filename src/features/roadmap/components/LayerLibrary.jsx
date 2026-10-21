import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Library } from "lucide-react";
import { API_BASE_URL } from "../../../../constants/api";

const MAX_ITEMS = 5;

const TYPE_LABELS = { book: "Book", documentation: "Docs", guide: "Guide", cheatsheet: "Cheat sheet" };

/**
 * Library resources tagged with this roadmap layer: the reading shelf of the
 * "study" step. Optional by design: no items, a slow network or a failed
 * request all render nothing rather than an error in the drawer.
 */
const LayerLibrary = ({ layerId, onNavigate }) => {
  const [{ items, total }, setState] = useState({ items: [], total: 0 });

  useEffect(() => {
    // Abort on layer change so a slow response for the previous layer can't
    // overwrite the list for the one now showing.
    const controller = new AbortController();
    setState({ items: [], total: 0 });
    fetch(
      `${API_BASE_URL}/library?layer=${encodeURIComponent(layerId)}&limit=${MAX_ITEMS}`,
      { signal: controller.signal },
    )
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => setState({ items: json.data ?? [], total: json.pagination?.total ?? 0 }))
      .catch(() => {}); // optional section: failures (and aborts) just show nothing
    return () => controller.abort();
  }, [layerId]);

  if (items.length === 0) return null;

  const rowClass =
    "flex min-h-11 items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 transition-colors hover:border-neutral-600";

  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
        <Library size={12} />
        Library for this layer
      </h3>
      <ul className="space-y-2">
        {items.map((item) => {
          const label = (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-200">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-neutral-600">{TYPE_LABELS[item.type] ?? item.type}</p>
            </div>
          );
          return (
            <li key={item._id}>
              {item.type === "book" ? (
                <Link to={`/libs/${item._id}`} onClick={onNavigate} className={rowClass}>
                  {label}
                </Link>
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {label}
                  <ExternalLink size={13} className="shrink-0 text-neutral-500" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {total > items.length && (
        <Link
          to={`/libs?layer=${encodeURIComponent(layerId)}`}
          onClick={onNavigate}
          className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-purple-300 hover:text-purple-200"
        >
          See all {total} in the library
        </Link>
      )}
    </div>
  );
};

export default LayerLibrary;
