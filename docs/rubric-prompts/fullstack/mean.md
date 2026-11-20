You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: mean (roadmap fullstack). It has 10 layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

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
### Layer 1 of 10: id mean-1
Title: JavaScript and Web Fundamentals
Group: "JavaScript language internals used throughout MEAN"
  - Subtopic: "The event loop: call stack, microtasks, and the task queue"
    JavaScript is single-threaded. The event loop processes the call stack first, then flushes all microtasks (Promise callbacks), then picks one macrotask (setTimeout). This ordering explains async sequencing bugs.
  - Subtopic: "Closures and lexical scoping in JavaScript"
    A closure is a function that retains access to its outer scope after that scope has returned. They underpin Angular services, RxJS operators, and Node module patterns — understanding them prevents variable sharing bugs.
Group: "Async patterns: Promises and async/await"
  - Subtopic: "Promises: .then chaining, .catch, and Promise.all"
    Promise.then returns a new Promise, enabling chains. .catch at the end catches any rejection in the chain. Promise.all rejects immediately if any input rejects — use Promise.allSettled when you need all results.
  - Subtopic: "async/await: syntactic sugar over Promises with try/catch"
    async functions always return a Promise. await suspends execution until the Promise settles. Wrap in try/catch to handle rejections — unhandled async errors will crash Node or cause silent failures in Angular.
Group: "ES6+ syntax used across the MEAN stack"
  - Subtopic: "Destructuring, spread, and rest in function arguments"
    Destructuring unpacks arrays and objects inline. Spread copies or merges collections. Rest parameters (...args) collect remaining arguments. All three appear constantly in Angular component code and Node handlers.
  - Subtopic: "ES modules: import/export and their differences from CommonJS"
    ESM is statically analyzed at parse time; CommonJS require is dynamic. Angular uses ESM; older Node defaults to CommonJS. Understanding the boundary prevents interop errors when mixing packages.
Group: "DOM manipulation and responsive layout basics"
  - Subtopic: "DOM events, querySelector, and classList"
    querySelector returns the first matching element; querySelectorAll returns a NodeList. classList.toggle/add/remove drives state-based styling. These are the primitives Angular's renderer abstracts over.
  - Subtopic: "Flexbox and responsive layout with media queries"
    flex + items-center + justify-between handles most component-level layout. Mobile-first min-width media queries layer breakpoints upward. These apply whether you use plain CSS or Angular CDK layouts.

### Layer 2 of 10: id mean-2
Title: TypeScript for Angular
Group: "TypeScript's type system for Angular development"
  - Subtopic: "Structural typing and why shape matters more than name"
    TypeScript checks structure, not declared type names. An object with all required properties satisfies an interface regardless of how it was created. This is why Angular can inject any compatible class.
  - Subtopic: "Decorators: how Angular uses them to attach metadata"
    TypeScript decorators are functions that annotate classes, methods, or properties at design time. Angular's @Component, @Injectable, and @NgModule use decorators to register metadata the Angular compiler reads.
Group: "Classes and access modifiers in TypeScript"
  - Subtopic: "Public, private, protected, and readonly modifiers"
    private prevents access outside the class at compile time. readonly prevents reassignment after construction. Angular services use private for dependencies and public for template-accessible properties.
  - Subtopic: "Generics in TypeScript: type-safe reusable code"
    Generics let one function or class work with multiple types. HttpClient.get<User[]>('/api/users') infers the response type. Without generics, you'd need a cast or accept 'any' everywhere.
Group: "TypeScript tooling for an Angular project"
  - Subtopic: "tsconfig.json: strict, target, and Angular-specific options"
    Angular projects set strict: true, target: ES2022, and experimentalDecorators: true in tsconfig.json. The Angular CLI generates this; understanding it prevents cryptic compiler errors when upgrading.
  - Subtopic: "Utility types: Partial, Required, Pick, Omit, Record"
    Partial<User> makes all fields optional — useful for update DTOs. Omit<User, 'password'> creates a safe public type. Record<string, number> types a dictionary. These eliminate redundant type definitions.
Group: "Enums, interfaces, and module organization"
  - Subtopic: "Interfaces for data shapes, enums for fixed value sets"
    Use interfaces for API response and domain object shapes. Use const enums for fixed value sets like TaskStatus or UserRole — they compile away to literal values with no runtime overhead.
  - Subtopic: "TypeScript module augmentation and declaration merging"
    Declaration merging lets you extend existing interfaces in separate files. Angular libraries use this to extend the global Window type or add properties to Express's Request interface.

