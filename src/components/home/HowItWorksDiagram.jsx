import { memo, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, MotionConfig, useInView, useReducedMotion } from "motion/react";
import {
  BookOpen,
  Bot,
  BadgeCheck,
  Briefcase,
  ClipboardCheck,
  Library,
  Lock,
  LockOpen,
  Map as MapIcon,
  Mic,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { PHASES, TO } from "./hiwRoutes";
import { SoonTag } from "./hiwShared";

/**
 * "How it works", mirrored top to bottom around the test, which sits dead centre
 * because it is what the product is about: nothing opens without passing it.
 *
 *                  Explain it back --- Voice exam     Join a Build Team
 *                 /                        |         /                 \
 *   Pick - Study ---- Practice ---- Pass the test ---                   ---- Get seen
 *                 \                        |         \                 /
 *                  Code Library ------ Mentor        Capstone
 *
 * Line style has one meaning, and the legend says it out loud: solid is required, every
 * learner walks it; dashed is optional help. Every line in the top half has a twin in
 * the bottom half, so keep them in pairs.
 *
 * Nodes sit on a fixed 1200x560 grid (percent positions), an SVG with the
 * same viewBox draws the connectors, so lines and nodes always line up.
 * This file is desktop-only: HowItWorks.jsx loads it from lg up and shows a plain
 * vertical list below that.
 *
 * "Explain it back" (voice teach-back) and the Code Library are not built yet, so they carry a "Soon" tag.
 */

const W = 1200;
const H = 560;
const pos = ({ x, y }) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const MAIN = H / 2; // the main row
const ARM = 150; // how far both outer rows sit from it; one number, so they stay mirrored
const UP = MAIN - ARM;
const DOWN = MAIN + ARM;

const COL = { root: 80, study: 250, fork: 320, inner: 440, centre: 600, outer: 790, merge: 985, end: 1120 };

// Circle centres on the 1200x560 grid.
const N = {
  root: { x: COL.root, y: MAIN },
  study: { x: COL.study, y: MAIN },
  practice: { x: COL.inner, y: MAIN },
  voice: { x: COL.inner, y: UP },
  library: { x: COL.inner, y: DOWN },
  exam: { x: COL.centre, y: MAIN },
  voiceExam: { x: COL.centre, y: UP },
  mentor: { x: COL.centre, y: DOWN },
  teams: { x: COL.outer, y: UP },
  capstone: { x: COL.outer, y: DOWN },
  fork: { x: COL.fork, y: MAIN }, // where the two kinds of help leave the main line
  merge: { x: COL.merge, y: MAIN }, // where the two proof branches join, its mirror
  recruiters: { x: COL.end, y: MAIN },
};

const R = 28; // node circle radius in grid units, so lines stop at the edge
const D = R * 0.7; // offset to the circle's diagonal edge (45 degrees)

// The story loops while the section is on screen. A purple line travels from
// "Pick a path" to the end, and each node lights up as the line reaches it.
// Each number is when a beat starts, measured from the start of a cycle:
//   1 Pick a path lights, line draws to Study      2 Study lights, lines fan out to Practice,
//                                                    Explain it back and Code Library
//   3 those three light, lines head to the test    4 first try fails: line drops to the mentor
//   5 mentor lights, Retry spins                   6 lock opens, Verified pops, lines split in two
//   7 team + capstone light, lines merge           8 recruiters see you
// After the last beat the lit-up diagram holds, fades back, and the cycle restarts.
const STAGE_MS = [300, 800, 1300, 1900, 2400, 3100, 3600, 4200];
const CYCLE_MS = 8000; // ~3.8s of "everything lit" before it resets
const DRAW_S = 0.5; // how long the purple line takes to travel one segment
const LAST_STAGE = STAGE_MS.length;

// True while the browser tab is visible. useSyncExternalStore is React's built-in
// way to subscribe to a browser API without effects-and-state boilerplate.
const subscribeVisibility = (onChange) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};
const usePageVisible = () =>
  useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true, // server render: assume visible
  );

const LEGEND = [
  { label: "Required", dash: undefined },
  { label: "Optional help", dash: "4 6" },
];

const PURPLE = "rgba(168,85,247,0.8)";
const GREY = "rgba(115,115,115,0.7)";

// Curve from the right edge of one node to the left edge of another (same row).
const curve = (a, b) =>
  `M ${a.x + R} ${a.y} C ${a.x + 90} ${a.y}, ${b.x - 90} ${b.y}, ${b.x - R} ${b.y}`;

