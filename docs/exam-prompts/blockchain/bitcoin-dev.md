You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Bitcoin Developer" (bitcoin-dev, category blockchain). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: bitcoin-dev-1
Title: Bitcoin Fundamentals
Technologies: Bitcoin, Cryptography, UTXO
Description: This layer explains how Bitcoin works as a peer-to-peer electronic cash system. The UTXO model and proof of work underpin everything built on Bitcoin.
Topics:
- The UTXO model
- Transactions and inputs
- Proof of work and mining
- Keys and addresses
- The mempool
- Confirmations and finality

### Layer 2 of 10 — id: bitcoin-dev-2
Title: Keys, Addresses, and Wallets
Technologies: Bitcoin, Cryptography, HD Wallets
Description: This layer covers Bitcoin's cryptography and hierarchical deterministic wallets. Correct key handling is the foundation of custody and security.
Topics:
- Elliptic curve keys
- Address formats
- BIP32 hierarchical wallets
- BIP39 mnemonics
- BIP44 derivation paths
- SegWit and Taproot addresses

### Layer 3 of 10 — id: bitcoin-dev-3
Title: Bitcoin Script
Technologies: Script, Bitcoin, Cryptography
Description: This layer teaches Bitcoin's stack-based scripting language for locking and unlocking coins. Script defines the conditions under which bitcoin can be spent.
Topics:
- Stack-based execution
- Opcodes
- Pay to public key hash
- Pay to script hash
- Multisignature scripts
- Timelocks

### Layer 4 of 10 — id: bitcoin-dev-4
Title: Transactions and PSBT
Technologies: Bitcoin, PSBT, Script
Description: This layer builds raw transactions and works with partially signed Bitcoin transactions. PSBT is the standard for collaborative and hardware wallet signing.
Topics:
- Transaction serialization
- Signature hashing
- Fee estimation
- Building PSBTs
- Collaborative signing
- Replace by fee

### Layer 5 of 10 — id: bitcoin-dev-5
Title: Running Bitcoin Core
Technologies: Bitcoin, C++, RPC
Description: This layer runs and queries a full Bitcoin Core node. Operating a node gives trustless access to the chain and its RPC interface.
Topics:
- Installing Bitcoin Core
- Initial block download
- The RPC interface
- Wallet RPCs
- Pruning and indexing
- Configuration options

### Layer 6 of 10 — id: bitcoin-dev-6
Title: Bitcoin Core Internals in C++
Technologies: C++, Bitcoin, Consensus
Description: This layer explores the Bitcoin Core codebase and its consensus rules in C++. Reading the reference implementation reveals how the protocol is truly enforced.
Topics:
- Codebase structure
- Validation and consensus code
- The mempool implementation
- Networking layer
- Building from source
- Writing functional tests

### Layer 7 of 10 — id: bitcoin-dev-7
Title: Taproot and Advanced Scripting
Technologies: Taproot, Script, Bitcoin
Description: This layer covers Taproot, Schnorr signatures, and modern scripting capabilities. These upgrades improve privacy and flexibility for complex spending conditions.
Topics:
- Schnorr signatures
- Taproot outputs
- Tapscript
- Key path and script path spends
- MuSig key aggregation
- Privacy benefits

### Layer 8 of 10 — id: bitcoin-dev-8
Title: Lightning Network Fundamentals
Technologies: Lightning, Bitcoin, Script
Description: This layer introduces the Lightning Network for fast off-chain payments. Lightning scales Bitcoin payments to high volume and low fees.
Topics:
- Payment channels
- HTLCs
- Commitment transactions
- Routing and gossip
- Channel opening and closing
- Watchtowers

### Layer 9 of 10 — id: bitcoin-dev-9
Title: Building Lightning Applications
Technologies: Lightning, Bitcoin, C++
Description: This layer builds applications on top of a Lightning node using its API. Integrating Lightning enables instant payments inside real products.
Topics:
- Lightning node APIs
- Invoices and BOLT11
- Sending and receiving
- Channel management
- Liquidity and fees
- Keysend and custom records

### Layer 10 of 10 — id: bitcoin-dev-10
Title: Production Deployment and Security
Technologies: Bitcoin, Lightning, C++
Description: This final layer deploys Bitcoin and Lightning infrastructure securely for production. Custody and uptime demand rigorous operational security.
Topics:
- Hardened node deployment
- Cold and hot wallet design
- Backups and recovery
- Lightning channel backups
- Monitoring and alerting
- Key management policies

Start now with Layer 1.
