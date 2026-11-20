You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: pern (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id pern-1
Title: Web Fundamentals
Group: "How browsers render HTML, CSS, and JavaScript"
  - Subtopic: "The critical rendering path and render-blocking resources"
    Browsers parse HTML into DOM and CSS into CSSOM, combine them, then layout and paint. Understanding this tells you why script placement and stylesheet ordering affect page speed.
  - Subtopic: "Semantic HTML elements and the accessibility tree"
    Semantic elements like <nav>, <main>, and <article> map to accessibility roles that screen readers and search engines use. Using <div> for everything makes your app inaccessible.
Group: "CSS layout: the box model, flexbox, and grid"
  - Subtopic: "box-sizing: border-box and why it simplifies layout math"
    By default, width excludes padding and border. border-box includes them, making width predictable. Setting * { box-sizing: border-box } is standard practice in every PERN project.
  - Subtopic: "CSS Grid for two-dimensional page layouts"
    Grid lets you define rows and columns simultaneously with grid-template-areas. It's the right tool for page-level layout; use flexbox inside cells for one-dimensional component layout.
Group: "JavaScript DOM manipulation and events"
  - Subtopic: "querySelector, textContent, and classList for DOM updates"
    These three APIs cover 80% of vanilla DOM manipulation. classList.toggle(), classList.add/remove() let you drive visual state changes from JavaScript without touching inline styles.
  - Subtopic: "Responsive design with media queries and relative units"
    Use rem for font sizes (scales with user preferences), % and vw/vh for layout, and min-width media queries for breakpoints. These make sites readable at any screen size.
Group: "Browser DevTools for debugging HTML, CSS, and network"
  - Subtopic: "Inspecting and live-editing styles in the Styles panel"
    The DevTools Styles panel lets you toggle CSS rules, add new declarations, and see which rule wins the cascade. Computed panel shows the final resolved value for any property.
  - Subtopic: "Network tab: reading request/response headers and timing"
    The Network tab records every HTTP request. Check status codes, headers, and the waterfall timing to diagnose slow pages or unexpected API calls.

### Layer 2 of 10: id pern-2
Title: Modern JavaScript & TypeScript
Group: "TypeScript's type system under the hood"
  - Subtopic: "Structural typing: why TypeScript matches shapes, not names"
    TypeScript uses structural typing — if object A has all the properties of type T, A is assignable to T regardless of its declared type. This differs from nominal typing in Java/C#.
  - Subtopic: "Type narrowing with typeof, instanceof, and discriminated unions"
    TypeScript narrows types inside conditional branches. A discriminated union uses a shared literal field (type: 'success' | 'error') to let TypeScript know which shape you have in each branch.
Group: "The JavaScript event loop and async semantics"
  - Subtopic: "Promises, async/await, and the microtask queue"
    async/await is syntactic sugar over Promises. Each await suspends execution and resumes in a microtask when the promise settles. Uncaught Promise rejections become unhandledRejection events.
Group: "TypeScript syntax patterns in PERN projects"
  - Subtopic: "Interfaces versus type aliases: when to use each"
    Interfaces are open (can be extended via declaration merging) and work well for object shapes. Type aliases are more flexible (can represent unions, primitives, tuples). In PERN, use interfaces for API shapes and types for unions.
  - Subtopic: "Generics for reusable API response and pagination types"
    Generic types like ApiResponse<T> or PaginatedResult<T> let you type API wrappers once and reuse them for every endpoint. This eliminates 'any' while keeping code DRY.
Group: "tsconfig and TypeScript tooling"
  - Subtopic: "Key tsconfig options: strict, target, module, and paths"
    strict enables all strictness flags including strictNullChecks. target sets the JS output version; module controls the module system. Paths lets you use @/components instead of relative imports.
  - Subtopic: "Utility types: Partial, Required, Pick, Omit, and Record"
    TypeScript's built-in utility types transform existing types. Partial<T> makes all fields optional (useful for update DTOs); Omit<T, 'password'> creates a safe user type without sensitive fields.

### Layer 3 of 10: id pern-3
Title: React Fundamentals
Group: "React's rendering model and reconciliation"
  - Subtopic: "How React diffs the virtual DOM to minimize real DOM changes"
    React builds a virtual DOM tree, compares it to the previous render, and applies only the minimal mutations to the real DOM. This diffing is the reason React is fast even with frequent state updates.
  - Subtopic: "Unidirectional data flow and why it simplifies debugging"
    Data flows down through props; child components communicate up via callback functions passed as props. This single direction makes state changes traceable and bugs easy to locate.
Group: "useState and useEffect internals"
  - Subtopic: "Why state updates are asynchronous and stale closures occur"
    useState's setter is asynchronous — the new value isn't available until the next render. Using the state value in an effect or event handler may capture a stale closure; use the functional updater form to avoid this.
  - Subtopic: "useEffect dependencies and the cleanup pattern"
    The dependency array controls when effects re-run. Every reactive value used inside the effect must be listed. Return a cleanup function to cancel subscriptions, timers, or fetches on unmount.
Group: "JSX, props, and component composition"
  - Subtopic: "JSX compiles to React.createElement — implications for JSX rules"
    JSX transforms to function calls. A component must return a single root element (or Fragment) because a function can only return one value. Fragments avoid adding unnecessary DOM nodes.
  - Subtopic: "Lifting state up to the nearest common ancestor"
    When two components need the same state, lift it to their lowest common parent and pass it down via props. This is the React way of sharing state before reaching for a state manager.
Group: "Fetching data from APIs in React"
  - Subtopic: "Data fetching in useEffect: loading, data, and error states"
    Fetch data inside useEffect, track loading/error/data in state, and handle cleanup by aborting the fetch on unmount using AbortController. This pattern is what React Query automates.
  - Subtopic: "Rendering lists with key props derived from stable IDs"
    Keys must be stable, unique, and not index-based when items can reorder. React uses keys to decide which list items changed, added, or removed during reconciliation.

### Layer 4 of 10: id pern-4
Title: React Advanced & State
Group: "How React Router v6 renders nested route trees"
  - Subtopic: "Nested routes and the Outlet component for shared layouts"
    React Router v6 uses an <Outlet> placeholder inside a parent route's component to render the matched child route. This replaces the old switch-based approach and makes layout composition purely declarative.
  - Subtopic: "TanStack Query cache model: staleTime, cacheTime, and invalidation"
    staleTime controls how long a query result is considered fresh before a background refetch. Calling queryClient.invalidateQueries() marks matching queries stale and triggers an immediate background fetch.
Group: "Zustand's subscription model versus React Context"
  - Subtopic: "How Zustand avoids Context's re-render problem with selectors"
    Zustand components only re-render when the specific slice they select changes. Unlike Context where any value change re-renders every consumer, Zustand's selector pattern is surgical.
  - Subtopic: "useMemo and useCallback: when memoization helps versus hurts"
    Memoization prevents recalculations and unnecessary child re-renders but adds comparison overhead. Only apply it when a React Profiler shows a measurable regression — premature memoization obscures code.
Group: "React Router navigation APIs and protected routes"
  - Subtopic: "useNavigate, useParams, and useSearchParams"
    useNavigate replaces the history object for programmatic navigation. useParams reads dynamic URL segments; useSearchParams reads and sets query strings. Both are typed with TypeScript generics in PERN.
  - Subtopic: "Building protected routes with an auth-checking wrapper"
    Wrap protected routes in a component that reads auth state and redirects unauthenticated users with <Navigate to='/login'>. Combine with Zustand or Context for a clean, reusable pattern.
Group: "Custom hooks and code splitting"
  - Subtopic: "Extracting shared logic into custom hooks"
    A custom hook is a function whose name starts with 'use' and that calls other hooks. Hooks like useFetch, useForm, or usePagination let you share stateful logic across pages without prop drilling.
  - Subtopic: "React.lazy and Suspense for route-level code splitting"
    Wrapping a dynamic import in React.lazy() defers loading that chunk until the route is visited. Suspense shows a fallback while the chunk loads, keeping initial bundle size small.

### Layer 5 of 10: id pern-5
Title: Node.js & Express APIs
Group: "The Node.js event loop and non-blocking I/O model"
  - Subtopic: "How libuv delegates I/O so Node can handle concurrent connections"
    Node offloads file system and network I/O to libuv's thread pool. The event loop picks up callbacks when they complete, letting a single thread serve thousands of concurrent HTTP connections.
  - Subtopic: "Express middleware chain: how next() passes control"
    Every Express handler receives (req, res, next). Calling next() passes control to the next middleware in the stack; calling next(err) jumps to error-handling middleware. Middleware order is execution order.
Group: "RESTful API design principles"
  - Subtopic: "Resource-based URLs and correct HTTP verb semantics"
    REST URLs name resources (/posts/42), not actions (/getPost). GET reads, POST creates, PATCH partially updates, PUT replaces, DELETE removes. Correct verbs let clients predict behaviour and enable caching.
  - Subtopic: "HTTP status codes: 2xx success, 4xx client error, 5xx server error"
    201 Created on POST success, 204 No Content on DELETE, 400 Bad Request for invalid input, 401 Unauthorized vs 403 Forbidden, 422 Unprocessable Entity for validation failures. Correct codes make APIs self-documenting.
Group: "Structuring an Express application for a PERN project"
  - Subtopic: "Router modules and controller separation by resource"
    express.Router() creates a mini-app. Mount separate routers for /users, /posts, /auth under their respective prefixes. Keep route files thin — delegate logic to controller functions.
  - Subtopic: "Environment configuration with dotenv and config validation"
    Load env vars with dotenv.config() before anything else. Validate required variables at startup with a schema (envalid or Zod) so the app fails fast with a clear error instead of crashing at runtime.
Group: "Input validation and centralized error handling"
  - Subtopic: "Request body validation with express-validator"
    Chain validators on route definitions: body('email').isEmail(), body('age').isInt({min:0}). Call validationResult(req) at the top of the handler and return 422 if there are errors.
  - Subtopic: "Four-argument error middleware registered last in app.use()"
    Error middleware has signature (err, req, res, next). Register it after all routes. Call next(err) from anywhere in the chain to skip to it and return a consistent JSON error shape.

### Layer 6 of 10: id pern-6
Title: Relational Databases & SQL
Group: "How relational databases model data"
  - Subtopic: "Normalization: eliminating redundancy across 1NF, 2NF, 3NF"
    Normalization splits data into tables to eliminate redundancy. 1NF: atomic values; 2NF: no partial dependencies; 3NF: no transitive dependencies. Over-normalizing hurts read performance; under-normalizing hurts consistency.
  - Subtopic: "Primary keys, foreign keys, and referential integrity"
    Primary keys uniquely identify rows. Foreign keys enforce referential integrity — a foreign key value must exist in the referenced table or be NULL. Violating this raises a constraint error, not a silent bug.
Group: "SQL query execution model"
  - Subtopic: "How the query planner executes JOIN operations"
    INNER JOIN returns only rows that match in both tables; LEFT JOIN returns all left rows with NULLs for unmatched right rows. The planner chooses hash join, merge join, or nested loop based on table sizes and indexes.
  - Subtopic: "GROUP BY with aggregate functions: COUNT, SUM, AVG"
    GROUP BY collapses rows with the same value into one group. Aggregate functions then compute a value per group. HAVING filters groups after aggregation, unlike WHERE which filters before.
Group: "Writing SQL queries from scratch"
  - Subtopic: "SELECT, WHERE, ORDER BY, LIMIT: the core query structure"
    Every SQL query starts with SELECT columns FROM table. Add WHERE to filter rows, ORDER BY to sort, and LIMIT/OFFSET for pagination. Logical order differs from execution order — WHERE runs before SELECT.
  - Subtopic: "INSERT, UPDATE, DELETE with WHERE clauses"
    Always include a WHERE clause in UPDATE and DELETE. An UPDATE without WHERE updates every row; a DELETE without WHERE empties the table. Wrap destructive operations in a transaction.
Group: "Designing the blog schema for the PERN challenge"
  - Subtopic: "Junction tables for many-to-many: posts_tags example"
    A post can have many tags; a tag can belong to many posts. Model this with a posts_tags junction table with foreign keys to both sides. Never store comma-separated IDs in a column.
  - Subtopic: "psql CLI basics: connecting, listing tables, and running queries"
    \l lists databases, \c dbname connects, \dt lists tables, \d tablename shows schema. Use psql for quick inspection and ad-hoc queries without a GUI client.

### Layer 7 of 10: id pern-7
Title: PostgreSQL in Depth
Group: "PostgreSQL internals: indexes and the query planner"
  - Subtopic: "How B-tree indexes speed up equality and range queries"
    A B-tree index stores column values in a balanced tree, enabling O(log n) lookups instead of full table scans. Partial indexes (WHERE active = true) are smaller and faster for filtered queries.
  - Subtopic: "EXPLAIN ANALYZE: reading cost estimates and actual timings"
    EXPLAIN shows the query plan with estimated costs; EXPLAIN ANALYZE executes the query and shows actual row counts and timings. Seq Scan on a large table is the signal to add an index.
Group: "ACID transactions and isolation levels"
  - Subtopic: "ACID properties: why atomicity and isolation matter for data integrity"
    Atomicity guarantees all or nothing; if one statement in a transaction fails, all changes roll back. Isolation levels control how concurrent transactions see each other's uncommitted changes.
  - Subtopic: "JSONB columns for flexible semi-structured data"
    JSONB stores JSON as binary, allowing GIN-indexed queries on nested fields. Use it for metadata or user-defined attributes rather than adding columns to a rigid schema.
Group: "PostgreSQL administration with psql"
  - Subtopic: "Creating roles, databases, and granting privileges"
    CREATE ROLE appuser WITH LOGIN PASSWORD '...'; GRANT CONNECT ON DATABASE mydb TO appuser; GRANT USAGE ON SCHEMA public TO appuser. Least-privilege roles prevent an app bug from dropping tables.
  - Subtopic: "Views and CTEs for reusable query logic"
    A VIEW stores a named query you can SELECT from like a table. A CTE (WITH clause) is a named subquery scoped to one statement. Both avoid duplicating complex joins across application code.
Group: "Window functions and query tuning"
  - Subtopic: "Window functions: ROW_NUMBER, RANK, and LAG over partitions"
    Window functions compute values across a set of rows related to the current row without collapsing them into a group. ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) assigns a rank per user.
  - Subtopic: "Index selection: composite versus partial indexes"
    Composite indexes (col_a, col_b) satisfy queries that filter on col_a alone or both columns, but not col_b alone. Partial indexes only index rows matching a condition, making them smaller and faster.

