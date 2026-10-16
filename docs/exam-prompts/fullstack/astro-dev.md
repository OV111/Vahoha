You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Astro Developer" (astro-dev, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: astro-dev-1
Title: Web and TypeScript Foundations
Technologies: HTML, CSS, TypeScript
Description: This layer covers the web fundamentals and types that Astro builds on. A strong base in markup, styling, and TypeScript makes Astro intuitive.
Topics:
- Semantic HTML and CSS
- Responsive layout
- JavaScript essentials
- TypeScript types and interfaces
- Modules and tooling
- How the browser renders pages

### Layer 2 of 10 — id: astro-dev-2
Title: Astro Basics and Components
Technologies: Astro, HTML, TypeScript
Description: This layer introduces Astro components, the .astro syntax, and the project structure. Understanding Astro's component model is the entry point to the framework.
Topics:
- Astro component syntax
- Component script and template
- Props and slots
- Scoped and global styles
- Importing components
- Project structure

### Layer 3 of 10 — id: astro-dev-3
Title: Routing, Layouts, and Pages
Technologies: Astro, TypeScript, HTML
Description: This layer covers file-based routing, layouts, and dynamic pages in Astro. Routing and layouts are how you assemble a multi-page site.
Topics:
- File-based routing
- Layout components
- Dynamic routes and params
- getStaticPaths
- Navigation
- 404 and error pages

### Layer 4 of 10 — id: astro-dev-4
Title: Content Collections and MDX
Technologies: MDX, Astro, Markdown
Description: This layer covers managing content with collections, Markdown, and MDX. Content collections give Astro a type-safe content layer for blogs and docs.
Topics:
- Markdown and frontmatter
- MDX with components
- Content collections
- Schema validation with Zod
- Querying content
- Rendering content entries

### Layer 5 of 10 — id: astro-dev-5
Title: Islands and Interactivity
Technologies: Islands, Astro, React
Description: This layer teaches Astro's islands architecture for adding interactive components. Islands let you ship mostly static HTML with targeted client-side interactivity.
Topics:
- Islands architecture
- Framework integrations
- Client directives
- Hydration strategies
- Sharing state between islands
- When to use an island

### Layer 6 of 10 — id: astro-dev-6
Title: Styling and Design Systems
Technologies: Tailwind, Astro, CSS
Description: This layer covers building a cohesive, responsive design with Tailwind in Astro. Consistent styling makes a content site look polished and trustworthy.
Topics:
- Tailwind integration
- Responsive utilities
- Dark mode
- Reusable styled components
- Typography for content
- Design tokens

### Layer 7 of 10 — id: astro-dev-7
Title: Server Rendering and Endpoints
Technologies: Astro, Endpoints, TypeScript
Description: This layer covers server-side rendering, adapters, and API endpoints. On-demand rendering lets Astro handle dynamic data and form submissions.
Topics:
- Static versus server output
- Adapters and SSR
- API endpoints
- Handling form submissions
- Reading request data
- Environment variables

### Layer 8 of 10 — id: astro-dev-8
Title: Data, CMS, and Integrations
Technologies: Astro, Contentful, TypeScript
Description: This layer covers pulling data from APIs and a headless CMS into Astro. External content sources let non-developers manage the site safely.
Topics:
- Fetching from external APIs
- Connecting a headless CMS
- Content loaders
- Image handling and optimization
- Integrations ecosystem
- Environment secrets

### Layer 9 of 10 — id: astro-dev-9
Title: Performance and SEO
Technologies: Astro, Lighthouse, HTML
Description: This layer focuses on Astro's performance strengths and search optimization. Fast, well-indexed sites are the core promise of the Astro framework.
Topics:
- Core Web Vitals
- Minimal JavaScript shipping
- Image and asset optimization
- Meta tags and structured data
- Sitemap and RSS
- Lighthouse auditing

### Layer 10 of 10 — id: astro-dev-10
Title: Testing and Deployment
Technologies: Vitest, Playwright, Netlify
Description: This layer covers testing the site and deploying it to production. Tests and an adapter-based deploy make the project a real, reliable product.
Topics:
- Unit testing with Vitest
- End-to-end tests with Playwright
- Choosing an adapter
- Environment variables in production
- Deploying to a host
- Preview builds and monitoring

Start now with Layer 1.
