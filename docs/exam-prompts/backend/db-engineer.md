You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "DB Engineer" (db-engineer, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: db-engineer-1
Title: Database Fundamentals
Technologies: RDBMS, Data Types, ACID
Description: Start with what a database is and why it matters. Learn the core concepts shared by every relational system before diving into a specific engine.
Topics:
- Relational model — tables, rows, columns
- Data types & schemas
- Primary & foreign keys
- ACID properties
- Client/server architecture
- SQL vs NoSQL overview

### Layer 2 of 10 — id: db-engineer-2
Title: SQL Mastery
Technologies: SQL, Joins, Aggregations
Description: Become fluent in SQL — the language you'll use every day. Move from basic selects to complex analytical queries.
Topics:
- SELECT, WHERE, ORDER BY, LIMIT
- All JOIN types
- GROUP BY & aggregate functions
- Subqueries & CTEs
- Window functions
- Set operations & CASE

### Layer 3 of 10 — id: db-engineer-3
Title: Relational Modeling & Normalization
Technologies: Normalization, ER Diagrams, Constraints
Description: Design schemas that scale and stay consistent. Master normalization, relationships and constraints.
Topics:
- Entity-relationship modeling
- 1NF through BCNF
- When to denormalize
- Constraints — unique, check, not null
- Cascading actions
- Surrogate vs natural keys

### Layer 4 of 10 — id: db-engineer-4
Title: PostgreSQL Deep Dive
Technologies: PostgreSQL, JSONB, Extensions
Description: Master the world's most advanced open-source database. Explore the features that make PostgreSQL a power tool.
Topics:
- psql & administration basics
- JSONB & array types
- Views, materialized views & CTEs
- Triggers & stored procedures (PL/pgSQL)
- Extensions — PostGIS, pg_trgm
- Full-text search

### Layer 5 of 10 — id: db-engineer-5
Title: MySQL & Operational Databases
Technologies: MySQL, InnoDB, Transactions
Description: Learn MySQL, the backbone of countless production apps. Understand its storage engines and operational behavior.
Topics:
- MySQL vs PostgreSQL differences
- InnoDB storage engine
- Transactions & isolation levels
- Locking & deadlocks
- Stored procedures & events
- Common configuration & tuning

### Layer 6 of 10 — id: db-engineer-6
Title: NoSQL with MongoDB
Technologies: MongoDB, Documents, Aggregation
Description: Add document databases to your toolkit. Learn when NoSQL fits and how to model data in MongoDB.
Topics:
- Document model & BSON
- CRUD & the query language
- Embedding vs referencing
- The aggregation pipeline
- Indexes in MongoDB
- Schema design patterns

### Layer 7 of 10 — id: db-engineer-7
Title: Caching & Redis
Technologies: Redis, Caching, Pub/Sub
Description: Speed up systems with in-memory data. Use Redis for caching, sessions, queues and real-time features.
Topics:
- Redis data structures
- Caching patterns & TTLs
- Cache invalidation strategies
- Pub/Sub & streams
- Rate limiting & leaderboards
- Persistence & eviction policies

### Layer 8 of 10 — id: db-engineer-8
Title: Indexing & Query Optimization
Technologies: Indexes, EXPLAIN, Performance
Description: Make databases fast. Understand indexes deeply and learn to diagnose and fix slow queries.
Topics:
- B-tree, hash, GIN & BRIN indexes
- Composite & partial indexes
- Reading EXPLAIN ANALYZE
- Query planning & statistics
- Avoiding N+1 & full scans
- Connection pooling

### Layer 9 of 10 — id: db-engineer-9
Title: Replication, Sharding & HA
Technologies: Replication, Sharding, Partitioning
Description: Scale databases beyond one machine. Learn replication, partitioning and high-availability patterns.
Topics:
- Primary/replica replication
- Read replicas & load balancing
- Partitioning & sharding
- Failover & high availability
- CAP theorem & consistency models
- Distributed transaction trade-offs

### Layer 10 of 10 — id: db-engineer-10
Title: Backup, Security & Administration
Technologies: Backups, Security, Monitoring
Description: Operate databases responsibly. Master backups, security hardening and monitoring for production.
Topics:
- Backup & point-in-time recovery
- Roles, privileges & row-level security
- Encryption at rest & in transit
- Monitoring & slow query logs
- Migrations in production
- Disaster recovery planning

Start now with Layer 1.
