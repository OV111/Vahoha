import { create } from "zustand";
import { API_BASE_URL, authHeaders, apiFetch } from "../../../../constants/api";

/**
 * Challenge data layer.
 *
 * The API is the vocabulary: components read `slug`, `summary`, `difficulty`,
 * `estimatedMins` and `stats.solves` directly. Nothing is renamed on the way
 * in — one set of field names across the stack.
 *
 * The catalog is filtered and paged on the server: the client holds one
 * growing page set, never the whole bank. (It used to fetch ?limit=100 and
 * filter locally, which silently hid everything past the first 100.)
 */

const request = async (path, options = {}) => {
  const res = await apiFetch(`${API_BASE_URL}/api/challenges${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...authHeaders(),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return body;
};

// The in-flight list request. A new filter aborts it, so a slow response for
// an old filter can never land on top of the current one.
let listController = null;

const useChallengeStore = create((set, get) => ({
  // Catalog list: the pages loaded so far for the current filters.
  challenges: [],
  total: 0,
  page: 0,
  pages: 0,
  // The path the list is showing ("all" or a trackId), as resolved by the
  // server, and the learner's own path (null before they pick one).
  track: null,
  myTrack: null,
  listQuery: "",
  listLoading: false,
  loadingMore: false,
  listError: null,

  // Path filter options from /tracks.
  tracks: [],
  topics: [],
  daily: null,
  challenge: null,
  stats: null,
  readiness: null,
  leaderboard: null,

  // The live attempt session: the user's saved draft, the hints they've paid
  // for, and what it cost them.
  attempt: null,

  loading: false,
  error: null,

  /** Everything on the catalog page except the list. Loaded once. */
  loadMeta: async () => {
    set({ loading: true, error: null });
    // Each part fails on its own: a 500 from the leaderboard must not blank
    // out the rest of the page.
    const [topics, daily, stats, readiness, leaderboard, tracks] = await Promise.all(
      [
        "/topics",
        "/daily",
        "/stats/me",
        "/readiness",
        "/leaderboard?scope=layer&range=7d&limit=5",
        "/tracks",
      ].map((path) => request(path).catch(() => null)),
    );
    set({
      topics: topics?.tags ?? [],
      daily: daily?.data ?? null,
      stats: stats?.data ?? null,
      readiness: readiness?.data ?? null,
      leaderboard: leaderboard?.data ?? null,
      tracks: tracks?.data?.tracks ?? [],
      loading: false,
    });
  },

  /**
   * First page for a filter set. `query` is a URLSearchParams string built by
   * useChallengeFilters; keeping it a string makes "same filters?" a cheap
   * equality check.
   */
  loadChallenges: async (query) => {
    listController?.abort();
    listController = new AbortController();
    set({ listQuery: query, listLoading: true, listError: null });
    try {
      const body = await request(`?${query}${query ? "&" : ""}page=1`, {
        signal: listController.signal,
      });
      set({
        challenges: body.items ?? [],
        total: body.total ?? 0,
        page: body.page ?? 1,
        pages: body.pages ?? 0,
        track: body.track ?? null,
        myTrack: body.myTrack ?? null,
        listLoading: false,
      });
    } catch (err) {
      if (err.name === "AbortError") return;
      set({ listError: err.message, listLoading: false });
    }
  },

  /** Appends the next page for the current filters. */
  loadMore: async () => {
    const { listQuery, page, pages, loadingMore, listLoading } = get();
    if (loadingMore || listLoading || page >= pages) return;
    set({ loadingMore: true });
    const signal = listController?.signal;
    try {
      const body = await request(`?${listQuery}${listQuery ? "&" : ""}page=${page + 1}`, { signal });
      // Filters changed while this was in flight: drop it.
      if (get().listQuery !== listQuery) return;
      set((state) => ({
        challenges: [...state.challenges, ...(body.items ?? [])],
        page: body.page ?? page + 1,
        loadingMore: false,
      }));
    } catch (err) {
      if (err.name === "AbortError") return set({ loadingMore: false });
      set({ listError: err.message, loadingMore: false });
    }
  },

  loadChallenge: async (slug) => {
    // Avoid a refetch flash when navigating back to a challenge already open.
    if (get().challenge?.slug === slug) return;

    set({ loading: true, error: null, challenge: null });
    try {
      const { data } = await request(`/${slug}`);
      set({ challenge: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Open (or resume) the attempt session for a challenge. The server is
   * idempotent here, so calling it again on a revisit returns the same
   * document with the saved draft intact.
   */
  startAttempt: async (slug) => {
    try {
      const { data } = await request("/attempts", {
        method: "POST",
        body: JSON.stringify({ slug }),
      });
      set({ attempt: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    }
  },

  /**
   * Persist the editor draft. Fire-and-forget by design: an autosave that
   * interrupts typing to report a transient network blip is worse than one
   * that silently retries on the next keystroke batch.
   */
  saveDraft: async (code) => {
    const { attempt } = get();
    if (!attempt) return;
    try {
      await request(`/attempts/${attempt._id}`, {
        method: "PATCH",
        body: JSON.stringify({ code }),
      });
    } catch {
      /* non-fatal — the next autosave carries the same content */
    }
  },

  /** Buy and reveal a hint. Charges XP server-side; idempotent on replay. */
  revealHint: async (order) => {
    const { attempt } = get();
    if (!attempt) return null;
    // This endpoint spreads its payload rather than nesting it under `data`.
    const result = await request(`/attempts/${attempt._id}/hints/${order}`, {
      method: "POST",
    });
    set((state) => ({
      attempt: {
        ...state.attempt,
        hintsRevealed: result.hintsRevealed,
        xpSpent: result.xpSpent,
      },
    }));
    return result;
  },

  /**
   * Grade the attempt server-side against the hidden tests. This is the only
   * result that pays XP — the in-browser Run is advisory.
   */
  submitAttempt: async (language) => {
    const { attempt } = get();
    if (!attempt) return null;
    return request(`/submissions/${attempt._id}`, {
      method: "POST",
      body: JSON.stringify({ language }),
    });
  },

  clearChallenge: () => set({ challenge: null, attempt: null }),
}));

export default useChallengeStore;