### Layer 8 of 10: id pern-8
Title: Data Access Layer
Group: "How Prisma generates type-safe queries from your schema"
  - Subtopic: "Prisma schema as the single source of truth for types and migrations"
    Prisma reads the schema.prisma file to generate both the TypeScript client and migration SQL. Changing a field in the schema generates a migration diff — you never write ALTER TABLE manually.
  - Subtopic: "Connection pooling with node-postgres and why it matters"
    Creating a new PostgreSQL connection per request takes ~50ms and limits concurrency. A pool reuses connections. The pg Pool class manages min/max pool size and queues queries when all connections are in use.
Group: "SQL injection and parameterized queries"
  - Subtopic: "Why string interpolation in SQL is a critical security vulnerability"
    Concatenating user input into a SQL string allows attackers to inject arbitrary SQL. Parameterized queries ($1, $2 in pg; Prisma's typed methods) send values separately from the query structure, preventing injection.
Group: "Using Prisma in a Node/Express project"
  - Subtopic: "Prisma CRUD: findMany, create, update, delete with filters"
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }) is fully typed. Prisma autocompletes field names and operators based on your schema.
  - Subtopic: "Nested writes: creating related records in one operation"
    Prisma nested writes let you create a post and its tags in a single call with prisma.post.create({ data: { tags: { create: [...] } } }). This runs as a transaction automatically.
