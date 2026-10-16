export default {
  slug: "frame-budget-scheduler",
  trackId: "web-game",
  layerId: "web-game-10",
  type: "CODE",
  difficulty: "hard",
  title: "Spread background work across frames with a time budget",
  summary:
    "Run queued tasks only while the frame still has time left, and carry the rest to the next frame.",
  description:
    "Loading assets, rebuilding navigation meshes or compressing save data can freeze a game if it all happens in one frame. A frame budget scheduler runs small tasks until a time limit is reached and then yields, so the game keeps drawing at 60 FPS while the work finishes over several frames.",
  task:
    "Write <code>createFrameScheduler(budgetMs, now)</code>. <code>now()</code> returns the current time in milliseconds (it is injected so tests can control it). Return <code>{ add(task, priority), runFrame(), pending() }</code>. <code>add</code> queues a function; tasks with a <b>higher</b> <code>priority</code> number run first, equal priorities run in the order they were added (default priority 0). <code>runFrame()</code> records the start time and runs tasks one at a time. Before starting each task <b>after the first</b>, stop if <code>now() - start &gt;= budgetMs</code>. Return how many tasks ran. <code>pending()</code> returns how many tasks are still queued.",
  constraints: [
    "At least one task runs per frame if any are queued, even when the budget is 0 or already exceeded (so a long queue always makes progress).",
    "A task may call <code>add</code> while it runs; the new task joins the queue and may run in the same frame if the budget allows.",
    "If a task throws, the error propagates, but the failed task is already removed and the rest stay queued.",
    "Call <code>now()</code> once for the start time and once before each later task (not inside the first-task check).",
  ],
  example: `// each task advances a fake clock by 3 ms, budget is 10 ms
const s = createFrameScheduler(10, now);
for (let i = 0; i < 6; i++) s.add(() => advance(3));
s.runFrame(); // 4  (elapsed 0, 3, 6, 9 are under budget; 12 is not)
s.pending();  // 2`,
  tags: ["performance","scheduling","frame-budget"],
  estimatedMins: 40,
  xp: 70,
  starterFiles: [
    {
      name: "createFrameScheduler.js",
      lang: "js",
      code: `// createFrameScheduler.js
function createFrameScheduler(budgetMs, now) {
  // your code here
}

module.exports = createFrameScheduler;`,
    },
  ],
  testFile: {
    name: "createFrameScheduler_test.js",
    lang: "test",
    code: `// createFrameScheduler_test.js
const createFrameScheduler = require('./createFrameScheduler');

test('runs_tasks_until_the_budget_is_used', () => {
  // see the hidden tests for the full checks
  expect(typeof createFrameScheduler).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Keep tasks as objects <code>{ fn, priority, order }</code> with an increasing counter for <code>order</code>. Sorting by <code>priority</code> descending then <code>order</code> ascending gives the required order, including for tasks added during a frame.",
    },
    {
      order: 2,
      cost: 5,
      text: "In <code>runFrame</code>, call <code>now()</code> once for <code>start</code>. Loop: if the queue is empty stop; if you have already run at least one task and <code>now() - start &gt;= budgetMs</code>, stop; otherwise take the next task off the queue and run it.",
    },
    {
      order: 3,
      cost: 10,
      text: "Remove the task from the queue <i>before</i> calling it. That way a task that throws, or one that calls <code>add</code>, leaves the queue in a consistent state.",
    },
  ],
  hiddenTests: [
    {
      name: "runs_tasks_until_the_budget_is_used",
      code: `let t = 0;
const now = () => t;
const s = createFrameScheduler(10, now);
for (let i = 0; i < 6; i++) s.add(() => { t += 3; });
const ran = s.runFrame();
assert(ran === 4, 'elapsed 0,3,6,9 are under budget and the 5th check sees 12, so 4 tasks run, got ' + ran);
assert(s.pending() === 2, 'two tasks should remain, got ' + s.pending());`,
    },
    {
      name: "leftover_tasks_run_next_frame",
      code: `let t = 0;
const now = () => t;
const s = createFrameScheduler(10, now);
for (let i = 0; i < 6; i++) s.add(() => { t += 3; });
s.runFrame();
t = 100;
const ran = s.runFrame();
assert(ran === 2 && s.pending() === 0, 'the remaining 2 tasks finish in the next frame, got ' + ran + ' / ' + s.pending());`,
    },
    {
      name: "always_runs_one_task_even_with_zero_budget",
      code: `let t = 0;
const now = () => t;
const s = createFrameScheduler(0, now);
s.add(() => { t += 50; }); s.add(() => { t += 50; });
assert(s.runFrame() === 1, 'one task must run per frame so the queue makes progress');
assert(s.pending() === 1, 'one task should remain');`,
    },
    {
      name: "higher_priority_runs_first_and_ties_keep_order",
      code: `let t = 0;
const order = [];
const s = createFrameScheduler(1000, () => t);
s.add(() => order.push('low'), 0);
s.add(() => order.push('high1'), 5);
s.add(() => order.push('mid'), 2);
s.add(() => order.push('high2'), 5);
s.runFrame();
assert(order.join(',') === 'high1,high2,mid,low', 'expected high1,high2,mid,low, got ' + order.join(','));`,
    },
    {
      name: "tasks_can_add_more_tasks",
      code: `let t = 0;
const log = [];
const s = createFrameScheduler(1000, () => t);
s.add(() => { log.push('a'); s.add(() => log.push('b')); });
const ran = s.runFrame();
assert(log.join(',') === 'a,b' && ran === 2, 'a task added during the frame can run in the same frame, got ' + log.join(',') + ' / ' + ran);`,
    },
    {
      name: "a_throwing_task_does_not_block_the_queue",
      code: `let t = 0;
const s = createFrameScheduler(1000, () => t);
let after = false;
s.add(() => { throw new Error('boom'); });
s.add(() => { after = true; });
let caught = null;
try { s.runFrame(); } catch (e) { caught = e; }
assert(caught && caught.message === 'boom', 'the error must propagate');
assert(s.pending() === 1, 'the failed task is removed and the other stays queued, pending was ' + s.pending());
s.runFrame();
assert(after === true, 'the next frame must run the remaining task');`,
    },
    {
      name: "empty_queue_runs_nothing",
      code: `const s = createFrameScheduler(10, () => 0);
assert(s.runFrame() === 0, 'nothing queued means nothing runs');
assert(s.pending() === 0, 'pending is 0');`,
    },
  ],
  solution: {
    code: `function createFrameScheduler(budgetMs, now) {
  let queue = [];
  let counter = 0;

  function add(task, priority) {
    queue.push({ fn: task, priority: priority || 0, order: counter++ });
  }

  function takeNext() {
    let best = 0;
    for (let i = 1; i < queue.length; i++) {
      const a = queue[i];
      const b = queue[best];
      if (a.priority > b.priority || (a.priority === b.priority && a.order < b.order)) best = i;
    }
    return queue.splice(best, 1)[0];
  }

  function runFrame() {
    const start = now();
    let ran = 0;
    while (queue.length > 0) {
      if (ran > 0 && now() - start >= budgetMs) break;
      const item = takeNext();
      ran++;
      item.fn();
    }
    return ran;
  }

  function pending() {
    return queue.length;
  }

  return { add, runFrame, pending };
}

module.exports = createFrameScheduler;`,
    explanation:
      "Each task carries a priority and an arrival counter, so 'highest priority first, then oldest first' is a single comparison and stays correct for tasks added while a frame is running. The scheduler picks the next task by scanning for the best one rather than keeping the array sorted, which is simple and fine for the small queues a frame handles. The budget check sits at the top of the loop but is skipped for the first task (ran > 0), which is what guarantees progress: even with a zero budget or a first task that already used up the frame, one task always runs, so the queue can never starve. The task is removed from the queue before it is called, so a throwing task cannot be retried forever and a task that adds work does not corrupt the iteration. The clock is injected as now() so the budget logic is deterministic in tests and mockable in a game loop.",
  },
};
