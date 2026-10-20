// Progress logic for the roadmap tree. Pure functions, no storage or React:
// lessonStatus.js holds the statuses, this file only interprets them.
//
// Only leaves (lessons) store a status. A parent's status and every count are
// derived from its leaves, so a parent can never disagree with its children.
import { buildLessons } from "@/features/learn/lib/curriculum";

/** @typedef {import("@/features/learn/lib/lessonStatus").LessonStatus} LessonStatus */
/** @typedef {"done" | "in-progress" | "up-next" | "locked"} LayerState  from layerPrereqs.layerStatus */

/**
 * @typedef {object} Summary
 * @property {number} total
 * @property {number} done
 * @property {number} skipped
 * @property {number} inProgress
 * @property {number} completed   done + skipped: the learner is finished with them
 * @property {number} percent     0..100, completed share, rounded
 */

/** @param {Record<string, LessonStatus>} statuses @param {string} slug @returns {LessonStatus} */
export const statusOf = (statuses, slug) => statuses[slug] ?? "not_started";

/**
 * Statuses as the tree should show them. Progress is recorded by the system,
 * never ticked by hand:
 * - opening a lesson          -> in_progress  (lessonStatus.markLessonOpened)
 * - finishing it in the player -> done        (lessonProgress.markLessonFinished)
 * - passing the layer test    -> every lesson in the layer done (here, derived)
 * The test pass is applied here rather than written to storage, so it follows
 * the server's result and can't drift from it.
 *
 * @param {object} layer
 * @param {LayerState} layerState
 * @param {Record<string, LessonStatus>} recorded
 * @returns {Record<string, LessonStatus>}
 */
export const effectiveStatuses = (layer, layerState, recorded) => {
  if (layerState !== "done") return recorded;
  return Object.fromEntries(buildLessons(layer).map((l) => [l.slug, "done"]));
};

/** @param {LessonStatus[]} list @returns {Summary} */
export const summarize = (list) => {
  const count = (s) => list.filter((x) => x === s).length;
  const total = list.length;
  const done = count("done");
  const skipped = count("skipped");
  const completed = done + skipped;
  return {
    total,
    done,
    skipped,
    inProgress: count("in_progress"),
    completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

/**
 * A parent's status, derived from its leaves.
 * - every leaf skipped -> skipped
 * - every leaf done or skipped -> done
 * - anything started or finished -> in_progress
 * - otherwise not_started
 * @param {LessonStatus[]} list @returns {LessonStatus}
 */
export const parentStatus = (list) => {
  const s = summarize(list);
  if (s.total === 0) return "not_started";
  if (s.skipped === s.total) return "skipped";
  if (s.completed === s.total) return "done";
  if (s.completed > 0 || s.inProgress > 0) return "in_progress";
  return "not_started";
};

/**
 * Every section of a layer with its leaves' statuses, plus the layer total.
 * Uses the same slugs as the lesson pages, so a status set on the map and one
 * set by finishing a lesson refer to the same lesson.
 * @param {object} layer roadmap layer (sideLeft / sideRight)
 * @param {Record<string, LessonStatus>} statuses
 */
export const layerNodeProgress = (layer, statuses) => {
  const lessons = buildLessons(layer);
  /** @type {Map<string, { slugs: string[], statuses: LessonStatus[] }>} */
  const bySection = new Map();
  for (const l of lessons) {
    const entry = bySection.get(l.section) ?? { slugs: [], statuses: [] };
    entry.slugs.push(l.slug);
    entry.statuses.push(statusOf(statuses, l.slug));
    bySection.set(l.section, entry);
  }

  const sections = new Map(
    [...bySection].map(([title, { slugs, statuses: list }]) => [
      title,
      { slugs, status: parentStatus(list), summary: summarize(list) },
    ]),
  );
  return { sections, summary: summarize(lessons.map((l) => statusOf(statuses, l.slug))) };
};

/**
 * @typedef {object} LayerView
 * @property {"done" | "ready" | "in-progress" | "up-next" | "locked"} tone  card styling
 * @property {string} badge
 * @property {"Start learning" | "Continue" | "Review" | "Preview"} cta
 * @property {boolean} primaryCta  only the layers a learner should act on get the purple button
 */

/**
 * Badge and button for the central layer card, from ONE input, so they can't
 * contradict each other.
 *
 * "done" means the layer test is passed (server). Lesson statuses only say how
 * far the reading has gone. A layer whose test isn't open yet can still be
 * read, so it says "test locked" rather than "locked".
 *
 * @param {LayerState} layerState  layerPrereqs.layerStatus()
 * @param {Summary} summary          layerNodeProgress().summary
 * @returns {LayerView}
 */
export const layerView = (layerState, summary) => {
  const locked = layerState === "locked";

  if (layerState === "done") return { tone: "done", badge: "done", cta: "Review", primaryCta: false };

  if (summary.total > 0 && summary.completed === summary.total) {
    return locked
      ? { tone: "locked", badge: "test locked", cta: "Review", primaryCta: false }
      : { tone: "ready", badge: "test ready", cta: "Review", primaryCta: true };
  }

  const started = summary.completed > 0 || summary.inProgress > 0 || layerState === "in-progress";
  if (started) {
    return locked
      ? { tone: "locked", badge: "test locked", cta: "Continue", primaryCta: false }
      : { tone: "in-progress", badge: "in progress", cta: "Continue", primaryCta: true };
  }

  return locked
    ? { tone: "locked", badge: "test locked", cta: "Preview", primaryCta: false }
    : { tone: "up-next", badge: "up next", cta: "Start learning", primaryCta: true };
};
