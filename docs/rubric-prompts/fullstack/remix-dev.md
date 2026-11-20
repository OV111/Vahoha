You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: remix-dev (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id remix-dev-1
Title: TypeScript and React Foundations
Group: "TypeScript Core Concepts"
  - Subtopic: "Type Inference and Annotation"
    TypeScript infers types from context but explicit annotations are required at function boundaries and complex data structures. Relying solely on inference at API edges causes silent any-type propagation, which defeats type safety and hides runtime bugs until production.
  - Subtopic: "Generics and Utility Types"
    Generics allow type-safe reuse of logic across different data shapes. Utility types like Partial, Pick, and Omit are essential for typing Remix loader return values and form data without duplicating interface definitions. Ignoring them forces unsafe type casting.
Group: "React Fundamentals"
  - Subtopic: "Component Rendering and the Virtual DOM"
    React's reconciliation algorithm compares virtual DOM trees to minimize real DOM mutations. Misunderstanding this leads to unnecessary re-renders, broken key props, and stale closures in event handlers — all common sources of subtle UI bugs in larger applications.
  - Subtopic: "Hooks: useState, useEffect, useRef"
    Hooks encode React's rules about side effects and state co-location. Misusing useEffect for synchronous derived state, or forgetting dependency arrays, creates infinite loops and stale data — problems that Remix's loader pattern is specifically designed to eliminate in most cases.
Group: "Node.js for Remix"
  - Subtopic: "Node.js Module System and ESM"
    Remix runs on Node.js and increasingly uses ES Modules. Mixing CommonJS require() and ESM import/export in the same project causes hard-to-debug runtime errors and breaks tree-shaking. Understanding module resolution is critical before adding server-side Remix code.
  - Subtopic: "Async/Await and the Event Loop"
    Remix loaders and actions are async functions that run on the server. Blocking the event loop with synchronous I/O or mishandling Promise rejection causes the entire server to stall or crash. Proper async patterns are non-negotiable for reliable data fetching.
Group: "Development Tooling"
  - Subtopic: "tsconfig.json and Strict Mode"
    Remix projects rely on tsconfig paths for route module resolution. Enabling strict mode catches null/undefined bugs at compile time that would otherwise surface as runtime 500 errors in production. Skipping strictNullChecks is the single largest source of TypeScript false confidence.
  - Subtopic: "Vite and HMR in Remix"
    Remix uses Vite as its build tool, which provides fast Hot Module Replacement during development. Misunderstanding how Vite separates server and client bundles leads to importing server-only code into the browser, causing cryptic build errors or security leaks.

### Layer 2 of 10: id remix-dev-2
Title: Remix Basics and Routing
Group: "File-Based Routing"
  - Subtopic: "Route File Naming Conventions"
    Remix uses a file-based routing system where dots in filenames define URL segments and underscores create pathless layout routes. Misreading the naming convention results in routes that never match or layouts that wrap the wrong pages, causing broken navigation at scale.
  - Subtopic: "Nested Routes and Outlet"
    Remix's nested routing maps URL hierarchy to component hierarchy through the Outlet component. Forgetting an Outlet causes child routes to silently fail to render, while incorrect nesting produces layouts that duplicate headers or footers unexpectedly across views.
Group: "Navigation and Links"
  - Subtopic: "Link vs NavLink and Prefetching"
    Remix's Link component uses client-side navigation and supports prefetch hints (intent, render, viewport) that preload route data on hover. Using plain anchor tags bypasses this system entirely, causing full page reloads and destroying Remix's performance model.
  - Subtopic: "useNavigate and Programmatic Navigation"
    useNavigate provides imperative navigation for post-action redirects and conditional flows. Using it inside loaders or outside event handlers violates React's rendering contract and causes navigation to fire on every render, creating infinite redirect loops.
Group: "Route Params and Search"
  - Subtopic: "Dynamic Segments and useParams"
    Dynamic route segments (e.g. $userId) capture URL path values accessible in both loaders and components. Failing to validate these params before database queries is a security risk, as attackers can inject arbitrary values to probe your data layer.
  - Subtopic: "useSearchParams for Query Strings"
    useSearchParams provides reactive access to URL query parameters and a setter that triggers navigation. Mutating search params via direct window.location manipulation bypasses Remix's state management, causing loaders to not re-run and leaving the UI stale.
Group: "Remix App Structure"
  - Subtopic: "root.tsx and App Shell"
    root.tsx is the top-level route that renders the HTML shell including Scripts, LiveReload, and ScrollRestoration components. Omitting the Scripts component breaks all client-side JavaScript hydration, making the app appear to work server-side but fail all interactions.
  - Subtopic: "remix.config.js and vite.config.ts"
    Remix's configuration controls server adapter, future flags, and route directories. Enabling future flags one at a time is the correct migration path; toggling them all at once in an existing project frequently breaks route resolution and loader behavior simultaneously.

### Layer 3 of 10: id remix-dev-3
Title: Loaders and Data Loading
Group: "Loader Fundamentals"
  - Subtopic: "The loader Function Contract"
    A Remix loader receives a LoaderFunctionArgs object and must return a Response or serializable data. Returning non-serializable values like class instances or circular references causes JSON serialization to fail silently, resulting in undefined data in useLoaderData on the client.
  - Subtopic: "json() Helper and Response Objects"
    Remix's json() utility creates a Response with the correct Content-Type header and serializes data. Returning a raw object without json() works in development but breaks when loaders need to set custom headers or status codes, making error handling inconsistent across routes.
Group: "Parallel and Dependent Loading"
  - Subtopic: "Parallel Loaders Across Nested Routes"
    Remix runs all matched route loaders in parallel, not sequentially. Designing parent routes to fetch shared data (like user session) avoids waterfalls where child routes wait for parent data. Misunderstanding this leads to re-fetching the same data in every child loader unnecessarily.
  - Subtopic: "Deferred Data with defer() and Await"
    The defer() utility allows loaders to return a mix of resolved and streaming data, letting the page shell render immediately while slow data loads. Awaiting all promises before returning blocks the initial HTML response and degrades perceived performance on slow network connections.
Group: "Type-Safe Data Loading"
  - Subtopic: "Typing useLoaderData with TypeOf"
    Remix infers loader return types automatically when you use typeof loader in useLoaderData<typeof loader>(). Manually duplicating type definitions for loader data creates drift where the type and the actual data diverge silently after refactors, breaking UI rendering assumptions.
  - Subtopic: "Loader Caching and HTTP Cache Headers"
    Remix loaders can set Cache-Control headers on their Response to enable CDN caching at the edge. Ignoring cache headers means every user request hits the origin server even for static data, which collapses under traffic and increases server costs unnecessarily.
Group: "Request and URL Access"
  - Subtopic: "Accessing request.url and URLSearchParams"
    Loaders receive the full Request object, giving access to URL, headers, and cookies. Parsing query parameters via regex or string splitting instead of URL/URLSearchParams mishandles edge cases like encoded characters and multi-value params, producing incorrect filter or sort behavior.
  - Subtopic: "throw redirect() for Authorization Guards"
    Throwing a redirect() Response from a loader is the idiomatic Remix pattern for protecting routes. Using imperative navigation hooks inside loader logic or returning null to signal unauthorized access leads to components rendering with empty data instead of bouncing users to login.

### Layer 4 of 10: id remix-dev-4
Title: Actions, Forms, and Mutations
Group: "Action Functions"
  - Subtopic: "The action Function and FormData"
    Remix actions receive the same LoaderFunctionArgs and parse mutations from request.formData(). Treating FormData like a plain object and using bracket notation without get() returns undefined for all fields, silently discarding submitted data and making forms appear broken.
  - Subtopic: "useActionData for Validation Feedback"
    useActionData returns the data returned from the action after submission. Returning validation errors from the action and displaying them via useActionData is the Remix pattern for inline form errors. Using client-only state for this breaks the progressive enhancement model and loses errors on navigation.
Group: "Progressive Enhancement"
  - Subtopic: "Form vs form and JavaScript-Optional Design"
    Remix's Form component enhances native HTML forms with client-side submission while preserving server-side functionality without JavaScript. Relying on onClick handlers for form logic instead of action attributes makes the app completely non-functional when JavaScript fails to load.
  - Subtopic: "useFetcher for Non-Navigation Mutations"
    useFetcher submits data to loaders and actions without triggering navigation, enabling patterns like inline edits and toggle buttons. Using fetch() directly for mutations bypasses Remix's revalidation system, leaving other route data stale until a full page reload.
Group: "Optimistic UI"
  - Subtopic: "useNavigation and Pending States"
    useNavigation exposes the current navigation state (idle, submitting, loading) for showing global pending indicators. Implementing custom loading state with useState instead misses navigation-triggered reloads and leaves users without feedback during slow server responses.
  - Subtopic: "Optimistic Updates with useFetcher"
    useFetcher.formData contains the submitted form data before the server responds, enabling optimistic UI that reflects changes immediately. Skipping optimistic updates in high-interaction UIs (toggles, likes, checkboxes) creates laggy experiences that feel broken on normal latency connections.
Group: "Method and Intent Handling"
  - Subtopic: "HTTP Methods in Remix Actions"
    HTML forms only support GET and POST, so Remix actions conventionally use hidden intent fields to distinguish between create, update, and delete operations within a single action function. Routing all mutations through separate endpoints loses Remix's automatic revalidation and complicates server logic.
  - Subtopic: "Post/Redirect/Get Pattern"
    Returning a redirect() from an action after a successful mutation prevents double-submission on browser refresh. Returning data directly from a successful action instead of redirecting means refreshing the page resubmits the form, duplicating database records or triggering idempotency violations.

### Layer 5 of 10: id remix-dev-5
Title: Databases and Persistence
Group: "Prisma ORM Fundamentals"
  - Subtopic: "Prisma Schema and Data Modeling"
    The Prisma schema is the single source of truth for both the database structure and TypeScript types. Modifying the database directly without updating the schema causes type drift where Prisma's generated client no longer matches the actual tables, producing runtime query failures masked by type errors.
  - Subtopic: "PrismaClient Singleton Pattern"
    In development, Vite's HMR creates new module instances on each hot reload, causing too many database connections if PrismaClient is instantiated at module level. The singleton pattern using a global variable prevents connection pool exhaustion during development.
Group: "Querying with Prisma"
  - Subtopic: "findUnique, findMany, and Select"
    Prisma's select option restricts which fields are returned from a query, reducing data transfer and preventing accidental exposure of sensitive fields like password hashes. Using findMany without select on large tables returns unbounded result sets that exhaust memory under load.
  - Subtopic: "Transactions and Atomic Operations"
    Prisma's interactive and batch transactions ensure multiple database operations succeed or fail together. Performing related writes without a transaction (e.g., creating a user then their profile) risks partial failure states where the database is left in an inconsistent condition.
Group: "SQLite in Development"
  - Subtopic: "SQLite Limitations and Production Parity"
    SQLite lacks full support for ALTER TABLE operations and concurrent writes. Running SQLite in development while using PostgreSQL in production causes migrations that work locally to fail in CI because SQLite silently ignores certain column constraints that Postgres enforces strictly.
  - Subtopic: "Prisma Migrate and Schema Drift"
    prisma migrate dev generates SQL migration files that version the schema changes. Editing the database directly without running migrations causes schema drift that breaks prisma migrate deploy in production, requiring manual reconciliation that risks data loss.
Group: "Data Access Patterns"
  - Subtopic: "Repository Pattern with Remix Loaders"
    Separating database query logic into dedicated model/repository functions keeps loaders thin and testable. Embedding complex Prisma queries directly inside loader functions makes them impossible to unit test without a live database and couples routing logic to persistence concerns.
  - Subtopic: "Seeding and Test Databases"
    Prisma's seed script (prisma/seed.ts) populates a fresh database with known data for development and testing. Running tests against a shared development database causes flaky tests because data mutated by one test affects others, making failures non-reproducible.

### Layer 6 of 10: id remix-dev-6
Title: Authentication and Sessions
Group: "Session Management"
  - Subtopic: "createCookieSessionStorage"
    Remix's createCookieSessionStorage stores session data in signed, encrypted cookies using a secret. Storing sensitive data in unsigned cookies or using a weak/static secret allows attackers to forge sessions and impersonate any user, representing a critical authentication vulnerability.
  - Subtopic: "commitSession and destroySession"
    Session changes only persist when commitSession() is called and the resulting Set-Cookie header is returned in the Response. Forgetting to commit the session after setting flash messages or updating user data silently discards changes, creating confusion where login appears to succeed but state is lost.
Group: "Password and User Auth"
  - Subtopic: "Hashing Passwords with bcrypt"
    Passwords must be hashed with a slow, salted algorithm like bcrypt before storage. Storing plain text passwords or using fast hashing algorithms like MD5 means a single database breach exposes all user credentials immediately, with no time to force password resets.
  - Subtopic: "Timing-Safe Comparisons"
    Standard string equality checks return early on the first mismatched character, leaking timing information that allows attackers to enumerate valid usernames. Using crypto.timingSafeEqual or bcrypt.compare (which is inherently timing-safe) prevents user enumeration attacks on login forms.
Group: "Cookie Security"
  - Subtopic: "HttpOnly, Secure, and SameSite Attributes"
    Session cookies must set HttpOnly to prevent JavaScript access, Secure to restrict transmission to HTTPS, and SameSite=Lax or Strict to prevent CSRF attacks. Missing any of these attributes exposes session tokens to XSS exfiltration or cross-site request forgery depending on which is omitted.
  - Subtopic: "Flash Messages via Session"
    Remix sessions support flash values that are automatically deleted after being read once, ideal for one-time success or error messages after redirect. Storing flash data in URL query params instead exposes message content in browser history and server logs, and fails for messages that contain sensitive text.
Group: "OAuth and Third-Party Auth"
  - Subtopic: "remix-auth and Strategy Pattern"
    remix-auth provides a strategy-based authentication framework that handles OAuth flows, callback verification, and session persistence in a composable way. Rolling custom OAuth implementations without this abstraction routinely mishandles state parameters and PKCE verification, creating authorization code interception vulnerabilities.
  - Subtopic: "CSRF Protection in Remix Actions"
    Remix's SameSite cookie attribute provides baseline CSRF protection, but custom token validation is still required for APIs that accept cross-origin requests. Relying only on SameSite without understanding its browser compatibility exceptions (especially with subdomain sharing) leaves form actions exploitable.

### Layer 7 of 10: id remix-dev-7
Title: Error Handling and Resilience
Group: "Error Boundaries"
  - Subtopic: "ErrorBoundary in Route Modules"
    Each Remix route module can export an ErrorBoundary that catches errors thrown during rendering, loading, or actions for that route subtree only. Without route-level boundaries, any uncaught error destroys the entire page rather than just the failing section, severely impacting UX for unrelated parts of the app.
  - Subtopic: "useRouteError and isRouteErrorResponse"
    useRouteError returns the thrown value inside an ErrorBoundary, and isRouteErrorResponse distinguishes between thrown Response objects (expected errors like 404) and unexpected JavaScript errors. Treating all errors identically shows generic messages for expected 404s and leaks stack traces for unexpected ones.
Group: "Throwing Responses"
  - Subtopic: "throw new Response() for Expected Errors"
    Throwing a Response with a 4xx status from a loader communicates expected error conditions (not found, forbidden) to the ErrorBoundary without triggering unexpected error paths. Returning null for missing resources instead causes components to render with undefined data, producing cryptic type errors rather than clean error UIs.
  - Subtopic: "404 Handling with Splat Routes"
    A splat route file ($.tsx) catches all unmatched URLs and renders a custom 404 page. Without it, Remix falls through to the root ErrorBoundary for not-found URLs, showing a generic error instead of a helpful 'page not found' experience that preserves site navigation.
Group: "Resilience Patterns"
  - Subtopic: "Retry Logic and Exponential Backoff"
    External API calls from Remix loaders should implement retry with exponential backoff for transient failures. Immediate re-throwing of network errors without retry causes unnecessary user-facing failures for temporary outages, while retrying without backoff floods failing services and worsens their recovery time.
  - Subtopic: "Timeout Patterns with AbortController"
    Loader fetch calls should use AbortController with setTimeout to enforce maximum response times. Without timeouts, a slow external service holds the Remix server request open indefinitely, consuming connection pool slots and eventually causing cascading failures across all concurrent requests.
Group: "Logging and Observability"
  - Subtopic: "Structured Error Logging on the Server"
    Errors caught in Remix loaders and actions should be logged with structured context (user ID, route, request ID) before being rethrown or converted to user-facing responses. Logging only error messages without context makes production debugging near-impossible when errors are intermittent.
  - Subtopic: "entry.server.tsx and handleError"
    Remix's entry.server.tsx handleError export is the global catch point for unhandled server errors. Connecting it to an error monitoring service (like Sentry) here ensures all unexpected crashes are captured before they are swallowed by the error boundary rendering path.

### Layer 8 of 10: id remix-dev-8
Title: Advanced Data Patterns
Group: "Advanced Loader Patterns"
  - Subtopic: "Revalidation and shouldRevalidate"
    Remix revalidates all active loaders after any action by default. Exporting shouldRevalidate from a route module allows skipping unnecessary refetches for routes whose data cannot have changed. Disabling revalidation incorrectly causes UI to show stale data after mutations, creating subtle data consistency bugs.
  - Subtopic: "useLoaderData vs useRouteLoaderData"
    useRouteLoaderData accesses data from any ancestor route's loader by route ID, enabling deeply nested components to consume parent loader data without prop drilling. Using useLoaderData in a component that is not a direct route module throws a runtime error because there is no associated loader in that context.
Group: "Advanced Prisma Patterns"
  - Subtopic: "Pagination with cursor-based vs offset"
    Cursor-based pagination (using a unique field as a cursor) scales to millions of rows without degrading query performance. Offset-based pagination using skip/take causes full table scans that grow linearly with page depth, making page 500 take orders of magnitude longer than page 1.
  - Subtopic: "N+1 Queries and include vs select"
    Prisma's include fetches relations in separate queries joined in application code, which can become an N+1 problem in loops. Using select with nested relation fields or Prisma's fluent API consolidates queries, preventing performance cliffs where listing 100 items triggers 101 database round-trips.
Group: "Data Validation"
  - Subtopic: "Zod for Schema Validation"
    Zod validates and parses FormData or JSON from actions and loaders at runtime, ensuring server data matches TypeScript types. Trusting TypeScript types alone without runtime validation means malformed or malicious inputs reach database queries unchecked, enabling injection attacks or corrupted records.
  - Subtopic: "conform for Type-Safe Forms"
    The conform library bridges Zod schemas and HTML forms with accessible error binding and progressive enhancement support. Building custom form validation without it leads to inconsistent error message patterns, missing ARIA attributes for screen readers, and validation that only works with JavaScript enabled.
Group: "Multi-tenancy Patterns"
  - Subtopic: "Row-Level Security via Loader Guards"
    Every loader that fetches user-specific data must scope Prisma queries to the authenticated user's ID. Fetching by resource ID alone without verifying ownership allows horizontal privilege escalation, where any logged-in user can read or modify any other user's data by guessing IDs.
  - Subtopic: "Optimistic Concurrency with version Fields"
    Adding a version integer to Prisma models enables optimistic locking: update queries include WHERE version = $current, and zero affected rows signals a conflict. Without concurrency control, concurrent edits silently overwrite each other, producing last-write-wins data loss in collaborative features.

### Layer 9 of 10: id remix-dev-9
Title: Styling and Performance
Group: "Tailwind CSS in Remix"
  - Subtopic: "Tailwind Setup and PostCSS Integration"
    Remix integrates Tailwind through PostCSS, which processes utility classes during the Vite build. Importing the Tailwind CSS file in root.tsx's links export rather than as a direct import ensures proper server-side rendering of styles without FOUC on initial page load.
  - Subtopic: "CSS Custom Properties and Theming"
    Tailwind v4 uses CSS custom properties for the design token system, enabling runtime theming without JavaScript. Hardcoding colors as arbitrary Tailwind values instead of referencing theme tokens makes consistent dark mode and brand theming across a large codebase extremely difficult to maintain.
Group: "Performance Optimization"
  - Subtopic: "links() Export and Stylesheet Preloading"
    Route modules export a links() function that injects link tags including stylesheet preload hints for critical CSS. Styles added only via JavaScript are render-blocking and increase cumulative layout shift scores; using the links export ensures CSS is delivered in the initial HTML response.
  - Subtopic: "Code Splitting and Route-Based Chunks"
    Remix automatically code-splits at route boundaries, so each route's JavaScript is only loaded when needed. Importing large libraries at the module level in a parent route pushes those bytes to all child routes, increasing initial bundle size and Time to Interactive for pages that don't use those libraries.
Group: "Web Vitals and Rendering"
  - Subtopic: "Largest Contentful Paint and SSR"
    Remix's server-side rendering delivers a complete HTML document on the first request, dramatically improving LCP compared to client-rendered SPAs. Re-introducing useEffect-driven data fetching for the primary page content defeats this advantage and regresses to SPA waterfall performance characteristics.
  - Subtopic: "ScrollRestoration and Navigation UX"
    Remix's ScrollRestoration component preserves scroll position across client-side navigations and restores it correctly on back/forward navigation. Without it, users navigating back from a detail page always return to the top of a long list, creating disorienting UX that violates browser navigation expectations.
Group: "Image and Asset Optimization"
  - Subtopic: "Static Assets in the public Directory"
    Files in Remix's public directory are served with long-lived cache headers and fingerprinted URLs by Vite. Referencing assets with hardcoded paths outside public bypasses fingerprinting, causing browsers to serve stale cached versions after a deployment that updates those assets.
  - Subtopic: "Responsive Images with srcset"
    Serving appropriately sized images using srcset and sizes attributes reduces bandwidth on mobile devices and improves LCP scores. Serving a single large desktop image to all screen sizes is one of the most impactful performance mistakes, as images often account for 60-80% of total page weight.

### Layer 10 of 10: id remix-dev-10
Title: Testing and Deployment
Group: "Unit Testing with Vitest"
  - Subtopic: "Testing Loaders and Actions in Isolation"
    Remix loaders and actions are plain async functions that accept Request objects, making them directly testable with Vitest without a running server. Skipping unit tests for loaders and testing only through the browser means subtle data transformation bugs and auth guard failures go undetected until end-to-end tests run, significantly slowing the feedback loop.
  - Subtopic: "Mocking Prisma with Vitest"
    Using vitest.mock() with a Prisma mock library (like prisma-mock or jest-mock-extended) allows testing loader/action logic against controlled database responses. Tests that hit a real database are slow, order-dependent, and fail non-deterministically in CI environments that spin up fresh containers without seeded data.
Group: "Component Testing"
  - Subtopic: "React Testing Library with Remix Wrappers"
    Components that use Remix hooks (useLoaderData, useNavigate) must be wrapped in a MemoryRouter with route context when tested in isolation. Rendering them without context causes hooks to throw invariant errors, blocking the entire test suite rather than just the failing component.
  - Subtopic: "Accessibility Testing with axe-core"
    Integrating jest-axe or vitest-axe into component tests catches WCAG violations automatically on every commit. Deferring accessibility checks to manual QA means violations accumulate until they represent a costly retrofit, and screen reader users encounter broken experiences in production.
Group: "End-to-End Testing with Playwright"
  - Subtopic: "Playwright Test Setup and Fixtures"
    Playwright fixtures enable reusable setup logic like authenticated user state, seeded database records, and consistent browser contexts. Writing auth logic inline in every test file creates massive duplication, and a single change to the login flow requires updating dozens of test files simultaneously.
  - Subtopic: "Page Object Model Pattern"
    The Page Object Model encapsulates page-specific selectors and interactions into reusable classes, decoupling tests from HTML structure. Tests that hardcode CSS selectors or text strings throughout break whenever UI is redesigned, requiring rewrites of entire test suites rather than a single class update.
Group: "Deployment"
  - Subtopic: "Remix Server Adapters"
    Remix uses adapter packages to target different deployment environments: @remix-run/express for Node.js servers, @remix-run/cloudflare for edge workers, and platform-specific adapters for Vercel and Fly.io. Using the wrong adapter causes the server entry point to fail silently or produce incorrect response handling.
  - Subtopic: "Environment Variables and .env Files"
    Remix exposes only variables prefixed for public use to the browser; all others remain server-only. Accessing process.env in client-side code throws at runtime in production even if it works in development, and accidentally exposing secret keys in client bundles is a critical security vulnerability.

Start now with Layer 1.
