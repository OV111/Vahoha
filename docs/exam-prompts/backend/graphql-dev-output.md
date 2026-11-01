LAYER: graphql-dev-1

```json
[
  {
    "stem": "Which HTTP method is defined as both safe and idempotent?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "CONNECT",
      "PATCH",
      "GET",
      "POST"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A client sends the same PUT request with the same body three times. What does idempotency guarantee?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "The server returns the exact same response body each time",
      "The server rejects the second and third requests as duplicates",
      "The server stores three copies of the resource, one per request",
      "The server state ends up the same as after a single request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An API creates a new resource in response to a POST. Which status code best signals that outcome?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "202 Accepted",
      "201 Created",
      "200 OK",
      "204 No Content"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A request has a valid token, but the user lacks permission for the resource. Which status code fits?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "401 Unauthorized",
      "403 Forbidden",
      "400 Bad Request",
      "404 Not Found"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 401 Unauthorized response mean in practice?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "Credentials are missing or invalid, so log in first",
      "The user is logged in but is not allowed to see the resource",
      "The server could not parse the request body as valid JSON",
      "The resource existed once but has been permanently removed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which header tells the server what format the request body is in?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "Transfer-Encoding",
      "Content-Type",
      "Content-Encoding",
      "Accept"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which header does a client send to say which response formats it can handle?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "Allow",
      "Accept",
      "Vary",
      "Content-Type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference between PUT and PATCH for updating a resource?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "PUT creates new resources only; PATCH is the only way to update them",
      "PUT is sent without a body; PATCH must always carry a JSON body",
      "PUT is never idempotent; PATCH is always idempotent by definition",
      "PUT sends the full new representation; PATCH sends only the fields to change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code range indicates that the server failed while handling an otherwise valid request?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "3xx",
      "5xx",
      "1xx",
      "4xx"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A browser makes a cross-origin request with a custom header. What does it send first?",
    "topic": "HTTP methods, status codes & headers",
    "choices": [
      "A HEAD request to check that the resource exists",
      "A TRACE request to echo the headers back",
      "An OPTIONS preflight asking if the request is allowed",
      "A GET request with the custom header removed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Node.js use to handle many concurrent connections on a single JavaScript thread?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "A separate process forked for every connection",
      "A global lock that runs requests one by one to completion",
      "A single-threaded event loop with non-blocking, callback-driven I/O",
      "A new OS thread created for every request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A request handler runs a CPU-heavy synchronous loop for two seconds. What happens to other requests during that time?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "They wait in the queue until the loop finishes",
      "They are moved to a worker thread by the runtime",
      "They are rejected with a 503 by Node.js itself",
      "They run in parallel on other CPU cores automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of package-lock.json?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "It lists only the top-level packages and their version ranges",
      "It stops other developers from adding new dependencies",
      "It stores npm credentials needed to publish the package",
      "It pins the exact installed version of every dependency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In package.json, what does the version range \"^4.18.2\" allow npm to install?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "Any 4.18.x patch release, but no 4.19",
      "Any version at or above 4.18.2, including 5.x",
      "Any 4.x.y release at or above 4.18.2",
      "Only exactly 4.18.2, with no other version"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command installs exactly what package-lock.json specifies, failing if it disagrees with package.json?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "npm ci",
      "npm update",
      "npm install",
      "npm audit fix"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between dependencies and devDependencies in package.json?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "devDependencies are only needed to build or test, not at runtime",
      "devDependencies can only contain packages published by the project",
      "devDependencies are loaded first when the application starts up",
      "devDependencies are installed globally instead of in node_modules"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must you set so Node.js treats .js files in a package as ES modules using import/export?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "\"type\": \"module\" in package.json",
      "\"main\": \"module\" in package.json",
      "\"engines\": { \"esm\": true } in package.json",
      "\"exports\": \"esm\" in package.json"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given: setTimeout(() => log('timeout'), 0); Promise.resolve().then(() => log('promise')); log('sync'). What is logged first and second?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "promise, then sync",
      "sync, then timeout",
      "timeout, then promise",
      "sync, then promise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you run a script named \"dev\" defined in the scripts section of package.json?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "npm run dev",
      "npm dev --script",
      "node package.json dev",
      "npm exec scripts.dev"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An async function throws and nobody awaits or catches its promise. What does current Node.js do by default?",
    "topic": "Node.js runtime & npm",
    "choices": [
      "Retries the async function once before giving up on it",
      "Crashes the process, reporting an unhandled promise rejection error",
      "Silently ignores the error because no caller is waiting",
      "Logs a warning and lets the process keep running forever"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which URL design follows common REST conventions for fetching one user with id 42?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "GET /user/fetchById/42",
      "GET /users/42",
      "GET /getUser?id=42",
      "POST /users/fetch/42"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In Express, how do you read the id from the route /users/:id?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "req.params.id",
      "req.body.id",
      "req.query.id",
      "req.headers.id"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In Express, how do you read the value of ?page=2 in GET /posts?page=2?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "req.params.page",
      "req.path.page",
      "req.query.page",
      "req.body.page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An Express POST handler reads req.body, but it is always undefined for JSON requests. What is the most likely cause?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "The client must send the body as a query string instead",
      "Express only parses bodies on PUT requests, not POST",
      "The express.json() middleware is not registered before the route",
      "The route path must end in .json for parsing to happen"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does calling next() inside an Express middleware do?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "Sends the current response and closes the connection",
      "Skips every remaining middleware and goes to the error handler",
      "Restarts the request from the first registered middleware",
      "Passes control to the next matching middleware or route"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A GET /users/999 handler finds no user with that id. Which response is most appropriate?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "200 with an empty object as the body",
      "204 so the client knows that the body is intentionally empty",
      "404 Not Found with a short JSON error message",
      "500 because the database lookup returned nothing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A client sends a POST with a required field missing. Which status code should the endpoint return?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "500 Internal Server Error",
      "409 Conflict",
      "404 Not Found",
      "400 Bad Request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a list endpoint like GET /orders support pagination?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "Because HTTP limits every response body to a fixed size",
      "So the server can avoid setting a Content-Type header",
      "So response size and query cost stay bounded as data grows",
      "Because JSON cannot represent arrays longer than 1,000 items"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An Express handler calls res.json(data) and then res.status(500).send(). What happens?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "Express merges them into one response with status 500",
      "Both responses reach the client one after another",
      "Express throws an error because headers were already sent",
      "The client receives the 500 instead of the JSON data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which REST request is the conventional way to delete the comment with id 7 on post 3?",
    "topic": "Building a basic REST endpoint",
    "choices": [
      "POST /posts/3/comments/7/delete",
      "DELETE /posts/3/comments/7",
      "GET /deleteComment?post=3&id=7",
      "PUT /posts/3/comments with { id: 7 }"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which value is valid JSON?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "{'name': 'Ana', 'age': 30}",
      "{name: \"Ana\", age: 30}",
      "{\"name\": \"Ana\", \"age\": 30,}",
      "{\"name\": \"Ana\", \"age\": 30}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does JSON.stringify({ a: undefined, b: 1 }) return?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "'{\"a\":null,\"b\":1}'",
      "'{\"a\":\"\",\"b\":1}'",
      "'{\"a\":undefined,\"b\":1}'",
      "'{\"b\":1}'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A Date object is passed through JSON.stringify and then JSON.parse. What comes out?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "The original Date object, unchanged",
      "A string in ISO 8601 format, not a Date",
      "A number of milliseconds since 1970",
      "An empty object with no properties"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when JSON.parse receives a malformed string?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "It returns undefined without throwing",
      "It returns the parts that parsed correctly",
      "It returns null for the whole input",
      "It throws a SyntaxError describing where parsing failed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In the browser, fetch() resolves to a response with status 500. What does the returned promise do?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "It rejects with an HTTP error object",
      "It retries the request once, then rejects",
      "It resolves, and response.ok is false",
      "It resolves with response.ok set to true"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which JavaScript number type problem can affect large IDs sent as JSON numbers?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "JSON numbers are truncated to 32-bit integers on parsing",
      "Integers above 2^53 cannot be represented exactly and lose precision",
      "JSON numbers are always parsed as strings by JavaScript",
      "JSON numbers cannot be negative, so IDs must be unsigned"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a request/response cycle, which part carries the status code?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "The request body sent by the client",
      "The Content-Type header of the request",
      "The response status line",
      "A required \"status\" field in the JSON body"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do many APIs wrap errors in a consistent JSON shape such as { \"error\": { \"code\", \"message\" } }?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "HTTP status codes cannot be read by JavaScript clients",
      "Browsers refuse to display any error response without one",
      "Clients can parse and handle every failure with one piece of code",
      "The JSON spec requires an error field on every response"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does response.json() return when called on a fetch Response?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "The raw body text without any parsing applied",
      "A stream of JSON tokens to read one at a time",
      "A promise that resolves to the parsed body",
      "The parsed body as a plain object, synchronously"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A client sends a JSON body but sets Content-Type: text/plain. What will Express with express.json() do?",
    "topic": "JSON & request/response cycles",
    "choices": [
      "Skip parsing it, so the JSON fields never end up on req.body",
      "Parse it as JSON anyway because it looks like JSON",
      "Convert the body into a string and put it on req.body",
      "Reject it with 415 before reaching any route handler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should a database password for a Node service live?",
    "topic": "Environment config & project structure",
    "choices": [
      "In package.json under a \"config\" section",
      "In a config.js file committed to the repository",
      "In an environment variable or secret store",
      "In a comment at the top of the server entry file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a Node.js app read an environment variable named PORT?",
    "topic": "Environment config & project structure",
    "choices": [
      "process.env.PORT",
      "require('env').PORT",
      "os.environ['PORT']",
      "global.config.PORT"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What type is process.env.PORT when it is set to 3000?",
    "topic": "Environment config & project structure",
    "choices": [
      "The string \"3000\"",
      "A BigInt holding 3000",
      "A Buffer of the digits",
      "The number 3000"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the dotenv package do?",
    "topic": "Environment config & project structure",
    "choices": [
      "Reads a .env file at startup and copies its variables into process.env",
      "Uploads the .env file to the hosting provider on deploy",
      "Encrypts process.env values before they reach the app",
      "Validates that every variable in process.env has a type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should .env be listed in .gitignore?",
    "topic": "Environment config & project structure",
    "choices": [
      "Git cannot store files whose names start with a dot",
      "It usually holds secrets such as API keys and database passwords",
      "npm deletes tracked .env files during npm install",
      "Node.js refuses to read .env files tracked by Git"
    ],
    "answerIdx": 1
  },
  {
    "stem": "According to the Twelve-Factor App, what should differ between staging and production deploys of the same build?",
    "topic": "Environment config & project structure",
    "choices": [
      "The dependency versions that are installed",
      "The source code branch that gets built",
      "The language runtime version used",
      "Only the config"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An app reads a required API key at startup and it is missing. What is the safest behaviour?",
    "topic": "Environment config & project structure",
    "choices": [
      "Start anyway and fail later on the first request",
      "Fail fast at startup with a clear error naming the missing variable",
      "Fall back to a default key hard-coded in the source",
      "Log a warning and silently disable authentication"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which structure keeps a Node API easiest to test as it grows?",
    "topic": "Environment config & project structure",
    "choices": [
      "Thin route handlers call services, and services call a data access layer",
      "Database queries made directly from the middleware layer",
      "All logic in route handlers, so each file is self-contained",
      "One global server file that holds every route and query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it useful to export the Express app separately from the code that calls app.listen()?",
    "topic": "Environment config & project structure",
    "choices": [
      "It lets npm cache the app between separate test runs",
      "It makes the app start faster in production builds",
      "Express throws an error if listen is in the same file",
      "Tests can use the app without opening a port"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is NODE_ENV=production commonly used for?",
    "topic": "Environment config & project structure",
    "choices": [
      "Telling npm to publish the package to the public registry",
      "Turning on production behaviour such as less logging and caching in libraries",
      "Forcing Node.js to use HTTPS for every outgoing request",
      "Making Node.js compile the code ahead of time to binary"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A mobile screen shows only user names, but GET /users returns 30 fields per user. What problem is this?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "Cache stampede",
      "Under-fetching",
      "The N+1 problem",
      "Over-fetching"
    ],
    "answerIdx": 3
  },
  {
    "stem": "To render a page, a client calls GET /post/1, then GET /users/5, then GET /post/1/comments. What problem is this?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "Request smuggling",
      "Overposting",
      "Under-fetching",
      "Over-fetching"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does GraphQL address over-fetching?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "The server compresses unused fields before sending",
      "The client lists exactly the fields it needs, and only those come back",
      "The server removes fields the client did not use last time",
      "The client downloads the full schema and filters locally"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does GraphQL address under-fetching?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "One query can fetch related data across types",
      "The server pushes every related record over a WebSocket",
      "The server caches each endpoint so repeat calls are free",
      "The client sends several REST calls in parallel instead"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How many endpoints does a typical GraphQL API expose for queries and mutations?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "One",
      "One per field",
      "One per type",
      "One per resolver"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP method do most GraphQL servers use for queries sent in a JSON body?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "PATCH",
      "GET",
      "PUT",
      "POST"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is HTTP caching harder with GraphQL than with REST?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "GraphQL responses are not valid JSON documents",
      "GraphQL servers forbid any caching headers",
      "Every GraphQL response contains a random request ID",
      "Queries share one POST URL, so URL-keyed caches miss"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A GraphQL query has a resolver error in one field. What does the server typically return?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "200 with data and an errors array",
      "500 with no data and an HTML error page",
      "404 because the requested field was not found",
      "400 and the rest of the query is not executed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which scenario is a good reason to keep a REST endpoint instead of moving it to GraphQL?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "A dashboard that today needs many round trips per page",
      "A screen that needs related data from five different tables",
      "Several clients that each need different subsets of fields",
      "A simple public resource that benefits from CDN caching"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What defines which types and fields a GraphQL API exposes?",
    "topic": "Why GraphQL — over-fetching & under-fetching",
    "choices": [
      "The HTTP headers",
      "The schema",
      "The URL routes",
      "The resolver order"
    ],
    "answerIdx": 1
  }
]
```

