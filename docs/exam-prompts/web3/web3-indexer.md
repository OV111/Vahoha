You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Web3 Data / Indexer" (web3-indexer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: web3-indexer-1
Title: Web, Blockchain, and Data Fundamentals
Technologies: JavaScript, GraphQL, Ethereum, Events
Description: Understand why blockchain data requires specialized indexing and how smart contract events serve as structured data emission. Learn the basics of GraphQL as a query language.
Topics:
- Why on-chain data needs indexing
- Smart contract events and logs
- Log topics and data encoding
- GraphQL vs REST for blockchain data
- The Graph protocol overview
- Centralized vs decentralized indexing

### Layer 2 of 10 — id: web3-indexer-2
Title: GraphQL Schema Design for Blockchain Data
Technologies: GraphQL, The Graph, Schema, Entities
Description: Design well-structured GraphQL schemas for on-chain data with proper entity relationships, indexed fields, and derived fields. Learn schema best practices for The Graph.
Topics:
- GraphQL type definitions and scalars
- Entity relationships with @derivedFrom
- BigInt and Bytes types in The Graph
- Indexed vs non-indexed query fields
- Interface and union types
- Schema versioning patterns

### Layer 3 of 10 — id: web3-indexer-3
Title: Building Your First Subgraph
Technologies: The Graph CLI, AssemblyScript, YAML, IPFS
Description: Create a subgraph from scratch using the Graph CLI, write AssemblyScript event handlers, and deploy to Subgraph Studio for testing. Index a simple ERC-20 or NFT contract.
Topics:
- graph init and project scaffold
- subgraph.yaml manifest configuration
- Writing handlers in AssemblyScript
- Entity store operations - save, load, remove
- Deploying to Subgraph Studio
- Using Graph Explorer for queries

### Layer 4 of 10 — id: web3-indexer-4
Title: Advanced Subgraph Patterns
Technologies: The Graph, AssemblyScript, Call handlers, Block handlers
Description: Go beyond event handlers with call handlers, block handlers, and data source templates for factory contracts. Handle complex protocols with dynamic contract tracking.
Topics:
- Call handlers for non-event contract calls
- Block handlers for per-block aggregation
- Data source templates for factory contracts
- Dynamic data source instantiation
- Aggregating time-series data
- Handling contract upgrades in subgraphs

### Layer 5 of 10 — id: web3-indexer-5
Title: Ponder - TypeScript-Native Indexing
Technologies: Ponder, TypeScript, Viem, SQLite
Description: Use Ponder as a modern TypeScript-first alternative to The Graph for local and self-hosted indexing. Write type-safe event handlers with hot reload and a built-in GraphQL API.
Topics:
- Ponder project setup and config
- Writing event handlers in TypeScript
- Schema definition with Ponder schema
- Local development with hot reload
- ponder.schema.ts entity types
- Querying the built-in GraphQL API

### Layer 6 of 10 — id: web3-indexer-6
Title: Querying and Optimizing GraphQL APIs
Technologies: GraphQL, Apollo Client, The Graph, Query optimization
Description: Write efficient GraphQL queries for large on-chain datasets with pagination, filtering, and ordering. Understand query complexity limits and caching strategies.
Topics:
- Pagination with first, skip, and cursor
- Filtering with where clauses
- Sorting with orderBy and orderDirection
- Query complexity and depth limits
- Client-side caching with Apollo
- Combining multiple subgraph queries

### Layer 7 of 10 — id: web3-indexer-7
Title: Real-Time Data - Subscriptions and WebSockets
Technologies: GraphQL Subscriptions, The Graph, WebSockets, React
Description: Add real-time on-chain data to your frontend using GraphQL subscriptions and WebSocket providers. Subscribe to new events and update the UI instantly.
Topics:
- GraphQL subscription syntax
- WebSocket transport for subscriptions
- The Graph subscription support
- Combining subscriptions with initial query
- Event-driven UI updates in React
- Polling as a fallback for subscription-limited APIs

### Layer 8 of 10 — id: web3-indexer-8
Title: Multi-Chain Indexing
Technologies: The Graph, Ponder, Arbitrum, Polygon
Description: Extend your indexing infrastructure to cover multiple EVM-compatible chains with chain-specific subgraphs and a unified query layer. Handle cross-chain data aggregation.
Topics:
- Deploying subgraphs to multiple networks
- Chain ID filtering in schema and queries
- Cross-chain entity aggregation patterns
- Separate vs unified subgraph for multi-chain
- Network-specific RPC configuration
- Handling chain reorganizations per network

### Layer 9 of 10 — id: web3-indexer-9
Title: Subgraph Testing and Performance
Technologies: Matchstick, The Graph, AssemblyScript, Load testing
Description: Write unit tests for subgraph handlers using Matchstick, profile slow queries, and optimize entity updates that touch hot code paths in high-volume protocols.
Topics:
- Matchstick test framework setup
- Mocking events and contract calls in tests
- Asserting entity field values in Matchstick
- Query latency profiling
- Reducing entity saves in hot handlers
- Derived field vs stored field tradeoffs

### Layer 10 of 10 — id: web3-indexer-10
Title: Production Deployment on The Graph Network
Technologies: The Graph Network, GRT, Subgraph Studio, Monitoring
Description: Publish your subgraph to The Graph decentralized network, add GRT signal to attract indexers, and set up monitoring and alerts for sync status and query errors.
Topics:
- Publishing to The Graph Network vs hosted service
- GRT curation signal mechanics
- Indexer selection and query routing
- Subgraph versioning and migration
- Monitoring sync status and indexing errors
- Query fee estimation and billing

Start now with Layer 1.
