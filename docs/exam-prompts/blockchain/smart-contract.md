You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Smart Contract Dev" (smart-contract, category blockchain). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: smart-contract-1
Title: Blockchain and Solidity Foundations
Technologies: Solidity, EVM, Remix
Description: This layer introduces how smart contracts run on the Ethereum Virtual Machine and the basic syntax of Solidity. Understanding these fundamentals is essential before writing any production logic.
Topics:
- What a smart contract is
- EVM execution model and gas
- Solidity value and reference types
- State variables and functions
- Visibility and modifiers
- Using the Remix IDE

### Layer 2 of 11 — id: smart-contract-2
Title: Contract Structure and Data Patterns
Technologies: Solidity, Mappings, Structs
Description: This layer covers how to organize contract state using structs, arrays, and mappings. Proper data modeling keeps contracts readable and gas efficient.
Topics:
- Structs and enums
- Arrays and dynamic storage
- Mappings and nested mappings
- Constructor patterns
- Events and logging
- Error handling with require and revert

### Layer 3 of 11 — id: smart-contract-3
Title: Local Development with Foundry
Technologies: Foundry, Forge, Solidity
Description: This layer sets up a professional development workflow using Foundry and the Forge toolchain. A fast local environment is critical for iterating on contracts confidently.
Topics:
- Installing and configuring Foundry
- Project layout and remappings
- Compiling with forge build
- Running a local Anvil node
- Scripting deployments
- Managing dependencies

### Layer 4 of 11 — id: smart-contract-4
Title: Token Standards with OpenZeppelin
Technologies: OpenZeppelin, ERC20, ERC721
Description: This layer teaches the standard token interfaces and how to build on audited OpenZeppelin contracts. Reusing battle-tested code reduces bugs and speeds delivery.
Topics:
- ERC20 fungible tokens
- ERC721 non-fungible tokens
- ERC1155 multi-token standard
- Inheritance and overrides
- Access control with Ownable
- Using the OpenZeppelin Wizard

### Layer 5 of 11 — id: smart-contract-5
Title: Testing and Coverage with Forge
Technologies: Foundry, Forge, Solidity
Description: This layer focuses on writing thorough unit tests in Solidity using Forge. Strong test coverage is the foundation of safe contract development.
Topics:
- Writing test contracts
- Assertions and cheatcodes
- Setup and fixtures
- Testing reverts and events
- Measuring coverage
- Gas snapshots

### Layer 6 of 11 — id: smart-contract-6
Title: Hardhat and JavaScript Tooling
Technologies: Hardhat, ethers.js, TypeScript
Description: This layer introduces the Hardhat framework and its JavaScript ecosystem for scripting and testing. Many teams use Hardhat for its plugin richness and frontend integration.
Topics:
- Hardhat project setup
- Tasks and the console
- Testing with ethers.js
- Network configuration
- Plugins and the Hardhat ecosystem
- Comparing Hardhat and Foundry

### Layer 7 of 11 — id: smart-contract-7
Title: Advanced Solidity Patterns
Technologies: Solidity, Proxies, OpenZeppelin
Description: This layer explores advanced design patterns including upgradeable proxies and reusable libraries. These patterns enable maintainable and modular protocols.
Topics:
- Library contracts and using for
- Upgradeable proxy patterns
- Storage layout and slots
- Reentrancy guards
- Factory and clone patterns
- Function selectors and ABI encoding

### Layer 8 of 11 — id: smart-contract-8
Title: Gas Optimization and EVM Internals
Technologies: Solidity, Foundry, Yul
Description: This layer teaches how to measure and reduce gas costs by understanding EVM storage and opcodes. Optimized contracts save users money and improve scalability.
Topics:
- Storage versus memory costs
- Packing variables into slots
- Custom errors over strings
- Loop and calldata optimization
- Inline assembly with Yul
- Profiling with gas reports

### Layer 9 of 11 — id: smart-contract-11
Title: Smart Contract Security and Common Vulnerabilities
Technologies: Solidity, EVM, Foundry
Description: Learn the bugs that have cost real money and how to write contracts that avoid them. You will study reentrancy, access control mistakes, oracle manipulation and front-running, and prove fixes with tests.
Topics:
- Reentrancy and the checks-effects-interactions pattern
- Access control and authorization mistakes
- Integer, rounding and precision pitfalls
- Oracle and price manipulation
- Front-running and MEV
- Writing exploit tests in Foundry

### Layer 10 of 11 — id: smart-contract-9
Title: Building a DeFi Protocol
Technologies: Solidity, Foundry, Chainlink
Description: This layer applies prior skills to build a small decentralized finance protocol with oracles and incentives. Integrating external data and economic logic mirrors real production systems.
Topics:
- Staking and reward math
- Price oracles with Chainlink
- Collateral and liquidations
- Fee mechanisms
- Fork testing against mainnet
- Invariant and fuzz testing

### Layer 11 of 11 — id: smart-contract-10
Title: Auditing and Mainnet Deployment
Technologies: Foundry, Slither, Etherscan
Description: This final layer covers security review, verification, and shipping contracts to mainnet. Careful deployment and monitoring protect real user funds.
Topics:
- Self-audit checklists
- Static analysis with Slither
- Verifying source on Etherscan
- Deployment scripts and secrets
- Multisig ownership transfer
- Post-deploy monitoring

Start now with Layer 1.
