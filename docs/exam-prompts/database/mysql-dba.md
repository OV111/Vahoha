You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "MySQL DBA" (mysql-dba, category database). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: mysql-dba-1
Title: MySQL Fundamentals
Technologies: MySQL, mysql CLI, SQL, MySQL Workbench
Description: Get started with MySQL by installing the server and learning to interact with it via the command-line client and MySQL Workbench. Understand the basic data types and SQL syntax.
Topics:
- Installing MySQL Server
- mysql CLI basics
- Creating databases and tables
- Basic SQL CRUD
- MySQL data types
- Character sets and collations

### Layer 2 of 10 — id: mysql-dba-2
Title: InnoDB Storage Engine
Technologies: MySQL, InnoDB, MVCC, ibdata
Description: Understand the InnoDB storage engine, which provides ACID-compliant transactions and row-level locking. Learn about its internal architecture including buffer pool and redo logs.
Topics:
- InnoDB vs MyISAM
- Buffer pool configuration
- Redo and undo logs
- Clustered indexes
- Foreign key constraints
- InnoDB file structure

### Layer 3 of 10 — id: mysql-dba-3
Title: Indexing and Query Optimization
Technologies: MySQL, EXPLAIN, B-tree indexes, slow_query_log
Description: Learn to create and manage indexes in MySQL and use EXPLAIN to analyze query execution plans. Enable and interpret the slow query log to find problem queries.
Topics:
- B-tree and hash indexes
- Composite indexes and prefix indexes
- EXPLAIN output interpretation
- Covering indexes
- Slow query log setup
- Optimizer hints

### Layer 4 of 10 — id: mysql-dba-4
Title: Backup and Recovery
Technologies: mysqldump, mysqlpump, MySQL Enterprise Backup, binary log
Description: Implement a comprehensive backup strategy using logical and physical backup tools. Practice full and incremental restores including binary log-based point-in-time recovery.
Topics:
- mysqldump usage and options
- mysqlpump for parallel dumps
- Physical backups with xtrabackup
- Binary log basics
- Point-in-time recovery
- Backup scheduling

### Layer 5 of 10 — id: mysql-dba-5
Title: User Management and Security
Technologies: MySQL, GRANT, mysql_secure_installation, SSL
Description: Secure MySQL by configuring user accounts, privileges, and encrypted connections. Understand the privilege system and best practices for least-privilege access.
Topics:
- Creating and managing users
- GRANT and REVOKE
- mysql_secure_installation
- SSL/TLS configuration
- Audit plugin
- Password validation policies

### Layer 6 of 10 — id: mysql-dba-6
Title: MySQL Replication Basics
Technologies: MySQL, Binary Log, GTID, Replication
Description: Configure MySQL asynchronous replication with GTID-based auto-positioning. Understand the binary log format and how replication threads work.
Topics:
- Binary log formats (ROW, STATEMENT, MIXED)
- GTID replication setup
- CHANGE MASTER TO syntax
- Replication monitoring
- Semi-synchronous replication
- Replication filters

### Layer 7 of 10 — id: mysql-dba-7
Title: Performance Schema and Monitoring
Technologies: MySQL, Performance Schema, sys schema, Prometheus
Description: Use the Performance Schema and sys schema to monitor query performance, wait events, and resource usage in real time. Set up external monitoring with Prometheus and mysqld_exporter.
Topics:
- Performance Schema tables
- sys schema views
- Statement digest analysis
- Wait event analysis
- Prometheus mysqld_exporter
- Grafana dashboards

### Layer 8 of 10 — id: mysql-dba-8
Title: MySQL Configuration Tuning
Technologies: MySQL, my.cnf, InnoDB, thread_pool
Description: Tune MySQL configuration for production workloads by adjusting memory, I/O, and connection settings. Understand how to benchmark changes using sysbench.
Topics:
- innodb_buffer_pool_size tuning
- innodb_log_file_size
- max_connections and thread caching
- Query cache deprecation
- File-per-table settings
- sysbench benchmarking

### Layer 9 of 10 — id: mysql-dba-9
Title: Group Replication and InnoDB Cluster
Technologies: MySQL, Group Replication, InnoDB Cluster, MySQL Router
Description: Configure MySQL Group Replication for multi-primary or single-primary fault-tolerant setups. Use MySQL Shell and MySQL Router to build a full InnoDB Cluster.
Topics:
- Group Replication concepts
- Single-primary vs multi-primary mode
- MySQL Shell AdminAPI
- InnoDB Cluster setup
- MySQL Router for load balancing
- Handling member failures

### Layer 10 of 10 — id: mysql-dba-10
Title: Production Operations and Disaster Recovery
Technologies: MySQL, ProxySQL, Orchestrator, MEB
Description: Operate MySQL at production scale using ProxySQL for connection pooling and query routing, and Orchestrator for topology management and automated failover. Implement a full DR plan.
Topics:
- ProxySQL setup and query rules
- Orchestrator topology management
- Automated failover with Orchestrator
- Schema migrations with pt-online-schema-change
- Disaster recovery runbook
- SLA and RPO/RTO planning

Start now with Layer 1.
