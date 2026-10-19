// Written lesson content, one file per lesson at <trackId>/<layerId>/<slug>.js.
// The slug is the one curriculum.js derives from the roadmap, so a lesson
// without a file here simply falls back to the roadmap summary and links.
//
// import.meta.glob without `eager` makes each lesson its own chunk: the
// layer page downloads none of them, a lesson page downloads one.
const modules = import.meta.glob("./*/*/*.js");

const keyOf = (trackId, layerId, slug) => `./${trackId}/${layerId}/${slug}.js`;

export const hasLessonContent = (trackId, layerId, slug) =>
  Boolean(modules[keyOf(trackId, layerId, slug)]);

/** Resolves to the lesson object, or null when nothing is written yet. */
export const loadLessonContent = async (trackId, layerId, slug) => {
  const load = modules[keyOf(trackId, layerId, slug)];
  if (!load) return null;
  const mod = await load();
  return mod.default;
};
