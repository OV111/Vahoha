You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: aspnet-dev (roadmap backend). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id aspnet-dev-1
Title: C# & .NET for Web Development
Group: "Modern C#"
  - Subtopic: "Classes, Records & Structs"
    Classes are reference types with identity, records give value equality and immutability for data such as DTOs, and structs are small value types copied on assignment. Choosing the wrong one causes subtle bugs, such as two equal DTOs comparing as different or a mutated struct copy that never updates the original.
  - Subtopic: "Nullable Reference Types"
    With nullable reference types on, the compiler warns wherever a value might be null and you use it anyway. Treating those warnings as errors removes most NullReferenceExceptions before the code runs, which is why new ASP.NET Core projects enable them by default.
Group: "Async C#"
  - Subtopic: "async/await & Task"
    Web servers handle many requests with few threads by freeing the thread while waiting on I/O. Blocking with .Result or .Wait() holds the thread anyway and under load causes thread-pool starvation, where the whole app slows down while the CPU sits idle.
  - Subtopic: "Cancellation Tokens"
    A CancellationToken lets work stop when the client disconnects or a timeout hits. Passing it from the endpoint down to database and HTTP calls stops the server from finishing expensive work nobody is waiting for.
Group: "Working with Data in C#"
  - Subtopic: "LINQ Fundamentals"
    LINQ filters, projects and groups collections with Where, Select and GroupBy. It is lazy: a query runs when it is enumerated, so enumerating it twice runs it twice, which matters a lot once the same syntax is translated into SQL by EF Core.
  - Subtopic: "Exceptions & Error Handling"
    Exceptions are for unexpected failures, not normal control flow such as 'user not found'. Catching Exception everywhere hides bugs; catch only what you can handle, and let the rest reach one central handler that logs it.
Group: "Toolchain"
  - Subtopic: "dotnet CLI, SDK & Project Files"
    The dotnet CLI creates, builds, tests and publishes projects, and the .csproj file declares the target framework and dependencies. Pinning the SDK with global.json keeps every machine and CI run on the same compiler.
  - Subtopic: "NuGet Packages"
    NuGet is .NET's package manager. Every package you add is code you ship and must keep updated, so check maintenance and licences, and use dotnet list package --vulnerable to find known security issues.

### Layer 2 of 10: id aspnet-dev-2
Title: ASP.NET Core Fundamentals
Group: "Request Pipeline"
  - Subtopic: "Middleware Order"
    Each middleware can act before and after the next one, and they run in the order they are added in Program.cs. Order is behaviour: adding authorization before routing or authentication, or exception handling last, produces apps that skip checks or crash without a proper response.
  - Subtopic: "Host, Kestrel & Program.cs"
    WebApplication.CreateBuilder sets up configuration, logging and DI, then Build creates the app and its pipeline. Kestrel is the built-in web server; in production it usually sits behind a reverse proxy or load balancer that handles TLS and forwards the real client IP.
Group: "Dependency Injection"
  - Subtopic: "Singleton, Scoped & Transient"
    Scoped services live for one request, singletons for the whole app, and transients are created on every resolve. Injecting a scoped service like a DbContext into a singleton captures one instance forever, which leaks data between requests and breaks under concurrency.
  - Subtopic: "Interfaces & Registration"
    Registering services against interfaces lets you swap implementations, such as a fake email sender in tests, without touching the code that uses them. Keyed services and extension methods like AddOrders() keep Program.cs readable as the app grows.
Group: "Configuration"
  - Subtopic: "Configuration Providers & Environments"
    Settings come from appsettings.json, appsettings.{Environment}.json, environment variables and user secrets, with later sources overriding earlier ones. Secrets belong in environment variables or a vault, never in appsettings.json committed to git.
  - Subtopic: "The Options Pattern"
    Binding a config section to a class and injecting IOptions<T> gives typed settings instead of magic strings. ValidateDataAnnotations with ValidateOnStart makes the app refuse to boot with bad config rather than failing on the first request that reads it.
Group: "Logging"
  - Subtopic: "ILogger & Log Levels"
    ILogger<T> writes logs tagged with their source class, and log levels per category are set in configuration. Debug logs in production bury real problems, while logging only errors leaves you blind when debugging an incident.
  - Subtopic: "Structured Logging"
    Message templates like 'Order {OrderId} placed' keep OrderId as a searchable field instead of baking it into text. String interpolation in log calls loses that structure and allocates even when the level is turned off.

