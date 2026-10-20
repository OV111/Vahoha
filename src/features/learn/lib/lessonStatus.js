// Each lesson's status for the roadmap tree: not_started | in_progress | done | skipped.
//
// Same stopgap as lessonProgress.js: localStorage until learning-system stage 3
// stores progress on the server. Every read and write goes through this file,
// so moving to an API changes nothing else.
//
// Finishing a lesson in the player (lessonProgress.js) also counts as "done".
// Both sources carry a timestamp and the newer one wins, so a learner can
// still reset or skip a lesson they finished earlier.
import { useMemo, useSyncExternalStore } from "react";
import { FINISHED_KEY, finishedAt } from "./lessonProgress";

/** @typedef {"not_started" | "in_progress" | "done" | "skipped"} LessonStatus */

/** @type {readonly LessonStatus[]} */
export const LESSON_STATUSES = ["not_started", "in_progress", "done", "skipped"];

const KEY = "vahoha.learn.status";

/** @returns {Record<string, { s: LessonStatus, at: number }>} */
const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
};

/**
 * Status of every lesson in one layer that has one. Lessons never touched are
 * absent; callers treat a missing slug as "not_started".
 * @returns {Record<string, LessonStatus>}
 */
export const layerStatuses = (trackId, layerId) => {
  const prefix = `${trackId}/${layerId}/`;
  /** @type {Record<string, { s: LessonStatus, at: number }>} */
  const merged = {};

  for (const [slug, at] of Object.entries(finishedAt(trackId, layerId))) merged[slug] = { s: "done", at };

  for (const [key, entry] of Object.entries(read())) {
    if (!key.startsWith(prefix) || !LESSON_STATUSES.includes(entry?.s)) continue;
    const slug = key.slice(prefix.length);
    const at = Number(entry.at) || 0;
    if (!merged[slug] || at >= merged[slug].at) merged[slug] = { s: entry.s, at };
  }

  return Object.fromEntries(Object.entries(merged).map(([slug, { s }]) => [slug, s]));
};

// ── change notification ─────────────────────────────────────────────────────
// A version number is the store snapshot: cheap to compare, and the hook
// recomputes the layer's statuses only when it changes.
let version = 0;
const listeners = new Set();
const notify = () => {
  version += 1;
  for (const listener of listeners) listener();
};

const subscribe = (listener) => {
  listeners.add(listener);
  // Another tab changed progress: pick it up here too.
  const onStorage = (e) => {
    if (e.key === KEY || e.key === FINISHED_KEY) notify();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

/** @param {LessonStatus} status */
export const setLessonStatus = (trackId, layerId, slug, status) => {
  if (!LESSON_STATUSES.includes(status)) throw new Error(`Unknown lesson status: ${status}`);
  try {
    const next = { ...read(), [`${trackId}/${layerId}/${slug}`]: { s: status, at: Date.now() } };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the change just isn't remembered */
  }
  notify();
};

/**
 * Called when a lesson page opens: the system records progress, the learner
 * never marks anything by hand. Moves a lesson to "in_progress" only if it
 * has no status yet, so it never undoes "done".
 */
export const markLessonOpened = (trackId, layerId, slug) => {
  if (layerStatuses(trackId, layerId)[slug]) return;
  setLessonStatus(trackId, layerId, slug, "in_progress");
};

/** True once any lesson of the track was opened, finished or skipped. */
export const trackHasProgress = (trackId) =>
  Object.entries(read()).some(([key, entry]) => key.startsWith(`${trackId}/`) && entry?.s && entry.s !== "not_started");

/** Live version of trackHasProgress. */
export const useTrackHasProgress = (trackId) => {
  const current = useSyncExternalStore(subscribe, () => version, () => 0);
  return useMemo(
    () => Boolean(trackId) && trackHasProgress(trackId),
    // `current` is the change signal, as in useLayerStatuses.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackId, current],
  );
};

/**
 * Live statuses for one layer; re-renders when any status changes (this tab or another).
 * @returns {Record<string, LessonStatus>}
 */
export const useLayerStatuses = (trackId, layerId) => {
  const current = useSyncExternalStore(subscribe, () => version, () => 0);
  return useMemo(
    () => (trackId && layerId ? layerStatuses(trackId, layerId) : {}),
    // `current` is the change signal: a new version means storage changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackId, layerId, current],
  );
};
