# Thinking like a founder

Learning plan for moving from "developer who builds" to "founder who spots a market problem, sees what is connected to it, and finds the money in it". This is a skill you train, not an idea you wait for.

## The 7 concepts, in order

| # | Concept | Core question | Learn |
|---|---|---|---|
| 1 | Customer pain and Jobs to Be Done | What job is the customer hiring this product to do? | Pain points, unmet needs, JTBD, customer interviews, functional/emotional/social needs |
| 2 | Systems thinking and problem chains | What causes this problem, what does it cause next, who else is affected? | Root cause and Five Whys, journey mapping, bottlenecks, feedback loops, network effects |
| 3 | Business models and monetization | Whose money, time or risk does this reduce, and how much is that worth? | B2B vs B2C, buyer vs user, subscription vs usage, fees, value-based pricing, CAC, LTV, gross margin |
| 4 | Market structure and competitive strategy | What do customers do today, and why is that not enough? | Segments and ICP, direct and indirect competitors, switching costs, distribution, defensibility, willingness to pay |
| 5 | Opportunity validation and experimentation | What is the cheapest experiment that could disprove my assumption? | Hypothesis tests, MVPs, landing pages, customer discovery, pre-sales and paid pilots, leading indicators vs vanity metrics |
| 6 | Technological and market timing | What changed that makes this newly possible, affordable or necessary? | Adoption curves, cost drops, regulation, new APIs, new customer behavior |
| 7 | Growth loops and compounding advantages | Does each new customer attract customers, improve the product or lower costs? | Network effects, referral loops, data advantages, scale economies, retention, channels |

Notes on a few of them:

- **1.** People don't want a budgeting app, they want to stop worrying about running out of money before payday.
- **2.** A restaurant with unpredictable demand gets food waste, staffing problems and cash-flow uncertainty. One forecasting product can address all three.
- **3.** The user and the payer can differ: an employee uses the hiring tool, the employer pays because the problem is expensive for them.
- **4.** The competitor is often a spreadsheet, WhatsApp or a manual process, not another startup.
- **5.** Ten conversations with relevant customers can teach more than a month of coding.
- **6.** AI, blockchain and fintech are sources of change, but the technology is not proof of demand.
- **7.** These are advantages to investigate, not features every startup needs.

## The chain to follow for any product

1. **Customer:** who has the problem?
2. **Pain:** what is expensive, slow, risky or frustrating?
3. **Root cause:** why does it exist?
4. **Connected problems:** what else does it create?
5. **Solution:** can one product address several related pains?
6. **Economic value:** who saves money or gains revenue?
7. **Business model:** who pays, how much, how often?
8. **Validation:** what evidence proves people want it?

Solving several problems is valuable only when they are consequences of the same underlying problem. Unrelated features just add complexity.

## Reverse-engineer real products

| Product | Area | What to investigate |
|---|---|---|
| CodeSignal | Hiring | How skill assessment connects candidate discovery, screening, interviewing and hiring efficiency |
| Stripe | Fintech | How one payments infrastructure removes problems in accepting payments, integration and financial operations |
| Shopify | Commerce | How storefronts, orders, payments, inventory and sales channels are served through one ecosystem |
| Notion | Productivity | How docs, knowledge and project coordination fit together, and why users expand from one use case to others |

Questions to answer for each, in a notebook:

1. Who is the primary customer?
2. What problem did it originally solve?
3. What other problems are connected to it?
4. Who actually pays?
5. What alternatives existed before?
6. How does the company acquire customers?
7. What makes customers stay?
8. What new opportunity could the company exploit today?

Pace: three products a week. After a month that is about twelve businesses and the recurring patterns start to show.

## Resources

Don't master all seven at once. Start with customer problems, then economics, then validation.

1. **The Mom Test** (Rob Fitzpatrick): interview customers without collecting false validation. Goal: discover real problems.
2. **Business Model Generation** (Osterwalder, Pigneur): how segments, value proposition, channels, revenue and costs fit together. Goal: turn a useful product into a business.
3. **The Lean Startup** (Eric Ries): test assumptions with MVPs and evidence. Goal: don't build on assumptions alone.
4. **7 Powers** (Hamilton Helmer): why some businesses keep an advantage. Goal: think beyond the first launch.

Free supplements: Y Combinator Startup School and the YC Library.

## Vahoha through each concept

Grounded in `docs/founder/facts.md`. Vahoha is in the build stage: the platform is being finished before users arrive, which is a normal order for a product like this. Anything about the future is a hypothesis to test once it is live, not a plan.

