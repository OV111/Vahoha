import { Wrench, PenLine, ScanSearch } from "lucide-react";

// Each task type has its own accent so a learner always knows which mode they
// are in. Purple stays the brand thread (stepper, primary actions); these
// colors only mark the task type. Classes are written out in full so
// Tailwind can see them.
export const TASK_TYPES = {
  fix: {
    label: "Debug",
    verb: "Why doesn't it work?",
    Icon: Wrench,
    chip: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    ring: "ring-amber-400/60",
    dot: "bg-amber-400",
    glow: "from-amber-500/10",
  },
  write: {
    label: "Build",
    verb: "Write it yourself",
    Icon: PenLine,
    chip: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    ring: "ring-sky-400/60",
    dot: "bg-sky-400",
    glow: "from-sky-500/10",
  },
  review: {
    label: "Review AI code",
    verb: "Is it production-ready?",
    Icon: ScanSearch,
    chip: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    ring: "ring-rose-400/60",
    dot: "bg-rose-400",
    glow: "from-rose-500/10",
  },
};
