You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "dApp Developer" (dapp-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: dapp-developer-1
Title: Web and Blockchain Fundamentals
Technologies: HTML, JavaScript, HTTP, Blockchain Basics
Description: Understand how the web works and how blockchain differs from traditional client-server architecture. Learn about decentralization, consensus, and why smart contracts exist.
Topics:
- How HTTP and DNS work
- What a blockchain is
- Nodes, miners, and validators
- Public vs private keys
- Wallets and addresses
- Transaction lifecycle

### Layer 2 of 10 — id: dapp-developer-2
Title: Solidity Basics
Technologies: Solidity, Remix IDE, EVM, ABI
Description: Learn the Solidity language syntax, data types, and how the EVM executes bytecode. Write and deploy your first smart contracts using Remix IDE.
Topics:
- State variables and functions
- Value types vs reference types
- Visibility modifiers
- Constructor and fallback functions
- Events and logs
- ABI encoding

### Layer 3 of 10 — id: dapp-developer-3
Title: Ethereum Developer Toolchain
Technologies: Hardhat, Node.js, ethers.js, dotenv
Description: Set up a professional local Ethereum development environment using Hardhat. Learn to compile, test, and deploy contracts from the command line.
Topics:
- Hardhat project setup
- Compiling contracts
- Deploying to localhost
- Writing Hardhat scripts
- Using environment variables
- Local forking with Hardhat Network

### Layer 4 of 10 — id: dapp-developer-4
Title: Connecting React to Ethereum with ethers.js
Technologies: React, ethers.js, MetaMask, JSON-RPC
Description: Build a React frontend that connects to MetaMask and reads data from a deployed smart contract using ethers.js. Understand providers, signers, and contract instances.
Topics:
- ethers.js Provider and Signer
- Connecting MetaMask via window.ethereum
- Reading contract state
- Sending transactions from React
- Handling async state in React
- Displaying wallet address and balance

### Layer 5 of 10 — id: dapp-developer-5
Title: Smart Contract Patterns and ERC Standards
Technologies: Solidity, OpenZeppelin, ERC-20, ERC-721
Description: Learn widely used smart contract design patterns and ERC token standards. Use OpenZeppelin contracts as audited base implementations.
Topics:
- ERC-20 token standard
- ERC-721 NFT standard
- Ownable and access control
- Pausable pattern
- Reentrancy guard
- Proxy and upgrade patterns

### Layer 6 of 10 — id: dapp-developer-6
Title: Testing Smart Contracts
Technologies: Hardhat, Mocha, Chai, ethers.js
Description: Write comprehensive unit and integration tests for smart contracts using Hardhat and Chai. Understand how to simulate time, blocks, and edge cases.
Topics:
- Unit testing with Hardhat + Chai
- Testing events and reverts
- Simulating time with evm_increaseTime
- Fixtures and beforeEach setup
- Gas usage assertions
- Coverage reports with solidity-coverage

### Layer 7 of 10 — id: dapp-developer-7
Title: Testnets, IPFS, and Contract Verification
Technologies: Sepolia, IPFS, Etherscan, Alchemy
Description: Deploy contracts to a public testnet using an RPC provider and verify source code on Etherscan. Store off-chain data on IPFS using Pinata or web3.storage.
Topics:
- Alchemy and Infura RPC endpoints
- Deploying to Sepolia testnet
- Etherscan contract verification via Hardhat
- IPFS content addressing
- Pinning files with Pinata
- Linking IPFS URIs in contracts

### Layer 8 of 10 — id: dapp-developer-8
Title: dApp UX - Transactions, Errors, and State
Technologies: React, ethers.js, Toast notifications, Loading states
Description: Build production-quality dApp UX that handles pending transactions, user rejections, network errors, and chain switching. Display real-time feedback to users.
Topics:
- Transaction lifecycle states
- Handling MetaMask rejection errors
- Waiting for confirmations
- Chain ID detection and switching
- Toast or snackbar notifications
- Optimistic UI updates

### Layer 9 of 10 — id: dapp-developer-9
Title: Smart Contract Security Fundamentals
Technologies: Slither, Mythril, Solidity, Audit checklists
Description: Learn the most common smart contract vulnerabilities and how to prevent them. Run automated security scanners and read through audit reports to build a security mindset.
Topics:
- Reentrancy attacks
- Integer overflow and underflow
- Access control flaws
- Front-running and MEV
- Slither static analysis
- Reading audit reports

### Layer 10 of 10 — id: dapp-developer-10
Title: Mainnet Deployment and Production Readiness
Technologies: Ethereum Mainnet, Hardhat, Tenderly, Multisig
Description: Deploy a fully tested and audited dApp to Ethereum mainnet using production-grade tooling. Set up monitoring, alerts, and a multisig for admin functions.
Topics:
- Mainnet deployment checklist
- Gas optimization before launch
- Tenderly monitoring and alerts
- Gnosis Safe multisig setup
- Upgrade strategy and timelocks
- Post-deployment verification and incident response

Start now with Layer 1.
