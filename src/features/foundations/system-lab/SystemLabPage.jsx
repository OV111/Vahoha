import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addEdge, MarkerType, useEdgesState, useNodesState } from "@xyflow/react";
import { ArrowLeft, Check, Lock, Play, RotateCcw, X } from "lucide-react";
import NotFound from "../../../components/feedback/NotFound";
import CodeEditor from "@/features/coding-challenges/components/arena/CodeEditor";
import useConsoleRunner from "@/features/learn/hooks/useConsoleRunner";
import SystemCanvas from "@/features/system-map/components/SystemCanvas";
import { STAGES } from "./stages";
import { buildScenario, gradeRun, parseTrace, toSteps } from "./runScenario";

// /labs/foundations/lab/:stageId — a system lab: build the wiring on the canvas
// (left), write the server's code (right), run a scenario that restarts the
// server, and watch the canvas replay what the code really did.
//
// The canvas is not decoration: with no Server -> Disk wire the code gets no
// `disk` (runScenario.buildScenario), so the learner has to design the system
// as well as write it. Runs in the same sandboxed worker as the lesson code panel.

const REPLAY_STEP_MS = 650;

const edgeKey = (e) => `${e.source}-${e.target}`;
const arrow = { type: MarkerType.ArrowClosed, color: "#6b7280" };

const toNode = (n) => ({ id: n.id, type: "system", position: n.position, data: { kind: n.kind, title: n.title, sub: n.sub } });

function initialEdges(canvas) {
  return canvas.fixed.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    sourceHandle: e.source === "client" ? "r" : "b",
    targetHandle: e.source === "client" ? "l" : "t",
    deletable: false,
    markerEnd: arrow,
  }));
}

export default function SystemLabPage() {
  const { stageId } = useParams();
  const stage = STAGES[stageId];
  if (!stage) return <NotFound />;
  return <SystemLab key={stage.id} stage={stage} />;
}

