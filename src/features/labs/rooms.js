import SplitCodeIcon from "./components/SplitCodeIcon";
import { Layers, Database, BrainCircuit, ServerCog, ShieldCheck, Bug, Blocks, Atom, Gamepad2, Globe, Plug, Smartphone, Brain, Languages } from "lucide-react";
import { TRACKS } from "../../../constants/roadmapPaths";
import { TOPICS } from "../foundations/topics/topics.js";

// The 10 lab rooms: labs grouped by HOW people practice, not by topic name
// (docs/product/LAB_SYSTEM.md, "Lab families"). Each roadmap category maps to
// one room; a few tracks override their category's room.
//
// Accent classes are written out in full so Tailwind can see them.
export const ROOMS = [
  {
    // Not a roadmap category: its topics live in features/foundations and the
    // room has its own page at /labs/foundations (see router.jsx).
    id: "foundations",
    title: "Foundations",
    Icon: Layers,
    tagline: "Learn to think in systems, not syntax.",
    categories: [],
    size: `${TOPICS.length} topics`,
    openCount: TOPICS.filter((t) => t.lesson).length,
    openNoun: "lesson",
    surface: "A system that grows: build it, break it, diagnose it",
    proof: "You predicted the failure, fixed it, and can defend the tradeoff",
    vocabulary: ["systems", "failure cases", "tradeoffs"],
    accent: { text: "text-amber-300", border: "border-amber-500/40", bg: "bg-amber-500/10", line: "bg-amber-500/60", glow: "from-amber-500/15", ring: "hover:border-amber-400" },
  },
  {
    id: "build-software",
    title: "Build Software",
    Icon: SplitCodeIcon,
    tagline: "Write, debug and review real code.",
    categories: ["languages", "fullstack", "backend", "mobile", "cs"],
    // A big room (64 tracks) is split into at most 5 sections, each one roadmap
    // category. Same workbench everywhere; sections only make it easy to find
    // your area. The first section opens by default (the MERN pilot is in Web).
    sections: [
      { id: "web", title: "Web", Icon: Globe, categories: ["fullstack"] },
      { id: "backend", title: "Backend & APIs", Icon: Plug, categories: ["backend"] },
      { id: "mobile", title: "Mobile", Icon: Smartphone, categories: ["mobile"] },
      { id: "cs", title: "CS fundamentals", Icon: Brain, categories: ["cs"] },
      { id: "languages", title: "Languages", Icon: Languages, categories: ["languages"], pickTrack: true },
    ],
    surface: "Editor and tests, with a live preview for UI",
    proof: "Tests pass, and your own test catches the AI's bug",
    vocabulary: ["bugs", "tests", "pull requests"],
    accent: { text: "text-blue-300", border: "border-blue-500/40", bg: "bg-blue-500/10", line: "bg-blue-500/60", glow: "from-blue-500/15", ring: "hover:border-blue-400" },
  },
  {
    id: "data-storage",
    title: "Data Storage",
    Icon: Database,
    tagline: "Model, query and keep databases alive.",
    categories: ["database"],
    surface: "Query editor, schema designer, simulated cluster",
    proof: "Right rows, a good query plan, data that survives a failover",
    vocabulary: ["queries", "indexes", "failovers"],
    accent: { text: "text-green-300", border: "border-green-500/40", bg: "bg-green-500/10", line: "bg-green-500/60", glow: "from-green-500/15", ring: "hover:border-green-400" },
  },
  {
    id: "data-ai",
    title: "Data & AI",
    Icon: BrainCircuit,
    tagline: "Clean data, train models, check the conclusions.",
    categories: ["aiml", "datascience"],
    surface: "A Python notebook in the browser",
    proof: "A metric beats the target, and a wrong conclusion gets caught",
    vocabulary: ["datasets", "metrics", "experiments"],
    accent: { text: "text-fuchsia-300", border: "border-fuchsia-500/40", bg: "bg-fuchsia-500/10", line: "bg-fuchsia-500/60", glow: "from-fuchsia-500/15", ring: "hover:border-fuchsia-400" },
  },
  {
    id: "infra-cloud",
    title: "Infrastructure & Cloud",
    Icon: ServerCog,
    tagline: "Deploy, observe and fix outages.",
    categories: ["devops", "cloud"],
    surface: "Simulated terminal and config files",
    proof: "The system reaches the right state, and the outage is fixed",
    vocabulary: ["incidents", "pipelines", "deploys"],
    accent: { text: "text-cyan-300", border: "border-cyan-500/40", bg: "bg-cyan-500/10", line: "bg-cyan-500/60", glow: "from-cyan-500/15", ring: "hover:border-cyan-400" },
  },
  {
    id: "security",
    title: "Security",
    Icon: ShieldCheck,
    tagline: "Find, exploit and defend.",
    categories: ["cybersecurity"],
    surface: "A simulated vulnerable app, logs and traffic",
    proof: "The flag is captured, and the attack is blocked",
    vocabulary: ["flags", "exploits", "defenses"],
    accent: { text: "text-red-300", border: "border-red-500/40", bg: "bg-red-500/10", line: "bg-red-500/60", glow: "from-red-500/15", ring: "hover:border-red-400" },
  },
  {
    id: "quality",
    title: "Quality & Testing",
    Icon: Bug,
    tagline: "Hunt bugs and prove software works.",
    categories: ["qa"],
    surface: "A seeded buggy app and a test editor",
    proof: "Every seeded bug is found and caught by a test",
    vocabulary: ["bug hunts", "test plans", "coverage"],
    accent: { text: "text-lime-300", border: "border-lime-500/40", bg: "bg-lime-500/10", line: "bg-lime-500/60", glow: "from-lime-500/15", ring: "hover:border-lime-400" },
  },
  {
    id: "blockchain-web3",
    title: "Blockchain & Web3",
    Icon: Blocks,
    tagline: "Write contracts that survive attacks.",
    categories: ["blockchain", "web3"],
    surface: "A local chain and a test wallet in the browser",
    proof: "The contract survives the attack test, and balances are right",
    vocabulary: ["contracts", "attacks", "audits"],
    accent: { text: "text-orange-300", border: "border-orange-500/40", bg: "bg-orange-500/10", line: "bg-orange-500/60", glow: "from-orange-500/15", ring: "hover:border-orange-400" },
  },
  {
    id: "quantum",
    title: "Quantum",
    Icon: Atom,
    tagline: "Build circuits and predict the states.",
    categories: ["quantum"],
    surface: "A circuit simulator",
    proof: "The final state matches, and your prediction was right",
    vocabulary: ["circuits", "qubits", "measurements"],
    accent: { text: "text-teal-300", border: "border-teal-500/40", bg: "bg-teal-500/10", line: "bg-teal-500/60", glow: "from-teal-500/15", ring: "hover:border-teal-400" },
  },
  {
    id: "games-graphics",
    title: "Games & Graphics",
    Icon: Gamepad2,
    tagline: "Game loops, mechanics and shaders.",
    categories: ["gamedev"],
    surface: "A canvas or WebGL preview",
    proof: "The game behaves as specified, and the shader renders right",
    vocabulary: ["game loops", "shaders", "playtests"],
    accent: { text: "text-pink-300", border: "border-pink-500/40", bg: "bg-pink-500/10", line: "bg-pink-500/60", glow: "from-pink-500/15", ring: "hover:border-pink-400" },
  },
];

