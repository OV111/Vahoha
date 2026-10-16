You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Wallet Developer" (wallet-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: wallet-developer-1
Title: Web and Cryptography Fundamentals
Technologies: JavaScript, Cryptography, Ethereum, Browser APIs
Description: Understand the cryptographic primitives that underpin Ethereum wallets including elliptic curve keys, hashing, and digital signatures. Learn how private keys control accounts.
Topics:
- Public and private key cryptography
- secp256k1 elliptic curve
- keccak-256 hashing
- ECDSA digital signatures
- How Ethereum addresses are derived
- Mnemonics and HD wallets BIP-32 and BIP-39

### Layer 2 of 10 — id: wallet-developer-2
Title: EIP-1193 - The Ethereum Provider API
Technologies: EIP-1193, JavaScript, JSON-RPC, Browser
Description: Understand the EIP-1193 specification that defines how web pages communicate with Ethereum wallets through a standardized provider interface. Build a minimal provider consumer.
Topics:
- EIP-1193 provider interface
- eth_requestAccounts and wallet_switchEthereumChain
- Listening to accountsChanged and chainChanged events
- eth_sendTransaction payload structure
- personal_sign vs eth_sign
- Provider error codes

### Layer 3 of 10 — id: wallet-developer-3
Title: Key Management and Secure Storage
Technologies: ethers.js, Web Crypto API, Keystore, Hardware Wallets
Description: Learn how to securely generate, encrypt, and store private keys in browser and mobile environments. Understand keystore file formats and hardware wallet integration.
Topics:
- ethers.js Wallet keystore encryption
- Web Crypto API for browser-native crypto
- Secure key storage patterns in browsers
- Hardware wallet communication via U2F or HID
- Key derivation with PBKDF2
- Memory safety and key zeroing

### Layer 4 of 10 — id: wallet-developer-4
Title: Transaction Construction and Signing
Technologies: ethers.js, viem, EIP-1559, TypeScript
Description: Build the logic for constructing, signing, and broadcasting Ethereum transactions with proper nonce management, gas estimation, and EIP-1559 fee fields.
Topics:
- EIP-1559 transaction type 2 fields
- maxFeePerGas and maxPriorityFeePerGas
- Nonce management and race conditions
- Gas estimation with eth_estimateGas
- Signing without broadcasting
- Transaction serialization and RLP encoding

### Layer 5 of 10 — id: wallet-developer-5
Title: WalletConnect Protocol
Technologies: WalletConnect, Web3Modal, React, TypeScript
Description: Integrate WalletConnect v2 to allow users to connect mobile wallets to desktop dApps via QR code or deep link. Understand the relay server and session lifecycle.
Topics:
- WalletConnect v2 protocol overview
- AppKit setup and configuration
- Session proposal and approval flow
- Sending requests over WalletConnect sessions
- Pairing URI and QR code generation
- Session persistence and restoration

### Layer 6 of 10 — id: wallet-developer-6
Title: Message Signing - EIP-712 Typed Data
Technologies: EIP-712, ethers.js, MetaMask, Solidity
Description: Implement EIP-712 typed structured data signing for human-readable signing prompts. Build permit-style approvals and off-chain authorization flows.
Topics:
- EIP-712 domain and type definitions
- Typed data hashing and signing
- MetaMask eth_signTypedData_v4
- Permit EIP-2612 for gasless approvals
- Signature recovery and verification in Solidity
- Replay protection with nonces

### Layer 7 of 10 — id: wallet-developer-7
Title: Account Abstraction - ERC-4337
Technologies: ERC-4337, Bundler, Paymaster, viem
Description: Learn ERC-4337 account abstraction to build smart contract wallets with social recovery, gas sponsorship, and batch transactions. Understand UserOperation and bundler flow.
Topics:
- UserOperation structure and fields
- EntryPoint contract interface
- Bundler and mempool for 4337
- Paymaster for gas sponsorship
- Smart account factory deployment
- Permissioned and social recovery modules

### Layer 8 of 10 — id: wallet-developer-8
Title: Phishing Prevention and User Security
Technologies: JavaScript, React, MetaMask Snaps, Security
Description: Build wallet features that protect users from phishing, transaction simulation previews, and malicious contract interactions. Study common wallet attack vectors.
Topics:
- Address poisoning attacks
- Transaction simulation before signing
- Allowance risk warnings
- MetaMask Snaps for custom security
- Domain verification in signing prompts
- Revoke.cash style allowance management

### Layer 9 of 10 — id: wallet-developer-9
Title: Multi-Chain and Cross-Chain Wallet Support
Technologies: viem, wagmi, CCIP, Chain configs
Description: Extend your wallet to support multiple EVM-compatible chains and implement basic cross-chain asset bridging flows. Manage chain-specific RPCs and network switching.
Topics:
- EVM chain ID registry
- Custom chain configuration in viem
- Detecting and switching chains
- Cross-chain bridge integration patterns
- Chainlink CCIP for token transfers
- Multi-chain address book UX

### Layer 10 of 10 — id: wallet-developer-10
Title: Production Wallet Security Audit and Launch
Technologies: Security, Penetration Testing, CSP, Key Storage
Description: Perform a security audit of your wallet covering key storage, signing flows, network communication, and phishing surface area. Apply mitigations and launch with a bug bounty.
Topics:
- Browser extension security model
- Content script and background page isolation
- Secure context and HTTPS requirements
- Key extraction threat modeling
- OWASP top 10 for wallet apps
- Bug bounty program setup

Start now with Layer 1.
