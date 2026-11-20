import { useEffect, useRef } from "react";

// Grid offsets for small 8-bit shapes: lone pixels, bars, L-shapes, steps and chips.
const SHAPES = [
  [[0, 0]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1], [1, 1]],
  [[0, 0], [1, 0], [0, 1]],
  [[0, 0], [1, 0], [1, 1], [2, 1]],
  [[0, 0], [0, 1], [1, 1], [2, 1]],
  [[1, 0], [0, 1], [1, 1], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]],
  [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  [[0, 0], [1, 0], [0, 1], [1, 1]],
];

// Violet shades, base tone weighted heaviest so clusters read as one colour with texture.
const TONES = ["#8b5cf6", "#8b5cf6", "#8b5cf6", "#7c3aed", "#a78bfa"];
const GLINT = "#ddd6fe";
const GLINT_CHANCE = 0.06;
const DEFAULT_SAFE_ZONES = "h1, h2, h3, h4, p, a, button, img, svg, li, span, [data-pixel-safe]";

const BLOCK_GAP = 1;
const STEP_MS = 70;
const MIN_BAND = 48;
const MOBILE_MAX = 768;
const CLUSTER_PAD = 32;
const SAFE_PAD = 64;
const SPAWN_TRIES = 20;
const RETRY_MS = 800;
const ZONES_TTL_MS = 1000;
const EDGE_ALPHA = 1;
const INNER_ALPHA = 0.4;

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const snap = (v, size) => Math.round(v / size) * size;
const overlaps = (a, b, pad) =>
  a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function shapeBox(shape, size) {
  const cols = Math.max(...shape.map(([gx]) => gx)) + 1;
  const rows = Math.max(...shape.map(([, gy]) => gy)) + 1;
  return { w: cols * size, h: rows * size };
}

function buildCluster({ x, y, shape, size, alpha, now, isStatic }) {
  const blocks = shuffle(
    shape.map(([gx, gy]) => ({
      x: gx * size,
      y: gy * size,
      color: Math.random() < GLINT_CHANCE ? GLINT : pick(TONES),
      // Lone pixels stay solid; holes only read on blocks that have neighbours.
      detail: shape.length > 2 && Math.random() < 0.25 ? pick(["dot", "hollow"]) : null,
    })),
  );

  const appearEnd = blocks.length * STEP_MS;
  const hold = rand(2000, 4000);
  return {
    x,
    y,
    ...shapeBox(shape, size),
    size,
    alpha,
    blocks,
    born: isStatic ? now - appearEnd : now + rand(0, 2000),
    leaveAt: appearEnd + hold,
    end: appearEnd + hold + blocks.length * STEP_MS,
  };
}

// Hard on/off steps, no fades: each block pops in, then pops out in the same order.
function blockOn(cluster, i, now, isStatic) {
  if (isStatic) return true;
  const t = now - cluster.born;
  return t >= i * STEP_MS && t < cluster.leaveAt + i * STEP_MS;
}

/**
 * Animated 8-bit pixel clusters on a shared grid: mostly in the left and right bands
 * of the parent, plus a few dimmer ones in the middle that keep clear of `safeZoneSelector`
 * elements. Side clusters fade as they near the content. The parent must be `position: relative`.
 */
