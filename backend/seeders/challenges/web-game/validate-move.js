export default {
  slug: "validate-move",
  trackId: "web-game",
  layerId: "web-game-8",
  type: "CODE",
  difficulty: "easy",
  title: "Validate a client move on the server",
  summary:
    "Clamp a requested position to what the player could really have reached.",
  description:
    "In a server-authoritative game the client only asks to move; the server decides where the player ends up. Without a speed check, a modified client could teleport. The server limits the movement to what is physically possible in the elapsed time and keeps the player inside the map.",
  task:
    "Write <code>validateMove(prev, next, dtMs, maxSpeed, bounds)</code>. <code>prev</code> and <code>next</code> are <code>{ x, y }</code>; <code>maxSpeed</code> is in units per second; <code>bounds</code> is <code>{ minX, maxX, minY, maxY }</code>. The farthest allowed distance is <code>maxSpeed * dtMs / 1000</code>. If the requested move is longer, keep its direction but shorten it to that distance. Then clamp the result into <code>bounds</code>. Return <code>{ x, y, corrected }</code>, where <code>corrected</code> is true when the result differs from <code>next</code>.",
  constraints: [
    "Throw <code>RangeError('invalid dt')</code> if <code>dtMs</code> is negative or not a finite number.",
    "With <code>dtMs = 0</code> the player may not move at all (the result is <code>prev</code>, then clamped).",
    "Shorten along the original direction (scale both axes by the same factor), do not clamp each axis separately.",
    "Do not modify <code>prev</code> or <code>next</code>.",
  ],
  example: `validateMove({ x: 0, y: 0 }, { x: 100, y: 0 }, 100, 200, bounds)
// maxSpeed 200/s over 100 ms allows 20 units
// { x: 20, y: 0, corrected: true }`,
  tags: ["multiplayer","anti-cheat","server-authoritative"],
  estimatedMins: 20,
  xp: 25,
  starterFiles: [
    {
      name: "validateMove.js",
      lang: "js",
      code: `// validateMove.js
function validateMove(prev, next, dtMs, maxSpeed, bounds) {
  // your code here
}

module.exports = validateMove;`,
    },
  ],
  testFile: {
    name: "validateMove_test.js",
    lang: "test",
    code: `// validateMove_test.js
const validateMove = require('./validateMove');

test('accepts_a_legal_move_unchanged', () => {
  // see the hidden tests for the full checks
  expect(typeof validateMove).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Compute the requested displacement <code>dx, dy</code> and its length with <code>Math.hypot</code>. Compare it with <code>maxSpeed * dtMs / 1000</code>.",
    },
    {
      order: 2,
      cost: 5,
      text: "If the length is larger than the allowance, multiply both dx and dy by <code>allowed / length</code>. Handle length 0 so you never divide by zero.",
    },
    {
      order: 3,
      cost: 10,
      text: "Clamp the final x and y with <code>Math.min(max, Math.max(min, v))</code>. Compare the result with <code>next</code> to set <code>corrected</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "accepts_a_legal_move_unchanged",
      code: `const b = { minX: 0, maxX: 1000, minY: 0, maxY: 1000 };
const r = validateMove({ x: 10, y: 10 }, { x: 15, y: 10 }, 100, 200, b);
assert(r.x === 15 && r.y === 10, 'a move within the speed limit must be accepted, got ' + r.x + ',' + r.y);
assert(r.corrected === false, 'corrected must be false for a legal move');`,
    },
    {
      name: "shortens_a_too_fast_move",
      code: `const b = { minX: -1000, maxX: 1000, minY: -1000, maxY: 1000 };
const r = validateMove({ x: 0, y: 0 }, { x: 100, y: 0 }, 100, 200, b);
assert(Math.abs(r.x - 20) < 1e-9 && r.y === 0, 'allowed distance is 20, got ' + r.x + ',' + r.y);
assert(r.corrected === true, 'corrected must be true');`,
    },
    {
      name: "keeps_the_direction_on_diagonals",
      code: `const b = { minX: -1000, maxX: 1000, minY: -1000, maxY: 1000 };
const r = validateMove({ x: 0, y: 0 }, { x: 30, y: 40 }, 1000, 25, b);
assert(Math.abs(r.x - 15) < 1e-9 && Math.abs(r.y - 20) < 1e-9, 'a 50-unit move limited to 25 should become (15,20), got ' + r.x + ',' + r.y);`,
    },
    {
      name: "clamps_to_bounds",
      code: `const b = { minX: 0, maxX: 100, minY: 0, maxY: 100 };
const r = validateMove({ x: 95, y: 50 }, { x: 105, y: 50 }, 1000, 1000, b);
assert(r.x === 100 && r.y === 50, 'x must be clamped to the map edge, got ' + r.x + ',' + r.y);
assert(r.corrected === true, 'clamping counts as a correction');`,
    },
    {
      name: "zero_time_means_no_movement",
      code: `const b = { minX: 0, maxX: 100, minY: 0, maxY: 100 };
const r = validateMove({ x: 10, y: 10 }, { x: 50, y: 50 }, 0, 500, b);
assert(r.x === 10 && r.y === 10 && r.corrected === true, 'with dt 0 the player stays at prev, got ' + r.x + ',' + r.y);`,
    },
    {
      name: "rejects_a_bad_dt_and_does_not_mutate",
      code: `const b = { minX: 0, maxX: 100, minY: 0, maxY: 100 };
let e1 = null; let e2 = null;
try { validateMove({ x: 0, y: 0 }, { x: 1, y: 1 }, -5, 10, b); } catch (e) { e1 = e; }
try { validateMove({ x: 0, y: 0 }, { x: 1, y: 1 }, NaN, 10, b); } catch (e) { e2 = e; }
assert(e1 instanceof RangeError && e1.message === 'invalid dt', 'negative dt must throw RangeError("invalid dt")');
assert(e2 instanceof RangeError, 'NaN dt must throw a RangeError');
const prev = { x: 1, y: 2 }; const next = { x: 3, y: 4 };
validateMove(prev, next, 100, 10, b);
assert(prev.x === 1 && next.x === 3, 'inputs must not be modified');`,
    },
  ],
  solution: {
    code: `function validateMove(prev, next, dtMs, maxSpeed, bounds) {
  if (typeof dtMs !== 'number' || !Number.isFinite(dtMs) || dtMs < 0) {
    throw new RangeError('invalid dt');
  }
  const allowed = (maxSpeed * dtMs) / 1000;
  let dx = next.x - prev.x;
  let dy = next.y - prev.y;
  const dist = Math.hypot(dx, dy);
  if (dist > allowed) {
    const scale = dist === 0 ? 0 : allowed / dist;
    dx *= scale;
    dy *= scale;
  }
  let x = prev.x + dx;
  let y = prev.y + dy;
  x = Math.min(bounds.maxX, Math.max(bounds.minX, x));
  y = Math.min(bounds.maxY, Math.max(bounds.minY, y));
  const corrected = Math.abs(x - next.x) > 1e-9 || Math.abs(y - next.y) > 1e-9;
  return { x, y, corrected };
}

module.exports = validateMove;`,
    explanation:
      "The server never trusts the position the client claims; it trusts only the time that passed and the speed limit. The allowed distance is speed times elapsed seconds. If the requested displacement is longer, both components are scaled by the same factor allowed/length, which keeps the player moving in the direction they asked for instead of sliding along one axis. After that the position is clamped into the map. A tiny epsilon is used when deciding if the result differs from the request so floating point noise in a legal move does not report a correction. Computing everything from copies of the numbers keeps the inputs untouched.",
  },
};
