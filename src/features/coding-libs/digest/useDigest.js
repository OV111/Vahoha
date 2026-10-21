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

/**
 * State for one book's digest: the chosen role (a local preference, remembered
 * across books), the mode tab, "I already know this" ideas (stored per user on
 * the server through `saveKnown`, so they follow the learner across devices),
 * and the session-only interview tally.
 */
export function useDigest(concepts, { initialKnown = [], saveKnown, initialChecked = [], submitCheck } = {}) {
  const [role, setRoleState] = useState(() => {
    const saved = readStorage(ROLE_KEY, DEFAULT_ROLE);
    return ROLES.some((r) => r.id === saved) ? saved : DEFAULT_ROLE;
  });
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [showAll, setShowAll] = useState(false);
  const [known, setKnown] = useState(() => new Set(initialKnown));
  const [revealed, setRevealed] = useState(() => new Set());
  const [graded, setGraded] = useState(() => new Map()); // conceptId -> "got" | "missed"
  const [checked, setChecked] = useState(() => new Set(initialChecked)); // answered right at least once
  const [checkResults, setCheckResults] = useState(() => new Map()); // conceptId -> { picked, pending | correct, answerIndex, explanation }

  const setRole = useCallback((next) => {
    setRoleState(next);
    writeStorage(ROLE_KEY, next);
  }, []);

  // Optimistic: the tick shows at once, and is undone if the save fails.
  const updateKnown = useCallback(
    (conceptId, isKnown) => {
      const apply = (value) =>
        setKnown((prev) => {
          const next = new Set(prev);
          if (value) next.add(conceptId);
          else next.delete(conceptId);
          return next;
        });
      apply(isKnown);
      saveKnown?.(conceptId, isKnown).catch(() => apply(!isKnown));
    },
    [saveKnown],
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

  const setCheckResult = (conceptId, value) =>
    setCheckResults((prev) => {
      const next = new Map(prev);
      if (value) next.set(conceptId, value);
      else next.delete(conceptId);
      return next;
    });

  // Graded on the server, so the answer only arrives after the learner picks.
  const answerCheck = useCallback(
    async (conceptId, picked) => {
      if (!submitCheck) return;
      setCheckResult(conceptId, { picked, pending: true });
      try {
        const result = await submitCheck(conceptId, picked);
        setCheckResult(conceptId, { picked, ...result });
        if (result.correct) setChecked((prev) => new Set(prev).add(conceptId));
      } catch {
        setCheckResult(conceptId, null); // let them try again
      }
    },
    [submitCheck],
  );

  const retryCheck = useCallback((conceptId) => setCheckResult(conceptId, null), []);

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
    checked, checkResults, answerCheck, retryCheck,
    seenCount,
  };
}
