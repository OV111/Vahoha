// Lab files, one per lesson at <trackId>/<layerId>/<lessonSlug>.js, keyed by
// the same slug the lesson page uses. A lesson without a file here has no lab.
//
// import.meta.glob without `eager` makes each lab its own chunk: the lab page
// downloads only the one it shows.
const modules = import.meta.glob("./*/*/*.js");

const keyOf = (trackId, layerId, slug) => `./${trackId}/${layerId}/${slug}.js`;

export const hasLab = (trackId, layerId, slug) => Boolean(modules[keyOf(trackId, layerId, slug)]);

/** Resolves to the lab object, or null when this lesson has no lab yet. */
export const loadLab = async (trackId, layerId, slug) => {
  const load = modules[keyOf(trackId, layerId, slug)];
  if (!load) return null;
  const mod = await load();
  return mod.default;
};
