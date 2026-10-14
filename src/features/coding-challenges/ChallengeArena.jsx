import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Seo from "../../seo/Seo";
import { formatTitle } from "./lib/formatTitle";
import LoadingSuspense from "../../components/feedback/LoadingSuspense";
import useChallengeStore from "./store/useChallengeStore";
import useCodeRunner from "./hooks/useCodeRunner";
import useArenaFiles from "./hooks/useArenaFiles";
import useArenaSubmit from "./hooks/useArenaSubmit";
import useArenaHints from "./hooks/useArenaHints";
import useResizableWidth from "./hooks/useResizableWidth";
import { C, FONT_MONO, FONT_SANS } from "./lib/arenaTheme";
import SubBar from "./components/arena/SubBar";
import ProblemPanel from "./components/arena/ProblemPanel";
import CodePanel from "./components/arena/CodePanel";
import RightPanel from "./components/arena/RightPanel";
import ActionBar from "./components/arena/ActionBar";
import SolvedPanel from "./components/arena/SolvedPanel";

const MOBILE_TABS = [
  { key: "problem", label: "Problem" },
  { key: "code", label: "Code" },
  { key: "side", label: "Hints & mentor" },
];

export default function ChallengeArena() {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    challenge, attempt, error,
    loadChallenge, clearChallenge, startAttempt, saveDraft, revealHint, submitAttempt,
  } = useChallengeStore();

  // Stage 3: the files are executed in a throwaway Web Worker, off the UI
  // thread, so a bad solution can't freeze the Arena.
  const { run, running, results } = useCodeRunner();

  // The Arena is a `position: fixed` full-viewport layout, but the browser
  // still carries over whatever scroll position the catalog page was at —
  // so without this, arriving here mid-scroll renders the fixed layout
  // pushed down until the user manually scrolls back up.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    loadChallenge(slug);
    startAttempt(slug);
    return clearChallenge;
  }, [slug, loadChallenge, clearChallenge, startAttempt]);

  const { files, updateFile, saveNow } = useArenaFiles({ challenge, attempt, saveDraft });
  const { submit: runSubmit, submitting, verdict, setVerdict } = useArenaSubmit(submitAttempt);
  const { hints, buyHint } = useArenaHints({ challenge, attempt, revealHint });

  // Remembered across challenges: someone who hides the hints wants them
  // hidden on the next one too. Storage can throw (private mode), so it is
  // only ever a convenience.
  const [hintsCollapsed, setHintsCollapsed] = useState(() => {
    try {
      return localStorage.getItem("arena:hintsCollapsed") === "1";
    } catch {
      return false;
    }
  });
  // Each side panel may grow only while the editor keeps room to breathe.
  const EDITOR_MIN = 360;
  const RAIL_WIDTH = 44;
  const MENTOR_MIN_WIDTH = 380;
  const problemPane = useResizableWidth({
    storageKey: "arena:problemWidth",
    label: "Resize problem panel",
    edge: "right",
    defaultWidth: 340,
    min: 260,
    max: 640,
    maxFor: () => window.innerWidth - (hintsCollapsed ? RAIL_WIDTH : hintsPane.width) - EDITOR_MIN,
  });
  const hintsPane = useResizableWidth({
    storageKey: "arena:hintsWidth",
    label: "Resize hints panel",
    edge: "left",
    defaultWidth: 272,
    min: 220,
    max: 560,
    maxFor: () => window.innerWidth - problemPane.width - EDITOR_MIN,
  });
  const dragging = problemPane.dragging || hintsPane.dragging;
  const toggleHints = () =>
    setHintsCollapsed((v) => {
      try {
        localStorage.setItem("arena:hintsCollapsed", v ? "0" : "1");
      } catch {
        /* not persisted */
      }
      return !v;
    });

  // Shown once per fresh pass; dismissing it doesn't discard the verdict —
  // "View solution" in the action bar brings it back without re-submitting.
  const [showSolved, setShowSolved] = useState(true);
  const submit = async () => {
    setShowSolved(true);
    await runSubmit();
  };

  // The mentor reads the saved attempt, so save first or it sees stale code.
  // It opens in the side panel instead of navigating away, so the code and the
  // problem stay on screen while you talk.
  const [sideTab, setSideTab] = useState("hints");
  // Below 1100px the three columns become one full-height pane at a time.
  const [mobileTab, setMobileTab] = useState("code");
  const askMentor = async () => {
    await saveNow();
    setSideTab("mentor");
    setMobileTab("side");
    if (hintsCollapsed) toggleHints();
    hintsPane.ensureWidth(MENTOR_MIN_WIDTH);
  };

  const challengeContext = useMemo(
    () =>
      challenge
        ? {
            challengeSlug: challenge.slug,
            path: challenge.trackId,
            layer: challenge.layerId,
            topic: challenge.tags?.[0],
          }
        : null,
    [challenge],
  );

  const handleChangeFile = (name, code) => {
    // Editing invalidates the previous verdict — showing a stale "passed"
    // next to changed code would be a lie.
    setVerdict(null);
    updateFile(name, code);
  };

  const breadcrumb = useMemo(
    () => (challenge ? ["arena", challenge.trackId, challenge.layerId] : ["arena"]),
    [challenge],
  );

  if (!challenge) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height: "calc(100dvh - var(--navbar-h, 48px))",
          background: C.bg,
          fontFamily: FONT_MONO,
          color: C.muted,
        }}
      >
        {/* No error means the fetch hasn't started or is in flight; a failed
            or missing challenge always sets `error`, so "not found" can't
            flash up before the request even begins. */}
        {error ? (
          <p className="text-[12px]" style={{ color: C.rose }}>
            Couldn&apos;t load this challenge — {error}
          </p>
        ) : (
          <LoadingSuspense fill />
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-hidden relative"
      style={{
        height: "calc(100dvh - var(--navbar-h, 48px))",
        background: C.bg,
        fontFamily: FONT_SANS,
        color: C.text,
      }}
    >
      <Seo noindex path={pathname} title={`${formatTitle(challenge.title)} | Coding Challenges | Vahoha`} />
      <SubBar
        breadcrumb={breadcrumb}
        challengeId={challenge.slug}
        pager={null}
        onBack={() => navigate("/coding-challenges")}
      />

      <div className="arena-mobile-tabs shrink-0" role="tablist" aria-label="Arena sections" style={{ borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        {MOBILE_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mobileTab === key}
            onClick={() => setMobileTab(key)}
            className="flex-1 cursor-pointer border-b-2 py-2.5 text-[12px] font-medium transition-colors"
            style={{
              borderColor: mobileTab === key ? C.purple : "transparent",
              color: mobileTab === key ? C.text : C.muted,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        data-tab={mobileTab}
        className={`arena-workspace thin-scrollbar flex-1 min-h-0 overflow-hidden ${dragging ? "is-dragging" : ""}`}
        style={{ display: "grid", gridTemplateColumns: `${problemPane.width}px 1fr ${hintsCollapsed ? RAIL_WIDTH : hintsPane.width}px` }}
      >
        <div data-pane="problem" className="relative h-full overflow-hidden flex flex-col" style={{ borderRight: `1px solid ${C.border}` }}>
          <div {...problemPane.handleProps} className="arena-resize-handle edge-right" />
          <ProblemPanel challenge={challenge} />
        </div>

        <div data-pane="code" className="h-full overflow-hidden flex flex-col" style={{ borderRight: `1px solid ${C.border}` }}>
          <CodePanel key={challenge.slug} files={files} onChangeFile={handleChangeFile} />
        </div>

        <div data-pane="side" className="relative h-full overflow-hidden flex flex-col">
          {!hintsCollapsed && <div {...hintsPane.handleProps} className="arena-resize-handle" />}
          <RightPanel
            tab={sideTab}
            onTabChange={(t) => {
              setSideTab(t);
              if (t === "mentor") hintsPane.ensureWidth(MENTOR_MIN_WIDTH);
            }}
            collapsed={hintsCollapsed}
            onToggle={toggleHints}
            hints={hints}
            onReveal={buyHint}
            challengeContext={challengeContext}
          />
        </div>
      </div>

      {showSolved && (
        <SolvedPanel verdict={verdict} onDismiss={() => setShowSolved(false)} />
      )}

      <ActionBar
        testResults={verdict?.results?.length ? verdict.results : results}
        running={running}
        onRun={() => { setVerdict(null); run(files); }}
        onSubmit={submit}
        submitting={submitting}
        lastRunAt={verdict ? "graded" : results.length ? "just now" : null}
        verdict={verdict}
        onViewSolution={verdict?.passed ? () => setShowSolved(true) : null}
        onAskMentor={askMentor}
      />

      {/* Responsive: below 1100px the columns become tabs */}
      <style>{`
        .arena-workspace { transition: grid-template-columns 0.2s ease; }
        .arena-workspace.is-dragging { transition: none; user-select: none; cursor: col-resize; }
        /* 8px hit area so it is easy to grab; only a 2px line is ever drawn. */
        .arena-resize-handle {
          position: absolute; left: 0; top: 0; z-index: 10; height: 100%; width: 8px;
          cursor: col-resize; touch-action: none; outline: none;
        }
        .arena-resize-handle::after {
          content: ""; position: absolute; left: 0; top: 0; height: 100%; width: 2px;
          background: transparent; transition: background 0.15s;
        }
        .arena-resize-handle.edge-right { left: auto; right: 0; }
        .arena-resize-handle.edge-right::after { left: auto; right: 0; }
        .arena-resize-handle:hover::after, .arena-resize-handle:focus-visible::after,
        .is-dragging .arena-resize-handle::after { background: rgba(147, 51, 234, 0.7); }
        @media (prefers-reduced-motion: reduce) {
          .arena-workspace { transition: none; }
        }
        @media (min-width: 1101px) {
          [data-collapsed="true"] .hints-full { display: none; }
          [data-collapsed="true"] .hints-rail { display: flex; }
        }
        @media (max-width: 1100px) {
          .hints-toggle { display: none; }
          .arena-resize-handle { display: none; }
        }
        .arena-mobile-tabs { display: none; }
        /* One pane at a time, each filling the workspace, so the editor and
           the mentor chat keep a real height instead of collapsing. */
        @media (max-width: 1100px) {
          .arena-mobile-tabs { display: flex; }
          .arena-workspace { grid-template-columns: minmax(0, 1fr) !important; grid-template-rows: minmax(0, 1fr); }
          .arena-workspace > [data-pane] { display: none; border-right: 0 !important; }
          .arena-workspace[data-tab="problem"] > [data-pane="problem"],
          .arena-workspace[data-tab="code"] > [data-pane="code"],
          .arena-workspace[data-tab="side"] > [data-pane="side"] { display: flex; }
        }
      `}</style>
    </div>
  );
}
