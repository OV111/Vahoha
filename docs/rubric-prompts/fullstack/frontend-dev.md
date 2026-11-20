You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: frontend-dev (roadmap fullstack). It has 15 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 15: id frontend-dev-1
Title: How the Web Works and Semantic HTML
Group: "How the Web Works"
  - Subtopic: "The request and response cycle"
    A URL is resolved by DNS to an address, the browser sends an HTTP request and the server replies with a status code, headers and a body. Knowing this makes network errors much easier to debug.
  - Subtopic: "DevTools Network panel"
    The Network panel shows every request a page makes, with timing, headers and payloads. It is the first place to look when something loads slowly or fails.
Group: "Document Structure"
  - Subtopic: "Elements, attributes and the DOM tree"
    Browsers parse HTML into a tree of elements. Nesting rules and valid attributes decide how that tree is built, and a malformed document is silently repaired in ways you did not intend.
  - Subtopic: "Metadata and the head"
    The head holds the title, character set, viewport and social metadata. A missing viewport tag is why a page looks tiny on a phone.
Group: "Semantics"
  - Subtopic: "Landmark elements"
    header, nav, main, article, aside and footer tell browsers and assistive tools what each region is. Prefer them over generic divs wherever a region has a meaning.
  - Subtopic: "Headings and document outline"
    Headings form the outline that screen reader users navigate by. Use one h1 per page and never skip levels just to get a smaller font.
Group: "Forms and Media"
  - Subtopic: "Native form controls"
    Labeled inputs, buttons and the built-in input types give you validation, keyboards on mobile and accessibility for free. Reach for them before building a custom control.
  - Subtopic: "Images, video and alt text"
    Every informative image needs a text alternative, and decorative ones need an empty alt. Use the picture element and srcset to serve the right size.

### Layer 2 of 15: id frontend-dev-2
Title: CSS Foundations: Cascade, Box Model, and Typography
Group: "The Cascade"
  - Subtopic: "Specificity and source order"
    When two rules target the same element, specificity decides first and source order second. Keeping selectors flat and low-specificity avoids most override fights.
  - Subtopic: "Inheritance and cascade layers"
    Some properties inherit and some do not. Cascade layers let you order whole groups of rules, such as resets, components and utilities, without raising specificity.
Group: "The Box Model"
  - Subtopic: "Content, padding, border and margin"
    Every element is a rectangular box with four layers. box-sizing: border-box makes widths include padding and border, which is what you almost always want.
  - Subtopic: "Margin collapse"
    Vertical margins between block elements can merge into one. Knowing when it happens explains spacing that seems to ignore your values.
Group: "Typography and Units"
  - Subtopic: "rem, em and fluid sizing"
    rem scales with the user's font setting, which respects accessibility preferences. clamp lets a size grow smoothly between a minimum and a maximum without breakpoints.
  - Subtopic: "Web fonts and readability"
    Limit line length to a readable measure, give text enough line height and load fonts with font-display so text never stays invisible.
Group: "Variables and Color"
  - Subtopic: "Custom properties"
    CSS variables are live values that cascade, so changing one on a parent restyles everything inside it. They are the basis for themes and design tokens.
  - Subtopic: "Color and contrast"
    Choose colors with enough contrast against their background for readable text. Modern color functions such as oklch make predictable palettes easier.

### Layer 3 of 15: id frontend-dev-3
Title: Responsive Layout: Flexbox, Grid, and Container Queries
Group: "Flexbox"
  - Subtopic: "Main axis and cross axis"
    Flexbox works along a main axis and a cross axis. justify-content aligns along the main axis and align-items along the cross, which swap when you change direction.
  - Subtopic: "flex-grow, shrink and basis"
    These three values decide how items share free space or give it up. Learning flex: 1 and min-width: 0 fixes most overflow surprises.
Group: "Grid"
  - Subtopic: "Tracks and areas"
    Grid defines rows and columns, then places items by line number or named area. It is the right tool for whole-page layouts and anything with rows and columns.
  - Subtopic: "auto-fit, minmax and fr"
    repeat(auto-fit, minmax(240px, 1fr)) makes a card grid that adds and removes columns as space changes, with no media queries.
Group: "Responsive Design"
  - Subtopic: "Mobile-first and media queries"
    Start with the small-screen layout and add complexity with min-width queries. Pick breakpoints where the content breaks, not at specific device sizes.
  - Subtopic: "The viewport and touch targets"
    The viewport meta tag controls mobile scaling. Make tap targets large enough to hit with a thumb and avoid hover-only interactions.
