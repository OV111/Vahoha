You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: nuxt-dev (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id nuxt-dev-1
Title: JavaScript and TypeScript Foundations
Group: "JavaScript Core Mechanics"
  - Subtopic: "Event Loop and Async Model"
    JavaScript is single-threaded but handles concurrency through the event loop, call stack, and microtask/macrotask queues. Misunderstanding this causes bugs where Promises resolve in unexpected order or async code blocks the UI thread, leading to frozen interfaces and race conditions.
  - Subtopic: "Closures and Scope Chain"
    Closures allow inner functions to retain access to outer scope variables even after the outer function has returned. Misunderstanding closures leads to classic bugs like loop variable capture errors, memory leaks from retained DOM references, and unintended shared mutable state in callbacks.
Group: "TypeScript Type System"
  - Subtopic: "Structural Typing vs Nominal Typing"
    TypeScript uses structural typing — compatibility is determined by shape, not name. This means a class or object literal satisfies an interface as long as it has the required properties. Misunderstanding this causes false confidence when two structurally identical types are semantically different, such as UserId and ProductId both being strings.
  - Subtopic: "Generic Constraints and Inference"
    Generics allow writing reusable, type-safe functions and components without sacrificing specificity. Without understanding constraints (extends) and how TypeScript infers generic types from usage, developers either over-use any defeating the type system, or write overly rigid code that can't be composed.
Group: "Node.js Runtime Essentials"
  - Subtopic: "Module System: ESM vs CommonJS"
    Node.js supports both CommonJS (require/module.exports) and ES Modules (import/export), but they are not fully interoperable. Mixing them without understanding the differences causes runtime errors, breaks tree-shaking in bundlers like Vite, and leads to incorrect default export handling across module boundaries.
  - Subtopic: "Streams and Buffer Handling"
    Node.js streams allow processing data piece-by-piece without loading it all into memory, which is critical for file uploads, HTTP response streaming, and large dataset processing. Ignoring streams and loading entire files into Buffers causes memory exhaustion in production under load.
Group: "Async Patterns in Practice"
  - Subtopic: "Promise Chaining vs async/await"
    async/await is syntactic sugar over Promises that makes asynchronous code read synchronously, but errors in async functions must still be caught. Forgetting to await a Promise inside an async function or mishandling rejected Promises leads to unhandled rejection warnings and silent data loss.
  - Subtopic: "Error Propagation in Async Code"
    Unlike synchronous try/catch, errors in async code only propagate correctly when every async call is awaited. Unawaited Promises swallow errors silently, and Promise.all fails fast without cleanup. Mishandling this in Nuxt server routes causes HTTP 500 responses with no useful error information.

### Layer 2 of 10: id nuxt-dev-2
Title: Vue 3 Fundamentals
Group: "Vue 3 Reactivity System"
  - Subtopic: "ref vs reactive: Choosing the Right Primitive"
    ref wraps a value in a reactive object accessible via .value, while reactive creates a deeply reactive proxy of an object. Misusing them — such as destructuring a reactive object or replacing a ref's container — breaks reactivity silently, causing the template to stop updating when data changes.
  - Subtopic: "computed vs watchEffect: Derived State"
    computed creates cached derived state that only recomputes when its dependencies change, while watchEffect runs a side effect immediately and re-runs on dependency changes. Using watch/watchEffect for values that should be computed introduces bugs from stale caches and unnecessary re-renders.
Group: "Composition API Patterns"
  - Subtopic: "Composables for Logic Reuse"
    Composables are functions that encapsulate and reuse stateful logic by leveraging Vue's reactivity APIs. Unlike mixins, composables have explicit data flow and no namespace collisions. Misunderstanding when reactive state should live inside vs outside a composable leads to shared global state bugs across component instances.
  - Subtopic: "Lifecycle Hooks in Composition API"
    Composition API lifecycle hooks (onMounted, onUnmounted, etc.) must be called synchronously inside setup() to be registered correctly. Placing them inside conditionals or async callbacks means they may not run at all, causing DOM operations to fail or event listeners to never be cleaned up.
Group: "Vue Component Architecture"
  - Subtopic: "Props and Emits Contract"
    Props define the public API a component exposes to parents, while emits define the events it can fire upward. Mutating props directly breaks Vue's unidirectional data flow and causes hard-to-trace reactivity bugs. Proper validation using defineProps with TypeScript types or runtime validators prevents entire classes of integration errors.
  - Subtopic: "Slots and Render Scoping"
    Slots allow parent components to inject template content into child components. Scoped slots expose child data back to the parent's slot template, enabling powerful flexible patterns. Misunderstanding slot scope — particularly which component's data is accessible where — leads to template errors and undefined variable bugs.
Group: "Vite Build Tooling"
  - Subtopic: "HMR and Dev Server Architecture"
    Vite's dev server uses native ES modules in the browser and HMR (Hot Module Replacement) to push changes without full page reloads. Understanding HMR boundaries is critical — modules that export mutable state or use side-effectful imports can cause HMR to trigger full reloads, destroying development speed.
  - Subtopic: "Environment Variables and Modes"
    Vite exposes environment variables prefixed with VITE_ to the client bundle via import.meta.env. Variables without this prefix are server-only and will be undefined in the browser. Accidentally exposing secrets by omitting this distinction can leak API keys into the client JavaScript bundle.

### Layer 3 of 10: id nuxt-dev-3
Title: Nuxt Basics and Routing
Group: "Nuxt Directory Structure"
  - Subtopic: "Auto-imports and File-based Conventions"
    Nuxt automatically imports components, composables, and utilities from their respective directories without explicit import statements. Understanding which directories trigger auto-imports (components/, composables/, utils/) and their scoping rules prevents duplicate imports, naming conflicts, and confusing 'undefined is not a function' errors in templates.
  - Subtopic: "Layouts and pages/ Convention"
    Nuxt uses the pages/ directory with file-system routing and layouts/ for shared page chrome. The NuxtLayout and NuxtPage components are required in app.vue to render them. Skipping these conventions or mixing manual Vue Router configuration with Nuxt's file-based router causes 404 errors and broken navigation.
Group: "File-based Routing"
  - Subtopic: "Dynamic Routes and Catch-all Segments"
    Nuxt generates routes from the pages/ file tree: [id].vue creates a dynamic segment, [...slug].vue creates a catch-all. Misunderstanding route priority — especially when static and dynamic routes coexist — causes the wrong page component to render, and catch-all routes accidentally swallow 404 errors that should propagate.
  - Subtopic: "Nested Routes with NuxtChild"
    Nuxt supports nested routes through directory nesting in pages/ paired with a parent file of the same name containing NuxtPage. Misunderstanding this requires a parent layout file — not just a folder — causes child routes to render as full pages without their parent wrapper, breaking shared UI sections.
Group: "Nuxt Rendering Modes"
  - Subtopic: "SSR vs SSG vs SPA: Choosing the Right Mode"
    Nuxt supports Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Only (SPA) rendering per page via routeRules. Choosing the wrong mode — like SSG for pages with user-specific data — causes stale content to be served to all users from the CDN cache, exposing private data or outdated information.
  - Subtopic: "Hydration and Client/Server Mismatch"
    SSR renders HTML on the server which Vue then hydrates on the client by attaching event listeners to the existing DOM. If client-rendered HTML differs from server-rendered HTML (e.g., due to browser-only APIs or random values), Vue throws hydration mismatch warnings and may re-render the entire component tree, defeating SSR performance gains.
Group: "Nuxt Configuration"
  - Subtopic: "nuxt.config.ts Structure and Layers"
    nuxt.config.ts is the central configuration file controlling modules, runtime config, build options, and Vite/Nitro settings. Nuxt also supports configuration layers for sharing config between apps. Misplacing sensitive secrets in publicRuntimeConfig instead of runtimeConfig.private exposes them to the client-side bundle.
  - Subtopic: "Plugins and App Initialization"
    Nuxt plugins in plugins/ are executed before the Vue app mounts and can extend the app instance, provide global utilities, or register third-party libraries. Plugins prefixed with .server or .client limit execution to one environment. Running browser-only code in a server plugin crashes SSR with 'window is not defined' errors.

### Layer 4 of 10: id nuxt-dev-4
Title: Data Fetching and Rendering
Group: "Nuxt Data Fetching Composables"
  - Subtopic: "useFetch vs useAsyncData: When to Use Each"
    useFetch is a convenience wrapper around useAsyncData + $fetch that deduplicates requests between server and client. useAsyncData gives more control for complex scenarios like transforming data or using non-HTTP sources. Using $fetch directly inside setup() without these wrappers causes double fetching — once on the server and again on the client — doubling API calls and slowing page load.
  - Subtopic: "Keys and Cache Deduplication"
    useAsyncData uses a key to deduplicate and cache requests across SSR and client navigation. If two calls share the same key, only the first executes and the second receives the cached result. Accidentally using duplicate keys with different parameters causes pages to show stale data from a different request's cache.
Group: "Rendering Strategies"
  - Subtopic: "Universal Rendering and Payload Transfer"
    In SSR mode, Nuxt serializes useAsyncData results into an inline JSON payload in the HTML. On the client, this payload is read to hydrate state without re-fetching. Understanding this mechanism is critical because mutating the returned data object directly can corrupt the serialized payload, leading to hydration mismatches on navigation.
  - Subtopic: "Lazy Fetching and Suspense"
    The lazy option in useFetch/useAsyncData returns immediately with pending state instead of blocking page render. This enables streaming and skeleton UIs but requires explicit pending and error state handling in the template. Using lazy without handling the pending state causes brief periods of undefined data being rendered, crashing the page.
Group: "TypeScript in Nuxt Components"
  - Subtopic: "defineProps with TypeScript Generics"
    In Nuxt/Vue 3 with script setup, props can be typed using TypeScript interfaces passed to defineProps<T>(). This provides full type inference for prop usage in templates. Omitting types or using runtime-only validators loses IDE autocompletion and allows passing wrong prop types that fail silently at runtime.
  - Subtopic: "Auto-generated Types from Nuxt"
    Nuxt generates TypeScript types for routes, server API endpoints, and runtime config into .nuxt/types/. These types provide end-to-end type safety from the server route handler to useFetch response. Not running nuxt prepare (or having it in dev watch mode) means these generated types go stale, causing false type errors or missing type safety on API responses.
Group: "Server Routes and API Handlers"
  - Subtopic: "server/api/ Route Conventions"
    Nuxt server routes in server/api/ are powered by Nitro and support HTTP method-specific file naming like [id].get.ts and [id].post.ts. These routes run exclusively on the server and have access to Node.js APIs. Confusing client composables with server route handlers — such as calling useRuntimeConfig() in a route expecting browser context — causes runtime crashes.
  - Subtopic: "Event Handling with H3"
    Nuxt's server layer uses H3 (the HTTP framework underlying Nitro) to handle requests via event objects. Helpers like readBody, getQuery, and setCookie operate on the H3 event. Not understanding that each request is a stateless H3 event — and not a persistent Express-style req object — leads to incorrect state management in API routes.

### Layer 5 of 10: id nuxt-dev-5
Title: Server Engine with Nitro
Group: "Nitro Server Engine"
  - Subtopic: "Nitro's Universal Deployment Model"
    Nitro compiles Nuxt's server into a standalone, deployable output that targets multiple runtimes: Node.js, Deno, Cloudflare Workers, Vercel Edge, and more. This is achieved through a preset system that polyfills or removes Node.js-specific APIs. Using Node.js-only APIs (like fs or process.env) without checking preset compatibility causes deployment failures on edge runtimes.
  - Subtopic: "Nitro Plugins and Server Middleware"
    Nitro supports plugins (server/plugins/) for one-time initialization like connecting to databases, and middleware (server/middleware/) that runs on every request. Unlike Nuxt client plugins, these run in the server context only. Blocking the Nitro plugin initialization with a failed DB connection causes the entire server to fail to start.
Group: "Server-Side Caching with Nitro"
  - Subtopic: "cachedEventHandler and Route Caching"
    Nitro's cachedEventHandler wraps a server route with configurable caching (in-memory, Redis, or filesystem) keyed by request parameters. This dramatically reduces database load for read-heavy endpoints. Not invalidating the cache after data mutations causes stale API responses to persist until the cache TTL expires, showing outdated data to users.
  - Subtopic: "Storage Layer with unstorage"
    Nitro includes a built-in storage abstraction powered by unstorage that works with multiple backends (memory, Redis, filesystem, Cloudflare KV) through a unified API. This prevents vendor lock-in at the storage layer. Hardcoding Redis-specific client calls instead of using the storage layer makes switching deployment targets require rewriting server logic.
Group: "TypeScript in Server Context"
  - Subtopic: "Typed Request Bodies and Query Params"
    H3's readBody and getQuery return untyped objects by default. Using Zod or TypeScript generics to validate and type these at the entry point of every server route prevents invalid data from propagating into business logic and database queries. Skipping validation means malformed requests can cause unhandled exceptions or SQL injection vectors.
  - Subtopic: "useRuntimeConfig for Server Secrets"
    Nuxt's useRuntimeConfig() composable exposes runtime config on both client and server, but secrets defined under runtimeConfig (without public) are only available server-side. Accessing runtimeConfig.secret on the client returns undefined. Misunderstanding this leads to server API keys being undefined in routes — or worse, accidentally placing them under runtimeConfig.public.
Group: "Node.js in Server Routes"
  - Subtopic: "File System Access in Server Routes"
    Nuxt server routes running on Node.js can use fs, path, and other Node.js core modules for file operations. However, these APIs are unavailable on edge runtimes. Structuring code to conditionally use Node.js APIs behind runtime checks, or abstracting via Nitro's storage layer, is required for portable server code.
  - Subtopic: "Environment Variable Access Patterns"
    In Nitro/Node.js, process.env provides access to environment variables at runtime, but in Nuxt the preferred pattern is runtimeConfig backed by .env files. Directly calling process.env bypasses Nuxt's type-safe config layer and fails silently (returning undefined) when variables are missing, rather than throwing a config validation error.

### Layer 6 of 10: id nuxt-dev-6
Title: Databases and Persistence
Group: "Database Integration Patterns"
  - Subtopic: "Drizzle ORM Schema Definition"
    Drizzle ORM uses TypeScript to define database schemas as code, enabling full type inference for queries without code generation. The schema becomes the single source of truth for both types and migrations. Defining schemas inconsistently — such as using different column names in schema vs. queries — causes TypeScript errors in queries and runtime SQL failures.
  - Subtopic: "Drizzle Migrations Workflow"
    Drizzle Kit generates SQL migration files from schema changes via drizzle-kit generate, which are then applied with drizzle-kit migrate. Unlike Prisma, there is no automatic migration on app startup. Forgetting to run migrations after deploying schema changes causes runtime SQL errors when the app queries columns that don't exist in the database yet.
Group: "PostgreSQL Fundamentals"
  - Subtopic: "Connection Pooling in Serverless Environments"
    Traditional PostgreSQL connections are persistent and expensive. In serverless or edge environments where function instances spin up and down, creating a new DB connection per request exhausts the PostgreSQL max_connections limit quickly. Using a connection pooler like PgBouncer or Neon's serverless driver is essential to prevent connection exhaustion.
  - Subtopic: "Transactions and ACID Guarantees"
    PostgreSQL transactions group multiple operations so they either all succeed or all fail atomically. In Nuxt server routes performing multi-step writes (e.g., create user + create profile), omitting transactions means a partial failure leaves the database in an inconsistent state that is difficult to detect and correct.
Group: "Nuxt and Database Architecture"
  - Subtopic: "Database Client Singleton Pattern"
    In Node.js, importing a module returns the same cached instance across the app. This makes it safe to create a single Drizzle/Postgres client in a utility file and import it across server routes. However, in serverless environments each cold start creates a new instance, requiring connection pooling. Not understanding this distinction leads to connection leaks in serverless deployments.
  - Subtopic: "Row-Level Security and Multi-tenancy"
    PostgreSQL Row-Level Security (RLS) policies enforce data access control at the database layer, preventing one tenant from reading another's data even if application-level checks fail. Using RLS as a defense-in-depth layer — rather than relying solely on WHERE clauses in server routes — provides protection against SQL injection and application logic bugs.
Group: "Query Optimization"
  - Subtopic: "N+1 Query Problem with Drizzle"
    N+1 occurs when fetching a list of records and then issuing a separate query per record to load related data, e.g., fetching 100 posts then 100 separate author queries. Drizzle's relational query API (db.query) with the with option performs JOINs or batched queries to avoid this, and not using it causes severe database performance degradation under load.
  - Subtopic: "Index Strategy for Common Query Patterns"
    PostgreSQL uses indexes to avoid full table scans on large tables. Columns frequently used in WHERE, ORDER BY, or JOIN conditions should be indexed. Not adding indexes on foreign key columns and filter columns causes queries that are fast in development with small datasets to become unacceptably slow in production with millions of rows.

### Layer 7 of 10: id nuxt-dev-7
Title: State and Authentication
Group: "Pinia State Management"
  - Subtopic: "Store Definition: Options vs Setup Syntax"
    Pinia supports both Options Store (defineStore with state/getters/actions object) and Setup Store (defineStore with a setup function using refs and computed). Setup stores offer full Composition API power including composables, but require manual return statements. Forgetting to return reactive values from a setup store makes them inaccessible to components, causing undefined errors.
  - Subtopic: "Store Hydration in SSR"
    In Nuxt SSR, Pinia stores must be hydrated with server-fetched data to prevent the client from re-fetching on page load. The @pinia/nuxt module handles serializing store state into the Nuxt payload. Not understanding this can lead to double API calls or hydration mismatches when store state differs between server and client.
Group: "Authentication Patterns"
  - Subtopic: "nuxt-auth-utils Session Model"
    nuxt-auth-utils provides sealed cookie-based sessions using iron-session under the hood, exposing useUserSession() composable on both client and server. Sessions are encrypted and verified server-side on every request. Storing sensitive data client-side in localStorage instead of server-managed sessions exposes it to XSS attacks and token theft.
  - Subtopic: "Route Protection with Middleware"
    Nuxt route middleware (middleware/) runs before navigation on the client and before rendering on the server for universal middleware. Auth guards belong in named middleware applied per-page or globally. Using only client-side guards leaves server-rendered pages accessible to unauthenticated users who bypass JavaScript, leaking protected HTML.
Group: "TypeScript with Pinia"
  - Subtopic: "Typing Store State and Actions"
    Pinia infers TypeScript types from the state factory function and action return types automatically. Explicitly typing complex state shapes using interfaces prevents components from passing wrong data types to store actions. Without typed stores, refactoring actions or state shape becomes dangerous as TypeScript can't catch call-site mismatches.
  - Subtopic: "Store Getters as Computed Properties"
    Pinia getters are equivalent to Vuex getters or Vue computed properties — they are cached based on their reactive dependencies and recompute only when dependencies change. Using a regular function on the store object instead of a getter loses caching, causing expensive computations to run on every access instead of only when data changes.
Group: "Security Considerations"
  - Subtopic: "CSRF Protection in Nuxt"
    Cookie-based sessions are vulnerable to Cross-Site Request Forgery unless protected. nuxt-auth-utils's sealed sessions combined with SameSite=Lax cookie attributes mitigate most CSRF attacks. For state-changing operations, adding a server-side CSRF token check or using SameSite=Strict provides full protection. Omitting these allows malicious sites to make authenticated requests on behalf of logged-in users.
  - Subtopic: "Password Hashing with bcrypt/argon2"
    User passwords must never be stored in plaintext or with weak hashing algorithms like MD5/SHA1. bcrypt and argon2 are purpose-built slow hashing algorithms with configurable work factors that resist brute-force and rainbow table attacks. Using fast hash functions for passwords means a database breach immediately exposes all user passwords.

### Layer 8 of 10: id nuxt-dev-8
Title: Modules and Advanced Patterns
Group: "Nuxt Module System"
  - Subtopic: "Building Custom Nuxt Modules"
    Nuxt modules extend the framework by hooking into the build lifecycle via defineNuxtModule, addPlugin, addComponent, and addImports helpers. Modules run at build time, not runtime. Writing build-time logic that assumes runtime context (like accessing the database) in a module causes build failures and misplaced side effects.
  - Subtopic: "Using Community Modules Safely"
    Nuxt's module ecosystem (nuxt.com/modules) provides integrations for UI libraries, CMS, auth, analytics, and more. Modules add configuration, plugins, composables, and build hooks automatically. Adding too many modules without understanding their impact inflates bundle size and SSR overhead — each module's plugin runs on every request.
Group: "Advanced Vue Patterns"
  - Subtopic: "Render Functions and JSX in Vue 3"
    Vue 3 supports render functions using h() and JSX as alternatives to templates for programmatic component creation. Render functions bypass template compilation and access the virtual DOM directly, enabling dynamic component trees that are impossible with static templates. Misusing them without understanding the reactivity implications produces components that never update.
  - Subtopic: "Teleport for Portal Rendering"
    Vue's Teleport component renders its slot content into a different DOM node than its logical position in the component tree, enabling modals, toasts, and tooltips to escape overflow:hidden or z-index stacking contexts. Without Teleport, overlays rendered inside deeply nested components are clipped or hidden behind other elements due to CSS stacking context rules.
Group: "TypeScript Advanced Patterns"
  - Subtopic: "Conditional Types and Template Literals"
    TypeScript conditional types (T extends U ? X : Y) enable type-level branching to create precise return type annotations based on input types. Combined with template literal types, they model complex API shapes where the response type depends on the request parameters. Without these, API response types must be manually cast with as, hiding bugs.
  - Subtopic: "Declaration Merging and Module Augmentation"
    TypeScript allows extending existing type declarations through module augmentation, which is how Nuxt plugins add properties to the NuxtApp instance in a type-safe way. Without augmenting the correct interface, accessing plugin-injected properties causes TypeScript errors even though they exist at runtime, or requires unsafe any casts.
Group: "Nuxt Hooks and Lifecycle"
  - Subtopic: "App Hooks vs Build Hooks"
    Nuxt provides two hook systems: app hooks that run at runtime (app:created, page:finish, etc.) accessible via the Nuxt instance, and build hooks that run during nuxt build or nuxt dev (build:before, modules:done, etc.) accessible in modules and nuxt.config. Confusing the two and trying to hook into app lifecycle events from a module hook causes the callback to never fire.
  - Subtopic: "useNuxtApp for Plugin Communication"
    useNuxtApp() provides access to the shared Nuxt application instance, including plugins, provide/inject values, hooks, and SSR payload. It is the official way for composables to access app-level context set up by plugins. Using global variables or module-level state instead of useNuxtApp() breaks in SSR where each request has its own app instance.

### Layer 9 of 10: id nuxt-dev-9
Title: Performance and SEO
Group: "Web Performance Fundamentals"
  - Subtopic: "Core Web Vitals: LCP, CLS, INP"
    Core Web Vitals are Google's standardized performance metrics: Largest Contentful Paint (LCP) measures loading speed, Cumulative Layout Shift (CLS) measures visual stability, and Interaction to Next Paint (INP) measures responsiveness. These metrics directly affect Google search ranking. Optimizing for traditional metrics like Time to First Byte without addressing LCP still results in poor user experience scores.
  - Subtopic: "Critical Rendering Path Optimization"
    The critical rendering path is the sequence of steps the browser takes from HTML to rendered pixels: HTML parsing, CSSOM construction, render tree, layout, and paint. Render-blocking resources (scripts without defer/async, synchronous CSS) stall this process. Understanding which resources block the path allows targeted optimization to improve First Contentful Paint.
Group: "Nuxt Performance Optimization"
  - Subtopic: "Lazy Loading Components and Routes"
    Nuxt auto-splits pages into separate chunks, but large components imported directly are bundled into the main chunk. Using defineAsyncComponent() or lazy: true in defineComponent delays loading until the component is needed, reducing initial bundle size. Not lazy-loading heavy components like rich text editors causes large JavaScript bundles that delay interactivity.
  - Subtopic: "Image Optimization with nuxt/image"
    The @nuxt/image module provides automatic image optimization: WebP/AVIF conversion, responsive srcset generation, lazy loading, and CDN integration. Serving unoptimized images is often the largest contributor to poor LCP scores and excessive bandwidth usage. Without optimization, a single hero image can add multiple megabytes to page weight.
Group: "SEO in Nuxt"
  - Subtopic: "useHead and Meta Tag Management"
    Nuxt's useHead composable (powered by unhead) manages document head tags reactively — title, meta, link, script — with full SSR support. Meta tags must be set server-side for search engines and social media scrapers to read them, as these crawlers often don't execute JavaScript. Using client-only head updates means OG tags are missing when pages are shared on social media.
  - Subtopic: "Structured Data and JSON-LD"
    JSON-LD structured data embedded in page head tells search engines about content type (Article, Product, BreadcrumbList) enabling rich search result features like stars, prices, and breadcrumbs. Nuxt's useHead or useSchemaOrg (via nuxt-schema-org) makes this type-safe. Missing structured data means missing out on rich snippets that significantly improve click-through rates.
Group: "Vite Build Optimization"
  - Subtopic: "Bundle Analysis and Tree Shaking"
    Vite's production build uses Rollup with tree shaking to eliminate unused code. Libraries that use CommonJS or side-effectful imports cannot be tree-shaken effectively, inflating bundle size. Using rollup-plugin-visualizer or vite-bundle-analyzer reveals which modules dominate bundle size, enabling targeted replacements with lighter alternatives.
  - Subtopic: "Code Splitting Strategy"
    Vite automatically splits vendor code and async imports into separate chunks. Manual chunk splitting via build.rollupOptions.output.manualChunks controls which modules are grouped, reducing duplicate vendor code across page chunks. Without manual chunk configuration, each page bundle may include the same large library, multiplying download size for users navigating between pages.

### Layer 10 of 10: id nuxt-dev-10
Title: Testing and Deployment
Group: "Unit Testing with Vitest"
  - Subtopic: "Testing Vue Components with @vue/test-utils"
    @vue/test-utils provides mount and shallowMount to render Vue components in a test environment. Testing that a component renders correctly, responds to user events, and emits the right values catches regressions without running a browser. Not testing component behavior under different prop combinations leads to production bugs from edge-case prop values.
  - Subtopic: "Mocking in Vitest: vi.mock and Spies"
    Vitest's vi.mock() replaces module imports with controlled stubs, enabling tests to isolate the unit under test from external dependencies like API calls or Pinia stores. Spy functions (vi.spyOn) verify that specific functions were called with expected arguments. Testing without mocking causes tests to depend on external services, making them slow and flaky.
Group: "Testing Nuxt-specific Code"
  - Subtopic: "nuxt/test-utils for Integration Testing"
    @nuxt/test-utils provides utilities to spin up a real Nuxt app instance in tests, enabling testing of server routes, middleware, and SSR behavior with actual HTTP requests. Unlike unit tests with mocks, integration tests catch issues that arise from real module interactions, such as incorrect middleware order or broken server API responses.
  - Subtopic: "Testing Composables with Pinia"
    Pinia stores must be initialized with createPinia() before testing composables that use them. @pinia/testing provides createTestingPinia() which creates a fresh store instance with optional initial state and stubbed actions. Using a shared store instance across tests causes test pollution where one test's store mutations affect subsequent tests.
Group: "End-to-End Testing with Playwright"
  - Subtopic: "Playwright Test Architecture"
    Playwright runs real browser instances (Chromium, Firefox, WebKit) and automates user interactions through a high-level API. Tests can assert on network requests, localStorage, and visual snapshots. Without E2E tests covering critical user flows like login and checkout, regressions in these paths only surface in production, causing revenue-impacting outages.
  - Subtopic: "Page Object Model Pattern"
    The Page Object Model (POM) encapsulates page-specific selectors and interactions in a class, keeping test files clean and selectors maintainable. When a UI element changes, updating one POM class fixes all tests that use it. Writing selectors inline throughout test files causes brittle tests that require updating dozens of test files when a single element changes.
Group: "Deployment and CI/CD"
  - Subtopic: "Nuxt Deployment Targets and Presets"
    Nuxt builds different output formats based on the target deployment platform: Node.js server, static hosting, Vercel, Netlify, Cloudflare, and more. Each preset configures Nitro's output appropriately. Deploying a Node.js build to a static CDN causes all dynamic server routes to return 404, and deploying SSR to a static host serves blank pages without JavaScript.
  - Subtopic: "CI/CD Pipeline for Nuxt Apps"
    A proper CI/CD pipeline for Nuxt runs type checking (nuxi typecheck), linting, unit tests, E2E tests, and build verification on every pull request before merging. Skipping the build step in CI means broken builds that fail to compile only surface during deployment, blocking releases and requiring rushed hotfixes under pressure.

Start now with Layer 1.
