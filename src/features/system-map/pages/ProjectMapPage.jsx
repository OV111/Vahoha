import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { addEdge, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { Download, RotateCcw, ScanSearch, Upload } from "lucide-react";
import NotFound from "../../../components/feedback/NotFound";
import SystemCanvas from "../components/SystemCanvas";
import NodePalette, { DRAG_TYPE } from "../components/NodePalette";
import Inspector from "../components/Inspector";
import ShareControl from "../components/ShareControl";
import RepoScanPanel from "../components/RepoScanPanel";
import LensPicker from "../components/LensPicker";
import UnderstandingCheck from "../components/UnderstandingCheck";
import DriftBanner from "../components/DriftBanner";
import useInitialMap from "../hooks/useInitialMap";
import { saveMap } from "../systemMapApi";
import { EXAMPLE_GRAPH, MAX_NODES, freeSpot, fromGraph, save, toGraph, withArrow } from "../lib/mapGraph";
import { isKind, kindInfo } from "../lib/nodeKinds";
import { fitOptions } from "../lib/viewport";
import { applyScan } from "../lib/applyScan";

// /project-map — a free editor for the system diagram of your own project.
// Guests keep their map in this browser (localStorage). Signed-in learners keep
// it in their account: loaded by useInitialMap, saved here with the revision
// they last saw, so two tabs can't silently overwrite each other.
//
// /project-map/for/:ownerType/:ownerId — the same editor for the map that
// belongs to a capstone or a team. Those live on the server only. A team map is
// shared by every active member, so it has no public link of its own (it reaches
// the public through the team's evidence page) and no understanding check.

const SAVE_DEBOUNCE_MS = 400;
const NODE_HALF = { x: 88, y: 30 }; // drop point is the node's centre, not its corner

const newId = () => `n-${Math.random().toString(36).slice(2, 8)}`;

const OWNER_TYPES = ["capstone", "team"];

const OWNER_COPY = {
  personal: { eyebrow: "Project map", title: "Draw how your project works" },
  capstone: { eyebrow: "Capstone map", title: "Draw how your capstone works" },
  team: { eyebrow: "Team map", title: "Draw how your team's project works" },
};

const SAVE_STATUS = {
  browser: "Saved in this browser only.",
  saving: "Saving…",
  saved: "Saved to your account.",
  error: "Couldn't save your last change. It will retry on your next edit.",
};

function ProjectMapEditor({ initial }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.graph.edges);
  const [repo, setRepo] = useState(initial.graph.repo ?? null); // the repo scan the map's evidence came from
  const [lens, setLens] = useState(initial.graph.lens); // the vocabulary the palette, scan and questions use
  const [scanOpen, setScanOpen] = useState(false);
  const [drift, setDrift] = useState(initial.remote?.drift ?? null); // what changed in the repo since the map was last true
  const ownerType = initial.remote?.ownerType ?? "personal";
  const isTeam = ownerType === "team";
  const copy = OWNER_COPY[ownerType] ?? OWNER_COPY.personal;
  const [saveState, setSaveState] = useState(initial.remote ? "saved" : "browser");
  const remoteRef = useRef(initial.remote);
  const lastSavedRef = useRef(JSON.stringify(toGraph(initial.graph.nodes, initial.graph.edges, initial.graph.repo, initial.graph.lens)));
  const queueRef = useRef(Promise.resolve()); // saves run one at a time, so each sees the latest revision
  const stoppedRef = useRef(false); // set after a conflict: saving again would overwrite the other copy
  const [notice, setNotice] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const graph = toGraph(nodes, edges, repo, lens);
      const json = JSON.stringify(graph);
      // Selecting or measuring a part changes `nodes` but not the map.
      if (stoppedRef.current || json === lastSavedRef.current) return;

      if (!remoteRef.current) {
        save(nodes, edges, repo, lens);
        lastSavedRef.current = json;
        return;
      }

      setSaveState("saving");
      queueRef.current = queueRef.current.then(async () => {
        if (stoppedRef.current) return;
        try {
          const result = await saveMap(remoteRef.current.id, { graph, revision: remoteRef.current.revision });
          if (result.conflict) {
            stoppedRef.current = true;
            setSaveState("conflict");
            return;
          }
          remoteRef.current = { ...remoteRef.current, revision: result.map.revision };
          lastSavedRef.current = json;
          setSaveState("saved");
        } catch {
          setSaveState("error");
        }
      });
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [nodes, edges, repo, lens]);

  const selectedNode = nodes.find((n) => n.selected) ?? null;
  const selectedEdge = selectedNode ? null : (edges.find((e) => e.selected) ?? null);
  const full = nodes.length >= MAX_NODES;

  const addNode = useCallback(
    (kind, position) => {
      if (!isKind(kind)) return;
      const info = kindInfo(kind);
      const node = { id: newId(), type: "system", position, selected: true, data: { kind, title: info.label, sub: info.sub } };
      setNodes((ns) => (ns.length >= MAX_NODES ? ns : [...ns.map((n) => ({ ...n, selected: false })), node]));
    },
    [setNodes],
  );

  const addToMiddle = (kind) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const middle = screenToFlowPosition({ x: rect.left + rect.width / 2 - NODE_HALF.x, y: rect.top + rect.height / 2 - NODE_HALF.y });
    addNode(kind, freeSpot(nodes, middle));
  };

  const onDrop = (e) => {
    e.preventDefault();
    addNode(e.dataTransfer.getData(DRAG_TYPE), screenToFlowPosition({ x: e.clientX - NODE_HALF.x, y: e.clientY - NODE_HALF.y }));
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onConnect = useCallback((c) => setEdges((es) => addEdge(withArrow(c), es)), [setEdges]);

  const patchNode = (data) =>
    setNodes((ns) => ns.map((n) => (n.id === selectedNode.id ? { ...n, data: { ...n.data, ...data } } : n)));
  const patchEdge = ({ label }) =>
    setEdges((es) => es.map((e) => (e.id === selectedEdge.id ? { ...e, label: label || undefined } : e)));
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
    fitView({ nodes: ids.map((id) => ({ id })), padding: 0.6, duration: 300 });
  };

  const load = (graph) => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setRepo(graph.repo ?? null);
    setLens(graph.lens);
    requestAnimationFrame(() => fitView(fitOptions()));
  };

  /** Adds the scan parts the learner accepted; returns how many were added. */
  const applyRepoScan = (scan, acceptedKeys) => {
    const result = applyScan(nodes, edges, scan, acceptedKeys);
    setNodes(result.nodes);
    setEdges(result.edges);
    setRepo(result.repo);
    requestAnimationFrame(() => fitView(fitOptions()));
    return result.added;
  };

  const resetToExample = () => {
    load(fromGraph(EXAMPLE_GRAPH));
    setConfirmReset(false);
    setNotice(null);
  };

  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(toGraph(nodes, edges, repo, lens), null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "project-map.json" });
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) return;
    try {
      const graph = fromGraph(JSON.parse(await file.text()));
      if (!graph) throw new Error("not a map");
      load(graph);
      setNotice(null);
    } catch {
      setNotice("That file isn't a Project Map export, so nothing was changed.");
    }
  };

  const button =
    "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400";

  // Phones get a 44px square with just the icon; the text comes back from sm up.
  const iconOnPhone = "max-sm:w-11 max-sm:justify-center max-sm:px-0";

  return (
    // While the edit sheet is open on a phone, extra room at the bottom lets the page scroll the canvas up above it.
    <section className={`mx-auto max-w-[1500px] px-4 pt-6 pb-16 sm:px-6 ${selectedNode || selectedEdge ? "max-lg:pb-[60svh]" : ""}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">{copy.eyebrow}</p>
          <h1 className="mt-1 text-2xl font-bold text-white">{copy.title}</h1>
          <p className="mt-1 text-sm text-neutral-400" role="status">
            {SAVE_STATUS[saveState]}{" "}
            {saveState === "browser" && (
              <>
                <Link to="/get-started" className="text-purple-300 underline-offset-2 hover:underline">
                  Sign in
                </Link>{" "}
                to keep it in your account.
              </>
            )}
          </p>
          {isTeam && (
            <p className="mt-1 text-sm text-neutral-500">Team maps appear on your team&apos;s public evidence page once an admin publishes it.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={button} aria-expanded={scanOpen} onClick={() => setScanOpen((open) => !open)}>
            <ScanSearch size={14} aria-hidden="true" />
            <span className="sm:hidden">Scan repo</span>
            <span className="hidden sm:inline">Suggest from my repo</span>
          </button>
          {initial.remote && !isTeam && (
            <ShareControl mapId={initial.remote.id} initialShared={initial.remote.shared} initialPublicId={initial.remote.publicId} />
          )}
          <button type="button" className={`${button} ${iconOnPhone}`} onClick={exportJson} aria-label="Export" title="Export">
            <Download size={14} aria-hidden="true" /> <span className="max-sm:hidden">Export</span>
          </button>
          <button type="button" className={`${button} ${iconOnPhone}`} onClick={() => fileRef.current.click()} aria-label="Import" title="Import">
            <Upload size={14} aria-hidden="true" /> <span className="max-sm:hidden">Import</span>
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={importJson} />
          {confirmReset ? (
            <>
              <button type="button" className={`${button} border-red-500/50 text-red-300`} onClick={resetToExample}>
                Replace my map
              </button>
              <button type="button" className={button} onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className={`${button} ${iconOnPhone}`} onClick={() => setConfirmReset(true)} aria-label="Start over" title="Start over">
              <RotateCcw size={14} aria-hidden="true" /> <span className="max-sm:hidden">Start over</span>
            </button>
          )}
        </div>
      </div>

      <LensPicker lens={lens} onChange={setLens} />

      {saveState === "conflict" && (
        <p role="alert" className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
          This map was changed in another tab or device, so your edits here are no longer being saved.
          <button type="button" onClick={() => window.location.reload()} className="min-h-11 cursor-pointer rounded-lg border border-amber-500/40 px-3 hover:bg-amber-500/10">
            Reload the latest
          </button>
        </p>
      )}

      {notice && (
        <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {notice}
        </p>
      )}

      {scanOpen && (
        <RepoScanPanel signedIn={Boolean(initial.remote)} lens={lens} repo={repo} nodes={nodes} onApply={applyRepoScan} onClose={() => setScanOpen(false)} />
      )}

      {drift && <DriftBanner mapId={initial.remote.id} drift={drift} onDismissed={() => setDrift(null)} />}

      {/* The explicit minmax(0, 1fr) column matters on phones: without it the palette's scroll row sets the column's minimum width and the canvas runs off the right edge. */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-5 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div>
          <NodePalette lens={lens} onAdd={addToMiddle} disabled={full} />
          {full && <p className="mt-3 text-sm text-amber-300">This map is full ({MAX_NODES} parts). Delete one to add another.</p>}
        </div>

        <div className="relative min-w-0">
          <div ref={canvasRef} className="h-[max(360px,min(62svh,520px))] overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505] sm:h-[480px] lg:h-[calc(100vh-14rem)] lg:min-h-[480px]">
            <SystemCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDeleteNode={deleteNode}
              onDrop={onDrop}
              onDragOver={onDragOver}
            />
          </div>

          {/* Only while something is selected. Below lg it is a sheet pinned to the bottom of the screen (so it is never off-screen under a tall canvas); from lg it floats over the canvas, which keeps its full width. */}
          {(selectedNode || selectedEdge) && (
            <aside
              aria-label="Edit the selected item"
              className="fixed inset-x-0 bottom-0 z-40 max-h-[50svh] overflow-auto rounded-t-2xl border-t border-neutral-700 bg-neutral-950 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black lg:absolute lg:inset-x-auto lg:top-3 lg:right-3 lg:bottom-auto lg:z-10 lg:max-h-[calc(100%-1.5rem)] lg:w-72 lg:rounded-2xl lg:border lg:border-neutral-800 lg:bg-neutral-950/95 lg:pb-4 lg:shadow-xl lg:shadow-black/50"
            >
              <Inspector
                node={selectedNode}
                edge={selectedEdge}
                repo={repo}
                lens={lens}
                onNode={patchNode}
                onEdge={patchEdge}
                onDeleteNode={() => deleteNode(selectedNode.id)}
                onDeleteEdge={deleteEdge}
                onClose={clearSelection}
              />
            </aside>
          )}
        </div>
      </div>

      {/* The questions come from the saved copy, so they need an account. Not for team maps: no single member owns the answers. */}
      {initial.remote && !isTeam && (
        <div className="mt-6">
          <UnderstandingCheck mapId={initial.remote.id} onFocus={focusParts} />
        </div>
      )}
    </section>
  );
}

function ProjectMapLoader({ owner }) {
  const initial = useInitialMap(owner);

  if (initial.status === "signin") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <p className="text-neutral-200">Sign in to open this map.</p>
        <Link
          to="/get-started"
          className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white"
        >
          Sign in
        </Link>
      </section>
    );
  }
  if (initial.status === "loading") {
    // Same element as the route's Suspense fallback, so the lazy-load and the
    // map fetch read as one loader instead of two circles in different spots.
    return <LoadingSuspense />;
  }
  if (initial.status === "error") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <p role="alert" className="text-neutral-200">{initial.error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 min-h-11 cursor-pointer rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <ReactFlowProvider>
      <ProjectMapEditor key={initial.remote?.id ?? "guest"} initial={initial} />
    </ReactFlowProvider>
  );
}

export default function ProjectMapPage() {
  const { ownerType, ownerId } = useParams();
  if (!ownerType) return <ProjectMapLoader owner={null} />;
  if (!OWNER_TYPES.includes(ownerType) || !ownerId) return <NotFound />;
  // Keyed by owner so moving between two maps never shows the first one's data.
  return <ProjectMapLoader key={`${ownerType}/${ownerId}`} owner={{ ownerType, ownerId }} />;
}
