You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: nestjs-dev (roadmap backend). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id nestjs-dev-1
Title: TypeScript & Node.js for Nest
Group: "TypeScript for Backend Code"
  - Subtopic: "Classes, Interfaces & Generics"
    Nest is class-based: controllers, services and modules are all classes, and interfaces and generics describe the data moving between them. Without a firm grip on these, Nest code turns into copy-pasted boilerplate you cannot reason about, and type errors get silenced with any instead of fixed.
  - Subtopic: "Decorators & Reflect Metadata"
    Every @Controller, @Get and @Injectable in Nest is a decorator that attaches metadata to a class, and Nest reads that metadata at startup to wire routes and dependencies. Knowing that decorators run once when the class is defined, not on every request, explains most of Nest's behaviour and many of its confusing errors.
Group: "Project Setup"
  - Subtopic: "tsconfig & Compilation"
    Nest relies on compiler options such as emitDecoratorMetadata and experimentalDecorators; without them dependency injection silently fails because constructor parameter types are erased at runtime. Understanding what tsc emits helps you debug 'cannot resolve dependency' errors instead of guessing.
  - Subtopic: "npm Scripts & Dependencies"
    A Nest project is an npm package: scripts start, build and test it, and the lockfile pins exact versions so every machine and CI run uses the same code. Mixing up dependencies and devDependencies or ignoring the lockfile leads to builds that pass locally and break in production.
Group: "Async Node.js"
  - Subtopic: "The Event Loop & Non-Blocking I/O"
    Node runs your code on a single thread and hands I/O to the system, so one CPU-heavy loop in a Nest service blocks every other request. Knowing how the event loop schedules callbacks tells you which work belongs in a handler and which belongs in a worker or queue.
  - Subtopic: "Promises & async/await"
    Nest handlers are usually async functions that return promises, and Nest waits for them before sending the response. Forgetting an await returns before the work is done, and running independent calls one after another instead of with Promise.all makes endpoints slower than they need to be.
Group: "Errors in Async Code"
  - Subtopic: "Error Classes & Propagation"
    Throwing typed error classes instead of strings lets callers tell a 'not found' from a database outage, which is exactly what Nest's exception filters rely on later. An error thrown inside a promise travels up through awaits until something catches it, or it becomes an unhandled rejection.
  - Subtopic: "Unhandled Rejections"
    Since Node 15 an unhandled promise rejection crashes the process by default. A forgotten catch on a background promise can take down a whole API, so every fire-and-forget promise needs explicit error handling.

### Layer 2 of 10: id nestjs-dev-2
Title: Nest Core: Modules, Controllers & Providers
Group: "Controllers"
  - Subtopic: "Routing & HTTP Method Decorators"
    @Controller sets a route prefix and @Get, @Post, @Patch and @Delete map methods to HTTP verbs. Route order and path parameters matter: a route like ':id' declared before 'search' will swallow requests meant for the search endpoint.
  - Subtopic: "Reading Params, Query & Body"
    @Param, @Query and @Body pull data out of the request, but they arrive as strings or untyped objects until a pipe validates and transforms them. Treating a TypeScript type on a parameter as a runtime check is a classic mistake: types disappear at runtime.
Group: "Providers"
  - Subtopic: "Services & @Injectable"
    Business logic belongs in providers marked @Injectable, not in controllers. Controllers should only translate HTTP into a service call and back; when they hold logic, that logic cannot be reused by a queue worker or tested without HTTP.
  - Subtopic: "Constructor Injection"
    Nest creates each provider once and passes it into constructors that ask for it by type. Creating dependencies yourself with new skips the container, so you lose shared instances, lifecycle hooks and the ability to swap in mocks for tests.
Group: "Modules"
  - Subtopic: "Feature Modules & Boundaries"
    A module groups the controllers and providers of one feature and decides what the rest of the app may use. Good module boundaries mirror the domain (users, orders, billing); one giant AppModule makes every part depend on every other part.
  - Subtopic: "Exports, Imports & Global Modules"
    A provider is private to its module until it is exported, and only modules that import it can inject it. Reaching for @Global to silence 'cannot resolve dependency' errors hides real coupling and makes the dependency graph impossible to follow.
