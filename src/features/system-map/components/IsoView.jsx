import { useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import { kindColor } from "../lib/nodeKinds";
import { DEFAULT_SIZE } from "../lib/edgeRouting";
import { flowTiming, mapMetrics } from "../lib/flow";
import { renderIsoImage } from "../lib/exportImage";
import { PX_PER_TILE, TILE_H, TILE_W, fitBox, iso, isoWire, screenToTiles, worldOf } from "../lib/isoGeometry";
import { DEAD_COLOR, isDown, shapeOf } from "../../../../constants/isoShapes";
import { Gradients, IsoShape, Labels } from "./IsoShapes";
import { Legend, MetricStrip, StageControls } from "./StageChrome";

// The map seen from above at an angle: the same saved positions laid on a 2:1
// isometric floor, each part a shape for its kind in its family colour, requests moving
// along the wires in trip order. Look only; the flat canvas stays the place to edit.

const HOP_SECONDS = 0.9;


const MIN_ZOOM = 0.4;
const MAX_ZOOM = 3;
const CLICK_SLOP = 4; // px of movement before a press on a part counts as a drag

const isPad = (node) => shapeOf(node.data.kind).floor === true;

export default function IsoView({ nodes, edges, onNodesChange, onEdgesChange, onConnect, ref }) {
  const uid = `iso${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const clock = useRef(0);
  const dotRefs = useRef(new Map());
  const wireRefs = useRef(new Map());
  const svgRef = useRef(null);
  const drag = useRef(null);
  const [view, setView] = useState({ dx: 0, dy: 0, zoom: 1 });
  const [linking, setLinking] = useState(false); // connect mode: a drag from a part draws a wire
  const [pending, setPending] = useState(null); // the wire being drawn: { from, to, target }

  // The fit is taken once, then only from the "show the whole map" button, so
  // the floor stays put while a part moves and when one is added or removed.
  const [fit, setFit] = useState(() => ({ box: fitBox(nodes) }));

  const scene = useMemo(() => {
    const world = new Map(nodes.map((n) => [n.id, worldOf(n)]));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const trip = flowTiming(nodes, edges);

    const colors = [...new Set([...nodes.map((n) => kindColor(n.data.kind)), DEAD_COLOR])];
    const gradOf = (node) => `${uid}-g${colors.indexOf(isDown(node) ? DEAD_COLOR : kindColor(node.data.kind))}`;

    const wires = edges
      .filter((e) => world.has(e.source) && world.has(e.target))
      .map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        selected: Boolean(e.selected),
        step: trip.hops.get(e.id),
        color: kindColor(byId.get(e.source).data.kind),
        failed: isDown(byId.get(e.target)),
        ...isoWire(world.get(e.source), world.get(e.target)),
      }));

    // Nearer parts (bigger x + y) are drawn last, so they cover the ones behind.
    const order = [...nodes].sort((a, b) => {
      const pa = world.get(a.id);
      const pb = world.get(b.id);
      return pa.x + pa.y - (pb.x + pb.y);
    });

    return { world, wires, order, colors, gradOf, steps: trip.steps, metrics: mapMetrics(nodes, edges) };
  }, [nodes, edges, uid]);

  const sceneRef = useRef(scene);
  useEffect(() => {
    sceneRef.current = scene;
  });

  // Requests move every frame, written straight to the DOM so React doesn't
  // re-render 60 times a second. Started once: it reads the latest wires from
  // sceneRef, so selecting or dragging a part doesn't restart it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const shown = new Map(); // wire id -> { dot, live } as last written, to skip writes that change nothing
    let last = performance.now();
    let frame;
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = (now - last) / 1000;
      last = now;
      if (pausedRef.current) return;
      clock.current += dt;
      const { wires, steps } = sceneRef.current;
      const hop = (clock.current % (steps * HOP_SECONDS)) / HOP_SECONDS;
      for (const wire of wires) {
        const dot = dotRefs.current.get(wire.id);
        if (!dot || wire.step === undefined) continue;
        const local = hop - wire.step;
        const live = local >= 0 && local < 1;
        const before = shown.get(wire.id);
        // A remounted dot (the wire was removed and drawn again) starts hidden, whatever was written before.
        if (before?.dot !== dot || before.live !== live) {
          shown.set(wire.id, { dot, live });
          dot.style.opacity = live ? 1 : 0;
          wireRefs.current.get(wire.id)?.classList.toggle("pm-held", live);
        }
        if (live) {
          const p = wire.at(local);
          dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
        }
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };
  const replay = () => {
    clock.current = 0;
  };

  const { world, wires, order, colors, gradOf, metrics } = scene;
  const box = fit.box;
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const vw = box.w / view.zoom;
  const vh = box.h / view.zoom;
  const viewBox = `${cx - vw / 2 + view.dx} ${cy - vh / 2 + view.dy} ${vw} ${vh}`;

  // Where the middle of what's on screen is, as a flat-canvas position, so a part
  // added from the palette while in 3D lands in view (the flat canvas isn't mounted).
  // Svg units per screen pixel (the svg letterboxes, so the larger ratio wins).
  const unitsPerPx = () => {
    const el = svgRef.current;
    return el ? Math.max(vw / el.clientWidth, vh / el.clientHeight) : 1;
  };

  // The pointer in svg units.
  const toSvg = (e) => {
    const m = svgRef.current.getScreenCTM().inverse();
    return { x: m.a * e.clientX + m.c * e.clientY + m.e, y: m.b * e.clientX + m.d * e.clientY + m.f };
  };

  // The part under the pointer, found by the data-node-id each shape carries.
  const partAt = (e) => document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-node-id]")?.getAttribute("data-node-id") ?? null;

  const select = (nodeId, edgeId) => {
    onNodesChange?.(nodes.filter((n) => Boolean(n.selected) !== (n.id === nodeId)).map((n) => ({ type: "select", id: n.id, selected: n.id === nodeId })));
    onEdgesChange?.(edges.filter((x) => Boolean(x.selected) !== (x.id === edgeId)).map((x) => ({ type: "select", id: x.id, selected: x.id === edgeId })));
  };

  const startMove = (node) => (e) => {
    if (!onNodesChange || e.button !== 0) return;
    e.stopPropagation();
    svgRef.current.setPointerCapture(e.pointerId);
    const base = { id: node.id, x: e.clientX, y: e.clientY, moved: false, scale: unitsPerPx() };
    // Connect mode, or Shift held: the drag draws a wire instead of moving the part.
    if ((linking || e.shiftKey) && onConnect) {
      const w = world.get(node.id);
      drag.current = { ...base, kind: "link" };
      setPending({ from: iso(w.x, w.y, shapeOf(node.data.kind).height), to: toSvg(e), target: null });
      return;
    }
    drag.current = { ...base, kind: "node", from: node.position, to: node.position };
  };

  // One handler for every part (each shape carries data-node-id), so the
  // memoized shapes don't get a new function prop on every render.
  const onPartDown = (e) => {
    const id = e.target.closest?.("[data-node-id]")?.getAttribute("data-node-id");
    const node = id && nodes.find((n) => n.id === id);
    if (node) startMove(node)(e);
  };

  const pickWire = (wire) => (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    select(null, wire.id);
  };

  const startPan = (e) => {
    if (e.button !== 0) return;
    svgRef.current.setPointerCapture(e.pointerId);
    drag.current = { kind: "pan", x: e.clientX, y: e.clientY, view, scale: unitsPerPx(), moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.x) * d.scale;
    const dy = (e.clientY - d.y) * d.scale;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < CLICK_SLOP) return;
    d.moved = true;
    if (d.kind === "link") {
      const over = partAt(e);
      setPending((p) => ({ ...p, to: toSvg(e), target: over && over !== d.id ? over : null }));
      return;
    }
    if (d.kind === "pan") {
      setView({ ...d.view, dx: d.view.dx - dx, dy: d.view.dy - dy });
      return;
    }
    const t = screenToTiles(dx, dy);
    // The floor is turned (see worldOf): floor y is minus the saved x, floor x is the saved y.
    const to = { x: d.from.x - t.y * PX_PER_TILE, y: d.from.y + t.x * PX_PER_TILE };
    if (to.x === d.to.x && to.y === d.to.y) return;
    d.to = to;
    onNodesChange([{ type: "position", id: d.id, position: to, dragging: true }]);
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !onNodesChange) return;
    if (d.kind === "pan") {
      // A press on the floor that didn't pan clears the selection.
      if (!d.moved) select(null, null);
      return;
    }
    if (d.kind === "link") {
      setPending(null);
      const target = d.moved ? partAt(e) : null;
      if (target && target !== d.id) onConnect({ source: d.id, target, sourceHandle: null, targetHandle: null });
      else if (!d.moved) select(d.id, null);
      return;
    }
    if (d.moved) {
      // dragging: false closes the move as one undo step, like a drag on the flat canvas.
      onNodesChange([{ type: "position", id: d.id, position: d.to, dragging: false }]);
    } else {
      select(d.id, null);
    }
  };

  const drawShape = (n) => (
    <IsoShape
      key={n.id}
      node={n}
      def={shapeOf(n.data.kind)}
      grad={gradOf(n)}
      color={isDown(n) ? DEAD_COLOR : kindColor(n.data.kind)}
      shadow={`${uid}-shadow`}
      dead={isDown(n)}
      highlight={pending?.target === n.id}
    />
  );

  const frame = (list) => {
    if (!list.length) return;
    setView({ dx: 0, dy: 0, zoom: 1 });
    setFit({ box: fitBox(list) });
  };
  const refit = () => frame(nodes);

  // What the editor asks of the 3D view, since React Flow's own viewport isn't mounted here.
  useImperativeHandle(ref, () => ({
    // The middle of what's on screen as a flat-canvas position, so a part added from the palette lands in view.
    middle: () => {
      const t = { x: cx + view.dx, y: cy + view.dy };
      const wx = (t.x / TILE_W + t.y / TILE_H) / 2;
      const wy = (t.y / TILE_H - t.x / TILE_W) / 2;
      // Undoes worldOf: flat x is minus floor y, flat y is floor x.
      return { x: -wy * PX_PER_TILE - DEFAULT_SIZE.width / 2, y: wx * PX_PER_TILE - DEFAULT_SIZE.height / 2 };
    },
    fit: refit,
    focus: (ids) => frame(nodes.filter((n) => ids.includes(n.id))),
    image: (format) => renderIsoImage(svgRef.current, fitBox(nodes), format),
  }));

  // Wheel zoom needs a non-passive listener to stop the page scrolling.
  useEffect(() => {
    const el = svgRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      setView((v) => ({ ...v, zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1))) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative size-full">
      <MetricStrip metrics={metrics} />

      <svg
        ref={svgRef}
        viewBox={viewBox}
        className={`size-full touch-none select-none ${linking ? "cursor-crosshair" : "cursor-move"}`}
        role="img"
        aria-label="3D view of the map. Drag a part to move it, Shift-drag from one part to another to wire them, drag the floor to pan, scroll to zoom."
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          {colors.map((color, i) => (
            <Gradients key={color} id={`${uid}-g${i}`} color={color} />
          ))}
          <radialGradient id={`${uid}-shadow`}>
            <stop offset="0" stopColor="#000" stopOpacity="0.6" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${uid}-grid`} width="28" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 L14 0 L28 7 L14 14 Z" fill="none" stroke="#262626" strokeWidth="0.8" />
          </pattern>
          <radialGradient id={`${uid}-fade`}>
            <stop offset="0.25" stopColor="#fff" />
            <stop offset="0.6" stopColor="#000" />
          </radialGradient>
          <mask id={`${uid}-mask`}>
            <rect x={box.x - box.w * 2} y={box.y - box.h * 2} width={box.w * 5} height={box.h * 5} fill={`url(#${uid}-fade)`} />
          </mask>
        </defs>

        <g className="stage-grid">
          {/* Far bigger than the map so panning never runs off the floor; a pan or deselect press lands on it. */}
          <rect
            x={box.x - box.w * 2}
            y={box.y - box.h * 2}
            width={box.w * 5}
            height={box.h * 5}
            fill={`url(#${uid}-grid)`}
            mask={`url(#${uid}-mask)`}
            onPointerDown={startPan}
          />
        </g>

        <g className="layer-links">
          {wires.map((w) => (
            <g key={w.id}>
              <path
                ref={(el) => (el ? wireRefs.current.set(w.id, el) : wireRefs.current.delete(w.id))}
                d={w.d}
                fill="none"
                stroke={w.selected ? "#c084fc" : w.step === undefined ? "#27272a" : "#52525b"}
                strokeWidth={w.selected ? 2.5 : 1.5}
                strokeDasharray="5 5"
                strokeLinecap="round"
                className="pointer-events-none"
              />
              {/* A wide invisible stroke, so a thin wire is easy to click. */}
              {onEdgesChange && <path d={w.d} fill="none" stroke="transparent" strokeWidth={14} className="cursor-pointer" onPointerDown={pickWire(w)} />}
            </g>
          ))}
        </g>

        <g className="layer-floor" onPointerDown={onPartDown}>
          {order.filter(isPad).map(drawShape)}
        </g>

        <g className="layer-packets pointer-events-none">
          {wires
            .filter((w) => w.step !== undefined)
            .map((w) => (
              <g
                key={w.id}
                ref={(el) => (el ? dotRefs.current.set(w.id, el) : dotRefs.current.delete(w.id))}
                style={{ opacity: 0 }}
                className="motion-reduce:hidden"
              >
                <circle r={4.3} fill={w.failed ? "#f87171" : w.color} stroke="#0a0a0a" strokeWidth={1} />
              </g>
            ))}
        </g>

        <g className="layer-ents" onPointerDown={onPartDown}>
          {order.filter((n) => !isPad(n)).map(drawShape)}
        </g>

        {pending && (
          <g className="pointer-events-none">
            <path d={`M${pending.from.x} ${pending.from.y} L${pending.to.x} ${pending.to.y}`} stroke="#c084fc" strokeWidth={2} strokeDasharray="6 4" />
            <circle cx={pending.to.x} cy={pending.to.y} r={4} fill="#c084fc" />
          </g>
        )}

        <g className="layer-over pointer-events-none">
          {order.map((n) => (
            <Labels key={n.id} node={n} />
          ))}
        </g>

        {!nodes.length && (
          <text x={cx} y={cy} textAnchor="middle" fontSize={14} className="fill-neutral-500">
            Add parts on the flat canvas to see them here.
          </text>
        )}
      </svg>

      <Legend />
      <StageControls
        linking={linking}
        onToggleLink={onConnect ? () => setLinking((on) => !on) : null}
        onFit={refit}
        onReplay={replay}
        paused={paused}
        onTogglePause={togglePause}
      />
    </div>
  );
}
