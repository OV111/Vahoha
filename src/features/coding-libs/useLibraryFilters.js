import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TABS } from "../../../constants/libsPage";

/**
 * Library filter state, kept in the URL, so Back, refresh and a shared link
 * (`/libs?layer=mern-2`) reproduce the same view. Param names are the API's own
 * (path, difficulty, is_free, layer, q); `tab` is the page's resource-type tab.
 */

const SEARCH_DEBOUNCE_MS = 300;

export const NO_FILTERS = { path: null, difficulty: null, is_free: null, layer: null };

const parseBool = (value) => (value === "true" ? true : value === "false" ? false : null);

export default function useLibraryFilters() {
  const [params, setParams] = useSearchParams();

  // Reads the live URL, not the render's `params`: a debounced search write
  // landing after a filter click would otherwise restore the old filters.
  // replace, not push, so flipping filters doesn't fill the Back button.
  const update = (changes) => {
    const next = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value == null || value === "") next.delete(key);
      else next.set(key, String(value));
    }
    setParams(next, { replace: true });
  };

  const tab = params.get("tab");
  const activeTab = TABS.some((t) => t.key === tab) ? tab : "all";

  const filters = useMemo(
    () => ({
      path: params.get("path"),
      difficulty: params.get("difficulty"),
      is_free: parseBool(params.get("is_free")),
      layer: params.get("layer"),
    }),
    [params],
  );

  // Typing stays instant locally; the URL (and so the request) follows once
  // the user pauses, instead of one request per keystroke.
  const query = params.get("q") ?? "";
  const [search, setSearch] = useState(query);
  useEffect(() => setSearch(query), [query]);
  useEffect(() => {
    if (search.trim() === query) return;
    const id = setTimeout(() => update({ q: search.trim() }), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    activeTab,
    setActiveTab: (key) => update({ tab: key === "all" ? null : key }),
    filters,
    // Accepts a new filters object or an updater, like a useState setter.
    setFilters: (next) => update(typeof next === "function" ? next(filters) : next),
    query,
    search,
    setSearch,
    clearAll: () => {
      update({ ...NO_FILTERS, q: null });
      setSearch("");
    },
  };
}
