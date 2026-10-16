You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Cosmos Developer" (cosmos-dev, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: cosmos-dev-1
Title: Cosmos Ecosystem Fundamentals
Technologies: Cosmos SDK, Tendermint, Go
Description: This layer introduces the Cosmos vision of an internet of blockchains and its core stack. Understanding the ecosystem clarifies why app chains and IBC matter.
Topics:
- The Cosmos vision
- App chains versus shared chains
- The Cosmos SDK and Tendermint
- The ABCI interface
- Accounts and keys
- The Cosmos Hub

### Layer 2 of 10 — id: cosmos-dev-2
Title: Go for Cosmos Development
Technologies: Go, Cosmos SDK, Protobuf
Description: This layer builds the Go skills required to work effectively in the Cosmos SDK. Comfort with Go and protobuf is essential for module development.
Topics:
- Go modules and packages
- Interfaces and structs
- Error handling
- Protocol buffers
- Code generation
- Testing in Go

### Layer 3 of 10 — id: cosmos-dev-3
Title: Cosmos SDK Architecture
Technologies: Cosmos SDK, Tendermint, Go
Description: This layer dissects how a Cosmos application is structured around modules and the baseapp. Knowing the architecture lets you place logic in the right component.
Topics:
- BaseApp and the runtime
- Modules and keepers
- Stores and the state tree
- AnteHandlers
- Begin and end block hooks
- Dependency wiring

### Layer 4 of 10 — id: cosmos-dev-4
Title: Building Custom Modules
Technologies: Cosmos SDK, Go, Protobuf
Description: This layer builds a custom SDK module with messages, state, and queries. Custom modules are where your application's unique logic lives.
Topics:
- Defining messages
- Keeper logic and state
- Message handlers
- Query services
- Genesis import and export
- Module parameters

### Layer 5 of 10 — id: cosmos-dev-5
Title: Tokens, Staking, and Governance
Technologies: Cosmos SDK, Tendermint, Go
Description: This layer integrates the standard bank, staking, and governance modules. These modules provide the economic backbone of any Cosmos chain.
Topics:
- The bank module
- Staking and delegation
- Distribution and rewards
- On-chain governance
- Slashing
- Module account permissions

### Layer 6 of 10 — id: cosmos-dev-6
Title: Inter-Blockchain Communication
Technologies: IBC, Cosmos SDK, Go
Description: This layer connects your chain to others using the IBC protocol. IBC is the defining feature that lets Cosmos chains exchange value and data.
Topics:
- IBC architecture
- Light clients
- Connections and channels
- Packet lifecycle
- Fungible token transfers
- Running a relayer

### Layer 7 of 10 — id: cosmos-dev-7
Title: CosmWasm Smart Contracts
Technologies: CosmWasm, Rust, Cosmos SDK
Description: This layer adds WebAssembly smart contracts to a Cosmos chain using CosmWasm. CosmWasm enables flexible contract logic without forking the chain.
Topics:
- The CosmWasm module
- Contract structure in Rust
- Instantiate, execute, and query
- Contract storage
- Inter-contract calls
- Uploading and instantiating

### Layer 8 of 10 — id: cosmos-dev-8
Title: Clients, Tooling, and Frontends
Technologies: CosmJS, Cosmos SDK, TypeScript
Description: This layer connects frontends and services to a Cosmos chain using CosmJS. Client tooling turns your chain into a usable application.
Topics:
- Connecting with CosmJS
- Signing and broadcasting
- Wallet integration with Keplr
- Querying state
- Building a frontend
- Indexing events

### Layer 9 of 10 — id: cosmos-dev-9
Title: Testing and Upgrades
Technologies: Cosmos SDK, Go, Tendermint
Description: This layer establishes testing and in-place upgrade workflows for a chain. Reliable upgrades let a live chain evolve without halting.
Topics:
- Unit and integration tests
- Simulation testing
- Upgrade modules
- Migration handlers
- Coordinated upgrade governance
- Testnet rehearsals

### Layer 10 of 10 — id: cosmos-dev-10
Title: Mainnet Launch and Operations
Technologies: Cosmos SDK, Tendermint, Go
Description: This final layer launches a Cosmos chain to production and operates it reliably. A successful launch requires validator coordination and strong monitoring.
Topics:
- Genesis ceremony
- Validator onboarding
- Relayer operations
- Monitoring and telemetry
- Coordinated upgrades
- Incident response

Start now with Layer 1.