Group: "Migrations and seeding in a PERN project"
  - Subtopic: "prisma migrate dev versus prisma migrate deploy"
    migrate dev generates and applies a migration locally; it also regenerates the Prisma client. migrate deploy applies pending migrations in production without generating new ones — use it in CI/CD pipelines.
  - Subtopic: "Seeding the database with prisma/seed.ts"
    Add a seed script at prisma/seed.ts and register it in package.json prisma.seed field. Run prisma db seed to populate development data. Use upsert in seed scripts to keep them idempotent.

### Layer 9 of 10: id pern-9
Title: Auth, Security & Validation
Group: "Password hashing and JWT security internals"
  - Subtopic: "bcrypt's adaptive work factor and per-password salting"
    bcrypt applies a salt to the password before hashing, meaning identical passwords produce different hashes. The work factor (cost) makes each hash computation intentionally slow, raising the cost of brute-force attacks.
  - Subtopic: "JWT structure: header.payload.signature and what to put in each"
    The signature is HMAC-SHA256(base64(header) + '.' + base64(payload), secret). The payload is not encrypted — anyone can decode it. Never store passwords, PII, or secrets in JWT payloads.
Group: "Web security: XSS, CSRF, and secure cookies"
  - Subtopic: "HTTP-only cookies prevent XSS from stealing auth tokens"
    JavaScript cannot read HTTP-only cookies, so an XSS payload that injects a script cannot exfiltrate the auth token. Combine with Secure (HTTPS only) and SameSite=Strict for defense in depth.
  - Subtopic: "Zod schema validation: parsing untrusted input at the boundary"
    Zod schemas define the expected shape and constraints. z.parse() throws on invalid input; z.safeParse() returns a result object. Define schemas once and share them between server validation and client forms.
