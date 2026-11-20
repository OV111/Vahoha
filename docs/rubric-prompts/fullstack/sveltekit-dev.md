You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: sveltekit-dev (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id sveltekit-dev-1
Title: JavaScript and TypeScript Foundations
Group: "Modern JavaScript Core"
  - Subtopic: "Arrow functions and destructuring syntax"
    ES6+ shorthand features that reduce boilerplate in component code. Svelte templates rely on these patterns throughout.
  - Subtopic: "ES modules import and export system"
    The native browser module system used by Vite and SvelteKit. Understanding named vs default exports prevents common import errors.
  - Subtopic: "Promises and async/await control flow"
    Async patterns are essential for data fetching in SvelteKit load functions. Knowing how to chain and handle errors prevents silent failures.
Group: "TypeScript Type System"
  - Subtopic: "Interfaces and type aliases in TypeScript"
    TypeScript lets you describe the shape of objects and function signatures. SvelteKit generates types for routes automatically, making this knowledge essential.
  - Subtopic: "Generics and utility types overview"
    Generics allow reusable, type-safe abstractions. SvelteKit's typed load helpers like PageLoad use generics extensively.
Group: "Vite Dev Server"
  - Subtopic: "Vite project structure and config file"
    Vite is the build tool SvelteKit uses under the hood. Knowing vite.config.ts lets you add plugins and customize the dev experience.
  - Subtopic: "Hot Module Replacement during development"
    Vite's HMR pushes component changes to the browser without a full reload. Understanding it helps debug state loss during development.
Group: "DOM and Browser APIs"
  - Subtopic: "DOM querying and event listener basics"
    Svelte abstracts the DOM but sometimes you need raw API access. Lifecycle functions like onMount run in the browser where DOM APIs are available.
  - Subtopic: "Fetch API for HTTP requests"
    The native Fetch API is the basis for all data loading in SvelteKit. The framework wraps it but knowing the raw API helps debug network issues.

### Layer 2 of 10: id sveltekit-dev-2
Title: Svelte Fundamentals
Group: "Component Model"
  - Subtopic: "Single-file components and props declaration"
    Svelte components live in .svelte files with script, markup, and style sections. Props are declared with $props() in Svelte 5 runes mode.
  - Subtopic: "Reactivity with runes and $state"
    Svelte 5 introduced runes — compiler signals like $state and $derived that replace the old reactive declarations. They make data flow explicit.
  - Subtopic: "Slots and component composition patterns"
    Slots let parent components project markup into children. They are the primary composition mechanism for building layout wrappers.
Group: "Template Directives"
  - Subtopic: "Conditional rendering with if and else blocks"
    {#if} blocks conditionally include DOM nodes. Unlike framework virtual DOM diffing, Svelte creates and destroys real elements.
  - Subtopic: "List rendering with each blocks and keys"
    {#each} iterates arrays and renders repeated elements. Keys tell Svelte how to efficiently reconcile list changes.
Group: "Events and Bindings"
  - Subtopic: "DOM event handling with onclick and on directives"
    Svelte uses onclick={handler} shorthand in Svelte 5. Understanding event delegation vs direct listeners matters for performance.
  - Subtopic: "Two-way binding with bind directive"
    bind:value syncs form inputs directly to state variables. It eliminates boilerplate event handlers for common input patterns.
Group: "Styles and Scoping"
  - Subtopic: "Scoped CSS and global style overrides"
    Styles in a <style> block are scoped to the component by default. The :global() modifier breaks out of scoping when needed.
  - Subtopic: "Class and style directives for dynamic styling"
    class:active={isActive} conditionally applies classes without string concatenation. style:color={value} applies inline styles reactively.

### Layer 3 of 10: id sveltekit-dev-3
Title: SvelteKit Routing and Pages
Group: "Routing Concepts"
  - Subtopic: "File-based routing and the src/routes directory"
    SvelteKit maps the file system to URLs. A +page.svelte file inside a folder becomes the page for that route segment.
  - Subtopic: "Layouts and nested layout inheritance"
    +layout.svelte wraps child routes with shared UI like navbars. Nested folders inherit parent layouts forming a layout tree.
  - Subtopic: "Dynamic route parameters with bracket syntax"
    A folder named [slug] creates a dynamic segment. The parameter value is available in load functions via params.slug.
Group: "Error and Navigation"
  - Subtopic: "Error pages with +error.svelte boundary"
    +error.svelte catches errors thrown in load functions and renders a fallback. Nested error files scope the boundary to a subtree.
  - Subtopic: "SvelteKit project folder structure overview"
    src/routes, src/lib, static, and svelte.config.js each serve a distinct purpose. Understanding the layout prevents config confusion.
Group: "Navigation and Links"
  - Subtopic: "Client-side navigation with anchor tags"
    Standard <a href> tags trigger SvelteKit's client-side router automatically. No special component is required unlike other frameworks.
  - Subtopic: "Programmatic navigation with goto function"
    The goto() helper navigates imperatively from event handlers or after form submissions. It supports push/replace and state options.
Group: "Route Groups and Advanced Routing"
  - Subtopic: "Route groups to share layouts without URL segments"
    Folders wrapped in (parentheses) are route groups. They apply a layout to a subset of routes without adding a URL segment.
  - Subtopic: "Rest and optional route parameter patterns"
    [...rest] captures multiple path segments. [[optional]] makes a segment optional. Both are useful for catch-all and i18n routes.

### Layer 4 of 10: id sveltekit-dev-4
Title: Loading Data
Group: "Load Function Concepts"
  - Subtopic: "Page and layout load functions explained"
    +page.server.ts exports a load function that fetches data before the page renders. The returned object becomes the page's data prop.
  - Subtopic: "Server-only vs universal load distinction"
    +page.server.ts runs only on the server. +page.ts (universal) runs on both. Server loads can safely access databases; universal loads cannot.
  - Subtopic: "Type-safe data with generated PageData types"
    SvelteKit auto-generates TypeScript types in .svelte-kit/types for each route. Importing PageData ensures load return types match component props.
Group: "Error and Redirect Handling"
  - Subtopic: "Throwing error and redirect inside load functions"
    The error() and redirect() helpers from @sveltejs/kit are thrown inside load to abort rendering. They integrate with SvelteKit's error boundary.
  - Subtopic: "Streaming data with deferred promises"
    Returning a promise from load without awaiting it enables streaming. The browser receives HTML immediately while awaiting the remaining data.
Group: "Params and Fetch"
  - Subtopic: "Accessing route params inside the load event"
    Load receives an event object with params, url, and cookies. Destructuring params gives you typed access to dynamic route segments.
  - Subtopic: "Using the load event fetch helper safely"
    The fetch provided to load is enhanced — it includes cookies on the server and can call internal endpoints with relative URLs.
Group: "Invalidation and Dependencies"
  - Subtopic: "invalidate and invalidateAll for re-running loads"
    Calling invalidate(url) tells SvelteKit to re-run load functions that depend on that URL. It avoids full page navigations after mutations.
  - Subtopic: "depends() for manual load dependency tracking"
    depends('custom:key') registers a custom dependency in a load function. Calling invalidate('custom:key') re-runs only those loads.

### Layer 5 of 10: id sveltekit-dev-5
Title: Form Actions and Mutations
Group: "Form Actions Concepts"
  - Subtopic: "Defining actions in plus page.server.ts files"
    Exporting an actions object from +page.server.ts lets HTML forms POST to the same route. It keeps mutation logic co-located with the page.
  - Subtopic: "Named actions for multiple forms on one page"
    action="?/create" and action="?/delete" route to different handlers in the same actions object. Useful when a page has several mutation concerns.
  - Subtopic: "Returning validation errors from actions"
    Returning fail(400, { errors }) from an action sends error data back to the form without a redirect. The page data receives it via form prop.
Group: "Schema Validation"
  - Subtopic: "Zod schema validation for form data"
    Zod parses and validates form data against a typed schema inside an action. It provides human-readable errors without manual checks.
  - Subtopic: "Parsing FormData with Object.fromEntries"
    FormData must be converted to a plain object before Zod can parse it. Understanding this conversion step prevents runtime type errors.
Group: "Progressive Enhancement"
  - Subtopic: "Enhance directive for JavaScript-enhanced forms"
    use:enhance intercepts form submissions and handles them with fetch instead of a full page reload. Forms still work without JS.
  - Subtopic: "Custom enhance callback for optimistic updates"
    Passing a function to use:enhance gives full control over the submit/result lifecycle. It enables optimistic UI and custom redirect logic.
Group: "Invalidation After Mutations"
  - Subtopic: "Automatic data invalidation after action success"
    By default, use:enhance re-runs all load functions after a successful action. This keeps displayed data fresh without manual refreshes.
  - Subtopic: "Redirect after POST to prevent duplicate submissions"
    Throwing redirect(303, "/path") after a successful action follows the POST/Redirect/GET pattern. It prevents form resubmission on refresh.

### Layer 6 of 10: id sveltekit-dev-6
Title: Databases and Persistence
Group: "Prisma Schema and Models"
  - Subtopic: "Defining models and fields in schema.prisma"
    The Prisma schema file describes your database tables as models with typed fields. Running prisma generate creates a type-safe client from it.
  - Subtopic: "Model relations: one-to-many and many-to-many"
    Prisma represents foreign keys as relation fields. Defining both sides of a relation enables nested include queries.
Group: "Migrations and Seeding"
  - Subtopic: "Creating and applying database migrations"
    prisma migrate dev generates SQL migration files from schema changes and applies them. This keeps the database in sync with the schema.
  - Subtopic: "Seeding the database with initial data"
    A seed script populates the database with development data. Prisma runs it via prisma db seed after configuring the script in package.json.
Group: "Querying in Server Code"
  - Subtopic: "CRUD operations with PrismaClient"
    prisma.model.findMany(), create(), update(), and delete() cover the majority of data operations. All return typed objects matching the schema.
  - Subtopic: "Filtering and selecting fields in queries"
    where, select, and include control what Prisma fetches. Selecting only needed fields reduces payload size and prevents over-fetching.
Group: "Environment Configuration"
  - Subtopic: "DATABASE_URL env variable setup for Prisma"
    Prisma reads the connection string from DATABASE_URL in .env. SvelteKit exposes server env vars through $env/static/private.
  - Subtopic: "Singleton PrismaClient pattern in SvelteKit"
    Hot module reloading can create multiple PrismaClient instances. A module-level singleton stored in globalThis prevents connection pool exhaustion.

### Layer 7 of 10: id sveltekit-dev-7
Title: Authentication and Hooks
Group: "Server Hooks"
  - Subtopic: "The handle hook and request interception"
    Exporting handle from src/hooks.server.ts intercepts every server request. It is used to attach session data to event.locals before any load runs.
  - Subtopic: "event.locals for passing data to load functions"
    locals is a per-request object populated in handle and readable in all load and action functions. It is the idiomatic place to store the current user.
Group: "Session and Cookie Concepts"
  - Subtopic: "Sessions and HTTP cookies for authentication state"
    Sessions persist login state between requests. The server stores session data and sends a session ID cookie to the browser.
  - Subtopic: "Protecting routes by checking locals in load"
    Calling redirect(302, "/login") from a load function when locals.user is null locks down authenticated pages without middleware libraries.
Group: "Auth Flows"
  - Subtopic: "Login and signup form actions with password hashing"
    Registration and login are server actions that hash passwords with bcrypt and create sessions. Keeping these server-side protects credentials.
  - Subtopic: "Logout action that clears session cookies"
    Logout deletes the server-side session and sets the cookie to expire immediately. A server action is the correct place since it runs on the server.
Group: "Security Practices"
  - Subtopic: "CSRF protection built into SvelteKit form actions"
    SvelteKit form actions automatically validate the Origin header to prevent cross-site request forgery. Third-party fetch-based mutations must add tokens manually.
  - Subtopic: "Secure and HttpOnly cookie flags explained"
    HttpOnly prevents JavaScript from reading session cookies, mitigating XSS. Secure ensures cookies are only sent over HTTPS in production.

### Layer 8 of 10: id sveltekit-dev-8
Title: Advanced UI and Stores
Group: "Svelte Stores"
  - Subtopic: "Writable and readable stores for shared state"
    Svelte stores are observables that any component can subscribe to. Writable stores allow external updates; readable stores are read-only.
  - Subtopic: "Derived stores that compute from other stores"
    derived() creates a store whose value is automatically computed from one or more source stores. It replaces manual subscription and calculation.
  - Subtopic: "Context API for component-tree scoped state"
    setContext and getContext pass values down a component tree without prop drilling. Context is local to the tree unlike module-level stores.
Group: "Accessibility Patterns"
  - Subtopic: "ARIA attributes and semantic HTML in components"
    Svelte warns about missing accessibility attributes at compile time. Using semantic elements and ARIA ensures screen reader compatibility.
Group: "Transitions and Animations"
  - Subtopic: "Built-in transitions like fade and slide"
    The svelte/transition module provides declarative enter/leave animations. Applying transition:fade to an {#if} block animates DOM insertions and removals.
  - Subtopic: "The animate directive for list reordering"
    animate:flip animates elements within an {#each} block when keys change position. It makes list reorders feel smooth without manual DOM work.
Group: "Actions and Use Directives"
  - Subtopic: "Custom actions for reusable DOM behavior"
    use:action attaches imperative DOM logic to an element. It is the correct escape hatch for third-party library integration and focus management.
  - Subtopic: "Reusable component patterns with generics"
    Svelte 5 supports generic components via <script generics="T">. This enables type-safe data table and list components that work with any item type.

### Layer 9 of 10: id sveltekit-dev-9
Title: APIs and Advanced SvelteKit
Group: "Server Endpoints"
  - Subtopic: "API routes with plus server.ts files"
    +server.ts exports GET, POST, PATCH, DELETE handlers. They return a Response object and act as a REST endpoint alongside page routes.
  - Subtopic: "json and error helpers for API responses"
    SvelteKit's json() shortcut sets Content-Type and serializes the body. The error() helper produces structured error responses with correct status codes.
Group: "Rendering Strategies"
  - Subtopic: "SSR, CSR, and prerendering page options"
    Setting export const ssr = false disables server rendering per route. prerender = true generates static HTML at build time. Choosing correctly affects SEO and performance.
  - Subtopic: "SvelteKit adapters for deployment targets"
    Adapters transform the build output for a specific platform. adapter-node creates a Node.js server; adapter-static outputs a pure static site.
Group: "Environment and Config"
  - Subtopic: "Public vs private environment variables in SvelteKit"
    $env/static/private exposes server-only vars. $env/static/public (prefixed PUBLIC_) is safe to expose to the browser. Mixing them leaks secrets.
  - Subtopic: "svelte.config.js and kit configuration options"
    svelte.config.js controls the adapter, path aliases, and Vite settings. Understanding it prevents build-time surprises when targeting different hosts.
Group: "Path Aliases and Module Resolution"
  - Subtopic: "$lib path alias for shared utilities"
    SvelteKit configures $lib to point to src/lib. Importing from $lib/server prevents circular deps and keeps utility imports short across the codebase.
  - Subtopic: "Server-only modules with plus server restriction"
    Files in $lib/server are restricted from being imported in client code. SvelteKit throws a build error if a browser bundle imports them, preventing data leaks.

### Layer 10 of 10: id sveltekit-dev-10
Title: Testing and Deployment
Group: "Unit Testing with Vitest"
  - Subtopic: "Vitest setup and test file conventions"
    Vitest is Vite-native and shares its config. Test files named *.test.ts run automatically and support the same import aliases as the app.
  - Subtopic: "Testing pure utility functions and stores"
    Svelte stores and helper modules are plain JS and can be tested without a DOM. Vitest runs these tests in Node for speed.
  - Subtopic: "Mocking modules and environment variables in tests"
    vi.mock() replaces module imports with test doubles. Mocking $env modules prevents tests from requiring real secrets.
Group: "Deployment Strategies"
  - Subtopic: "Choosing an adapter for your target platform"
    adapter-vercel, adapter-netlify, and adapter-node each produce a different output. Matching the adapter to the hosting platform prevents runtime errors.
  - Subtopic: "Environment variables in production deployments"
    Production env vars are set in the hosting dashboard, not in .env files. The PUBLIC_ prefix convention controls which values are embedded in the client bundle.
Group: "End-to-End Testing with Playwright"
  - Subtopic: "Playwright installation and browser setup"
    Playwright drives real browsers (Chromium, Firefox, WebKit) from Node.js. It integrates with Vitest or runs standalone via the @playwright/test runner.
  - Subtopic: "Writing page navigation and form interaction tests"
    Playwright tests click buttons, fill forms, and assert URL and DOM state. Testing full user flows catches integration bugs that unit tests miss.
  - Subtopic: "Using Playwright fixtures and page object model"
    Page Object Model encapsulates selectors and actions into reusable classes. Fixtures inject authenticated browser contexts to avoid repeating login steps.
Group: "Monitoring and Previews"
  - Subtopic: "Preview deployments with adapter-vercel or Netlify"
    Hosting platforms create preview URLs for every pull request. They run the production build against staging env vars for safe pre-merge testing.
  - Subtopic: "Sourcemaps and error monitoring in production"
    Uploading sourcemaps to a monitoring tool like Sentry maps minified stack traces back to original SvelteKit code, making production errors debuggable.

Start now with Layer 1.
