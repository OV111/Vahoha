import { SIGNALS } from "../lib/score";

// Dev-only sample for previewing "Top teams" without seeded data. Shape
// matches GET /teams/leaderboard. The viewer's team ranks 13th so the
// "pinned under the top 10" row shows up too.
const TEAMS = [
  ["Null Pointers", "fullstack", 5, 38, { output: 0.95, defense: 0.92, review: 0.9, balance: 0.88, peer: 0.94 }],
  ["Async Avengers", "backend", 4, 31, { output: 0.97, defense: 0.85, review: 0.93, balance: 0.8, peer: 0.9 }],
  ["Pixel Pushers", "frontend", 4, 29, { output: 0.91, defense: 0.88, review: 0.82, balance: 0.9, peer: 0.86 }],
  ["Merge Conflict", "fullstack", 5, 33, { output: 0.83, defense: 0.9, review: 0.85, balance: 0.76, peer: 0.88 }],
  ["Byte Club", "backend", 3, 22, { output: 0.92, defense: 0.78, review: 0.8, balance: 0.85, peer: 0.82 }],
  ["Off By One", "frontend", 4, 24, { output: 0.75, defense: 0.84, review: 0.88, balance: 0.79, peer: 0.8 }],
  ["Stack Smashers", "fullstack", 6, 35, { output: 0.73, defense: 0.8, review: 0.74, balance: 0.82, peer: 0.85 }],
  ["Race Conditions", "backend", 4, 20, { output: 0.7, defense: 0.76, review: 0.79, balance: 0.72, peer: 0.78 }],
  ["Flexbox Folks", "frontend", 3, 17, { output: 0.71, defense: 0.7, review: 0.68, balance: 0.81, peer: 0.76 }],
  ["Deadlock Dodgers", "backend", 5, 23, { output: 0.62, defense: 0.74, review: 0.7, balance: 0.66, peer: 0.72 }],
  ["Hot Reloaders", "frontend", 4, 18, { output: 0.6, defense: 0.66, review: 0.64, balance: 0.7, peer: 0.7 }],
  ["Cache Me Outside", "fullstack", 4, 16, { output: 0.55, defense: 0.62, review: 0.6, balance: 0.64, peer: 0.68 }],
  ["Commit Crew", "fullstack", 4, 14, { output: 0.48, defense: 0.6, review: 0.58, balance: 0.62, peer: 0.66 }],
  ["Semicolon Squad", "backend", 3, 9, { output: 0.4, defense: 0.5, review: 0.45, balance: 0.55, peer: 0.6 }],
];
const MINE = "Commit Crew";

const score = (b) => Math.round(SIGNALS.reduce((sum, s) => sum + b[s.key] * s.weight, 0));

const rank = (list) =>
  list
    .map(([name, trackId, memberCount, mergedPrs, breakdown]) => ({
      name,
      trackId,
      memberCount,
      mergedPrs,
      breakdown,
      score: score(breakdown),
      isMine: name === MINE,
      evidencePath: `/evidence/mock-${name.toLowerCase().replace(/\s+/g, "-")}`,
    }))
    .sort((a, b) => b.score - a.score)
    .map((row, i) => ({ ...row, rank: i + 1 }));

export function mockLeaderboard(track) {
  const list = track ? TEAMS.filter((t) => t[1] === track) : TEAMS;
  const data = {
    tracks: [...new Set(TEAMS.map((t) => t[1]))].sort(),
    rows: rank(list),
    minPrs: 5,
  };
  // A short delay so the loading skeleton is visible too.
  return new Promise((resolve) => setTimeout(() => resolve(data), 400));
}
