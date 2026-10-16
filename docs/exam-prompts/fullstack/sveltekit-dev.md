You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "SvelteKit Developer" (sveltekit-dev, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: sveltekit-dev-1
Title: JavaScript and TypeScript Foundations
Technologies: JavaScript, TypeScript, Vite
Description: This layer grounds you in the language fundamentals Svelte builds on. Comfort with modern JavaScript and types makes Svelte development smooth.
Topics:
- Modern JavaScript syntax
- Modules and imports
- Promises and async/await
- TypeScript types and interfaces
- DOM basics
- The Vite dev server

### Layer 2 of 10 — id: sveltekit-dev-2
Title: Svelte Fundamentals
Technologies: Svelte, JavaScript, CSS
Description: This layer covers building components with Svelte's reactive, compiler-based model. Svelte is the foundation that SvelteKit extends into a full framework.
Topics:
- Components and props
- Reactivity and runes
- Events and bindings
- Conditional and list rendering
- Scoped styles
- Slots and composition

### Layer 3 of 10 — id: sveltekit-dev-3
Title: SvelteKit Routing and Pages
Technologies: SvelteKit, Svelte, Vite
Description: This layer introduces SvelteKit's file-based routing, layouts, and project structure. Routing is the backbone of building full applications with SvelteKit.
Topics:
- File-based routing
- Layouts and nesting
- Dynamic route parameters
- Navigation and links
- Error pages
- Project structure

### Layer 4 of 10 — id: sveltekit-dev-4
Title: Loading Data
Technologies: SvelteKit, TypeScript, Fetch
Description: This layer covers loading data on the server and client with load functions. Proper data loading is essential for fast, SEO-friendly pages.
Topics:
- Page and layout load functions
- Server versus universal load
- Type-safe load data
- Parameters and the fetch helper
- Streaming promises
- Error and redirect handling

### Layer 5 of 10 — id: sveltekit-dev-5
Title: Form Actions and Mutations
Technologies: SvelteKit, TypeScript, Zod
Description: This layer teaches handling form submissions and mutations with form actions. Form actions provide progressive, secure server-side data changes.
Topics:
- Form actions
- Progressive enhancement with enhance
- Validation with Zod
- Named actions
- Returning errors and data
- Invalidation after mutations

### Layer 6 of 10 — id: sveltekit-dev-6
Title: Databases and Persistence
Technologies: Prisma, PostgreSQL, SvelteKit
Description: This layer covers persisting data with a database and ORM in SvelteKit. Real storage turns the notes demo into a durable application.
Topics:
- Prisma schema and models
- Migrations
- Querying in server code
- Relations
- Environment variables
- Seeding data

### Layer 7 of 10 — id: sveltekit-dev-7
Title: Authentication and Hooks
Technologies: SvelteKit, Lucia, Cookies
Description: This layer adds sessions, login, and request hooks for protected routes. Authentication enables per-user data and secure access control.
Topics:
- Server hooks and handle
- Sessions and cookies
- Login and signup flows
- Protecting routes
- Accessing the user in load
- Logout and security

### Layer 8 of 10 — id: sveltekit-dev-8
Title: Advanced UI and Stores
Technologies: Svelte, Stores, Transitions
Description: This layer covers shared state, animations, and polished interactions. Rich UI patterns make the application feel smooth and professional.
Topics:
- Writable and derived stores
- Context API
- Transitions and animations
- Actions and use directives
- Reusable component patterns
- Accessibility

### Layer 9 of 10 — id: sveltekit-dev-9
Title: APIs and Advanced SvelteKit
Technologies: SvelteKit, Endpoints, TypeScript
Description: This layer covers building API endpoints and advanced rendering options. These features let SvelteKit power APIs and integrate with other clients.
Topics:
- API routes with server endpoints
- Request and response helpers
- Prerendering and SSR control
- Page options
- Adapters
- Environment configuration

### Layer 10 of 10 — id: sveltekit-dev-10
Title: Testing and Deployment
Technologies: Vitest, Playwright, Vercel
Description: This layer covers testing the app and deploying it to production. Tests and an adapter-based deploy make the project a real, reliable product.
Topics:
- Unit tests with Vitest
- End-to-end tests with Playwright
- Choosing an adapter
- Environment variables in production
- Deploying to a host
- Monitoring and previews

Start now with Layer 1.
