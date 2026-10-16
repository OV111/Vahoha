You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Frontend Developer" (frontend-dev, category fullstack). It has 15 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line: the layer marker, exactly like this, with the layer id from the list:
LAYER: <layer id>
Then ONE ```json code block containing a JSON array of exactly 60 objects. No text after the block. Each object has exactly these fields:

```json
{
  "stem": "the question text",
  "topic": "one topic copied word for word from that layer's Topics list",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answerIdx": 2
}
```

- "choices" has exactly 4 strings; "answerIdx" is the index (0-3) of the one correct choice.
- Do NOT add "id", "explanation" or any other field.

## QUESTION RULES
1. Test understanding of a concept a working developer must know, not trivia, version numbers or memorised syntax.
2. Exactly one choice is correct. Re-read each question and verify the key before you output it. If you are not sure of the answer, replace the question.
3. Distractors must be plausible mistakes a real learner would make, not jokes and not obviously wrong.
4. No "all of the above", "none of the above", "both A and B", and no negative stems ("which is NOT...").
5. LENGTH BIAS IS THE MOST COMMON FAILURE. Models write the correct answer as the longest, most detailed choice, and learners learn to pick it without knowing the material. Write the three wrong choices FIRST, with the same level of detail, specific terms and length as the right one. The correct choice may be the longest in only about 1 of every 4 questions; in about 1 of 4 it should be the shortest. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## LAYERS
### Layer 1 of 15 — id: frontend-dev-1
Title: How the Web Works and Semantic HTML
Technologies: HTML, HTTP, DevTools
Description: Understand what happens between typing a URL and seeing a page, then write HTML that describes content meaningfully. Semantic structure is the base for accessibility, SEO and every layer after this one.
Topics:
- Browsers, URLs, DNS and HTTP requests
- Document structure and the HTML element model
- Semantic elements: header, nav, main, article, section, footer
- Headings, lists, links, images and media
- Forms and native input types
- Browser DevTools: Elements and Network panels

### Layer 2 of 15 — id: frontend-dev-2
Title: CSS Foundations: Cascade, Box Model, and Typography
Technologies: CSS, DevTools
Description: Learn how CSS decides which rule wins and how every element becomes a box. Most CSS bugs come from the cascade, specificity or the box model, so this layer is about understanding them rather than memorizing properties.
Topics:
- Selectors, specificity and the cascade
- Inheritance and the computed value
- The box model: content, padding, border, margin
- Units: px, rem, em, %, vw and the clamp function
- Typography, web fonts and line length
- Custom properties (CSS variables) and color

### Layer 3 of 15 — id: frontend-dev-3
Title: Responsive Layout: Flexbox, Grid, and Container Queries
Technologies: CSS, Flexbox, Grid
Description: Build layouts that work from a phone to a wide monitor. Flexbox arranges items in one dimension, Grid in two, and media and container queries adapt the design to the space it actually has.
Topics:
- Normal flow, display and positioning
- Flexbox: axes, alignment, wrapping and sizing
- CSS Grid: tracks, areas, auto-fit and minmax
- Mobile-first design and media queries
- Container queries and intrinsic layouts
- Responsive images and the viewport

### Layer 4 of 15 — id: frontend-dev-4
Title: JavaScript for the Browser: Core Language, Async, and Modules
Technologies: JavaScript, ES Modules
Description: Learn the parts of JavaScript that frontend code relies on every day: scope and closures, objects and arrays, asynchronous code and modules. This layer focuses on how the language behaves in the browser, not on syntax alone.
Topics:
- Variables, scope, closures and this
- Objects, arrays and immutable update patterns
- Array methods: map, filter, reduce and destructuring
- The event loop, promises and async/await
- Fetching data and handling errors
- ES modules: import, export and dynamic import

### Layer 5 of 15 — id: frontend-dev-5
Title: The DOM, Events, and Browser APIs
Technologies: JavaScript, DOM, Web APIs
Description: Learn what frameworks do for you by working with the DOM directly. You will select and change elements, handle events efficiently, and use the browser APIs for storage, observation and navigation.
Topics:
- Selecting, creating and updating DOM nodes
- Events, bubbling and event delegation
- Forms, validation and the FormData API
- Web Storage, cookies and IndexedDB
- Intersection and Resize observers
- History API and client-side navigation

### Layer 6 of 15 — id: frontend-dev-6
Title: TypeScript for Frontend Developers
Technologies: TypeScript
Description: Add static types to catch mistakes before they reach the browser. You will learn the type system features used daily in frontend code: unions, narrowing, generics and typing API data, then apply them to components.
Topics:
- Primitive, object and array types; type inference
- Unions, intersections and literal types
- Narrowing and discriminated unions
- Generics and utility types
- Typing API responses and runtime validation with Zod
- tsconfig strict mode and type-only imports

### Layer 7 of 15 — id: frontend-dev-7
Title: React Fundamentals
Technologies: React, JSX, TypeScript
Description: Think in components and state. You will build interfaces from small reusable pieces, pass data down with props, keep changing data in state, and render lists and conditional content correctly.
Topics:
- Components, JSX and props
- State with useState and re-rendering
- Lifting state up and one-way data flow
- Rendering lists with keys and conditional rendering
- Handling events and controlled inputs
- Thinking in React: breaking a UI into components

### Layer 8 of 15 — id: frontend-dev-8
Title: React in Depth: Effects, Hooks, and State Patterns
Technologies: React, Hooks, TypeScript
Description: Go beyond basics to the parts of React that cause most bugs: effects, refs and context. You will learn when an effect is the wrong tool, how to write custom hooks, and how to manage shared state without chaos.
Topics:
- useEffect: synchronization and cleanup
- You might not need an effect
- useRef, useMemo and useCallback
- Custom hooks for reusable logic
- useReducer and context for shared state
- State libraries: Zustand and when to use them

### Layer 9 of 15 — id: frontend-dev-9
Title: Routing, Forms, and Data Fetching
Technologies: React Router, TanStack Query, React Hook Form
Description: Turn components into an application. You will add client-side routing, build forms with validation and good error states, and fetch server data with caching, loading states and mutations.
Topics:
- Client-side routing, nested routes and URL state
- Protected routes and lazy-loaded pages
- Controlled forms, validation and error messages
- React Hook Form with Zod
- Server state with TanStack Query: caching, refetching
- Mutations, optimistic updates and error handling

### Layer 10 of 15 — id: frontend-dev-10
Title: Styling at Scale: Tailwind, CSS Architecture, and Design Systems
Technologies: Tailwind CSS, CSS Modules, Storybook
Description: Keep styles maintainable as an application grows. You will compare utility-first CSS, CSS Modules and CSS-in-JS, then build a small design system with tokens, reusable components and documentation.
Topics:
- Utility-first CSS with Tailwind
- CSS Modules and scoped styles
- Design tokens and theming with custom properties
- Component variants and accessible primitives
- Dark mode and prefers-color-scheme
- Documenting components with Storybook

### Layer 11 of 15 — id: frontend-dev-11
Title: Web Accessibility
Technologies: WCAG, ARIA, axe
Description: Build interfaces that everyone can use, including people who rely on keyboards, screen readers and zoom. Accessibility is a requirement in many jobs and laws, and most of it comes from using HTML correctly.
Topics:
- WCAG principles: perceivable, operable, understandable, robust
- Keyboard navigation and focus management
- ARIA roles, states and when not to use them
- Accessible forms, dialogs and live regions
- Color contrast, motion and reduced-motion preferences
- Testing with axe, Lighthouse and a screen reader

### Layer 12 of 15 — id: frontend-dev-12
Title: Rendering Strategies and Next.js
Technologies: Next.js, React, SSR
Description: Learn where and when pages are rendered. You will compare client-side rendering, server-side rendering, static generation and streaming, then build a Next.js application using the App Router and server components.
Topics:
- CSR, SSR, SSG and ISR trade-offs
- Hydration and why it can fail
- Next.js App Router, layouts and file-based routing
- React Server Components versus client components
- Data fetching, caching and revalidation
- Metadata, SEO and Open Graph

### Layer 13 of 15 — id: frontend-dev-13
Title: Frontend Performance and Core Web Vitals
Technologies: Lighthouse, Core Web Vitals, Chrome DevTools
Description: Measure and improve how fast a page loads and responds. You will use the Core Web Vitals as targets, find bottlenecks with the Performance panel, and fix them with image, bundle and rendering techniques.
Topics:
- Core Web Vitals: LCP, INP and CLS
- Lighthouse and the Chrome Performance panel
- Image formats, lazy loading and responsive sizes
- Code splitting, tree shaking and bundle analysis
- Caching, compression and CDNs
- React performance: memoization and list virtualization

### Layer 14 of 15 — id: frontend-dev-14
Title: Testing Frontend Applications
Technologies: Vitest, Testing Library, Playwright
Description: Write tests that give you confidence to change code. You will test logic with unit tests, components the way users use them, and whole flows in a real browser, and mock the network instead of the code under test.
Topics:
- The testing trophy: unit, integration and end-to-end
- Unit tests with Vitest
- Component tests with Testing Library
- Mocking the network with MSW
- End-to-end tests with Playwright
- CI, flaky tests and test coverage

### Layer 15 of 15 — id: frontend-dev-15
Title: Frontend Security, Build Tooling, and Production
Technologies: Vite, OWASP, CI/CD
Description: Ship a frontend you can trust. You will protect against the common browser attacks, understand what a build tool does to your code, and deploy with a pipeline, environment configuration and error monitoring.
Topics:
- XSS, CSRF and how frameworks help
- Content Security Policy, CORS and secure headers
- Authentication tokens: where to store them and why
- Vite: dev server, bundling and environment variables
- CI/CD, preview deployments and rollbacks
- Error monitoring, logging and web analytics

Start now with Layer 1.
