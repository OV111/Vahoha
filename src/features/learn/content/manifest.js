// What the layer page needs to know about each written lesson, without
// downloading the lesson itself. lessons.test.js fails if this drifts from
// the lesson files, so add a line here whenever you add a lesson file.
export const LESSON_MANIFEST = {
  "mern/mern-2/call-stack-task-queue-and-microtask-queue-ordering": { minutes: 20 },
  "mern/mern-2/how-closures-capture-free-variables-in-the-scope-chain": { minutes: 20 },
};

export const lessonMeta = (trackId, layerId, slug) => LESSON_MANIFEST[`${trackId}/${layerId}/${slug}`] ?? null;