// Leave the test from its diagonal edge at 45 degrees and arrive level at a branch node.
// The angle keeps the line clear of the tags above and below the test and of its label.
const branchOut = (a, b) => {
  const dir = b.y < a.y ? -1 : 1;
  return `M ${a.x + D} ${a.y + dir * D} C ${a.x + 65} ${a.y + dir * 65}, ${a.x + 100} ${b.y}, ${b.x - R} ${b.y}`;
};

// Leave the main line at point m and bend out to a branch node: the mirror of mergeIn.
const forkOut = (m, b) =>
  `M ${m.x} ${m.y} C ${m.x + 50} ${m.y}, ${m.x + 50} ${b.y}, ${b.x - R} ${b.y}`;

// A straight line down the column from one circle's edge to another's.
const vertical = (a, b) => {
  const dir = b.y > a.y ? 1 : -1;
  return `M ${a.x} ${a.y + dir * R} L ${b.x} ${b.y - dir * R}`;
};

// Leave a branch node level and bend smoothly onto the main row at point m, where
// both branches meet before the last node (as in the sketch).
const mergeIn = (a, m) =>
  `M ${a.x + R} ${a.y} C ${m.x - 50} ${a.y}, ${m.x - 50} ${m.y}, ${m.x} ${m.y}`;

// The purple "progress" line drawn on top of an edge. pathLength 0 -> 1 draws it from
// the edge's start to its end, which is why every path above is written in the
// direction of travel. On reset it fades out instead of un-drawing backwards.
const DRAW = {
  rest: { pathLength: 0, opacity: 0, transition: { duration: 0.4 } },
  lit: (drawDelay) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: drawDelay, duration: DRAW_S, ease: "easeInOut" },
      opacity: { delay: drawDelay, duration: 0.01 },
    },
  }),
};

// An edge is a static base line (grey, or always-purple when `active`), plus an
// optional purple line that travels along it while `lit`. Leave `lit` out for edges
// that are not part of the travelling path.
//
// Solid edges draw by animating the purple path's own pathLength. That trick uses
// stroke-dasharray internally, so it would wipe out a dashed pattern. Dashed edges
// instead keep a purple dashed copy and reveal it through a mask whose (solid) path
// draws itself: the reveal travels, and the dashes stay dashes.
//
// Edge, Circle and RetryLabel are memoised and take only primitive or module-level
// props, so a stage change re-renders just the few parts it lights up, not all of them.
const Edge = memo(function Edge({ d, active = false, lit, drawDelay = 0, dashed = false, inView, delay = 0 }) {
  // useId keeps mask ids unique; strip React's id punctuation so it is safe in url(#...)
  const maskId = `hiw-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const shared = { d, fill: "none", strokeWidth: "1.5", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" };
  const dash = dashed ? "4 6" : undefined;
  const travel = { custom: drawDelay, variants: DRAW, initial: "rest", animate: lit ? "lit" : "rest" };
  return (
    <>
      <motion.path
        {...shared}
        stroke={active ? PURPLE : GREY}
        strokeDasharray={dash}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay, duration: 0.5 }}
      />
      {lit !== undefined && !dashed && <motion.path {...shared} stroke={PURPLE} {...travel} />}
      {lit !== undefined && dashed && (
        <>
          {/* userSpaceOnUse: the default mask box is the path's bounding box, which is
              zero-width for a vertical line and would hide it completely */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <motion.path d={d} fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" {...travel} />
          </mask>
          <path {...shared} stroke={PURPLE} strokeDasharray={dash} mask={`url(#${maskId})`} />
        </>
      )}
    </>
  );
});

// The lucide `</>` icon, drawn by hand so its parts can move: the brackets split
// apart and the slash vanishes, then the slash draws back in as the brackets close.
// It plays just before the exam lock opens, so the line reads "practice, then pass".
//
// All icon animations use named variants ("rest" / "play"). Motion only starts an
// animation when the variant name changes, so re-renders mid-cycle never restart
// it, and flipping back to "rest" then "play" replays it cleanly on the next loop.
const SPLIT_T = { duration: 1.1, times: [0, 0.35, 0.6, 1], ease: "easeInOut" };
const SPLIT = {
  left: { rest: { x: 0 }, play: { x: [0, -3, -3, 0], transition: SPLIT_T } },
  right: { rest: { x: 0 }, play: { x: [0, 3, 3, 0], transition: SPLIT_T } },
  // opacity rides along so the round line cap does not leave a dot at length 0
  slash: {
    rest: { pathLength: 1, opacity: 1 },
    play: { pathLength: [1, 0, 0, 1], opacity: [1, 0, 0, 1], transition: SPLIT_T },
  },
};