Group: "Modern Layout"
  - Subtopic: "Container queries"
    A container query styles a component based on the size of its parent rather than the whole viewport, so the same card works in a sidebar and a main column.
  - Subtopic: "Logical properties and intrinsic sizing"
    Logical properties such as margin-inline and padding-block adapt to writing direction, and intrinsic sizing keywords let content decide its own size.

### Layer 4 of 15: id frontend-dev-4
Title: JavaScript for the Browser: Core Language, Async, and Modules
Group: "Language Core"
  - Subtopic: "Scope and closures"
    A closure is a function that remembers the variables around where it was created. Closures explain callbacks, event handlers and every React hook.
  - Subtopic: "Immutable updates"
    Frontend frameworks detect changes by comparing references, so you update copies with spread and array methods instead of mutating objects in place.
Group: "Arrays and Data"
  - Subtopic: "map, filter and reduce"
    These methods turn data into new data without loops that mutate state. Most UI rendering is a map over an array.
  - Subtopic: "JSON and structured data"
    JSON is how almost every API sends data. Parsing it safely and shaping it for the UI is a daily task.
Group: "Asynchronous JavaScript"
  - Subtopic: "The event loop"
    JavaScript runs one task at a time, and the event loop schedules callbacks and promise reactions around it. Understanding it explains why long loops freeze the page.
  - Subtopic: "Promises and async/await"
    A promise is a value that arrives later. async/await lets you write that code in a straight line, with try/catch for failures.
Group: "Network and Modules"
  - Subtopic: "fetch, errors and AbortController"
    fetch only rejects on network failure, so you must check response.ok yourself. AbortController cancels requests that are no longer needed.
  - Subtopic: "ES modules"
    Modules give each file its own scope and explicit imports and exports. Dynamic import loads code on demand, which is the base of code splitting.

### Layer 5 of 15: id frontend-dev-5
Title: The DOM, Events, and Browser APIs
Group: "The DOM"
  - Subtopic: "Selecting and changing nodes"
    querySelector finds elements and properties such as textContent change them. Prefer textContent over innerHTML for user data to avoid injecting markup.
  - Subtopic: "Reflow and repaint cost"
    Reading layout values right after writing them forces the browser to recalculate layout. Batch your reads and writes to avoid slow interactions.
Group: "Events"
  - Subtopic: "Bubbling and delegation"
    Most events travel up the tree, so one listener on a parent can handle clicks for many children, including ones added later.
  - Subtopic: "Passive listeners and custom events"
    Marking scroll and touch listeners passive keeps scrolling smooth, and custom events let separate parts of a page talk without direct references.
Group: "Storage"
  - Subtopic: "localStorage, sessionStorage and cookies"
    Web Storage is synchronous and readable by any script on the page, so never put secrets in it. Cookies are sent with every request and can be marked HttpOnly.
  - Subtopic: "IndexedDB and caching"
    IndexedDB stores large structured data asynchronously in the browser, and the Cache API stores responses for offline use.
Group: "Observation and Navigation"
  - Subtopic: "Intersection and Resize observers"
    Observers tell you when an element becomes visible or changes size, replacing scroll handlers that run constantly and hurt performance.
  - Subtopic: "History API"
    pushState and popstate change the URL without a reload. Routers in frameworks are built on top of these two pieces.

### Layer 6 of 15: id frontend-dev-6
Title: TypeScript for Frontend Developers
Group: "Everyday Types"
  - Subtopic: "Inference and annotations"
    TypeScript infers most types from values, so annotate function parameters and public boundaries and let it figure out the rest.
  - Subtopic: "Unions and literal types"
    A union such as 'idle' | 'loading' | 'error' models the exact states a value can have, and the compiler checks you handle each one.
Group: "Narrowing"
  - Subtopic: "Type guards and discriminated unions"
    A shared literal field lets TypeScript narrow a union inside a switch. This pattern models loading, success and error states cleanly.
  - Subtopic: "unknown instead of any"
    unknown forces you to check a value before using it, while any switches off the checker. Use unknown for data you do not control.
Group: "Generics"
  - Subtopic: "Generic functions and types"
    Generics let one function or type work with many types while keeping the relationship between input and output. fetchJson<T> is the standard first example.
  - Subtopic: "Utility types"
    Partial, Pick, Omit, Record and ReturnType derive new types from existing ones, so you change a type in one place instead of many.
