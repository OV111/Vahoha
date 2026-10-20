// Are all prerequisites of `layer` done? A layer with no `requires` falls back
// to "the previous layer in the array", so every track authored before the
// field existed behaves exactly as it did.
//
// progress: { layerId: status } map. A layer's own `status` is the fallback
// when the map has no entry (same rule the tree uses for isDone).
export const prereqsDone = (layer, index, layers, progress) => {
  const statusOf = (l) => progress[l.id] ?? l.status;

  if (Array.isArray(layer.requires)) {
    if (layer.requires.length === 0) return false; // a root: nothing before it to be "done"
    const byId = new Map(layers.map((l) => [l.id, l]));
    // An id that isn't in the track counts as not done, never as a free pass.
    return layer.requires.every((id) => byId.has(id) && statusOf(byId.get(id)) === "done");
  }

  return index > 0 && statusOf(layers[index - 1]) === "done";
};

// What the tree shows for a layer. "up-next" is the layer the learner should
// start now: not done, and either a root (the first layer, or `requires: []`)
// or one whose prerequisites are all done. Everything else is "locked".
export const layerStatus = (layer, index, layers, progress) => {
  const own = progress[layer.id] ?? layer.status;
  if (own === "done" || own === "in-progress") return own;
  const isRoot = Array.isArray(layer.requires) ? layer.requires.length === 0 : index === 0;
  return isRoot || prereqsDone(layer, index, layers, progress) ? "up-next" : "locked";
};
