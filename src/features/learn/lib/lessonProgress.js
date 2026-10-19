// Which lessons this browser has finished. A stopgap until stage 3 stores
// progress on the server (docs/product/LEARNING_SYSTEM.md): keep every read
// and write behind these two functions so that swap touches one file.
//
// Storage can be missing or throw (private mode, blocked site data), so every
// access is guarded and the page works without it.
const KEY = "vahoha.learn.finished";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
};

const id = (trackId, layerId, slug) => `${trackId}/${layerId}/${slug}`;

/** Set of finished lesson slugs for one layer. */
export const finishedLessons = (trackId, layerId) => {
  const all = read();
  const prefix = `${trackId}/${layerId}/`;
  return new Set(
    Object.keys(all)
      .filter((k) => k.startsWith(prefix))
      .map((k) => k.slice(prefix.length)),
  );
};

export const markLessonFinished = (trackId, layerId, slug) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...read(), [id(trackId, layerId, slug)]: Date.now() }));
  } catch {
    /* storage unavailable: progress just isn't remembered */
  }
};
