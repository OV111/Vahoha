You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: laravel-vue (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id laravel-vue-1
Title: PHP Fundamentals
Group: "PHP Core Concepts"
  - Subtopic: "Type System and Type Juggling"
    PHP performs automatic type coercion in loose comparisons, which causes subtle bugs — '0' == false evaluates to true. Understanding strict vs. loose comparison and PHP 8's union types prevents entire categories of authentication and conditional logic bugs that are notoriously hard to debug in production.
  - Subtopic: "Namespaces and Autoloading"
    Namespaces prevent class name collisions across packages and map directly to directory structure when using PSR-4 autoloading via Composer. If you misunderstand this, you'll spend hours chasing 'Class not found' errors and be unable to properly organize large Laravel applications into logical modules.
Group: "Object-Oriented PHP"
  - Subtopic: "Interfaces and Abstract Classes"
    Interfaces define contracts that decouple implementation from usage — Laravel's entire service container relies on this pattern. Misunderstanding the difference between interfaces and abstract classes leads to tightly coupled code that is nearly impossible to unit test or swap implementations in later.
  - Subtopic: "Traits and Code Reuse"
    Traits let you compose shared behavior across unrelated class hierarchies — Laravel's own Notifiable and SoftDeletes are traits. Without understanding trait conflict resolution and precedence rules, you'll encounter cryptic method override errors when multiple traits define the same method.
Group: "Composer Dependency Management"
  - Subtopic: "composer.lock and Reproducible Builds"
    The composer.lock file pins exact versions of every dependency and sub-dependency, ensuring that all environments run identical code. Committing this file to version control is critical — without it, a CI server or teammate may resolve a slightly different package version that introduces breaking changes your local machine never saw.
  - Subtopic: "Semantic Versioning and Version Constraints"
    Composer uses semver constraints like ^2.0 (compatible with 2.x) and ~2.1 (compatible with 2.1.x) to resolve packages. Misreading these constraints is how teams accidentally allow major-version bumps that break APIs, or conversely lock themselves into outdated packages with known security vulnerabilities.
Group: "PHP Built-in Functions"
  - Subtopic: "Array Functions and Performance"
    PHP's array_map, array_filter, and array_reduce are functional tools that operate on full in-memory arrays, while generators (yield) produce values lazily. Choosing array functions over generators when processing large datasets causes memory exhaustion — a common mistake when handling CSV imports or large query result sets.
  - Subtopic: "String Handling and Multibyte Safety"
    Standard PHP string functions like strlen and substr operate on bytes, not characters — they produce wrong results and data corruption when handling UTF-8 text with multibyte characters. Always use the mbstring extension equivalents (mb_strlen, mb_substr) when your application handles non-ASCII content.

### Layer 2 of 10: id laravel-vue-2
Title: Laravel Basics and Routing
Group: "Laravel Routing Internals"
  - Subtopic: "Route Model Binding"
    Implicit route model binding automatically resolves Eloquent models from route parameters by matching the parameter name to the model's primary key. When you bypass this feature and manually query models in controllers, you lose automatic 404 handling and create redundant code — missing the binding also makes it easy to expose sequential ID enumeration vulnerabilities.
  - Subtopic: "Named Routes and URL Generation"
    Named routes decouple URL strings from your application logic, letting you change a URL path in one place without hunting through views and controllers. Hardcoding URL strings instead means a single URL refactor breaks links across dozens of Blade templates and frontend components simultaneously.
Group: "Middleware Pipeline"
  - Subtopic: "How Middleware Wraps the Request Lifecycle"
    Laravel's middleware stack is an onion model — each middleware wraps the next, running code both before and after the inner handler. Misunderstanding this means you place session writes or authentication checks after the response has already been sent, producing bugs where auth state changes don't persist or responses are already committed when you try to modify headers.
  - Subtopic: "Route Groups and Middleware Inheritance"
    Route groups let you apply shared middleware, prefixes, and namespace scoping to sets of routes in one declaration. Without grouping, developers manually repeat middleware assignments on individual routes and inevitably miss one — leaving, for example, an admin route unauthenticated because it was added outside the protected group.
Group: "Artisan CLI"
  - Subtopic: "Artisan Make Commands and Code Generation"
    Artisan's make:* commands generate correctly namespaced, properly structured boilerplate files that follow Laravel conventions. Writing these files by hand introduces subtle namespace mismatches and missing parent class imports that cause cryptic runtime errors and break framework features like automatic controller discovery.
  - Subtopic: "Custom Artisan Commands for Automation"
    Custom Artisan commands let you encapsulate operational tasks (data seeding, cache warming, report generation) as first-class CLI tools runnable in any environment. Putting this logic in controllers or web routes means it can only run through HTTP requests, making scheduled execution and DevOps automation awkward or impossible.
Group: "Service Container Basics"
  - Subtopic: "Automatic Constructor Injection"
    Laravel's service container inspects controller and class constructors via reflection and automatically resolves and injects type-hinted dependencies. If you manually instantiate dependencies with 'new' inside constructors, you bypass the container and make unit testing impossible because you cannot substitute mock implementations.
  - Subtopic: "Facades vs. Dependency Injection"
    Laravel facades are static proxies to container-resolved instances, providing a terse syntax at the cost of hidden coupling and harder testability. Preferring constructor injection over facades makes class dependencies explicit, enables IDE static analysis, and allows true unit tests without booting the full Laravel application.

### Layer 3 of 10: id laravel-vue-3
Title: Eloquent and Databases
Group: "Eloquent ORM Core"
  - Subtopic: "Mass Assignment and the fillable/guarded Properties"
    Eloquent's mass assignment protection prevents users from injecting arbitrary database columns through form submissions by requiring you to whitelist fields in $fillable or blacklist them in $guarded. Setting $guarded = [] to 'allow everything' is a critical security mistake that has led to privilege escalation vulnerabilities in real applications.
  - Subtopic: "Eloquent Relationships and Lazy vs Eager Loading"
    Eloquent relationships define how models are joined across tables, but accessing a relationship property inside a loop triggers a new SQL query per iteration — the N+1 problem. Using with() to eager load relationships is essential for performance; the difference between 1 query and 1000 queries for a page listing 100 records is the difference between a fast app and a slow one.
Group: "Database Migrations"
  - Subtopic: "Migration Versioning and the up/down Contract"
    Each migration's down() method must be the exact inverse of up() — dropping the table or column that up() creates. Without a correct down() method, rolling back migrations leaves your database in a partially modified state, and running fresh migrations on staging or CI breaks because the schema is inconsistent.
  - Subtopic: "Column Modifiers and Index Strategy"
    Adding nullable(), unsigned(), default(), and index() modifiers in migrations controls both the database schema and query performance. Missing an index on a foreign key or frequently queried column causes full table scans that are invisible in development with small data sets but catastrophic in production with millions of rows.
Group: "Query Builder and Raw Queries"
  - Subtopic: "Query Builder vs Eloquent Trade-offs"
    Laravel's query builder returns plain arrays/objects and is faster than Eloquent for bulk operations, while Eloquent returns model instances with events, observers, and relationship methods. Using Eloquent for bulk inserts of 10,000 rows fires model events on each row and is dramatically slower than a single query builder insert.
  - Subtopic: "Preventing SQL Injection with Parameter Binding"
    The query builder and Eloquent automatically use PDO parameter binding, which separates SQL structure from user data and prevents SQL injection. Using DB::statement() or DB::select() with string interpolation of user input bypasses this protection completely — a mistake that exposes the entire database to attack.
Group: "Database Seeders and Factories"
  - Subtopic: "Model Factories for Realistic Test Data"
    Factories use Faker to generate realistic fake data for each model attribute, enabling consistent, isolated test setups that don't depend on manually created records. Without factories, tests depend on shared database state that can change between runs, causing intermittent test failures that are extremely difficult to diagnose.
  - Subtopic: "Seeders and Environment-Specific Data"
    Database seeders populate the database with initial or reference data and should be split between seeders that always run (roles, permissions) and those only for development (demo users, sample posts). Mixing them causes production deployments to accidentally create test accounts with weak passwords or expose demo data to real users.

### Layer 4 of 10: id laravel-vue-4
Title: Validation, Forms, and Auth
Group: "Laravel Validation"
  - Subtopic: "Form Request Classes and Authorization"
    Form Requests encapsulate both validation rules and authorization logic for a specific HTTP request, keeping controllers thin and testable. Putting validation inline in controllers couples the validation to the controller method, making it impossible to reuse the same rules in multiple places and dramatically harder to write isolated unit tests.
  - Subtopic: "Custom Validation Rules"
    Laravel allows custom Rule objects and closures for domain-specific validation logic, like checking that a username is unique across a case-insensitive index or that a date falls within a billing cycle. Without custom rules, developers duplicate complex validation logic across multiple controllers or — worse — validate after persisting data and rely on catching database exceptions.
Group: "Laravel Authentication"
  - Subtopic: "Laravel Sanctum for SPA Authentication"
    Sanctum provides cookie-based session authentication for SPAs and token-based authentication for mobile/API clients from a single package. Confusing Sanctum's SPA mode (cookie + CSRF) with its token mode and mixing strategies causes authentication to fail silently on cross-origin requests or exposes APIs to CSRF attacks.
  - Subtopic: "Gates and Policies for Authorization"
    Gates define simple boolean authorization checks while Policies group authorization logic for a specific model, both powered by the same underlying Gate service. Skipping authorization and relying only on route middleware for access control leaves application logic (like 'can this user edit this specific post?') unguarded at the controller or model level.
Group: "CSRF Protection"
  - Subtopic: "How Laravel's CSRF Token Works"
    Laravel generates a CSRF token per session and validates it on every state-changing request (POST, PUT, DELETE), comparing the token in the request body or header against the session value. Disabling CSRF protection on routes that modify data, or failing to send the token from your Vue frontend, opens those routes to cross-site request forgery attacks from any malicious website.
  - Subtopic: "Excluding Routes from CSRF Verification"
    Laravel's VerifyCsrfToken middleware has an $except array for routes that legitimately receive requests without CSRF tokens, such as webhooks from payment processors. Excluding broad patterns like 'api/*' in web.php routes to work around CSRF issues rather than properly configuring your SPA is a common mistake that removes protection from the entire API surface.
Group: "Blade Templating"
  - Subtopic: "Blade Directives and XSS Prevention"
    Blade's {{ }} syntax escapes HTML entities by default, preventing cross-site scripting, while {!! !!} outputs raw unescaped HTML. Misusing {!! !!} on user-controlled content is one of the most common XSS vulnerabilities in Laravel applications — it should only ever be used for trusted, pre-sanitized HTML you generate yourself.
  - Subtopic: "Blade Components and Slots"
    Blade components provide a composable UI component system with typed props and named slots, similar to Vue components but rendered server-side. Understanding the distinction helps you decide which UI logic belongs in Blade (server-rendered, SEO-critical) vs. Vue (interactive, client-side), preventing the mistake of duplicating component logic across both systems.

### Layer 5 of 10: id laravel-vue-5
Title: Vue 3 Fundamentals
Group: "Vue 3 Reactivity System"
  - Subtopic: "ref vs reactive — Choosing the Right Primitive"
    ref wraps any value in a reactive container accessed via .value, while reactive creates a deep reactive proxy for objects — but reactive loses reactivity when destructured. Destructuring a reactive object into plain variables is a common Vue 3 mistake that silently breaks template updates, leaving the UI stale while the underlying data has changed.
  - Subtopic: "computed Properties and Side-Effect-Free Getters"
    Computed properties are cached based on their reactive dependencies and only re-evaluate when those dependencies change — making them far more efficient than methods for derived state. Writing side effects (API calls, mutations) inside computed properties causes unpredictable bugs because computeds may be re-evaluated at any time by the reactivity system.
Group: "Composition API"
  - Subtopic: "Composables — Encapsulating Stateful Logic"
    Composables are functions that use Vue's Composition API to encapsulate and reuse stateful logic — like useFetch, useForm, or useDebounce. Without composables, cross-component logic lives in mixins which have implicit property injection, name conflicts, and no TypeScript inference — problems that composables eliminate by making dependencies explicit.
  - Subtopic: "Lifecycle Hooks in the Composition API"
    Composition API lifecycle hooks (onMounted, onUnmounted, onBeforeUpdate) must be called synchronously inside setup() — calling them inside conditionals or async callbacks causes them to be silently ignored. Missing onUnmounted cleanup for event listeners and timers is the most common source of memory leaks in Vue 3 applications.
Group: "Vite Build Tooling"
  - Subtopic: "Vite Dev Server and Hot Module Replacement"
    Vite's dev server serves files as native ES modules over HTTP, enabling near-instant startup regardless of project size, with HMR that patches only the changed module without a full page reload. Misconfiguring the Vite server proxy for API requests to Laravel causes CORS errors in development that don't appear in production, leading developers to incorrectly modify Laravel's CORS settings.
  - Subtopic: "Vite + Laravel Integration via laravel-vite-plugin"
    The laravel-vite-plugin bridges Vite's asset manifest with Laravel's @vite Blade directive, injecting the correct script and link tags for both dev server and production builds. Without understanding the manifest-based asset loading, developers hardcode script paths that work in one environment but serve stale or missing assets in the other.
Group: "Vue Router"
  - Subtopic: "History Mode and Server-Side Fallback"
    Vue Router's history mode produces clean URLs without hash fragments, but requires the server to return index.html for all non-file paths so the client-side router can handle navigation. Without configuring Laravel's catch-all route or the web server fallback, direct URL access to any route other than '/' returns a 404 from the server.
  - Subtopic: "Navigation Guards and Auth Protection"
    Router navigation guards (beforeEach, beforeEnter) intercept route transitions and let you check authentication or permissions before rendering, redirecting unauthenticated users to login. Relying solely on hiding navigation links to protect routes rather than implementing guards means any user can navigate directly to a protected URL and reach restricted content.

### Layer 6 of 10: id laravel-vue-6
Title: Building APIs with Laravel
Group: "RESTful API Design in Laravel"
  - Subtopic: "API Resources and Transforming Eloquent Models"
    Laravel API Resources transform Eloquent models and collections into JSON-serializable arrays, acting as a presentation layer that decouples your database schema from your API contract. Without resources, adding a new database column automatically exposes it in API responses — leaking sensitive fields like password hashes, internal flags, or PII to frontend clients.
  - Subtopic: "API Versioning Strategy"
    Versioning your API via URL prefixes (/api/v1/) or headers lets you evolve the contract without breaking existing clients. Without versioning, any breaking change to a response structure forces all consumers to update simultaneously — impossible when public mobile apps are involved — and teams resort to adding fields indefinitely rather than cleaning up outdated designs.
Group: "JSON Response Patterns"
  - Subtopic: "Consistent Error Response Structure"
    Laravel's exception handler can be customized to return consistent JSON error envelopes (with status, message, and errors fields) for all API errors. Without this, different error types return different response shapes — Laravel's default returns HTML for server errors and JSON for validation errors — breaking any frontend code that expects a uniform error format.
  - Subtopic: "HTTP Status Codes and Semantic Responses"
    Using the correct HTTP status codes (201 Created, 204 No Content, 422 Unprocessable Entity, 404 Not Found) communicates intent to clients and allows HTTP caching, retry logic, and monitoring tools to behave correctly. Returning 200 OK for everything and encoding success/failure in the JSON body breaks standardized tooling and forces every client to implement custom error detection logic.
Group: "Laravel Sanctum API Tokens"
  - Subtopic: "Token Abilities and Scoped Permissions"
    Sanctum allows minting tokens with specific ability strings (like 'read:orders', 'write:products') and checking those abilities in middleware or controllers with tokenCan(). Without ability scoping, every token grants full API access — meaning a read-only dashboard integration has the same access as an admin token, violating the principle of least privilege.
  - Subtopic: "Token Expiration and Revocation"
    Sanctum tokens are stored in the personal_access_tokens table and can be revoked by deleting the record — making logout and compromise response straightforward. Without implementing token expiration (via expires_at) or a revocation endpoint, stolen tokens remain valid indefinitely and there is no way to force a user out of all sessions.
Group: "Rate Limiting"
  - Subtopic: "Laravel's Built-in Rate Limiter"
    Laravel's RateLimiter facade lets you define named rate limit rules (requests per minute per user or IP) applied via the throttle middleware. Without rate limiting on authentication and sensitive API endpoints, your application is vulnerable to credential stuffing attacks and API abuse that can exhaust server resources.
  - Subtopic: "Custom Rate Limit Keys"
    Rate limits can be keyed by authenticated user ID, IP address, or any combination — letting you apply stricter limits to unauthenticated requests while allowing higher throughput for trusted users. Using only IP-based limiting fails for users behind shared IPs (offices, universities) who hit the limit collectively, while rate limiting only by user ID exposes unauthenticated endpoints to abuse.

### Layer 7 of 10: id laravel-vue-7
Title: Connecting Vue to Laravel
Group: "Axios HTTP Client in Vue"
  - Subtopic: "Axios Interceptors for Global Auth and Error Handling"
    Axios request and response interceptors let you inject authentication headers on every outgoing request and centrally handle 401/403 responses (redirecting to login) without repeating the logic in every API call. Without interceptors, developers copy-paste auth header injection and error handling into dozens of component methods, guaranteeing that some calls are missing it.
  - Subtopic: "CSRF Token Injection from Laravel Cookie"
    When using Sanctum's SPA cookie authentication, Axios must read the XSRF-TOKEN cookie set by Laravel's /sanctum/csrf-cookie endpoint and send it as the X-XSRF-TOKEN header on all mutating requests. Forgetting to call the csrf-cookie endpoint before the first authenticated request, or misconfiguring withCredentials, results in every POST returning a 419 CSRF token mismatch error.
Group: "State Management with Pinia"
  - Subtopic: "Pinia Stores — Actions, Getters, and State"
    Pinia stores are the recommended Vue 3 state management solution, with state as reactive data, getters as computed properties, and actions as async methods for API calls. Putting API calls directly in Vue components rather than Pinia actions scatters data fetching logic across the component tree, making it impossible to share or cache the same data across multiple components.
  - Subtopic: "Pinia vs Vuex — Why Pinia Wins for Vue 3"
    Pinia has native TypeScript support, no mutations (simpler API), modular stores without nested modules, and Devtools integration with time-travel debugging. Choosing Vuex for a new Vue 3 project means working against the grain of the ecosystem — Vuex 4 has no plans for major updates and Pinia is now the officially recommended store.
Group: "Inertia.js for Full-Stack Integration"
  - Subtopic: "Inertia's Page Component Model"
    Inertia.js eliminates the need for a separate API layer by letting Laravel controllers return Inertia responses that render Vue page components directly, passing server-side data as props. Misunderstanding Inertia's model — treating it like a REST API and making Axios calls from Inertia pages — defeats its purpose and creates redundant complexity.
  - Subtopic: "Shared Data and Partial Reloads"
    Inertia's shared data (via HandleInertiaRequests middleware) injects global props like the authenticated user into every page component without repeating the query in every controller. Partial reloads let you refresh only specific props without a full page reload — misusing full reloads for form submissions throws away scroll position and causes noticeable page flicker.
Group: "CORS Configuration"
  - Subtopic: "Laravel CORS Middleware and the fruitcake/cors Package"
    Laravel includes CORS handling via the HandleCors middleware (powered internally by fruitcake/laravel-cors) configured in config/cors.php. Setting allowed_origins to '*' on a credentialed request is rejected by browsers per the CORS spec — a misunderstanding that leads developers to believe CORS can't work with credentials, when the fix is to specify exact origins.
  - Subtopic: "Preflight Requests and OPTIONS Method Handling"
    Browsers send an OPTIONS preflight request before any cross-origin request with custom headers or non-simple methods, expecting CORS headers in the response before sending the real request. If Laravel's CORS middleware is not applied to OPTIONS routes or the web server terminates OPTIONS requests before they reach Laravel, all authenticated cross-origin API calls fail with a cryptic network error.

### Layer 8 of 10: id laravel-vue-8
Title: Queues, Jobs, and Email
Group: "Laravel Queues"
  - Subtopic: "Queue Drivers and the Sync Driver Trap"
    Laravel supports multiple queue backends (Redis, SQS, database) and a 'sync' driver that executes jobs immediately in the same process — useful only for testing. Deploying with QUEUE_CONNECTION=sync means slow operations (email, image processing) block the HTTP response and users wait, which developers only discover under production load because local development feels the same either way.
  - Subtopic: "Job Retries, Failures, and the Dead Letter Queue"
    Jobs can specify a maximum number of retries and an exponential backoff strategy before being moved to the failed_jobs table. Without configuring retry limits, a job that always fails (due to a bug or downstream service outage) loops indefinitely in the queue, consuming worker capacity and potentially growing the queue to millions of entries.
Group: "Redis Integration"
  - Subtopic: "Redis for Caching vs Queuing — Separate Databases"
    Laravel uses Redis for both the cache and queue systems but defaults both to database 0, meaning flushing the cache also destroys all queued jobs. Always configure separate Redis databases (REDIS_CACHE_DB=1, REDIS_QUEUE_DB=0) to prevent this catastrophic data loss, which is an invisible misconfiguration that only manifests when cache is cleared in production.
  - Subtopic: "Laravel Horizon for Queue Monitoring"
    Horizon provides a real-time dashboard and configuration-driven worker management for Redis queues, letting you set per-queue worker counts, monitor throughput, and get alerts on slow or failing jobs. Running raw artisan queue:work without Horizon means you have no visibility into queue health and must manually restart workers after deployments.
Group: "Laravel Mail"
  - Subtopic: "Mailable Classes and Markdown Templates"
    Laravel Mailable classes encapsulate email construction — subject, recipients, headers, and template data — as reusable objects that can be queued, tested, and previewed in the browser. Building emails with raw PHP mail() or putting mail logic directly in controllers makes email code impossible to test without actually sending and breaks the single-responsibility principle.
  - Subtopic: "Queueing Emails and Mail Drivers"
    Implementing ShouldQueue on a Mailable defers email sending to a queue worker, preventing slow SMTP connections from blocking HTTP responses. Sending email synchronously on every request is a common performance bottleneck — users experience 1-3 second delays on any action that triggers an email, and SMTP failures cause HTTP 500 errors.
Group: "Laravel Notifications"
  - Subtopic: "Multi-Channel Notifications"
    Laravel's notification system sends the same notification via multiple channels (mail, Slack, SMS via Vonage, database) from a single class by implementing different via() channel methods. Building separate Mailable classes, Slack webhook calls, and SMS services for the same event creates a maintenance burden — a change to the notification content must be made in multiple places.
  - Subtopic: "Database Notifications and Read State"
    The database notification channel stores notifications in a notifications table with a read_at timestamp, enabling in-app notification UIs with unread counts. Without the database channel, in-app notifications must be built from scratch with custom tables, losing the unified API and the morphable relationship that lets any model have notifications.

### Layer 9 of 10: id laravel-vue-9
Title: Advanced Patterns and Performance
Group: "Laravel Architecture Patterns"
  - Subtopic: "Service Classes and Thin Controllers"
    Service classes extract complex business logic out of controllers, making them independently testable and reusable across HTTP requests, artisan commands, and queue jobs. Fat controllers — where logic for querying, processing, and responding all lives together — are the single biggest cause of untestable code and duplication in Laravel projects.
  - Subtopic: "Repository Pattern and Data Access Abstraction"
    The repository pattern wraps Eloquent queries behind an interface, allowing you to swap data sources (database, API, cache) without changing business logic. While often over-engineered for small projects, it becomes essential when multiple data sources feed the same domain model or when you need to unit test business logic without hitting the database.
Group: "Caching Strategies"
  - Subtopic: "Cache Tags and Invalidation Strategy"
    Laravel's cache supports tags (on Redis and Memcached) that let you invalidate a group of related cache entries with a single call — essential for flushing all cached data related to a specific user or resource. Without tags, developers use time-based expiration and serve stale data, or flush the entire cache on every write which defeats the performance benefits.
  - Subtopic: "remember() and the Cache-Aside Pattern"
    Cache::remember() implements the cache-aside pattern atomically — check the cache, return if hit, otherwise execute the callback and store the result. Manually implementing check-then-set outside of remember() creates a race condition where two simultaneous requests both miss the cache, both hit the database, and both write the same value — the stampede problem.
Group: "Vue 3 Performance Optimization"
  - Subtopic: "v-memo and Preventing Unnecessary Re-renders"
    v-memo memoizes a template subtree and skips re-rendering it unless the specified dependency array changes, similar to React.memo — critical for large lists where each row contains computed content. Without memoization, every parent state change causes the entire list to diff and re-render, causing visible lag in lists with more than a few hundred items.
  - Subtopic: "defineAsyncComponent and Code Splitting"
    defineAsyncComponent wraps a dynamic import, causing Vite/webpack to split that component into a separate chunk loaded on demand — reducing initial bundle size. Without async components, every route's component is bundled together and shipped to the user on first load, even if they never visit most routes.
Group: "Redis Advanced Usage"
  - Subtopic: "Redis Pub/Sub for Real-Time Events"
    Redis Pub/Sub combined with Laravel Echo and Laravel Reverb (or Pusher) enables real-time server-to-browser push notifications without polling. Polling APIs from the Vue frontend on a timer is a common but wasteful alternative — it wastes server resources, introduces latency, and doesn't scale, whereas Pub/Sub events are pushed instantly.
  - Subtopic: "Redis Connection Pooling and Persistent Connections"
    Laravel uses phpredis or Predis to connect to Redis, and each queue worker or web request opens a connection that should be reused — connection pooling prevents the overhead of establishing a new TCP connection for every Redis command. Misconfiguring persistent connections or running too many workers without a connection limit causes Redis to hit its max client ceiling and reject new connections.

### Layer 10 of 10: id laravel-vue-10
Title: Testing and Deployment
Group: "Testing in Laravel"
  - Subtopic: "PHPUnit Feature Tests vs Unit Tests"
    Feature tests boot the full Laravel application and test complete HTTP request/response cycles, while unit tests target isolated classes without the framework. Writing everything as feature tests is slow and hides architecture problems — if a class can't be unit tested in isolation, it's a sign that it has too many dependencies and should be refactored.
  - Subtopic: "Database Testing with RefreshDatabase and Transactions"
    The RefreshDatabase trait rolls back database changes after each test using transactions (or re-runs migrations), ensuring tests don't pollute each other's state. Without it, tests that create database records leave data behind that causes subsequent tests to find unexpected rows, producing order-dependent test failures that only appear when the full suite is run.
Group: "Mocking and Faking in Laravel"
  - Subtopic: "Mail::fake() and Queue::fake() for Side Effects"
    Laravel's fake implementations (Mail::fake(), Queue::fake(), Event::fake()) replace real senders/dispatchers during tests with in-memory collectors you can assert against, without actually sending emails or processing jobs. Without fakes, tests that trigger email sends hit real SMTP servers, making tests slow, environment-dependent, and potentially spammy.
  - Subtopic: "Mockery and Service Container Substitution"
    Mockery creates mock objects with expectation assertions, and Laravel's $this->mock() helper binds the mock into the service container for the duration of the test. Without this, testing a class that depends on a third-party payment gateway requires a live connection to the external service, making tests slow, flaky, and impossible to run in offline environments.
Group: "Laravel Forge Deployment"
  - Subtopic: "Zero-Downtime Deploys with Forge and Envoyer"
    Laravel Envoyer (integrates with Forge) deploys to a new release directory and atomically symlinks it as current only after all hooks succeed — meaning users see the old version until the new one is fully ready. Without zero-downtime deployment, the window between file upload and artisan migrate exposes users to 500 errors as new code runs against the old schema.
  - Subtopic: "Environment Variables and Secrets Management"
    Production environment variables should be set on the server (via Forge's environment editor) rather than committed in .env files to repositories — .env files in repos expose API keys and database passwords in git history permanently. Laravel's config caching (php artisan config:cache) requires all config values to come from environment variables, not from .env at runtime.
Group: "CI/CD and Automated Quality Gates"
  - Subtopic: "Running PHPUnit in CI with GitHub Actions"
    Integrating PHPUnit into a GitHub Actions workflow ensures that every pull request is tested against a fresh environment with the correct PHP version and a real test database before merging. Without CI, tests are only run when developers remember to run them locally, leading to broken builds on main and regression bugs that are expensive to diagnose.
  - Subtopic: "PHP Static Analysis with PHPStan or Larastan"
    Larastan (PHPStan for Laravel) performs deep static analysis of your codebase — catching type mismatches, undefined properties, and incorrect method calls before they reach runtime. Running at level 5+ catches the majority of common bugs like calling methods on nullable models, and it integrates directly into CI to block merges on type errors.

Start now with Layer 1.