### Layer 3 of 10: id aspnet-dev-3
Title: Building Web APIs
Group: "Endpoints"
  - Subtopic: "Minimal APIs vs Controllers"
    Minimal APIs map routes to lambdas with little ceremony and good performance; controllers group actions in classes with filters and conventions. Both run on the same pipeline, so pick one per project and keep endpoints thin either way.
  - Subtopic: "Routing & Route Groups"
    Route templates and constraints such as {id:int} decide which endpoint handles a URL. MapGroup shares a prefix, filters and authorization across related endpoints, so a whole group can be protected in one place instead of on each route.
Group: "Input"
  - Subtopic: "Model Binding"
    Model binding fills parameters from the route, query, headers and JSON body. Binding a request directly to a database entity lets clients set fields they should never touch, so bind to request DTOs and map them to entities yourself.
  - Subtopic: "Validation"
    Data annotations or FluentValidation reject bad input with a 400 before business logic runs. Controllers with [ApiController] validate automatically; minimal APIs need validation wired in explicitly, and forgetting it means invalid data reaches the database.
Group: "Responses & Errors"
  - Subtopic: "Typed Results & Status Codes"
    TypedResults such as Ok, NotFound and Created return the right status code and let OpenAPI know every possible response. Returning 200 with an error message inside breaks clients, retries and monitoring that rely on status codes.
  - Subtopic: "ProblemDetails & Exception Handling"
    AddProblemDetails and an exception handler turn every error into the standard ProblemDetails JSON shape. IExceptionHandler maps known exceptions to the right status and logs the unexpected ones, without leaking stack traces to clients in production.
Group: "API Contract"
  - Subtopic: "OpenAPI Documents"
    ASP.NET Core generates an OpenAPI document from your endpoints, which clients use to explore the API and generate SDKs. Annotating responses and names keeps the document accurate; a vague document is nearly as bad as none.
  - Subtopic: "API Versioning"
    Versioning lets you change a contract without breaking existing clients. The Asp.Versioning packages support URL, query and header versioning; pick one scheme and keep old versions alive until clients have moved.

### Layer 4 of 10: id aspnet-dev-4
Title: Data with Entity Framework Core
Group: "DbContext & Model"
  - Subtopic: "DbContext Lifetime"
    DbContext is a unit of work registered as scoped, one per request. It is not thread-safe, so running two queries on the same context in parallel throws, and keeping one alive for the app's lifetime grows its change tracker until memory runs out.
  - Subtopic: "Modelling Entities & Relationships"
    Conventions, data annotations and the fluent API map classes to tables, keys and one-to-many or many-to-many relationships. Configuring required fields, max lengths and indexes in the model makes the database enforce rules your code might forget.
Group: "Migrations"
  - Subtopic: "Creating & Applying Migrations"
    dotnet ef migrations add records schema changes as code you review and commit. Calling Migrate() at startup is risky with several instances; generating an idempotent SQL script or a migration bundle and running it as a deploy step is safer.
  - Subtopic: "Seeding & Data Changes"
    Schema migrations change structure; moving existing data needs explicit SQL or code in the migration. Renaming a property can be generated as drop and add, which deletes the column's data, so always read the generated migration before applying it.
Group: "Querying"
  - Subtopic: "LINQ to SQL Translation"
    EF Core translates LINQ into SQL and runs it when the query is enumerated. Calling ToList() too early, or using a method EF cannot translate, pulls whole tables into memory; projecting with Select to only the columns you need keeps queries small.
  - Subtopic: "Loading Related Data"
    Include loads related entities with the main query; lazy loading fetches them on first access, one query at a time. Lazy loading inside a loop is the classic N+1 problem, which turns one page of results into hundreds of queries.
Group: "Saving Data"
  - Subtopic: "Change Tracking & SaveChanges"
    EF Core tracks loaded entities and writes only what changed when SaveChanges runs, all in one transaction. Read-only queries should use AsNoTracking, which skips that bookkeeping and is noticeably faster for lists.
  - Subtopic: "Bulk Updates & Deletes"
    Loading thousands of rows just to change one field is slow. ExecuteUpdate and ExecuteDelete run a single SQL statement instead, but they bypass the change tracker, so entities already loaded in the context will not reflect the change.

