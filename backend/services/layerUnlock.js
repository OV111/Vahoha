// Which layers must a learner have passed before this one may be examined?
//
// Pure, so the policy can be unit-tested without a database. The service that
// reads roadmap_layers and userProgress lives in examEngineService.
//
// A layer's own `requires` list wins. Layers seeded before the field existed
// have none, so they fall back to "the layer just before this one in the
// track", which is how the roadmap page has always unlocked them.

// layerDoc          : a roadmap_layers document
// previousLayerDoc  : the document with order - 1 in the same track, or null
export const prerequisiteIds = (layerDoc, previousLayerDoc = null) => {
  if (Array.isArray(layerDoc?.requires)) return layerDoc.requires;
  return previousLayerDoc ? [previousLayerDoc.layerId] : [];
};

// doneIds: layer ids the server has marked done for this learner
export const missingPrerequisites = (requiredIds, doneIds) => {
  const done = new Set(doneIds);
  return requiredIds.filter((id) => !done.has(id));
};