LAYER: graphql-dev-2

```json
[
  {
    "stem": "A query selects `user(id: 1) { profile }`, where profile is an object type. What happens?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "The query runs and profile comes back as an empty object",
      "Validation fails: profile needs a sub-selection of fields",
      "The server returns every field of profile by default",
      "The server returns profile's id field only, as a shortcut"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What shape does the data in a successful GraphQL query response follow?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "The same shape as the query's selection set",
      "The shape of the database tables behind it",
      "The order in which the resolvers finished",
      "A flat list of every field that was resolved"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where can arguments be passed in a GraphQL query?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "Only in the operation header, next to its name",
      "Only on fields that return a list of objects",
      "On any field the schema defines arguments for",
      "Only on the root fields of the Query type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which query is written in valid shorthand form?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "{ me { name } }",
      "query { me: name }",
      "get { me { name } }",
      "query me(name) {}"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why give an operation a name, as in `query GetProfile { me { name } }`?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "The server caches named queries forever and skips running them again",
      "It helps logging, debugging and picking one of several operations in a document",
      "The name decides which resolver the server uses for the root field",
      "Unnamed queries are rejected by every spec-compliant GraphQL server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A field is defined as `posts(first: Int = 10): [Post]`. A query asks for `posts { title }`. How many posts can the resolver be asked for?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "10, the default value set on the argument",
      "None, because the argument is required",
      "1, because a missing argument means one",
      "All posts, because no argument was given"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In `{ user(id: \"4\") { friends { name } } }`, what does the selection on friends do?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "Fetches name for each friend",
      "Filters the friends list to those that have a name set",
      "Fetches name only for the first friend in the list",
      "Sorts the friends list by name before returning it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which argument value is passed as an enum rather than a string?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "orderBy: $\"CREATED_AT\"",
      "orderBy: 'CREATED_AT'",
      "orderBy: \"CREATED_AT\"",
      "orderBy: CREATED_AT"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A query asks for a field that does not exist on the type. When is this caught?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "Never; the field is silently left out of the response data",
      "During validation, before any resolver has run at all",
      "When the resolver for that field is called and returns undefined",
      "Only at runtime when the database query for that field fails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Two root fields appear in one query: `{ me { name } posts { title } }`. How many HTTP round trips does the client make?",
    "topic": "Queries, fields & arguments",
    "choices": [
      "Two, one per root field",
      "One",
      "Three, one per field and one for the document",
      "It depends on how many resolvers there are"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which list contains only built-in GraphQL scalar types?",
    "topic": "The type system & scalars",
    "choices": [
      "Int, Float, Text, Bool, UUID",
      "Int, Long, String, Boolean, Date",
      "Number, String, Boolean, ID, JSON",
      "Int, Float, String, Boolean, ID"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What range does the built-in Int scalar cover?",
    "topic": "The type system & scalars",
    "choices": [
      "Signed 32-bit integers",
      "Signed 64-bit integers, like a Java long",
      "Unsigned 32-bit integers from zero upward",
      "Any integer that fits in a JavaScript number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a value of the ID scalar serialized in a response?",
    "topic": "The type system & scalars",
    "choices": [
      "As a UUID object",
      "As a 64-bit integer",
      "As a base64 blob",
      "As a string"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the type `[String!]!` allow?",
    "topic": "The type system & scalars",
    "choices": [
      "A non-null list whose items are all non-null strings",
      "A single non-null string, written in list syntax",
      "A nullable list whose items are all non-null strings",
      "A non-null list in which any item may be null"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which value is valid for a field of type `[String]!`?",
    "topic": "The type system & scalars",
    "choices": [
      "\"a\"",
      "null",
      "[\"a\", null]",
      "[[\"a\"]]"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A non-null field's resolver returns null. What happens to the response?",
    "topic": "The type system & scalars",
    "choices": [
      "The whole request fails with HTTP 500 and no data is returned",
      "The field is set to an empty string so that the type still matches",
      "An error is added and null spreads up to the nearest nullable parent",
      "The null is returned as-is because non-null is only a hint"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you add a date type that GraphQL does not provide built in?",
    "topic": "The type system & scalars",
    "choices": [
      "Use the built-in Date scalar that every server ships",
      "Use a String field; custom scalars are not allowed",
      "Declare an enum listing the dates the API supports",
      "Declare a custom scalar, such as `scalar DateTime`"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A search can return a User or a Post, which share no fields. Which type fits best?",
    "topic": "The type system & scalars",
    "choices": [
      "An interface with no fields",
      "A union",
      "An enum of type names",
      "An input type with both"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can't an object type such as `User` be used as the type of a field argument?",
    "topic": "The type system & scalars",
    "choices": [
      "Arguments must use input types; object types are output-only",
      "Object types can be used, but only on mutation fields",
      "Arguments must be enums so they can be validated early",
      "Arguments can only be scalars, never structured values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an interface give you in a GraphQL schema?",
    "topic": "The type system & scalars",
    "choices": [
      "A way to reuse a selection set across many queries",
      "Fields shared by several object types that implement it",
      "A default resolver used for every field of the type",
      "A type that can be used as both input and output"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use variables instead of building a query string with values pasted in?",
    "topic": "Variables & aliases",
    "choices": [
      "Variables make the server skip validation for faster runs",
      "Values pasted into the query are ignored by the server",
      "The query text stays static and values are sent separately",
      "Variables are the only way to pass a string argument at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which operation correctly declares and uses a variable?",
    "topic": "Variables & aliases",
    "choices": [
      "query Q($id: ID!) { user(id: $id) { name } }",
      "query Q(id: ID!) { user(id: id) { name } }",
      "query Q($id) { user(id: $id: ID!) { name } }",
      "query Q { user(id: $id) { name } }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In an HTTP request, where are the variable values usually sent?",
    "topic": "Variables & aliases",
    "choices": [
      "In a separate \"variables\" JSON object in the body",
      "Inside the query string, before the operation",
      "In the URL path, after the /graphql endpoint",
      "In custom HTTP headers, one per variable name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A variable is declared `$limit: Int = 20` and the client sends no value. What is used?",
    "topic": "Variables & aliases",
    "choices": [
      "null",
      "0",
      "A validation error",
      "20"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which types can a variable be declared as?",
    "topic": "Variables & aliases",
    "choices": [
      "Input types: scalars, enums and input objects",
      "Any type in the schema, including object types",
      "Only the types of root fields on Query",
      "Only scalars; enums must be written inline"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do aliases let you do?",
    "topic": "Variables & aliases",
    "choices": [
      "Store a query on the server and refer to it by name",
      "Rename a type everywhere in the schema",
      "Call a resolver under another name on the server",
      "Rename a field as it appears in the response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "You need avatar(size: 50) and avatar(size: 300) on the same user in one query. What do you write?",
    "topic": "Variables & aliases",
    "choices": [
      "avatar(size: 50) avatar(size: 300), with no other changes",
      "small: avatar(size: 50) large: avatar(size: 300)",
      "avatar(size: 50) ...avatar(size: 300) using a spread",
      "avatar(size: [50, 300]) to get both sizes in one field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Without aliases, the same field appears twice with different arguments. What happens?",
    "topic": "Variables & aliases",
    "choices": [
      "The second field silently overwrites the first one",
      "Validation fails because the two fields conflict",
      "Both values are returned as a two-item array",
      "The server merges the arguments into one call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A query declares `$id: ID!` but the request sends no value for id. What happens?",
    "topic": "Variables & aliases",
    "choices": [
      "The field is skipped and returns nothing",
      "The resolver runs with id set to \"\"",
      "The resolver runs with id set to null",
      "The request fails with an error before execution"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In the response to `{ boss: user(id: 1) { name } }`, which key holds the result?",
    "topic": "Variables & aliases",
    "choices": [
      "data.user.boss",
      "user_1",
      "boss",
      "user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a valid fragment definition?",
    "topic": "Fragments & directives",
    "choices": [
      "fragment User on UserFields { id name }",
      "fragment UserFields { id name }",
      "fragment UserFields on User { id name }",
      "UserFields: fragment User { id name }"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you include a fragment named UserFields inside a selection set?",
    "topic": "Fragments & directives",
    "choices": [
      "@UserFields",
      "&UserFields",
      "...UserFields",
      "include UserFields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A field returns the union `SearchResult = User | Post`. How do you select Post's title?",
    "topic": "Fragments & directives",
    "choices": [
      "SearchResult.title with a type prefix",
      "title, since union members share fields",
      "@type(Post) { title } on the field",
      "... on Post { title }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main benefit of named fragments in a client codebase?",
    "topic": "Fragments & directives",
    "choices": [
      "Hiding fields from introspection queries",
      "Running each fragment's fields in parallel",
      "Reusing one field selection in many queries",
      "Making the server cache the fragment's result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does `name @include(if: $withName)` do?",
    "topic": "Fragments & directives",
    "choices": [
      "Always selects name and returns $withName next to it",
      "Makes name required when $withName is true",
      "Selects name only when $withName is false",
      "Selects name only when $withName is true at run time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `email @skip(if: true)` do?",
    "topic": "Fragments & directives",
    "choices": [
      "Returns email as null with an error attached",
      "Returns email only after the other fields",
      "Skips email validation but still returns it",
      "Leaves email out"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the built-in @deprecated directive applied?",
    "topic": "Fragments & directives",
    "choices": [
      "On the HTTP request, as a header for the server",
      "In the schema, on definitions such as fields and enum values",
      "On a variable declaration in an operation",
      "In a client query, on the field being requested"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A client selects a field marked @deprecated. What happens?",
    "topic": "Fragments & directives",
    "choices": [
      "The server returns 410 Gone for the request",
      "Validation fails and the query is rejected",
      "It still works; tools such as IDEs just warn about it",
      "The field always returns null from then on"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A fragment is defined in a document but never spread in any operation. What happens?",
    "topic": "Fragments & directives",
    "choices": [
      "Its fields are added to the operation's root",
      "It is ignored and the operation runs normally",
      "It is stored on the server for later queries",
      "The document fails validation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is `__typename` often requested inside a union field?",
    "topic": "Fragments & directives",
    "choices": [
      "It is required or the server refuses union fields",
      "It tells the client which concrete type each item is",
      "It makes the server return all members' fields",
      "It sorts the items in the union by type name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is introspection in GraphQL?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "Querying the schema itself through fields like __schema and __type",
      "Logging every resolver call so you can inspect slow queries later",
      "Compiling the schema into a typed client SDK for a language",
      "Running a query in a sandbox that never touches the real data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which query lists the names of every type in a schema?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "{ schema { allTypes } }",
      "{ __type { list { name } } }",
      "{ __types { name } }",
      "{ __schema { types { name } } }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does an IDE like GraphiQL offer autocomplete for your API?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "It guesses from responses to earlier queries",
      "It runs an introspection query",
      "It downloads a schema file from a public registry",
      "It reads the server's resolver source code over HTTP"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which query asks for the fields of the User type?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "{ __fields(on: \"User\") }",
      "{ __type(name: \"User\") { fields { name } } }",
      "{ User { __fields } }",
      "{ __schema(type: User) { name } }"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do some teams disable introspection on a public production API?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "To avoid handing attackers a complete map of the schema",
      "Because introspection queries change data in the database",
      "Because clients can't send queries while it is enabled",
      "Because the spec forbids introspection outside development"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Introspection is disabled on a server. Does that stop clients from querying fields they already know about?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "No; only queries about the schema itself are refused",
      "No, but every response then comes back without types",
      "Yes; every query is rejected until it is re-enabled",
      "Yes; fields not listed in the introspection cache fail"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a client find out whether a field is deprecated?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "Request the field with @deprecated and read the error",
      "Look for a Deprecated: true header on the response",
      "Read isDeprecated and deprecationReason via introspection",
      "Check whether the field returns null for every request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does selecting `__typename` on an object return?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "The name of the resolver that produced it",
      "The object's concrete type name",
      "The type of the parent field that holds it",
      "The database table the object came from"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a tool like GraphiQL or GraphQL Playground, where do you enter values for $variables?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "In the schema docs panel, next to each field",
      "In the URL bar, as query string parameters",
      "In a separate variables pane, as JSON",
      "Directly in the query, replacing each $name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Codegen tools generate TypeScript types for your queries. What do they usually read to know the API's types?",
    "topic": "Introspection & the GraphQL Playground",
    "choices": [
      "Comments written above each query in the client code",
      "The server's database migrations and table definitions",
      "Sample responses recorded from the running API",
      "Mutations change data; queries are expected to only read"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the convention for which operation type changes data?",
    "topic": "Mutations vs queries",
    "choices": [
      "Mutations read data; queries are used for writes",
      "One after the other, strictly in the order they are written",
      "Queries can change data if they use variables",
      "Both may change data; the type is only a label"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A request contains two top-level mutation fields. How does the server execute them?",
    "topic": "Mutations vs queries",
    "choices": [
      "In a random order chosen by the server",
      "Only the first; the second is ignored",
      "One after the other, in the order written",
      "In parallel, like top-level query fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are the top-level fields of a query allowed to execute?",
    "topic": "Mutations vs queries",
    "choices": [
      "In alphabetical order of their field names",
      "Strictly one after another, in written order",
      "Only one per request; others are rejected",
      "The client gets the new state back without a second request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do mutations usually return the changed object, as in `createPost(...) { id title }`?",
    "topic": "Mutations vs queries",
    "choices": [
      "The spec requires mutations to return a non-null object",
      "Mutations without a return type can't be called from clients",
      "Returning the object makes the mutation run in a transaction",
      "One input object argument, like input: CreateUserInput!"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is the conventional way to pass several fields to a createUser mutation?",
    "topic": "Mutations vs queries",
    "choices": [
      "A User object type as the argument, so it matches the output",
      "A single input object argument, such as input: CreateUserInput!",
      "A list of key/value pairs, one item per field of the user",
      "A JSON string argument that the resolver parses into fields"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which keyword declares a type used only as an argument to mutations or fields?",
    "topic": "Mutations vs queries",
    "choices": [
      "argument",
      "params",
      "input",
      "type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which operation is written correctly?",
    "topic": "Mutations vs queries",
    "choices": [
      "mutation { likePost(id: \"9\") { likes } }",
      "query mutation { likePost(id: \"9\") }",
      "mutation likePost(id: \"9\") { likes }",
      "{ mutation likePost(id: \"9\") { likes } }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a mutation operation use variables and fragments the way queries do?",
    "topic": "Mutations vs queries",
    "choices": [
      "Yes, both work the same way",
      "No; mutation arguments must be literal values",
      "Fragments yes; variables are only allowed in queries",
      "Variables yes; fragments are only allowed in queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A team adds a query field `deleteUser(id: ID!)` that deletes a user. What is the main problem?",
    "topic": "Mutations vs queries",
    "choices": [
      "The delete will run twice because queries always execute twice",
      "The schema will fail validation because the name starts with delete",
      "Clients and tools expect queries to be safe to repeat and retry",
      "Query fields cannot take an ID! argument, so it will not compile"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which root type must every GraphQL schema define?",
    "topic": "Mutations vs queries",
    "choices": [
      "Mutation",
      "Subscription",
      "Query",
      "Schema"
    ],
    "answerIdx": 2
  }
]
```

LAYER: graphql-dev-3

```json
[
  {
    "stem": "In SDL, which field definition says that every User always has an email?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "email: !String",
      "email: String!",
      "email: String?",
      "email: String"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An output field `bio: String!` is changed to `bio: String`. Why can this break existing clients?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "The server starts refusing old queries that still ask for the bio field",
      "Nullable fields have to be requested with an explicit @include",
      "Clients that assumed a value is always present may now receive null",
      "Changing nullability renames the field in introspection results"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An output field changes from `avatarUrl: String` to `avatarUrl: String!`. For existing clients this is:",
    "topic": "Object types, fields & nullability",
    "choices": [
      "Safe, since they already handle null and now never receive it",
      "Breaking, since every client query must now add a ! after the field name",
      "Safe only if every client re-runs codegen before the deploy",
      "Breaking, since the field's type name changes in the schema"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do many teams keep most fields that come from other services nullable?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "Non-null fields cannot have resolvers that return a promise",
      "One failing field then nulls only itself, not its whole parent",
      "Nullable fields can be cached by clients, while non-null fields never are",
      "Nullable fields are resolved faster by every GraphQL server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which type should a field holding a stable unique identifier for an object normally use?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "Int!",
      "Key!",
      "ID!",
      "String"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you attach documentation to a type or field in SDL so it shows up in tools?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "A # comment placed at the end of the field line",
      "A string or \"\"\" block just above the definition",
      "An @doc(text: \"...\") directive on the definition",
      "A separate docs field added to the object type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does `extend type Query { posts: [Post!]! }` do?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "Adds the posts field to an existing Query type",
      "Creates a subtype of Query that inherits all fields",
      "Declares posts as an optional field for clients to add",
      "Replaces the Query type with one that has only posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A field returns a user's posts and a user may have none. Which type is the usual choice?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "[Post!]",
      "[Post!]!",
      "Post!",
      "[Post]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the conventional naming style for GraphQL object types and fields?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "UPPER_CASE types, camelCase fields",
      "PascalCase types, camelCase fields",
      "snake_case types and fields alike",
      "camelCase types, PascalCase fields"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a schema model the domain rather than mirror database tables one to one?",
    "topic": "Object types, fields & nullability",
    "choices": [
      "GraphQL servers cannot read from more than one table per type",
      "Mirrored tables make every query fail the introspection validation step",
      "Clients can't send queries to types that map to real tables",
      "The schema is a public contract and should outlive storage changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which SDL correctly defines an enum?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "scalar Role { ADMIN EDITOR VIEWER }",
      "enum Role = ADMIN | EDITOR | VIEWER",
      "type Role enum { ADMIN, EDITOR }",
      "enum Role { ADMIN EDITOR VIEWER }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A server adds a new value to an enum used in output fields. What risk does this carry for clients?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "Every existing query using the enum fails validation at once",
      "Clients must request the enum with a new alias to see values",
      "Old values get renumbered, so any enum values clients stored become wrong",
      "Clients with exhaustive switches may hit a value they don't handle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which SDL makes User implement two interfaces?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "type User implements Node & Timestamped { ... }",
      "type User extends Node, Timestamped { ... }",
      "type User : Node, Timestamped { ... }",
      "type User implements [Node, Timestamped] { ... }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A type implements an interface but leaves out one of the interface's fields. What happens?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "Clients see the field but can never select it",
      "The missing field resolves to null automatically",
      "The schema fails validation",
      "The field is inherited with the interface's resolver"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is an interface a better fit than a union?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "When the types share fields clients want to query directly",
      "When the member types have no fields in common at all",
      "When there are more than two possible types to return",
      "When the result must also be usable as an input argument on mutations"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a valid union definition?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "union Media = Photo & Video",
      "union Media implements Photo, Video",
      "union Media = Photo | Video",
      "union Media { Photo, Video }"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a union include scalar types, as in `union Value = String | Int`?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "Yes, any type can be a union member",
      "No, union members must be object types",
      "No, unions can only hold two interfaces",
      "Yes, but only built-in scalar types"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A mutation can fail in expected ways, such as a taken email. What does a result union like `CreateUserResult = User | EmailTaken` give clients?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "Automatic retries for every case that is not a User",
      "A guarantee that the mutation never adds anything at all to the errors array",
      "Faster execution because unions skip the validation step",
      "Typed, queryable failure cases instead of parsing error strings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Many schemas define `interface Node { id: ID! }` with a `node(id: ID!): Node` query. What is it for?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "Refetching any object by a globally unique ID",
      "Making all types share one database table",
      "Letting clients create new objects of any type through a single field",
      "Listing every object type the schema has"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the server know which concrete type an interface or union value is?",
    "topic": "Enums, interfaces & unions",
    "choices": [
      "It always uses the first member type that is listed",
      "The database driver adds a type tag to every row",
      "A type resolver, such as __resolveType, picks it",
      "The client sends the type name with the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which SDL defines an input type?",
    "topic": "Input types & arguments",
    "choices": [
      "type NewPost input { title: String! }",
      "input NewPost { title: String! body: String }",
      "args NewPost { title: String! body: String }",
      "input NewPost = { title: String! }"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these can be the type of a field inside an input type?",
    "topic": "Input types & arguments",
    "choices": [
      "A union type, such as SearchResult",
      "Another input type, such as AddressInput",
      "An object type, such as User",
      "An interface type, such as Node"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Adding a new required argument to an existing field is:",
    "topic": "Input types & arguments",
    "choices": [
      "Safe, if the argument's type is a built-in scalar",
      "Safe, since it defaults to null for old queries",
      "Breaking, since existing queries don't pass it",
      "Breaking only for mutations, never for query fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Adding a new optional argument with a default value to an existing field is:",
    "topic": "Input types & arguments",
    "choices": [
      "Breaking unless the field is also marked deprecated",
      "Breaking for every client that queries the field",
      "Non-breaking",
      "Only allowed on fields of the Mutation type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do many teams give each mutation its own input type, like `UpdatePostInput`?",
    "topic": "Input types & arguments",
    "choices": [
      "Shared input types make the server run mutations in parallel",
      "Input types are the only way a mutation can receive a string",
      "Mutations are only allowed to take a single argument according to the spec itself",
      "Fields can be added to it later without changing the mutation's signature"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An UpdatePostInput has `title: String`. How can a client tell 'leave title unchanged' apart from 'clear title'?",
    "topic": "Input types & arguments",
    "choices": [
      "There is no way; omitted and null always mean the same",
      "Send an empty string to leave it unchanged on the server",
      "Omit the field to leave it; send null to clear it",
      "Send the title with @skip to leave it unchanged on save"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A list field takes `filter: PostFilter` with fields like `authorId` and `tag`. Why an input type instead of many top-level arguments?",
    "topic": "Input types & arguments",
    "choices": [
      "Top-level arguments are limited to three per field by the spec",
      "Filters group cleanly and can grow without crowding the field",
      "Only input types can be passed as variables from a client",
      "Input types are applied by the database, not by the resolver"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which argument definition gives `limit` a default of 20?",
    "topic": "Input types & arguments",
    "choices": [
      "posts(limit: Int @default(20)): [Post!]!",
      "posts(limit: Int! default 20): [Post!]!",
      "posts(limit = 20: Int): [Post!]!",
      "posts(limit: Int = 20): [Post!]!"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can the same input type be used for both a create and an update mutation without trouble?",
    "topic": "Input types & arguments",
    "choices": [
      "Yes, the spec makes every input field optional automatically for update mutations",
      "No, an input type may only be used by a single mutation",
      "Often not, since create needs required fields that update shouldn't",
      "Yes, but only when every field in it is of an enum type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can an input type refer to itself, as in `input CategoryInput { children: [CategoryInput!] }`?",
    "topic": "Input types & arguments",
    "choices": [
      "Only when declared with extend input",
      "Yes, through a nullable or list field",
      "Yes, but only through a non-null field",
      "No, input types can never be recursive"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem does offset pagination (`skip: 40, take: 20`) have when new rows are inserted between page loads?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "The database rejects the second query as stale",
      "The total count becomes negative for that client",
      "Each page always returns the first 20 items again",
      "Items can be skipped or shown twice"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In cursor-based pagination, what does a cursor represent?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "An opaque marker for a position in the list",
      "A server-side handle to an open DB cursor",
      "The page number the client is currently on",
      "The total number of items in the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a Relay-style connection, which arguments fetch the next 10 items after a given cursor?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "last: 10, after: $cursor",
      "first: 10, after: $cursor",
      "limit: 10, offset: $cursor",
      "first: 10, before: $cursor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a connection type, where does the item itself live?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "edges { item { node } }",
      "pageInfo { items }",
      "nodes { edge }",
      "edges { node }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which pageInfo fields tell a client whether to load more and where to continue?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "hasMore and pageNumber",
      "isLastPage and nextPage",
      "hasNextPage and endCursor",
      "totalCount and lastOffset"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should clients treat cursors as opaque strings?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "Because decoding a cursor on the client is forbidden by the GraphQL specification",
      "So the server can change how cursors are encoded without breaking clients",
      "Because cursors are encrypted with the user's password by the server",
      "Because cursors change on every request even for the same position"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the edge type in a connection, beyond holding the node?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "It lets the server skip resolvers for nodes on later pages",
      "It holds the database query that was used to load the page",
      "It stores a second copy of the node so that the client can cache it twice over",
      "It can carry data about the relationship, such as a cursor or role"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do servers usually cap the `first` argument, for example at 100?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "The spec limits list fields to 100 items",
      "Clients cannot parse more than 100 items",
      "Cursors cannot encode positions above 100",
      "To stop one query asking for a huge page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is cursor pagination usually faster than large offsets on big tables?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "The database seeks to a key instead of counting past skipped rows",
      "Cursor queries always return fewer columns than offset ones",
      "Cursors are kept in server memory, so no database query is needed for the page",
      "Offset queries cannot use any index at all on any database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a common way to build a cursor for a feed ordered by creation time?",
    "topic": "Pagination patterns — cursors & connections",
    "choices": [
      "Use the total count of items at query time",
      "Encode the item's createdAt and id, often base64",
      "Use the page number multiplied by the page size",
      "Use a random UUID generated on every request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does schema-first development mean?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "You write client queries, then infer the schema",
      "You design the database, then derive the schema",
      "You write resolvers, then generate SDL from them",
      "You write the SDL, then resolvers that match it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does code-first development mean?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "The client code is written first and the server copies its query types",
      "Resolvers are written first and the schema is left without any types",
      "The SDL file is written first and all of the server code is then generated from it by a CLI",
      "The schema is built from code, such as classes or builder calls, and SDL is generated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a common advantage of code-first libraries such as Pothos or Nexus?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "They remove the need for resolvers on every field of the schema",
      "Schema and resolver types come from one source, so they can't drift",
      "They skip schema validation, so servers start up noticeably faster",
      "They let clients send SQL directly instead of GraphQL queries"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is a common advantage of schema-first?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "The SDL is a readable contract to review",
      "No resolver code is needed at all",
      "Resolvers are generated automatically from it",
      "It runs queries faster than code-first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a schema-first project, what keeps resolver code in sync with the SDL at compile time?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "Writing the SDL inside a JSON config file",
      "Marking every field with @deprecated first",
      "Running an introspection query in production",
      "Generating TypeScript resolver types from the SDL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does the choice between schema-first and code-first change what clients see?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "Yes, schema-first APIs do not support fragments",
      "Yes, code-first schemas cannot be introspected",
      "No, but code-first APIs need a different endpoint",
      "No, clients see the same schema either way"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A team picks schema-first and writes the SDL with frontend developers before coding. What is this approach often called?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "Design-first, or contract-first",
      "Resolver-first development",
      "Database-first development",
      "Client-generated schemas"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a schema-first setup, a resolver is defined for `Query.feed` but the SDL has no feed field. What do tools like graphql-tools do by default?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "Ignore the resolver without any warning",
      "Expose feed only through introspection",
      "Throw an error when building the schema",
      "Add feed to the schema automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might a code-first schema still be committed to the repository as a generated SDL file?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "So schema changes show up in code review diffs",
      "Because code-first servers can't introspect",
      "Because clients download it from the repository",
      "Because the server reads only the SDL at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about mixing approaches is accurate?",
    "topic": "Schema-first vs code-first",
    "choices": [
      "Either way the result is a standard GraphQL schema",
      "Schema-first schemas must be written in JSON format",
      "A server must pick one and can never mix approaches",
      "Code-first schemas only work with Apollo Server 2"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does GraphQL usually evolve an API instead of releasing /v2?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Rename types with a version suffix on each release",
      "Add new fields and deprecate old ones on the same schema",
      "Add a version argument to every field in the schema",
      "Run a second schema at /graphql/v2 for every change made"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which SDL marks a field as deprecated with a reason?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "name: String @deprecated(reason: \"Use fullName.\")",
      "name: String deprecated(\"Use fullName.\")",
      "@deprecated name: String (\"Use fullName.\")",
      "name: String # @deprecated Use fullName."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Before removing a deprecated field, what should a team check?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "That the field's resolver is the slowest in the schema",
      "That the field has been renamed in the database first",
      "Field usage data showing clients no longer request it",
      "That the deprecation reason is longer than one sentence"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is versionless evolution easier in GraphQL than in REST?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "The GraphQL spec forbids removing any field once it has been published",
      "GraphQL clients download new schemas automatically before each request",
      "Clients name every field they use, so new fields never change old responses",
      "GraphQL servers keep a copy of every old schema version and replay it on demand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which schema change is breaking for existing clients?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Renaming a field",
      "Adding a field",
      "Adding a type",
      "Deprecating a field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A field `price: Float` should become a richer type. What is the safe path?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Change price to Money in place, since clients pick fields",
      "Remove price at once and ask clients to switch over",
      "Add a version argument to price that switches its type",
      "Add `priceV2: Money`, deprecate price, remove it once unused"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a deprecated field still be resolved and returned?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Yes, it works normally until it is removed",
      "Only for clients that have introspection on",
      "Only if the client sends an override flag",
      "No, deprecated fields always return null"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do schema checks in CI typically do before a change ships?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Strip deprecated fields out of the schema automatically",
      "Run every resolver with random inputs to catch crashes",
      "Compare against the old schema and flag breaking changes",
      "Rewrite client queries so they match the new schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Changing an enum argument value from `LATEST` to `NEWEST` is:",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Breaking only if the enum is also used in output",
      "Safe, since the server maps old names on its own",
      "Breaking, since old queries still send LATEST",
      "Safe, since enums are matched case-insensitively"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do clients and IDEs see a field's deprecation reason?",
    "topic": "Versionless evolution & deprecation",
    "choices": [
      "Through introspection: isDeprecated and deprecationReason",
      "In the errors array, each time the field is requested",
      "Only in the server logs, which clients cannot read",
      "In a Warning header that is added to every response"
    ],
    "answerIdx": 0
  }
]
```

LAYER: graphql-dev-4

```json
[
  {
    "stem": "In what order does a GraphQL.js resolver receive its four arguments?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "args, parent, info, context",
      "req, res, args, next",
      "context, args, parent, info",
      "parent, args, context, info"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In the resolver for `Post.author`, what is the first argument?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "The arguments passed to the author field",
      "The Author object from the last request",
      "The full query document that the client sent in the request",
      "The Post object returned by the parent resolver"
    ],
    "answerIdx": 3
  },
  {
    "stem": "For `user(id: \"7\")`, how does the resolver read the id?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "From context.params.id on the request",
      "From args.id",
      "From info.variables.id only",
      "From parent.id, set by the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is in the info argument?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "The raw HTTP request and response objects from the underlying web framework",
      "Details about the execution, such as fieldName, path and the schema",
      "Only the variables the client sent with the operation, as JSON",
      "The logged-in user and the database connection for this request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the parent argument for a resolver on a root field like `Query.me`?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "The result of the previous query in time",
      "The HTTP request that carried the query",
      "The server's root value, often undefined",
      "The Query type definition from the schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A resolver needs the logged-in user. Which argument should normally provide it?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "context",
      "args",
      "parent",
      "info.rootValue"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What may a resolver return?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "Only a promise, even for values already known",
      "Only a plain value; promises are not allowed",
      "Only a JSON string that the server will parse",
      "A value, or a promise that resolves to one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do some resolvers read info to see which sub-fields were selected?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "Because the server will not call child resolvers without it",
      "To fetch only the columns or joins the query actually needs",
      "To change the selected fields before the response is sent",
      "Because args does not include the arguments for nested fields"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Given `resolvers = { Query: { post: (_, { id }) => db.post(id) } }`, what does the underscore stand for?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "The info object",
      "The context object",
      "The resolver's return value",
      "The unused parent argument"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An argument has a default in SDL: `posts(limit: Int = 10)`. A query omits limit. What does args contain?",
    "topic": "Resolver signature — parent, args, context, info",
    "choices": [
      "{ limit: 10 }",
      "{ limit: undefined }",
      "{}",
      "{ limit: null }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "For `{ user(id: 1) { posts { title } } }`, in what order are resolvers called?",
    "topic": "The resolver execution chain",
    "choices": [
      "All three resolvers at the same time, then the results are merged",
      "Post.title for all posts first, then User.posts, then Query.user",
      "Query.user only; the nested fields are read straight from the database",
      "Query.user, then User.posts, then Post.title for each post"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A field returns a list of 50 posts and the query selects `author` on each. How many times does the Post.author resolver run?",
    "topic": "The resolver execution chain",
    "choices": [
      "Once per distinct author among the posts",
      "Not at all unless author has arguments",
      "50 times, once per post",
      "Once, with all 50 posts as one array"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A parent resolver returns a promise. When do its child field resolvers run?",
    "topic": "The resolver execution chain",
    "choices": [
      "Only if the promise resolves within one second",
      "Before the parent, so it can use their values",
      "After the promise resolves",
      "At the same time as the parent, in parallel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Fetching 20 posts and then running one author query per post is known as:",
    "topic": "The resolver execution chain",
    "choices": [
      "Resolver shadowing",
      "A cache stampede",
      "The N+1 problem",
      "Over-fetching"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does DataLoader reduce N+1 queries?",
    "topic": "The resolver execution chain",
    "choices": [
      "It runs every resolver on its own thread to finish them faster",
      "It caches every query result on disk across server restarts",
      "It rewrites each client query so that fewer fields are requested from the server",
      "It collects keys requested in the same tick and loads them in one batch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Two sibling fields, `me` and `notifications`, are on Query. How may GraphQL.js run their resolvers?",
    "topic": "The resolver execution chain",
    "choices": [
      "Strictly in order; notifications waits until me has resolved",
      "In alphabetical order of field name, so me always finishes before notifications",
      "Concurrently; it does not wait for one before starting the other",
      "Only one of them; a query may resolve only one root field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A resolver for a list field returns null. What happens to the child resolvers for that list?",
    "topic": "The resolver execution chain",
    "choices": [
      "They run once with a null parent",
      "They run with an empty object",
      "They run, but their results are dropped",
      "They do not run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does a child resolver get the data its parent loaded?",
    "topic": "The resolver execution chain",
    "choices": [
      "From its first argument, the parent's result",
      "From args, which the parent fills in",
      "From info.cache, which is set on each level",
      "From a global variable set by the parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can deeply nested queries like `user { friends { friends { friends { name } } } }` be dangerous?",
    "topic": "The resolver execution chain",
    "choices": [
      "GraphQL rejects any query nested more than three levels by spec",
      "Nested fields are resolved twice, so results can be inconsistent",
      "Resolver calls multiply at each level and can overload the server",
      "Each level opens a new HTTP connection to the GraphQL server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which defence limits how expensive a single query can be?",
    "topic": "The resolver execution chain",
    "choices": [
      "Using only one resolver per type",
      "Disabling all nullable fields",
      "Query depth or complexity limits",
      "Making every field return a promise"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How often is the context object usually created?",
    "topic": "Building & sharing context",
    "choices": [
      "Once per request",
      "Once per logged-in user",
      "Once per resolver call",
      "Once when the server starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should DataLoader instances be created inside the per-request context, not at module level?",
    "topic": "Building & sharing context",
    "choices": [
      "Because context is the only place where promises can be awaited",
      "So cached results never leak between users or go stale across requests",
      "Because module-level loaders are not allowed to batch any keys",
      "Because DataLoader cannot be imported at the top level of an ES module file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the usual place to read an auth token and look up the current user?",
    "topic": "Building & sharing context",
    "choices": [
      "In the schema, as a default argument value",
      "In the client, which then sends the user object",
      "In every resolver, by parsing the query text",
      "In the context function, from the request headers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "The context function finds no auth token on a request. What is a common choice?",
    "topic": "Building & sharing context",
    "choices": [
      "Set user to null and let resolvers that need auth reject",
      "Create a guest user and save it to the database",
      "Throw at once so even public fields can't be queried",
      "Pick the most recent user from the last request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Two resolvers in the same operation both read context.user. What do they see?",
    "topic": "Building & sharing context",
    "choices": [
      "The same object",
      "Two separate copies made per resolver",
      "A frozen copy that cannot be read at all",
      "A user only in the first resolver to run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What kinds of things commonly go on context?",
    "topic": "Building & sharing context",
    "choices": [
      "The current user, data sources and per-request loaders",
      "A list of every query this user has ever sent",
      "The response body that will be sent at the end",
      "The schema's type definitions together with the full resolver map"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not store the current user in a module-level variable set at the start of each request?",
    "topic": "Building & sharing context",
    "choices": [
      "Resolvers are not allowed to read module scope",
      "GraphQL servers reload and clear all modules after every single query",
      "Concurrent requests would overwrite each other's user",
      "Module variables can't hold objects in Node.js"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A resolver mutates context, e.g. `context.cache = {}`. Who sees the change?",
    "topic": "Building & sharing context",
    "choices": [
      "Every request currently on the server",
      "Other resolvers in the same request",
      "Only resolvers on the same type as it",
      "No one; context is copied per resolver"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is passing data sources through context better than importing a database client directly in every resolver file?",
    "topic": "Building & sharing context",
    "choices": [
      "Context makes every database query run inside a single transaction",
      "Imported database clients cannot be used inside an async function",
      "GraphQL servers block resolvers that import any npm modules at all",
      "Tests can pass in fakes, and per-request setup lives in one place"
    ],
    "answerIdx": 3
  },
  {
    "stem": "The context function is async and awaits a user lookup. When do resolvers start?",
    "topic": "Building & sharing context",
    "choices": [
      "After the context promise resolves",
      "Only if the lookup takes under 1 s",
      "After the first resolver finishes",
      "Immediately, with a context promise"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A field `title` on Post has no resolver defined. What does GraphQL.js do?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "Asks the database for a column named title",
      "Refuses to start the server until one is added",
      "Uses the default resolver, which reads parent.title",
      "Returns null and adds a 'missing resolver' error to the response"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The parent object has `fullName() { return ... }` as a method. A query selects fullName with no resolver defined. What happens?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "The field resolves to null because functions aren't data",
      "Validation fails because no resolver is defined for it",
      "The default resolver calls the method and uses its result",
      "The function's source code is returned as the field value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The database returns `created_at`, but the schema field is `createdAt`. With no resolver, what comes back?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "null, because parent.createdAt is undefined",
      "The current time, as a default for the date",
      "The created_at value, matched by fuzzy name",
      "An error saying the column was not found"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the simplest fix when a column name differs from the field name, like created_at vs createdAt?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "Rename the field in every client query instead",
      "Add @alias(\"created_at\") to the field in SDL",
      "Mark the field nullable so the value comes through",
      "Add a small resolver: createdAt: (p) => p.created_at"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a 'trivial' resolver?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "One that only returns a property of the parent",
      "One whose field is never selected by clients",
      "One that resolves a root field on the Query type",
      "One that has no arguments and no return type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do most schemas leave scalar fields without explicit resolvers?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "Clients resolve scalar fields themselves after fetching",
      "Explicit resolvers make the field non-nullable",
      "The default resolver already reads them from the parent",
      "Scalar fields are never allowed to have a resolver"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A root resolver returns a user row that includes a passwordHash column. The schema's User type has no passwordHash field. Can a client get it?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "No, only fields in the schema can be selected",
      "Yes, every property on the parent is returned",
      "Yes, by selecting it with an alias in the query",
      "Only through introspection of the User object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A default resolver reads a property whose value is a promise. What happens?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "The field returns an empty object",
      "The promise is awaited like any resolver result",
      "Validation fails for the whole query and nothing is returned",
      "The promise is converted to a string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A parent resolver already joins and returns the author object inside each post. What does Post.author need?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "A resolver that loads the author again by id",
      "Nothing; the default resolver returns post.author",
      "A DataLoader, or the field will always be null",
      "An @join directive to tell GraphQL the relation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can you replace the default resolver for every field in a schema?",
    "topic": "Default resolvers & trivial fields",
    "choices": [
      "Yes, GraphQL.js accepts a custom fieldResolver at execution",
      "Only by writing an explicit resolver for every field",
      "No, the default resolver is fixed by the GraphQL spec",
      "Only for root fields; nested fields always use the default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A resolver for a nullable field throws an error. What does the response contain?",
    "topic": "Error handling in resolvers",
    "choices": [
      "null for that field, plus an entry in errors with its path",
      "The previous cached value for the field, with a warning",
      "No data at all, and a single top-level error message",
      "An HTTP 500 with the stack trace as the response body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the path in an error entry tell the client?",
    "topic": "Error handling in resolvers",
    "choices": [
      "The file and line of the resolver that threw",
      "The URL the request was sent to on the server",
      "The order in which the resolvers were called",
      "Which field in the response the error belongs to"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a resolver attach a machine-readable error code?",
    "topic": "Error handling in resolvers",
    "choices": [
      "Set context.status = 404 before returning from the resolver",
      "Throw a GraphQLError with extensions: { code: \"NOT_FOUND\" }",
      "Throw a plain string \"NOT_FOUND\" so the server can parse it",
      "Return an object like { error: \"NOT_FOUND\" } from the resolver"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should unexpected errors, like a database failure, be masked before reaching clients?",
    "topic": "Error handling in resolvers",
    "choices": [
      "Masked errors make the server retry the failed resolver for free",
      "The GraphQL spec forbids error messages that contain any numbers",
      "Raw messages can leak internals such as SQL or hostnames",
      "Clients cannot display error messages longer than 100 characters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A mutation resolver throws after half of its database writes have succeeded. What does GraphQL itself do about those writes?",
    "topic": "Error handling in resolvers",
    "choices": [
      "Retries the resolver until every write has succeeded",
      "Nothing; rolling back is up to your code, e.g. a transaction",
      "Rolls the writes back automatically, because the field has failed",
      "Marks the written rows as invalid inside the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is modelling an error as data, such as a result union, better than throwing?",
    "topic": "Error handling in resolvers",
    "choices": [
      "For bugs that should never happen, like a null pointer in a resolver",
      "Never; throwing is the only correct way to report any error at all",
      "For expected outcomes the client must handle, like validation failures",
      "For database outages, so the client can retry inside the same query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A resolver throws for one of 10 items in a list of nullable objects. What do the other 9 items do?",
    "topic": "Error handling in resolvers",
    "choices": [
      "They still resolve normally",
      "They are resolved a second time",
      "They are dropped from the list",
      "They are all replaced with null"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An unauthenticated user calls a field that requires login. Which error code is the common convention?",
    "topic": "Error handling in resolvers",
    "choices": [
      "BAD_USER_INPUT",
      "NOT_FOUND",
      "UNAUTHENTICATED",
      "INTERNAL_SERVER_ERROR"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should a resolver error be logged with full details such as the stack trace?",
    "topic": "Error handling in resolvers",
    "choices": [
      "Nowhere, because GraphQL errors already carry their path",
      "On the server",
      "In the response to the client, for debugging in production",
      "In the client's console, where users can report it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A resolver returns an Error object instead of throwing it. What does GraphQL.js do?",
    "topic": "Error handling in resolvers",
    "choices": [
      "Serializes it as a regular object",
      "Crashes the whole server process",
      "Ignores it and returns undefined",
      "Treats it the same as a thrown error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Posts store authorId. How does `Post.author` typically resolve the author?",
    "topic": "Resolving nested & related data",
    "choices": [
      "It fetches every user and picks the first with a matching name",
      "It loads the user by parent.authorId, often through a DataLoader",
      "It reads args.authorId, which the client always has to supply",
      "It reads context.user, since the author is the current viewer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A DataLoader batch function receives keys [3, 1, 3]. What must it return?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Results sorted by id, with duplicates removed",
      "One result per key, in the same order as the keys",
      "Only the results that were found in the database",
      "A map from each key to its result, in any order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A batch function loads users with `WHERE id IN (...)`, but the database returns rows in a different order. What must you do?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Reorder the rows to match the keys before returning",
      "Sort the keys first so they match the database order",
      "Return the rows as-is and let the resolvers sort them",
      "Nothing; DataLoader matches rows by their id field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not always join every related table in the root resolver?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Joins make the result fail type checking",
      "SQL joins are not allowed inside resolvers",
      "Child resolvers ignore data from parents",
      "It loads data the query may not ask for"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A user has thousands of followers. How should a `User.followers` field usually be exposed?",
    "topic": "Resolving nested & related data",
    "choices": [
      "As a plain list returning every follower in one response",
      "As a count only, so clients can never see the followers",
      "As a JSON string so the client can parse it on its own",
      "As a paginated connection with first and after arguments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Post.comments needs a query per post. Which loader key makes sense for batching?",
    "topic": "Resolving nested & related data",
    "choices": [
      "The query string, so equal queries share a result",
      "The post id, returning an array of comments per id",
      "The user id of whoever is making the request now",
      "The comment id, since comments are what is loaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Within one request, `loader.load(5)` is called twice. How many times does user 5 appear in the batch?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Zero; repeated keys are dropped altogether",
      "Once; the second call reuses the cached promise",
      "Twice; each call adds the key to the batch a second time",
      "Once per resolver that was waiting on it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An author is updated inside a mutation, and later in the same request the author is loaded again. What should you do with the loader?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Nothing; DataLoader watches the database and refreshes on its own",
      "Wait one tick, because DataLoader caches only for a single tick",
      "Create a new GraphQL server so the cache is rebuilt from scratch",
      "Clear or prime that key so the stale cached value is not returned"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Data for `Product.reviews` lives in a separate REST service. Where is the natural place to call it?",
    "topic": "Resolving nested & related data",
    "choices": [
      "In the context function for every request",
      "In the schema's SDL using a URL directive",
      "In the Product.reviews resolver",
      "In the client, after the query returns"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A nested resolver needs a value from two levels up, such as the user's locale when resolving a post's comments. What is a clean option?",
    "topic": "Resolving nested & related data",
    "choices": [
      "Add locale as a field on every type",
      "Put request-wide data like locale on context",
      "Read it from info.parentParent",
      "Store it in a module-level global variable for the duration of the request"
    ],
    "answerIdx": 1
  }
]
```

LAYER: graphql-dev-5

```json
[
  {
    "stem": "What does startStandaloneServer do?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "Compiles the schema into a static file that a CDN can serve to clients",
      "Starts Apollo inside the browser so queries can run without a backend",
      "Launches a second server process that only answers introspection queries",
      "Starts an HTTP server with Apollo wired in, with no framework setup needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When mounting Apollo Server on Express with its middleware, what must you do before applying the middleware?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "await server.start()",
      "nothing; the middleware starts the server",
      "call app.listen() to open the port first",
      "call server.listen() on port 4000"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why would you mount Apollo Server on Express instead of using the standalone server?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "To serve other routes and middleware, such as webhooks or health checks, from the same app",
      "Because the standalone server is only meant for tests and refuses to run in production",
      "Because the standalone server cannot execute mutations at all, only queries and introspection",
      "Because Express makes GraphQL resolvers run on several threads at once automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In an Express setup, what must run on the /graphql route before Apollo's middleware so it can read the request body?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "Nothing; Express parses every JSON body by itself",
      "A JSON body parser, such as express.json()",
      "A static file middleware such as express.static()",
      "A cookie parser, since queries are sent in cookies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ApolloServerPluginDrainHttpServer help with?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "Clearing the DataLoader cache between every request",
      "Removing unused types from the schema at startup",
      "Limiting the number of requests per second per user",
      "Finishing in-flight requests before shutdown"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an Apollo Server integration?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "A plugin that merges several separate GraphQL schemas into a single supergraph",
      "A package that connects Apollo Server to a specific framework or runtime",
      "A hosted copy of your server that Apollo runs on its own cloud",
      "A client library that connects frontends to an Apollo endpoint"
    ],
    "answerIdx": 1
  },
  {
    "stem": "With the Express middleware, where do you build the per-request context?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "In the ApolloServer constructor, as a fixed object for all requests",
      "In app.locals, which Apollo copies into every resolver's info argument",
      "In a resolver on Query, which then stores the user in a global variable",
      "In the middleware's context option, e.g. async ({ req }) => ({ user })"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A browser-style POST with Content-Type: text/plain and no special headers is rejected by Apollo Server. Which built-in feature caused this?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "Query depth limits",
      "CSRF prevention",
      "Rate limiting",
      "Introspection blocking"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which two options does the ApolloServer constructor most commonly receive for a schema-first setup?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "sdl and fieldMap",
      "schemaFile and handlers",
      "types and controllers",
      "typeDefs and resolvers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can Apollo Server run in a serverless function such as AWS Lambda?",
    "topic": "Apollo Server setup & integrations",
    "choices": [
      "Yes, through an integration that turns it into a handler",
      "Only if every resolver is moved into its own function",
      "Only for queries; mutations need a dedicated server",
      "No, it needs a long-running process that keeps an open port at all times"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are resolvers organized in the object passed to ApolloServer?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "As an array in the order fields appear in SDL",
      "Keyed by field name, in one flat object",
      "Keyed by type name, then by field name",
      "Keyed by the HTTP path of each operation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The resolvers object defines `Query.feeed` (typo), but the schema has `feed`. What happens?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "The server starts, and feeed is added to the schema as a new field",
      "feed resolves with the typo'd resolver because names are fuzzy-matched",
      "The server starts, and feed silently uses a default resolver instead",
      "Startup fails with an error that Query.feeed is not in the schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Your schema is split across several files. How do you usually combine them for ApolloServer?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Import each file into the client and merge there",
      "Pass arrays of typeDefs and merge the resolver maps",
      "Start one ApolloServer per file on separate ports",
      "Concatenate the files into one resolver function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you implement a custom scalar such as DateTime in the resolver map?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Map DateTime to a GraphQLScalarType with serialize and parse functions",
      "Add a DateTime field resolver to every type that uses a date",
      "Declare DateTime in SDL only; Apollo converts dates on its own",
      "Add a DateTime resolver on the Query type that always returns the current date"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you tell Apollo which concrete type a union value is?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "A type argument added to each field that returns the union type",
      "A __resolveType function on the union in the resolver map",
      "A __typename column that must exist in every table",
      "An @type directive placed on each union member type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The schema has `enum Role { ADMIN USER }`, but the database stores \"admin\" and \"user\". How do you map them?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Rename the enum values in the SDL to lowercase strings to match the database",
      "Change the field type from Role to String instead",
      "Add Role: { ADMIN: \"admin\", USER: \"user\" } to the resolvers",
      "Add @map(\"admin\") next to each enum value in SDL"
    ],
    "answerIdx": 2
  },
  {
    "stem": "You built a schema with a code-first library. How do you give it to ApolloServer?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Print it to SDL and pass resolvers: {}",
      "Pass it as typeDefs with resolvers: null",
      "Code-first schemas can't be used with Apollo",
      "Pass it as the schema option"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the `#graphql` comment at the start of a typeDefs template string do?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Tells Apollo to parse the string at build time",
      "Marks the string as the root schema for Apollo",
      "Turns on validation of the SDL inside the string",
      "Lets editors highlight the string as GraphQL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A client sends a query that fails validation, such as an unknown field. What does Apollo Server do?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "Returns HTTP 200 with an empty data object and no errors array at all",
      "Returns an error with code GRAPHQL_VALIDATION_FAILED and runs no resolvers",
      "Runs every resolver it can and returns null only for the unknown field, with a warning",
      "Logs the problem and retries the query without the unknown field in it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do the typeDefs passed to ApolloServer typically come from in a schema-first project?",
    "topic": "Wiring schema + resolvers",
    "choices": [
      "The client's query documents",
      "SDL strings or .graphql files",
      "Resolver function names",
      "A JSON dump of the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool is commonly used to generate TypeScript types from a GraphQL schema?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "tsc --graphql",
      "GraphQL Code Generator",
      "ts-node --schema",
      "eslint-plugin-graphql"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the typescript-resolvers plugin generate?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "A runtime validator that type-checks every incoming query",
      "A client SDK with one function for each query in the schema",
      "A Resolvers type that checks resolver arguments and return types",
      "Resolver implementations that read from the database directly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The User type's parent object in your code is a UserModel with extra fields. Which codegen option tells resolver types to use it?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "overrides",
      "aliases",
      "mappers",
      "scalars"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do generated resolver types learn the shape of your context object?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "By inferring it from the first request the server receives at runtime",
      "By reading the context function at runtime",
      "Through the contextType option in the codegen config",
      "They can't; context is always typed as any"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A nullable schema field `bio: String` becomes what in the generated TypeScript type?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "any, because nullability can't be typed",
      "Maybe<string>, which allows null",
      "string, since TypeScript has no null",
      "string | undefined but never null at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main benefit of generating types instead of writing them by hand?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "Generated types make resolvers run faster at runtime",
      "Generated types remove the need for any tests",
      "They can't drift from the schema",
      "Hand-written types are not allowed by TypeScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can GraphQL Code Generator read the schema from?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "Only from a running endpoint",
      "Only from the database schema",
      "Only from compiled JavaScript output of the server build",
      "SDL files or a running endpoint via introspection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A developer renames a field in the SDL but forgets to rerun codegen. How can CI catch it?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "Run codegen in CI and fail if generated files change",
      "Run the server in CI and only check that it starts up on port 4000",
      "Compare package-lock.json with the last release",
      "Lint the SDL file for trailing whitespace only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "For `user(id: ID!): User`, what kind of generated type describes the resolver's args?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "QueryUserArgs, with id: string",
      "UserArgs, with id: ID as a class",
      "QueryArgs, shared by every field",
      "UserInput, with id: number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does client-side codegen (such as the client preset) give a frontend?",
    "topic": "TypeScript types from schema (codegen)",
    "choices": [
      "Typed results and variables for each query document",
      "A copy of the server's resolvers running in the browser",
      "A schema that the client can change and push back",
      "Automatic retries for every query that returns errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you register a plugin with Apollo Server?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "Add it to the resolvers map under Plugins",
      "Call app.use(plugin) on the Express app",
      "Export it from a file named apollo.plugins.js",
      "Add it to the plugins array in the constructor"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which plugin hook is called once at the start of each GraphQL request and can return per-request hooks?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "operationBegin",
      "contextCreated",
      "requestDidStart",
      "serverWillStart"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook runs once at startup, before the server begins handling requests?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "serverWillStart",
      "executionDidStart",
      "requestDidStart",
      "willSendResponse"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A plugin must reject operations that have no operation name. Which request hook is the earliest place where the parsed operation is known?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "serverWillStart",
      "willSendResponse",
      "didEncounterErrors",
      "didResolveOperation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A plugin needs to add a response header to every GraphQL response. Which hook fits?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "didResolveSource",
      "parsingDidStart",
      "willSendResponse",
      "serverWillStart"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A plugin should log every error any operation produces. Which hook is designed for this?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "validationDidStart",
      "willSendResponse only",
      "didEncounterErrors",
      "serverWillStop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a plugin time each individual field resolver?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "Return willResolveField from executionDidStart",
      "Wrap the whole server in a setInterval timer",
      "Read info.duration inside each resolver call",
      "Set timing: true on the ApolloServer options"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In what order do these request hooks run?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "didResolveOperation, executionDidStart, willSendResponse",
      "willSendResponse, didResolveOperation, executionDidStart",
      "didResolveOperation, willSendResponse, executionDidStart",
      "executionDidStart, didResolveOperation, willSendResponse"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What decides what a browser sees when it opens the GraphQL endpoint with a GET request?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "A static index.html in the project root",
      "The landing page plugin that is active",
      "The first resolver in the Query type",
      "The client's Accept-Language header"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a plugin for cross-cutting work like timing instead of adding code to every resolver?",
    "topic": "Plugins & request lifecycle",
    "choices": [
      "Resolvers are not allowed to call Date.now() or measure time",
      "Code in resolvers is removed when NODE_ENV is set to production",
      "One plugin covers every operation without touching resolver code",
      "Plugins run on a separate thread so they never slow requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which ApolloServer option lets you change or mask errors before they are sent to clients?",
    "topic": "Error formatting & logging",
    "choices": [
      "errorHandler",
      "formatError",
      "maskErrors",
      "onError"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A resolver throws a plain Error('db timeout'). What code does Apollo Server put in extensions by default?",
    "topic": "Error formatting & logging",
    "choices": [
      "RESOLVER_ERROR",
      "DB_TIMEOUT",
      "INTERNAL_SERVER_ERROR",
      "UNKNOWN"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does Apollo Server include stack traces in error responses by default?",
    "topic": "Error formatting & logging",
    "choices": [
      "Always, in every environment",
      "Only for errors from mutations",
      "Never, unless a plugin adds them",
      "Unless NODE_ENV is production or test"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A client sends a variable of the wrong type, such as a string for an Int!. Which error code does Apollo return?",
    "topic": "Error formatting & logging",
    "choices": [
      "UNAUTHENTICATED",
      "BAD_USER_INPUT",
      "GRAPHQL_PARSE_FAILED",
      "INTERNAL_SERVER_ERROR"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A client sends `{ user(id: 1) { name }` with a missing brace. Which code does Apollo return?",
    "topic": "Error formatting & logging",
    "choices": [
      "OPERATION_RESOLUTION_FAILURE",
      "BAD_USER_INPUT",
      "GRAPHQL_VALIDATION_FAILED",
      "GRAPHQL_PARSE_FAILED"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a resolver make Apollo Server send a specific HTTP status, such as 401, with its error?",
    "topic": "Error formatting & logging",
    "choices": [
      "Set extensions.http.status on the GraphQLError it throws",
      "Return { status: 401 } as the field's resolved value",
      "Add @status(401) to the field definition in the SDL",
      "Call res.status(401) on the Express response object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In formatError, you want to check whether the original error was your own NotFoundError class. What should you use?",
    "topic": "Error formatting & logging",
    "choices": [
      "formattedError.extensions.className",
      "error.message.includes(\"NotFound\") only",
      "unwrapResolverError(error), then instanceof",
      "error.originalClass from the context"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send Apollo Server's own log output to a logger like pino?",
    "topic": "Error formatting & logging",
    "choices": [
      "Pass it as the logger option",
      "Set APOLLO_LOGGER=pino in the env",
      "Add it to the resolvers object",
      "Replace console.log globally"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which information is most useful to log alongside a resolver error?",
    "topic": "Error formatting & logging",
    "choices": [
      "The client's full query history for the day",
      "The complete response body sent to the client",
      "The values of every environment variable set",
      "Operation name, error path and a request id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A formatError hook replaces every INTERNAL_SERVER_ERROR message with \"Internal error\". What is the main goal?",
    "topic": "Error formatting & logging",
    "choices": [
      "Make error responses smaller so they load faster",
      "Stop the errors from being logged on the server",
      "Make the client automatically retry the request",
      "Keep internal details out of client responses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Apollo Sandbox?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "A test runner that executes resolver unit tests in an isolated container",
      "A browser IDE for writing and running operations against a GraphQL endpoint",
      "A security mode that runs every resolver in a restricted Node.js context",
      "A mock server that returns fake data shaped like your production schema"
    ],
    "answerIdx": 1
  },
  {
    "stem": "With NODE_ENV=production and default settings, what does Apollo Server do about introspection?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Rate-limits it to 1 per minute",
      "Disables it",
      "Enables it for every client",
      "Enables it only over GET"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Sandbox fail to show docs for a production server with default settings?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Introspection is off, so Sandbox can't load the schema",
      "Sandbox needs a paid plan to read any schema at all",
      "Sandbox only connects to servers that run on localhost",
      "Production servers reject every request from a browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Your API requires a bearer token. How do you test it in Sandbox?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Send the token as a field argument on Query",
      "Add an Authorization header in Sandbox's headers panel",
      "Put the token inside the query document as a comment line at the top",
      "Sandbox cannot send requests that need auth"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a schema registry, such as the one in Apollo GraphOS?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "A package registry, like npm, for sharing GraphQL resolvers",
      "A database table where the server stores client query results",
      "A service storing each published schema version and its history",
      "A DNS record that tells clients where the GraphQL API lives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which CLI publishes a schema to Apollo GraphOS?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Rover",
      "npm publish --schema",
      "apollo-cli push",
      "graphql-publish"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can a registry's schema check do that a plain diff of two SDL files cannot?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Tell whether a change breaks operations clients actually sent recently",
      "Remove deprecated fields from the schema automatically",
      "Rewrite the clients' query documents so they keep working with the new schema",
      "Run resolvers against production data before deploying"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which environment variables connect Apollo Server to GraphOS for usage reporting?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "GRAPHQL_KEY and SCHEMA_ID",
      "APOLLO_API_TOKEN and APOLLO_SERVER_URL",
      "APOLLO_SECRET and APOLLO_ID",
      "APOLLO_KEY and APOLLO_GRAPH_REF"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does field usage data from a registry help with deprecations?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "It renames deprecated fields so clients get a clear error",
      "It removes deprecated fields once no one has logged in",
      "It shows when no client still requests the deprecated field",
      "It sends an email to each client using a deprecated field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Does using Apollo Sandbox require an Apollo account?",
    "topic": "Apollo Sandbox & schema registry",
    "choices": [
      "Yes, always",
      "Only on localhost",
      "No",
      "Only for queries"
    ],
    "answerIdx": 2
  }
]
```

LAYER: graphql-dev-6

```json
[
  {
    "stem": "In schema.prisma, which block describes a database table?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "table",
      "datasource",
      "model",
      "entity"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which pair of fields correctly defines that a Post belongs to a User in Prisma?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "author User @link(\"users.id\") and authorId set as a @default(0) Int",
      "author Int @relation(User.id), with no other field needed on the Post",
      "author User @relation(fields: [authorId], references: [id]) and authorId Int",
      "author User @foreignKey(authorId) and a separate authorId String @unique @default(0)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does `prisma generate` do?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Creates and applies a migration to the database",
      "Builds the typed Prisma Client from the schema",
      "Reads the database and writes a GraphQL schema",
      "Fills the database with seed data from a script"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which query returns a user together with all of their posts?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "prisma.user.findUnique({ where: { id }, join: \"posts\" })",
      "prisma.user.findUnique({ id, relations: [\"posts\"] })",
      "prisma.user.findUnique({ where: { id }, include: { posts: true } })",
      "prisma.user.findUnique({ where: { id } }).with(\"posts\")"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does findUnique return when no row matches?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "An empty object {}",
      "It throws a NotFoundError",
      "undefined, with a logged warning",
      "null"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a Node app create one PrismaClient instance and reuse it, rather than one per request?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "A new client per request forgets the schema and fails all its queries",
      "Each instance has its own connection pool",
      "Reusing the client turns on query caching, which is required to work",
      "PrismaClient refuses to run more than one query at a time per process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between `select` and `include` in a Prisma query?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "select runs on the database; include loads the related rows in client memory",
      "select works only on scalar fields; include works only on the model's id field",
      "select filters rows by a condition; include filters the columns that come back",
      "select picks fields; include adds relations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you mark the email field of a User model as unique in Prisma?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "email Unique<String>",
      "email String @index",
      "email String @unique",
      "email String @key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a one-to-many relation between User and Post, which side stores the foreign key column?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "User, as an array of post ids",
      "Both sides, each with an id column, so the relation is two-way",
      "A separate join table, always",
      "Post, through a scalar authorId field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A User is created with nested `posts: { create: [...] }`. How are the writes executed?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Posts first, then the user, without a transaction",
      "As separate writes that can partly fail",
      "Only the user is written; posts are ignored",
      "Together in one transaction"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a resolver usually get access to the Prisma client?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Through args, sent by the client",
      "Through info.schema.prisma",
      "By creating a new PrismaClient inside each resolver call",
      "Through context, e.g. context.prisma"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why map database rows to schema types in a service layer instead of returning Prisma models straight from every resolver?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Service layers make Prisma queries run inside a worker thread pool",
      "The GraphQL contract can then change apart from the database layout",
      "Returning Prisma models directly makes GraphQL skip all default resolvers",
      "Prisma models cannot be returned from a resolver function at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A Query.posts resolver calls `prisma.post.findMany()` with no arguments on a table of 2 million rows. What is the main risk?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Prisma returns only the first 100 rows anyway",
      "It loads every row; it needs take/cursor limits",
      "findMany fails on tables above one million rows",
      "GraphQL truncates the list to the requested size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A resolver builds a raw SQL query by concatenating the user's search text. What is the safer approach with Prisma?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Escape the quotes in the search text with a regular expression before running it",
      "Use $queryRawUnsafe, which validates the SQL against the schema first",
      "Run the SQL through GraphQL validation before sending it to the database",
      "Use the query API or the tagged $queryRaw template, which parameterizes values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A Relay connection resolver for `posts(first, after)` uses Prisma. Which Prisma options map to it most directly?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "take, cursor and skip",
      "first and page",
      "limit and offset",
      "top and startAt"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why ask Prisma for `take: first + 1` rows when serving a page of size first?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "It warms the cache for the following page load",
      "Cursors need one extra row before they can be encoded at all",
      "The extra row shows whether hasNextPage is true",
      "Prisma always drops the last row it returns"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should a check like 'only the author may edit this post' live?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "In the resolver or service, before the update",
      "In the Prisma schema, as an @owner attribute on the authorId field",
      "In the client, which hides the edit button",
      "In the database seed script for the posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Prisma throws error code P2002 when creating a user. What usually happened?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "The migration history does not match the database",
      "The database connection pool was full and timed out",
      "A unique constraint was violated, such as a duplicate email",
      "A required relation field was missing from the input"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a resolver respond to a Prisma unique-constraint error on signup?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Return null for the user and add no error to the response",
      "Return the raw Prisma error message and code to the client",
      "Retry the same insert until it eventually succeeds",
      "Turn it into a clear user-facing error, like 'email taken'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A field `User.postCount` is needed in a list of 50 users. Which approach avoids loading every post?",
    "topic": "Connecting resolvers to the database",
    "choices": [
      "Add postCount to the SDL and let the default resolver work",
      "Load all posts for each user and return their length",
      "Use a count query, such as _count, batched per request",
      "Store the count in the client and send it as an argument"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A query lists 100 posts with their author, and Post.author runs one SQL query per post. How many queries run in total?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "200",
      "2",
      "100",
      "101"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is N+1 especially common in GraphQL compared with a hand-written REST handler?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "GraphQL servers turn off all database connection pooling by default",
      "GraphQL clients send a separate HTTP request for every nested object",
      "Each field resolves on its own, unaware of sibling objects in the list",
      "The GraphQL spec requires one database query for every field it resolves"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a quick way to spot N+1 queries during development?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "Check that response JSON is under 1 MB in size",
      "Turn on query logging and count queries per request",
      "Count how many resolvers in the code return promises instead of values",
      "Look for fields that are nullable in the schema"
    ],
    "answerIdx": 1
  },
  {
    "stem": "With a DataLoader for authors, how many queries does the 100-posts-with-author query need?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "100, because DataLoader only caches repeated keys",
      "2: one for posts, one batched query for authors",
      "1, since DataLoader joins posts and authors itself",
      "101, but they run in parallel so it is fine"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Prisma has built-in batching for one kind of call made in the same tick. Which?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "findUnique",
      "updateMany",
      "$queryRaw",
      "findMany"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why doesn't joining authors in the root Query.posts resolver fully solve N+1 in GraphQL?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "The default resolver ignores any data that the parent resolver has already loaded",
      "Joins can only be used in mutations, never in query resolvers in GraphQL",
      "SQL joins are slower than N separate queries on every database engine",
      "Other paths to Post.author, like nested lists, still hit the per-post resolver"
    ],
    "answerIdx": 3
  },
  {
    "stem": "N+1 appears two levels deep: users, then posts, then comments. Without batching, how does the query count grow?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "It stays the same as one level deep",
      "It only grows with the number of users",
      "It multiplies with each nested list level",
      "It drops because rows are cached per level"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is N+1 still a concern if each query is fast, say 1 ms?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "Only if the database is on the same machine",
      "Yes, round trips and pool use add up as lists grow",
      "No, Node.js merges small queries into one batch",
      "No, fast queries make N+1 harmless at any scale or list size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which field is most likely to cause N+1 if written naively?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "Post.author, loaded by authorId",
      "Query.me, loaded once per request",
      "Post.title, read from the parent row",
      "Query.post, loaded by a single id"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a query cost or depth limit replace fixing N+1?",
    "topic": "The N+1 problem in GraphQL",
    "choices": [
      "Yes; once depth is limited N+1 can no longer happen",
      "Yes; cost limits make the server batch queries for you",
      "No; depth limits make N+1 worse by adding queries",
      "No; it caps abuse but doesn't remove per-item queries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A DataLoader batch function gets keys [1, 2, 3] but user 2 doesn't exist. What should it return?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "[user1, null, user3]",
      "It must throw for the whole batch",
      "[user1, user3]",
      "[user1, user3, null]"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which DataLoader method loads several keys at once and returns their results in order?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "batch",
      "loadAll",
      "loadMany",
      "fetchMany"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After a resolver fetches a user by email, how can it seed the by-id loader so a later load(id) skips the database?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "loader.cache = { [user.id]: user }",
      "loader.prime(user.id, user)",
      "loader.set(user.id) with no value",
      "loader.load(user.id, user)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Keys are objects like { id: 1, lang: \"en\" }. Why might two equal objects miss the cache?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "The batch function is called once per object key",
      "DataLoader does not accept objects as keys at all",
      "Object keys are cached only when they are frozen",
      "The cache compares keys by reference; set a cacheKeyFn"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the maxBatchSize option do?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "Limits how many results the loader keeps in its in-memory cache at once",
      "Splits large batches so no single query receives too many keys",
      "Sets how many requests can share one loader at the same time",
      "Caps the number of times load() may be called per request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does DataLoader call the batch function by default?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "Right away, on every single call to load()",
      "After the current tick",
      "Every 100 ms, on a timer set by the loader",
      "When the HTTP response is about to be sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "You need posts by author id for many authors. What should the batch function return for each author key?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "An array of that author's posts, empty if none",
      "All posts for all authors, once per author key",
      "A count of posts, since arrays cannot be cached",
      "The first post for that author, or null if none"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the DataLoader cache best described as?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "A shared Redis cache for all requests",
      "A disk cache that survives a restart",
      "A per-request memo of load promises",
      "A replacement for HTTP caching headers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you create a loader with `{ cache: false }`?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "When you want batching but values may change during the request",
      "When the loader is shared between every request on the server",
      "When the batch function returns results in a different key order",
      "When the keys are numbers rather than strings or plain objects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is a good place to create all of a request's loaders?",
    "topic": "Batching & caching with DataLoader",
    "choices": [
      "In a factory called from the context function",
      "In each resolver, right before calling load()",
      "At module level, once when the server starts",
      "In the client, sent along with each request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command creates a new migration from schema changes and applies it in development?",
    "topic": "Migrations & seeding",
    "choices": [
      "prisma db seed",
      "prisma migrate deploy",
      "prisma migrate dev",
      "prisma generate"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command should a production deploy run to apply pending migrations?",
    "topic": "Migrations & seeding",
    "choices": [
      "prisma migrate dev",
      "prisma db push --force",
      "prisma migrate deploy",
      "prisma migrate reset"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is `prisma db push` mainly meant for?",
    "topic": "Migrations & seeding",
    "choices": [
      "Prototyping without migration files",
      "Pushing the local database contents up to a remote server as a backup",
      "Production deploys, since it records each change in the migration history",
      "Publishing the Prisma schema to a registry so clients can download it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should the prisma/migrations folder be committed to version control?",
    "topic": "Migrations & seeding",
    "choices": [
      "No, it contains database passwords",
      "Yes, it is the history every environment applies",
      "No, it is regenerated on every install",
      "Only the latest migration needs to be kept"
    ],
    "answerIdx": 1
  },
  {
    "stem": "You add a required column to a table that already has rows. What must the migration handle?",
    "topic": "Migrations & seeding",
    "choices": [
      "A value for existing rows, such as a default",
      "Dropping every existing row before adding it",
      "Nothing; Prisma fills it with random values",
      "Renaming the table so the old rows are kept"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should a seed script use upsert rather than create?",
    "topic": "Migrations & seeding",
    "choices": [
      "Because upsert skips the unique constraints entirely",
      "So the seed runs inside a migration automatically",
      "Because create is not available inside seed scripts",
      "So running it twice doesn't fail or duplicate data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `prisma migrate reset` do?",
    "topic": "Migrations & seeding",
    "choices": [
      "Deletes the migrations folder and keeps the database contents exactly as they are",
      "Marks every migration as applied without running any SQL",
      "Drops the database, reapplies all migrations and runs the seed",
      "Undoes only the last migration and leaves all data in place"
    ],
    "answerIdx": 2
  },
  {
    "stem": "You rename a column in schema.prisma. What might the generated migration do that you should check?",
    "topic": "Migrations & seeding",
    "choices": [
      "Skip the change until the next deploy happens",
      "Rename the GraphQL field to match automatically",
      "Rename it safely in every case with no data loss",
      "Drop the old column and add a new one, losing data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why run migrations as a separate deploy step instead of on every app instance at startup?",
    "topic": "Migrations & seeding",
    "choices": [
      "Migrations run faster in CI because the database is not in use there",
      "Several instances starting at once could race to apply the same migration",
      "Prisma Client cannot connect at all to a database that still has pending migrations",
      "App instances do not have permission to read the migrations folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is seed data typically used for?",
    "topic": "Migrations & seeding",
    "choices": [
      "Giving development and test databases a known starting state",
      "Encrypting the rows that already exist in the database",
      "Generating the GraphQL schema automatically from rows already in the database",
      "Restoring production data after an outage from a backup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Prisma API runs a callback where several queries share one transaction?",
    "topic": "Transactions across resolvers",
    "choices": [
      "prisma.$atomic(() => { ... })",
      "prisma.$transaction(async (tx) => { ... })",
      "prisma.$batch(async (tx) => { ... })",
      "prisma.transaction.begin() and .end()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Inside an interactive transaction callback, which client must the queries use?",
    "topic": "Transactions across resolvers",
    "choices": [
      "context.prisma from the GraphQL request",
      "A new PrismaClient made in the callback",
      "The tx argument passed to the callback",
      "The global prisma client, as usual"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A client sends two top-level mutations, transferOut and transferIn, in one request. Does GraphQL make them atomic?",
    "topic": "Transactions across resolvers",
    "choices": [
      "Yes, as long as they run in order, which they do",
      "Yes; mutations in one request share a transaction",
      "No, but setting @atomic on the operation fixes it",
      "No; each field is separate, so make one transfer mutation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should interactive transactions be kept short?",
    "topic": "Transactions across resolvers",
    "choices": [
      "They hold a database connection and locks until they finish",
      "Each transaction step sends a separate response to the client",
      "Prisma replays long transactions twice to verify the result",
      "Long transactions are not allowed to read data, only write"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A mutation saves an order in a transaction, then publishes an 'order created' event. When should it publish?",
    "topic": "Transactions across resolvers",
    "choices": [
      "Only if the client asks with an argument",
      "Before the transaction starts, to be fast",
      "Inside the transaction, before the commit",
      "After the transaction commits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `prisma.$transaction([a, b])` with an array of queries guarantee?",
    "topic": "Transactions across resolvers",
    "choices": [
      "Only the first query is wrapped in a transaction",
      "They run in order and all roll back if one fails",
      "They run in a random order chosen by the database",
      "They run in parallel and each commits on its own"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Two requests read a stock count of 1 and both decrement it. Which is a reliable fix?",
    "topic": "Transactions across resolvers",
    "choices": [
      "An atomic conditional update, like decrementing only where stock > 0",
      "Reading the count twice in a row before writing it back to the table",
      "Caching the count in a DataLoader so that both requests share it",
      "Running each request's resolver code on a separate Node.js process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is opening one transaction per GraphQL request and passing it through context risky?",
    "topic": "Transactions across resolvers",
    "choices": [
      "Slow or failing fields hold the transaction open for the whole request",
      "Context cannot hold objects that have methods such as a Prisma tx",
      "Transactions can only be used with REST endpoints and never with GraphQL resolvers",
      "GraphQL runs every resolver in a separate process from the context"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a nested create of a user with posts, a post fails a constraint. What happens to the user?",
    "topic": "Transactions across resolvers",
    "choices": [
      "It is rolled back too",
      "It is created once more later",
      "It is kept, marked incomplete",
      "It is kept, without the posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A transfer mutation must avoid two transactions reading the same balance and both writing. What can you set on the Prisma transaction?",
    "topic": "Transactions across resolvers",
    "choices": [
      "A higher maxBatchSize on the DataLoader",
      "A stricter isolationLevel, such as Serializable",
      "A longer cache time on the balance query",
      "The @atomic directive on the mutation field"
    ],
    "answerIdx": 1
  }
]
```

LAYER: graphql-dev-7

```json
[
  {
    "stem": "Which mutation name follows common GraphQL naming conventions?",
    "topic": "Designing mutations & input types",
    "choices": [
      "doPostPublish",
      "PUBLISH_POST",
      "postPublishMutation",
      "publishPost"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are specific mutations like `publishPost` often preferred over a generic `updatePost(input: { status })`?",
    "topic": "Designing mutations & input types",
    "choices": [
      "Generic update mutations are not allowed to take input object types by the spec",
      "Clients cannot select fields on the result of a generic mutation",
      "They express intent, so rules and permissions per action are clearer",
      "Specific mutations run faster because they skip query validation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a mutation payload type, such as `CreatePostPayload`?",
    "topic": "Designing mutations & input types",
    "choices": [
      "The HTTP body format Apollo uses when sending a mutation request",
      "A JSON blob the server stores to replay the mutation if it fails",
      "The input type a mutation takes, holding the values the client sends",
      "An object type returned by a mutation, holding the result and related data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A payload has `post: Post` and `userErrors: [UserError!]!`. What goes in userErrors?",
    "topic": "Designing mutations & input types",
    "choices": [
      "Every warning logged by the server",
      "Server crashes and stack traces",
      "Expected problems, like an empty title",
      "Network failures and timeouts seen by the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why return a payload object instead of the bare Post from createPost?",
    "topic": "Designing mutations & input types",
    "choices": [
      "A bare object type cannot be used as the return type of any mutation field",
      "Payload objects make the mutation run inside a transaction",
      "Clients can only cache the results that come from payloads",
      "Fields can be added to the payload later without breaking clients"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A deletePost mutation succeeds. What is useful to return?",
    "topic": "Designing mutations & input types",
    "choices": [
      "The SQL statement used for the delete",
      "The deleted post's id",
      "Nothing; mutations must not return data",
      "The full list of the remaining posts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Should the server trust an `authorId` field in CreatePostInput to decide who owns the post?",
    "topic": "Designing mutations & input types",
    "choices": [
      "No; take the author from the authenticated user in context",
      "No; the author should be read from the info argument",
      "Yes; input types are validated, so the id is trusted",
      "Yes, if the field is declared as ID! rather than ID"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which mutation signature is the conventional single-input style?",
    "topic": "Designing mutations & input types",
    "choices": [
      "updateProfile(json: String!): Boolean!, with the JSON parsed later",
      "updateProfile(input: UpdateProfileInput!): UpdateProfilePayload!",
      "updateProfile(name, bio, avatar): Profile, with untyped arguments",
      "updateProfile(profile: Profile!): Profile!, reusing the output type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is the clearest way to model 'add a tag to a post'?",
    "topic": "Designing mutations & input types",
    "choices": [
      "updatePost(tags: [all tags])",
      "post(id) { tags { add } }",
      "setPostTags(tags: [String])",
      "addTagToPost(postId, tag)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A mutation changes a post's title and returns `post { id title }`. Why should the selection include id?",
    "topic": "Designing mutations & input types",
    "choices": [
      "Mutations fail if id is not in the selection set",
      "Without id the title is returned as null every time",
      "So normalized client caches can update the stored post",
      "The server only applies the change when id is asked for"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an optimistic response in a GraphQL client like Apollo Client?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "A default result used whenever the mutation returns errors",
      "A predicted result shown at once, then replaced by the real one",
      "A response the server returns when it is too busy to reply",
      "A cached result that the server sends back before it runs the mutation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An optimistic 'like' is shown, then the mutation fails. What does Apollo Client do with the optimistic data?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "Retries until the server agrees",
      "Rolls it back from the cache",
      "Saves it to local storage instead",
      "Keeps it, since the user saw it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which fields must an optimistic response include for Apollo's normalized cache to apply it to the right object?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "The operation name",
      "__typename and id",
      "Only the changed fields",
      "A requestId field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is an optimistic response a poor fit?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "When the mutation changes only one field on one known object",
      "When the server's result is hard to predict, like a computed price",
      "When the mutation returns a small payload with an id field",
      "When the user is on a slow mobile network and waits a lot"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A createPost mutation succeeds, but the post list on screen doesn't show the new post. Why, in Apollo Client?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "The list query was cached on the server and needs a restart",
      "Mutations never write to the cache, so all results must be refetched",
      "The server forgot to send a subscription event for the new post",
      "New items aren't added to cached lists automatically; update or refetch them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a network error and a GraphQL error on the client?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "Network errors mean no GraphQL response arrived; GraphQL errors come in errors",
      "A network error comes from resolvers; GraphQL errors come from the browser itself",
      "Network errors carry partial data; GraphQL errors never include any data at all",
      "They are the same thing; the client gives them two names for historical reasons"
    ],
    "answerIdx": 0
  },
  {
    "stem": "With Apollo Client's errorPolicy: 'all', what does the UI receive when some fields fail?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "Only the errors; the partial data is dropped",
      "A thrown exception from the hook",
      "Only the data; errors are hidden",
      "Both the partial data and the errors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A mutation returns userErrors for an invalid email. How should the UI handle it?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "Retry the mutation automatically until it stops returning errors",
      "Reload the page so the form is reset and the user starts again",
      "Show the message next to the email field and keep the form filled in",
      "Treat it like a network error and show a generic 'something went wrong, try again' page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why disable a submit button while its mutation is in flight?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "Browsers block a second POST to the same URL at once",
      "The client cache is locked while a mutation is running",
      "To prevent double submits",
      "Mutations cancel each other if clicked twice in a row"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After an optimistic update, the server returns a slightly different result. What wins in the cache?",
    "topic": "Optimistic responses & error states",
    "choices": [
      "The server's result",
      "A merge favouring the client",
      "The optimistic result",
      "Whichever has more fields"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which SDL declares a subscription field?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "type Subscription { messageAdded(roomId: ID!): Message! }",
      "type Query { subscribe messageAdded(roomId: ID!): Message! }",
      "type Mutation { messageAdded(roomId: ID!): Stream<Message> }",
      "subscription messageAdded(roomId: ID!): Message! on Query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How many root fields may a single subscription operation select?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "Up to three",
      "Exactly one",
      "At least two",
      "Any number"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The older subscriptions-transport-ws library is unmaintained. What replaced it as the common WebSocket protocol library?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "graphql-ws",
      "socket.io-graphql",
      "ws-subscriptions",
      "graphql-http"
    ],
    "answerIdx": 0
  },
  {
    "stem": "With graphql-ws, how does a client usually send an auth token?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "In the URL path of the subscription",
      "In the connection_init message payload",
      "In a cookie that is set by each event message",
      "As a field argument on every event"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A subscription field's resolver is an object rather than a function. Which key returns the event stream?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "listen",
      "resolveStream",
      "stream",
      "subscribe"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the optional resolve function on a subscription field do?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "Turns each event payload into the field's value",
      "Opens the WebSocket connection for the client",
      "Decides which clients may open a subscription",
      "Closes the stream after the first event arrives"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a server with subscriptions need a separate context setup for the WebSocket side?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "WebSocket operations don't go through the HTTP middleware that builds context",
      "Context objects cannot be shared between queries and mutations at all",
      "The GraphQL spec forbids subscriptions from reading any context data",
      "Subscriptions run on the client, so the server never builds a context"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a subscription a better choice than polling a query?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "When the server runs as stateless functions that can't hold connections",
      "When data changes once a day and clients can wait for the next load",
      "When the result is large and the same for every user on the platform",
      "When updates are frequent and must appear quickly, like chat messages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Besides WebSockets, which transport can deliver GraphQL subscriptions over plain HTTP?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "HTTP/1.0 keep-alive",
      "Server-Sent Events",
      "DNS over HTTPS",
      "Multipart form posts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a subscription server do when the client's auth token expires mid-connection?",
    "topic": "Subscriptions over WebSockets (graphql-ws)",
    "choices": [
      "Close the connection or stop events until the client re-authenticates",
      "Switch the connection to anonymous mode but keep delivering all private events",
      "Send the token back to the client so it can refresh it on its own",
      "Keep sending events, since the token was valid when it connected"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A mutation saves a message and should notify subscribers. What does it call with an in-memory PubSub?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "pubsub.send(message) with no topic, broadcasting to everyone",
      "pubsub.subscribe(\"MESSAGE_ADDED\", message) inside the mutation",
      "pubsub.publish(\"MESSAGE_ADDED\", { messageAdded: message })",
      "context.emit(\"messageAdded\") with the whole schema attached"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The in-memory PubSub from graphql-subscriptions works in development. What breaks when you run three server instances?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "The in-memory PubSub refuses to start when it detects other instances",
      "Each event is delivered three times to every subscriber on the platform",
      "Events published on one instance never reach subscribers on the others",
      "Mutations fail because each instance locks the PubSub for itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a common fix for PubSub across several server instances?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Longer polling intervals on every client",
      "Sticky sessions so all users hit one instance",
      "A DataLoader shared between the instances",
      "A shared broker, such as Redis pub/sub"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Subscribers to messageAdded(roomId) should only receive messages for their room. What does withFilter do?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Removes the fields the subscriber did not select from each event payload it sends",
      "Rejects subscriptions from clients that are not members of the room",
      "Creates one PubSub topic per room automatically on the first publish",
      "Runs a check per event and subscriber to decide whether to deliver it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a topic per room, like `MESSAGE_ADDED.room42`, instead of one global topic plus a filter?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Instances then avoid receiving and filtering every message",
      "Filters are not supported by any PubSub library",
      "Global topics can only carry one message at a time",
      "Clients cannot subscribe to a topic with no dot in it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does a typical pub/sub setup guarantee a subscriber receives events sent while it was disconnected?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Yes; graphql-ws buffers all events on the server for one full hour",
      "No; missed events are lost unless you add replay or refetch on reconnect",
      "Yes; PubSub stores every event until each subscriber has acknowledged receiving it",
      "No, but the client receives an error for every event that it missed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A client reconnects after a network drop. What is a simple way to make sure it hasn't missed updates?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Refetch the relevant query after resubscribing",
      "Wait for the next event and assume nothing changed",
      "Ask the server to replay the full event log",
      "Open a second subscription for missed events"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should a subscription event carry full private data, such as every message in a DM thread, to all subscribers of a topic?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Yes; WebSocket traffic is encrypted end to end",
      "No; events may only carry ids, never any fields",
      "No; check per subscriber that they may see it",
      "Yes; only subscribed clients ever receive events"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where else can PubSub events come from, besides GraphQL mutations?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "Any backend process, like a job or webhook",
      "Only GraphQL mutation resolvers",
      "Only the client's own subscriptions",
      "Only database triggers, never code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a payload like `{ messageAdded: message }` keyed by the field name?",
    "topic": "PubSub & event-driven updates",
    "choices": [
      "WebSocket frames need a top-level key or they are dropped by the browser",
      "The default resolver reads the field's value from the payload by name",
      "The client uses the key to decide which UI component should be updated",
      "PubSub topics must be named after the subscription field to be delivered"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach to file uploads does Apollo recommend for most apps?",
    "topic": "File uploads",
    "choices": [
      "Base64-encode the file into a String argument of a regular mutation",
      "A mutation returns a signed URL; the client uploads straight to storage",
      "Add the file to the query's extensions field as a binary attachment",
      "Send the file in the WebSocket connection_init message payload"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is sending files as base64 strings in GraphQL variables usually a bad idea?",
    "topic": "File uploads",
    "choices": [
      "GraphQL strings cannot contain any of the base64 characters",
      "Base64 strings are rejected by every GraphQL server by default",
      "It inflates size by about a third and buffers it all in memory",
      "Clients cannot encode binary data as base64 in a web browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the GraphQL multipart request spec?",
    "topic": "File uploads",
    "choices": [
      "A convention for sending files with an operation in a multipart request",
      "Part of the official GraphQL specification, required of every server",
      "A protocol for streaming subscription events over a single socket",
      "A way to split one large query into many smaller HTTP requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do servers that accept multipart GraphQL uploads need CSRF protection?",
    "topic": "File uploads",
    "choices": [
      "Uploaded files are run as code by the GraphQL server when received",
      "Multipart bodies cannot include the query, so any query can be sent",
      "Multipart requests disable HTTPS for the rest of the browser session",
      "Multipart forms are 'simple' requests that browsers send without a preflight"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With a signed-URL upload flow, how does the server learn the file has arrived?",
    "topic": "File uploads",
    "choices": [
      "The client sends the file twice to confirm",
      "It never needs to know about the file",
      "The signed URL calls the resolver itself",
      "A follow-up mutation or a storage event"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a signed upload URL expire after a short time?",
    "topic": "File uploads",
    "choices": [
      "Clients cannot cache URLs that have no expiry time set",
      "Storage services reject URLs that last for more than a minute",
      "To limit misuse if it leaks",
      "Long-lived URLs make files upload more slowly over time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the server check before handing out a signed upload URL?",
    "topic": "File uploads",
    "choices": [
      "That the client has already uploaded the file once before",
      "Nothing; storage services check permissions for each object",
      "That the user may upload, plus allowed type and size limits",
      "Only that the file name ends in a common image extension"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a GraphQL type expose an uploaded image to clients?",
    "topic": "File uploads",
    "choices": [
      "As a URL field, e.g. avatarUrl: String",
      "As a base64 String of the image bytes",
      "As a list of Int values for each byte",
      "As an Upload scalar on the output type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not trust the file type the client reports in the upload request?",
    "topic": "File uploads",
    "choices": [
      "GraphQL drops the content type from the request before resolvers run",
      "Browsers always report every file type as application/octet-stream",
      "File types are only reported for files larger than 10 MB in size",
      "It can be faked; check the bytes or let storage enforce the type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A user uploads a file but never calls the confirm mutation. What should happen to the orphaned object?",
    "topic": "File uploads",
    "choices": [
      "It is linked to the user automatically",
      "It stays forever; storage space is free",
      "A cleanup job or lifecycle rule removes it",
      "The GraphQL server deletes it when it shuts down"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A client retries createOrder after a timeout, but the first request had succeeded. What is the risk?",
    "topic": "Idempotency & validation",
    "choices": [
      "Both requests share one order id",
      "The retry is rejected by GraphQL",
      "A duplicate order",
      "The first order is rolled back"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can createOrder be made safe to retry?",
    "topic": "Idempotency & validation",
    "choices": [
      "The client waits five seconds before every retry of the mutation",
      "The server ignores any mutation that arrives within one second of another one",
      "The client sends an idempotency key, stored with a unique constraint",
      "The mutation is changed into a query so it is safe to repeat"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The server receives an idempotency key it has already processed. What should it return?",
    "topic": "Idempotency & validation",
    "choices": [
      "An error saying that the key has already been used",
      "Nothing; the request should be dropped",
      "The original result, without creating anything new",
      "A new result, replacing the earlier one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does GraphQL validation check about an input like `email: String!`?",
    "topic": "Idempotency & validation",
    "choices": [
      "That the email is unique in the database",
      "Only that a non-null string was sent",
      "That the email exists and can get mail",
      "That the string is a well-formed email"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should rules like 'title must be 1–200 characters' be enforced?",
    "topic": "Idempotency & validation",
    "choices": [
      "In the WebSocket layer for every message",
      "Only in the client form before it is sent",
      "In the SDL, using String(1..200) syntax",
      "In the resolver or service layer on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A custom scalar EmailAddress rejects bad values in parseValue. When does a bad email from a variable get caught?",
    "topic": "Idempotency & validation",
    "choices": [
      "Only later, when the value is returned to the client",
      "Never; custom scalars are only for output",
      "After the resolver saves it to the database",
      "Before the resolver runs, during variable coercion"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which error code does Apollo conventionally use for invalid user input found in a resolver?",
    "topic": "Idempotency & validation",
    "choices": [
      "FORBIDDEN",
      "BAD_USER_INPUT",
      "INTERNAL_SERVER_ERROR",
      "GRAPHQL_PARSE_FAILED"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Is a 'setStatus(PUBLISHED)' mutation naturally idempotent?",
    "topic": "Idempotency & validation",
    "choices": [
      "No; GraphQL runs mutations twice to verify them",
      "Yes; setting the same value twice gives the same state",
      "Only if the client also sends an idempotency key",
      "No; every mutation is non-idempotent by definition in the spec"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate on the server even if the client form already validates?",
    "topic": "Idempotency & validation",
    "choices": [
      "Anyone can call the API directly",
      "Browsers turn off form validation on mobile",
      "Client checks are removed in production builds",
      "GraphQL ignores fields that were validated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a mutation like `incrementViews(postId)` unsafe to retry blindly?",
    "topic": "Idempotency & validation",
    "choices": [
      "Each retry adds again, so the count drifts up",
      "GraphQL caches the first result and returns it again",
      "Retries reset the view count to zero on the server",
      "The server rejects any increment after the first one"
    ],
    "answerIdx": 0
  }
]
```
