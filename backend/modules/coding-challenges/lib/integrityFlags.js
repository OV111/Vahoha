/**
 * Review flags for a first passing submission. Pure, so it can be unit-tested.
 *
 * Flags never change the verdict or the XP. A challenge is practice, and both
 * signals have honest explanations (a solution written in a local editor, a
 * fast typist on a short problem), so they mark a solve for a human to look
 * at and nothing more.
 *
 *  - large-paste: reported by the client, so a modified client can hide it.
 *  - faster-than-typing: measured by the server from the attempt's start time
 *    and the amount of code added to the starter, so it cannot be hidden.
 */

const LARGE_PASTE_CHARS = 200;
const MAX_TYPING_CHARS_PER_SEC = 10; // about 120 words a minute, sustained
const MIN_ADDED_CHARS = 150; // below this the typing rate is noise
const MAX_COUNT = 100_000;

const count = (v) => (Number.isInteger(v) && v >= 0 ? Math.min(v, MAX_COUNT) : 0);

// Malformed values become 0 rather than an error: a bad counter must not cost
// a learner their submission.
export const sanitizeArenaIntegrity = (raw) => ({
  pasteEvents: count(raw?.pasteEvents),
  largestPaste: count(raw?.largestPaste),
  tabSwitches: count(raw?.tabSwitches),
});

export const integrityFlags = ({ integrity, addedChars, elapsedSecs }) => {
  const flags = [];
  if (integrity.largestPaste >= LARGE_PASTE_CHARS) flags.push("large-paste");
  if (addedChars >= MIN_ADDED_CHARS && addedChars / Math.max(elapsedSecs, 1) > MAX_TYPING_CHARS_PER_SEC) {
    flags.push("faster-than-typing");
  }
  return flags;
};
