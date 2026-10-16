import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, MotionConfig, useInView, useReducedMotion } from "motion/react";
import {
  BookOpen,
  Bot,
  Briefcase,
  ClipboardCheck,
  Code2,
  Lock,
  LockOpen,
  Map as MapIcon,
  Mic,
  RotateCcw,
  Trophy,
  Users,
} from "lucide-react";
import { FEATURES } from "../../../constants/features";

/**
 * "How it works" as a branching path diagram (from the founder's sketch):
 *
 *                 Explain it back             Join a Build Team
 *                /               \           /                 \
 *   Pick a path - Study - Practice it - Pass the exam            Get seen by recruiters
 *                                       |          \           /
 *                                   AI mentor        Capstone
 *
 * "Explain it back" is a second route from studying to the exam. Passing opens two
 * kinds of proof (team PRs and the capstone), and both lead to recruiters.
 *
 * Desktop: nodes sit on a fixed 1200x460 grid (percent positions), an SVG with the
 * same viewBox draws the connectors, so lines and nodes always line up.
 * Below lg: a simple vertical list, because the diagram does not fit.
 *
 * "Explain it back" (voice teach-back) is not built yet, so it carries a "Soon" tag.
 */

const W = 1200;
const H = 460;
const pos = ({ x, y }) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const MAIN = 230; // the main row
const UP = 110; // the upper branches
const DOWN = 350; // the lower branches

// Circle centres on the 1200x460 grid.
const N = {
  root: { x: 80, y: MAIN },
  study: { x: 270, y: MAIN },
  practice: { x: 460, y: MAIN },
  voice: { x: 460, y: UP },
  exam: { x: 650, y: MAIN },
  examTop: { x: 650, y: UP }, // new "Exam" node between "Explain it back" and "Join a Build Team"
  mentor: { x: 650, y: 380 },
  teams: { x: 880, y: UP },
  capstone: { x: 880, y: DOWN },
  merge: { x: 1040, y: MAIN }, // where the two proof branches join
  recruiters: { x: 1110, y: MAIN },
};

const R = 28; // node circle radius in grid units, so lines stop at the edge
const D = R * 0.7; // offset to the circle's diagonal edge (45 degrees)

// Where each step leads. Exams live inside a layer, so "Pass the exam" opens the
// roadmaps, where the layer (and its exam) is picked. "Get seen" goes to the
// candidates list when that feature is on, otherwise to the user's own profile.
const TO = {
  root: "/roadmaps",
  study: "/roadmaps",
  practice: "/coding-challenges",
  voice: "/voice-review",
  exam: "/roadmaps",
  mentor: "/ai-agent",
  teams: "/team",
  capstone: "/capstone",
  recruiters: FEATURES.candidates ? "/candidates" : "/my-profile",
};

const MOBILE_STEPS = [
  { to: TO.root, title: "Pick a path", body: "Choose your track.", icon: MapIcon },
  { to: TO.study, title: "Study the layer", body: "10 layers in a track.", icon: BookOpen },
  { to: TO.practice, title: "Practice it", body: "Solve real coding challenges.", icon: Code2 },
  { to: TO.voice, title: "Explain it back", body: "Say it out loud. Your mentor checks you get it.", icon: Mic, soon: true },
  { to: TO.exam, title: "Exam", body: "Test what you learned.", icon: ClipboardCheck },
  { to: TO.exam, title: "Pass the test", body: "Score 80% to unlock the next layer.", icon: Lock },
  { to: TO.mentor, title: "AI mentor", body: "Finds your weak spots and helps you retry.", icon: Bot },
  { to: TO.teams, title: "Join a Build Team", body: "Ship real PRs with other learners.", icon: Users },
  { to: TO.capstone, title: "Capstone", body: "Build and defend a real project.", icon: Trophy },
  { to: TO.recruiters, title: "Get seen by recruiters", body: "Every PR and project becomes public proof.", icon: Briefcase },
];

