You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "PostgreSQL DBA" (postgres-dba, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: postgres-dba-1
Title: PostgreSQL Fundamentals
Technologies: PostgreSQL, psql, SQL, pgAdmin
Description: Learn the core concepts of relational databases using PostgreSQL as the engine. Understand how to install, configure, and interact with a PostgreSQL server.
Topics:
- Installing PostgreSQL
- psql CLI basics
- Creating databases and users
- Basic SQL CRUD
- Data types in PostgreSQL
- Schema and table design

### Layer 2 of 10 — id: postgres-dba-2
Title: SQL Querying and Joins
Technologies: PostgreSQL, SQL, psql, pgAdmin
Description: Master advanced SQL queries including joins, subqueries, aggregations, and window functions. Practice writing efficient queries against multi-table schemas.
Topics:
- INNER, LEFT, RIGHT, FULL joins
- Subqueries and CTEs
- GROUP BY and HAVING
- Window functions
- EXPLAIN and query plans
- Indexes basics

### Layer 3 of 10 — id: postgres-dba-3
Title: Indexing and Query Optimization
Technologies: PostgreSQL, EXPLAIN ANALYZE, B-tree, GIN
Description: Understand how PostgreSQL uses indexes to speed up queries and learn when and how to create the right index type. Analyze query plans to identify bottlenecks.
Topics:
- B-tree, Hash, GIN, GiST indexes
- EXPLAIN and EXPLAIN ANALYZE
- Index selectivity
- Partial and expression indexes
- Vacuum and autovacuum
- Table statistics

### Layer 4 of 10 — id: postgres-dba-4
Title: Transactions, Locking, and Concurrency
Technologies: PostgreSQL, MVCC, SERIALIZABLE, pg_locks
Description: Learn how PostgreSQL handles concurrent access through MVCC and locking mechanisms. Understand isolation levels and how to prevent deadlocks.
Topics:
- ACID properties
- Transaction isolation levels
- MVCC internals
- Row-level and table-level locks
- Deadlock detection
- Advisory locks

### Layer 5 of 10 — id: postgres-dba-5
Title: Backup, Restore, and PITR
Technologies: pg_dump, pg_restore, pg_basebackup, WAL
Description: Learn backup strategies for PostgreSQL including logical and physical backups and point-in-time recovery. Practice restore procedures to verify backup integrity.
Topics:
- pg_dump and pg_dumpall
- pg_restore
- pg_basebackup
- WAL archiving
- Point-in-time recovery (PITR)
- Backup scheduling and retention

### Layer 6 of 10 — id: postgres-dba-6
Title: Replication Fundamentals
Technologies: PostgreSQL, Streaming Replication, WAL, pg_hba.conf
Description: Configure streaming replication between a primary and one or more standby servers. Understand synchronous vs asynchronous replication trade-offs.
Topics:
- Streaming replication setup
- Synchronous vs asynchronous replication
- Replication slots
- Hot standby
- Replication monitoring
- Failover basics

### Layer 7 of 10 — id: postgres-dba-7
Title: PostgreSQL Security and Access Control
Technologies: PostgreSQL, pg_hba.conf, GRANT, SSL
Description: Implement security best practices including role-based access control, SSL encryption, and network-level restrictions. Audit access and privilege assignments.
Topics:
- Roles and privileges
- pg_hba.conf configuration
- SSL/TLS setup
- Row-level security
- Audit logging
- Password policies

### Layer 8 of 10 — id: postgres-dba-8
Title: Performance Tuning and Configuration
Technologies: PostgreSQL, postgresql.conf, pg_stat_statements, pgBadger
Description: Tune PostgreSQL configuration parameters for memory, connections, and I/O to maximize performance for a specific workload. Use pg_stat_statements to identify slow queries.
Topics:
- shared_buffers, work_mem, wal_buffers
- Connection pooling with PgBouncer
- pg_stat_statements setup
- Checkpoint tuning
- Parallel query settings
- Log analysis with pgBadger

### Layer 9 of 10 — id: postgres-dba-9
Title: Logical Replication, Partitioning, and Extensions
Technologies: PostgreSQL, Logical Replication, Table Partitioning, PostGIS
Description: Use logical replication for cross-version migrations and selective table replication. Implement table partitioning for large datasets and explore useful extensions.
Topics:
- Logical replication publication and subscription
- Range, list, and hash partitioning
- Partition pruning
- pg_partman
- PostGIS basics
- pg_cron and other extensions

### Layer 10 of 10 — id: postgres-dba-10
Title: High Availability, Patroni, and Production Operations
Technologies: Patroni, etcd, HAProxy, pgBackRest
Description: Deploy a production-grade highly available PostgreSQL cluster using Patroni for automatic failover and etcd for consensus. Implement automated backup with pgBackRest.
Topics:
- Patroni architecture and setup
- etcd cluster configuration
- Automatic failover
- HAProxy for load balancing
- pgBackRest for backup and PITR
- Monitoring with Prometheus and Grafana

Start now with Layer 1.
