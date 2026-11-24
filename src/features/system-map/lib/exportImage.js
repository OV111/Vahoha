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
 * Draws the 3D view, framed on the whole map rather than what's on screen. Its
 * layers are drawn one by one and stacked, like on the page.
 * html-to-image copies computed styles, so Tailwind colours survive in the file.
 * @param {HTMLElement} stage the element that holds the layers
 * @param {{ x: number, y: number, w: number, h: number }} box the map's bounds in svg units
 */
export async function renderIsoImage(stage, box, format) {
  const layers = [...(stage?.querySelectorAll(":scope > svg") ?? [])];
  if (!layers.length) throw new Error("nothing to export");
  const scale = Math.min(2, MAX_SIDE / box.w, MAX_SIDE / box.h);
  const width = Math.ceil(box.w * scale);
  const height = Math.ceil(box.h * scale);
  const onScreen = layers[0].getAttribute("viewBox");
  const whole = `${box.x} ${box.y} ${box.w} ${box.h}`;
  const options = { width, height, style: { width: `${width}px`, height: `${height}px`, position: "static" } };
  const draw = format === "svg" ? toSvg : toPng;
  layers.forEach((svg) => svg.setAttribute("viewBox", whole));
  let urls;
  try {
    urls = [];
    for (const svg of layers) urls.push(await draw(svg, { ...options, pixelRatio: 2 }));
  } finally {
    // Only where React hasn't re-rendered it meanwhile (a pan during the export).
    layers.forEach((svg) => svg.getAttribute("viewBox") === whole && svg.setAttribute("viewBox", onScreen));
  }

  if (format === "svg") {
    const images = urls.map((url) => `<image href="${url}" width="${width}" height="${height}"/>`).join("");
    const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${BACKGROUND}"/>${images}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
  }
  const pictures = await Promise.all(urls.map(loadImage));
  const canvas = Object.assign(document.createElement("canvas"), { width: pictures[0].width, height: pictures[0].height });
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const picture of pictures) ctx.drawImage(picture, 0, 0);
  return canvas.toDataURL("image/png");
}

const CARD = { w: 1200, h: 630, pad: 56 }; // the size LinkedIn and X show link and image previews at

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// The 3D map as a social image: the project name on top, the map in the middle,
// and where it was made at the bottom, so every share points back to the site.
export async function renderShareCard(stage, box, { title, by, site }) {
  const map = await loadImage(await renderIsoImage(stage, box, "png"));
  const canvas = Object.assign(document.createElement("canvas"), { width: CARD.w, height: CARD.h });
  const ctx = canvas.getContext("2d");
  const font = (weight, size) => `${weight} ${size}px "Geist Variable", ui-sans-serif, system-ui, sans-serif`;

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, CARD.w, CARD.h);
  const glow = ctx.createRadialGradient(CARD.w / 2, CARD.h / 2, 0, CARD.w / 2, CARD.h / 2, CARD.w / 1.6);
  glow.addColorStop(0, "rgb(147 51 234 / 0.18)");
  glow.addColorStop(1, "rgb(147 51 234 / 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD.w, CARD.h);

  const top = 130;
  const bottom = CARD.h - 80;
  const scale = Math.min((CARD.w - CARD.pad * 2) / map.width, (bottom - top) / map.height);
  const w = map.width * scale;
  const h = map.height * scale;
  ctx.drawImage(map, (CARD.w - w) / 2, top + (bottom - top - h) / 2, w, h);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#fcd34d";
  ctx.font = font(600, 18);
  ctx.fillText("PROJECT MAP", CARD.pad, 62);
  ctx.fillStyle = "#ffffff";
  ctx.font = font(800, 40);
  ctx.fillText(title, CARD.pad, 108, CARD.w - CARD.pad * 2);
  if (by) {
    ctx.fillStyle = "#a3a3a3";
    ctx.font = font(500, 20);
    ctx.textAlign = "right";
    ctx.fillText(by, CARD.w - CARD.pad, 62);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "#a3a3a3";
  ctx.font = font(500, 20);
  ctx.fillText("Mapped and verified on", CARD.pad, CARD.h - 36);
  const lead = ctx.measureText("Mapped and verified on ").width;
  ctx.fillStyle = "#c084fc";
  ctx.font = font(700, 20);
  ctx.fillText(site, CARD.pad + lead, CARD.h - 36);
  return canvas.toDataURL("image/png");
}

/** Saves a data URL or blob URL under `filename`. */
export function downloadUrl(url, filename) {
  Object.assign(document.createElement("a"), { href: url, download: filename }).click();
}