### Layer 3 of 10: id mean-3
Title: Angular Fundamentals
Group: "Angular's architecture and change detection model"
  - Subtopic: "Zone.js and how Angular knows when to run change detection"
    Zone.js monkey-patches async APIs (setTimeout, fetch, DOM events) to notify Angular when async work completes. Angular then runs change detection to update the view. Understanding this explains why some async code doesn't trigger updates.
  - Subtopic: "Dependency injection: the hierarchical injector tree"
    Angular's DI system resolves providers by walking up the injector tree — component → module → root. A service provided in root is a singleton; provided in a component it's scoped to that component's subtree.
Group: "Component lifecycle hooks and template binding"
  - Subtopic: "ngOnInit vs constructor: when to initialize versus inject"
    The constructor should only inject dependencies. ngOnInit runs after Angular sets input properties — put data fetching and initialization logic there. ngOnDestroy is the place to unsubscribe from Observables.
  - Subtopic: "Data binding: interpolation, property binding, event binding, two-way"
    {{ value }} interpolates text. [property]='value' sets DOM properties. (event)='handler()' listens for events. [(ngModel)]='value' is syntactic sugar for both together — two-way binding.
Group: "Building Angular components and using directives"
  - Subtopic: "Structural directives: *ngIf, *ngFor, and ng-template"
    *ngIf conditionally renders an element; *ngFor iterates an array. Both are syntactic sugar for <ng-template> with an implicit template reference. The asterisk prefix signals Angular to rewrite them.
  - Subtopic: "Angular CLI: generate, serve, build, and test commands"
    ng generate component my-comp creates the component, spec, and module entry. ng serve starts the dev server with HMR. ng build --configuration production produces an optimized output bundle.
Group: "Services and the Angular router"
  - Subtopic: "Creating and injecting services with @Injectable"
    @Injectable({ providedIn: 'root' }) makes the service a singleton available app-wide. Inject it via the constructor: constructor(private taskService: TaskService). Never new a service manually.
  - Subtopic: "Angular Router: RouterModule, routes array, and routerLink"
    Define routes as { path: 'tasks', component: TaskListComponent } and configure RouterModule.forRoot(routes). Use [routerLink]='/tasks' for navigation and <router-outlet> as the render target.

### Layer 4 of 10: id mean-4
Title: Reactive Programming with RxJS
Group: "Reactive programming with RxJS Observables"
  - Subtopic: "Observables versus Promises: lazy, cancellable, multi-value streams"
    A Promise executes immediately and resolves once. An Observable is lazy — it starts only when subscribed — and can emit multiple values over time. HTTP calls emit once; form valueChanges emits on every keystroke.
  - Subtopic: "Hot versus cold Observables and multicasting with Subject"
    Cold Observables create a new execution per subscriber (HttpClient.get). Hot Observables share one execution across all subscribers. Subject is both an Observable and Observer — use it to bridge imperative code to reactive streams.
Group: "RxJS operators and stream composition"
  - Subtopic: "Transformation operators: map, switchMap, mergeMap, and concatMap"
    switchMap cancels the previous inner Observable when a new source value arrives — ideal for search typeahead. mergeMap runs all inner Observables concurrently. concatMap queues them. Choosing wrong causes race conditions.
  - Subtopic: "Memory leaks from unsubscribed Observables"
    Observables that never complete (interval, Subject) leak memory if not unsubscribed. Use the async pipe in templates (auto-unsubscribes on destroy) or the takeUntil pattern with a destroy$ Subject.
Group: "Using RxJS in Angular components and services"
  - Subtopic: "The async pipe: automatic subscription and unsubscription in templates"
    {{ items$ | async }} subscribes to the Observable when the component renders and automatically unsubscribes when it destroys. It also triggers change detection when a new value arrives — no manual subscribe needed.
  - Subtopic: "BehaviorSubject for shared state in Angular services"
    BehaviorSubject holds a current value and emits it immediately to new subscribers. Use it in a service to share state across components: private state$ = new BehaviorSubject<Task[]>([]); expose state$.asObservable().
Group: "Live search with debounce and distinctUntilChanged"
  - Subtopic: "debounceTime and distinctUntilChanged for efficient search inputs"
    debounceTime(300) waits 300ms after the last keystroke before emitting. distinctUntilChanged suppresses emissions when the value hasn't changed. Together they reduce API calls on rapid typing.
  - Subtopic: "Combining streams: combineLatest and forkJoin"
    combineLatest emits whenever any source emits, with the latest values from all sources. forkJoin waits for all Observables to complete and emits their last values — like Promise.all for Observables.

