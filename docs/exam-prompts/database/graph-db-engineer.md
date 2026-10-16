You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Graph DB Engineer" (graph-db-engineer, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: graph-db-engineer-1
Title: Graph Database Fundamentals
Technologies: Neo4j, Cypher, Nodes, Relationships
Description: Learn the property graph model used by Neo4j, including nodes, relationships, labels, and properties. Understand why graph databases excel for connected data.
Topics:
- Property graph model
- Nodes and relationships
- Labels and properties
- When to use a graph database
- Neo4j installation
- Neo4j Browser basics

### Layer 2 of 10 — id: graph-db-engineer-2
Title: Cypher Query Language
Technologies: Neo4j, Cypher, MATCH, WITH
Description: Master the Cypher query language for reading and writing graph data. Learn pattern matching, filtering, aggregation, and path queries.
Topics:
- MATCH and WHERE clauses
- CREATE and MERGE
- Pattern variables and relationships
- WITH for query chaining
- Aggregation (count, collect, sum)
- OPTIONAL MATCH

### Layer 3 of 10 — id: graph-db-engineer-3
Title: Graph Data Modeling
Technologies: Neo4j, Graph Models, Labeled Property Graph, Intermediate Nodes
Description: Design effective graph data models by thinking in terms of entities, relationships, and the queries you need to support. Apply common graph modeling patterns.
Topics:
- Modeling entities as nodes
- Modeling facts as relationships
- Intermediate nodes for relationship properties
- Bidirectional vs directional relationships
- Avoiding super-nodes
- Graph model refactoring

### Layer 4 of 10 — id: graph-db-engineer-4
Title: Indexes and Query Optimization
Technologies: Neo4j, Indexes, EXPLAIN, PROFILE
Description: Create indexes on node properties to speed up lookups and use EXPLAIN and PROFILE to analyze and optimize Cypher query execution plans.
Topics:
- Range and text indexes
- Full-text indexes
- Composite indexes
- EXPLAIN plan analysis
- PROFILE for actual row counts
- Index hints
- Eager vs lazy operators

### Layer 5 of 10 — id: graph-db-engineer-5
Title: Graph Algorithms
Technologies: Neo4j, Graph Data Science Library, PageRank, Community Detection
Description: Use the Neo4j Graph Data Science (GDS) library to run graph algorithms for analytics including centrality, community detection, and path finding.
Topics:
- GDS library setup
- PageRank for node importance
- Betweenness centrality
- Louvain community detection
- Shortest path (Dijkstra, A*)
- Similarity algorithms

### Layer 6 of 10 — id: graph-db-engineer-6
Title: Neo4j Security and Access Control
Technologies: Neo4j, RBAC, Database Privileges, TLS
Description: Secure Neo4j with role-based access control, fine-grained database privileges, and TLS encryption. Manage users and roles using Cypher administration commands.
Topics:
- Creating roles and users
- Granting database privileges
- Fine-grained property-level privileges
- Sub-graph access control
- TLS configuration for Neo4j
- Audit logging

### Layer 7 of 10 — id: graph-db-engineer-7
Title: Neo4j Causal Clustering
Technologies: Neo4j, Causal Cluster, Raft, Read Replicas
Description: Deploy Neo4j in a causal cluster configuration for high availability and horizontal read scaling. Understand Raft consensus, bookmarks, and read replica usage.
Topics:
- Causal cluster architecture
- Core members and Raft consensus
- Read replicas for read scaling
- Bookmarks for causal consistency
- Routing policies
- Cluster monitoring

### Layer 8 of 10 — id: graph-db-engineer-8
Title: GQL and Graph Query Standards
Technologies: GQL, ISO GQL, Cypher, openCypher
Description: Learn the ISO GQL standard and how it relates to Cypher. Understand openCypher compatibility and how graph query languages are converging across vendors.
Topics:
- GQL ISO standard overview
- GQL vs Cypher syntax differences
- MATCH and RETURN in GQL
- Graph pattern expressions
- openCypher specification
- Multi-graph queries in GQL

### Layer 9 of 10 — id: graph-db-engineer-9
Title: Graph Applications and Use Cases
Technologies: Neo4j, Cypher, GDS, Python Driver
Description: Build real-world graph applications for fraud detection, knowledge graphs, and recommendation engines. Integrate Neo4j with Python using the official driver.
Topics:
- Fraud ring detection patterns
- Knowledge graph construction
- Collaborative filtering recommendations
- Neo4j Python driver
- Graph-backed REST API
- Entity resolution in graphs

### Layer 10 of 10 — id: graph-db-engineer-10
Title: Production Operations and Performance at Scale
Technologies: Neo4j, Kubernetes, Prometheus, neo4j-admin
Description: Operate Neo4j at production scale on Kubernetes, implement backup and restore with neo4j-admin, and monitor the cluster with Prometheus and Grafana.
Topics:
- Neo4j Helm chart deployment
- neo4j-admin backup and restore
- Prometheus neo4j metrics exporter
- Grafana dashboards for Neo4j
- Hot backups without downtime
- Tuning page cache and heap

Start now with Layer 1.
