// How the canvas frames a map. fitView zooms a small map in until it fills the
// canvas, which made the 4-part example look huge on a desktop, so the zoom is
// capped. On a phone the whole map is too small to read, so the zoom has a
// floor instead: a big map overflows and is panned, a small one still fits.
const PHONE = "(max-width: 639px)";
const ISO_PHONE_SCALE = 0.5; // smallest the 3D view opens at on a phone, in screen px per drawing unit

export const isPhone = () => typeof window !== "undefined" && Boolean(window.matchMedia?.(PHONE).matches);

/** How far the 3D view zooms in when it opens, given the scale that would show the whole map. */
export const isoStartZoom = (fitScale) => (isPhone() ? Math.max(1, ISO_PHONE_SCALE / fitScale) : 1);

export const fitOptions = () =>
  isPhone()
    ? { padding: 0.06, minZoom: 0.45, maxZoom: 0.85 }
    : { padding: 0.3, maxZoom: 0.85 };
