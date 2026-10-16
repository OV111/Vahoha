You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Move Developer" (move-developer, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: move-developer-1
Title: Move Language Foundations
Technologies: Move, Aptos, Sui
Description: This layer introduces Move, a resource-oriented language built for safe asset handling. Move's design prevents whole classes of bugs common in other smart contract languages.
Topics:
- Resource-oriented programming
- Modules and scripts
- Primitive types
- Functions and visibility
- The Move model
- Aptos and Sui overview

### Layer 2 of 10 — id: move-developer-2
Title: Resources and Abilities
Technologies: Move, Aptos, Rust
Description: This layer explores Move's core innovation of resources and the ability system. Abilities control how values can be copied, dropped, and stored, enforcing asset safety.
Topics:
- The four abilities
- Resources versus copyable types
- Ownership and moves
- References and borrowing
- Structs with abilities
- Preventing duplication

### Layer 3 of 10 — id: move-developer-3
Title: Building on Aptos
Technologies: Aptos, Move, CLI
Description: This layer builds and deploys Move modules on the Aptos blockchain. Aptos uses a global storage model that shapes how state is organized.
Topics:
- The Aptos account model
- Global storage operations
- Publishing modules
- Entry functions
- The Aptos CLI
- Using the framework

### Layer 4 of 10 — id: move-developer-4
Title: Building on Sui
Technologies: Sui, Move, CLI
Description: This layer builds Move modules on Sui, which uses an object-centric model. Sui's objects and parallel execution differ significantly from account-based chains.
Topics:
- The Sui object model
- Owned versus shared objects
- Object ownership transfer
- Entry functions on Sui
- The Sui CLI
- Programmable transaction blocks

### Layer 5 of 10 — id: move-developer-5
Title: Tokens and Digital Assets
Technologies: Move, Aptos, Sui
Description: This layer implements fungible and non-fungible assets using Move standards. Tokens are the most common building block of Move applications.
Topics:
- Fungible asset standards
- Non-fungible tokens
- Minting and burning
- Asset metadata
- Transfers and custody
- Collections

### Layer 6 of 10 — id: move-developer-6
Title: Testing and the Move Prover
Technologies: Move, Aptos, Prover
Description: This layer covers unit testing and formal verification with the Move Prover. The prover can mathematically guarantee key properties of your modules.
Topics:
- Writing unit tests
- Test-only code
- Move specification language
- Writing specifications
- Running the prover
- Invariants and aborts

### Layer 7 of 10 — id: move-developer-7
Title: Composability and Generics
Technologies: Move, Aptos, Sui
Description: This layer builds reusable, composable modules using generics and capabilities. Composability lets protocols build on each other safely.
Topics:
- Generic types and functions
- Phantom type parameters
- Capability patterns
- Witness patterns
- Cross-module calls
- Dynamic fields on Sui

### Layer 8 of 10 — id: move-developer-8
Title: Frontend and SDK Integration
Technologies: Aptos, Sui, TypeScript
Description: This layer connects applications to Move modules using the TypeScript SDKs. Client integration turns modules into real user-facing products.
Topics:
- TypeScript SDK setup
- Building transactions
- Wallet connection
- Reading on-chain state
- Handling events
- Submitting and confirming

### Layer 9 of 10 — id: move-developer-9
Title: Security and Auditing in Move
Technologies: Move, Prover, Aptos
Description: This layer examines Move-specific security concerns and review techniques. Even with strong safety guarantees, logic and access bugs remain possible.
Topics:
- Access control patterns
- Capability leakage
- Arithmetic and abort handling
- Reentrancy considerations
- Upgrade safety
- Audit checklists

### Layer 10 of 10 — id: move-developer-10
Title: Mainnet Deployment and Upgrades
Technologies: Aptos, Sui, Move
Description: This final layer deploys Move modules to mainnet and manages upgrades safely. Production deployment requires careful upgrade policy and monitoring.
Topics:
- Module publishing to mainnet
- Upgrade policies
- Compatibility checks
- Managing upgrade authority
- Monitoring on-chain activity
- Incident response

Start now with Layer 1.
