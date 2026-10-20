import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FlaskConical } from "lucide-react";
import TaskStepper from "./components/TaskStepper";
import TaskBrief from "./components/TaskBrief";
import HintLadder from "./components/HintLadder";
import Workspace from "./components/Workspace";
import ResultsDock from "./components/ResultsDock";
import NameItCard, { TaskComplete } from "./components/NameItCard";
import { loadLab } from "./content";
import { LAB_MANIFEST, labKey } from "./content/manifest";
import { roomById, roomOfTrack } from "./rooms";
import { checkTask, nameItFor } from "./lib/checkTask";
import { finishedTasks, markTaskFinished } from "./lib/labProgress";
import useCodeRunner from "@/features/coding-challenges/hooks/useCodeRunner";

// /learn/:trackId/:layerId/:topicSlug/lab — one lesson's lab (docs/product/LAB_SYSTEM.md).
//
//   top bar : back to lesson, Labs › room, lesson title, mission stepper
//   left    : the brief, "name it" / task complete, then the hint ladder
//   right   : file tabs + editor, results dock under it
// Below lg everything stacks.
//
// Grading runs the learner's code in the same sandboxed Web Worker the
// challenge Arena uses (useCodeRunner), through lib/checkTask. Finished tasks
// are saved; passing the whole lab marks the lesson done on the roadmap.

export default function LabPage() {
  const { trackId, layerId, topicSlug } = useParams();
  const key = `${trackId}/${layerId}/${topicSlug}`;
  const [loaded, setLoaded] = useState({ key: null, status: "loading", lab: null });

  useEffect(() => {
    let alive = true;
    loadLab(trackId, layerId, topicSlug)
      .then((lab) => alive && setLoaded({ key, status: lab ? "ready" : "none", lab }))
      .catch(() => alive && setLoaded({ key, status: "error", lab: null }));
    return () => {
      alive = false;
    };
  }, [key, trackId, layerId, topicSlug]);

  // A stale result from the previous URL counts as still loading.
  const status = loaded.key === key ? loaded.status : "loading";
  const lessonHref = `/learn/${trackId}/${layerId}/${topicSlug}`;

  if (status === "loading") {
    return (
      <div role="status" className="flex min-h-[60vh] items-center justify-center text-sm text-neutral-400">
        <FlaskConical size={16} className="mr-2 motion-safe:animate-pulse" aria-hidden="true" /> Opening the lab…
      </div>
    );
  }

  if (status !== "ready") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-neutral-900 text-neutral-400">
          <FlaskConical size={22} aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-white">
          {status === "error" ? "This lab didn't load" : "No lab for this lesson yet"}
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          {status === "error" ? "Check your connection and refresh the page." : "Labs open lesson by lesson. Read the lesson, or try a lab in another room."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={lessonHref} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 hover:border-neutral-500">
            <ArrowLeft size={14} aria-hidden="true" /> Back to the lesson
          </Link>
          <Link to="/labs" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white hover:bg-purple-500">
            <FlaskConical size={14} aria-hidden="true" /> All labs
          </Link>
        </div>
      </section>
    );
  }

  // Keyed by lab, so all per-task state starts fresh for a different lab.
  return <LabWorkspace key={key} lab={loaded.lab} trackId={trackId} layerId={layerId} slug={topicSlug} lessonHref={lessonHref} />;
}

const initialTaskState = (task, done) => ({
  code: { [task.file]: task.starter, ...(task.testFile ? { [task.testFile]: task.testStarter } : {}) },
  activeFile: task.file,
  hints: 0,
  solutionShown: false,
  result: null,
  done,
});

