import { memo } from "react";
import { Box as BoxIcon } from "lucide-react";
import { KIND_ICONS, kindColor, kindInfo } from "../lib/nodeKinds";
import { TILE_W, boxFaces, iso, isoCircle, roundedPath, shapeTop, worldOf } from "../lib/isoGeometry";
import { DEAD_COLOR, isDown, shapeOf } from "../../../../constants/isoShapes";

// One drawing per shape in constants/isoShapes.js. Every shape is lit the same
// way (top from the "-top" gradient, sides from "-side", the right side shaded
// darker) so they read as one scene even though no two look alike.

const CORNER = 5;
const SLOT = "rgb(0 0 0 / 0.35)";
const CROWD_COLORS = ["#c4b5fd", "#fdba74", "#93c5fd", "#6ee7b7", "#f9a8d4", "#fde68a"];
const CROWD_STEPS = [-1.7, -0.85, 0, 0.85, 1.7];

const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const lift = (p, z) => `${p.x} ${p.y - z}`;
const short = (text, max) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);
const mix = (color, pct, base = "#0a0a0a") => `color-mix(in oklab, ${color} ${pct}%, ${base})`;

export function Gradients({ id, color }) {
  return (
    <>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" style={{ stopColor: mix(color, 62) }} />
        <stop offset="1" style={{ stopColor: mix(color, 48) }} />
      </linearGradient>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: mix(color, 36) }} />
        <stop offset="1" style={{ stopColor: mix(color, 22, "#000") }} />
      </linearGradient>
    </>
  );
}

// A soft dark ellipse on the floor. A gradient, not a blur filter: blurs are
// repainted every frame while the request dots move over them.
function Shadow({ x, y, rx, id }) {
  return <ellipse cx={x} cy={y + 6} rx={rx} ry={rx * 0.55} fill={`url(#${id})`} />;
}

function Solid({ faces, grad, color, shadow }) {
  const outline = roundedPath(faces.silhouette, CORNER);
  return (
    <>
      {shadow && <Shadow x={(faces.w.x + faces.e.x) / 2} y={(faces.w.y + faces.e.y) / 2} rx={(faces.e.x - faces.w.x) / 2 + 10} id={shadow} />}
      <path d={outline} fill={`url(#${grad}-side)`} stroke={color} strokeOpacity={0.45} strokeWidth={1} />
      <path d={roundedPath(faces.right, CORNER)} fill="#000" opacity={0.18} />
      <path d={roundedPath(faces.top, CORNER)} fill={`url(#${grad}-top)`} stroke={color} strokeWidth={1} />
    </>
  );
}

// A standing cylinder; `cap` swaps the flat top for something else (the dome).
function Cylinder({ cx, cy, r, height, z = 0, bands = 0, grad, color, shadow, cap }) {
  const b = isoCircle(cx, cy, r, z);
  const top = b.y - height;
  const side = `M${b.x - b.rx} ${top} L${b.x - b.rx} ${b.y} A${b.rx} ${b.ry} 0 0 0 ${b.x + b.rx} ${b.y} L${b.x + b.rx} ${top} Z`;
  const right = `M${b.x} ${top + b.ry} L${b.x} ${b.y + b.ry} A${b.rx} ${b.ry} 0 0 0 ${b.x + b.rx} ${b.y} L${b.x + b.rx} ${top} A${b.rx} ${b.ry} 0 0 1 ${b.x} ${top + b.ry} Z`;
  return (
    <>
      {shadow && <Shadow x={b.x} y={b.y} rx={b.rx + 10} id={shadow} />}
      <path d={side} fill={`url(#${grad}-side)`} stroke={color} strokeOpacity={0.45} strokeWidth={1} />
      <path d={right} fill="#000" opacity={0.18} />
      {Array.from({ length: bands }, (_, k) => {
        const y = b.y - (height * (k + 1)) / (bands + 1);
        return <path key={k} d={`M${b.x - b.rx} ${y} A${b.rx} ${b.ry} 0 0 0 ${b.x + b.rx} ${y}`} fill="none" stroke={SLOT} strokeWidth={1.5} />;
      })}
      {cap ? cap({ ...b, top }) : <ellipse cx={b.x} cy={top} rx={b.rx} ry={b.ry} fill={`url(#${grad}-top)`} stroke={color} strokeWidth={1} />}
    </>
  );
}

// Smaller boxes drawn back to front, for the shapes made of several pieces.
function Pieces({ cx, cy, offsets, half, height, ...paint }) {
  return [...offsets]
    .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
    .map(([dx, dy]) => <Solid key={`${dx},${dy}`} faces={boxFaces(cx + dx, cy + dy, half, height)} {...paint} />);
}

