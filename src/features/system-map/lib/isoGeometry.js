// 2:1 isometric maths for the 3D view. World units are floor tiles; one tile is
// a 28x14 diamond on screen. Pure, so the shapes can be reasoned about apart
// from React.

import { DEFAULT_SIZE } from "./edgeRouting";
import { shapeOf } from "../../../../constants/isoShapes";

export const TILE_W = 14;
export const TILE_H = 7;

export const iso = (x, y, z = 0) => ({ x: (x - y) * TILE_W, y: (x + y) * TILE_H - z });

export const PX_PER_TILE = 22; // flat-canvas pixels per floor tile

// The floor is turned a quarter: left-to-right on the flat map climbs up-right
// here, and top-to-bottom runs down-right. So the users (usually drawn on the
// left) stand at the bottom-left and requests travel up into the scene.
export const worldOf = (node) => ({
  x: (node.position.y + DEFAULT_SIZE.height / 2) / PX_PER_TILE,
  y: -(node.position.x + DEFAULT_SIZE.width / 2) / PX_PER_TILE,
});

const round1 = (n) => Math.round(n * 10) / 10;

function toward(p, q, r) {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const k = Math.min(r, len / 2) / len;
  return { x: p.x + dx * k, y: p.y + dy * k };
}

/** A closed path through the points with every corner rounded by a Q curve. */
export function roundedPath(points, r) {
  const n = points.length;
  let d = "";
  points.forEach((p, i) => {
    const a = toward(p, points[(i - 1 + n) % n], r);
    const b = toward(p, points[(i + 1) % n], r);
    d += `${i ? "L" : "M"}${round1(a.x)} ${round1(a.y)} Q${round1(p.x)} ${round1(p.y)} ${round1(b.x)} ${round1(b.y)} `;
  });
  return `${d}Z`;
}

/**
 * The faces of a box standing at (cx, cy), `half` tiles from centre to edge
 * along x and `depth` along y, `height` px tall, its bottom lifted `z` px.
 * Only the two front sides are ever seen, so the silhouette is one hexagon and
 * the right side is shaded on top of it.
 */
export function boxFaces(cx, cy, half, height, depth = half, z = 0) {
  const n = iso(cx - half, cy - depth, z);
  const e = iso(cx + half, cy - depth, z);
  const s = iso(cx + half, cy + depth, z);
  const w = iso(cx - half, cy + depth, z);
  const up = (p) => ({ x: p.x, y: p.y - height });
  return {
    silhouette: [up(w), up(n), up(e), e, s, w],
    left: [up(w), up(s), s, w],
    right: [up(s), up(e), e, s],
    top: [up(n), up(e), up(s), up(w)],
    topCenter: iso(cx, cy, z + height),
    base: s,
    w,
    s,
    e,
  };
}

/** A round thing on the floor: its centre and the radii of the ellipse it projects to. */
export function isoCircle(cx, cy, r, z = 0) {
  const c = iso(cx, cy, z);
  return { ...c, rx: r * TILE_W * Math.SQRT2, ry: r * TILE_H * Math.SQRT2 };
}

/** A wire that follows the floor axes: along x first, then along y. */
export function isoWire(a, b) {
  const pts = [iso(a.x, a.y), iso(b.x, a.y), iso(b.x, b.y)];
  const d = `M${pts.map((p) => `${round1(p.x)} ${round1(p.y)}`).join(" L")}`;
  return { d, at: sampler(pts) };
}

// Point at fraction t (0..1) of the way along a polyline, by length.
function sampler(pts) {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
  const total = lens.reduce((sum, l) => sum + l, 0) || 1;
  return (t) => {
    let left = t * total;
    for (let i = 0; i < lens.length; i += 1) {
      if (left <= lens[i] || i === lens.length - 1) {
        const k = lens[i] ? Math.min(left / lens[i], 1) : 0;
        return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * k, y: pts[i].y + (pts[i + 1].y - pts[i].y) * k };
      }
      left -= lens[i];
    }
    return pts[pts.length - 1];
  };
}

/** The highest point of a shape on screen, so its pill floats clear of it. */
export const shapeTop = (def, world) => iso(world.x, world.y, def.height).y - def.half * 2 * TILE_H - (def.extra ?? 0);

/** Corner points that bound a shape on screen, for fitting the view. */
export const shapeBounds = (def, world) => boxFaces(world.x, world.y, def.half, def.height + (def.extra ?? 0), def.depth ?? def.half).silhouette;

const MARGIN = 70; // svg units of floor around the map when it is framed

// The outline of every shape plus room for its pill.
export function fitBox(nodes) {
  const xs = [];
  const ys = [];
  for (const n of nodes) {
    for (const p of shapeBounds(shapeOf(n.data.kind), worldOf(n))) {
      xs.push(p.x);
      ys.push(p.y);
    }
  }
  if (!xs.length) return { x: -300, y: -200, w: 600, h: 400 };
  return {
    x: Math.min(...xs) - MARGIN,
    y: Math.min(...ys) - MARGIN - 40,
    w: Math.max(...xs) - Math.min(...xs) + MARGIN * 2,
    h: Math.max(...ys) - Math.min(...ys) + MARGIN * 2 + 40,
  };
}

// A drag on screen, in svg units, back to a whole number of floor tiles.
export const screenToTiles = (dx, dy) => ({
  x: Math.round((dx / TILE_W + dy / TILE_H) / 2),
  y: Math.round((dy / TILE_H - dx / TILE_W) / 2),
});
