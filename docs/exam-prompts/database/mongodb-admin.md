You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "MongoDB Admin" (mongodb-admin, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: mongodb-admin-1
Title: MongoDB Fundamentals
Technologies: MongoDB, mongosh, BSON, MongoDB Compass
Description: Learn the document model of MongoDB and how it differs from relational databases. Install MongoDB, use mongosh, and perform basic CRUD operations on collections.
Topics:
- Document model and BSON types
- Installing MongoDB
- mongosh basics
- Creating databases and collections
- CRUD operations
- MongoDB Compass GUI

### Layer 2 of 10 — id: mongodb-admin-2
Title: Querying and Aggregation
Technologies: MongoDB, MQL, Aggregation Pipeline, mongosh
Description: Master MongoDB Query Language (MQL) for filtering documents and learn the aggregation pipeline for complex data transformations and analytics.
Topics:
- Query operators ($eq, $in, $gt, etc.)
- Array and embedded document queries
- Aggregation stages ($match, $group, $project)
- Lookup (joins in MongoDB)
- $unwind and $facet
- Aggregation performance

### Layer 3 of 10 — id: mongodb-admin-3
Title: Indexing in MongoDB
Technologies: MongoDB, Indexes, explain(), Atlas Search
Description: Create and manage indexes in MongoDB to improve query performance. Use explain() to analyze query plans and understand when indexes are and are not used.
Topics:
- Single field and compound indexes
- Multikey indexes for arrays
- Text and geospatial indexes
- explain() and winning plan analysis
- Index hints and covered queries
- TTL indexes

### Layer 4 of 10 — id: mongodb-admin-4
Title: Schema Design and Data Modeling
Technologies: MongoDB, Schema Design, Embedding, References
Description: Design MongoDB schemas by choosing between embedding and referencing documents based on access patterns. Apply design patterns like bucket, polymorphic, and outlier.
Topics:
- Embedding vs referencing trade-offs
- One-to-many relationships
- Many-to-many with references
- Bucket pattern
- Polymorphic pattern
- Schema versioning

### Layer 5 of 10 — id: mongodb-admin-5
Title: Backup and Security
Technologies: MongoDB, mongodump, mongorestore, TLS, RBAC
Description: Implement backup and restore procedures using mongodump and mongorestore or Atlas Backup. Secure MongoDB with role-based access control and TLS encryption.
Topics:
- mongodump and mongorestore
- Atlas Backup and snapshots
- RBAC roles and privileges
- Creating custom roles
- TLS/SSL configuration
- Field-level encryption

### Layer 6 of 10 — id: mongodb-admin-6
Title: Replica Sets
Technologies: MongoDB, Replica Set, oplog, Read Preferences
Description: Deploy a MongoDB replica set for high availability and data redundancy. Understand the oplog, election process, and read preference options for distributing load.
Topics:
- Replica set architecture
- Primary election process
- Oplog sizing and monitoring
- Read preferences (primary, secondary, nearest)
- Write concerns
- Replica set maintenance operations

### Layer 7 of 10 — id: mongodb-admin-7
Title: Sharding and Horizontal Scaling
Technologies: MongoDB, Sharding, mongos, Shard Key
Description: Scale MongoDB horizontally by configuring a sharded cluster with config servers and mongos routers. Choose shard keys strategically to avoid hotspots.
Topics:
- Sharded cluster components
- Choosing a shard key
- Hashed vs ranged sharding
- Chunk distribution and balancing
- Tag-aware sharding
- Sharding a live collection

### Layer 8 of 10 — id: mongodb-admin-8
Title: Performance Monitoring and Tuning
Technologies: MongoDB, mongostat, mongotop, Atlas Performance Advisor
Description: Monitor MongoDB performance using built-in tools and Atlas dashboards. Identify slow operations, analyze the profiler output, and tune configuration parameters.
Topics:
- mongostat and mongotop
- Database profiler setup
- currentOp and killOp
- WiredTiger cache tuning
- Connection pool settings
- Atlas Performance Advisor

### Layer 9 of 10 — id: mongodb-admin-9
Title: Transactions and Change Streams
Technologies: MongoDB, Multi-document Transactions, Change Streams, Sessions
Description: Use multi-document ACID transactions for operations that span multiple collections. Leverage change streams to build real-time event-driven applications.
Topics:
- Multi-document transaction syntax
- Session management
- Transaction performance considerations
- Change stream basics
- Resume tokens
- Change streams with aggregation filters

### Layer 10 of 10 — id: mongodb-admin-10
Title: Atlas Operations and Production Readiness
Technologies: MongoDB Atlas, Atlas CLI, Atlas Search, Atlas Data Federation
Description: Operate MongoDB at production scale using Atlas managed service, including cluster tier selection, automated backups, Atlas Search, and global distributed clusters.
Topics:
- Atlas cluster configuration and tiers
- Atlas Backup and restore
- Atlas Search index creation
- Atlas Data Federation
- Global clusters and zone sharding
- Atlas alerts and monitoring

Start now with Layer 1.