### Layer 5 of 10: id aspnet-dev-5
Title: Advanced EF Core & Data Performance
Group: "Consistency"
  - Subtopic: "Transactions"
    SaveChanges is already one transaction, but work spanning several SaveChanges calls, or raw SQL plus EF, needs an explicit transaction. With retrying execution strategies, the whole transaction must be wrapped in the strategy so a retry repeats all of it, not half.
  - Subtopic: "Optimistic Concurrency"
    Two users editing the same row at once means the last save silently overwrites the first. A concurrency token, such as a row version, makes the second save fail with DbUpdateConcurrencyException so you can return a 409 or merge, instead of losing data.
Group: "Pagination & Indexes"
  - Subtopic: "Offset vs Keyset Pagination"
    Skip and Take make the database read and discard every skipped row, so deep pages get slow and results shift when rows are inserted. Keyset pagination continues after the last seen key and stays fast at any depth.
  - Subtopic: "Indexes & Query Plans"
    Indexes should match how queries filter and sort. Logging the SQL EF generates and reading the database's execution plan shows whether an index is used or the whole table is scanned.
Group: "Diagnostics"
  - Subtopic: "Logging Generated SQL"
    You cannot fix a query you cannot see. Simple logging or the EF Core command log shows each SQL statement and its duration, which is the fastest way to spot N+1 queries, missing filters and accidental full-table loads.
  - Subtopic: "Efficient Querying Patterns"
    Project only needed columns, avoid loading the same data twice, use AsNoTracking for reads and consider compiled queries on hot paths. Most EF Core performance problems come from what is queried, not from EF itself.
Group: "Beyond the ORM"
  - Subtopic: "Raw SQL in EF Core"
    FromSql and SqlQuery run hand-written SQL when LINQ cannot express a query well. Interpolated FromSql parameterizes values safely; building SQL strings yourself with concatenation reopens the door to SQL injection.
  - Subtopic: "Dapper for Read-Heavy Paths"
    Dapper maps SQL results straight to objects with almost no overhead, which suits reports and hot read endpoints. Many teams write with EF Core and read with Dapper where it matters, rather than choosing one for everything.

### Layer 6 of 10: id aspnet-dev-6
Title: Authentication & Authorization
Group: "Authentication"
  - Subtopic: "Schemes, Cookies & Bearer Tokens"
    Authentication middleware turns a cookie or token into a ClaimsPrincipal on HttpContext.User. Cookies suit browser apps on the same site; bearer tokens suit APIs called by other services or mobile apps. Mixing them without care leads to CSRF holes or tokens stored where scripts can read them.
  - Subtopic: "ASP.NET Core Identity"
    Identity handles users, password hashing, lockout and two-factor auth so you do not write them yourself. Rolling your own password storage is one of the most common ways small apps leak user credentials.
Group: "Tokens"
  - Subtopic: "Validating JWTs Correctly"
    A JWT is only trustworthy after its signature, issuer, audience and expiry are checked. Turning off any of those validations to make an error go away lets anyone forge or replay tokens.
  - Subtopic: "OpenID Connect & External Providers"
    For real products, an identity provider such as Entra ID, Auth0 or Keycloak usually issues tokens via OpenID Connect, and your API only validates them. That moves login, MFA and account recovery out of your code and into a system built for it.
Group: "Authorization"
  - Subtopic: "Policies & Requirements"
    Policies name a rule once, such as 'CanManageOrders', and endpoints refer to it by name. Policies built from requirements and handlers scale far better than [Authorize(Roles = ...)] strings copied across the codebase.
  - Subtopic: "Resource-Based Authorization"
    'Only the owner can edit this order' depends on the order itself, so it cannot be an attribute. IAuthorizationService checks a policy against the loaded resource; skipping it is how one user ends up reading another's data by changing an id.
