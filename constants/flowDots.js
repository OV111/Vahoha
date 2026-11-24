// What each travelling dot in the Project Map means: its colour, its legend
// label, and whether it is an answer coming back (drawn as a ring).
export const FLOW_DOTS = {
  read: { label: "read", color: "#60a5fa" },
  write: { label: "write", color: "#fb923c" },
  lookup: { label: "address lookup", color: "#67e8f9" },
  check: { label: "security check", color: "#c084fc" },
  job: { label: "background work", color: "#f472b6" },
  event: { label: "event", color: "#a3e635" },
  push: { label: "live update", color: "#fde047" },
  metric: { label: "logs and metrics", color: "#a3a3a3" },
  copy: { label: "copy of data", color: "#2dd4bf" },
  ok: { label: "answer", color: "#34d399", ring: true },
  miss: { label: "cache miss", color: "#fbbf24", ring: true },
  fail: { label: "blocked or failed", color: "#f87171", ring: true },
};

export const HOP_SECONDS = 0.9;
