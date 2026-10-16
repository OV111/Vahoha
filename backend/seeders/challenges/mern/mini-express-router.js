export default {
  slug: "mini-express-router",
  trackId: "mern",
  layerId: "mern-5",
  type: "CODE",
  difficulty: "hard",
  title: "Build a tiny Express-style router",
  summary:
    "Route by method and path with params, run middleware in order, and route errors to error handlers.",
  description:
    "Express is mostly a loop over a list of functions: each calls next() to continue, and when something throws, the loop skips ahead to the functions that take four arguments. Building that loop yourself is the fastest way to understand middleware, route params and error handling.",
  task:
    "Write <code>createRouter()</code> returning <code>{ use(fn), get(path, ...handlers), post(path, ...handlers), handle(req) }</code>. <code>handle(req)</code> takes <code>{ method, path }</code> and returns a promise of <code>{ status, body }</code>. Everything registered is checked in registration order. <code>use(fn)</code> applies to every request. A route applies when its method equals <code>req.method</code> and its path matches: segments are compared one by one, <code>:name</code> captures a segment into <code>req.params.name</code> (decoded with <code>decodeURIComponent</code>), and a trailing slash is ignored. Handlers are called as <code>(req, res, next)</code>; <code>res.status(code)</code> sets the status and returns <code>res</code>, and <code>res.json(body)</code> (or <code>res.send(body)</code>) finishes the response with the status (default 200). <code>next()</code> moves to the next normal handler; <code>next(err)</code>, a thrown error or a rejected promise skips to the next <b>error handler</b>, a function declared with four parameters <code>(err, req, res, next)</code>. If nothing sends a response: 404 <code>{ error: 'Not found' }</code>, or, when an error is still unhandled, <code>err.status || 500</code> with <code>{ error: err.message }</code>.",
  constraints: [
    "Error handlers (function length 4) are skipped while there is no error, and normal handlers are skipped while there is one.",
    "<code>req.params</code> is set to the matched route's params before each of that route's handlers runs; middleware from <code>use</code> sees <code>{}</code> params.",
    "The first call to <code>res.json</code>/<code>res.send</code> wins; later calls are ignored.",
    "A handler may be synchronous or return a promise; either way errors must reach error handlers.",
  ],
  example: `const app = createRouter();
app.use((req, res, next) => { req.user = 'ana'; next(); });
app.get('/users/:id', (req, res) => res.json({ id: req.params.id, by: req.user }));
app.use((err, req, res, next) => res.status(400).json({ error: err.message }));
await app.handle({ method: 'GET', path: '/users/7' });
// { status: 200, body: { id: '7', by: 'ana' } }`,
  tags: ["express","middleware","routing","error-handling"],
  estimatedMins: 50,
  xp: 75,
  starterFiles: [
    {
      name: "createRouter.js",
      lang: "js",
      code: `// createRouter.js
function createRouter() {
  // your code here
}

module.exports = createRouter;`,
    },
  ],
  testFile: {
    name: "createRouter_test.js",
    lang: "test",
    code: `// createRouter_test.js
const createRouter = require('./createRouter');

test('routes_by_method_and_path_with_params', () => {
  // see the hidden tests for the full checks
  expect(typeof createRouter).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Keep one array of layers: <code>{ method, pattern, fns }</code> (use <code>method: null</code> for <code>use</code>). In <code>handle</code>, build a flat list of <code>{ fn, params }</code> for the layers that match the request, in order.",
    },
    {
      order: 2,
      cost: 5,
      text: "Write <code>next(err)</code> as a function that moves an index forward to the next entry whose <code>fn.length === 4</code> if there is an error, or <code>!== 4</code> if there is not. Wrap every call in try/catch and <code>Promise.resolve</code> so sync throws and rejected promises both call <code>next(err)</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "Return a promise from <code>handle</code> that resolves in <code>res.json</code>, or when the list runs out (404 or the unhandled-error response). Guard with a <code>finished</code> flag so the first response wins.",
    },
  ],
  hiddenTests: [
    {
      name: "routes_by_method_and_path_with_params",
      code: `const app = createRouter();
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));
app.post('/users', (req, res) => res.status(201).json({ created: true }));
const a = await app.handle({ method: 'GET', path: '/users/42' });
assert(a.status === 200 && a.body.id === '42', 'param captured, got ' + JSON.stringify(a));
const b = await app.handle({ method: 'POST', path: '/users' });
assert(b.status === 201 && b.body.created === true, 'status() then json(), got ' + JSON.stringify(b));
const c = await app.handle({ method: 'POST', path: '/users/42' });
assert(c.status === 404, 'a POST to a GET-only path is a 404, got ' + c.status);`,
    },
    {
      name: "decodes_params_and_ignores_trailing_slash",
      code: `const app = createRouter();
