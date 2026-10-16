You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Blockchain Core Dev" (blockchain-core, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: blockchain-core-1
Title: Distributed Systems Foundations
Technologies: Go, Networking, Cryptography
Description: This layer establishes the distributed systems and cryptography concepts underlying every blockchain. These fundamentals explain why blockchains are structured the way they are.
Topics:
- Hash functions and Merkle trees
- Public key cryptography
- Distributed system models
- Failure and partition tolerance
- Clocks and ordering
- Determinism requirements

### Layer 2 of 10 — id: blockchain-core-2
Title: Building a Minimal Blockchain
Technologies: Go, Cryptography, Hashing
Description: This layer builds a simple blockchain data structure from scratch. Constructing blocks and chains by hand clarifies how state is linked and validated.
Topics:
- Block structure and headers
- Chaining by hash
- Transaction encoding
- Genesis blocks
- Validation rules
- Simple proof of work

### Layer 3 of 10 — id: blockchain-core-3
Title: Rust for Systems Programming
Technologies: Rust, Cargo, Tokio
Description: This layer introduces Rust as a second core language for safe, performant node software. Many modern chains are written in Rust for its memory safety guarantees.
Topics:
- Ownership and lifetimes
- Traits and generics
- Error handling
- Async with Tokio
- Concurrency primitives
- Crate ecosystem

### Layer 4 of 10 — id: blockchain-core-4
Title: Peer-to-Peer Networking
Technologies: P2P, libp2p, Rust
Description: This layer covers how nodes discover and communicate over a peer-to-peer network. Networking is the backbone that propagates blocks and transactions.
Topics:
- Peer discovery
- Gossip protocols
- Message serialization
- Connection management
- NAT traversal
- Using libp2p

### Layer 5 of 10 — id: blockchain-core-5
Title: Consensus Fundamentals
Technologies: Consensus, Rust, Go
Description: This layer explains the consensus problem and classic algorithms for agreement. Consensus is what lets distrusting nodes agree on one history.
Topics:
- Safety and liveness
- Byzantine fault tolerance
- Proof of work
- Proof of stake basics
- Fork choice rules
- Finality concepts

### Layer 6 of 10 — id: blockchain-core-6
Title: Byzantine Fault Tolerant Consensus
Technologies: Consensus, Tendermint, Rust
Description: This layer studies BFT consensus protocols that deliver instant finality. BFT algorithms power many proof of stake chains today.
Topics:
- PBFT and its phases
- Tendermint consensus
- Validator sets and voting power
- View changes
- Quorum certificates
- Slashing conditions

### Layer 7 of 10 — id: blockchain-core-7
Title: State and Storage Engines
Technologies: Rust, Go, Databases
Description: This layer covers how chains persist state efficiently using tries and key-value stores. Storage design directly affects sync speed and node hardware needs.
Topics:
- Account versus UTXO state
- Merkle Patricia tries
- Key-value databases
- State pruning
- Snapshots
- Write-ahead logging

### Layer 8 of 10 — id: blockchain-core-8
Title: Transaction Pool and Execution
Technologies: Rust, Go, Consensus
Description: This layer builds the mempool and the execution pipeline that applies transactions to state. Correct ordering and execution are vital for deterministic results.
Topics:
- Mempool design
- Fee prioritization
- Nonce and replay handling
- Deterministic execution
- Block production
- Gas metering

### Layer 9 of 10 — id: blockchain-core-9
Title: Security and Resilience
Technologies: Consensus, P2P, Cryptography
Description: This layer hardens the node against attacks on consensus and networking. Resilience is what keeps a live network safe under adversarial conditions.
Topics:
- Eclipse and Sybil attacks
- Long-range attacks
- Denial of service mitigation
- Equivocation detection
- Rate limiting peers
- Fuzzing and stress testing

### Layer 10 of 10 — id: blockchain-core-10
Title: Testnet Launch and Operations
Technologies: Go, Rust, Consensus
Description: This final layer launches a multi-node testnet and operates it like a real network. Running a live testnet validates the entire stack end to end.
Topics:
- Genesis configuration
- Validator onboarding
- Telemetry and metrics
- Upgrade coordination
- Chain monitoring
- Incident response

Start now with Layer 1.
