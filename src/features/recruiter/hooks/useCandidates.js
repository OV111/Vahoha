import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { recruiterApi } from "../recruiterApi";

/**
 * Candidates list state, kept in the URL (same idea as the challenge catalog):
 * Back, refresh and a shared link all reproduce the same view. Param names are
 * the API's own, so the page's query string IS the request.
 *
 * Search is typed locally and only reaches the URL (and the request) once the
 * person pauses.
 */
const KEYS = ["track", "openToWork", "hasCapstone", "minLayers", "q", "sort", "page"];

export default function useCandidates() {
  const [params, setParams] = useSearchParams();

  const update = (changes) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(changes)) {
          if (value == null || value === "" || value === false) next.delete(key);
          else next.set(key, String(value));
        }
        // Any filter change starts again from the first page.
        if (!("page" in changes)) next.delete("page");
        return next;
      },
      { replace: true },
    );

  const urlQ = params.get("q") ?? "";
  const [search, setSearch] = useState(urlQ);
  const debounced = useDebouncedValue(search, 300);
  useEffect(() => setSearch(urlQ), [urlQ]);
  useEffect(() => {
    if (debounced.trim() !== urlQ) update({ q: debounced.trim() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    for (const key of KEYS) if (params.get(key)) q.set(key, params.get(key));
    q.set("limit", "20");
    return q.toString();
  }, [params]);

  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    recruiterApi
      .candidates(query)
      .then((data) => live && setState({ data, loading: false, error: null }))
      .catch((error) => live && setState((s) => ({ ...s, loading: false, error })));
    return () => {
      live = false; // a slow earlier response must not overwrite a newer one
    };
  }, [query, attempt]);

  const filters = {
    track: params.get("track") ?? "",
    openToWork: params.get("openToWork") === "true",
    hasCapstone: params.get("hasCapstone") === "true",
    minLayers: params.get("minLayers") ?? "",
    sort: params.get("sort") ?? "score",
    page: Number(params.get("page") ?? 1),
  };
  const activeCount =
    Number(Boolean(filters.track)) +
    Number(filters.openToWork) +
    Number(filters.hasCapstone) +
    Number(Boolean(filters.minLayers)) +
    Number(Boolean(urlQ));

  return {
    ...state,
    filters,
    search,
    setSearch,
    activeCount,
    setTrack: (track) => update({ track }),
    setOpenToWork: (on) => update({ openToWork: on ? "true" : null }),
    setHasCapstone: (on) => update({ hasCapstone: on ? "true" : null }),
    setMinLayers: (minLayers) => update({ minLayers }),
    setSort: (sort) => update({ sort: sort === "score" ? null : sort }),
    setPage: (page) => update({ page: page > 1 ? page : null }),
    clearAll: () =>
      update({ track: null, openToWork: null, hasCapstone: null, minLayers: null, q: null }),
    retry: () => setAttempt((n) => n + 1),
  };
}