// Tracks whose practice belongs in another room than their category's.
const TRACK_ROOM_OVERRIDES = {
  "db-engineer": "data-storage",
  "security-dev": "security",
};

const ROOM_BY_CATEGORY = Object.fromEntries(ROOMS.flatMap((room) => room.categories.map((c) => [c, room.id])));

const TRACK_INFO = Object.fromEntries(
  Object.entries(TRACKS).flatMap(([category, tracks]) => tracks.map((t) => [t.id, { ...t, category }])),
);

/** Room id for a track id, or null for an unknown track. */
export const roomOfTrack = (trackId) =>
  TRACK_ROOM_OVERRIDES[trackId] ?? ROOM_BY_CATEGORY[TRACK_INFO[trackId]?.category] ?? null;


export const roomById = (id) => ROOMS.find((r) => r.id === id) ?? null;

/** { id, title } of the tracks practiced in a room, in catalog order. */
export const tracksInRoom = (roomId) =>
  Object.values(TRACK_INFO).filter((t) => roomOfTrack(t.id) === roomId);

export const trackTitle = (trackId) => TRACK_INFO[trackId]?.title ?? trackId;

/** Section of a room a track belongs to (by its category), or null if the room has no sections. */
export const sectionOfTrack = (room, trackId) =>
  room?.sections?.find((s) => s.categories.includes(TRACK_INFO[trackId]?.category)) ?? null;

/** Tracks of a room in one section, in catalog order. */
export const tracksInSection = (room, sectionId) =>
  tracksInRoom(room.id).filter((t) => sectionOfTrack(room, t.id)?.id === sectionId);
