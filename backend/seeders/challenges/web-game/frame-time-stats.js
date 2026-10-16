export default {
  slug: "frame-time-stats",
  trackId: "web-game",
  layerId: "web-game-10",
  type: "CODE",
  difficulty: "easy",
  title: "Summarise a profiling run from frame times",
  summary:
    "Turn a list of frame durations into average FPS, a 95th percentile and a dropped-frame count.",
  description:
    "An average frame rate hides stutter: a game that renders 59 fast frames and one 200 ms hitch still averages a healthy FPS. Profilers therefore report the slow tail too (a high percentile) and how many frames missed the 60 FPS budget of about 16.7 ms.",
  task:
    "Write <code>frameStats(frameTimesMs)</code> returning <code>{ avgFps, p95Ms, worstMs, droppedFrames }</code>. <code>avgFps</code> is <code>1000 / meanFrameTime</code> rounded to one decimal. <code>p95Ms</code> is the 95th percentile by the nearest-rank method: sort ascending and take the value at rank <code>ceil(0.95 * n)</code> (1-based). <code>worstMs</code> is the largest frame time. <code>droppedFrames</code> counts frames strictly longer than 16.7 ms.",
  constraints: [
    "Throw <code>RangeError('no frames')</code> for an empty array.",
    "Do not modify the input array (sort a copy).",
    "Round <code>avgFps</code> with <code>Math.round(value * 10) / 10</code>; the other values are not rounded.",
    "A frame of exactly 16.7 ms is not dropped.",
  ],
  example: `frameStats([10, 10, 10, 10, 10, 10, 10, 10, 10, 50]);
// { avgFps: 71.4, p95Ms: 50, worstMs: 50, droppedFrames: 1 }`,
  tags: ["performance","profiling","statistics"],
  estimatedMins: 20,
  xp: 25,
  starterFiles: [
    {
      name: "frameStats.js",
      lang: "js",
      code: `// frameStats.js
function frameStats(frameTimesMs) {
  // your code here
}

module.exports = frameStats;`,
    },
  ],
  testFile: {
    name: "frameStats_test.js",
    lang: "test",
    code: `// frameStats_test.js
const frameStats = require('./frameStats');

test('average_fps_from_mean_frame_time', () => {
  // see the hidden tests for the full checks
  expect(typeof frameStats).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Sort a copy with a numeric comparator: <code>[...times].sort((a, b) =&gt; a - b)</code>. Without the comparator JavaScript sorts as strings.",
    },
    {
      order: 2,
      cost: 5,
      text: "Nearest-rank percentile: <code>sorted[Math.ceil(0.95 * n) - 1]</code> (the rank is 1-based, the array is 0-based).",
    },
    {
      order: 3,
      cost: 10,
      text: "Mean is the sum divided by n; avgFps is <code>1000 / mean</code>. Use <code>filter</code> with <code>t &gt; 16.7</code> for dropped frames.",
    },
  ],
  hiddenTests: [
    {
      name: "average_fps_from_mean_frame_time",
      code: `const r = frameStats([16, 16, 16, 16]);
assert(r.avgFps === 62.5, 'a steady 16 ms is 62.5 FPS, got ' + r.avgFps);
assert(r.worstMs === 16, 'worstMs should be 16');`,
    },
    {
      name: "a_single_spike_shows_up_in_the_tail",
      code: `const r = frameStats([10, 10, 10, 10, 10, 10, 10, 10, 10, 50]);
assert(r.avgFps === 71.4, 'mean is 14 ms -> 71.4 FPS, got ' + r.avgFps);
assert(r.p95Ms === 50, 'nearest-rank p95 of 10 frames is the 10th value (50), got ' + r.p95Ms);
assert(r.worstMs === 50 && r.droppedFrames === 1, 'worst 50, one dropped frame, got ' + r.worstMs + ' / ' + r.droppedFrames);`,
    },
    {
      name: "p95_uses_nearest_rank_on_sorted_data",
      code: `const times = [];
for (let i = 1; i <= 20; i++) times.push(i);
const r = frameStats(times.slice().reverse());
assert(r.p95Ms === 19, 'rank ceil(0.95*20)=19 of the sorted values is 19, got ' + r.p95Ms);`,
    },
    {
      name: "dropped_frames_threshold_is_strict",
      code: `const r = frameStats([16.7, 16.7, 16.8, 20]);
assert(r.droppedFrames === 2, 'only frames longer than 16.7 count, got ' + r.droppedFrames);`,
    },
    {
      name: "empty_input_throws",
      code: `let err = null;
try { frameStats([]); } catch (e) { err = e; }
assert(err instanceof RangeError && err.message === 'no frames', 'empty input must throw RangeError("no frames")');`,
    },
    {
      name: "does_not_modify_input",
      code: `const input = [30, 10, 20];
frameStats(input);
assert(input[0] === 30 && input[1] === 10 && input[2] === 20, 'the input array must keep its order');`,
    },
  ],
  solution: {
    code: `function frameStats(frameTimesMs) {
  const n = frameTimesMs.length;
  if (n === 0) throw new RangeError('no frames');
  const sorted = [...frameTimesMs].sort((a, b) => a - b);
  const mean = frameTimesMs.reduce((sum, t) => sum + t, 0) / n;
  return {
    avgFps: Math.round((1000 / mean) * 10) / 10,
    p95Ms: sorted[Math.ceil(0.95 * n) - 1],
    worstMs: sorted[n - 1],
    droppedFrames: frameTimesMs.filter((t) => t > 16.7).length,
  };
}

module.exports = frameStats;`,
    explanation:
      "Average FPS is computed from the mean frame time, not by averaging per-frame FPS values, because FPS is a reciprocal and the average of reciprocals overstates fast frames. The tail statistics need sorted data, so the code sorts a copy with a numeric comparator; the default sort would compare numbers as text and put 100 before 20. Nearest-rank turns the percentile into a plain index, ceil(0.95 * n) as a 1-based rank minus one for the array. Dropped frames are a simple count against the 16.7 ms budget, with a strict comparison so a frame that exactly meets the budget is not penalised.",
  },
};
