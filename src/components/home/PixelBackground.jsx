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

// One hue, the purple from the hero underline (RiseText.css), so the pixels read as the
// brand instead of a second accent. Depth comes from the shade ladder, not extra colours.
const BASE = hexToRgb("#c86bff");
const WHITE = [255, 255, 255];
const FALLBACK_BG = [9, 9, 11];
// Solid shade ladder, mid weighted heaviest: -1 sinks toward the page, +1 lifts toward white.
// Solid mixes instead of transparency, which turns bright hues dusty on a dark page.
const SHADES = [-0.6, -0.6, 0, 0, 0, 0.5];
const SHADE_DEEP = 0.55;
const SHADE_LIGHT = 0.45;
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
// Strength is how far a pixel's colour sits from the page background. Capped well below
// full so the decoration never outshines the headline or the white call to action.
const EDGE_STRENGTH = 0.7;
const INNER_STRENGTH = 0.35;
const CENTER_STRENGTH = [0.3, 0.42];

// Cursor swarm: pixels near the mouse leave their cluster and gather round it, and spark
// pixels pop in beside it so the swarm still shows over empty stretches of the page.
const PULL_RADIUS = 200;
// Wider than the pull radius so a block on the edge doesn't flicker between swarm and home.
const RELEASE_RADIUS = 300;
const ORBIT_MIN = 1.5;
const ORBIT_MAX = 5;
const PULL_MS = 110;
const RETURN_MS = 260;
const IDLE_MS = 900;
const SPARK_MAX = 14;
const SPARK_EVERY_MS = 40;
const SPARK_LAG_MS = [60, 240];
const REORBIT_MS = [350, 900];
const SWARM_STRENGTH = 0.8;
const SWARM_DIM_STRENGTH = 0.22;
// The swarm head is lightest and the tail sinks deeper and dimmer, so the comet reads at a glance.
const SWARM_HEAD_SHADE = 0.8;
const SWARM_TAIL_SHADE = -0.7;
const TAIL_FADE = 0.45;
// Pixels flash white for a beat when they join the swarm, in two hard steps like the rest.
const ARRIVE_GLINT_MS = 180;
const ARRIVE_GLINT = 0.75;
const DIM_MS = 150;
const POINTER_PAD = 8;
// A long frame (tab switch, GC pause) would otherwise teleport the swarm.
const MAX_DT = 50;
const ORBIT_TRIES = 12;
// Fast moves stretch the swarm into a comet tail behind the cursor.
const VELOCITY_MS = 90;
const TRAIL_MS = 90;
const TRAIL_MAX = 140;

const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const snap = (v, size) => Math.round(v / size) * size;
const ease = (dt, ms) => 1 - Math.exp(-dt / ms);
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
const swarmShade = (depth) => lerp(SWARM_HEAD_SHADE, SWARM_TAIL_SHADE, depth);
const overlaps = (a, b, pad) =>
  a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// 1 for the first half of the glint, 0.5 for the second, then 0.
function glintAt(since, now) {
  const t = (now - since) / ARRIVE_GLINT_MS;
  return t >= 0 && t < 1 ? Math.ceil((1 - t) * 2) / 2 : 0;
}

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

// A grid-snapped spot around the cursor; ORBIT_MIN keeps the cell under the arrow tip empty.
function makeOrbit(size) {
  const angle = rand(0, Math.PI * 2);
  const r = rand(ORBIT_MIN, ORBIT_MAX) * size;
  return { x: snap(Math.cos(angle) * r, size), y: snap(Math.sin(angle) * r, size) };
}

const orbitKey = (o) => `${o.x},${o.y}`;
// Skewed toward 0 so most of the swarm stays near the cursor and only a few pixels form the tail.
const rollDepth = () => Math.random() ** 1.5;

