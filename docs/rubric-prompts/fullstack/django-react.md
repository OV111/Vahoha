You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: django-react (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id django-react-1
Title: Python Fundamentals
Group: "Core Language Concepts"
  - Subtopic: "Variables, Types, and Control Flow"
    Python uses dynamic typing with built-in types like int, str, list, and dict. Control flow is expressed with if/elif/else, for, and while using indentation instead of braces.
  - Subtopic: "Functions and Module System"
    Functions are first-class objects in Python, supporting default arguments, *args, and **kwargs. Modules let you split code into reusable files importable with the import statement.
  - Subtopic: "List Comprehensions and Dict Patterns"
    Comprehensions provide concise syntax for creating lists, sets, and dicts from iterables. They are idiomatic Python and often replace explicit for loops.
Group: "Object-Oriented Python and Error Handling"
  - Subtopic: "Classes, Objects, and Inheritance"
    Python classes use __init__ for construction and support single and multiple inheritance. Special dunder methods let you customise behaviour for operators and built-in functions.
  - Subtopic: "Exception Handling with try/except"
    Python uses try/except/finally blocks to handle runtime errors gracefully. You can raise custom exceptions by subclassing the built-in Exception class.
Group: "Environment and Package Management"
  - Subtopic: "Virtual Environments with venv"
    venv creates isolated Python environments so project dependencies do not conflict. Activate the environment before installing packages to keep your global Python clean.
  - Subtopic: "Installing Packages with pip"
    pip is the standard Python package manager. Use pip install -r requirements.txt to reproduce an environment and pip freeze to capture current dependencies.
Group: "Python Tooling"
  - Subtopic: "Interactive REPL and Debugging"
    The Python REPL lets you experiment with code instantly. Use the built-in breakpoint() function or pdb module to step through code and inspect state at runtime.
  - Subtopic: "Code Style with PEP 8"
    PEP 8 is the official Python style guide covering naming conventions, line length, and whitespace. Tools like flake8 and black automate style checking and formatting.

### Layer 2 of 10: id django-react-2
Title: Django Basics
Group: "Django Project Architecture"
  - Subtopic: "Projects vs Apps in Django"
    A Django project is the top-level configuration container; apps are self-contained modules of functionality. Good Django design keeps each app focused on a single domain.
  - Subtopic: "URL Routing and Views"
    Django's URL dispatcher maps URL patterns to view functions or class-based views. Views receive an HttpRequest, perform logic, and return an HttpResponse.
  - Subtopic: "Request/Response Cycle in Django"
    Every Django request passes through middleware, the URL resolver, and finally a view before returning a response. Understanding this cycle is key to debugging and extending behaviour.
Group: "Templates and Configuration"
  - Subtopic: "Django Template Language Basics"
    Django's template language uses {{ variables }} and {% tags %} to render dynamic HTML. Template inheritance via {% extends %} and {% block %} promotes code reuse.
  - Subtopic: "Settings and Project Configuration"
    settings.py controls databases, installed apps, middleware, and more. Use environment variables or django-environ to avoid hard-coding secrets.
Group: "Static Files and Media"
  - Subtopic: "Serving Static Files in Development"
    Django's staticfiles app collects CSS, JS, and images during development. Configure STATIC_URL and STATICFILES_DIRS, then use {% load static %} in templates.
  - Subtopic: "Django Admin Interface"
    The Django admin provides an auto-generated CRUD UI for your models. Registering models with admin.site.register and customising ModelAdmin unlocks powerful data management.
Group: "Development Workflow"
  - Subtopic: "Starting a Project with django-admin"
    django-admin startproject and manage.py startapp scaffold the initial directory structure. Use manage.py runserver for the development server with auto-reload.
  - Subtopic: "Middleware and the Django Pipeline"
    Middleware are hooks that process requests before they reach views and responses before they leave. Django ships with middleware for sessions, CSRF, auth, and security headers.

### Layer 3 of 10: id django-react-3
Title: Django Models and the ORM
Group: "Models and Relationships"
  - Subtopic: "Defining Models and Field Types"
    A Django model maps to a database table; each field corresponds to a column. Django provides CharField, IntegerField, DateTimeField, and many more with built-in validation.
  - Subtopic: "Relationships: ForeignKey, ManyToMany"
    ForeignKey creates a many-to-one relationship stored as a database foreign key. ManyToManyField uses a join table and lets you query related objects from either side.
  - Subtopic: "Aggregations and Annotations"
    Django ORM supports Count, Sum, Avg, and other SQL aggregates via annotate() and aggregate(). They execute in the database rather than Python for maximum performance.
Group: "QuerySets and Database Queries"
  - Subtopic: "QuerySet API: filter, exclude, order_by"
    QuerySets are lazy; they only hit the database when evaluated. Chaining filter(), exclude(), and order_by() builds complex queries without writing raw SQL.
  - Subtopic: "Database Migrations Workflow"
    makemigrations generates migration files from model changes; migrate applies them. Always review auto-generated migrations before running them in production.
Group: "PostgreSQL Integration"
  - Subtopic: "Connecting Django to PostgreSQL"
    Install psycopg2 and set DATABASES in settings.py to use PostgreSQL. Use environment variables for credentials and never commit them to version control.
  - Subtopic: "Raw SQL and Database Functions"
    For complex queries, Django allows raw() and connection.execute(). Database functions like Coalesce, Cast, and Extract let you push logic to the database layer.
Group: "ORM Tooling"
  - Subtopic: "Django Shell for ORM Exploration"
    manage.py shell opens a Python REPL with Django pre-configured. Use it to test queries, inspect data, and verify model behaviour before writing view code.
  - Subtopic: "django-extensions and Model Diagrams"
    django-extensions adds shell_plus (auto-imports all models) and graph_models (generates entity-relationship diagrams). Both speed up ORM development significantly.

### Layer 4 of 10: id django-react-4
Title: Building APIs with Django REST Framework
Group: "DRF Core Concepts"
  - Subtopic: "Serializers and Data Validation"
    DRF serializers convert querysets and model instances to Python dicts for JSON rendering and deserialise incoming data with validation. ModelSerializer auto-generates fields from a model.
  - Subtopic: "Views, ViewSets, and Generic Views"
    APIView gives full control over HTTP method handling. Generic views like ListCreateAPIView reduce boilerplate for common patterns. ViewSets combine related views into a single class.
  - Subtopic: "Permissions and Authentication Classes"
    DRF separates authentication (who are you?) from permissions (what can you do?). Built-in classes include IsAuthenticated, IsAdminUser, and per-object permission hooks.
Group: "API Design Patterns"
  - Subtopic: "Pagination and Filtering Strategies"
    DRF ships with PageNumberPagination, LimitOffsetPagination, and CursorPagination. django-filter integrates with DRF to add field-level query-param filtering.
  - Subtopic: "Throttling and Rate Limiting APIs"
    DRF throttling limits how many requests a user or IP can make in a time window. AnonRateThrottle and UserRateThrottle can be configured globally or per view.
Group: "Routing and Browsable API"
  - Subtopic: "Routers and Auto URL Generation"
    DRF Routers automatically generate URL patterns for ViewSets. DefaultRouter adds a browsable API root; SimpleRouter is lighter for production-only APIs.
  - Subtopic: "Browsable API for Development"
    The browsable API renders HTML views of your endpoints in a browser, making manual testing fast. It also surfaces serializer validation errors in a readable format.
Group: "API Documentation Tooling"
  - Subtopic: "Auto-Generating OpenAPI Schemas"
    DRF can generate OpenAPI 3 schemas with the generateschema command. Integrating drf-spectacular gives richer schema output and Swagger/ReDoc UI pages.
  - Subtopic: "Testing DRF Endpoints with APIClient"
    DRF's APIClient extends Django's test client with helpers for JSON requests and authentication. Use it in Django's TestCase or with pytest-django.

### Layer 5 of 10: id django-react-5
Title: React Frontend
Group: "React Component Model"
  - Subtopic: "Components, Props, and Composition"
    React UIs are trees of components. Props are immutable inputs passed from parent to child; composition lets you build complex UIs from small, focused pieces.
  - Subtopic: "State Management with useState and useEffect"
    useState gives components local mutable state; useEffect synchronises components with external systems like APIs. Understanding the dependency array prevents stale closures.
  - Subtopic: "Client-Side Routing with React Router"
    React Router maps URL paths to components without full page reloads. BrowserRouter, Routes, and Route form the core; useNavigate and useParams handle programmatic navigation.
Group: "Forms and Data Fetching"
  - Subtopic: "Controlled Inputs and Form Handling"
    Controlled components keep form values in React state, making validation and submission straightforward. Uncontrolled inputs via useRef are useful for file inputs and third-party integrations.
  - Subtopic: "Fetching API Data with useEffect"
    Calling fetch or Axios inside useEffect is the baseline pattern for loading remote data. Always handle loading and error states to provide a good user experience.
Group: "Project Structure and Tooling"
  - Subtopic: "Scaffolding with Vite or Create React App"
    Vite provides near-instant dev server startup and HMR via ES modules. It is the recommended choice for new projects over the older Create React App.
  - Subtopic: "Organising a React Codebase"
    Group files by feature rather than type for scalability. Co-locate component, styles, and tests. Use an index.js barrel file per feature to simplify imports.
Group: "Developer Experience"
  - Subtopic: "React DevTools Browser Extension"
    React DevTools lets you inspect the component tree, view props and state, and profile render performance. It is essential for debugging complex component hierarchies.
  - Subtopic: "ESLint and Prettier for React Projects"
    eslint-plugin-react-hooks enforces the Rules of Hooks and detects missing dependencies. Prettier provides opinionated formatting and integrates with most editors.

### Layer 6 of 10: id django-react-6
Title: Connecting React and Django
Group: "Cross-Origin Communication"
  - Subtopic: "CORS Configuration in Django"
    Browsers block cross-origin requests by default. Install django-cors-headers and add CorsMiddleware to allow your React dev server's origin to reach the Django API.
  - Subtopic: "CSRF Tokens and API Safety"
    When using session auth, Django requires a CSRF token on unsafe methods. DRF's SessionAuthentication enforces this; JWT-based APIs can disable it for stateless clients.
Group: "Handling Async State in React"
  - Subtopic: "Loading and Error State Patterns"
    Model async data with three states: loading, success, and error. Use useState flags or a unified status enum to drive conditional rendering and spinner/error components.
  - Subtopic: "Posting and Updating Data to APIs"
    For POST, PUT, and PATCH requests set Content-Type: application/json and send a JSON body. On success, either refetch the list or merge the response into local state.
  - Subtopic: "Client-Side Pagination with APIs"
    DRF pagination metadata (count, next, previous) lets the frontend render page controls. Track the current page in state and fetch the corresponding URL on navigation.
Group: "Axios HTTP Client"
  - Subtopic: "Creating an Axios Instance with Base URL"
    Centralise API configuration by creating an Axios instance with baseURL and default headers. Export it from a single api.js file imported across your React features.
  - Subtopic: "Axios Interceptors for Error Handling"
    Request interceptors can attach auth headers automatically; response interceptors can centralise error handling and token refresh logic before errors reach components.
Group: "Environment Configuration"
  - Subtopic: "Environment Variables in Vite and Django"
    Vite exposes variables prefixed with VITE_ via import.meta.env. Django reads from os.environ or a .env file via python-decouple. Never commit .env files to git.
  - Subtopic: "Proxy Configuration for Local Development"
    Vite's server.proxy setting can forward /api requests to Django during development, eliminating CORS issues entirely in the local environment.

### Layer 7 of 10: id django-react-7
Title: Authentication with Tokens
Group: "Token Authentication Concepts"
  - Subtopic: "Token vs JWT Authentication"
    DRF's built-in token auth stores tokens in the database; JWTs are self-contained and stateless. Simple JWT is the most popular library for JWT auth with DRF.
  - Subtopic: "Login and Registration API Endpoints"
    A login endpoint validates credentials and returns a token. Registration creates a user and optionally returns a token for immediate login. Use DRF serializers for validation.
  - Subtopic: "Protecting API Views with Permissions"
    Set DEFAULT_AUTHENTICATION_CLASSES and DEFAULT_PERMISSION_CLASSES in DRF settings to enforce auth globally. Override per view with authentication_classes and permission_classes attributes.
Group: "Token Lifecycle Management"
  - Subtopic: "Access Tokens, Refresh Tokens, and Rotation"
    Short-lived access tokens reduce exposure if stolen. Refresh tokens exchange for new access tokens; Simple JWT supports rotating refresh tokens for added security.
  - Subtopic: "Logout and Token Blacklisting"
    JWTs cannot be invalidated until expiry without a blacklist. Simple JWT's blacklist app stores invalidated refresh tokens in the database to enable true logout.
Group: "React Auth Implementation"
  - Subtopic: "Storing Tokens: localStorage vs Cookies"
    localStorage is simple but vulnerable to XSS. HttpOnly cookies protect tokens from JavaScript but require CSRF handling. Choose based on your threat model.
  - Subtopic: "Auth Context and useContext Hook"
    Wrap the app in an AuthContext provider that stores the current user and token. Components consume the context with useContext to conditionally render or redirect.
Group: "Protected Routes and UX"
  - Subtopic: "Protected Route Component Pattern"
    Wrap private routes in a component that checks auth state and redirects to /login if unauthenticated. React Router v6's Outlet makes nested protected layouts clean.
  - Subtopic: "Axios Interceptor for Token Refresh"
    An Axios response interceptor catches 401 errors, calls the refresh endpoint, updates stored tokens, and retries the original request transparently to the calling code.

### Layer 8 of 10: id django-react-8
Title: Advanced Django
Group: "Django Performance Patterns"
  - Subtopic: "select_related and prefetch_related"
    select_related reduces N+1 queries for ForeignKey/OneToOne by using SQL JOINs. prefetch_related uses separate queries with Python-side joining, suited for ManyToMany and reverse FK.
  - Subtopic: "Django Signals for Decoupled Logic"
    Signals like post_save and pre_delete let you trigger side effects when models change without coupling the model to that logic. Use sparingly to avoid hidden control flow.
  - Subtopic: "Custom Management Commands"
    Subclass BaseCommand in a management/commands/ directory to add manage.py commands. Useful for data migrations, scheduled jobs, and admin utilities.
Group: "Background Processing"
  - Subtopic: "Celery Task Queue Architecture"
    Celery offloads time-consuming work (emails, image processing) to background workers. Tasks are functions decorated with @shared_task and dispatched via a message broker.
  - Subtopic: "File and Media Upload Handling"
    Django's FileField and ImageField manage uploads via MEDIA_ROOT and MEDIA_URL. Use django-storages for production uploads to S3 or other cloud storage.
Group: "Caching with Redis"
  - Subtopic: "Configuring Django Cache with Redis"
    Set CACHES in settings.py to use django-redis as the backend. Cache expensive query results or rendered fragments with cache.set() and cache.get().
  - Subtopic: "Redis Data Structures and Use Cases"
    Redis lists and sorted sets are ideal for leaderboards and queues. Strings with expiry work for rate limiting and session storage alongside Django's cache framework.
Group: "Celery Tooling"
  - Subtopic: "Celery Beat for Periodic Tasks"
    Celery Beat is a scheduler that dispatches tasks on a cron or interval schedule. Store the schedule in the database with django-celery-beat for dynamic configuration.
  - Subtopic: "Monitoring Celery with Flower"
    Flower is a real-time web dashboard for Celery that shows active tasks, worker status, and task history. Run it as a separate process alongside your workers.

### Layer 9 of 10: id django-react-9
Title: Advanced React State and UX
Group: "Server State Management"
  - Subtopic: "React Query for Server State"
    TanStack Query separates server state from UI state, handling caching, background refetching, and loading/error states automatically. useQuery and useMutation are its core hooks.
  - Subtopic: "Cache Invalidation and Stale-While-Revalidate"
    Query invalidation with queryClient.invalidateQueries refetches data after mutations. The staleTime option controls how long cached data is considered fresh before background refetching.
  - Subtopic: "Optimistic Updates for Instant Feedback"
    Optimistic updates apply changes to the cache immediately and roll back on error. This makes mutations feel instant and improves perceived performance on slow connections.
Group: "Global State and Forms"
  - Subtopic: "Global State with Zustand or Context"
    For UI state shared across routes (modals, theme, auth), lightweight stores like Zustand avoid Redux boilerplate. Keep global state minimal; prefer React Query for server data.
  - Subtopic: "Schema Validation with Zod and React Hook Form"
    React Hook Form minimises re-renders with uncontrolled inputs and a subscription model. Zod provides TypeScript-first schema validation that integrates via the @hookform/resolvers package.
Group: "Accessible UI Patterns"
  - Subtopic: "ARIA Roles and Keyboard Navigation"
    Use semantic HTML first; add ARIA roles only when necessary. Ensure interactive components are keyboard-accessible with visible focus styles and correct tab order.
  - Subtopic: "Accessible Component Libraries"
    Headless UI libraries like Radix UI and Reach UI provide fully accessible, unstyled primitives for modals, dropdowns, and tooltips. Style them with Tailwind or CSS modules.
Group: "Advanced React Patterns"
  - Subtopic: "Code Splitting with React.lazy and Suspense"
    React.lazy() and Suspense enable route-level code splitting, reducing initial bundle size. Vite automatically produces separate chunks for lazy-loaded components.
  - Subtopic: "useMemo and useCallback for Performance"
    useMemo caches expensive computed values; useCallback stabilises function references to prevent unnecessary child re-renders. Profile first with React DevTools before optimising.

### Layer 10 of 10: id django-react-10
Title: Testing and Deployment
Group: "Testing Django and React"
  - Subtopic: "Django Testing with pytest and pytest-django"
    pytest-django provides fixtures like db and client for testing Django views, models, and APIs. Use APIClient for DRF endpoint tests with authentication helpers.
  - Subtopic: "React Component Testing with Vitest"
    Vitest runs in the same Vite pipeline as your app for fast unit and component tests. Use @testing-library/react to render components and assert on what the user sees.
  - Subtopic: "Mocking API Calls with MSW"
    Mock Service Worker intercepts network requests at the service worker level so tests and Storybook use the same mocks as production code without modifying application code.
Group: "Containerization"
  - Subtopic: "Dockerizing Django and React"
    Write a multi-stage Dockerfile for the React build and a separate one for Django/Gunicorn. Use docker-compose to orchestrate the app, database, Redis, and Nginx together.
  - Subtopic: "Environment Variables and Secrets in Docker"
    Pass secrets via environment variables in docker-compose.yml or .env files. For production, use Docker secrets or a secrets manager like AWS Secrets Manager.
Group: "Production Serving"
  - Subtopic: "Gunicorn WSGI Server Configuration"
    Gunicorn is the standard WSGI server for Django in production. Configure worker count (2×CPU+1), worker class, and timeout. Run it behind Nginx, never exposed directly.
  - Subtopic: "Nginx as Reverse Proxy and Static Server"
    Nginx serves collected static files and React build output directly, and proxies /api requests to Gunicorn. This avoids Python touching static file requests entirely.
Group: "Cloud Deployment"
  - Subtopic: "collectstatic and WhiteNoise for Static Files"
    Run manage.py collectstatic before deployment to gather all static files. WhiteNoise lets Django serve compressed static files without a dedicated CDN, simplifying deployment.
  - Subtopic: "Deploying to a Cloud Platform"
    Platforms like Railway, Render, and Fly.io can deploy a Docker Compose stack with minimal configuration. For AWS, use ECS with RDS and ElastiCache for a scalable setup.

Start now with Layer 1.