Group: "Hardening"
  - Subtopic: "Rate Limiting"
    The built-in rate limiting middleware offers fixed window, sliding window, token bucket and concurrency limiters. Partition limits by user or client IP and apply stricter ones to login and sign-up, where brute-force attacks happen.
  - Subtopic: "CORS, HTTPS & Data Protection"
    CORS should list exact frontend origins, HTTPS should be enforced with HSTS, and the Data Protection keys that sign cookies must be shared and persisted across instances. Lost or per-instance keys log users out on every deploy or restart.

### Layer 7 of 10: id aspnet-dev-7
Title: Testing ASP.NET Core Apps
Group: "Unit Tests"
  - Subtopic: "xUnit Basics"
    xUnit creates a new test class instance per test, so tests cannot share state by accident. [Fact] covers one case and [Theory] with [InlineData] covers many inputs, which is the cheapest way to test edge cases in business rules.
  - Subtopic: "Test Doubles"
    Fakes and mocks replace slow or external dependencies like payment gateways and email. Mocking your own database layer in every test hides the bugs that only show up with real SQL, so mock at the edges of the system, not everywhere.
Group: "Test Strategy"
  - Subtopic: "What to Test at Which Level"
    Unit tests for rules and calculations, integration tests for endpoints, data access and auth, and few end-to-end tests for critical flows. Tests that only re-check framework behaviour add time without catching your bugs.
  - Subtopic: "Running Tests in CI"
    dotnet test runs every test project and can collect coverage. Running it on every push, with the same database version as production, catches breaking changes before they merge rather than after they deploy.
Group: "Integration Tests"
  - Subtopic: "WebApplicationFactory"
    WebApplicationFactory boots your real app in memory and gives you an HttpClient, so routing, middleware, validation and serialization all run in the test. ConfigureTestServices swaps external services for fakes while keeping the rest of the app real.
  - Subtopic: "Testing Authenticated Endpoints"
    A test authentication handler lets tests act as a specific user with chosen claims. Every protected endpoint deserves three tests: anonymous, authenticated without permission, and authenticated with permission.
Group: "Real Databases"
  - Subtopic: "Testcontainers for .NET"
    Testcontainers starts a real database in Docker for the test run. The EF Core in-memory provider does not enforce constraints, transactions or SQL behaviour, so tests pass against it while the real database would fail.
  - Subtopic: "Isolated Test Data"
    Each test should set up its own data and not rely on order. Resetting the database between tests, for example with Respawn or transactions that roll back, keeps the suite reliable when tests run in parallel.

### Layer 8 of 10: id aspnet-dev-8
Title: Background Work, Caching & Resilience
Group: "Background Work"
  - Subtopic: "BackgroundService & Hosted Services"
    A BackgroundService runs a loop alongside the web app, such as processing a queue. It is a singleton, so it must create a scope to use scoped services like a DbContext, and it must honour the stopping token so shutdown does not hang.
  - Subtopic: "Durable Job Queues"
    An in-memory Channel is fast but loses its jobs on restart. Work that must not be lost, like sending invoices, needs a durable queue such as a database-backed job library or a message broker, with retries and idempotent handlers.
Group: "Caching"
  - Subtopic: "HybridCache & Distributed Caching"
    IMemoryCache is per instance, so several instances each hold their own copy. HybridCache combines a fast local layer with a shared Redis layer and prevents a stampede where many requests rebuild the same missing entry at once.
  - Subtopic: "Output Caching"
    Output caching stores whole responses and serves them without running the endpoint. Tag-based eviction clears related responses when data changes; caching per-user responses without varying by user leaks one person's data to another.
Group: "Calling Other Services"
  - Subtopic: "HttpClientFactory"
    Creating a new HttpClient per call exhausts sockets under load, and one static client ignores DNS changes. IHttpClientFactory and typed clients manage handler lifetimes for you and give one place to configure base addresses and resilience.
  - Subtopic: "Timeouts & Cancellation"
    Every outgoing call needs a timeout shorter than the caller's, or one slow dependency ties up threads until the whole API stalls. Pass the request's CancellationToken along so abandoned requests stop their downstream work too.
Group: "Resilience"
  - Subtopic: "Retries with Backoff"
    Retrying transient failures with exponential backoff and jitter hides brief network blips. Retrying non-idempotent requests like 'charge card' can repeat the action, so only retry what is safe to repeat or send idempotency keys.
  - Subtopic: "Circuit Breakers"
    When a dependency keeps failing, a circuit breaker stops calling it for a while and fails fast instead. That gives the dependency room to recover and stops your API from queueing up thousands of doomed requests.

