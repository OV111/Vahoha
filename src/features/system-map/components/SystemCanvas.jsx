import { createContext, useContext, useMemo } from "react";
import { Background, BackgroundVariant, ConnectionMode, Handle, Panel, Position, ReactFlow, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { BadgeCheck, Box, Maximize, MessageSquare, Minus, Plus, Trash2 } from "lucide-react";
import { KIND_ICONS } from "../lib/nodeKinds";
import { fitOptions } from "../lib/viewport";
import { routeEdges } from "../lib/edgeRouting";

const TONE_CLASS = {
  ok: "bg-emerald-500/15 text-emerald-300",
  bad: "bg-red-500/15 text-red-300",
  idle: "bg-neutral-800 text-neutral-400",
};

// The visible dot is small; the handle around it is the 44px hit area.
const handleStyle = { width: 44, height: 44, background: "transparent", border: 0 };
const Dot = () => <span className="pointer-events-none block size-2.5 rounded-full border border-purple-300 bg-black" />;

function borderFor(status, selected) {
  if (status?.tone === "bad") return "border-red-500/60";
  if (status?.tone === "ok") return "border-emerald-500/50";
  return selected ? "border-purple-400" : "border-neutral-700";
}

// Set by pages that let the learner edit: the selected part then shows a delete button.
const DeleteNodeContext = createContext(null);
// Set by the team map editor: part id -> number of comments on it.
const CommentCountContext = createContext(null);

function SystemNode({ id, data, selected }) {
  const onDelete = useContext(DeleteNodeContext);
  const comments = useContext(CommentCountContext)?.get(id) ?? 0;
  const Icon = KIND_ICONS[data.kind] ?? Box;
  const status = data.status;
  return (
    <div className={`relative w-44 rounded-xl border bg-neutral-950 p-3 transition-colors duration-300 ${borderFor(status, selected)}`}>
      {selected && onDelete && (
        <button
          type="button"
          // nodrag: pressing it must not start dragging the part.
          className="nodrag nopan absolute -top-3 -left-3 flex size-7 cursor-pointer items-center justify-center rounded-full border border-red-500/50 bg-neutral-950 text-red-300 transition-colors before:absolute before:-inset-2 before:content-[''] hover:bg-red-500/20 focus-visible:outline-2 focus-visible:outline-purple-400"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={13} aria-hidden="true" />
          <span className="sr-only">Delete {data.title}</span>
        </button>
      )}
      {data.evidence?.length > 0 && (
        <span title="Found in the repo" className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-black">
          <BadgeCheck size={13} aria-hidden="true" />
          <span className="sr-only">Found in the repo</span>
        </span>
      )}
      {comments > 0 && (
        <span
          title={`${comments} comment${comments === 1 ? "" : "s"}`}
          className="absolute -right-2 -bottom-2 flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-full bg-purple-500 px-1.5 text-[11px] font-semibold text-white"
        >
          <MessageSquare size={10} aria-hidden="true" />
          {comments}
          <span className="sr-only"> comments</span>
        </span>
      )}
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-amber-300">
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
const edgeDefaults = {
  labelStyle: { fill: "#d4d4d4", fontSize: 12 },
  labelBgStyle: { fill: "#0a0a0a" },
  labelBgPadding: [6, 3],
  labelBgBorderRadius: 4,
};

/**
 * The free-form canvas shared by the system labs and the Project Map editor:
 * drag nodes, draw wires between them, select a wire and press Backspace to
 * remove it. State lives in the page, so what the learner built is what the
 * page uses. Extra props (onDrop, onInit, ...) pass straight to ReactFlow.
 */
export default function SystemCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDeleteNode, commentCounts = null, ...flowProps }) {
  // Drawn between the sides that face each other, so a wire to a part on the left points left.
  const routed = useMemo(() => routeEdges(nodes, edges), [nodes, edges]);
  return (
    <CommentCountContext.Provider value={commentCounts}>
    <DeleteNodeContext.Provider value={onDeleteNode ?? null}>
      <ReactFlow
        nodes={nodes}
        edges={routed}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={notSelf}
        defaultEdgeOptions={edgeDefaults}
        colorMode="dark"
        fitView
        fitViewOptions={fitOptions()}
        minZoom={0.2}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        {...flowProps}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#2a2a2a" />
        <ZoomControls />
      </ReactFlow>
    </DeleteNodeContext.Provider>
    </CommentCountContext.Provider>
  );
}
