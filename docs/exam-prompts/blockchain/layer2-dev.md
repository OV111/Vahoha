You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Layer 2 Developer" (layer2-dev, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: layer2-dev-1
Title: Scaling and Layer 2 Foundations
Technologies: Rollups, Ethereum, Solidity
Description: This layer explains why Ethereum needs scaling and how layer 2 solutions work. Understanding the scaling landscape frames every later design decision.
Topics:
- The blockchain scaling trilemma
- Layer 1 versus layer 2
- Rollups overview
- Optimistic versus zk rollups
- Data availability
- Sequencers and provers

### Layer 2 of 10 — id: layer2-dev-2
Title: Deploying to Layer 2 Networks
Technologies: Optimism, Solidity, Foundry
Description: This layer deploys existing Solidity contracts to layer 2 networks. EVM-equivalent rollups let you reuse familiar tooling with lower fees.
Topics:
- EVM equivalence
- Connecting to L2 testnets
- Deploying with Foundry
- Bridging test funds
- Reading L2 explorers
- Gas differences on L2

### Layer 3 of 10 — id: layer2-dev-3
Title: Optimistic Rollups in Depth
Technologies: Optimism, Rollups, Solidity
Description: This layer dives into how optimistic rollups achieve security through fraud proofs. The optimistic model trades a challenge window for low compute cost.
Topics:
- Transaction batching
- State commitments
- Fraud proofs
- The challenge window
- Withdrawal delays
- Sequencer responsibilities

### Layer 4 of 10 — id: layer2-dev-4
Title: Zero-Knowledge Rollups
Technologies: zkSync, Rollups, Solidity
Description: This layer explores zk rollups and the validity proofs that secure them. Validity proofs offer fast finality and strong cryptographic guarantees.
Topics:
- Validity proofs
- SNARKs and STARKs at a high level
- Proof generation and verification
- zkEVM concepts
- Finality versus optimistic delays
- Prover infrastructure

### Layer 5 of 10 — id: layer2-dev-5
Title: Bridges and Cross-Layer Messaging
Technologies: Optimism, Solidity, Bridges
Description: This layer covers how assets and messages move between L1 and L2. Bridges are critical infrastructure and a frequent source of risk.
Topics:
- Native bridge architecture
- Deposits and withdrawals
- Cross-domain messaging
- Message passing contracts
- Bridge security risks
- Third-party bridges

### Layer 6 of 10 — id: layer2-dev-6
Title: L2-Aware Contract Development
Technologies: Solidity, zkSync, Optimism
Description: This layer teaches how to write contracts that account for layer 2 specifics. Subtle differences in gas, fees, and opcodes affect correctness and cost.
Topics:
- L1 versus L2 gas accounting
- Calldata cost optimization
- Block and time assumptions
- Account abstraction on L2
- Address aliasing
- Chain-specific precompiles

### Layer 7 of 10 — id: layer2-dev-7
Title: Building a dApp Across Layers
Technologies: Optimism, ethers.js, Solidity
Description: This layer builds a full application that spans L1 and L2 with a frontend. Cross-layer apps must coordinate state and user experience across networks.
Topics:
- Multi-network frontends
- Switching chains in the wallet
- Tracking bridge transactions
- Handling withdrawal delays
- Showing L2 confirmations
- Cross-layer state sync

### Layer 8 of 10 — id: layer2-dev-8
Title: Running and Customizing a Rollup
Technologies: Optimism, Rollups, Solidity
Description: This layer uses rollup frameworks to spin up a custom L2. Rollup-as-a-service stacks let teams launch their own chains quickly.
Topics:
- Rollup stack overview
- Configuring a chain
- Running a sequencer
- Setting up a batcher and proposer
- Custom gas tokens
- Connecting to L1

### Layer 9 of 10 — id: layer2-dev-9
Title: Layer 2 Security and Decentralization
Technologies: Rollups, Optimism, zkSync
Description: This layer examines the security assumptions and decentralization roadmap of rollups. Sequencer centralization and upgrade keys are key risks to evaluate.
Topics:
- Sequencer centralization risks
- Escape hatches and forced inclusion
- Upgrade keys and timelocks
- Data availability assurances
- Proof system trust
- L2BEAT risk framework

### Layer 10 of 10 — id: layer2-dev-10
Title: Production Deployment and Operations
Technologies: Optimism, Rollups, Foundry
Description: This final layer ships a layer 2 application to a production network and operates it. Running cross-layer systems in production demands monitoring and safe upgrades.
Topics:
- Mainnet L2 deployment
- Contract verification on L2
- Bridge monitoring
- Sequencer and prover monitoring
- Upgrade governance
- Incident response

Start now with Layer 1.
