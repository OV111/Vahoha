import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Catalog filter state, kept in the URL.
 *
 * The URL is the single source of truth, so Back, refresh and a shared link
 * all reproduce the same view. Param names are the API's own (track, layer,
 * type, difficulty, tags, time, status, recommended, q): the page's query
 * string IS the list request, with nothing to translate.
 *
 * `track` absent means "my path"; the server resolves it. "all" is explicit.
 */

const API_KEYS = ["track", "layer", "type", "difficulty", "tags", "time", "status", "recommended", "q"];
const PAGE_SIZE = 24;
const SEARCH_DEBOUNCE_MS = 300;

const csv = (value) => (value ? value.split(",").filter(Boolean) : []);
const toggleIn = (list, item) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

export default function useChallengeFilters({ myTrack }) {
  const [params, setParams] = useSearchParams();

  // replace, not push: flipping filters shouldn't fill the Back button with
  // every intermediate state. Back still leaves the page with its filters.
  const update = (changes) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(changes)) {
          const empty = value == null || value === "" || value === "all" || (Array.isArray(value) && !value.length);
          // "all" is a real value for track only; everywhere else it's the default.
          if (key === "track" ? value == null || value === myTrack : empty) next.delete(key);
          else next.set(key, Array.isArray(value) ? value.join(",") : String(value));
        }
        return next;
      },
      { replace: true },
    );

  // Typing stays instant locally; the URL (and so the request) follows once
  // the user pauses, instead of one request per keystroke.
  const urlQuery = params.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  useEffect(() => setSearchQuery(urlQuery), [urlQuery]);
  useEffect(() => {
    if (searchQuery.trim() === urlQuery) return;
    const id = setTimeout(() => update({ q: searchQuery.trim() }), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // The list request: only the API's keys, in a stable order, so the same
  // filters always produce the same string (the store compares strings).
  const apiQuery = useMemo(() => {
    const q = new URLSearchParams();
    for (const key of API_KEYS) {
      const value = params.get(key);
      if (value) q.set(key, value);
    }
    q.set("limit", String(PAGE_SIZE));
    return q.toString();
  }, [params]);

  const selectedTopics = csv(params.get("tags"));
  const selectedStatuses = csv(params.get("status"));

  return {
    apiQuery,
    // null = "my path" (the server's default); otherwise a trackId or "all".
    activePath: params.get("track"),
    setActivePath: (track) => update({ track }),
    activeLayer: params.get("layer") ?? "all",
    setActiveLayer: (layer) => update({ layer }),
    activeType: params.get("type") ?? "all",
    setActiveType: (type) => update({ type }),
    activeLevel: params.get("difficulty") ?? "all",
    setActiveLevel: (difficulty) => update({ difficulty }),
    recommended: params.get("recommended") === "true",
    setRecommended: (on) => update({ recommended: on ? "true" : null }),
    selectedTopics,
    toggleTopicFilter: (tag) => update({ tags: toggleIn(selectedTopics, tag) }),
    timeRange: params.get("time"),
    setTimeRange: (time) => update({ time }),
    // The bar's Status dropdown is single-select; an older shared link with
    // several statuses still works and shows the first.
    activeStatus: selectedStatuses[0] ?? "all",
    setActiveStatus: (status) => update({ status }),
    clearMoreFilters: () => update({ tags: null, time: null }),
    // Path is deliberately kept: it's where the learner is, not a narrowing.
    activeFilterCount:
      (params.get("layer") ? 1 : 0) +
      (params.get("difficulty") ? 1 : 0) +
      (params.get("recommended") ? 1 : 0) +
      (params.get("time") ? 1 : 0) +
      (params.get("q") ? 1 : 0) +
      selectedTopics.length +
      selectedStatuses.length,
    clearAll: () =>
      update({ layer: null, difficulty: null, recommended: null, tags: null, time: null, status: null, q: null }),
    searchQuery,
    setSearchQuery,
  };
}
