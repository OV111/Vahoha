const FINISHED = new Set(["done", "skipped"]);

/**
 * The lesson "Continue" opens, or null when there is nothing left to continue.
 *
 * Only a written lesson can be finished, so where a layer has some, the reading
 * lists are passed over: waiting for one to be "done" would stop the learner on
 * it forever. A layer with no written lessons moves on once a list was opened.
 *
 * @param {{ slug: string }[]} lessons in teaching order
 * @param {Record<string, import("./lessonStatus").LessonStatus>} statuses
 * @param {(slug: string) => boolean} isWritten
 */
export const nextLesson = (lessons, statuses, isWritten) => {
  const written = lessons.filter((l) => isWritten(l.slug));
  if (written.length > 0) return written.find((l) => !FINISHED.has(statuses[l.slug])) ?? null;
  return lessons.find((l) => !statuses[l.slug] || statuses[l.slug] === "not_started") ?? null;
};
