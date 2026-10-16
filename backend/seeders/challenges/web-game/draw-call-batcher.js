export default {
  slug: "draw-call-batcher",
  trackId: "web-game",
  layerId: "web-game-10",
  type: "CODE",
  difficulty: "hard",
  title: "Batch sprites to cut draw calls",
  summary:
    "Group sprites by texture and blend mode without breaking the draw order that matters.",
  description:
    "Each time the renderer switches texture or blend mode it must flush a draw call, and draw calls are often the first bottleneck in a 2D web game. Sprites at different depths must keep their order, but sprites on the same depth can be reordered freely, so grouping them by material reduces the number of calls.",
  task:
    "Write <code>batchSprites(sprites)</code>. Each sprite is <code>{ id, texture, blend, z }</code>. Process sprites in ascending <code>z</code>. Inside one <code>z</code> value, group sprites by the pair (<code>texture</code>, <code>blend</code>): groups appear in the order of their first sprite, and sprites inside a group keep their original order. Then merge neighbouring groups across <code>z</code> values when they have the same texture and blend. Return the list of batches <code>{ texture, blend, ids }</code> in draw order.",
  constraints: [
    "Sprites with a lower <code>z</code> are always drawn before sprites with a higher <code>z</code>.",
    "Never reorder sprites that have different <code>z</code> values, even to save a batch.",
    "Merging only joins batches that are next to each other in draw order.",
    "Return <code>[]</code> for no sprites. Do not modify the input.",
  ],
  example: `batchSprites([
  { id: 1, texture: 'a', blend: 'n', z: 0 },
  { id: 2, texture: 'b', blend: 'n', z: 0 },
  { id: 3, texture: 'a', blend: 'n', z: 0 },
]);
// [ { texture:'a', blend:'n', ids:[1,3] }, { texture:'b', blend:'n', ids:[2] } ]`,
  tags: ["performance","rendering","draw-calls","batching"],
  estimatedMins: 40,
  xp: 70,
  starterFiles: [
    {
      name: "batchSprites.js",
      lang: "js",
      code: `// batchSprites.js
function batchSprites(sprites) {
  // your code here
}

module.exports = batchSprites;`,
    },
  ],
  testFile: {
    name: "batchSprites_test.js",
    lang: "test",
    code: `// batchSprites_test.js
const batchSprites = require('./batchSprites');

test('groups_same_texture_inside_one_depth', () => {
  // see the hidden tests for the full checks
  expect(typeof batchSprites).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "First get the depth levels: collect the distinct z values and sort them numerically. Handle one z level at a time.",
    },
    {
      order: 2,
      cost: 5,
      text: "Inside a level, use a Map keyed by <code>texture + '|' + blend</code>. A Map remembers insertion order, so groups come out in order of first appearance and each group's ids stay in input order.",
    },
    {
      order: 3,
      cost: 10,
      text: "Append each level's groups to one result list. When you append a group whose texture and blend equal the previous batch's, push its ids into that batch instead of making a new one.",
    },
  ],
  hiddenTests: [
    {
      name: "groups_same_texture_inside_one_depth",
      code: `const r = batchSprites([
  { id: 1, texture: 'a', blend: 'n', z: 0 },
  { id: 2, texture: 'b', blend: 'n', z: 0 },
  { id: 3, texture: 'a', blend: 'n', z: 0 },
]);
assert(r.length === 2, 'sprites 1 and 3 share a texture at the same depth, expected 2 batches, got ' + r.length);
assert(JSON.stringify(r[0].ids) === JSON.stringify([1, 3]) && r[0].texture === 'a', 'first batch is texture a with ids 1,3, got ' + JSON.stringify(r[0]));
assert(JSON.stringify(r[1].ids) === JSON.stringify([2]), 'second batch is sprite 2');`,
    },
    {
      name: "never_reorders_across_depths",
      code: `const r = batchSprites([
  { id: 1, texture: 'a', blend: 'n', z: 0 },
  { id: 2, texture: 'b', blend: 'n', z: 1 },
  { id: 3, texture: 'a', blend: 'n', z: 2 },
]);
assert(r.length === 3, 'a at z0, b at z1, a at z2 cannot be merged without changing the draw order, got ' + r.length);
assert(r.map((b) => b.ids[0]).join(',') === '1,2,3', 'draw order must follow z, got ' + r.map((b) => b.ids[0]).join(','));`,
    },
    {
      name: "merges_neighbouring_batches_across_depths",
      code: `const r = batchSprites([
  { id: 1, texture: 'a', blend: 'n', z: 0 },
  { id: 2, texture: 'a', blend: 'n', z: 1 },
  { id: 3, texture: 'b', blend: 'n', z: 2 },
]);
assert(r.length === 2, 'the two a sprites are adjacent in draw order and share material, got ' + r.length);
assert(JSON.stringify(r[0].ids) === JSON.stringify([1, 2]), 'merged batch should have ids 1,2, got ' + JSON.stringify(r[0].ids));`,
    },
    {
      name: "blend_mode_splits_a_batch",
      code: `const r = batchSprites([
  { id: 1, texture: 'a', blend: 'normal', z: 0 },
  { id: 2, texture: 'a', blend: 'add', z: 0 },
]);
assert(r.length === 2, 'same texture but different blend mode needs separate draw calls, got ' + r.length);`,
    },
    {
      name: "sorts_by_depth_not_input_order",
      code: `const r = batchSprites([
  { id: 'top', texture: 'a', blend: 'n', z: 5 },
  { id: 'bottom', texture: 'b', blend: 'n', z: 1 },
]);
assert(r[0].ids[0] === 'bottom' && r[1].ids[0] === 'top', 'lower z is drawn first, got ' + JSON.stringify(r));`,
    },
    {
      name: "empty_and_no_mutation",
      code: `assert(Array.isArray(batchSprites([])) && batchSprites([]).length === 0, 'no sprites means no batches');
const input = [{ id: 2, texture: 'a', blend: 'n', z: 1 }, { id: 1, texture: 'a', blend: 'n', z: 0 }];
batchSprites(input);
assert(input[0].id === 2 && input[1].id === 1, 'the input order must not change');`,
    },
    {
      name: "groups_keep_order_of_first_appearance",
      code: `const r = batchSprites([
  { id: 1, texture: 'b', blend: 'n', z: 0 },
  { id: 2, texture: 'a', blend: 'n', z: 0 },
  { id: 3, texture: 'b', blend: 'n', z: 0 },
  { id: 4, texture: 'a', blend: 'n', z: 0 },
]);
assert(r.length === 2 && r[0].texture === 'b' && r[1].texture === 'a', 'b appears first so its group comes first, got ' + JSON.stringify(r.map((b) => b.texture)));
assert(JSON.stringify(r[1].ids) === JSON.stringify([2, 4]), 'ids inside a group keep input order, got ' + JSON.stringify(r[1].ids));`,
    },
  ],
  solution: {
    code: `function batchSprites(sprites) {
  const levels = [...new Set(sprites.map((s) => s.z))].sort((a, b) => a - b);
  const batches = [];

  for (const z of levels) {
    const groups = new Map();
    for (const s of sprites) {
      if (s.z !== z) continue;
      const key = s.texture + '|' + s.blend;
      if (!groups.has(key)) groups.set(key, { texture: s.texture, blend: s.blend, ids: [] });
      groups.get(key).ids.push(s.id);
    }
    for (const g of groups.values()) {
      const last = batches[batches.length - 1];
      if (last && last.texture === g.texture && last.blend === g.blend) {
        last.ids.push(...g.ids);
      } else {
        batches.push(g);
      }
    }
  }
  return batches;
}

module.exports = batchSprites;`,
    explanation:
      "The rule that makes batching safe is that sprites on different depths must keep their order, while sprites on the same depth can be rearranged. So the solution handles one depth level at a time, in ascending order. Inside a level a Map keyed by texture and blend collects sprites into groups; a Map iterates in insertion order, which gives 'groups in order of first appearance' and, because ids are appended as sprites are scanned, 'sprites inside a group keep input order' at no extra cost. After building a level, its groups are appended to the result, and a group is merged into the previous batch when both texture and blend match, which is the only merge that does not reorder anything. The input is only read, never sorted in place, so the caller's array is untouched.",
  },
};