Group: "Typing the Boundary"
  - Subtopic: "Runtime validation with Zod"
    Types disappear at runtime, so data from an API is only trusted after validation. A Zod schema validates the data and gives you the matching type.
  - Subtopic: "tsconfig and strict mode"
    strict turns on the checks that make types trustworthy. Enable it from the start, since adding it later to a large project is painful.

### Layer 7 of 15: id frontend-dev-7
Title: React Fundamentals
Group: "Components"
  - Subtopic: "JSX and props"
    JSX is JavaScript that describes UI. Props pass data from parent to child, and a child never changes its props directly.
  - Subtopic: "Composition and children"
    Components compose by nesting. The children prop lets a component wrap whatever you put inside it, which keeps layout components generic.
Group: "Rendering"
  - Subtopic: "Lists and keys"
    Each item in a rendered list needs a stable key so React can match items between renders. Using the array index breaks state when the list reorders.
  - Subtopic: "Render is a pure calculation"
    A component should return the same UI for the same props and state, with no side effects while rendering. This is what makes React predictable.
Group: "State"
  - Subtopic: "useState and re-rendering"
    Calling a state setter schedules a re-render with the new value. State updates are snapshots, so the old value stays in the current render.
  - Subtopic: "Updating objects and arrays"
    Never mutate state in place. Create a new object or array so React sees the change.
Group: "Structure"
  - Subtopic: "Lifting state up"
    When two components need the same data, move the state to their closest common parent and pass it down. Keep state as low as it can be.
  - Subtopic: "Thinking in React"
    Break the UI into a component tree, build a static version, find the minimal state, and decide where it lives. This process is a repeatable method.

### Layer 8 of 15: id frontend-dev-8
Title: React in Depth: Effects, Hooks, and State Patterns
Group: "Effects"
  - Subtopic: "Synchronizing with useEffect"
    An effect keeps something outside React, such as a subscription or a document title, in sync with your state. Its cleanup function runs before the next effect and on unmount.
  - Subtopic: "You might not need an effect"
    Derived values should be computed during render, and user-caused changes belong in event handlers. Reaching for an effect for these creates extra renders and bugs.
Group: "Hooks"
  - Subtopic: "useRef and useMemo"
    A ref holds a value that survives renders without causing one, and useMemo caches a calculation. Measure before memoizing, since it has a cost too.
  - Subtopic: "Custom hooks"
    A custom hook is a function that uses other hooks to share stateful logic. They are how you remove duplication without changing the component tree.
Group: "Shared State"
  - Subtopic: "useReducer"
    A reducer centralizes how state changes in response to named actions, which keeps complex updates testable and easy to follow.
  - Subtopic: "Context and its limits"
    Context passes data deeply without props, but every consumer re-renders when the value changes. Use it for slow-changing data such as theme or current user.
Group: "State Libraries"
  - Subtopic: "Zustand"
    Zustand keeps state in a small store outside React and lets components subscribe to just the slice they need, avoiding the context re-render problem.
  - Subtopic: "Server state versus client state"
    Data that lives on the server is a cache, not state you own. Keep it separate from UI state like open modals and form drafts.

### Layer 9 of 15: id frontend-dev-9
Title: Routing, Forms, and Data Fetching
Group: "Routing"
  - Subtopic: "Nested routes and URL state"
    Routes map URLs to components, and nested routes share layouts. Put filters and pagination in the URL so pages can be linked and refreshed.
  - Subtopic: "Lazy routes and guards"
    Load each route's code only when it is visited, and redirect users who are not signed in before the page renders.
Group: "Forms"
  - Subtopic: "Validation and error states"
    Validate on the client for fast feedback and again on the server for safety. Connect each error message to its field with aria-describedby.
  - Subtopic: "Schema-based validation"
    One Zod schema can validate the form and type its values, so the rules live in a single place.
Group: "Server State"
  - Subtopic: "Queries and caching"
    TanStack Query caches responses by key, deduplicates identical requests and refetches stale data in the background, replacing hand-written loading and error state.
  - Subtopic: "Stale time and invalidation"
    staleTime decides how long data counts as fresh, and invalidating a key after a mutation tells the cache to refetch what changed.
Group: "Mutations"
  - Subtopic: "Mutations and optimistic updates"
    An optimistic update changes the UI immediately and rolls back if the request fails. It makes interactions feel instant when done carefully.
  - Subtopic: "Loading, empty and error states"
    Every data view has four states: loading, empty, error and success. Designing all four is what separates an application from a demo.

