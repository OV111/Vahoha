export default {
  slug: "snapshot-interpolation",
  trackId: "web-game",
  layerId: "web-game-8",
  type: "CODE",
  difficulty: "med",
  title: "Interpolate server snapshots to render smoothly",
  summary:
    "Draw remote players slightly in the past, blended between the two snapshots around that moment.",
  description:
    "A server sends position snapshots about 20 times a second, but the screen draws 60 times a second. Drawing the latest snapshot makes remote players jerk. Instead, render a short, fixed delay in the past and blend between the two snapshots that surround that moment. The delay costs a little latency and buys smoothness.",
  task:
    "Write <code>createInterpolator(delayMs)</code> returning <code>{ push(snapshot), sample(now) }</code>. A snapshot is <code>{ t, x, y }</code> (server time in ms). <code>push</code> stores it; snapshots may arrive out of order. <code>sample(now)</code> computes <code>renderTime = now - delayMs</code> and returns <code>{ x, y }</code> linearly interpolated between the latest snapshot at or before <code>renderTime</code> and the earliest one after it.",
  constraints: [
    "If <code>renderTime</code> is before the first snapshot, return the first snapshot's position; if it is after the last, return the last (no extrapolation).",
    "With no snapshots, <code>sample</code> returns <code>null</code>.",
    "Out-of-order pushes must give the same result as in-order pushes.",
    "A second snapshot with the same <code>t</code> as an existing one replaces it.",
  ],
  example: `const it = createInterpolator(50);
it.push({ t: 100, x: 0, y: 0 });
it.push({ t: 200, x: 10, y: 20 });
it.sample(200); // renderTime 150 -> { x: 5, y: 10 }`,
  tags: ["multiplayer","interpolation","latency"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "createInterpolator.js",
      lang: "js",
      code: `// createInterpolator.js
function createInterpolator(delayMs) {
  // your code here
}

module.exports = createInterpolator;`,
    },
  ],
  testFile: {
    name: "createInterpolator_test.js",
    lang: "test",
    code: `// createInterpolator_test.js
const createInterpolator = require('./createInterpolator');

test('blends_between_the_surrounding_snapshots', () => {
  // see the hidden tests for the full checks
  expect(typeof createInterpolator).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Keep the snapshots in an array sorted by <code>t</code>. On <code>push</code>, replace an existing snapshot with the same t, otherwise insert and sort (or insert at the right index).",
    },
    {
      order: 2,
      cost: 5,
      text: "In <code>sample</code>, find the last snapshot with <code>t &lt;= renderTime</code> (call it a) and the one right after it (b). If there is no a, return the first; if there is no b, return the last.",
    },
    {
      order: 3,
      cost: 10,
      text: "The blend factor is <code>(renderTime - a.t) / (b.t - a.t)</code>. Interpolate x and y separately: <code>a.x + (b.x - a.x) * f</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "blends_between_the_surrounding_snapshots",
      code: `const it = createInterpolator(50);
it.push({ t: 100, x: 0, y: 0 });
it.push({ t: 200, x: 10, y: 20 });
const p = it.sample(200);
assert(Math.abs(p.x - 5) < 1e-9 && Math.abs(p.y - 10) < 1e-9, 'renderTime 150 is halfway, expected (5,10), got ' + JSON.stringify(p));`,
    },
    {
      name: "clamps_before_the_first_snapshot",
      code: `const it = createInterpolator(50);
it.push({ t: 100, x: 3, y: 4 });
it.push({ t: 200, x: 10, y: 20 });
const p = it.sample(120);
assert(p.x === 3 && p.y === 4, 'before the first snapshot return the first position, got ' + JSON.stringify(p));`,
    },
    {
      name: "clamps_after_the_last_snapshot",
      code: `const it = createInterpolator(50);
it.push({ t: 100, x: 3, y: 4 });
it.push({ t: 200, x: 10, y: 20 });
const p = it.sample(900);
assert(p.x === 10 && p.y === 20, 'never extrapolate past the last snapshot, got ' + JSON.stringify(p));`,
    },
    {
      name: "picks_the_right_pair_of_three",
      code: `const it = createInterpolator(0);
it.push({ t: 0, x: 0, y: 0 });
it.push({ t: 100, x: 100, y: 0 });
it.push({ t: 200, x: 100, y: 100 });
const p = it.sample(150);
assert(Math.abs(p.x - 100) < 1e-9 && Math.abs(p.y - 50) < 1e-9, 'at 150 we are halfway between the 2nd and 3rd snapshots, got ' + JSON.stringify(p));`,
    },
    {
      name: "out_of_order_arrival_gives_the_same_result",
      code: `const a = createInterpolator(0);
a.push({ t: 200, x: 10, y: 0 });
a.push({ t: 0, x: 0, y: 0 });
a.push({ t: 100, x: 4, y: 0 });
const p = a.sample(150);
assert(Math.abs(p.x - 7) < 1e-9, 'sorted by time, 150 is halfway between x=4 and x=10, got ' + JSON.stringify(p));`,
    },
    {
      name: "empty_returns_null_and_same_time_replaces",
      code: `const it = createInterpolator(0);
assert(it.sample(100) === null, 'no snapshots must return null');
it.push({ t: 100, x: 1, y: 1 });
it.push({ t: 100, x: 9, y: 9 });
const p = it.sample(100);
assert(p.x === 9 && p.y === 9, 'a snapshot with the same t replaces the old one, got ' + JSON.stringify(p));`,
    },
  ],
  solution: {
    code: `function createInterpolator(delayMs) {
  const snaps = [];

  function push(s) {
    const i = snaps.findIndex((o) => o.t === s.t);
    const copy = { t: s.t, x: s.x, y: s.y };
    if (i !== -1) {
      snaps[i] = copy;
    } else {
      snaps.push(copy);
      snaps.sort((a, b) => a.t - b.t);
    }
  }

  function sample(now) {
    if (snaps.length === 0) return null;
    const renderTime = now - delayMs;
    if (renderTime <= snaps[0].t) return { x: snaps[0].x, y: snaps[0].y };
    const last = snaps[snaps.length - 1];
    if (renderTime >= last.t) return { x: last.x, y: last.y };

    let a = snaps[0];
    let b = snaps[1];
    for (let i = 0; i < snaps.length - 1; i++) {
      if (snaps[i].t <= renderTime && renderTime <= snaps[i + 1].t) {
        a = snaps[i];
        b = snaps[i + 1];
        break;
      }
    }
    const f = (renderTime - a.t) / (b.t - a.t);
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  }

  return { push, sample };
}

module.exports = createInterpolator;`,
    explanation:
      "Rendering in the past is the whole trick: by asking for now minus a fixed delay, there are almost always two snapshots on either side of the render time, so the player is blended between two real server states instead of guessing the future. Keeping the array sorted by time makes arrival order irrelevant, which is what handles out-of-order packets, and replacing a same-time snapshot keeps duplicates from creating a zero-length segment that would divide by zero. The edge cases are explicit: before the first snapshot the player is held at the first position, after the last they are held at the last, because extrapolating would show the player running into walls they have already stopped at. The interpolation itself is one linear blend with factor (renderTime - a.t) / (b.t - a.t).",
  },
};
