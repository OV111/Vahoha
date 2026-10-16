import { useCallback, useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import useTourSeen from "./useTourSeen";

/**
 * Drives a first-visit tour: whether it is showing, which step it is on, and
 * how it ends. <TourOverlay> only draws; every decision lives here.
 *
 * A step is { id, selector, title, body, block?, advance?, optional? }:
 *   advance: "button" (default) the tooltip shows a Next button
 *            "click"  a click inside the target moves on
 *            "both"   a Next button, or a click inside the target
 *            "state"  the page's own state moves the tour on (see derivedIndex)
 *   optional: skipped when its target is not on the page (e.g. a track with no capstone)
 *   endOnClick: a selector; clicking it ends the whole tour (see the effect below)
 * On the last step, Next / a click ends the tour.
 *
 * `derivedIndex` is optional: "the page's own state says the user is at least
 * this far along". The roadmap passes how many of its leading steps are done
 * (a domain is picked, a track is picked), so the tour can never fall behind
 * what the user actually did. Steps after that move on with Next. An index
 * past the last step means "everything done".
 *
 * Tours are for signed-in users only, so guests never mount any of this work.
 */
export default function useTour({ steps, tourId, derivedIndex = 0 }) {
  const auth = useAuthStore((s) => s.auth);
  const [seen, markSeen] = useTourSeen(tourId);
  const [manualIndex, setManualIndex] = useState(0);

  const active = auth && !seen;
  const index = Math.max(derivedIndex, manualIndex);
  const step = steps[index]; // undefined once every step is done

  const next = useCallback(() => {
    // Jump to the next step whose target exists; none left means we are done.
    let target = index + 1;
    while (
      target < steps.length &&
      steps[target].optional &&
      !document.querySelector(steps[target].selector)
    ) {
      target += 1;
    }
    if (target >= steps.length) markSeen();
    else setManualIndex(target);
  }, [index, steps, markSeen]);

  // Every step done: nothing left to show.
  useEffect(() => {
    if (active && !step) markSeen();
  }, [active, step, markSeen]);

  // Escape skips, like every other dismissable layer in the app. Ignored while
  // typing, because Escape also closes autocomplete in the code editor.
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (e.target instanceof Element && e.target.closest("input, textarea, [contenteditable]")) return;
      markSeen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, markSeen]);

  // `endOnClick`: a click on this selector ends the whole tour for good, from
  // any step. It is for clicks that leave the page ("Start learning"): the
  // learner just did what the tour was teaching, and without this the tour
  // would start over at the same step when they come back.
  useEffect(() => {
    if (!active || !step?.endOnClick) return undefined;
    const onClick = (e) => {
      if (e.target instanceof Element && e.target.closest(step.endOnClick)) markSeen();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active, step, markSeen]);

  // "click" steps: a click on the target counts. Capture phase, so it still
  // fires when the button navigates away or stops propagation.
  useEffect(() => {
    if (!active || (step?.advance !== "click" && step?.advance !== "both")) return undefined;
    const onClick = (e) => {
      if (e.target instanceof Element && e.target.closest(step.selector)) next();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active, step, next]);

  return { active, index, total: steps.length, step, next, skip: markSeen };
}
