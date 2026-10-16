You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "GameFi Developer" (gamefi-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: gamefi-developer-1
Title: Web, Blockchain, and Game Design Fundamentals
Technologies: JavaScript, Unity Basics, Ethereum, NFTs
Description: Understand the GameFi model combining blockchain ownership with game mechanics. Learn how on-chain assets, play-to-earn economics, and NFT ownership work in games.
Topics:
- GameFi and play-to-earn model
- On-chain vs off-chain game state
- NFT items and characters
- Token economics in games
- Unity engine overview
- Game loop and state management

### Layer 2 of 10 — id: gamefi-developer-2
Title: Solidity Basics for Game Contracts
Technologies: Solidity, Remix, ERC-20, ERC-721
Description: Learn Solidity fundamentals with a game focus, writing contracts for in-game tokens and character NFTs. Understand how game logic can live on-chain.
Topics:
- Solidity data types and structs
- ERC-20 for in-game currency
- ERC-721 for unique characters or items
- Mappings for player state
- Events for game actions
- Access control for game admin functions

### Layer 3 of 10 — id: gamefi-developer-3
Title: Unity and web3.js Integration
Technologies: Unity, web3.js, MetaMask, WebGL
Description: Connect a Unity WebGL game to Ethereum using web3.js and the MetaMask browser extension. Read and write contract data from within a running game session.
Topics:
- Unity WebGL build configuration
- Calling JavaScript from Unity with jslib
- Connecting MetaMask from Unity WebGL
- Reading NFT ownership in game
- Sending transactions from game events
- web3.js provider setup

### Layer 4 of 10 — id: gamefi-developer-4
Title: NFT Game Assets - ERC-1155 and Metadata
Technologies: ERC-1155, IPFS, Solidity, OpenZeppelin
Description: Use ERC-1155 for efficient batch minting of game items, weapons, and consumables. Store item metadata on IPFS and render attributes inside the game.
Topics:
- ERC-1155 for game items
- Batch mint for loot drops
- Item metadata with attributes
- IPFS metadata storage via Pinata
- In-game item balance queries
- Burning items for crafting mechanics

### Layer 5 of 10 — id: gamefi-developer-5
Title: Randomness and Loot Generation
Technologies: Chainlink VRF, Solidity, Hardhat, Unity
Description: Implement verifiable random number generation using Chainlink VRF for fair loot drops and procedural game content. Understand why on-chain randomness from blockhash is unsafe.
Topics:
- Why blockhash randomness is exploitable
- Chainlink VRF v2 and v2.5
- VRF subscription management
- Requesting and fulfilling randomness
- Mapping random words to loot tables
- VRF callback and game state update

### Layer 6 of 10 — id: gamefi-developer-6
Title: Play-to-Earn Reward Mechanics
Technologies: Solidity, ERC-20, Hardhat, Tokenomics
Description: Design and implement smart contract reward systems where players earn tokens through gameplay. Build staking mechanics for NFT characters and anti-bot protections.
Topics:
- On-chain score submission
- Per-block reward emission
- NFT staking for passive rewards
- Anti-bot cooldowns and commit-reveal
- Reward halving and emission schedules
- Treasury management for rewards pool

### Layer 7 of 10 — id: gamefi-developer-7
Title: On-Chain Marketplace for Game Items
Technologies: Solidity, ERC-1155, ERC-20, Hardhat
Description: Build a peer-to-peer marketplace for game items where players list, buy, and trade ERC-1155 assets using the in-game ERC-20 token. Implement royalties for creators.
Topics:
- Marketplace listing and order struct
- ERC-1155 setApprovalForAll
- Order matching and escrow
- ERC-2981 royalty on game item sales
- Cancel and expire listings
- Marketplace fee distribution

### Layer 8 of 10 — id: gamefi-developer-8
Title: Layer 2 for GameFi - Low Gas and Fast Finality
Technologies: Polygon, Arbitrum, wagmi, Bridging
Description: Deploy game contracts on a Layer 2 network to reduce gas costs for high-frequency game transactions. Implement asset bridging between mainnet and L2.
Topics:
- Why L2 matters for games
- Deploying to Polygon and Arbitrum
- Official bridge contracts and UI
- Gas cost comparison L1 vs L2
- L2 transaction finality and sequencer trust
- Handling cross-chain NFT ownership

### Layer 9 of 10 — id: gamefi-developer-9
Title: GameFi Security and Anti-Cheat
Technologies: Solidity, Slither, Commit-Reveal, Signature verification
Description: Audit GameFi contracts for exploits including reward manipulation, NFT duplication bugs, and oracle gaming. Implement server-signed score submission for anti-cheat.
Topics:
- Score submission with server signature
- Sybil attack resistance with per-wallet limits
- Reentrancy in reward claims
- Flash loan attacks on staking rewards
- Slither analysis of game contracts
- Upgradeability risks in live games

### Layer 10 of 10 — id: gamefi-developer-10
Title: Mainnet Launch and Live Game Operations
Technologies: Polygon Mainnet, Unity WebGL, Tenderly, Multisig
Description: Launch your GameFi project to mainnet with verified contracts, a production Unity WebGL build, and operational tooling for monitoring player activity and protocol health.
Topics:
- Mainnet deployment checklist for games
- Unity WebGL production build optimization
- Tenderly alerts for reward contract events
- Gnosis Safe for treasury management
- In-game analytics and on-chain metrics
- Community communication and patch strategy

Start now with Layer 1.