export default function PixelBackground({
  blockSize = 8,
  sideDensity = 2,
  centerDensity = 1,
  safeZoneSelector = DEFAULT_SAFE_ZONES,
  bandWidth = 200,
  contentWidth = 640,
  topOffset = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let band = 0;
    let slots = [];
    let zones = [];
    let zonesAt = -Infinity;
    let frame = 0;
    let visible = true;
    let lastKey = "";

    // Draw in whole device pixels so edges and holes stay sharp at 125%/150% zoom.
    const px = (v) => Math.round(v * dpr);
    const rect = (x, y, w, h) => {
      const x0 = px(x);
      const y0 = px(y);
      return [x0, y0, px(x + w) - x0, px(y + h) - y0];
    };

    const readZones = (now) => {
      if (now - zonesAt < ZONES_TTL_MS) return zones;
      const parentRect = canvas.parentElement.getBoundingClientRect();
      zones = [...canvas.parentElement.querySelectorAll(safeZoneSelector)]
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height > 0)
        .map((r) => ({ x: r.left - parentRect.left, y: r.top - parentRect.top, w: r.width, h: r.height }));
      zonesAt = now;
      return zones;
    };

    const isFree = (box, now, checkZones) => {
      if (slots.some((s) => s.cluster && overlaps(box, s.cluster, CLUSTER_PAD))) return false;
      return !checkZones || !readZones(now).some((z) => overlaps(box, z, SAFE_PAD));
    };

    const alphaFor = (kind, x, w) => {
      if (kind === "center") return rand(0.45, 0.65);
      const fromEdge = kind === "left" ? x + w / 2 : width - (x + w / 2);
      const t = Math.min(1, fromEdge / band);
      return EDGE_ALPHA + (INNER_ALPHA - EDGE_ALPHA) * t;
    };

    const spawn = (kind, now) => {
      const isStatic = reduceMotion.matches;
      const size = blockSize;
      const top = Math.max(size, topOffset);
      for (let i = 0; i < SPAWN_TRIES; i += 1) {
        const shape = pick(SHAPES);
        const { w, h } = shapeBox(shape, size);
        const maxY = height - h - size;
        if (maxY < top) return null;
        let minX;
        let maxX;
        if (kind === "left") [minX, maxX] = [0, band - w];
        else if (kind === "right") [minX, maxX] = [width - band, width - w];
        else [minX, maxX] = [band + SAFE_PAD, width - band - SAFE_PAD - w];
        if (maxX < minX) return null;
        // Everything snaps to one grid, so separate clusters still line up like pixels on a screen.
        const x = Math.min(Math.max(snap(rand(minX, maxX), size), minX), maxX);
        const y = snap(rand(top, maxY), size);
        if (isFree({ x, y, w, h }, now, kind === "center")) {
          return buildCluster({ x, y, shape, size, alpha: alphaFor(kind, x, w), now, isStatic });
        }
      }
      return null;
    };

    const fill = (slot, now) => {
      slot.cluster = null;
      slot.cluster = spawn(slot.kind, now);
      slot.retryAt = now + RETRY_MS;
    };

    const seed = (now) => {
      slots = [];
      zonesAt = -Infinity;
      if (width < MOBILE_MAX) return;
      const kinds = [];
      if (band >= MIN_BAND) {
        for (let i = 0; i < sideDensity; i += 1) kinds.push("left", "right");
      }
      for (let i = 0; i < centerDensity; i += 1) kinds.push("center");
      for (const kind of kinds) {
        const slot = { kind, cluster: null, retryAt: 0 };
        slots.push(slot);
        fill(slot, now);
      }
    };

    const drawBlock = (x, y, size, block) => {
      // A thin gap between neighbours keeps each block reading as its own pixel.
      const s = size - BLOCK_GAP;
      ctx.fillStyle = block.color;
      ctx.fillRect(...rect(x, y, s, s));
      if (!block.detail) return;
      // Holes are cleared, not painted, so the real page background shows through.
      const inset = Math.max(2, Math.round(s / 4));
      if (block.detail === "dot") ctx.clearRect(...rect(x + (s - inset) / 2, y + (s - inset) / 2, inset, inset));
      else ctx.clearRect(...rect(x + inset, y + inset, s - inset * 2, s - inset * 2));
    };

    const draw = (now, force = false) => {
      const isStatic = reduceMotion.matches;
      // Blocks only change on step boundaries, so most frames have nothing new to paint.
      let key = "";
      for (const { cluster: c } of slots) {
        if (!c) continue;
        for (let i = 0; i < c.blocks.length; i += 1) key += blockOn(c, i, now, isStatic) ? "1" : "0";
        key += "|";
      }
      if (!force && key === lastKey) return;
      lastKey = key;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const { cluster: c } of slots) {
        if (!c) continue;
        ctx.globalAlpha = c.alpha;
        c.blocks.forEach((b, i) => {
          if (blockOn(c, i, now, isStatic)) drawBlock(c.x + b.x, c.y + b.y, c.size, b);
        });
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      for (const slot of slots) {
        const done = slot.cluster && now - slot.cluster.born > slot.cluster.end;
        const retry = !slot.cluster && now >= slot.retryAt;
        if (done || retry) fill(slot, now);
      }
      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      stop();
      if (!visible || slots.length === 0) return;
      draw(performance.now(), true);
      if (!reduceMotion.matches) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const box = canvas.parentElement.getBoundingClientRect();
      const widthChanged = box.width !== width;
      dpr = window.devicePixelRatio || 1;
      width = box.width;
      height = box.height;
      // Side bands shrink with the screen so edge clusters never reach the content column.
      band = Math.min(bandWidth, Math.max(0, (width - contentWidth) / 2));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.imageSmoothingEnabled = false;
      // Height-only changes (lazy sections loading in) keep the live clusters instead of reshuffling.
      if (widthChanged || slots.length === 0) seed(performance.now());
      start();
    };

    const reset = () => {
      slots = [];
      resize();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);

    // Off-screen sections stop animating; rAF already pauses on hidden tabs.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    intersectionObserver.observe(canvas);

    reduceMotion.addEventListener("change", reset);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reduceMotion.removeEventListener("change", reset);
    };
  }, [blockSize, sideDensity, centerDensity, safeZoneSelector, bandWidth, contentWidth, topOffset]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
    />
  );
}
