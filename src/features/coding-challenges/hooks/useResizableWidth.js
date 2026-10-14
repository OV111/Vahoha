import { useRef, useState } from "react";

const KEY_STEP = 16;

const readStored = (key, fallback, min, max) => {
  try {
    const n = Number(localStorage.getItem(key));
    return n >= min && n <= max ? n : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Width of a side panel resized by dragging one of its edges.
 *
 * `edge` is the edge the handle sits on: "left" for a panel on the right of
 * the layout (drag left = wider), "right" for a panel on the left (drag right
 * = wider). `maxFor` lets the caller cap the width by what the rest of the
 * layout still needs, evaluated at drag time.
 *
 * Pointer capture keeps the drag alive when the cursor leaves the thin handle
 * (or the window), and works for mouse, touch and pen alike, so there are no
 * document-level listeners to add and clean up. The width is persisted on
 * release, not on every move, and the arrow keys resize too so the handle is
 * usable without a mouse.
 */
export default function useResizableWidth({
  storageKey,
  label,
  edge = "left",
  defaultWidth = 272,
  min = 220,
  max = 560,
  maxFor,
}) {
  const [width, setWidth] = useState(() => readStored(storageKey, defaultWidth, min, max));
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  // +1 when moving the pointer right should grow the panel.
  const dir = edge === "right" ? 1 : -1;
  const clamp = (v) => Math.max(min, Math.min(max, maxFor ? maxFor() : max, v));
  const persist = (w) => {
    try {
      localStorage.setItem(storageKey, String(w));
    } catch {
      /* not persisted */
    }
  };
  const commit = (w) => {
    const next = clamp(w);
    setWidth(next);
    persist(next);
  };

  const handleProps = {
    role: "separator",
    "aria-orientation": "vertical",
    "aria-label": label,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": width,
    tabIndex: 0,
    onPointerDown: (e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { startX: e.clientX, startWidth: width };
      setDragging(true);
    },
    onPointerMove: (e) => {
      if (!drag.current) return;
      setWidth(clamp(drag.current.startWidth + dir * (e.clientX - drag.current.startX)));
    },
    onPointerUp: () => {
      if (!drag.current) return;
      drag.current = null;
      setDragging(false);
      persist(width);
    },
    onKeyDown: (e) => {
      if (e.key === "ArrowRight") commit(width + dir * KEY_STEP);
      else if (e.key === "ArrowLeft") commit(width - dir * KEY_STEP);
      else return;
      e.preventDefault();
    },
    onDoubleClick: () => commit(defaultWidth),
  };

  // Grows (never shrinks) the panel, e.g. when its content needs more room.
  const ensureWidth = (w) => {
    if (width < w) commit(w);
  };

  return { width, dragging, handleProps, ensureWidth };
}