Group: "Tooling"
  - Subtopic: "Nest CLI & Project Layout"
    The Nest CLI generates modules, controllers and services in a consistent layout and wires them into their module. Using it keeps the structure predictable across the team, which matters more as the app grows past a handful of features.
  - Subtopic: "Express vs Fastify Adapter"
    Nest runs on top of Express by default but can swap to Fastify for higher throughput. Code that reaches for the raw Express request object ties you to one adapter, so prefer Nest's own abstractions unless you have a reason not to.

### Layer 3 of 10: id nestjs-dev-3
Title: Dependency Injection in Depth
Group: "Custom Providers"
  - Subtopic: "useClass, useValue & useFactory"
    Custom providers let you choose what gets injected: a different class per environment, a fixed value for config, or a factory that builds a client asynchronously. Factories are how you create a database client after config has loaded, instead of at import time.
  - Subtopic: "Injection Tokens & Interfaces"
    TypeScript interfaces vanish at runtime, so Nest cannot inject by interface. A string or symbol token with @Inject lets you depend on an abstraction such as PAYMENT_GATEWAY and swap the implementation without touching the code that uses it.
Group: "Scopes"
  - Subtopic: "Singleton, Request & Transient Scope"
    Providers are singletons by default, which is fast and usually right. Request scope creates a new instance per request, and that scope bubbles up to everything that injects it, so one request-scoped provider can quietly turn a large part of your app into per-request objects and slow it down.
  - Subtopic: "Request Context Without Request Scope"
    Passing the current user or a trace id through every call is noisy, and request scope is expensive. AsyncLocalStorage keeps per-request context available to singletons without changing their scope.
Group: "Dynamic Modules"
  - Subtopic: "forRoot, forFeature & register"
    Dynamic modules take options when imported, which is how ConfigModule.forRoot() and TypeOrmModule.forFeature() work. Writing your own lets a module be configured once at the root and reused by feature modules without duplicating setup.
  - Subtopic: "Async Configuration with forRootAsync"
    Options often depend on other providers, such as reading a database URL from ConfigService. forRootAsync with useFactory and inject waits for those providers first, which avoids reading process.env directly inside modules.
Group: "Lifecycle & Pitfalls"
  - Subtopic: "Lifecycle Hooks"
    onModuleInit runs after a module's providers are created and onApplicationShutdown runs when the app stops. They are the right place to open and close connections; opening them in a constructor makes startup errors hard to handle and skips clean shutdown.
  - Subtopic: "Circular Dependencies"
    When two providers inject each other, Nest cannot decide which to create first. forwardRef works around it, but a circular dependency usually means a responsibility sits in the wrong place and a third provider or an event would break the cycle cleanly.

### Layer 4 of 10: id nestjs-dev-4
Title: The Request Pipeline
Group: "Before the Handler"
  - Subtopic: "Lifecycle Order"
    A request passes through middleware, then guards, then interceptors, then pipes, then the handler, and errors go to exception filters. Putting logic at the wrong stage causes real bugs, such as validating a body before checking whether the caller is even allowed to send it.
  - Subtopic: "Guards & the ExecutionContext"
    Guards answer one question: may this request reach the handler? They get an ExecutionContext that knows which controller and method will run, so they can read metadata such as required roles. Middleware cannot do that, which is why authorization belongs in guards.
Group: "Validation"
  - Subtopic: "ValidationPipe & DTOs"
    A global ValidationPipe checks every DTO with class-validator decorators and rejects bad input with a 400 before your code runs. Enabling whitelist and forbidNonWhitelisted strips or refuses unknown fields, which blocks mass-assignment bugs like a client setting isAdmin.
  - Subtopic: "Transformation Pipes"
    Pipes also convert input, for example ParseIntPipe turns a ':id' string into a number or fails with a 400. Turning on transform in ValidationPipe converts plain JSON into DTO class instances, so your handler gets real types instead of strings.
Group: "Around the Handler"
  - Subtopic: "Interceptors & RxJS"
    Interceptors wrap the handler and see both the request and the response stream, which makes them right for timing, response mapping, caching and timeouts. They use RxJS operators on the returned observable, so logic placed before next.handle() runs before the handler and logic in the pipe runs after.
  - Subtopic: "Custom Decorators"
    Custom parameter decorators like @CurrentUser() pull data out of the request in one place instead of repeating req.user in every handler. Combined with SetMetadata they also let you mark routes, for example @Public() or @Roles('admin'), for guards to read.