function LabWorkspace({ lab, trackId, layerId, slug, lessonHref }) {
  const { tasks } = lab;
  const meta = LAB_MANIFEST.find((m) => labKey(m) === `${trackId}/${layerId}/${slug}`);
  const room = roomById(roomOfTrack(trackId));
  const allIds = tasks.map((t) => t.id);

  const [state, setState] = useState(() => {
    const finished = finishedTasks(trackId, layerId, slug);
    return Object.fromEntries(tasks.map((t) => [t.id, initialTaskState(t, finished.has(t.id))]));
  });
  // Open on the first unfinished task, so a returning learner picks up where they left off.
  const [current, setCurrent] = useState(() => {
    const finished = finishedTasks(trackId, layerId, slug);
    const i = tasks.findIndex((t) => !finished.has(t.id));
    return i === -1 ? tasks.length - 1 : i;
  });
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  const { run } = useCodeRunner();
  const briefRef = useRef(null);

  // A new task starts at the top of its brief, not where the last one was scrolled.
  useEffect(() => {
    briefRef.current?.scrollTo({ top: 0 });
  }, [current]);

  const task = tasks[current];
  const s = state[task.id];
  const nameIt = nameItFor(task);
  const patch = (id, changes) => setState((all) => ({ ...all, [id]: { ...all[id], ...changes } }));

  const passing = Boolean(s.result?.passed);
  const done = new Set(tasks.filter((t) => state[t.id].done).map((t) => t.id));
  // 0 not run, 1 failing, 2 passing, 3 done: drives the brief's checklist.
  const progress = s.done ? 3 : passing ? 2 : s.result ? 1 : 0;

  const files = [
    { name: task.file, kind: "code", byAI: task.type === "review" },
    ...(task.testFile ? [{ name: task.testFile, kind: "test" }] : []),
  ];
  const starterOf = (name) => (name === task.testFile ? task.testStarter : task.starter);

  const finish = (id) => {
    markTaskFinished(trackId, layerId, slug, id, allIds);
    patch(id, { done: true });
  };

  const runTests = async () => {
    if (checking) return;
    const id = task.id;
    setChecking(true);
    setError(null);
    try {
      const result = await checkTask(task, state[id].code, run);
      patch(id, { result });
      // A write task has nothing to name: passing finishes it.
      if (result.passed && !nameItFor(task)) finish(id);
    } catch {
      setError("The test runner failed. Try again.");
    } finally {
      setChecking(false);
    }
  };

  const showSolution = () =>
    patch(task.id, {
      solutionShown: true,
      code: { ...s.code, [task.file]: task.solution, ...(task.testFile ? { [task.testFile]: task.proofTest } : {}) },
    });

  return (
    // Same sizing rule as the challenge Arena: fill the screen under the sticky navbar.
    <div className="flex flex-col bg-black text-neutral-100 lg:h-[calc(100dvh-var(--navbar-h,48px))]">
      <header className="border-b border-neutral-800 bg-black">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <Link
            to={lessonHref}
            aria-label="Back to the lesson"
            className="flex size-11 items-center justify-center rounded-xl border border-neutral-800 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
          <div className="min-w-0 flex-1">
            {/* Where this lab sits in the building: Labs › room, then the lab's length. */}
            <nav aria-label="Lab location" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest">
              <Link to="/labs" className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300">
                <FlaskConical size={12} aria-hidden="true" /> Labs
              </Link>
              {room && (
                <>
                  <span className="text-neutral-600" aria-hidden="true">›</span>
                  <Link to={`/labs/${room.id}`} className={`${room.accent.text} hover:underline`}>
                    {room.title}
                  </Link>
                </>
              )}
              <span className="text-neutral-500">· ~{lab.minutes} min</span>
            </nav>
            <p className="text-sm font-medium leading-snug text-white">{meta?.lessonTitle ?? "Lab"}</p>
          </div>
          <TaskStepper tasks={tasks} current={current} done={done} onSelect={setCurrent} />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(340px,420px)_1fr]">
        <aside ref={briefRef} className="overflow-y-auto border-b border-neutral-800 px-5 py-6 lg:border-r lg:border-b-0">
          <TaskBrief task={task} index={current} total={tasks.length} progress={progress} />

          {(passing || s.done) && (
            <div className="mt-6">
              {s.done ? (
                <TaskComplete
                  isLast={done.size === tasks.length || current === tasks.length - 1}
                  onNext={() => setCurrent((c) => Math.min(c + 1, tasks.length - 1))}
                  backHref={lessonHref}
                  explanation={nameIt?.explanation}
                />
              ) : (
                nameIt && <NameItCard key={task.id} nameIt={nameIt} onDone={() => finish(task.id)} />
              )}
            </div>
          )}

          {!s.done && (
            <HintLadder
              hints={task.hints}
              revealed={s.hints}
              onReveal={() => patch(task.id, { hints: s.hints + 1 })}
              onShowSolution={showSolution}
              solutionShown={s.solutionShown}
            />
          )}
        </aside>

        <main className="flex min-h-[560px] flex-col lg:min-h-0 lg:overflow-y-auto">
          <Workspace
            files={files}
            activeFile={s.activeFile}
            onSelectFile={(name) => patch(task.id, { activeFile: name })}
            code={s.code[s.activeFile]}
            onChange={(value) => patch(task.id, { code: { ...s.code, [s.activeFile]: value } })}
            edited={s.code[s.activeFile] !== starterOf(s.activeFile)}
            onReset={() => patch(task.id, { code: { ...s.code, [s.activeFile]: starterOf(s.activeFile) } })}
            onRun={runTests}
            running={checking}
          />
          <ResultsDock run={s.result} running={checking} error={error} />
        </main>
      </div>
    </div>
  );
}
