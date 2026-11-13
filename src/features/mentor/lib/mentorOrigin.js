/**
 * "Ask the mentor" links from other pages pass where the learner was, so the
 * mentor can load that topic's evidence up front instead of asking which one
 * they mean.
 *
 * Usage: <Link to="/mentor" state={mentorOrigin("lesson", { topic, path, layer })}>
 */

// Same caps as activitySchema on the server: an over-long field would reject
// the learner's whole message, so it is cut here instead.
const LIMITS = { path: 60, layer: 60, topic: 120 };
const SURFACES = new Set(["lesson", "progress", "exam-results"]);

export const mentorOrigin = (surface, fields = {}) => ({ origin: { surface, ...fields } });

/** Router state is anything a link put there, so only known shapes get through. */
export const readMentorOrigin = (raw) => {
  if (!raw || !SURFACES.has(raw.surface)) return null;
  const origin = { surface: raw.surface };
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof raw[key] === "string" ? raw[key].trim().slice(0, max) : "";
    if (value) origin[key] = value;
  }
  return origin;
};
