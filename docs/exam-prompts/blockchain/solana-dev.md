You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Solana Developer" (solana-dev, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: solana-dev-1
Title: Solana Architecture and Accounts
Technologies: Solana, Rust, CLI
Description: This layer introduces Solana's high-throughput design and its account-based programming model. Grasping accounts and rent is fundamental to everything on Solana.
Topics:
- Accounts and ownership
- Programs versus data
- Rent and lamports
- Transactions and instructions
- Proof of History overview
- Using the Solana CLI

### Layer 2 of 10 — id: solana-dev-2
Title: Rust for Solana
Technologies: Rust, Cargo, Solana
Description: This layer builds the Rust foundations needed to write Solana programs. Comfort with ownership and borrowing is required to write safe on-chain code.
Topics:
- Ownership and borrowing
- Structs and enums
- Traits and generics
- Result and error handling
- Cargo and crates
- Serialization with Borsh

### Layer 3 of 10 — id: solana-dev-3
Title: Native Solana Programs
Technologies: Rust, Solana, BPF
Description: This layer writes a Solana program without frameworks to understand the raw runtime. Knowing the native model demystifies what Anchor does for you.
Topics:
- Program entrypoints
- Processing instructions
- Account validation
- Cross-program invocation
- Program derived addresses
- Building and deploying with the CLI

### Layer 4 of 10 — id: solana-dev-4
Title: Building with Anchor
Technologies: Anchor, Rust, Solana
Description: This layer adopts the Anchor framework to remove boilerplate and add safety. Anchor is the standard way most teams build Solana programs.
Topics:
- Anchor program structure
- Account contexts and constraints
- Instruction handlers
- PDAs in Anchor
- The IDL
- Errors and validation

### Layer 5 of 10 — id: solana-dev-5
Title: SPL Tokens
Technologies: SPL, Anchor, Solana
Description: This layer covers the SPL token standard and how to mint and transfer tokens. Tokens are central to most Solana applications.
Topics:
- Mint and token accounts
- Associated token accounts
- Minting and burning
- Transfers and delegates
- Token metadata
- CPI to the token program

### Layer 6 of 10 — id: solana-dev-6
Title: Client Integration with web3.js
Technologies: Solana, web3.js, Anchor
Description: This layer connects frontends to Solana programs using the JavaScript SDK and Anchor client. Client integration turns programs into real applications.
Topics:
- Connection and RPC
- Building and sending transactions
- Wallet adapter integration
- Using the Anchor TypeScript client
- Fetching account data
- Handling confirmations

### Layer 7 of 10 — id: solana-dev-7
Title: Testing Solana Programs
Technologies: Anchor, Mocha, Rust
Description: This layer establishes testing practices for Anchor programs locally. Thorough tests catch account and constraint bugs before deployment.
Topics:
- Anchor test framework
- Local validator testing
- TypeScript integration tests
- Rust unit tests
- Simulating failures
- Logging and debugging

### Layer 8 of 10 — id: solana-dev-8
Title: Advanced Program Design
Technologies: Anchor, Rust, Solana
Description: This layer covers advanced patterns such as composability, account resizing, and compute budgets. These techniques are needed for complex production programs.
Topics:
- Cross-program invocation patterns
- PDA signing
- Account reallocation
- Compute unit budgeting
- Versioned transactions and lookup tables
- Program upgrades

### Layer 9 of 10 — id: solana-dev-9
Title: Security and Auditing on Solana
Technologies: Anchor, Rust, Solana
Description: This layer focuses on common Solana vulnerabilities and how to defend against them. Account confusion attacks are a frequent source of exploits.
Topics:
- Account validation pitfalls
- Signer and owner checks
- Arithmetic overflow
- PDA seed collisions
- Reinitialization attacks
- Audit checklists

### Layer 10 of 10 — id: solana-dev-10
Title: Mainnet Deployment and Operations
Technologies: Solana, Anchor, CLI
Description: This final layer ships an Anchor program to mainnet and manages it over time. Production deployment requires careful upgrade authority and monitoring.
Topics:
- Program deployment and buffers
- Upgrade authority management
- Priority fees in production
- RPC provider selection
- Monitoring program logs
- Verifiable builds

Start now with Layer 1.