function buildCluster({ x, y, shape, size, strength, now, isStatic }) {
  const blocks = shuffle(
    shape.map(([gx, gy]) => ({
      x: gx * size,
      y: gy * size,
      shade: pick(SHADES),
      // Lone pixels stay solid; holes only read on blocks that have neighbours.
      detail: shape.length > 2 && Math.random() < 0.25 ? pick(["dot", "hollow"]) : null,
      pos: { x: x + gx * size, y: y + gy * size },
      pull: 0,
      held: false,
      orbit: null,
      depth: 0,
      joinedAt: -Infinity,
    })),
  );

  const appearEnd = blocks.length * STEP_MS;
  const hold = rand(2000, 4000);
  return {
    x,
    y,
    ...shapeBox(shape, size),
    size,
    strength,
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
 * elements. One brand purple in solid shades; side clusters sink toward
 * the background as they near the content. With `interactive`, pixels swarm
 * around the mouse, trailing behind fast moves, and step back home once it rests.
 * The parent must be `position: relative`.
 */
export default function PixelBackground({
  blockSize = 8,
  sideDensity = 2,
  centerDensity = 1,
  safeZoneSelector = DEFAULT_SAFE_ZONES,
  bandWidth = 200,
  contentWidth = 640,
  topOffset = 0,
  interactive = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;

    const parent = canvas.parentElement;
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
    let lastNow = 0;

    const pointer = { clientX: 0, clientY: 0, inside: false, movedAt: -Infinity };
    let sparks = [];
    let lastSparkAt = -Infinity;
    let lastPopAt = -Infinity;
    let swarmStrength = SWARM_STRENGTH;
    let bg = FALLBACK_BG;
    // Orbit cells in use, so no two swarm pixels stack on one spot.
    const taken = new Set();
    let velocity = { x: 0, y: 0 };
    let lastPoint = null;

    const claimOrbit = () => {
      let orbit = makeOrbit(blockSize);
      for (let i = 1; i < ORBIT_TRIES && taken.has(orbitKey(orbit)); i += 1) orbit = makeOrbit(blockSize);
      taken.add(orbitKey(orbit));
      return orbit;
    };
    const releaseOrbit = (orbit) => {
      if (orbit) taken.delete(orbitKey(orbit));
    };

    // Any CSS colour syntax (oklch included) is resolved to RGB by painting it on a 1x1 canvas.
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const readBackground = () => {
      for (let el = parent; el; el = el.parentElement) {
        const color = getComputedStyle(el).backgroundColor;
        if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") continue;
        probe.clearRect(0, 0, 1, 1);
        probe.fillStyle = color;
        probe.fillRect(0, 0, 1, 1);
        const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
        return [r, g, b];
      }
      return FALLBACK_BG;
    };

    const paint = (shade, strength, glint) => {
      let c = shade >= 0 ? mix(BASE, WHITE, SHADE_LIGHT * shade) : mix(BASE, bg, SHADE_DEEP * -shade);
      c = mix(bg, c, strength);
      if (glint > 0) c = mix(c, WHITE, ARRIVE_GLINT * glint * (swarmStrength / SWARM_STRENGTH));
      return `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;
    };

    // Draw in whole device pixels so edges and holes stay sharp at 125%/150% zoom.
    const px = (v) => Math.round(v * dpr);
    const rect = (x, y, w, h) => {
      const x0 = px(x);
      const y0 = px(y);
      return [x0, y0, px(x + w) - x0, px(y + h) - y0];
    };

    const readZones = (now) => {
      if (now - zonesAt < ZONES_TTL_MS) return zones;
      const parentRect = parent.getBoundingClientRect();
      zones = [...parent.querySelectorAll(safeZoneSelector)]
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

    const strengthFor = (kind, x, w) => {
      if (kind === "center") return rand(...CENTER_STRENGTH);
      const fromEdge = kind === "left" ? x + w / 2 : width - (x + w / 2);
      return lerp(EDGE_STRENGTH, INNER_STRENGTH, Math.min(1, fromEdge / band));
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
          return buildCluster({ x, y, shape, size, strength: strengthFor(kind, x, w), now, isStatic });
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
      sparks = [];
      taken.clear();
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

    // Where the mouse is in parent coordinates, whether or not it has moved lately.
    const pointAt = () => {
      if (!pointer.inside) return null;
      const box = parent.getBoundingClientRect();
      return { x: pointer.clientX - box.left, y: pointer.clientY - box.top };
    };

    const updateVelocity = (dt, aim) => {
      const inst =
        aim && lastPoint && dt > 0
          ? { x: (aim.x - lastPoint.x) / dt, y: (aim.y - lastPoint.y) / dt }
          : { x: 0, y: 0 };
      const k = ease(dt, VELOCITY_MS);
      velocity = { x: velocity.x + (inst.x - velocity.x) * k, y: velocity.y + (inst.y - velocity.y) * k };
      lastPoint = aim;
    };

    // The full tail offset behind the cursor; each pixel takes its own `depth` share of it.
    const trailOffset = () => {
      const speed = Math.hypot(velocity.x, velocity.y);
      if (speed < 0.05) return { x: 0, y: 0 };
      const len = Math.min(TRAIL_MAX, speed * TRAIL_MS);
      return { x: (-velocity.x / speed) * len, y: (-velocity.y / speed) * len };
    };

    const updateSwarmStrength = (now, dt, point) => {
      // Over text or buttons the swarm fades so it never competes with what's being read.
      const overZone =
        point &&
        readZones(now).some(
          (z) =>
            point.x >= z.x - POINTER_PAD &&
            point.x <= z.x + z.w + POINTER_PAD &&
            point.y >= z.y - POINTER_PAD &&
            point.y <= z.y + z.h + POINTER_PAD,
        );
      const target = overZone ? SWARM_DIM_STRENGTH : SWARM_STRENGTH;
      swarmStrength += (target - swarmStrength) * ease(dt, DIM_MS);
    };

    // Returns true while the block is away from home, so its cluster knows to wait.
    const moveBlock = (c, b, i, now, dt, aim, trail) => {
      const homeX = c.x + b.x;
      const homeY = c.y + b.y;
      let held = false;
      if (aim && blockOn(c, i, now, false)) {
        const d = Math.hypot(homeX + c.size / 2 - aim.x, homeY + c.size / 2 - aim.y);
        held = d < (b.held ? RELEASE_RADIUS : PULL_RADIUS);
      }
      if (held && !b.held) {
        b.orbit = claimOrbit();
        b.depth = rollDepth();
        b.joinedAt = now;
      }
      if (!held && b.held) {
        releaseOrbit(b.orbit);
        b.orbit = null;
      }
      b.held = held;

      const tx = held ? aim.x - c.size / 2 + b.orbit.x + trail.x * b.depth : homeX;
      const ty = held ? aim.y - c.size / 2 + b.orbit.y + trail.y * b.depth : homeY;
      const k = ease(dt, held ? PULL_MS : RETURN_MS);
      b.pos.x += (tx - b.pos.x) * k;
      b.pos.y += (ty - b.pos.y) * k;
      b.pull += ((held ? 1 : 0) - b.pull) * k;
      if (!held && Math.abs(b.pos.x - homeX) < 0.5 && Math.abs(b.pos.y - homeY) < 0.5) {
        b.pos.x = homeX;
        b.pos.y = homeY;
        b.pull = 0;
      }
      return held || b.pull > 0;
    };

    // Returns true while any spark is on screen.
    const updateSparks = (now, dt, aim, trail) => {
      const size = blockSize;
      if (aim && sparks.length < SPARK_MAX && now - lastSparkAt > SPARK_EVERY_MS) {
        const orbit = claimOrbit();
        sparks.push({
          x: aim.x - size / 2 + orbit.x,
          y: aim.y - size / 2 + orbit.y,
          orbit,
          depth: rollDepth(),
          lag: rand(...SPARK_LAG_MS),
          reorbitAt: now + rand(...REORBIT_MS),
          joinedAt: now,
        });
        lastSparkAt = now;
      }
      // Once the mouse rests or leaves, sparks pop out one per step, like cluster blocks do.
      if (!aim && sparks.length > 0 && now - lastPopAt > STEP_MS) {
        const [gone] = sparks.splice(Math.floor(Math.random() * sparks.length), 1);
        releaseOrbit(gone.orbit);
        lastPopAt = now;
      }

      if (!aim) return sparks.length > 0;

      for (const s of sparks) {
        // Sparks hop to new spots now and then so a still swarm keeps shimmering.
        if (now >= s.reorbitAt) {
          releaseOrbit(s.orbit);
          s.orbit = claimOrbit();
          s.reorbitAt = now + rand(...REORBIT_MS);
        }
        const k = ease(dt, s.lag);
        s.x += (aim.x - size / 2 + s.orbit.x + trail.x * s.depth - s.x) * k;
        s.y += (aim.y - size / 2 + s.orbit.y + trail.y * s.depth - s.y) * k;
      }
      return sparks.length > 0;
    };

    const drawBlock = (x, y, size, block, color) => {
      // A thin gap between neighbours keeps each block reading as its own pixel.
      const s = size - BLOCK_GAP;
      ctx.fillStyle = color;
      ctx.fillRect(...rect(x, y, s, s));
      if (!block.detail) return;
      // Holes are cleared, not painted, so the real page background shows through.
      const inset = Math.max(2, Math.round(s / 4));
      if (block.detail === "dot") ctx.clearRect(...rect(x + (s - inset) / 2, y + (s - inset) / 2, inset, inset));
      else ctx.clearRect(...rect(x + inset, y + inset, s - inset * 2, s - inset * 2));
    };

    const draw = (now, force = false) => {
      const isStatic = reduceMotion.matches;
      // Blocks only change on step boundaries, so most idle frames have nothing new to paint.
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
        c.blocks.forEach((b, i) => {
          if (!blockOn(c, i, now, isStatic)) return;
          // In flight, blocks snap to the grid every frame so they hop like pixels instead of gliding.
          const x = b.pull > 0 ? snap(b.pos.x, c.size) : c.x + b.x;
          const y = b.pull > 0 ? snap(b.pos.y, c.size) : c.y + b.y;
          const shade = lerp(b.shade, swarmShade(b.depth), b.pull);
          const strength = lerp(c.strength, swarmStrength * (1 - TAIL_FADE * b.depth), b.pull);
          drawBlock(x, y, c.size, b, paint(shade, strength, glintAt(b.joinedAt, now)));
        });
      }
      for (const s of sparks) {
        const x = snap(s.x, blockSize);
        const strength = swarmStrength * (1 - TAIL_FADE * s.depth);
        drawBlock(x, snap(s.y, blockSize), blockSize, s, paint(swarmShade(s.depth), strength, glintAt(s.joinedAt, now)));
      }
    };

    const tick = (now) => {
      const dt = Math.min(MAX_DT, now - lastNow);
      lastNow = now;
      const point = pointAt();
      const aim = point && now - pointer.movedAt <= IDLE_MS ? point : null;
      updateVelocity(dt, aim);
      const trail = trailOffset();
      updateSwarmStrength(now, dt, point);
      let moving = updateSparks(now, dt, aim, trail);

      for (const slot of slots) {
        const c = slot.cluster;
        if (c) {
          let away = false;
          c.blocks.forEach((b, i) => {
            if (moveBlock(c, b, i, now, dt, aim, trail)) away = true;
          });
          // The cluster's clock pauses while any block is away, so nothing pops out mid-swarm.
          if (away) {
            c.born += dt;
            moving = true;
          }
        }
        const done = c && now - c.born > c.end;
        const retry = !c && now >= slot.retryAt;
        if (done || retry) fill(slot, now);
      }
      draw(now, moving);
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      stop();
      if (!visible || slots.length === 0) return;
      lastNow = performance.now();
      draw(lastNow, true);
      if (!reduceMotion.matches) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const box = parent.getBoundingClientRect();
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
      bg = readBackground();
      // Height-only changes (lazy sections loading in) keep the live clusters instead of reshuffling.
      if (widthChanged || slots.length === 0) seed(performance.now());
      start();
    };

    const reset = () => {
      slots = [];
      resize();
    };

    // Touch has no hover, and reduced motion means no chasing pixels either.
    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse" || reduceMotion.matches) return;
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      pointer.inside = true;
      pointer.movedAt = performance.now();
    };
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    if (interactive) {
      parent.addEventListener("pointermove", onPointerMove, { passive: true });
      parent.addEventListener("pointerleave", onPointerLeave);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

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
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [blockSize, sideDensity, centerDensity, safeZoneSelector, bandWidth, contentWidth, topOffset, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
    />
  );
}
