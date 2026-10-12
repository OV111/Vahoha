// Mirrors WEIGHTS in backend/modules/teams/lib/teamScore.js. Order = display order.
export const SIGNALS = [
  { key: "output", label: "Merged work", weight: 35, help: "Merged PRs per member, up to 8" },
  { key: "defense", label: "Defense", weight: 25, help: "Best defense score, averaged over every member" },
  { key: "review", label: "Code review", weight: 15, help: "Share of PRs reviewed before merge" },
  { key: "balance", label: "Balance", weight: 15, help: "How evenly PRs are spread across members" },
  { key: "peer", label: "Peer rating", weight: 10, help: "Teammate ratings, smoothed for small samples" },
];

export const pct = (n) => Math.round(n * 100);
