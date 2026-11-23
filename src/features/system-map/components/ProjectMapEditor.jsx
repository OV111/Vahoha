import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addEdge, ReactFlowProvider, reconnectEdge, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import "../project-map-theme.css";
import SystemCanvas from "./SystemCanvas";
import IsoView from "./IsoView";
import NodePalette, { DRAG_TYPE } from "./NodePalette";
import RepoScanPanel from "./RepoScanPanel";
import LensPicker from "./LensPicker";
import UnderstandingCheck from "./UnderstandingCheck";
import DriftBanner from "./DriftBanner";
import VersionHistory from "./VersionHistory";
import ProjectMapTour from "./ProjectMapTour";
import MapToolbar from "./MapToolbar";
import MapAlerts from "./MapAlerts";
import EditSheet from "./EditSheet";
import { MetricStrip, StageControls } from "./StageChrome";
import useMapComments from "../hooks/useMapComments";
import { saveOps } from "../systemMapApi";
import { EXAMPLE_GRAPH, MAX_NODES, freeSpot, fromGraph, toGraph, withArrow } from "../lib/mapGraph";
import { isKind, kindInfo } from "../lib/nodeKinds";
import { fitOptions } from "../lib/viewport";
import { applyScan } from "../lib/applyScan";
import { canRedo, canUndo, record, redo, startHistory, undo } from "../lib/history";
import { applyOpsLenient, diffGraph } from "../lib/graphOps";
import { toMermaid } from "../lib/mermaid";
import { downloadUrl, renderMapImage } from "../lib/exportImage";
import { mapMetrics } from "../lib/flow";
import { PX_PER_TILE } from "../lib/isoGeometry";

// The editor and everything only it uses live here, so the page can lazy-load
// them: guests never get past the sign-in screen and shouldn't download this.

const SAVE_DEBOUNCE_MS = 400;
const HISTORY_PAUSE_MS = 350; // edits closer together than this (typing a name) are one undo step
const INFO_MS = 4000;
const NODE_HALF = { x: 88, y: 30 }; // drop point is the node's centre, not its corner
const DELETE_KEYS = ["Backspace", "Delete"]; // removes the selected part or wire
const SNAP = [PX_PER_TILE, PX_PER_TILE]; // one 3D floor tile, so a flat layout lands neatly on the 3D floor

const graphJson = (nodes, edges, repo, lens) => JSON.stringify(toGraph(nodes, edges, repo, lens));

// Ctrl/Cmd+Z in a text field undoes the typing, not the map.
const isTextField = (el) => Boolean(el?.closest?.("input, textarea, select, [contenteditable='true']"));

const newId = () => `n-${Math.random().toString(36).slice(2, 8)}`;

const OWNER_COPY = {
  personal: { eyebrow: "Project map", title: "Draw how your project works" },
  capstone: { eyebrow: "Capstone map", title: "Draw how your capstone works" },
  team: { eyebrow: "Team map", title: "Draw how your team's project works" },
};

const SAVE_STATUS = {
  saving: "Saving…",
  saved: "Saved to your account.",
  error: "Couldn't save your last change. It will retry on your next edit.",
};

