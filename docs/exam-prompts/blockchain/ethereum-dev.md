You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Ethereum Developer" (ethereum-dev, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ethereum-dev-1
Title: Ethereum and the EVM
Technologies: Ethereum, EVM, Solidity
Description: This layer explains how Ethereum works as a world computer and how the EVM processes transactions. A clear mental model of accounts and state is the basis for all later work.
Topics:
- Accounts and balances
- Transactions and gas
- Blocks and finality
- The EVM state machine
- Wei, gwei, and ether units
- Reading data on Etherscan

### Layer 2 of 10 — id: ethereum-dev-2
Title: Writing Smart Contracts in Solidity
Technologies: Solidity, Remix, EVM
Description: This layer builds core Solidity skills for writing functional contracts. Knowing the language well lets you express on-chain logic safely.
Topics:
- Types and storage
- Functions and visibility
- Events and modifiers
- Inheritance basics
- Error handling
- Contract deployment lifecycle

### Layer 3 of 10 — id: ethereum-dev-3
Title: Connecting Apps with ethers.js
Technologies: ethers.js, JavaScript, JSON-RPC
Description: This layer connects browser and Node applications to Ethereum using ethers.js. Frontend integration turns contracts into usable products.
Topics:
- Providers and signers
- Reading contract state
- Sending transactions
- Listening to events
- Wallet connection flows
- Handling JSON-RPC errors

### Layer 4 of 10 — id: ethereum-dev-4
Title: Running Nodes with Geth
Technologies: Geth, JSON-RPC, Ethereum
Description: This layer covers running an Ethereum execution client using Geth and querying it directly. Operating a node deepens understanding of the network and removes reliance on third parties.
Topics:
- Execution versus consensus clients
- Syncing modes
- The JSON-RPC API
- Managing accounts and keystores
- Running on a testnet
- Monitoring node health

### Layer 5 of 10 — id: ethereum-dev-5
Title: Token Standards and Contract Composition
Technologies: Solidity, OpenZeppelin, ERC20
Description: This layer teaches the major token standards and how contracts call one another. Composability is what makes Ethereum a rich application platform.
Topics:
- ERC20 and ERC721 interfaces
- Approvals and allowances
- Cross-contract calls
- Interfaces and abstract contracts
- Reentrancy awareness
- Using OpenZeppelin base contracts

### Layer 6 of 10 — id: ethereum-dev-6
Title: EVM Deep Dive
Technologies: EVM, Yul, Solidity
Description: This layer dissects how Solidity compiles to bytecode and how the EVM executes opcodes. Low-level knowledge unlocks optimization and debugging skills.
Topics:
- Stack, memory, and storage
- Common opcodes
- Calldata and ABI encoding
- Function selectors
- Delegatecall semantics
- Reading bytecode

### Layer 7 of 10 — id: ethereum-dev-7
Title: Indexing and Off-Chain Data
Technologies: The Graph, ethers.js, GraphQL
Description: This layer shows how to index on-chain events for fast querying using The Graph. Efficient data access is essential for responsive dApps.
Topics:
- Event-driven indexing
- Subgraph manifests
- Mapping handlers
- GraphQL queries
- Pagination and filtering
- Caching strategies

### Layer 8 of 10 — id: ethereum-dev-8
Title: Wallets, Signatures, and Security
Technologies: ethers.js, EIP-712, Solidity
Description: This layer covers cryptographic signatures and secure user interactions. Signature handling enables gasless approvals and meta transactions while avoiding phishing risks.
Topics:
- ECDSA signatures
- EIP-191 and EIP-712 signing
- Permit and gasless approvals
- Nonce management
- Replay protection
- Common wallet attack vectors

### Layer 9 of 10 — id: ethereum-dev-9
Title: Testing and CI for dApps
Technologies: Hardhat, ethers.js, Foundry
Description: This layer establishes automated testing and continuous integration for full stack dApps. Reliable pipelines catch regressions before they reach users.
Topics:
- Unit and integration tests
- Mainnet forking
- Mocking providers
- Fuzz and property testing
- Continuous integration setup
- Coverage reporting

### Layer 10 of 10 — id: ethereum-dev-10
Title: Mainnet Deployment and Operations
Technologies: Geth, Etherscan, ethers.js
Description: This final layer deploys the full dApp to mainnet and keeps it running safely. Operating in production requires monitoring, verification, and incident readiness.
Topics:
- Deployment scripts and secrets
- Contract verification
- Gas and nonce management in production
- Monitoring and alerting
- Upgrade and pause strategies
- Incident response

Start now with Layer 1.