function SplitCode({ active }) {
  const state = active ? "play" : "rest";
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
    >
      <motion.path d="m6 8-4 4 4 4" variants={SPLIT.left} initial="rest" animate={state} />
      <motion.path d="m18 16 4-4-4-4" variants={SPLIT.right} initial="rest" animate={state} />
      <motion.path d="m14.5 4-5 16" variants={SPLIT.slash} initial="rest" animate={state} />
    </svg>
  );
}

// The lucide `users` icon, drawn by hand: the second person slides in beside the
// first, so the node literally "joins a team". On reset it slides back out.
const JOIN = {
  rest: { x: 6, opacity: 0, transition: { duration: 0.4 } },
  play: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 16 } },
};

function JoinTeam({ active }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.g variants={JOIN} initial="rest" animate={active ? "play" : "rest"}>
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </motion.g>
    </svg>
  );
}

// The trophy pops and wiggles once, like it was just handed over.
const POP = {
  rest: { scale: 1, rotate: 0 },
  play: { scale: [1, 1.3, 1], rotate: [0, -12, 10, 0], transition: { duration: 0.7, ease: "easeOut" } },
};

function TrophyPop({ active }) {
  return (
    <motion.span className="flex" variants={POP} initial="rest" animate={active ? "play" : "rest"}>
      <Trophy size={22} aria-hidden="true" />
    </motion.span>
  );
}

// The Retry icon spins once as the retry line loops back to the exam.
const SPIN = {
  rest: { rotate: 0, transition: { duration: 0 } },
  play: { rotate: -360, transition: { duration: 0.6, ease: "easeInOut" } },
};

// The Verified badge pops as the test opens, the mirror of Retry's spin below it.
const BADGE = {
  rest: { scale: 1, transition: { duration: 0 } },
  play: { scale: [1, 1.5, 1], transition: { duration: 0.5, ease: "easeOut" } },
};

// "Get seen": two purple rings ripple out of the circle, like a spotlight finding you.
const PING = {
  rest: { scale: 1, opacity: 0, transition: { duration: 0 } },
  play: (delay) => ({
    scale: [1, 1.9],
    opacity: [0.8, 0],
    transition: { delay, duration: 1.2, ease: "easeOut" },
  }),
};

function SeenPing({ active }) {
  return (
    <>
      {[0, 0.5].map((delay) => (
        <motion.span
          key={delay}
          className="pointer-events-none absolute inset-0 rounded-full border border-purple-500"
          custom={delay}
          variants={PING}
          initial="rest"
          animate={active ? "play" : "rest"}
        />
      ))}
      <Briefcase size={22} aria-hidden="true" />
    </>
  );
}

const ExamLock = ({ active }) =>
  active ? <LockOpen size={22} aria-hidden="true" /> : <Lock size={22} aria-hidden="true" />;

// Icons are passed to Circle as components, not as JSX children: a child element is a
// new object on every render, which would defeat Circle's memo.
const staticIcon = (Icon) => {
  const StaticIcon = () => <Icon size={22} aria-hidden="true" />;
  return StaticIcon;
};
const MapNode = staticIcon(MapIcon);
const StudyNode = staticIcon(BookOpen);
const LibraryNode = staticIcon(Library);
const VoiceNode = staticIcon(Mic);
const VoiceExamNode = staticIcon(ClipboardCheck);
const MentorNode = staticIcon(Bot);

// Where the text sits relative to the circle. The circle itself is always centred on
// `at`, so edges drawn to the node's coordinates meet the circle exactly.
const TEXT_SIDE = {
  bottom: "left-1/2 top-full mt-2 w-36 -translate-x-1/2 items-center bg-black text-center",
  // Study and Practice: narrow enough that the fork's lines pass between their labels.
  bottomNarrow: "left-1/2 top-full mt-2 w-28 -translate-x-1/2 items-center bg-black text-center",
  top: "left-1/2 bottom-full mb-2 w-36 -translate-x-1/2 items-center text-center",
  right: "left-full top-1/2 ml-3 w-40 -translate-y-1/2 items-start text-left",
};

const Circle = memo(function Circle({ at, to, label, sub, icon: Icon, side = "bottom", active = false, soon = false, inView, delay }) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={pos(at)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.35 }}
    >
      <Link
        to={to}
        aria-label={label}
        className="group block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
      >
        <span
          className={`relative flex h-14 w-14 items-center justify-center rounded-full border bg-black transition-[color,border-color,box-shadow] duration-500 group-hover:border-purple-400 group-hover:text-purple-200 ${
            active
              ? "border-purple-500 text-purple-300 shadow-[0_0_28px_-4px_rgba(168,85,247,0.6)]"
              : "border-neutral-700 text-neutral-300"
          }`}
        >
          <Icon active={active} />
        </span>
        <div className={`absolute flex flex-col ${TEXT_SIDE[side]}`}>
          {soon && <SoonTag className="mb-1" />}
          <span className="text-sm font-medium text-neutral-100">{label}</span>
          {sub && <span className="mt-0.5 text-xs text-neutral-400">{sub}</span>}
        </div>
      </Link>
    </motion.div>
  );
});

