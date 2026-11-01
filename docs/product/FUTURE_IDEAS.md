# Future Ideas — Not Scoped, Not Committed

> Moved out of docs/strategy/VISION.md 2026-09-30 to keep that document investor-readable. These are speculative concepts kept so the idea isn't lost — none are in scope until the MVP loop (see `docs/engineering/ROADMAP_BUILD_PLAN.md`) is validated with real users.

---

## Collaborative Build Teams (2026-06-11)

> **2026-10-04: a manual-first MVP is built** (`backend/modules/teams`, `src/features/teams`). It covers verified PR contributions, a per-member defense, peer ratings and a public evidence page. Social team formation, AI task assignment and stakes below are still ideas. Status: `docs/PILOT_STATUS.md`.

**Concept:** Developers on Vahoha group together socially, pick a real project they want to build, and the AI assigns tasks to each member based on their known skill level and learning progress. The team ships a real product together.

**How it works:**

1. A developer creates or joins a Build Team from the social layer (similar to how they follow people or join discussions today)
2. The group picks a project idea and defines the scope
3. The AI — which already knows each member's roadmap progress, exam scores, and skill gaps — breaks the project into atomic tasks (1–3 hours each) and assigns them to the right person
4. Members complete their tasks, the AI reviews and integrates, and the team ships

**Retention / commitment mechanic:**

- When joining a Build Team, each member stakes DevsCoins as a commitment deposit
- Complete your assigned tasks → get your DevsCoins back + bonus earned
- Abandon without completing → lose your stake (goes to the team pool or is burned)
- This makes leaving feel costly without forcing anyone — social pressure + economic incentive combined
- Backup: if someone drops, their open task slot is listed for new members to claim (open-source contribution model)

**Why this is unique:** No existing platform combines social team formation + AI-aware task splitting based on personal skill data + in-platform currency commitment. Buildspace did cohorts, hackathons do time-boxed teams — but neither is persistent, AI-assigned, or economically reinforced.

**Added 2026-10-04 — grouping by shared aim, and the startup outcome:**

- Teams form around a shared goal (e.g. "backend, mid-level in six months"), not only a project idea. Matching reads the mastery data: same target, complementary strengths and gaps.
- Entry gate: a passed track capstone and defense, so every member has a verified baseline.
- Teamwork is evidence in its own right: reviewing teammates' code, PR history and shipped features show the collaboration skill that separates mid-level from junior. It should feed the same mastery/evidence spine, not a separate "team score".
- The project could be defended together using the existing capstone defense.
- A team may choose to turn the project into a startup. That is an outcome, not a feature: build nothing for it. Equity, IP and legal questions are real and out of scope.
- Validate first: run one team by hand (chat group plus shared repo) before any product work.

**Open questions:**

- [ ] How does the AI verify task completion? (PR review? Demo video? Peer review?)
- [ ] What's the minimum team size? (2–5 devs seems right for a first version)
- [ ] Do completed Build Team projects get a public profile page on Vahoha?
- [ ] Can a Build Team project become a portfolio piece linked to each member's profile?

---

## Sponsored Real Projects (2026-06-12)

> Builds directly on Collaborative Build Teams. This is the revenue endgame for that feature.

**Concept:** A company pays Vahoha ($2–5K) to have a Build Team deliver a real small product — an internal tool, an MVP, a dashboard. Vahoha takes a 15–20% platform fee; the rest is split among the team members based on completed tasks.

**Why everyone wins:**

- **Developers** — get paid real money, gain real work experience, and ship a verified portfolio piece ("built for an actual client" beats any tutorial project)
- **Company** — gets cheap delivery on small projects AND a recruiting preview: they watch a team work for weeks before deciding to hire anyone (better signal than any interview)
- **Vahoha** — earns the platform fee, and every sponsored project generates verified work-history data that makes the hiring marketplace more valuable

**How it works:**

1. Company posts a project with budget and scope; Vahoha (AI-assisted) validates the scope is junior-team-sized
2. Money goes into escrow (Stripe — not crypto)
3. AI matches a Build Team whose verified skills fit the project, splits it into tasks, assigns by skill level
4. AI + milestones track progress; company sees demo checkpoints
5. On delivery and acceptance: escrow releases, split by contribution, Vahoha takes its cut
6. The project becomes a verified portfolio piece on every member's profile