function SystemLab({ stage }) {
  const [nodes, , onNodesChange] = useNodesState(stage.canvas.nodes.map(toNode));
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges(stage.canvas));
  const [code, setCode] = useState(stage.starter);
  const [guess, setGuess] = useState(null);
  const [tick, setTick] = useState(0);
  const { run, running, lines } = useConsoleRunner();

  const onConnect = useCallback(
    (c) => setEdges((es) => addEdge({ ...c, markerEnd: arrow }, es)),
    [setEdges],
  );

  const diskWired = edges.some((e) => e.source === stage.canvas.wire.source && e.target === stage.canvas.wire.target);
  const trace = useMemo(() => (lines ? parseTrace(lines) : null), [lines]);
  const steps = useMemo(() => (trace ? toSteps(trace.events) : []), [trace]);
  const checks = useMemo(() => (trace ? gradeRun(trace.events) : []), [trace]);

  // Advance the replay one step at a time; each tick re-arms the next one.
  useEffect(() => {
    if (running || tick >= steps.length - 1) return;
    const id = setTimeout(() => setTick((t) => t + 1), REPLAY_STEP_MS);
    return () => clearTimeout(id);
  }, [running, tick, steps.length]);

  const replaying = !running && steps.length > 0;
  const current = replaying ? steps[Math.min(tick, steps.length - 1)] : null;
  const statuses = useMemo(
    () => (replaying ? Object.assign({}, ...steps.slice(0, tick + 1).map((s) => s.nodes)) : {}),
    [replaying, steps, tick],
  );

  const shownNodes = nodes.map((n) => ({ ...n, data: { ...n.data, status: statuses[n.id] } }));
  const shownEdges = edges.map((e) => {
    const active = current?.edge === edgeKey(e);
    return {
      ...e,
      animated: active,
      style: { stroke: active ? "#a855f7" : "#4b5563", strokeWidth: active ? 2.5 : 1.5 },
    };
  });

  const start = () => {
    setTick(0);
    run(buildScenario(code, { diskWired }));
  };

  const { predict } = stage;
  const lockedReason = guess === null ? "Pick a prediction first" : null;
  const allPassed = checks.length > 0 && checks.every((c) => c.ok);

  return (
    <section className="mx-auto max-w-[1500px] px-4 pt-6 pb-16 sm:px-6">
      <Link to="/labs/foundations" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white">
        <ArrowLeft size={14} aria-hidden="true" /> Foundations
      </Link>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-amber-300">System lab · {stage.topic}</p>
      <h1 className="mt-1 text-2xl font-bold text-white">{stage.title}</h1>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Left: the system */}
        <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505] lg:sticky lg:top-20 lg:self-start">
          <div className="h-[320px] sm:h-[420px] lg:h-[calc(100vh-14rem)] lg:min-h-[420px]">
            <SystemCanvas
              nodes={shownNodes}
              edges={shownEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
          </div>
          <div role="status" aria-live="polite" className="border-t border-neutral-800 px-4 py-3 text-sm">
            {current ? (
              <p className="text-neutral-100">{current.label}</p>
            ) : (
              <p className="text-neutral-400">
                Drag nodes to arrange them. Drag from a dot to another node to draw a wire; select a wire and press Backspace to remove it.{" "}
                <span className={diskWired ? "text-emerald-300" : "text-amber-300"}>
                  {diskWired ? "Server is wired to Disk." : "Server is not wired to Disk yet."}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Right: the code and the proof */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            {stage.brief.map((p) => (
              <p key={p} className="text-sm leading-relaxed text-neutral-300 [&:not(:first-child)]:mt-2">
                {p}
              </p>
            ))}
            <p className="mt-4 text-sm font-medium text-white">{predict.q}</p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Your prediction">
              {predict.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={guess === i}
                  disabled={lines !== null}
                  onClick={() => setGuess(i)}
                  className={`min-h-11 cursor-pointer rounded-lg border px-3 text-sm transition-colors disabled:cursor-default ${
                    guess === i ? "border-purple-500 bg-purple-500/15 text-white" : "border-neutral-700 text-neutral-300 enabled:hover:border-neutral-500"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {lines !== null && guess !== null && (
              <p className={`mt-3 text-sm ${guess === predict.answer ? "text-emerald-300" : "text-amber-300"}`}>
                {guess === predict.answer ? "Right. " : `The answer was "${predict.options[predict.answer]}". `}
                <span className="text-neutral-300">{predict.why}</span>
              </p>
            )}
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505]">
            <div className="flex items-center justify-between gap-2 border-b border-neutral-800 px-3 py-2">
              <span className="font-mono text-xs text-neutral-500">server.js</span>
              <div className="flex items-center gap-1">
                {code !== stage.starter && (
                  <button
                    type="button"
                    onClick={() => setCode(stage.starter)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs text-neutral-400 hover:text-neutral-100"
                  >
                    <RotateCcw size={12} aria-hidden="true" /> Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={start}
                  disabled={Boolean(lockedReason) || running}
                  title={lockedReason ?? "Restart the server and run the scenario"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors enabled:cursor-pointer enabled:hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500"
                >
                  {lockedReason ? <Lock size={13} aria-hidden="true" /> : <Play size={13} fill="currentColor" aria-hidden="true" />}
                  {running ? "Running…" : "Run scenario"}
                </button>
              </div>
            </div>
            <div className="h-80 overflow-auto">
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4" aria-live="polite">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Checks</h2>
            {checks.length === 0 ? (
              <p className="mt-2 text-sm text-neutral-500">{lockedReason ?? "Run the scenario to see the checks."}</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {checks.map((c) => (
                  <li key={c.name} className="flex items-start gap-2 text-sm">
                    {c.ok ? (
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <X size={16} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
                    )}
                    <span>
                      <span className={c.ok ? "text-neutral-200" : "text-white"}>{c.name}</span>
                      {c.message && <span className="block text-neutral-400">{c.message}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {allPassed && (
              <p className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                Every link survived the restart. Next question: what happens when two requests write at the same time?
              </p>
            )}
            {trace?.logs.length > 0 && (
              <div className="mt-3 border-t border-neutral-800 pt-3 font-mono text-xs text-neutral-400">
                {trace.logs.map((l, i) => (
                  // Output order is the point, so index is the right key.
                  <p key={`${i}-${l.text}`}>{l.text}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
