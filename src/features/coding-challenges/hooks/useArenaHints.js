import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Hint bodies are never shipped with the challenge — they're bought one at a
 * time and cached here once the server hands the text over.
 */
export default function useArenaHints({ challenge, attempt, revealHint }) {
  const [hintTexts, setHintTexts] = useState({});

  const hints = useMemo(
    () =>
      (challenge?.hints ?? []).map((h) => ({
        id: h.order,
        cost: h.cost,
        revealed: Boolean(hintTexts[h.order]),
        text: hintTexts[h.order] ?? "",
      })),
    [challenge, hintTexts],
  );

  const buyHint = useCallback(
    async (order) => {
      try {
        const result = await revealHint(order);
        if (result?.text) {
          setHintTexts((prev) => ({ ...prev, [order]: result.text }));
        }
      } catch (err) {
        // 402 = not enough XP. Surface it on the card rather than silently
        // doing nothing, which would read as a broken button.
        setHintTexts((prev) => ({ ...prev, [order]: `⚠ ${err.message}` }));
      }
    },
    [revealHint],
  );

  // Orders already asked for, so the store update revealHint causes (a new
  // `attempt`) doesn't fire the same request again.
  const requested = useRef(new Set());

  // A different challenge starts with a clean slate. Declared before the
  // auto-reveal effect on purpose: effects run in order, so this must not
  // wipe what that effect just requested.
  useEffect(() => {
    requested.current = new Set();
    setHintTexts({});
  }, [challenge?.slug]);

  // Free hints, and hints already paid for on an earlier visit, load by
  // themselves: there is nothing to decide, and the server never charges twice.
  useEffect(() => {
    if (!challenge || !attempt) return;
    const owned = new Set(attempt.hintsRevealed ?? []);
    for (const h of challenge.hints ?? []) {
      if ((h.cost === 0 || owned.has(h.order)) && !requested.current.has(h.order)) {
        requested.current.add(h.order);
        buyHint(h.order);
      }
    }
  }, [challenge, attempt, buyHint]);

  return { hints, buyHint };
}