### Layer 10 of 15: id frontend-dev-10
Title: Styling at Scale: Tailwind, CSS Architecture, and Design Systems
Group: "Styling Approaches"
  - Subtopic: "Utility-first with Tailwind"
    Tailwind composes styles from small utility classes in the markup, which removes naming and dead CSS. Extract repeated patterns into components, not into new CSS.
  - Subtopic: "CSS Modules"
    CSS Modules scope class names to a component file at build time, so styles cannot leak. They keep normal CSS while avoiding global collisions.
Group: "Design Tokens"
  - Subtopic: "Tokens as CSS variables"
    Colors, spacing and type sizes defined once as variables are the vocabulary of a design system. Changing a token restyles every use of it.
  - Subtopic: "Theming and dark mode"
    Switch themes by changing variables on the root element. Respect prefers-color-scheme as the default and let users override it.
Group: "Components"
  - Subtopic: "Variants and composition"
    A component exposes a small set of variants such as size and intent rather than arbitrary styles. A helper like class-variance-authority keeps the mapping tidy.
  - Subtopic: "Headless, accessible primitives"
    Libraries such as Radix provide behavior and accessibility for dialogs, menus and tabs without imposing a look, so you style them yourself.
Group: "Documentation"
  - Subtopic: "Storybook"
    Storybook renders components in isolation with their variants, which makes them easy to review, test and hand off.
  - Subtopic: "Visual consistency checks"
    A shared spacing scale, type scale and component set keeps screens consistent, and visual regression tests catch accidental changes.

### Layer 11 of 15: id frontend-dev-11
Title: Web Accessibility
Group: "Principles"
  - Subtopic: "WCAG in practice"
    WCAG organizes requirements under four principles with levels A, AA and AAA. Level AA is the common legal and professional target.
  - Subtopic: "Semantic HTML first"
    Native buttons, links, headings and form controls already carry roles, keyboard behavior and names. The first rule of ARIA is not to use it if a native element works.
Group: "Keyboard and Focus"
  - Subtopic: "Focus order and visible focus"
    Every interactive element must be reachable with Tab in a logical order and show a clear focus indicator. Never remove the outline without replacing it.
  - Subtopic: "Focus management in dialogs and routes"
    Opening a dialog should move focus into it and closing should return it. After a route change, move focus to the new page heading so screen reader users know something changed.
Group: "ARIA"
  - Subtopic: "Roles, states and properties"
    ARIA adds meaning that HTML cannot express, such as aria-expanded on a disclosure button. A wrong ARIA attribute is worse than none.
  - Subtopic: "Live regions and announcements"
    A live region makes a screen reader announce changes, like a form error or a loaded result, that would otherwise be silent.
Group: "Perception and Testing"
  - Subtopic: "Contrast, zoom and reduced motion"
    Text needs enough contrast, layouts must survive 200 percent zoom, and animations should respect prefers-reduced-motion.
  - Subtopic: "Automated and manual testing"
    Tools like axe catch roughly a third of issues. The rest need keyboard testing and a screen reader such as NVDA, VoiceOver or TalkBack.

### Layer 12 of 15: id frontend-dev-12
Title: Rendering Strategies and Next.js
Group: "Rendering Models"
  - Subtopic: "CSR, SSR, SSG and ISR"
    Client rendering sends an empty shell and builds the page in the browser, server rendering sends HTML per request, and static generation builds HTML ahead of time. Each trades speed, freshness and cost differently.
  - Subtopic: "Hydration"
    Hydration attaches React to server-rendered HTML. If the server and client output differ, React reports a hydration mismatch.
Group: "Server Components"
  - Subtopic: "Server and client components"
    Server components run only on the server and ship no JavaScript, so they can read the database directly. Mark a file with use client only where it needs state or events.
  - Subtopic: "Composition boundaries"
    Keep client components small and pass server-rendered content into them as children, so the interactive part of a page stays a thin layer.
Group: "Next.js App Router"
  - Subtopic: "Routing, layouts and loading UI"
    Folders define routes, layout files wrap their children and loading files give instant fallbacks while a segment streams in.
  - Subtopic: "Data fetching and caching"
    Pages fetch data on the server and Next.js can cache the result and revalidate it on a schedule or on demand.
Group: "Search and Sharing"
  - Subtopic: "Metadata and SEO"
    Titles, descriptions, canonical URLs and structured data come from the server render, which is why search engines prefer it over empty client shells.
  - Subtopic: "Open Graph and sitemaps"
    Open Graph tags control how links preview when shared, and a sitemap helps crawlers find every page.

