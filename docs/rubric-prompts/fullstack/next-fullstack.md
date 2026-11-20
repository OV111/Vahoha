You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: next-fullstack (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id next-fullstack-1
Title: TypeScript and React Foundations
Group: "TypeScript Core Concepts"
  - Subtopic: "Types, interfaces, and type aliases"
    TypeScript lets you annotate variables and function signatures with static types. Understanding the difference between type aliases and interfaces is key to writing maintainable code.
  - Subtopic: "Generics and utility types in TypeScript"
    Generics allow you to write reusable, type-safe functions and components. Built-in utility types like Partial, Pick, and Omit reduce repetitive type definitions.
  - Subtopic: "Union, intersection, and narrowing types"
    Union types model values that can be one of several types, while type narrowing via guards lets TypeScript infer the correct shape at runtime. These patterns are essential for robust data handling.
Group: "React Component Model"
  - Subtopic: "Functional components, props, and composition"
    React models UI as a tree of composable functions that receive props and return JSX. Understanding component composition patterns prevents prop drilling and keeps code modular.
  - Subtopic: "State management with hooks and context"
    useState, useReducer, and useContext are the foundational hooks for local and shared state. Knowing when to lift state versus use context keeps components predictable.
  - Subtopic: "Effect hook and lifecycle understanding"
    useEffect synchronizes a component with external systems and replaces class lifecycle methods. Correctly specifying the dependency array prevents stale closures and infinite loops.
Group: "TypeScript Tooling Setup"
  - Subtopic: "Configure tsconfig for a Next.js project"
    Next.js ships with a sensible tsconfig.json but you should understand strict mode, path aliases, and module resolution options. Correct configuration prevents hard-to-debug type errors.
  - Subtopic: "Typing React event handlers and form inputs"
    React events wrap native browser events and have their own generic types. Typing onChange, onClick, and form submit handlers prevents runtime errors in UI interactions.
Group: "Modern JS Patterns"
  - Subtopic: "Destructuring, spread, and optional chaining"
    ES2020+ syntax like optional chaining (?.) and nullish coalescing (??) reduces boilerplate null checks. These patterns appear constantly in React props and API response handling.
  - Subtopic: "Async/await and Promise handling patterns"
    Nearly all data-fetching in Next.js uses async/await. Understanding Promise.all, error handling with try/catch, and avoiding sequential awaits in loops makes data fetching efficient.
  - Subtopic: "ES modules, imports, and barrel files"
    Next.js uses ES module syntax throughout. Organizing exports via index barrel files and understanding named vs default exports keeps large codebases navigable.

### Layer 2 of 10: id next-fullstack-2
Title: Next.js App Router and Routing
Group: "App Router Fundamentals"
  - Subtopic: "File-system routing and the app directory"
    The Next.js App Router maps the file system directly to URL routes. Every folder with a page.tsx becomes a URL segment, making navigation structure instantly visible.
  - Subtopic: "Nested layouts and shared UI segments"
    layout.tsx files wrap all children in a segment and persist across navigations without re-mounting. This is how persistent sidebars, headers, and auth wrappers are built.
  - Subtopic: "Dynamic routes and catch-all segments"
    [param] folders create dynamic URL segments, while [...slug] catches all sub-paths. These patterns power product pages, blog posts, and any content-driven routing.
Group: "Navigation and Route Organization"
  - Subtopic: "Route groups for layout organisation"
    Wrapping folders in (parentheses) creates route groups that do not affect the URL. This lets you apply different layouts to marketing pages versus authenticated dashboard routes.
  - Subtopic: "loading.tsx and error.tsx boundary files"
    Placing loading.tsx and error.tsx alongside page.tsx automatically wraps that segment in Suspense and error boundaries. These files dramatically improve perceived performance and resilience.
Group: "Navigation in Practice"
  - Subtopic: "Link component and programmatic navigation"
    The <Link> component prefetches routes and provides client-side navigation without a full page reload. useRouter from next/navigation enables imperative redirects after form submissions.
  - Subtopic: "usePathname and active link highlighting"
    usePathname returns the current URL path so you can apply active styles to navigation links. This pattern is used in every sidebar and top navigation component.
  - Subtopic: "Parallel routes and intercepting routes"
    Parallel routes render multiple pages in the same layout simultaneously (e.g. modals), while intercepting routes show a different UI on navigation without leaving the page.
Group: "Route Metadata and SEO"
  - Subtopic: "Metadata API for SEO and Open Graph"
    Exporting a metadata object or generateMetadata function from any page sets title, description, and OG tags. Proper metadata is critical for search ranking and social sharing.
  - Subtopic: "generateStaticParams for static dynamic routes"
    generateStaticParams pre-renders dynamic route segments at build time, producing static HTML for all known paths. This is essential for blog, product, and documentation sites.

### Layer 3 of 10: id next-fullstack-3
Title: Server Components and Rendering
Group: "Rendering Mental Models"
  - Subtopic: "Server vs client component boundary rules"
    Server Components render only on the server and can access databases directly, while Client Components run in the browser and handle interactivity. The boundary is set by the 'use client' directive.
  - Subtopic: "Static vs dynamic rendering strategies"
    A route is statically rendered at build time unless it uses dynamic functions like cookies() or headers(). Understanding this trade-off lets you choose the right caching strategy per route.
  - Subtopic: "Streaming and progressive page hydration"
    Streaming lets the server send HTML in chunks as data becomes available, so users see content faster. Wrapping slow data-fetching components in <Suspense> enables this progressive loading.
Group: "Caching and Revalidation Theory"
  - Subtopic: "Next.js caching layers and how they interact"
    Next.js has four caching layers: Request Memoization, Data Cache, Full Route Cache, and Router Cache. Understanding each layer's scope prevents surprising stale data bugs.
  - Subtopic: "Time-based and on-demand revalidation concepts"
    next: { revalidate } controls how often the Data Cache is refreshed, while revalidatePath and revalidateTag clear the cache on demand. These patterns enable a 'stale-while-revalidate' UX.
Group: "Data Fetching Patterns"
  - Subtopic: "fetch in Server Components with caching options"
    The extended fetch API in Server Components accepts a cache or next option to control memoization and revalidation. Fetching data directly in server components eliminates extra API round-trips.
  - Subtopic: "Parallel data fetching with Promise.all"
    Awaiting multiple independent fetches sequentially wastes time. Initiating them in parallel with Promise.all reduces total load time to the duration of the slowest fetch.
  - Subtopic: "use client directive and client-side fetching"
    Adding 'use client' at the top of a file marks it as a Client Component. For client-side data fetching, TanStack Query provides caching, refetching, and loading state management.
Group: "Suspense and Skeleton UI"
  - Subtopic: "Suspense boundaries for incremental page loading"
    Wrapping async Server Components in <Suspense fallback={<Skeleton />}> lets the rest of the page render immediately. This pattern transforms a blocked page into a progressively loaded experience.
  - Subtopic: "Error boundaries to gracefully handle fetch errors"
    error.tsx files create React error boundaries that catch thrown errors in a segment and render a fallback UI. This prevents a single failed data fetch from crashing the whole page.

### Layer 4 of 10: id next-fullstack-4
Title: Database with Prisma
Group: "Prisma Schema Design"
  - Subtopic: "Defining models, fields, and scalar types"
    The Prisma schema is a single source of truth for your database structure. Models map to tables, and scalar types like String, Int, DateTime map to database column types.
  - Subtopic: "Relations: one-to-many and many-to-many"
    Prisma uses relation fields and foreign key attributes to express database relationships. Understanding @relation, implicit join tables, and relation scalar fields is essential for any real data model.
  - Subtopic: "Migrations workflow and schema evolution"
    prisma migrate dev generates SQL migrations from schema changes and applies them locally. Understanding migration history and how to handle data migrations prevents data loss during schema changes.
Group: "Query Patterns"
  - Subtopic: "Filtering, sorting, and pagination with Prisma"
    Prisma Client provides type-safe where, orderBy, take, and skip options for every query. Cursor-based pagination is more efficient than offset for large datasets.
  - Subtopic: "Nested writes and transactional operations"
    Prisma supports nested create/connect/update in a single query, which keeps related records consistent. For multi-step operations, $transaction ensures atomicity.
Group: "Prisma Setup and Tooling"
  - Subtopic: "Install Prisma and configure database connection"
    Prisma setup requires the prisma CLI and @prisma/client packages, and a DATABASE_URL in .env. Connecting to PostgreSQL locally with Docker is the standard development workflow.
  - Subtopic: "Prisma Studio for visual database inspection"
    prisma studio opens a browser-based GUI to browse and edit your database records. It is the fastest way to verify that your mutations and migrations are working correctly.
  - Subtopic: "Seeding the database with realistic test data"
    A seed script populates your development database with consistent starting data. Prisma's seed configuration in package.json lets you run prisma db seed to reset state at any time.
Group: "Prisma in Next.js"
  - Subtopic: "Singleton Prisma Client pattern in Next.js"
    Hot reloading in development creates multiple Prisma Client instances, exhausting connection pools. The singleton pattern in lib/prisma.ts stores the client on the global object to prevent this.
  - Subtopic: "Type-safe CRUD with generated Prisma types"
    Prisma Client generates TypeScript types from your schema, so every query result is fully typed. This eliminates entire categories of runtime errors when reading and writing data.

### Layer 5 of 10: id next-fullstack-5
Title: Server Actions and Mutations
Group: "Server Actions Architecture"
  - Subtopic: "What server actions are and how they execute"
    Server Actions are async functions marked with 'use server' that run on the server and can be called from client components or forms. They eliminate the need for separate API routes for form submissions.
  - Subtopic: "Form submissions with the action prop"
    Passing a Server Action to the HTML form action attribute submits the form directly to the server without JavaScript. This enables progressive enhancement and works even before hydration.
  - Subtopic: "Revalidation and cache invalidation after mutations"
    After a successful mutation, calling revalidatePath or revalidateTag clears the Next.js cache for the affected routes. Without this step, the UI will show stale data after writes.
Group: "Validation and Error Handling"
  - Subtopic: "Schema validation with Zod in server actions"
    Parsing incoming form data with a Zod schema validates types and shapes before they reach your database. Zod provides detailed error messages that can be returned to the client.
  - Subtopic: "Returning errors and success states from actions"
    Server Actions can return objects with error or success fields rather than throwing, giving the client UI something meaningful to display. useActionState connects this return value to form state.
Group: "Route Handlers for APIs"
  - Subtopic: "Route handlers as REST API endpoints"
    route.ts files in the app directory export named HTTP method handlers (GET, POST, etc.) to create API endpoints. These are used when you need a public API consumed by external clients.
  - Subtopic: "Reading request body and query parameters"
    Route handlers receive a NextRequest object from which you can read JSON body, search params, and headers. Always validate external input before processing.
Group: "Optimistic UI and Pending States"
  - Subtopic: "useFormStatus for pending button states"
    React's useFormStatus hook reads the pending state of the nearest form, letting you disable submit buttons and show spinners without manual state management.
  - Subtopic: "useOptimistic for instant UI feedback"
    useOptimistic immediately applies a predicted UI update before the server responds, then reconciles the real data. This pattern makes mutations feel instantaneous to users.
  - Subtopic: "Zod form validation and client-side error display"
    Running a Zod safeParse on form data before submission catches obvious errors immediately. Displaying field-level Zod error messages guides users to fix their input without a server round-trip.

### Layer 6 of 10: id next-fullstack-6
Title: Authentication
Group: "Authentication Concepts"
  - Subtopic: "OAuth flow and credential-based authentication"
    OAuth delegates authentication to a trusted provider like Google or GitHub, while credentials providers handle username/password directly. Understanding both flows lets you offer users multiple sign-in options.
  - Subtopic: "Sessions vs JWT token strategies"
    Session strategy stores a reference in a server-side store and sends a session ID cookie, while JWT encodes the full session in a signed token. Each has different security and scalability trade-offs.
  - Subtopic: "Protecting routes with middleware-based guards"
    Next.js middleware runs at the edge before a request reaches any page, making it the ideal place to redirect unauthenticated users. This centralizes auth protection without duplicating checks per page.
Group: "Auth.js Integration Patterns"
  - Subtopic: "Prisma adapter for persisting sessions to database"
    The Prisma adapter stores users, sessions, and accounts in your database, enabling user lookup and multi-device session management. It requires specific Prisma model definitions in your schema.
  - Subtopic: "Reading session server-side and client-side"
    auth() returns the session in Server Components and Server Actions, while useSession provides it in Client Components. Knowing which to use avoids unnecessary client-side session fetches.
Group: "Auth.js Setup"
  - Subtopic: "Install and configure Auth.js with Next.js"
    Auth.js (formerly NextAuth.js v5) is configured in a single auth.ts file that exports auth, signIn, and signOut. The route handler at app/api/auth/[...nextauth] handles all OAuth callbacks.
  - Subtopic: "Environment variables for OAuth credentials"
    Each OAuth provider requires a client ID and secret obtained from their developer console. AUTH_SECRET must also be set as a random string for signing tokens.
Group: "Route and Action Protection"
  - Subtopic: "Protecting server actions by checking session"
    Calling auth() at the top of a Server Action and throwing if the session is null prevents unauthenticated mutations. Never rely solely on UI-level hiding to protect sensitive operations.
  - Subtopic: "Role-based access control with session callbacks"
    The jwt and session callbacks in Auth.js let you attach custom fields like role to the session token. Checking session.user.role in middleware or server actions enforces permission levels.
  - Subtopic: "Configuring sign-in and sign-out UI flows"
    Auth.js provides default sign-in pages, but custom pages are configured via the pages option in auth.ts. Combining signIn/signOut server actions with redirect keeps auth UX seamless.

### Layer 7 of 10: id next-fullstack-7
Title: Styling and UI
Group: "Tailwind CSS Fundamentals"
  - Subtopic: "Utility-first CSS and the Tailwind mental model"
    Tailwind replaces custom CSS with composable utility classes applied directly in HTML. This approach eliminates naming fatigue and keeps styles co-located with the markup they affect.
  - Subtopic: "Responsive design with Tailwind breakpoints"
    Tailwind uses mobile-first breakpoint prefixes (sm:, md:, lg:) that apply styles above a minimum width. This makes responsive layouts readable and avoids media query boilerplate.
  - Subtopic: "Dark mode with Tailwind class strategy"
    Setting darkMode: "class" in tailwind.config lets you toggle dark styles by adding a dark class to the html element. This enables user-controlled theme switching without CSS custom properties.
Group: "Accessible Component Design"
  - Subtopic: "Semantic HTML and ARIA patterns for accessibility"
    Screen readers and assistive technology rely on semantic elements and ARIA attributes to understand UI structure. Building accessible components from the start is easier than retrofitting them.
  - Subtopic: "Design tokens and consistent spacing scales"
    Tailwind's default spacing scale (4, 8, 12, 16...) creates visual consistency when used systematically. Extending the config with custom design tokens keeps branding consistent across a project.
Group: "shadcn/ui Component Library"
  - Subtopic: "Installing and using shadcn/ui components"
    shadcn/ui copies accessible Radix UI components styled with Tailwind directly into your codebase, so you own and can customise every component. This approach avoids dependency lock-in.
  - Subtopic: "Building reusable UI with variant patterns"
    The cva (class-variance-authority) library powers shadcn/ui variants and lets you define component size/color variants declaratively. This pattern keeps component APIs clean and type-safe.
  - Subtopic: "Dialogs, toasts, and sheet components for UX"
    Modal dialogs, toast notifications, and side sheets are essential feedback patterns. shadcn/ui provides accessible, animated versions of all three built on Radix primitives.
Group: "Loading and Skeleton States"
  - Subtopic: "Skeleton screens for perceived performance"
    Skeleton components mimic the shape of loading content to reduce perceived wait time. Combining them with Suspense boundaries makes the page feel responsive even on slow connections.
  - Subtopic: "cn utility for conditional Tailwind class merging"
    The cn helper (combining clsx and tailwind-merge) safely merges conditional Tailwind classes without class conflicts. It is the standard pattern for dynamic styles in shadcn/ui components.

### Layer 8 of 10: id next-fullstack-8
Title: Advanced Data and Caching
Group: "Advanced Caching Theory"
  - Subtopic: "Request memoization within a single render pass"
    Next.js automatically deduplicates identical fetch calls made during the same server render. This allows sibling server components to each fetch the data they need without network duplication.
  - Subtopic: "Data Cache vs Full Route Cache differences"
    The Data Cache persists fetch results between requests, while the Full Route Cache stores rendered HTML. Knowing which layer is stale helps you apply revalidation in the right place.
  - Subtopic: "Tag-based cache invalidation for fine control"
    fetch({ next: { tags: ['posts'] } }) associates a cache entry with a tag. Calling revalidateTag('posts') then invalidates only those entries, avoiding a full-route cache bust.
Group: "Runtime Considerations"
  - Subtopic: "Edge runtime vs Node.js runtime trade-offs"
    The Edge runtime starts faster and runs globally close to users, but lacks access to Node.js APIs like the file system. Choosing the right runtime per route optimises both latency and capability.
  - Subtopic: "Avoiding stale data with cache: no-store"
    Passing cache: 'no-store' to a fetch call opts it out of the Data Cache entirely, forcing a fresh request every time. This is necessary for routes that must always show the latest data.
Group: "Client-Side Data Management"
  - Subtopic: "TanStack Query for client-side server state"
    TanStack Query manages server state in client components with automatic background refetching, stale-time control, and cache invalidation. It is the standard complement to Next.js server components for interactive data.
  - Subtopic: "Optimistic updates with useMutation"
    TanStack Query's useMutation hook provides onMutate, onError, and onSettled callbacks for optimistic updates with rollback. This pattern gives users instant feedback while the server request completes.
  - Subtopic: "Parallel and dependent queries with useQuery"
    Multiple useQuery calls in a component run in parallel by default. Dependent queries use the enabled option to wait for a prerequisite query before fetching.
Group: "ISR and On-demand Revalidation"
  - Subtopic: "Incremental Static Regeneration with revalidate option"
    Exporting revalidate = 60 from a page opts it into ISR, regenerating the static HTML at most every 60 seconds. This delivers static performance with near-real-time freshness.
  - Subtopic: "On-demand revalidation via webhook route handler"
    A secret-protected POST route handler calls revalidatePath or revalidateTag when a CMS publishes new content. This triggers an immediate cache refresh without redeploying.

### Layer 9 of 10: id next-fullstack-9
Title: API Routes and Integrations
Group: "API Design Principles"
  - Subtopic: "REST conventions for route handler design"
    Following REST conventions (GET for reads, POST for creates, PATCH for updates, DELETE for removes) makes your API predictable for other developers and third-party integrations.
  - Subtopic: "Securing API keys and secrets on the server"
    API keys must never be exposed to the browser. Using them only in Server Components, Server Actions, or Route Handlers ensures they stay in the server environment and out of client bundles.
  - Subtopic: "Webhook signature verification to prevent spoofing"
    Webhooks from Stripe and other services include a cryptographic signature header. Verifying it before processing the payload prevents attackers from sending fake webhook events.
Group: "External Integrations Theory"
  - Subtopic: "Stripe payment intents and checkout flow"
    Stripe Payment Intents represent a payment attempt and track its lifecycle. Understanding the server-side intent creation and client-side confirmation split is essential for PCI compliance.
  - Subtopic: "File upload strategies and storage options"
    Files should be streamed directly to object storage like S3 or Cloudflare R2 rather than through your server. Pre-signed upload URLs let the browser upload directly, bypassing your serverless functions.
Group: "Stripe Integration"
  - Subtopic: "Stripe Checkout and payment link setup"
    Stripe Checkout handles the payment form entirely, including card validation and 3D Secure. Creating a Checkout Session from a Server Action and redirecting to the hosted page is the fastest integration path.
  - Subtopic: "Handling Stripe webhooks in a route handler"
    Stripe sends webhook events for completed payments, subscription changes, and refunds. A POST route handler that verifies the Stripe-Signature header and updates your database is the standard pattern.
Group: "Environment Config and External APIs"
  - Subtopic: "Typed environment variables with Zod validation"
    Parsing process.env through a Zod schema at startup catches missing or malformed environment variables before they cause runtime errors in production.
  - Subtopic: "Calling third-party APIs securely from server components"
    Making external API calls from Server Components or Server Actions keeps API keys off the client. Using a shared SDK instance prevents opening a new connection per request.
  - Subtopic: "Rate limiting and CORS for public route handlers"
    Public-facing route handlers should enforce rate limits to prevent abuse and set CORS headers to restrict origins. Vercel Edge Config and upstash/ratelimit are common solutions.

### Layer 10 of 10: id next-fullstack-10
Title: Testing and Deployment to Vercel
Group: "Testing Philosophy"
  - Subtopic: "Unit testing server and client logic with Vitest"
    Vitest is a fast, Vite-native test runner compatible with the Jest API. Testing pure utility functions, Zod schemas, and server action logic in isolation catches regressions before they reach the browser.
  - Subtopic: "Component testing with React Testing Library"
    React Testing Library renders components in a virtual DOM and queries them by accessible roles and labels. This encourages testing behaviour rather than implementation details.
  - Subtopic: "End-to-end testing strategy with Playwright"
    Playwright automates real browser interactions to verify critical user flows like sign-in, checkout, and form submission. E2E tests catch integration issues that unit tests miss.
Group: "Deployment Architecture"
  - Subtopic: "Vercel project structure and environment setup"
    Connecting a Git repository to Vercel enables automatic deployments on every push. Production, preview, and development environment variables are managed separately in the Vercel dashboard.
  - Subtopic: "Production database setup with connection pooling"
    Serverless functions open a new database connection per invocation, exhausting PostgreSQL connection limits. PgBouncer or Prisma Accelerate provide connection pooling to solve this.
Group: "Testing Tooling"
  - Subtopic: "Writing and running Playwright E2E tests"
    Playwright tests live in a tests/ directory and use page.goto, page.click, and expect(page).toHaveURL matchers. The codegen tool records browser interactions and generates test code automatically.
  - Subtopic: "Mocking modules and fetch calls in Vitest"
    vi.mock lets you replace modules like Prisma Client or fetch with controlled test doubles. This isolates the code under test from external dependencies and makes tests deterministic.
  - Subtopic: "Continuous integration with GitHub Actions"
    Running vitest and playwright test in a GitHub Actions workflow on every pull request prevents broken code from reaching main. Caching node_modules keeps CI fast.
Group: "Vercel Deployment"
  - Subtopic: "Preview deployments for pull request review"
    Vercel creates a unique deployment URL for every pull request, making it easy to review UI changes before merging. Reviewers can test against production-like infrastructure without running the app locally.
  - Subtopic: "Vercel Analytics and Speed Insights monitoring"
    Vercel Analytics tracks real user page view data, while Speed Insights reports Core Web Vitals like LCP and CLS. Both are enabled with a single package install and require no configuration.

Start now with Layer 1.