app.get('/files/:name', (req, res) => res.json({ name: req.params.name }));
const r = await app.handle({ method: 'GET', path: '/files/a%20b/' });
assert(r.status === 200 && r.body.name === 'a b', 'decoded param and trailing slash ignored, got ' + JSON.stringify(r));
const s = await app.handle({ method: 'GET', path: '/files/a/b' });
assert(s.status === 404, 'a different number of segments does not match, got ' + s.status);`,
    },
    {
      name: "middleware_runs_in_order_and_can_modify_req",
      code: `const app = createRouter();
const log = [];
app.use((req, res, next) => { log.push('one'); req.tag = 'x'; next(); });
app.use((req, res, next) => { log.push('two'); next(); });
app.get('/a', (req, res) => { log.push('route'); res.json({ tag: req.tag }); });
const r = await app.handle({ method: 'GET', path: '/a' });
assert(log.join(',') === 'one,two,route', 'order must follow registration, got ' + log.join(','));
assert(r.body.tag === 'x', 'later handlers see changes made to req');`,
    },
    {
      name: "middleware_can_end_the_response_early",
      code: `const app = createRouter();
let reached = false;
app.use((req, res) => res.status(401).json({ error: 'no' }));
app.get('/a', (req, res) => { reached = true; res.json({}); });
const r = await app.handle({ method: 'GET', path: '/a' });
assert(r.status === 401 && reached === false, 'a middleware that responds stops the chain, got ' + JSON.stringify(r) + ' reached=' + reached);`,
    },
    {
      name: "multiple_handlers_on_one_route_chain_with_next",
      code: `const app = createRouter();
app.get('/a', (req, res, next) => { req.step = 1; next(); }, (req, res) => res.json({ step: req.step }));
const r = await app.handle({ method: 'GET', path: '/a' });
assert(r.body.step === 1, 'route handlers chain through next(), got ' + JSON.stringify(r));`,
    },
    {
      name: "thrown_and_next_errors_reach_error_handlers",
      code: `const app = createRouter();
app.get('/boom', () => { throw new Error('sync boom'); });
app.get('/next', (req, res, next) => next(new Error('via next')));
app.get('/async', async () => { throw new Error('async boom'); });
app.use((err, req, res, next) => res.status(500).json({ message: err.message }));
for (const [path, msg] of [['/boom', 'sync boom'], ['/next', 'via next'], ['/async', 'async boom']]) {
  const r = await app.handle({ method: 'GET', path });
  assert(r.status === 500 && r.body.message === msg, path + ' should reach the error handler, got ' + JSON.stringify(r));
}`,
    },
    {
      name: "error_handlers_are_skipped_without_an_error_and_normal_ones_with_one",
      code: `const app = createRouter();
const hits = [];
app.use((err, req, res, next) => { hits.push('error-handler-early'); next(err); });
app.get('/a', (req, res, next) => { hits.push('route'); next(new Error('x')); }, (req, res) => { hits.push('skipped'); res.json({}); });
app.use((err, req, res, next) => { hits.push('error-handler'); res.status(418).json({ e: err.message }); });
const r = await app.handle({ method: 'GET', path: '/a' });
assert(hits.join(',') === 'route,error-handler', 'error handlers do not run before an error and normal handlers do not run after one, got ' + hits.join(','));
assert(r.status === 418 && r.body.e === 'x', 'got ' + JSON.stringify(r));`,
    },
    {
      name: "unhandled_errors_and_missing_routes_have_default_responses",
      code: `const app = createRouter();
