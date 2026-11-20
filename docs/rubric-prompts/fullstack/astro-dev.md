You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: astro-dev (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id astro-dev-1
Title: Web and TypeScript Foundations
Group: "HTML Semantics & Accessibility"
  - Subtopic: "Semantic HTML Elements"
    Semantic elements like <article>, <section>, <nav>, and <main> communicate meaning to browsers, assistive technologies, and search engines — not just visual structure. Using <div> for everything breaks screen reader navigation and hurts SEO; search engines demote pages that don't clearly signal content hierarchy.
  - Subtopic: "ARIA and Accessibility Tree"
    The accessibility tree is a parallel representation of the DOM consumed by screen readers. Misusing ARIA roles or omitting alt attributes causes assistive technology to misinterpret page structure, making content inaccessible to users with disabilities and violating WCAG standards.
Group: "CSS Layout Fundamentals"
  - Subtopic: "CSS Box Model"
    Every element is a box composed of content, padding, border, and margin. Without understanding box-sizing: border-box, adding padding to a fixed-width element causes unexpected overflow and layout breaks — a common source of misalignment bugs in component-based designs.
  - Subtopic: "Flexbox and Grid"
    Flexbox handles one-dimensional layouts (rows or columns) while Grid handles two-dimensional layouts simultaneously. Choosing the wrong model forces brittle workarounds; using Grid for a simple nav bar adds unnecessary complexity, while using Flexbox for a full-page grid creates alignment nightmares.
Group: "TypeScript Type System"
  - Subtopic: "Static Typing and Type Inference"
    TypeScript's type system catches category errors at compile time rather than runtime, preventing entire classes of bugs. Relying only on type inference without explicit annotations on function signatures causes types to widen unexpectedly, letting invalid data propagate silently through the codebase.
  - Subtopic: "Interfaces and Type Aliases"
    Interfaces and type aliases both define object shapes, but interfaces support declaration merging while type aliases support unions and intersections. Choosing the wrong one for a given pattern — such as using a type alias when you need augmentation across modules — causes hard-to-trace compilation errors.
Group: "Responsive Design"
  - Subtopic: "Mobile-First Media Queries"
    Mobile-first design starts with the smallest viewport and adds complexity at larger breakpoints, resulting in leaner CSS that doesn't override itself. Writing desktop-first and undoing styles for mobile leads to specificity conflicts and unnecessarily heavy stylesheets on low-power devices.
  - Subtopic: "CSS Custom Properties"
    CSS custom properties (variables) enable dynamic theming and design tokens that cascade through the DOM. Hardcoding color and spacing values instead forces global find-and-replace for any brand change and makes dark mode or multi-theme support nearly impossible without JavaScript.

### Layer 2 of 10: id astro-dev-2
Title: Astro Basics and Components
Group: "Astro Component Model"
  - Subtopic: "Component Script Fence"
    The frontmatter fence (---) in .astro files runs exclusively on the server at build time, meaning any code there never ships to the browser. Placing expensive data fetching or secrets in the wrong location — such as a client-side script tag — exposes them in the browser bundle and bloats JavaScript payloads.
  - Subtopic: "Props and Component Composition"
    Astro components receive typed props defined with TypeScript interfaces in the frontmatter, enabling compile-time validation of component APIs. Omitting type definitions lets invalid prop shapes pass silently and only fail at runtime during rendering, making bugs hard to trace in large component trees.
Group: "Zero-JS by Default"
  - Subtopic: "HTML-first Output"
    Astro components compile to pure HTML with no JavaScript by default, delivering the fastest possible first paint. Adding unnecessary client-side JS through framework components without explicit client directives defeats Astro's performance model and re-introduces the hydration overhead Astro is designed to eliminate.
  - Subtopic: "Slots and Template Composition"
    Astro slots allow parent components to inject HTML content into child component placeholders, enabling flexible layout composition without prop drilling. Ignoring slots forces you to duplicate layout markup across pages or pass raw HTML as strings, breaking encapsulation and making refactoring error-prone.
Group: "Astro Templating"
  - Subtopic: "Astro Template Expressions"
    Astro uses JSX-like expressions in templates but renders them server-side, meaning dynamic values are resolved at build or request time. Treating Astro templates as if they support reactive state like React leads to runtime errors because there is no browser-side reactivity engine unless you explicitly add a framework island.
  - Subtopic: "Scoped CSS in Astro"
    Astro automatically scopes <style> blocks to the component by adding a unique data attribute, preventing style leakage across component boundaries. Using global selectors without the :global() escape hatch inside scoped styles causes unexpected specificity mismatches when styles appear not to apply.
Group: "TypeScript in Astro"
  - Subtopic: "Strict Mode TypeScript Config"
    Astro projects include a tsconfig.json with strict mode enabled, which activates stricter null checks and type narrowing rules. Disabling strict mode to avoid errors masks bugs like null dereferences that will crash pages at runtime when content is missing or API responses are empty.
  - Subtopic: "Type-safe Component Imports"
    Astro resolves component imports with full TypeScript type checking, ensuring component prop interfaces are validated at compile time. Importing components with incorrect paths or missing type exports causes silent any-typing that allows invalid props to reach the template, causing render failures in production.

### Layer 3 of 10: id astro-dev-3
Title: Routing, Layouts, and Pages
Group: "File-Based Routing"
  - Subtopic: "Pages Directory Structure"
    Astro maps files in src/pages/ directly to URL routes, where index.astro becomes the root and nested folders become URL segments. Misunderstanding this convention — such as putting pages in the wrong directory or naming files with incorrect casing on case-sensitive servers — produces 404 errors that only appear in production.
  - Subtopic: "Dynamic Routes and getStaticPaths"
    Dynamic route segments like [slug].astro require a getStaticPaths() function to tell Astro which URL combinations to pre-build. Omitting getStaticPaths in static output mode causes a build error because Astro cannot enumerate routes; returning an incomplete list silently 404s valid URLs at runtime.
Group: "Layouts"
  - Subtopic: "Layout Components and Slot Injection"
    Astro layouts are ordinary components that wrap pages using a <slot /> to inject page content, allowing shared headers, footers, and <head> metadata to be defined once. Duplicating layout markup across pages instead means a single structural change (like adding a nav link) requires editing every page file, leading to drift and inconsistency.
  - Subtopic: "Nested Layouts"
    Astro supports nesting layouts so a blog layout can wrap inside a base layout, enabling compositional page structure without repetition. Failing to pass required props between nested layouts — such as the page title or SEO metadata — results in missing <title> tags and broken Open Graph previews in production.
Group: "Navigation Patterns"
  - Subtopic: "View Transitions API"
    Astro's View Transitions integration wraps the browser's native View Transitions API to animate between pages without a full-page reload. Not importing the <ViewTransitions /> component or using it incorrectly disables the animation fallback, causing jarring hard navigations or JavaScript errors in unsupported browsers.
  - Subtopic: "Prefetching and Link Optimization"
    Astro can prefetch linked pages on hover or viewport intersection, dramatically reducing perceived navigation time. Disabling prefetch on content-heavy sites or applying it globally on every link wastes bandwidth on pages the user never visits, hurting performance on mobile networks.
Group: "Output Modes"
  - Subtopic: "Static vs Server Output"
    Astro's output: 'static' pre-renders all pages at build time while output: 'server' or 'hybrid' enables on-demand server-side rendering. Using static output for pages that require real-time user data (like personalized dashboards) results in stale content; using server output unnecessarily adds hosting complexity and cost for content that never changes.
  - Subtopic: "404 and Error Pages"
    A 404.astro file in src/pages/ generates a custom not-found page that Astro and most hosting providers serve automatically. Without it, broken links return the host's default error page, stripping your site's branding and providing no navigation back to valid content, increasing bounce rates.

### Layer 4 of 10: id astro-dev-4
Title: Content Collections and MDX
Group: "Content Collections"
  - Subtopic: "Collection Schema Definition"
    Content collections use Zod schemas defined in src/content/config.ts to validate frontmatter at build time, catching missing fields before the site is deployed. Without a schema, invalid or missing frontmatter passes through silently, causing undefined references in templates that only surface as blank content or crashes in production.
  - Subtopic: "getCollection and getEntry APIs"
    The getCollection() function retrieves all validated entries from a collection while getEntry() fetches a single entry by slug, both providing fully-typed return values. Querying collections without these APIs (such as using fs.readdir) bypasses schema validation and loses TypeScript inference, making content type errors undetectable until runtime.
Group: "MDX Integration"
  - Subtopic: "MDX Components and Slots"
    MDX allows importing and using React/Astro components directly inside Markdown files, enabling rich interactive content within editorial workflows. Forgetting to add @astrojs/mdx to the integrations array in astro.config.mjs causes .mdx files to be served as raw text, and component imports inside them throw build errors.
  - Subtopic: "Remark and Rehype Plugins"
    Remark processes Markdown syntax while Rehype processes the resulting HTML, and both support plugins for syntax highlighting, table of contents generation, and link transformation. Applying plugins in the wrong pipeline (remark vs rehype) causes them to silently fail because they receive the wrong AST format.
Group: "Frontmatter and Data Modeling"
  - Subtopic: "Typed Frontmatter with Zod"
    Zod's schema primitives (z.string(), z.date(), z.array()) map directly to YAML frontmatter types, giving you compile-time and build-time guarantees about content structure. Using z.any() or skipping validation entirely means a typo in a date field produces a JavaScript Date object from an invalid string, breaking sort operations silently.
  - Subtopic: "Reference Fields Between Collections"
    Astro's reference() helper creates typed foreign-key relationships between collections, allowing a blog post to reference an author collection entry with full type safety. Without reference(), linking content across collections requires manual slug matching and produces untyped objects that cause TypeScript errors downstream.
Group: "Content Rendering"
  - Subtopic: "render() and <Content /> Component"
    Calling entry.render() on a collection entry returns a <Content /> component that renders the compiled MDX/Markdown body into HTML. Trying to inject the raw body string as innerHTML bypasses Astro's sanitization and MDX component injection, producing broken output and potential XSS vulnerabilities.
  - Subtopic: "Slug Generation and URL Mapping"
    Collection slugs are automatically generated from file names and used to construct page URLs via getStaticPaths(). Custom slug fields in the schema override file-based slugs, but omitting getStaticPaths() entries for custom slugs causes 404s for those routes since Astro never pre-builds them.

### Layer 5 of 10: id astro-dev-5
Title: Islands and Interactivity
Group: "Islands Architecture"
  - Subtopic: "Client Directives"
    Astro's client:* directives control when and how a component is hydrated in the browser: client:load hydrates immediately, client:idle waits for the browser to be free, and client:visible waits until the component scrolls into view. Using client:load for every interactive component sends all JS upfront and defeats Astro's progressive hydration model, increasing Time to Interactive.
  - Subtopic: "Island Isolation and Props Serialization"
    Each island is independently hydrated with its own JavaScript bundle, and props passed to islands must be JSON-serializable because they are embedded in the HTML as data attributes. Passing non-serializable values like functions, class instances, or circular references causes hydration to silently fail or throw runtime errors.
Group: "React Integration"
  - Subtopic: "Adding the React Integration"
    The @astrojs/react integration adds Babel transforms and React runtime to the Astro build pipeline, enabling .tsx and .jsx components. Importing React components without this integration causes build errors; importing them with the wrong file extension causes Astro to treat them as Astro components and fail to resolve JSX syntax.
  - Subtopic: "Server-Side vs Client-Side React"
    React components used in Astro without a client directive are rendered to static HTML on the server with no hydration — no hooks, no events, no state. Using useState or useEffect in a component that lacks a client directive causes a build error or renders a broken static shell, confusing developers who expect React's usual behavior.
Group: "Interactivity Patterns"
  - Subtopic: "Nano Stores for Shared State"
    Nano Stores is the recommended library for sharing reactive state between multiple islands regardless of framework, using tiny observable atoms that update all subscribers. Without a cross-island state solution, each island maintains isolated state, making features like a cart count syncing between a header island and a product page island impossible without full-page reloads.
  - Subtopic: "Script Tags and Client-Side JS"
    Astro's <script> tag in .astro components is bundled and deduped by the build pipeline, meaning the same script imported from multiple components only ships once. Using inline <script> tags with is:inline bypasses bundling and deduplication, potentially shipping duplicate JavaScript and breaking module-based imports.
Group: "Multiple Framework Support"
  - Subtopic: "Mixing Frameworks in One Project"
    Astro uniquely supports React, Vue, Svelte, and other frameworks simultaneously in the same project, each rendered as independent islands. Attempting to pass a React component as a prop to a Vue island fails because the two frameworks use incompatible virtual DOM representations — communication must happen via Nano Stores or the DOM.
  - Subtopic: "client:only Directive"
    The client:only directive skips server-side rendering entirely and renders the component only in the browser, required for components that depend on browser APIs like window or localStorage that don't exist in Node.js. Using client:load on such components causes server-render errors during the build because Node.js has no DOM.

### Layer 6 of 10: id astro-dev-6
Title: Styling and Design Systems
Group: "CSS in Astro"
  - Subtopic: "Scoped Styles and :global()"
    Astro's scoped styles are confined to the component where they're declared by injecting a unique class attribute, preventing style pollution across components. Without understanding the :global() escape hatch, developers either create overly broad global styles that leak into unrelated components or struggle to style third-party HTML that Astro doesn't own.
  - Subtopic: "Global Stylesheets"
    Global CSS files are imported in layout components or page frontmatter and apply to all HTML output without scoping. Importing a global stylesheet in every component instead of once in a shared layout causes duplicate CSS in the final bundle, increasing page weight and potentially creating specificity conflicts from duplicate declarations.
Group: "Tailwind CSS Integration"
  - Subtopic: "Tailwind with Astro Integration"
    The @astrojs/tailwind integration configures PostCSS and injects Tailwind's base, components, and utilities layers automatically into Astro's build pipeline. Manually configuring Tailwind without the integration risks missing the purge configuration for .astro files, causing unused utility classes to remain in production CSS and bloating stylesheet size.
  - Subtopic: "Tailwind Configuration and Design Tokens"
    The tailwind.config.mjs file extends the default design system with custom colors, spacing, fonts, and breakpoints that become first-class utilities. Hardcoding values in class names instead of extending the config (e.g., w-[247px]) creates inconsistency in the design system and makes global design changes require find-and-replace across the entire codebase.
Group: "Design Systems"
  - Subtopic: "CSS Custom Properties as Design Tokens"
    Design tokens defined as CSS custom properties in a :root block create a single source of truth for colors, spacing, and typography that both CSS and JavaScript can read. Duplicating token values across component stylesheets means a brand color change requires updating dozens of files instead of one variable, introducing mismatches and visual inconsistency.
  - Subtopic: "Dark Mode with CSS and Tailwind"
    Dark mode can be implemented via the prefers-color-scheme media query or Tailwind's dark: variant, which requires the darkMode: 'class' config option and toggling a class on <html>. Using inline styles for dark mode values instead of CSS variables or Tailwind utilities breaks the connection between the system color scheme preference and the site's visual state.
Group: "CSS Architecture"
  - Subtopic: "PostCSS and CSS Processing"
    Astro runs CSS through PostCSS automatically, enabling autoprefixer (for browser compatibility), nesting, and custom transforms. Skipping autoprefixer means vendor-prefixed properties like -webkit-backdrop-filter are absent from the output, causing visual failures in Safari that are invisible during Chrome-only development.
  - Subtopic: "CSS Layers and Specificity Control"
    CSS @layer allows organizing styles into named layers with explicit priority order, preventing specificity wars between reset styles, component styles, and utility classes. Without layers, adding a Tailwind utility to override a component style requires increasingly specific selectors or !important, eroding maintainability.

### Layer 7 of 10: id astro-dev-7
Title: Server Rendering and Endpoints
Group: "Server-Side Rendering"
  - Subtopic: "SSR Adapters"
    Astro requires an adapter to deploy server-rendered output to a specific runtime environment: @astrojs/node for Node.js servers, @astrojs/netlify for Netlify Functions, and @astrojs/vercel for Vercel Edge. Using the wrong adapter or forgetting to add one when switching to output: 'server' causes the build to succeed but the deployed site to crash immediately at the first server-rendered request.
  - Subtopic: "Request and Response Objects"
    In SSR mode, Astro exposes the standard web Request object in page frontmatter, giving access to headers, cookies, and URL parameters at request time. Reading request headers in static output mode throws a runtime error because there is no request at build time; this mismatch is a common source of confusion when migrating from static to hybrid rendering.
Group: "API Endpoints"
  - Subtopic: "REST Endpoints in src/pages"
    Astro treats .ts and .js files in src/pages/ as API endpoints when they export GET, POST, or other HTTP method handlers, returning Response objects. Exporting a default function instead of named HTTP method exports causes Astro to ignore the file as an endpoint, resulting in a 404 for API routes that appear to be correctly placed.
  - Subtopic: "Middleware in Astro"
    Astro middleware runs server-side code before every request, enabling authentication, logging, and request transformation via a src/middleware.ts file exporting an onRequest function. Not calling next() within middleware halts the request chain and returns no response, causing all pages to return empty or hang indefinitely.
Group: "Node.js Integration"
  - Subtopic: "Node.js Adapter and Streaming"
    The @astrojs/node adapter enables running Astro as an Express-compatible Node.js server with support for HTTP streaming, enabling faster time-to-first-byte for server-rendered pages. Not enabling streaming when using the Node adapter defaults to buffering entire responses, increasing latency for content-heavy pages and reducing perceived performance.
  - Subtopic: "Environment Variables and Secrets"
    Astro exposes environment variables prefixed with PUBLIC_ to the browser and keeps all others server-only, preventing accidental secret exposure. Using a non-PUBLIC_ variable in a client-side script or island causes it to be undefined in the browser; using a PUBLIC_ prefix on a secret variable exposes it in the HTML source to all users.
Group: "Cookies and Sessions"
  - Subtopic: "Cookie API in Astro SSR"
    Astro's Astro.cookies API provides a typed, ergonomic wrapper for reading and setting HTTP cookies in server-rendered pages and endpoints. Manipulating cookies via raw Set-Cookie headers bypasses Astro's serialization helpers, making it easy to produce malformed cookie strings that browsers silently reject, breaking session persistence.
  - Subtopic: "Authentication Patterns"
    Authentication in Astro SSR typically combines session tokens stored in cookies with middleware that validates the token on every request and injects user data into Astro.locals. Checking auth inside individual page components instead of middleware means protected pages are vulnerable if the component check is accidentally removed during refactoring.

### Layer 8 of 10: id astro-dev-8
Title: Data, CMS, and Integrations
Group: "CMS Integration"
  - Subtopic: "Headless CMS with Astro"
    Astro fetches content from headless CMSes like Contentful, Sanity, or Storyblok at build time using their REST or GraphQL APIs, enabling full static generation of CMS-driven content. Fetching CMS data client-side instead of at build time exposes API keys in the browser bundle and eliminates the performance benefit of pre-rendered HTML.
  - Subtopic: "Incremental Static Regeneration"
    Astro's hybrid output mode allows individual pages to opt into SSR while keeping others static, enabling on-demand revalidation of CMS content without full rebuilds. Using purely static output with a CMS requires a full redeploy for every content update, making editorial workflows impractical for frequently changing content.
Group: "Data Fetching"
  - Subtopic: "fetch() in Astro Frontmatter"
    The native fetch() API is available in Astro frontmatter for server-side data fetching, running in Node.js during build or on the server during SSR requests. Using fetch() inside a client-side script instead of frontmatter sends requests from the user's browser, leaking API endpoints, increasing latency, and exposing credentials stored in environment variables.
  - Subtopic: "Parallel Data Fetching with Promise.all"
    Multiple independent fetch() calls in Astro frontmatter should be executed in parallel using Promise.all() to avoid waterfall latency, where each request waits for the previous to complete. Sequential awaits for independent API calls multiply request latency, dramatically increasing build times for sites with many content types or API-driven pages.
Group: "Astro Integrations"
  - Subtopic: "Official Integrations Ecosystem"
    Astro's integration API allows first and third-party plugins to modify the build pipeline, add file processors, inject scripts, and configure the dev server via astro.config.mjs. Directly modifying Vite config to add behavior instead of using the integration API risks breaking Astro's internal assumptions and causes subtle build failures when Astro's own Vite plugins run in conflicting order.
  - Subtopic: "Image Optimization with astro:assets"
    Astro's built-in <Image /> component from astro:assets automatically generates optimized WebP/AVIF formats, resizes images, and adds width/height to prevent layout shift. Serving raw unoptimized images with <img> tags bypasses this pipeline, leading to multi-megabyte images being sent to mobile users and failing Core Web Vitals LCP thresholds.
Group: "TypeScript and API Types"
  - Subtopic: "Typing External API Responses"
    Defining TypeScript interfaces for external API response shapes and using them with type assertions or Zod validation ensures fetch() responses are consumed with type safety. Casting API responses to any eliminates the compiler's ability to catch field renames or schema changes in the API, causing runtime property access errors that only appear in production.
  - Subtopic: "Astro.locals for Request-Scoped Data"
    Astro.locals is a typed, request-scoped storage object populated in middleware and accessible in any page or endpoint during the same request lifecycle. Storing per-request data in module-level variables instead of Astro.locals causes data to leak between concurrent requests in SSR, producing one user's session data appearing in another user's response.

### Layer 9 of 10: id astro-dev-9
Title: Performance and SEO
Group: "Core Web Vitals"
  - Subtopic: "Largest Contentful Paint (LCP)"
    LCP measures how long the largest visible content element takes to render, directly impacting perceived load speed and Google search rankings. Serving large unoptimized hero images, delaying them with JavaScript, or failing to add fetchpriority='high' to the LCP image causes poor scores even on sites with fast server response times.
  - Subtopic: "Cumulative Layout Shift (CLS)"
    CLS measures unexpected layout movements during page load, penalizing pages where content jumps as images load or ads insert above existing content. Omitting explicit width and height attributes on images and iframes prevents the browser from reserving space, causing content below to shift down and degrading the CLS score.
Group: "Lighthouse Auditing"
  - Subtopic: "Running Lighthouse in CI"
    Lighthouse CI integrates automated performance, accessibility, and SEO auditing into deployment pipelines, failing builds when scores drop below defined thresholds. Running Lighthouse only manually during development allows regressions to ship unnoticed; a component that adds 200KB of JavaScript can drop the performance score by 20 points without anyone catching it.
  - Subtopic: "Performance Budget"
    A performance budget sets maximum thresholds for JavaScript bundle size, image weight, and time-to-interactive, enforced through Lighthouse CI or bundler plugins. Without a budget, incremental feature additions each seem minor but compound over time, resulting in a site that gradually degrades from fast to slow without any single change being the obvious culprit.
Group: "SEO Fundamentals"
  - Subtopic: "Meta Tags and Open Graph"
    HTML meta tags for description, Open Graph (og:title, og:image), and Twitter Card provide search engines and social platforms with structured page summaries. Missing or duplicate meta descriptions cause search engines to generate their own snippets from page content, often resulting in irrelevant or truncated previews that reduce click-through rates.
  - Subtopic: "Sitemap Generation"
    The @astrojs/sitemap integration automatically generates a sitemap.xml listing all public URLs, helping search engine crawlers discover and index all pages. Without a sitemap, crawlers rely solely on link discovery, meaning pages that are only accessible via JavaScript navigation or are deep in the site structure may never be indexed.
Group: "Asset Optimization"
  - Subtopic: "Font Loading Strategy"
    Loading web fonts with font-display: swap prevents invisible text during font load (FOIT) and instead shows a fallback font immediately, reducing perceived latency. Using the default font-display behavior blocks text rendering until the custom font downloads, causing measurable LCP and FCP regressions on slow connections.
  - Subtopic: "Critical CSS and Resource Hints"
    Critical CSS inlines the styles needed for above-the-fold rendering directly in <head>, eliminating render-blocking stylesheets for the initial viewport. Without critical CSS extraction, the browser must download, parse, and apply all stylesheets before painting any content, causing higher FCP times especially on mobile connections.

### Layer 10 of 10: id astro-dev-10
Title: Testing and Deployment
Group: "End-to-End Testing with Playwright"
  - Subtopic: "Playwright Setup and Configuration"
    Playwright's playwright.config.ts defines browsers, base URLs, timeouts, and test parallelism, serving as the single source of truth for the test environment. Hardcoding localhost URLs in individual test files rather than using baseURL in config causes all tests to break when the dev server port changes, requiring mass find-and-replace across the test suite.
  - Subtopic: "Page Object Model Pattern"
    The Page Object Model encapsulates page-specific selectors and interactions into reusable classes, decoupling test logic from DOM structure. Writing raw locators directly in every test file means a single CSS class rename requires updating every test that touches the affected element, causing tests to become a maintenance burden instead of a safety net.
Group: "Testing Strategy"
  - Subtopic: "Accessibility Testing in Playwright"
    Playwright's getByRole() and getByLabel() locators test by ARIA semantics rather than CSS classes, simultaneously asserting that the accessibility tree is correct. Using CSS selectors like .btn or #submit in tests passes even when the element has no accessible name, hiding accessibility regressions that break screen reader users.
  - Subtopic: "Visual Regression Testing"
    Playwright's screenshot comparison feature captures pixel-level snapshots and fails tests when visual differences exceed a threshold, catching unintended UI changes from CSS or component updates. Without visual regression tests, a CSS refactor that shifts layout by a few pixels ships unnoticed until users report visual bugs.
Group: "Deployment with Netlify"
  - Subtopic: "Netlify Adapter and Build Config"
    The @astrojs/netlify adapter configures Astro to output Netlify Functions for SSR endpoints and Edge Functions for middleware, with the build command and publish directory set in netlify.toml. Misconfiguring the publish directory (e.g., pointing to the project root instead of dist/) causes Netlify to deploy the source code rather than the built output, producing a blank site.
  - Subtopic: "Continuous Deployment and Preview Deploys"
    Netlify automatically builds and deploys preview URLs for every pull request, enabling review of changes in a production-like environment before merging. Skipping preview deploy review means undetected build environment differences — such as missing environment variables or platform-specific behavior — only surface after merging to main, requiring emergency rollbacks.
Group: "CI/CD Integration"
  - Subtopic: "GitHub Actions for Astro"
    GitHub Actions workflows can install dependencies, run Playwright tests against a built Astro site, and block merges when tests fail, creating a fully automated quality gate. Running tests only locally and relying on manual review allows broken builds to merge when developers are under time pressure, degrading the reliability of the deployment pipeline.
  - Subtopic: "Environment Variable Management in CI"
    Production secrets must be injected into CI build environments via repository or organization secrets rather than committed to source control, with Astro's PUBLIC_ prefix controlling which variables are safe to embed in client HTML. Storing secrets in the repository — even in environment-specific .env files — exposes them in version history and to anyone with repository read access.

Start now with Layer 1.