const BODIES = {
  box: ({ x, y, def, paint }) => <Solid faces={boxFaces(x, y, def.half, def.height)} {...paint} />,
  slab: ({ x, y, def, paint }) => <Solid faces={boxFaces(x, y, def.half, def.height)} {...paint} />,

  tower: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, def.height);
    return (
      <>
        <Solid faces={f} {...paint} />
        {[0.28, 0.52, 0.76].map((t) => {
          const z = def.height * t;
          const led = lerp(f.w, f.s, 0.18);
          return (
            <g key={t}>
              <path d={`M${lift(f.w, z)} L${lift(f.s, z)} L${lift(f.e, z)}`} fill="none" stroke={SLOT} strokeWidth={1.5} />
              <circle cx={led.x} cy={led.y - z - 6} r={1.8} fill={paint.color} />
            </g>
          );
        })}
      </>
    );
  },

  wall: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, def.height, def.depth);
    const rows = [1 / 3, 2 / 3];
    return (
      <>
        <Solid faces={f} {...paint} />
        {rows.map((t) => (
          <path key={t} d={`M${lift(f.w, def.height * t)} L${lift(f.s, def.height * t)} L${lift(f.e, def.height * t)}`} fill="none" stroke={SLOT} strokeWidth={1.2} />
        ))}
        {[0, 1, 2].flatMap((row) =>
          [1, 2, 3].map((k) => {
            const p = lerp(f.w, f.s, (k - (row % 2) * 0.5) / 4 + 0.06);
            const z0 = (def.height * row) / 3;
            return <path key={`${row}-${k}`} d={`M${lift(p, z0)} L${lift(p, z0 + def.height / 3)}`} stroke={SLOT} strokeWidth={1.2} />;
          }),
        )}
      </>
    );
  },

  cylinder: ({ x, y, def, paint }) => <Cylinder cx={x} cy={y} r={def.half} height={def.height} bands={2} {...paint} />,
  puck: ({ x, y, def, paint }) => <Cylinder cx={x} cy={y} r={def.half} height={def.height} {...paint} />,

  discs: ({ x, y, def, paint }) => {
    const slice = def.height / 4;
    return [0, 1.5, 3].map((k) => (
      <Cylinder key={k} cx={x} cy={y} r={def.half} height={slice} z={k * slice} {...paint} shadow={k ? null : paint.shadow} />
    ));
  },

  dome: ({ x, y, def, paint }) => (
    <Cylinder
      cx={x}
      cy={y}
      r={def.half}
      height={def.height}
      {...paint}
      cap={(b) => (
        <path
          d={`M${b.x - b.rx} ${b.top} A${b.rx} ${def.extra} 0 0 1 ${b.x + b.rx} ${b.top} A${b.rx} ${b.ry} 0 0 1 ${b.x - b.rx} ${b.top} Z`}
          fill={`url(#${paint.grad}-top)`}
          stroke={paint.color}
          strokeWidth={1}
        />
      )}
    />
  ),

  pyramid: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, 0);
    const apex = iso(x, y, def.height);
    return (
      <>
        {paint.shadow && <Shadow x={(f.w.x + f.e.x) / 2} y={(f.w.y + f.e.y) / 2} rx={(f.e.x - f.w.x) / 2 + 10} id={paint.shadow} />}
        <path d={roundedPath([f.w, apex, f.s], 3)} fill={`url(#${paint.grad}-top)`} stroke={paint.color} strokeWidth={1} />
        <path d={roundedPath([f.s, apex, f.e], 3)} fill={`url(#${paint.grad}-side)`} stroke={paint.color} strokeWidth={1} />
      </>
    );
  },

  cluster: ({ x, y, def, paint }) => (
    <Pieces cx={x} cy={y} offsets={[[-1.05, -1.05], [1.05, -1.05], [-1.05, 1.05], [1.05, 1.05]]} half={0.85} height={def.height} {...paint} />
  ),

  queue: ({ x, y, def, paint }) => <Pieces cx={x} cy={y} offsets={[[0, -1.8], [0, 0], [0, 1.8]]} half={0.75} height={def.height} {...paint} />,

  // A shipping container: long, low, ribbed all along.
  container: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, def.height, def.depth);
    const ribs = (from, to, count) =>
      Array.from({ length: count - 1 }, (_, k) => {
        const p = lerp(from, to, (k + 1) / count);
        return <path key={k} d={`M${lift(p, 3)} L${lift(p, def.height - 3)}`} stroke={SLOT} strokeWidth={1.2} />;
      });
    return (
      <>
        <Solid faces={f} {...paint} />
        {ribs(f.w, f.s, 12)}
        {ribs(f.s, f.e, 5)}
        <path d={`M${lift(f.w, 3)} L${lift(f.s, 3)} L${lift(f.e, 3)}`} fill="none" stroke={SLOT} strokeWidth={2} />
      </>
    );
  },

  // A safe: a door outline, a dial and a handle on the front face.
  vault: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, def.height);
    const mid = lerp(f.w, f.s, 0.5);
    const faceW = def.half * 2 * TILE_W;
    // Lays 2D drawing onto the left face: x runs along the face, y stays upright.
    const onFace = `matrix(1 0.5 0 1 ${mid.x} ${mid.y - def.height / 2})`;
    return (
      <>
        <Solid faces={f} {...paint} />
        <g transform={onFace}>
          <rect x={-faceW / 2 + 5} y={-def.height / 2 + 5} width={faceW - 10} height={def.height - 10} rx={2} fill="none" stroke={SLOT} strokeWidth={1.5} />
          <circle r={9} fill="rgb(0 0 0 / 0.25)" stroke={paint.color} strokeWidth={1.5} />
          {[0, 90, 180, 270].map((deg) => (
            <path key={deg} d="M0 -3 L0 -8" transform={`rotate(${deg})`} stroke={paint.color} strokeWidth={1.5} />
          ))}
          <circle r={2.5} fill={paint.color} />
          <path d={`M${faceW / 2 - 12} -6 L${faceW / 2 - 12} 6`} stroke={paint.color} strokeWidth={3} strokeLinecap="round" />
        </g>
      </>
    );
  },

  // An upright shield on a small plinth: who gets in is checked here.
  shield: ({ x, y, def, paint }) => {
    const t = iso(x, y, def.height);
    const outline = "M-17 -42 L17 -42 L17 -20 Q17 -2 0 6 Q-17 -2 -17 -20 Z";
    return (
      <>
        <Solid faces={boxFaces(x, y, def.half, def.height)} {...paint} />
        <g transform={`translate(${t.x} ${t.y + 2})`}>
          <path d={outline} transform="translate(3 2)" fill={`url(#${paint.grad}-side)`} stroke={paint.color} strokeOpacity={0.45} />
          <path d={outline} fill={`url(#${paint.grad}-top)`} stroke={paint.color} strokeWidth={1.5} />
          <path d="M0 -42 L17 -42 L17 -20 Q17 -2 0 6 Z" fill="#000" opacity={0.15} />
        </g>
      </>
    );
  },

  // A hub on a wide base, with spokes fanning out: one stream in, many out.
  balancer: ({ x, y, def, paint }) => {
    const b = isoCircle(x, y, def.half, def.base);
    const spokes = [25, 90, 155].map((deg) => {
      const r = (deg * Math.PI) / 180;
      return { deg, x: b.x + b.rx * 0.82 * Math.cos(r), y: b.y + b.ry * 0.82 * Math.sin(r) };
    });
    return (
      <>
        <Cylinder cx={x} cy={y} r={def.half} height={def.base} {...paint} />
        {spokes.map((s) => (
          <g key={s.deg}>
            <path d={`M${b.x} ${b.y} L${s.x} ${s.y}`} stroke={paint.color} strokeWidth={2} strokeLinecap="round" />
            <circle cx={s.x} cy={s.y} r={3} fill={paint.color} />
          </g>
        ))}
        <path d={`M${b.x} ${b.y - b.ry * 0.82} L${b.x} ${b.y}`} stroke={paint.color} strokeWidth={2} strokeDasharray="3 3" />
        <Cylinder cx={x} cy={y} r={def.half * 0.4} height={def.height - def.base} z={def.base} {...paint} shadow={null} />
      </>
    );
  },

  gate: ({ x, y, def, paint }) => (
    <>
      <Solid faces={boxFaces(x - 1.45, y, 0.55, def.height - 12)} {...paint} />
      <Solid faces={boxFaces(x + 1.45, y, 0.55, def.height - 12)} {...paint} />
      <Solid faces={boxFaces(x, y, def.half, 12, 0.6, def.height - 12)} {...paint} shadow={null} />
    </>
  ),

  crowd: ({ x, y, def, paint }) => {
    const f = boxFaces(x, y, def.half, def.height);
    // Back rows first, so the front figures stand in front of them.
    const spots = CROWD_STEPS.flatMap((i) => CROWD_STEPS.map((j) => ({ i, j }))).sort((a, b) => a.i + a.j - (b.i + b.j));
    return (
      <>
        <Solid faces={f} {...paint} />
        {spots.map(({ i, j }, k) => (
          <g key={k} transform={`translate(${f.topCenter.x + (i - j) * 14} ${f.topCenter.y + (i + j) * 7})`}>
            <rect x={-3} y={-9} width={6} height={9} rx={3} fill={CROWD_COLORS[k % CROWD_COLORS.length]} stroke="#0a0a0a" strokeWidth={0.6} />
            <circle cy={-11.5} r={2.6} fill={CROWD_COLORS[(k + 2) % CROWD_COLORS.length]} stroke="#0a0a0a" strokeWidth={0.6} />
          </g>
        ))}
      </>
    );
  },
};

