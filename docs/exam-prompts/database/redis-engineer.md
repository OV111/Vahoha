You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Redis Engineer" (redis-engineer, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: redis-engineer-1
Title: Redis Fundamentals
Technologies: Redis, redis-cli, Strings, Key Expiry
Description: Install Redis and learn the basics of interacting with it using redis-cli. Understand the key-value model, TTL-based expiration, and the most common data types.
Topics:
- Installing Redis
- redis-cli basics
- String get/set operations
- Key expiration with TTL
- Key naming conventions
- INFO command overview

### Layer 2 of 10 — id: redis-engineer-2
Title: Redis Data Structures
Technologies: Redis, Lists, Sets, Hashes, Sorted Sets
Description: Master all major Redis data structures and understand the use cases each is best suited for. Practice building real-world patterns with lists, sets, hashes, and sorted sets.
Topics:
- Lists as queues and stacks
- Sets for unique membership
- Hashes for objects
- Sorted sets for rankings
- Bitmaps and HyperLogLog
- Geospatial commands

### Layer 3 of 10 — id: redis-engineer-3
Title: Caching Patterns
Technologies: Redis, Cache-aside, Write-through, Cache Invalidation
Description: Implement common caching patterns using Redis to reduce database load and improve application latency. Understand cache invalidation strategies and cache stampede prevention.
Topics:
- Cache-aside pattern
- Write-through caching
- Write-behind caching
- Cache invalidation strategies
- Cache stampede and solutions
- Cache warming

### Layer 4 of 10 — id: redis-engineer-4
Title: Redis Persistence
Technologies: Redis, RDB, AOF, BGSAVE
Description: Understand and configure Redis persistence options including RDB snapshots and Append-Only File. Choose the right persistence mode based on durability requirements.
Topics:
- RDB snapshot configuration
- AOF persistence and fsync policies
- RDB vs AOF trade-offs
- Mixed persistence mode
- BGSAVE and BGREWRITEAOF
- Persistence and performance impact

### Layer 5 of 10 — id: redis-engineer-5
Title: Pub/Sub and Redis Streams
Technologies: Redis, Pub/Sub, Redis Streams, Consumer Groups
Description: Build real-time messaging and event processing systems using Redis Pub/Sub and Redis Streams. Use consumer groups for reliable at-least-once message processing.
Topics:
- Pub/Sub publish and subscribe
- Pub/Sub limitations
- Redis Streams XADD and XREAD
- Consumer groups with XREADGROUP
- Stream trimming
- Pending message acknowledgment

### Layer 6 of 10 — id: redis-engineer-6
Title: Redis Security and Access Control
Technologies: Redis, ACL, TLS, AUTH
Description: Secure Redis with ACL-based user management, TLS for encrypted connections, and network-level restrictions. Audit Redis access and apply least-privilege principles.
Topics:
- Redis ACL user creation
- ACL command and key permissions
- TLS configuration
- Protected mode
- requirepass vs ACLs
- Audit logging

### Layer 7 of 10 — id: redis-engineer-7
Title: Redis Replication and Sentinel
Technologies: Redis, Replication, Redis Sentinel, Failover
Description: Configure Redis replication for data redundancy and set up Redis Sentinel for automatic failover and service discovery. Monitor replication health.
Topics:
- Redis primary-replica replication
- Replication configuration
- Redis Sentinel setup
- Sentinel quorum
- Automatic failover process
- Connecting clients through Sentinel

### Layer 8 of 10 — id: redis-engineer-8
Title: Redis Cluster
Technologies: Redis Cluster, Hash Slots, Cluster Bus, MOVED redirect
Description: Deploy and manage a Redis Cluster for horizontal scaling across multiple nodes. Understand hash slot distribution, resharding, and how clients interact with cluster topology.
Topics:
- Hash slot assignment
- Cluster setup with redis-cli
- Resharding and rebalancing
- MOVED and ASK redirects
- Cluster bus protocol
- Node failure and failover

### Layer 9 of 10 — id: redis-engineer-9
Title: Redis Modules and Advanced Features
Technologies: RedisSearch, RedisJSON, RedisTimeSeries, Lua
Description: Extend Redis functionality using official modules for full-text search, JSON storage, time-series data, and probabilistic data structures. Write Lua scripts for atomic operations.
Topics:
- RedisJSON document storage
- RedisSearch full-text indexing
- RedisTimeSeries for metrics
- Lua scripting for atomicity
- Bloom filter module
- EVAL and EVALSHA

### Layer 10 of 10 — id: redis-engineer-10
Title: Production Redis Operations
Technologies: Redis, Prometheus, Grafana, redis-benchmark
Description: Operate Redis in production by tuning memory, eviction policies, and connection settings. Monitor with Prometheus and run capacity planning using redis-benchmark.
Topics:
- maxmemory and eviction policies
- Memory optimization with object encoding
- Connection pooling best practices
- Prometheus redis_exporter
- Latency monitoring and latency history
- redis-benchmark for capacity planning

Start now with Layer 1.