### Layer 5 of 10: id mean-5
Title: Node and Express Backend
Group: "Node.js runtime and Express middleware model"
  - Subtopic: "Node's non-blocking I/O and why CPU-bound work blocks the event loop"
    Node's event loop handles I/O callbacks asynchronously, but synchronous CPU-bound code (parsing, encryption) blocks it for all requests. Offload heavy CPU work to worker threads or a separate service.
  - Subtopic: "Express middleware execution order and error propagation with next()"
    Express processes middleware in registration order. Calling next() passes to the next handler; next(err) skips to error middleware. Route-specific middleware runs before the route handler.
Group: "REST API conventions for a MEAN backend"
  - Subtopic: "Resource-based URL design and correct HTTP verb semantics"
    URLs name resources (/tasks/42), not actions. GET reads without side effects, POST creates, PATCH partially updates, DELETE removes. Consistent semantics let Angular's HttpClient cache and retry correctly.
  - Subtopic: "CORS configuration for Angular consuming an Express API"
    Angular runs on a different port than Express in development. Configure CORS with the origin set to the Angular dev server URL. In production, restrict it to the deployed frontend domain.
Group: "Structuring and running a MEAN Express API"
  - Subtopic: "Router modules, controllers, and the service layer pattern"
    Keep routes thin: express.Router() handles routing, controller functions orchestrate, service functions contain business logic. This separation makes each layer independently testable.
  - Subtopic: "Environment config with dotenv and startup validation"
    dotenv loads .env into process.env. Validate required variables at startup — fail fast with a clear error rather than a cryptic undefined crash at runtime hours later.
Group: "Input validation and error handling"
  - Subtopic: "express-validator for route-level request body validation"
    Chain validators on routes: body('title').notEmpty().trim(). Call validationResult(req) and return 422 with the error array. This keeps validation co-located with the route it protects.
  - Subtopic: "Centralized error middleware and async error wrappers"
    Register (err, req, res, next) middleware last. Wrap async handlers in a catchAsync utility to forward rejected Promises to next(err) without try-catch in every route.

### Layer 6 of 10: id mean-6
Title: MongoDB and Mongoose
Group: "MongoDB document model and schema design"
  - Subtopic: "Embedding versus referencing: choosing the right data model"
    Embed subdocuments when they are always read with the parent and are bounded in size (comments on a task). Reference with ObjectId when the related data is large, shared, or queried independently.
  - Subtopic: "BSON types: ObjectId, Date, and Int64 beyond JSON"
    MongoDB stores BSON which includes types JSON lacks — ObjectId for IDs, Date for timestamps, Int32/Int64 for integers. ObjectId encodes a 4-byte timestamp, making documents sortable by insertion time.
Group: "Mongoose schema validation and middleware hooks"
  - Subtopic: "Schema types, validators, required, and default values"
    Mongoose schemas define shape with type, required, unique, and default. Validation runs before save, giving an application-level data integrity layer on top of MongoDB's schemaless storage.
  - Subtopic: "Pre/post hooks for cross-cutting concerns like password hashing"
    userSchema.pre('save', async function() { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12); }) hashes passwords automatically without callers remembering to do it.
Group: "CRUD and querying with Mongoose"
  - Subtopic: "Model.find(), findById(), create(), findByIdAndUpdate()"
    These four methods cover most CRUD operations. findByIdAndUpdate with { new: true, runValidators: true } returns the updated document and runs schema validators. Always handle null returns for findById.
  - Subtopic: "Query operators: $in, $gte, $regex, and $or for filtering"
    Task.find({ status: { $in: ['open', 'in-progress'] }, dueDate: { $lte: new Date() } }) uses MongoDB operators. Mongoose translates these into the MongoDB query language automatically.
Group: "Connections, indexes, and population"
  - Subtopic: "mongoose.connect with connection event handling"
    Call mongoose.connect(MONGODB_URI) once at startup and listen for 'connected' and 'error' events. In production, set serverSelectionTimeoutMS and enable retry on failure for resilience.
  - Subtopic: "Mongoose populate for resolving ObjectId references"
    Task.find().populate('assignee', 'name email') replaces the ObjectId with the referenced User document fields. This avoids manual joins while keeping documents normalized.

