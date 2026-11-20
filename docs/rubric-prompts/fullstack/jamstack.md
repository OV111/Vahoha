You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: jamstack (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id jamstack-1
Title: Web Foundations and the JAMstack Model
Group: "Web Foundations Theory"
  - Subtopic: "Semantic HTML elements and accessibility basics"
    Semantic elements like <article>, <nav>, and <section> communicate meaning to browsers and assistive technologies. Using them correctly improves SEO and screen-reader support.
  - Subtopic: "Static versus dynamic site rendering models"
    Static sites serve pre-built HTML from a CDN with no server computation at request time. Dynamic sites generate HTML on each request, adding latency but enabling personalisation.
  - Subtopic: "JAMstack philosophy and the decoupled architecture"
    JAMstack decouples the front-end from the back-end by pre-rendering markup and using APIs for dynamic behaviour. This improves security, scalability, and developer experience.
Group: "CDNs and Edge Delivery Concepts"
  - Subtopic: "How content delivery networks cache and serve assets"
    CDNs distribute copies of your static assets across globally located edge nodes so users fetch content from the nearest server. This drastically reduces time-to-first-byte.
  - Subtopic: "Working with third-party REST APIs in the browser"
    The browser Fetch API lets you request data from external services at runtime. Understanding JSON responses and async/await patterns is essential for enriching static pages.
Group: "HTML and CSS Tooling"
  - Subtopic: "CSS Flexbox and Grid layout systems hands-on"
    Flexbox handles one-dimensional layouts while Grid handles two-dimensional ones. Together they replace older float-based approaches and are supported universally.
  - Subtopic: "Responsive design with media queries and fluid units"
    Media queries let you apply different styles at different viewport widths. Fluid units like rem, vw, and percentages reduce the number of breakpoints you need.
Group: "JavaScript Essentials Practice"
  - Subtopic: "ES6 features: arrow functions, destructuring, modules"
    Modern JavaScript syntax like arrow functions, template literals, and ES modules is used throughout every JAMstack framework. Mastering these reduces boilerplate significantly.
  - Subtopic: "Browser DevTools for debugging and network inspection"
    Chrome DevTools lets you inspect DOM, debug JS, and profile network requests. The Network tab is particularly useful for verifying API calls in JAMstack apps.

### Layer 2 of 10: id jamstack-2
Title: React and Component Thinking
Group: "React Core Concepts"
  - Subtopic: "Component model, props, and unidirectional data flow"
    React components are pure functions that accept props and return JSX. Data flows down from parent to child, making state changes predictable and traceable.
  - Subtopic: "State management with useState and useReducer hooks"
    useState stores simple local state while useReducer suits more complex state transitions. Both trigger re-renders when values change, keeping the UI in sync.
  - Subtopic: "Composition patterns and reusable component design"
    Composing small, focused components instead of large monolithic ones improves readability and reuse. Patterns like render props and compound components solve common composition challenges.
Group: "Hooks and Side Effects"
  - Subtopic: "useEffect for data fetching and lifecycle side effects"
    useEffect runs after render and is used to fetch data, subscribe to events, or synchronise with external systems. The dependency array controls when the effect re-runs.
  - Subtopic: "Custom hooks for encapsulating reusable stateful logic"
    Custom hooks are plain functions prefixed with "use" that can call other hooks. They let you extract and share stateful logic without changing your component hierarchy.
Group: "React Tooling and Setup"
  - Subtopic: "Setting up a React project with Vite or Create React App"
    Vite is the modern choice for fast hot-module replacement and lean builds. Create React App is the classic option with a batteries-included setup.
  - Subtopic: "JSX syntax rules and conditional rendering patterns"
    JSX compiles to React.createElement calls and follows JavaScript expression rules inside curly braces. Conditional rendering uses ternary expressions or short-circuit evaluation.
Group: "Data Fetching in React"
  - Subtopic: "Fetching API data with useEffect and handling loading states"
    A standard pattern loads data in useEffect, stores it in state, and renders a loading spinner until the response arrives. Always handle errors with a try-catch block.
  - Subtopic: "React project structure and file organisation conventions"
    Grouping files by feature rather than by type (components/, hooks/, utils/) scales better as projects grow. Co-locating tests and styles with their component reduces navigation overhead.

### Layer 3 of 10: id jamstack-3
Title: Static Sites with Next.js
Group: "Next.js Rendering Strategies"
  - Subtopic: "Static generation versus server-side rendering trade-offs"
    Static generation (getStaticProps) builds pages at deploy time for maximum CDN cacheability. SSR (getServerSideProps) generates pages per-request for real-time data.
  - Subtopic: "Incremental Static Regeneration revalidation concepts"
    ISR lets you update static pages after deploy without a full rebuild by setting a revalidate interval. Pages are regenerated in the background when stale, keeping content fresh.
  - Subtopic: "Metadata API and SEO configuration in Next.js App Router"
    The App Router Metadata API lets you export a metadata object from any layout or page to control title, description, and Open Graph tags. Dynamic metadata supports per-page SEO.
Group: "Routing and Page Architecture"
  - Subtopic: "File-system routing and dynamic route segments explained"
    Next.js maps files in the pages or app directory directly to URL routes. Square-bracket filenames like [slug].tsx define dynamic segments that receive URL params as props.
  - Subtopic: "App Router layouts, loading, and error boundaries"
    Layouts in the App Router persist UI across navigations and can nest. loading.tsx and error.tsx files provide built-in streaming and error boundary support for each route segment.
Group: "Next.js Optimisation Features"
  - Subtopic: "next/image component for automatic image optimisation"
    The next/image component automatically generates WebP, resizes for the viewport, and lazy-loads images. It avoids layout shift by requiring explicit width and height props.
  - Subtopic: "next/font for self-hosted Google Fonts without layout shift"
    next/font downloads Google Fonts at build time and serves them from your own domain, eliminating the extra DNS lookup and preventing font-induced layout shifts.
Group: "Data Fetching Patterns"
  - Subtopic: "Server Components data fetching with async/await"
    React Server Components allow direct async data fetching inside the component body without useEffect. The data is fetched on the server, reducing client-side JavaScript.
  - Subtopic: "Caching and revalidation strategies with fetch options"
    Next.js extends the native fetch API with cache and next.revalidate options. Setting revalidate controls how often cached data is refreshed without a full redeploy.

### Layer 4 of 10: id jamstack-4
Title: Gatsby and the Data Layer
Group: "Gatsby Architecture Concepts"
  - Subtopic: "Gatsby build process and the data layer overview"
    Gatsby builds a GraphQL data layer at compile time by sourcing from files, CMSs, and APIs. Pages then query this layer statically, producing pre-rendered HTML for every route.
  - Subtopic: "Static queries versus page queries and their scope"
    Page queries receive variables from the page context and suit dynamic routes. Static queries via useStaticQuery hook work in any component but cannot accept variables.
  - Subtopic: "Programmatic page creation with createPages API"
    The createPages API in gatsby-node.js lets you generate pages from data at build time. You provide a template component and inject context variables passed into the page query.
Group: "Source Plugins and Data Sourcing"
  - Subtopic: "How source plugins pull external data into Gatsby GraphQL"
    Source plugins fetch data from third-party services like CMSs or APIs and create GraphQL nodes. Gatsby provides official plugins for Contentful, WordPress, and the filesystem.
  - Subtopic: "Writing GraphQL queries with Gatsby GraphiQL explorer"
    GraphiQL is an in-browser IDE available at localhost:8000/___graphql during development. It provides autocomplete and schema introspection to help you craft correct queries quickly.
Group: "Gatsby Image and Build Tooling"
  - Subtopic: "gatsby-plugin-image for responsive image processing"
    gatsby-plugin-image generates multiple resolutions and formats at build time and ships the StaticImage and GatsbyImage components. Images are automatically lazy-loaded with blur-up placeholders.
  - Subtopic: "Gatsby configuration with gatsby-config.js and plugins"
    gatsby-config.js defines site metadata, active plugins, and their options. The plugin order matters for transformer plugins that depend on source plugin output.
Group: "Templates and Dynamic Routes"
  - Subtopic: "Creating blog post templates with dynamic slug routing"
    A common Gatsby pattern creates a template component and loops over Markdown or CMS nodes in gatsby-node.js to generate one page per post. The slug comes from the node path or a custom field.
  - Subtopic: "gatsby-transformer-remark for Markdown content parsing"
    gatsby-transformer-remark converts Markdown files sourced by gatsby-source-filesystem into queryable GraphQL nodes. You can extend it with remark plugins for syntax highlighting and more.

### Layer 5 of 10: id jamstack-5
Title: Headless CMS with Contentful
Group: "Contentful Data Modelling"
  - Subtopic: "Content types, fields, and validation in Contentful"
    Content types define the schema for your content entries, similar to database tables. Each field has a type constraint and optional validations like required or unique.
  - Subtopic: "Preview versus published environments and content workflow"
    Contentful separates preview and delivery API keys. The preview API returns draft entries, enabling staging previews before content is published to production.
  - Subtopic: "Rich text field rendering in React components"
    Rich text fields store structured content as a node tree. The @contentful/rich-text-react-renderer package converts this tree into React elements with customisable node renderers.
Group: "Contentful API Concepts"
  - Subtopic: "Content Delivery API vs Content Management API differences"
    The CDA is a read-only, CDN-backed API for fetching published content in production. The CMA has write access and is used for migrations, seeding, and editorial tooling.
  - Subtopic: "GraphQL API for typed content queries in Contentful"
    Contentful exposes a per-space GraphQL endpoint that mirrors your content types as strongly typed queries. This enables co-locating data requirements with components.
Group: "Querying and Fetching Contentful"
  - Subtopic: "Fetching entries with the Contentful JS SDK"
    The contentful npm package wraps the CDA with typed methods like getEntries and getEntry. Filtering by content type and selecting specific fields reduces payload size.
  - Subtopic: "Querying linked assets and nested references from CDA"
    Contentful entries can reference other entries and assets. Setting the include depth parameter resolves linked entries inline, avoiding waterfall requests for nested content.
Group: "Assets, Media and Gatsby Integration"
  - Subtopic: "Contentful Image API for on-demand image transformation"
    Contentful assets are served through a CDN that accepts query parameters for width, height, format, and quality. This enables responsive images without a separate image service.
  - Subtopic: "gatsby-source-contentful plugin setup and configuration"
    gatsby-source-contentful pulls all published entries into the Gatsby GraphQL layer. You configure it with your space ID and access token in gatsby-config.js.

### Layer 6 of 10: id jamstack-6
Title: APIs and Serverless Functions
Group: "Serverless Functions Concepts"
  - Subtopic: "Serverless execution model and cold start trade-offs"
    Serverless functions run in isolated, stateless containers spun up on demand. Cold starts add latency on the first invocation but the model eliminates server management entirely.
  - Subtopic: "HTTP request and response structure in serverless handlers"
    Netlify and Vercel functions receive an event object with headers, query params, and body. The handler returns a status code, headers, and body just like a standard HTTP server.
  - Subtopic: "Environment variables and secrets management in functions"
    API keys must never be bundled into client-side code. Serverless functions access secrets through environment variables configured in the deployment platform dashboard.
Group: "Error Handling and Rate Limits"
  - Subtopic: "Rate limiting strategies and handling 429 API responses"
    External APIs enforce rate limits and return 429 Too Many Requests when exceeded. Implementing exponential backoff and request queuing prevents cascading failures.
  - Subtopic: "CORS configuration for serverless function endpoints"
    Browser requests to serverless functions from a different origin require CORS headers. You must set Access-Control-Allow-Origin and handle the preflight OPTIONS request.
Group: "Calling External APIs Securely"
  - Subtopic: "Proxying third-party API calls through serverless functions"
    A serverless proxy function receives client requests, adds secret API keys from environment variables, and forwards the call. This keeps credentials off the client entirely.
  - Subtopic: "Form submission handling without a backend server"
    Serverless functions can receive form POST requests, validate input, and send emails via services like SendGrid or Mailgun. Netlify Forms provides zero-config form handling as an alternative.
Group: "Next.js API Routes and Edge Functions"
  - Subtopic: "Next.js Route Handlers as serverless API endpoints"
    Files in the app/api directory export named HTTP method handlers that become serverless functions on Vercel. They share the same Node.js environment as the rest of the app.
  - Subtopic: "Edge Functions for low-latency personalisation and middleware"
    Edge Functions run on the CDN edge, close to the user, in a lightweight V8 runtime. They are ideal for A/B testing, redirects, and auth checks with sub-millisecond overhead.

### Layer 7 of 10: id jamstack-7
Title: Authentication and Identity
Group: "Authentication Concepts"
  - Subtopic: "OAuth 2.0 and OpenID Connect flows explained"
    OAuth 2.0 delegates authorisation to an identity provider while OpenID Connect adds an identity layer on top. The authorisation code flow with PKCE is the safest choice for SPAs.
  - Subtopic: "JWT structure, signing, and verification fundamentals"
    A JWT contains a base64-encoded header, payload, and signature. The server verifies the signature with a secret or public key, so no session lookup is needed per request.
  - Subtopic: "Session cookies versus token-based authentication comparison"
    Session cookies store a server-side session ID in a HttpOnly cookie; tokens are self-contained and stateless. Cookies provide better security defaults for web apps; tokens suit APIs and mobile clients.
Group: "Roles and Access Control"
  - Subtopic: "Role-based access control and gated content patterns"
    RBAC assigns roles like admin or member to users, and each route or resource checks the role before granting access. Storing roles in JWT claims enables stateless authorisation.
  - Subtopic: "Protecting serverless API routes from unauthenticated requests"
    Serverless functions must validate the JWT on every request since they are stateless. Libraries like jsonwebtoken verify the token and reject requests without a valid bearer token.
Group: "Auth Providers and SDKs"
  - Subtopic: "NextAuth.js setup with GitHub and Google OAuth providers"
    NextAuth.js (Auth.js) integrates into the Next.js App Router with a single route handler. Configuring OAuth providers requires creating app credentials in the provider dashboard.
  - Subtopic: "Netlify Identity for zero-config JAMstack authentication"
    Netlify Identity provides sign-up, login, and JWT issuance with no backend code. The netlify-identity-widget handles the UI flow and exposes user data to serverless functions via context.
Group: "Login Flows and Route Protection"
  - Subtopic: "Building login and signup forms with validation"
    Login forms send credentials to an auth endpoint and store the returned token in a cookie or memory. Client-side validation improves UX while server-side validation enforces security.
  - Subtopic: "Next.js Middleware for protecting authenticated routes"
    Middleware runs before every matched route and can redirect unauthenticated users to the login page. Checking a session cookie or verifying a JWT in middleware is the recommended pattern.

### Layer 8 of 10: id jamstack-8
Title: Performance and SEO
Group: "Core Web Vitals Theory"
  - Subtopic: "LCP, CLS, and INP metrics and what affects them"
    Largest Contentful Paint measures loading, Cumulative Layout Shift measures visual stability, and Interaction to Next Paint measures responsiveness. Each has a specific good/needs improvement/poor threshold.
  - Subtopic: "Code splitting and lazy loading to reduce bundle size"
    Code splitting breaks JavaScript into smaller chunks loaded on demand. React.lazy and dynamic imports defer non-critical code, reducing the initial bundle and improving LCP.
  - Subtopic: "SEO structured data with JSON-LD and schema.org markup"
    JSON-LD embedded in a <script type="application/ld+json"> tag signals content type to search engines. Schema.org types like Article, Product, and BreadcrumbList enable rich snippets.
Group: "SEO Fundamentals"
  - Subtopic: "Sitemaps and robots.txt for crawl budget management"
    An XML sitemap lists every URL you want indexed and helps search engines discover new pages quickly. robots.txt controls which paths crawlers are allowed to visit.
  - Subtopic: "Open Graph and Twitter Card meta tags for social sharing"
    Open Graph meta tags control how your pages appear when shared on Facebook, LinkedIn, and Slack. Twitter Card tags do the same for Twitter and require og:image to be at least 600px wide.
Group: "Image and Asset Optimisation"
  - Subtopic: "Image formats WebP and AVIF for smaller file sizes"
    WebP provides roughly 30% smaller files than JPEG at equivalent quality, and AVIF compresses even further. next/image and gatsby-plugin-image generate both formats automatically.
  - Subtopic: "Preloading critical fonts and eliminating render-blocking resources"
    Fonts block rendering unless preloaded or loaded asynchronously. Using font-display: swap prevents invisible text and the next/font module handles preloading automatically.
Group: "Lighthouse and Performance Auditing"
  - Subtopic: "Running Lighthouse CI in GitHub Actions for regressions"
    Lighthouse CI runs automated audits on every pull request and fails the build if performance scores drop below a threshold. Configuration is defined in a lighthouserc.json file.
  - Subtopic: "Chrome DevTools Performance panel for diagnosing bottlenecks"
    The Performance panel records a flame chart of JS execution, layout, and paint events. Long tasks blocking the main thread are the primary cause of poor INP scores.

### Layer 9 of 10: id jamstack-9
Title: E-commerce and Dynamic Data
Group: "E-commerce Architecture Concepts"
  - Subtopic: "Product catalogue modelling in a headless CMS"
    Product content types store name, description, price, and images as structured fields. Variants like size or colour can be modelled as nested entries or JSON fields depending on the CMS.
  - Subtopic: "Cart state management with Context API or Zustand"
    Cart state must persist across route changes, so it lives above the router in a React Context or a lightweight store like Zustand. localStorage can hydrate the cart on page refresh.
  - Subtopic: "Stripe payment intents and the checkout session flow"
    Stripe Checkout Sessions are server-created objects that produce a hosted payment page URL. On success, Stripe redirects to your success URL with a session ID for order confirmation.
Group: "Webhooks and Order Processing"
  - Subtopic: "Stripe webhooks for reliable post-payment event processing"
    Webhooks send signed POST requests to your serverless function when payment events like checkout.session.completed occur. Verifying the Stripe-Signature header prevents spoofed events.
  - Subtopic: "Order confirmation emails with serverless and SendGrid"
    After a successful payment webhook, a serverless function can trigger a transactional email via SendGrid or Resend. The email template includes order details from the Stripe session.
Group: "Stripe Integration Tooling"
  - Subtopic: "Stripe JS SDK and stripe-js client-side integration"
    The @stripe/stripe-js package loads Stripe.js asynchronously and exposes methods for creating payment elements. Always load it from Stripe CDN to satisfy PCI compliance.
  - Subtopic: "Stripe CLI for local webhook testing and event replay"
    stripe listen forwards live webhook events to your localhost serverless function. stripe trigger fires test events so you can verify your webhook handler without real payments.
Group: "Dynamic Data and Serverless Checkout"
  - Subtopic: "Creating Stripe Checkout Sessions in serverless functions"
    A serverless function uses the Stripe Node SDK to create a Checkout Session with line_items derived from the cart. The session URL is returned to the client for redirect.
  - Subtopic: "Reading Stripe session data on the success page"
    The success URL can include {CHECKOUT_SESSION_ID} as a template variable. Your success page fetches this session ID from a serverless proxy to display the confirmed order details.

### Layer 10 of 10: id jamstack-10
Title: Deployment and Continuous Delivery
Group: "Continuous Delivery Concepts"
  - Subtopic: "Git-based deployments and trunk-based development workflow"
    Netlify and Vercel deploy automatically when you push to your configured branch. Trunk-based development keeps the main branch always deployable by using short-lived feature branches.
  - Subtopic: "Deploy previews for pull request review and testing"
    Deploy previews generate a unique URL for every pull request so stakeholders can review changes before merge. Each preview runs the full build pipeline in an isolated environment.
  - Subtopic: "Build hooks for triggering deploys from CMS content changes"
    A build hook is a unique URL that triggers a new deploy when called via HTTP POST. Contentful and Sanity webhooks can call this URL whenever content is published.
Group: "Monitoring and Rollbacks"
  - Subtopic: "Instant rollbacks to previous deploys on Netlify"
    Netlify retains every previous deploy and lets you one-click restore any prior version. This provides a safety net if a new deploy introduces a regression caught after release.
  - Subtopic: "Error monitoring with Sentry for production JAMstack apps"
    Sentry captures JavaScript exceptions and serverless function errors with full stack traces and context. Integrating source maps lets Sentry show the original TypeScript source of minified errors.
Group: "Netlify Configuration and Build"
  - Subtopic: "netlify.toml build commands, publish directory, and plugins"
    netlify.toml defines your build command, publish directory, and environment-specific overrides. Netlify Build Plugins extend the build pipeline with hooks like onPreBuild and onPostBuild.
  - Subtopic: "Managing build environment variables per deploy context"
    Netlify supports different environment variable values per context (production, deploy-preview, branch-deploy). This lets you point staging deploys at a different CMS environment or API endpoint.
Group: "Custom Domains and HTTPS"
  - Subtopic: "Configuring a custom domain and automatic TLS on Netlify"
    Netlify provisions a free Let's Encrypt certificate automatically when you add a custom domain. You add a CNAME or A record in your DNS provider pointing to Netlify's load balancer.
  - Subtopic: "Netlify redirect rules and _redirects file configuration"
    The _redirects file in your publish directory maps old URLs to new ones with optional HTTP status codes. Rules support wildcards and splats for flexible migration patterns.

Start now with Layer 1.
