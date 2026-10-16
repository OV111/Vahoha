You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Chain Architect" (chain-architect, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: chain-architect-1
Title: Application-Specific Blockchain Concepts
Technologies: Cosmos SDK, Substrate, Consensus
Description: This layer introduces the idea of purpose-built blockchains and the major frameworks for building them. Understanding the design space guides every architectural decision.
Topics:
- Monolithic versus modular chains
- Application-specific chains
- Framework comparison
- Sovereignty and shared security
- State machine replication
- Token and governance design

### Layer 2 of 10 — id: chain-architect-2
Title: Consensus and Tendermint
Technologies: Tendermint, Consensus, BFT
Description: This layer studies the Tendermint BFT engine that drives many app chains. Consensus choice determines finality, throughput, and security properties.
Topics:
- BFT consensus phases
- Validators and voting power
- Block finality
- The ABCI interface
- Fork accountability
- Slashing and incentives

### Layer 3 of 10 — id: chain-architect-3
Title: Building Modules with Cosmos SDK
Technologies: Cosmos SDK, Go, Tendermint
Description: This layer builds custom state machine modules using the Cosmos SDK. Modules are where application logic lives in a Cosmos chain.
Topics:
- SDK module structure
- Keepers and state
- Messages and handlers
- Queries and gRPC
- Genesis and parameters
- Wiring an app

### Layer 4 of 10 — id: chain-architect-4
Title: Building Pallets with Substrate
Technologies: Substrate, Rust, FRAME
Description: This layer builds runtime logic using Substrate and the FRAME framework in Rust. Substrate offers a different, upgrade-friendly approach to chain design.
Topics:
- FRAME runtime model
- Writing a pallet
- Storage items and extrinsics
- Events and errors
- Runtime composition
- Forkless upgrades

### Layer 5 of 10 — id: chain-architect-5
Title: Tokenomics and Governance Design
Technologies: Cosmos SDK, Consensus, Governance
Description: This layer designs the economic and governance systems of a chain. Incentives and on-chain governance shape long-term security and decentralization.
Topics:
- Staking and inflation
- Validator economics
- On-chain governance
- Parameter changes
- Treasury and funding
- Delegation and rewards

### Layer 6 of 10 — id: chain-architect-6
Title: Cross-Chain Communication
Technologies: IBC, Cosmos SDK, Substrate
Description: This layer enables chains to talk to each other through interoperability protocols. Cross-chain messaging unlocks shared liquidity and composability across ecosystems.
Topics:
- The IBC protocol
- Light clients and proofs
- Channels and packets
- Token transfers across chains
- Cross-consensus messaging
- Relayers

### Layer 7 of 10 — id: chain-architect-7
Title: Modular Architecture and Data Availability
Technologies: Consensus, Cosmos SDK, Rollups
Description: This layer explores separating execution, settlement, and data availability into distinct layers. Modular designs improve scalability and let teams specialize.
Topics:
- Execution and settlement separation
- Data availability layers
- Sovereign rollups
- Shared security models
- Sequencing
- Trade-offs of modularity

### Layer 8 of 10 — id: chain-architect-8
Title: Performance and Scalability
Technologies: Consensus, Go, Rust
Description: This layer tunes the chain for higher throughput and lower latency. Performance engineering is essential for chains expecting real usage.
Topics:
- Block size and time tuning
- Mempool optimization
- Parallel execution
- State growth management
- Benchmarking
- Validator hardware requirements

### Layer 9 of 10 — id: chain-architect-9
Title: Security and Validator Operations
Technologies: Consensus, Tendermint, Cosmos SDK
Description: This layer secures the chain and defines safe validator operations. Operational security protects the network from downtime and slashing.
Topics:
- Key management and sentries
- Double-sign protection
- Slashing parameters
- DDoS mitigation
- Monitoring validators
- Disaster recovery

### Layer 10 of 10 — id: chain-architect-10
Title: Mainnet Launch and Upgrades
Technologies: Cosmos SDK, Tendermint, Governance
Description: This final layer coordinates a mainnet launch and ongoing chain upgrades. Launching a sovereign chain demands careful planning and community coordination.
Topics:
- Genesis ceremony
- Validator onboarding
- Coordinated upgrades
- Governance-driven changes
- Network monitoring
- Incident response

Start now with Layer 1.
