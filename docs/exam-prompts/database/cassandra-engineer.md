You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cassandra Engineer" (cassandra-engineer, category database). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cassandra-engineer-1
Title: Cassandra Architecture Fundamentals
Technologies: Cassandra, CQL, nodetool, cqlsh
Description: Learn Cassandra's peer-to-peer distributed architecture and how it achieves high availability without a single point of failure. Install a local cluster and use cqlsh for basic operations.
Topics:
- Peer-to-peer ring architecture
- Consistent hashing and tokens
- Gossip protocol
- Installing Cassandra
- cqlsh basics
- nodetool status

### Layer 2 of 10 — id: cassandra-engineer-2
Title: CQL and Data Types
Technologies: Cassandra, CQL, UDT, Collections
Description: Learn the Cassandra Query Language in depth including all data types, collection types, user-defined types, and counter tables.
Topics:
- CQL data types (text, uuid, timeuuid, etc.)
- List, set, and map collections
- User-defined types (UDT)
- Counter tables
- Static columns
- BLOB and large data handling

### Layer 3 of 10 — id: cassandra-engineer-3
Title: Data Modeling in Cassandra
Technologies: Cassandra, Partition Key, Clustering Columns, Denormalization
Description: Master Cassandra's query-first data modeling approach by designing partition keys and clustering columns around application access patterns. Embrace denormalization.
Topics:
- Query-first design process
- Partition key selection
- Clustering column ordering
- Wide-row patterns
- Denormalization and data duplication
- Avoiding hot partitions

### Layer 4 of 10 — id: cassandra-engineer-4
Title: Replication and Consistency
Technologies: Cassandra, Replication Factor, Consistency Levels, NetworkTopologyStrategy
Description: Configure replication strategies and consistency levels to balance between availability and consistency. Understand how quorum reads and writes provide tunable guarantees.
Topics:
- SimpleStrategy vs NetworkTopologyStrategy
- Replication factor configuration
- Consistency levels (ONE, QUORUM, ALL)
- Read repair
- Hinted handoff
- Lightweight transactions (LWT)

### Layer 5 of 10 — id: cassandra-engineer-5
Title: Operations and Maintenance
Technologies: Cassandra, nodetool, Compaction, Repair
Description: Perform routine Cassandra cluster operations including compaction, repair, and node replacement. Understand how to add and decommission nodes safely.
Topics:
- Compaction strategies (STCS, LCS, TWCS)
- nodetool repair
- Adding nodes to a cluster
- Decommissioning nodes
- Snapshot and backup
- Bootstrap and replace operations

### Layer 6 of 10 — id: cassandra-engineer-6
Title: Performance Tuning
Technologies: Cassandra, JVM Tuning, cassandra-stress, Tracing
Description: Tune Cassandra performance by optimizing JVM settings, compaction strategies, and caching. Use cassandra-stress and query tracing to identify and fix bottlenecks.
Topics:
- JVM heap and GC tuning
- Row and key cache configuration
- Compaction strategy selection
- cassandra-stress benchmarking
- Query tracing with TRACING ON
- Thread pool tuning

### Layer 7 of 10 — id: cassandra-engineer-7
Title: Security in Cassandra
Technologies: Cassandra, Authentication, Authorization, SSL/TLS
Description: Secure Cassandra clusters with authentication, role-based authorization, and encrypted inter-node and client-node communications using TLS.
Topics:
- Enabling authentication in Cassandra
- Role-based access control
- Object permissions (GRANT/REVOKE)
- Client-to-node TLS
- Node-to-node TLS
- Audit logging

### Layer 8 of 10 — id: cassandra-engineer-8
Title: Monitoring and Observability
Technologies: Cassandra, JMX, Prometheus, Grafana
Description: Monitor Cassandra clusters using JMX metrics exposed to Prometheus via the JMX exporter. Build Grafana dashboards for key Cassandra health indicators.
Topics:
- Cassandra JMX metrics overview
- Prometheus JMX exporter setup
- Key metrics (read/write latency, compaction, GC)
- Grafana dashboard for Cassandra
- Alerting on tombstone count and GC pause
- nodetool tpstats and cfstats

### Layer 9 of 10 — id: cassandra-engineer-9
Title: Multi-datacenter and Global Deployments
Technologies: Cassandra, NetworkTopologyStrategy, Multi-DC, Latency-aware routing
Description: Deploy Cassandra across multiple datacenters for geographic distribution and disaster recovery. Configure local consistency levels and latency-aware routing in drivers.
Topics:
- Multi-datacenter replication topology
- LOCAL_QUORUM and LOCAL_ONE consistency
- Rack and datacenter awareness
- Driver-level DC routing
- Cross-DC repair strategy
- Active-active multi-region patterns

### Layer 10 of 10 — id: cassandra-engineer-10
Title: Production Operations and Disaster Recovery
Technologies: Cassandra, Medusa, K8ssandra, Chaos Engineering
Description: Run Cassandra in production on Kubernetes using K8ssandra, automate backups with Medusa, and validate resilience through chaos engineering experiments.
Topics:
- K8ssandra operator deployment
- Medusa backup and restore
- Cassandra on Kubernetes storage
- Chaos testing with Chaos Toolkit
- DR runbook creation
- Token-aware driver configuration

Start now with Layer 1.
