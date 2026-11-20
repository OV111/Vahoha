You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Web3 Full Stack" (web3-fullstack, category web3). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 10 — id: web3-fullstack-1
Title: Web and Blockchain Fundamentals
Technologies: JavaScript, React, Ethereum, Next.js
Description: Understand the full-stack architecture of a dApp, connecting smart contracts on-chain to a web frontend and an off-chain indexing layer. Learn why each layer exists.
Topics:
- Traditional vs decentralized architecture
- Role of smart contracts as backend
- What an indexer does and why it is needed
- JSON-RPC and WebSocket providers
- Next.js vs plain React for dApps
- IPFS and Arweave for off-chain storage

### Layer 2 of 10 — id: web3-fullstack-2
Title: Solidity Smart Contract Development
Technologies: Solidity, OpenZeppelin, EVM, Remix
Description: Write production-quality Solidity contracts using OpenZeppelin base classes and best practices. Understand events as the primary data emission mechanism for indexers.
Topics:
- Solidity data types and visibility
- Events and indexed parameters
- OpenZeppelin access control
- Custom errors for gas efficiency
- Contract interfaces
- Natspec documentation

### Layer 3 of 10 — id: web3-fullstack-3
Title: Hardhat - Contract Testing and Deployment
Technologies: Hardhat, ethers.js, Mocha, dotenv
Description: Use Hardhat to write tests, run a local node, and deploy contracts to testnets. Build reusable deploy scripts that track deployed addresses per network.
Topics:
- Hardhat project configuration
- Writing and running Mocha tests
- Deploying with Hardhat Ignition or scripts
- Storing deployed addresses per network
- Local network and forking
- Hardhat console for debugging

### Layer 4 of 10 — id: web3-fullstack-4
Title: Next.js Frontend with wagmi and RainbowKit
Technologies: Next.js, wagmi, RainbowKit, TypeScript
Description: Build a Next.js dApp frontend with wagmi hooks for contract interaction and RainbowKit for wallet connection. Set up the provider tree correctly for SSR.
Topics:
- Next.js app router setup
- Configuring WagmiProvider with Next.js
- Server vs client component split
- RainbowKit ConnectButton in Next.js
- Reading contract data with useReadContract
- Writing transactions with useWriteContract

### Layer 5 of 10 — id: web3-fullstack-5
Title: The Graph - Subgraph Development
Technologies: The Graph, GraphQL, AssemblyScript, YAML
Description: Build and deploy a subgraph that indexes events from your smart contract into a queryable GraphQL API. Write entity schemas and mapping handlers in AssemblyScript.
Topics:
- Subgraph manifest and schema
- Defining GraphQL entities
- Writing event handlers in AssemblyScript
- Deploying to the hosted service or Subgraph Studio
- Writing GraphQL queries
- Handling contract upgrades in subgraphs

### Layer 6 of 10 — id: web3-fullstack-6
Title: Querying Subgraphs from the Frontend
Technologies: Next.js, Apollo Client, The Graph, GraphQL
Description: Integrate Apollo Client or urql into your Next.js app to query subgraph data. Build paginated, filterable lists of on-chain events rendered server-side.
Topics:
- Apollo Client setup in Next.js
- Writing and executing GraphQL queries
- Pagination with first and skip
- Filtering and ordering in GraphQL
- Server-side rendering with Apollo
- Combining subgraph data with live contract reads

### Layer 7 of 10 — id: web3-fullstack-7
Title: File Storage - IPFS and Arweave
Technologies: IPFS, Arweave, Pinata, Next.js
Description: Build file upload flows that store images and metadata on IPFS or Arweave from the browser. Learn the permanence tradeoffs between pinning services and Arweave.
Topics:
- Uploading files to IPFS via Pinata API
- Arweave and Bundlr for permanent storage
- Generating metadata JSON and pinning
- Displaying IPFS content via gateways
- IPFS CID determinism
- Handling large files and upload progress

### Layer 8 of 10 — id: web3-fullstack-8
Title: Authentication and User Profiles
Technologies: SIWE, Next.js, Iron Session, The Graph
Description: Implement wallet-based authentication with Sign-In with Ethereum and store per-user settings off-chain in a database. Combine on-chain identity with off-chain preferences.
Topics:
- SIWE message signing and verification
- Iron Session for JWT-free session cookies
- Next.js API routes for auth endpoints
- Protecting pages with middleware
- Combining SIWE identity with subgraph data
- Linking wallet to off-chain profile

### Layer 9 of 10 — id: web3-fullstack-9
Title: Testing, Performance, and Security
Technologies: Vitest, Playwright, Lighthouse, Slither
Description: Test the full stack from smart contracts to frontend with unit, integration, and end-to-end tests. Audit for smart contract vulnerabilities and frontend security issues.
Topics:
- Playwright E2E tests for wallet flows
- Mocking wagmi hooks in Vitest
- Smart contract audit with Slither
- Lighthouse performance and accessibility
- Rate limiting API routes
- CSP headers in Next.js

### Layer 10 of 10 — id: web3-fullstack-10
Title: Mainnet Launch and Production Operations
Technologies: Ethereum Mainnet, Vercel, The Graph Studio, Tenderly
Description: Launch your full-stack dApp to production with verified contracts, a deployed subgraph on The Graph Network, and a Next.js frontend on Vercel. Set up monitoring across all layers.
Topics:
- Mainnet contract deployment and verification
- Publishing subgraph to The Graph Network
- Vercel production deployment with env vars
- Tenderly production monitoring
- GRT signal and indexer fees
- Post-launch incident response plan

Start now with Layer 1.