// Where the icon and name sit: on the top, or on the face for the pointed shapes.
function labelAt(def, x, y) {
  if (def.name === "pyramid") return iso(x, y, def.height * 0.3);
  if (def.name === "dome") return { ...iso(x, y, def.height), y: iso(x, y, def.height).y - 8 };
  if (def.name === "shield") return { ...iso(x, y, def.height), y: iso(x, y, def.height).y - 14 };
  return iso(x, y, def.height);
}

// Memoized: while one part is dragged or the view pans, the others keep the same
// props (React Flow keeps untouched node objects), so only the moved one redraws.
export const IsoShape = memo(function IsoShape({ node, grad, color, shadow, dead, highlight }) {
  const def = shapeOf(node.data.kind);
  const world = worldOf(node);
  const Body = BODIES[def.name] ?? BODIES.box;
  const Icon = KIND_ICONS[node.data.kind] ?? BoxIcon;
  const at = labelAt(def, world.x, world.y);
  const ring = boxFaces(world.x, world.y, def.half + 0.5, 0, (def.depth ?? def.half) + 0.5).top;
  return (
    <g className="cursor-grab" data-node-id={node.id}>
      <title>{node.data.title}</title>
      {(node.selected || highlight) && <path d={roundedPath(ring, CORNER)} fill="none" stroke="#c084fc" strokeWidth={2.5} strokeDasharray="6 4" />}
      <Body x={world.x} y={world.y} def={def} paint={{ grad, color, shadow }} />
      {def.name !== "crowd" && (
        <g transform={`translate(${at.x} ${at.y})`} className={dead ? "text-neutral-500" : "text-white"}>
          <Icon x={-11} y={-24} width={22} height={22} strokeWidth={2} />
          <text y={14} textAnchor="middle" fontSize={13} fontWeight={700} fill="currentColor">
            {short(node.data.title, 13)}
          </text>
        </g>
      )}
      {dead && <path d={`M${at.x - 7} ${at.y - 20} L${at.x + 7} ${at.y - 6} M${at.x + 7} ${at.y - 20} L${at.x - 7} ${at.y - 6}`} stroke="#f87171" strokeWidth={3} strokeLinecap="round" />}
    </g>
  );
});