Group: "Errors"
  - Subtopic: "Built-in HTTP Exceptions"
    Throwing NotFoundException or ConflictException from a service gives the client the right status code without the service knowing about HTTP details. Throwing a plain Error turns into a 500, which hides client mistakes as server failures and pollutes your error alerts.
  - Subtopic: "Global Exception Filters"
    A global filter catches every error and turns it into one consistent response shape, and is the right place to log unexpected errors with context. It should map known errors, such as a unique-constraint violation from the database, to a 409 instead of leaking driver messages to clients.

### Layer 5 of 10: id nestjs-dev-5
Title: Data with Prisma & TypeORM
Group: "ORMs in Nest"
  - Subtopic: "Prisma as a Nest Provider"
    Wrapping PrismaClient in an injectable PrismaService gives every module one shared connection pool and a clean place to connect and disconnect. Creating a new client per request exhausts database connections within minutes under real traffic.
  - Subtopic: "TypeORM Entities & Repositories"
    TypeORM maps classes to tables and injects a repository per entity with @InjectRepository. The synchronize option rewrites your schema from entities automatically, which is handy locally and dangerous in production because it can drop columns with data in them.
Group: "Schema Changes"
  - Subtopic: "Migrations"
    Migrations are versioned, reviewed scripts that move the schema forward the same way on every environment. They run as a deploy step, not at app start, so several instances starting at once do not race to change the schema.
  - Subtopic: "Zero-Downtime Schema Changes"
    Renaming or dropping a column while old code is still running breaks requests mid-deploy. The safe pattern is expand then contract: add the new column, deploy code that writes both, backfill, then remove the old one in a later release.
Group: "Correct Queries"
  - Subtopic: "Relations & the N+1 Problem"
    Loading a list and then each item's relation in a loop sends one query per row, so a page of 50 orders becomes 51 queries. Using include, relations or a join loads it in one or two queries, and query logging in development makes the problem visible early.
  - Subtopic: "Transactions"
    When two writes must succeed or fail together, such as reducing stock and creating the order, they belong in one transaction. Without it a crash between the two leaves the data inconsistent, and concurrent requests can oversell unless rows are locked or checked atomically.
Group: "Fast Queries"
  - Subtopic: "Offset vs Cursor Pagination"
    OFFSET pagination makes the database read and throw away every skipped row, so deep pages get slower and rows shift when new ones are inserted. Cursor pagination continues from the last seen id and stays fast and stable at any depth.
  - Subtopic: "Indexes for Your Queries"
    An index should match how you filter and sort, not just which columns exist. EXPLAIN ANALYZE shows whether PostgreSQL uses the index or scans the whole table, and is the first thing to check when an endpoint slows down as data grows.

### Layer 6 of 10: id nestjs-dev-6
Title: Authentication & Authorization
Group: "Authentication"
  - Subtopic: "Password Hashing"
    Passwords are stored as slow, salted hashes with bcrypt or argon2, never encrypted or hashed with a fast algorithm like SHA-256. A slow hash makes a leaked database expensive to crack, and the salt stops attackers from cracking every user at once.
  - Subtopic: "JWT Access & Refresh Tokens"
    A short-lived access token keeps a stolen token's damage window small, and a refresh token gets a new one without logging in again. Rotating refresh tokens and storing them so they can be revoked is what makes logout and 'sign out everywhere' actually work with JWTs.
Group: "Passport in Nest"
  - Subtopic: "Strategies & AuthGuard"
    @nestjs/passport wraps Passport strategies such as local and jwt in guards. The strategy's validate method decides what lands on request.user, so keep it small and return only what handlers need, not the full user record with the password hash.
  - Subtopic: "Global Guards & Public Routes"
    Registering the auth guard globally makes every route protected by default, and a @Public() decorator opts specific routes out. Secure by default means a forgotten decorator exposes nothing, which is far safer than having to remember to protect each new route.
Group: "Authorization"
  - Subtopic: "Roles & Permissions"
    A roles guard reads @Roles() metadata and compares it with the user's roles, which covers 'admins only' rules. It does not cover ownership, such as 'only the author can edit this post', which needs a check against the actual record.
  - Subtopic: "Broken Object-Level Authorization"
    The most common API vulnerability is fetching a record by id without checking that it belongs to the caller. Scoping every query by the current user, for example where id and ownerId match, closes it at the data layer instead of relying on every handler to remember.
