You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Web3 Frontend" (web3-frontend, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: web3-frontend-1
Title: Web and Ethereum Fundamentals for Frontend Devs
Technologies: JavaScript, React, Blockchain Basics, JSON-RPC
Description: Understand the Ethereum JSON-RPC API and how browsers connect to wallets. Learn the difference between a provider, a signer, and a contract interface.
Topics:
- Ethereum accounts and transactions
- JSON-RPC methods like eth_call and eth_sendTransaction
- How injected providers work
- React project setup with Vite
- Wallet browser extensions
- Reading on-chain data

### Layer 2 of 10 — id: web3-frontend-2
Title: viem - Low-Level Ethereum Client
Technologies: viem, TypeScript, Public Client, Wallet Client
Description: Learn viem as a type-safe, modern alternative to ethers.js for Ethereum interactions. Build public clients for reading and wallet clients for sending transactions.
Topics:
- Creating a publicClient
- Reading contract data with readContract
- Encoding calldata
- Handling BigInt in JavaScript
- Chain configuration in viem
- Error types in viem

### Layer 3 of 10 — id: web3-frontend-3
Title: wagmi - React Hooks for Ethereum
Technologies: wagmi, React, TypeScript, viem
Description: Use wagmi hooks to manage wallet connections, account state, and contract reads in React applications. Understand how wagmi wraps viem under the hood.
Topics:
- WagmiProvider setup
- useAccount and useConnect hooks
- useReadContract and useWriteContract
- useWaitForTransactionReceipt
- Chain switching with useSwitchChain
- Type generation with wagmi CLI

### Layer 4 of 10 — id: web3-frontend-4
Title: RainbowKit - Wallet Connection UI
Technologies: RainbowKit, wagmi, React, CSS
Description: Integrate RainbowKit to provide a polished multi-wallet connect modal with minimal configuration. Customize themes, chains, and wallet lists to match your brand.
Topics:
- RainbowKit ConnectButton
- Custom theme with lightTheme and darkTheme
- Restricting to specific chains
- Adding custom wallets
- Avatar and ENS display
- Combining RainbowKit with TailwindCSS

### Layer 5 of 10 — id: web3-frontend-5
Title: Reading and Displaying On-Chain Data
Technologies: wagmi, viem, React Query, ABI
Description: Build data-rich dashboards that read multiple contract values, handle loading states, and refresh on block updates. Understand caching and revalidation patterns.
Topics:
- useReadContracts for batch reads
- watchContractEvent for live updates
- React Query cache and stale time
- Formatting BigInt for display
- ENS resolution with useEnsName
- Handling reverts gracefully

### Layer 6 of 10 — id: web3-frontend-6
Title: Writing Transactions and User Flows
Technologies: wagmi, viem, React, Toast notifications
Description: Implement complete write flows including form validation, transaction submission, confirmation waiting, and error handling. Build flows that feel reliable to users.
Topics:
- useWriteContract and simulate first
- useWaitForTransactionReceipt polling
- Gas estimation and limits
- User rejection error handling
- Multi-step transaction flows
- Approvals before interactions

### Layer 7 of 10 — id: web3-frontend-7
Title: Multi-Chain and Network Handling
Technologies: wagmi, viem, RainbowKit, Chain configs
Description: Build apps that work seamlessly across multiple EVM-compatible chains. Handle network detection, chain switching prompts, and chain-specific contract addresses.
Topics:
- Defining custom chains in viem
- useSwitchChain hook
- Chain-specific contract address mapping
- Detecting wrong network and showing warnings
- Adding custom RPC URLs
- Testing against L2 networks like Arbitrum and Optimism

### Layer 8 of 10 — id: web3-frontend-8
Title: Signatures, Auth, and Sign-In with Ethereum
Technologies: SIWE, wagmi, viem, JWT
Description: Implement Sign-In with Ethereum (EIP-4361) for gasless authentication. Understand message signing, nonce-based anti-replay protection, and server-side verification.
Topics:
- EIP-4361 SIWE message format
- useSignMessage hook
- Nonce generation and storage
- Server-side SIWE verification
- Combining SIWE with JWT sessions
- Typed data signing with EIP-712

### Layer 9 of 10 — id: web3-frontend-9
Title: Performance, Accessibility, and Testing
Technologies: Vitest, Testing Library, Lighthouse, MSW
Description: Write unit and integration tests for Web3 React components using mocked providers. Audit performance and accessibility of your dApp and fix common issues.
Topics:
- Mocking wagmi hooks in Vitest
- Testing wallet connect flows
- Mock Service Worker for RPC calls
- Lighthouse performance audit
- WCAG accessibility for Web3 UIs
- Snapshot testing for address display

### Layer 10 of 10 — id: web3-frontend-10
Title: Production Build, Security, and Deployment
Technologies: Vercel, Next.js, CSP headers, RPC security
Description: Harden and deploy your Web3 frontend to production with secure RPC key handling, Content Security Policy headers, and monitoring. Perform a security review of client-side code.
Topics:
- Hiding RPC keys via proxy API routes
- Content Security Policy for dApps
- Vercel deployment and environment variables
- Bundle analysis with vite-bundle-visualizer
- Rate limiting RPC usage
- Front-end phishing and address spoofing mitigations

Start now with Layer 1.
