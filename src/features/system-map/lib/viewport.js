// How the canvas frames a map. fitView zooms a small map in until it fills the
// canvas, which made the 4-part example look huge on a desktop, so the zoom is
// capped. On a phone the whole map is too small to read, so the zoom has a
// floor instead: a big map overflows and is panned, a small one still fits.
const PHONE = "(max-width: 639px)";

export const fitOptions = () =>
  typeof window !== "undefined" && window.matchMedia?.(PHONE).matches
    ? { padding: 0.06, minZoom: 0.45, maxZoom: 0.85 }
    : { padding: 0.3, maxZoom: 0.85 };
