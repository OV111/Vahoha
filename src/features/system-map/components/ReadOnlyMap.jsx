import { useMemo } from "react";
import { useEdgesState, useNodesState } from "@xyflow/react";
import SystemCanvas from "./SystemCanvas";
import EvidenceList from "./EvidenceList";
import { fromGraph } from "../lib/mapGraph";
import { kindInfo } from "../lib/nodeKinds";

// Where the public pages (/map/:publicId, the team evidence page) default to a tall canvas.
const TALL = "h-[max(360px,min(62svh,520px))] sm:h-[480px] lg:h-[calc(100vh-14rem)] lg:min-h-[480px]";

function PartDetails({ node, repo }) {
  if (!node) {
    return <p className="text-sm text-neutral-400">Click a part to see what it is.</p>;
  }
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">{kindInfo(node.data.kind)?.label}</p>
      <p className="mt-1 text-base font-semibold text-white">{node.data.title}</p>
      {node.data.sub && <p className="mt-1 text-sm text-neutral-300">{node.data.sub}</p>}
      {node.data.evidence?.length > 0 ? (
        <div className="mt-3">
          <p className="text-xs font-medium text-emerald-300">Found in the repo</p>
          <EvidenceList repo={repo} items={node.data.evidence} />
        </div>
      ) : (
        repo && <p className="mt-3 text-xs text-neutral-500">Drawn by the owner, not found in the repo scan.</p>
      )}
    </div>
  );
}

function Viewer({ graph, className, children }) {
  const [nodes, , onNodesChange] = useNodesState(graph.nodes);
  const [edges, , onEdgesChange] = useEdgesState(graph.edges);
  const selected = nodes.find((n) => n.selected) ?? null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <div className={`overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505] ${className}`}>
        <SystemCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodesDraggable={false}
          nodesConnectable={false}
          edgesReconnectable={false}
          deleteKeyCode={null}
        />
      </div>
      <aside className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 lg:self-start" aria-live="polite">
        <PartDetails node={selected} repo={graph.repo} />
        {children}
      </aside>
    </div>
  );
}

/**
 * A map nobody can change: pan, zoom and click a part to read about it.
 * Used wherever a map is shown to someone other than its owner.
 *
 * @param {object} props
 * @param {object} props.graph      the SAVED shape ({ v, nodes, edges, lens?, repo? }), as the API returns it
 * @param {string} [props.className] sizes the canvas box; replaces the tall default
 * @param {import("react").ReactNode} [props.children] extra content under the part details
 */
export default function ReadOnlyMap({ graph, className = TALL, children }) {
  const parsed = useMemo(() => fromGraph(graph), [graph]);
  if (!parsed) return <p className="text-sm text-neutral-400">This map&apos;s data can&apos;t be shown.</p>;
  return (
    <Viewer graph={parsed} className={className}>
      {children}
    </Viewer>
  );
}
