You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "DAO Developer" (dao-developer, category web3). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: dao-developer-1
Title: Web, Blockchain, and DAO Fundamentals
Technologies: JavaScript, Ethereum, Governance, Tokens
Description: Understand what a DAO is, how on-chain governance works, and why token-weighted voting enables decentralized decision-making. Survey major DAO platforms and patterns.
Topics:
- What is a DAO and why it exists
- On-chain vs off-chain governance
- Token-weighted voting mechanics
- Quorum and proposal thresholds
- Timelock and execution delay
- Major DAO platforms - Compound, Uniswap, MakerDAO

### Layer 2 of 10 — id: dao-developer-2
Title: Governance Tokens - ERC-20 with Voting
Technologies: Solidity, ERC-20Votes, OpenZeppelin, Hardhat
Description: Implement an ERC-20 governance token with vote delegation using OpenZeppelin ERC20Votes. Understand checkpointing and why vote snapshots prevent double voting.
Topics:
- ERC-20Votes and ERC-20Permit extensions
- Delegation and self-delegation
- Historical vote balance checkpointing
- getPastVotes for proposal snapshots
- Token distribution strategies
- Governance token vs utility token tradeoffs

### Layer 3 of 10 — id: dao-developer-3
Title: OpenZeppelin Governor Framework
Technologies: Solidity, OpenZeppelin Governor, Hardhat, TimelockController
Description: Build a complete on-chain governance system using OpenZeppelin Governor with quorum, voting period, and a timelock controller for delayed execution.
Topics:
- OpenZeppelin Governor modules
- GovernorVotes and GovernorQuorum
- Proposal lifecycle - Pending, Active, Succeeded, Queued, Executed
- TimelockController configuration
- Proposing and voting in Hardhat tests
- Proposal description hash

### Layer 4 of 10 — id: dao-developer-4
Title: Snapshot - Off-Chain Voting
Technologies: Snapshot, EIP-712, IPFS, JavaScript
Description: Integrate Snapshot for gasless off-chain voting using signed messages stored on IPFS. Understand when off-chain voting is appropriate and how to build a custom Snapshot strategy.
Topics:
- Snapshot space configuration
- Voting strategies - token, delegation, NFT
- How Snapshot stores votes on IPFS
- EIP-712 signature in Snapshot votes
- Custom voting strategy development
- Snapshot and on-chain execution via SafeSnap

### Layer 5 of 10 — id: dao-developer-5
Title: DAO Treasury Management
Technologies: Solidity, Gnosis Safe, ERC-20, TimelockController
Description: Build and manage a DAO treasury contract that holds ETH and tokens, executes expenditures only through governance votes, and reports on allocations.
Topics:
- Treasury contract patterns
- Gnosis Safe as DAO treasury
- Governance-gated fund releases
- Multi-sig approval thresholds
- Budget proposals and spending categories
- On-chain reporting of treasury balances

### Layer 6 of 10 — id: dao-developer-6
Title: Aragon Framework
Technologies: Aragon OSx, Solidity, JavaScript, Plugins
Description: Build a DAO using the Aragon OSx framework with modular plugins for voting, permissions, and treasury. Understand how Aragon separates DAO core from governance logic.
Topics:
- Aragon OSx architecture
- DAO and plugin structure
- TokenVoting plugin setup
- Permission management with ACL
- Installing and upgrading plugins
- Aragon App for no-code DAO management

### Layer 7 of 10 — id: dao-developer-7
Title: DAO Frontend and Governance UI
Technologies: React, wagmi, The Graph, Next.js
Description: Build a governance dashboard that shows proposals, voting power, delegation status, and treasury balances. Query on-chain governance data from a subgraph.
Topics:
- Displaying active and past proposals
- Voting power and delegation UI
- Proposal creation form
- Transaction feedback for vote and delegate
- Subgraph for governance event indexing
- Treasury balance display

### Layer 8 of 10 — id: dao-developer-8
Title: Advanced Voting Mechanisms
Technologies: Solidity, Quadratic Voting, Conviction Voting, OpenZeppelin
Description: Explore advanced voting mechanisms beyond token-weighted majority voting. Implement quadratic voting to reduce plutocracy and conviction voting for continuous preference expression.
Topics:
- Quadratic voting math and implementation
- Sybil resistance for quadratic voting
- Conviction voting curve
- Optimistic approval patterns
- Rage quit mechanics
- Vote delegation trees

### Layer 9 of 10 — id: dao-developer-9
Title: DAO Security and Attack Vectors
Technologies: Solidity, Slither, Foundry, Governance attacks
Description: Study governance-specific attack vectors including flash loan governance takeovers, proposal front-running, and timelock bypasses. Harden your DAO contracts against each.
Topics:
- Flash loan governance attacks
- Proposal front-running and griefing
- Timelock bypass scenarios
- Quorum and threshold manipulation
- Proxy upgrade via governance attack
- Slither and Foundry fuzzing for governance

### Layer 10 of 10 — id: dao-developer-10
Title: Mainnet DAO Launch and Operations
Technologies: Ethereum Mainnet, Tally, Snapshot, Gnosis Safe
Description: Launch your DAO on Ethereum mainnet with token distribution, governance parameters, treasury setup, and community onboarding. Establish operational workflows for proposals and execution.
Topics:
- Token distribution and genesis event
- Mainnet Governor and timelock deployment
- Tally or Boardroom integration
- Community proposal process documentation
- Treasury diversification strategy
- DAO legal and jurisdictional considerations

Start now with Layer 1.