Group: "Implementing JWT auth in a PERN Express API"
  - Subtopic: "Signing JWTs with jsonwebtoken and setting expiry"
    jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '15m' }) creates a short-lived access token. Store the refresh token in an HTTP-only cookie and issue a new access token via a /refresh endpoint.
  - Subtopic: "Auth middleware: verify Bearer token and attach user to req"
    Read the Authorization header, strip 'Bearer ', call jwt.verify(), and attach the decoded payload to req.user. Apply this middleware to any router that requires authentication.
Group: "Security hardening with Zod, Helmet, and rate limiting"
  - Subtopic: "helmet middleware for secure HTTP response headers"
    helmet sets Content-Security-Policy, X-Frame-Options, and other headers that defend against clickjacking, MIME sniffing, and XSS. Add it as the first middleware in your Express app.
  - Subtopic: "express-rate-limit to prevent brute-force on auth endpoints"
    Apply rate limiting specifically to /login and /register — not the whole API. Limit to 10 requests per 15 minutes per IP. Return 429 Too Many Requests with a Retry-After header.

### Layer 10 of 10: id pern-10
Title: Testing, CI/CD & Deployment
Group: "Testing strategy for a full-stack PERN application"
  - Subtopic: "Testing pyramid: unit tests fast, integration tests real, E2E minimal"
    Unit tests cover pure functions and isolated logic; integration tests hit the real database; E2E tests drive a real browser. Integration tests give the highest confidence per effort in a PERN app.
  - Subtopic: "Docker Compose for reproducible test environments"
    A docker-compose.yml with Node and PostgreSQL services makes the environment reproducible on any machine. Spin it up with docker compose up -d before running integration tests in CI.
