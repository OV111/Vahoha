// Which lab tasks this browser has finished. Same stopgap as the lesson
// progress (localStorage until learning-system stage 3 moves progress to the
// server); every read and write goes through this file.
//
// Passing every task of a lab marks its lesson finished, so the roadmap shows
// the lesson as done (LAB_SYSTEM.md: "a lesson counts as done when its lab is
// passed"). Progress is recorded by the system, never ticked by hand.
import { markLessonFinished } from "@/features/learn/lib/lessonProgress";

const KEY = "vahoha.labs.done";
const labId = (trackId, layerId, slug) => `${trackId}/${layerId}/${slug}`;

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
};

/** Set of finished task ids for one lab. */
export const finishedTasks = (trackId, layerId, slug) => new Set(read()[labId(trackId, layerId, slug)] ?? []);

/**
 * Records a finished task. When it completes the lab (every id in `allTaskIds`
 * is finished), the lesson is marked finished too. Returns true if the lab is
 * now complete.
 */
export const markTaskFinished = (trackId, layerId, slug, taskId, allTaskIds) => {
  const id = labId(trackId, layerId, slug);
  const done = new Set([...(read()[id] ?? []), taskId]);
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...read(), [id]: [...done] }));
  } catch {
    /* storage unavailable: progress just isn't remembered */
  }
  const complete = allTaskIds.every((t) => done.has(t));
  if (complete) markLessonFinished(trackId, layerId, slug);
  return complete;
};
