export default {
  slug: "atomic-json-store",
  trackId: "mern",
  layerId: "mern-5",
  type: "CODE",
  difficulty: "hard",
  title: "A JSON file store with queued, atomic writes",
  summary:
    "Persist key-value data to a file without losing concurrent updates or leaving half-written files.",
  description:
    "Small Node apps often keep data in a JSON file. Two things go wrong: concurrent writers overwrite each other's changes, and a crash in the middle of a write leaves a corrupt file. The standard fixes are to run changes one at a time and to write to a temporary file and rename it over the real one.",
  task:
    "Write <code>createJsonStore(fs, filePath)</code>. <code>fs</code> is an object with promise-returning <code>readFile(path)</code> (resolves to a string, rejects with an error whose <code>code</code> is <code>'ENOENT'</code> when missing), <code>writeFile(path, text)</code> and <code>rename(from, to)</code>. Return <code>{ get(key), set(key, value), remove(key), all() }</code>, all async. Load the file lazily, once, on first use (a missing file means an empty store; invalid JSON rejects with <code>Error('Corrupt store file')</code> and writes nothing). Run <code>set</code> and <code>remove</code> strictly one after another, in call order, even when called concurrently. Persist each change by writing the whole JSON text to <code>filePath + '.tmp'</code> and then renaming it to <code>filePath</code>. If writing or renaming fails, roll back the in-memory change, reject that call with the error, and keep the store usable for later calls.",
  constraints: [
    "<code>readFile</code> is called at most once per store, no matter how many calls happen at the same time.",
    "<code>get</code> and <code>all</code> return values from memory after the load and do not write.",
    "<code>remove</code> of a key that does not exist must not write to disk.",
    "A failed operation must not prevent the next queued operation from running.",
  ],
  example: `const store = createJsonStore(fs, 'data.json');
await Promise.all([store.set('a', 1), store.set('b', 2), store.set('c', 3)]);
await store.all(); // { a: 1, b: 2, c: 3 }  — and the file contains all three`,
  tags: ["node","file-system","concurrency","atomic-writes"],
  estimatedMins: 45,
  xp: 75,
  starterFiles: [
    {
      name: "createJsonStore.js",
      lang: "js",
      code: `// createJsonStore.js
function createJsonStore(fs, filePath) {
  // your code here
}

module.exports = createJsonStore;`,
    },
  ],
  testFile: {
    name: "createJsonStore_test.js",
    lang: "test",
    code: `// createJsonStore_test.js
const createJsonStore = require('./createJsonStore');

test('missing_file_means_an_empty_store', () => {
  // see the hidden tests for the full checks
  expect(typeof createJsonStore).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Keep one promise <code>queue</code>. Every mutation does <code>const run = queue.then(op); queue = run.catch(() =&gt; {}); return run;</code> so operations run one at a time and a failure rejects only its own caller.",
    },
    {
      order: 2,
      cost: 5,
      text: "Load once with a cached <code>loading</code> promise: the first call starts <code>readFile</code> and parses it (ENOENT becomes <code>{}</code>, a JSON error becomes <code>Error('Corrupt store file')</code>); everyone else awaits the same promise. Run the load inside the queue too, so a corrupt file rejects the call that triggered it.",
    },
    {
      order: 3,
      cost: 10,
      text: "Inside a mutation, copy the data, apply the change, write the temp file, rename it, and only then replace the in-memory data. Replacing it last is what makes rollback automatic.",
    },
  ],
  hiddenTests: [
    {
      name: "missing_file_means_an_empty_store",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs();
const store = createJsonStore(fs, 'db.json');
assert(JSON.stringify(await store.all()) === '{}', 'a missing file is an empty store');
assert((await store.get('x')) === undefined, 'unknown keys are undefined');`,
    },
    {
      name: "set_persists_through_a_temp_file_and_rename",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({ 'db.json': '{"a":1}' });
const store = createJsonStore(fs, 'db.json');
await store.set('b', 2);
assert(fs.files['db.json'] === JSON.stringify({ a: 1, b: 2 }), 'the real file must hold the full JSON, got ' + fs.files['db.json']);
assert(fs.log.join('|') === 'read db.json|write db.json.tmp|rename db.json.tmp>db.json', 'must write the temp file then rename, got ' + fs.log.join('|'));
assert(!('db.json.tmp' in fs.files), 'the temp file must be gone after the rename');`,
    },
    {
      name: "concurrent_sets_all_survive_and_run_in_order",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({}, { delayWrites: true });
const store = createJsonStore(fs, 'db.json');
await Promise.all([store.set('a', 1), store.set('b', 2), store.set('c', 3), store.remove('a'), store.set('d', 4)]);
assert(fs.files['db.json'] === JSON.stringify({ b: 2, c: 3, d: 4 }), 'all changes applied in call order, got ' + fs.files['db.json']);
assert(fs.reads === 1, 'the file is read once, got ' + fs.reads);
assert(fs.maxParallelWrites === 1, 'writes must never overlap, saw ' + fs.maxParallelWrites + ' at once');`,
    },
    {
      name: "get_and_all_read_from_memory",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({ 'db.json': '{"k":"v"}' });
const store = createJsonStore(fs, 'db.json');
assert((await store.get('k')) === 'v', 'get');
await store.get('k'); await store.all();
assert(fs.writes === 0, 'reading never writes');
assert(fs.reads === 1, 'and the file is read only once');`,
    },
    {
      name: "remove_of_a_missing_key_does_not_write",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({ 'db.json': '{"a":1}' });
const store = createJsonStore(fs, 'db.json');
await store.remove('nope');
assert(fs.writes === 0, 'removing a key that is not there must not write, saw ' + fs.writes + ' writes');
await store.remove('a');
assert(fs.files['db.json'] === '{}', 'removing an existing key persists');`,
    },
    {
      name: "corrupt_file_rejects_and_writes_nothing",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({ 'db.json': '{not json' });
const store = createJsonStore(fs, 'db.json');
let err = null;
try { await store.set('a', 1); } catch (e) { err = e; }
assert(err && err.message === 'Corrupt store file', 'must reject with "Corrupt store file", got ' + (err && err.message));
assert(fs.files['db.json'] === '{not json', 'the corrupt file must be left untouched');
assert(fs.writes === 0, 'nothing may be written');`,
    },
    {
      name: "failed_write_rolls_back_and_the_store_keeps_working",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({ 'db.json': '{"a":1}' });
const store = createJsonStore(fs, 'db.json');
await store.get('a');
fs.failNextWrite = true;
let err = null;
try { await store.set('b', 2); } catch (e) { err = e; }
assert(err && err.message === 'disk full', 'the write error must reach the caller, got ' + (err && err.message));
assert((await store.get('b')) === undefined, 'the failed change must be rolled back in memory');
await store.set('c', 3);
assert(fs.files['db.json'] === JSON.stringify({ a: 1, c: 3 }), 'later calls still work, got ' + fs.files['db.json']);`,
    },
    {
      name: "a_failure_does_not_block_queued_operations",
      code: `function makeFs(initial, opts) {
  const options = opts || {};
  const fs = { files: { ...(initial || {}) }, log: [], reads: 0, writes: 0, parallel: 0, maxParallelWrites: 0, failNextWrite: false };
  const tick = async () => { if (options.delayWrites) { for (let i = 0; i < 5; i++) await Promise.resolve(); } };
  fs.readFile = async (path) => {
    fs.reads++; fs.log.push('read ' + path); await tick();
    if (!(path in fs.files)) { const e = new Error('ENOENT'); e.code = 'ENOENT'; throw e; }
    return fs.files[path];
  };
  fs.writeFile = async (path, text) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try {
      await tick();
      if (fs.failNextWrite) { fs.failNextWrite = false; throw new Error('disk full'); }
      fs.writes++; fs.log.push('write ' + path); fs.files[path] = text;
    } finally { fs.parallel--; }
  };
  fs.rename = async (from, to) => {
    fs.parallel++; fs.maxParallelWrites = Math.max(fs.maxParallelWrites, fs.parallel);
    try { await tick(); fs.log.push('rename ' + from + '>' + to); fs.files[to] = fs.files[from]; delete fs.files[from]; } finally { fs.parallel--; }
  };
  return fs;
}
const fs = makeFs({}, { delayWrites: true });
const store = createJsonStore(fs, 'db.json');
fs.failNextWrite = true;
const first = store.set('a', 1).then(() => 'ok', () => 'failed');
const second = store.set('b', 2).then(() => 'ok', () => 'failed');
assert((await first) === 'failed' && (await second) === 'ok', 'first fails, second still runs');
assert(fs.files['db.json'] === JSON.stringify({ b: 2 }), 'only the successful change is stored, got ' + fs.files['db.json']);`,
    },
  ],
  solution: {
    code: `function createJsonStore(fs, filePath) {
  let data = null;
  let loading = null;
  let queue = Promise.resolve();

  function load() {
    if (!loading) {
      loading = fs.readFile(filePath).then(
        (text) => {
          try {
            return JSON.parse(text);
          } catch (e) {
            loading = null;
            throw new Error('Corrupt store file');
          }
        },
        (err) => {
          if (err && err.code === 'ENOENT') return {};
          loading = null;
          throw err;
        },
      );
    }
    return loading;
  }

  async function ensureLoaded() {
    if (data === null) {
      const loaded = await load();
      // A change may have been saved while we waited; never overwrite newer data.
      if (data === null) data = loaded;
    }
    return data;
  }

  async function persist(next) {
    const tmp = filePath + '.tmp';
    await fs.writeFile(tmp, JSON.stringify(next));
    await fs.rename(tmp, filePath);
  }

  function mutate(change) {
    const run = queue.then(async () => {
      const current = await ensureLoaded();
      const next = change({ ...current });
      if (next === null) return;
      await persist(next);
      data = next;
    });
    queue = run.catch(() => {});
    return run;
  }

  return {
    async get(key) {
      const current = await ensureLoaded();
      return current[key];
    },
    async all() {
      return { ...(await ensureLoaded()) };
    },
    set(key, value) {
      return mutate((draft) => { draft[key] = value; return draft; });
    },
    remove(key) {
      return mutate((draft) => {
        if (!(key in draft)) return null;
        delete draft[key];
        return draft;
      });
    },
  };
}

module.exports = createJsonStore;`,
    explanation:
      "Two separate promises solve two separate problems. The queue serialises mutations: each one starts from queue.then(...), and the tail of the queue swallows errors with catch, so a failing operation rejects only its own caller while the next one still runs. The cached loading promise makes the file load exactly once even when many calls arrive together. Each mutation works on a copy of the data, writes the temp file, renames it over the real one (a rename is atomic, so readers and a crash see either the old file or the new one, never half of it), and only then replaces the in-memory data. Because memory is replaced last, a failed write needs no explicit rollback: the old data was never touched. A removal that changes nothing returns early so it does not cost a write.",
  },
};
