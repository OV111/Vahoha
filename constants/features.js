/**
 * Switches for features that are built but not open yet. One place, so turning
 * one on is a one-line change and nothing else has to be hunted down.
 *
 * candidates: the recruiter candidates list (/candidates). Off means no nav
 * item and no route, so the URL is a plain 404. The API side has its own
 * switch, CANDIDATES_ENABLED=true, so closing only one half can never leave
 * a working page over a dead endpoint or the other way round by accident.
 */
export const FEATURES = Object.freeze({
  candidates: false,
});
