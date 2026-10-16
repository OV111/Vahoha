You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Game Backend Dev" (game-backend, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: game-backend-1
Title: Node.js and Server Basics
Technologies: Node.js, JavaScript, Express
Description: This layer establishes Node.js and HTTP server fundamentals for game services. Backend basics are the foundation for all online game features.
Topics:
- Node.js runtime and modules
- HTTP and REST
- Express routing
- JSON request handling
- Environment configuration
- Async and promises

### Layer 2 of 10 — id: game-backend-2
Title: Real-Time with WebSockets
Technologies: WebSockets, Node.js, Socket.io
Description: This layer covers real-time bidirectional communication using WebSockets. Real-time messaging is essential for multiplayer game backends.
Topics:
- WebSocket protocol
- Socket.io rooms
- Broadcasting events
- Connection lifecycle
- Message serialization
- Heartbeats and reconnection

### Layer 3 of 10 — id: game-backend-3
Title: Authentication and Accounts
Technologies: Node.js, JWT, OAuth
Description: This layer teaches secure player authentication and account management. Trustworthy auth protects player identity and progress.
Topics:
- Password hashing
- JWT tokens
- OAuth and social login
- Sessions and refresh tokens
- Account linking
- Rate limiting

### Layer 4 of 10 — id: game-backend-4
Title: Databases and Persistence
Technologies: PostgreSQL, MongoDB, Node.js
Description: This layer covers storing player data in SQL and NoSQL databases. Reliable persistence keeps progress and game state safe.
Topics:
- Relational versus document stores
- Schema design for games
- CRUD operations
- Indexes and queries
- Transactions
- Migrations

### Layer 5 of 10 — id: game-backend-5
Title: Caching with Redis
Technologies: Redis, Node.js, Caching
Description: This layer introduces Redis for caching, sessions, and fast shared state. In memory data stores power leaderboards and matchmaking speed.
Topics:
- Redis data structures
- Caching strategies
- Sorted sets for leaderboards
- Pub sub messaging
- Session storage
- Expiry and eviction

### Layer 6 of 10 — id: game-backend-6
Title: Game State and Authority
Technologies: Node.js, WebSockets, Redis
Description: This layer covers authoritative server state and synchronization. Server authority prevents cheating and keeps players in sync.
Topics:
- Authoritative game loop
- State synchronization
- Tick rate and updates
- Input validation
- Lag compensation
- Snapshot and delta updates

### Layer 7 of 10 — id: game-backend-7
Title: Matchmaking and Lobbies
Technologies: Node.js, Redis, WebSockets
Description: This layer teaches building matchmaking, lobbies, and party systems. Matchmaking pairs players fairly and forms the social layer.
Topics:
- Matchmaking queues
- Skill based matching
- Party and lobby systems
- Server allocation
- Region and latency
- Match lifecycle

### Layer 8 of 10 — id: game-backend-8
Title: Managed Services with PlayFab
Technologies: PlayFab, Node.js, Azure
Description: This layer covers managed backend platforms like PlayFab for live games. Managed services accelerate features like economy and analytics.
Topics:
- PlayFab player accounts
- Virtual economy and items
- Cloud script functions
- Leaderboards and stats
- Live events
- Player data storage

### Layer 9 of 10 — id: game-backend-9
Title: Scaling and Infrastructure
Technologies: Docker, Kubernetes, Node.js
Description: This layer covers containerization, load balancing, and horizontal scaling. Scalable infrastructure keeps a game online under heavy load.
Topics:
- Containerizing with Docker
- Load balancing
- Horizontal scaling
- Game server orchestration
- Stateless versus stateful
- Health checks and autoscaling

### Layer 10 of 10 — id: game-backend-10
Title: Security, Monitoring, and Launch
Technologies: Node.js, Prometheus, Grafana
Description: This layer focuses on hardening, monitoring, and launching the backend. Observability and security are what keep a live service healthy.
Topics:
- Anti cheat and validation
- DDoS and rate limiting
- Logging and metrics
- Dashboards and alerts
- Backups and recovery
- Deployment pipelines

Start now with Layer 1.