Group: "Hardening"
  - Subtopic: "Rate Limiting with Throttler"
    @nestjs/throttler limits how often a client can call a route, which slows down brute-force login attempts and abuse. Behind a proxy or with several instances, limits must use the real client IP and a shared store such as Redis, or each instance counts separately.
  - Subtopic: "Helmet & CORS"
    Helmet sets security headers browsers rely on, and CORS controls which origins may call your API from a browser. A wildcard origin with credentials is refused by browsers for good reason; list the exact frontends that need access.

### Layer 7 of 10: id nestjs-dev-7
Title: Configuration, Docs & API Design
Group: "Configuration"
  - Subtopic: "ConfigModule & Typed Config"
    ConfigModule loads environment variables once and serves them through an injectable ConfigService. Grouping settings with registerAs gives typed, namespaced config, so code asks for database.url instead of reading process.env strings scattered across files.
  - Subtopic: "Validating Env at Startup"
    A schema check on environment variables at boot makes the app refuse to start with a missing or malformed setting. Failing fast on deploy is far better than an endpoint crashing hours later when it first reads the bad value.
Group: "API Documentation"
  - Subtopic: "Generating OpenAPI with @nestjs/swagger"
    Nest can generate an OpenAPI spec from your controllers and DTOs, and the CLI plugin infers most of it from types. Docs generated from code stay in sync with the API, which hand-written docs never do for long.
  - Subtopic: "API Versioning"
    Versioning lets you change a response shape without breaking existing clients, through URI (/v1), header or media type. Nest supports all three; pick one, document it, and keep old versions running until their clients have moved.
Group: "Response Shaping"
  - Subtopic: "Serialization with class-transformer"
    Returning database entities directly leaks fields such as password hashes and internal flags. The ClassSerializerInterceptor with @Exclude and @Expose, or explicit response DTOs, controls exactly what leaves the API.
  - Subtopic: "Consistent Response & Error Shapes"
    Clients are simpler when every list returns the same pagination envelope and every error has the same fields. Decide the shapes once and enforce them with interceptors and the global exception filter instead of per handler.
Group: "Architecture"
  - Subtopic: "Layers: Controller, Service, Repository"
    Controllers handle HTTP, services hold business rules and repositories talk to the database. Keeping those layers apart means you can change the ORM or add a queue consumer without rewriting business logic, and test rules without a database.
  - Subtopic: "In-App Events"
    @nestjs/event-emitter lets one module announce 'order created' while others react, such as sending an email, without the orders module importing them. Listeners run in the same process, so anything that must not be lost on a crash still belongs in a durable queue.

### Layer 8 of 10: id nestjs-dev-8
Title: Testing NestJS Apps
Group: "Unit Tests"
  - Subtopic: "Test.createTestingModule"
    The testing module builds a small Nest container with only the providers a test needs. overrideProvider swaps real dependencies for fakes, so a service can be tested without a database or network while still going through real dependency injection.
  - Subtopic: "Mocks, Stubs & Fakes"
    Mock what is slow or outside your control, like payment APIs and email, and avoid mocking the code under test. Tests that only check that a mock was called with certain arguments break on every refactor while catching few real bugs.
Group: "Test Strategy"
  - Subtopic: "The Testing Pyramid in Practice"
    Many fast unit tests for business rules, fewer integration tests for database and module wiring, and a handful of E2E tests for critical flows. Inverting it gives a slow, flaky suite that people stop running.
  - Subtopic: "Coverage That Means Something"
    Line coverage shows which code ran, not whether it was checked. Aim tests at failure paths, such as invalid input, missing records and permission denials, because that is where production bugs live.
Group: "End-to-End Tests"
  - Subtopic: "E2E with Supertest"
    E2E tests boot the full Nest app and send real HTTP requests with Supertest, so guards, pipes and filters all run. Apply the same global pipes and filters as main.ts in the test app, or the tests check a different app than the one you deploy.
  - Subtopic: "Testing Auth-Protected Routes"
    Protected routes need tests for three cases: no token, a valid token without permission, and a valid token with permission. Testing only the happy path misses exactly the authorization bugs attackers look for.
Group: "Real Dependencies"
  - Subtopic: "Testcontainers for PostgreSQL"
    Testcontainers starts a real PostgreSQL in Docker for the test run, so migrations, constraints and queries are tested against the same database you run in production. SQLite or in-memory fakes behave differently and let real bugs through.
  - Subtopic: "Isolated, Repeatable Test Data"
    Each test should create its own data and not depend on what another test left behind. Truncating tables or wrapping tests in rolled-back transactions keeps the suite reliable when tests run in a different order or in parallel.

