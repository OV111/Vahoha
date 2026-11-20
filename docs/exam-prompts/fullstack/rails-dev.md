You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Ruby on Rails Dev" (rails-dev, category fullstack). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: rails-dev-1
Title: Ruby Fundamentals
Technologies: Ruby, IRB, Bundler
Description: This layer builds core Ruby skills that the Rails framework depends on. Comfort with Ruby idioms makes Rails feel natural and productive.
Topics:
- Variables, methods, and blocks
- Arrays, hashes, and enumerables
- Classes, modules, and mixins
- Symbols and ranges
- Gems and Bundler
- Exception handling

### Layer 2 of 10 — id: rails-dev-2
Title: Rails Basics and MVC
Technologies: Rails, Ruby, SQLite
Description: This layer introduces Rails conventions, the MVC pattern, and the request cycle. Understanding Rails structure is the foundation for everything else.
Topics:
- Rails project structure
- Routes, controllers, and views
- The MVC pattern
- Convention over configuration
- The Rails console
- Generators and scaffolding

### Layer 3 of 10 — id: rails-dev-3
Title: Active Record and Databases
Technologies: Active Record, PostgreSQL, Rails
Description: This layer teaches modeling data and querying it with Active Record. The ORM is how Rails apps persist and relate their data.
Topics:
- Models and migrations
- CRUD with Active Record
- Associations
- Validations
- Query interface and scopes
- Switching to PostgreSQL

### Layer 4 of 10 — id: rails-dev-4
Title: Views, Forms, and Assets
Technologies: ERB, Rails, CSS
Description: This layer covers building the server-rendered frontend with views, forms, and the asset pipeline. Polished views turn a working backend into a usable product.
Topics:
- ERB templates and layouts
- Partials and helpers
- Form helpers and strong params
- Flash messages
- The asset pipeline
- Importing stylesheets

### Layer 5 of 10 — id: rails-dev-5
Title: Authentication and Authorization
Technologies: Devise, Pundit, Rails
Description: This layer adds user accounts and access control to the application. Authentication lets users own and manage their own content securely.
Topics:
- Sessions and cookies
- User signup and login with Devise
- Password security
- Authorization with Pundit
- Roles and permissions
- Protecting controller actions

### Layer 6 of 10 — id: rails-dev-6
Title: Interactivity with Hotwire
Technologies: Hotwire, Turbo, Stimulus
Description: This layer brings modern interactivity to Rails without a heavy JavaScript framework. Hotwire is the Rails-native way to build fast, reactive interfaces.
Topics:
- Turbo Drive and navigation
- Turbo Frames
- Turbo Streams
- Stimulus controllers
- Real-time updates over WebSockets
- Progressive enhancement

### Layer 7 of 10 — id: rails-dev-7
Title: Background Jobs and Mailers
Technologies: Active Job, Sidekiq, Action Mailer
Description: This layer covers running work in the background and sending email. Offloading slow tasks keeps the app responsive and reliable.
Topics:
- Active Job basics
- Sidekiq and Redis
- Scheduling and retries
- Action Mailer
- Email templates and previews
- Job error handling

### Layer 8 of 10 — id: rails-dev-8
Title: Building APIs with Rails
Technologies: Rails, JSON, JWT
Description: This layer covers exposing your app as a JSON API for clients and integrations. API mode broadens what your Rails backend can power.
Topics:
- API-only controllers
- Serializing JSON responses
- Versioning endpoints
- Token authentication
- CORS and rate limiting
- API documentation

### Layer 9 of 10 — id: rails-dev-9
Title: Performance and Advanced Patterns
Technologies: Rails, Redis, Active Record
Description: This layer covers optimizing queries, caching, and structuring larger Rails apps. These practices keep a growing codebase fast and maintainable.
Topics:
- N plus one queries and eager loading
- Fragment and Russian doll caching
- Database indexing
- Service objects
- Concerns and refactoring
- Monitoring and profiling

### Layer 10 of 10 — id: rails-dev-10
Title: Testing and Deployment
Technologies: RSpec, Capybara, Docker
Description: This layer covers automated testing and deploying Rails to production. A solid test suite and deploy pipeline make the app reliable and maintainable.
Topics:
- Model and request specs with RSpec
- System tests with Capybara
- Fixtures and factories
- Continuous integration
- Containerizing Rails
- Deploying to a cloud host

Start now with Layer 1.