function Editor({ initial }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.graph.edges);
  const [repo, setRepo] = useState(initial.graph.repo ?? null); // the repo scan the map's evidence came from
  const [lens, setLens] = useState(initial.graph.lens); // the vocabulary the palette, scan and questions use
  const [scanOpen, setScanOpen] = useState(false);
  const [drift, setDrift] = useState(initial.remote?.drift ?? null); // what changed in the repo since the map was last true
  const ownerType = initial.remote?.ownerType ?? "personal";
  const isTeam = ownerType === "team";
  const copy = OWNER_COPY[ownerType] ?? OWNER_COPY.personal;
  const [saveState, setSaveState] = useState("saved");
  const remoteRef = useRef(initial.remote);
  const [initialSaved] = useState(() => toGraph(initial.graph.nodes, initial.graph.edges, initial.graph.repo, initial.graph.lens));
  const savedRef = useRef(initialSaved); // the map as the server has it: the base each save is diffed against
  const reasonRef = useRef(null); // set by a big jump (scan, import, reset, restore), sent with the next save
  const liveRef = useRef({ nodes, edges, repo, lens }); // the canvas right now, for merging edits that arrive after an await
  const queueRef = useRef(Promise.resolve()); // saves run one at a time, so each sees the latest revision
  const stoppedRef = useRef(false); // set after a conflict: saving again would overwrite the other copy
  const [notice, setNotice] = useState(null);
  const [info, setInfo] = useState(null); // a short success message, e.g. after copying Mermaid
  const [exporting, setExporting] = useState(false);
  const historyRef = useRef(startHistory(JSON.stringify(initialSaved)));
  const [history, setHistory] = useState({ undo: false, redo: false }); // what the buttons can do
  // Parts on the server's copy: comments can only go on those.
  const [savedIds, setSavedIds] = useState(() => new Set(initial.graph.nodes.map((n) => n.id)));
  const [historyOpen, setHistoryOpen] = useState(false);
  const [view3d, setView3d] = useState(true); // opens in 3D; the flat canvas is one click away
  const { screenToFlowPosition, fitView } = useReactFlow();
  const canvasRef = useRef(null);
  const isoRef = useRef(null);

  useEffect(() => {
    liveRef.current = { nodes, edges, repo, lens };
  });

  useEffect(() => {
    // Puts edits saved elsewhere (another tab, a teammate) onto the canvas.
    // Parts and wires they didn't touch keep their React Flow objects, so a drag
    // or a selection in progress isn't interrupted.
    const mergeIn = (theirs) => {
      const live = liveRef.current;
      const merged = fromGraph(applyOpsLenient(toGraph(live.nodes, live.edges, live.repo, live.lens), theirs));
      if (!merged) return;
      const touched = new Set(theirs.map((op) => op.id ?? (op.node ?? op.edge)?.id));
      const keep = (list, mine) => {
        const byId = new Map(mine.map((item) => [item.id, item]));
        return list.map((item) =>
          touched.has(item.id) || !byId.has(item.id) ? { ...item, selected: byId.get(item.id)?.selected ?? false } : byId.get(item.id),
        );
      };
      setNodes(keep(merged.nodes, live.nodes));
      setEdges(keep(merged.edges, live.edges));
      setRepo(merged.repo ?? null);
      setLens(merged.lens);
      setInfo(isTeam ? "A teammate's changes were added to your map." : "Changes from another tab were added to your map.");
    };

    const id = setTimeout(() => {
      const graph = toGraph(nodes, edges, repo, lens);
      // Selecting or measuring a part changes `nodes` but not the map.
      if (stoppedRef.current || diffGraph(savedRef.current, graph).length === 0) return;

      setSaveState("saving");
      queueRef.current = queueRef.current.then(async () => {
        // Diffed here, not above: an earlier save in the queue may have moved the base.
        const ops = diffGraph(savedRef.current, graph);
        if (stoppedRef.current || ops.length === 0) {
          if (!stoppedRef.current) setSaveState("saved");
          return;
        }
        const reason = reasonRef.current;
        reasonRef.current = null;
        const revision = remoteRef.current.revision;
        try {
          const result = await saveOps(remoteRef.current.id, { revision, ops, reason });
          if (result.conflict) {
            stoppedRef.current = true;
            setSaveState("conflict");
            return;
          }
          remoteRef.current = { ...remoteRef.current, revision: result.map.revision };
          // More than one step up: someone else's save landed first and the server merged ours onto it.
          if (result.map.revision > revision + 1) {
            savedRef.current = result.map.graph;
            mergeIn(diffGraph(graph, result.map.graph));
          } else {
            savedRef.current = graph;
          }
          setSavedIds(new Set(savedRef.current.nodes.map((n) => n.id)));
          setSaveState("saved");
        } catch {
          if (reason) reasonRef.current = reason;
          setSaveState("error");
        }
      });
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [nodes, edges, repo, lens, isTeam, setNodes, setEdges]);

  // One undo step per finished change: never mid-drag, and only once edits
  // pause, so typing a name or dragging a part is a single step.
  const dragging = nodes.some((n) => n.dragging);
  useEffect(() => {
    if (dragging) return;
    const id = setTimeout(() => {
      historyRef.current = record(historyRef.current, graphJson(nodes, edges, repo, lens));
      setHistory({ undo: canUndo(historyRef.current), redo: canRedo(historyRef.current) });
    }, HISTORY_PAUSE_MS);
    return () => clearTimeout(id);
  }, [nodes, edges, repo, lens, dragging]);

  useEffect(() => {
    if (!info) return;
    const id = setTimeout(() => setInfo(null), INFO_MS);
    return () => clearTimeout(id);
  }, [info]);

  const selectedNode = nodes.find((n) => n.selected) ?? null;
  const selectedEdge = selectedNode ? null : (edges.find((e) => e.selected) ?? null);
  const full = nodes.length >= MAX_NODES;
  const metrics = useMemo(() => mapMetrics(nodes, edges), [nodes, edges]);
  const [flatPaused, setFlatPaused] = useState(false);

  // The flat view's request dots are SVG (SMIL) animations, so they pause and rewind through the svg elements.
  const flatSvgs = () => canvasRef.current?.querySelectorAll("svg") ?? [];
  const toggleFlatPause = () => {
    flatSvgs().forEach((svg) => (flatPaused ? svg.unpauseAnimations() : svg.pauseAnimations()));
    setFlatPaused(!flatPaused);
  };
  const replayFlat = () => flatSvgs().forEach((svg) => svg.setCurrentTime(0));

  // Team maps only. Re-read whenever another part is selected, so teammates' new comments show up.
  const comments = useMapComments(isTeam ? initial.remote.id : null, selectedNode?.id);
  const commentCounts = useMemo(
    () => (comments.enabled ? new Map([...comments.byNode].map(([id, list]) => [id, list.length])) : null),
    [comments.enabled, comments.byNode],
  );
  // Comments whose part was deleted stay on the server; undo brings the part (and them) back.
  const orphanComments = useMemo(() => {
    const onMap = new Set(nodes.map((n) => n.id));
    return [...comments.byNode].filter(([id]) => !onMap.has(id)).reduce((sum, [, list]) => sum + list.length, 0);
  }, [nodes, comments.byNode]);

  const addNode = useCallback(
    (kind, position) => {
      if (!isKind(kind)) return;
      const info = kindInfo(kind);
      const node = { id: newId(), type: "system", position, selected: true, data: { kind, title: info.label, sub: info.sub } };
      setNodes((ns) => (ns.length >= MAX_NODES ? ns : [...ns.map((n) => ({ ...n, selected: false })), node]));
    },
    [setNodes],
  );

  const flatMiddle = () => {
    const rect = canvasRef.current.getBoundingClientRect();
    return screenToFlowPosition({ x: rect.left + rect.width / 2 - NODE_HALF.x, y: rect.top + rect.height / 2 - NODE_HALF.y });
  };
  const addToMiddle = (kind) => addNode(kind, freeSpot(nodes, isoRef.current ? isoRef.current.middle() : flatMiddle()));

  // Whichever view is on screen frames the map; React Flow's fitView only reaches the flat one.
  const fitMap = () => (isoRef.current ? isoRef.current.fit() : fitView(fitOptions()));

  const onDrop = (e) => {
    e.preventDefault();
    addNode(e.dataTransfer.getData(DRAG_TYPE), screenToFlowPosition({ x: e.clientX - NODE_HALF.x, y: e.clientY - NODE_HALF.y }));
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onConnect = useCallback((c) => setEdges((es) => addEdge(withArrow(c), es)), [setEdges]);

  // Redoing a wire: drag either end onto another part to move it (the label
  // stays), or drop it on empty canvas to remove it.
  const reconnectedRef = useRef(true);
  const onReconnectStart = useCallback(() => {
    reconnectedRef.current = false;
  }, []);
  const onReconnect = useCallback(
    (oldEdge, connection) => {
      reconnectedRef.current = true;
      setEdges((es) => reconnectEdge(oldEdge, connection, es, { shouldReplaceId: false }));
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

  const patchNode = (data) => setNodes((ns) => ns.map((n) => (n.id === selectedNode.id ? { ...n, data: { ...n.data, ...data } } : n)));
  const patchEdge = ({ label }) => setEdges((es) => es.map((e) => (e.id === selectedEdge.id ? { ...e, label: label || undefined } : e)));
  const deleteNode = useCallback(
    (id) => {
      setNodes((ns) => ns.filter((n) => n.id !== id));
      setEdges((es) => es.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges],
  );
  const clearSelection = () => {
    setNodes((ns) => ns.map((n) => (n.selected ? { ...n, selected: false } : n)));
    setEdges((es) => es.map((e) => (e.selected ? { ...e, selected: false } : e)));
  };
  const deleteEdge = () => setEdges((es) => es.filter((e) => e.id !== selectedEdge.id));

  // "Show on map" in the understanding check: select the parts a question is about and zoom to them.
  const focusParts = (ids) => {
    setNodes((ns) => ns.map((n) => ({ ...n, selected: ids.includes(n.id) })));
    if (isoRef.current) isoRef.current.focus(ids);
    else fitView({ nodes: ids.map((id) => ({ id })), padding: 0.6, duration: 300 });
  };

  const load = (graph) => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setRepo(graph.repo ?? null);
    setLens(graph.lens);
    requestAnimationFrame(fitMap);
  };

  const applyRepoScan = (scan, acceptedKeys) => {
    const result = applyScan(nodes, edges, scan, acceptedKeys);
    reasonRef.current = "scan";
    setNodes(result.nodes);
    setEdges(result.edges);
    setRepo(result.repo);
    requestAnimationFrame(fitMap);
    return result.added;
  };

  // Moves one step through history. The restored map is saved like any other edit.
  const travel = (step) => {
    const before = historyRef.current;
    const next = step === "undo" ? undo(before, graphJson(nodes, edges, repo, lens)) : redo(before);
    historyRef.current = next;
    setHistory({ undo: canUndo(next), redo: canRedo(next) });
    if (next === before) return;
    const graph = fromGraph(JSON.parse(next.present));
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setRepo(graph.repo ?? null);
    setLens(graph.lens);
  };

  // Subscribed once; the ref always holds a handler that sees the current map.
  const onKeyRef = useRef(null);
  useEffect(() => {
    onKeyRef.current = (e) => {
      if (isTextField(e.target)) return;
      if (e.key === "Escape") {
        clearSelection();
        return;
      }
      // The flat canvas deletes on its own (deleteKeyCode); the 3D view needs it here.
      if (view3d && DELETE_KEYS.includes(e.key)) {
        if (selectedNode) deleteNode(selectedNode.id);
        else if (selectedEdge) deleteEdge();
        return;
      }
      if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        travel("undo");
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        e.preventDefault();
        travel("redo");
      }
    };
  });
  useEffect(() => {
    const onKey = (e) => onKeyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resetToExample = () => {
    reasonRef.current = "reset";
    load(fromGraph(EXAMPLE_GRAPH));
    setNotice(null);
  };

  const restoreVersion = (graph, when) => {
    reasonRef.current = "restore";
    load(graph);
    setHistoryOpen(false);
    setNotice(null);
    setInfo(`Restored the map from ${when}. Undo (Ctrl+Z) brings back what you had.`);
  };

  const downloadText = (text, type, filename) => {
    const url = URL.createObjectURL(new Blob([text], { type }));
    downloadUrl(url, filename);
    URL.revokeObjectURL(url);
  };

  const exportAs = async (format) => {
    setNotice(null);
    setInfo(null);
    const graph = toGraph(nodes, edges, repo, lens);
    if (format === "json") {
      downloadText(JSON.stringify(graph, null, 2), "application/json", "project-map.json");
      return;
    }
    if (format === "mermaid") {
      const text = toMermaid(graph, { fenced: true });
      try {
        await navigator.clipboard.writeText(text);
        setInfo("Copied as Mermaid. Paste it into a README.md and GitHub draws the diagram.");
      } catch {
        // No clipboard (blocked, or not a secure page): hand over the same text as a file.
        downloadText(text, "text/markdown", "project-map.md");
        setInfo("Saved as project-map.md. Paste its contents into a README and GitHub draws the diagram.");
      }
      return;
    }
    setExporting(true);
    try {
      const image = isoRef.current ? isoRef.current.image(format) : renderMapImage(canvasRef.current, nodes, format);
      downloadUrl(await image, `project-map.${format}`);
    } catch {
      setNotice("Couldn't draw the image. Try again, or export the map file instead.");
    } finally {
      setExporting(false);
    }
  };

  const importJson = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) return;
    try {
      const graph = fromGraph(JSON.parse(await file.text()));
      if (!graph) throw new Error("not a map");
      reasonRef.current = "import";
      load(graph);
      setNotice(null);
    } catch {
      setNotice("That file isn't a Project Map export, so nothing was changed.");
    }
  };

  return (
    // While the edit sheet is open on a phone, extra room at the bottom lets the page scroll the canvas up above it.
    <section className={`pm-theme mx-auto max-w-[1500px] px-4 pt-6 pb-16 sm:px-6 ${selectedNode || selectedEdge ? "max-lg:pb-[60svh]" : ""}`}>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">{copy.eyebrow}</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white">{copy.title}</h1>
          <p className="mt-1 text-sm text-neutral-400" role="status">
            {SAVE_STATUS[saveState]}
          </p>
          {isTeam && (
            <p className="mt-1 text-sm text-neutral-500">Team maps appear on your team&apos;s public evidence page once an admin publishes it.</p>
          )}
        </div>
        <MapToolbar
          remote={initial.remote}
          isTeam={isTeam}
          scanOpen={scanOpen}
          onToggleScan={() => setScanOpen((open) => !open)}
          view3d={view3d}
          onToggle3d={() => {
            setView3d((on) => !on);
            setFlatPaused(false);
          }}
          history={history}
          onTravel={travel}
          historyOpen={historyOpen}
          onToggleHistory={() => setHistoryOpen((open) => !open)}
          onImport={importJson}
          onExport={exportAs}
          exporting={exporting}
          onReset={resetToExample}
        />
      </div>

      <div data-tour="map-lens">
        <LensPicker lens={lens} onChange={setLens} />
      </div>

      <MapAlerts conflict={saveState === "conflict"} isTeam={isTeam} notice={notice} info={info} />

      {scanOpen && (
        <RepoScanPanel signedIn={Boolean(initial.remote)} lens={lens} repo={repo} nodes={nodes} onApply={applyRepoScan} onClose={() => setScanOpen(false)} />
      )}

      {historyOpen && (
        <VersionHistory mapId={initial.remote.id} isTeam={isTeam} onRestore={restoreVersion} onClose={() => setHistoryOpen(false)} />
      )}

      {drift && <DriftBanner mapId={initial.remote.id} drift={drift} onDismissed={() => setDrift(null)} />}

      {/* The explicit minmax(0, 1fr) column matters on phones: without it the palette's scroll row sets the column's minimum width and the canvas runs off the right edge. */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-5 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div data-tour="map-palette">
          <NodePalette lens={lens} onAdd={addToMiddle} disabled={full} />
          {full && <p className="mt-3 text-sm text-amber-300">This map is full ({MAX_NODES} parts). Delete one to add another.</p>}
        </div>

        <div className="relative min-w-0">
          <div
            ref={canvasRef}
            data-tour="map-canvas"
            className="relative h-[max(360px,min(62svh,520px))] overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505] sm:h-[480px] lg:h-[calc(100vh-14rem)] lg:min-h-[480px]"
          >
            {view3d ? (
              <IsoView ref={isoRef} nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} />
            ) : (
              <SystemCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDeleteNode={deleteNode}
                onDrop={onDrop}
                onDragOver={onDragOver}
                deleteKeyCode={DELETE_KEYS}
                commentCounts={commentCounts}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                reconnectRadius={20}
                snapToGrid
                snapGrid={SNAP}
                gridGap={PX_PER_TILE}
              />
            )}
            {!view3d && (
              <>
                <MetricStrip metrics={metrics} />
                <StageControls onReplay={replayFlat} paused={flatPaused} onTogglePause={toggleFlatPause} />
              </>
            )}
          </div>
          {comments.error && <p className="mt-2 text-sm text-red-300">{comments.error}</p>}
          {orphanComments > 0 && (
            <p className="mt-2 text-sm text-neutral-500">
              {orphanComments} comment{orphanComments === 1 ? " is" : "s are"} on parts no longer on the map. Undo the delete to see{" "}
              {orphanComments === 1 ? "it" : "them"} again.
            </p>
          )}

          {(selectedNode || selectedEdge) && (
            <EditSheet
              node={selectedNode}
              edge={selectedEdge}
              repo={repo}
              lens={lens}
              onNode={patchNode}
              onEdge={patchEdge}
              onDeleteNode={() => deleteNode(selectedNode.id)}
              onDeleteEdge={deleteEdge}
              onClose={clearSelection}
              comments={comments}
              savedIds={savedIds}
            />
          )}
        </div>
      </div>

      {/* The questions come from the saved copy, so they need an account. Not for team maps: no single member owns the answers. */}
      {initial.remote && !isTeam && (
        <div className="mt-6" data-tour="map-check">
          <UnderstandingCheck mapId={initial.remote.id} onFocus={focusParts} />
        </div>
      )}
      <ProjectMapTour />
    </section>
  );
}

export default function ProjectMapEditor({ initial }) {
  return (
    <ReactFlowProvider>
      <Editor initial={initial} />
    </ReactFlowProvider>
  );
}
