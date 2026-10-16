export default {
  slug: "asset-manifest-diff",
  trackId: "web-game",
  layerId: "web-game-9",
  type: "CODE",
  difficulty: "med",
  title: "Diff two asset manifests, with rename detection",
  summary:
    "Tell which assets were added, removed, changed or renamed between two builds.",
  description:
    "Build tools write a manifest mapping each asset path to a hash of its contents. Comparing the previous and the next manifest tells you exactly what to upload to the CDN and what to purge. Moving a file without editing it should not look like a delete plus an add, because the bytes are already on the server.",
  task:
    "Write <code>diffManifests(prev, next)</code> where both arguments map <code>path -&gt; hash</code>. Return <code>{ added, removed, changed, renamed, unchanged }</code>. <code>changed</code> lists paths present in both with different hashes. A path that was removed and a path that was added with the <b>same hash</b> form a rename: put <code>{ from, to }</code> in <code>renamed</code> and leave both paths out of <code>added</code> and <code>removed</code>. <code>unchanged</code> is a count of paths identical in both manifests.",
  constraints: [
    "<code>added</code>, <code>removed</code> and <code>changed</code> are arrays of paths sorted alphabetically; <code>renamed</code> is sorted by <code>from</code>.",
    "When several removed and added paths share one hash, pair them one-to-one in sorted order; leftovers stay in <code>added</code> or <code>removed</code>.",
    "A path that exists in both manifests is never part of a rename.",
    "Do not modify the inputs.",
  ],
  example: `diffManifests(
  { 'a.png': 'h1', 'b.png': 'h2', 'old.ogg': 'h3' },
  { 'a.png': 'h9', 'b.png': 'h2', 'new.ogg': 'h3' },
);
// { added: [], removed: [], changed: ['a.png'],
//   renamed: [{ from: 'old.ogg', to: 'new.ogg' }], unchanged: 1 }`,
  tags: ["build-tools","assets","diffing"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "diffManifests.js",
      lang: "js",
      code: `// diffManifests.js
function diffManifests(prev, next) {
  // your code here
}

module.exports = diffManifests;`,
    },
  ],
  testFile: {
    name: "diffManifests_test.js",
    lang: "test",
    code: `// diffManifests_test.js
const diffManifests = require('./diffManifests');

test('detects_added_removed_and_changed', () => {
  // see the hidden tests for the full checks
  expect(typeof diffManifests).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Start with the simple three-way split: loop over <code>next</code> for added / changed / unchanged, loop over <code>prev</code> for removed. Sort at the end.",
    },
    {
      order: 2,
      cost: 5,
      text: "For renames, group the removed paths by hash and the added paths by hash (Map from hash to a sorted list of paths). For each hash present in both groups, pair them off with a shared index.",
    },
    {
      order: 3,
      cost: 10,
      text: "Only pair as many as the shorter list; whatever is left over stays in <code>added</code> or <code>removed</code>. Remove the paired paths from those arrays before returning.",
    },
  ],
  hiddenTests: [
    {
      name: "detects_added_removed_and_changed",
      code: `const r = diffManifests({ a: '1', b: '2', c: '3' }, { a: '1', b: '9', d: '4' });
assert(JSON.stringify(r.added) === JSON.stringify(['d']), 'added should be ["d"], got ' + JSON.stringify(r.added));
assert(JSON.stringify(r.removed) === JSON.stringify(['c']), 'removed should be ["c"], got ' + JSON.stringify(r.removed));
assert(JSON.stringify(r.changed) === JSON.stringify(['b']), 'changed should be ["b"], got ' + JSON.stringify(r.changed));
assert(r.unchanged === 1, 'unchanged should be 1, got ' + r.unchanged);`,
    },
    {
      name: "detects_a_rename_by_matching_hash",
      code: `const r = diffManifests({ 'old.ogg': 'h3', 'k': 'x' }, { 'new.ogg': 'h3', 'k': 'x' });
assert(JSON.stringify(r.renamed) === JSON.stringify([{ from: 'old.ogg', to: 'new.ogg' }]), 'expected one rename, got ' + JSON.stringify(r.renamed));
assert(r.added.length === 0 && r.removed.length === 0, 'a rename must not also appear in added/removed, got added ' + JSON.stringify(r.added) + ' removed ' + JSON.stringify(r.removed));`,
    },
    {
      name: "same_hash_added_without_a_removal_is_just_added",
      code: `const r = diffManifests({ a: 'h' }, { a: 'h', b: 'h' });
assert(JSON.stringify(r.added) === JSON.stringify(['b']), 'a copy of an existing file is an addition, got ' + JSON.stringify(r.added));
assert(r.renamed.length === 0, 'there was nothing removed, so no rename');`,
    },
    {
      name: "pairs_duplicate_hashes_in_sorted_order",
      code: `const r = diffManifests({ a: 'h', b: 'h', c: 'h' }, { x: 'h', y: 'h' });
assert(JSON.stringify(r.renamed) === JSON.stringify([{ from: 'a', to: 'x' }, { from: 'b', to: 'y' }]), 'expected a->x and b->y, got ' + JSON.stringify(r.renamed));
assert(JSON.stringify(r.removed) === JSON.stringify(['c']), 'the leftover c stays removed, got ' + JSON.stringify(r.removed));
assert(r.added.length === 0, 'nothing is left over to add');`,
    },
    {
      name: "results_are_sorted",
      code: `const r = diffManifests({}, { z: '1', m: '2', a: '3' });
assert(JSON.stringify(r.added) === JSON.stringify(['a', 'm', 'z']), 'added must be sorted, got ' + JSON.stringify(r.added));`,
    },
    {
      name: "identical_manifests_and_no_mutation",
      code: `const prev = { a: '1', b: '2' };
const next = { a: '1', b: '2' };
const r = diffManifests(prev, next);
assert(r.unchanged === 2 && r.added.length === 0 && r.removed.length === 0 && r.changed.length === 0 && r.renamed.length === 0, 'identical manifests produce no differences');
assert(JSON.stringify(prev) === JSON.stringify({ a: '1', b: '2' }), 'the inputs must not be modified');`,
    },
  ],
  solution: {
    code: `function diffManifests(prev, next) {
  let added = [];
  let removed = [];
  const changed = [];
  let unchanged = 0;

  for (const path of Object.keys(next)) {
    if (!(path in prev)) added.push(path);
    else if (prev[path] !== next[path]) changed.push(path);
    else unchanged++;
  }
  for (const path of Object.keys(prev)) {
    if (!(path in next)) removed.push(path);
  }
  added.sort();
  removed.sort();
  changed.sort();

  const group = (paths, manifest) => {
    const byHash = new Map();
    for (const p of paths) {
      const h = manifest[p];
      if (!byHash.has(h)) byHash.set(h, []);
      byHash.get(h).push(p);
    }
    return byHash;
  };
  const removedByHash = group(removed, prev);
  const addedByHash = group(added, next);

  const renamed = [];
  const renamedFrom = new Set();
  const renamedTo = new Set();
  for (const [hash, fromPaths] of removedByHash) {
    const toPaths = addedByHash.get(hash);
    if (!toPaths) continue;
    const n = Math.min(fromPaths.length, toPaths.length);
    for (let i = 0; i < n; i++) {
      renamed.push({ from: fromPaths[i], to: toPaths[i] });
      renamedFrom.add(fromPaths[i]);
      renamedTo.add(toPaths[i]);
    }
  }
  renamed.sort((a, b) => (a.from < b.from ? -1 : a.from > b.from ? 1 : 0));
  added = added.filter((p) => !renamedTo.has(p));
  removed = removed.filter((p) => !renamedFrom.has(p));

  return { added, removed, changed, renamed, unchanged };
}

module.exports = diffManifests;`,
    explanation:
      "The first pass is the obvious three-way classification, and sorting those arrays up front is what makes the later 'pair in sorted order' rule deterministic. Rename detection works on what is left: removed and added paths are grouped by hash, and for every hash that appears on both sides the first n paths of each group are paired, where n is the shorter list. That pairing rule is why three removed files and two added files with one hash give two renames and one leftover removal. Paths that were paired are filtered out of added and removed afterwards, so a rename never shows up twice. A file that exists in both manifests never enters the removed or added lists at all, so it cannot be part of a rename.",
  },
};
