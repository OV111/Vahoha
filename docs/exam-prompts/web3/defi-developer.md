You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "DeFi Developer" (defi-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: defi-developer-1
Title: Web and Blockchain Fundamentals for DeFi
Technologies: Solidity, EVM, JavaScript, Blockchain
Description: Build the conceptual foundation needed to understand decentralized finance protocols. Learn how Ethereum transactions, gas, and smart contract state enable financial primitives.
Topics:
- How Ethereum transactions work
- Gas and EVM execution model
- Smart contract state and storage slots
- ERC-20 token standard
- Liquidity and AMM concepts
- DeFi protocol categories

### Layer 2 of 10 — id: defi-developer-2
Title: Solidity for DeFi - Core Patterns
Technologies: Solidity, OpenZeppelin, ERC-20, Interfaces
Description: Master Solidity patterns critical to DeFi: interfaces, low-level calls, and token handling. Understand how protocols interact with each other through shared interfaces.
Topics:
- Solidity interfaces and abstract contracts
- Low-level call and delegatecall
- ERC-20 safeTransfer pattern
- Reentrancy and checks-effects-interactions
- Storage layout and packing
- Custom errors and revert reasons

### Layer 3 of 10 — id: defi-developer-3
Title: Foundry - Professional Smart Contract Toolchain
Technologies: Foundry, Forge, Cast, Anvil
Description: Set up the Foundry toolkit and learn to write tests in Solidity rather than JavaScript. Use Anvil for local forks and Cast for command-line contract interaction.
Topics:
- forge init and project structure
- Writing Foundry tests with Test and assertEq
- Mainnet forking with Anvil
- Fuzzing with forge test --fuzz-runs
- Gas snapshots with forge snapshot
- Using Cast to call and send transactions

### Layer 4 of 10 — id: defi-developer-4
Title: Building Automated Market Makers
Technologies: Solidity, Foundry, AMM Math, ERC-20
Description: Implement a simplified constant-product AMM from scratch to understand how Uniswap V2 pricing and liquidity work. Learn how LP tokens represent pool shares.
Topics:
- x*y=k invariant formula
- Swap fee calculation
- Mint and burn LP tokens
- Price impact and slippage
- Concentrated liquidity concepts
- Protocol fee mechanisms

### Layer 5 of 10 — id: defi-developer-5
Title: Price Oracles and External Data
Technologies: Chainlink, Uniswap TWAP, Solidity, Oracles
Description: Integrate price oracles into DeFi contracts for safe, manipulation-resistant on-chain pricing. Compare Chainlink push oracles vs Uniswap TWAP pull oracles.
Topics:
- Chainlink AggregatorV3Interface
- Reading price feeds on-chain
- Oracle staleness checks
- Uniswap V3 TWAP calculation
- Flash loan oracle manipulation attacks
- Choosing oracles for different use cases

### Layer 6 of 10 — id: defi-developer-6
Title: Lending and Borrowing Protocols
Technologies: Solidity, Foundry, Collateral math, Liquidation
Description: Build a simplified lending protocol with collateral requirements, health factor tracking, and liquidation logic. Learn how Aave and Compound manage risk.
Topics:
- Collateral ratio and health factor
- Interest rate models
- Liquidation bonus and thresholds
- cToken and aToken share models
- Flash loans for liquidation bots
- Governance parameters for lending markets

### Layer 7 of 10 — id: defi-developer-7
Title: Flash Loans
Technologies: Solidity, Aave, Uniswap V3, Foundry
Description: Understand flash loans as atomic, uncollateralized loans used for arbitrage, liquidations, and collateral swaps. Implement a flash loan receiver contract.
Topics:
- Flash loan callback pattern
- Aave flash loan interface
- Uniswap V3 flash swap
- Arbitrage between two AMMs
- Collateral swap with flash loans
- Flash loan fee accounting

### Layer 8 of 10 — id: defi-developer-8
Title: Yield Strategies and Vaults
Technologies: Solidity, ERC-4626, Foundry, Compound
Description: Implement ERC-4626 tokenized vault contracts that automate yield strategies. Learn how yield aggregators like Yearn compose multiple protocols.
Topics:
- ERC-4626 vault standard
- Deposit and withdraw share math
- Yield strategy composition
- Harvesting and compounding rewards
- Slippage and vault entry/exit fees
- Emergency withdrawal and pause mechanisms

### Layer 9 of 10 — id: defi-developer-9
Title: DeFi Security and Attack Vectors
Technologies: Slither, Foundry, Echidna, Audit reports
Description: Study the most common DeFi-specific attack vectors including reentrancy, oracle manipulation, governance attacks, and sandwich attacks. Reproduce past exploits in a test environment.
Topics:
- Reentrancy attack variants
- Price oracle manipulation
- Governance attack via flash loans
- Sandwich and front-running attacks
- Echidna property-based fuzzing
- Reading and learning from public audit reports

### Layer 10 of 10 — id: defi-developer-10
Title: Mainnet Deployment and Protocol Launch
Technologies: Foundry, Ethereum Mainnet, Tenderly, Multisig
Description: Deploy a production DeFi protocol to Ethereum mainnet with full auditing, monitoring, and a timelocked governance multisig. Build the operational runbook for incident response.
Topics:
- Pre-launch audit checklist
- Timelock controller for parameter changes
- Gnosis Safe multisig for protocol admin
- Tenderly alerts on protocol health
- Mainnet fork final testing
- Bug bounty setup on Immunefi

Start now with Layer 1.
