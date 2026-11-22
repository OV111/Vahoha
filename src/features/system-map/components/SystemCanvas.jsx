import { createContext, useContext, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  ConnectionMode,
  EdgeLabelRenderer,
  getBezierPath,
  Handle,
  Panel,
  Position,
  ReactFlow,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { BadgeCheck, Box, Maximize, MessageSquare, Minus, Plus, Trash2 } from "lucide-react";
import { KIND_ICONS, kindColor } from "../lib/nodeKinds";
import { fitOptions } from "../lib/viewport";
import { routeEdges } from "../lib/edgeRouting";
import { flowTiming } from "../lib/flow";

const TONE_CLASS = {
  ok: "bg-emerald-500/15 text-emerald-300",
  bad: "bg-red-500/15 text-red-300",
  idle: "bg-neutral-800 text-neutral-400",
};

// The visible dot is small; the handle around it is the 44px hit area.
const handleStyle = { width: 44, height: 44, background: "transparent", border: 0 };
const Dot = () => <span className="pointer-events-none block size-2.5 rounded-full border border-purple-300 bg-black" />;

const mix = (color, pct, base = "#0a0a0a") => `color-mix(in oklab, ${color} ${pct}%, ${base})`;

const STATUS_BORDER = { bad: "border-red-500/70", ok: "border-emerald-500/60" };

// Set by pages that let the learner edit: the selected part then shows a delete button.
const DeleteNodeContext = createContext(null);
// Set by the team map editor: part id -> number of comments on it.
const CommentCountContext = createContext(null);
// The request trip through the map (lib/flow.js), or null when each edge's `animated` decides (the system labs light one wire at a time).
const FlowContext = createContext(null);

function SystemNode({ id, data, selected }) {
  const onDelete = useContext(DeleteNodeContext);
  const comments = useContext(CommentCountContext)?.get(id) ?? 0;
  const Icon = KIND_ICONS[data.kind] ?? Box;
  const status = data.status;
  const color = kindColor(data.kind);
  const statusBorder = STATUS_BORDER[status?.tone];
  return (
    <div className="relative w-44">
      {/* A raised block: the card is the front face, these two skewed strips are its top and right side. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-2.5 h-2.5 origin-bottom-left -skew-x-45"
        style={{ background: mix(color, 50) }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-2.5 w-2.5 origin-top-left -skew-y-45"
        style={{ background: mix(color, 26, "#000") }}
      />
      <div
        className={`relative rounded-[3px] border p-3 transition-colors duration-300 ${statusBorder ?? ""} ${selected ? "outline-2 outline-offset-6 outline-purple-400" : ""}`}
        style={{ background: mix(color, 13), ...(statusBorder ? {} : { borderColor: mix(color, 55) }) }}
      >
      {selected && onDelete && (
        <button
          type="button"
          // nodrag: pressing it must not start dragging the part.
          className="nodrag nopan absolute -top-3 -left-3 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full border border-red-500/50 bg-neutral-950 text-red-300 transition-colors before:absolute before:-inset-2 before:content-[''] hover:bg-red-500/20 focus-visible:outline-2 focus-visible:outline-purple-400"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={13} aria-hidden="true" />
          <span className="sr-only">Delete {data.title}</span>
        </button>
      )}
      {data.evidence?.length > 0 && (
        <span title="Found in the repo" className="absolute -top-2 -right-2 z-10 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-black">
          <BadgeCheck size={13} aria-hidden="true" />
          <span className="sr-only">Found in the repo</span>
        </span>
      )}
      {comments > 0 && (
        <span
          title={`${comments} comment${comments === 1 ? "" : "s"}`}
          className="absolute -right-2 -bottom-2 z-10 flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-full bg-purple-500 px-1.5 text-[11px] font-semibold text-white"
        >
          <MessageSquare size={10} aria-hidden="true" />
          {comments}
          <span className="sr-only"> comments</span>
        </span>
      )}
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md" style={{ background: mix(color, 24), color }}>
          <Icon size={16} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-white">{data.title}</p>
          <p className="truncate text-xs text-neutral-400">{data.sub}</p>
        </div>
      </div>
      {status && (
        <p className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${TONE_CLASS[status.tone]}`}>{status.text}</p>
      )}
      </div>
      {/* Every side can start or end a wire (the canvas runs in loose connection mode); which sides a wire
          is drawn between is picked from where the parts are, see lib/edgeRouting.js. */}
      {SIDES.map(([handleId, position]) => (
        <Handle key={handleId} id={handleId} type="source" position={position} style={handleStyle} className="flex items-center justify-center">
          <Dot />
        </Handle>
      ))}
    </div>
  );
}

const nodeTypes = { system: SystemNode };

const DOTS = [0, 1, 2];
const LOOP_SECONDS = 2.4;
const HOP_SECONDS = 0.9;

// One request crossing this wire during its step of the trip, hidden the rest of the time.
// Every wire shares the same loop length, so the steps stay in order across the map.
function TripDot({ path, step, steps }) {
  const start = step / steps;
  const end = (step + 1) / steps;
  const dur = `${steps * HOP_SECONDS}s`;
  return (
    <circle r={4} opacity={0}>
      <animateMotion dur={dur} repeatCount="indefinite" path={path} calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${start};${end};1`} />
      <animate attributeName="opacity" dur={dur} repeatCount="indefinite" calcMode="discrete" values="0;1;0" keyTimes={`0;${start};${end}`} />
    </circle>
  );
}

// A wire with requests travelling along it, in the colour of the part that sends them.
function FlowEdge({ id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, style, label, animated, selected }) {
  const trip = useContext(FlowContext);
  const color = kindColor(useNodesData(source)?.data?.kind);
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const step = trip?.hops.get(id);
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        interactionWidth={24}
        style={{ stroke: "#3f3f46", strokeWidth: 1.5, ...style, ...(selected ? { stroke: "#c084fc", strokeWidth: 2.5 } : {}) }}
      />
      <g className="pointer-events-none motion-reduce:hidden" fill={color}>
        {trip
          ? step !== undefined && <TripDot path={path} step={step} steps={trip.steps} />
          : animated &&
            DOTS.map((i) => (
              <circle key={i} r={3.5}>
                {/* Negative begin spreads the dots along the wire from the first frame. */}
                <animateMotion dur={`${LOOP_SECONDS}s`} begin={`${(-i * LOOP_SECONDS) / DOTS.length}s`} repeatCount="indefinite" path={path} />
              </circle>
            ))}
      </g>
      {label && (
        <EdgeLabelRenderer>
          <span
            className="nodrag nopan pointer-events-auto absolute rounded-full border border-neutral-700 bg-neutral-950 px-2 py-0.5 text-[11px] font-medium text-neutral-200"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {label}
          </span>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// Registered as "default", so saved maps (whose edges have no type) get it without a migration.
const edgeTypes = { default: FlowEdge };
const SIDES = [
  ["l", Position.Left],
  ["t", Position.Top],
  ["r", Position.Right],
  ["b", Position.Bottom],
];

const zoomButton =
  "flex size-9 cursor-pointer items-center justify-center text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-400 pointer-coarse:size-11";

// Zoom in, zoom out and "show the whole map", styled like the rest of the
// editor (React Flow's own Controls are light grey squares). Bigger on touch.
function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const buttons = [
    { label: "Zoom in", Icon: Plus, onClick: () => zoomIn({ duration: 200 }) },
    { label: "Zoom out", Icon: Minus, onClick: () => zoomOut({ duration: 200 }) },
    { label: "Show the whole map", Icon: Maximize, onClick: () => fitView({ ...fitOptions(), duration: 300 }) },
  ];
  return (
    <Panel
      position="bottom-left"
      className="flex flex-col divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/90 shadow-lg shadow-black/40 backdrop-blur"
    >
      {buttons.map(({ label, Icon, onClick }) => (
        <button key={label} type="button" onClick={onClick} className={zoomButton} aria-label={label} title={label}>
          <Icon size={15} aria-hidden="true" />
        </button>
      ))}
    </Panel>
  );
}
const notSelf = (c) => c.source !== c.target;
/**
 * The free-form canvas shared by the system labs and the Project Map editor:
 * drag nodes, draw wires between them, select a wire and press Backspace to
 * remove it. State lives in the page, so what the learner built is what the
 * page uses. Extra props (onDrop, onInit, ...) pass straight to ReactFlow.
 */
export default function SystemCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDeleteNode, commentCounts = null, flowAll = true, ...flowProps }) {
  // Drawn between the sides that face each other, so a wire to a part on the left points left.
  const routed = useMemo(() => routeEdges(nodes, edges), [nodes, edges]);
  const trip = useMemo(() => (flowAll ? flowTiming(nodes, edges) : null), [flowAll, nodes, edges]);
  return (
    <FlowContext.Provider value={trip}>
    <CommentCountContext.Provider value={commentCounts}>
    <DeleteNodeContext.Provider value={onDeleteNode ?? null}>
      <ReactFlow
        nodes={nodes}
        edges={routed}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={notSelf}
        colorMode="dark"
        fitView
        fitViewOptions={fitOptions()}
        minZoom={0.2}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        {...flowProps}
      >
        <Background variant={BackgroundVariant.Lines} gap={28} lineWidth={1} color="#141414" />
        <ZoomControls />
      </ReactFlow>
    </DeleteNodeContext.Provider>
    </CommentCountContext.Provider>
    </FlowContext.Provider>
  );
}
