import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PAD_X = 8; // breathing room left/right of the lit element
const PAD_Y = 16; // and above/below it (a bit more, so the dashed line isn't tight)
const GAP = 12; // space between the lit element and the tooltip
const EDGE = 16; // minimum distance from the viewport edge
const EDGE_TOP = 48; // and from the top, which keeps it clear of a phone notch / status bar
const TOOLTIP_W = 320;
const TOOLTIP_H = 170; // first-render guess; the real height is measured after render

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const measure = (el) => {
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null; // display:none or not laid out
  return {
    top: r.top,
    left: r.left,
    right: r.right,
    bottom: r.bottom,
    vw: window.innerWidth,
    vh: window.innerHeight,
  };
};

const sameBox = (a, b) =>
  a === b ||
  (a !== null &&
    b !== null &&
    Object.keys(a).every((k) => Math.abs(a[k] - b[k]) < 0.5));

/**
 * Box of the step's target, re-read every animation frame. Polling (instead of
 * scroll/resize listeners) is what lets it also catch a target that appears
 * late (lists mount after a fetch and a fade-in) and one that moves while an
 * animation plays. One getBoundingClientRect per frame is cheap and it only
 * runs while a tour step is on screen.
 */
function useTargetBox(selector, block) {
  const [box, setBox] = useState(null);

  useEffect(() => {
    if (!selector) return undefined;
    let frame;
    let lastEl = null;

    const tick = () => {
      const el = document.querySelector(selector);
      if (el !== lastEl) {
        lastEl = el;
        // Bring a newly appeared target into view once, not on every frame.
        el?.scrollIntoView({
          block,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
      const next = el ? measure(el) : null;
      setBox((prev) => (sameBox(prev, next) ? prev : next));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [selector, block]);

  return box;
}

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Where the tooltip goes. Below the lit element when it fits, then above, then
// beside it (tall panels leave no room above or below), and as a last resort
// inside it along its bottom edge.
function placeTooltip(box, hole, width, height) {
  const left = clamp(box.left, EDGE, box.vw - width - EDGE);
  const sideTop = clamp(hole.top, EDGE_TOP, Math.max(EDGE_TOP, box.vh - height - EDGE));

  if (hole.bottom + GAP + height <= box.vh - EDGE) return { left, top: hole.bottom + GAP };
  if (hole.top - GAP - height >= EDGE_TOP) return { left, bottom: box.vh - hole.top + GAP };
  if (hole.right + GAP + width <= box.vw - EDGE) return { left: hole.right + GAP, top: sideTop };
  if (hole.left - GAP - width >= EDGE) return { left: hole.left - GAP - width, top: sideTop };
  // Last resort: inside the lit element along its bottom edge. The extra inset
  // keeps it above the iPhone home bar (the app draws edge to edge).
  return {
    left,
    bottom: `calc(${Math.max(EDGE, box.vh - hole.bottom + GAP)}px + env(safe-area-inset-bottom))`,
  };
}

/**
 * Dims the page, lights up the current step's target and shows its tooltip.
 * Draws only; `tour` comes from useTour(). Renders nothing while the target is
 * not on screen (still loading, or hidden on this layout), so a user is never
 * left behind a dimmed page with nothing to click.
 */
export default function TourOverlay({ tour }) {
  const { active, index, total, step, next, skip } = tour;
  const box = useTargetBox(active ? step?.selector : undefined, step?.block ?? "nearest");

  // The tooltip's real height. On a 320px phone the text wraps to more lines
  // than on desktop, so a fixed guess would let it run off the screen. It only
  // changes with the step's text or the screen width, so re-measure on those.
  const tooltipRef = useRef(null);
  const [tooltipH, setTooltipH] = useState(TOOLTIP_H);
  const viewportW = box?.vw;
  useLayoutEffect(() => {
    const h = tooltipRef.current?.offsetHeight;
    if (h && Math.abs(h - tooltipH) > 1) setTooltipH(h);
  }, [step, viewportW, tooltipH]);

  if (!active || !step || !box) return null;

  // The lit hole, clamped to the viewport.
  const hole = {
    top: clamp(box.top - PAD_Y, 0, box.vh),
    left: clamp(box.left - PAD_X, 0, box.vw),
    right: clamp(box.right + PAD_X, 0, box.vw),
    bottom: clamp(box.bottom + PAD_Y, 0, box.vh),
  };
  const width = Math.min(TOOLTIP_W, box.vw - 2 * EDGE);
  const place = placeTooltip(box, hole, width, tooltipH);

  // Four dim panels around the hole instead of one full-screen layer: the hole
  // stays empty, so clicks reach the real element underneath (active, not passive).
  const dim = "pointer-events-auto fixed z-60 bg-black/70";

  return createPortal(
    <>
      <div className={dim} style={{ top: 0, left: 0, right: 0, height: hole.top }} />
      <div className={dim} style={{ top: hole.bottom, left: 0, right: 0, bottom: 0 }} />
      <div
        className={dim}
        style={{ top: hole.top, left: 0, width: hole.left, height: hole.bottom - hole.top }}
      />
      <div
        className={dim}
        style={{ top: hole.top, left: hole.right, right: 0, height: hole.bottom - hole.top }}
      />
      <div
        className="pointer-events-none fixed z-60 rounded-2xl border border-dashed border-purple-500"
        style={{
          top: hole.top,
          left: hole.left,
          width: hole.right - hole.left,
          height: hole.bottom - hole.top,
        }}
      />

      <div
        ref={tooltipRef}
        role="region"
        aria-label="Guided tour"
        aria-live="polite"
        className="fixed z-60 rounded-xl border border-white/10 bg-[#111113] p-4 shadow-xl"
        // maxHeight + scroll: on a short screen (a phone in landscape) the
        // tooltip can be taller than the viewport; it scrolls instead of being cut off.
        style={{ width, maxHeight: "calc(100dvh - 2rem)", overflowY: "auto", ...place }}
      >
        <p className="text-sm font-medium text-purple-400">
          Step {index + 1} of {total}
        </p>
        <h2 className="mt-1 text-base font-semibold text-white">{step.title}</h2>
        <p className="mt-1 text-sm text-neutral-300">{step.body}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={skip}
            className="relative -ml-2 cursor-pointer px-2 text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 after:absolute after:-inset-y-3 after:inset-x-0"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-purple-400" : "bg-neutral-700"}`}
                />
              ))}
            </div>
            {["button", "both"].includes(step.advance ?? "button") && (
              <button
                type="button"
                onClick={next}
                className="relative cursor-pointer rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 after:absolute after:-inset-y-1.5 after:inset-x-0"
              >
                {index === total - 1 ? "Done" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