### Layer 13 of 15: id frontend-dev-13
Title: Frontend Performance and Core Web Vitals
Group: "Metrics"
  - Subtopic: "LCP, INP and CLS"
    Largest Contentful Paint measures loading, Interaction to Next Paint measures responsiveness and Cumulative Layout Shift measures visual stability. Together they describe how the page feels.
  - Subtopic: "Lab data versus field data"
    Lighthouse gives repeatable lab numbers, while real-user data from the field shows what your visitors experience. Use lab data to debug and field data to decide.
Group: "Diagnosis"
  - Subtopic: "The Performance panel"
    A recorded trace shows long tasks, layout work and what blocked the main thread. Long tasks over 50 milliseconds are what hurt responsiveness.
  - Subtopic: "Layout shift debugging"
    Images without dimensions, late-loading fonts and injected banners push content around. Reserve space for them to keep CLS low.
Group: "Assets"
  - Subtopic: "Images, fonts and lazy loading"
    Images are usually the largest bytes on a page. Serve modern formats at the right size, lazy-load below the fold and preload the hero image.
  - Subtopic: "Caching, compression and CDNs"
    Fingerprinted files can be cached forever, text compresses well with Brotli and a CDN serves content close to the user.
Group: "JavaScript Cost"
  - Subtopic: "Code splitting and tree shaking"
    Ship only the code a route needs. Dynamic imports split the bundle, and tree shaking removes exports you never use.
  - Subtopic: "React rendering cost"
    Profile before optimizing. Memoization, stable props and list virtualization help when a profile shows wasted renders, and hurt readability when added blindly.

### Layer 14 of 15: id frontend-dev-14
Title: Testing Frontend Applications
Group: "Strategy"
  - Subtopic: "What to test"
    Test behavior users depend on, not implementation details. Tests that break on refactors without any behavior change cost more than they give.
  - Subtopic: "Unit tests with Vitest"
    Vitest runs fast, shares Vite's config and offers a Jest-compatible API. Pure functions like reducers and validators are the easiest and most valuable to test.
Group: "Components"
  - Subtopic: "Queries by role"
    Finding elements by accessible role and name makes tests resemble how users and screen readers see the page, and doubles as an accessibility check.
  - Subtopic: "User events and async UI"
    user-event simulates real interactions, and findBy and waitFor queries handle UI that updates after a promise resolves.
Group: "Network"
  - Subtopic: "Mock Service Worker"
    MSW intercepts requests at the network level, so your components run their real fetch code against fake responses. The same handlers work in tests and in development.
  - Subtopic: "Testing loading and error states"
    Use handlers that delay, fail or return empty lists to check the states users rarely see but always notice when they break.
Group: "End to End"
  - Subtopic: "Playwright"
    Playwright drives real Chromium, Firefox and WebKit browsers, waits for elements automatically and records traces so failures are easy to debug.
  - Subtopic: "CI and flaky tests"
    Run the suite on every push. A flaky test teaches people to ignore failures, so fix or delete it quickly and avoid fixed sleeps.

### Layer 15 of 15: id frontend-dev-15
Title: Frontend Security, Build Tooling, and Production
Group: "Browser Security"
  - Subtopic: "Cross-site scripting"
    XSS runs an attacker's script on your page. React escapes text by default, so the danger is dangerouslySetInnerHTML, unsafe URLs and third-party scripts. Sanitize any HTML you must render.
  - Subtopic: "CSRF and SameSite cookies"
    A forged request rides on the user's logged-in cookies. SameSite cookies and anti-forgery tokens defend against it.
Group: "Headers and Policies"
  - Subtopic: "Content Security Policy"
    A CSP header limits where scripts, styles and connections may come from, which stops most injected scripts even if an XSS bug exists.
  - Subtopic: "CORS"
    CORS is the server telling the browser which other origins may read its responses. It is enforced by browsers and is not a replacement for authorization.
Group: "Auth and Dependencies"
  - Subtopic: "Storing tokens"
    Any script on the page can read localStorage, so a long-lived token there is stolen by one XSS bug. Prefer HttpOnly, Secure, SameSite cookies for session credentials.
  - Subtopic: "Dependency risk"
    Every npm package runs with your page's privileges. Audit and pin dependencies, review what you add and enable automated security updates.
Group: "Build and Ship"
  - Subtopic: "What Vite does"
    Vite serves source files as native modules in development and bundles with Rollup for production. Variables prefixed VITE_ are exposed to the browser, so they must never hold secrets.
  - Subtopic: "CI/CD and monitoring"
    A pipeline runs lint, tests and a build on every push, creates a preview URL for review and deploys on merge. Error monitoring tells you about failures real users hit.

Start now with Layer 1.
