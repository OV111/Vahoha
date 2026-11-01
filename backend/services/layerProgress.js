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

// layerProgress is the one source. completedLayers is a mirror kept for readers
// that want a list; the reconcile script (migrate:progress) brought old
// documents, where the two had drifted, in line with exam_attempts.
export const doneLayerIds = (progressDoc) =>
  Object.entries(progressDoc?.layerProgress ?? {})
    .filter(([, status]) => status === "done")
    .map(([layerId]) => layerId);

// The order of the first layer of a track the learner has not passed: where
// they are now. Past the last layer it stays on the last one, because callers
// (challenge readiness, leaderboard) need a real layer to scope to.
//
// trackLayers : [{ layerId, order }] of one track, any order
// returns     : an order number, or null for a track with no layers
export const firstOpenLayer = (trackLayers, doneIds) => {
  if (!trackLayers?.length) return null;
  const sorted = [...trackLayers].sort((a, b) => a.order - b.order);
  const done = new Set(doneIds);
  return (sorted.find((l) => !done.has(l.layerId)) ?? sorted.at(-1)).order;
};
