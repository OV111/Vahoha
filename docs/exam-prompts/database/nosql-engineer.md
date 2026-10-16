You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "NoSQL Engineer" (nosql-engineer, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: nosql-engineer-1
Title: NoSQL Foundations
Technologies: NoSQL, CAP Theorem, BASE, Document DBs
Description: Understand the motivations for NoSQL databases and the theoretical foundations including CAP theorem and BASE consistency. Survey the main NoSQL categories.
Topics:
- CAP theorem and trade-offs
- BASE vs ACID
- Document, key-value, wide-column, graph types
- Eventual consistency
- Use case selection for NoSQL
- NoSQL vs relational trade-offs

### Layer 2 of 10 — id: nosql-engineer-2
Title: MongoDB for Application Development
Technologies: MongoDB, MQL, Aggregation, Mongoose
Description: Build applications backed by MongoDB, designing schemas around access patterns and using the aggregation pipeline for analytics. Integrate with Node.js using Mongoose.
Topics:
- Schema design for applications
- CRUD with MQL
- Aggregation pipeline
- Mongoose ODM
- Transactions in MongoDB
- Error handling and retries

### Layer 3 of 10 — id: nosql-engineer-3
Title: Redis for Caching and Data Structures
Technologies: Redis, Strings, Hashes, Sorted Sets
Description: Use Redis as a cache and in-memory data store, leveraging its rich data structure types. Implement caching patterns like cache-aside and write-through.
Topics:
- Redis data types (strings, lists, sets, hashes, sorted sets)
- Cache-aside and write-through patterns
- TTL and expiration
- Atomic operations
- Lua scripting basics
- Redis persistence (RDB and AOF)

### Layer 4 of 10 — id: nosql-engineer-4
Title: Apache Cassandra Basics
Technologies: Cassandra, CQL, Partition Key, Keyspace
Description: Get started with Apache Cassandra, understanding its distributed architecture and query-first data modeling approach. Write CQL queries and design tables around known access patterns.
Topics:
- Cassandra ring architecture
- Keyspaces and replication factors
- CQL syntax
- Partition key and clustering columns
- Query-first data modeling
- Cassandra vs RDBMS

### Layer 5 of 10 — id: nosql-engineer-5
Title: DynamoDB Design and Operations
Technologies: DynamoDB, Single-table design, GSI, LSI
Description: Design DynamoDB tables using single-table design principles for efficiency and scalability. Use Global Secondary Indexes to support multiple access patterns.
Topics:
- DynamoDB key design (PK, SK)
- Single-table design patterns
- Global Secondary Indexes (GSI)
- Local Secondary Indexes (LSI)
- Capacity modes (on-demand vs provisioned)
- DynamoDB Streams

### Layer 6 of 10 — id: nosql-engineer-6
Title: Redis Advanced Patterns
Technologies: Redis, Pub/Sub, Streams, RedisSearch
Description: Use advanced Redis features including Pub/Sub messaging, Redis Streams for event processing, and RedisSearch for full-text search capabilities.
Topics:
- Redis Pub/Sub patterns
- Redis Streams consumer groups
- RedisSearch index creation
- Redis Modules ecosystem
- Rate limiting with Redis
- Distributed locks

### Layer 7 of 10 — id: nosql-engineer-7
Title: Cassandra Data Modeling Patterns
Technologies: Cassandra, CQL, Materialized Views, Secondary Indexes
Description: Apply advanced Cassandra data modeling patterns including time-series, user activity, and time-bucket patterns. Handle multi-access-pattern requirements with denormalization.
Topics:
- Time-series patterns with Cassandra
- Time-bucket pattern for hot partitions
- Materialized views
- Secondary indexes limitations
- Batch operations in Cassandra
- Tombstones and compaction effects

### Layer 8 of 10 — id: nosql-engineer-8
Title: Multi-model and Polyglot Persistence
Technologies: MongoDB, Redis, Cassandra, PostgreSQL
Description: Design a polyglot persistence architecture where different data stores serve different components based on their strengths. Manage consistency across multiple stores.
Topics:
- Polyglot persistence patterns
- CQRS with multiple data stores
- Event-driven sync between stores
- Saga pattern for distributed transactions
- Read model caching strategies
- Data synchronization challenges

### Layer 9 of 10 — id: nosql-engineer-9
Title: Observability and Performance Tuning
Technologies: MongoDB, Cassandra, Redis, Prometheus
Description: Monitor and tune multiple NoSQL systems using metrics, tracing, and profiling tools. Set up dashboards and alerts for key performance indicators.
Topics:
- MongoDB Atlas Performance Advisor
- Cassandra nodetool and JMX metrics
- Redis INFO command and latency tracking
- Prometheus exporters for each DB
- Grafana dashboards
- Query profiling across systems

### Layer 10 of 10 — id: nosql-engineer-10
Title: Production Deployment and Resilience
Technologies: Kubernetes, Helm, Terraform, Chaos Engineering
Description: Deploy NoSQL systems to Kubernetes using Helm charts and manage infrastructure with Terraform. Apply chaos engineering to test resilience under failure conditions.
Topics:
- Stateful workloads on Kubernetes
- Helm charts for MongoDB, Redis, Cassandra
- Terraform for managed cloud NoSQL
- PersistentVolumeClaim management
- Chaos engineering with Chaos Monkey
- Disaster recovery for NoSQL

Start now with Layer 1.
