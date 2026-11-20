You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Django + React Dev" (django-react, category fullstack). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: django-react-1
Title: Python Fundamentals
Technologies: Python, pip, venv
Description: This layer establishes core Python skills that Django is built on. A firm grasp of the language makes the framework far easier to learn.
Topics:
- Variables, types, and control flow
- Functions and modules
- Lists, dicts, and comprehensions
- Classes and objects
- Virtual environments and pip
- Error handling

### Layer 2 of 10 — id: django-react-2
Title: Django Basics
Technologies: Django, Python, SQLite
Description: This layer introduces the Django framework, its project structure, and the request cycle. Django provides the batteries-included backend for the stack.
Topics:
- Projects and apps
- URLs, views, and templates
- The request and response cycle
- Settings and configuration
- Static files
- The Django admin

### Layer 3 of 10 — id: django-react-3
Title: Django Models and the ORM
Technologies: Django, PostgreSQL, ORM
Description: This layer covers modeling data and querying it with the Django ORM. The ORM is how Django apps store and retrieve persistent data.
Topics:
- Models and fields
- Migrations
- QuerySets and filtering
- Relationships and foreign keys
- Aggregations
- Connecting PostgreSQL

### Layer 4 of 10 — id: django-react-4
Title: Building APIs with Django REST Framework
Technologies: Django REST Framework, Django, JSON
Description: This layer teaches exposing your data as a REST API with DRF. The API is the bridge that lets a React frontend talk to Django.
Topics:
- Serializers
- Views and viewsets
- Routers and URLs
- Pagination and filtering
- Permissions and throttling
- Browsable API

### Layer 5 of 10 — id: django-react-5
Title: React Frontend
Technologies: React, JavaScript, Vite
Description: This layer covers building the React client that consumes the Django API. React provides the interactive frontend half of the stack.
Topics:
- Components and props
- State and hooks
- Routing
- Fetching from the API
- Forms and inputs
- Project structure

### Layer 6 of 10 — id: django-react-6
Title: Connecting React and Django
Technologies: React, Django REST Framework, Axios
Description: This layer wires the React client and Django API together over HTTP. Integrating the two halves produces a working full stack application.
Topics:
- CORS configuration
- API client setup with Axios
- Handling loading and errors
- Posting and updating data
- Environment configuration
- Pagination on the client

### Layer 7 of 10 — id: django-react-7
Title: Authentication with Tokens
Technologies: JWT, Django REST Framework, React
Description: This layer adds secure login and protected endpoints across the stack. Authentication lets users own and manage their own content.
Topics:
- Token and JWT authentication
- Login and registration endpoints
- Protected API views
- Storing tokens in React
- Protected routes on the client
- Refresh and logout

### Layer 8 of 10 — id: django-react-8
Title: Advanced Django
Technologies: Django, Celery, Redis
Description: This layer covers performance, background tasks, and advanced backend features. These skills prepare a Django app to handle real production workloads.
Topics:
- Query optimization and select_related
- Caching with Redis
- Background jobs with Celery
- Signals
- Custom management commands
- File and media uploads

### Layer 9 of 10 — id: django-react-9
Title: Advanced React State and UX
Technologies: React Query, React, React Router
Description: This layer improves the frontend with caching, data fetching libraries, and polished UX. Mature client patterns make the app feel fast and reliable.
Topics:
- Server state with React Query
- Caching and invalidation
- Optimistic updates
- Global state patterns
- Form validation
- Accessible UI components

### Layer 10 of 10 — id: django-react-10
Title: Testing and Deployment
Technologies: pytest, Docker, Gunicorn
Description: This layer covers testing the stack and deploying it to production. Tests and a real deployment pipeline turn the project into a maintainable product.
Topics:
- Django tests with pytest
- React component testing
- Containerizing with Docker
- Serving with Gunicorn and Nginx
- Static files and collectstatic
- Deploying to a cloud host

Start now with Layer 1.
