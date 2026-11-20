You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: rails-dev (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id rails-dev-1
Title: Ruby Fundamentals
Group: "Core Ruby Language Concepts"
  - Subtopic: "Variables, methods, and blocks in Ruby"
    Ruby uses dynamic typing with local, instance, class, and global variables. Blocks are anonymous closures passed to methods using do...end or curly braces.
  - Subtopic: "Arrays, hashes, and Enumerable module"
    Ruby arrays and hashes are first-class objects with rich APIs. The Enumerable module provides map, select, reduce, and dozens of iteration helpers.
  - Subtopic: "Symbols, ranges, and exception handling"
    Symbols are immutable identifiers commonly used as hash keys. Ranges represent sequences and Ruby uses begin/rescue/ensure for structured exception handling.
Group: "Object-Oriented Ruby"
  - Subtopic: "Classes, modules, and mixins pattern"
    Ruby classes support single inheritance while modules enable mixin behavior, allowing shared methods across unrelated class hierarchies without duplication.
  - Subtopic: "Gems and Bundler dependency management"
    RubyGems is the package manager for Ruby libraries. Bundler manages gem dependencies via a Gemfile, ensuring consistent environments across machines.
Group: "Ruby Tooling and Environment"
  - Subtopic: "Installing Ruby with rbenv or RVM"
    rbenv and RVM are version managers that let you install and switch between multiple Ruby versions per project, preventing conflicts between applications.
  - Subtopic: "IRB interactive Ruby shell usage"
    IRB (Interactive Ruby) is the built-in REPL for experimenting with Ruby expressions, testing methods, and debugging code snippets quickly.
Group: "Practical Ruby Patterns"
  - Subtopic: "Writing idiomatic Ruby with style guides"
    The RuboCop style guide enforces community-standard Ruby idioms. Following conventions like method naming, block usage, and guard clauses improves readability.
  - Subtopic: "Debugging Ruby code with Pry and byebug"
    Pry is a powerful IRB alternative with syntax highlighting and introspection. byebug provides step-through debugging with breakpoints in any Ruby application.

### Layer 2 of 10: id rails-dev-2
Title: Rails Basics and MVC
Group: "MVC Architecture and Rails Philosophy"
  - Subtopic: "Model-View-Controller pattern in Rails"
    Rails strictly enforces MVC separation: models handle data logic, controllers handle request flow, and views render HTML responses. This structure makes large codebases maintainable.
  - Subtopic: "Convention over configuration Rails principle"
    Rails minimizes configuration by assuming sensible defaults. Naming conventions for files, classes, and database tables eliminate repetitive boilerplate setup code.
  - Subtopic: "Rails project directory structure overview"
    A Rails app is organized into app/, config/, db/, and lib/ directories. Understanding this layout helps you locate models, routes, views, and configuration quickly.
Group: "Routing and Request Handling"
  - Subtopic: "Routes, controllers, and resourceful routing"
    config/routes.rb maps HTTP verbs and URLs to controller actions. RESTful resources routing generates the seven standard actions automatically with one declaration.
  - Subtopic: "Rails generators and scaffolding workflow"
    Rails generators automate creating models, controllers, views, and migrations. Scaffolding produces a full CRUD interface so you can prototype features rapidly.
Group: "Rails Development Tools"
  - Subtopic: "Rails console for live app exploration"
    bin/rails console opens an IRB session with your full Rails environment loaded, allowing you to query the database, test methods, and inspect objects interactively.
  - Subtopic: "Development server and request logging"
    bin/rails server starts the Puma web server locally. Rails logs every request with SQL queries and timing to help you trace issues during development.
Group: "Views and Template Rendering"
  - Subtopic: "ERB templates and layout inheritance"
    Rails uses ERB (Embedded Ruby) for HTML templates. Layouts define the shared structure and individual view templates are yielded inside them per action.
  - Subtopic: "Flash messages and redirect patterns"
    Flash is a session-based mechanism for passing short messages between requests, typically used to show success or error notices after form submissions and redirects.

### Layer 3 of 10: id rails-dev-3
Title: Active Record and Databases
Group: "Active Record Fundamentals"
  - Subtopic: "Models, migrations, and schema evolution"
    Active Record models map to database tables automatically by name convention. Migrations are Ruby classes that incrementally alter the schema in a version-controlled way.
  - Subtopic: "Active Record associations and relationships"
    belongs_to, has_many, has_one, and has_many :through declare relationships between models. Rails auto-generates join queries and association helper methods.
  - Subtopic: "Model validations for data integrity"
    Active Record validations run before saving records, ensuring data meets requirements like presence, uniqueness, format, and custom conditions.
Group: "Querying and Database Patterns"
  - Subtopic: "Query interface and named scopes"
    Active Record provides a chainable query DSL: where, order, limit, joins, and includes. Named scopes encapsulate reusable query conditions as class methods.
  - Subtopic: "CRUD operations with Active Record"
    Active Record provides create, read, update, and delete operations through methods like new, save, find, update, and destroy with automatic SQL generation.
Group: "Database Configuration"
  - Subtopic: "Switching SQLite to PostgreSQL in Rails"
    Production Rails apps typically use PostgreSQL for its robustness and features. Switching requires updating the Gemfile, database.yml, and providing a connection string.
  - Subtopic: "Database seeds and test data setup"
    db/seeds.rb provides a standard location for populating the database with initial or sample data using Active Record create calls.
Group: "Active Record Tooling"
  - Subtopic: "Database console and schema inspection"
    bin/rails dbconsole opens the native database CLI. db/schema.rb is the authoritative source for current table structure generated from migrations.
  - Subtopic: "Using PgHero and Bullet for query analysis"
    Bullet detects N+1 queries and missing eager loading during development. PgHero provides a web dashboard for inspecting PostgreSQL query performance and index usage.

### Layer 4 of 10: id rails-dev-4
Title: Views, Forms, and Assets
Group: "Template and Layout Architecture"
  - Subtopic: "ERB syntax and view rendering lifecycle"
    ERB embeds Ruby expressions inside HTML using <%= %> and <% %>. Rails renders the action template first, then wraps it in the application layout via yield.
  - Subtopic: "Partials and view helpers for reuse"
    Partials are reusable view fragments prefixed with underscore. Helper methods defined in app/helpers/ extract view logic into testable Ruby methods.
  - Subtopic: "Flash messages and user feedback patterns"
    Flash notices and alerts provide one-request messages after redirects. Rendering them in the layout ensures they appear after any form submission.
Group: "Forms and Parameters"
  - Subtopic: "Form helpers and strong parameters security"
    form_with generates secure HTML forms tied to model objects. Strong parameters require explicit permit declarations to prevent mass assignment vulnerabilities.
  - Subtopic: "Nested forms and complex data submission"
    accepts_nested_attributes_for allows forms to create or update associated models in one submission. fields_for renders nested form fields for the association.
Group: "Asset Management"
  - Subtopic: "Rails asset pipeline with Sprockets"
    The asset pipeline concatenates, minifies, and fingerprints CSS, JavaScript, and image files. Sprockets handles dependency resolution and cache-busting digests.
  - Subtopic: "Importing CSS with cssbundling-rails"
    cssbundling-rails integrates Sass, Tailwind CSS, or PostCSS into the asset pipeline. It runs a Node.js build step and outputs to app/assets/builds.
Group: "Frontend Integration"
  - Subtopic: "importmap-rails for JavaScript modules"
    importmap-rails uses browser-native import maps to load JavaScript modules without a bundler. It pins gems and npm packages directly to CDN or local paths.
  - Subtopic: "jsbundling-rails with esbuild or webpack"
    jsbundling-rails adds a JavaScript bundling step for projects needing npm packages. esbuild is the fastest option while webpack offers the most configuration.

### Layer 5 of 10: id rails-dev-5
Title: Authentication and Authorization
Group: "Authentication Concepts"
  - Subtopic: "Sessions, cookies, and stateful authentication"
    Rails sessions store a signed, encrypted cookie on the client. The session hash persists data between requests, enabling login state without re-authentication each time.
  - Subtopic: "Password hashing with bcrypt security"
    bcrypt is an adaptive hashing algorithm resistant to brute-force attacks. Rails has_secure_password uses bcrypt to hash passwords automatically before storage.
  - Subtopic: "Authorization roles and permissions design"
    Authorization determines what authenticated users can do. Role-based access control assigns permissions to roles like admin and user, checked before sensitive actions.
Group: "Authentication Patterns"
  - Subtopic: "User signup, login, and logout flow"
    A typical Rails auth flow creates a user on signup, verifies credentials on login, stores the user ID in session, and destroys the session on logout.
  - Subtopic: "Protecting controller actions with before_action"
    before_action filters run before controller actions to enforce authentication. Redirecting unauthenticated users and halting the action prevents unauthorized access.
Group: "Authentication Libraries"
  - Subtopic: "Devise gem for full-featured authentication"
    Devise is a modular authentication solution providing sign-up, sign-in, password reset, email confirmation, and session timeout out of the box.
  - Subtopic: "OmniAuth for third-party OAuth providers"
    OmniAuth provides a standardized interface for OAuth2 with providers like Google, GitHub, and Facebook. Devise integrates via the devise-omniauth strategy.
Group: "Authorization Libraries"
  - Subtopic: "Pundit policy objects for authorization"
    Pundit uses plain Ruby policy classes to define authorization rules per model. Controllers call authorize to check policies, keeping logic out of controllers.
  - Subtopic: "CanCanCan ability-based authorization"
    CanCanCan defines all permissions in a single Ability class using can and cannot rules. load_and_authorize_resource auto-loads and checks permissions for REST actions.

### Layer 6 of 10: id rails-dev-6
Title: Interactivity with Hotwire
Group: "Hotwire Architecture Concepts"
  - Subtopic: "Turbo Drive for fast page navigation"
    Turbo Drive intercepts link clicks and form submissions, replacing only the page body over fetch requests. This eliminates full page reloads for a SPA-like feel.
  - Subtopic: "Turbo Frames for partial page updates"
    Turbo Frames wrap page sections so only that section updates on navigation. This enables tab switching, inline editing, and pagination without JavaScript.
  - Subtopic: "Turbo Streams for server-pushed DOM updates"
    Turbo Streams deliver CRUD actions (append, prepend, replace, remove) from the server via HTTP responses or WebSocket broadcasts, updating multiple page targets.
Group: "Stimulus and Progressive Enhancement"
  - Subtopic: "Stimulus controllers and data attributes"
    Stimulus connects JavaScript controller classes to HTML elements via data-controller attributes. It adds behavior progressively without replacing server-rendered HTML.
  - Subtopic: "Real-time features with Action Cable WebSockets"
    Action Cable integrates WebSockets into Rails using channels. Turbo Streams over Action Cable enables live broadcasting of DOM updates to multiple connected clients.
Group: "Hotwire Setup and Tooling"
  - Subtopic: "Installing Hotwire with turbo-rails gem"
    turbo-rails integrates the Turbo JavaScript library into the Rails asset pipeline and provides view helpers, tag builders, and Broadcastable model concern.
  - Subtopic: "stimulus-rails gem and controller generation"
    stimulus-rails adds Stimulus to the importmap or bundler setup and provides rails generate stimulus to scaffold controller files in app/javascript/controllers.
Group: "Interactive UI Patterns"
  - Subtopic: "Inline editing with Turbo Frames workflow"
    Replace static content with an edit form in-place using a Turbo Frame wrapping both the display and edit states. The frame updates only the wrapped area on response.
  - Subtopic: "Broadcasting live updates from Active Record"
    The Broadcastable concern mixes into models to broadcast Turbo Stream messages on create, update, and destroy, pushing changes to all subscribed clients automatically.

### Layer 7 of 10: id rails-dev-7
Title: Background Jobs and Mailers
Group: "Background Job Concepts"
  - Subtopic: "Active Job abstraction and adapter pattern"
    Active Job provides a unified interface for background job processing. You define jobs in app/jobs/ and swap backend adapters (Sidekiq, Resque) without changing job code.
  - Subtopic: "Job retries, error handling, and dead queues"
    Active Job supports automatic retries with exponential backoff via retry_on. discard_on drops jobs that fail with specific errors that should not be retried.
  - Subtopic: "Action Mailer email composition and delivery"
    Action Mailer creates mailer classes that generate HTML and plain-text emails. deliver_later enqueues email delivery as a background job through Active Job.
Group: "Email Templates and Testing"
  - Subtopic: "Email templates HTML and text multipart"
    Mailer views live in app/views/mailer_name/ and Rails renders both HTML and plain text versions. Multipart emails ensure compatibility with all email clients.
  - Subtopic: "Mailer previews for development email testing"
    Action Mailer previews let you render emails in the browser at /rails/mailers without actually sending them, speeding up email template iteration.
Group: "Sidekiq and Redis Setup"
  - Subtopic: "Sidekiq worker processes and Redis backend"
    Sidekiq uses Redis as a job queue store and runs multi-threaded worker processes. It processes significantly more jobs per second than thread-per-process alternatives.
  - Subtopic: "Sidekiq Web UI for job monitoring"
    Sidekiq ships with a Rack-based web interface showing queue depths, processed counts, failed jobs, and retry queues. Mount it in routes.rb behind authentication.
Group: "Job Scheduling and Reliability"
  - Subtopic: "Scheduling recurring jobs with sidekiq-cron"
    sidekiq-cron adds a cron-style scheduler to Sidekiq using a YAML schedule file. It integrates with the Sidekiq Web UI to show and manage scheduled jobs.
  - Subtopic: "Email delivery with SendGrid and Postmark"
    Configure action_mailer.delivery_method with SMTP credentials from SendGrid or Postmark. Use environment variables to keep credentials out of the repository.

### Layer 8 of 10: id rails-dev-8
Title: Building APIs with Rails
Group: "API Design Principles"
  - Subtopic: "API-only Rails application architecture"
    rails new --api creates a slimmed-down Rails stack removing view layers and session middleware. Controllers inherit from ActionController::API for lightweight JSON responses.
  - Subtopic: "API versioning strategies and URL design"
    Versioning via URL namespaces (/api/v1/) or Accept headers prevents breaking changes for existing clients. Namespaced controllers in app/controllers/api/v1/ isolate versions.
  - Subtopic: "Token-based authentication for API endpoints"
    API token auth stores a secure random token on the user and validates it from the Authorization header. JWT (JSON Web Tokens) is a stateless alternative.
Group: "API Security and Documentation"
  - Subtopic: "CORS configuration and rate limiting"
    rack-cors adds CORS headers to allow browser requests from other origins. rack-attack provides IP-based rate limiting, throttling, and blocklisting middleware.
  - Subtopic: "API documentation with Swagger and rswag"
    rswag generates OpenAPI (Swagger) documentation from RSpec request specs. The Swagger UI lets consumers explore and test API endpoints interactively.
Group: "JSON Serialization"
  - Subtopic: "Serializing responses with jsonapi-serializer"
    jsonapi-serializer generates fast JSON:API-compliant responses from Active Record objects. Attributes, relationships, and meta fields are declared in serializer classes.
  - Subtopic: "Active Model Serializers for custom JSON shapes"
    ActiveModelSerializers allows custom JSON representations via adapter patterns. It integrates with Active Record associations for nested object serialization.
Group: "API Testing and Client Tools"
  - Subtopic: "Testing APIs with request specs and Postman"
    RSpec request specs test full HTTP stack including routing, controllers, and serializers. Postman collections document and manually test API endpoints during development.
  - Subtopic: "GraphQL APIs with graphql-ruby gem"
    graphql-ruby implements a GraphQL server in Rails with type-safe schema definitions, query resolution, and mutation support for flexible API data fetching.

### Layer 9 of 10: id rails-dev-9
Title: Performance and Advanced Patterns
Group: "Performance Optimization Theory"
  - Subtopic: "N+1 queries and eager loading with includes"
    N+1 occurs when loading associations in a loop triggers one query per record. includes, preload, or eager_load fetches associations upfront in one or two queries.
  - Subtopic: "Fragment and Russian doll caching strategies"
    Fragment caching stores rendered HTML partials in a cache store. Russian doll caching nests cache keys so parent caches auto-expire when children change.
  - Subtopic: "Database indexing for query performance"
    Adding database indexes to foreign keys and frequently queried columns reduces full table scans. add_index in migrations creates indexes; EXPLAIN ANALYZE measures impact.
Group: "Code Architecture Patterns"
  - Subtopic: "Service objects for complex business logic"
    Service objects are plain Ruby classes encapsulating a single business operation. They keep controllers thin and models focused on data concerns, improving testability.
  - Subtopic: "Concerns and modules for code reuse"
    ActiveSupport::Concern provides a clean way to extract shared model or controller behavior into modules. Concerns live in app/models/concerns/ and app/controllers/concerns/.
Group: "Caching Infrastructure"
  - Subtopic: "Redis cache store configuration in Rails"
    Configure config.cache_store = :redis_cache_store with a Redis connection to get a fast, shared cache across multiple server instances with automatic expiration.
  - Subtopic: "HTTP caching with ETags and Last-Modified"
    fresh_when and stale? helpers set ETag and Last-Modified headers so browsers can cache responses and make conditional requests, reducing server load.
Group: "Monitoring and Profiling Tools"
  - Subtopic: "Application performance monitoring with Scout APM"
    Scout APM instruments Rails apps to trace slow requests, N+1 queries, and memory bloat. It provides transaction traces and endpoint performance breakdowns.
  - Subtopic: "rack-mini-profiler for request-level profiling"
    rack-mini-profiler injects a speed badge into pages showing SQL query counts, rendering time, and Ruby object allocations to identify bottlenecks in development.

### Layer 10 of 10: id rails-dev-10
Title: Testing and Deployment
Group: "Testing Philosophy and Strategies"
  - Subtopic: "RSpec model and request spec patterns"
    Model specs test validations, associations, and business logic in isolation. Request specs test the full HTTP stack end-to-end, verifying response codes and JSON bodies.
  - Subtopic: "System tests with Capybara and browser drivers"
    Capybara drives a real browser (via Selenium or Cuprite) to test full user workflows. System specs verify JavaScript interactions, form submissions, and Turbo navigation.
  - Subtopic: "FactoryBot for test data factories"
    FactoryBot replaces brittle fixtures with factories that build model instances with sensible defaults and trait overrides, making test setup readable and flexible.
Group: "CI and Quality Gates"
  - Subtopic: "GitHub Actions CI pipeline for Rails"
    A GitHub Actions workflow installs Ruby, sets up a PostgreSQL service container, runs db:schema:load, and executes the full test suite on every pull request.
  - Subtopic: "Code coverage with SimpleCov reporting"
    SimpleCov generates line-by-line coverage reports after the test suite runs. Set a minimum coverage threshold to prevent merging code that reduces test coverage.
Group: "Containerization"
  - Subtopic: "Dockerfile for Rails production containers"
    Rails 7+ includes a generated Dockerfile using a multi-stage build with a slim Ruby image. The production image compiles assets, runs migrations, and starts Puma.
  - Subtopic: "Docker Compose for local development stack"
    Docker Compose orchestrates Rails, PostgreSQL, and Redis containers locally. Service definitions in compose.yml link containers and manage environment variables.
Group: "Cloud Deployment"
  - Subtopic: "Deploying Rails to Render or Railway"
    Render and Railway offer zero-config Rails deployments from a GitHub repo. They detect the Dockerfile or buildpacks, provision PostgreSQL, and run release commands.
  - Subtopic: "Kamal for zero-downtime Rails deployment"
    Kamal (formerly MRSK) is the official Rails deployment tool. It builds Docker images, pushes to a registry, and rolls out to servers with health-checked zero-downtime deploys.

Start now with Layer 1.
