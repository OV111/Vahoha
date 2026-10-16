You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "System Design" (system-design, category cs). It has 12 layers, listed at the bottom.

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
### Layer 1 of 12 — id: system-design-1
Title: System Design Foundations and Estimation
Technologies: Requirements, Back-of-envelope, Trade-offs
Description: Learn how designers think before drawing boxes. You will turn vague requirements into functional and non-functional goals, estimate load and storage with simple math, and use a framework to structure any design discussion.
Topics:
- Functional versus non-functional requirements
- Latency, throughput, availability and consistency targets
- Back-of-envelope estimation
- Read-heavy versus write-heavy systems
- A framework for design discussions
- Stating and defending trade-offs

### Layer 2 of 12 — id: system-design-2
Title: Networking, APIs, and Load Balancing
Technologies: HTTP, REST, gRPC, Load Balancers
Description: Understand how clients reach services and how traffic is spread across them. You will compare API styles, understand the transport and DNS layers that affect latency, and place load balancers and gateways.
Topics:
- DNS, TCP, TLS and HTTP versions
- REST, GraphQL and gRPC trade-offs
- API design: pagination, idempotency, versioning
- Layer 4 versus layer 7 load balancing
- Load balancing algorithms and health checks
- API gateways and reverse proxies

### Layer 3 of 12 — id: system-design-3
Title: Databases: Choosing, Modeling, and Indexing
Technologies: SQL, NoSQL, Indexes, Transactions
Description: Pick the right store for the data and the queries. You will compare relational and NoSQL models, understand how indexes speed up reads and slow down writes, and use transactions correctly.
Topics:
- Relational model, normalization and joins
- Document, key-value, wide-column and graph stores
- B-tree and LSM-tree indexes
- Query planning and covering indexes
- ACID transactions and isolation levels
- Choosing a database from the access pattern

### Layer 4 of 12 — id: system-design-4
Title: Scaling Data: Replication, Partitioning, and Sharding
Technologies: Replication, Sharding, Consistent Hashing
Description: Learn how a database grows past one machine. You will use replication for availability and read scaling, partition data across nodes, and handle the hard parts: hot keys, rebalancing and cross-shard queries.
Topics:
- Leader-follower and multi-leader replication
- Replication lag and read-your-writes
- Horizontal partitioning strategies
- Consistent hashing
- Hot spots and rebalancing
- Cross-shard queries and transactions

### Layer 5 of 12 — id: system-design-5
Title: Caching and Content Delivery
Technologies: Redis, CDN, Caching
Description: Make systems fast and cheap by avoiding repeated work. You will place caches at each layer, choose write and invalidation strategies, handle stampedes, and use a CDN for global delivery.
Topics:
- Cache layers: browser, CDN, application, database
- Cache-aside, write-through and write-back
- Eviction policies: LRU, LFU, TTL
- Cache invalidation and consistency
- Cache stampede and hot keys
- CDNs and edge caching

### Layer 6 of 12 — id: system-design-6
Title: Asynchronous Processing: Queues, Streams, and Events
Technologies: Kafka, Message Queues, Event-Driven
Description: Decouple parts of a system with messages. You will use queues for background work, streams for ordered event logs, and patterns that keep processing correct when messages repeat or arrive late.
Topics:
- Queues versus pub/sub versus streams
- At-most-once, at-least-once and exactly-once
- Idempotent consumers and deduplication
- Kafka partitions, offsets and consumer groups
- Dead-letter queues and retries with backoff
- Event sourcing and the outbox pattern

### Layer 7 of 12 — id: system-design-7
Title: Consistency, CAP, and Distributed Coordination
Technologies: CAP, Consensus, Raft
Description: Understand what you can and cannot promise when machines and networks fail. You will use CAP and consistency models to reason about trade-offs, learn how consensus works, and know when to use coordination services.
Topics:
- CAP theorem and what it really says
- Consistency models: strong, eventual, causal
- Quorums and read/write tuning
- Consensus: Raft and Paxos overview
- Leader election, locks and leases
- Clocks, ordering and the problem with time

### Layer 8 of 12 — id: system-design-8
Title: Microservices and Service Communication
Technologies: Microservices, Service Mesh, Saga
Description: Decide when to split a system and how services should talk. You will compare monoliths and microservices honestly, manage data across services with sagas, and use gateways, discovery and meshes.
Topics:
- Monolith, modular monolith and microservices
- Service boundaries and domain-driven design
- Synchronous versus asynchronous communication
- Distributed transactions and the saga pattern
- Service discovery, gateways and meshes
- Contracts, versioning and backward compatibility

### Layer 9 of 12 — id: system-design-9
Title: Reliability: Rate Limiting, Resilience, and Failure
Technologies: Rate Limiting, Circuit Breaker, Chaos
Description: Design for the failures that will happen. You will limit load, isolate failures with timeouts, retries and circuit breakers, degrade gracefully, and test your assumptions with controlled failure.
Topics:
- Rate limiting algorithms and where to apply them
- Timeouts, retries and exponential backoff with jitter
- Circuit breakers and bulkheads
- Load shedding and graceful degradation
- Redundancy and multi-region design
- Chaos engineering and game days

### Layer 10 of 12 — id: system-design-10
Title: Observability, Capacity, and Cost
Technologies: Prometheus, OpenTelemetry, Capacity Planning
Description: Operate what you design. You will instrument systems with metrics, logs and traces, define alerts that matter, plan capacity from data and keep cost in view as a design constraint.
Topics:
- Metrics, logs and traces
- The four golden signals and RED/USE methods
- Distributed tracing with OpenTelemetry
- Alerting on symptoms and SLO burn rate
- Capacity planning and autoscaling
- Cost as a design constraint

### Layer 11 of 12 — id: system-design-11
Title: Classic System Designs I: Storage, Feeds, and Identifiers
Technologies: URL Shortener, News Feed, Rate Limiter
Description: Apply everything to well-known problems. You will design a URL shortener, a distributed ID generator, a rate limiter and a news feed, practicing the full cycle of requirements, estimation, design and trade-offs.
Topics:
- URL shortener and ID generation (Snowflake style)
- Pastebin and object storage design
- Distributed rate limiter
- News feed: fan-out on write versus read
- Notification system
- Reviewing a design for bottlenecks

### Layer 12 of 12 — id: system-design-12
Title: Classic System Designs II: Chat, Media, Search, and Payments
Technologies: Chat, Video Streaming, Search, Payments
Description: Tackle the harder classics: real-time messaging, video delivery, search and money movement. These designs combine persistent connections, large objects, indexes and strict correctness.
Topics:
- Chat system: WebSockets, presence, ordering and delivery
- Video streaming: upload, transcoding, adaptive bitrate, CDN
- Search: inverted indexes, ranking and typeahead
- Payments: idempotency, ledger and reconciliation
- Maps and geospatial indexing
- Presenting a design and handling follow-ups

Start now with Layer 1.