**Why this is the most unique revenue stream:** "Junior-team-as-a-service with AI project management" doesn't exist. Toptal/Upwork sell individual senior freelancers. Agencies are expensive. Nobody sells coordinated junior teams with AI doing the task-splitting and the platform vouching for each member's verified skill level.

**Prerequisites (in order):**

1. Build Teams working with free/community projects first — prove the AI task-splitting actually produces shipped software
2. A pool of users with verified skills (exam engine live)
3. Escrow + contribution-based payout system
4. Only then approach companies — first ones likely from the community itself or local market

**Open questions:**

- [ ] Who handles scope disputes between company and team? (Vahoha arbitration? AI-assisted?)
- [ ] Quality guarantee — does Vahoha refund if the team fails to deliver? (Probably yes, from escrow — never deliver = company pays nothing)
- [ ] Legal: contractor relationships, taxes per country, liability for delivered code
- [ ] Minimum platform maturity before charging real companies (reputation risk if early projects fail)

---

## Screening-as-a-Service (2026-06-12)

> Reuses the Exam Engine. Near-zero extra cost per sale — the infrastructure is being built anyway for the roadmap gating.

**Concept:** Companies send their own job candidates through Vahoha's exam engine as a hiring screen, and pay $30–50 per assessment. The candidate doesn't need to be a Vahoha user — the company just sends them a link.

**Why it works:**

- The exam engine already exists for roadmap gating — same AI-generated, skill-targeted exams, just pointed at an external candidate
- Marginal cost per assessment is almost zero (one AI exam generation + grading run)
- Companies already pay for this elsewhere (HackerRank, Codility, TestGorilla) — proven market, proven willingness to pay
- Every external candidate who takes a screen discovers Vahoha → free user acquisition funnel

**How it works:**

1. Company creates a screening request: role, stack, seniority level
2. Vahoha generates a tailored exam (theory + practical coding challenge) from the same engine that powers roadmap layer exams
3. Company sends the link to candidates; they take it (proctoring/anti-cheat measures needed)
4. Company gets a structured report: score, strengths, weak spots, comparison against Vahoha's verified user base ("scores better than 70% of devs who passed Backend Layer 3")
5. Billed per assessment, or monthly bundles (e.g. 20 assessments/month)

**The hidden advantage over HackerRank/Codility:** Vahoha's comparison baseline is real — thousands of verified developers with known skill levels took these same exam types while actually learning. "Better than 70% of our verified Layer 3 devs" is a benchmark competitors can't fake, because their test-takers are anonymous one-time strangers.

**Prerequisites:**

1. Exam engine live and proven on Vahoha's own users first
2. Enough verified users that the comparison benchmark is statistically meaningful
3. Anti-cheat / proctoring strategy (AI-assisted code review for plagiarism, time analysis, etc.)
4. Simple company-facing dashboard (can start as a manual/email process for the first customers)

**Open questions:**

