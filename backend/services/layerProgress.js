// A layer is "done" only when the exam engine says so (examEngineService writes
// layerProgress.<layer> = "done" on a pass). The client may report any other
// status, but it can never grant or revoke "done" itself.
//
// clientProgress  : the { layerId: status } map the browser sent
// serverDoneIds   : layer ids already "done" in the database
// returns         : the map that is safe to store
export const sanitizeLayerProgress = (clientProgress, serverDoneIds = []) => {
  const done = new Set(serverDoneIds);
  const safe = {};

  for (const [layerId, status] of Object.entries(clientProgress ?? {})) {
    if (typeof status !== "string") continue;
    // a claimed "done" that the server never awarded is downgraded
    safe[layerId] = status === "done" && !done.has(layerId) ? "in-progress" : status;
  }

  // never downgrade an earned layer, even if the client's copy is stale
  for (const layerId of done) safe[layerId] = "done";

  return safe;
};

export const doneLayerIds = (progressDoc) => {
  if (!progressDoc) return [];
  const fromMap = Object.entries(progressDoc.layerProgress ?? {})
    .filter(([, status]) => status === "done")
    .map(([layerId]) => layerId);
  return [...new Set([...fromMap, ...(progressDoc.completedLayers ?? [])])];
};
