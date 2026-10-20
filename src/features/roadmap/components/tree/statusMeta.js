import { Circle, CircleDot, CircleCheck, CircleSlash } from "lucide-react";

// How each lesson status looks. Every status has its own icon AND label, so
// status is never told by color alone. `edge` is the colored left border /
// accent bar: it always means "progress" and nothing else.
export const STATUS_META = {
  not_started: { label: "Not started", Icon: Circle, icon: "text-neutral-400", edge: "#525252" },
  in_progress: { label: "In progress", Icon: CircleDot, icon: "text-violet-300", edge: "#8b5cf6" },
  done: { label: "Done", Icon: CircleCheck, icon: "text-emerald-400", edge: "#10b981" },
  skipped: { label: "Skipped", Icon: CircleSlash, icon: "text-neutral-500", edge: "#3f3f46" },
};

// Accent for connectors that lead to finished work and for the hover path.
export const PATH_COLORS = { done: "#7c3aed", idle: "#71717a", highlight: "#c084fc" };
