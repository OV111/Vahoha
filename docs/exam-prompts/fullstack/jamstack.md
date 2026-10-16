You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "JAMstack Developer" (jamstack, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: jamstack-1
Title: Web Foundations and the JAMstack Model
Technologies: HTML, CSS, JavaScript
Description: This layer covers web basics and the core idea of pre-rendered markup with APIs. Understanding the JAMstack philosophy frames every tool you learn later.
Topics:
- Semantic HTML and CSS
- JavaScript essentials
- Static versus dynamic sites
- What JAMstack means
- CDNs and edge delivery
- Working with third-party APIs

### Layer 2 of 10 — id: jamstack-2
Title: React and Component Thinking
Technologies: React, JavaScript, JSX
Description: This layer teaches building reusable UI with React, the basis for both Next.js and Gatsby. Component thinking is central to modern JAMstack frameworks.
Topics:
- Components and props
- State and hooks
- Conditional rendering and lists
- Composition patterns
- Fetching data in components
- Project structure

### Layer 3 of 10 — id: jamstack-3
Title: Static Sites with Next.js
Technologies: Next.js, React, JavaScript
Description: This layer covers static and hybrid rendering with Next.js. Next.js is a leading framework for fast, SEO-friendly JAMstack sites.
Topics:
- Pages and routing
- Static generation
- Incremental static regeneration
- Image and font optimization
- Metadata and SEO
- Data fetching patterns

### Layer 4 of 10 — id: jamstack-4
Title: Gatsby and the Data Layer
Technologies: Gatsby, GraphQL, React
Description: This layer introduces Gatsby and its GraphQL data layer for sourcing content. Gatsby excels at building content-rich, image-heavy static sites.
Topics:
- Gatsby pages and templates
- GraphQL data queries
- Source plugins
- Programmatic page creation
- Image processing
- Static query and page query

### Layer 5 of 10 — id: jamstack-5
Title: Headless CMS with Contentful
Technologies: Contentful, GraphQL, Next.js
Description: This layer teaches managing content in a headless CMS and pulling it into your site. Decoupling content from code lets non-developers update the site safely.
Topics:
- Content models and fields
- The Content Delivery API
- Querying with GraphQL
- Rich text rendering
- Assets and media
- Preview versus published content

### Layer 6 of 10 — id: jamstack-6
Title: APIs and Serverless Functions
Technologies: Netlify Functions, JavaScript, REST
Description: This layer adds dynamic behavior through serverless functions and APIs. Serverless logic provides the A in JAMstack without managing servers.
Topics:
- Serverless function basics
- Handling requests and responses
- Calling external APIs securely
- Environment variables and secrets
- Form submissions
- Rate limits and errors

### Layer 7 of 10 — id: jamstack-7
Title: Authentication and Identity
Technologies: Netlify Identity, JWT, JavaScript
Description: This layer adds user accounts and gated content to an otherwise static site. Identity lets you offer members-only areas without a traditional backend.
Topics:
- Identity providers and OAuth
- Login and signup flows
- JWT and session handling
- Protecting routes and content
- Roles and gated pages
- Securing serverless calls

### Layer 8 of 10 — id: jamstack-8
Title: Performance and SEO
Technologies: Lighthouse, Next.js, Gatsby
Description: This layer focuses on making JAMstack sites fast and discoverable. Performance and SEO are core selling points of the JAMstack approach.
Topics:
- Core Web Vitals
- Image and asset optimization
- Code splitting and lazy loading
- Structured data and meta tags
- Sitemaps and robots
- Lighthouse auditing

### Layer 9 of 10 — id: jamstack-9
Title: E-commerce and Dynamic Data
Technologies: Stripe, Next.js, Contentful
Description: This layer adds commerce and richer dynamic data to a static foundation. It shows how JAMstack scales from blogs to real transactional sites.
Topics:
- Product catalogs from a CMS
- Cart state management
- Stripe checkout integration
- Serverless payment handling
- Order confirmation flows
- Webhooks basics

### Layer 10 of 10 — id: jamstack-10
Title: Deployment and Continuous Delivery
Technologies: Netlify, Git, Lighthouse CI
Description: This layer covers deploying and automating builds for JAMstack sites. Git-based continuous delivery is what makes JAMstack workflows so smooth in production.
Topics:
- Connecting Git to Netlify
- Build commands and environments
- Deploy previews
- Build hooks and CMS triggers
- Custom domains and HTTPS
- Monitoring and rollbacks

Start now with Layer 1.
