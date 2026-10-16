export default {
  slug: "rest-resource-handlers",
  trackId: "mern",
  layerId: "mern-5",
  type: "CODE",
  difficulty: "med",
  title: "REST handlers with the right status codes",
  summary:
    "Build list, get, create, update and delete handlers that answer with correct status codes and headers.",
  description:
    "REST APIs communicate through status codes as much as bodies: 201 for a created resource with a Location header, 204 when there is nothing to return, 404 for a missing id and 400 for a bad body. Getting these consistent across resources is a common review comment.",
  task:
    "Write <code>createResource(store, basePath)</code> returning handlers <code>{ list, get, create, update, remove }</code>. Each handler takes <code>req</code> (<code>{ params, body }</code>) and returns <code>{ status, body, headers }</code> (omit <code>headers</code> when there are none). <code>store</code> has synchronous methods <code>list()</code>, <code>get(id)</code> (undefined if missing), <code>create(data)</code> (returns the item with an <code>id</code>), <code>update(id, data)</code> (returns the item, or undefined if missing) and <code>remove(id)</code> (returns true/false). Rules: <code>list</code> 200 <code>{ data: items }</code>. <code>get</code> 200 <code>{ data }</code> or 404 <code>{ error: 'Not found' }</code>. <code>create</code> and <code>update</code> need a non-empty object body, otherwise 400 <code>{ error: 'Body is required' }</code>; <code>create</code> answers 201 <code>{ data }</code> with header <code>Location: basePath + '/' + id</code>; <code>update</code> answers 200 <code>{ data }</code> or 404. <code>remove</code> answers 204 with body <code>null</code>, or 404.",
  constraints: [
    "Validate the body before calling the store, so an invalid request never changes data.",
    "A body is valid only if it is a non-null, non-array object with at least one own key.",
    "The 404 body is exactly <code>{ error: 'Not found' }</code> everywhere.",
    "<code>params.id</code> is passed to the store exactly as received.",
  ],
  example: `const items = createResource(store, '/api/items');
items.create({ body: { name: 'pen' } });
// { status: 201, body: { data: { id: 1, name: 'pen' } }, headers: { Location: '/api/items/1' } }
items.get({ params: { id: 99 } }); // { status: 404, body: { error: 'Not found' } }`,
  tags: ["express","rest","http-status","api-design"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "createResource.js",
      lang: "js",
      code: `// createResource.js
function createResource(store, basePath) {
  // your code here
}

module.exports = createResource;`,
    },
  ],
  testFile: {
    name: "createResource_test.js",
    lang: "test",
    code: `// createResource_test.js
const createResource = require('./createResource');

test('list_returns_200_with_data', () => {
  // see the hidden tests for the full checks
  expect(typeof createResource).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write two tiny helpers first: <code>notFound()</code> returning <code>{ status: 404, body: { error: 'Not found' } }</code> and <code>validBody(body)</code>.",
    },
    {
      order: 2,
      cost: 5,
      text: "In <code>create</code> and <code>update</code>, check <code>validBody</code> before anything else and return the 400 response; only then call the store.",
    },
    {
      order: 3,
      cost: 10,
      text: "For 201, the Location value is <code>basePath + '/' + created.id</code>. For 204 return <code>{ status: 204, body: null }</code> with no headers key.",
    },
  ],
  hiddenTests: [
    {
      name: "list_returns_200_with_data",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const store = makeStore([{ id: 1, n: 'a' }]);
const h = createResource(store, '/api/x');
const r = h.list({});
assert(r.status === 200 && JSON.stringify(r.body) === JSON.stringify({ data: [{ id: 1, n: 'a' }] }), 'list should be 200 {data:[...]}, got ' + JSON.stringify(r));`,
    },
    {
      name: "get_found_and_missing",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const h = createResource(makeStore([{ id: 1, n: 'a' }]), '/api/x');
const ok = h.get({ params: { id: 1 } });
assert(ok.status === 200 && ok.body.data.n === 'a', 'found should be 200, got ' + JSON.stringify(ok));
const miss = h.get({ params: { id: 2 } });
assert(miss.status === 404 && miss.body.error === 'Not found', 'missing should be 404 Not found, got ' + JSON.stringify(miss));`,
    },
    {
      name: "create_returns_201_with_location",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const store = makeStore([]);
const h = createResource(store, '/api/x');
const r = h.create({ body: { n: 'pen' } });
assert(r.status === 201, 'create should answer 201, got ' + r.status);
assert(r.body.data.n === 'pen' && r.body.data.id !== undefined, 'the created item is returned with an id');
assert(r.headers && r.headers.Location === '/api/x/' + r.body.data.id, 'Location header should point at the new item, got ' + JSON.stringify(r.headers));
assert(store.items.length === 1, 'the item must be stored');`,
    },
    {
      name: "bad_bodies_are_rejected_before_the_store_is_touched",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const store = makeStore([{ id: 1, n: 'a' }]);
const h = createResource(store, '/api/x');
for (const body of [undefined, null, {}, [], 'text', 5]) {
  const c = h.create({ body });
  assert(c.status === 400 && c.body.error === 'Body is required', 'create with ' + JSON.stringify(body) + ' should be 400, got ' + JSON.stringify(c));
  const u = h.update({ params: { id: 1 }, body });
  assert(u.status === 400 && u.body.error === 'Body is required', 'update with ' + JSON.stringify(body) + ' should be 400, got ' + JSON.stringify(u));
}
assert(store.calls.create === 0 && store.calls.update === 0, 'the store must not be called for invalid bodies');`,
    },
    {
      name: "update_returns_200_or_404",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const h = createResource(makeStore([{ id: 1, n: 'a' }]), '/api/x');
const ok = h.update({ params: { id: 1 }, body: { n: 'b' } });
assert(ok.status === 200 && ok.body.data.n === 'b', 'update should answer 200 with the new item, got ' + JSON.stringify(ok));
const miss = h.update({ params: { id: 9 }, body: { n: 'b' } });
assert(miss.status === 404 && miss.body.error === 'Not found', 'updating a missing id should be 404, got ' + JSON.stringify(miss));`,
    },
    {
      name: "remove_returns_204_or_404",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const store = makeStore([{ id: 1, n: 'a' }]);
const h = createResource(store, '/api/x');
const ok = h.remove({ params: { id: 1 } });
assert(ok.status === 204 && ok.body === null, 'delete should be 204 with a null body, got ' + JSON.stringify(ok));
assert(store.items.length === 0, 'the item must be removed');
const miss = h.remove({ params: { id: 1 } });
assert(miss.status === 404, 'deleting twice should be 404, got ' + miss.status);`,
    },
    {
      name: "successful_responses_without_headers_omit_them",
      code: `function makeStore(initial) {
  const store = { items: initial.map((i) => ({ ...i })), calls: { create: 0, update: 0 }, nextId: 100 };
  store.list = () => store.items.slice();
  store.get = (id) => store.items.find((i) => i.id === id);
  store.create = (data) => { store.calls.create++; const item = { id: store.nextId++, ...data }; store.items.push(item); return item; };
  store.update = (id, data) => { store.calls.update++; const item = store.get(id); if (!item) return undefined; Object.assign(item, data); return item; };
  store.remove = (id) => { const i = store.items.findIndex((x) => x.id === id); if (i === -1) return false; store.items.splice(i, 1); return true; };
  return store;
}
const h = createResource(makeStore([{ id: 1, n: 'a' }]), '/api/x');
assert(!('headers' in h.get({ params: { id: 1 } })), 'get has no headers');
assert(!('headers' in h.list({})), 'list has no headers');`,
    },
  ],
  solution: {
    code: `function createResource(store, basePath) {
  const notFound = () => ({ status: 404, body: { error: 'Not found' } });
  const badBody = () => ({ status: 400, body: { error: 'Body is required' } });
  const validBody = (b) =>
    typeof b === 'object' && b !== null && !Array.isArray(b) && Object.keys(b).length > 0;

  return {
    list() {
      return { status: 200, body: { data: store.list() } };
    },
    get(req) {
      const item = store.get(req.params.id);
      return item === undefined ? notFound() : { status: 200, body: { data: item } };
    },
    create(req) {
      if (!validBody(req.body)) return badBody();
      const item = store.create(req.body);
      return { status: 201, body: { data: item }, headers: { Location: basePath + '/' + item.id } };
    },
    update(req) {
      if (!validBody(req.body)) return badBody();
      const item = store.update(req.params.id, req.body);
      return item === undefined ? notFound() : { status: 200, body: { data: item } };
    },
    remove(req) {
      return store.remove(req.params.id) ? { status: 204, body: null } : notFound();
    },
  };
}

module.exports = createResource;`,
    explanation:
      "Handlers return plain {status, body, headers} objects instead of touching a response, which is what makes them testable without an HTTP server, and a thin Express adapter can send them unchanged. The order of checks matters: the body is validated before the store is called, so a rejected request never changes data and never reports a misleading 404. Status codes follow the conventions clients rely on: 201 plus a Location header says where the new resource lives, 204 means success with no body, and 404 uses one shared helper so its shape never drifts between routes. The id is passed to the store exactly as received, leaving type coercion to the layer that knows the id format.",
  },
};