// The small tag sitting on a vertical line: what happens on the way back to the test.
const LineTag = memo(function LineTag({ at, icon: Icon, label, variants, active, inView, delay }) {
  return (
    <motion.span
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-black px-1.5 py-0.5 text-xs transition-colors duration-500 ${
        active ? "text-purple-300" : "text-neutral-500"
      }`}
      style={pos(at)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
    >
      <motion.span className="flex" variants={variants} initial="rest" animate={active ? "play" : "rest"}>
        <Icon size={11} aria-hidden="true" />
      </motion.span>
      {label}
    </motion.span>
  );
});

// The three acts of the story, above the columns they cover. They carry the idea for
// someone who reads nothing else on the page.
const PhaseLabel = memo(function PhaseLabel({ label, centre, active, inView }) {
  return (
    <motion.span
      className={`absolute -top-14 -translate-x-1/2 text-lg font-[450] tracking-tight whitespace-nowrap transition-colors duration-500 ${
        active ? "text-white" : "text-neutral-500"
      }`}
      style={{ left: `${(centre / W) * 100}%` }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {label}
    </motion.span>
  );
});

// Desktop-only. HowItWorks loads this chunk (and with it the motion library) only
// when the viewport is lg or wider, so phones never download or run any of it.
const HowItWorksDiagram = () => {
  const ref = useRef(null);
  // `appeared` latches true the first time the diagram is seen (drives the one-time
  // fade-in of nodes and lines). `onScreen` tracks it live, to pause the loop.
  const appeared = useInView(ref, { once: true, amount: 0.25 });
  const onScreen = useInView(ref, { amount: 0.25 });
  const pageVisible = usePageVisible();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  // Loop the story only while someone can actually see it. Leaving the viewport or
  // switching tabs clears every timer, so an off-screen section costs nothing; coming
  // back restarts the cycle from the top.
  useEffect(() => {
    if (!appeared) return;
    if (reduceMotion) {
      setStage(LAST_STAGE); // no motion: just show the finished, lit-up diagram
      return;
    }
    if (!onScreen || !pageVisible) return;

    let timers = [];
    const runCycle = () => {
      timers.forEach(clearTimeout);
      setStage(0);
      timers = [
        ...STAGE_MS.map((ms, i) => setTimeout(() => setStage(i + 1), ms)),
        setTimeout(runCycle, CYCLE_MS),
      ];
    };
    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [appeared, onScreen, pageVisible, reduceMotion]);

  const started = stage >= 1;
  const studied = stage >= 2;
  const practiced = stage >= 3;
  const failed = stage >= 4;
  const retried = stage >= 5;
  const unlocked = stage >= 6;
  const proven = stage >= 7;
  const seen = stage >= 8;

  return (
    // reducedMotion="user": people with "reduce motion" on get the end state.
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="relative h-full w-full">
        <PhaseLabel label={PHASES.learn} centre={(COL.root + COL.inner) / 2} active={started} inView={appeared} />
        <PhaseLabel label={PHASES.prove} centre={COL.centre} active={practiced} inView={appeared} />
        <PhaseLabel label={PHASES.seen} centre={(COL.outer + COL.end) / 2} active={proven} inView={appeared} />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* The path everyone walks: solid, straight along the middle. */}
          <Edge d={curve(N.root, N.study)} lit={started} inView={appeared} delay={0.2} />
          <Edge d={curve(N.study, N.practice)} lit={studied} inView={appeared} delay={0.4} />
          <Edge d={curve(N.practice, N.exam)} lit={practiced} inView={appeared} delay={0.6} />

          {/* Optional help: dashed, forking off the main line, one above and one below. */}
          <Edge d={forkOut(N.fork, N.voice)} dashed lit={studied} inView={appeared} delay={0.5} />
          <Edge d={forkOut(N.fork, N.library)} dashed lit={studied} inView={appeared} delay={0.5} />

          {/* The outer rows carry on to the test's two companions. */}
          <Edge d={curve(N.voice, N.voiceExam)} dashed lit={unlocked} inView={appeared} delay={0.8} />
          <Edge d={curve(N.library, N.mentor)} dashed lit={failed} inView={appeared} delay={0.8} />

          {/* Both companions connect straight to the test: fail and fix, or pass and verify. */}
          <Edge d={vertical(N.exam, N.voiceExam)} dashed lit={unlocked} inView={appeared} delay={1.0} />
          <Edge d={vertical(N.exam, N.mentor)} dashed lit={failed} inView={appeared} delay={1.0} />

          {/* Passing opens both kinds of proof, and both lead to recruiters. */}
          <Edge d={branchOut(N.exam, N.teams)} lit={unlocked} inView={appeared} delay={1.1} />
          <Edge d={branchOut(N.exam, N.capstone)} lit={unlocked} inView={appeared} delay={1.1} />
          <Edge d={mergeIn(N.teams, N.merge)} lit={proven} inView={appeared} delay={1.3} />
          <Edge d={mergeIn(N.capstone, N.merge)} lit={proven} inView={appeared} delay={1.3} />
          <Edge
            d={`M ${N.merge.x} ${N.merge.y} L ${N.recruiters.x - R} ${N.recruiters.y}`}
            lit={proven}
            drawDelay={DRAW_S} // starts once the two merging lines arrive
            inView={appeared}
            delay={1.4}
          />
        </svg>

        <Circle at={N.root} to={TO.root} label="Pick a path" sub="Choose your track." icon={MapNode} active={started} inView={appeared} delay={0} />
        <Circle at={N.study} to={TO.study} label="Study the layer" sub="One layer at a time, in order." icon={StudyNode} side="bottomNarrow" active={studied} inView={appeared} delay={0.3} />
        <Circle at={N.practice} to={TO.practice} label="Practice it" sub="Solve real coding challenges." icon={SplitCode} side="bottomNarrow" active={practiced} inView={appeared} delay={0.5} />
        <Circle
          at={N.library}
          to={TO.library}
          label="Code Library"
          sub="Books for each layer. Your mentor reads them too."
          icon={LibraryNode}
          soon
          active={practiced}
          inView={appeared}
          delay={0.6}
        />
        <Circle
          at={N.voice}
          to={TO.voice}
          label="Explain it back"
          sub="Say it out loud. Your mentor checks you get it."
          icon={VoiceNode}
          side="top"
          soon
          active={practiced}
          inView={appeared}
          delay={0.6}
        />
        <Circle
          at={N.exam}
          to={TO.test}
          label="Pass the test"
          sub="Score 80% to unlock the next layer."
          icon={ExamLock}
          side="right"
          active={unlocked}
          inView={appeared}
          delay={0.7}
        />
        <Circle
          at={N.voiceExam}
          to={TO.exam}
          label="Voice exam"
          sub="Explain a layer out loud and get a verified result."
          icon={VoiceExamNode}
          side="top"
          active={unlocked}
          inView={appeared}
          delay={0.8}
        />
        <Circle at={N.mentor} to={TO.mentor} label="Mentor" sub="Finds your weak spots and helps you retry." icon={MentorNode} active={retried} inView={appeared} delay={1.0} />
        <Circle at={N.teams} to={TO.teams} label="Join a Build Team" sub="Ship real PRs with other learners." icon={JoinTeam} side="top" active={proven} inView={appeared} delay={1.1} />
        <Circle at={N.capstone} to={TO.capstone} label="Capstone" sub="Build and defend a real project." icon={TrophyPop} active={proven} inView={appeared} delay={1.1} />
        <Circle
          at={N.recruiters}
          to={TO.recruiters}
          label="Get seen by recruiters"
          sub="Every PR and project becomes public proof."
          icon={SeenPing}
          active={seen}
          inView={appeared}
          delay={1.5}
        />

        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-6 text-xs whitespace-nowrap text-neutral-400">
          {LEGEND.map(({ label, dash }) => (
            <span key={label} className="flex items-center gap-2">
              <svg width="28" height="2" aria-hidden="true">
                <line x1="0" y1="1" x2="28" y2="1" stroke={GREY} strokeWidth="1.5" strokeDasharray={dash} />
              </svg>
              {label}
            </span>
          ))}
        </div>

        <LineTag
          at={{ x: COL.centre, y: MAIN - ARM / 2 }}
          icon={BadgeCheck}
          label="Verified"
          variants={BADGE}
          active={unlocked}
          inView={appeared}
          delay={1.4}
        />
        <LineTag
          at={{ x: COL.centre, y: MAIN + ARM / 2 }}
          icon={RotateCcw}
          label="Retry"
          variants={SPIN}
          active={retried}
          inView={appeared}
          delay={1.4}
        />
      </div>
    </MotionConfig>
  );
};

export default HowItWorksDiagram;