### Layer 7 of 10: id mean-7
Title: Connecting Angular to the API
Group: "Angular HttpClient and reactive HTTP patterns"
  - Subtopic: "How HttpClient returns cold Observables for each request"
    HttpClient.get() returns a cold Observable — it doesn't make the HTTP request until subscribed. Each subscription triggers a new request. Use shareReplay(1) to multicast a single request to multiple subscribers.
  - Subtopic: "HTTP interceptors for centralized auth header injection"
    An HttpInterceptor runs for every request. Implement intercept(req, next) to clone the request with an Authorization header and return next.handle(modifiedReq). Register it as a provider in the app.
Group: "Error handling in Observable-based HTTP calls"
  - Subtopic: "catchError operator: handling HTTP errors in the service layer"
    pipe(catchError(err => { console.error(err); return throwError(() => err); })) intercepts errors in the Observable stream. Handle 401s globally in an interceptor; handle domain errors in the service.
  - Subtopic: "Environment-based API URL configuration in Angular"
    Angular's environment.ts / environment.prod.ts lets you define apiUrl per environment. The CLI swaps files at build time with --configuration production, keeping dev and prod URLs separate without runtime branching.
Group: "Making typed HTTP calls with Angular HttpClient"
  - Subtopic: "Typing HTTP responses with generics: HttpClient.get<Task[]>()"
    HttpClient methods accept a type parameter: this.http.get<Task[]>('/api/tasks') returns Observable<Task[]>. This gives you full TypeScript inference on the response without manual type assertions.
  - Subtopic: "Loading and error state management with the async pipe"
    Expose tasks$ = this.taskService.getTasks() and bind with *ngIf='tasks$ | async as tasks; else loading'. The async pipe subscribes, unwraps, and auto-unsubscribes — no manual subscribe or unsubscribe.
Group: "HTTP retries and request cancellation"
  - Subtopic: "retryWhen and retry operators for transient API failures"
    pipe(retry({ count: 3, delay: 1000 })) retries a failed HTTP request up to 3 times with a 1-second delay. Only retry idempotent requests (GET) — retrying a POST could create duplicates.
  - Subtopic: "takeUntilDestroyed for automatic unsubscription in Angular 16+"
    takeUntilDestroyed() automatically completes an Observable when the component is destroyed. It replaces the boilerplate destroy$ Subject / takeUntil pattern and integrates with Angular's DestroyRef.

### Layer 8 of 10: id mean-8
Title: Authentication with JWT
Group: "JWT auth security: token structure and storage"
  - Subtopic: "JWT header.payload.signature: what each part contains"
    The header specifies the algorithm (HS256). The payload holds claims (userId, role, exp). The signature is HMAC of both, using the server secret. Anyone can decode the payload — never put passwords or PII in it.
  - Subtopic: "Token storage: why memory > localStorage > HTTP-only cookie trade-offs"
    Memory (JS variable) is safest from XSS but lost on page refresh. HTTP-only cookies are immune to XSS but vulnerable to CSRF. localStorage is convenient but readable by any JS on the page. Choose based on your threat model.
Group: "Angular route guards for client-side protection"
  - Subtopic: "CanActivate guard: redirecting unauthenticated users at the router level"
    A CanActivate guard checks auth state and returns true to allow navigation or a UrlTree to redirect. Inject the Router to create the redirect: return this.router.createUrlTree(['/login']).
  - Subtopic: "CanActivate is client-side only — server routes must always verify tokens"
    Route guards protect the UI experience but anyone can bypass them with DevTools. Every API endpoint must independently verify the JWT. Never rely solely on the Angular guard to protect data.
Group: "Implementing JWT auth on the Express backend"
  - Subtopic: "Signing and verifying JWTs with jsonwebtoken"
    jwt.sign({ userId, role }, secret, { expiresIn: '15m' }) creates the token. jwt.verify(token, secret) validates it and returns the payload. Set short expiry on access tokens and use refresh tokens for longevity.
  - Subtopic: "Auth middleware: extract Bearer token and attach user to req"
    Split Authorization header on ' ', verify the second part, attach decoded payload to req.user, call next(). On verification failure, call next(new UnauthorizedError()) to reach error middleware.
Group: "Angular auth service and HTTP interceptor"
  - Subtopic: "Auth service: storing token, exposing currentUser$, and signOut"
    Store the access token in a BehaviorSubject<string | null>. Expose isAuthenticated$ as currentUser$.pipe(map(Boolean)). The signOut method sets the subject to null and navigates to /login.
  - Subtopic: "JWT interceptor: injecting the Authorization header on every request"
    In the interceptor's intercept method, read the token from AuthService, clone the request with headers: req.headers.set('Authorization', `Bearer ${token}`), and forward the cloned request.