- [ ] Per-assessment pricing vs monthly subscription bundles — or both?
- [ ] Do screened candidates get an offer to join Vahoha with their results pre-loaded as a starting profile?
- [ ] White-label option (company's branding on the exam) at a higher price tier?
- [ ] How to handle cheating/AI-assistance during remote assessments?

---

## University & Bootcamp Licensing (2026-06-12)

> The same platform, sold per-seat to institutions. One deal = hundreds of users at once.

**Concept:** Universities and coding bootcamps license Vahoha per student per semester. Their students get the roadmaps, exam engine, and AI mentor; their instructors get a dashboard showing each student's real progress, exam results, and weak spots.

**Why institutions would pay:**

- **Bootcamps** — their entire sales pitch is job outcomes. Vahoha's verified-skill data proves outcomes ("94% of our grads passed Backend Layer 3") in a way no bootcamp can fake today.
- **Universities** — CS programs are theory-heavy; Vahoha adds the practical, measured track without faculty needing to build anything.
- **Both** — instructor dashboards replace gut feeling with data: who's falling behind, on what exactly, before exams reveal it too late.

**Business model:**

- Per-seat pricing: roughly $10–30/student/month (institutions pay less per seat than individuals, but buy hundreds at once)
- One mid-size bootcamp (200 students) ≈ $2–6K/month from a single contract
- Semester or annual contracts → predictable revenue, unlike consumer churn

**Why this is leverage, not extra work:** This is the same product already being built — roadmaps, exams, AI agent, progress tracking. The only new pieces are: organization accounts, an instructor dashboard (a read-only view over data that already exists), and seat-based billing.

**Strategic side effects:**

- Hundreds of students onboarded per deal → solves the cold-start problem institutionally instead of one user at a time
- Students who graduate keep their Vahoha profile → flow straight into the hiring marketplace funnel
- Institutional credibility ("used by X university") makes every other B2B sale easier

**Prerequisites:**

1. Core learning loop live and stable (roadmaps + exams + progress tracking)
2. Organization/team account structure with roles (admin, instructor, student)
3. Instructor dashboard over existing progress data
4. Seat-based billing

**Open questions:**

- [ ] Do institution-licensed students get the full AI agent, or a limited version (AI cost per seat matters at this price point)?
- [ ] Can instructors create custom roadmap paths / private exam sets for their curriculum?
- [ ] Data ownership & privacy — what does the institution see vs what stays the student's (FERPA/GDPR considerations)?
- [ ] Pilot strategy: offer one local bootcamp/university a free semester in exchange for feedback and a case study?

---

## Voice AI Progress Review / Teach-Back

> **Status 2026-11-01 (checked against code):** frozen until pilot data (`docs/PILOT_STATUS.md`). A text and dictation teach-back is live but covers very few topics. The spoken layer exam is a UI prototype on a mock API. The detailed design is `docs/product/VOICE_EXAM_SPEC.md`. Next step on the roadmap is a hand-run oral exam test before any backend work (`docs/product/PRODUCT_ROADMAP.md`).

### Reframe: it's a learning mechanic, not a voice feature

Voice is the interface, not the idea. The product concept is a fourth evidence source added to the roadmap → exam → weak-spot loop:

```
Learn → Prove (exam) → Identify weaknesses → Review → Teach back → AI follow-up → Update learner profile → Advance
```

MCQ tests recognition and is gameable. Explaining a concept out loud (or in writing) under follow-up questioning tests recall and reasoning, which is closer to a real technical interview. Brand angle: "Learn it. Prove it. Explain it. Earn the next level."

### Where each piece stands

| Piece | State | Where |
|---|---|---|
| Teach-back (per topic, text or dictation) | **Live, thin content** | `POST /api/exams/submit-teach-back` and `-followup`, `services/teachBackEvaluatorService.js` |
| Voice exam (per layer, spoken) | **UI prototype, mock API** | `/voice-exam/:layerId`, `src/features/voice-exam` |
| Voice review | **Scaffold, nothing works** | `/voice-review`, `backend/modules/voice-review` |

### Teach-back: what is live

- **Grading:** the app owns the rubric and score levels; the LLM fills in evidence against fixed criteria and lists misconceptions. Groq `openai/gpt-oss-120b`, temperature 0.1. One follow-up question (temperature 0.4), then a re-grade.
- **Entry points:** (1) inline on the exam results screen, only for missed topics that have a rubric (`InlineTeachBack`, `hasRubric` from `submitAttempt`), and (2) a "Teach it back" hand-off into teach-back mode in the mentor chat (`AiAgent.jsx`, `TeachBackCard`).
- **Voice:** browser dictation in (`useSpeechDictation`, Web Speech API, free). The follow-up question is read aloud with browser `speechSynthesis`. No audio reaches the server.
- **Feeds mastery:** results count as evidence in `learnerMastery` and outrank MCQ (a teach-back score under 60 marks the topic `shaky`). Shown as "Explained" on the mastery topic list.
- **Limits:** 10 per minute and 40 per day per user (`middleware/aiRateLimit.js`).

### Teach-back: known gaps

- **Content is the bottleneck.** `teach_back_rubrics` holds 4 rubrics. Three are mini-topics of `api-dev-1` (DNS, TCP vs UDP, browsers vs API clients). The JWT Signature rubric is keyed `layer: "layer-6"`, which is not a real layer id (real ids look like `api-dev-6`), so it most likely never matches. Every other topic has no teach-back.
- **Not calibrated.** No human-graded reference answers. `docs/engineering/AI.md` says not to show numeric skill scores built on these rubrics yet.
- **Writes into `examHistory`.** Teach-back saves a pseudo exam result. A voice exam must not copy this, because it would double-count evidence (spec finding F4).
- **Bypasses the Groq gate.** Teach-back still calls Groq directly, outside the shared token budget the mentor uses (`docs/PILOT_STATUS.md`).
- **No on-demand entry.** Teach-back is only reachable right after an exam or through the chat hand-off. There is no "teach back a weak topic anytime" surface, and the mentor never offers it on its own.
- Not started: mastery decay and re-verification, a "needs review" state for low-confidence grades, rubric-version-aware history, teach-back mastery on public profiles.

### Voice exam: what exists

- **Spec:** `docs/product/VOICE_EXAM_SPEC.md` (2026-10-01). One spoken exam per layer, 2–3 follow-ups one at a time, concept-level 0/1/2 scoring, every credited concept backed by a quote that code checks against the transcript, two independent grader runs, 24h cooldown plus a mentor review of weak concepts before retry. Async V1; live conversation later on the same turn log.
- **Decisions already made (2026-10-01):** soft gate (MCQ still unlocks the next layer, the voice exam adds "verified"); Free tier gets at least 3 graded voice exams a month per account; every core prompt covers all must-have concepts; examiner TTS deferred and, if used, free (browser or self-hosted); human mentors and exemplar answers are a future idea, not V1.
- **Frontend prototype:** pre-exam, recording and transcribing screens, a state machine (`lib/examStates.js`) and a mock API (`api/voiceExamApi.js`) with the same signatures as the planned `/api/voice-exams` routes. The "Voice exam" button shows only on layer `api-dev-6` (`lib/pilotLayers.js`).
- **Backend:** none. No `voice_exam_*` collections, no audio upload (no `multer`), no server STT (`transcriptionService.js` throws), no grading.

### Voice review: clean-up candidate

`/voice-review` captures a browser transcript and sends it nowhere. `backend/modules/voice-review` answers 501 and is not mounted in `app.js`. Its code comments point to `docs/strategy/VISION.md`, which no longer exists. The spec recommends deleting the `voiceReview*` names in favour of `voiceExam*` so there is one concept, not two. If the "progress review" idea below goes ahead, that is the name to reuse.

### Enhanced idea: from one exam to a voice layer across the product

The spec covers one moment: a graded oral exam at the end of a layer. The same pipeline (transcript → rubric → verified quotes → weak spots) can serve several moments. Ranked by value for effort, all reusing the spec's turn log and grader.

1. **Weekly voice progress review (the original name).** Once a week, a 2–3 minute spoken check-in: "What did you learn this week? What's still fuzzy?" The mentor asks one follow-up on the weakest topic it already knows about. Output: an updated weak-spot list and a short progress note the learner keeps. Ungraded, so it needs no calibration and can ship before the exam. It could feed the weekly summary email being built (`constants/weeklySummary.js`).
2. **Defend your own code.** Instead of explaining a textbook concept, the learner explains a choice in their own capstone, challenge or team PR: "Why did you store the refresh token there?" Follow-ups are generated from their diff. This is the hardest thing to fake with a second-screen LLM, and it matches the existing capstone and team defenses, so it strengthens a moat already being built.
3. **Spaced re-verification.** Mastery decays. Weeks after a topic is marked solid, the mentor asks for a 60-second "explain it again". Pass keeps the topic verified; fail turns it back to `shaky` with no penalty. This gives "verified" a shelf life, which employers trust more than a one-time score.
4. **Audience switch.** The same concept explained twice: once to a junior developer, once to a non-technical manager. Explaining at two levels shows real understanding better than one long answer, and it practices a skill interviews test directly. Graded on the same rubric plus one "adapted to the audience" criterion.
5. **Confidence check.** Before the result, the learner rates how well they think they did (1–5). The gap between confidence and score is a strong learning signal: overconfident topics go to the top of the review list. Costs nothing.
6. **Explain in any language, graded on content.** STT and the grader handle many languages, and the spec already says accent and fluency are never graded. Letting learners explain in their first language removes the biggest fairness worry for non-native speakers and opens non-English markets. The English-only exam stays available for an "interview-ready in English" badge.
7. **Evidence clips on the profile.** With consent, 10–15 second clips of the learner's best explanations, linked to the verified concept. This fits the planned evidence profile (see "Evidence Profile and Employer Assessments" below): evidence instead of a bare number.

**What stays out:** a live, real-time voice tutor (per-minute cost and a new session architecture), the mentor speaking every reply, and any grading of accent, pace or confidence in the voice.

**Cheapest test of the whole direction:** before code, run the weekly progress review by hand with 5 pilot learners over a call, using a written rubric. If they come back for week two and the follow-ups surface weak spots the MCQ missed, the voice layer has earned a build.

### Decided plan (2026-11-01)

**One engine, three uses, in this order:**

| Order | Use | Why this order |
|---|---|---|
| 1 | Weekly voice review (2–3 min, ungraded) | No rubric or calibration needed; works from the weak spots the mentor already tracks; tests whether learners want to talk to it at all. |
| 2 | Graded voice exam on one layer (`api-dev-6`) | Per `VOICE_EXAM_SPEC.md`. The UI prototype exists; it needs the backend and one rubric. |
| 3 | Defend your own code (capstone or PR) | Hardest to fake, most valuable to employers; needs the engine working first. |

**What the learner explains: per topic and per layer, never per subtopic.** A layer has about 6 topics, and each topic string lists its subtopics after the dash (`docs/exam-prompts/`).

| Use | Unit | Length |
|---|---|---|
| Teach-back (practice, fixing weak spots) | One topic | 1–2 min + 1 follow-up |
| Voice exam (verified) | The whole layer in one answer | ≤5 min + 2–3 follow-ups |
| Weekly review | What they studied that week + their weak topics | 2–3 min + 1 follow-up |

Subtopics are never asked about directly. They become the grader's hidden checklist. This keeps learners from being bored, keeps rubric authoring to about 6 topics per layer (the layer exam reuses the topic rubrics), and matches how interviews work.

**How one topic is examined: two steps.**

1. **One open question, written in advance and stored.** The learner answers in their own words. The subtopics are never shown as a list, because that would give away the answer.
2. **Follow-ups on what they missed.** The grader checks the answer against the hidden checklist. Code picks the weakest must-have point; the LLM only phrases the question, limited to that topic's checklist; an authored fallback question is used if the wording fails the checks.

Example, topic "Password hashing — bcrypt, argon2, why salts matter":

- Opening question: "A user signs up with a password. Explain how your API should store it, and why."
- Hidden checklist:
  - hash, never plain text or encryption (solid: explains one-way; shallow: "we hash it")
  - bcrypt/argon2, and why not MD5/SHA (solid: slow on purpose; shallow: names bcrypt without a reason)
  - a unique salt per user and why (solid: stops rainbow tables and identical hashes; shallow: mentions salt)
  - cost factor (tunable slowness)
  - critical misconception: "encrypt it so we can decrypt it later" (automatic fail)
- Follow-up if salts were missed: "Two users pick the same password. What does your database look like, and is that a problem?"

**Authoring per topic:** 2–3 opening questions, a checklist of 3–5 points with solid and shallow levels, 1–2 critical misconceptions, and one fallback question per point. The AI drafts all of it from the topic text; a human reviews and publishes it (about 20–30 minutes per topic). Opening questions are never generated live, so every learner gets an equally hard question, cost stays low and the AI can't ask about something outside the rubric. Several versions per topic make sharing "the question" less useful.

**Hints:** practice only. After answering, "What did I miss?" shows the skipped checklist points. Graded exams never show hints.

**Audio: not kept by default.** Transcribe, then delete the audio right away. Keep the transcript (it's the evidence behind the grade and covers regrades). Store audio only for clips the learner opts into for their profile or certificate. The grader only ever sees text. Typing is always allowed. This replaces the spec's 30-day audio retention.

**Implementation shape:**

- Recording with `MediaRecorder`, uploaded to the server. Works in every browser, unlike the Web Speech API.
- Speech-to-text with Groq `whisper-large-v3-turbo`, with the layer glossary as a prompt (about $0.002 per 3-minute answer, list price from memory, re-verify).
- One module, `backend/modules/voice`, replacing the `voice-review` scaffold. One collection, `voice_sessions`, with `kind: weekly_review | exam | code_defense` and the spec's turn log (§4, §9).
- Never writes `examHistory`. Results go to weak spots (`source: "voice"`), `learnerMastery` and the mentor teaching log.
- All LLM calls go through `groqGate` with their own voice share, so voice can never starve the mentor. Per-user daily caps reuse `aiRateLimit.js`, plus a per-user monthly cost meter (about $1.50).

**Separate Groq key:** `GROQ_VOICE_API_KEY` (Groq console labels `vahoha-voice-prod` and `vahoha-voice-dev`), used only by the voice module. If it isn't set, voice falls back to `GROQ_API_KEY`. It's for cost tracking and a kill switch; it doesn't lower the price per call, and Groq rate limits are probably per organization, not per key. Set a spending limit or alert in the Groq console. Not read by any code yet; it must also be added on Render when voice ships.

**ElevenLabs: considered, deferred.** Our AI replies in text, so a premium voice adds cost (about $0.05–0.15 per exam per the spec) without better grading, and Groq Whisper already covers speech-to-text. Revisit only for a live spoken mock-interview mode for Pro users, where realism is the selling point, or for a one-off marketing demo.

### Why it stays frozen

- The MVP loop (roadmap, exams, mentor) is still being validated with pilot users. Voice is scope on top of an unproven loop.
- AI cost is the main margin risk (`docs/strategy/BUSINESS_MODEL.md`). The spec estimates about $0.01 per graded exam on an all-Groq stack and $0.08–0.09 on the recommended stack (prices from memory, re-verify), inside a soft sub-budget of about $1.50 per user per month.
- Grader fairness is the product-defining risk. A hard gate needs human calibration first (Cohen's κ ≥ 0.7 on a golden set).
- Rubric authoring is the long pole: about 2–3 hours per layer, so pilot one layer, then one track, not all 40 backend layers.

**Where it fits:** a Pro differentiator and the base for verified certificates, added beside the MCQ exam, never replacing it. Build further only once pilot data shows a healthy Layer 1 → Layer 2 return rate.

### Unfreeze checklist (cheapest first)

1. Fix the JWT rubric key (`layer-6` → the real layer id) so the existing slice works where it claims to.
2. Run the hand-run tests: the weekly progress review above, and an oral exam on one layer (a person plays examiner, using the spec's rubric shape).
3. Author the `api-dev-6` topic rubrics and opening questions in the two-step format above (spec Phase 0), then a text-only backend slice (Phase 1) behind an allow-list flag.
4. Route teach-back through the Groq gate.

### Open questions

- [x] ~~Sync or async?~~ Async for V1 (spec §4).
- [x] ~~Does a voice pass count like an MCQ pass for unlock?~~ Soft gate: MCQ unlocks, voice adds "verified" (spec Q1).
- [ ] Which paid tier gets full reports and certificates: Pro or a separate add-on? Billing exists (Polar, `featureGateService`) but nothing is gated yet.
- [x] ~~Audio retention?~~ Not kept by default; transcripts kept; clips opt-in (decided plan above). Still needed: consent screen and privacy-notice wording, including that Chrome's built-in dictation sends audio to Google.
- [x] ~~Explain per subtopic?~~ No: per topic for teach-back, per layer for the exam; subtopics are the hidden checklist.
- [ ] Typed fallback open to all, or accessibility-only? Pasting from an LLM is the obvious cheat (spec Q5).
- [ ] Is the weekly progress review free for everyone (it is cheap and ungraded), or part of Pro?
- [ ] Accessibility: must stay fully optional. Mic access, accents, non-native English speakers and people who prefer not to be recorded must never be blocked from progressing.

---

## Production Incident Scenarios (2026-10-04)

The learner has a working app, then an incident: "API response time went from 100ms to 4s." They inspect, reason, find the cause, fix it and explain it (observe → reproduce → hypothesise → gather evidence → test → fix → verify). Candidates: memory leak, race condition, database bottleneck, broken auth, failed deploy, cache invalidation, API timeout, queue failure, bad error handling. This is the later tier of scenario challenges (`docs/engineering/ROADMAP_BUILD_PLAN.md`, Loop strengthening), an extension of Coding Challenges and Capstones rather than a new subsystem. Open: curated sandbox projects versus injecting faults into the learner's own repo (experiment).

---

## Evidence Profile and Employer Assessments (2026-10-04)

**Evidence profile:** each skill (frontend, backend, databases, testing, system design) shown with the evidence behind it: evaluated challenges, capstones, defenses, scenarios. Never a bare number. Extends the planned public profiles and certificate `/verify` page. Depends on calibrated rubrics.

**Employer assessments:** same infrastructure, reversed: a company creates an assessment, a candidate builds, Vahoha evaluates, the company receives evidence. This is the Screening-as-a-Service idea above; it is not a current requirement and Vahoha is not a hiring platform.

---

## Other unsorted ideas

- [ ] Can users contribute posts that become official curriculum content?
- [ ] Peer review system for practical exam submissions?
- [ ] Cohort feature — go through a path with a group at the same time?
- [ ] Public API for roadmap data — let others build on top of Vahoha paths?
- [ ] ATS integration for the Company Portal (export verified profiles to Greenhouse, Lever, etc.)?
- [ ] Developer referral system — earn XP or subscription credit for referring a developer who converts to Pro?
