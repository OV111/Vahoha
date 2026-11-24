import { useEffect, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { kindColor } from "../lib/nodeKinds";
import { isoStartZoom } from "../lib/viewport";
import { isUnconfirmed } from "../lib/mapGraph";
import { DEFAULT_SIZE } from "../lib/edgeRouting";
import { mapMetrics } from "../lib/flow";
import { laneCounts, simulate } from "../lib/simulation";
import useFlowPlayback from "../hooks/useFlowPlayback";
import { PX_PER_TILE, TILE_H, TILE_W, fitBox, iso, isoWire, screenToTiles, worldOf } from "../lib/isoGeometry";
import { DEAD_COLOR, isDown, shapeOf } from "../../../../constants/isoShapes";
import { Gradients, IsoShape, Labels } from "./IsoShapes";
import { FlowLegend, MetricStrip, StageControls } from "./StageChrome";

// The map seen from above at an angle: the same saved positions laid on a 2:1
// isometric floor, each part a shape for its kind in its family colour, requests moving
// by what each part does (lib/simulation.js). Look only; the flat canvas stays the place to edit.

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 5;
const CLICK_SLOP = 4; // px of movement before a press on a part counts as a drag

const isPad = (node) => shapeOf(node.data.kind).floor === true;

export default function IsoView({ nodes, edges, onNodesChange, onEdgesChange, onConnect, readOnly = false, metricsClass, ref }) {
  const uid = `iso${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [paused, setPaused] = useState(false);
  const control = useRef({ clock: 0, paused: false });
  const stageRef = useRef(null); // holds the three layers and every pointer handler
  const svgRef = useRef(null); // the floor layer; the others share its size and viewBox
  const drag = useRef(null);
  const fingers = useRef(new Map()); // pointer id -> where it is, for pinch zoom
  const [view, setView] = useState({ dx: 0, dy: 0, zoom: 1 });
  const [linking, setLinking] = useState(false); // connect mode: a drag from a part draws a wire
  const [pending, setPending] = useState(null); // the wire being drawn: { from, to, target }

  // The fit is taken once, then only from the "show the whole map" button, so
  // the floor stays put while a part moves and when one is added or removed.
  const [fit, setFit] = useState(() => ({ box: fitBox(nodes) }));

  const scene = useMemo(() => {
    const world = new Map(nodes.map((n) => [n.id, worldOf(n)]));
    const timeline = simulate(nodes, edges);
    const lanes = laneCounts(timeline.moves);

    const colors = [...new Set([...nodes.map((n) => kindColor(n.data.kind)), DEAD_COLOR])];
    const gradOf = (node, layer) => `${layer}-g${colors.indexOf(isDown(node) ? DEAD_COLOR : kindColor(node.data.kind))}`;

    const wires = edges
      .filter((e) => world.has(e.source) && world.has(e.target))
      .map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        selected: Boolean(e.selected),
        unconfirmed: isUnconfirmed(e),
        lanes: lanes.get(e.id) ?? 0,
        ...isoWire(world.get(e.source), world.get(e.target)),
      }));

    // Nearer parts (bigger x + y) are drawn last, so they cover the ones behind.
    const order = [...nodes].sort((a, b) => {
      const pa = world.get(a.id);
      const pb = world.get(b.id);
      return pa.x + pa.y - (pb.x + pb.y);
    });

    return { world, wires, at: new Map(wires.map((w) => [w.id, w.at])), timeline, order, colors, gradOf, metrics: mapMetrics(nodes, edges) };
  }, [nodes, edges]);

  const { dots, wires: wireRefs } = useFlowPlayback(scene.timeline, (id, t) => scene.at.get(id)?.(t) ?? null, control, stageRef);

  const togglePause = () => {
    control.current.paused = !control.current.paused;
    setPaused(control.current.paused);
  };
  const replay = () => {
    control.current.clock = 0;
  };

  const top = `${uid}t`; // the parts layer's own gradient ids
  const { world, wires, order, colors, gradOf, metrics } = scene;
  const box = fit.box;
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const vw = box.w / view.zoom;
  const vh = box.h / view.zoom;
  const viewBox = `${cx - vw / 2 + view.dx} ${cy - vh / 2 + view.dy} ${vw} ${vh}`;

  // Svg units per screen pixel (the svg letterboxes, so the larger ratio wins).
  const unitsPerPx = () => {
    const el = svgRef.current;
    return el ? Math.max(vw / el.clientWidth, vh / el.clientHeight) : 1;
  };

  // On a phone the whole map is too small to read, so it opens zoomed in; "show the whole map" still fits it all.
  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el.clientWidth) return;
    const zoom = Math.min(MAX_ZOOM, isoStartZoom(Math.min(el.clientWidth / box.w, el.clientHeight / box.h)));
    if (zoom > 1) setView((v) => ({ ...v, zoom }));
    // Only when the view opens: after that the learner's own zoom stays.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Two fingers: zoom around the point between them, and pan as it moves.
  const pinchShape = () => {
    const [a, b] = [...fingers.current.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, gap: Math.hypot(a.x - b.x, a.y - b.y) || 1 };
  };
  const startPinch = (e) => {
    const d = drag.current;
    // The first finger may have been moving a part: that move ends here, as one undo step.
    if (d?.kind === "node" && d.moved) onNodesChange([{ type: "position", id: d.id, position: d.to, dragging: false }]);
    setPending(null);
    svgRef.current.setPointerCapture(e.pointerId);
    drag.current = { kind: "pinch", start: pinchShape(), view };
  };
  const movePinch = (d) => {
    const now = pinchShape();
    const rect = svgRef.current.getBoundingClientRect();
    const base = Math.max(box.w / rect.width, box.h / rect.height); // svg units per px at zoom 1
    const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, (d.view.zoom * now.gap) / d.start.gap));
    const off = (p) => ({ x: p.x - rect.left - rect.width / 2, y: p.y - rect.top - rect.height / 2 });
    const from = off(d.start);
    const to = off(now);
    setView({
      zoom,
      dx: d.view.dx + (from.x * base) / d.view.zoom - (to.x * base) / zoom,
      dy: d.view.dy + (from.y * base) / d.view.zoom - (to.y * base) / zoom,
    });
  };
  const onDownCapture = (e) => {
    if (e.pointerType !== "touch") return;
    fingers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (fingers.current.size < 2) return;
    e.stopPropagation(); // the second finger must not start moving whatever is under it
    if (fingers.current.size === 2) startPinch(e);
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
    // A finger on a part that isn't selected pans: parts cover most of a small screen. Tap it first to move it.
    if (e.pointerType === "touch" && !node.selected) {
      drag.current = { ...base, kind: "pan", view, tapped: node.id };
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
    if (fingers.current.has(e.pointerId)) fingers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const d = drag.current;
    if (!d) return;
    if (d.kind === "pinch") {
      if (fingers.current.size === 2) movePinch(d);
      return;
    }
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
    if (readOnly) return;
    const t = screenToTiles(dx, dy);
    // The floor is turned (see worldOf): floor y is minus the saved x, floor x is the saved y.
    const to = { x: d.from.x - t.y * PX_PER_TILE, y: d.from.y + t.x * PX_PER_TILE };
    if (to.x === d.to.x && to.y === d.to.y) return;
    d.to = to;
    onNodesChange([{ type: "position", id: d.id, position: to, dragging: true }]);
  };

  const onPointerUp = (e) => {
    fingers.current.delete(e.pointerId);
    const d = drag.current;
    drag.current = null;
    if (d?.kind === "pinch") return;
    if (!d || !onNodesChange) return;
    if (d.kind === "pan") {
      // A press on the floor that didn't pan clears the selection.
      if (!d.moved) select(d.tapped ?? null, null);
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
      if (readOnly) return;
      // dragging: false closes the move as one undo step, like a drag on the flat canvas.
      onNodesChange([{ type: "position", id: d.id, position: d.to, dragging: false }]);
    } else {
      select(d.id, null);
    }
  };

  const drawShape = (layer) => (n) => (
    <IsoShape
      key={n.id}
      node={n}
      def={shapeOf(n.data.kind)}
      grad={gradOf(n, layer)}
      color={isDown(n) ? DEAD_COLOR : kindColor(n.data.kind)}
      shadow={`${layer}-shadow`}
      dead={isDown(n)}
      highlight={pending?.target === n.id}
    />
  );

  // Each layer carries its own paints, so it can be exported on its own.
  const paints = (layer) => (
    <>
      {colors.map((color, i) => (
        <Gradients key={color} id={`${layer}-g${i}`} color={color} />
      ))}
      <radialGradient id={`${layer}-shadow`}>
        <stop offset="0" stopColor="#000" stopOpacity="0.6" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </>
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
    image: async (format) => (await import("../lib/exportImage")).renderIsoImage(stageRef.current, fitBox(nodes), format),
    card: async (info) => (await import("../lib/exportImage")).renderShareCard(stageRef.current, fitBox(nodes), info),
  }));

  // Wheel zoom needs a non-passive listener to stop the page scrolling.
  useEffect(() => {
    const el = stageRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      setView((v) => ({ ...v, zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1))) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative size-full">
      <MetricStrip metrics={metrics} className={metricsClass} />

      <div
        ref={stageRef}
        className={`absolute inset-0 touch-none select-none ${linking ? "cursor-crosshair" : "cursor-move"}`}
        role="img"
        aria-label="3D view of the map. Drag a part to move it, Shift-drag from one part to another to wire them, drag the floor to pan, scroll or pinch to zoom. On a touch screen, tap a part before moving it."
        onPointerDownCapture={onDownCapture}
        // Everything here is pointer events. Without this, the click a tap also sends lands on the edit sheet that just opened under the finger.
        onTouchEnd={(e) => e.cancelable && e.preventDefault()}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
      {/* Three layers: a moving dot redraws the dots, not the whole scene. */}
      <svg ref={svgRef} viewBox={viewBox} className="absolute inset-0 size-full">
        <defs>
          {paints(uid)}
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
                stroke={w.selected ? "#c084fc" : w.lanes === 0 && !w.unconfirmed ? "#27272a" : "#52525b"}
                strokeWidth={w.selected ? 2.5 : 1.5}
                strokeDasharray={w.unconfirmed ? "4 6" : undefined}
                strokeLinecap="round"
                className="pointer-events-none"
              />
              {/* A wide invisible stroke, so a thin wire is easy to click. */}
              {onEdgesChange && <path d={w.d} fill="none" stroke="transparent" strokeWidth={14} className="cursor-pointer" onPointerDown={pickWire(w)} />}
            </g>
          ))}
        </g>

        <g className="layer-floor" onPointerDown={onPartDown}>
          {order.filter(isPad).map(drawShape(uid))}
        </g>

      </svg>

      <svg viewBox={viewBox} className="pointer-events-none absolute inset-0 size-full will-change-transform">
        <g className="layer-packets pointer-events-none">
          {wires.flatMap((w) =>
            Array.from({ length: w.lanes }, (_, lane) => {
              const key = `${w.id}:${lane}`;
              return (
                <circle
                  key={key}
                  ref={(el) => (el ? dots.current.set(key, el) : dots.current.delete(key))}
                  r={4.3}
                  visibility="hidden"
                  className="motion-reduce:hidden"
                />
              );
            }),
          )}
        </g>
      </svg>

      <svg viewBox={viewBox} className="pointer-events-none absolute inset-0 size-full will-change-transform">
        <defs>{paints(top)}</defs>
        <g className="layer-ents pointer-events-auto" onPointerDown={onPartDown}>
          {order.filter((n) => !isPad(n)).map(drawShape(top))}
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
      </div>

      <FlowLegend types={scene.timeline.types} unconfirmed={metrics.unconfirmed > 0} />
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