app.get('/err', () => { const e = new Error('teapot'); e.status = 418; throw e; });
app.get('/plain', () => { throw new Error('plain'); });
const a = await app.handle({ method: 'GET', path: '/err' });
assert(a.status === 418 && a.body.error === 'teapot', 'err.status is used, got ' + JSON.stringify(a));
const b = await app.handle({ method: 'GET', path: '/plain' });
assert(b.status === 500 && b.body.error === 'plain', 'default is 500, got ' + JSON.stringify(b));
const c = await app.handle({ method: 'GET', path: '/nothing' });
assert(c.status === 404 && c.body.error === 'Not found', 'unmatched requests are 404, got ' + JSON.stringify(c));`,
    },
    {
      name: "first_response_wins",
      code: `const app = createRouter();
app.get('/a', (req, res) => { res.json({ n: 1 }); res.status(500).json({ n: 2 }); });
const r = await app.handle({ method: 'GET', path: '/a' });
assert(r.status === 200 && r.body.n === 1, 'the second json() call is ignored, got ' + JSON.stringify(r));`,
    },
  ],
  solution: {
    code: `function createRouter() {
  const layers = [];

  const matchPath = (pattern, path) => {
    const a = pattern.split('/').filter(Boolean);
    const b = path.split('/').filter(Boolean);
    if (a.length !== b.length) return null;
    const params = {};
    for (let i = 0; i < a.length; i++) {
      if (a[i][0] === ':') params[a[i].slice(1)] = decodeURIComponent(b[i]);
      else if (a[i] !== b[i]) return null;
    }
    return params;
  };

  const route = (method) => (pattern, ...fns) => { layers.push({ method, pattern, fns }); };

  function handle(req) {
    return new Promise((resolve) => {
      const entries = [];
      for (const layer of layers) {
        if (layer.method === null) {
          for (const fn of layer.fns) entries.push({ fn, params: {} });
        } else if (layer.method === req.method) {
          const params = matchPath(layer.pattern, req.path);
          if (params) for (const fn of layer.fns) entries.push({ fn, params });
        }
      }

      let finished = false;
      let status = 200;
      const done = (value) => { if (!finished) { finished = true; resolve(value); } };
      const res = {
        status(code) { status = code; return res; },
        json(body) { done({ status, body }); return res; },
        send(body) { done({ status, body }); return res; },
      };

      let index = 0;
      function next(err) {
        if (finished) return;
        while (index < entries.length) {
          const entry = entries[index++];
          const isErrorHandler = entry.fn.length === 4;
          if (Boolean(err) !== isErrorHandler) continue;
          req.params = entry.params;
          try {
            const out = err ? entry.fn(err, req, res, next) : entry.fn(req, res, next);
            Promise.resolve(out).catch((e) => next(e));
          } catch (e) {
            next(e);
          }
          return;
        }
        if (err) done({ status: err.status || 500, body: { error: err.message } });
        else done({ status: 404, body: { error: 'Not found' } });
      }
      next();
    });
  }

  return {
    use(fn) { layers.push({ method: null, pattern: null, fns: [fn] }); },
    get: route('GET'),
    post: route('POST'),
    handle,
  };
}

module.exports = createRouter;`,
    explanation:
      "The whole framework is one loop over a pre-filtered list. handle() first walks the registered layers in order and flattens the matching ones (every use(), plus routes whose method and path match, with their captured params) into a single list of entries. next() then advances an index through that list; the key idea is that the same index is shared, so skipping is just 'continue until I find an entry of the right kind': while there is an error only four-argument functions qualify, and while there is none only the others do. Wrapping each call in try/catch and Promise.resolve turns sync throws and rejected promises into next(err), which is what makes async handlers behave. If the list runs out the final fallback decides between 404 and the unhandled-error response. The finished flag makes the first json() call win, mirroring the way a real response cannot be sent twice.",
  },
};
