You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: fullstack-engineer (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id fullstack-engineer-1
Title: Web Fundamentals
Group: "How browsers parse and render pages"
  - Subtopic: "DOM, CSSOM, and the critical rendering path"
    Browsers parse HTML into a DOM tree and CSS into a CSSOM tree, merge them into a render tree, then layout and paint. Render-blocking CSS and JS delay the first paint — understanding this drives performance decisions.
  - Subtopic: "Semantic HTML and the accessibility tree"
    Semantic elements like <nav>, <main>, and <button> map directly to ARIA roles used by assistive technologies. Choosing semantically correct elements is a prerequisite for accessible web applications.
Group: "CSS layout: box model, flexbox, and grid"
  - Subtopic: "The box model and box-sizing: border-box"
    Every element is a box with content, padding, border, and margin. border-box makes width include padding and border, eliminating the most common layout arithmetic bugs.
  - Subtopic: "Flexbox for one-dimensional layouts, Grid for two-dimensional"
    Flexbox handles a row or column of items; Grid handles both axes simultaneously. Using Grid for page layout and Flexbox inside components is the standard combination.
Group: "Responsive design and JavaScript DOM manipulation"
  - Subtopic: "Mobile-first media queries with min-width breakpoints"
    Write base styles for small screens and layer on breakpoints upward with min-width. This produces leaner CSS than desktop-first overrides and aligns with how most users first encounter web apps.
  - Subtopic: "DOM manipulation: querySelector, classList, and events"
    querySelector selects elements; classList.toggle/add/remove drives state-based styling; addEventListener binds user interaction. These are the primitives every framework compiles down to.
Group: "Browser DevTools and the Fetch API"
  - Subtopic: "Network tab: inspecting requests, responses, and status codes"
    The Network tab shows every HTTP request made by the page. Inspect status codes, headers, payloads, and timing to debug API calls and catch unexpected requests.
  - Subtopic: "fetch() with async/await and proper error handling"
    fetch() only rejects on network failure — you must check response.ok for 4xx/5xx errors. Always await response.json() separately and handle both network and HTTP errors explicitly.

### Layer 2 of 10: id fullstack-engineer-2
Title: Frontend with React
Group: "React's virtual DOM and component model"
  - Subtopic: "How React diffs the virtual DOM to minimize real DOM mutations"
    React maintains a virtual DOM tree and reconciles it with the previous render on each state change, applying only the minimal real DOM mutations. This diffing is what makes React fast with frequent updates.
  - Subtopic: "Unidirectional data flow: props down, callbacks up"
    React data flows in one direction — parent to child via props, child to parent via callback functions. This makes state changes traceable and avoids the tangled two-way bindings of older frameworks.
Group: "useState, useEffect, and the hooks model"
  - Subtopic: "Why state updates are asynchronous and batched in React 18"
    React 18 batches all state updates — even inside setTimeout and native event handlers. Calling setState doesn't update state until the next render, so reading state immediately after setting it gives the old value.
  - Subtopic: "useEffect cleanup prevents memory leaks from subscriptions and timers"
    Return a cleanup function from useEffect to cancel any subscriptions, timers, or in-flight fetches when the component unmounts or the effect re-runs. Omitting cleanup is the most common React memory leak.
Group: "Building components with Vite and React"
  - Subtopic: "Vite dev server: HMR, fast cold starts, and the build output"
    Vite uses native ES modules in development for instant HMR without bundling. The production build uses Rollup. Understanding the distinction explains why import.meta.env vars work only at build time.
  - Subtopic: "Client-side routing with React Router v6"
    React Router v6 uses nested route definitions and <Outlet> for layout composition. <Link> navigates without a page reload; useNavigate handles programmatic navigation from event handlers.
Group: "Fetching data in components"
  - Subtopic: "Data fetching pattern in useEffect with loading and error state"
    Fetch in useEffect, track loading/data/error in useState, and cancel the request on unmount with AbortController. This manual pattern is what React Query and SWR automate.
  - Subtopic: "Lifting state to the nearest common ancestor"
    When two sibling components need shared data, lift the state to their lowest common parent. Pass the data down as props and the updater function as a callback prop.

### Layer 3 of 10: id fullstack-engineer-3
Title: Backend with Node and Express
Group: "Node.js runtime and the Express request cycle"
  - Subtopic: "Node's event loop: non-blocking I/O on a single thread"
    Node delegates I/O to libuv's thread pool and processes callbacks in the event loop. This lets a single Node process serve thousands of concurrent HTTP connections without threads.
  - Subtopic: "Express middleware chain: execution order and next()"
    Express processes middleware in registration order. Each function receives (req, res, next) — calling next() passes control forward; calling next(err) jumps to error-handling middleware registered last.
Group: "REST API design principles"
  - Subtopic: "Resource-based URLs, HTTP verbs, and idempotency"
    REST URLs name resources (/recipes/42), not actions. GET is idempotent and safe; POST is neither; PUT is idempotent but not safe; DELETE is idempotent. Correct semantics enable caching and retry logic.
  - Subtopic: "HTTP status codes: choosing the right code for each response"
    200 OK for reads, 201 Created for POST success, 204 No Content for DELETE, 400 for bad input, 401 for missing auth, 403 for forbidden, 404 for not found, 422 for validation failures.
Group: "Structuring an Express API"
  - Subtopic: "Router modules: separating routes by resource"
    express.Router() creates a mini-app with its own middleware. Mount separate routers for /recipes, /users, and /auth. Keep route files thin — delegate business logic to controller functions.
  - Subtopic: "Centralized error middleware with the four-argument signature"
    Register (err, req, res, next) middleware after all routes. Call next(err) from anywhere in the chain — route handlers, async wrappers, or other middleware — to reach it and return a consistent error shape.
Group: "Environment configuration and async error handling"
  - Subtopic: "dotenv for environment variables with .env.example documentation"
    Load secrets with dotenv.config() before importing other modules. Commit .env.example with placeholder values so teammates know what variables are required without exposing real secrets.
  - Subtopic: "Wrapping async route handlers to catch rejected promises"
    Express doesn't catch async errors automatically. Wrap handlers in a catchAsync(fn) utility that calls next(err) on rejection, forwarding errors to the error middleware without try-catch in every handler.

### Layer 4 of 10: id fullstack-engineer-4
Title: Relational Databases and SQL
Group: "Relational data modeling and normalization"
  - Subtopic: "Normalization: splitting data to eliminate redundancy"
    1NF requires atomic column values. 2NF removes partial dependencies on composite keys. 3NF removes transitive dependencies. Over-normalizing hurts read performance; under-normalizing causes update anomalies.
  - Subtopic: "Primary keys, foreign keys, and referential integrity constraints"
    Foreign keys enforce that a referenced row exists. ON DELETE CASCADE automatically removes child rows when the parent is deleted. ON DELETE RESTRICT prevents deletion when children exist.
Group: "SQL query execution model"
  - Subtopic: "How JOIN operations combine rows from multiple tables"
    INNER JOIN returns only rows with matching values in both tables. LEFT JOIN keeps all left rows, filling NULLs for unmatched right rows. The query planner chooses the join algorithm based on table size and indexes.
  - Subtopic: "GROUP BY with aggregate functions and the HAVING clause"
    GROUP BY collapses rows with the same value into one group. WHERE filters individual rows before grouping; HAVING filters groups after aggregation. Both can coexist in the same query.
Group: "Writing SQL and connecting to PostgreSQL from Node"
  - Subtopic: "SELECT, INSERT, UPDATE, DELETE with parameterized queries"
    Always use parameterized queries ($1, $2 in node-postgres) — never string interpolation. This prevents SQL injection and lets the database cache query plans for better performance.
  - Subtopic: "Connection pooling with the pg Pool class"
    Creating a new connection per request takes ~50ms. pg.Pool reuses connections across requests and queues queries when the pool is full. Set max pool size to match your database's connection limit.
Group: "Indexes and constraints for data integrity"
  - Subtopic: "Creating indexes on columns used in WHERE and JOIN clauses"
    Without an index, PostgreSQL scans every row. CREATE INDEX ON recipes(category_id) speeds up queries that filter by category. Run EXPLAIN ANALYZE to confirm the index is being used.
  - Subtopic: "UNIQUE and CHECK constraints for data integrity at the database level"
    UNIQUE constraints prevent duplicate emails or slugs. CHECK constraints enforce domain rules (price > 0) at the database level, catching bugs that slip past application validation.

### Layer 5 of 10: id fullstack-engineer-5
Title: Connecting Frontend and Backend
Group: "HTTP and the browser's same-origin policy"
  - Subtopic: "Why the browser blocks cross-origin requests by default"
    The same-origin policy prevents scripts on one origin from reading responses from another. CORS is the server-controlled mechanism that opts into allowing cross-origin requests with specific headers.
  - Subtopic: "Preflight OPTIONS requests and the CORS negotiation flow"
    Non-simple requests (DELETE, PUT, custom headers) trigger a preflight OPTIONS request. The browser checks the server's CORS headers before sending the actual request. A missing or wrong header blocks the real call.
Group: "API client organization and loading states"
  - Subtopic: "Centralizing API calls in a services layer"
    Keeping fetch calls in dedicated service files (api/recipes.js) separates concerns and makes it easy to swap the HTTP client or add request interceptors without touching component code.
  - Subtopic: "Pagination with query parameters: page, limit, and offset"
    Pass page and limit as query params (/recipes?page=2&limit=10). The server calculates offset = (page-1)*limit and returns total count alongside the data so the client can render a page count.
Group: "Connecting React to an Express API in development"
  - Subtopic: "Vite proxy configuration to avoid CORS in development"
    Set server.proxy in vite.config.ts to forward /api requests to Express. This makes the browser think both apps are on the same origin, eliminating CORS issues without touching the production configuration.
  - Subtopic: "cors middleware on Express: origin allowlist and credentials"
    Use the cors npm package with origin: 'https://yourfrontend.com'. Enable credentials: true when the frontend sends cookies or Authorization headers. Never use origin: '*' with credentials.
Group: "Managing async UI state: loading, error, and empty"
  - Subtopic: "Modeling all four fetch states: idle, loading, success, error"
    A robust data-fetching component handles all four states. Use a status: 'idle' | 'loading' | 'success' | 'error' field in state to drive conditional rendering without boolean flag combinatorial explosion.
  - Subtopic: "Error boundaries for catching render errors in React subtrees"
    Error boundaries catch JavaScript errors in any child component and display a fallback UI instead of crashing the whole app. They must be class components but can be wrapped in a functional component helper.

### Layer 6 of 10: id fullstack-engineer-6
Title: Authentication and Authorization
Group: "Authentication fundamentals: sessions versus tokens"
  - Subtopic: "Session-based auth: server stores state, cookie holds session ID"
    The server creates a session record and sends the session ID in a Set-Cookie header. On each request, the browser sends the cookie and the server looks up the session. Revocation is instant but requires a session store.
  - Subtopic: "JWT-based auth: stateless tokens with HMAC signatures"
    JWTs encode the user identity in a signed token — no server-side storage needed. The server verifies the signature on every request. Revocation is harder; short expiry with refresh tokens is the standard mitigation.
Group: "Password security and token storage"
  - Subtopic: "bcrypt's adaptive cost factor and per-password salting"
    bcrypt applies a random salt before hashing, making identical passwords produce different hashes. The cost factor (rounds) makes each hash deliberately slow, raising the cost of brute-force attacks.
  - Subtopic: "HTTP-only cookies prevent XSS from stealing auth tokens"
    JavaScript cannot read HTTP-only cookies, making them immune to XSS token theft. Combine with SameSite=Strict (CSRF protection) and Secure (HTTPS only) for a hardened cookie configuration.
Group: "Implementing auth in Express and React"
  - Subtopic: "bcrypt.hash and bcrypt.compare for password hashing"
    bcrypt.hash(password, 12) hashes with cost 12 — high enough to be slow without making login frustrating. bcrypt.compare(plain, hash) is timing-safe; never use === to compare passwords.
  - Subtopic: "JWT auth middleware: verify Bearer token and attach user to req"
    Read Authorization header, strip 'Bearer ', call jwt.verify(token, secret). Attach the decoded payload to req.user. Apply this middleware to protected routers, not globally.
Group: "Role-based access control and React route guards"
  - Subtopic: "Express middleware for role-based authorization"
    After the auth middleware attaches req.user, add a requireRole('admin') middleware that checks req.user.role and calls next(new ForbiddenError()) if the role doesn't match.
  - Subtopic: "ProtectedRoute wrapper in React Router v6"
    Wrap protected routes in a component that reads auth state and returns <Navigate to='/login' replace> for unauthenticated users. Pass the desired URL as state so login can redirect back after success.

### Layer 7 of 10: id fullstack-engineer-7
Title: API Design and Advanced Backend
Group: "API design: layered architecture and validation"
  - Subtopic: "Service and repository layers for separation of concerns"
    Routes receive requests, controllers orchestrate logic, services hold business rules, repositories handle database queries. Each layer depends only on the layer below it, making unit testing and swapping implementations straightforward.
  - Subtopic: "Input validation at the API boundary prevents invalid data propagation"
    Validate every piece of incoming data before it reaches business logic or the database. A validation error at the boundary with a clear message is far easier to debug than a constraint violation deep in the stack.
Group: "Caching and query optimization"
  - Subtopic: "HTTP caching: Cache-Control, ETag, and conditional requests"
    Cache-Control: max-age=3600 tells clients and proxies to cache the response for an hour. ETags let clients make conditional requests — if the resource hasn't changed, the server returns 304 Not Modified with no body.
  - Subtopic: "Database query optimization: indexes, EXPLAIN, and N+1 avoidance"
    Run EXPLAIN ANALYZE on slow queries to spot sequential scans on large tables. Add indexes on filtered and joined columns. Avoid N+1 by fetching related data in a single JOIN query instead of one query per row.
Group: "Input validation, rate limiting, and security headers"
  - Subtopic: "express-validator for chained field validation on routes"
    Chain validators: body('email').isEmail().normalizeEmail(). Call validationResult(req) at the top of the handler and return 422 with the error array if validation failed.
  - Subtopic: "Helmet for security headers and express-rate-limit for brute-force protection"
    Helmet sets Content-Security-Policy, X-Frame-Options, and other defensive headers in one line. Rate-limit auth endpoints to 10 requests per 15 minutes to prevent credential stuffing.
Group: "Logging and monitoring basics"
  - Subtopic: "Structured logging with pino or morgan"
    Structured logs (JSON output) are machine-parseable by log aggregators like Datadog or CloudWatch. Use pino for high-performance structured logging in production; morgan for quick HTTP request logging in development.
  - Subtopic: "Process error handlers: uncaughtException and unhandledRejection"
    Listen for process.on('uncaughtException') and process.on('unhandledRejection') to log and gracefully shutdown rather than silently crash. Never resume execution after uncaughtException.

### Layer 8 of 10: id fullstack-engineer-8
Title: Containers with Docker
Group: "Docker containers and the image layer model"
  - Subtopic: "Images, containers, and the union filesystem layer model"
    A Docker image is a stack of read-only filesystem layers. Running an image creates a container with a thin writable layer on top. Sharing base layers across images means a node:20 base is pulled only once.
  - Subtopic: "Multi-stage Dockerfiles for lean production Node images"
    Use a build stage to install devDependencies and compile TypeScript. Copy only dist/ and a fresh npm ci --omit=dev into the final stage. This can reduce image size from 1GB+ to under 200MB.
Group: "Docker Compose and multi-service networking"
  - Subtopic: "Docker Compose service discovery via container name DNS"
    Services in the same Compose network reach each other by service name: DB_HOST=postgres works because Compose creates a DNS entry for the postgres service. No IP addresses needed.
  - Subtopic: "Named volumes for persistent PostgreSQL data across container restarts"
    Without a volume, container data is lost when the container stops. A named volume mounts a host directory into the container, persisting the database even after docker compose down.
Group: "Writing a Dockerfile for a Node/Express app"
  - Subtopic: "Dockerfile instruction order: COPY package.json before source code"
    Copy package.json and package-lock.json first, run npm ci, then copy source. This caches the npm install layer — it only re-runs when dependencies change, not on every code change.
  - Subtopic: "Using .dockerignore to exclude node_modules and .env"
    A .dockerignore file prevents node_modules, .env, and .git from being copied into the build context. Without it, the build context transfer is slow and your secrets end up in the image layer history.
Group: "Docker Compose for local full-stack development"
  - Subtopic: "docker compose up, down, logs, and exec commands"
    docker compose up -d starts all services detached. docker compose logs -f api streams logs from the api service. docker compose exec postgres psql -U user db opens a database shell.
  - Subtopic: "Health checks and depends_on for service startup ordering"
    depends_on with condition: service_healthy makes the API wait until the Postgres container's health check passes before starting, preventing connection-refused errors on cold start.

### Layer 9 of 10: id fullstack-engineer-9
Title: Testing the Full Stack
Group: "Testing philosophy and the testing pyramid"
  - Subtopic: "Unit, integration, and E2E tests: cost versus confidence trade-offs"
    Unit tests are fast and cheap but test components in isolation. Integration tests hit the real database and give higher confidence. E2E tests drive a real browser and catch full-stack bugs but are slow and brittle.
  - Subtopic: "What to mock and what to test for real"
    Mock external services (email, third-party APIs) in tests. Use a real test database for integration tests — mocking the database hides bugs at the SQL or ORM level that only appear in production.
Group: "Playwright's browser automation model"
  - Subtopic: "Playwright's auto-wait: how it retries assertions until stable"
    Playwright auto-waits for elements to be visible, enabled, and stable before interacting. This eliminates most flaky test sleeps — use expect(locator).toBeVisible() instead of arbitrary wait times.
Group: "Writing tests for the full stack"
  - Subtopic: "Jest unit tests: describe, it, beforeEach, and matchers"
    Group related tests with describe, set up shared state in beforeEach, and assert with matchers like toEqual, toThrow, and toHaveBeenCalledWith. Run jest --watch during development for instant feedback.
  - Subtopic: "Supertest for Express endpoint integration tests"
    Supertest binds your Express app in-process and makes real HTTP requests. Test the full request pipeline including validation middleware, auth, and database writes against a test database.
Group: "React component testing and E2E with Playwright"
  - Subtopic: "React Testing Library: query by role, interact with userEvent"
    RTL's getByRole mirrors how users and screen readers find UI. Use @testing-library/user-event for realistic interactions (type, click, keyboard) rather than firing synthetic events directly.
  - Subtopic: "Playwright page object model for maintainable E2E tests"
    Encapsulate page interactions in a Page Object class (LoginPage, RecipePage). Tests become readable sequences of high-level actions; selector updates happen in one place when the UI changes.

### Layer 10 of 10: id fullstack-engineer-10
Title: Deployment and CI/CD
Group: "CI/CD pipeline concepts"
  - Subtopic: "Continuous integration: automated testing on every push"
    CI runs tests automatically on every branch push and pull request. A green CI badge means the branch hasn't broken any tests — it's the gate before merging. GitHub Actions is the most common CI runtime.
  - Subtopic: "Container registries: pushing and pulling images for deployment"
    Build the Docker image in CI, tag it with the git SHA, and push it to a registry (Docker Hub, ECR, GHCR). The deployment step pulls the exact versioned image, giving reproducible deployments.
Group: "Cloud hosting and managed services"
  - Subtopic: "Managed PostgreSQL versus self-hosted: operational trade-offs"
    Managed databases (RDS, Railway Postgres, Supabase) handle backups, patching, and replication. Self-hosting gives you control but requires operational expertise. For most full-stack projects, managed wins on cost and time.
  - Subtopic: "Zero-downtime deployments with rolling updates"
    A rolling deployment starts new instances before draining old ones. The load balancer routes traffic only to healthy new instances. Run database migrations before deploying to ensure both versions are compatible.
Group: "GitHub Actions workflow for a full-stack app"
  - Subtopic: "Workflow triggers, jobs, and steps syntax"
    on: push: branches: [main] triggers on push. Jobs run in parallel by default; use needs: [test] to sequence them. Steps use actions (actions/checkout) or run: shell commands.
  - Subtopic: "Service containers in Actions: running PostgreSQL for integration tests"
    Use services: postgres: image: postgres in a workflow job to spin up a real PostgreSQL container for integration tests. Pass connection details as environment variables to your test runner.
Group: "Deploying to a cloud host"
  - Subtopic: "Environment variables and secrets in Vercel and Railway"
    Add environment variables in the platform dashboard — they're injected at build time (VITE_* for client) or runtime (server secrets). Never commit .env files; use .env.example for documentation.
  - Subtopic: "Monitoring with structured logs and health check endpoints"
    Expose a GET /healthz endpoint that checks DB connectivity and returns 200 or 503. Platform load balancers hit this to determine if the instance should receive traffic. Log structured JSON so alerts can query specific fields.

Start now with Layer 1.
