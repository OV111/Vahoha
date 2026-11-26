import { useCallback, useImperativeHandle, useRef } from "react";
import { ReactFlowProvider, applyEdgeChanges, applyNodeChanges, reconnectEdge, useReactFlow } from "@xyflow/react";
import SystemCanvas from "./SystemCanvas";
import { DRAG_TYPE } from "./NodePalette";
import { connect } from "@/features/system-map/lib/changes";
import { PX_PER_TILE } from "@/features/system-map/lib/isoGeometry";
import { fitOptions } from "@/features/system-map/lib/viewport";

// The flat view and everything that needs React Flow. Lazy-loaded: the map opens in 3D.

const NODE_HALF = { x: 88, y: 30 }; // drop point is the node's centre, not its corner
const DELETE_KEYS = ["Backspace", "Delete"]; // removes the selected part or wire
const SNAP = [PX_PER_TILE, PX_PER_TILE]; // one 3D floor tile, so a flat layout lands neatly on the 3D floor
const LOCKED = { nodesDraggable: false, nodesConnectable: false, edgesReconnectable: false, deleteKeyCode: null };

function Flat({ nodes, edges, setNodes, setEdges, readOnly = false, onAdd, onDeleteNode, commentCounts, playback, ref }) {
  const { screenToFlowPosition, fitView } = useReactFlow();
  const rootRef = useRef(null);

  const onNodesChange = useCallback((changes) => setNodes((ns) => applyNodeChanges(changes, ns)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((es) => applyEdgeChanges(changes, es)), [setEdges]);
  const onConnect = useCallback((c) => setEdges((es) => connect(c, es)), [setEdges]);

  useImperativeHandle(ref, () => ({
    // The middle of what's on screen, so a part added from the palette lands in view.
    middle: () => {
      const rect = rootRef.current.getBoundingClientRect();
      return screenToFlowPosition({ x: rect.left + rect.width / 2 - NODE_HALF.x, y: rect.top + rect.height / 2 - NODE_HALF.y });
    },
    fit: () => fitView(fitOptions()),
    focus: (ids) => fitView({ nodes: ids.map((id) => ({ id })), padding: 0.6, duration: 300 }),
  }));

  const onDrop = (e) => {
    e.preventDefault();
    onAdd(e.dataTransfer.getData(DRAG_TYPE), screenToFlowPosition({ x: e.clientX - NODE_HALF.x, y: e.clientY - NODE_HALF.y }));
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Redoing a wire: drag either end onto another part to move it (the label
  // stays), or drop it on empty canvas to remove it.
  const reconnectedRef = useRef(true);
  const onReconnectStart = useCallback(() => {
    reconnectedRef.current = false;
  }, []);
  const onReconnect = useCallback(
    (oldEdge, connection) => {
      reconnectedRef.current = true;
      // The scan's proof was about the old ends; the moved wire is the learner's own.
      setEdges((es) => reconnectEdge({ ...oldEdge, data: {} }, connection, es, { shouldReplaceId: false }));
    },
    [setEdges],
  );
  const onReconnectEnd = useCallback(
    (event, edge) => {
      // Dropped on a part but not a valid end (e.g. back onto its own source): keep the wire as it was.
      const onPart = event.target?.closest?.(".react-flow__node");
      if (!reconnectedRef.current && !onPart) setEdges((es) => es.filter((e) => e.id !== edge.id));
      reconnectedRef.current = true;
    },
    [setEdges],
  );

  const editing = readOnly
    ? LOCKED
    : { onConnect, onDeleteNode, onDrop, onDragOver, deleteKeyCode: DELETE_KEYS, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius: 20, snapToGrid: true, snapGrid: SNAP };

  return (
    <div ref={rootRef} className="size-full">
      <SystemCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        commentCounts={commentCounts}
        playback={playback}
        gridGap={readOnly ? undefined : PX_PER_TILE}
        {...editing}
      />
    </div>
  );
}

export default function FlatCanvas(props) {
  return (
    <ReactFlowProvider>
      <Flat {...props} />
    </ReactFlowProvider>
  );
}