### Layer 9 of 10: id aspnet-dev-9
Title: Real-Time & Distributed .NET
Group: "Real-Time with SignalR"
  - Subtopic: "Hubs, Groups & Clients"
    SignalR hubs push messages to connected clients over WebSockets, falling back to other transports when needed. Groups send to subsets such as everyone watching one order; authorize hub methods just like endpoints, because a hub is a public API too.
  - Subtopic: "Scaling SignalR"
    Each client is connected to one server, so with several instances a message sent from another instance never reaches it. A Redis backplane or Azure SignalR Service shares messages between servers, and the load balancer needs sticky sessions for non-WebSocket transports.
Group: "gRPC"
  - Subtopic: "gRPC Services on .NET"
    gRPC defines services in .proto files and generates typed clients and servers, with compact binary messages over HTTP/2. It suits internal service-to-service calls; browsers need gRPC-Web or a JSON gateway.
  - Subtopic: "Deadlines & Contract Evolution"
    Every gRPC call should set a deadline, which propagates to downstream calls. Never reuse or renumber a field in a .proto file; add new fields instead, or old clients will read the wrong data.
Group: "Messaging"
  - Subtopic: "Message Brokers & MassTransit"
    Publishing events through RabbitMQ or Azure Service Bus decouples services, so the order service keeps working while email is down. MassTransit handles serialization, retries and error queues across brokers.
  - Subtopic: "Outbox & Idempotent Consumers"
    Saving data and publishing an event are two systems, so one can succeed while the other fails. The transactional outbox saves the event with the data and publishes it afterwards; consumers must handle the same message twice without double effects.
Group: "Running Many Services"
  - Subtopic: ".NET Aspire"
    Aspire starts your services, databases and brokers together locally with service discovery and a dashboard for logs and traces. It makes multi-service development manageable without hand-written compose files for every change.
  - Subtopic: "When Not to Split Services"
    Microservices add network failures, data consistency problems and deployment overhead. A well-structured modular monolith is often the better start, split later along boundaries that have proven themselves.

### Layer 10 of 10: id aspnet-dev-10
Title: Observability, Containers & Deployment
Group: "Health & Lifecycle"
  - Subtopic: "Health Checks"
    Health check endpoints report whether the app and its dependencies work. Separate liveness from readiness: liveness should only fail when a restart would help, or a database outage restarts every instance in a loop.
  - Subtopic: "Graceful Shutdown"
    On SIGTERM the host stops accepting requests, waits for in-flight ones and stops hosted services, up to a shutdown timeout. Background services that ignore their stopping token get killed mid-job, so they must check it and finish or hand work back.
Group: "Observability"
  - Subtopic: "OpenTelemetry in .NET"
    ASP.NET Core, HttpClient and EF Core emit traces and metrics that OpenTelemetry collects and exports. One trace shows a request's time in the endpoint, each SQL query and each outgoing call, which turns 'it's slow' into a specific cause.
  - Subtopic: "Metrics & Alerts"
    Built-in metrics cover request rate, duration, errors and runtime health such as GC and thread pool. Alert on symptoms users feel, like error rate and latency, not on every internal counter, or alerts get ignored.
Group: "Containers"
  - Subtopic: "Container Images for .NET"
    dotnet publish can build a container image directly, or a multi-stage Dockerfile can build with the SDK image and run on the smaller ASP.NET runtime image. Recent images run as a non-root user by default; keep it that way.
  - Subtopic: "Publishing Options"
    Framework-dependent, self-contained, trimmed and Native AOT builds trade image size and startup time against compatibility. Native AOT starts fast and uses little memory but does not support every library, so measure before switching.
Group: "Shipping"
  - Subtopic: "CI/CD Pipelines"
    A pipeline restores, builds, tests and publishes the image on every push, then applies migrations and deploys. Applying migrations as their own step, before the new code rolls out, avoids instances racing to change the schema.
  - Subtopic: "Behind a Proxy"
    Behind a load balancer the app sees the proxy's IP and HTTP scheme unless forwarded headers are configured. Getting this wrong breaks HTTPS redirects, generated links and rate limiting by client IP.

Start now with Layer 1.
