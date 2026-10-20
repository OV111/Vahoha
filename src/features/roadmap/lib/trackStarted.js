// Has the learner already begun a track? Used to retire the "Start Path"
// button: it exists to begin a path, so it has nothing to offer afterwards.

/** Layer ids are "<trackId>-<number>" (api-dev-4). A bare prefix test would also match "python-backend-3" for "python". */
const belongsToTrack = (layerId, trackId) =>
  layerId.startsWith(`${trackId}-`) && /^\d+$/.test(layerId.slice(trackId.length + 1));

/**
 * True when any layer of the track is recorded as done, e.g. its test was passed
 * without ever opening a lesson here.
 * @param {Record<string, string>} layerProgress  layer id -> "done" | …
 * @param {string} trackId
 */
export const trackHasDoneLayer = (layerProgress, trackId) =>
  Object.entries(layerProgress).some(([layerId, status]) => status === "done" && belongsToTrack(layerId, trackId));