### Layer 9 of 10: id nestjs-dev-9
Title: Microservices, Queues & Real-Time
Group: "Background Work"
  - Subtopic: "Queues with BullMQ"
    Slow or unreliable work such as emails, PDFs and webhooks goes into a Redis-backed queue so the request returns immediately. Workers process jobs with retries and backoff, and a failed job is kept for inspection instead of being lost with the request.
  - Subtopic: "Scheduled Tasks"
    @nestjs/schedule runs cron jobs inside the app, which is fine for one instance. With several instances every one runs the job, so scheduled work that must run once should use a queue's repeatable jobs or a lock.
Group: "Reliability"
  - Subtopic: "Idempotent Handlers"
    Queues and message brokers deliver at least once, so the same job can run twice after a retry or crash. Handlers must be safe to repeat, for example by recording processed ids or using unique constraints, or customers get charged or emailed twice.
  - Subtopic: "Outbox Pattern"
    Saving an order and then publishing an event can fail between the two steps, losing the event. Writing the event to an outbox table in the same transaction and publishing it afterwards guarantees the event goes out if and only if the data was saved.
Group: "Nest Microservices"
  - Subtopic: "Transporters: Redis, NATS, Kafka, gRPC"
    Nest microservices swap HTTP for a transporter such as Redis, NATS, Kafka or gRPC while keeping the same controller style. The transporter decides delivery guarantees and ordering, so choose it for what the messages need, not for familiarity.
  - Subtopic: "Request-Response vs Events"
    @MessagePattern expects a reply and couples the caller to the other service being up, while @EventPattern fires and forgets. Prefer events between services where you can, so one service being down does not take the others with it.
Group: "Real-Time"
  - Subtopic: "WebSocket Gateways"
    Gateways handle WebSocket connections with the same decorators, guards and pipes as controllers. Authenticate the connection during the handshake, because a socket that stays open for hours must not trust a token that has since expired or been revoked.
  - Subtopic: "Scaling WebSockets"
    With several instances a client is connected to only one of them, so a message emitted on another instance never reaches it. A Redis adapter shares broadcasts between instances, and the load balancer needs sticky sessions for Socket.IO's polling fallback.

### Layer 10 of 10: id nestjs-dev-10
Title: Performance, Observability & Deployment
Group: "Performance"
  - Subtopic: "Caching & Invalidation"
    The cache manager and Redis can serve repeated reads without hitting the database. The hard part is invalidation: decide which writes clear which keys, or users see stale data after updating it.
  - Subtopic: "Profiling Slow Endpoints"
    Measure before optimizing: most slow Nest endpoints are slow because of database queries or sequential awaits, not the framework. Timing interceptors and query logs find the real cause; switching to Fastify only helps once those are fixed.
Group: "Observability"
  - Subtopic: "Structured Logging"
    JSON logs with a request id, user id and duration can be searched and graphed; free-text logs cannot. Replacing Nest's default logger with pino and attaching a request id to every line makes one failing request traceable across all its log lines.
  - Subtopic: "Tracing with OpenTelemetry"
    Traces show where time goes inside one request: the handler, each database query and each outgoing call. OpenTelemetry instrumentation must load before Nest starts, or the libraries it patches are already imported and nothing gets traced.
Group: "Health & Shutdown"
  - Subtopic: "Health Checks with Terminus"
    @nestjs/terminus exposes liveness and readiness endpoints that check the database, Redis and memory. Liveness should only fail when restarting would help; tying it to the database makes an outage restart every instance in a loop.
  - Subtopic: "Graceful Shutdown"
    enableShutdownHooks makes Nest call onApplicationShutdown on SIGTERM, so the app stops accepting traffic, finishes in-flight requests and closes connections and queue workers. Without it every deploy cuts some requests off mid-response.
Group: "Shipping"
  - Subtopic: "Multi-Stage Docker Builds"
    A multi-stage Dockerfile compiles TypeScript in one stage and copies only the built code and production dependencies into a small final image. Running as a non-root user and pinning the Node version keeps the image smaller, safer and reproducible.
  - Subtopic: "CI/CD & Safe Deploys"
    A pipeline lints, tests and builds the image on every push, then runs migrations and deploys. Rolling deploys with readiness checks replace instances one by one, so a bad release is caught before it takes all traffic.

Start now with Layer 1.
