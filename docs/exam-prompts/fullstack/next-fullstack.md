You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Next.js Full Stack Dev" (next-fullstack, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: next-fullstack-1
Title: TypeScript and React Foundations
Technologies: TypeScript, React, JavaScript
Description: This layer grounds you in TypeScript and React, the core of Next.js development. These skills underpin every feature you build in the framework.
Topics:
- TypeScript types and interfaces
- React components and props
- State and hooks
- Typing props and events
- Composition patterns
- Modern JavaScript syntax

### Layer 2 of 10 — id: next-fullstack-2
Title: Next.js App Router and Routing
Technologies: Next.js, React, TypeScript
Description: This layer covers routing, layouts, and navigation with the Next.js App Router. The router defines how pages and shared UI are structured.
Topics:
- File-based routing
- Nested layouts
- Dynamic and catch-all routes
- Linking and navigation
- Route groups
- Loading and error files

### Layer 3 of 10 — id: next-fullstack-3
Title: Server Components and Rendering
Technologies: Next.js, React, TypeScript
Description: This layer explains server and client components and Next.js rendering strategies. Choosing the right rendering model is key to performance and correctness.
Topics:
- Server versus client components
- Static and dynamic rendering
- Streaming and Suspense
- Caching and revalidation
- Data fetching in server components
- The use client boundary

### Layer 4 of 10 — id: next-fullstack-4
Title: Database with Prisma
Technologies: Prisma, PostgreSQL, TypeScript
Description: This layer covers modeling and querying data with Prisma. The database layer gives your Next.js app persistent, typed data.
Topics:
- Prisma schema and models
- Migrations
- Typed CRUD queries
- Relations
- Filtering and pagination
- Seeding and Prisma Studio

### Layer 5 of 10 — id: next-fullstack-5
Title: Server Actions and Mutations
Technologies: Next.js, Prisma, TypeScript
Description: This layer teaches mutating data with server actions and route handlers. Server actions let you write secure backend logic right alongside your UI.
Topics:
- Server actions basics
- Form submissions
- Revalidation after mutations
- Route handlers for APIs
- Validation with Zod
- Error and pending states

### Layer 6 of 10 — id: next-fullstack-6
Title: Authentication
Technologies: NextAuth, Prisma, Next.js
Description: This layer adds login, sessions, and protected routes to the app. Authentication enables per-user data and secure access control.
Topics:
- OAuth and credential providers
- Sessions and JWT
- Prisma adapter
- Protecting server actions and routes
- Reading the session on the server
- Middleware-based protection

### Layer 7 of 10 — id: next-fullstack-7
Title: Styling and UI
Technologies: Tailwind, shadcn/ui, Next.js
Description: This layer covers building an accessible, responsive interface with Tailwind and component libraries. A clean UI makes the full stack app feel professional.
Topics:
- Tailwind utility styling
- Responsive and dark mode
- Accessible component primitives
- Reusable design system parts
- Loading skeletons
- Toasts and dialogs

### Layer 8 of 10 — id: next-fullstack-8
Title: Advanced Data and Caching
Technologies: Next.js, React, Prisma
Description: This layer covers Next.js caching layers, revalidation, and optimistic UI. Mastering caching is what makes Next.js apps both fast and correct.
Topics:
- Request and data cache
- Time and tag-based revalidation
- Optimistic updates
- Parallel and sequential fetching
- Edge versus node runtime
- Avoiding stale data

### Layer 9 of 10 — id: next-fullstack-9
Title: API Routes and Integrations
Technologies: Next.js, Stripe, Webhooks
Description: This layer covers building APIs and integrating third-party services. Real apps depend on external services for payments, email, and more.
Topics:
- Route handlers and REST
- Calling external APIs securely
- Stripe payments
- Webhooks and verification
- File uploads
- Environment secrets

### Layer 10 of 10 — id: next-fullstack-10
Title: Testing and Deployment to Vercel
Technologies: Vitest, Playwright, Vercel
Description: This layer covers testing the app and deploying it to production on Vercel. Tests and a smooth deploy pipeline make the project a real product.
Topics:
- Unit testing with Vitest
- End-to-end testing with Playwright
- Environment variables in Vercel
- Production database setup
- Preview deployments
- Analytics and monitoring

Start now with Layer 1.
