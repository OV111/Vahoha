import { Lock, Target, Bot } from "lucide-react";

// Copy for the About page (src/pages/About.jsx), following docs/strategy/VISION.md.
// Everything here must be true today: no invented user counts, and status items
// only for work that's built or actually planned.

export const ABOUT_PILLARS = [
  {
    icon: Lock,
    title: "Roadmaps you have to earn",
    body: "Every layer is locked until you pass a server-graded test on the one before it. No checkbox to tick, no skipping ahead.",
  },
  {
    icon: Target,
    title: "Your weak spots, not a score",
    body: "Fail a test and you see exactly which topics you missed, so you review those instead of starting over.",
  },
  {
    icon: Bot,
    title: "A mentor that knows your journey",
    body: "The AI mentor can see your path, test history and weak spots. It guides you to the answer instead of handing it over.",
  },
];

export const ABOUT_AUDIENCE = [
  "Self-taught developers who want proof they're job-ready",
  "Career switchers and bootcamp grads filling gaps in what they learned",
  "Early-career devs who want an honest signal of what they don't know yet",
];

export const ABOUT_STATUS = [
  {
    done: true,
    label: "Gated roadmaps",
    desc: "Layer-by-layer paths with progress tracking.",
  },
  {
    done: true,
    label: "Tests & weak spots",
    desc: "Server-graded tests that record what you missed.",
  },
  {
    done: true,
    label: "AI mentor",
    desc: "Grounded in your progress, test history and weak spots.",
  },
  {
    done: true,
    label: "Coding challenges",
    desc: "Practice problems you solve in the browser.",
  },
  {
    done: true,
    label: "Capstones & certificates",
    desc: "Build a real project, defend it, and earn a certificate anyone can verify.",
  },
  {
    done: true,
    label: "Build Teams",
    desc: "Build with others; every member's part is reviewed and rated.",
  },
  {
    done: true,
    label: "Project maps",
    desc: "Draw how a system fits together, or scan a repo to start one.",
  },
  {
    done: true,
    label: "Labs",
    desc: "The Foundations room and the first hands-on system lab.",
  },
  {
    done: false,
    label: "More test-ready paths",
    desc: "Backend is first; more paths get full tests next.",
  },
  {
    done: false,
    label: "Spoken teach-back",
    desc: "Explain a topic out loud and get graded on your understanding. The written version is live.",
  },
];
