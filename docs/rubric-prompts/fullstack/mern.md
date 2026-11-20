You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: mern (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

## HOW TO ANSWER
ONE layer per reply, in the order listed. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT (follow exactly)
First line: the layer marker, with the id from the list:
LAYER: <layer id>
Then ONE ```json code block with an object { "groups": [ ... ] }: one entry per group of that layer, in order. No text after the block. Each group entry has exactly these fields:
- "title": the group title, copied word for word
- "question": the spoken exam question for the whole group
- "followUps": an object, one key per subtopic (its title copied word for word) -> one follow-up question
- "criteria": an object, one key per subtopic (same titles) -> { "id", "evidence", "notEnough", "misconceptions" }

Example of ONE group, at the level of quality required:
```json
{
  "title": "How the Internet Works",
  "question": "Walk through what happens on the network when a client calls https://api.example.com/books, before your code even runs.",
  "followUps": {
    "TCP/IP & the Packet Model": "What does the TCP three-way handshake set up, and why does it matter for connection timeouts?",
    "DNS — Domain Resolution & TTL": "You move your API to a new IP, but some users still hit the old one. What is DNS TTL doing here?"
  },
  "criteria": {
    "TCP/IP & the Packet Model": {
      "id": "tcp-connection",
      "evidence": [
        {
          "id": "handshake",
          "text": "A connection is set up before any data is sent: the two sides exchange a few messages (the handshake) and agree on starting sequence numbers."
        },
        {
          "id": "reliability",
          "text": "TCP delivers bytes reliably and in order: lost packets are re-sent and reassembled in the right order."
        },
        {
          "id": "cost",
          "text": "Setting up the connection costs a round trip, which is why slow or unreachable servers show up as connect timeouts and why reusing connections (keep-alive) helps."
        }
      ],
      "notEnough": [
        "Only naming the terms (TCP, IP, the handshake, SYN/ACK) without explaining how they work or why they matter."
      ],
      "misconceptions": [
        {
          "id": "udp-like",
          "text": "Says TCP sends packets with no connection and no delivery guarantee."
        }
      ]
    },
    "DNS — Domain Resolution & TTL": {
      "id": "dns-ttl",
      "evidence": [
        {
          "id": "resolve",
          "text": "The hostname is first turned into an IP address by asking DNS resolvers before the connection is made."
        },
        {
          "id": "cache",
          "text": "DNS answers are cached by resolvers and clients for the record's TTL."
        },
        {
          "id": "stale",
          "text": "Until the TTL runs out, clients keep using the cached old IP, so a moved server is still hit at its old address."
        }
      ],
      "notEnough": [
        "Only naming the terms (DNS, TTL, resolver) without explaining how they work or why they matter."
      ],
      "misconceptions": [
        {
          "id": "ttl-is-latency",
          "text": "Describes TTL as response time or network latency."
        }
      ]
    }
  }
}
```

## QUESTION RULES
1. "question" asks the learner to explain or walk through a realistic situation that touches every subtopic of the group. It must be answerable by speaking, without code or a whiteboard.
2. Each follow-up targets ONE subtopic, is answerable in 90 seconds, and asks why or how, never for a definition or a list of names.

## EVIDENCE RULES (most important)
3. "evidence": 1 to 3 points per subtopic. Each point is ONE idea a correct answer must show, written as a plain statement ("DNS answers are cached for the record's TTL").
4. An idea, never a word: a learner who explains it in everyday words must be able to meet it. Never write "mentions X" or "uses the term X".
5. Checkable from speech: the judge must be able to quote the learner's words as proof.
6. Fair for this layer's level: no expert details a learner at this stage would not have.
7. Not fuzzy: never "understands X" or "knows about X".
8. "notEnough": 1 or 2 answers that sound right but do not count, usually naming the terms without explaining them.
9. "misconceptions": 0 to 2 real wrong beliefs learners hold about this subtopic, each as "Says ..." (what the learner would state). Only ones you are sure are wrong.

## ID RULES
10. Every "id" is lowercase-with-dashes, at most 48 characters. A criterion id is unique within the layer. Evidence and misconception ids are unique within their criterion.
11. Escape quotes so the JSON parses. No trailing commas, no comments.

## LAYERS
### Layer 1 of 10: id mern-1
Title: Web Fundamentals
Group: "How browsers parse and render HTML/CSS"
  - Subtopic: "The critical rendering path and render-blocking resources"
    Browsers parse HTML into a DOM, CSS into a CSSOM, then combine them into a render tree before painting. Understanding this tells you exactly why CSS in <head> and JS at end of body matters.
  - Subtopic: "Semantic HTML and the accessibility tree"
    Semantic elements like <nav>, <main>, and <article> create an accessibility tree that screen readers traverse. Choosing the right element is never just aesthetic — it determines keyboard navigability and ARIA roles.
Group: "CSS layout models: flow, flexbox, and grid"
  - Subtopic: "The box model: content, padding, border, and margin"
    Every element is a rectangular box. Knowing how box-sizing: border-box changes width calculations prevents the most common CSS layout bugs.
  - Subtopic: "When to use flexbox versus CSS grid"
    Flexbox is one-dimensional (a row or column); grid is two-dimensional (rows and columns simultaneously). Knowing which to reach for prevents fighting the layout algorithm.
Group: "Responsive design with media queries and units"
  - Subtopic: "Mobile-first breakpoints with min-width media queries"
    Write base styles for small screens, then add breakpoints upward. This produces leaner CSS than desktop-first overrides.
  - Subtopic: "Browser DevTools: inspecting layout, styles, and the network tab"
    DevTools lets you live-edit CSS, inspect box models, and see every network request. It's the fastest feedback loop you have while building.
Group: "JavaScript DOM manipulation and events"
  - Subtopic: "Selecting elements and modifying the DOM at runtime"
    querySelector, textContent, classList, and setAttribute let you read and rewrite the page from JavaScript. These are the primitives React abstracts over.
  - Subtopic: "Event bubbling, delegation, and removeEventListener"
    Events bubble up the DOM tree. Delegating a single listener on a parent instead of many on children is more performant and avoids memory leaks.

### Layer 2 of 10: id mern-2
Title: JavaScript Deep Dive
Group: "The JavaScript event loop and async execution model"
  - Subtopic: "Call stack, task queue, and microtask queue ordering"
    The event loop processes the call stack first, then microtasks (Promise callbacks), then the macrotask queue (setTimeout). Knowing this order explains why Promise.then always runs before setTimeout(fn, 0).
  - Subtopic: "How closures capture free variables in the scope chain"
    A closure is a function that retains references to its outer lexical scope even after that scope has returned. They enable module patterns, memoization, and React hooks' dependency semantics.
Group: "Promises and the async/await desugaring"
  - Subtopic: "Promise chaining versus async/await for sequential calls"
    async/await is syntactic sugar over Promises; each await suspends the function and resumes it in a microtask. Understanding this prevents bugs when mixing callbacks and Promises.
  - Subtopic: "Promise.all, Promise.allSettled, and race conditions"
    Promise.all rejects immediately if any promise rejects; Promise.allSettled waits for all. Choosing the wrong combinator is a common source of dropped errors in parallel API calls.
Group: "Modern ES6+ syntax patterns used in MERN codebases"
  - Subtopic: "Destructuring, spread, and rest in function signatures"
    Destructuring unpacks arrays/objects inline; spread copies or merges them. Both appear constantly in React props, Redux reducers, and API response handling.
  - Subtopic: "Array methods: map, filter, reduce, and their composition"
    These three methods replace most imperative loops. Composing them — filter then map — is how you transform API response arrays into what the UI needs.
Group: "Fetch API and error handling patterns"
  - Subtopic: "fetch, Response.ok, and typed error handling"
    fetch only rejects on network failure, not on 4xx/5xx responses. You must check response.ok and throw manually — a mistake that causes silent failures.
  - Subtopic: "ES modules: import/export and the difference from CommonJS"
    ESM is static (analyzed at parse time); CommonJS is dynamic (require runs at runtime). MERN projects mix both, and understanding the boundary prevents bundler errors.

### Layer 3 of 10: id mern-3
Title: React Fundamentals
Group: "React's component model and virtual DOM reconciliation"
  - Subtopic: "How React diffs the virtual DOM and batches DOM updates"
    React creates a virtual DOM tree and compares it to the previous one on each render, applying only the minimal real DOM changes. This diffing algorithm (reconciliation) is why React is fast with many small updates.
  - Subtopic: "Unidirectional data flow: props down, events up"
    In React, data flows from parent to child via props, and children communicate back via callback props. Violating this pattern leads to the tangled state that Context and state managers solve.
Group: "useState and useEffect semantics"
  - Subtopic: "Why state updates are asynchronous and batched"
    Calling setState doesn't immediately mutate state; React queues the update and re-renders. Relying on stale state in the same handler is the #1 React beginner bug.
  - Subtopic: "useEffect dependency array and cleanup functions"
    The dependency array controls when the effect re-runs; an empty array means run once on mount. Omitting the cleanup return causes memory leaks from subscriptions and timers.
Group: "JSX syntax and component composition patterns"
  - Subtopic: "JSX compiles to React.createElement calls"
    JSX is syntax sugar; <Button color='blue'>Click</Button> becomes React.createElement(Button, {color:'blue'}, 'Click'). Understanding this demystifies JSX restrictions like single root elements.
  - Subtopic: "Rendering lists with key props and conditional rendering"
    Keys help React identify which list items changed, added, or removed. Using array index as key breaks reconciliation when items reorder — use stable unique IDs instead.
Group: "Controlled forms and event handling in React"
  - Subtopic: "Controlled inputs: value prop + onChange handler"
    A controlled input's value is driven by React state, not the DOM. This makes validation and programmatic clearing trivial but requires a handler for every keystroke.
  - Subtopic: "Synthetic events and event pooling in React"
    React wraps native events in SyntheticEvent for cross-browser compatibility. Accessing event properties asynchronously requires event.persist() or extracting values before the async call.

### Layer 4 of 10: id mern-4
Title: React Advanced
Group: "Context API internals and when it causes re-renders"
  - Subtopic: "How Context propagates values and triggers consumer re-renders"
    Every component that calls useContext re-renders when the context value changes — even if it only uses part of the value. Splitting contexts by update frequency is how you avoid this.
  - Subtopic: "useReducer for state with multiple related sub-values"
    useReducer is preferable to useState when next state depends on complex logic across many fields. It also makes state transitions testable in pure functions.
Group: "React Router v6 rendering model"
  - Subtopic: "Nested routes and the Outlet component for shared layouts"
    In RRv6, nested route definitions render into the parent's <Outlet>. This replaces the old switch-based approach and makes layout composition declarative.
  - Subtopic: "useMemo and useCallback: when memoization helps and when it hurts"
    Memoization prevents unnecessary recalculations and child re-renders but adds overhead from the comparison itself. Only apply it when a profiler shows a real performance problem.
Group: "Custom hooks for reusable stateful logic"
  - Subtopic: "Extracting stateful logic into custom hooks"
    A custom hook is just a function whose name starts with 'use' and that calls other hooks. It lets you share logic like useFetch or useForm across components without prop drilling.
  - Subtopic: "Code splitting with React.lazy and Suspense"
    React.lazy dynamically imports a component, and Suspense shows a fallback while it loads. This keeps the initial bundle small by deferring routes or heavy components.
Group: "React Router navigation APIs"
  - Subtopic: "useNavigate, useParams, and useSearchParams"
    useNavigate replaces the history object for programmatic navigation. useParams reads dynamic segments and useSearchParams reads query strings — both typed with TypeScript generics.
  - Subtopic: "Protected routes using wrapper components and redirect"
    Wrapping routes in an auth-checking component that redirects unauthenticated users is the standard pattern. Combine with useContext auth state for a clean implementation.

### Layer 5 of 10: id mern-5
Title: Node.js & Express
Group: "The Node.js runtime: event loop and the module system"
  - Subtopic: "How Node.js handles I/O without blocking using libuv"
    Node delegates file I/O and network calls to libuv's thread pool; the event loop picks up callbacks when they complete. This is why a single-threaded Node server can handle thousands of concurrent connections.
  - Subtopic: "CommonJS require versus ES module import in Node"
    CommonJS loads synchronously; ESM is asynchronous and statically analyzable. Node supports both, but mixing them requires understanding .mjs/.cjs extensions and the 'type' package.json field.
Group: "Express middleware chain execution model"
  - Subtopic: "How Express routes and middleware compose with next()"
    Every Express handler receives (req, res, next). Calling next() passes control to the next middleware; calling next(err) skips to error middleware. The order of app.use() calls is the execution order.
  - Subtopic: "RESTful API design: resources, verbs, and status codes"
    REST maps HTTP verbs to CRUD: GET/read, POST/create, PUT-PATCH/update, DELETE/delete. Using the correct status codes (201, 204, 404, 422) makes your API self-documenting.
Group: "Setting up and structuring an Express application"
  - Subtopic: "Router modules for separating concerns by resource"
    express.Router() creates a mini-app with its own middleware stack. Mounting separate routers for /users, /posts, and /auth keeps each file focused on one resource.
  - Subtopic: "Environment variables with dotenv and the config pattern"
    Store secrets (DB URLs, JWT secrets) in .env files loaded by dotenv. Never commit .env — add it to .gitignore and document required variables in a .env.example.
Group: "Request validation and centralized error handling"
  - Subtopic: "Input validation with express-validator or Joi"
    Never trust req.body. Validate shape, type, and constraints at the route level before hitting business logic or the database. express-validator chains directly on route definitions.
  - Subtopic: "Centralized error middleware with four-argument signature"
    Express error middleware has the signature (err, req, res, next). Register it last with app.use() and throw or call next(err) from anywhere in the chain to reach it.

### Layer 6 of 10: id mern-6
Title: MongoDB & Mongoose
Group: "NoSQL document model versus relational tables"
  - Subtopic: "Embedding versus referencing documents in MongoDB"
    Embed related data (comments inside posts) when it's always read together; reference with ObjectId when the related data is large or shared. Choosing wrong is expensive to fix.
  - Subtopic: "MongoDB BSON types and the ObjectId structure"
    MongoDB stores documents as BSON (binary JSON), which includes types like ObjectId, Date, and Int64 that JSON lacks. ObjectId encodes a timestamp, making it sortable by insertion order.
Group: "Mongoose schema validation and middleware hooks"
  - Subtopic: "Schema types, validators, and default values in Mongoose"
    Mongoose schemas define the shape of documents with type constraints, required fields, and defaults. This validation runs before save, giving you a data integrity layer above the raw driver.
  - Subtopic: "Mongoose pre/post middleware for cross-cutting logic"
    pre('save') and post('find') hooks run before/after specific operations. Use them for hashing passwords, audit logging, or populating virtuals — logic that should always run regardless of caller.
Group: "MongoDB Atlas setup and connection management"
  - Subtopic: "Connecting with mongoose.connect and handling connection events"
    Pass the Atlas connection string to mongoose.connect() and listen for 'connected' and 'error' events. In production, use connection pooling settings and retry logic.
  - Subtopic: "CRUD operations with Mongoose model methods"
    Model.create(), .find(), .findById(), .findByIdAndUpdate(), .deleteOne() are the primary query methods. Always await them and handle the null case for find-by-ID lookups.
Group: "Querying and indexing for performance"
  - Subtopic: "MongoDB query operators: $eq, $in, $gte, $regex"
    MongoDB's query language uses operator objects inside filter documents. $in for array membership, $gte/$lte for ranges, and $regex for text search are the most commonly needed.
  - Subtopic: "Creating indexes to avoid full collection scans"
    Without an index, MongoDB scans every document. Add schema.index({ field: 1 }) in Mongoose or db.collection.createIndex() in Atlas for any field you filter or sort by frequently.

### Layer 7 of 10: id mern-7
Title: Authentication & Security
Group: "Password security and cryptographic hashing"
  - Subtopic: "Why bcrypt uses work factor and salting to resist brute force"
    bcrypt's adaptive cost factor makes hashing intentionally slow. Each password gets a random salt before hashing, so identical passwords produce different hashes and rainbow tables are useless.
  - Subtopic: "JWT structure: header, payload, and signature verification"
    A JWT is three Base64URL-encoded JSON objects separated by dots. The signature is computed from header+payload using a secret; the server verifies by re-computing it. Anyone can decode the payload — never put sensitive data in it.
Group: "HTTP-only cookies versus localStorage for token storage"
  - Subtopic: "Why XSS can steal localStorage tokens but not HTTP-only cookies"
    JavaScript cannot read HTTP-only cookies, so an XSS attack that injects a script can steal localStorage tokens but not cookie-stored ones. HTTP-only cookies are the safer choice for auth tokens.
  - Subtopic: "CSRF attacks and SameSite cookie attribute as defense"
    CSRF tricks a logged-in browser into making requests to your API. SameSite=Strict prevents cookies from being sent on cross-origin requests, neutralizing most CSRF attacks.
Group: "Implementing JWT auth in Express"
  - Subtopic: "Signing and verifying JWTs with jsonwebtoken"
    jwt.sign({userId}, secret, {expiresIn}) creates a token; jwt.verify(token, secret) validates it and returns the payload. Always set expiresIn and implement refresh token rotation.
  - Subtopic: "Auth middleware: extracting and verifying the Bearer token"
    Read the Authorization header, strip 'Bearer ', verify the JWT, attach the decoded user to req.user, then call next(). Attach this middleware only to routes that need protection.
Group: "CORS and input sanitization"
  - Subtopic: "Configuring cors middleware with an origin allowlist"
    The cors package sets Access-Control-Allow-Origin headers. Restrict the origin option to your front-end URL in production — never use '*' when credentials are involved.
  - Subtopic: "OWASP Top 10 essentials: injection, broken auth, and IDOR"
    The OWASP Top 10 catalogs the most critical web app vulnerabilities. Injection (SQL/NoSQL), broken authentication, and insecure direct object references are the three most likely to affect a MERN app.

### Layer 8 of 10: id mern-8
Title: Full Stack Integration
Group: "Server state versus client state: why the distinction matters"
  - Subtopic: "Why server state is async, shared, and can go stale"
    Server state (API data) is owned by the server; your local copy can be outdated the moment you fetch it. Libraries like React Query model this explicitly with cache, stale time, and background refetch.
  - Subtopic: "React Query cache: staleTime, cacheTime, and invalidation"
    staleTime controls how long data is considered fresh; cacheTime controls how long it's kept in memory after unmounting. queryClient.invalidateQueries() marks data stale and triggers a background refetch.
Group: "Zustand's subscription model versus Context re-renders"
  - Subtopic: "How Zustand avoids the Context re-render problem with selectors"
    Zustand components only re-render when the specific slice they select changes, unlike Context where any value change re-renders all consumers. Use selector functions: useStore(s => s.count).
Group: "Axios setup and interceptors for auth headers"
  - Subtopic: "Creating an Axios instance with baseURL and interceptors"
    Create a single Axios instance with your API's base URL. Add a request interceptor to inject the Authorization header and a response interceptor to handle 401s and token refresh.
  - Subtopic: "useMutation and optimistic updates in React Query"
    useMutation gives you mutateAsync, isPending, and onMutate for optimistic updates. In onMutate, cancel in-flight queries, snapshot old data, and apply the optimistic update immediately.
Group: "Connecting React to Express in development and production"
  - Subtopic: "Vite proxy configuration for local development"
    Set server.proxy in vite.config.ts to forward /api requests to your Express server. This avoids CORS issues in development and mirrors how reverse proxies work in production.
  - Subtopic: "Handling auth tokens: storing and refreshing on the client"
    Store access tokens in memory (a module-level variable or Zustand), not localStorage. Store the refresh token in an HTTP-only cookie and hit a /refresh endpoint before expiry.

### Layer 9 of 10: id mern-9
Title: Testing
Group: "Testing philosophy: unit, integration, and end-to-end"
  - Subtopic: "The testing pyramid and where to invest testing effort"
    The testing pyramid recommends many unit tests, fewer integration tests, and few E2E tests. Unit tests are fastest and cheapest; E2E tests are slow but catch real user-facing bugs.
  - Subtopic: "What to mock and what not to mock in unit tests"
    Mock external dependencies (HTTP calls, databases) in unit tests; test them for real in integration tests. Over-mocking makes tests pass even when integration is broken.
Group: "React Testing Library's guiding principle"
  - Subtopic: "Query hierarchy: getByRole first, test IDs as last resort"
    RTL's query priority mirrors how users find UI: by role, label, placeholder, text, then test ID. Using getByRole catches accessibility regressions automatically.
Group: "Writing Jest unit and integration tests"
  - Subtopic: "describe/it blocks, beforeEach setup, and assertion matchers"
    Jest's describe groups related tests; beforeEach runs setup before each. Matchers like toEqual, toHaveBeenCalledWith, and toThrow cover most assertion needs.
  - Subtopic: "Supertest for testing Express endpoints without a running server"
    Supertest wraps your Express app and makes real HTTP requests in-process. Use it to test route handlers, middleware, and response shapes without starting a server.
Group: "Async testing and CI integration"
  - Subtopic: "Testing async components with waitFor and findBy queries"
    findBy* queries return a promise that retries until the element appears. waitFor lets you assert on async state changes. Never use arbitrary timeouts — use these utilities instead.
  - Subtopic: "Running jest with --coverage and integrating into GitHub Actions"
    jest --coverage generates a coverage report. Add a GitHub Actions workflow step to run tests on every push and fail the PR if coverage drops or tests fail.

### Layer 10 of 10: id mern-10
Title: Deployment & DevOps
Group: "Docker containers and the image layer model"
  - Subtopic: "How Docker images are built from layered filesystem snapshots"
    Each Dockerfile instruction adds a read-only layer on top of the previous one. Layers are cached; changing a lower instruction invalidates all layers above it. Order instructions to maximize cache hits.
  - Subtopic: "Multi-stage builds for lean production images"
    A multi-stage Dockerfile uses one stage to build (with dev dependencies) and a second stage to run (copying only the compiled output). This can reduce image size from 1GB to under 100MB.
Group: "CI/CD pipeline concepts"
  - Subtopic: "Continuous integration versus continuous deployment distinctions"
    CI automatically runs tests on every commit to ensure the branch is always green. CD goes further and automatically deploys passing builds. GitHub Actions can handle both in a single workflow file.
Group: "Deploying MERN apps to cloud platforms"
  - Subtopic: "Vercel deployment: project settings, env vars, and preview URLs"
    Connect your GitHub repo to Vercel; it deploys on every push and creates preview URLs for PRs. Add environment variables in the Vercel dashboard — never in the repo.
  - Subtopic: "Railway for deploying Express APIs with managed env vars"
    Railway auto-detects Node apps, injects a PORT env variable, and provisions databases in the same project. Connect MongoDB Atlas via a DATABASE_URL variable for the data layer.
Group: "GitHub Actions workflow for a MERN project"
  - Subtopic: "Writing a workflow that tests and deploys on merge to main"
    A workflow YAML defines triggers (push to main), jobs (test, build, deploy), and steps. Use actions/checkout, actions/setup-node, and run: npm test before any deploy step.
  - Subtopic: "Production environment variables and secret management"
    Store secrets in GitHub Actions Secrets (Settings → Secrets → Actions). Reference them as ${{ secrets.MY_SECRET }} in the workflow. Never echo secrets or log them.

Start now with Layer 1.