// The story loops while the section is on screen. A purple line travels from
// "Pick a path" to the end, and each node lights up as the line reaches it.
// Each number is when a beat starts, measured from the start of a cycle:
//   1 Pick a path lights, line draws to Study      2 Study lights, lines draw to Practice
//                                                    and up to Explain it back
//   3 Practice + mic light (</> splits), both lines head to the exam   4 first try fails: line drops to the mentor
//   5 mentor lights, Retry loops back (icon spins) 6 lock opens, line splits in two
//   7 team + capstone light, lines merge            8 recruiters see you
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

const PURPLE = "rgba(168,85,247,0.8)";
const GREY = "rgba(115,115,115,0.7)";

// Curve from the right edge of one node to the left edge of another (same row).
const curve = (a, b) =>
  `M ${a.x + R} ${a.y} C ${a.x + 90} ${a.y}, ${b.x - 90} ${b.y}, ${b.x - R} ${b.y}`;

// Leave a main-row node from its diagonal edge, turn, and arrive level at a branch node.
const branchOut = (a, b) => {
  const sy = b.y < a.y ? a.y - D : a.y + D;
  return `M ${a.x + D} ${sy} C ${a.x + D + 10} ${b.y}, ${a.x + 70} ${b.y}, ${b.x - R} ${b.y}`;
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
// An edge is a static base line (grey, or always-purple when `active`), plus an
// optional purple line that travels along it while `lit`. Leave `lit` out for edges
// that are not part of the travelling path.
//
// Solid edges draw by animating the purple path's own pathLength. That trick uses
// stroke-dasharray internally, so it would wipe out a dashed pattern. Dashed edges
// instead keep a purple dashed copy and reveal it through a mask whose (solid) path
// draws itself: the reveal travels, and the dashes stay dashes.
function Edge({ d, active = false, lit, drawDelay = 0, dashed = false, inView, delay = 0 }) {
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
}

function SoonTag({ className = "" }) {
  return (
    <span
      className={`inline-block rounded-full border border-purple-500/40 px-1.5 py-px text-[10px] font-medium tracking-wide text-purple-300 uppercase ${className}`}
    >
      Soon
    </span>
  );
}

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

function SplitCode({ play }) {
  const state = play ? "play" : "rest";
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

function JoinTeam({ play }) {
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
      <motion.g variants={JOIN} initial="rest" animate={play ? "play" : "rest"}>
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

function TrophyPop({ play }) {
  return (
    <motion.span className="flex" variants={POP} initial="rest" animate={play ? "play" : "rest"}>
      <Trophy size={22} aria-hidden="true" />
    </motion.span>
  );
}

// The Retry icon spins once as the retry line loops back to the exam.
const SPIN = {
  rest: { rotate: 0, transition: { duration: 0 } },
  play: { rotate: -360, transition: { duration: 0.6, ease: "easeInOut" } },
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

function SeenPing({ play }) {
  return (
    <>
      {[0, 0.5].map((delay) => (
        <motion.span
          key={delay}
          className="pointer-events-none absolute inset-0 rounded-full border border-purple-500"
          custom={delay}
          variants={PING}
          initial="rest"
          animate={play ? "play" : "rest"}
        />
      ))}
      <Briefcase size={22} aria-hidden="true" />
    </>
  );
}

// Where the text sits relative to the circle. The circle itself is always centred on
// `at`, so edges drawn to the node's coordinates meet the circle exactly.
const TEXT_SIDE = {
  bottom: "left-1/2 top-full mt-2 w-36 -translate-x-1/2 items-center text-center",
  top: "left-1/2 bottom-full mb-2 w-36 -translate-x-1/2 items-center text-center",
  right: "left-full top-1/2 ml-3 w-40 -translate-y-1/2 items-start text-left",
};

function Circle({ at, to, label, sub, children, side = "bottom", active = false, soon = false, inView, delay }) {
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
          {children}
        </span>
        <div className={`absolute flex flex-col ${TEXT_SIDE[side]}`}>
          {soon && <SoonTag className="mb-1" />}
          <span className="text-sm font-medium text-neutral-100">{label}</span>
          {sub && <span className="mt-0.5 text-xs text-neutral-400">{sub}</span>}
        </div>
      </Link>
    </motion.div>
  );
}

const HowItWorks = () => {
  const ref = useRef(null);
  // `appeared` latches true the first time the section is seen (drives the one-time
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
      <section
        id="how-it-works"
        ref={ref}
        className="mx-auto max-w-6xl scroll-mt-[calc(var(--navbar-h,56px)+24px)] px-6 py-16 md:py-24"
      >
        <h2 className="text-center text-3xl font-[450] tracking-tight text-white">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base text-neutral-400">
          Every step is earned. Every win becomes proof.
        </p>

        {/* Desktop: branching path diagram */}
        <div className="relative mx-auto mt-16 hidden aspect-[1200/460] w-full max-w-6xl lg:block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
                        <Edge d={curve(N.root, N.study)} lit={started} inView={appeared} delay={0.2} />
            <Edge d={curve(N.study, N.practice)} lit={studied} inView={appeared} delay={0.4} />
            <Edge d={curve(N.practice, N.exam)} lit={practiced} inView={appeared} delay={0.6} />
            {/* The second route to the exam: explain it back out loud. */}
            <Edge d={branchOut(N.study, N.voice)} dashed lit={studied} inView={appeared} delay={0.5} />
            {/* Same shape as the Practice -> AI mentor line: leave the diagonal edge, curve into the target. */}
            <Edge
              d={`M ${N.voice.x + D} ${N.voice.y + D} C ${N.voice.x + 75} ${N.voice.y + 30}, ${N.exam.x - 75} ${N.exam.y - 30}, ${N.exam.x - D} ${N.exam.y - D}`}
              dashed
              lit={practiced}
              inView={appeared}
              delay={0.7}
            />
            {/* The new "Exam" node sits between "Explain it back" and "Join a Build Team". */}
            <Edge d={curve(N.voice, N.examTop)} dashed lit={practiced} inView={appeared} delay={0.7} />
            <Edge d={curve(N.examTop, N.teams)} dashed lit={unlocked} inView={appeared} delay={0.9} />
            {/* "Pass the test" connects straight up to the new "Exam" node. */}
            <Edge
              d={`M ${N.exam.x} ${N.exam.y - R} L ${N.examTop.x} ${N.examTop.y + R}`}
              dashed
              lit={practiced}
              inView={appeared}
              delay={0.8}
            />
            {/* Stuck while practicing? The mentor is one step away. */}
            <Edge
              d={`M ${N.practice.x + D} ${N.practice.y + D} C ${N.practice.x + 75} ${N.practice.y + 30}, ${N.mentor.x - 110} ${N.mentor.y}, ${N.mentor.x - R} ${N.mentor.y}`}
              dashed
              inView={appeared}
              delay={0.9}
            />
            {/* The mentor sits under the exam: fail, fix the gaps, and loop back to retry. */}
            <Edge
              d={`M ${N.exam.x} ${N.exam.y + R} L ${N.mentor.x} ${N.mentor.y - R}`}
              dashed
              lit={failed}
              inView={appeared}
              delay={1.0}
            />
            <Edge
              d={`M ${N.mentor.x - D} ${N.mentor.y - D} C ${N.mentor.x - 75} ${N.mentor.y - 30}, ${N.exam.x - 75} ${N.exam.y + 30}, ${N.exam.x - D} ${N.exam.y + D}`}
              lit={retried}
              inView={appeared}
              delay={1.2}
            />
            {/* Passing opens both kinds of proof, and both lead to recruiters. */}
            <Edge d={branchOut(N.exam, N.capstone)} lit={unlocked} inView={appeared} delay={0.9} />
            <Edge d={mergeIn(N.teams, N.merge)} dashed lit={proven} inView={appeared} delay={1.3} />
            <Edge d={mergeIn(N.capstone, N.merge)} dashed lit={proven} inView={appeared} delay={1.3} />
            <Edge
              d={`M ${N.merge.x} ${N.merge.y} L ${N.recruiters.x - R} ${N.recruiters.y}`}
              dashed
              lit={proven}
              drawDelay={DRAW_S} // starts once the two merging lines arrive
              inView={appeared}
              delay={1.4}
            />
          </svg>

          <Circle at={N.root} to={TO.root} label="Pick a path" sub="Choose your track." active={started} inView={appeared} delay={0}>
            <MapIcon size={22} aria-hidden="true" />
          </Circle>
          <Circle at={N.study} to={TO.study} label="Study the layer" sub="10 layers in a track." active={studied} inView={appeared} delay={0.3}>
            <BookOpen size={22} aria-hidden="true" />
          </Circle>
          <Circle at={N.practice} to={TO.practice} label="Practice it" sub="Solve real coding challenges." active={practiced} inView={appeared} delay={0.5}>
            <SplitCode play={practiced} />
          </Circle>
          <Circle
            at={N.voice}
            to={TO.voice}
            label="Explain it back"
            sub="Say it out loud. Your mentor checks you get it."
            side="top"
            soon
            active={practiced}
            inView={appeared}
            delay={0.6}
          >
            <Mic size={22} aria-hidden="true" />
          </Circle>
          <Circle
            at={N.exam}
            to={TO.exam}
            label="Pass the test"
            sub="Score 80% to unlock the next layer."
            side="right"
            active={unlocked}
            inView={appeared}
            delay={0.7}
          >
            {unlocked ? <LockOpen size={22} aria-hidden="true" /> : <Lock size={22} aria-hidden="true" />}
          </Circle>
          <Circle
            at={N.examTop}
            to={TO.exam}
            label="Exam"
            sub="Test what you learned."
            side="top"
            active={unlocked}
            inView={appeared}
            delay={0.8}
          >
            <ClipboardCheck size={22} aria-hidden="true" />
          </Circle>
          <Circle at={N.mentor} to={TO.mentor} label="AI mentor" sub="Finds your weak spots and helps you retry." active={retried} inView={appeared} delay={1.0}>
            <Bot size={22} aria-hidden="true" />
          </Circle>
          <Circle at={N.teams} to={TO.teams} label="Join a Build Team" sub="Ship real PRs with other learners." side="top" active={proven} inView={appeared} delay={1.1}>
            <JoinTeam play={proven} />
          </Circle>
          <Circle at={N.capstone} to={TO.capstone} label="Capstone" sub="Build and defend a real project." active={proven} inView={appeared} delay={1.1}>
            <TrophyPop play={proven} />
          </Circle>
          <Circle
            at={N.recruiters}
            to={TO.recruiters}
            label="Get seen by recruiters"
            sub="Every PR and project becomes public proof."
            active={seen}
            inView={appeared}
            delay={1.5}
          >
            <SeenPing play={seen} />
          </Circle>

          <motion.span
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-black px-1.5 text-xs transition-colors duration-500 ${
              retried ? "text-purple-300" : "text-neutral-500"
            }`}
            style={pos({ x: N.exam.x - 61, y: (N.exam.y + N.mentor.y) / 2 })} // on the retry curve's leftmost point
            initial={{ opacity: 0 }}
            animate={appeared ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            {/* one full counter-clockwise turn, the way the icon's arrow points */}
            <motion.span
              className="flex"
              variants={SPIN}
              initial="rest"
              animate={retried ? "play" : "rest"}
            >
              <RotateCcw size={11} aria-hidden="true" />
            </motion.span>
            Retry
          </motion.span>
        </div>

        {/* Below lg: the same steps as a vertical list */}
        <ol className="mx-auto mt-12 max-w-sm space-y-6 lg:hidden">
          {MOBILE_STEPS.map(({ to, title, body, icon: Icon, soon }) => (
            <li key={title}>
              <Link to={to} className="group flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-black text-neutral-300 transition-colors group-hover:border-purple-400 group-hover:text-purple-200">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-neutral-100 md:text-base">
                    {title}
                    {soon && <SoonTag className="ml-2 align-middle" />}
                  </h3>
                  <p className="mt-0.5 text-base text-neutral-400 md:text-sm">{body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <Link
            to="/roadmaps"
            className="flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-base leading-[20px] font-medium text-black sm:text-[14px] transition hover:bg-neutral-200"
          >
            Browse the roadmaps →
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
};

export default HowItWorks;