### 1. Customer pain and JTBD
- **Today:** the job is not "learn to code". It is "get from junior to someone a company trusts with real work, and be able to show it". The functional need is a path with checking. The emotional one is "I don't know what I don't know". The social one is proof others believe.
- **Best next step:** once the MVP runs, talk to early users (`user-interviews.md`). Test whether "I don't know what I don't know" beats "I can't get interviews" as the main pain.
- **Future advantage:** AI makes writing code cheap, so what is scarce is judgment: understanding, reviewing and defending code. Learners who can show that will stand out more over time, not less.

### 2. Systems thinking and problem chains
- **Chain:** tutorial hell -> nobody checks understanding -> junior portfolios look identical -> employers can't tell who is real -> hiring juniors feels risky -> juniors can't get experience -> back to tutorial hell.
- **Where Vahoha cuts it:** roadmap + exams (checking), capstone defense (proof), Build Teams (experience), recruiter scorecard (the employer side). These are consequences of one root cause, so the bundle is coherent. That is the right kind of "many problems, one product".
- **Best next step:** don't add problems outside this chain (see "frozen until pilot data" in `facts.md`).
- **Future advantage:** each step produces evidence the next step reuses. A learner's defended work feeds the team, the team's merged PRs feed the evidence page. The chain compounds data nobody else has.

### 3. Business model and monetization
- **Today:** the developer pays, $15/month is a hypothesis, billing is built but inert (`business-model.md`).
- **Open question:** learners who get hired may cancel. Subscription may be the wrong shape.
- **Best next step:** after launch, run the $15 early-access test. Then compare against a per-outcome price (pay per capstone defense) and regional pricing.
- **Future advantage:** the long-term payer is probably the employer, who saves the cost of a bad hire. Value-based pricing on that side is far larger than learner pricing, but only after learners and evidence exist. Don't price it yet.

### 4. Market structure and competition
- **Alternatives today:** YouTube, roadmap.sh, Boot.dev, Codecademy, LeetCode, and plain GitHub projects. The real competitor is "I'll just keep building side projects alone".
- **Where Vahoha differs:** it checks and defends, rather than delivering content. Content is a commodity, and AI is making it cheaper still.
- **Best next step:** pick one ICP and stay there (self-taught or bootcamp backend developer, 0-3 years in). One track, one path to the first 100 users.
- **Future advantage:** switching cost grows with the learner's history (progress, evidence, team record). Defensibility comes from that record, not from features.

### 5. Validation and experimentation
- **Today:** nothing to validate yet. The MVP has to work end to end first, so there is something real to put in front of people.
- **Best next step:** after the MVP works, the cheapest experiments in order: a demo, interviews, a refundable $15 checkout, the first 20 users' funnel (`OUTREACH_KIT.md`).
- **Future advantage:** a habit of testing before building more. Every frozen feature (voice exam, employer tiers, group chat) stays frozen until a test unfreezes it.

### 6. Technology and market timing
- **What changed:** AI can now review code and run a defense at low cost per learner, which was impossible to do for thousands of learners before. At the same time AI-written code makes "I built this" claims weaker.
- **Best next step:** use AI as the examiner and mentor, not as a content generator. Keep the claim honest: "defended", never "verified" (`EXAM_INTEGRITY.md`).
- **Future advantage:** as AI-assisted work becomes the default, employers will want a trusted signal for "this person understands what they shipped". Timing favors proof of understanding. The technology alone is not proof of demand, so the interviews still decide.

### 7. Growth loops and compounding advantages
- **Possible loops:**
  - Public evidence pages are shared by learners, which brings new learners (referral loop, SEO).
  - Merged PRs in Build Teams create public work, which attracts the next team members (network effect).
  - Anonymized exam and defense results improve question quality and difficulty over time (data advantage).
  - Employers who trust the scorecard bring a second side to the market.
- **Best next step:** make the evidence page good and shareable first. It is the only loop that works with a handful of users.
- **Future advantage:** a trusted record of who can build and defend real work. That record is hard to copy, because a competitor needs the same years of verified history.

## What is best for Vahoha right now

1. **Build:** make the MVP work end to end (`docs/PILOT_STATUS.md`, "Left before the first user"). No users are needed for this step, and it is the right one.
2. **Launch small:** get the first real users on it. Pick one ICP and one track (concept 4).
3. **Learn:** interviews and the $15 test (concepts 1, 5) tell you what to build next. Concepts 2 and 7 guide it: keep the chain tight, make evidence the loop.
4. **Later:** the employer side (3) and AI timing (6) are the long-term story.

Run the 8-step chain on Vahoha itself and keep the answers in `docs/founder/`.