// The floating pill above a part: what it is (or its live status) in its colour.
function Pill({ x, y, color, text }) {
  const w = text.length * 6.6 + 24;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-9} width={w} height={18} rx={9} fill="#0a0a0a" stroke="#3f3f46" />
      <circle cx={-w / 2 + 10} r={3} fill={color} />
      <text x={-w / 2 + 18} y={3.5} fontSize={10} className="fill-neutral-300">
        {text}
      </text>
    </g>
  );
}

export const Labels = memo(function Labels({ node }) {
  const def = shapeOf(node.data.kind);
  const world = worldOf(node);
  const dead = isDown(node);
  const faces = boxFaces(world.x, world.y, def.half, def.height, def.depth ?? def.half);
  const color = dead ? DEAD_COLOR : kindColor(node.data.kind);
  if (def.floor) return <Pill x={faces.base.x} y={faces.base.y + 16} color={color} text={short(node.data.title, 18)} />;
  const text = node.data.status?.text ?? kindInfo(node.data.kind)?.label ?? node.data.kind;
  return (
    <>
      <Pill x={faces.topCenter.x} y={shapeTop(def, world) - 16} color={color} text={short(text, 16)} />
      {dead && (
        <g transform={`translate(${faces.base.x} ${faces.base.y + 16})`}>
          <rect x={-22} y={-9} width={44} height={18} rx={4} fill="#450a0a" stroke="#f87171" />
          <text y={4} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fca5a5">
            DOWN
          </text>
        </g>
      )}
    </>
  );
});