### Layer 9 of 10: id mean-9
Title: Advanced Angular and Forms
Group: "Angular Reactive Forms internals"
  - Subtopic: "FormControl, FormGroup, and FormArray: the form model tree"
    Reactive Forms represent form state as a tree of AbstractControl objects. FormControl tracks a single input, FormGroup tracks a set of controls, FormArray tracks a dynamic list. The tree mirrors the form's UI hierarchy.
  - Subtopic: "Synchronous and async validators: how validation runs"
    Synchronous validators run on every value change and return a ValidationErrors object or null. Async validators (debounced API calls) return an Observable or Promise. Status transitions through PENDING while async validators run.
Group: "Angular change detection and OnPush strategy"
  - Subtopic: "OnPush change detection: only check on new inputs or events"
    Default change detection checks every component on every browser event. ChangeDetectionStrategy.OnPush only checks the component when an @Input reference changes, an Observable emits, or an event fires inside it. This dramatically reduces checks in large apps.
  - Subtopic: "Lazy loading feature modules to reduce the initial bundle"
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) defers loading the module until the route is visited. This reduces the initial bundle size and speeds up first paint.
Group: "Building reactive forms with validation in Angular"
  - Subtopic: "FormBuilder service for concise form group creation"
    Inject FormBuilder and use fb.group({ title: ['', [Validators.required, Validators.maxLength(100)]], dueDate: [''] }) instead of manually constructing FormGroup and FormControl instances.
  - Subtopic: "Displaying field errors: touched, dirty, and invalid flags"
    Show errors only when the field is touched (user has left the field) and invalid: *ngIf='form.get("title").touched && form.get("title").invalid'. This avoids showing errors on untouched fields.
Group: "Dynamic form arrays and state management patterns"
  - Subtopic: "FormArray for dynamic subtask lists with add/remove controls"
    FormArray.push(fb.control('', Validators.required)) adds a new field at runtime. FormArray.removeAt(index) removes one. Iterate with formArray.controls in the template to render each control.
  - Subtopic: "NgRx signals or BehaviorSubject for cross-component state"
    For state shared across multiple components, a service with a BehaviorSubject is the simplest solution. NgRx is warranted when state mutations become complex enough to need a reducer and action log.

### Layer 10 of 10: id mean-10
Title: Testing and Deployment
Group: "Testing Angular applications"
  - Subtopic: "TestBed: Angular's testing module for component and service isolation"
    TestBed.configureTestingModule() creates an isolated Angular module for each test. It compiles components, provides mocks for services, and sets up the DI context without bootstrapping the full app.
  - Subtopic: "Jasmine spy objects for mocking Angular service dependencies"
    jasmine.createSpyObj('TaskService', ['getTasks', 'createTask']) creates a mock with spied methods. Use returnValue(of(mockData)) to return an Observable from the spy. This isolates the component from real HTTP calls.
Group: "Deploying MEAN apps to production"
  - Subtopic: "Angular production build: ng build and the dist/ output"
    ng build --configuration production runs the Angular compiler with optimizations: tree-shaking, minification, and Ahead-of-Time (AOT) compilation. The output in dist/ is static HTML/CSS/JS served by any web server.
  - Subtopic: "MongoDB Atlas: managed clusters, IP allowlists, and connection strings"
    Atlas handles provisioning, backups, and scaling. Allowlist your server's IP (or 0.0.0.0/0 for dynamic IPs). The connection string goes in your Node app's env var — never hard-coded in source.
Group: "Writing Angular unit and integration tests"
  - Subtopic: "Testing components: fixture, debugElement, and detectChanges"
    fixture.detectChanges() triggers Angular's change detection so the template reflects current state. Use fixture.debugElement.query(By.css('.task-list')) to find DOM elements in tests.
  - Subtopic: "HttpClientTestingModule and HttpTestingController for HTTP mocks"
    Import HttpClientTestingModule and inject HttpTestingController. Call controller.expectOne('/api/tasks') to assert the request was made, then flush mock data to resolve the Observable.
Group: "Deploying Node and Angular to production"
  - Subtopic: "Serving the Angular dist/ from Express as a static SPA"
    app.use(express.static('dist/app-name')) serves the Angular build. Add a catch-all route: app.get('*', (req, res) => res.sendFile('index.html')) so Angular's router handles all non-API URLs.
  - Subtopic: "PM2 for Node process management in production"
    PM2 keeps Node running after crashes, enables zero-downtime reloads (pm2 reload app), and provides log management. Use pm2 ecosystem.config.js to define app name, script path, and environment variables.

Start now with Layer 1.
