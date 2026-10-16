export default {
  slug: "reconcile-prediction",
  trackId: "web-game",
  layerId: "web-game-8",
  type: "CODE",
  difficulty: "hard",
  title: "Reconcile client-side prediction with the server",
  summary:
    "Rewind to the server's state and replay only the inputs it has not processed yet.",
  description:
    "To feel instant, the client applies its own inputs immediately (prediction) and sends them to the server. The server answers with the authoritative state and the number of the last input it processed. The client must then drop every input the server has already counted, restart from the server's state, and replay the remaining inputs on top, so a small disagreement is corrected without losing the inputs still in flight.",
  task:
    "Write <code>reconcile({ serverState, lastProcessedSeq, pendingInputs, applyInput })</code>. <code>pendingInputs</code> is an array of inputs in send order, each with a numeric <code>seq</code>. <code>applyInput(state, input)</code> is a pure function returning the next state. Discard inputs whose <code>seq &lt;= lastProcessedSeq</code>, start from <code>serverState</code> and apply the remaining inputs in order. Return <code>{ state, pending }</code> where <code>pending</code> is the array of inputs that were replayed.",
  constraints: [
    "Call <code>applyInput</code> exactly once for each input that was not yet processed, and never for processed ones.",
    "Do not mutate <code>serverState</code> or the <code>pendingInputs</code> array; <code>applyInput</code> returns new states.",
    "If every input was processed, return <code>serverState</code> itself (same reference) and an empty <code>pending</code> array.",
    "Inputs stay in their original order.",
  ],
  example: `const apply = (s, i) => ({ x: s.x + i.dx });
reconcile({
  serverState: { x: 2 },
  lastProcessedSeq: 2,
  pendingInputs: [{ seq: 1, dx: 1 }, { seq: 2, dx: 1 }, { seq: 3, dx: 1 }],
  applyInput: apply,
});
// { state: { x: 3 }, pending: [{ seq: 3, dx: 1 }] }`,
  tags: ["multiplayer","prediction","reconciliation","netcode"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "reconcile.js",
      lang: "js",
      code: `// reconcile.js
function reconcile({ serverState, lastProcessedSeq, pendingInputs, applyInput }) {
  // your code here
}

module.exports = reconcile;`,
    },
  ],
  testFile: {
    name: "reconcile_test.js",
    lang: "test",
    code: `// reconcile_test.js
const reconcile = require('./reconcile');

test('drops_processed_inputs_and_replays_the_rest', () => {
  // see the hidden tests for the full checks
  expect(typeof reconcile).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Two steps: filter the inputs to those with <code>seq &gt; lastProcessedSeq</code> (that creates a new array, so the original is not touched), then fold them over the server state.",
    },
    {
      order: 2,
      cost: 5,
      text: "<code>pending.reduce((state, input) =&gt; applyInput(state, input), serverState)</code> gives the replayed state, and it returns <code>serverState</code> itself when the array is empty.",
    },
    {
      order: 3,
      cost: 10,
      text: "Return the filtered array as <code>pending</code>. Do not call applyInput inside the filter step.",
    },
  ],
  hiddenTests: [
    {
      name: "drops_processed_inputs_and_replays_the_rest",
      code: `const apply = (s, i) => ({ x: s.x + i.dx });
const r = reconcile({
  serverState: { x: 2 }, lastProcessedSeq: 2,
  pendingInputs: [{ seq: 1, dx: 1 }, { seq: 2, dx: 1 }, { seq: 3, dx: 1 }],
  applyInput: apply,
});
assert(r.state.x === 3, 'server says x=2 after seq 2, replaying seq 3 gives 3, got ' + r.state.x);
assert(r.pending.length === 1 && r.pending[0].seq === 3, 'only seq 3 is still pending, got ' + JSON.stringify(r.pending));`,
    },
    {
      name: "server_correction_overrides_the_clients_guess",
      code: `const apply = (s, i) => ({ x: s.x + i.dx });
const r = reconcile({
  serverState: { x: 10 }, lastProcessedSeq: 1,
  pendingInputs: [{ seq: 1, dx: 5 }, { seq: 2, dx: 1 }],
  applyInput: apply,
});
assert(r.state.x === 11, 'start from the server state (10) and replay seq 2, got ' + r.state.x);`,
    },
    {
      name: "everything_processed_returns_the_server_state",
      code: `let calls = 0;
const server = { x: 7 };
const r = reconcile({
  serverState: server, lastProcessedSeq: 5,
  pendingInputs: [{ seq: 4, dx: 1 }, { seq: 5, dx: 1 }],
  applyInput: (s, i) => { calls++; return { x: s.x + i.dx }; },
});
assert(r.state === server, 'with nothing left to replay the server state is returned as is');
assert(r.pending.length === 0, 'pending must be empty');
assert(calls === 0, 'applyInput must not be called for processed inputs, called ' + calls);`,
    },
    {
      name: "nothing_processed_replays_everything_in_order",
      code: `const seen = [];
const r = reconcile({
  serverState: { log: '' }, lastProcessedSeq: 0,
  pendingInputs: [{ seq: 1, c: 'a' }, { seq: 2, c: 'b' }, { seq: 3, c: 'c' }],
  applyInput: (s, i) => { seen.push(i.seq); return { log: s.log + i.c }; },
});
assert(r.state.log === 'abc', 'inputs must be replayed in order, got ' + r.state.log);
assert(seen.length === 3, 'each pending input is applied exactly once, got ' + seen.length);`,
    },
    {
      name: "does_not_mutate_its_inputs",
      code: `const server = { x: 1 };
const pending = [{ seq: 1, dx: 1 }, { seq: 2, dx: 1 }];
const r = reconcile({ serverState: server, lastProcessedSeq: 1, pendingInputs: pending, applyInput: (s, i) => ({ x: s.x + i.dx }) });
assert(server.x === 1, 'serverState must not be modified');
assert(pending.length === 2 && pending[0].seq === 1, 'the pendingInputs array must not be modified');
assert(r.pending !== pending, 'pending must be a new array');`,
    },
    {
      name: "empty_input_list",
      code: `const server = { x: 1 };
const r = reconcile({ serverState: server, lastProcessedSeq: 3, pendingInputs: [], applyInput: (s) => s });
assert(r.state === server && Array.isArray(r.pending) && r.pending.length === 0, 'an empty list returns the server state and an empty pending list');`,
    },
  ],
  solution: {
    code: `function reconcile({ serverState, lastProcessedSeq, pendingInputs, applyInput }) {
  const pending = pendingInputs.filter((input) => input.seq > lastProcessedSeq);
  const state = pending.reduce((s, input) => applyInput(s, input), serverState);
  return { state, pending };
}

module.exports = reconcile;`,
    explanation:
      "Reconciliation is 'rewind, then replay'. The server's state already includes every input up to lastProcessedSeq, so those inputs must not be applied again or the player would be pushed twice. Filtering by seq removes them and produces a fresh array, which also keeps the caller's pending list unchanged. Reducing over what is left starts from the authoritative server state and re-applies only the inputs the server has not seen yet, which is exactly the client's best guess of where the player is now. Because applyInput is pure and the reduce uses no mutation, an empty list returns the very same server state object and the result never disagrees with the inputs. The returned pending list is what the client keeps and resends or waits to be acknowledged next time.",
  },
};
