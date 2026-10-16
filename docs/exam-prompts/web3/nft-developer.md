You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "NFT Developer" (nft-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: nft-developer-1
Title: Web and Blockchain Basics for NFT Developers
Technologies: HTML, JavaScript, Ethereum, Blockchain
Description: Understand the basics of how blockchains work and what makes NFTs unique compared to fungible tokens. Learn about digital ownership, provenance, and on-chain vs off-chain data.
Topics:
- Blockchain immutability and provenance
- Fungible vs non-fungible tokens
- What metadata means for NFTs
- How wallets own tokens
- Marketplaces and royalties overview
- Gas and transaction costs

### Layer 2 of 10 — id: nft-developer-2
Title: Solidity and ERC-721 Standard
Technologies: Solidity, ERC-721, OpenZeppelin, Remix
Description: Study the ERC-721 standard interface and implement a basic NFT contract using OpenZeppelin. Understand the tokenId model, ownership mapping, and approval mechanics.
Topics:
- ERC-721 interface functions
- ownerOf and balanceOf
- mint and safeMint functions
- Approval and transferFrom
- OpenZeppelin ERC721 base contract
- tokenURI function

### Layer 3 of 10 — id: nft-developer-3
Title: NFT Metadata and IPFS
Technologies: IPFS, Pinata, JSON Metadata, Solidity
Description: Create and pin NFT metadata JSON files to IPFS and reference them in your contract via tokenURI. Understand the metadata standard used by OpenSea and other marketplaces.
Topics:
- NFT metadata JSON schema
- Uploading images to IPFS via Pinata
- Pinning metadata JSON files
- Setting tokenURI in contracts
- Base URI pattern for collections
- On-chain vs off-chain metadata tradeoffs

### Layer 4 of 10 — id: nft-developer-4
Title: NFT Minting Mechanics
Technologies: Solidity, Hardhat, OpenZeppelin, Merkle Trees
Description: Build NFT minting contracts with supply caps, allowlists using Merkle proofs, and public sale phases. Implement per-wallet mint limits and reveal mechanics.
Topics:
- Max supply and counter pattern
- Allowlist with Merkle proof verification
- Public and presale phases
- Per-wallet mint limits with mapping
- Reveal mechanic with placeholder URI
- Withdraw function for minting revenue

### Layer 5 of 10 — id: nft-developer-5
Title: ERC-1155 Multi-Token Standard
Technologies: ERC-1155, Solidity, OpenZeppelin, Hardhat
Description: Learn ERC-1155 for efficient multi-token contracts that support both fungible and non-fungible tokens in a single deployment. Build a game item contract as a practical example.
Topics:
- ERC-1155 vs ERC-721 tradeoffs
- Batch mint and batch transfer
- balanceOfBatch function
- Metadata URI with id substitution
- Semi-fungible tokens
- Approval for all operators

### Layer 6 of 10 — id: nft-developer-6
Title: NFT Royalties and Marketplace Integration
Technologies: ERC-2981, Solidity, OpenSea, Blur
Description: Implement on-chain royalty standards using ERC-2981 and understand how NFT marketplaces enforce or bypass royalties. Learn about creator fee policies across platforms.
Topics:
- ERC-2981 royaltyInfo function
- Royalty basis points math
- OpenSea operator filter registry
- Marketplace-specific royalty enforcement
- Royalty recipient splitting
- On-chain royalty vs off-chain policy debate

### Layer 7 of 10 — id: nft-developer-7
Title: On-Chain Generative NFTs and SVG Art
Technologies: Solidity, SVG, Base64, Randomness
Description: Generate NFT artwork entirely on-chain using Solidity-produced SVGs encoded as base64 data URIs. Understand the tradeoffs between on-chain and off-chain storage for art.
Topics:
- Generating SVG strings in Solidity
- Base64 encoding for data URIs
- On-chain attribute randomness with blockhash
- Chainlink VRF for verifiable randomness
- Dynamic NFTs that change state
- Gas cost of on-chain data

### Layer 8 of 10 — id: nft-developer-8
Title: NFT Frontend with React and ethers.js
Technologies: React, ethers.js, wagmi, IPFS
Description: Build a minting website that connects to MetaMask, displays collection info, and handles mint transactions with proper feedback. Fetch and render NFT metadata from IPFS.
Topics:
- Connecting MetaMask with wagmi
- Mint button with transaction state
- Fetching tokenURI and rendering metadata
- Gallery view with paginated NFTs
- Display owned tokens by address
- Countdown timer for sale phases

### Layer 9 of 10 — id: nft-developer-9
Title: NFT Contract Security and Testing
Technologies: Hardhat, Foundry, Slither, Fuzzing
Description: Audit your NFT contracts for common vulnerabilities including reentrancy on mint, supply manipulation, and metadata override attacks. Write comprehensive test suites.
Topics:
- Reentrancy in ERC-721 safe transfers
- Supply cap bypass via batch mint
- Merkle proof front-running
- Metadata URI manipulation
- Fuzz testing mint and transfer functions
- Slither NFT-specific detectors

### Layer 10 of 10 — id: nft-developer-10
Title: Mainnet Launch and Collection Operations
Technologies: Ethereum Mainnet, OpenSea, Gnosis Safe, Tenderly
Description: Launch an NFT collection on Ethereum mainnet with a verified contract, marketplace listings, and an admin multisig for revenue withdrawals. Set up post-launch monitoring.
Topics:
- Mainnet deployment with Hardhat
- Etherscan contract verification
- OpenSea collection setup and metadata
- Gnosis Safe for team fund management
- Tenderly mint event monitoring
- Reveal transaction timing

Start now with Layer 1.
