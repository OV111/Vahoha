LAYER: microservices-1

```json
[
  {
    "stem": "What is a monolith?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "An application that is split into many small services that are deployed apart",
      "An application that runs only on one server and cannot be scaled at all",
      "An application that is built and deployed as a single unit with one codebase",
      "An application that stores all of its data in a single text file on disk"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main idea of a microservices architecture?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "The system is built from small, independently deployable services around business capabilities",
      "The system is built from one large service that is split into many classes",
      "The system is built from many services that all share one database schema",
      "The system is built from scripts that run on a schedule on each server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does service oriented architecture, or SOA, usually involve?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "Tiny functions that run only for the length of one request in the cloud",
      "One service per developer, written in the language that the developer likes best",
      "A single process that exposes all of its functions in a single module",
      "Larger services that are shared across the enterprise, often with a central bus"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of a monolith in a small team?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "It scales each feature independently without any extra work for the team",
      "It is simple to build, test, deploy and debug",
      "It lets each team pick a different language and a different database",
      "It removes the need for tests, since all of the code runs together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of microservices for a large organisation?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "The system needs less monitoring, because failures are always local",
      "Teams can build, deploy and scale their services independently",
      "All services share the same data, so queries are simple and fast",
      "Each deployment is simpler, since the number of parts is smaller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What cost comes with microservices?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "A single point of failure in the database that all services share",
      "Slower builds, because all of the services are compiled together",
      "Fewer deployments, since all teams must release together",
      "Distributed system complexity, such as network failures, versioning and data consistency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which statement describes independent deployability?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "A service can be released without releasing or coordinating other services",
      "A service can only be released at the same time as all other services",
      "A service can be released only by the infrastructure team of the company after a review",
      "A service can be released only when its database has been migrated first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a distributed monolith?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "A monolith that is stored on several servers by the cloud provider",
      "A set of services that each have their own database and team",
      "Services that must be deployed together because they are tightly coupled",
      "A system that has one service and several copies of it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Conway's law?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "Systems get slower as the number of services increases over time",
      "Systems must have as many databases as they have teams in the company",
      "Systems tend to mirror the communication structure of the organisation that builds them",
      "Systems are easier to test when they have fewer users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the strangler fig approach to migration?",
    "topic": "Monolith vs microservices vs SOA",
    "choices": [
      "New functionality is built as services that gradually replace parts of the monolith",
      "The monolith is switched off and rewritten from scratch in one release",
      "Each class of the monolith is turned into a service at the same time",
      "The services are moved back into one process after some months"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a bounded context?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "A limit on the number of requests that a single service accepts per second",
      "A network zone in which services may call each other without checks",
      "A database schema that is shared by every team in the organisation",
      "A boundary within which a model and its terms have one clear meaning"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a good service boundary important?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "It decides how many servers each service needs to run on the network",
      "It limits coupling, so that most changes stay inside one service",
      "It sets the programming language that the team must use for the code",
      "It guarantees that the service has no errors when it is deployed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a poor sign for a service boundary?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "A service has its own database and a small public interface",
      "Two services must change together for almost every feature",
      "A service is owned by one team that understands its domain",
      "A service can be deployed on its own at any time of the week"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can the word customer mean different things in different contexts?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "Words in code are chosen at random by the developers of each service they write",
      "The database stores customers in different tables for each country",
      "Customers change their names often, so the meaning is unstable",
      "Sales, billing and support each care about different attributes and rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good starting point for finding service boundaries?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "Business capabilities and bounded contexts, not technical layers",
      "Database tables, with one service for each table of the schema of the system",
      "Programming languages, with one service for each language used",
      "Servers, with one service for each machine that is available"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of splitting a system by technical layer, such as one service for the user interface and one for the database?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "The services cannot be written in the same language",
      "The database is shared and so can no longer be backed up",
      "Every business change touches several services",
      "The interface cannot call the database in any way"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is high cohesion in a service?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "The service has many unrelated functions that are easy to find",
      "The service shares its code with many others by copying it",
      "Related functions and data live together in the same service",
      "The service has no dependencies and calls no other service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is loose coupling between services?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "A service depends on the interface of another, not on its internals",
      "A service reads the tables of another service directly for the sake of speed",
      "A service must be restarted whenever another service changes",
      "A service shares its memory with every other service on the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a service that is too small a problem, sometimes called a nanoservice?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "It cannot store any data, so it needs another service for each query",
      "It is not allowed to have its own database and its own tests",
      "It can only be called by the gateway and by no other service",
      "The overhead of calls and deployment is bigger than the benefit of the separation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can event storming help to find boundaries?",
    "topic": "Bounded contexts & service boundaries",
    "choices": [
      "The team lists the classes of the code and counts the lines in each",
      "The team maps business events and groups them into areas that belong together",
      "The team measures the network load between all of the servers",
      "The team writes the tests first and then decides the services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a fallacy of distributed computing?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "The belief that distributed systems are always faster than single machines are",
      "The belief that the network is reliable, even though calls can fail or be slow",
      "The belief that databases never fail when they run in a cluster",
      "The belief that all of the services run in the same data center"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must a caller expect failures when it calls another service?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "The other service always returns an error in the first call",
      "Calls between services are never logged by the platform",
      "The caller is always the one that has made the mistake",
      "The network, the other service or the other machine can be slow or unavailable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does latency mean in this context?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "The time that a call takes to travel and be answered",
      "The number of calls that a service can handle per second",
      "The amount of data that a service stores in its database",
      "The number of services that take part in a request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a chain of synchronous calls reduce availability?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "Each service in the chain makes the request faster for the next one",
      "The chain keeps copies of the data, so failures are hidden",
      "The request fails if any service in the chain fails",
      "The chain is checked by a gateway that retries each request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a cascading failure?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "A failure that is logged by many services at the same moment",
      "A failure that is fixed by the next service in the chain",
      "A failure in one service spreads and overloads other services that depend on it",
      "A failure that happens only in the first service of a chain"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the CAP theorem about?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "In a network partition, a system must choose between consistency and availability",
      "A system can always have consistency, availability and performance",
      "A cache must be stored in the same place as the database",
      "A service must have the same version as its client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is eventual consistency?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "All copies of the data are always identical at every moment",
      "Copies of the data are never updated after they are first written",
      "Each update is confirmed by all services before the caller gets an answer",
      "Replicas may differ for a short time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does the cost of testing grow with microservices?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "Services cannot be tested alone, since they have no public interface",
      "Many services and their interactions must be tested together in realistic setups",
      "Each service needs a test written in a different language",
      "Tests are not needed when the services are small enough"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What operational cost does a larger number of services bring?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "Less need for logging, because each service is small",
      "More things to deploy, monitor, secure and keep running",
      "A smaller number of alerts, since each service is simpler",
      "Fewer environments, since all services run together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is partial failure?",
    "topic": "Benefits, costs & fallacies of distributed systems",
    "choices": [
      "A failure in which the whole system stops at the same moment",
      "A failure that is only reported but never happens in practice",
      "A failure that is limited to the logging system of a service",
      "Some parts of the system work while others fail"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the twelve factor app?",
    "topic": "The twelve-factor app",
    "choices": [
      "A set of principles for building portable, scalable cloud applications",
      "A list of twelve tools that every microservice must use in production environments",
      "A standard that defines twelve classes for each service of a system",
      "A document that lists the twelve most common bugs in web applications"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the factor about config say?",
    "topic": "The twelve-factor app",
    "choices": [
      "Store configuration in constants in the source code of the service",
      "Store configuration in a file that is compiled into the binary",
      "Store configuration in the environment, not in the code",
      "Store configuration in a table of the database that all services share"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the factor about processes say?",
    "topic": "The twelve-factor app",
    "choices": [
      "Run the app as one process that keeps all of its state in its own memory",
      "Run the app as processes that share local files with each other",
      "Run the app as stateless processes, and keep state in backing services",
      "Run the app as processes that are started by hand on each server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the codebase factor mean?",
    "topic": "The twelve-factor app",
    "choices": [
      "One codebase in version control, with many deploys of it",
      "Many codebases for one app, one for each environment that is used",
      "One codebase for all of the apps of the company in a single folder",
      "No codebase is needed when the app is built in a pipeline"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should logs be treated as event streams?",
    "topic": "The twelve-factor app",
    "choices": [
      "The app manages its own log files, rotation and archives on the disk",
      "The app sends the logs only to a printer in the data center",
      "The app writes logs only when an error occurs in production",
      "The app writes to standard output, and the platform collects and routes the logs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the dependencies factor ask for?",
    "topic": "The twelve-factor app",
    "choices": [
      "Install the dependencies by hand on each server before the first start of the app",
      "Declare all dependencies explicitly, and do not rely on tools of the system",
      "Copy the dependency jars into the folder of another service",
      "Download the dependencies at runtime from a random web address"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does dev and prod parity mean?",
    "topic": "The twelve-factor app",
    "choices": [
      "Make development very different from production, so tests are stricter",
      "Keep development, staging and production as similar as possible",
      "Use different databases in each environment to find more bugs",
      "Keep production more powerful than development at all times"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are disposable processes good for cloud platforms?",
    "topic": "The twelve-factor app",
    "choices": [
      "They stay alive for months, so the platform never needs to restart them",
      "They keep all data in memory, so no database is needed",
      "They can only be stopped by an administrator by hand",
      "They start fast and stop gracefully"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are backing services in the twelve factor model?",
    "topic": "The twelve-factor app",
    "choices": [
      "Databases, queues and other services that the app uses over the network",
      "The servers on which the app is installed by the developers",
      "The libraries that are compiled into the app at build time",
      "The monitoring tools that are used by the operations team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does port binding mean?",
    "topic": "The twelve-factor app",
    "choices": [
      "The app needs an external web server to listen on a port for it",
      "The app opens all of the ports of the host to be flexible",
      "The app is self contained and exports its service by listening on a port",
      "The app writes the port number into the source code of its client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is synchronous communication between services?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "The caller sends a message and never expects any answer",
      "The caller writes data to a shared file that the other service reads later on",
      "The caller sends a request and waits for the response before it continues",
      "The caller starts the other service and waits for it to stop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is asynchronous communication?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "The sender passes a message and continues, and the receiver processes it later",
      "The sender waits until the receiver has processed the message",
      "The sender and the receiver run in the same thread of one process",
      "The sender and the receiver exchange messages only on weekdays"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a synchronous call a good fit?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "When the answer may arrive a day later and nobody is waiting for it",
      "When the receiver is often offline and cannot handle requests",
      "When the data is large and is sent to many receivers at once",
      "When the caller needs the answer right away to continue its work"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is asynchronous messaging a good fit?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "For a query that needs the answer to show a page immediately",
      "For work that can be done later, or that must be delivered to many consumers",
      "For a login that must return a token in a few milliseconds",
      "For a calculation that needs the state of the caller memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is temporal coupling?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "Both services must be written in the same year by the same team",
      "Both services must be available at the same time for the call to work",
      "Both services must use the same clock to measure the time",
      "Both services must store their data for the same time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a message queue reduce temporal coupling?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "The producer and the consumer must both be online to exchange messages",
      "The queue deletes messages when the consumer is not online",
      "The queue calls the consumer again until it answers",
      "The producer can send while the consumer is down, and the consumer reads later"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of asynchronous communication?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "It is harder to follow the flow and to handle errors and ordering",
      "It can only be used with a single programming language",
      "It needs more database tables than any other approach",
      "It cannot carry more than one message per second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is request and reply over messaging?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "A client makes an HTTP call and waits on the same connection",
      "A broker answers each request itself without any consumer",
      "A message is sent with a reply address, and the answer comes back as another message",
      "A server pushes data to all clients without a request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a REST call over HTTP usually give the caller?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "A guaranteed delivery even when the receiver is down for a day",
      "A stream of events from all services in the system",
      "A direct synchronous answer or an error, with simple tools and semantics",
      "An automatic copy of the data in the database of the receiver"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can mixing styles be reasonable in one system?",
    "topic": "Synchronous vs asynchronous communication",
    "choices": [
      "Queries often fit synchronous calls",
      "One style can never solve all problems, so teams must avoid both",
      "Mixed styles are required by the cloud providers for billing",
      "The two styles use different programming languages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you not use microservices?",
    "topic": "When NOT to use microservices",
    "choices": [
      "For any application that has more than one user at the same time",
      "For any application that is used by more than one team in a company",
      "For any application that needs a database to store its data",
      "For a small team, an unclear domain or a simple application that a monolith can handle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it often wise to start with a modular monolith?",
    "topic": "When NOT to use microservices",
    "choices": [
      "A monolith cannot be split later, so it is the final choice",
      "Boundaries can be learned and tested before the cost of distribution is paid",
      "It avoids the need for any structure in the code",
      "It is required by most cloud platforms before you can use services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the risk of adopting microservices too early?",
    "topic": "When NOT to use microservices",
    "choices": [
      "The team has too little code to put into the services that it creates",
      "The team pays for the complexity before the product and the domain are understood",
      "The application is too fast, and users cannot follow the screens",
      "The cloud provider blocks accounts that have several services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a modular monolith look like?",
    "topic": "When NOT to use microservices",
    "choices": [
      "Several deployable units that all share the same source folder",
      "A single class with all of the logic of the application inside",
      "A set of services that are started in one container by a script",
      "One deployable unit with clear internal modules and limited dependencies between them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which team size makes a monolith usually fine?",
    "topic": "When NOT to use microservices",
    "choices": [
      "A small team that can coordinate its releases easily",
      "A hundred teams that release in different time zones",
      "A single developer who must run a large company platform",
      "A team that cannot use version control or tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sign that microservices could help?",
    "topic": "When NOT to use microservices",
    "choices": [
      "The code compiles in less than a minute on every laptop",
      "The team has only one user who tests the application",
      "Teams block each other on releases, and parts need to scale in different ways",
      "The application has no tests and no clear modules"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do microservices need a mature delivery pipeline?",
    "topic": "When NOT to use microservices",
    "choices": [
      "Services are deployed by hand, which is faster for small changes",
      "A pipeline is needed only for the first release of the system",
      "Many services must be built, tested and deployed automatically and often",
      "Pipelines are not allowed in systems with several services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean to optimise for team autonomy?",
    "topic": "When NOT to use microservices",
    "choices": [
      "Teams can make and ship decisions about their service without waiting for others",
      "Each team must wait for approval from all other teams before a release",
      "Every team must use the same tools, versions and release dates",
      "A single committee approves each commit of each team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is data consistency harder with microservices?",
    "topic": "When NOT to use microservices",
    "choices": [
      "All services share one table, so locks block every query",
      "The database cannot store records from more than one service",
      "Consistency is not needed in a system that has several services",
      "Each service owns its data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a reasonable first step toward microservices from a monolith?",
    "topic": "When NOT to use microservices",
    "choices": [
      "Rewrite the whole system in one big release with all new services at the same time",
      "Define module boundaries and extract one well understood capability",
      "Split the database into one table per service before the code",
      "Stop adding features until the migration is complete"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-2

```json
[
  {
    "stem": "What is the goal of domain driven design?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "Make the database schema as detailed as possible before any code is written",
      "Replace the business experts with automatic code generators in each team",
      "Align the software model with the business domain, using a shared language",
      "Reduce the number of classes in the system to the smallest possible count"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the ubiquitous language?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "A shared vocabulary that developers and domain experts use in talks and in code",
      "A programming language that all of the services of the company must use",
      "A set of abbreviations that the operations team uses in the dashboards of the monitoring tools",
      "A translation of the user interface into many languages for customers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an entity in DDD?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "An object with no identity that is compared only by the values of its fields",
      "A table in the database that stores the rows of one single service",
      "A class that is created only for the use of tests and examples",
      "An object with an identity that continues over time, even when its attributes change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a value object?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "An object with a unique id that is stored in its own database table of the service",
      "An immutable object defined by its values and with no identity of its own",
      "An object that holds a pointer to an entity in a different service",
      "An object that can be changed by any code that holds a reference"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a domain service?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "A web service that exposes the domain model to the outside world",
      "Domain logic that does not naturally belong to one entity or value object",
      "A background job that cleans the tables of the domain each night",
      "A service that holds the configuration of every domain that exists in the company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between the domain and the infrastructure layer?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "The infrastructure holds business rules, and the domain handles databases and messaging",
      "They are the same layer with two names that depend on the framework",
      "The domain layer holds only the user interface and its templates",
      "The domain holds business rules, and infrastructure handles things such as databases and messaging"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a domain event?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "A fact that has happened in the domain, named in the past tense",
      "A command that asks the system to do something in the future, such as PlaceOrder",
      "A scheduled job that runs at a fixed time every day",
      "A log line that records an error in one of the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is DDD more valuable for complex domains than for simple data entry apps?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "Simple apps need the most modelling, because they have the most users",
      "Complex domains cannot use any database, so a model is the only choice",
      "Complex rules need a clear model",
      "DDD is only a way to name the packages of a project in a standard way"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does anemic domain model mean?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "Entities hold all of the logic and no data at all in their fields",
      "Entities are stored in a text file instead of a database table",
      "Entities hold data only, while the logic lives in separate service classes",
      "Entities are created only once at the start of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is strategic design in DDD?",
    "topic": "Domain-driven design essentials",
    "choices": [
      "Defining bounded contexts and how they relate at the level of the whole system",
      "Choosing the framework and the build tool for each team of developers",
      "Writing the names of the methods in the code of one single class",
      "Deciding the colours and the layout of the screens for the product"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an aggregate?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "A report that sums up the values of the rows of a table for a month",
      "A group of services that run in the same container on a host",
      "A list of all the events that happened in a given period",
      "A cluster of objects that is treated as one unit for changes, with a root entity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the aggregate root?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "The first service that starts when the platform is booted by the operators",
      "The entity through which all changes to the aggregate must pass",
      "The database table with the largest number of rows",
      "The class with the main method of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep aggregates small?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "Larger aggregates are forbidden by every database that exists",
      "Smaller aggregates reduce contention and make transactions simpler",
      "Small aggregates are needed for the code to compile in all languages",
      "Aggregates must have at most two fields, or they cannot be saved"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the rule about transactions and aggregates?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "A transaction should always change as many aggregates as possible",
      "A transaction should change aggregates of different services together",
      "A transaction should never be used with aggregates at all",
      "A transaction should change only one aggregate, with other changes done by events"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should one aggregate refer to another?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "By its identity, not by holding a direct object reference",
      "By holding a full copy of the other aggregate inside its own fields",
      "By sharing the same table row with the other aggregate in the database",
      "By calling the other aggregate through a global static variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a context map?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "A map of the data centers in which the services of the company are running",
      "A list of the endpoints that a service exposes to its clients",
      "A diagram that shows bounded contexts and the relationships between them",
      "A table of the users and the roles that they have in the system"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an anti corruption layer?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "A security layer that blocks requests that contain harmful input",
      "A cache layer that stores the answers of a slow external service",
      "A translation layer that protects a model from the model of another system",
      "A logging layer that records all of the calls of a service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a shared kernel mean between two contexts?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "They share a small part of the model, and both teams must agree on changes",
      "They share one database and all of the tables without any rules",
      "They share the same team, which works on both of them at once",
      "They share no code and no data, and they never talk to each other"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a customer supplier relationship between contexts?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "The downstream team writes the code of the upstream team directly",
      "Both teams ignore each other and work with no contact at all",
      "The customer team pays the supplier team for each line of code",
      "The upstream team provides what the downstream team needs, and they plan together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the model inside a bounded context stay consistent?",
    "topic": "Aggregates & bounded contexts",
    "choices": [
      "Consistency is needed because the compiler checks the model across contexts",
      "Terms and rules mean one thing there",
      "Different contexts must have the same model so they can share the tables",
      "Consistency makes the context run faster on the hardware of the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a service contract?",
    "topic": "Defining service contracts",
    "choices": [
      "A legal agreement between the company and the cloud provider for the hosting of services",
      "The agreed interface of a service, including requests, responses and behaviour",
      "A list of the classes that a service contains and their authors",
      "A schedule that says when each service may be restarted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why design the contract before the implementation?",
    "topic": "Defining service contracts",
    "choices": [
      "The implementation cannot be written without a contract in any language",
      "Contracts make the code of the implementation run faster in production",
      "The contract is generated from the code, so it must exist first",
      "Clients and providers can work in parallel, and the interface is thought through"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is consumer driven contract design?",
    "topic": "Defining service contracts",
    "choices": [
      "Consumers state what they need, and providers make sure not to break it",
      "Providers decide the contract and consumers must accept it without any input",
      "The contract is decided by a vote of all of the teams of the company",
      "The contract is written by the operations team that runs the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a good contract avoid exposing?",
    "topic": "Defining service contracts",
    "choices": [
      "Any field that clients might need to build their screens and reports",
      "The names of the operations that the service provides to its users",
      "Internal details such as database structure and internal ids that clients should not use",
      "The status codes that describe errors to the clients of the API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the robustness principle for contracts, also called Postel's law?",
    "topic": "Defining service contracts",
    "choices": [
      "Be liberal in what you send and strict in what you accept",
      "Send everything you have and ignore everything that you receive",
      "Be conservative in what you send and liberal in what you accept",
      "Accept only what you expect and reject every other field at once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use schemas for contracts, such as OpenAPI or Protocol Buffers?",
    "topic": "Defining service contracts",
    "choices": [
      "They describe the interface in a machine readable form for validation and code generation",
      "They make the services run on a different virtual machine than before",
      "They replace the need for any tests of the service and its clients",
      "They encrypt the data between the client and the service by default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a breaking change in a contract?",
    "topic": "Defining service contracts",
    "choices": [
      "A change that adds a new optional field that old clients can ignore",
      "A change that improves the speed of a response with the same shape",
      "A change to the internal code that clients cannot observe",
      "A change that makes existing consumers fail"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a tolerant reader?",
    "topic": "Defining service contracts",
    "choices": [
      "A consumer that fails when it receives any unknown field in a response",
      "A consumer that ignores fields that it does not know instead of failing",
      "A consumer that reads data only from the first service of a list",
      "A consumer that stores the whole response in a log file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should events also have a contract?",
    "topic": "Defining service contracts",
    "choices": [
      "Events are internal, so changes to them never affect other services",
      "Consumers depend on their shape",
      "Events are always encrypted, so nobody can depend on their content",
      "Events carry no data, so no contract is needed for them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice when you need to change a contract?",
    "topic": "Defining service contracts",
    "choices": [
      "Change the shape at once and tell the consumers after the release",
      "Rename the service so that old clients cannot reach it any more",
      "Keep the contract secret from the consumers until the last moment",
      "Add new fields in a compatible way and deprecate the old ones with a timeline"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why version an API?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Consumers can move to changes at their own pace without breaking",
      "Versions make each request faster since the server knows the version",
      "Versioning replaces the need for documentation of the interface",
      "Each version needs its own database, so versions limit data growth"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which are common ways to version a REST API?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "In the colour of the response or in the time of the request",
      "In the size of the response or in the name of the server",
      "In the path, in a header or in a media type",
      "In the name of the developer or in the date of the commit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is backward compatibility?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Old versions of a service still work with clients written for new versions",
      "A service can be rolled back to a previous version of its database",
      "New versions of a service still work with clients written for old versions",
      "The code of a service can be built with an older version of the compiler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of additive changes?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Adding optional fields does not break old consumers",
      "Adding fields makes the response smaller for all existing consumers",
      "Additive changes remove the need for tests of the new fields",
      "Additive changes force every consumer to update right away"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the expand and contract pattern?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Remove the old form first, then add the new one when the users start to complain",
      "Expand the number of servers first, and later reduce them again",
      "Contract the team size first, then expand it after the release",
      "Add the new form beside the old, migrate users, then remove the old form"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How long should a deprecated API version be supported?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Only until the next release of the provider, so as to save costs",
      "Long enough for consumers to migrate, with a communicated end date",
      "For ever, since no version may ever be removed from a service",
      "For one day, so that consumers are forced to move at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is semantic versioning?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "A numbering that uses the date of the release as the version",
      "Major, minor and patch numbers, where major signals breaking changes",
      "A numbering that is chosen by marketing for each new feature",
      "A numbering that counts the number of lines in the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid exposing too many versions at the same time?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Versions use a lot of disk space on the machines of the clients",
      "The gateway cannot route more than two versions at a time",
      "Clients cannot choose a version when there are more than two",
      "Each version has a maintenance and testing cost"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can a gateway do to help with versioning?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Route requests to the right version of a service based on path or header",
      "Translate all of the versions into the language of the client automatically",
      "Delete old versions of the data from the database at night",
      "Decide the version for each client at random on every request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe way to remove a field from a response?",
    "topic": "API versioning & backward compatibility",
    "choices": [
      "Remove it in the next release without telling the consumers about it",
      "Rename the field to a random name so that old clients stop using it",
      "Deprecate it, check that no consumer uses it",
      "Leave the field empty in the response but never remove the key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does database per service mean?",
    "topic": "Database-per-service",
    "choices": [
      "All of the services share one database but use different tables",
      "Each developer has a database of their own on a laptop for tests",
      "Each service owns its data, and others access it only through the service interface",
      "Each database has its own service that backs it up each night"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why not let services share a database?",
    "topic": "Database-per-service",
    "choices": [
      "It couples them through the schema",
      "Shared databases are not supported by any database product in the market",
      "Shared databases are slower than separate ones in every case",
      "It would make the data too small to be useful for each service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a service get data that belongs to another service?",
    "topic": "Database-per-service",
    "choices": [
      "By reading the tables of the other service directly with a read only user",
      "By copying the other database to its own server every night",
      "By guessing the values from the logs that the other service writes",
      "By calling its API or by consuming events and keeping a local copy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a drawback of database per service?",
    "topic": "Database-per-service",
    "choices": [
      "It makes the databases use the same schema for all services",
      "Joins and transactions across services are not possible",
      "It forces all of the services to use the same database product",
      "It removes the possibility to back up the data of a service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Is polyglot persistence allowed with database per service?",
    "topic": "Database-per-service",
    "choices": [
      "No, all services must use the same type of database for the sake of consistency",
      "Yes, each service may choose the database type that fits its data best",
      "Yes, but only when all databases are provided by the same vendor",
      "No, because each service must store its data in files only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can reporting across services be done?",
    "topic": "Database-per-service",
    "choices": [
      "By joining the tables of all services in one big query at runtime",
      "By asking each service to send a report by email every hour",
      "By giving the report tool full access to all of the production databases",
      "By collecting data into a separate store"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is data duplication in this setting, and is it always bad?",
    "topic": "Database-per-service",
    "choices": [
      "Services keep copies of data they need",
      "Each service must keep a full copy of all data, which is always required",
      "Duplication is forbidden, and any copy of data must be deleted at once",
      "Duplicated data is automatically merged by the platform at night"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the system of record for a piece of data?",
    "topic": "Database-per-service",
    "choices": [
      "The database that has the most free disk space in the cluster",
      "The service that was written first by the oldest team",
      "The one service that owns it and is the source of truth",
      "The report tool that shows the data to the managers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of a shared library that contains the entities of several services?",
    "topic": "Database-per-service",
    "choices": [
      "It makes each service use less memory at runtime in the cluster",
      "It forces the services to use different programming languages",
      "It couples the services in their code and forces common releases",
      "It removes the need to define the interfaces between services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it hard to change a shared database schema safely?",
    "topic": "Database-per-service",
    "choices": [
      "Many services depend on it",
      "The schema cannot be changed after the first row has been written",
      "The database refuses all changes made by more than one user",
      "Schemas are stored on paper in many companies and are slow to edit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a decomposition strategy?",
    "topic": "Decomposition strategies",
    "choices": [
      "A method of compressing the data of a service before it is stored",
      "A tool that deletes unused services from a cluster automatically",
      "A way to split a database table into columns of equal size",
      "A way to split a system into services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does decomposing by business capability mean?",
    "topic": "Decomposition strategies",
    "choices": [
      "Services are aligned to the layers of the code, such as view and data",
      "Services are aligned to what the business does",
      "Services are aligned to the people who sit near each other in the office",
      "Services are aligned to the size of each table in the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does decomposing by subdomain mean?",
    "topic": "Decomposition strategies",
    "choices": [
      "Services follow the sub folders of the source code repository",
      "Services follow the subdomains found with domain driven design",
      "Services follow the sub networks of the data center that is used",
      "Services follow the sub versions of the programming language"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why start extracting services at the edges?",
    "topic": "Decomposition strategies",
    "choices": [
      "The edges of a system contain all of the business rules and data",
      "Edge services are needed first for the monolith to start at all",
      "Extracting the core first is not allowed by the cloud platforms",
      "Edge capabilities have fewer dependencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the branch by abstraction technique?",
    "topic": "Decomposition strategies",
    "choices": [
      "Put an interface in front of the old code and switch to a new implementation behind it",
      "Create a new git branch for each service and merge them at the end",
      "Rename the abstract classes of the monolith to match the services",
      "Remove all interfaces from the code so that it can be moved easily"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good first service to extract from a monolith?",
    "topic": "Decomposition strategies",
    "choices": [
      "The module that is entangled with all other modules of the code",
      "The module with no users that nobody has looked at for years",
      "A capability with clear boundaries, low coupling and real business value",
      "The database layer, which every other module depends on"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the strangler pattern use to redirect traffic gradually?",
    "topic": "Decomposition strategies",
    "choices": [
      "A script that copies the monolith to many servers at the same time",
      "A database trigger that deletes the old data after each request",
      "A facade or proxy that routes some requests to the new service and others to the monolith",
      "A timer that turns off the monolith after one week of use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of splitting the code before splitting the data?",
    "topic": "Decomposition strategies",
    "choices": [
      "The services stay coupled through the shared database",
      "The code runs slower since it is spread over more files",
      "The data is deleted when the code is moved to another repository",
      "The compiler can no longer build the project without the data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why measure before and after extraction?",
    "topic": "Decomposition strategies",
    "choices": [
      "Measurements are required by the tools that build the services",
      "Services cannot be started until the numbers are published",
      "Measuring makes the extracted service run faster than before",
      "You can check whether the change delivered the benefit that you expected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good size for a service, according to many teams?",
    "topic": "Decomposition strategies",
    "choices": [
      "One that has exactly one hundred lines of code in its sources",
      "One that a small team can own, understand and change on its own",
      "One that has exactly one table in its own database schema",
      "One that is bigger than all other services in the system"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-3

```json
[
  {
    "stem": "What is a typical advantage of REST over gRPC for public APIs?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "It sends smaller binary messages that are faster to encode and decode",
      "It supports bidirectional streaming over a single long connection",
      "It works in every browser and tool with plain HTTP and readable JSON",
      "It generates strongly typed client code from a schema in every case"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical advantage of gRPC for internal service calls?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "Compact binary messages, strong typing and streaming over HTTP/2",
      "Simple calls from a browser with no extra proxy or gateway at all",
      "Human readable payloads that can be inspected with a text editor",
      "Built in caching of responses by every proxy on the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What transport does gRPC use?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "FTP",
      "HTTP/1.0 only",
      "SMTP",
      "HTTP/2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might REST be a better choice than gRPC?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "For internal calls between services that need the lowest latency",
      "For public APIs that many different clients and browsers must call",
      "For streaming large volumes of data between two backend services",
      "For services that are written in a single language by one team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does gRPC need to describe a service?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "A JSON file with the paths and the methods of each endpoint",
      "A proto file with the service and the message definitions",
      "An XML file with the schema of every table in the database",
      "A text file with the list of all hosts and ports in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What type of calls does gRPC support besides unary calls?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "Only server streaming, which is one way from the server",
      "Only batch calls that run once a day at a set time",
      "Only calls that are made over a message broker",
      "Server, client and bidirectional streaming"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can gRPC be harder to use from a browser?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "Browsers cannot use HTTP/2 trailers in the same way",
      "Browsers do not support any binary data in network requests",
      "Browsers cannot open more than one HTTP connection at a time",
      "Browsers refuse to load code that is generated from a proto file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common reason to pick REST for a team that is new to services?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "REST is the only style that works with containers and Kubernetes",
      "REST is always faster than any binary protocol on the market",
      "Tooling and skills are widespread, and calls are easy to test by hand",
      "REST removes the need to handle timeouts and retries for calls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is true about both REST and gRPC?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "Both guarantee delivery even when the receiver is offline for a day",
      "Both remove the need for versioning and contract management",
      "Both can be used for synchronous service calls, and both need careful error handling",
      "Both are message brokers that store messages for later delivery"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a status code carry in gRPC?",
    "topic": "REST vs gRPC trade-offs",
    "choices": [
      "A standard code such as NOT_FOUND or UNAVAILABLE",
      "A numeric HTTP code that is the same as the REST status codes",
      "A text message only, which has no fixed meaning for clients",
      "A hash of the request body for the integrity check"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are Protocol Buffers?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "A pool of memory that services use to share objects with each other",
      "A database that stores data in a tree structure on disk",
      "A tool for compressing log files before they are archived",
      "A language neutral way to define messages and serialise them to a compact binary form"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a field number in a proto message do?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "It sets the order in which fields are shown in the user interface",
      "It identifies the field in the binary format",
      "It limits the number of times that the field can be repeated",
      "It defines the size of the field in bytes in the memory of the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it risky to change the type or number of an existing field?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "The compiler refuses to compile any file that has a changed field",
      "Old and new code would read the same bytes differently",
      "The change deletes all stored messages of that type from the broker",
      "The field would be encrypted with a different key for each client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a proto message has a field that a client does not know?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "The client crashes with an error message that stops the process",
      "The client sends the message back to the server for repair",
      "The client deletes the whole message and logs a warning",
      "The unknown field is ignored or preserved"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a schema registry used for?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "Storing and checking the versions of schemas so changes stay compatible",
      "Storing the passwords of the services in an encrypted form",
      "Listing the hosts that are available for each service name",
      "Recording which developers have access to each repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for deleting a field in a proto file?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "Reuse its number for a new field of a different type at once",
      "Rename the field and keep using the same number for a new meaning",
      "Mark its number and name as reserved so they cannot be reused",
      "Change its type to string so it can hold any old value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is Protocol Buffers usually smaller than JSON?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "It removes all of the data that the client does not need",
      "It compresses each message with a zip algorithm by default",
      "It uses a binary encoding with field numbers instead of repeated field names",
      "It sends only the changed fields since the last request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of generated code from a schema?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "Client and server stubs match the contract",
      "The code runs without a compiler in every environment",
      "The generated code never needs to be updated with the schema",
      "The code can read any message format without a definition"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Avro often used for?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "Encrypting the messages between a client and a gateway",
      "Compiling the code of services to native binaries",
      "Routing HTTP requests to different versions of a service",
      "Serialising data with a schema, often in Kafka based pipelines"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do schema compatibility rules matter for events?",
    "topic": "Protocol Buffers & schemas",
    "choices": [
      "Events are processed only once, so compatibility is never needed",
      "Consumers may read old and new events",
      "Events are encrypted, so their schema cannot be changed at all",
      "Brokers refuse events that have more than ten fields in them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is service discovery?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "A tool that searches the source code for services that are unused",
      "A mechanism that lets services find the current addresses of other services",
      "A report of the services that exist in a company and their owners",
      "A test that discovers the bugs of services in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a fixed IP address list a poor way to find services in the cloud?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "IP addresses are not allowed in any container network",
      "Fixed lists are too short to hold the addresses of ten services",
      "DNS cannot resolve names to IP addresses in containers",
      "Instances start, stop and move"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is client side discovery?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "The client asks a registry for instances and picks one itself",
      "A central load balancer picks the instance for the client always",
      "The client uses a hard coded address that never changes",
      "The client asks the user which server it should use"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is server side discovery?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "The client reads the registry and decides which instance to use",
      "The server asks the client for its address before every call",
      "The client calls a router or load balancer",
      "The server writes its address into the source code of the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Kubernetes support discovery by default?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "With a text file that each pod must read at its startup",
      "With a registry that each developer must run on a laptop",
      "With services and DNS names that resolve to the pods behind them",
      "With a command that prints the IP of each pod on request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a health check used for in discovery?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "To remove unhealthy instances from the list that clients may use",
      "To measure how fast a developer fixes a bug in a service",
      "To count how many requests each instance has served so far",
      "To check the spelling of the names of the services in the registry"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a client library for a service?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "A library that contains all of the data of the service",
      "A tool that deletes old versions of the service from the registry",
      "A script that starts the service on the machine of a client",
      "A package that wraps calls to a service, with timeouts, retries and typed methods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of a shared client library for many services?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "The library cannot be used by more than one service at the same time",
      "Version coupling, when each service needs the same library version at once",
      "The library removes the need for authentication between services",
      "The library is always larger than the service that it calls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a service mesh sidecar do for discovery and calls?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "It stores the source code of the service in a separate container",
      "It handles routing, retries and security next to each service",
      "It writes the logs of the service into a database in real time",
      "It restarts the service every time that a request fails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does DNS based discovery depend on?",
    "topic": "Client libraries & service discovery",
    "choices": [
      "A registry that must be reachable by every client with a token",
      "A file system share that holds the addresses of all hosts",
      "A database table that is updated by each developer manually",
      "DNS records that point to the instances, with caching that can delay changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should every remote call have a timeout?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Without one a slow service can block callers and exhaust their resources",
      "Timeouts make the remote service faster for the next caller",
      "Timeouts are required by the HTTP standard for each request",
      "A timeout is needed only for the first call after the start"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a retry with exponential backoff?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Retries are sent as fast as possible until one of them succeeds",
      "Retries happen at a fixed time every day regardless of the failure",
      "Retries wait longer after each failure",
      "Retries are sent to all instances at the same moment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add jitter to retry delays?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Jitter makes every retry succeed on the second attempt",
      "Jitter makes the delays shorter than the first request",
      "Clients do not retry at the same moment",
      "It hides the retries from the monitoring tools of the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an idempotent operation?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Repeating it has the same effect as doing it once",
      "It can only be called once per day by a single client",
      "It always returns a different result on every call",
      "It never changes any data in the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must retried requests be idempotent or protected by a key?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Retried requests are ignored by the server in all cases",
      "Retries are only allowed for requests that read data",
      "Servers reject requests that are sent more than once",
      "A retry might repeat a side effect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an idempotency key?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "A secret used to encrypt requests between two services",
      "A unique id sent with a request so the server can detect and ignore duplicates",
      "A number that counts how many times a request has been tried",
      "A password that a client uses to log in to the service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which HTTP methods are idempotent by definition?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "POST and PATCH",
      "GET, PUT and DELETE",
      "Only POST",
      "None of them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can go wrong if all callers retry at once when a service is struggling?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "The service recovers faster, since more requests warm up the cache",
      "The load balancer removes the failed requests from the log",
      "The retries are all merged into one request by the network",
      "A retry storm that adds more load and makes the failure worse"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a deadline or timeout budget across a chain of calls?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "The remaining time is passed on",
      "Each service in the chain sets its own timeout independently of the caller",
      "The first service gets all the time and the later ones get none",
      "The budget is the money that a team may spend on the calls"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a client do when it cannot get an answer in time?",
    "topic": "Timeouts, retries & idempotency",
    "choices": [
      "Wait until the service answers, however long that takes",
      "Retry in a tight loop until the service becomes available",
      "Fail fast or use a fallback, instead of waiting for ever",
      "Delete the request so that nobody can see the failure"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a contract test?",
    "topic": "Contract testing",
    "choices": [
      "A test of the legal contract between the company and a customer",
      "A test that measures the speed of a service under heavy load",
      "A test that checks that a provider and a consumer agree on the interface",
      "A test of the colours and the layout of a user interface"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is consumer driven contract testing?",
    "topic": "Contract testing",
    "choices": [
      "Consumers publish expectations, and the provider verifies that it meets them",
      "The provider publishes expectations, and the consumers must accept them",
      "Both sides write tests that are never compared with each other",
      "A third team writes the tests and the services never run them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tool is commonly used for consumer driven contracts?",
    "topic": "Contract testing",
    "choices": [
      "Postman collections only",
      "Selenium",
      "JMeter",
      "Pact"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are contract tests faster than full end to end tests?",
    "topic": "Contract testing",
    "choices": [
      "They skip the interface and test only the database queries",
      "They check the interface without starting all the services together",
      "They use real production data, so they need no setup at all",
      "They run only once a month in a special environment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a provider verification do?",
    "topic": "Contract testing",
    "choices": [
      "It deletes the expectations of the consumers from the broker",
      "It replays the consumer expectations against the provider and reports failures",
      "It sends the provider code to the consumers for review",
      "It measures the number of requests that the provider can serve"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does a contract test help catch a breaking change?",
    "topic": "Contract testing",
    "choices": [
      "After release, when customers report errors in production",
      "Never, since contract tests do not run in the pipeline",
      "Only when the consumer and provider are in the same repository",
      "Before release, when a provider change breaks what a consumer expects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the weakness of relying only on end to end tests for service interactions?",
    "topic": "Contract testing",
    "choices": [
      "They are slow, flaky and hard to set up and debug",
      "They cannot test any interface between two real services",
      "They are not allowed to run in a continuous integration pipeline",
      "They only find bugs in the user interface and nowhere else"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a pact broker for?",
    "topic": "Contract testing",
    "choices": [
      "Routing messages between two services in production",
      "Storing the passwords for the test environment",
      "Sharing contracts and verification results between teams",
      "Managing the releases of the front end only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do contract tests fit the test pyramid?",
    "topic": "Contract testing",
    "choices": [
      "They replace unit tests, which are not needed with services",
      "They sit above end to end tests as the most expensive layer",
      "They sit between unit tests and end to end tests, checking interfaces cheaply",
      "They have no place in a test pyramid at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does can I deploy check mean in contract testing?",
    "topic": "Contract testing",
    "choices": [
      "It checks whether a version is compatible with the versions that are in an environment",
      "It asks the operations team for permission to deploy the service",
      "It checks whether the server has enough free memory",
      "It checks whether the code has been reviewed by two people"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is backward compatible evolution of an API?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Changes that require all clients to update at the same time",
      "Changes that remove old fields to keep the API small",
      "Changes that are applied only on the first of each month",
      "Changes that keep old clients working without any update"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which change is usually backward compatible?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Renaming a required field in a request",
      "Adding an optional field to a response",
      "Changing the type of an existing field",
      "Removing an endpoint that clients call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between backward and forward compatibility?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Backward means old code reads new data, forward means new code reads old data",
      "Backward means new code reads old data, forward means old code reads new data",
      "They mean the same thing in the context of schemas",
      "Backward applies to databases and forward applies to services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should consumers be tolerant of unknown fields?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Unknown fields are always errors that should stop processing",
      "Tolerance makes the consumer run faster on large messages",
      "It prevents the provider from adding fields at all",
      "Providers can add fields without breaking them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe way to rename a field?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Add the new name, support both for a time, migrate clients, then remove the old name",
      "Rename it in a single release and tell clients to update immediately",
      "Change the type and the name together to avoid confusion",
      "Remove the field and recreate it in a new endpoint without notice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a deprecation policy specify?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Which developers may delete code from the repository",
      "How many bugs a service may have before it is stopped",
      "How and when old features will be removed, with notice for consumers",
      "Which services are allowed to call other services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use feature flags or parallel versions during migration?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Flags make the service faster by skipping unused code",
      "Flags remove the need for tests of the new behaviour",
      "Old and new behaviour can run side by side while consumers move over",
      "They allow the provider to hide changes from its own team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of removing an endpoint without checking usage?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Some consumer may still depend on it and fail in production",
      "Nothing happens, since unused endpoints cannot be called",
      "The gateway deletes all of the other endpoints as well",
      "The database loses the data that the endpoint used to serve"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can usage of an old endpoint be tracked?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "By asking every developer to remember which services call it",
      "By reading the source code of the provider only",
      "By removing the endpoint and watching for complaints",
      "With metrics and logs that show which clients still call it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does consumer migration support mean for providers?",
    "topic": "Backward-compatible evolution",
    "choices": [
      "Providers force consumers to move on the day of the release",
      "Providers help consumers move, with documentation, notices and time",
      "Providers keep all old versions for ever without any cost",
      "Providers ignore the consumers and change the interface at will"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-4

```json
[
  {
    "stem": "What is the main idea of event driven design?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "Services call each other synchronously and wait for every answer",
      "All services share a single database and read each other tables",
      "Services communicate by publishing and reacting to events instead of calling each other directly",
      "Services are started by a scheduler at fixed times"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a message broker?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "A system that receives messages from producers and delivers them to consumers",
      "A tool that writes the documentation of the services",
      "A gateway that validates the passwords of the users",
      "A cache that stores the results of queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between Kafka and RabbitMQ in typical use?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "RabbitMQ is a distributed log for high throughput streams, and Kafka is a broker that routes single messages to queues",
      "They are the same product that is sold by two companies",
      "Kafka is a database and RabbitMQ is a web server",
      "Kafka is a distributed log for high throughput streams, and RabbitMQ is a broker for routing messages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a topic in Kafka?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "A single message with a title",
      "A named stream of records that is split into partitions",
      "A user account of the broker",
      "A connection between two brokers that copies the records from one cluster to another"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Kafka consumer group do?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "Consumers copy each record to a separate topic",
      "Consumers share the partitions of a topic",
      "Consumers are grouped by the colour of their logs",
      "Consumers vote on which record is valid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an exchange in RabbitMQ?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "A queue that stores the messages for one consumer until they are processed, with an optional expiry",
      "A client library for sending messages",
      "A user that publishes to a broker",
      "A component that routes messages to queues based on rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does acknowledging a message mean?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "The consumer tells the broker that processing is done",
      "The producer tells the broker that it wants to stop sending",
      "The broker tells the producer that the queue is full",
      "The consumer deletes the message without processing it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Spring project simplifies messaging with Kafka and RabbitMQ?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "Spring Data JPA and Spring Security",
      "Spring Batch and Spring Shell",
      "Spring for Apache Kafka and Spring AMQP",
      "Spring Batch and Spring Shell, which are used for jobs and command line tools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of asynchronous messaging between services?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "Messages are always delivered exactly once with no effort",
      "Messages are always delivered exactly once, so the system needs no monitoring or retry logic of its own",
      "Services are decoupled in time, and a slow consumer does not block the producer",
      "Every call returns the result at once to the caller"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of event driven systems?",
    "topic": "Message brokers — RabbitMQ vs Kafka",
    "choices": [
      "They are harder to trace and to reason about, and consistency is eventual",
      "They cannot scale beyond one server",
      "They need all of the services to be written in the same language and to share one database schema",
      "They remove the possibility to retry failed work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the publish subscribe pattern?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "A sender writes messages to one queue and only one consumer receives each message",
      "A client calls a server and waits for the answer on the same connection",
      "A scheduler runs a job at a fixed time and stores the result in a file",
      "A publisher sends messages to a topic, and every subscriber of the topic receives a copy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a work queue?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "Messages are copied to all consumers so that each worker handles the same message",
      "Messages are shared among competing consumers",
      "Messages are stored in a file that a person reads at the end of the day",
      "Messages are sent back to the producer when a worker has finished"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a work queue a good fit?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "To tell all services about a change, so each one can react to it",
      "To spread tasks, such as image processing, over several workers",
      "To store the history of all events for ever, so that they can be replayed",
      "To answer a question from a user at once with a single value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is publish subscribe a good fit?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "When one worker must process each task exactly one time",
      "When the caller needs a result before it can go on with its work",
      "When the data must be kept in a relational table for reports",
      "When several services need to react to the same event independently"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a competing consumers setup give you?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "Horizontal scaling of processing, because more workers can share the load",
      "A copy of every message for each worker, which makes the system safer",
      "A strict order of all messages over all workers at the same time",
      "Automatic deletion of messages that have been read once by anyone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a queue length metric useful for?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "It shows how many messages each producer has sent since the last year",
      "It shows the size of the disk that the broker uses for logs only",
      "It shows whether consumers keep up with producers, and can drive scaling",
      "It shows how many developers read messages from the queue"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a fan out exchange in RabbitMQ?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "It sends each message to exactly one queue chosen at random",
      "It deletes the message after the first consumer has read it",
      "It copies each message to all of the queues that are bound to it",
      "It stores the message in a database before it is delivered"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a topic exchange in RabbitMQ?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "It routes messages to queues by matching patterns of the routing key",
      "It sends messages to the topic of a Kafka cluster with no changes",
      "It stores messages in a topic that is shared by all of the services",
      "It limits the number of messages that a consumer may read per day"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a Kafka topic support publish subscribe?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "Each message is deleted as soon as the first consumer has read it",
      "Consumers must share one offset, so only one of them sees the message",
      "The broker copies the topic into a new queue for each consumer",
      "Each consumer group reads the topic independently with its own offsets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why decouple producers from consumers with a broker?",
    "topic": "Pub/sub & work queues",
    "choices": [
      "They must be deployed at the same time with the same version",
      "They do not need to know each other, and can scale and fail independently",
      "The producer needs the address of every consumer in its configuration",
      "The consumer must be running before the producer can send anything"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is event driven architecture?",
    "topic": "Event-driven architecture",
    "choices": [
      "Services call each other in a fixed order that is set in a central file",
      "Services react to events that others publish",
      "Services are started by users who click on buttons in a console",
      "Services share one database and poll it for changes each minute"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an event and a command?",
    "topic": "Event-driven architecture",
    "choices": [
      "A command states that something happened, while an event asks someone to act",
      "They are the same, and the two words are used for the same messages",
      "An event can only be sent to one receiver, while a command goes to many",
      "An event states that something happened"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of event driven design?",
    "topic": "Event-driven architecture",
    "choices": [
      "Loose coupling, since publishers do not know who consumes their events",
      "Strict ordering of all actions across every service in the system",
      "A single place in the code where the whole flow is easy to read",
      "No need for monitoring, because events record everything automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of event driven design?",
    "topic": "Event-driven architecture",
    "choices": [
      "It forces all services to use the same programming language",
      "It cannot be used with more than one consumer for the same event",
      "The flow is spread over many services",
      "It needs a database transaction that spans all of the services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should an event contain?",
    "topic": "Event-driven architecture",
    "choices": [
      "Only the name of the table that has changed in the database",
      "A full dump of the database of the publisher at that moment",
      "The facts that consumers need, often with ids and the relevant data",
      "The source code of the function that created the event"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is event carried state transfer?",
    "topic": "Event-driven architecture",
    "choices": [
      "Events contain enough data that consumers do not need to call back the publisher",
      "Events contain only an id, and consumers must call back to read the data",
      "Events are carried by trucks from one data center to another",
      "Events carry the state of the user interface of the publisher"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is event notification, in contrast to carrying state?",
    "topic": "Event-driven architecture",
    "choices": [
      "The event contains a full copy of all the data of the publisher",
      "The event is sent to the user as an email for each change",
      "The event is stored in a log file and never delivered to anyone",
      "The event only says that something changed, and consumers fetch the details if needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is choreography?",
    "topic": "Event-driven architecture",
    "choices": [
      "A central service tells each other service what to do at every step",
      "Services react to each other events with no central coordinator",
      "Developers coordinate the services by hand during each deployment",
      "The services are started in a fixed order by a script of the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of long event chains?",
    "topic": "Event-driven architecture",
    "choices": [
      "Events become too small, so they cannot be sent over the network",
      "It becomes hard to see the overall flow and to find where it failed",
      "The broker refuses to store more than three events in a row",
      "The services lose the ability to be deployed on their own"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why name events in the past tense, such as OrderPlaced?",
    "topic": "Event-driven architecture",
    "choices": [
      "Past tense makes the message shorter, so it is faster to send",
      "Names in the past tense are required by every message broker",
      "It tells the consumer to run the action again in the past",
      "It states a fact that already happened and cannot be undone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is event sourcing?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "State is stored as a sequence of events, and the current state is derived from them",
      "State is stored in the latest row of a table with no history at all",
      "State is copied to a cache and the database is switched off",
      "State is sent to a user in an email for each change that occurs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of event sourcing?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "Faster writes, because no data is ever stored on disk by the system",
      "Smaller storage, since old events can always be deleted after a day",
      "A full audit trail, and the ability to rebuild state or create new views from history",
      "Simpler queries, because the current state is always stored in a table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of event sourcing?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "It cannot be combined with any kind of message broker",
      "It requires a relational database with at least ten tables",
      "More complexity, such as versioning events and rebuilding state for queries",
      "It prevents the system from keeping a history of any change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is CQRS?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "Separating the model for writes, commands, from the model for reads, queries",
      "Combining all reads and writes in one model for simpler code",
      "Writing the same data to two databases that are always identical",
      "Running queries only at night when there is less traffic"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why separate the read model from the write model?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "Both must use the same table, so that no copy of the data is needed",
      "The read side must be written first before the write side exists",
      "It removes the need for any events between the two sides",
      "Each can be shaped and scaled for its own needs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is the read model usually kept up to date in CQRS?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "By reading the tables of the write side every time a query arrives",
      "By consuming events from the write side and updating a projection",
      "By copying the whole database at the start of each day",
      "By asking users to refresh the data by hand on their screens"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does eventual consistency mean for a CQRS read model?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "It is always identical to the write side at every moment",
      "It may lag behind the write side for a short time before it catches up",
      "It is never updated after the first write that happens",
      "It is updated before the write side has accepted the command"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Do event sourcing and CQRS always need to be used together?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "Yes, one cannot be used without the other in any system",
      "Yes, but only when the system has more than ten services",
      "No, because CQRS is only valid in monolithic applications",
      "No, they are separate patterns that often work well together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a snapshot in event sourcing?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "A saved copy of the state at some point",
      "A screenshot of the user interface that is stored for support staff",
      "A backup of the broker configuration made once a month",
      "A summary report that is sent to management each quarter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When may CQRS be too much?",
    "topic": "Event sourcing & CQRS basics",
    "choices": [
      "For systems with different read and write loads and complex queries",
      "For systems that need to serve many users at the same time",
      "For simple CRUD systems where one model is enough",
      "For systems that need a history of how data changed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does at most once delivery mean?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "A message is delivered one or more times, so it can be duplicated but not lost",
      "A message is delivered exactly one time in all cases without exception",
      "A message is delivered zero or one times, so it can be lost but not duplicated",
      "A message is delivered only to the first consumer that connects"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does at least once delivery mean?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "A message is delivered one or more times, so duplicates are possible",
      "A message is delivered zero or one times, so it may be lost",
      "A message is delivered exactly once with no extra work for consumers",
      "A message is delivered once per day at a fixed time to a consumer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do consumers need to be idempotent with at least once delivery?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "Messages are always delivered in the wrong order, so they must be sorted",
      "Consumers must delete the messages they have seen from the broker",
      "Duplicates are impossible, so idempotency is never needed in practice",
      "Duplicates can occur, and processing a message twice must not cause harm"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is exactly once delivery hard to achieve in a distributed system?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "Brokers do not store messages, so each one can be lost on the way",
      "Failures between processing and acknowledging make duplicates or losses possible",
      "Networks are perfectly reliable, so the problem does not exist",
      "Messages cannot carry an id that identifies them uniquely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Kafka guarantee ordering?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "Across all partitions of a topic, in the order of the producers",
      "Within a partition, records keep the order in which they were written",
      "Only when there is a single broker in the cluster at all times",
      "Ordering is never guaranteed in Kafka under any configuration"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you keep related events in order in Kafka?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "Send them to different partitions to speed up processing",
      "Use a different topic for each event of the same entity",
      "Increase the number of consumers until the order is correct",
      "Use the same key, so they go to the same partition"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a consumer offset?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "The position of the consumer in a partition",
      "The number of consumers in a group that read the topic at once",
      "The delay between sending a message and reading it in seconds",
      "The size of the buffer that the producer uses for batches"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can happen if a consumer commits its offset before processing the message?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "The message is processed twice by two different consumers at once",
      "The broker deletes the topic as soon as the offset is committed",
      "A crash after the commit loses the message",
      "The consumer reads the message again from the beginning of the topic"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can happen if a consumer processes first and commits after?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "The message is lost, since it was never processed by anyone",
      "The broker refuses all later messages of that consumer group",
      "A crash before the commit causes a re delivery",
      "The message is processed in a different order from the producers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which RabbitMQ feature helps to avoid lost messages when a consumer fails?",
    "topic": "Delivery guarantees & ordering",
    "choices": [
      "Manual acknowledgements with requeue on failure",
      "Automatic deletion of the queue after each message",
      "Disabling persistence to make the broker faster",
      "Sending messages to all of the queues at once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a dead letter queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "A queue that stores messages for users who have left the company",
      "A queue that deletes every message after one second of waiting",
      "A queue that is used only for the messages of the broker itself",
      "A queue that receives messages that could not be processed after several tries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a dead letter queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "Failing messages are deleted so that nobody can ever see them",
      "Failing messages do not block the main queue, and they can be inspected later",
      "All messages are copied there for backup before they are processed",
      "It makes the consumers faster by skipping all of the validation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a poison message?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "A message that contains a virus that infects the broker host",
      "A message that always fails processing and can block a consumer if it is retried for ever",
      "A message that is sent to the wrong topic by a developer",
      "A message that is larger than the limit of the network packet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should retries for message processing be designed?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "Retry immediately and for ever until it succeeds, however long that takes",
      "Retry only once and then silently drop the message from the system",
      "Retry on all consumers at the same time to be sure that it works",
      "Limited attempts with a delay"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a retry topic or delay queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "A place where a failed message waits before it is tried again",
      "A queue that is read only by the developer who owns the service",
      "A topic that stores the retry settings of all of the consumers",
      "A queue that deletes messages after the first successful retry"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should be recorded when a message goes to the dead letter queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "Only the time of the failure, since the content is not needed",
      "The password of the user that sent the message to the broker",
      "The error, the number of attempts and the original message and headers",
      "A copy of the whole log file of the consumer of that day"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of ignoring a growing dead letter queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "The broker becomes faster because it stores fewer messages",
      "The consumers are restarted by the broker every few minutes",
      "Failures stay unnoticed and data may be lost or inconsistent",
      "The producers stop sending messages after a limit of one hundred"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can messages in a dead letter queue be handled?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "Fix the cause, then replay them to the main queue or discard them on purpose",
      "Delete the queue every night so that it does not grow too large",
      "Send all of the messages to the producers by email each hour",
      "Leave them for ever and never look at them again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why alert on dead letter queue size?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "It shows the number of users that are online in the system",
      "It measures the speed of the network between two brokers",
      "It is required by the brokers to keep the queue alive",
      "It signals that something is failing and needs attention"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of keeping the original message unchanged when it is moved to a dead letter queue?",
    "topic": "Dead-letter queues & retries",
    "choices": [
      "It can be edited by the support team before it is replayed",
      "It can be replayed exactly later after the problem is fixed",
      "It saves disk space on the broker, since the copy is smaller",
      "It prevents consumers from reading it again by accident"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-5

```json
[
  {
    "stem": "What is a Dockerfile?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "A file that lists the containers that run together as one single application",
      "A file that stores the secrets of the application",
      "A text file with instructions for building an image",
      "A script that starts the Docker daemon"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the FROM instruction set?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "The base image on which the new image is built",
      "The folder that is copied into the image",
      "The registry that the image is pushed to",
      "The command that the container runs as soon as it has been started"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the COPY instruction do?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "Copies the running container into a brand new image of the application",
      "Copies the image to another registry",
      "Copies environment variables to the host",
      "Copies files from the build context into the image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the RUN instruction do?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "Starts the container when the image is pulled",
      "Executes a command during the build and stores the result as a layer",
      "Runs the tests of the app after every start",
      "Runs a command on the host operating system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between CMD and ENTRYPOINT?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "ENTRYPOINT can always be overridden by docker run, CMD cannot be",
      "CMD gives the default command that can be overridden, ENTRYPOINT sets the main executable",
      "They are the same instruction under two names",
      "CMD runs at build time and ENTRYPOINT runs on the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "The installer cannot read package.json after the code is copied",
      "Node refuses to start unless the dependencies exist first",
      "Docker deletes the code if it is copied before the packages",
      "Docker caches the install layer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the WORKDIR instruction do?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "Sets the working directory for the instructions that follow",
      "Creates a volume that is shared with the host",
      "Sets the user that owns all of the files of the image in the container",
      "Defines the port that the container listens on"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does EXPOSE do?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "Opens the port to the internet on the host machine",
      "Maps the container port to a random port of the host",
      "Documents the port that the app listens on",
      "Closes every other port of the container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the build context?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "The list of instructions that the Dockerfile contains",
      "The network that the build runs in",
      "The set of files that is sent to the Docker daemon when an image is built",
      "The registry that provides the base image"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a .dockerignore file?",
    "topic": "Dockerfiles & multi-stage builds",
    "choices": [
      "Keeping files such as node_modules and .env out of the build context and the image",
      "Hiding the Dockerfile from the other users of the repository",
      "Making the container start faster by skipping its command",
      "Telling the registry which images to remove after a week"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Docker image?",
    "topic": "Images, layers & registries",
    "choices": [
      "A running instance of an application with its own process, network and filesystem",
      "A virtual machine with a full guest operating system inside of it",
      "A backup of a database that is stored as a compressed archive",
      "A read only template with the app and its dependencies that containers start from"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Docker container?",
    "topic": "Images, layers & registries",
    "choices": [
      "A file that lists all of the packages that the application needs to run on the host",
      "A running instance of an image that is isolated from other processes on the host",
      "A registry where images are stored and shared between teams",
      "A tool that compiles the source code of the app into a binary"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a layer in a Docker image?",
    "topic": "Images, layers & registries",
    "choices": [
      "A copy of the whole host operating system that is added on top",
      "A read only filesystem change that is created by one instruction and can be cached",
      "A folder in which the source code of the project is stored",
      "A network that connects two containers on the same host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Docker cache image layers?",
    "topic": "Images, layers & registries",
    "choices": [
      "Layers are deleted after the build to save disk space",
      "Layers must be rebuilt from scratch on every single build",
      "Caching is required for the registry to accept an image",
      "Unchanged layers are reused, so rebuilds are much faster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do containers differ from virtual machines?",
    "topic": "Images, layers & registries",
    "choices": [
      "Containers share the host kernel",
      "Containers include a full guest operating system with its own kernel",
      "Containers can only run on the same hardware as virtual machines do",
      "Containers cannot be isolated from the processes of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Docker registry?",
    "topic": "Images, layers & registries",
    "choices": [
      "A table in which the running containers are counted",
      "A file with the settings of the Docker daemon",
      "A service that stores and distributes images",
      "A log of the commands that were typed in the terminal"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does docker run do?",
    "topic": "Images, layers & registries",
    "choices": [
      "Builds an image from the Dockerfile in the current folder",
      "Pushes an image to a registry of the team",
      "Creates and starts a container from an image",
      "Deletes all stopped containers on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to files that are written inside a container when it is removed?",
    "topic": "Images, layers & registries",
    "choices": [
      "They are lost unless they were stored in a volume",
      "They are saved in the image for the next container",
      "They are copied to the git repository of the project",
      "They are moved to the registry together with the image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an image tag and its digest?",
    "topic": "Images, layers & registries",
    "choices": [
      "A digest is a movable label that points at the newest build, while a tag is exact",
      "They are two names for the same value",
      "A tag is used only for containers and a digest only for volumes",
      "A tag is a movable label such as latest, a digest identifies the exact content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid relying on the latest tag in production?",
    "topic": "Images, layers & registries",
    "choices": [
      "It is slower to download than any other tag",
      "It can point to a different image over time",
      "It is not allowed by Docker for production hosts",
      "It always refers to the oldest version of an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Docker Compose do?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "Builds the Docker daemon from source code",
      "Defines and runs multi container apps from a single YAML file",
      "Compresses images to a smaller size",
      "Replaces the Dockerfile of each service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a service in a compose file?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "A system service of the host that starts at boot",
      "A cloud provider offering that hosts the app",
      "A group of volumes that share a name",
      "A named container definition, with an image or build, ports and settings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command starts all services of a compose file?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "docker compose up",
      "docker compose run all",
      "docker start compose",
      "docker compose build only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does depends_on control?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "Which services may read each other data",
      "Which services share a volume",
      "The start order of the services",
      "Which services are published to the internet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Does depends_on alone guarantee that a database is ready for connections?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "Yes, it waits for the database to finish its startup",
      "Yes, but only on Linux hosts",
      "No, it only waits for the container to start",
      "No, it never starts the database at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do services in one compose file reach each other?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "By service name on the default network that compose creates",
      "By the IP address of the host machine and a random port number",
      "Only through the public internet",
      "By copying files between their containers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you keep database data between compose runs?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "Copy the data folder into the image at build time of the database",
      "Keep the data in the memory of the container",
      "Store the data in the compose file as text",
      "Declare a named volume and mount it in the database service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of a health check in a compose service?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "It restarts the host when a service is slow",
      "Docker can tell whether the service works, and others can wait for it",
      "It encrypts the traffic of the service",
      "It removes unused images from the registry"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command stops and removes the containers and networks of a compose project?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "docker compose pause",
      "docker compose down",
      "docker compose stop all",
      "docker compose clean"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is compose useful for local development?",
    "topic": "Docker Compose for local stacks",
    "choices": [
      "It replaces the need for any images",
      "It deploys the app to production automatically",
      "It makes the code run faster than on the host",
      "One command starts the whole stack"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Docker volume?",
    "topic": "Networking between containers",
    "choices": [
      "Storage that is managed by Docker and outlives the container",
      "A copy of the image that is stored on the host for faster starts",
      "A limit on how much memory a container may use",
      "A network between two containers on one host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a volume and a bind mount?",
    "topic": "Networking between containers",
    "choices": [
      "A volume maps a host path into the container, a bind mount is managed by Docker",
      "They are identical and only the names differ",
      "A bind mount maps a host path into the container, a volume is managed by Docker",
      "A bind mount is read only and a volume is write only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a volume for a database container?",
    "topic": "Networking between containers",
    "choices": [
      "The database needs a volume to start at all",
      "Volumes make queries faster than the filesystem of the container does",
      "The data survives when the container is removed or replaced",
      "Volumes encrypt the data of the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a bind mount useful in development?",
    "topic": "Networking between containers",
    "choices": [
      "Source code changes on the host show up inside the container without a rebuild",
      "It makes the production image smaller",
      "It hides the files of the container from the host",
      "It replaces the need for a Dockerfile"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do containers on the same user defined network reach each other?",
    "topic": "Networking between containers",
    "choices": [
      "Only by the IP address of the host machine",
      "Only through the public internet",
      "They cannot reach each other without a volume",
      "By container or service name"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the option -p 8080:80 do?",
    "topic": "Networking between containers",
    "choices": [
      "Publishes port 8080 of the container on port 80 of the host",
      "Publishes port 80 of the container on port 8080 of the host",
      "Limits the container to 80 processes and 8080 files",
      "Sets the user and the password of the container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the default network driver for a single host?",
    "topic": "Networking between containers",
    "choices": [
      "overlay",
      "bridge",
      "host only",
      "macvlan"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a database port usually not be published to the whole internet?",
    "topic": "Networking between containers",
    "choices": [
      "Databases cannot be reached from outside of a container",
      "Published ports slow the database down",
      "Docker refuses to publish database ports",
      "Anyone could reach the database"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does docker network create do?",
    "topic": "Networking between containers",
    "choices": [
      "Creates a user defined network that containers can join",
      "Creates a new image from the network settings",
      "Creates a firewall rule on the host router",
      "Creates a volume that is shared by every container of the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sign that two containers cannot talk to each other?",
    "topic": "Networking between containers",
    "choices": [
      "The image is larger than one gigabyte",
      "The container exits with code zero",
      "Connection refused or name resolution errors, often because they are on different networks",
      "The registry is down"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Docker volume used for in a service stack?",
    "topic": "Volumes & persistence",
    "choices": [
      "Speeding up the build of the image by caching the layers on the host",
      "Connecting two containers so that they can share their network ports",
      "Data that must outlive the container, such as the files of a database",
      "Limiting the amount of memory that a container may use at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to data in the writable layer of a container when the container is removed?",
    "topic": "Volumes & persistence",
    "choices": [
      "It is lost, unless it was stored in a volume or a bind mount",
      "It is saved automatically into the image for later containers",
      "It is copied to the registry together with the image",
      "It is moved to the host and kept for the next start of the container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a named volume and a bind mount?",
    "topic": "Volumes & persistence",
    "choices": [
      "A bind mount is managed by Docker, and a named volume maps a path of the host",
      "They are the same, and only the command line options differ between them",
      "A named volume is read only, and a bind mount is always write only",
      "A named volume is managed by Docker, and a bind mount maps a path of the host"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a bind mount useful in local development?",
    "topic": "Volumes & persistence",
    "choices": [
      "It makes the production image smaller by removing the unused files",
      "Changes to files on the host are visible in the container without a rebuild",
      "It encrypts the files of the application when they are copied over",
      "It lets the container use the CPU of the host for faster builds"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should stateful services such as databases use volumes in Compose?",
    "topic": "Volumes & persistence",
    "choices": [
      "The container starts faster when the data is inside the image",
      "The data survives restarts and recreation of the container",
      "Volumes make the database queries faster than the container disk",
      "Databases cannot run in containers without a volume of ten gigabytes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does docker volume prune do?",
    "topic": "Volumes & persistence",
    "choices": [
      "Removes all volumes, including the ones that are in use",
      "Moves the volumes of the host to a remote registry",
      "Compresses the volumes so that they use less disk space",
      "Removes volumes that are not used by any container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you back up a Docker volume?",
    "topic": "Volumes & persistence",
    "choices": [
      "Run a temporary container that mounts the volume and archives its content",
      "Copy the image of the container to a second registry",
      "Restart the container with a larger memory limit",
      "Delete the volume and recreate it from the image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid storing important data only on a single host volume in production?",
    "topic": "Volumes & persistence",
    "choices": [
      "Volumes are not supported by any production platform",
      "Volumes are always read only in a cluster setup",
      "The host can fail, so data needs replication or a managed storage service",
      "Production data is stored only in the registry of images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a tmpfs mount?",
    "topic": "Volumes & persistence",
    "choices": [
      "A mount that copies data to a remote server each second",
      "A mount that is shared by all containers on all hosts",
      "A mount that stores data in the memory of the host and not on disk",
      "A mount that stores data in a compressed archive file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for file permissions of mounted volumes?",
    "topic": "Volumes & persistence",
    "choices": [
      "Make sure the user in the container can read and write the files that it needs",
      "Run the container as root so that permissions never cause problems",
      "Give all files the permission 777 so that every user can access them",
      "Store the files in the image so that no permission is needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a multi stage build?",
    "topic": "Image security & size optimization",
    "choices": [
      "A build that runs on several machines at the same time",
      "A build that creates several images with the same name",
      "A build that stops after the first stage",
      "A Dockerfile with several FROM stages, where only the needed output is copied into the final image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a multi stage build for a compiled front end?",
    "topic": "Image security & size optimization",
    "choices": [
      "The final image needs all of the build tools to run",
      "Build tools stay in an earlier stage",
      "Multi stage builds make the code compile faster",
      "It removes the need for a web server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a small base image such as alpine?",
    "topic": "Image security & size optimization",
    "choices": [
      "Faster execution of every function in the program",
      "A smaller download and a smaller attack surface",
      "Automatic encryption of every file",
      "No need to install dependencies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why run the app as a non root user in the container?",
    "topic": "Image security & size optimization",
    "choices": [
      "Root users cannot read the files that are stored inside of a container",
      "Non root users make the container start faster",
      "Docker refuses to run root processes",
      "If the app is compromised, the attacker has fewer rights"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does npm ci --omit=dev help with in an image?",
    "topic": "Image security & size optimization",
    "choices": [
      "It installs only production dependencies",
      "It installs all dev dependencies for testing",
      "It deletes the lock file",
      "It updates every package to the latest version"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why order Dockerfile instructions from least to most frequently changing?",
    "topic": "Image security & size optimization",
    "choices": [
      "Docker requires this exact order of instructions in order to build an image",
      "Later layers are deleted after the build",
      "Earlier layers stay cached, so rebuilds are faster",
      "The order decides the size of the image only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can make an image large without being obvious?",
    "topic": "Image security & size optimization",
    "choices": [
      "The number of comments in the Dockerfile",
      "The name of the image",
      "Build caches, dev dependencies and files copied by a broad COPY instruction",
      "The version of the Docker client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you inspect the layers and sizes of an image?",
    "topic": "Image security & size optimization",
    "choices": [
      "docker history or docker image inspect",
      "docker network ls",
      "docker volume prune",
      "docker compose logs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why pin versions of the base image and of dependencies?",
    "topic": "Image security & size optimization",
    "choices": [
      "Pinned versions are always the newest",
      "Docker refuses unpinned images",
      "It makes the image smaller",
      "Builds are reproducible and do not change by surprise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a production image not contain?",
    "topic": "Image security & size optimization",
    "choices": [
      "The compiled application",
      "Secrets, source maps you do not need, test tools and development dependencies",
      "The runtime that the app needs",
      "The files that the app serves"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-6

```json
[
  {
    "stem": "What is a Pod in Kubernetes?",
    "topic": "Pods, deployments & services",
    "choices": [
      "A physical server in the data center that runs the control plane of the cluster",
      "A group of namespaces that belong to one team of the organisation",
      "The smallest deployable unit, with one or more containers that share a network and storage",
      "A configuration file that lists the images of all of the services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a Deployment do?",
    "topic": "Pods, deployments & services",
    "choices": [
      "It manages a set of identical pods, with rolling updates and rollbacks",
      "It stores the data of a database in a volume that is shared by all pods",
      "It builds the container image from the source code of a service",
      "It sets the firewall rules between the nodes of the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a ReplicaSet?",
    "topic": "Pods, deployments & services",
    "choices": [
      "It copies the data of a database to a second cluster in another region",
      "It stores the history of all of the pods that have ever run",
      "It scans the images of the pods for known vulnerabilities",
      "It keeps a stable number of pod replicas running at any time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a Service provide?",
    "topic": "Pods, deployments & services",
    "choices": [
      "A copy of the source code of the pods for the other services to read and reuse",
      "A stable network address and name for a set of pods, with load balancing",
      "A database for the services to store their configuration in",
      "A schedule that decides when pods are started and stopped"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are pod IP addresses not used directly by clients?",
    "topic": "Pods, deployments & services",
    "choices": [
      "Pod addresses are secret and may not be shared with other pods",
      "Pods are created and removed, so their addresses change",
      "Pods cannot be reached by IP addresses inside the cluster at all",
      "Pod addresses are limited to ten values for each namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a ClusterIP and a LoadBalancer service?",
    "topic": "Pods, deployments & services",
    "choices": [
      "LoadBalancer is reachable only inside the cluster, ClusterIP exposes it outside",
      "They are the same type that is named differently by each cloud provider",
      "ClusterIP is for databases and LoadBalancer is for stateless services only",
      "ClusterIP is reachable inside the cluster, LoadBalancer exposes the service outside via a cloud load balancer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a namespace?",
    "topic": "Pods, deployments & services",
    "choices": [
      "A virtual partition of the cluster that groups and isolates resources",
      "A physical machine that runs the pods of one team inside of the cluster",
      "A tag that is added to container images in the registry",
      "A list of the users that may log in to the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a Service find its pods?",
    "topic": "Pods, deployments & services",
    "choices": [
      "With the name of the node on which the pods are running",
      "With a fixed list of IP addresses that is set by an administrator",
      "With a label selector that matches the labels on the pods",
      "With a file that each pod writes when it starts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does kubectl apply -f do?",
    "topic": "Pods, deployments & services",
    "choices": [
      "Deletes all resources that are listed in the manifest file",
      "Builds the image that is named in the manifest file",
      "Creates or updates resources to match the manifest file",
      "Shows the logs of the pods that are named in the file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a desired state model?",
    "topic": "Pods, deployments & services",
    "choices": [
      "You declare what you want, and controllers work to make the cluster match it",
      "You issue a list of commands that run in the same order every time",
      "You edit the files on each node by hand until it works as planned",
      "You ask the cloud provider to decide what the cluster should run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a ConfigMap?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "An object that holds the passwords and the keys of the cluster",
      "An object that maps the names of services to IP addresses",
      "An object that describes how many nodes the cluster should have",
      "An object that holds non secret configuration data for pods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Secret in Kubernetes?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "An object that encrypts all the traffic between the pods with strong keys",
      "An object for sensitive data",
      "An object that hides the pods from the users of the cluster",
      "An object that is deleted automatically after the first read by a pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Is a Kubernetes Secret encrypted by default?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "Yes, it is encrypted with a key that only the pod can read",
      "No, it is only base64 encoded unless encryption at rest is enabled",
      "Yes, but only in clusters that use more than three nodes",
      "No, it is stored in plain text files on each of the worker nodes of the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a pod consume a ConfigMap?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "By reading the etcd database of the cluster directly at runtime",
      "By copying the data into the image of the container at build time",
      "By asking the kubelet through a special command line option",
      "As environment variables or as files in a mounted volume"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a running pod when a ConfigMap changes?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "Mounted files may update, but environment variables are not updated until restart",
      "Both the files and the environment variables update at the same moment",
      "The pod is deleted and replaced by the control plane at once",
      "Nothing changes until the node is rebooted by an administrator"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why keep configuration out of the container image?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "Images cannot hold any text files, so the configuration is impossible",
      "Configuration inside an image is always encrypted and cannot be read",
      "The same image can run in many environments with different settings",
      "Smaller images cannot be pulled over slow networks in clusters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should secrets not be committed to git in plain form?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "Git cannot store files that are smaller than one kilobyte",
      "Secrets are generated by the cluster, so they are not needed in git",
      "Anyone with access to the repository could read them",
      "Repositories reject files that contain random characters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What tools help to manage secrets safely with Kubernetes?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "External secret managers or sealed or encrypted secrets with controlled access",
      "A public bucket that stores them in plain text for the whole team",
      "A chat message to each developer that contains the secret values",
      "A comment in the manifest that explains how to guess the secret"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is RBAC in Kubernetes?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "A way to balance the load across the nodes of a cluster",
      "A backup system for the etcd database of the cluster",
      "A tool for scanning images for vulnerabilities before they run",
      "Role based access control that limits what users and services can do in the cluster"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a ServiceAccount?",
    "topic": "ConfigMaps & secrets",
    "choices": [
      "A user account for the people that log in to the cloud console",
      "An identity for pods to use when they call the Kubernetes API",
      "A billing account for a team in a cloud provider",
      "A tool that restarts services when they have crashed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you scale a deployment to five replicas?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Copy the pod five times by hand on each worker node",
      "Set replicas to five, for example with kubectl scale or the manifest",
      "Increase the memory of the node until five pods can fit",
      "Create five clusters with one pod in each of them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a HorizontalPodAutoscaler do?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "It makes each pod larger by adding CPU and memory to it",
      "It moves pods from one cluster to another one in a different region of the cloud",
      "It deletes pods that have not received any requests for an hour",
      "It changes the number of replicas based on metrics such as CPU use"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a rolling update?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Pods are replaced gradually, so the service stays available during the release",
      "All pods are stopped and then new ones are started at the same moment",
      "A new cluster is created and the old one is deleted after a week",
      "Pods are updated only when the traffic is zero, at night"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which settings control how fast a rolling update proceeds?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "replicas and namespace in the metadata of the object",
      "image and tag in the container specification of the pod",
      "maxSurge and maxUnavailable in the update strategy",
      "port and protocol in the service definition"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you roll back a bad deployment?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Delete the cluster and create it again from the backup",
      "Edit the image of each pod by hand on each of the nodes of the cluster",
      "kubectl rollout undo, which returns to the previous revision",
      "Wait until the pods have crashed and restart the nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does kubectl rollout status show?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "The progress of a rollout, until it completes or fails",
      "The logs of all of the pods in the cluster in one stream",
      "The list of nodes with their free memory and disk space",
      "The history of the changes that were made to the cluster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must a service be stateless to scale horizontally with ease?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Stateless services use less CPU than every stateful service",
      "Stateless services can only run in a single replica at a time",
      "Kubernetes refuses to scale services that have state at all",
      "Any replica can handle any request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Recreate strategy do in a Deployment?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "It starts the new pods before the old ones are stopped",
      "It stops all old pods first and then starts the new ones, causing downtime",
      "It updates pods one at a time without any downtime",
      "It copies the old pods to a new namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a StatefulSet used for?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Stateless web services that can be replaced at any moment",
      "Workloads that need stable identity and storage",
      "Jobs that run once and then stop for good",
      "Services that need to run on every node of the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a DaemonSet used for?",
    "topic": "Scaling & rolling updates",
    "choices": [
      "Running a database with a fixed number of replicas",
      "Running a task once at a set time of the day",
      "Running pods only on the master nodes of the cluster",
      "Running a copy of a pod on every node"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an Ingress?",
    "topic": "Ingress & networking",
    "choices": [
      "A set of rules that route external HTTP traffic to services inside the cluster",
      "A tool that scans the images in a cluster for known vulnerabilities",
      "A network cable between two nodes of the cluster",
      "A database that stores the routes of all services of the company"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an Ingress controller?",
    "topic": "Ingress & networking",
    "choices": [
      "A person who approves the changes to the cluster network each week",
      "A tool that builds the container images for the services",
      "A component that implements the rules of Ingress resources",
      "A service that keeps the logs of every request for a year"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an Ingress allow that a LoadBalancer service alone does not?",
    "topic": "Ingress & networking",
    "choices": [
      "Encryption of data at rest for the database volumes",
      "Automatic scaling of the pods based on the CPU load",
      "Host and path based routing for many services behind one entry point",
      "Faster image pulls from the registry for the nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does DNS work for services inside a cluster?",
    "topic": "Ingress & networking",
    "choices": [
      "A service gets a name such as my-service.my-namespace that resolves to its address",
      "Each pod must register its name in an external DNS provider by hand",
      "Pods use only IP addresses, since names are not supported",
      "DNS is turned off in clusters for performance reasons"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a NetworkPolicy?",
    "topic": "Ingress & networking",
    "choices": [
      "A rule that sets the speed of the network between the nodes of the cluster",
      "A rule that lists the DNS servers of the cluster",
      "A rule that chooses the cloud region for the cluster",
      "A rule that controls which pods may talk to which other pods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the default network behaviour between pods in a namespace?",
    "topic": "Ingress & networking",
    "choices": [
      "No pod can talk to any other pod until it is allowed in writing",
      "All pods can talk to each other unless a policy restricts it",
      "Only pods from different namespaces can talk to each other",
      "Pods can talk only to the database of their own namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does TLS termination at the Ingress mean?",
    "topic": "Ingress & networking",
    "choices": [
      "The Ingress deletes all of the certificates of the services",
      "The Ingress handles the TLS connection, and forwards plain or re encrypted traffic inside",
      "The Ingress stops all connections that use TLS and uses HTTP only",
      "The Ingress forwards TLS to the client unchanged without reading it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a NodePort service do?",
    "topic": "Ingress & networking",
    "choices": [
      "It stores the port numbers of all pods in a text file",
      "It assigns a different port to each pod of the service",
      "It blocks the ports that are used by the cluster itself for its own traffic",
      "It opens a port on every node that forwards to the service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do you not usually expose each service with its own cloud load balancer?",
    "topic": "Ingress & networking",
    "choices": [
      "It is costly, so an Ingress can share one entry point for many services",
      "Cloud providers do not allow more than one load balancer",
      "Services cannot be reached by load balancers in any way",
      "Each load balancer must be created by hand in a console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can traffic be restricted so that only the gateway talks to a service?",
    "topic": "Ingress & networking",
    "choices": [
      "By hiding the name of the service in the DNS server of the cluster so nobody finds it",
      "By setting a long random password on each service",
      "With NetworkPolicy rules that allow only the gateway pods",
      "By removing the service from the namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a liveness probe?",
    "topic": "Health probes & resource limits",
    "choices": [
      "A check that tells whether a container is ready to receive traffic from the service",
      "A check that measures how many requests a container serves",
      "A check that tells Kubernetes whether to restart a container that is stuck",
      "A check that counts the users that are logged in to a service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a readiness probe?",
    "topic": "Health probes & resource limits",
    "choices": [
      "A check that tells whether a pod can receive traffic, and removes it from the service if not",
      "A check that restarts the pod whenever it is slow to answer",
      "A check that scans the container image for vulnerabilities",
      "A check that counts the number of restarts of a pod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a startup probe for?",
    "topic": "Health probes & resource limits",
    "choices": [
      "Checking that the node has started and has enough free disk",
      "Starting the pod in a specific order after other pods",
      "Measuring how long it takes to build an image",
      "Slow starting containers, so the other probes do not kill them too early"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a liveness probe fails repeatedly?",
    "topic": "Health probes & resource limits",
    "choices": [
      "The pod is moved to a different cluster in another region",
      "The container is restarted by the kubelet",
      "The service is deleted from the namespace",
      "The node that runs it is turned off"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a readiness probe fails?",
    "topic": "Health probes & resource limits",
    "choices": [
      "The container is killed and replaced right away",
      "The pod stays running but receives no traffic from the service",
      "The deployment is rolled back to the earlier revision",
      "The cluster sends an email to the owner of the pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a resource request mean for a container?",
    "topic": "Health probes & resource limits",
    "choices": [
      "The maximum that the container may ever use before it is stopped",
      "The price that the team pays for the use of the container",
      "The number of replicas that the service requires to start",
      "The amount of CPU or memory that the scheduler reserves for it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a resource limit do?",
    "topic": "Health probes & resource limits",
    "choices": [
      "It caps the use, and a container above its memory limit can be killed",
      "It reserves the amount for the container at scheduling time",
      "It sets the minimum amount of CPU that the container may use",
      "It limits the number of images in the registry for the team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when a container uses more memory than its limit?",
    "topic": "Health probes & resource limits",
    "choices": [
      "It is slowed down but kept alive for as long as it needs",
      "It is moved to a node that has more memory available",
      "It is terminated, often shown as OOMKilled",
      "It receives a warning and the limit is raised automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set requests and limits for every container?",
    "topic": "Health probes & resource limits",
    "choices": [
      "Kubernetes refuses to start any pod that has no limits at all",
      "Requests and limits make the images smaller and faster to pull",
      "The scheduler can place pods well, and one pod cannot starve the others",
      "They are used to name the pods in the logs of the cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a very slow liveness probe cause an outage?",
    "topic": "Health probes & resource limits",
    "choices": [
      "It may kill healthy pods that are only busy, causing restarts and a lack of capacity",
      "It marks the whole cluster as unhealthy and shuts it down",
      "It blocks the deployment of new versions for the next hour",
      "It forces all pods to restart at the same time every night"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Helm?",
    "topic": "Packaging with Helm",
    "choices": [
      "A tool that builds container images from the source code of the services",
      "A monitoring system for the nodes of the cluster",
      "A service that routes traffic between the clusters",
      "A package manager for Kubernetes that installs applications from charts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Helm chart?",
    "topic": "Packaging with Helm",
    "choices": [
      "A diagram of the services that is drawn by the monitoring system",
      "A package of templates and default values that describes a Kubernetes application",
      "A log of the changes that were made to the cluster over time",
      "A list of the nodes and the pods that run on them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Helm release?",
    "topic": "Packaging with Helm",
    "choices": [
      "A new version number of the Helm tool that is published by its authors",
      "An installed instance of a chart in a cluster, with its own configuration and history",
      "A copy of the chart that is stored in a public registry",
      "A report that lists the images that a chart uses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is values.yaml used for in a chart?",
    "topic": "Packaging with Helm",
    "choices": [
      "The list of nodes on which the chart is allowed to run",
      "The source code of the services that the chart installs",
      "The secrets that the chart needs, which are encrypted on disk by the tool",
      "Default configuration values that can be overridden per environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use Helm templates instead of copying manifests for each environment?",
    "topic": "Packaging with Helm",
    "choices": [
      "One template with different values avoids duplication and drift between environments",
      "Templates run faster than manifests in the cluster",
      "Manifests cannot be applied to more than one environment",
      "Templates encrypt the manifests when they are stored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you roll back a Helm release?",
    "topic": "Packaging with Helm",
    "choices": [
      "Delete the chart from the registry and install it again",
      "Edit the pods one by one with kubectl exec on the nodes",
      "helm rollback to a previous revision of the release",
      "Restart the Helm tool on the laptop of the developer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does helm upgrade do?",
    "topic": "Packaging with Helm",
    "choices": [
      "Installs a new version of the kubectl tool on the laptop",
      "Upgrades the nodes of the cluster to a new operating system and restarts them",
      "Applies a new chart version or new values to an existing release",
      "Removes the release and deletes its history"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of heavy templating in charts?",
    "topic": "Packaging with Helm",
    "choices": [
      "Templates can become hard to read and test",
      "Templates cannot use any variables from the values file",
      "Templates prevent the chart from being installed",
      "Templates make the images larger than before"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does helm template do?",
    "topic": "Packaging with Helm",
    "choices": [
      "Creates a new chart from the running resources of the cluster",
      "Installs the chart into a temporary namespace for tests",
      "Uploads the chart to a remote registry for sharing",
      "Renders the manifests locally, without installing them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an alternative to Helm for customising manifests?",
    "topic": "Packaging with Helm",
    "choices": [
      "Docker Compose, which runs pods on a single host",
      "Kustomize, which patches base manifests with overlays",
      "Terraform modules, which build the images for the nodes of the cluster",
      "A shell script that edits files with random changes"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-7

```json
[
  {
    "stem": "What is an API gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "A database that stores the APIs of the company",
      "A tool that generates the code of the services",
      "A single entry point that routes requests to the services and handles cross cutting concerns",
      "A class that wraps the main method of a service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Spring project provides an API gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "Spring Cloud Gateway",
      "Spring Data REST",
      "Spring HATEOAS",
      "Spring Boot DevTools"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which cross cutting concerns does a gateway often handle?",
    "topic": "API gateway responsibilities",
    "choices": [
      "Compiling the code of each service",
      "Writing the business rules of each service, so that the services only store the data",
      "Storing the data of every service",
      "Authentication, rate limiting, routing and logging"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a route in Spring Cloud Gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "A path in the file system where the services of the cluster store their log files for each day",
      "A rule with a predicate and filters that sends matching requests to a target",
      "A network cable between two servers",
      "A database relation between two tables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a predicate in a gateway route?",
    "topic": "API gateway responsibilities",
    "choices": [
      "A function that returns the target server by random choice from the list of all known services",
      "A condition on the request, such as the path or a header, that selects the route",
      "A rule that tests the code of the services",
      "A message that the gateway sends to the broker"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a filter in a gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "A filter that removes users from the database",
      "A tool that removes old log files",
      "A rule that blocks all traffic that comes from other countries without any exception",
      "A piece of logic that changes the request or the response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a gateway support load balancing?",
    "topic": "API gateway responsibilities",
    "choices": [
      "It chooses an instance of the target service from the registry for each request",
      "It sends every request to the same instance",
      "It copies each request to all instances",
      "It stops the instances that are slow"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of putting business logic in a gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "Gateways cannot call services",
      "It makes services faster",
      "It becomes a bottleneck and a single point of failure with hidden rules",
      "It is not allowed by Spring"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add rate limiting at the gateway?",
    "topic": "API gateway responsibilities",
    "choices": [
      "It makes the services respond faster to each request by caching all answers inside the gateway",
      "It stores the requests for later use",
      "It protects the services from overload and abuse before requests reach them",
      "It replaces authentication"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why terminate token checks at the edge and also in services?",
    "topic": "API gateway responsibilities",
    "choices": [
      "Defence in depth, since internal calls can come from other places too",
      "The gateway cannot check tokens at all",
      "Tokens are valid only inside services",
      "Services have no access to the tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an API gateway do for routing?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "It writes the code of the routes for every service of the company",
      "It stores the data of all services in one common database",
      "It restarts the services when their routes return an error",
      "It maps external requests to the right internal services based on path, host or header"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why authenticate requests at the gateway?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "Services no longer need to check anything at all, since the gateway is trusted by everyone",
      "Invalid callers are rejected at the edge, before they reach the services",
      "The gateway can read the passwords of the users and store them",
      "It replaces authorization checks inside every service completely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Should services trust identity information forwarded by the gateway without any check?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "Yes, always, since the gateway is part of the same system",
      "They should verify it, for example through signed tokens or a trusted network",
      "No, they should ignore it and ask the user to log in again",
      "Only on weekdays, when the gateway has been checked by staff"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is rate limiting at the edge?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "Limiting how many services the gateway is allowed to route to in one second",
      "Limiting the size of the database that the gateway uses",
      "Limiting the number of developers who can deploy the gateway",
      "Limiting how many requests each client may send in a given period"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why rate limit per client and not only globally?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "One noisy client cannot use up the capacity of everyone else",
      "A global limit is not allowed by the standards for APIs",
      "Per client limits make every request faster than before",
      "Clients cannot be identified, so the limit would be applied at random to each of them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is request aggregation in a gateway or a backend for frontend?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "Counting how many requests the client has made in a day",
      "Storing all of the requests in a log for a year so that they can be reviewed later",
      "Combining several backend calls into one response for the client",
      "Encrypting each request with the key of the gateway"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a backend for frontend, or BFF?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "A backup of the frontend code that is kept on a second server",
      "A frontend that talks directly to the database of the backend",
      "A gateway that is shaped for one type of client",
      "A tool that converts the frontend into a backend automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a single shared gateway become a bottleneck for teams?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "Many teams must change the same component",
      "Gateways cannot handle more than one hundred requests per second",
      "Gateways must be restarted whenever a service is deployed",
      "Teams are not allowed to configure any routes in a gateway"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is TLS termination at the gateway?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "The gateway ends the connection with the database after each query that it receives",
      "The gateway deletes the certificates of the services at night",
      "The gateway stops accepting any TLS connections for security",
      "The gateway decrypts incoming TLS traffic and forwards it to the services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use correlation ids at the edge?",
    "topic": "Routing, auth & rate limiting at the edge",
    "choices": [
      "The gateway uses the id to choose the programming language of the service that answers",
      "The gateway adds an id that travels with the request through all services",
      "The id is the password that the client uses to sign in",
      "The id makes the response smaller for the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a service mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "A tool that builds the images of services in a pipeline",
      "An infrastructure layer that handles service to service communication, usually with sidecar proxies",
      "A database that stores the relationships between services",
      "A group of servers that run the services of a single team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do sidecar proxies do in a mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "They run before the service starts and then stop",
      "They store the data of the service in a backup location",
      "They replace the container runtime of the node",
      "They sit next to each service and handle traffic, security and telemetry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the control plane of a mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "The part that configures the proxies",
      "The part that carries the actual requests between services",
      "The part that stores all of the logs of the services",
      "The part that builds the code of the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the data plane of a mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "The database that stores the policies of the mesh",
      "The dashboard that shows the graphs of the services",
      "The proxies that carry the traffic between services",
      "The server that issues the certificates to the nodes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Name a popular service mesh.",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "Docker Compose or Swarm",
      "Terraform or Ansible",
      "Istio or Linkerd",
      "Prometheus or Grafana"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem does a mesh solve for many services?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "Retries, timeouts, security and metrics are handled outside of application code",
      "The code of each service becomes smaller because it has no logic",
      "The services no longer need a network between them",
      "It removes the need to write any tests for the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a cost of adding a service mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "The services can no longer talk to databases",
      "The mesh forces all services to use the same language",
      "The cluster can no longer run more than ten pods",
      "Extra complexity and resource use"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When may a mesh be unnecessary?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "For hundreds of services that need uniform security and telemetry across all of the teams",
      "For a small number of services where libraries and the platform are enough",
      "For an organisation that needs mutual TLS between every service",
      "For teams that want traffic splitting for canary releases"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a gateway and a mesh?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "A gateway handles east west traffic between services, a mesh handles traffic from outside",
      "A gateway handles north south traffic from outside, a mesh handles east west traffic between services",
      "They are two names for the same component in different products",
      "A gateway stores data, and a mesh only routes requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an ambient mesh, in modern Istio?",
    "topic": "Service mesh concepts (Istio/Linkerd)",
    "choices": [
      "A mode in which the mesh only works at night, when there is little traffic in the cluster",
      "A mesh that is installed by default in every cluster of a cloud",
      "A mesh that is used only for storage traffic",
      "A mode that moves mesh functions out of per pod sidecars into shared node components"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does mutual TLS provide?",
    "topic": "mTLS & traffic management",
    "choices": [
      "Both sides prove their identity with certificates, and the traffic is encrypted",
      "Only the client proves its identity, and the traffic between the two is not encrypted",
      "The traffic is encrypted, but nobody is authenticated",
      "Passwords are exchanged in plain text between the services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is mTLS useful between services?",
    "topic": "mTLS & traffic management",
    "choices": [
      "It makes each request faster because the data is compressed more",
      "It removes the need for any firewall in the cluster",
      "It protects traffic inside the network and verifies which service is calling",
      "It lets the services share one password between them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a mesh usually manage service certificates?",
    "topic": "mTLS & traffic management",
    "choices": [
      "It asks each developer to create a certificate by hand",
      "It uses one certificate for all services for ever",
      "It issues and rotates short lived certificates automatically",
      "It stores the certificates in the source code of each service so they are easy to find"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is traffic shifting?",
    "topic": "mTLS & traffic management",
    "choices": [
      "Sending a percentage of the requests to a new version of a service",
      "Moving the servers from one data center to another one",
      "Changing the speed of the network between two clusters",
      "Deleting the traffic logs of the last week from the cluster to save disk space"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a virtual service in Istio?",
    "topic": "mTLS & traffic management",
    "choices": [
      "A service that runs on a virtual machine in the cloud and is billed by the hour",
      "A copy of a service that is used only in tests",
      "A database for the rules of the mesh",
      "A set of routing rules that define how requests reach a service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a destination rule define in Istio?",
    "topic": "mTLS & traffic management",
    "choices": [
      "The address of the database that a service must use",
      "Policies for traffic after routing",
      "The list of users that may call a service",
      "The names of the namespaces in the cluster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is fault injection in a mesh used for?",
    "topic": "mTLS & traffic management",
    "choices": [
      "Repairing faults in the code of the services automatically",
      "Testing resilience by adding delays or errors on purpose",
      "Reducing the number of errors in the logs of the services",
      "Injecting a new version of the code into a running pod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a circuit breaking setting in a mesh?",
    "topic": "mTLS & traffic management",
    "choices": [
      "A switch that turns off the power of a rack in the data center",
      "A rule that blocks users who send many requests",
      "A tool that repairs broken certificates",
      "A limit on connections or failures after which calls are stopped for a time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do authorization policies in a mesh matter?",
    "topic": "mTLS & traffic management",
    "choices": [
      "They define which services may call which others, beyond just encryption",
      "They set the password policy of the human users of the system",
      "They decide which developers may deploy to the cluster",
      "They check that the code has been reviewed by two people"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of enabling strict mTLS everywhere without planning?",
    "topic": "mTLS & traffic management",
    "choices": [
      "All of the traffic becomes unencrypted for security reasons",
      "The control plane refuses to start in strict mode",
      "Services that are not in the mesh can no longer call the ones that are",
      "Certificates are never rotated again after they are issued"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What telemetry does a mesh usually provide without code changes?",
    "topic": "Observability via the mesh",
    "choices": [
      "The source code coverage of the tests of each service",
      "The list of developers who changed a service during the last week, with their commits",
      "Metrics, traces and access logs for the traffic between services",
      "The size of the images of each service in the registry"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the golden signals that a mesh can report?",
    "topic": "Observability via the mesh",
    "choices": [
      "Latency, traffic, errors and saturation",
      "Memory, disk, CPU and network cables, which are the physical parts of each server",
      "Commits, builds, tests and releases",
      "Users, sessions, pages and clicks"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a mesh help with distributed tracing?",
    "topic": "Observability via the mesh",
    "choices": [
      "Proxies fully trace every request with no help from the services",
      "The mesh replaces the need for trace ids completely",
      "The mesh stores traces in the source code repository",
      "Proxies create and propagate trace headers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must applications still propagate trace headers in a mesh?",
    "topic": "Observability via the mesh",
    "choices": [
      "Headers are needed to authenticate the user with the mesh",
      "Proxies cannot link incoming and outgoing calls without the headers being passed on",
      "Without headers the proxy cannot start in the pod",
      "The mesh stops working if headers are not copied by hand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What tool is often used with a mesh to visualise the service graph?",
    "topic": "Observability via the mesh",
    "choices": [
      "Postman",
      "Kiali, for Istio",
      "Jenkins",
      "SonarQube, which analyses the quality of the source code of each service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a service graph show?",
    "topic": "Observability via the mesh",
    "choices": [
      "The folder structure of the source code of each service and its dependencies",
      "The employees of each team and their roles",
      "The network cables between the racks of the data center",
      "Which services call which others, with traffic and error rates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can access logs from the proxies show?",
    "topic": "Observability via the mesh",
    "choices": [
      "Each request, with the source, the destination, the status and the duration",
      "The internal variables of the code of each service",
      "The passwords of the users who call the services",
      "The history of the commits of the service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is mesh telemetry useful for finding the source of slowness?",
    "topic": "Observability via the mesh",
    "choices": [
      "It tells which developer wrote the slow function",
      "It replaces the need for any monitoring of databases",
      "It shows latency per hop",
      "It makes slow requests faster by caching them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of high cardinality labels in mesh metrics?",
    "topic": "Observability via the mesh",
    "choices": [
      "They stop the mesh from collecting any metric",
      "They make the dashboards show wrong numbers on purpose",
      "They create a huge number of time series",
      "They are blocked by the proxy for security reasons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can metrics from the mesh be collected?",
    "topic": "Observability via the mesh",
    "choices": [
      "Prometheus scrapes the proxies, and Grafana shows the graphs",
      "The services write the metrics into a spreadsheet by hand every day for the managers",
      "Each proxy emails a report to the operations team daily",
      "A developer reads the logs of each pod and counts them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a zero downtime deployment?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "Deploying a new version only at night when nobody uses it",
      "Stopping the old version and then starting the new one",
      "Deploying without any tests",
      "Releasing a new version without making the application unavailable to users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a rolling deployment?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "All instances are stopped and replaced at the same moment",
      "Instances are replaced a few at a time",
      "A new copy of the database is created for each release",
      "The new version is released to one user only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a blue green deployment?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "Two versions that run on one server at the same moment",
      "Two identical environments, where traffic is switched from the old to the new one",
      "A deployment that uses only two servers",
      "A way of colouring the log output of the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a canary release?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "The new version is released to all users with no checks",
      "The new version is only released on weekends",
      "The old version is deleted before the new one starts",
      "The new version gets a small share of the traffic first, to detect problems early"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a health check important during a rolling deploy?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "The load balancer sends traffic only to instances that report that they are ready",
      "The health check makes the build run faster",
      "The platform needs the check to pull the image",
      "The check deletes failed instances"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of database migrations during a zero downtime deploy?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "Migrations are not allowed during a deploy",
      "The database stops accepting connections for a day",
      "Old and new versions of the code run against the same schema at the same time",
      "Migrations delete the new code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a schema change stay compatible with the old code?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "Rename columns and deploy the code in one step",
      "Drop the old table before the code is released",
      "Make additive changes first, deploy the code, and remove old fields later",
      "Stop the old code before running the migration"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does graceful shutdown mean for a server process?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "It stops accepting new requests and finishes the ones in progress before exit",
      "It kills the process at once with no cleanup",
      "It restarts the host machine",
      "It deletes the logs of the process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you roll back a bad release quickly?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "Fix the code on the server by hand while users are online",
      "Delete the database and restore it from scratch",
      "Wait until the problem goes away",
      "Redeploy the previous image or switch traffic back to the old environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep the previous version running until the new one is healthy?",
    "topic": "Canary & blue-green routing",
    "choices": [
      "It makes the new version start faster",
      "Users never see a gap, and you can switch back if the new version fails",
      "It reduces the size of the image",
      "It stops the load balancer from working"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-8

```json
[
  {
    "stem": "What is a consequence of database per service for queries?",
    "topic": "Database-per-service consequences",
    "choices": [
      "Every query runs faster, since each service has a small database",
      "All services can read the data of all other services directly",
      "Data from several services cannot be joined in one query",
      "Queries are no longer needed, since services share their memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a service show data that belongs to several services?",
    "topic": "Database-per-service consequences",
    "choices": [
      "By API composition, or by keeping a read model that is updated from events",
      "By joining the tables of all services in one database query",
      "By copying all of the databases to the machine of the user each morning before work",
      "By asking the cloud provider to merge the databases at night"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is API composition?",
    "topic": "Database-per-service consequences",
    "choices": [
      "A service writes the source code of another service on the fly when it is needed",
      "A gateway stores all of the data of the other services",
      "A developer assembles the API documentation of many teams",
      "A service or gateway calls several services and combines the results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a drawback of API composition for large queries?",
    "topic": "Database-per-service consequences",
    "choices": [
      "It cannot call more than one service in the same request",
      "It can be slow, since many calls are made and data is joined in memory",
      "It forces all services to use the same database schema",
      "It removes the need for any timeouts or retries on the calls between the services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean that each service owns its schema?",
    "topic": "Database-per-service consequences",
    "choices": [
      "Every team may change the schema of every service at will",
      "Only that service may change or read its tables directly",
      "The schema is stored in a shared repository that nobody reviews",
      "The schema is created by the cloud provider for each service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it harder to enforce referential integrity across services?",
    "topic": "Database-per-service consequences",
    "choices": [
      "Referential integrity is not needed in any distributed system",
      "Databases of different services refuse to store foreign keys",
      "Services cannot store ids of records of other services",
      "Foreign keys cannot span databases"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a local transaction?",
    "topic": "Database-per-service consequences",
    "choices": [
      "A transaction that is limited to the database of a single service",
      "A transaction that locks the databases of all of the services at once for its duration",
      "A transaction that runs only on the laptop of a developer",
      "A transaction that is written in a local file on the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a distributed query when one of the services is down?",
    "topic": "Database-per-service consequences",
    "choices": [
      "The other services automatically return the missing data",
      "The query waits for ever until the service comes back",
      "The result may be partial or the query may fail",
      "The database of the failed service is queried by the others"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does database per service increase the need for good events?",
    "topic": "Database-per-service consequences",
    "choices": [
      "Events replace the databases, so no storage is needed",
      "Events are the only way to back up the data",
      "Other services learn about changes through events rather than shared tables",
      "Events are used to create the tables of each service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a reasonable way to handle reports that need data from all services?",
    "topic": "Database-per-service consequences",
    "choices": [
      "Build a separate reporting store that collects data from events or exports",
      "Run the reports directly against the production tables of every service at night",
      "Ask each team to send its data by email to the report author",
      "Copy all production databases into one table by hand each week"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can distributed transactions across services be a problem?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "They make each service faster because the work is shared between all participants",
      "They are required by all databases and so are always safe",
      "They remove the need for any error handling in the services",
      "They lock resources and fail badly when one participant is slow or down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is two phase commit?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "A protocol where each participant commits alone without any coordination between them",
      "A protocol where a coordinator asks all participants to prepare and then commit",
      "A way of copying a database in two steps to another region",
      "A method of writing each record twice to the same table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is two phase commit rarely used between microservices?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "It is not supported by any database product that exists today",
      "It couples services and blocks them while waiting",
      "It makes transactions faster than they need to be",
      "It can only be used with a single table in one database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the saga pattern?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "A single global transaction that locks all databases for its whole duration",
      "A way of storing all events of a system in a single table",
      "A tool that retries every failed request for ever",
      "A business transaction is a sequence of local transactions with compensating actions on failure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a compensating transaction?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "An action that undoes the effect of an earlier step",
      "A payment that a customer makes to a service for its use",
      "A rollback that the database performs automatically for all services",
      "A backup that is created before each local transaction"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can compensations not always restore the exact earlier state?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "Compensations are forbidden by databases in distributed systems",
      "The previous state is always stored in the same place as the new one",
      "Some effects, such as sent emails, cannot be undone, only offset",
      "Compensations run before the original action has happened"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens in a saga if the third step fails?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "All steps are repeated from the first one until the third step finally works",
      "The saga is ignored and the data stays in a partial state",
      "Compensating actions are run for the steps that already succeeded",
      "The database of the third service is deleted and rebuilt"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a saga give up compared with an ACID transaction?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "Isolation, since intermediate states can be seen by others for a short time",
      "Atomicity of each local step, which is no longer possible",
      "Durability of data, since nothing is written to disk",
      "The ability to use any database product at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can sagas reduce problems with visibility of intermediate states?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "Hold a database lock in every service until the saga ends",
      "Hide the data of the saga from all users for a day",
      "Delete the data of the saga from every service after each step",
      "Use semantic locks, such as a pending status, so others know the item is in flux"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must saga steps and compensations be idempotent?",
    "topic": "Distributed transactions & the saga pattern",
    "choices": [
      "Idempotent steps run faster than other steps in a saga",
      "Messages can be delivered more than once, and retries must not repeat effects",
      "The database cannot store any step that is not idempotent",
      "Sagas are executed only one time and never retried"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is saga choreography?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "A central orchestrator tells each service what to do in each step",
      "Each service reacts to events and publishes the next event",
      "Developers start each step of the saga by hand from a console",
      "Services run in a fixed order that is stored in a shared file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is saga orchestration?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "Each service decides its next step on its own after reading events",
      "A scheduler starts all steps at the same time in parallel",
      "The database coordinates the steps with a distributed lock",
      "A central orchestrator tells participants which local transaction to run next"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an advantage of choreography?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "It is simple for a few steps and has no central point of failure",
      "It gives one clear place where the whole flow is written and can be monitored",
      "It makes it easy to see the complete state of every saga",
      "It removes the need for any events or messages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of choreography for many steps?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "It needs a central server that coordinates the whole flow",
      "It cannot use a message broker for the events",
      "The flow is spread over services, and cyclic dependencies and confusion can appear",
      "It makes each service larger than the services of an orchestrated saga"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an advantage of orchestration?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "There is no coordinator, so nothing can fail in the middle",
      "It needs no messages and no state to be stored",
      "The flow is explicit in one place",
      "It makes all services identical in their behaviour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of orchestration?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "The orchestrator can become a point of coupling and must be made reliable",
      "The services cannot call each other in any way",
      "It cannot be used with compensating actions",
      "It makes sagas slower than any other type of workflow"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which choice often fits long or complex business processes?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "Choreography, since no one needs to see the whole process",
      "Neither, since processes must be handled by a single service",
      "A shared database that each service updates directly",
      "Orchestration, since the process is visible and easier to change in one place"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What state must an orchestrator keep?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "The source code of all of the participating services",
      "The progress of each saga",
      "The passwords of all of the users who take part in the process",
      "Nothing, because it always starts from the first step again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What tools are used for orchestration of workflows?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "Version control tools such as Git and Mercurial",
      "Workflow engines such as Temporal, Camunda or AWS Step Functions",
      "Image editors that draw diagrams of the saga",
      "Spreadsheet programs that list the steps of each saga"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can choreography be made easier to follow?",
    "topic": "Choreography vs orchestration",
    "choices": [
      "Remove all of the events from the code of the services",
      "Run all services in one process so the flow is local",
      "Use random names for events to avoid conflicts",
      "Document the events, use tracing and keep the number of steps small"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem does the transactional outbox solve?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "Updating the database and publishing an event reliably, without a distributed transaction",
      "Deleting events from a broker after they have been read",
      "Encrypting events with a key that only the broker knows",
      "Making the broker faster when it holds many messages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the outbox pattern work?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "The service publishes to the broker first and writes to the database later",
      "The service stores events only in memory until the broker responds",
      "The service writes the event to an outbox table in the same local transaction as the data",
      "The service sends each event twice to two different brokers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What reads the outbox table and publishes to the broker?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "The consumer of the event, which also writes to the table",
      "The browser of the user who made the request",
      "A relay, either a poller or change data capture",
      "A scheduled backup job of the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is writing to the database and then publishing to a broker unsafe?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "A crash between the two steps loses the event or the data becomes inconsistent",
      "Brokers refuse messages that come after a database write",
      "Databases cannot be used together with message brokers",
      "The write is always rolled back when a message is sent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What delivery guarantee does the outbox pattern usually give?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "Exactly once for every consumer without any extra work",
      "At most once, so events may be lost sometimes",
      "No guarantee at all about the delivery of the events",
      "At least once, so consumers must be idempotent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is change data capture?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "Capturing the screen of the user when data is changed",
      "Reading the changes from the database log and turning them into events",
      "Copying the whole database to a file every night",
      "Counting the number of changes made by each developer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool is often used for change data capture?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "Selenium",
      "Debezium",
      "Prometheus",
      "Terraform"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the polling publisher approach?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "The broker polls the services for new data every second",
      "The user polls the page for updates all day long",
      "The service polls the cloud provider for its own address and publishes that to the broker",
      "A process polls the outbox table for new rows and publishes them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why mark outbox rows as sent or delete them?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "To avoid publishing the same event again and to keep the table small",
      "To make the table larger so that it uses the cache better",
      "To prevent anyone from reading the data in the table",
      "To satisfy the broker, which needs a status column"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does the inbox pattern address?",
    "topic": "The transactional outbox pattern",
    "choices": [
      "Consumers store messages in a mailbox for later reading by users",
      "Consumers delete the messages from the broker before they process them",
      "Consumers record processed message ids so duplicates are ignored",
      "Consumers forward each message to all of the other services"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is eventual consistency?",
    "topic": "Eventual consistency",
    "choices": [
      "Data is always consistent in all places at every moment",
      "Data never becomes consistent in a distributed system",
      "Data in different places becomes consistent after some time, not immediately",
      "Data is consistent only on the first day of the month"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is eventual consistency accepted in microservices?",
    "topic": "Eventual consistency",
    "choices": [
      "Strong consistency across services would reduce availability and independence",
      "It is easier to build than strong consistency in every case",
      "It removes the need for any testing of the data",
      "It is required by all of the cloud providers to use their services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a user interface deal with eventual consistency?",
    "topic": "Eventual consistency",
    "choices": [
      "Hide all errors so users never see that data is not yet updated",
      "Block the user from using the screen until all services agree",
      "Reload the whole page every second until it matches",
      "Show pending states or confirmations, and avoid claiming data is final too early"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is read your writes consistency?",
    "topic": "Eventual consistency",
    "choices": [
      "A user can read only data that other people have written",
      "A user sees their own changes right after making them",
      "A user must write before they are allowed to read",
      "All users see the same data in the same order at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which technique helps with read your writes after an update?",
    "topic": "Eventual consistency",
    "choices": [
      "Wait one day before showing the data to the user",
      "Return the new state in the response, or read from the primary for a short time",
      "Delete the old data and show an empty page",
      "Read from a random replica to spread the load"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a stale read?",
    "topic": "Eventual consistency",
    "choices": [
      "Reading data from a file that has been deleted",
      "Reading data that has the wrong type in the database column of a table",
      "Reading data from a cache that is turned off",
      "Reading data that does not yet include a recent update"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When may eventual consistency be unacceptable?",
    "topic": "Eventual consistency",
    "choices": [
      "For actions such as stock reservation or payments where stale data causes harm",
      "For showing a list of the most popular products on a shop page",
      "For updating the number of likes on a post that users see",
      "For loading a user profile picture on a profile page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can conflicts be resolved when two replicas change the same data?",
    "topic": "Eventual consistency",
    "choices": [
      "By deleting both changes and starting again from the first state",
      "By asking the user to restart the application",
      "With rules such as last write wins, versions or merge functions",
      "By letting the database choose at random for each field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a vector clock or version used for?",
    "topic": "Eventual consistency",
    "choices": [
      "To measure the speed of the network between two nodes",
      "To count the number of users that are connected to a replica",
      "To detect whether changes happened before, after or concurrently with others",
      "To store the time zone of each service in a cluster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why monitor the lag of replicas and consumers?",
    "topic": "Eventual consistency",
    "choices": [
      "Lag shows how far behind the data is",
      "Lag is the amount of memory that a service uses at the moment",
      "Lag is the time that a developer needs to fix a bug",
      "Lag is the number of retries made by the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is idempotency in message processing?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Processing each message exactly once by the broker with no help from the consumer at all",
      "Processing a message only if it was sent in the last minute",
      "Processing a message by a different consumer each time",
      "Processing the same message several times has the same effect as processing it once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a consumer deduplicate messages?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Delete the message from the broker before it is processed by the consumer",
      "Store the id of each processed message and skip ones it has seen",
      "Process each message twice and compare the results",
      "Ask the producer to send each message only on odd days"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a deduplication store keep?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "The full content of every message that was ever received",
      "The message ids for long enough to cover the possible redelivery window",
      "Only the last message id, since older ones never come back",
      "The ids of the consumers that took part in the processing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a natural idempotent operation?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Adding one to a counter, since each call adds the same number",
      "Appending a line to a log file, since each call adds a new line",
      "Sending an email, since the same email is sent again",
      "Setting a value, such as set status to shipped, since repeating it changes nothing more"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is incrementing a counter not idempotent?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Each repeat adds again, so duplicates give a wrong total",
      "Counters cannot be changed more than once in a database, so a repeat is ignored",
      "Counters are reset by the database after each read",
      "Incrementing is not allowed in distributed systems"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a non idempotent operation be made safe?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Retry it more times, so that one of the calls will succeed at least once",
      "Make it run only at night when there are fewer duplicates",
      "Add an idempotency key and record that the operation has been done",
      "Remove the retries and accept that the operation may fail"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the idempotency check be placed relative to the side effect?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "After the side effect has been done and the answer sent",
      "Before the message has been received by the consumer",
      "Atomically with the side effect",
      "In a different service that has no access to the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a unique constraint useful for in deduplication?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "A second insert of the same key fails",
      "It makes each insert faster than other kinds of insert",
      "It deletes old rows when new rows with the same key arrive",
      "It copies the row to the other databases automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between deduplication and idempotency?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "Idempotency drops repeats, while deduplication means repeats are harmless",
      "They are the same, and the names are used by different teams",
      "Deduplication works for HTTP only, and idempotency for messages only",
      "Deduplication drops repeats, while idempotency means repeats are harmless"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a message be delivered twice even when the producer sends it once?",
    "topic": "Idempotency & deduplication",
    "choices": [
      "The broker always copies each message to improve safety",
      "Retries and failures between processing and acknowledgement can cause redelivery",
      "Consumers ask for each message two times to be sure",
      "Messages are duplicated by the network cable on the way"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-9

```json
[
  {
    "stem": "Why add logging to a backend service?",
    "topic": "Centralized logging",
    "choices": [
      "Logs make the server respond faster to requests",
      "Logs are required for the server to start",
      "Developers can understand what happened when something goes wrong in production",
      "Logs replace the need for a database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a structured log?",
    "topic": "Centralized logging",
    "choices": [
      "A log entry with fields such as level, time and request id that tools can search",
      "A log that is written in a single long sentence of text",
      "A log that is stored only in the memory of the process",
      "A log that is printed only during development"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which log levels are commonly used?",
    "topic": "Centralized logging",
    "choices": [
      "red, green, blue and yellow",
      "start, middle, end and stop",
      "small, medium, large and huge",
      "debug, info, warn and error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you never write to logs?",
    "topic": "Centralized logging",
    "choices": [
      "The time of each request that was handled",
      "Passwords, tokens and other secrets, or personal data without a reason",
      "The status code of each response",
      "The name of the route that was called"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a request id useful for?",
    "topic": "Centralized logging",
    "choices": [
      "Making the request run faster on the server",
      "Following one request across several log lines and services",
      "Encrypting the body of the request",
      "Limiting how many requests a user can send"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does monitoring add on top of logs?",
    "topic": "Centralized logging",
    "choices": [
      "A copy of every log line stored forever",
      "A faster database for the application",
      "A way to edit the code of the live server",
      "Metrics and alerts that tell you when the system is unhealthy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which metrics give a quick view of the health of a web service?",
    "topic": "Centralized logging",
    "choices": [
      "Error rate, latency and traffic",
      "Number of files in the project and folder size",
      "Number of developers and lines of code",
      "The colour theme and the font of the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a health check endpoint used for?",
    "topic": "Centralized logging",
    "choices": [
      "It lists all users of the service for administrators",
      "It restarts the database every few minutes",
      "A platform or monitor calls it to see whether the service is alive and ready",
      "It shows the source code of the service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why alert on symptoms such as the error rate and not on every log line?",
    "topic": "Centralized logging",
    "choices": [
      "Individual log lines cannot be read by any of the tools that are used for monitoring",
      "Symptoms are easier to hide from the team",
      "Alerts stay useful and are not drowned in noise",
      "Alerts on log lines are not allowed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a sensible first step after an alert for a spike in errors?",
    "topic": "Centralized logging",
    "choices": [
      "Check whether it started with a recent change and roll back if the impact is high",
      "Wait a week to see whether it goes away",
      "Delete the monitoring tool to stop the alerts",
      "Add new features to cover for the errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Prometheus?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "A tool that stores the logs of every service in text files for search",
      "A tracing system that follows requests across services in a cluster",
      "A service that sends alerts to users by text message for each error",
      "A monitoring system that collects metrics as time series, usually by scraping endpoints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Prometheus usually collect metrics?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "Services push each metric to it every time that a request is made by a client",
      "It pulls them over HTTP from the metrics endpoints of the services",
      "It reads them from the log files on the disk of each server",
      "It receives them by email from each developer on the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a counter metric?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "A value that goes up and down, such as the current memory use",
      "A value that only goes up, such as the total number of requests",
      "A value that stores the time of the last request that was served",
      "A value that is reset by the user at the start of each day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a gauge metric?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "A value that only increases for as long as the process runs",
      "A value that records the distribution of request durations",
      "A value that holds the version of the code that is running",
      "A value that can go up and down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a histogram used for?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "Recording the distribution of values such as latency in buckets",
      "Counting how many times an error happened in total",
      "Storing the last value that a service has reported",
      "Measuring how many users are logged in to the system at the present moment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is PromQL?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "A language for writing the alert messages for the team",
      "A language for describing the layout of Grafana dashboards",
      "The query language of Prometheus for selecting and aggregating time series",
      "A format for storing metrics in a relational database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Grafana do in a monitoring stack?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "It collects metrics from the services by scraping their endpoints at a fixed interval",
      "It stores the logs of the services in a searchable index",
      "It builds dashboards and graphs from data sources such as Prometheus",
      "It routes alerts to the on call person of the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid labels with unbounded values, such as a user id, on metrics?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "Each value creates a new time series",
      "Labels are not allowed to contain more than ten characters",
      "Labels with ids are removed by Prometheus at each scrape",
      "User ids are secret and cannot be stored in any metric"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the RED method?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "Read, edit and delete for each database table",
      "Restart, extend and deploy for each cluster",
      "Request, encrypt and decrypt for each message",
      "Rate, errors and duration for each service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the USE method?",
    "topic": "Metrics with Prometheus & Grafana",
    "choices": [
      "Users, sessions and events for each application",
      "Utilisation, saturation and errors for each resource",
      "Upgrade, scale and evict for each node of the cluster",
      "Uptime, speed and efficiency for each developer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is distributed tracing?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "Counting the number of requests per second for each service and showing them on a dashboard",
      "Following a request across several services with a shared trace id",
      "Storing the logs of all services in one file",
      "Drawing a picture of the architecture by hand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a span?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "A kind of log level for errors",
      "The width of a network connection",
      "A name for a group of services",
      "A unit of work in a trace with a start, a duration and a parent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Spring project provides tracing support for Boot 3?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "Micrometer Tracing",
      "Spring Batch",
      "Spring Shell",
      "Spring Session, which keeps the sessions of users in a shared store for all of the instances"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of OpenTelemetry?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "A database for storing business events",
      "A framework for building web pages",
      "A standard for collecting traces, metrics and logs from applications",
      "A tool for editing source code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does the trace id travel between services?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "In the body of each request as a field, which each service has to copy to the next call",
      "In a cookie that the browser keeps",
      "In request headers, such as the W3C traceparent header",
      "In the name of the service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add the trace id to log lines?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "You can find all logs of one request across services",
      "Logs are smaller with it",
      "The trace id replaces the timestamp, so lines no longer need to carry the time of the event",
      "It hides the user name in the logs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does sampling mean in tracing?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "Each request is traced twice",
      "The traces are sorted by name",
      "Only requests from testers are traced, while the traffic of real users is skipped for privacy",
      "Only a share of the requests is traced, to reduce the cost"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What tool shows traces as a timeline of spans?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "A text editor",
      "A tracing backend such as Zipkin or Jaeger",
      "A load balancer",
      "A database client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is tracing especially important in microservices?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "Microservices cannot write logs of their own, so traces replace them",
      "A single request touches many services",
      "Tracing makes services faster",
      "Services need it to start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of tracing every request in production?",
    "topic": "Distributed tracing with OpenTelemetry",
    "choices": [
      "Requests cannot be traced at all in production, since tracing tools only work in test systems",
      "Traces make the response wrong",
      "The trace id can be read by users",
      "Extra overhead and data volume, so sampling is often used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Resilience4j provide?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "Fault tolerance tools such as circuit breakers, retries and rate limiters",
      "A set of database drivers for Java",
      "A tool for building user interfaces",
      "A generator of test data for services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a circuit breaker?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "It switches off the servers of the failing service after an error and starts new ones at random",
      "It counts the calls to a service for the bill",
      "It stops calls to a failing service for a while, so failures do not pile up",
      "It creates a copy of the service in the cloud"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the states of a circuit breaker?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "Start, stop and pause, which describe the lifecycle of the process that runs the service",
      "Green, yellow and red",
      "Closed, open and half open",
      "Idle, busy and failed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens in the half open state?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "A few trial calls are allowed to check whether the service has recovered",
      "All calls are blocked for the whole time",
      "All calls are allowed with no counting",
      "The breaker is deleted and created again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a fallback method?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "A method that restarts the service after a crash",
      "A method that deletes the failed requests",
      "A method that logs the result in the database",
      "A method that provides a default result when the call fails or the breaker is open"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a retry policy do?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "It removes the call from the queue after one failure and reports the error to the developer",
      "It repeats a failed call a number of times, often with a delay",
      "It increases the timeout without limit",
      "It sends the call to a different type of service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add backoff and jitter to retries?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "It makes each retry faster than the one before",
      "It avoids many clients retrying at the same moment and overloading the service",
      "It reduces the number of services",
      "It sets the retries to run at random times of day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must retried operations be idempotent?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "Idempotent calls are faster than other calls",
      "Retries are only allowed for read operations by law, so write operations can never be repeated",
      "The broker refuses calls that are not idempotent",
      "A repeated call must not cause a duplicate effect, such as a second payment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a bulkhead do?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "It limits the resources for one part",
      "It encrypts the calls between services",
      "It splits a service into two jars",
      "It stores a backup of each call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a time limiter do?",
    "topic": "Circuit breakers, retries & bulkheads",
    "choices": [
      "It limits the time that a developer can work on a service",
      "It sets the time zone of the service",
      "It cancels a call that takes longer than a set time",
      "It schedules calls at a given hour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "An endpoint that returns the list of users who are currently online in the system",
      "An endpoint that restarts the service when it is called",
      "An endpoint that reports whether the service is alive and able to work",
      "An endpoint that stores a copy of the logs of the service"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between liveness and readiness checks?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "Liveness says the process is stuck and should restart, readiness says it can take traffic",
      "Readiness says the process should restart, liveness says it can take traffic",
      "They check the same condition, but the names depend on the platform",
      "Liveness checks the database and readiness checks the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should a readiness check include dependencies carefully?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "A readiness check must never look at any dependency of the service",
      "Dependencies are checked by the browser of the user on each page",
      "Readiness checks run only once when the service is first built",
      "A failing optional dependency should not take the whole service out of rotation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is graceful degradation?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "The service stops completely at the first error it finds",
      "The service keeps working with reduced features when a part fails",
      "The service becomes slower and slower until it is finally restarted by an operator",
      "The service deletes data that it cannot process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Give an example of graceful degradation.",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "Showing an error page for the whole site when any single part of it fails",
      "Showing cached recommendations when the recommendation service is down",
      "Restarting the whole cluster when one pod has failed",
      "Hiding the problem from the monitoring system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a fallback?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "A second copy of the database that is used for backups",
      "A scheduled job that runs when traffic is low",
      "A tool that rolls back the code to a former version",
      "An alternative response when the normal path fails"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it important to distinguish critical from non critical dependencies?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "The service can keep serving users when only non critical parts are unavailable",
      "Critical dependencies are always faster than non critical ones",
      "Non critical dependencies are deleted from the system",
      "Only critical dependencies need to be tested in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is load shedding?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "Moving load from one cluster to another by hand during a release",
      "Deleting old logs to free up the disk of the nodes",
      "Rejecting some requests on purpose when overloaded, to protect the service for others",
      "Adding more servers whenever the traffic increases"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a feature flag useful for in degradation?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "A flag stores the passwords of the services in a safe place",
      "A flag lets users choose the language of the user interface",
      "A flag can switch off a costly or failing feature quickly without a deploy",
      "A flag decides the order in which the services are started"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a health endpoint avoid doing?",
    "topic": "Health checks & graceful degradation",
    "choices": [
      "Heavy work or checks that can overload the service or the dependencies",
      "Returning a status code that tells the platform whether the service is healthy",
      "Being reachable by the platform that monitors the services",
      "Having a short and stable response format that tools can read"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an SLI?",
    "topic": "SLOs & alerting",
    "choices": [
      "A document that describes the legal terms for a customer",
      "A tool that tests the load of a service in production",
      "A list of all services and their owners in a company",
      "A service level indicator, a measured value such as the share of successful requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an SLO?",
    "topic": "SLOs & alerting",
    "choices": [
      "A contract with a penalty that is signed by the customer",
      "A service level objective, a target for an SLI such as 99.9 percent success over a month",
      "A report of the incidents that happened last year",
      "A limit on the number of services in a system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an SLO and an SLA?",
    "topic": "SLOs & alerting",
    "choices": [
      "An SLO is an agreement with consequences, an SLA is an internal target",
      "An SLA is an agreement with consequences, an SLO is an internal target",
      "They are the same, and the word depends on the cloud provider",
      "An SLA is for databases and an SLO is for web services only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an error budget?",
    "topic": "SLOs & alerting",
    "choices": [
      "The money that a team spends on fixing errors each year",
      "The number of errors that a service may log in a day",
      "The size of the log file that errors may use",
      "The amount of unreliability that the SLO allows before action is needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can an error budget guide decisions?",
    "topic": "SLOs & alerting",
    "choices": [
      "When it is used up, the team focuses on reliability instead of new features",
      "When it is used up, the team deploys faster to fix problems",
      "It decides which developer is responsible for each error",
      "It sets the price of the service for the customers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why alert on symptoms such as error rate and latency rather than causes such as high CPU?",
    "topic": "SLOs & alerting",
    "choices": [
      "Causes cannot be measured by any monitoring tool",
      "Symptoms are easier to hide from the users than causes",
      "Symptoms show the user impact, and causes may not hurt anyone",
      "High CPU is always a sign of a problem for every service that runs in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is burn rate alerting?",
    "topic": "SLOs & alerting",
    "choices": [
      "Alerting when the temperature of a server in the data center is too high",
      "Alerting when a deploy takes more than ten minutes",
      "Alerting based on how fast the error budget is being consumed",
      "Alerting when a service uses too much memory at night"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What makes an alert good?",
    "topic": "SLOs & alerting",
    "choices": [
      "It is actionable, urgent and points to what the responder should do",
      "It fires for every small change in any metric of a service",
      "It is sent to every person in the company at the same moment and every time",
      "It has no description, so responders must find the meaning"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is alert fatigue?",
    "topic": "SLOs & alerting",
    "choices": [
      "Alerts stop working after they have fired a hundred times in a single day",
      "Servers become tired after processing too many alerts",
      "A new kind of attack on the alerting system",
      "Responders ignore alerts because there are too many noisy ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why write runbooks for alerts?",
    "topic": "SLOs & alerting",
    "choices": [
      "Runbooks replace the need to monitor the system",
      "The responder knows what the alert means and what to check first",
      "Runbooks are needed for the alert to be sent at all",
      "They make the alert louder for the person on call"
    ],
    "answerIdx": 1
  }
]
```

LAYER: microservices-10

```json
[
  {
    "stem": "What is a GitHub Actions workflow?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "A branch that is created automatically for every release of the application itself",
      "A tool that reviews the code of every pull request without any human help",
      "An automated process defined in YAML that runs jobs on events such as a push",
      "A service that hosts the application after it has been built successfully"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the usual order of steps in a CI job for a Node project?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Check out the code, install dependencies, run lint and tests, then build",
      "Build the app, deploy it, and then run the tests in production at the end",
      "Install the dependencies after the tests have been run on the code",
      "Run the tests on the code before it is checked out of the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step action fetches the repository code in a workflow?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "actions/download",
      "actions/clone-repo",
      "actions/fetch-source",
      "actions/checkout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should secrets used in a workflow, such as a deploy token, be stored?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Directly in the YAML file so that every job can read them",
      "In the encrypted secrets settings of the repository",
      "In the commit message of the last change that was pushed",
      "In a public issue so the team can find them quickly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a matrix strategy allow?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Running several different jobs one after another in a fixed order",
      "Running the same job for several versions",
      "Splitting one test file across the cores of a single machine at once",
      "Deploying one build to several servers at the same moment of time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why cache dependencies in a CI workflow?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Make the tests give different results on each run of the workflow",
      "Avoid having to commit the node_modules folder to the repository",
      "Allow the workflow to run without a network connection at all",
      "Reduce the time each run needs by reusing downloaded packages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a pipeline do before it deploys?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Make sure tests and checks passed on the same commit",
      "Wait for a developer to start the deployment from a local machine",
      "Delete the previous deployment to free up space on the host",
      "Skip the tests so that the deployment is finished faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is continuous deployment compared with continuous delivery?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "Every change waits for a manual approval, while delivery releases it automatically",
      "They mean the same thing, and only the names are different from each other",
      "Every passing change is released automatically",
      "Deployment applies only to databases, and delivery applies only to code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event runs a workflow when code is pushed to the main branch?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "on main_change with the push option",
      "on commit with the deploy option",
      "on push with the branch list set to main",
      "on release_branch with the main option, which watches the release branches"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should workflow permissions follow least privilege?",
    "topic": "Per-service CI pipelines",
    "choices": [
      "A compromised step or dependency can then do less damage with the token",
      "Narrow permissions make every workflow run faster on GitHub",
      "The workflow cannot start unless all of its permissions are removed first",
      "Permissions only affect the name that is shown in the log"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step builds a Docker image in a CI pipeline?",
    "topic": "Container registries & versioning",
    "choices": [
      "docker run with the source code mounted as a volume",
      "docker pull of the latest image from the registry",
      "docker compose down for the old services",
      "docker build with a tag that identifies the commit or version"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why tag images with the commit hash or version number?",
    "topic": "Container registries & versioning",
    "choices": [
      "Tags make the image smaller before it is pushed",
      "You can tell exactly which code is running and roll back to an earlier image",
      "Registries accept only images that have a commit hash",
      "The tag encrypts the image for the registry"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does docker push do?",
    "topic": "Container registries & versioning",
    "choices": [
      "Starts the image as a container on the registry",
      "Uploads an image to a registry",
      "Copies the running container to another host",
      "Deletes the local image after the build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a pipeline sign in to a private registry?",
    "topic": "Container registries & versioning",
    "choices": [
      "With the password written inside the Dockerfile",
      "With a public token that is committed to the repository",
      "Without any credentials, since registries are always open to every pipeline",
      "With credentials stored as encrypted secrets of the CI system"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be in the CI secrets for pushing an image?",
    "topic": "Container registries & versioning",
    "choices": [
      "A registry user and token or a short lived credential, never the personal password",
      "The private source code of the project",
      "The database dump of production",
      "The image layers as plain text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why build the image once and promote the same image through environments?",
    "topic": "Container registries & versioning",
    "choices": [
      "Each environment needs a different image of the same code",
      "Builds must always be repeated on the production server",
      "The tested artifact is exactly what reaches production",
      "It makes the registry cheaper to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of layer caching in CI?",
    "topic": "Container registries & versioning",
    "choices": [
      "Layers are skipped so no code is built",
      "Caching is not possible in CI systems",
      "Builds are faster, because unchanged layers are reused from earlier runs",
      "The registry removes the layers automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can be scanned in an image before it is deployed?",
    "topic": "Container registries & versioning",
    "choices": [
      "Known vulnerabilities in the base image and the packages",
      "The colour scheme of the application",
      "The names of the developers who built it",
      "The size of the git history"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for the latest tag in a pipeline?",
    "topic": "Container registries & versioning",
    "choices": [
      "Use only latest for every deploy and never a version tag",
      "Delete older tags after each push to save space",
      "Push latest to a public registry without checks",
      "Push immutable version tags, and use latest only as a convenience pointer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file in a GitHub repository can define the build and push steps?",
    "topic": "Container registries & versioning",
    "choices": [
      "The package.json file at the root",
      "A YAML workflow file under .github/workflows",
      "The Dockerfile of the application",
      "The README of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is GitOps?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "Developers run commands on the cluster by hand and then commit the result",
      "The desired state of the system is stored in Git, and an agent applies it to the cluster",
      "Git is used only to store the source code of the services, not their configuration",
      "The cluster is edited through a web console and Git stores the screenshots"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ArgoCD do?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "It builds the container images of services from their source code",
      "It collects metrics and traces from the services of the cluster",
      "It routes external traffic to the services of the cluster",
      "It watches a Git repository and keeps the cluster in sync with the manifests there"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the pull model of GitOps?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "An agent in the cluster pulls changes from Git",
      "The pipeline pushes changes into the cluster using powerful admin credentials",
      "Developers copy files to the nodes by hand through a shell",
      "The cluster sends its configuration to Git each hour for backup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of the pull model for security?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "The cluster can no longer be reached from the internet at all",
      "No authentication is needed for any request to the cluster",
      "Credentials to the cluster stay inside it and are not stored in the CI system",
      "Git stores the passwords for the cluster in clear text for convenience of the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is configuration drift?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "The slow growth of the size of the configuration files over time",
      "The movement of pods between nodes by the scheduler",
      "The live state differs from the declared state",
      "The change of the name of a service in the repository"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does GitOps handle drift?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "The agent detects it and can revert the cluster to the declared state",
      "The agent deletes the repository and creates it again",
      "The agent ignores the difference and logs a short note",
      "The agent asks the user to run a command to fix it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of GitOps for audit and rollback?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "Changes are not recorded, so nobody can be blamed for a failure",
      "Rollbacks need a new build of every image each time",
      "The history is stored in the memory of the agent only",
      "Every change is a commit with an author, and a revert returns to an earlier state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an ArgoCD Application resource define?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "The list of users who may log in to the ArgoCD web page",
      "The source repository and path, and the target cluster and namespace to sync",
      "The container image that must be built for a service",
      "The network rules between the pods of a namespace"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does sync mean in ArgoCD?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "Copying the logs of the cluster to Git",
      "Applying the desired state from Git to the cluster",
      "Synchronising the clocks of all nodes of the cluster",
      "Merging two branches of the repository automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why separate the application code repository from the configuration repository?",
    "topic": "GitOps with ArgoCD",
    "choices": [
      "Git does not allow code and configuration to be stored in the same repository",
      "Configuration repositories are required by ArgoCD to start",
      "It makes the code compile faster in the pipeline",
      "Code changes and deploy changes have different reviews and lifecycles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is progressive delivery?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "Releasing a change to a growing share of users while watching the results",
      "Releasing all changes to all users at once on the first day",
      "Releasing changes only when no one is using the system",
      "Releasing changes in alphabetical order of the service names"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a canary release?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "A new version is installed on the developer laptop only",
      "A new version replaces the old one on all servers at once",
      "A new version gets a small share of traffic first, to detect problems early",
      "A new version is released only to the managers of the company"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a blue green deployment?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "Two versions run on the same server and share the same memory",
      "A deployment that uses blue and green log colours",
      "Two environments run, and traffic is switched from the old one to the new one",
      "A deployment that is made on Mondays and Thursdays"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main benefit of blue green for rollback?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "Switching traffic back to the old environment is quick",
      "The old version is deleted so there is nothing to roll back",
      "Rollbacks need a new build, which is slower than in other models",
      "There is no rollback in blue green, only a fix forward"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of blue green deployments?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "They cannot be used with containers or Kubernetes at all",
      "They make every release take at least a full day",
      "They need all users to log out before the switch is made",
      "They need double the capacity during the switch and care with the database changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a tool such as Argo Rollouts or Flagger help?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "It builds the image for the release and signs it for the registry",
      "It automates traffic shifting and analyses metrics to promote or roll back a release",
      "It writes the release notes for the new version automatically",
      "It stores the passwords for the cluster in a secure vault"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What metrics are often used to decide whether to continue a canary?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "The number of commits in the release and the names of their authors",
      "Error rate and latency compared with the stable version",
      "The size of the image and the number of layers in it",
      "The number of developers who have approved the release"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a feature flag?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "A label that marks the branch of a feature in Git",
      "A comment in the code that explains why a feature exists in the product",
      "A report that lists the features of a release",
      "A switch that turns a feature on or off without a new deployment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do feature flags help progressive delivery?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "Code can be deployed dark and enabled for a few users first",
      "Flags make the deploy faster by skipping the tests",
      "Flags remove the need to monitor a release after it has been put out",
      "Flags store the data of the users who use each feature"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a shadow or dark launch?",
    "topic": "Progressive delivery — canary & blue-green",
    "choices": [
      "The new version is released at night when nobody is using it",
      "The new version is released without telling the team",
      "Real traffic is copied to the new version",
      "The new version is hidden from the monitoring tools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the NEXT_PUBLIC prefix do for an environment variable?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "Makes it available only to server components and route handlers",
      "Encrypts the value before it is added to the bundle",
      "Includes it in the browser bundle, so it is visible to everyone",
      "Hides it from the build logs of the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which variables must never use the NEXT_PUBLIC prefix?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "Secrets such as private keys and database passwords",
      "Values such as the public name of the site",
      "Public analytics ids and publishable keys",
      "The url of the home page of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should secrets live in development?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "In a file named secrets.txt in the public folder",
      "In the source code, next to the function that uses them",
      "In the readme, so the whole team can find them",
      "In a local .env file that is ignored by git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why commit a .env.example file?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "It lets the application start without any real configuration being present",
      "It documents the names of the variables without any real values",
      "It is required by Next.js in order to load all of the other env files",
      "It stores a backup copy of the real secrets for the members of the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do if a secret was committed to git?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "Delete the commit and keep using the same secret",
      "Rotate it, since deleting the commit does not undo the exposure",
      "Rename the repository so the secret cannot be found",
      "Add the file to gitignore and keep the secret"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you set secrets for a deployed Next.js app?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "In a file that is committed to the main branch",
      "In the browser, through the developer tools",
      "In the url of the deployed site",
      "In the settings of the hosting platform, per environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use different secrets for preview and production?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "A leak or a mistake in preview cannot affect real customers",
      "Production secrets cannot be used in preview builds because of the platform rules",
      "Preview builds are not allowed to read any variable",
      "The host rotates the secrets every time you deploy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is an environment variable read at build time versus runtime?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "It is always read at build time and is never read a second time",
      "It is always read at runtime, every time that a user visits",
      "It depends on whether the code runs while building or while serving requests",
      "It is read only once, at the moment when the repository is cloned"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you fail fast when a required variable is missing?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "Use an empty string and let the code carry on running without the variable",
      "Catch every error that happens in the app and ignore all of them silently",
      "Validate the environment at startup and throw a clear error",
      "Add the variable to the public bundle so that it is available as a fallback"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the principle of least privilege for API keys?",
    "topic": "Secrets & environment promotion",
    "choices": [
      "Give each key only the permissions it needs, and nothing more",
      "Give each key every permission that exists so that nothing is ever blocked",
      "Share one single key between all of the services to keep the setup simple",
      "Remove the permissions from a key after it has been used for one request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe rollback strategy?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Delete the previous version as soon as the new one is deployed",
      "Fix the code on the live server while users are using it",
      "Wait for the problem to disappear by itself over time",
      "Keep the previous version available and redeploy it quickly if checks fail"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are database changes a challenge for rollbacks?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Databases cannot be changed after the first release of a service",
      "The old code may not work with the new schema",
      "Databases refuse to roll back when they have more than one user",
      "Schemas are stored in the code, so they roll back automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the expand and contract approach for schema changes?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Remove the old structure first and then add the new structure at once",
      "Add the new structure, run old and new code, then remove the old structure later",
      "Expand the number of servers and then reduce them after the change",
      "Shrink the table first and then enlarge it when users complain"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does roll forward mean?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Move the release date to the future when something fails",
      "Redeploy the same version again and hope that it works",
      "Delete the release and skip to the next planned version",
      "Fix the problem with a new release instead of returning to the old version"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might roll forward be better than rollback?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "When the old version is incompatible with the data that has been written",
      "When the new version works perfectly for all of the users",
      "When the previous version is a year old and well tested",
      "When the team does not have a version control system"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a release train?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "A train of containers that carry the services between data centers",
      "A release that cannot be stopped once it has begun",
      "Releases happen on a fixed schedule, and ready changes catch the next train",
      "A pipeline that has trains as its jobs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should deployments be small and frequent?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Large releases are safer because they happen less often during the year",
      "Frequent releases make the monitoring tools unnecessary",
      "Smaller changes are easier to test, understand and roll back",
      "Small changes are not allowed to include tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a deployment freeze?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "A period in which no changes are released",
      "A feature that stops a deployment that has gone wrong",
      "A tool that freezes the cluster to take a backup",
      "A rule that every release must contain at least ten changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should be defined before a release goes out?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "The names of the people who will be blamed if it fails",
      "The colour of the dashboards that will be used by the team to watch it",
      "The number of tickets that the release closes in total",
      "The checks that decide whether it is healthy and how to roll back"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice after a failed release?",
    "topic": "Rollbacks & release strategies",
    "choices": [
      "Remove the monitoring so that failures are less visible to the customers",
      "Hold a blameless review and improve the checks or the process",
      "Stop all releases for the rest of the year",
      "Hide the failure from the other teams of the company"
    ],
    "answerIdx": 1
  }
]
```