Group: "Container and CI/CD concepts"
  - Subtopic: "Multi-stage Dockerfiles for lean Node production images"
    Use a build stage to install devDependencies and compile; copy only the dist folder and node_modules from a prod install into the final stage. This shrinks the image from GB to MB.
  - Subtopic: "GitHub Actions workflow: test, build, and deploy on merge"
    A workflow triggers on push to main, runs vitest, builds the Docker image, pushes to a registry, and deploys. Secrets are stored in repository settings and injected as environment variables.
Group: "Writing tests for the PERN stack"
  - Subtopic: "Vitest unit tests for utility functions and Zod schemas"
    Test pure helper functions (formatDate, paginateQuery) and Zod schema validation edge cases. These are fast, have no dependencies, and run in milliseconds.
  - Subtopic: "Supertest integration tests for Express endpoints"
    Supertest binds your Express app to a random port and makes real HTTP requests in-process. Test the full request/response cycle including validation, auth middleware, and database writes.
Group: "Deployment: React to Vercel, API to Railway, Postgres to managed host"
  - Subtopic: "Vercel project settings, build output, and environment variables"
    Set the root directory to your frontend folder, output directory to dist (Vite) or build (CRA). Add environment variables in the Vercel dashboard — they're injected at build time for VITE_* prefixed vars.
  - Subtopic: "Running Prisma migrations in production deployments"
    Add a release command (Procfile or Railway start command) of prisma migrate deploy && node dist/index.js. This applies pending migrations before the new server version starts.

Start now with Layer 1.
