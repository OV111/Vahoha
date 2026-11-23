// Draws the whole map (not just the part on screen) to a PNG or SVG file.
// Follows React Flow's "download image" recipe: frame every node, then render
// the viewport element at that frame with html-to-image.

import { getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { toPng, toSvg } from "html-to-image";

const PADDING = 48; // px of empty canvas around the parts
const MAX_SIDE = 4096; // big maps are scaled down rather than making a huge file
const BACKGROUND = "#050505"; // the canvas colour on the page

// Editing chrome that should not be in a picture: the delete button on the
// selected part and the connection dots.
const keep = (el) => !(el.classList?.contains("nodrag") || el.classList?.contains("react-flow__handle"));

/**
 * @param {HTMLElement} container the element that holds the React Flow canvas
 * @param {object[]} nodes React Flow nodes (measured, so bounds are right)
 * @param {"png" | "svg"} format
 * @returns {Promise<string>} a data URL
 */
export async function renderMapImage(container, nodes, format) {
  const viewport = container.querySelector(".react-flow__viewport");
  if (!viewport || nodes.length === 0) throw new Error("nothing to export");

  const bounds = getNodesBounds(nodes);
  const scale = Math.min(1, MAX_SIDE / (bounds.width + PADDING * 2), MAX_SIDE / (bounds.height + PADDING * 2));
  const width = Math.ceil((bounds.width + PADDING * 2) * scale);
  const height = Math.ceil((bounds.height + PADDING * 2) * scale);
  // padding 0 here: PADDING is already in width/height, so the frame is exact.
  const { x, y, zoom } = getViewportForBounds(bounds, width - PADDING * 2 * scale, height - PADDING * 2 * scale, 0.05, 2, 0);

  const options = {
    backgroundColor: BACKGROUND,
    width,
    height,
    filter: keep,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x + PADDING * scale}px, ${y + PADDING * scale}px) scale(${zoom})`,
    },
  };
  return format === "svg" ? toSvg(viewport, options) : toPng(viewport, { ...options, pixelRatio: 2 });
}

/**
 * Draws the 3D view's svg, framed on the whole map rather than what's on screen.
 * html-to-image copies computed styles, so Tailwind colours survive in the file.
 * @param {SVGSVGElement} svg
 * @param {{ x: number, y: number, w: number, h: number }} box the map's bounds in svg units
 */
export async function renderIsoImage(svg, box, format) {
  if (!svg) throw new Error("nothing to export");
  const scale = Math.min(2, MAX_SIDE / box.w, MAX_SIDE / box.h);
  const width = Math.ceil(box.w * scale);
  const height = Math.ceil(box.h * scale);
  const onScreen = svg.getAttribute("viewBox");
  const whole = `${box.x} ${box.y} ${box.w} ${box.h}`;
  svg.setAttribute("viewBox", whole);
  const options = { backgroundColor: BACKGROUND, width, height, style: { width: `${width}px`, height: `${height}px` } };
  try {
    return format === "svg" ? await toSvg(svg, options) : await toPng(svg, options);
  } finally {
    // Only if React hasn't re-rendered it meanwhile (a pan during the export).
    if (svg.getAttribute("viewBox") === whole) svg.setAttribute("viewBox", onScreen);
  }
}

/** Saves a data URL or blob URL under `filename`. */
export function downloadUrl(url, filename) {
  Object.assign(document.createElement("a"), { href: url, download: filename }).click();
}
