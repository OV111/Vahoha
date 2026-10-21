LAYER: jamstack-1

JSON
[
  {
    "stem": "What is the primary benefit of using semantic HTML elements like article, section, and nav?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "They provide clear meaning to browsers, assistive technologies, and developers about the structure of content.",
      "They automatically apply responsive CSS grid styling without needing external style sheets.",
      "They convert plain text into interactive JavaScript widgets by default.",
      "They improve search engine ranking by hiding irrelevant keywords from crawlers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "When applying CSS styles, what does the Cascading principle imply about style precedence?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "Styles defined later in the document always override earlier styles regardless of specificity.",
      "Styles are applied based on a combination of origin, specificity, and order of appearance.",
      "Child elements inherit all styles from parent elements unless explicitly reset by the browser.",
      "Inline styles take lower precedence than external stylesheets."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which CSS property is best suited for building flexible, one-dimensional layouts along a single row or column?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "display: grid",
      "float: left",
      "display: flex",
      "position: absolute"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should developers prefer relative font units like rem and em over fixed units like px for typography?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "They load faster because browsers parse relative units natively before rendering pixels.",
      "They disable browser zoom settings to maintain pixel-perfect graphic fidelity.",
      "They force text to wrap correctly inside narrow container elements.",
      "They respect user accessibility preferences and scale gracefully across different screen sizes."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of the CSS box model property value box-sizing: border-box?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "It includes padding and border widths within the element's specified total width and height.",
      "It adds an outer margin box around the border of every block element.",
      "It prevents child elements from overflowing outside the parent container's borders.",
      "It forces all block-level elements to render with a solid border outline."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do CSS pseudo-classes, such as hover or focus, differ from regular class selectors?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "They select elements based on hardcoded attribute values written in the HTML markup.",
      "They target elements based on a specific state or user interaction rather than their static attributes.",
      "They apply styles globally across the entire document instead of scoped elements.",
      "They are executed using JavaScript event listeners behind the scenes."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What role does a CSS reset or normalize stylesheet play in web development?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "It compresses CSS code to reduce file size prior to production deployment.",
      "It converts legacy CSS code into modern flexbox syntax automatically.",
      "It establishes a consistent baseline by ironing out inconsistencies in default browser styling.",
      "It validates CSS stylesheets against W3C standards before compilation."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which HTML tag is specifically designed to contain independent, self-contained content that could be syndicated or distributed independently?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "section",
      "div",
      "aside",
      "article"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When styling web pages for accessibility, what is a key requirement for color contrast between text and background?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "It must meet specific minimum contrast ratio thresholds to ensure readability for users with visual impairments.",
      "It must use monochromatic color palettes to reduce cognitive load on screen readers.",
      "It must invert automatically when a user toggles high contrast device settings.",
      "It must rely strictly on system fonts rather than web-loaded fonts."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does CSS specificity determine which style rule is applied when multiple rules target the same element?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "Rules are evaluated using a point system calculated from IDs, classes, and element types.",
      "The browser randomly selects one rule to prevent rendering deadlocks.",
      "The rule with the shortest selector string takes immediate precedence.",
      "Rules written in external stylesheets always override internal style blocks."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference in scope behavior between let and var in JavaScript?",
    "topic": "JavaScript essentials",
    "choices": [
      "var variables are block-scoped while let variables are globally scoped.",
      "let variables cannot be reassigned after their initial declaration.",
      "let provides block-level scoping, whereas var is function-scoped and subject to hoisting anomalies.",
      "var throws a syntax error if accessed before initialization."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a JavaScript closure allow an inner function to do?",
    "topic": "JavaScript essentials",
    "choices": [
      "Execute asynchronously without blocking the main browser thread.",
      "Bypass CORS restrictions when fetching data from external domains.",
      "Mutate global window objects safely without polluting the namespace.",
      "Retain access to its outer function's scope even after the outer function has finished executing."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which array method should you use to transform every element in an array into a new array of modified values?",
    "topic": "JavaScript essentials",
    "choices": [
      "map()",
      "filter()",
      "reduce()",
      "forEach()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of using async/await syntax when dealing with asynchronous code in JavaScript?",
    "topic": "JavaScript essentials",
    "choices": [
      "It converts synchronous blocking loops into parallel worker threads.",
      "It allows asynchronous code to be written and read in a synchronous, sequential style.",
      "It automatically catches runtime errors without needing try/catch blocks.",
      "It forces the JavaScript engine to compile code to WebAssembly."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does strict equality (===) check in JavaScript that loose equality (==) does not?",
    "topic": "JavaScript essentials",
    "choices": [
      "Whether both operands reference the exact same memory address.",
      "Whether both operands are defined and not null.",
      "Whether both operands share the same value and the same data type without type coercion.",
      "Whether the operands are mutable objects or immutable primitives."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does event bubbling work in the DOM event model?",
    "topic": "JavaScript essentials",
    "choices": [
      "Events travel from the outermost window object down to the specific target element.",
      "Events trigger simultaneously across all sibling elements in the DOM tree.",
      "Events bounce back and forth between the target element and the document root.",
      "An event triggered on a child element propagates upward through its ancestors in the DOM tree."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an arrow function's distinctive behavior regarding the this keyword compared to regular functions?",
    "topic": "JavaScript essentials",
    "choices": [
      "It lexically inherits the this value from its surrounding execution context.",
      "It automatically binds this to the global window object.",
      "It disables the use of this entirely within function bodies.",
      "It creates a dynamic context based on how the function is invoked."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which built-in JavaScript object method is used to parse a JSON string into a JavaScript object?",
    "topic": "JavaScript essentials",
    "choices": [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.eval()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the primary role of a Promise object in JavaScript asynchronous programming?",
    "topic": "JavaScript essentials",
    "choices": [
      "To store persistent user data securely in browser local storage.",
      "To execute heavy computational tasks in a background web worker.",
      "To represent the eventual completion or failure of an asynchronous operation and its resulting value.",
      "To cancel network requests automatically if they take longer than five seconds."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is destructuring assignment commonly used when handling configuration objects or module imports?",
    "topic": "JavaScript essentials",
    "choices": [
      "It encrypts sensitive object properties before they are processed by functions.",
      "It converts objects into immutable data structures automatically.",
      "It compresses the compiled JavaScript bundle size significantly.",
      "It allows you to extract specific properties or variables cleanly into distinct local variables with minimal syntax."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a key architectural characteristic of a traditional dynamic server-rendered website?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "HTML pages are generated on the fly by a server for every incoming request using database queries.",
      "All HTML, CSS, and JavaScript assets are pre-built and served directly from a CDN.",
      "Client-side JavaScript renders all UI components inside the browser after an initial blank page load.",
      "Server processing is completely eliminated in favor of decentralized peer-to-peer nodes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do static site generators handle page generation compared to server-side rendering applications?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "SSGs compile templates and data into static HTML files during a build step, whereas SSR generates HTML per request.",
      "SSGs require an active database connection on the production server.",
      "SSGs rely entirely on client-side JavaScript execution for content rendering.",
      "SSR pre-renders pages globally while SSGs render pages only when requested by search engine bots."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a primary security advantage of a pre-rendered static site over a database-backed dynamic site?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "Static sites prevent users from viewing source code in browser developer tools.",
      "Static sites eliminate the risk of cross-site scripting by stripping out all JavaScript.",
      "With no server-side database or application runtime exposed to the public internet, common attack vectors like SQL injection are eliminated.",
      "Static sites require mandatory multi-factor authentication for every visitor."
    ],
    "answerIdx": 2
  },
  {
    "stem": "In terms of scalability, how do static sites hosted on a CDN behave under sudden traffic spikes?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "They slow down drastically as origin servers struggle to process incoming requests.",
      "They crash frequently because flat files cannot handle concurrent read operations.",
      "They require manual server scaling to provision additional cloud computing instances.",
      "They handle surges effortlessly because cached static files are served directly from edge locations near users."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which scenario makes a dynamic server-rendered architecture more appropriate than a purely static one?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "An application requiring highly personalized, real-time user dashboards that change constantly per second.",
      "A simple corporate marketing brochure site with infrequent text updates.",
      "A personal developer blog with Markdown-based articles.",
      "A documentation site with code snippets and search functionality."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens during the build phase of a static site deployment?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "The production server compiles incoming user requests into cached database entries.",
      "Templates, markdown files, and API data are combined to generate a complete set of static HTML, CSS, and JS assets.",
      "Browser engines execute automated end-to-end tests against live staging URLs.",
      "DNS records are automatically updated to point to the nearest CDN edge node."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does caching differ between static assets and dynamic server responses?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "Dynamic responses can be cached indefinitely, whereas static assets must be revalidated on every request.",
      "Static assets cannot be cached by CDNs because their content changes too frequently.",
      "Static assets can be aggressively cached at the edge for long periods, whereas dynamic responses often require short or no cache durations due to variability.",
      "Dynamic responses use browser memory caching exclusively, while static assets use disk storage only."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a common limitation of relying solely on client-side rendering for a public-facing content site?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "It requires expensive database licensing fees.",
      "It prevents developers from using modern CSS frameworks.",
      "It increases server CPU utilization during peak traffic hours.",
      "Search engine crawlers may struggle to index content that loads asynchronously via JavaScript."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do static sites generally exhibit faster Time to First Byte (TTFB) metrics than dynamic sites?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "Pre-rendered files are served instantly from CDN edge caches without executing server-side code or database queries.",
      "Static sites compress all images into vector graphics automatically.",
      "Browsers skip the HTML parsing phase entirely for static web pages.",
      "Static sites bypass DNS lookup delays through specialized IP routing."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do content updates typically occur in a purely static site versus a dynamic content management system?",
    "topic": "Static versus dynamic sites",
    "choices": [
      "Static sites update instantly in real-time without rebuilding, whereas dynamic systems require a full site rebuild.",
      "Static sites require a full rebuild and redeployment of files to reflect content changes, whereas dynamic systems update database records instantly.",
      "Static sites require manual FTP uploads for every modified sentence.",
      "Dynamic systems store content as flat files on disk, while static systems use relational databases."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do the letters in the acronym JAMstack stand for?",
    "topic": "What JAMstack means",
    "choices": [
      "Java, Angular, MySQL, and Kubernetes",
      "JSON, Apache, Middleware, and Security",
      "JavaScript, APIs, and Markup",
      "Joomla, AJAX, Modules, and Kernel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which architectural shift separates the JAMstack model from traditional monolithic CMS platforms?",
    "topic": "What JAMstack means",
    "choices": [
      "Moving all application business logic exclusively into browser client-side code.",
      "Eliminating the use of frontend frameworks in favor of vanilla web standards.",
      "Tying frontend presentation directly to backend database servers.",
      "Decoupling the frontend presentation layer from backend services and serving pre-rendered markup from a CDN."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What role do APIs play in the JAMstack architectural pattern?",
    "topic": "What JAMstack means",
    "choices": [
      "They handle dynamic functionality, data fetching, and backend services via reusable endpoints since there is no persistent application server.",
      "They replace HTML as the primary markup language for structuring web pages.",
      "They manage the physical hosting infrastructure and server rack configurations.",
      "They compile JavaScript source code into native machine binaries."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is markup handled in a standard JAMstack workflow?",
    "topic": "What JAMstack means",
    "choices": [
      "Markup is generated dynamically on demand by a centralized application server for every visitor.",
      "Markup is pre-rendered during a build process, resulting in ready-to-serve HTML templates.",
      "Markup is synthesized entirely inside the user's browser using local storage data.",
      "Markup is written manually in text files and uploaded via FTP whenever changes occur."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is JavaScript considered a core pillar of the JAMstack architecture?",
    "topic": "What JAMstack means",
    "choices": [
      "It compiles server-side database queries into efficient SQL statements.",
      "It replaces CSS for styling user interface components.",
      "It handles dynamic client-side interactivity, data manipulation, and communication with APIs.",
      "It manages DNS routing tables across global edge servers."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which component replaces the traditional application server in a pure JAMstack deployment?",
    "topic": "What JAMstack means",
    "choices": [
      "A relational database management system running on a dedicated virtual private server.",
      "A PHP-based runtime environment executing inside a container.",
      "An FTP file server managing raw text documents.",
      "A content delivery network (CDN) delivering pre-built assets alongside serverless functions for backend logic."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main advantage of decoupling the frontend presentation layer from the backend logic in JAMstack?",
    "topic": "What JAMstack means",
    "choices": [
      "Teams can work independently on content, design, and APIs, leading to better security, performance, and scalability.",
      "It completely eliminates the need for any version control systems like Git.",
      "It guarantees 100% uptime regardless of third-party API availability.",
      "It reduces the total number of files in the project repository to under ten."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do JAMstack applications handle user authentication and personalized features?",
    "topic": "What JAMstack means",
    "choices": [
      "Through server-side session cookies managed by a dedicated monolithic backend server.",
      "By integrating third-party authentication services and client-side JavaScript or serverless functions to manage tokens.",
      "By storing user passwords in plain text inside public JSON files.",
      "By forcing all users to log in through the CDN provider's master control panel."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What characterizes the build-time process in a modern JAMstack project?",
    "topic": "What JAMstack means",
    "choices": [
      "Users execute build commands locally on their personal laptops whenever they visit the site.",
      "The production server compiles PHP scripts into executable binary modules.",
      "Automated CI/CD pipelines fetch content from headless CMSs and APIs, compile templates, and output static assets.",
      "Browsers download raw source files and compile them into HTML on the fly."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the JAMstack model considered beneficial for developer experience and workflow tooling?",
    "topic": "What JAMstack means",
    "choices": [
      "It forces developers to write all code in a single monolithic file.",
      "It eliminates version control merge conflicts entirely.",
      "It requires zero configuration for database migrations.",
      "It allows developers to use modern component frameworks, Git-based workflows, and automated continuous deployment."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the primary function of a Content Delivery Network (CDN) in web architecture?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "To cache and deliver website assets from servers geographically closer to the end user, reducing latency.",
      "To compile relational database queries into optimized SQL execution plans.",
      "To replace traditional domain name registrars with decentralized ledger nodes.",
      "To execute automated unit tests against frontend components before deployment."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do edge computing capabilities on a CDN differ from traditional origin server processing?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "Edge computing runs code in data centers distributed globally near users, whereas traditional processing happens on a centralized origin server.",
      "Edge computing is restricted to executing static HTML files only.",
      "Traditional servers are faster because they do not require network routing.",
      "Edge computing eliminates the need for JavaScript in web applications."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is cache invalidation, and why is it important when updating static site deployments on a CDN?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "The process of clearing browser history to free up local storage space.",
      "The automatic deletion of old user accounts from the authentication database.",
      "The process of clearing or updating cached assets on CDN edge nodes so users receive the newest version of a site.",
      "The invalidation of SSL certificates when a domain name expires."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does geographic distribution of CDN edge nodes improve user experience across the globe?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "It increases the physical size of server hard drives to store more videos.",
      "It encrypts user data using multiple regional encryption keys simultaneously.",
      "It automatically translates web content into local regional languages.",
      "It minimizes network travel distance, significantly lowering latency and speeding up asset download times."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a cache-control header directive like max-age instruct a CDN or browser to do?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "It specifies the maximum amount of time in seconds that a fetched response can be considered fresh before requiring revalidation.",
      "It sets the maximum age requirement for users visiting the website.",
      "It defines how long the origin server should store error logs.",
      "It restricts access to visitors older than a specific age threshold."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do edge functions running on a CDN differ from centralized serverless functions?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "Edge functions can only return static error pages.",
      "Edge functions execute closer to the user on CDN nodes, reducing latency for tasks like personalization and routing headers.",
      "Centralized serverless functions are executed entirely inside the user's browser.",
      "Edge functions require a dedicated physical server rack in every region."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of implementing SSL/TLS termination at the CDN edge level?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "To permanently block secure HTTPS traffic in favor of faster unencrypted HTTP.",
      "To store user passwords securely in plain text for quick retrieval.",
      "To decrypt incoming secure traffic closer to the user, offloading cryptographic overhead from the origin server.",
      "To prevent search engine crawlers from indexing private staging URLs."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do CDNs use Anycast routing when directing user traffic to the nearest data center?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "It broadcasts data packets to every computer on the internet simultaneously.",
      "It routes traffic through a single bottleneck server to ensure strict security logging.",
      "It encrypts all network packets using random routing paths.",
      "It allows multiple servers worldwide to share the same IP address, so BGP routing naturally steers the user to the closest available node."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a cache miss, and what happens at the CDN layer when one occurs?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "When a requested asset is not found in the CDN edge cache, prompting the CDN to fetch it from the origin server, cache it, and serve it to the user.",
      "When a user enters an incorrect URL and receives a 404 error page.",
      "When the browser fails to connect to the internet due to offline status.",
      "When an SSL certificate fails validation during the handshake."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does asset compression and HTTP/2 or HTTP/3 support at the edge optimize content delivery?",
    "topic": "CDNs and edge delivery",
    "choices": [
      "By converting all raster images into vector PDFs automatically.",
      "By reducing file transfer sizes and enabling multiplexed, parallel streaming over a single TCP or UDP connection.",
      "By eliminating the need for CSS stylesheets entirely.",
      "By forcing browsers to download files sequentially to avoid memory overload."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a primary consideration when consuming a third-party REST API in a frontend JAMstack application?",
    "topic": "Working with third-party APIs",
    "choices": [
      "Ensuring that the API server is hosted on the same physical computer as your static files.",
      "Rewriting the third-party backend codebase into JavaScript.",
      "Managing asynchronous data fetching states (loading, error, success) gracefully in the UI.",
      "Translating all API JSON responses into XML format."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should sensitive API keys or secret tokens be handled when interacting with third-party services from a JAMstack app?",
    "topic": "Working with third-party APIs",
    "choices": [
      "Hardcoded directly into client-side JavaScript components for easy debugging.",
      "Stored in public repository environment configuration files.",
      "Embedded inside HTML meta tags so search engines can verify ownership.",
      "Kept secure on a serverless function or backend proxy, preventing exposure in client-side code."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What mechanism do third-party APIs commonly use to limit the rate of requests from a single client?",
    "topic": "Working with third-party APIs",
    "choices": [
      "Rate limiting and throttling via HTTP response headers like status code 429 and retry-after indicators.",
      "Permanently banning the user's IP address on the first request.",
      "Requiring the client to solve a CAPTCHA for every API call.",
      "Shutting down the API server whenever traffic exceeds normal thresholds."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is error handling crucial when your frontend application relies on external third-party APIs?",
    "topic": "Working with third-party APIs",
    "choices": [
      "External APIs never experience downtime or return malformed data.",
      "External services can fail, time out, or change schemas unexpectedly, so the UI must gracefully handle failures without crashing.",
      "Browsers will crash the entire operating system if an API request fails.",
      "Error handling automatically fixes bugs in the third-party provider's codebase."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is CORS (Cross-Origin Resource Sharing) and how does it affect browser-based API requests?",
    "topic": "Working with third-party APIs",
    "choices": [
      "A security feature implemented by browsers that restricts web pages from making requests to a different domain unless permitted by response headers.",
      "A protocol that accelerates cross-domain image loading on CDNs.",
      "A method for sharing CSS stylesheets across multiple web servers.",
      "A JavaScript library for parsing XML data feeds."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can webhooks serve as a better alternative to traditional API polling for real-time updates?",
    "topic": "Working with third-party APIs",
    "choices": [
      "Webhooks require your application to query the API every second.",
      "Webhooks eliminate the need for any internet connection.",
      "Webhooks encrypt all data payloads automatically using blockchain technology.",
      "Webhooks push event data directly to your server or function when an event occurs, avoiding wasteful periodic polling."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of implementing pagination when fetching large datasets from a third-party API?",
    "topic": "Working with third-party APIs",
    "choices": [
      "To break large datasets into smaller, manageable chunks, reducing payload size, memory usage, and load times.",
      "To combine multiple separate APIs into a single endpoint.",
      "To encrypt sensitive data fields before rendering them in a table.",
      "To convert raw JSON data into printable PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you mock third-party API responses during local development or automated testing?",
    "topic": "Working with third-party APIs",
    "choices": [
      "By disabling your computer's network adapter entirely.",
      "By using tools like MSW (Mock Service Worker) or local stub servers to simulate API responses reliably.",
      "By modifying the third-party provider's production database directly.",
      "By writing all application code inside a single HTML file."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common format for exchanging structured data payloads with modern web APIs?",
    "topic": "Working with third-party APIs",
    "choices": [
      "Microsoft Word binary documents",
      "Compiled Java bytecode",
      "JSON (JavaScript Object Notation)",
      "Plain text comma-separated strings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might you use a serverless function proxy when calling a third-party API from your static frontend?",
    "topic": "Working with third-party APIs",
    "choices": [
      "To bypass browser memory limits when rendering tables.",
      "To convert HTML markup into Markdown format.",
      "To slow down response times for testing purposes.",
      "To hide secret API keys, add custom headers, or bypass restrictive CORS policies."
    ],
    "answerIdx": 3
  }
]
okay can u do all layers?

LAYER: jamstack-2

JSON
[
  {
    "stem": "What is the primary purpose of props in React functional components?",
    "topic": "Components and props",
    "choices": [
      "To pass immutable data and configuration from a parent component down to a child component.",
      "To manage local mutable state that triggers component re-renders when updated.",
      "To store global application cache directly inside the browser's local storage.",
      "To define custom CSS styles scoped exclusively to a single DOM node."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must React props be treated as read-only (immutable) by receiving components?",
    "topic": "Components and props",
    "choices": [
      "Because JavaScript engines throw a syntax error whenever an object property is reassigned.",
      "To maintain React's unidirectional data flow model and prevent unpredictable side effects.",
      "Because props are automatically synchronized with a backend SQL database.",
      "To allow the browser to compile JSX directly into WebAssembly bytecode."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do functional components in React receive props?",
    "topic": "Components and props",
    "choices": [
      "Through a global window object property named ReactProps.",
      "By calling the built-in useProps() hook inside the function body.",
      "As a single argument object passed directly into the component function.",
      "By attaching event listeners to the component's parent DOM element."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a parent component updates and passes new prop values to a child component?",
    "topic": "Components and props",
    "choices": [
      "The child component throws a runtime warning unless it implements a prop-types validator.",
      "The child component ignores the new props until its local state is reset.",
      "The browser reloads the entire HTML document to apply the changes.",
      "The child component re-renders to reflect the updated prop values in the UI."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is JSX in the context of React development?",
    "topic": "Components and props",
    "choices": [
      "A syntax extension for JavaScript that allows you to write HTML-like markup inside JS code.",
      "A template engine that executes entirely on the server before sending HTML to the browser.",
      "A standalone styling language designed to replace CSS in modern web applications.",
      "A built-in database query language used for fetching records from headless CMSs."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you provide a default fallback value for a missing prop in a React functional component?",
    "topic": "Components and props",
    "choices": [
      "By wrapping the component inside a Suspense boundary.",
      "By using ES6 default parameter syntax in the component function signature.",
      "By defining a static defaultProps property on the global React object.",
      "By checking window.localStorage for cached fallback values."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the correct way to pass a click event handler function from a parent to a child component via props?",
    "topic": "Components and props",
    "choices": [
      "Passing the function reference directly as a prop, such as onClick={handleClick}.",
      "Invoking the function immediately inside the JSX attribute like onClick={handleClick()}.",
      "Writing the function name as a string literal like onClick=\"handleClick\".",
      "Declaring the function inside a separate CSS stylesheet."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of the following best describes a React component?",
    "topic": "Components and props",
    "choices": [
      "A persistent database record stored on a remote server.",
      "An asynchronous background worker thread that handles heavy computations.",
      "A self-contained, reusable piece of UI that accepts inputs and returns React elements.",
      "A compiled binary file loaded directly by the browser's JavaScript engine."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it important to keep React components small and focused on a single responsibility?",
    "topic": "Components and props",
    "choices": [
      "It improves code readability, reusability, testability, and maintenance.",
      "It prevents the browser from using hardware acceleration.",
      "It eliminates the need for any state management hooks.",
      "It forces JavaScript compilers to produce smaller bundle sizes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of children as a special prop in React components?",
    "topic": "Components and props",
    "choices": [
      "To pass reference pointers for DOM manipulation.",
      "To store configuration data in JSON format.",
      "To hold asynchronous error messages.",
      "To pass elements or components nested directly inside the opening and closing tags of a parent component."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the primary purpose of the useState hook in React?",
    "topic": "State and hooks",
    "choices": [
      "To manage local component state and trigger re-renders when values change.",
      "To fetch external data from a REST API asynchronously.",
      "To persist data across page refreshes using browser cookies.",
      "To directly manipulate DOM nodes bypassing the virtual DOM."
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you use the useEffect hook in a React functional component?",
    "topic": "State and hooks",
    "choices": [
      "To declare local state variables and initialization functions.",
      "To perform side effects such as data fetching, subscriptions, or manual DOM mutations.",
      "To define inline styles for JSX elements.",
      "To memoize expensive calculations across component re-renders."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What role does the dependency array play in the useEffect hook?",
    "topic": "State and hooks",
    "choices": [
      "It specifies the list of CSS stylesheets required by the component.",
      "It determines how many times the component can re-render per second.",
      "It controls when the effect runs by tracking changes to specified variables.",
      "It exports component state variables to external parent components."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if you omit the dependency array entirely from a useEffect hook call?",
    "topic": "State and hooks",
    "choices": [
      "The effect executes only once when the component first mounts.",
      "The effect never runs under any circumstances.",
      "The effect throws a fatal runtime reference error.",
      "The effect runs after every single render of the component, which can lead to infinite loops."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must you never update state directly inside the main body of a React functional component?",
    "topic": "State and hooks",
    "choices": [
      "It triggers an infinite re-render loop because every state change causes the component to execute again.",
      "It deletes all props passed down from parent components.",
      "It converts the functional component into a legacy class component.",
      "It disables browser garbage collection for local variables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the cleanup function returned inside a useEffect hook?",
    "topic": "State and hooks",
    "choices": [
      "To reset component props to their initial default values.",
      "To clear timers, cancel network requests, or remove event listeners before unmounting or re-running.",
      "To delete temporary build artifacts from the project directory.",
      "To force the browser to clear its memory cache."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does React state updates behave regarding execution timing?",
    "topic": "State and hooks",
    "choices": [
      "State updates are executed synchronously and modify local variables instantly.",
      "State updates are queued and batched asynchronously by React for performance optimization.",
      "State updates require an explicit commit() method call to take effect.",
      "State updates are sent to the server for validation before rendering."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which hook is best suited for sharing stateful logic across multiple components without prop drilling?",
    "topic": "State and hooks",
    "choices": [
      "useEffect",
      "useMemo",
      "useContext",
      "useRef"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the primary use case for the useRef hook in React?",
    "topic": "State and hooks",
    "choices": [
      "To store mutable values that persist across renders without triggering re-renders when updated.",
      "To fetch JSON data from third-party REST APIs.",
      "To handle global routing and URL parameter parsing.",
      "To replace the useState hook for all form inputs."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is functional state updater syntax (e.g., setCount(prev => prev + 1)) recommended when new state depends on old state?",
    "topic": "State and hooks",
    "choices": [
      "It reduces the compiled JavaScript file size.",
      "It prevents race conditions and ensures you work with the most current state value during asynchronous batches.",
      "It automatically disables component re-renders when values remain unchanged.",
      "It allows state variables to be accessed globally across different pages."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you render items from an array dynamically inside JSX?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "By using a standard for loop directly inside the JSX return statement.",
      "By calling the array map() method to transform data items into React elements.",
      "By wrapping the array inside a switch-case statement.",
      "By using the array filter() method combined with HTML template tags."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does React require a unique key prop when rendering lists of elements?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "To encrypt sensitive item data before rendering it in the DOM.",
      "To generate unique CSS class names for each list item.",
      "To help React identify which items have changed, been added, or been removed during reconciliation.",
      "To sort list items alphabetically in the browser."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the recommended practice for choosing a key value when rendering a dynamic list?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "Using the item's stable, unique identifier from your data source, such as a database ID.",
      "Using the current loop index generated by the map() method.",
      "Generating a random Math.random() number on every render.",
      "Using the string literal 'item' for every element."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which JavaScript operator is commonly used for inline conditional rendering in JSX when you only want to render something if a condition is true?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "The nullish coalescing operator (??)",
      "The bitwise AND operator (&)",
      "The logical OR operator (||)",
      "The logical AND operator (&&)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you implement an if-else conditional render inside a React component?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "By using standard JavaScript if-else statements outside the return statement or using ternary operators inside JSX.",
      "By using HTML5 conditional attributes on DOM tags.",
      "By declaring multiple return statements inside a single JSX expression block.",
      "By utilizing CSS media queries to toggle element visibility."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you use array item index as a key when rendering a list that can be reordered or filtered?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "React throws a fatal compilation error.",
      "It can lead to UI bugs, state mismatch issues, and poor rendering performance.",
      "The list automatically sorts itself in ascending order.",
      "Browser memory usage increases exponentially."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you conditionally apply a CSS class name to a React element based on a boolean state variable?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "By using template literals or conditional expressions inside the className string.",
      "By writing a separate stylesheet for each condition.",
      "By using the useState hook to modify the HTML tag name.",
      "By wrapping the element in a conditional tag."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the result of evaluating {false && <p>Hello</p>} in JSX?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "A runtime syntax error because boolean values cannot be rendered.",
      "The string \"false\" is rendered as text on the screen.",
      "Nothing is rendered, as React treats boolean false as a signal to render nothing.",
      "The paragraph is rendered with hidden opacity."
    ],
    "answerIdx": 2
  },
  {
    "stem": "When using a ternary operator (condition ? trueElem : falseElem) for conditional rendering in JSX, what does it represent?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "A way to choose between two different elements to render based on the boolean evaluation of the condition.",
      "An asynchronous data fetching promise.",
      "A method to loop through array elements.",
      "A directive to load external stylesheets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you avoid defining child components inside the render body of another component?",
    "topic": "Conditional rendering and lists",
    "choices": [
      "It causes the inner component to be recreated on every render, resetting its state and hurting performance.",
      "It violates JavaScript scoping rules and throws a reference error.",
      "It prevents props from being passed down.",
      "It forces the browser to open a new tab."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary benefit of component composition in React?",
    "topic": "Composition patterns",
    "choices": [
      "It automatically optimizes database queries.",
      "It allows you to build complex UIs by combining smaller, specialized, and reusable components.",
      "It replaces the need for CSS preprocessors.",
      "It compiles React code directly into native mobile applications."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the containment composition pattern work in React?",
    "topic": "Composition patterns",
    "choices": [
      "Components contain hardcoded logic for all child elements inside a single file.",
      "Generic components use the children prop to render unknown child components passed from parents.",
      "Components are wrapped in locked container divs that prevent style leakage.",
      "Parent components completely override child state without permission."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is 'prop drilling' in React applications?",
    "topic": "Composition patterns",
    "choices": [
      "A technique for optimizing component render performance using memoization.",
      "The process of extracting props into separate TypeScript interfaces.",
      "The anti-pattern of passing props down through multiple intermediate component layers just to reach a deeply nested child.",
      "A debugging method for inspecting props in browser developer tools."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which React feature was specifically designed to solve the prop drilling problem for global data like themes or user sessions?",
    "topic": "Composition patterns",
    "choices": [
      "React Router",
      "Redux Toolkit",
      "The Context API",
      "JSX Fragments"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a React Higher-Order Component (HOC)?",
    "topic": "Composition patterns",
    "choices": [
      "A function that takes a component and returns a new enhanced component.",
      "A component that renders at the very top of the DOM tree.",
      "A hook that manages asynchronous state operations.",
      "A class component with lifecycle methods enabled."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do render props differ from traditional component composition?",
    "topic": "Composition patterns",
    "choices": [
      "They pass a function as a prop that returns a React element, allowing sharing of code between components.",
      "They render components exclusively on the server.",
      "They replace JSX with plain JavaScript template strings.",
      "They eliminate the need for props entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is component composition often preferred over inheritance for reusing behavior in React?",
    "topic": "Composition patterns",
    "choices": [
      "Inheritance is strictly forbidden by the ECMAScript standard.",
      "Composition provides cleaner separation of concerns and avoids rigid class hierarchies.",
      "Inheritance makes components execute much slower in the browser.",
      "Composition allows components to bypass React's virtual DOM."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of specialization in React composition patterns?",
    "topic": "Composition patterns",
    "choices": [
      "Creating a more specific component by configuring a generalized component with specific props.",
      "Optimizing component bytecode for mobile devices.",
      "Restricting component access to authorized users only.",
      "Converting functional components into class components."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does lifting state up help in React component architecture?",
    "topic": "Composition patterns",
    "choices": [
      "It moves shared state to the closest common ancestor so multiple child components can stay synchronized.",
      "It deletes unnecessary state variables to free up browser memory.",
      "It sends local component state to a remote cloud database.",
      "It bypasses the need for props when passing data downward."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What role do React fragments (<></>) play in component composition?",
    "topic": "Composition patterns",
    "choices": [
      "They allow you to group a list of children without adding extra unnecessary DOM nodes to the output.",
      "They split large JavaScript bundles into smaller chunks for lazy loading.",
      "They act as error boundaries for catching rendering crashes.",
      "They provide default styling for layout grids."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should asynchronous data fetching typically be initiated inside a React functional component?",
    "topic": "Fetching data in components",
    "choices": [
      "Directly inside the main component function body before the return statement.",
      "Inside a useEffect hook with an appropriate dependency array.",
      "Inside the constructor method of the component.",
      "Inside a CSS file using special fetch directives."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common pattern for handling loading states when fetching data in a component?",
    "topic": "Fetching data in components",
    "choices": [
      "Using a boolean state variable (e.g., isLoading) that starts as true and becomes false once data arrives.",
      "Pausing the browser execution thread using a synchronous while loop.",
      "Relying on browser built-in loading spinners triggered automatically by fetch().",
      "Deleting the component markup until the network request completes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it important to handle error states when fetching data in React?",
    "topic": "Fetching data in components",
    "choices": [
      "To prevent network requests from timing out.",
      "To automatically restart the backend server upon failure.",
      "To catch network failures or API errors and display a helpful fallback message to the user instead of crashing.",
      "To encrypt error logs before sending them to analytics."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a race condition in the context of data fetching inside React components?",
    "topic": "Fetching data in components",
    "choices": [
      "When two API requests finish in an unpredictable order, potentially causing outdated responses to overwrite newer data.",
      "When network requests exceed the maximum allowed bandwidth of the CDN.",
      "When JavaScript compilation takes longer than the browser timeout limit.",
      "When multiple users access the same static HTML page simultaneously."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you prevent a state update on an unmounted component after an asynchronous fetch request completes?",
    "topic": "Fetching data in components",
    "choices": [
      "By using an AbortController or a cleanup flag variable to track whether the component is still mounted.",
      "By disabling browser garbage collection.",
      "By wrapping the fetch call in a try/catch block.",
      "By converting the component into a static HTML file."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which built-in browser API is most commonly used for making HTTP requests in modern React applications?",
    "topic": "Fetching data in components",
    "choices": [
      "XMLHttpRequest",
      "ActiveXObject",
      "fetch()",
      "jQuery.ajax()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might a developer choose a data fetching library like TanStack Query (React Query) over raw useEffect for fetching data?",
    "topic": "Fetching data in components",
    "choices": [
      "It automatically handles caching, background refetching, deduplication, and loading/error states out of the box.",
      "It eliminates the need for JavaScript in frontend applications.",
      "It converts React components into server-side rendered PHP scripts.",
      "It removes the need for any CSS styling."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do with the response object returned by a fetch() call before extracting JSON data?",
    "topic": "Fetching data in components",
    "choices": [
      "Check if response.ok is true to ensure the HTTP request succeeded without server errors.",
      "Convert the response into a binary zip archive.",
      "Save the response object directly into local state.",
      "Pass the response through a CSS minifier."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle parameters or query strings in data fetching URLs within a component?",
    "topic": "Fetching data in components",
    "choices": [
      "By constructing dynamic URL strings using template literals with current state or prop values.",
      "By hardcoding static values directly into the browser address bar.",
      "By storing parameters inside the component CSS file.",
      "By using global window variables exclusively."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you trigger a fetch request directly inside a component body without a useEffect hook?",
    "topic": "Fetching data in components",
    "choices": [
      "The request runs infinitely on every render, spamming the server and crashing the browser.",
      "The request executes once and caches the result globally.",
      "The browser blocks the request due to CORS violations.",
      "The request is automatically optimized by the React compiler."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the typical directory structure convention in a growing React project?",
    "topic": "Project structure",
    "choices": [
      "Placing all components, hooks, styles, and utilities into a single flat directory.",
      "Grouping files by feature or by file type (e.g., components/, hooks/, utils/, pages/) for maintainability.",
      "Storing every component inside the public root folder alongside index.html.",
      "Organizing files alphabetically by file size."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is separating container/smart components from presentational/dumb components a common architectural pattern?",
    "topic": "Project structure",
    "choices": [
      "It enforces strict object-oriented programming principles in JavaScript.",
      "It separates business logic and data fetching from UI rendering, improving reusability and testing.",
      "It reduces the total number of files in the project repository.",
      "It allows CSS styles to be applied without class names."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of an index.js (or index.ts) file inside a component directory?",
    "topic": "Project structure",
    "choices": [
      "To act as a barrel file that cleanly re-exports components, simplifying import statements across the project.",
      "To store database credentials for the component.",
      "To serve as the main entry point for the entire web server.",
      "To compile JSX into browser-readable bytecode."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do path aliases (e.g., '@/components/Button') improve React project structure?",
    "topic": "Project structure",
    "choices": [
      "They allow you to import modules without dealing with messy relative path syntax like '../../components/Button'.",
      "They encrypt file paths to protect source code from inspection.",
      "They automatically generate unit tests for every component.",
      "They compress JavaScript bundles during production builds."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should reusable utility functions, such as date formatters or API helpers, be placed in a project structure?",
    "topic": "Project structure",
    "choices": [
      "Inside the node_modules folder.",
      "Directly inside the public assets directory.",
      "In a dedicated utils/ or lib/ folder.",
      "At the top of every individual component file."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should component styles be organized alongside their respective components or using modular CSS approaches?",
    "topic": "Project structure",
    "choices": [
      "To prevent global CSS namespace pollution and make component deletion or refactoring self-contained.",
      "Because browsers require CSS files to have the exact same name as JS files.",
      "To prevent React from compiling JSX elements.",
      "To force browsers to download styles sequentially."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of the public/ folder in a typical React-based project structure?",
    "topic": "Project structure",
    "choices": [
      "To store static assets like favicons, robots.txt, and images that are served directly without being processed by the bundler.",
      "To store private environment secrets and database passwords.",
      "To house all component source code files.",
      "To store compiled production build logs."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does keeping shared custom hooks in a dedicated hooks/ folder benefit large projects?",
    "topic": "Project structure",
    "choices": [
      "It makes reusable stateful logic easily discoverable and shareable across multiple feature components.",
      "It automatically converts them into server-side functions.",
      "It prevents hooks from triggering re-renders.",
      "It eliminates the need for unit testing."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a major advantage of organizing project code by feature modules rather than technical roles?",
    "topic": "Project structure",
    "choices": [
      "Related files (components, hooks, tests, styles) live close together, making large codebases easier to navigate and scale.",
      "It reduces the physical size of the git repository.",
      "It prevents developers from writing CSS code.",
      "It removes the need for build tools."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is establishing consistent naming conventions (e.g., PascalCase for components, camelCase for hooks and variables) important in a team project?",
    "topic": "Project structure",
    "choices": [
      "It ensures code readability, maintains consistency, and helps linters and build tools distinguish components from standard functions.",
      "It is strictly required by the JavaScript language specification to prevent syntax errors.",
      "It allows the browser to execute code twice as fast.",
      "It automatically generates documentation websites."
    ],
    "answerIdx": 0
  }
]
do

LAYER: jamstack-3

JSON
[
  {
    "stem": "How does the file-system router in Next.js determine application routes?",
    "topic": "Pages and routing",
    "choices": [
      "Every file placed inside the designated pages or app directory automatically corresponds to a route based on its file path.",
      "Routes must be explicitly defined as regular expressions inside a central server configuration file.",
      "Routes are generated dynamically by scanning the database tables during server startup.",
      "Developers must register every route manually inside the main React entry point component."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of dynamic route segments in Next.js, such as a file named [id].js?",
    "topic": "Pages and routing",
    "choices": [
      "To restrict page access exclusively to authenticated administrators.",
      "To catch arbitrary parameter values from the URL so components can render content based on the dynamic ID.",
      "To cache static assets globally across all CDN edge nodes.",
      "To automatically minify JavaScript bundles for production deployment."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle catch-all routes in the Next.js pages router to match nested URL paths like /blog/a/b/c?",
    "topic": "Pages and routing",
    "choices": [
      "By using wildcard symbols (*.js) inside the filename.",
      "By configuring proxy rewrite rules in the web server settings.",
      "By naming the file using bracket spread syntax, such as [...slug].js.",
      "By writing custom Express middleware routing logic."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the function of the Link component imported from next/link in Next.js applications?",
    "topic": "Pages and routing",
    "choices": [
      "To load external stylesheets from remote CDNs securely.",
      "To generate SEO-friendly XML sitemaps automatically.",
      "To open external websites in a new browser tab.",
      "To enable client-side navigation between pages with prefetching, avoiding full browser reloads."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the useRouter hook in Next.js components?",
    "topic": "Pages and routing",
    "choices": [
      "It provides programmatic access to route objects, query parameters, and navigation methods like router.push().",
      "It replaces the useEffect hook for all asynchronous data fetching operations.",
      "It manages global application state across all component trees.",
      "It compiles JSX markup into static HTML files during build time."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Next.js handle 404 Not Found pages out of the box?",
    "topic": "Pages and routing",
    "choices": [
      "It redirects all unmatched URLs to the homepage automatically.",
      "It provides a built-in default 404 page, which can also be customized by creating a 404.js file in the pages directory.",
      "It crashes the server build process and throws a routing exception.",
      "It forces the browser to display a blank white screen."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What distinguishes an index.js file inside a nested subfolder (e.g., /blog/index.js) in the Next.js router?",
    "topic": "Pages and routing",
    "choices": [
      "It serves as a helper utility module for sibling components.",
      "It compiles into a compressed archive file for downloads.",
      "It resolves to the parent folder's root URL, mapping to /blog in this example.",
      "It acts as a private configuration file hidden from public routing."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is client-side navigation via next/link faster than a traditional HTML anchor tag (<a>)?",
    "topic": "Pages and routing",
    "choices": [
      "It bypasses TCP handshake protocols entirely.",
      "It downloads the entire database on initial page load.",
      "It disables browser caching to ensure real-time data accuracy.",
      "It fetches only the JSON data and JavaScript needed for the next page via client-side routing without reloading the browser."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an optional catch-all route in Next.js, and how is it denoted?",
    "topic": "Pages and routing",
    "choices": [
      "A route denoted by double brackets like [[...slug]].js that matches even when the parameter is completely omitted.",
      "A route that captures only numeric query parameters.",
      "A fallback route used exclusively for handling server errors.",
      "A routing pattern that disables client-side prefetching."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do shallow routing features in Next.js behave?",
    "topic": "Pages and routing",
    "choices": [
      "They reload the entire application bundle from the origin server.",
      "They allow you to change the URL without running data fetching methods like getStaticProps again.",
      "They compress HTML files into flat single-line strings.",
      "They restrict page routing to mobile viewports only."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Static Generation (SSG) in Next.js?",
    "topic": "Static generation",
    "choices": [
      "Rendering pages on the client side using browser JavaScript engines.",
      "Generating HTML pages dynamically on every incoming request using database queries.",
      "Pre-rendering HTML pages at build time so the cached result can be reused across requests.",
      "Compiling React components into native desktop application binaries."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Next.js data-fetching function is used to supply static props to a page at build time for Static Generation?",
    "topic": "Static generation",
    "choices": [
      "getServerSideProps",
      "getInitialProps",
      "getStaticProps",
      "useEffect"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When using getStaticProps with dynamic routes (e.g., [id].js), what companion function must be implemented to tell Next.js which paths to pre-render?",
    "topic": "Static generation",
    "choices": [
      "getStaticPaths",
      "getServerSidePaths",
      "getDynamicPaths",
      "getRouteParams"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the fallback property return value 'blocking' in getStaticPaths mean?",
    "topic": "Static generation",
    "choices": [
      "It immediately returns a 404 error if the path was not generated at build time.",
      "It serves a cached placeholder page while downloading the full bundle in the background.",
      "It rejects all incoming traffic during high load spikes.",
      "New pages requested that were not pre-built will wait on the server for generation, then cache the result for subsequent requests."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is Static Generation considered optimal for performance and SEO in web applications?",
    "topic": "Static generation",
    "choices": [
      "Pre-rendered HTML files can be served instantly from CDN edge caches with zero server processing delay.",
      "It forces search engine bots to execute client-side JavaScript manually.",
      "It eliminates the need for any CSS styling files.",
      "It compresses all image assets into vector graphics."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens during the build process of a Next.js application using pure Static Generation?",
    "topic": "Static generation",
    "choices": [
      "The server waits for live user traffic before compiling any templates.",
      "Next.js executes getStaticProps for each configured page, serializes the data, and outputs static HTML and JSON files.",
      "Browsers download raw source files and compile them locally.",
      "Database tables are automatically dropped and recreated."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can getStaticProps be used inside regular React components that are not page-level files?",
    "topic": "Static generation",
    "choices": [
      "Yes, any component can export getStaticProps to fetch its own data.",
      "No, getStaticProps only runs at the page level inside files located within the pages directory.",
      "Yes, provided the component is wrapped in a Suspense boundary.",
      "No, it can only be used inside custom hooks."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the revalidate property returned within the object by getStaticProps?",
    "topic": "Static generation",
    "choices": [
      "To specify how often in seconds user browser caches should expire.",
      "To force an immediate server restart when an error occurs.",
      "To enable Incremental Static Regeneration, defining the time window before a background re-generation is triggered.",
      "To validate form input fields before submission."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a limitation of Static Generation (SSG) in Next.js?",
    "topic": "Static generation",
    "choices": [
      "It cannot render pages that require user-specific data that changes on every request without client-side fetching.",
      "It requires an active relational database running on the production server.",
      "It disables all client-side JavaScript execution.",
      "It prevents the use of modern CSS frameworks."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Next.js handle environment variables during Static Generation builds?",
    "topic": "Static generation",
    "choices": [
      "Environment variables prefixed with NEXT_PUBLIC_ are embedded into the JavaScript bundle at build time, while others remain server-only.",
      "All environment variables are exposed publicly to the browser for security transparency.",
      "Environment variables are ignored during static builds.",
      "Variables must be hardcoded directly into getStaticProps functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does Incremental Static Regeneration (ISR) solve in Next.js?",
    "topic": "Incremental static regeneration",
    "choices": [
      "It prevents CSS styles from conflicting across different component files.",
      "It allows you to update static pages after build time in the background without needing a full site rebuild.",
      "It speeds up local development server startup times.",
      "It automatically converts relational databases into JSON files."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does ISR handle a request for a static page whose revalidation time has elapsed?",
    "topic": "Incremental static regeneration",
    "choices": [
      "It returns a 500 server error until the build finishes.",
      "It forces the user to wait while a fresh page is generated synchronously.",
      "It serves the stale cached page instantly to the current user while triggering a background regeneration of the page.",
      "It clears the entire CDN cache globally."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is required in getStaticProps to enable Incremental Static Regeneration?",
    "topic": "Incremental static regeneration",
    "choices": [
      "Returning a revalidate key with a numeric value representing seconds.",
      "Setting fallback: true in getStaticPaths.",
      "Importing the unstable_isr module from next/server.",
      "Enabling server-side rendering mode."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to subsequent requests for a page after ISR triggers a background regeneration?",
    "topic": "Incremental static regeneration",
    "choices": [
      "They continue receiving the old stale version indefinitely.",
      "They are blocked until a developer manually approves the new build.",
      "They are redirected to a maintenance page.",
      "Once the background generation completes successfully, the cache is updated and subsequent users receive the newly generated page."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can ISR be used with dynamic routes generated via getStaticPaths?",
    "topic": "Incremental static regeneration",
    "choices": [
      "Yes, ISR works seamlessly with dynamic routes, allowing new or existing dynamic pages to update without full rebuilds.",
      "No, dynamic routes require full server-side rendering.",
      "Yes, but only if the fallback is set strictly to false.",
      "No, ISR is restricted to static root pages only."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is on-demand revalidation in Next.js ISR?",
    "topic": "Incremental static regeneration",
    "choices": [
      "Revalidating pages automatically every 60 seconds.",
      "Triggering a page regeneration manually via an API route (e.g., when a CMS publishes updated content) rather than waiting for a time interval.",
      "Revalidating user authentication tokens on every click.",
      "Clearing browser local storage when a user logs out."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you trigger an on-demand revalidation in a Next.js application?",
    "topic": "Incremental static regeneration",
    "choices": [
      "By calling res.revalidate('/path') inside a server-side API route or server action.",
      "By restarting the production server via SSH.",
      "By executing npm run build in the browser console.",
      "By modifying the next.config.js file programmatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a key benefit of ISR over traditional Static Generation for large e-commerce catalogs?",
    "topic": "Incremental static regeneration",
    "choices": [
      "It eliminates database costs entirely.",
      "It allows millions of product pages to update incrementally as prices or inventory change without triggering hours-long full site builds.",
      "It forces all users to view real-time inventory via client-side polling.",
      "It replaces the need for CDN caching."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if an error occurs inside getStaticProps during an ISR background regeneration?",
    "topic": "Incremental static regeneration",
    "choices": [
      "The site crashes and displays a 500 error to all visitors.",
      "The old cached page continues to be served safely while Next.js retries generation on subsequent requests.",
      "The cache is instantly wiped clean.",
      "The user is redirected to the homepage."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does ISR interact with CDN caching layers deployed on platforms like Vercel or Netlify?",
    "topic": "Incremental static regeneration",
    "choices": [
      "CDN edge caches are automatically purged or updated when Next.js generates a newly revalidated page.",
      "CDNs block ISR pages due to caching conflicts.",
      "CDNs ignore Next.js revalidation headers completely.",
      "ISR requires manual CDN cache invalidation API calls for every update."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary purpose of the Next.js Image component (next/image)?",
    "topic": "Image and font optimization",
    "choices": [
      "To automatically convert vector graphics into raster PNGs.",
      "To store image files inside the browser's local storage database.",
      "To automatically optimize, resize, compress, and serve images in modern formats like WebP or AVIF.",
      "To replace HTML video elements with animated GIFs."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does next/image require width and height props (or the fill prop) for remote or local images?",
    "topic": "Image and font optimization",
    "choices": [
      "To encrypt image metadata before rendering.",
      "To prevent layout shift (Cumulative Layout Shift) by reserving the correct space before the image loads.",
      "To force browsers to download images in sequential order.",
      "To calculate the total server CPU usage."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Next.js handle font optimization using the next/font module?",
    "topic": "Image and font optimization",
    "choices": [
      "It downloads Google Fonts at build time and self-hosts them, eliminating external network requests and privacy leaks.",
      "It loads fonts dynamically via client-side JavaScript after page render.",
      "It converts all fonts into system default sans-serif.",
      "It requires manual installation of font files in the public directory."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is automatic lazy loading behavior in next/image?",
    "topic": "Image and font optimization",
    "choices": [
      "Images load immediately upon server startup regardless of viewport position.",
      "Images located below the fold are loaded lazily only when they approach the browser viewport.",
      "Images are compressed only after the user clicks on them.",
      "JavaScript execution is paused until all images finish downloading."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does next/font prevent Cumulative Layout Shift (CLS) caused by web fonts?",
    "topic": "Image and font optimization",
    "choices": [
      "By automatically generating CSS size-adjust fallback styles that match fallback font metrics.",
      "By hiding text until the entire font file finishes downloading.",
      "By forcing browsers to use fixed-width monospace fonts.",
      "By disabling font rendering entirely on mobile devices."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What configuration is required in next.config.js to allow next/image to load remote images from an external domain?",
    "topic": "Image and font optimization",
    "choices": [
      "Setting images.domains or images.remotePatterns with the allowed hostname configurations.",
      "Disabling CORS restrictions globally.",
      "Adding the remote domain to the robots.txt file.",
      "Exporting a custom proxy server function."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of serving images in modern formats like WebP or AVIF via next/image?",
    "topic": "Image and font optimization",
    "choices": [
      "They increase image resolution to 4K automatically.",
      "They provide superior compression compared to older JPEG or PNG formats, resulting in smaller file sizes and faster page loads.",
      "They allow images to be edited directly in the browser.",
      "They remove the need for alt text attributes."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the priority prop on next/image affect loading behavior?",
    "topic": "Image and font optimization",
    "choices": [
      "It tells the browser to lazy load the image with low priority.",
      "It flags the image as high priority for preload, ensuring it is fetched instantly for Largest Contentful Paint (LCP) optimization.",
      "It prevents other images from loading until this image is clicked.",
      "It compresses the image quality to maximum settings."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does next/font optimize font loading at build time rather than runtime?",
    "topic": "Image and font optimization",
    "choices": [
      "To eliminate layout shifts and runtime network roundtrips to external font stylesheet providers.",
      "To reduce the physical storage size of server hard drives.",
      "To allow developers to write fonts in TypeScript.",
      "To prevent browsers from caching font files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you omit the alt prop on a next/image component?",
    "topic": "Image and font optimization",
    "choices": [
      "The image fails to render and throws a runtime exception.",
      "Next.js outputs a development warning reminding you to include descriptive alt text for accessibility.",
      "The image is automatically assigned a random string.",
      "Search engine crawlers skip the entire page."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define page-specific metadata (like title and description) in Next.js using the App Router?",
    "topic": "Metadata and SEO",
    "choices": [
      "By exporting a static metadata object or a generateMetadata function from a layout.js or page.js file.",
      "By writing raw HTML <head> tags directly inside standard component bodies.",
      "By configuring global settings in package.json.",
      "By storing meta tags in a separate robots.txt file."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the next/head component in the Next.js Pages Router?",
    "topic": "Metadata and SEO",
    "choices": [
      "To render navigation breadcrumbs at the top of pages.",
      "To inject elements into the HTML <head> section of the document, such as title, meta tags, and stylesheets.",
      "To manage server-side headers for API route responses.",
      "To compress JavaScript bundle headers."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are Open Graph (OG) meta tags important for SEO and social sharing in Next.js applications?",
    "topic": "Metadata and SEO",
    "choices": [
      "They control how page titles appear in browser tab tooltips.",
      "They dictate how your web pages are previewed and displayed when shared on social media platforms like Twitter, LinkedIn, and Facebook.",
      "They encrypt sensitive user data transmitted via forms.",
      "They speed up image download times on mobile devices."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does server-side pre-rendering in Next.js improve SEO compared to client-side single-page applications?",
    "topic": "Metadata and SEO",
    "choices": [
      "Search engine crawlers receive fully rendered HTML containing all text and meta tags immediately, rather than waiting for JavaScript execution.",
      "Crawlers are given direct database access credentials.",
      "It forces search engines to index pages twice as fast.",
      "It eliminates the need for meta description tags."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the function of a robots.txt file in a Next.js SEO strategy?",
    "topic": "Metadata and SEO",
    "choices": [
      "To store automated testing scripts for browser automation.",
      "To instruct search engine crawlers which pages or sections of your site are allowed or disallowed to be indexed.",
      "To style error pages with retro robot graphics.",
      "To manage SSL certificate renewals."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you generate a dynamic sitemap.xml file in a Next.js application?",
    "topic": "Metadata and SEO",
    "choices": [
      "By using a sitemap.js (or sitemap.ts) file in the App Router that exports a function returning an array of site URLs.",
      "By manually updating an XML file via FTP after every code change.",
      "By relying on browser extensions to scrape page links.",
      "By configuring proxy rules in next.config.js."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of the canonical link tag in SEO metadata?",
    "topic": "Metadata and SEO",
    "choices": [
      "To specify the preferred URL of a web page, preventing duplicate content penalty issues from multiple query parameters.",
      "To link stylesheets to the main application root.",
      "To direct users to mobile-optimized subdomains.",
      "To verify domain ownership with search engine webmaster tools."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do metadata objects inherit properties across nested layouts in the Next.js App Router?",
    "topic": "Metadata and SEO",
    "choices": [
      "Nested layouts completely overwrite parent metadata without merging.",
      "Child layouts and pages merge and inherit metadata fields from parent layouts, overriding specific keys when defined.",
      "Metadata must be duplicated manually in every single page file.",
      "Inheritance is restricted to CSS styles only."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is including a descriptive HTML lang attribute on the root <html> tag important for SEO and accessibility?",
    "topic": "Metadata and SEO",
    "choices": [
      "It tells screen readers and search engines the primary language of the document for accurate pronunciation and indexing.",
      "It automatically translates page content into the user's local language.",
      "It dictates the character encoding format for database storage.",
      "It speeds up JavaScript execution in modern browsers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is structured data (JSON-LD) and how is it used in Next.js for SEO?",
    "topic": "Metadata and SEO",
    "choices": [
      "A format for structuring database queries.",
      "A script tag containing standardized JSON data that helps search engines understand entities like products, articles, or events for rich snippets.",
      "A styling language that replaces CSS for layout structuring.",
      "A security protocol for validating API response headers."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Next.js data-fetching method should be used when a page must fetch fresh data on every single incoming request?",
    "topic": "Data fetching patterns",
    "choices": [
      "getStaticProps",
      "getStaticPaths",
      "getServerSideProps",
      "getInitialPropsStatic"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does getServerSideProps affect page performance and hosting requirements?",
    "topic": "Data fetching patterns",
    "choices": [
      "It allows pages to be served instantly from static CDN edge caches.",
      "It requires a server runtime or serverless function to execute on every request, resulting in higher TTFB compared to static pages.",
      "It compiles pages entirely inside the user's browser.",
      "It eliminates the need for any backend database connection."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is client-side data fetching in Next.js (e.g., using useEffect or React Query), and when is it appropriate?",
    "topic": "Data fetching patterns",
    "choices": [
      "Fetching data in the browser after the initial HTML page loads, ideal for user dashboards or data that changes frequently per user.",
      "Fetching data on the server before build time.",
      "Fetching data inside getStaticProps during compilation.",
      "Fetching database records during DNS resolution."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a major advantage of Server Components (default in the Next.js App Router) over traditional client components regarding data fetching?",
    "topic": "Data fetching patterns",
    "choices": [
      "They can fetch data directly on the server without needing useEffect, hooks, or exposing database credentials to the client.",
      "They run entirely inside the user's browser memory.",
      "They eliminate the need for any JavaScript bundling.",
      "They prevent pages from being indexed by search engines."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass data from getServerSideProps to the page component in the Pages Router?",
    "topic": "Data fetching patterns",
    "choices": [
      "By storing the data in global window variables.",
      "By returning an object with a props key from getServerSideProps, which is then received as props by the page component.",
      "By writing data to a temporary JSON file on disk.",
      "By dispatching events through a React context provider."
    ],
    "answerIdx": 1
  },
  {
    "stem": "When should you choose Static Generation over Server-Side Rendering for a Next.js page?",
    "topic": "Data fetching patterns",
    "choices": [
      "When the content is identical for all users and updates infrequently, maximizing speed and minimizing server load.",
      "When the page displays real-time stock prices changing every second.",
      "When the page requires private user session cookies.",
      "When the page content depends entirely on dynamic user input search queries."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Incremental Data Fetching / ISR combined with client-side fetching often used to achieve?",
    "topic": "Data fetching patterns",
    "choices": [
      "A hybrid approach where the core page layout is statically pre-rendered for instant loads, while dynamic user-specific sections load client-side.",
      "Slower page rendering times for security testing.",
      "Complete elimination of backend APIs.",
      "Automatic conversion of React components into PHP scripts."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do API routes in Next.js (pages/api or route.js in App Router) fit into data fetching patterns?",
    "topic": "Data fetching patterns",
    "choices": [
      "They serve as backend endpoints that components can call for data mutations, form submissions, or secure third-party API proxying.",
      "They replace HTML files as the primary output of builds.",
      "They handle CSS preprocessing and minification.",
      "They manage CDN edge routing tables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if an unhandled error is thrown inside getServerSideProps during a request?",
    "topic": "Data fetching patterns",
    "choices": [
      "The server catches the error and automatically renders the nearest error.js or 500 error page.",
      "The browser crashes and restarts the operating system.",
      "The site reverts to the previous static build version instantly.",
      "The user is redirected to the home page with cached data."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a developer prefer fetching data in Server Components over client-side fetching?",
    "topic": "Data fetching patterns",
    "choices": [
      "It reduces client-side JavaScript bundle size and keeps sensitive database queries and API secrets secure on the server.",
      "It allows browsers to execute database queries faster than servers.",
      "It eliminates the need for internet connectivity.",
      "It forces users to view cached data indefinitely."
    ],
    "answerIdx": 0
  }
]
do

LAYER: jamstack-4

JSON
[
  {
    "stem": "What is the primary purpose of file-based page routing in Gatsby?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "Every React component placed inside the src/pages directory automatically becomes a accessible route on the site.",
      "Routes must be explicitly defined using regex patterns inside a central Express server file.",
      "Pages are generated dynamically by querying a remote relational database at runtime.",
      "Developers must register every URL route manually inside the gatsby-config.js file."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do Gatsby page templates differ from standard pages in the src/pages directory?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "Templates are compiled into native mobile applications instead of static HTML.",
      "Templates are reusable component blueprints used to programmatically generate multiple pages from data sources using createPages.",
      "Templates can only be styled using inline CSS objects rather than stylesheets.",
      "Templates execute entirely on the client side via browser JavaScript engines."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What function is used in gatsby-node.js to programmatically create pages from GraphQL data?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "generatePages()",
      "createStaticRoutes()",
      "createPage()",
      "buildPageRoutes()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you pass context variables from gatsby-node.js to a programmatic page template query?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "By storing variables in the browser's global window object.",
      "By writing variables directly into the component's CSS file.",
      "By passing a context object inside the createPage action, which is then available as GraphQL query variables in the template.",
      "By hardcoding variables into the gatsby-config.js plugins array."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of the <Link> component imported from gatsby in Gatsby applications?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "To enable fast client-side navigation between internal pages with prefetching capabilities.",
      "To load external stylesheets from remote CDNs securely.",
      "To open external websites in a new browser tab with security attributes.",
      "To generate SEO-friendly XML sitemaps automatically during builds."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where are top-level layout components or site-wide wrappers typically integrated in a Gatsby project structure?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "Inside the public root folder as static HTML templates.",
      "Using the gatsby-browser.js and gatsby-ssr.js APIs to wrap the root element.",
      "Directly inside the gatsby-config.js plugins configuration.",
      "As individual route files inside the src/pages directory."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a user clicks a Gatsby <Link> component pointing to another internal page?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "The browser performs a full document reload from the server.",
      "Gatsby fetches the required JSON data and code chunks for the destination page asynchronously and updates the view without a full page reload.",
      "The request is routed through a server-side PHP controller.",
      "The page data is wiped from local storage and re-queried from the database."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might a developer create a custom 404 page in a Gatsby project?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "To prevent search engines from indexing the site.",
      "To provide a branded, user-friendly fallback interface when a visitor attempts to access a non-existent URL route.",
      "To automatically redirect broken links to an external advertising partner.",
      "To force the build process to fail when broken links are detected."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of slug fields when setting up programmatic page generation for blog posts in Gatsby?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "To define the unique URL path segment for each individual blog post.",
      "To store encrypted passwords for administrative content editors.",
      "To calculate the estimated reading time of the article.",
      "To compress markdown files into binary assets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Gatsby handle nested directory structures inside src/pages?",
    "topic": "Gatsby pages and templates",
    "choices": [
      "Nested folders create nested URL paths automatically, such as src/pages/blog/first-post.js mapping to /blog/first-post.",
      "Folders inside src/pages are ignored unless explicitly registered in gatsby-node.js.",
      "Nested directories throw a compilation error due to route collision rules.",
      "All files inside subfolders are flattened into the root URL path."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary role of GraphQL in the Gatsby architecture?",
    "topic": "GraphQL data queries",
    "choices": [
      "To serve as a production web server handling runtime API requests.",
      "To query, shape, and combine data from multiple sources (CMSs, markdown, APIs) at build time into components.",
      "To replace CSS for styling React components.",
      "To manage user authentication tokens and session cookies."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are GraphQL queries in Gatsby executed at build time rather than runtime for static pages?",
    "topic": "GraphQL data queries",
    "choices": [
      "Because Gatsby sites do not have a persistent server at runtime, so all data must be resolved and baked into static assets beforehand.",
      "Because browser JavaScript engines cannot parse GraphQL syntax.",
      "To prevent users from viewing source code in developer tools.",
      "To force relational databases to close idle connections."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is GraphiQL in the context of developing with Gatsby?",
    "topic": "GraphQL data queries",
    "choices": [
      "A production database management tool running on CDN edge nodes.",
      "An in-browser IDE and exploration tool for testing GraphQL queries and inspecting your site's data schema during development.",
      "A compiler that translates GraphQL into SQL queries.",
      "A testing framework for running end-to-end Cypress tests."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Gatsby's data layer handle disparate data sources like Markdown files and Contentful CMS entries?",
    "topic": "GraphQL data queries",
    "choices": [
      "It requires developers to write custom conversion scripts to merge raw text strings manually.",
      "It normalizes different data formats into a unified GraphQL data schema, allowing you to query them using consistent syntax.",
      "It converts all data into XML format before rendering.",
      "It blocks conflicting data sources from being used in the same project."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an alias in a Gatsby GraphQL query used for?",
    "topic": "GraphQL data queries",
    "choices": [
      "To rename a queried field's return key in the response data object to avoid naming collisions or clarify meaning.",
      "To encrypt sensitive data fields before rendering them in components.",
      "To link external CSS stylesheets to GraphQL nodes.",
      "To bypass pagination limits on large datasets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do GraphQL query arguments function in Gatsby data fetching?",
    "topic": "GraphQL data queries",
    "choices": [
      "They allow you to filter, sort, limit, or skip records directly within the query definition.",
      "They define environment variables for production server deployment.",
      "They control the physical layout of DOM elements on the screen.",
      "They manage browser cookie expiration times."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a GraphQL query in a Gatsby component requests a field that does not exist on any node?",
    "topic": "GraphQL data queries",
    "choices": [
      "Gatsby returns null values for missing fields gracefully.",
      "The development server or build process throws a schema validation error identifying the invalid field.",
      "The browser automatically creates a mock field with random data.",
      "The query falls back to REST API endpoints."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the data prop injected into Gatsby page components?",
    "topic": "GraphQL data queries",
    "choices": [
      "It contains the results of the page's exported GraphQL query ready to be rendered in the UI.",
      "It holds browser localStorage data and session tokens.",
      "It stores configuration options for gatsby-config.js plugins.",
      "It manages client-side routing state transitions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are fragment definitions used in Gatsby GraphQL queries?",
    "topic": "GraphQL data queries",
    "choices": [
      "To split large JavaScript bundles into smaller chunks for lazy loading.",
      "To encapsulate reusable sets of query fields and share them across multiple queries, keeping code DRY.",
      "To fragment database tables across multiple cloud regions.",
      "To break long URLs into shorter slugs."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is data node tracing in the Gatsby data layer?",
    "topic": "GraphQL data queries",
    "choices": [
      "The internal mechanism Gatsby uses to track parent-child relationships and dependencies between source nodes.",
      "A debugging tool for tracking browser memory leaks.",
      "A method for tracing network packets across CDN edge routers.",
      "A technique for validating SSL certificate chains."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary function of source plugins in the Gatsby ecosystem?",
    "topic": "Source plugins",
    "choices": [
      "To compile Sass and Less stylesheets into minified CSS files.",
      "To fetch data from external sources (such as filesystems, headless CMSs, or APIs) and ingest it into Gatsby's data layer.",
      "To optimize raster image assets into WebP formats.",
      "To manage user authentication and login state."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do transformer plugins work alongside source plugins in Gatsby?",
    "topic": "Source plugins",
    "choices": [
      "Transformer plugins process raw data nodes created by source plugins (e.g., parsing raw markdown files into structured HTML nodes) so they can be queried via GraphQL.",
      "Transformer plugins convert JavaScript code into WebAssembly binaries.",
      "Transformer plugins manage serverless function deployments on cloud platforms.",
      "Transformer plugins handle CSS vendor prefixing automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where are Gatsby plugins configured and registered in a project?",
    "topic": "Source plugins",
    "choices": [
      "Inside the package.json dependencies array.",
      "Inside the gatsby-config.js configuration file under the plugins array.",
      "Inside the main src/index.js React entry point.",
      "Inside individual page component files using ES6 imports."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which source plugin is commonly used to load local Markdown files from your project directory into Gatsby?",
    "topic": "Source plugins",
    "choices": [
      "gatsby-source-contentful",
      "gatsby-source-wordpress",
      "gatsby-source-filesystem",
      "gatsby-source-graphql"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a required plugin option is missing or misconfigured in gatsby-config.js?",
    "topic": "Source plugins",
    "choices": [
      "Gatsby ignores the missing option and uses default fallback values.",
      "The Gatsby build process or development server throws a validation error indicating the configuration issue.",
      "The browser displays a runtime JavaScript warning.",
      "The site automatically switches to server-side rendering mode."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do community source plugins interact with third-party headless CMS platforms like Contentful or WordPress?",
    "topic": "Source plugins",
    "choices": [
      "They poll or fetch content via the CMS's APIs during the build step and turn them into Gatsby data nodes.",
      "They run a persistent Node.js server on the user's local machine.",
      "They convert CMS databases into local SQLite files automatically.",
      "They replace HTML output with direct CMS iframe embeds."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of gatsby-transformer-remark?",
    "topic": "Source plugins",
    "choices": [
      "To parse Markdown files sourced by gatsby-source-filesystem into HTML and extract frontmatter metadata for GraphQL querying.",
      "To generate automated XML sitemaps for search engines.",
      "To optimize image loading speeds across CDN edge nodes.",
      "To manage user comments on blog posts."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a Gatsby project use multiple source plugins simultaneously?",
    "topic": "Source plugins",
    "choices": [
      "No, Gatsby restricts projects to a single data source plugin at a time.",
      "Yes, Gatsby is designed to aggregate data from multiple diverse source plugins into a unified GraphQL schema.",
      "Yes, but only if all data sources use the exact same schema structure.",
      "No, multiple sources cause fatal schema collision errors."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What role does gatsby-node.js play when working with data sourced from plugins?",
    "topic": "Source plugins",
    "choices": [
      "It provides Node APIs to hook into the build lifecycle, enabling tasks like creating pages programmatically from queried source data.",
      "It manages client-side form state and validation logic.",
      "It stores environment secrets and API keys securely for the browser.",
      "It compiles Sass files into production stylesheets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass configuration options to a plugin inside gatsby-config.js?",
    "topic": "Source plugins",
    "choices": [
      "By passing an object containing a resolve string and an options object for that plugin.",
      "By writing inline query strings inside the plugin name.",
      "By defining environment variables prefixed with PLUGIN_ in .env files.",
      "By exporting a configuration function from gatsby-browser.js."
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you use programmatic page creation in Gatsby rather than file-based pages?",
    "topic": "Programmatic page creation",
    "choices": [
      "When building a single static contact page with no external data dependencies.",
      "When you have hundreds or thousands of dynamic items (like blog posts or products) sourced from a CMS that share a common template layout.",
      "When you want to disable client-side routing entirely.",
      "When rendering simple homepage hero sections."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Gatsby Node API is primarily used for programmatically creating pages?",
    "topic": "Programmatic page creation",
    "choices": [
      "onCreatePages",
      "createPages",
      "buildDynamicRoutes",
      "registerPageTemplates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the three required properties passed to the createPage action inside gatsby-node.js?",
    "topic": "Programmatic page creation",
    "choices": [
      "path, component, and context",
      "url, template, and data",
      "route, layout, and props",
      "id, slug, and query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you query data within gatsby-node.js when fetching lists of items to create programmatic pages?",
    "topic": "Programmatic page creation",
    "choices": [
      "By using the graphql function passed into the gatsby-node API arguments.",
      "By importing useStaticQuery inside gatsby-node.js.",
      "By making standard fetch requests to the browser window object.",
      "By querying DOM elements directly."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a programmatic page creation query fails or returns an error inside gatsby-node.js?",
    "topic": "Programmatic page creation",
    "choices": [
      "Gatsby ignores the error and builds an empty site.",
      "The build process halts and throws an error log to prevent building incomplete pages.",
      "The site falls back to client-side rendering mode automatically.",
      "The server restarts in development mode."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do you pass variables (like an item id or slug) via the context object in createPage?",
    "topic": "Programmatic page creation",
    "choices": [
      "To make those variables available as query parameters inside the template component's GraphQL query.",
      "To store user session cookies in the browser.",
      "To define CSS styling rules for the generated page.",
      "To encrypt the generated HTML files before deployment."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can programmatic page creation be used to generate paginated list pages (e.g., /blog/2, /blog/3)?",
    "topic": "Programmatic page creation",
    "choices": [
      "No, pagination requires manual file creation in src/pages.",
      "Yes, by calculating total items, chunking data arrays, and looping through index ranges inside gatsby-node.js.",
      "Yes, but only if using Next.js instead of Gatsby.",
      "No, Gatsby only supports single-item dynamic pages."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the relationship between graphql template tags in gatsby-node.js and page component GraphQL queries?",
    "topic": "Programmatic page creation",
    "choices": [
      "gatsby-node.js queries fetch ID lists or slugs to determine what pages to build, while the template query fetches the specific full data for each individual page.",
      "They must be identical queries executed twice for redundancy.",
      "gatsby-node.js queries render UI elements directly without templates.",
      "Template queries are ignored if gatsby-node.js queries are present."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you ensure programmatic pages are updated when content changes in your CMS?",
    "topic": "Programmatic page creation",
    "choices": [
      "By triggering a site rebuild via webhook whenever content is published or updated in the CMS.",
      "By forcing users to clear their browser cache manually.",
      "By enabling client-side polling every five seconds.",
      "By restarting the browser application."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common pitfall when writing async/await code inside gatsby-node.js lifecycle APIs?",
    "topic": "Programmatic page creation",
    "choices": [
      "Forgetting to return or await the GraphQL query promise, causing Gatsby to finish building before data is fetched.",
      "Writing queries in TypeScript instead of JavaScript.",
      "Using arrow functions instead of standard function declarations.",
      "Storing query results in local storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary purpose of Gatsby's image processing plugins (like gatsby-plugin-image)?",
    "topic": "Image processing",
    "choices": [
      "To automatically convert raster images into vector PDFs.",
      "To generate optimized responsive images in modern formats with placeholders, preventing layout shift and speeding up page loads.",
      "To allow users to edit images directly in the browser.",
      "To store image files inside external SQL databases."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are static image components in Gatsby processed at build time rather than runtime?",
    "topic": "Image processing",
    "choices": [
      "To compute dominant color placeholders, resize images into multiple widths, and convert them to WebP or AVIF formats beforehand.",
      "To force browsers to download all images simultaneously.",
      "To prevent search engines from indexing image URLs.",
      "To reduce the physical storage capacity of the CDN."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the function of the GatsbyImageData object returned by image processing GraphQL queries?",
    "topic": "Image processing",
    "choices": [
      "It contains all necessary image source sets, dimensions, and placeholder data required by the <GatsbyImage> component.",
      "It stores the raw binary string of the original uncompressed image.",
      "It manages CSS border-radius and box-shadow styles.",
      "It tracks user click events on images."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle local image files versus remote CMS image URLs in Gatsby image processing?",
    "topic": "Image processing",
    "choices": [
      "Local files are sourced via gatsby-source-filesystem and processed directly, while remote images require source plugins like gatsby-source-contentful to download and node-ify them.",
      "Remote images cannot be processed by Gatsby under any circumstances.",
      "Local images require manual resizing before being placed in the project.",
      "Remote images bypass optimization and are served uncompressed."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What layout mode (e.g., constrained, fixed, fullWidth) should you typically choose for a responsive hero banner image?",
    "topic": "Image processing",
    "choices": [
      "fullWidth, to make the image span the entire width of its container while scaling responsively.",
      "fixed, to lock the image to exact pixel dimensions regardless of screen size.",
      "constrained, to prevent the image from rendering on mobile viewports.",
      "static, to disable lazy loading completely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Gatsby's image processing prevent Cumulative Layout Shift (CLS)?",
    "topic": "Image processing",
    "choices": [
      "By reserving the exact aspect ratio space in the DOM before the high-resolution image finishes loading.",
      "By hiding all images until the page is 100% loaded.",
      "By forcing browsers to use fixed-width font metrics.",
      "By disabling JavaScript execution during rendering."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of image placeholder options (like dominantColor or tracedSVG) in Gatsby image components?",
    "topic": "Image processing",
    "choices": [
      "To display a low-quality preview or visual placeholder while the high-resolution image loads in the background.",
      "To replace broken image links with error icons.",
      "To encrypt image metadata for security compliance.",
      "To generate automated alt text for screen readers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you reference a local image file in markdown frontmatter without setting up gatsby-source-filesystem and transformer plugins?",
    "topic": "Image processing",
    "choices": [
      "Gatsby treats the image path as a plain text string rather than a queryable file node, preventing image optimization.",
      "The build process throws a fatal compilation error.",
      "The browser automatically downloads and optimizes the image client-side.",
      "The image renders successfully using default browser styles."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is gatsby-plugin-sharp essential for image processing in Gatsby projects?",
    "topic": "Image processing",
    "choices": [
      "It provides the underlying image processing engine (using the Sharp library) that resizes, crops, and converts image formats during builds.",
      "It compiles Sass stylesheets into minified CSS.",
      "It generates XML sitemaps for SEO optimization.",
      "It manages client-side route transitions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass layout constraints and image formatting options to the <GatsbyImage> component?",
    "topic": "Image processing",
    "choices": [
      "By passing the image prop object returned from your GraphQL query along with optional props like alt.",
      "By writing inline CSS styles directly on the wrapper element.",
      "By configuring options inside gatsby-config.js plugins.",
      "By defining variables in browser localStorage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary difference between a static query (useStaticQuery) and a page query in Gatsby?",
    "topic": "Static query and page query",
    "choices": [
      "Static queries can be used inside any reusable React component, whereas page queries can only be exported at the page component level.",
      "Page queries run at runtime in the browser, while static queries run at build time.",
      "Static queries require dynamic variables passed via context, whereas page queries do not.",
      "Page queries are restricted to markdown files only."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can't you pass dynamic runtime variables (like props or route parameters) directly into a useStaticQuery hook?",
    "topic": "Static query and page query",
    "choices": [
      "Because static queries are evaluated and executed at build time before component props or runtime state exist.",
      "Because React hooks cannot accept string arguments.",
      "Because GraphQL syntax forbids the use of variables in queries.",
      "Because static queries are executed entirely on the client side."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where must page queries be placed in a Gatsby page component file?",
    "topic": "Static query and page query",
    "choices": [
      "Exported as a named constant export from the page file, typically named query.",
      "Inside the useEffect hook of the component.",
      "Inside the return JSX statement wrapped in a script tag.",
      "At the very top of the gatsby-config.js file."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do reusable components that need site metadata (like site title) access data without being page-level components?",
    "topic": "Static query and page query",
    "choices": [
      "By using the useStaticQuery hook combined with the graphql tag.",
      "By requesting props down through ten levels of parent components.",
      "By making asynchronous fetch calls to a REST API in useEffect.",
      "By reading cookies from the browser document object."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if multiple components in a Gatsby project use useStaticQuery to query the same data?",
    "topic": "Static query and page query",
    "choices": [
      "Gatsby evaluates and bundles the static queries efficiently at build time without duplicate runtime overhead.",
      "The build process throws a duplicate query collision error.",
      "The browser experiences memory leaks during component mounting.",
      "The queries conflict and return null values."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a page component export both a page query and use static queries inside its child components?",
    "topic": "Static query and page query",
    "choices": [
      "Yes, page queries supply data to the top-level page component, while static queries supply data to nested child components independently.",
      "No, Gatsby allows only one GraphQL query per file.",
      "Yes, but static queries will override page query data.",
      "No, mixing query types causes compilation crashes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are variables passed into page queries when querying dynamic pages (e.g., a specific blog post by slug)?",
    "topic": "Static query and page query",
    "choices": [
      "Through the page context object defined in gatsby-node.js, which is received as $slug in the GraphQL page query.",
      "Through browser localStorage query parameters.",
      "Through inline component state hooks.",
      "Through gatsby-config.js plugin options."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the return type of the useStaticQuery hook?",
    "topic": "Static query and page query",
    "choices": [
      "A JavaScript data object matching the structure of your GraphQL query.",
      "A Promise that must be resolved using async/await.",
      "A React component ready to render markup.",
      "A JSON string that requires JSON.parse() before use."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a developer choose a page query over a static query for a template component?",
    "topic": "Static query and page query",
    "choices": [
      "Page queries accept dynamic variables (like context slugs) needed to fetch unique data for individual programmatic pages.",
      "Page queries execute faster in the browser.",
      "Static queries cannot query markdown files.",
      "Page queries eliminate the need for GraphQL schemas."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What error occurs if you attempt to use useStaticQuery inside a non-React utility function or outside component rendering scope?",
    "topic": "Static query and page query",
    "choices": [
      "React rules of hooks violations or build-time static extraction errors.",
      "The browser throws a network timeout error.",
      "Gatsby converts the function into an API route.",
      "The build process succeeds with default null values."
    ],
    "answerIdx": 0
  }
]
do

LAYER: jamstack-5

JSON
[
  {
    "stem": "What is the primary purpose of defining content models in a headless CMS like Contentful?",
    "topic": "Content models and fields",
    "choices": [
      "To establish the structural schema, field types, and relationships for your content items before authors input data.",
      "To compile React components into static HTML files during project builds.",
      "To configure serverless routing rules for frontend application endpoints.",
      "To manage SSL certificates and domain name routing at the CDN edge."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do reference fields function within Contentful content models?",
    "topic": "Content models and fields",
    "choices": [
      "They allow content entries to link to other entries or media assets, establishing parent-child or many-to-one relationships.",
      "They compress image files into WebP formats automatically.",
      "They store encrypted user passwords for authentication databases.",
      "They act as foreign keys pointing to external SQL database tables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a Contentful Entry and an Asset?",
    "topic": "Content models and fields",
    "choices": [
      "An Entry represents structured content based on a content model, whereas an Asset represents uploaded media files like images, PDFs, or videos.",
      "An Entry is stored client-side in browser storage, while an Asset lives on the server.",
      "An Entry is immutable, whereas Assets can be edited via REST APIs.",
      "There is no functional distinction; both terms refer to text fields."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is field validation (such as required fields, regex patterns, or character limits) important in content models?",
    "topic": "Content models and fields",
    "choices": [
      "It ensures content editors provide consistent, high-quality data, preventing runtime rendering crashes on the frontend.",
      "It speeds up GraphQL query execution times on CDN edge nodes.",
      "It eliminates the need for any frontend CSS styling.",
      "It automatically generates XML sitemaps for search engine indexing."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What role does localization play when configuring Contentful content models and fields?",
    "topic": "Content models and fields",
    "choices": [
      "It allows specific fields to be marked as translatable, enabling multi-language content delivery through API parameters.",
      "It translates user interface buttons into local regional currencies.",
      "It automatically converts markdown text into HTML strings.",
      "It adjusts CDN edge caching rules based on visitor geographic IP addresses."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle one-to-many relationships in Contentful when modeling a blog post with multiple author references?",
    "topic": "Content models and fields",
    "choices": [
      "By using a reference field configured to accept multiple entries rather than a single entry.",
      "By concatenating author names into a single plain text string field.",
      "By creating separate databases for each author.",
      "By writing custom SQL join queries inside the frontend application."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of short text versus long text field types in Contentful content models?",
    "topic": "Content models and fields",
    "choices": [
      "Short text fields are optimized for titles, slugs, and single-line strings, while long text fields support paragraphs, markdown, or rich text formatting.",
      "Short text fields are stored encrypted, whereas long text fields are public.",
      "Short text fields render faster in React components.",
      "Long text fields are restricted to numerical data only."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you plan your content models carefully before letting editors publish production content?",
    "topic": "Content models and fields",
    "choices": [
      "Changing field identifiers or data types after publication can break existing frontend GraphQL queries and application logic.",
      "Contentful locks content models permanently after the first entry is created.",
      "Modifying models incurs high financial penalties from the hosting provider.",
      "It prevents developers from using TypeScript in their projects."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the function of JSON object fields in Contentful content models?",
    "topic": "Content models and fields",
    "choices": [
      "To store unstructured or custom structured JSON data payloads that do not fit standard schema types.",
      "To compile JavaScript code into WebAssembly binaries.",
      "To manage browser cookie expiration dates.",
      "To store static image assets securely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do system fields (like sys.id, sys.createdAt, sys.updatedAt) behave across Contentful entries?",
    "topic": "Content models and fields",
    "choices": [
      "They are automatically managed and populated by Contentful for every entry, providing metadata like unique IDs and timestamps.",
      "They can be edited freely by content editors in the UI dashboard.",
      "They must be manually defined in every content model schema.",
      "They are deleted once an entry is published."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary function of the Contentful Content Delivery API (CDA)?",
    "topic": "The Content Delivery API",
    "choices": [
      "A fast, read-only REST API optimized for delivering published content from Contentful's CDN to frontend applications.",
      "A write-only API used exclusively for creating user accounts and authentication tokens.",
      "A database migration tool for relational SQL schemas.",
      "A serverless function runner for executing backend business logic."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does the Content Delivery API serve published content rather than draft or unpublished changes?",
    "topic": "The Content Delivery API",
    "choices": [
      "To ensure that production applications only display vetted, finalized content to end users.",
      "Because draft content is permanently deleted from Contentful servers.",
      "To prevent developers from querying JSON data.",
      "To bypass CDN edge caching restrictions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What parameter is used in CDA requests to specify filtering, ordering, or limiting of returned entries?",
    "topic": "The Content Delivery API",
    "choices": [
      "Query parameters like content_type, order, and limit.",
      "CSS selector strings passed in HTTP headers.",
      "SQL join statements embedded in the URL path.",
      "GraphQL mutation arguments exclusively."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you distinguish the Content Delivery API (CDA) from the Content Preview API (CPA)?",
    "topic": "The Content Delivery API",
    "choices": [
      "The CDA delivers published entries only, while the CPA allows you to fetch draft and unpublished changes for previewing.",
      "The CDA uses GraphQL, while the CPA uses plain XML.",
      "The CDA is slower and runs on local servers, whereas the CPA runs on CDN edge nodes.",
      "There is no operational difference between the two APIs."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What authentication credential is required to make requests to the Contentful Content Delivery API?",
    "topic": "The Content Delivery API",
    "choices": [
      "A read-only Space Access Token / Content Delivery API key.",
      "A master database root password.",
      "An OAuth client secret token managed by the browser.",
      "A public SSH key pair."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the CDA handle linked entries and assets in its JSON responses?",
    "topic": "The Content Delivery API",
    "choices": [
      "It includes an 'includes' object containing resolved linked entries and assets, preventing the need for multiple round-trip requests.",
      "It deletes all linked entries to reduce payload size.",
      "It converts links into broken markdown text strings.",
      "It forces the frontend to query each linked item individually via separate SQL calls."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What HTTP status code does the CDA return when a requested entry ID cannot be found?",
    "topic": "The Content Delivery API",
    "choices": [
      "404 Not Found",
      "500 Internal Server Error",
      "200 OK with null body",
      "403 Forbidden"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are CDA responses cached heavily at the CDN level?",
    "topic": "The Content Delivery API",
    "choices": [
      "To reduce latency and ensure lightning-fast content delivery to static frontend applications.",
      "To prevent content editors from updating entries in real-time.",
      "To encrypt JSON payloads before they reach the browser.",
      "To comply with browser memory limit regulations."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you request specific locales when querying content through the CDA?",
    "topic": "The Content Delivery API",
    "choices": [
      "By passing the locale parameter (e.g., locale=es-ES) in the API request query string.",
      "By modifying the browser's language settings via localStorage.",
      "By translating the JSON response strings inside client-side JavaScript.",
      "By creating separate spaces for every language."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of using Contentful's official client SDKs (like contentful.js) rather than raw fetch calls?",
    "topic": "The Content Delivery API",
    "choices": [
      "They provide built-in response parsing, type safety, error handling, and helper methods for resolving linked assets.",
      "They compile React components into mobile application binaries.",
      "They eliminate the need for any API access tokens.",
      "They convert Contentful into a relational SQL database."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary advantage of querying Contentful via GraphQL compared to the standard REST CDA?",
    "topic": "Querying with GraphQL",
    "choices": [
      "You can fetch exact nested data structures in a single request without over-fetching or under-fetching fields.",
      "It allows you to modify database tables directly from frontend components.",
      "It eliminates the need for any API keys or authentication tokens.",
      "It converts GraphQL queries into compiled binary machine code."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are Contentful content types represented in Contentful's GraphQL schema?",
    "topic": "Querying with GraphQL",
    "choices": [
      "As auto-generated collection queries and type definitions (e.g., blogPostCollection and BlogPost).",
      "As static SQL tables with rigid column definitions.",
      "As RESTful endpoint URLs inside gatsby-config.js.",
      "As flat array strings stored in local storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle pagination when querying large lists of entries using Contentful's GraphQL API?",
    "topic": "Querying with GraphQL",
    "choices": [
      "By using skip and limit arguments in the collection query.",
      "By requesting all records simultaneously without limits.",
      "By writing custom SQL pagination middleware.",
      "By relying on browser infinite scroll event listeners."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the sys object within Contentful GraphQL query fields?",
    "topic": "Querying with GraphQL",
    "choices": [
      "To access system metadata like entry IDs, publication timestamps, and localization details.",
      "To manage system-level server configurations.",
      "To store encrypted user passwords.",
      "To style components using system fonts."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you resolve referenced entries in a Contentful GraphQL query?",
    "topic": "Querying with GraphQL",
    "choices": [
      "By expanding the reference field in the query and requesting fields on the target type.",
      "By making separate HTTP requests for every referenced ID.",
      "By storing references in browser cookies.",
      "By converting references into plain text strings."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you misspell a content type or field name in a Contentful GraphQL query?",
    "topic": "Querying with GraphQL",
    "choices": [
      "The GraphQL server returns a validation error identifying the schema mismatch.",
      "The query automatically returns fallback data with empty strings.",
      "The frontend application crashes with a 500 server error.",
      "Contentful creates a new field matching your misspelling."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you sort query results by publication date or custom fields in Contentful GraphQL?",
    "topic": "Querying with GraphQL",
    "choices": [
      "By using the order argument on collection queries (e.g., order: [sys_publishedAt_DESC]).",
      "By writing custom sorting algorithms in client-side JavaScript.",
      "By modifying the order of entries in the Contentful UI dashboard.",
      "By sorting database rows via SSH terminal commands."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an inline fragment (... on TypeName) used for in Contentful GraphQL queries?",
    "topic": "Querying with GraphQL",
    "choices": [
      "To query specific fields on union or interface types, such as mixed reference fields in Rich Text blocks.",
      "To fragment JavaScript bundles across multiple CDN edge nodes.",
      "To split large URLs into smaller slug components.",
      "To encrypt sensitive data fields before rendering."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test and explore Contentful GraphQL queries before writing frontend code?",
    "topic": "Querying with GraphQL",
    "choices": [
      "By using Contentful's built-in GraphiQL playground app or IDE provided in your space settings.",
      "By writing unit tests in Jest and running npm test.",
      "By inspecting browser developer tools network tabs on production sites.",
      "By executing curl commands in a local terminal."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a developer prefer Contentful's GraphQL API over REST for complex component trees?",
    "topic": "Querying with GraphQL",
    "choices": [
      "It allows components to declare their exact data requirements in a single query, eliminating multi-endpoint chaining.",
      "It compresses JSON responses into binary zip archives.",
      "It bypasses CDN rate limits automatically.",
      "It eliminates the need for environment variables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Contentful Rich Text, and how is it structured in API responses?",
    "topic": "Rich text rendering",
    "choices": [
      "A JSON-based tree structure representing formatted content, headings, lists, and embedded entries or assets.",
      "A raw HTML string stored directly in database columns.",
      "A plain text string with markdown syntax symbols.",
      "A compiled binary document format."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render Contentful Rich Text data in a React or Next.js application?",
    "topic": "Rich text rendering",
    "choices": [
      "By using the @contentful/rich-text-react-renderer package along with custom node renderers for elements and embedded blocks.",
      "By setting innerHTML directly without sanitization.",
      "By converting the JSON tree into plain uppercase strings.",
      "By passing the raw JSON object to a CSS stylesheet."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of options.renderNode when using the Contentful Rich Text React renderer?",
    "topic": "Rich text rendering",
    "choices": [
      "To map specific rich text node types (like hyperlinks, headings, or embedded entries) to custom React components.",
      "To define CSS color palettes for text styling.",
      "To manage browser cookie consent banners.",
      "To compress rich text JSON payloads."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are embedded entries and assets handled within Contentful Rich Text fields?",
    "topic": "Rich text rendering",
    "choices": [
      "They appear as block or inline nodes in the JSON tree referencing target entries, which can be rendered using custom renderNode rules.",
      "They are stripped out entirely by the CDA for security reasons.",
      "They are converted into broken image links automatically.",
      "They require separate REST API calls for each embedded item."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it important to handle unknown or custom node types gracefully when rendering Rich Text?",
    "topic": "Rich text rendering",
    "choices": [
      "To prevent rendering crashes or unhandled exceptions if content editors introduce new block structures in the CMS.",
      "To speed up browser JavaScript execution times.",
      "To force search engine crawlers to index hidden keywords.",
      "To eliminate the need for TypeScript interfaces."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between rendering inline embeds versus block embeds in Contentful Rich Text?",
    "topic": "Rich text rendering",
    "choices": [
      "Inline embeds flow within sentences of text, whereas block embeds render as standalone structural elements like figures or callouts.",
      "Inline embeds are stored client-side, while block embeds live on the server.",
      "Inline embeds require GraphQL queries, while block embeds use REST.",
      "There is no difference in rendering behavior."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle hyperlinks (both internal links and external URLs) in Contentful Rich Text rendering?",
    "topic": "Rich text rendering",
    "choices": [
      "By configuring the hyperlink node type in renderNode to output Next.js <Link> components for internal routes and <a> tags for external links.",
      "By opening all links in new browser tabs automatically.",
      "By converting all links into plain unclickable text strings.",
      "By routing links through serverless proxy functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you attempt to pass raw Contentful Rich Text JSON directly into a React JSX element without a renderer?",
    "topic": "Rich text rendering",
    "choices": [
      "React will throw an error or fail to render the object correctly because it expects React elements or strings, not raw AST node trees.",
      "React will automatically parse the JSON into HTML headings and paragraphs.",
      "The browser will display a formatted document preview.",
      "The application will compile into WebAssembly."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do content authors prefer Rich Text fields over raw HTML input fields in a headless CMS?",
    "topic": "Rich text rendering",
    "choices": [
      "It provides a structured, WYSIWYG editing experience while preventing authors from introducing malicious HTML or breaking site layouts.",
      "It allows authors to write direct SQL queries in the browser.",
      "It eliminates the need for database storage.",
      "It automatically translates text into multiple languages."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you style rich text output consistently across your application?",
    "topic": "Rich text rendering",
    "choices": [
      "By wrapping the rendered output in a styled container class and targeting standard HTML tags (p, h1, ul) with CSS.",
      "By writing inline style objects for every single paragraph node.",
      "By modifying the Contentful CMS dashboard stylesheet.",
      "By compiling CSS into JSON format."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are media assets (images, documents, videos) managed and stored in Contentful?",
    "topic": "Assets and media",
    "choices": [
      "Uploaded to Contentful's media library, where they are hosted on Contentful's global CDN and referenced by unique asset IDs.",
      "Stored as local files inside the frontend project's public folder.",
      "Saved directly as binary strings inside relational database columns.",
      "Sent via email attachments to content editors."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What metadata is available for Contentful asset entries through the API?",
    "topic": "Assets and media",
    "choices": [
      "Title, description, file URL, file name, file size, MIME type, and dimensions for images.",
      "Encrypted user passwords and session tokens.",
      "Serverless function execution logs.",
      "Database table schema migration history."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you optimize images hosted on Contentful's CDN using URL parameters?",
    "topic": "Assets and media",
    "choices": [
      "By appending image transformation query parameters (like ?w=800&fm=webp&q=80) to the asset URL for resizing, format conversion, and quality compression.",
      "By writing custom image processing algorithms in client-side JavaScript.",
      "By storing compressed copies manually in git repositories.",
      "By disabling CDN caching entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of integrating Contentful assets with modern frontend image components (like next/image or GatsbyImage)?",
    "topic": "Assets and media",
    "choices": [
      "It combines Contentful's CDN image hosting with automated responsive sizing, lazy loading, and placeholder generation to optimize performance.",
      "It allows users to edit images directly inside browser developer tools.",
      "It eliminates the need for alt text attributes.",
      "It converts raster images into vector PDFs automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle non-image assets (like PDF documents or audio files) retrieved from Contentful?",
    "topic": "Assets and media",
    "choices": [
      "By accessing the asset's direct file URL (asset.fields.file.url) to render standard HTML links, embeds, or download buttons.",
      "By converting them into JSON object fields automatically.",
      "By rendering them as responsive picture elements.",
      "By executing them as serverless functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a published Contentful asset if an editor replaces the underlying file in the CMS dashboard?",
    "topic": "Assets and media",
    "choices": [
      "The asset URL may remain the same or update depending on publishing actions, requiring CDN cache revalidation to reflect the new file on the frontend.",
      "The asset is deleted permanently from all frontend applications.",
      "The frontend application crashes with a 404 error.",
      "Contentful automatically restarts the production web server."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is specifying descriptive alt text fields on Contentful image assets important?",
    "topic": "Assets and media",
    "choices": [
      "It ensures accessibility for screen reader users and improves search engine image indexing.",
      "It compresses the image file size for faster downloads.",
      "It defines the width and height dimensions of the image in pixels.",
      "It triggers CDN edge caching mechanisms."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you query asset details alongside entry data using Contentful GraphQL?",
    "topic": "Assets and media",
    "choices": [
      "By traversing the asset field relationship in your GraphQL query and requesting fields like url, width, height, and title.",
      "By making separate REST API calls to the assets endpoint.",
      "By storing asset URLs in local storage.",
      "By reading binary files from the server filesystem."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of organizing Contentful assets into folders or using tags?",
    "topic": "Assets and media",
    "choices": [
      "To help content editors organize, search, and manage large media libraries efficiently in the CMS UI.",
      "To determine how frontend components style and render images.",
      "To compile Sass stylesheets into minified CSS.",
      "To manage CDN routing tables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Contentful handle image security and access control for private assets?",
    "topic": "Assets and media",
    "choices": [
      "Assets published via the CDA are publicly accessible by URL, so sensitive private documents require signed URLs or alternative secure storage solutions.",
      "All assets are encrypted with military-grade AES-256 encryption in the browser.",
      "Assets require multi-factor authentication for every page view.",
      "Assets can only be viewed by users logged into Contentful."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the fundamental difference between preview content and published content workflows in Contentful?",
    "topic": "Preview versus published content",
    "choices": [
      "Published content is live on production CDAs for end users, whereas preview content is uncommitted or draft data fetched via the Content Preview API for staging reviews.",
      "Preview content is stored client-side, while published content lives on the server.",
      "Preview content uses SQL databases, while published content uses JSON files.",
      "There is no difference; both APIs return identical data."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do preview tokens differ from delivery tokens in Contentful integrations?",
    "topic": "Preview versus published content",
    "choices": [
      "Preview tokens connect to the Content Preview API to access drafts, while delivery tokens connect to the Content Delivery API for published entries only.",
      "Preview tokens are public, whereas delivery tokens are strictly secret.",
      "Preview tokens expire every five minutes automatically.",
      "Delivery tokens require browser multi-factor authentication."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What role do Preview URLs play in headless CMS architectures like Next.js Preview Mode?",
    "topic": "Preview versus published content",
    "choices": [
      "They allow content editors to click a button in Contentful that opens a temporary staging route on your site, rendering draft content live in context.",
      "They automatically publish draft articles to production after ten minutes.",
      "They redirect broken links to the homepage.",
      "They generate XML sitemaps for search engines."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Next.js Preview Mode bypass static caching to render draft content from Contentful?",
    "topic": "Preview versus published content",
    "choices": [
      "By setting preview cookies that instruct Next.js to disable static generation for incoming requests and fetch fresh draft data on the fly.",
      "By deleting all static HTML files from the server hard drive.",
      "By forcing browsers to clear local storage databases.",
      "By restarting the Node.js server process."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What security precaution must be taken when implementing a preview API route in a JAMstack application?",
    "topic": "Preview versus published content",
    "choices": [
      "Verifying secret preview tokens and query parameters so unauthorized users cannot access unpublished or draft content.",
      "Hardcoding administrative passwords into client-side JavaScript components.",
      "Disabling HTTPS encryption on preview routes.",
      "Allowing public write access to the CMS database."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a content editor see stale data even after clicking 'Save Draft' in Contentful?",
    "topic": "Preview versus published content",
    "choices": [
      "Because draft views require fetching from the Preview API and disabling local browser or server preview caching layers.",
      "Because Contentful deletes draft entries automatically after one hour.",
      "Because drafts are compiled into static HTML files by default.",
      "Because the production CDN overrides draft tokens."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do webhooks integrate with preview and published content workflows?",
    "topic": "Preview versus published content",
    "choices": [
      "Webhooks notify your CI/CD pipeline or ISR endpoints when content is published, triggering automated site rebuilds or cache revalidation.",
      "Webhooks compile Sass stylesheets into minified CSS files.",
      "Webhooks manage browser cookie expiration dates.",
      "Webhooks replace the Content Delivery API entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when an editor clicks 'Publish' on an entry that references other unpublished draft entries?",
    "topic": "Preview versus published content",
    "choices": [
      "Contentful warns the editor or prevents publishing until referenced dependencies are also published, avoiding broken links on production.",
      "Contentful automatically publishes all related drafts without warning.",
      "The production site crashes with a 500 error.",
      "The unpublished references are deleted from the database."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle draft state indicators in frontend UI components when preview mode is active?",
    "topic": "Preview versus published content",
    "choices": [
      "By rendering a visual banner or notification indicating that the user is viewing draft preview mode with an option to exit.",
      "By locking the browser window to prevent scrolling.",
      "By hiding all content until the entry is officially published.",
      "By converting the page into a static PDF document."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is testing preview mode locally often more complex than testing production static builds?",
    "topic": "Preview versus published content",
    "choices": [
      "It requires coordinating local environment variables, preview access tokens, cookie domains, and API endpoints between Contentful and your local development server.",
      "Local development servers do not support JavaScript.",
      "Contentful blocks all preview requests originating from localhost.",
      "Preview mode requires a physical database server running on your computer."
    ],
    "answerIdx": 0
  }
]
do 3

LAYER: jamstack-6

JSON
[
  {
    "stem": "What is the primary architectural characteristic of a serverless function?",
    "topic": "Serverless function basics",
    "choices": [
      "It runs on-demand in ephemeral containers managed by a cloud provider, scaling down to zero when idle.",
      "It requires a dedicated virtual private server running 24/7 with manual scaling configurations.",
      "It executes entirely inside the user's browser as client-side JavaScript.",
      "It compiles into a desktop binary application for offline execution."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do serverless functions handle idle periods regarding infrastructure costs and resource allocation?",
    "topic": "Serverless function basics",
    "choices": [
      "They consume constant CPU cycles and memory regardless of incoming traffic.",
      "They incur hourly rental fees for underlying server hardware.",
      "They scale down to zero compute units when inactive, meaning you only pay for actual execution time.",
      "They automatically shut down and require manual re-deployment every 24 hours."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is cold start latency in the context of serverless functions?",
    "topic": "Serverless function basics",
    "choices": [
      "The time it takes to boot a new container instance when a function is invoked after a period of inactivity.",
      "The delay caused by browser DNS lookups during initial page loads.",
      "The time required to compile TypeScript code into JavaScript before deployment.",
      "The network latency between CDN edge nodes and client browsers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of the following is a standard use case for serverless functions in a JAMstack application?",
    "topic": "Serverless function basics",
    "choices": [
      "Rendering static HTML pages during build time.",
      "Handling dynamic backend tasks like payment processing, form handling, or secure API proxying.",
      "Managing local browser storage and session cookies.",
      "Compiling Sass stylesheets into minified CSS files."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How are serverless functions typically deployed and managed on platforms like Netlify?",
    "topic": "Serverless function basics",
    "choices": [
      "By uploading raw script files via FTP directly to a production Apache server.",
      "By placing function files in a designated directory (e.g., netlify/functions) where the CI/CD pipeline packages and deploys them automatically.",
      "By configuring manual cron jobs on a physical server rack.",
      "By writing serverless code inside browser developer console terminals."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a major limitation of serverless functions regarding persistent local state storage?",
    "topic": "Serverless function basics",
    "choices": [
      "They cannot write files to local disk storage reliably across different invocations because containers are ephemeral.",
      "They are restricted to using Python exclusively for backend logic.",
      "They cannot communicate with external REST APIs.",
      "They require an active connection to a local relational database."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are serverless functions often referred to as Function-as-a-Service (FaaS)?",
    "topic": "Serverless function basics",
    "choices": [
      "Because developers write individual functions that respond to specific events without managing server provisioning.",
      "Because they replace traditional frontend UI component frameworks.",
      "Because they execute exclusively on the client's local machine.",
      "Because they require manual configuration of Linux operating system kernels."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when multiple concurrent requests hit a serverless function simultaneously?",
    "topic": "Serverless function basics",
    "choices": [
      "The cloud provider automatically spins up multiple instances of the function in parallel to handle the load.",
      "All subsequent requests are dropped with a 503 error until the first request completes.",
      "Requests are queued sequentially and processed one by one on a single container.",
      "The server crashes due to thread deadlock exceptions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do event triggers initiate the execution of a serverless function?",
    "topic": "Serverless function basics",
    "choices": [
      "Through specific HTTP requests, database events, scheduled timers, or queue messages.",
      "By requiring a user to click a refresh button in the browser.",
      "By checking browser local storage every five seconds.",
      "By scanning physical hard drive directories."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the typical execution time limit (timeout) for standard serverless functions on cloud platforms?",
    "topic": "Serverless function basics",
    "choices": [
      "A few seconds to several minutes, after which the execution is forcefully terminated.",
      "Infinite execution time with no timeout restrictions.",
      "Exactly 24 hours per invocation.",
      "Milliseconds only, prohibiting any network requests."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you access incoming HTTP request parameters (like query strings or POST bodies) inside a JavaScript serverless function?",
    "topic": "Handling requests and responses",
    "choices": [
      "Through the request object parameters provided by the function runtime handler (e.g., event.queryStringParameters or req.body).",
      "By querying the browser window object directly.",
      "By reading local environment variables set in the terminal.",
      "By inspecting the HTML <head> metadata tags."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What format must the return value or response object be in when sending data back from an HTTP serverless function?",
    "topic": "Handling requests and responses",
    "choices": [
      "An object containing statusCode, headers, and a stringified body property.",
      "A raw binary image file stream.",
      "A compiled WebAssembly module.",
      "A plain text CSS stylesheet string."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP status code should a serverless function return to indicate successful processing of a request?",
    "topic": "Handling requests and responses",
    "choices": [
      "200 OK (or 201 Created for resource creation)",
      "400 Bad Request",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle different HTTP methods (GET, POST, PUT, DELETE) within a single serverless function endpoint?",
    "topic": "Handling requests and responses",
    "choices": [
      "By inspecting the HTTP method property on the request object (e.g., event.httpMethod) and branching logic accordingly.",
      "By creating separate physical folders for every HTTP verb.",
      "By writing custom routing expressions in gatsby-config.js.",
      "Serverless functions can only handle GET requests by default."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of setting Content-Type response headers in a serverless function?",
    "topic": "Handling requests and responses",
    "choices": [
      "To inform the client browser or API consumer about the media type of the returned payload (e.g., application/json).",
      "To encrypt the response body using SSL certificates.",
      "To compress the file size for faster network transfer.",
      "To bypass CORS security restrictions automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a serverless function respond when invalid input data is submitted by a client?",
    "topic": "Handling requests and responses",
    "choices": [
      "By returning a 400 Bad Request status code along with a descriptive error message in the response body.",
      "By crashing the server instance to trigger a restart.",
      "By returning a 200 OK status with empty null values.",
      "By redirecting the user to an external advertising site."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a serverless function throws an unhandled JavaScript exception during execution?",
    "topic": "Handling requests and responses",
    "choices": [
      "The cloud runtime catches the error and typically returns a 500 Internal Server Error response to the caller.",
      "The client browser automatically fixes the code bug and retries.",
      "The server restarts in maintenance mode permanently.",
      "The function falls back to static client-side rendering."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you parse a JSON string body sent in a POST request payload within a serverless function?",
    "topic": "Handling requests and responses",
    "choices": [
      "By passing the request body string into JSON.parse().",
      "By calling the built-in eval() function.",
      "By importing the XML parser library.",
      "By reading the body as a relational database table."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is proper header handling important when dealing with cross-origin requests (CORS) in serverless functions?",
    "topic": "Handling requests and responses",
    "choices": [
      "To explicitly allow or restrict which external frontend domains are permitted to call your serverless endpoint.",
      "To increase the execution timeout limit of the function.",
      "To compress outgoing JSON responses automatically.",
      "To authenticate administrative user accounts."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of query string parameters in a GET request handled by a serverless function?",
    "topic": "Handling requests and responses",
    "choices": [
      "To pass key-value pairs of filtering, searching, or pagination data to the function via the URL.",
      "To store private environment secrets securely.",
      "To define CSS layout styling rules.",
      "To manage browser cookie expiration dates."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must secret API keys (like Stripe secret keys or database credentials) never be used directly in client-side frontend code?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Because client-side code is publicly visible in browser developer tools, exposing secrets to malicious users.",
      "Because JavaScript engines throw syntax errors when encountering long strings.",
      "Because browsers cannot make network requests to external APIs.",
      "Because CDNs block requests containing authorization headers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do serverless functions enable calling external paid or private APIs securely from a static JAMstack site?",
    "topic": "Calling external APIs securely",
    "choices": [
      "The static frontend calls your serverless function, which holds the secret keys and securely queries the external API on the server side.",
      "The frontend encrypts keys using base64 encoding before sending requests.",
      "External APIs run inside the user's browser memory sandbox.",
      "Serverless functions eliminate the need for API keys entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What library or built-in method is commonly used inside Node.js serverless functions to make HTTP requests to external APIs?",
    "topic": "Calling external APIs securely",
    "choices": [
      "The native global fetch() function or libraries like axios.",
      "XMLHttpRequest objects managed by browser DOM nodes.",
      "jQuery.ajax() method calls.",
      "ActiveXObject network connections."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should you handle errors when an external third-party API fails or times out during a serverless function execution?",
    "topic": "Calling external APIs securely",
    "choices": [
      "By wrapping the external call in a try/catch block and returning a clean, friendly error response to the frontend.",
      "By letting the function crash without handling to trigger automatic user alerts.",
      "By retrying the failed request in an infinite while loop.",
      "By shutting down the hosting platform."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is API response sanitization in the context of serverless proxy functions?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Stripping out sensitive metadata or internal error stacks from third-party API responses before sending data back to the client frontend.",
      "Converting JSON responses into uppercase plain text strings.",
      "Compressing payloads into binary zip archives.",
      "Translating response languages into regional dialects."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is timeout handling critical when calling external APIs from a serverless function?",
    "topic": "Calling external APIs securely",
    "choices": [
      "If the external API hangs, the serverless function could hang and time out, leaving the client waiting indefinitely unless a timeout is enforced.",
      "To prevent external APIs from updating their database records.",
      "To ensure that all API requests complete in under one millisecond.",
      "To bypass CDN edge caching restrictions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you prevent abuse of your serverless proxy functions when calling external APIs?",
    "topic": "Calling external APIs securely",
    "choices": [
      "By implementing rate limiting, request validation, and user authentication checks inside the function.",
      "By making the function endpoint completely public and unencrypted.",
      "By hardcoding user IP addresses into the source code.",
      "By disabling all error logging."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the security risk of forwarding client input parameters directly into external API queries without validation?",
    "topic": "Calling external APIs securely",
    "choices": [
      "It can lead to injection vulnerabilities, malformed requests, or unexpected execution errors in downstream services.",
      "It speeds up execution times exponentially.",
      "It automatically encrypts the database schema.",
      "It disables browser caching layers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass authorization headers received from the client frontend through to an external API via a serverless function?",
    "topic": "Calling external APIs securely",
    "choices": [
      "By extracting the token from the incoming request headers and attaching it to the outgoing fetch request headers.",
      "By storing the token in browser local storage permanently.",
      "By appending the token to the URL query string in plain text.",
      "Serverless functions cannot forward request headers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might you cache external API responses inside a serverless function or KV store?",
    "topic": "Calling external APIs securely",
    "choices": [
      "To reduce latency, lower external API call volume, and stay within third-party rate limits.",
      "To increase the physical storage size of server hard drives.",
      "To prevent users from viewing web page content.",
      "To force external APIs to restart their servers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary purpose of environment variables in application development?",
    "topic": "Environment variables and secrets",
    "choices": [
      "To store configuration settings and sensitive secrets outside of source code, allowing different values per environment (dev, staging, prod).",
      "To compile JavaScript code into native machine binaries.",
      "To manage browser cookie expiration dates.",
      "To store static image assets and PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you access an environment variable named API_KEY inside a Node.js serverless function?",
    "topic": "Environment variables and secrets",
    "choices": [
      "process.env.API_KEY",
      "window.API_KEY",
      "global.env.API_KEY",
      "localStorage.getItem('API_KEY')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between build-time environment variables and runtime environment variables on platforms like Netlify?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Build-time variables are embedded into static assets during compilation, whereas runtime variables are accessible to serverless functions when invoked.",
      "Build-time variables are secret, while runtime variables are public.",
      "Runtime variables are ignored by serverless functions.",
      "There is no functional distinction between the two."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must secret API keys never be prefixed with public exposure identifiers (like NEXT_PUBLIC_ or GATSBY_)?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Because public prefixes instruct the bundler to expose those variables in client-side JavaScript bundles visible to users.",
      "Because they will cause serverless function compilation to fail.",
      "Because browsers reject variables starting with prefixes.",
      "Because it violates W3C HTML validation standards."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are environment variables typically configured for local development in a project?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Using a .env file (excluded from version control via .gitignore) loaded into process.env using tools like dotenv.",
      "Hardcoding keys directly into component source files.",
      "Storing secrets in public README markdown files.",
      "Writing credentials into CSS stylesheets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a required environment variable is missing (undefined) when a serverless function runs?",
    "topic": "Environment variables and secrets",
    "choices": [
      "The function may throw a runtime error or fail to authenticate with external services when attempting to use the undefined value.",
      "The cloud provider automatically generates a random placeholder key.",
      "The application falls back to client-side rendering mode.",
      "The browser displays a warning notification."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should .env files containing secret API keys never be committed to public Git repositories?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Anyone with repository access could steal your secret keys, potentially leading to unauthorized usage or financial loss.",
      "Git repositories throw compilation errors when detecting .env filenames.",
      "Public repositories automatically delete secret files.",
      "It slows down git clone operations."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do cloud hosting platforms (like Netlify or Vercel) inject environment variables into serverless functions in production?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Through the hosting provider's dashboard settings or CLI tools, which securely inject variables into the serverless container environment.",
      "By reading them from public HTML meta tags.",
      "By downloading .env files from client browsers.",
      "By querying a local SQLite file during startup."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of a .env.example file in a project repository?",
    "topic": "Environment variables and secrets",
    "choices": [
      "To serve as a template listing required environment variable names without exposing actual secret values, guiding other developers on setup.",
      "To store production database passwords securely.",
      "To compile JavaScript code into minified bundles.",
      "To manage CDN routing configurations."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you update an environment variable for a live production site deployed on a cloud platform?",
    "topic": "Environment variables and secrets",
    "choices": [
      "By updating the environment variables in the hosting provider's project settings panel and triggering a new build/deploy.",
      "By editing the local .env file on your personal laptop and refreshing the browser.",
      "By sending an email request to the domain registrar.",
      "By modifying the package.json dependencies array."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you handle HTML form submissions asynchronously on a static JAMstack site without a traditional backend server?",
    "topic": "Form submissions",
    "choices": [
      "By using JavaScript fetch() to submit form data to a serverless function or built-in form handling service (like Netlify Forms).",
      "By writing form data directly to the user's local disk drive.",
      "By using HTML5 mailto anchor links exclusively.",
      "By reloading the entire page via FTP upload."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is client-side form validation, and why is it used alongside serverless form processing?",
    "topic": "Form submissions",
    "choices": [
      "Validating input fields in the browser before submission to provide instant feedback to users, while server-side validation ensures security and data integrity.",
      "Encrypting user passwords before they reach the server.",
      "Preventing search engine crawlers from indexing form inputs.",
      "Compiling form elements into native mobile application buttons."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do built-in platform form handlers (like Netlify Forms) detect and process form submissions on static sites?",
    "topic": "Form submissions",
    "choices": [
      "The build system parses HTML forms with a netlify attribute and automatically sets up backend endpoint capture during deployment.",
      "Forms require a dedicated PHP server running continuously.",
      "Forms must be hardcoded inside gatsby-config.js plugins.",
      "Forms are processed entirely inside browser local storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What HTTP method is typically used when submitting form data securely to a serverless function endpoint?",
    "topic": "Form submissions",
    "choices": [
      "POST",
      "GET",
      "HEAD",
      "OPTIONS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a frontend application handle form submission loading and success states for a great user experience?",
    "topic": "Form submissions",
    "choices": [
      "By displaying loading spinners or disabling submit buttons during request processing, then showing a success confirmation message upon completion.",
      "By forcing the browser window to close immediately.",
      "By clearing all browser history data.",
      "By reloading the site from scratch."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Spam Protection (like honeypot fields or reCAPTCHA) used for in serverless form submissions?",
    "topic": "Form submissions",
    "choices": [
      "To prevent automated bots and spammers from flooding form endpoints with junk submissions.",
      "To compress form attachment files into smaller sizes.",
      "To encrypt form input data using SSL certificates.",
      "To speed up serverless function cold start times."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to uploaded file attachments (like resumes or images) submitted through an asynchronous form to a serverless function?",
    "topic": "Form submissions",
    "choices": [
      "They are parsed from multipart/form-data payloads, processed in memory or streaming buffers, and uploaded to cloud storage (like S3 or Cloudinary).",
      "They are stored permanently in browser local storage.",
      "They are converted into plain text strings inside JSON logs.",
      "They are deleted automatically for security compliance."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is server-side validation of form data crucial even if client-side validation is already implemented?",
    "topic": "Form submissions",
    "choices": [
      "Client-side validation can be bypassed by malicious users, so serverless functions must validate and sanitize all incoming data to protect backend systems.",
      "Client-side validation causes browser memory leaks.",
      "Serverless functions cannot execute without server validation.",
      "It eliminates the need for CSS styling."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle form submission errors (such as network failures or server validation errors) in the frontend UI?",
    "topic": "Form submissions",
    "choices": [
      "By catching rejected promises or error status codes in JavaScript and displaying clear error alert messages to the user.",
      "By letting the browser crash and restart the operating system.",
      "By refreshing the page infinitely until success occurs.",
      "By hiding the form permanently from the DOM."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of setting a custom success redirect or response message after a successful form submission?",
    "topic": "Form submissions",
    "choices": [
      "To provide clear feedback confirming that the submission was received and processed successfully.",
      "To redirect users to an external advertising partner site.",
      "To clear browser cookies and session tokens.",
      "To restart the production web server."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is rate limiting, and why is it implemented on APIs and serverless functions?",
    "topic": "Rate limits and errors",
    "choices": [
      "A technique to restrict the number of requests a client can make within a specified time window, preventing abuse, DDoS attacks, and API quota exhaustion.",
      "A method to speed up serverless function execution times.",
      "A protocol to compress JSON responses into smaller sizes.",
      "A tool to measure browser performance metrics."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP status code is standard for indicating that a client has exceeded rate limits?",
    "topic": "Rate limits and errors",
    "choices": [
      "429 Too Many Requests",
      "401 Unauthorized",
      "403 Forbidden",
      "503 Service Unavailable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What information does a Retry-After response header typically provide to a client?",
    "topic": "Rate limits and errors",
    "choices": [
      "The amount of time the client must wait before making a new request after hitting rate limits.",
      "The exact geographic location of the serverless function container.",
      "The expiration timestamp of the SSL certificate.",
      "The version number of the Node.js runtime."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a robust frontend application handle a 429 Too Many Requests error from a serverless endpoint?",
    "topic": "Rate limits and errors",
    "choices": [
      "By backing off, displaying a polite notice to the user, and avoiding aggressive request retries.",
      "By spamming the endpoint with requests until it succeeds.",
      "By crashing the application with a fatal exception.",
      "By clearing local storage databases."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is graceful error handling in serverless function development?",
    "topic": "Rate limits and errors",
    "choices": [
      "Catching unexpected errors, logging details securely on the server, and returning clean, standardized error payloads to the client without exposing internal stack traces.",
      "Ignoring all errors so the application never stops running.",
      "Displaying raw database query strings directly to end users.",
      "Restarting the browser whenever an API call fails."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of centralized error tracking services (like Sentry or LogRocket) in serverless architectures?",
    "topic": "Rate limits and errors",
    "choices": [
      "To capture, aggregate, and alert developers to runtime exceptions and errors occurring in production serverless functions.",
      "To compile JavaScript code into minified production bundles.",
      "To manage SSL certificate renewals automatically.",
      "To optimize raster image assets for CDN edge delivery."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a serverless function return a 502 Bad Gateway error?",
    "topic": "Rate limits and errors",
    "choices": [
      "When the serverless container receives an invalid or malformed response from an upstream server or external API.",
      "When the user enters an incorrect password in a login form.",
      "When the client browser loses internet connectivity.",
      "When the static HTML file is missing its closing tag."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do distributed denial-of-service (DDoS) attacks relate to API rate limiting?",
    "topic": "Rate limits and errors",
    "choices": [
      "Rate limiting helps mitigate DDoS and brute-force attacks by blocking clients that exceed normal request frequency thresholds.",
      "DDoS attacks are required for rate limiters to function correctly.",
      "Rate limiting guarantees 100% immunity against all cyber threats.",
      "DDoS attacks eliminate the need for serverless functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of not catching errors inside asynchronous Promise chains within serverless functions?",
    "topic": "Rate limits and errors",
    "choices": [
      "It can result in unhandled promise rejections, causing unpredictable function behavior or unhandled execution crashes.",
      "It speeds up JavaScript execution times.",
      "It automatically resolves the promise with positive data.",
      "It disables browser garbage collection."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should error messages sent back to clients from serverless functions avoid exposing raw database connection strings or internal file paths?",
    "topic": "Rate limits and errors",
    "choices": [
      "To prevent information disclosure vulnerabilities that attackers could exploit to compromise infrastructure security.",
      "Because browsers cannot render raw strings containing file paths.",
      "Because database strings slow down network transmission speeds.",
      "To comply with CSS stylesheet formatting rules."
    ],
    "answerIdx": 0
  }
]
next

LAYER: jamstack-7

JSON
[
  {
    "stem": "What is the primary purpose of Identity providers in modern web application architectures?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "To securely authenticate users, manage credentials, and issue tokens, offloading user management from the core application backend.",
      "To compile JavaScript code into minified production bundles.",
      "To manage CDN edge routing tables and SSL certificates.",
      "To store static image assets and PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does OAuth 2.0 function as an authorization framework?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "It enables a third-party application to obtain limited access to an HTTP service on behalf of a resource owner without exposing user passwords.",
      "It replaces HTML as the primary markup language for structuring web pages.",
      "It compiles relational database schemas into JSON data files.",
      "It manages client-side CSS styling rules and layout grids."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between authentication and authorization?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "Authentication verifies who a user is, whereas authorization determines what resources and actions a verified user is permitted to access.",
      "Authentication manages database tables, while authorization handles serverless function deployments.",
      "Authentication runs on the client side, whereas authorization runs exclusively at CDN edge nodes.",
      "There is no functional distinction between the two terms."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of an authorization code grant flow in OAuth 2.0 implementations?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "To securely exchange an authorization code for an access token via a backend server or secure channel, preventing token exposure in the browser URL.",
      "To store user passwords in plain text inside browser local storage.",
      "To compress JSON responses into binary zip archives.",
      "To bypass CORS security restrictions automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are third-party identity providers (like Auth0, Netlify Identity, or Firebase Auth) commonly chosen for JAMstack projects?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "They handle complex security requirements, password hashing, multi-factor auth, and token generation so developers do not have to build auth from scratch.",
      "They eliminate the need for any JavaScript in frontend applications.",
      "They convert React components into PHP server scripts.",
      "They provide free physical server hardware for database hosting."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is OpenID Connect (OIDC) in relation to OAuth 2.0?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "An identity layer built on top of OAuth 2.0 that provides standardized user profile information via ID tokens.",
      "A database query language for fetching user records.",
      "A CSS preprocessor designed for mobile viewports.",
      "A protocol for compressing static image assets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What security risk does the OAuth 2.0 Implicit Grant flow present for single-page applications?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "It exposes access tokens directly in the browser URL fragment, making them vulnerable to leakage via browser history or malicious extensions.",
      "It requires a dedicated SQL database running on the client machine.",
      "It forces servers to store passwords in plain text.",
      "It prevents users from logging out of applications."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do social login integrations (like 'Log in with Google' or 'GitHub') operate under the hood?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "They leverage OAuth 2.0 and OIDC protocols to authenticate users against external providers and grant tokens to your app upon consent.",
      "They share user plaintext passwords directly with your application database.",
      "They execute background shell commands on your production server.",
      "They bypass authentication checks entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of state parameters in OAuth 2.0 authorization requests?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "To prevent Cross-Site Request Forgery (CSRF) attacks by passing a unique random token that is verified upon callback redirection.",
      "To store user shopping cart items locally in browser storage.",
      "To track page view analytics for search engine optimization.",
      "To define CSS layout styling rules."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when an identity provider's access token expires during a user's active session?",
    "topic": "Identity providers and OAuth",
    "choices": [
      "The application typically uses a refresh token to request a new access token seamlessly or prompts the user to re-authenticate.",
      "The browser closes all active tabs automatically.",
      "The application deletes all database records permanently.",
      "The server restarts in maintenance mode."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a standard user login and signup workflow in a JAMstack application integrated with Netlify Identity?",
    "topic": "Login and signup flows",
    "choices": [
      "Using client-side widget SDKs or API calls to authenticate users, store resulting tokens, and update UI state accordingly.",
      "Writing raw SQL insert statements into browser local storage.",
      "Redirecting users to FTP servers for credential verification.",
      "Submitting passwords via plain text HTTP GET requests."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is email confirmation or verification recommended during user signup flows?",
    "topic": "Login and signup flows",
    "choices": [
      "To ensure that the user owns the provided email address, preventing fake registrations and spam accounts.",
      "To compile JavaScript code into minified production bundles.",
      "To compress image assets for CDN edge delivery.",
      "To speed up serverless function cold start times."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do password-reset flows typically operate securely in web applications?",
    "topic": "Login and signup flows",
    "choices": [
      "By sending a time-sensitive, cryptographically secure token link via email, allowing the user to submit a new password to a verified endpoint.",
      "By displaying the user's current password in plain text on screen.",
      "By resetting the database without user consent.",
      "By storing new passwords in browser cookies."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is client-side state management regarding user login sessions in JAMstack frontends?",
    "topic": "Login and signup flows",
    "choices": [
      "Storing active authentication status, user profile data, and tokens in React state or context so UI components can adapt dynamically.",
      "Writing user passwords directly into HTML meta tags.",
      "Saving session tokens inside CSS stylesheet files.",
      "Transmitting credentials through public DNS records."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a user logout flow clean up active authentication sessions?",
    "topic": "Login and signup flows",
    "choices": [
      "By revoking tokens on the server/identity provider, clearing local storage or auth cookies, and resetting frontend user state to null.",
      "By deleting the application source code from the git repository.",
      "By shutting down the client browser operating system.",
      "By restarting the CDN edge nodes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of form validation on login and signup input fields?",
    "topic": "Login and signup flows",
    "choices": [
      "To ensure email formatting is correct and passwords meet minimum strength requirements before submitting to auth APIs.",
      "To compress form attachment files into smaller sizes.",
      "To encrypt database tables using AES-256 encryption.",
      "To generate automated XML sitemaps for SEO."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a user enters incorrect credentials during a login attempt?",
    "topic": "Login and signup flows",
    "choices": [
      "The authentication API returns an error status code (e.g., 400 or 401), and the frontend displays a polite login failure message.",
      "The application automatically creates a new account for the user.",
      "The server crashes and displays a 500 error page.",
      "The user's browser local storage is wiped clean."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should login and signup forms be submitted exclusively over HTTPS encrypted connections?",
    "topic": "Login and signup flows",
    "choices": [
      "To intercept and prevent plaintext passwords and tokens from being intercepted by malicious actors on the network.",
      "To speed up DNS lookup resolution times.",
      "To satisfy CSS stylesheet validation standards.",
      "To enable client-side video streaming."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Multi-Factor Authentication (MFA) and why is it added to login flows?",
    "topic": "Login and signup flows",
    "choices": [
      "Requiring an additional verification step (like a TOTP code or SMS prompt) beyond just a password, significantly increasing account security.",
      "Requiring users to log in through multiple different browsers simultaneously.",
      "Allowing multiple users to share a single account password.",
      "Splitting password strings across multiple database tables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do single sign-on (SSO) login flows improve enterprise user management?",
    "topic": "Login and signup flows",
    "choices": [
      "By allowing users to log in once with corporate credentials to access multiple authorized applications without separate passwords.",
      "By forcing users to remember a unique password for every individual page.",
      "By eliminating the need for any authentication tokens.",
      "By storing passwords in public markdown files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a JSON Web Token (JWT) and what are its three main structural parts?",
    "topic": "JWT and session handling",
    "choices": [
      "A compact, URL-safe token format consisting of a Header, a Payload, and a Signature separated by dots.",
      "A relational database table containing Username, Password, and Timestamp columns.",
      "A CSS styling sheet containing Selector, Property, and Value blocks.",
      "An XML configuration file containing Namespace, Schema, and Root elements."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can JWT signatures be trusted by receiving servers without querying a database?",
    "topic": "JWT and session handling",
    "choices": [
      "Because the signature is cryptographically signed using a secret key or private key by the issuer, allowing the server to verify integrity mathematically.",
      "Because JWTs are encrypted with military-grade keys that cannot be read by users.",
      "Because browsers validate tokens automatically before rendering pages.",
      "Because databases check token validity on every keystroke."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should sensitive JWT access tokens or refresh tokens ideally be stored in frontend web applications for security?",
    "topic": "JWT and session handling",
    "choices": [
      "In HttpOnly, Secure, SameSite cookies to protect against Cross-Site Scripting (XSS) token theft.",
      "In window.localStorage for easy JavaScript access across components.",
      "In public HTML meta tags for search engine inspection.",
      "In unencrypted browser session storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What information is typically stored inside the payload of a JWT?",
    "topic": "JWT and session handling",
    "choices": [
      "Claims about the user (such as user ID, email, roles, and expiration timestamps) represented as JSON.",
      "Plaintext passwords and credit card security numbers.",
      "Compiled JavaScript component bytecode.",
      "Serverless function execution logs and environment secrets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the exp (expiration time) claim in a JWT payload?",
    "topic": "JWT and session handling",
    "choices": [
      "To specify the exact timestamp after which the token is invalid and must be rejected by servers.",
      "To define how long the browser should cache static HTML pages.",
      "To set the timeout limit for serverless function execution.",
      "To track the creation date of the user account."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a user alters a single character of a JWT payload inside their browser storage?",
    "topic": "JWT and session handling",
    "choices": [
      "The cryptographic signature verification will fail on the server, resulting in an invalid token error.",
      "The server automatically corrects the character and logs the user in.",
      "The token expiration time is extended by 24 hours.",
      "The browser restarts in maintenance mode."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do stateless session handling models using JWTs differ from traditional server-side session stores?",
    "topic": "JWT and session handling",
    "choices": [
      "Stateless JWTs contain all necessary session claims within the token itself, eliminating the need for servers to query a session database on every request.",
      "Stateless tokens require dedicated database servers running 24/7.",
      "Traditional sessions run entirely inside client browser local storage.",
      "Stateless tokens cannot be validated by serverless functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the security risk of storing JWT access tokens in window.localStorage?",
    "topic": "JWT and session handling",
    "choices": [
      "Any malicious JavaScript script running on the page (via XSS vulnerabilities) can read localStorage and steal the token.",
      "It causes browser memory leaks during component mounting.",
      "It prevents serverless functions from receiving HTTP requests.",
      "It violates W3C HTML validation standards."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do refresh tokens differ from access tokens in session management?",
    "topic": "JWT and session handling",
    "choices": [
      "Access tokens are short-lived and used to authenticate API requests, while refresh tokens are long-lived and used solely to request new access tokens securely.",
      "Access tokens are stored in databases, while refresh tokens live in CSS files.",
      "Refresh tokens expire every ten seconds automatically.",
      "Access tokens are public, whereas refresh tokens are encrypted in the browser."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must servers always verify the cryptographic signature and expiration of a JWT before trusting its claims?",
    "topic": "JWT and session handling",
    "choices": [
      "Because anyone can decode and read JWT payloads, verification ensures the token was genuinely issued by an authorized server and has not expired or been tampered with.",
      "To speed up serverless function cold start times.",
      "To compress JSON response payloads for faster network transfer.",
      "To prevent browsers from caching static image assets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you protect client-side routes (e.g., in a Next.js or Gatsby app) so unauthorized users cannot view private pages?",
    "topic": "Protecting routes and content",
    "choices": [
      "By checking user authentication state in route wrappers or layout components, redirecting unauthenticated users to the login page.",
      "By storing private pages in hidden local folders on the user's computer.",
      "By hiding route links using CSS display: none properties.",
      "By deleting source code files from git repositories."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is client-side route protection alone insufficient for securing sensitive data in a JAMstack application?",
    "topic": "Protecting routes and content",
    "choices": [
      "Because JavaScript running in the browser can be manipulated, meaning actual data fetching must also be protected and authorized on the server/API side.",
      "Because client-side routes cannot render React components.",
      "Because CDNs block client-side JavaScript execution.",
      "Because search engine crawlers ignore client-side authentication."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of conditional rendering in UI components based on user authentication status?",
    "topic": "Protecting routes and content",
    "choices": [
      "To display personalized navigation items (like 'Logout' or 'Dashboard') for logged-in users and 'Login' buttons for guests.",
      "To compile JSX markup into WebAssembly binaries.",
      "To manage CDN edge caching invalidation rules.",
      "To compress image assets for faster loading."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do protected API routes or serverless functions verify user authorization before returning private data?",
    "topic": "Protecting routes and content",
    "choices": [
      "By inspecting and verifying the JWT or session token passed in the Authorization request header.",
      "By checking the user's computer IP address against public DNS records.",
      "By reading browser cookies stored in the user's local disk drive.",
      "By requiring users to solve a CAPTCHA challenge."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when an unauthenticated user attempts to access a protected serverless API endpoint directly via URL?",
    "topic": "Protecting routes and content",
    "choices": [
      "The serverless function rejects the request with a 401 Unauthorized or 403 Forbidden status code.",
      "The server automatically creates a guest user account.",
      "The application redirects the user to the homepage with cached data.",
      "The server crashes with a 500 internal error."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you handle loading states while checking authentication status on protected client routes?",
    "topic": "Protecting routes and content",
    "choices": [
      "By displaying a loading spinner or skeleton screen while auth state resolves, preventing flickering or premature redirects.",
      "By pausing browser execution with a synchronous while loop.",
      "By deleting the page DOM elements until login completes.",
      "By refreshing the browser window every second."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of React Context or global state providers in managing protected route access across component trees?",
    "topic": "Protecting routes and content",
    "choices": [
      "To provide a centralized authentication store (user object, tokens, login/logout functions) accessible to any child component.",
      "To compile React components into native mobile applications.",
      "To manage CSS stylesheet loading orders.",
      "To execute background database migrations."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should sensitive data never be embedded directly into statically pre-rendered HTML pages if those pages are meant to be private?",
    "topic": "Protecting routes and content",
    "choices": [
      "Because static HTML files are cached publicly on CDNs, exposing private data to anyone who requests the file URL.",
      "Because browsers cannot parse HTML containing private variables.",
      "Because static files throw JavaScript syntax errors.",
      "Because search engine crawlers will delete the files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle redirects gracefully when a protected page detects an expired user session?",
    "topic": "Protecting routes and content",
    "choices": [
      "By capturing the current attempted URL destination in query parameters (e.g., ?from=/dashboard) so the user can be redirected back after logging in.",
      "By closing the user's browser application permanently.",
      "By clearing all computer operating system files.",
      "By displaying a 404 error page without explanation."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the security implication of client-side-only route protection in SPAs regarding SEO and content scraping?",
    "topic": "Protecting routes and content",
    "choices": [
      "If data is fetched client-side after auth checks, unauthorized crawlers see empty states, but if data is bundled into JS, scrapers might inspect source code.",
      "It guarantees 100% security against all forms of data theft.",
      "It forces search engines to index private user records automatically.",
      "It eliminates the need for any backend server logic."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Role-Based Access Control (RBAC) in web application security?",
    "topic": "Roles and gated pages",
    "choices": [
      "An approach restricting system access based on assigned user roles (e.g., Admin, Editor, Subscriber), granting permissions accordingly.",
      "A method for sorting database rows alphabetically by username.",
      "A protocol for assigning CSS styles to HTML elements.",
      "A technique for optimizing serverless function cold start times."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do roles get embedded into user sessions and tokens?",
    "topic": "Roles and gated pages",
    "choices": [
      "As role claims (e.g., roles: ['admin']) included within the JWT payload or user metadata object returned by the identity provider.",
      "As plain text comments inside CSS stylesheets.",
      "As hardcoded variables in client-side HTML meta tags.",
      "As environment secrets stored in git commit logs."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you implement gated pages that are accessible exclusively to users with an 'admin' role?",
    "topic": "Roles and gated pages",
    "choices": [
      "By verifying both user authentication and checking if the user's roles array includes 'admin' in route wrappers or serverless endpoints.",
      "By hiding the navigation link using CSS opacity: 0.",
      "By naming the page file admin-locked.js.",
      "By storing admin credentials in browser local storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between role-based access control and permission-based access control?",
    "topic": "Roles and gated pages",
    "choices": [
      "RBAC assigns permissions to groups of users via roles, whereas permission-based access grants granular individual rights directly to users.",
      "RBAC runs on client browsers, while permission-based control runs on CDNs.",
      "There is no functional distinction between the two terms.",
      "RBAC is restricted to SQL databases only."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must role verification checks be enforced on the server/API side in addition to frontend UI gating?",
    "topic": "Roles and gated pages",
    "choices": [
      "Because frontend UI checks can be bypassed by users modifying client code, so backend endpoints must validate role claims before processing sensitive mutations.",
      "Because browsers cannot read roles from JWT payloads.",
      "Because CDN edge servers require server-side role validation.",
      "To eliminate the need for frontend routing components."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What HTTP status code should a serverless function return if an authenticated user attempts to access an admin-only endpoint without the required role?",
    "topic": "Roles and gated pages",
    "choices": [
      "403 Forbidden",
      "401 Unauthorized",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle multi-tenant user access where users belong to distinct organizations or teams?",
    "topic": "Roles and gated pages",
    "choices": [
      "By including organization IDs (orgId) in user tokens and validating that requested resources belong to the user's active organization.",
      "By creating separate relational databases for every individual user.",
      "By storing organization passwords in public markdown files.",
      "By routing all traffic through a single global server."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of custom user metadata fields in identity providers?",
    "topic": "Roles and gated pages",
    "choices": [
      "To store application-specific user attributes (such as subscription tier, preferences, or organization IDs) alongside auth records.",
      "To compile JavaScript code into minified bundles.",
      "To manage CDN caching invalidation rules.",
      "To store static image assets and PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you dynamically render administrative management tools in a frontend UI for admin users only?",
    "topic": "Roles and gated pages",
    "choices": [
      "By checking user.roles.includes('admin') in JavaScript before rendering the admin component markup.",
      "By hardcoding admin buttons into static HTML files.",
      "By writing custom SQL queries inside CSS stylesheets.",
      "By disabling browser JavaScript execution for non-admins."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What security risk occurs if role claims are trusted blindly by the frontend without server-side cryptographic signature validation?",
    "topic": "Roles and gated pages",
    "choices": [
      "Users could tamper with local user state or mock JWT payloads to falsely grant themselves admin privileges.",
      "The browser will experience memory leaks during rendering.",
      "The CDN will block all incoming HTTP traffic.",
      "Search engine crawlers will delete the site sitemap."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must serverless functions validate incoming authentication tokens when called from a frontend application?",
    "topic": "Securing serverless calls",
    "choices": [
      "To ensure that only legitimate, authenticated users can execute backend logic and database mutations.",
      "To speed up container cold start times.",
      "To compress JSON response payloads into binary formats.",
      "To bypass CORS restrictions automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a serverless function extract the user's authentication token from an incoming fetch request?",
    "topic": "Securing serverless calls",
    "choices": [
      "By reading the Authorization header (e.g., Bearer <token>) or parsing secure HTTP-only cookies sent with the request.",
      "By querying the browser window object directly.",
      "By reading local environment variables set in the terminal.",
      "By inspecting HTML <head> metadata tags."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of verifying token signatures inside serverless functions?",
    "topic": "Securing serverless calls",
    "choices": [
      "To confirm that the token was issued by your trusted identity provider and has not been forged or altered by a malicious client.",
      "To encrypt database tables using AES-256 encryption.",
      "To compile TypeScript code into JavaScript before execution.",
      "To generate automated XML sitemaps for search engine indexing."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What HTTP response status should a serverless function return if the Authorization header is missing or contains an invalid token?",
    "topic": "Securing serverless calls",
    "choices": [
      "401 Unauthorized",
      "403 Forbidden",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass authentication tokens from a React frontend fetch call to a serverless function?",
    "topic": "Securing serverless calls",
    "choices": [
      "By including headers: { 'Authorization': `Bearer ${token}` } in the fetch options object.",
      "By storing tokens in CSS stylesheet files.",
      "By appending tokens to the URL query string in plain text.",
      "Serverless calls cannot accept authentication headers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the security risk of including sensitive user tokens in the URL query string of a serverless call?",
    "topic": "Securing serverless calls",
    "choices": [
      "Tokens in URLs get logged in server access logs, proxy servers, and browser history, exposing them to unauthorized parties.",
      "It speeds up execution times exponentially.",
      "It automatically encrypts the database schema.",
      "It disables CDN edge caching layers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can middleware or wrapper functions simplify security checks across multiple serverless endpoints?",
    "topic": "Securing serverless calls",
    "choices": [
      "By extracting token verification and role checking into a reusable wrapper function, keeping endpoint code DRY and secure.",
      "By deleting unnecessary files from the project repository.",
      "By forcing servers to run on physical hardware racks.",
      "By eliminating the need for environment variables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a serverless function attempts to decode a JWT without verifying its cryptographic signature?",
    "topic": "Securing serverless calls",
    "choices": [
      "It opens the application to severe security vulnerabilities, as attackers could forge arbitrary token payloads to impersonate administrators.",
      "The function executes twice as fast in the cloud container.",
      "The cloud provider automatically validates the signature anyway.",
      "The browser throws a runtime syntax exception."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should serverless functions validate request body data even after confirming the user is authenticated?",
    "topic": "Securing serverless calls",
    "choices": [
      "Authentication proves who the user is, but data validation ensures that submitted payloads are well-formed and safe against injection or malformed data bugs.",
      "Because authenticated users are incapable of making mistakes.",
      "Because serverless functions cannot process JSON without validation.",
      "To comply with CSS stylesheet formatting rules."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do environment secrets (like JWT signing keys or API secrets) get securely accessed inside secured serverless functions?",
    "topic": "Securing serverless calls",
    "choices": [
      "Via process.env variables injected securely by the cloud hosting platform during runtime execution.",
      "By reading them from public HTML meta tags in the browser.",
      "By downloading .env files from client browsers.",
      "By querying a local SQLite file during startup."
    ],
    "answerIdx": 0
  }
]
do

LAYER: jamstack-8

JSON
[
  {
    "stem": "What do Core Web Vitals measure in the context of web performance?",
    "topic": "Core Web Vitals",
    "choices": [
      "User-centric performance metrics focusing on loading performance, interactivity, and visual stability.",
      "Server CPU utilization rates during database query execution.",
      "The total number of CSS stylesheets loaded in the document head.",
      "The speed of DNS resolution across global domain registrars."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which metric evaluates loading performance by measuring when the main content of a page has likely loaded?",
    "topic": "Core Web Vitals",
    "choices": [
      "Largest Contentful Paint (LCP)",
      "First Input Delay (FID)",
      "Cumulative Layout Shift (CLS)",
      "Time to First Byte (TTFB)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Cumulative Layout Shift (CLS) measure on a web page?",
    "topic": "Core Web Vitals",
    "choices": [
      "The amount of unexpected layout shift of visible elements during the entire lifespan of the page.",
      "The time it takes for a user to click a button after page load.",
      "The total bytes transferred over the network during compilation.",
      "The speed at which images are compressed into WebP formats."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are Core Web Vitals important for JAMstack applications?",
    "topic": "Core Web Vitals",
    "choices": [
      "They serve as ranking signals for search engines and directly impact user experience and conversion rates.",
      "They eliminate the need for any CSS styling files.",
      "They force browsers to execute JavaScript in parallel worker threads.",
      "They automatically generate XML sitemaps for SEO indexing."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Interaction to Next Paint (INP) designed to measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "A page's overall responsiveness to user interactions by observing the latency of all click, tap, and keyboard events.",
      "The time it takes to render the first frame of a video animation.",
      "The duration of serverless function cold start invocations.",
      "The frequency of CDN edge cache invalidation requests."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can large hero images negatively impact your Largest Contentful Paint (LCP) score?",
    "topic": "Core Web Vitals",
    "choices": [
      "Unoptimized, heavy images take longer to download and render, delaying the paint time of the main page element.",
      "They cause unexpected layout shifts across sibling elements.",
      "They block JavaScript execution threads in the browser.",
      "They increase database query response times on the server."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common cause of poor Cumulative Layout Shift (CLS) scores on static sites?",
    "topic": "Core Web Vitals",
    "choices": [
      "Images or ads loaded without explicit width and height attributes, causing content to jump when they finish loading.",
      "Using CSS flexbox instead of floating elements for layout grids.",
      "Hosting static assets on CDN edge nodes.",
      "Enabling client-side route transitions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do tools like Lighthouse measure Core Web Vitals accurately during an audit?",
    "topic": "Core Web Vitals",
    "choices": [
      "By simulating a mobile device on a throttled network connection and recording performance metrics throughout page load.",
      "By analyzing source code files stored in git commit logs.",
      "By counting the total number of lines of JavaScript in node_modules.",
      "By querying third-party REST APIs for real-time user metrics."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of tracking Field Data (Real User Monitoring) alongside Lab Data (Lighthouse audits) for Core Web Vitals?",
    "topic": "Core Web Vitals",
    "choices": [
      "Field data reflects actual performance experiences of real users across diverse devices and network conditions in the wild.",
      "Field data is generated instantly during local development builds.",
      "Field data eliminates the need for serverless function error logging.",
      "Field data compiles React components into WebAssembly binaries."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does optimizing Time to First Byte (TTFB) improve Core Web Vitals?",
    "topic": "Core Web Vitals",
    "choices": [
      "A faster TTFB ensures that HTML document bytes arrive at the browser quickly, initiating the rendering pipeline sooner.",
      "It compresses raster images into vector PDFs automatically.",
      "It prevents Cumulative Layout Shift on mobile viewports.",
      "It eliminates the need for client-side state management."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is asset optimization (images, fonts, scripts) critical for JAMstack performance?",
    "topic": "Image and asset optimization",
    "choices": [
      "Smaller asset sizes reduce network transfer times, speeding up page load performance and Core Web Vitals scores.",
      "It allows developers to write CSS code in TypeScript files.",
      "It prevents browsers from caching static HTML files.",
      "It forces search engine crawlers to index hidden keywords."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do modern image formats like WebP and AVIF improve web performance compared to older formats?",
    "topic": "Image and asset optimization",
    "choices": [
      "They offer superior compression algorithms, resulting in significantly smaller file sizes without sacrificing visual quality.",
      "They automatically convert raster images into interactive 3D models.",
      "They allow images to be edited directly in browser developer tools.",
      "They remove the need for alt text attributes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of responsive image srcsets in HTML markup?",
    "topic": "Image and asset optimization",
    "choices": [
      "To allow browsers to download an image resolution appropriate for the user's screen size and pixel density.",
      "To encrypt image metadata for security compliance.",
      "To store backup copies of images in browser local storage.",
      "To trigger serverless function cold starts on demand."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does self-hosting web fonts using next/font or similar tools improve performance over external stylesheet links?",
    "topic": "Image and asset optimization",
    "choices": [
      "It eliminates external network roundtrips to font providers during page load and prevents layout shifts.",
      "It converts font files into executable binary machine code.",
      "It forces browsers to use fixed-width monospace fonts exclusively.",
      "It reduces the physical storage size of server hard drives."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is tree shaking in the context of JavaScript bundle optimization?",
    "topic": "Image and asset optimization",
    "choices": [
      "A dead-code elimination technique that removes unused exported functions from production bundles during build compilation.",
      "A method for shaking mobile devices to trigger layout refreshes.",
      "A protocol for compressing image assets at the CDN edge.",
      "A database cleanup routine for removing stale user records."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does CSS minification and purging improve performance?",
    "topic": "Image and asset optimization",
    "choices": [
      "Minification strips whitespace and comments, while purging removes unused CSS rules, reducing overall stylesheet file size.",
      "It converts CSS selectors into relational database tables.",
      "It allows stylesheets to execute in parallel worker threads.",
      "It encrypts CSS properties for security protection."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of leveraging Gzip or Brotli compression at the CDN edge level?",
    "topic": "Image and asset optimization",
    "choices": [
      "It compresses text-based assets (HTML, CSS, JS) before transmission, reducing download bandwidth and transfer speeds.",
      "It automatically translates web pages into local regional languages.",
      "It manages SSL certificate renewals for custom domain names.",
      "It compiles React components into static HTML files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should unnecessary third-party JavaScript scripts (like heavy analytics or widgets) be audited and optimized?",
    "topic": "Image and asset optimization",
    "choices": [
      "Excessive third-party scripts block the main thread, delay interactivity, and degrade performance scores.",
      "Third-party scripts automatically delete database tables.",
      "They prevent browsers from rendering CSS stylesheets.",
      "They cause serverless functions to time out."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of caching headers (like Cache-Control: max-age) in asset optimization?",
    "topic": "Image and asset optimization",
    "choices": [
      "To instruct browsers and CDNs to store static assets locally for extended periods, avoiding redundant network requests.",
      "To set the maximum execution timeout for serverless functions.",
      "To define password expiration rules for user accounts.",
      "To restrict page access to authorized administrators only."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does content hashing (e.g., app.a1b2c3.js) assist with efficient asset caching and updates?",
    "topic": "Image and asset optimization",
    "choices": [
      "When file content changes, its hash changes, generating a new filename that forces browsers to download the fresh asset while older versions remain cached.",
      "It encrypts source code to protect against theft.",
      "It compresses JavaScript bundles into binary zip files.",
      "It automatically updates database records during builds."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is code splitting in modern JavaScript frameworks?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "Splitting your application bundle into smaller chunks that can be loaded on demand rather than downloading everything upfront.",
      "Dividing code repositories across multiple Git hosting providers.",
      "Separating HTML markup from CSS styling files.",
      "Compiling JavaScript code into multiple regional languages."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does route-based code splitting improve initial page load performance?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "Users only download the JavaScript code required for the specific page they are visiting, reducing initial payload size.",
      "It compiles pages entirely inside the user's browser local storage.",
      "It eliminates the need for CDN edge caching layers.",
      "It forces search engine crawlers to index pages faster."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of React.lazy() and Suspense in component loading optimization?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "To load component code dynamically and asynchronously only when rendered, displaying a fallback UI in the interim.",
      "To fetch external data from REST APIs during server builds.",
      "To manage global user authentication tokens securely.",
      "To compress image assets into WebP formats."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is lazy loading for images and below-the-fold content?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "Deferring the loading of images and resources outside the initial viewport until the user scrolls near them.",
      "Loading all assets immediately upon server startup.",
      "Pausing browser execution until network connections stabilize.",
      "Encrypting image metadata before rendering DOM nodes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of over-splitting code into excessively tiny JavaScript chunks?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "The overhead of making numerous small network requests can outweigh the benefits of smaller bundle sizes, hurting performance.",
      "It causes database connection pools to overflow.",
      "It prevents browsers from parsing HTML documents.",
      "It disables client-side routing entirely."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do modern bundlers (like Webpack, Vite, or Turbopack) handle code splitting automatically?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "By recognizing dynamic import() statements and splitting code chunks accordingly during build compilation.",
      "By converting JavaScript code into PHP server scripts.",
      "By storing source files in browser local storage databases.",
      "By requiring manual configuration of every single function."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is dynamic import syntax (import()) used for in frontend applications?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "To load modules asynchronously on demand rather than statically at the top of the file.",
      "To import CSS stylesheets into HTML <head> tags.",
      "To connect serverless functions to relational databases.",
      "To define environment variables in .env files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does lazy loading components impact First Contentful Paint (FCP) and Time to Interactive (TTI)?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "It improves metrics by reducing initial JS parsing and download overhead, allowing the main thread to become interactive sooner.",
      "It delays page rendering until all components finish downloading.",
      "It increases server CPU utilization during builds.",
      "It forces browsers to execute code in sequential order."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of loading fallback UI states during component lazy loading?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "To provide visual feedback (like spinners or skeleton placeholders) while the requested component chunk downloads over the network.",
      "To prevent browsers from displaying error logs.",
      "To encrypt component props before rendering.",
      "To manage user authentication session cookies."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should critical above-the-fold components be excluded from aggressive lazy loading?",
    "topic": "Code splitting and lazy loading",
    "choices": [
      "Critical components needed immediately on initial render should load synchronously to prevent layout delays and poor LCP scores.",
      "Lazy loading is forbidden for React functional components.",
      "Critical components cannot be compiled into JavaScript bundles.",
      "Browsers block asynchronous imports for root elements."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is structured data (Schema.org / JSON-LD) and how does it enhance SEO?",
    "topic": "Structured data and meta tags",
    "choices": [
      "A standardized format of providing explicit clues about the meaning of a page to help search engines generate rich snippets.",
      "A database schema migration tool for relational SQL tables.",
      "A styling language that replaces CSS for layout structuring.",
      "A security protocol for validating API response headers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are Open Graph (OG) and Twitter Card meta tags essential for social sharing?",
    "topic": "Structured data and meta tags",
    "choices": [
      "They control how titles, descriptions, and preview images appear when links are shared on social media platforms.",
      "They dictate browser tab tooltip colors.",
      "They encrypt sensitive form data submitted by users.",
      "They speed up image download times on mobile viewports."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the <title> tag and meta description in SEO optimization?",
    "topic": "Structured data and meta tags",
    "choices": [
      "They provide search engines and users with the primary page title and summary snippet displayed on search engine result pages.",
      "They store configuration settings for serverless function deployments.",
      "They manage CDN edge caching invalidation rules.",
      "They compile JSX markup into static HTML files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do canonical link tags prevent duplicate content penalties in SEO?",
    "topic": "Structured data and meta tags",
    "choices": [
      "By specifying the master preferred URL for a page when identical content is accessible via multiple query paths.",
      "By linking external CSS stylesheets to the main application root.",
      "By directing mobile users to appropriate subdomains.",
      "By verifying domain ownership with search engine webmaster tools."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is server-side pre-rendering crucial for meta tags and structured data in JAMstack sites?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Search engine crawlers and social media scrapers receive fully populated meta tags instantly in the initial HTML response without running JS.",
      "Crawlers are given direct database access credentials.",
      "It forces search engines to index pages twice as fast.",
      "It eliminates the need for any CSS styling files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of the viewport meta tag (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">)?",
    "topic": "Structured data and meta tags",
    "choices": [
      "To instruct mobile browsers on how to control the page's dimensions and scaling across different screen sizes.",
      "To encrypt network traffic using SSL/TLS certificates.",
      "To define character encoding standards for database storage.",
      "To speed up JavaScript execution in modern browsers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do dynamic meta tags function when navigating between different blog posts in a JAMstack application?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Page templates update head metadata (titles, descriptions, OG tags) dynamically based on the specific content queried for that post.",
      "Meta tags remain identical across all pages on the site.",
      "Meta tags are ignored by browsers during client-side navigation.",
      "Meta tags require manual XML updates via FTP."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the significance of the lang attribute on the root <html> tag for SEO and accessibility?",
    "topic": "Structured data and meta tags",
    "choices": [
      "It informs screen readers and search engines of the document's primary language for proper pronunciation and indexing.",
      "It automatically translates page content into local regional dialects.",
      "It dictates the character encoding format for database records.",
      "It prevents browsers from caching static image assets."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if structured data (JSON-LD) contains syntax errors or invalid schema properties?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Search engines may fail to parse the structured data, disqualifying the page from displaying rich snippets in search results.",
      "The web server throws a fatal 500 error on every request.",
      "The browser displays a runtime JavaScript alert.",
      "The site automatically reverts to client-side rendering mode."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should meta descriptions be kept within recommended character length limits (typically around 150-160 characters)?",
    "topic": "Structured data and meta tags",
    "choices": [
      "To prevent search engines from truncating or cutting off the description snippet in search result displays.",
      "To comply with CSS stylesheet file size restrictions.",
      "To speed up database query execution times.",
      "To satisfy JavaScript compilation requirements."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary purpose of a robots.txt file in web deployment?",
    "topic": "Sitemaps and robots",
    "choices": [
      "To communicate with search engine crawlers regarding which URLs or directories they are allowed or disallowed to crawl.",
      "To store automated testing scripts for browser automation.",
      "To style error pages with retro robot graphics.",
      "To manage SSL certificate renewals automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do XML sitemaps assist search engine crawlers with site indexing?",
    "topic": "Sitemaps and robots",
    "choices": [
      "They provide a structured list of all important public URLs on your site, helping bots discover and index pages efficiently.",
      "They store encrypted user authentication credentials.",
      "They manage CDN edge routing tables and caching rules.",
      "They compile React components into static HTML files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should the URL of your XML sitemap typically be declared for optimal crawler discovery?",
    "topic": "Sitemaps and robots",
    "choices": [
      "Inside your robots.txt file and submitted via search engine webmaster tools (like Google Search Console).",
      "Inside the gatsby-config.js plugins array.",
      "As a meta tag in browser localStorage.",
      "Inside environment secret variables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the consequence of accidentally disallowing all crawlers (Disallow: /) in robots.txt on production?",
    "topic": "Sitemaps and robots",
    "choices": [
      "Search engines will block indexing of your site, causing it to disappear entirely from search result pages.",
      "The production server will crash with a 503 error.",
      "Users will be unable to load the homepage.",
      "SSL certificates will expire immediately."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are sitemaps generated automatically in modern JAMstack frameworks (like Next.js or Gatsby)?",
    "topic": "Sitemaps and robots",
    "choices": [
      "Using plugins or built-in sitemap generation modules that compile routes and dynamic content slugs into a valid XML sitemap during builds.",
      "By writing XML tags manually in text files after every code change.",
      "By relying on browser extensions to scrape page links.",
      "By querying a local SQLite database during runtime."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What elements are typically required inside each URL entry within an XML sitemap file?",
    "topic": "Sitemaps and robots",
    "choices": [
      "The location URL (<loc>), alongside optional metadata like last modification date (<lastmod>).",
      "Encrypted user passwords and session tokens.",
      "Serverless function execution logs and environment secrets.",
      "CSS style selector strings and color codes."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must sitemap URLs always use absolute paths (including protocol and domain) rather than relative paths?",
    "topic": "Sitemaps and robots",
    "choices": [
      "Search engine crawlers require complete, absolute URLs to resolve and index pages accurately across the web.",
      "Relative paths cause JavaScript compilation errors during builds.",
      "Absolute paths speed up CDN edge caching invalidation.",
      "Relative paths are forbidden by W3C HTML specifications."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of sitemap index files when a website exceeds standard sitemap URL limits (e.g., over 50,000 URLs)?",
    "topic": "Sitemaps and robots",
    "choices": [
      "To group and point to multiple individual sitemap files from a single master index XML file.",
      "To compress image assets into WebP formats.",
      "To manage user authentication roles and permissions.",
      "To split large JavaScript bundles for lazy loading."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does robots.txt handle different crawler user-agents (e.g., Googlebot vs. generic bots)?",
    "topic": "Sitemaps and robots",
    "choices": [
      "By specifying rules grouped under specific User-agent declarations (e.g., User-agent: Googlebot), allowing granular crawling control.",
      "By encrypting crawler traffic using SSL certificates.",
      "By routing specific bots to serverless proxy functions.",
      "By forcing bots to solve CAPTCHA challenges."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should private staging or preview URLs be blocked in robots.txt or protected with HTTP authentication?",
    "topic": "Sitemaps and robots",
    "choices": [
      "To prevent search engines from indexing incomplete staging content or sensitive administrative pages.",
      "To speed up production CDN cache invalidation times.",
      "To prevent serverless function cold start latency.",
      "To satisfy CSS stylesheet validation standards."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the primary objective of running a Lighthouse audit on a web application?",
    "topic": "Lighthouse auditing",
    "choices": [
      "To audit performance, accessibility, best practices, and SEO, providing actionable scores and recommendations for improvement.",
      "To compile JavaScript code into native machine binaries.",
      "To manage SSL certificate renewals and domain name routing.",
      "To store static image assets and PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are Lighthouse audits typically integrated into continuous deployment workflows?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Using CI/CD integration tools (like Lighthouse CI) to run automated performance audits on deploy previews and fail builds if scores drop below thresholds.",
      "By running manual audits in browser developer tools before every git commit.",
      "By configuring serverless functions to execute audits on every user page view.",
      "By storing audit reports in browser local storage databases."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What category does Lighthouse evaluate to ensure sites are usable by people with visual, auditory, or motor impairments?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Accessibility",
      "Performance",
      "SEO",
      "Progressive Web App"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a local development Lighthouse score differ significantly from a production deployment score?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Local development servers run unminified code with debugging tools enabled, whereas production builds are optimized, minified, and served from CDN edge caches.",
      "Local development servers lack internet connectivity.",
      "Production servers use Python instead of Node.js.",
      "Lighthouse blocks local URLs automatically."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the 'Best Practices' audit category in Lighthouse examine?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Code health checks such as using HTTPS security, avoiding deprecated APIs, and preventing frontend console errors.",
      "The aesthetic beauty and color palette of UI components.",
      "The physical speed of server hard drive read operations.",
      "The number of social media share buttons on the page."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Lighthouse evaluate Search Engine Optimization (SEO)?",
    "topic": "Lighthouse auditing",
    "choices": [
      "By checking for valid meta tags, descriptive title elements, robots.txt presence, and mobile-friendly viewport configurations.",
      "By measuring serverless function cold start latency.",
      "By counting the total lines of CSS in stylesheets.",
      "By verifying database schema migration history."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is performance budgeting in the context of Lighthouse CI?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Setting strict size and timing limits (e.g., maximum JS bundle size or maximum LCP milliseconds) enforced during CI builds to prevent performance regression.",
      "Allocating financial funds for cloud hosting server infrastructure.",
      "Restricting the number of third-party API calls per month.",
      "Limiting the number of content models in a headless CMS."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Lighthouse simulate mobile network throttling during performance audits?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Because mobile devices on cellular networks represent a challenging real-world performance constraint for web users.",
      "To force browsers to download assets in sequential order.",
      "To prevent desktop computers from executing JavaScript.",
      "To satisfy W3C HTML validation standards."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What action should a developer take when a Lighthouse audit flags 'Eliminate render-blocking resources'?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Defer non-critical JavaScript and inline critical CSS to allow the browser to paint the page without waiting for heavy scripts.",
      "Delete all images from the project repository.",
      "Disable CDN edge caching layers.",
      "Remove all meta tags from the document head."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of setting up Lighthouse CI in pull requests on GitHub?",
    "topic": "Lighthouse auditing",
    "choices": [
      "It automatically comments on pull requests with performance diff reports, ensuring performance regressions are caught before merging code to production.",
      "It automatically merges approved pull requests without human review.",
      "It compiles React components into mobile application binaries.",
      "It manages SSL certificate renewals for custom domains."
    ],
    "answerIdx": 0
  }
]
next

LAYER: jamstack-9

JSON
[
  {
    "stem": "How do you typically structure a product catalog when sourcing inventory from a headless CMS like Contentful for an e-commerce JAMstack site?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "By creating a dedicated Product content model with fields for title, price, SKU, images, and inventory status, then querying collections during builds.",
      "By writing raw SQL tables directly into the frontend React components.",
      "By storing product prices inside CSS stylesheet files.",
      "By compiling product inventory data into static PDF documents."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is static generation combined with incremental static regeneration or client-side fetching useful for product detail pages in large e-commerce stores?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "It allows core product descriptions to be pre-rendered for fast SEO performance while pricing or stock status updates dynamically.",
      "It eliminates the need for any headless CMS integration.",
      "It forces search engine crawlers to ignore product pages.",
      "It requires a dedicated physical database server running on the client machine."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle product variants (like size or color options) within a headless CMS product catalog model?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "By using JSON object fields or linked reference entries for variants, allowing each option to track distinct SKUs and prices.",
      "By concatenating variant names into a single plain text string field.",
      "By creating separate websites for every individual product color.",
      "By writing custom server-side routing rules in gatsby-config.js."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a major advantage of managing product inventory categories through a headless CMS rather than hardcoding them?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "Non-technical content editors can update product details, categories, and promotional banners without requiring developer code deployments.",
      "It allows browsers to execute database queries faster than servers.",
      "It completely eliminates the need for internet connectivity.",
      "It forces users to view cached data indefinitely."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you manage product stock availability flags (e.g., in-stock vs. out-of-stock) queried from a CMS in the frontend UI?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "By evaluating boolean stock fields in the queried product data to conditionally enable or disable 'Add to Cart' buttons.",
      "By deleting out-of-stock product records from the git repository.",
      "By restarting the production web server whenever stock changes.",
      "By hiding inventory status entirely from customers."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of product slugs when querying catalog items from a CMS for dynamic page routing?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "To serve as unique URL path segments (e.g., /products/wireless-headphones) for individual product detail pages.",
      "To encrypt credit card numbers during checkout transactions.",
      "To calculate estimated shipping taxes for international orders.",
      "To compress product images into WebP formats."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you optimize search and filtering across a large product catalog sourced from a headless CMS?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "By integrating a specialized search service (like Algolia or Typesense) populated via webhooks when CMS products are updated.",
      "By iterating through every product array item using synchronous JavaScript loops in the browser.",
      "By forcing users to download the entire database as a CSV file.",
      "By reloading the page every time a user types a search query."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a product is deleted or unpublished in the CMS while users are browsing the static storefront?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "The static page may still render until the site is rebuilt or revalidated via ISR, at which point fallback 404 handling takes effect.",
      "The user's browser automatically updates the CMS database record.",
      "The entire e-commerce hosting platform crashes with a 500 error.",
      "The product price drops to zero automatically."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you associate multiple product images (gallery photos) with a single catalog entry in Contentful?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "By using a multi-reference asset field that allows content authors to attach an ordered list of image files to the product entry.",
      "By compressing all images into a single animated GIF.",
      "By storing image URLs as plain comma-separated text strings.",
      "By writing custom SQL join queries on the client side."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is pagination important when rendering large product category lists queried from a CMS?",
    "topic": "Product catalogs from a CMS",
    "choices": [
      "To break large inventories into smaller, manageable chunks, improving query performance, bundle size, and browser render speeds.",
      "To combine multiple separate product catalogs into a single endpoint.",
      "To encrypt sensitive pricing data before rendering tables.",
      "To convert raw JSON data into printable PDF receipts."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the primary role of client-side cart state management in a JAMstack e-commerce application?",
    "topic": "Cart state management",
    "choices": [
      "To track selected products, quantities, and user selections as items are added or removed before proceeding to checkout.",
      "To process credit card payments securely on the client machine.",
      "To store private environment secrets and database passwords.",
      "To compile React components into static HTML files."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is shopping cart state commonly persisted in modern JAMstack frontends to survive page reloads?",
    "topic": "Cart state management",
    "choices": [
      "In browser localStorage or sessionStorage combined with React state management tools.",
      "In serverless function environment variables.",
      "In static HTML meta tags inside the document head.",
      "In git commit history logs."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do state management libraries (like Zustand or Redux) help manage a shopping cart across multiple pages?",
    "topic": "Cart state management",
    "choices": [
      "They provide a centralized reactive store where cart items, totals, and quantity modifiers can be updated and accessed globally across any component.",
      "They replace the need for any CSS styling frameworks.",
      "They automatically execute server-side database migrations.",
      "They compile JavaScript code into WebAssembly binaries."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What potential issue arises when relying solely on client-side cart pricing without server-side re-verification during checkout?",
    "topic": "Cart state management",
    "choices": [
      "Malicious users could tamper with prices in browser storage or client state to pay less for items.",
      "The browser will experience memory leaks during component mounting.",
      "CDNs will block all incoming HTTP requests.",
      "Search engine crawlers will index shopping cart items."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should quantity updates for items already in the shopping cart be handled in state?",
    "topic": "Cart state management",
    "choices": [
      "By searching the cart array for the matching item ID and updating its quantity property, recalculating subtotal sums reactively.",
      "By deleting the entire cart and creating a new session.",
      "By sending plaintext passwords to the server via GET requests.",
      "By restarting the browser application."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of calculating cart totals (subtotal, taxes, shipping) on the client side versus server side?",
    "topic": "Cart state management",
    "choices": [
      "Client-side calculations provide instant feedback and UI responsiveness, but final financial totals must always be recalculated and validated securely on the server/payment gateway.",
      "Client-side calculations are legally binding for tax collection.",
      "Server-side calculations are strictly forbidden by e-commerce regulations.",
      "There is no difference in security or processing behavior."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you handle empty cart states in an e-commerce user interface?",
    "topic": "Cart state management",
    "choices": [
      "By conditionally rendering a friendly empty cart message along with a call-to-action button linking back to the product catalog.",
      "By crashing the application with a 500 error page.",
      "By forcing the user to log out of their account.",
      "By redirecting the browser to an external advertising partner."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is cart item synchronization when a user logs into their account across multiple devices?",
    "topic": "Cart state management",
    "choices": [
      "Merging local guest cart items with the user's persistent cart stored in a database associated with their account profile.",
      "Clearing browser local storage whenever a user clicks a link.",
      "Sending email notifications for every item added to cart.",
      "Deleting old cart sessions after ten seconds."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you display a live cart item count badge on site navigation headers?",
    "topic": "Cart state management",
    "choices": [
      "By subscribing to the cart state store and reducing the item array to sum up total quantities, rendering the count reactively.",
      "By querying the database on every mouse movement.",
      "By storing the count in an unchangeable static environment variable.",
      "By reading browser cookie expiration timestamps."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to cart state when a user closes their browser if stored in sessionStorage versus localStorage?",
    "topic": "Cart state management",
    "choices": [
      "SessionStorage cart data is cleared when the browser tab closes, whereas localStorage persists data across sessions until explicitly cleared.",
      "SessionStorage persists data indefinitely, while localStorage deletes data instantly.",
      "Both storages clear data automatically every five minutes.",
      "Neither storage mechanism can hold cart items."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the primary purpose of integrating Stripe Checkout into a JAMstack e-commerce site?",
    "topic": "Stripe checkout integration",
    "choices": [
      "To securely collect payment card details and process transactions via a hosted or embedded payment page without handling raw card data on your own servers.",
      "To manage product inventory catalog models in a headless CMS.",
      "To compile React components into static HTML files during builds.",
      "To optimize raster image assets into WebP formats."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Stripe Checkout handle PCI-DSS compliance requirements for JAMstack developers?",
    "topic": "Stripe checkout integration",
    "choices": [
      "By hosting payment fields on Stripe's secure infrastructure (or using Stripe Elements), your server never touches raw credit card numbers, minimizing PCI scope.",
      "By forcing your application servers to store encrypted card databases locally.",
      "By requiring developers to obtain multi-factor authentication certificates.",
      "By eliminating the need for SSL encryption on your domain."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Stripe Checkout Session, and how is it initiated from a frontend application?",
    "topic": "Stripe checkout integration",
    "choices": [
      "A session object created on the server via a serverless function containing line items and pricing, which returns a session ID/URL for client redirection.",
      "A local browser storage token that processes payments offline.",
      "An XML sitemap file used by search engine crawlers.",
      "A CSS styling rule for payment form input fields."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you pass selected cart items from your frontend store to the backend serverless function creating a Stripe Checkout Session?",
    "topic": "Stripe checkout integration",
    "choices": [
      "By sending an HTTP POST request containing item IDs and quantities in the request body.",
      "By writing cart items into public HTML meta tags.",
      "By appending credit card details to the URL query string.",
      "By storing cart arrays in browser cookies permanently."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between Stripe's Hosted Checkout page and Embedded Checkout (Stripe Elements)?",
    "topic": "Stripe checkout integration",
    "choices": [
      "Hosted Checkout redirects users to a Stripe-hosted payment page, whereas Embedded Checkout embeds payment forms directly inside your own site UI.",
      "Hosted Checkout runs on client local storage, while Embedded Checkout runs on databases.",
      "Hosted Checkout does not support credit cards.",
      "There is no difference in user experience or integration."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What role do Stripe Price IDs (e.g., price_123...) play when creating checkout sessions?",
    "topic": "Stripe checkout integration",
    "choices": [
      "They reference predefined products and pricing structures configured in your Stripe dashboard, ensuring accurate pricing security.",
      "They represent encrypted user session tokens.",
      "They act as database foreign key IDs pointing to Contentful entries.",
      "They define CDN edge caching invalidation rules."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle successful payment redirection after a user completes a Stripe Checkout session?",
    "topic": "Stripe checkout integration",
    "choices": [
      "By configuring success_url parameters in the checkout session pointing to an order confirmation page on your site.",
      "By crashing the application to trigger automatic restarts.",
      "By clearing all browser history data permanently.",
      "By redirecting users to an external advertising partner."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a user cancels the payment process while on the Stripe Checkout page?",
    "topic": "Stripe checkout integration",
    "choices": [
      "Stripe redirects the user back to the specified cancel_url route, allowing them to return to the cart or shopping page.",
      "The user's credit card is charged a cancellation fee automatically.",
      "The user's account is deleted from the database.",
      "The site server crashes with a 500 error."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must product prices be validated on the server side when creating a Stripe Checkout Session rather than trusting frontend cart prices?",
    "topic": "Stripe checkout integration",
    "choices": [
      "To prevent malicious users from intercepting and modifying price payloads in client-side code to pay fraction of costs.",
      "To speed up serverless function cold start execution times.",
      "To comply with CSS stylesheet formatting standards.",
      "To satisfy W3C HTML validation rules."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test Stripe checkout flows during local development before launching to production?",
    "topic": "Stripe checkout integration",
    "choices": [
      "By using Stripe test mode API keys and test credit card numbers provided in Stripe's developer documentation.",
      "By disabling your computer network adapter entirely.",
      "By modifying production database records directly.",
      "By writing unit tests in Jest without API keys."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the primary role of serverless functions in handling payment processing workflows for JAMstack sites?",
    "topic": "Serverless payment handling",
    "choices": [
      "To securely communicate with payment gateway APIs (like Stripe) using secret API keys, handling session creation and sensitive transaction logic.",
      "To render static product catalog HTML pages during build time.",
      "To manage local browser storage databases for shopping carts.",
      "To compile Sass stylesheets into minified production CSS."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must secret Stripe API keys never be exposed in client-side frontend React code?",
    "topic": "Serverless payment handling",
    "choices": [
      "Because anyone inspecting browser developer tools could steal your secret key and charge unauthorized transactions to your account.",
      "Because JavaScript engines throw syntax errors when encountering secret keys.",
      "Because CDNs block network requests containing authorization headers.",
      "Because browsers cannot make network requests to payment APIs."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do serverless payment functions securely receive line item data from the frontend store?",
    "topic": "Serverless payment handling",
    "choices": [
      "By parsing the JSON request body sent via POST requests, extracting item IDs and quantities, and verifying prices against a secure source.",
      "By reading unencrypted environment variables set in the browser.",
      "By inspecting HTML <head> metadata tags.",
      "By querying browser local storage directly."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What error handling practices are crucial when a serverless payment function fails to communicate with Stripe?",
    "topic": "Serverless payment handling",
    "choices": [
      "Catching API exceptions in try/catch blocks, logging error details securely on the server, and returning clean error messages to the frontend without exposing internals.",
      "Letting the server crash without handling to trigger automatic user alerts.",
      "Retrying failed credit card charges in an infinite while loop.",
      "Shutting down the hosting platform permanently."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you manage environment secrets (like STRIPE_SECRET_KEY) inside serverless payment functions?",
    "topic": "Serverless payment handling",
    "choices": [
      "Through secure environment variables injected by the hosting provider (e.g., Netlify/Vercel) during runtime execution.",
      "By hardcoding keys directly into component source files.",
      "By storing secrets in public README markdown files.",
      "By writing credentials into CSS stylesheets."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is idempotency in the context of serverless payment processing?",
    "topic": "Serverless payment handling",
    "choices": [
      "A property ensuring that making the same payment request multiple times (e.g., due to network retries) results in only a single transaction charge.",
      "The speed at which serverless functions cold start.",
      "The compression ratio of JSON response payloads.",
      "The automatic translation of checkout pages into regional languages."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a serverless payment function exceeds its execution timeout limit while waiting for a payment gateway response?",
    "topic": "Serverless payment handling",
    "choices": [
      "The cloud runtime terminates the function execution, returning a gateway timeout error to the client frontend.",
      "The payment gateway automatically cancels the credit card charge.",
      "The server restarts in maintenance mode.",
      "The user's shopping cart is deleted from local storage."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle currency formatting and minor unit conversions (e.g., cents to dollars) in payment functions?",
    "topic": "Serverless payment handling",
    "choices": [
      "By performing calculations in the smallest currency unit (like cents) as required by Stripe to prevent floating-point rounding errors.",
      "By multiplying all prices by 100 on the client browser.",
      "By storing prices as plain text strings with dollar signs.",
      "By relying on CSS to format currency symbols visually."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the security risk of trusting client-calculated discount codes in a serverless payment function?",
    "topic": "Serverless payment handling",
    "choices": [
      "Users could manipulate coupon codes or discount values in client-side code to receive 100% off without authorization.",
      "It causes browser memory leaks during component mounting.",
      "It prevents serverless functions from receiving HTTP requests.",
      "It violates W3C HTML validation standards."
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you return transaction confirmation data from a serverless payment function to the frontend?",
    "topic": "Serverless payment handling",
    "choices": [
      "By returning a JSON response object containing status 200 and the checkout session URL or ID for redirection.",
      "By rendering raw HTML strings inside the function body.",
      "By saving transaction receipts as local disk files.",
      "By sending SMS text messages to the customer."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of an order confirmation flow in an e-commerce JAMstack application?",
    "topic": "Order confirmation flows",
    "choices": [
      "To greet the customer, display order summary details, receipt numbers, and clear next steps after a successful purchase.",
      "To collect credit card numbers for future subscription renewals.",
      "To manage content models in a headless CMS.",
      "To compile React components into static HTML files."
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must order confirmation pages handle dynamic data fetching rather than relying purely on static pre-rendered HTML?",
    "topic": "Order confirmation flows",
    "choices": [
      "Because order details (items purchased, totals, shipping addresses) are unique per customer transaction and fetched dynamically using session or transaction IDs.",
      "Because static HTML files are prohibited from containing text.",
      "Because browsers cannot render confirmation pages without databases.",
      "Because search engine crawlers require order details for indexing."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you retrieve transaction details securely to display on an order confirmation page?",
    "topic": "Order confirmation flows",
    "choices": [
      "By reading transaction query parameters (like ?session_id=...) from the URL and querying the payment gateway or database via a serverless function.",
      "By reading credit card numbers from browser localStorage.",
      "By scraping public social media profiles.",
      "By hardcoding receipt strings into component source files."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What post-purchase cleanup actions should happen in the frontend application upon reaching the order confirmation page?",
    "topic": "Order confirmation flows",
    "choices": [
      "Clearing the shopping cart state from localStorage and store memory so the cart is empty for future shopping.",
      "Deleting the customer's user account from the database.",
      "Locking the user's browser application permanently.",
      "Restarting the production web server."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you ensure customers receive an email receipt after completing an order in a JAMstack setup?",
    "topic": "Order confirmation flows",
    "choices": [
      "By configuring automated email receipts directly inside the payment gateway dashboard (like Stripe) or triggering an email service via webhooks.",
      "By writing manual email dispatch scripts in client-side JavaScript.",
      "By sending emails through FTP file uploads.",
      "By printing receipts using browser window.print() functions."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a user refreshes the order confirmation page multiple times?",
    "topic": "Order confirmation flows",
    "choices": [
      "The page should safely re-fetch and display the order details idempotently without duplicating charges or creating duplicate database records.",
      "The user's credit card is charged again for the same order.",
      "The application crashes with a 500 error page.",
      "The database drops all transaction tables."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle invalid or missing session IDs when a user visits the order confirmation URL directly without purchasing?",
    "topic": "Order confirmation flows",
    "choices": [
      "By checking for valid session parameters and redirecting unauthorized visitors back to the home page or catalog.",
      "By generating a random fake receipt with zeroed-out totals.",
      "By locking the user's IP address permanently.",
      "By crashing the server build process."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is clearing local cart state important immediately after a successful checkout session?",
    "topic": "Order confirmation flows",
    "choices": [
      "To prevent old purchased items from lingering in the user's active shopping cart on subsequent visits.",
      "To speed up serverless function cold start execution times.",
      "To comply with CSS stylesheet formatting standards.",
      "To satisfy W3C HTML validation rules."
    ],
    "answerIdx": 3
  },
  {
    "stem": "What role does order data persistence play in fulfilling eCommerce orders?",
    "topic": "Order confirmation flows",
    "choices": [
      "Saving completed order details to a secure database ensures merchants can track fulfillment, shipping, and customer service inquiries.",
      "It allows visitors to view other customers' private receipts.",
      "It compresses raster images into WebP formats.",
      "It eliminates the need for any payment gateway integration."
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you provide a downloadable PDF invoice on the order confirmation page?",
    "topic": "Order confirmation flows",
    "choices": [
      "By generating the invoice dynamically via a serverless function using PDF generation libraries when requested by the customer.",
      "By storing pre-made PDF files for every person on earth in git.",
      "By converting HTML confirmation text into raster PNG images client-side.",
      "By printing receipts through browser local storage."
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a webhook in the context of JAMstack and third-party services like Stripe or Contentful?",
    "topic": "Webhooks basics",
    "choices": [
      "An automated HTTP POST notification sent by a service to a designated URL endpoint on your server when specific events occur.",
      "A client-side JavaScript event listener attached to DOM buttons.",
      "A database migration script executed during local development builds.",
      "A CSS preprocessor rule for styling responsive grids."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are webhooks required for handling asynchronous events like successful Stripe payments?",
    "topic": "Webhooks basics",
    "choices": [
      "Because user browsers might close before returning to your success page, webhooks ensure your backend reliably receives payment confirmation directly from Stripe servers.",
      "Because webhooks replace the need for frontend React components.",
      "Because webhooks eliminate the need for serverless functions.",
      "Because webhooks compress JSON payloads into binary zip archives."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you secure a webhook endpoint to ensure incoming requests genuinely originate from a trusted service like Stripe?",
    "topic": "Webhooks basics",
    "choices": [
      "By verifying cryptographic webhook signature headers (e.g., stripe-signature) using a webhook secret key in your serverless function.",
      "By making the webhook URL completely public and unauthenticated.",
      "By hardcoding trusted IP addresses into CSS stylesheets.",
      "By storing webhook secrets in public markdown documentation."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What HTTP status code should your webhook endpoint return to acknowledge successful receipt and processing of an event?",
    "topic": "Webhooks basics",
    "choices": [
      "200 OK",
      "400 Bad Request",
      "401 Unauthorized",
      "500 Internal Server Error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if your webhook endpoint returns a 500 error or times out when receiving a Stripe event?",
    "topic": "Webhooks basics",
    "choices": [
      "Stripe will interpret the failure and automatically retry sending the webhook event payload with exponential backoff over subsequent hours/days.",
      "Stripe will permanently delete your merchant account.",
      "The user's credit card will be charged a penalty fee.",
      "The browser will close all active customer tabs."
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must webhook endpoints parse raw request bodies as buffers or unparsed strings when verifying cryptographic signatures?",
    "topic": "Webhooks basics",
    "choices": [
      "Signature verification requires the exact raw byte stream of the payload; parsing JSON prematurely can alter whitespace or formatting and invalidate the signature.",
      "Because serverless functions cannot parse JSON objects.",
      "To compress payload file sizes for faster transmission.",
      "To comply with CSS stylesheet formatting rules."
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do CMS webhooks (like Contentful publishing triggers) integrate with JAMstack deployment pipelines?",
    "topic": "Webhooks basics",
    "choices": [
      "When content is published in the CMS, a webhook triggers a build hook URL on Netlify or Vercel, starting an automated site rebuild to reflect updates.",
      "They automatically restart the user's personal laptop.",
      "They delete old git commit logs permanently.",
      "They convert Markdown files into binary executables."
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of processing heavy, long-running tasks directly inside a webhook handler serverless function?",
    "topic": "Webhooks basics",
    "choices": [
      "The function could exceed execution timeout limits, causing failures and triggering repeated webhook retries from the provider.",
      "It causes browser memory leaks during rendering.",
      "It prevents search engine crawlers from indexing page content.",
      "It disables CDN edge caching invalidation rules."
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you handle event deduplication when receiving webhook notifications?",
    "topic": "Webhooks basics",
    "choices": [
      "By recording processed event IDs in a database and checking incoming event IDs to ensure the same event is never handled twice.",
      "By deleting database tables after every incoming request.",
      "By ignoring all webhook notifications entirely.",
      "By restarting the serverless container on every event."
    ],
    "answerIdx": 2
  },
  {
    "stem": "What tool or CLI command can developers use to forward live webhook events to a local development server for testing?",
    "topic": "Webhooks basics",
    "choices": [
      "Stripe CLI (stripe listen --forward-to localhost:3000/api/webhook) or tools like ngrok.",
      "npm run build --local-webhook",
      "git push origin webhook",
      "gatsby serve --tunnel"
    ],
    "answerIdx": 3
  }
]

LAYER: jamstack-10

```json
[
  {
    "stem": "What happens when you link a Git repository to a Netlify site?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "Netlify rewrites the commit history",
      "Netlify copies the repository once and redeploys only when someone uploads a zip file by hand in the dashboard",
      "Netlify mirrors the repository into a database and serves files straight from raw Git objects",
      "Netlify builds the site whenever commits land on a watched branch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Git event usually triggers a production deploy on a connected Netlify site?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "Creating a local tag on one developer's laptop that is never pushed to the remote repository",
      "A push or merge to the branch configured as production, which starts a fresh build and deploy",
      "Running git stash on a machine that has the repository cloned and checked out",
      "Opening the repository's issue tracker for the first time after the site was created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Git-based deployment make releases easier to audit?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "Each deploy maps to one commit, so you know exactly what code is live",
      "Each deploy skips the build step",
      "Each deploy is copied to the author's laptop",
      "Each deploy is encrypted with the author's personal key, so only that author can ever read the released files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which setting decides which branch counts as production?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "The production branch field in the site's build and deploy settings, which Netlify checks on each push",
      "The license file placed at the top level of the repository",
      "The default font family chosen in the site's appearance panel of the hosting dashboard",
      "The package name field inside the package.json file at the root of the project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A teammate pushes to a feature branch that is not the production branch. With branch deploys enabled, what does Netlify do?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "Overwrites the production site right away with the build from the feature branch, replacing the live files",
      "Builds that branch separately on its own URL while the live production site stays exactly as it was",
      "Deletes the production deploy until the feature branch has been merged back into the main branch",
      "Ignores the push, because only the main branch of a repository can ever be built on the platform"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Netlify need from your Git provider to build on every push?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "The provider's billing records for the repository owner, so build minutes can be charged correctly",
      "Write permission to every other repository that belongs to the same organization or user account",
      "Authorized access to clone the repository and to receive push notifications whenever commits arrive",
      "A full copy of your local node_modules folder uploaded to the provider's servers before each build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does continuous deployment from Git fix compared with uploading built files by hand?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "It guarantees the site has no bugs",
      "It removes manual steps, so merged changes ship consistently",
      "It prevents anyone else from ever viewing the repository's history, which keeps unreleased work private",
      "It lets the site run with no build step and no hosting provider, since Git itself serves the pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should a netlify.toml file live so Netlify reads it?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "In the repository root or the configured base directory",
      "Inside the node_modules folder",
      "In the browser's local storage for the deployed site, where the platform reads it at request time",
      "Inside the published output folder, after the build command has finished writing its files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "The site lives in a subfolder of a monorepo. Which setting makes Netlify build from there?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "The base directory, so Netlify runs the install and build commands from that subfolder",
      "The user agent string, so the subfolder is detected as a mobile site by the build runner",
      "The cache TTL, so the subfolder is rebuilt from scratch every single minute of the day",
      "The theme color, so the subfolder is highlighted differently on the dashboard's overview page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is building from Git usually better than committing the generated output folder?",
    "topic": "Connecting Git to Netlify",
    "choices": [
      "Git refuses to store HTML files that were produced by a build tool, so the commit would be rejected",
      "Netlify cannot serve any folder that is already committed to the repository it is connected to",
      "Generated files are always larger than one megabyte, which makes every single push fail on the platform",
      "Output can be regenerated, so committing it adds noise and merge conflicts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the build command in a Netlify site configuration do?",
    "topic": "Build commands and environments",
    "choices": [
      "Lists the pages that visitors are allowed to open in a browser when they reach the production domain",
      "Chooses which Git provider the repository is hosted on",
      "Sets the domain name that points at the deployed site",
      "Runs the command that generates the static site, such as npm run build"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the publish directory tell Netlify?",
    "topic": "Build commands and environments",
    "choices": [
      "Which folder holds the source Markdown files that editors should open first when they use the CMS",
      "Which folder holds the finished files that the host should serve to visitors once the build ends",
      "Which folder gets deleted entirely before the next build begins so stale files do not remain",
      "Which folder contains the saved cookies and sessions of visitors who were logged in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "For a typical Gatsby site, which output folder is usually the publish directory?",
    "topic": "Build commands and environments",
    "choices": [
      "node_modules, because the build installs every generated page there",
      "src, because pages are compiled in place inside the source folder",
      "coverage, because Gatsby writes its finished HTML next to the test reports",
      "public"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should a secret API key needed by the build be stored?",
    "topic": "Build commands and environments",
    "choices": [
      "In the HTML of the home page, inside a script tag so the build can read it later",
      "In the site's environment variables, set in the Netlify settings and injected only while the build runs",
      "In a plain text file called keys.txt that is committed to the main branch for the whole team to find",
      "In the README, so teammates can find the value easily when they set up the project locally"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a secret key in client-side JavaScript risky on a JAMstack site?",
    "topic": "Build commands and environments",
    "choices": [
      "Browsers refuse to run any JavaScript that contains the word key, so the app stops working at once",
      "Anyone can open the browser, read the shipped bundle and extract the key from the code",
      "The key is automatically rotated each time a visitor loads the page, which breaks other sessions",
      "Bundlers always strip strings that look like keys, so the application ends up broken in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Different API URLs for staging and production are best handled by:",
    "topic": "Build commands and environments",
    "choices": [
      "Environment variables scoped to deploy contexts, so each environment receives its own value at build time",
      "Hard-coding both URLs in one file and commenting out the one that should not be used",
      "Creating a separate Git repository for each value and keeping the repositories in sync manually",
      "Editing the source code by hand before every single deploy and reverting the change afterwards"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which setting keeps builds stable when the platform's default Node version changes?",
    "topic": "Build commands and environments",
    "choices": [
      "Limiting the number of images that appear on the home page of the deployed site",
      "Setting the screen resolution that the build server uses",
      "Choosing the browser that the output bundle is optimized for during the minification step",
      "Pinning the Node version in an environment variable or version file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A build works on your laptop but fails on Netlify with a missing package. What is the likeliest cause?",
    "topic": "Build commands and environments",
    "choices": [
      "Netlify blocks every package that was previously installed on a developer's own laptop and cache",
      "Netlify only installs packages whose names begin with a letter, so some names are skipped",
      "The laptop's operating system encrypts packages before the build, so the server cannot read them",
      "A dependency the build needs is missing from package.json, so a clean install does not fetch it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of a lockfile such as package-lock.json for builds?",
    "topic": "Build commands and environments",
    "choices": [
      "It merges all of the site's pages into a single file",
      "It stores the site's environment variables in plain text so every teammate can read them",
      "It encrypts the site's HTML output",
      "Installs are reproducible with the same dependency versions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In netlify.toml, which section controls the build command and publish directory?",
    "topic": "Build commands and environments",
    "choices": [
      "The fonts section, which lists every typeface that the finished site loads",
      "The comments section, which stores notes that teammates leave for each other",
      "The visitors section, which lists the people allowed to open the deployed site",
      "The build section"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a deploy preview?",
    "topic": "Deploy previews",
    "choices": [
      "A backup of the database that stores the CMS content, created automatically every night",
      "A temporary, shareable build of a pull request that reviewers can open before anything is merged",
      "A permanent copy of the production site that is stored on the developer's laptop for offline work",
      "A report listing how many visitors the site had last month, broken down by country and by page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do deploy previews help when reviewing a pull request?",
    "topic": "Deploy previews",
    "choices": [
      "They remove the need to write code before opening a pull request, since the platform generates it",
      "They merge the pull request into production without any human decision once the checks have finished",
      "Reviewers can click through the real built site on its own URL instead of reading only the diff",
      "They automatically approve every pull request whose build succeeds, so no human review is needed afterwards"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you typically find a deploy preview link for a pull request?",
    "topic": "Deploy previews",
    "choices": [
      "In the footer of the production site's home page, below the copyright text and the social links",
      "In the browser's cookie storage",
      "In a status check or bot comment on the pull request",
      "In the scripts section of package.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A preview does not match your local build. Which cause is most plausible?",
    "topic": "Deploy previews",
    "choices": [
      "Different environment variables or branch state than locally",
      "The preview ignores all of your CSS and shows unstyled plain text to everyone who opens the link",
      "The preview automatically translates every page into another language based on the reviewer's location",
      "The preview always shows the first commit ever made to the repository instead of the latest one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to production when a deploy preview is created?",
    "topic": "Deploy previews",
    "choices": [
      "Production is untouched until the change is merged",
      "Production is paused until every reviewer clicks approve in the hosting dashboard for that pull request",
      "Production is replaced instantly",
      "Production is switched over to the preview's own domain name for as long as the review lasts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which workflow best uses previews for design review with non-developers?",
    "topic": "Deploy previews",
    "choices": [
      "Ask them to wait until the change reaches production before they look at anything at all",
      "Ask them to clone the repository, install dependencies and run the build on their own computers",
      "Share the preview URL so they can review the real result in a browser without installing anything",
      "Email them the compiled JavaScript bundle and ask them to open it in a text editor to check it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do branch deploys differ from deploy previews?",
    "topic": "Deploy previews",
    "choices": [
      "Branch deploys run without any build command",
      "Branch deploys exist only for the production branch, while previews exist only for forks of the repository",
      "Branch deploys are free of hosting costs",
      "Branch deploys build a chosen branch; previews are tied to pull requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should preview deployments avoid production secrets or write access?",
    "topic": "Deploy previews",
    "choices": [
      "Anyone with the URL may use the site, so it must not change real data",
      "Production secrets only work on domains that end in .com, so previews cannot use them",
      "Secrets are always rendered in the Netlify logo on the page, so reviewers could read them there",
      "Preview sites are deleted every hour"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A preview shows a 404 for a client-side route that works locally. What is a likely fix?",
    "topic": "Deploy previews",
    "choices": [
      "Rename the repository",
      "Delete the pull request and open it again on a different day so the preview is regenerated",
      "Add a redirect rule that serves the app's index file",
      "Disable HTTPS for the preview domain"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main trade-off of building a preview for every pull request?",
    "topic": "Deploy previews",
    "choices": [
      "Previews permanently change the production domain's DNS records each time that a new one is created",
      "More build minutes and more URLs to manage, in exchange for feedback before the change is merged",
      "Previews block anyone from merging until the branch has been deleted and recreated from the main branch",
      "Previews make the code in the repository unreadable to teammates until every review has been completed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a build hook?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "A Git feature that blocks any push containing files larger than the limit set by the repository owner",
      "A unique URL that triggers a new build of the site whenever it receives a POST request",
      "A CSS rule that rebuilds the styles when a user hovers over a link on a deployed page",
      "A line of JavaScript that hides the build log from teammates until the deploy has completed successfully"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do JAMstack sites pair build hooks with a headless CMS?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "Build hooks let editors change the site's DNS records directly from inside the content editor",
      "Build hooks convert CMS content into a queryable database that visitors then use through their browsers",
      "Edits happen outside Git, so the CMS has to ask the host to rebuild whenever content is published",
      "A headless CMS cannot store content unless the site is rebuilt every second, so hooks keep both in step"
    ],
    "answerIdx": 2
  },
  {
    "stem": "An editor publishes in the CMS, but the live site does not show it. What is most likely missing?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "A longer title for the article inside the CMS, since short titles are filtered out by static generators",
      "A webhook that triggers a rebuild on publish",
      "A bigger monitor on the editor's computer",
      "A different font for the site's headings"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which HTTP method normally calls a Netlify build hook?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "CONNECT, because it opens a tunnel between the CMS and the build server",
      "OPTIONS, because it asks the build server which methods it supports first",
      "POST",
      "TRACE, because it returns the request so the service can verify it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why treat a build hook URL like a secret?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "It contains the site's whole source code",
      "It lets visitors read the site's environment variables by adding a query string to the address",
      "Anyone holding it can trigger builds and waste minutes",
      "It doubles as the password for the Git provider account that owns the repository"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A site rebuilds on every CMS save, including drafts. How can you cut wasted builds?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "Switch to a longer domain name",
      "Remove the publish directory from the settings so that drafts are never copied into the output",
      "Trigger the hook only on publish events",
      "Disable the build command in the site's configuration so that nothing runs when the hook is called"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool can rebuild a JAMstack site on a fixed schedule, such as every morning?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "A Git alias that renames the main branch each day",
      "A CSS animation that runs whenever a visitor loads the page and then restarts the build server",
      "A scheduler that calls the build hook on a cron timer",
      "A browser extension that refreshes the editor's open tab so the site content updates every hour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to the live deploy while a hook-triggered build is running?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "The previous deploy keeps serving traffic until the new build has finished and succeeded",
      "The previous deploy is deleted immediately to save storage space while the new build is in progress",
      "The previous deploy is moved to a different domain name until the new build has finished",
      "The previous deploy is replaced with a blank page that tells visitors that maintenance is happening"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can a webhook-driven static site show stale content briefly after an edit?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "Browsers refuse to display any page that was edited in a CMS until the visitor has cleared their cookies",
      "The new build has to finish and the result has to be deployed before visitors can see the edit",
      "The CMS stores edits only after midnight each day, so the content is not available to the build earlier",
      "Static sites cannot ever display content that was edited after the first deployment was published"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach shows fresh data without waiting for a full rebuild?",
    "topic": "Build hooks and CMS triggers",
    "choices": [
      "Fetching at runtime in the client or a serverless function",
      "Lowering the file size of the images on the page so the generator finishes sooner and more often",
      "Renaming the build hook",
      "Increasing the number of Git branches in the repository until the host starts to build them faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does HTTPS provide for visitors?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Automatic translation of the site into the language the visitor's browser is configured to prefer",
      "A guarantee that the site's content is free of spelling errors, since the certificate authority proofreads the text",
      "A faster build process on the hosting provider's servers",
      "Encrypted traffic and verification of the site's identity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which DNS record type usually points a subdomain like www at a host's hostname?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "MX, which maps the subdomain to the servers that accept incoming email for it",
      "SRV, which publishes the hosting provider's TLS certificate for the subdomain",
      "TXT, which stores a pointer to the host's IP address in free-form text fields",
      "CNAME"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the apex domain, such as example.com, trickier to point at a host than a subdomain?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Apex domains require a separate Git repository for each page that visitors are able to request",
      "A CNAME generally cannot coexist with the apex's other records",
      "The apex domain cannot be reached over HTTPS in any browser",
      "Apex domains are limited to three visitors per day unless the owner upgrades the registrar's plan"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of a TLS certificate on a custom domain?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "It stores the site's HTML pages in a compressed archive, which the browser unpacks when a visitor arrives",
      "It proves control of the domain and enables encryption",
      "It decides which browser features",
      "It lists every Git commit that was deployed to the site, so that visitors can check the release history"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do automatically renewing certificates matter?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Expired certificates trigger browser security warnings, which erodes visitors' trust and can block access",
      "Renewal is required to keep the site's source code under version control in the connected repository",
      "Renewal increases the number of pages that the site may contain under the hosting provider's plan",
      "Expired certificates delete the site's DNS records permanently, so the domain cannot be recovered afterwards"
    ],
    "answerIdx": 0
  },
  {
    "stem": "After adding a custom domain, the site still shows the old host. What is a likely cause?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "DNS changes have not propagated, or still point to the old host",
      "The site's CSS file is larger than the limit that the platform allows for custom domain configurations",
      "The visitor's browser is older than the hosting provider and cannot read the new certificate chain",
      "The Git repository was renamed on the same day, which resets the domain mapping for the hosting platform"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is mixed content on an HTTPS page?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Markdown and HTML files stored together inside the same source folder of a static site project",
      "The same page being served from both the www hostname and the apex domain at the same time",
      "Two different CSS frameworks that are imported on one page and conflict with each other in the cascade",
      "Insecure HTTP resources, such as scripts or images, loaded on a page that was served over HTTPS"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why redirect HTTP requests to HTTPS?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "So the build command finishes in less time",
      "So the site's Git history is automatically compressed whenever a visitor opens a page over a secure link",
      "Visitors typing plain HTTP still reach the encrypted site",
      "So search engines can no longer find the old address and stop listing it in their search results"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a TXT record used for when connecting a domain to a service?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Carrying values such as ownership verification tokens",
      "Increasing the speed of the visitor's internet connection by caching pages at the DNS resolver level",
      "Forcing every visitor to use the same browser",
      "Storing the site's JavaScript bundle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which header tells browsers to use only HTTPS for a site on future visits?",
    "topic": "Custom domains and HTTPS",
    "choices": [
      "Content-Length, which declares how many bytes of the response body the client should expect",
      "Last-Modified, which records when the encrypted version of the page was last generated",
      "Accept-Language, which lists the languages the server is allowed to translate the page into",
      "Strict-Transport-Security"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does a static JAMstack site still need monitoring?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Monitoring is needed only when the site contains no JavaScript, because plain HTML cannot be checked",
      "Static sites cannot be displayed unless a monitoring agent is installed on the visitor's browser",
      "Static sites automatically repair their own bugs after the first deploy, so no monitoring is ever required",
      "Builds can fail, third-party APIs can break and performance can regress even without servers to manage"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A deploy breaks the checkout page. What is the fastest safe response on a host that keeps old deploys?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Disable HTTPS for the domain until the bug disappears, since the secure connection triggered it",
      "Wait for visitors to report the issue before doing anything, so the cause can be identified",
      "Roll back to the previous good deploy and fix the bug",
      "Delete the repository and recreate it from memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a rollback usually do on an atomic-deploy host?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Deletes the CMS content that was published most recently",
      "Switches traffic to an earlier immutable deploy without rebuilding",
      "Rebuilds the entire site with a different programming language to avoid the bug that was introduced",
      "Rewrites the Git history to remove the bad commit and force-pushes the cleaned branch to the remote"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are atomic deploys valuable for production safety?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "They let two people edit the same file at once without any merge conflicts reaching the build",
      "They compress all images into one file, which reduces the size of every page that visitors load",
      "The site switches to the new version only once every file has been uploaded successfully",
      "They make builds run without needing a build command, so mistakes in scripts cannot occur"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Lighthouse CI do in a deployment pipeline?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Replaces the Git provider with a hosted code editor that commits changes on behalf of the developers",
      "Converts the site's pages into native mobile applications that can be distributed through app stores",
      "Runs automated audits on each build and flags regressions in performance or quality before release",
      "Raises the hosting provider's bandwidth limit whenever the site's traffic grows past a set threshold"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a sensible performance budget check in CI?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Failing the build whenever a developer uses a dark theme in their editor while writing the code",
      "Failing the build when the README contains an emoji next to the project's main heading",
      "Failing the build when Largest Contentful Paint passes an agreed threshold, so regressions are caught early",
      "Failing the build when the repository has more than one contributor pushing to the same branch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should you look first when a deploy fails during the build step?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "The build log with the failing command and error",
      "The CSS of the home page",
      "The number of stars on the repository",
      "The bookmarks of the person who started the build, since they may point at the failing page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do deploy notifications help a team?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "They hide build errors from the public site by replacing the failed pages with cached copies",
      "They prevent anyone from pushing new commits until the notification has been acknowledged by the owner",
      "They fix failing builds automatically without any human involvement, then merge the repaired code",
      "They surface failed or successful deploys quickly, so the team notices problems without checking manually"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An uptime check requests the home page every minute. What does it catch that a successful build does not?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Post-deploy failures such as DNS misconfiguration, expired certificates or an outage in a third-party API",
      "Unused CSS rules in the stylesheet that increase the size of the downloaded files for visitors",
      "Typos in the commit messages that were written by developers before the build was triggered",
      "Spelling mistakes in the Markdown source files that were used when the site was generated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which practice reduces the risk of breaking all visitors at once?",
    "topic": "Monitoring and rollbacks",
    "choices": [
      "Removing the rollback option to avoid confusion about which version of the site is actually live",
      "Verifying on a preview or staging URL before merging",
      "Disabling all automated checks to ship faster",
      "Merging directly to production and testing only after complaints arrive from the people using it"
    ],
    "answerIdx": 1
  }
]
```
