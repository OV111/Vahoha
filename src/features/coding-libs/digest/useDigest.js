import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_MODE,
  DEFAULT_ROLE,
  ROLES,
  selectConcepts,
} from "./digestData";

// localStorage can throw (private windows, blocked storage), so every access is wrapped.
function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* preference just won't persist */
  }
}

const ROLE_KEY = "digest:role";
const knownKey = (bookId) => `digest:known:${bookId}`;

/**
 * State for one book's digest: the chosen role (remembered across books),
 * the mode tab, "I already know this" ideas (remembered per book), and the
 * session-only interview tally.
 *
 * Prototype storage is localStorage. The planned version stores `known`
 * per user in the database so it follows them across devices.
 */
export function useDigest(bookId, concepts) {
  const [role, setRoleState] = useState(() => {
    const saved = readStorage(ROLE_KEY, DEFAULT_ROLE);
    return ROLES.some((r) => r.id === saved) ? saved : DEFAULT_ROLE;
  });
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [showAll, setShowAll] = useState(false);
  const [known, setKnown] = useState(() => new Set(readStorage(knownKey(bookId), [])));
  const [revealed, setRevealed] = useState(() => new Set());
  const [graded, setGraded] = useState(() => new Map()); // conceptId -> "got" | "missed"

  const setRole = useCallback((next) => {
    setRoleState(next);
    writeStorage(ROLE_KEY, next);
  }, []);

  const updateKnown = useCallback(
    (conceptId, isKnown) => {
      setKnown((prev) => {
        const next = new Set(prev);
        if (isKnown) next.add(conceptId);
        else next.delete(conceptId);
        writeStorage(knownKey(bookId), [...next]);
        return next;
      });
    },
    [bookId],
  );

  const toggleReveal = useCallback((conceptId) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(conceptId)) next.delete(conceptId);
      else next.add(conceptId);
      return next;
    });
  }, []);

  const grade = useCallback((conceptId, result) => {
    setGraded((prev) => new Map(prev).set(conceptId, result));
  }, []);

  const { shown, cut } = useMemo(
    () => selectConcepts(concepts, { role, mode, showAll }),
    [concepts, role, mode, showAll],
  );

  const seenCount = shown.filter((c) => known.has(c.id)).length;

  return {
    role, setRole,
    mode, setMode,
    showAll, setShowAll,
    shown, cut,
    known, markKnown: (id) => updateKnown(id, true), undoKnown: (id) => updateKnown(id, false),
    revealed, toggleReveal,
    graded, grade,
    seenCount,
  };
}
