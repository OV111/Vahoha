You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "ZK Developer" (zk-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: zk-developer-1
Title: Web, Math, and ZK Fundamentals
Technologies: Mathematics, JavaScript, Cryptography, ZK Concepts
Description: Build the mathematical and conceptual foundation for zero-knowledge proofs. Understand finite fields, polynomial commitments, and the intuition behind what ZK proofs prove.
Topics:
- What a zero-knowledge proof proves
- Completeness, soundness, and zero-knowledge properties
- Finite fields and modular arithmetic
- Polynomial representations of computation
- Interactive vs non-interactive proofs
- Trusted setup and toxic waste

### Layer 2 of 10 — id: zk-developer-2
Title: Circom - Arithmetic Circuit Language
Technologies: Circom, Node.js, snarkjs, Constraints
Description: Learn Circom to express computation as arithmetic circuits with rank-1 constraint systems. Write your first circuits and compile them to witness computation artifacts.
Topics:
- Circom syntax and signal types
- Constraints with <==, --> and ===
- Template and component model
- Multiplier and comparator circuits
- circom compile command
- witness generation with snarkjs

### Layer 3 of 10 — id: zk-developer-3
Title: snarkjs - Groth16 Proof Generation
Technologies: snarkjs, Groth16, Node.js, Powers of Tau
Description: Use snarkjs to run a trusted setup, generate Groth16 proofs, and verify them both in JavaScript and on Ethereum. Understand the proving and verifying key structure.
Topics:
- Powers of Tau ceremony
- Phase 2 circuit-specific setup
- Generating proving and verification keys
- Creating proofs with snarkjs groth16 prove
- Verifying proofs locally with snarkjs
- Exporting Solidity verifier

### Layer 4 of 10 — id: zk-developer-4
Title: On-Chain Proof Verification with Solidity
Technologies: Solidity, Hardhat, snarkjs, Verifier contracts
Description: Deploy a Groth16 verifier contract to Ethereum and build a Solidity contract that gates functionality behind successful proof verification.
Topics:
- Auto-generated Groth16 Verifier.sol
- Calling verifyProof from Solidity
- Encoding proof as uint256 array
- Nullifier hashes for double-spend prevention
- Integrating verifier into application contract
- Gas cost of on-chain verification

### Layer 5 of 10 — id: zk-developer-5
Title: Noir - Rust-Like ZK Language
Technologies: Noir, Nargo, Barretenberg, TypeScript
Description: Learn Noir as a developer-friendly language for writing ZK circuits with Rust-like syntax. Use Nargo to compile and test circuits and Barretenberg as the proving backend.
Topics:
- Noir syntax and types
- Private and public inputs in Noir
- Writing and running Nargo tests
- Noir standard library functions
- Generating proofs with Barretenberg
- Comparing Noir vs Circom tradeoffs

### Layer 6 of 10 — id: zk-developer-6
Title: ZK Identity and Private Credentials
Technologies: Circom, Semaphore, Merkle Trees, Nullifiers
Description: Build ZK identity systems where users prove membership in a set or possession of credentials without revealing which member they are. Study the Semaphore protocol.
Topics:
- Merkle tree membership proofs
- Semaphore identity and commitment scheme
- Nullifier hash for anonymous actions
- Group membership without revealing identity
- Signal broadcasting in Semaphore
- Semaphore on-chain verifier

### Layer 7 of 10 — id: zk-developer-7
Title: PLONK and Universal Trusted Setup
Technologies: PLONK, snarkjs, Circom, KZG commitments
Description: Understand PLONK as an improvement over Groth16 with a universal trusted setup. Generate PLONK proofs using snarkjs and compare proving time and verifier gas with Groth16.
Topics:
- PLONK constraint system
- Universal vs circuit-specific trusted setup
- KZG polynomial commitments
- PLONK proof generation with snarkjs
- FFLONK for smaller proof sizes
- When to choose PLONK vs Groth16

### Layer 8 of 10 — id: zk-developer-8
Title: ZK Rollup Concepts and zkEVM
Technologies: zkEVM, Polygon zkEVM, ZK Rollups, Solidity
Description: Study how ZK rollups use validity proofs to scale Ethereum. Deploy contracts to a zkEVM rollup and understand how EVM execution is proven with ZK-SNARKs.
Topics:
- ZK rollup architecture
- Validity proof vs fraud proof rollups
- zkEVM types - bytecode compatible, language compatible
- Deploying to Polygon zkEVM testnet
- State diff and calldata publishing
- Prover and sequencer roles

### Layer 9 of 10 — id: zk-developer-9
Title: Circuit Security and Soundness Testing
Technologies: Circom, Noir, circomspect, Formal verification
Description: Audit ZK circuits for under-constrained signals, unused inputs, and soundness bugs that allow invalid proofs to pass. Use static analysis tools specific to ZK circuits.
Topics:
- Under-constrained signal vulnerabilities
- Unchecked arithmetic overflow in circuits
- circomspect static analyzer
- Groth16 trusted setup security assumptions
- Simulating invalid proof attacks
- Reading ZK circuit audit reports

### Layer 10 of 10 — id: zk-developer-10
Title: Mainnet Deployment and ZK Application Launch
Technologies: Ethereum Mainnet, Solidity, Hardhat, Ceremony tools
Description: Deploy a production ZK application to Ethereum mainnet with a public trusted setup ceremony, verified on-chain verifier, and documentation for external proof generation.
Topics:
- Organizing a public Powers of Tau ceremony
- Verifying ceremony contributions
- Mainnet verifier and application contract deployment
- Proof generation SDK for end users
- Circuit versioning and upgrade strategy
- Gas optimization of verifier contracts

Start now with Layer 1.
