# Vahoha (formerly DevsWebs) — Vision

> Living document. Business/product framing only — build status, phase plans, and architecture detail live in `docs/engineering/ROADMAP_BUILD_PLAN.md`, `docs/engineering/ARCHITECTURE.md`, `docs/strategy/BUSINESS_MODEL.md`, and `docs/strategy/STARTUP_ADVISOR_ANALYSIS.md`.
> Last updated: 2026-10-11. Positioning sharpened by the competitor matrix (`docs/founder/competitor-matrix.md`): the difference is defended, reviewed evidence, not gating or an AI tutor. Traction, XP and Build Teams updated to match the code.
> Earlier (2026-10-02): corrected against the code and `docs/strategy/STARTUP_CRITIQUE_2026-10.md`; exam-integrity and "no competitor" claims were overstated.

---

## 1. One-liner

Vahoha is a learning platform for developers who want proof, not a completion badge: roadmaps you *earn* through graded exams, a mentor that knows your weak spots, and a capstone and team project you have to **defend**, which become a public record of what you can actually do.

**Positioning in one line:** "You finished the courses. Now prove you can build and defend it." Roadmaps, AI tutors and certificates are table stakes in this market (roadmap.sh, Boot.dev, Codecademy all have them). What no competitor found in October 2026 offers is a learner defending their own code under time limits, plus team evidence from merged PRs (`docs/founder/competitor-matrix.md`).

**The outcome we are aiming at:** helping developers get past the entry-level plateau, to mid-level and to the jobs that come with it. Junior skills (syntax, CRUD, concepts) are easy to find content for. Mid-level skills (design, testing, performance, security, debugging under pressure, defending decisions) are the ones nobody checks, and the ones this platform exists to train and prove. This is the goal, not a promise: nothing here claims to get anyone hired until real learners have done it.

---

## 2. Problem

Developers learning a new stack (or breaking into one) bounce between YouTube, Stack Overflow, Udemy, and roadmap.sh. Every one of these has the same failure mode: nothing checks whether you actually understood what you consumed. You can "complete" a course, look at a roadmap, or watch a tutorial series and still not be able to do the job — and nobody, including you, finds out until an interview.

Two groups feel this acutely:

- **Self-taught / early-career developers** trying to prove they're job-ready, with no objective signal to point to besides "I built some projects."
- **Career switchers and bootcamp grads** who followed a curriculum but have no verified record of what they actually retained.

Today they solve it by grinding LeetCode (tests algorithms, not the job), collecting free certificates from freeCodeCamp (no verification of understanding), or paying for a bootcamp (expensive, fixed pace, no personalized follow-up).

---

## 3. Solution

Vahoha turns a roadmap into a gate, not a map. Every layer is locked until you pass a server-graded exam on it; failing surfaces your specific weak spots instead of a generic score. A per-user AI mentor sits underneath the whole loop — it knows your active path, your exam history, and your weak spots, and answers Socratically (guides you to the answer, doesn't hand it over) instead of acting like a generic chatbot with no memory of your journey.

The mechanism, end to end:

```
Pick a path → study a layer (curated posts/library) → take the layer exam
   → PASS → next layer unlocks
   → FAIL → weak spots recorded → ask the AI mentor → targeted review → retry
```

The AI mentor is not a bolt-on chat widget — it has live tools into your actual progress, exam history, and weak spots, so its answers are grounded in what you specifically struggled with, not a canned response to your question text alone.

### The loop we are growing toward

The gated roadmap stays the spine. The direction is to make each step more about doing than reading:

```
Learn → Build → Break → Fix → Get evaluated → Defend your decisions
   → Improve → Prove it → Take the next, harder challenge
```

Much of this already exists: exams, Coding Challenges, Capstone repository review, and the Capstone technical defense (questions about your own code, answered under a timer). What is added over time is *Break* (realistic failure scenarios), *Fix* rounds after a review, and a weakness → targeted challenge → reassessment loop on the existing mastery data. Progress should come from evidence of ability (challenges, projects, defense answers, repeated performance), kept distinct from content completion. Status per item (MVP / V2 / future / experiment) is in `docs/engineering/ROADMAP_BUILD_PLAN.md`. None of this changes the pilot plan in section 10.

### The learner journey, in short

1. **Roadmap**: pick a track and see what to learn.
2. **AI mentor**: guides you, knowing where you are and where you are weak.
3. **Coding challenges**: small problems that build skill.
4. **Exams**: gate each layer and feed mastery.
5. **Capstone**: a bigger project, with repository review and a technical defense.
6. **Build Teams**: build a real project with others; merged PRs become public evidence.
7. **XP and profile**: effort shows up as XP; proof shows up as certificates and evidence.
8. **Readiness**: capstone and team results are scored into five areas (Build, Judgment, Collaboration, Debug & Ops, Ownership), from "entry" to "mid-ready". Private, on the progress page.
9. **Recruiter view**: an opt-in public scorecard of verified results.

Since 2026-10-10 these are connected, not separate features: capstone and team results feed readiness, the mentor sees team work, and the funnel follows a learner from first exam to team defense. Stages 6-9 are built but not yet run end to end with real users.

---

## 4. Target users

**Primary persona:** self-taught or early-career developers (roughly 0–3 years experience) who are actively upskilling and want something they can point to that isn't just "I read some docs" — they're motivated, but they lack an accountability structure and an honest signal of their own gaps.

**Early adopters:** developers already in the habit of using roadmap.sh, freeCodeCamp, or LeetCode to structure their own learning — they've already proven they'll self-direct their study, they just don't have a tool that verifies the outcome. Community-first channels (Reddit's r/learnprogramming, r/cscareerquestions, dev Discord/Twitter) are the natural first audience.

---

## 5. Why now

- **LLMs make a real 1:1 mentor economically possible for the first time.** A tool-use agent with live access to a learner's actual data (not a static prompt) was not affordable or buildable as a solo project even two years ago; API pricing and tool-calling maturity make it viable now.
- **The credential trust problem is getting worse, not better.** As AI makes it trivially easy to generate a polished resume, project, or cover letter, the market signal that actually differentiates candidates shifts toward *verified, hard-to-fake proof of understanding* — which is what a graded exam record can provide and a GitHub repo or a resume bullet does not. **Caveat (2026-10-02):** today's exam is multiple choice, which an LLM can answer, and it has no proctoring, so it works as practice and self-diagnosis, not as proof. The strongest proof that exists today is the capstone defense: timed, typed questions about the learner's own repository, graded against a rubric. It is AI-reviewed and not proctored, so the honest word is "defended", never "verified" or "hard to fake" (`docs/product/EXAM_INTEGRITY.md`). The spoken teach-back exam (`docs/product/VOICE_EXAM_SPEC.md`) is the planned stronger credential.
- **Existing free platforms (freeCodeCamp, The Odin Project) have enormous audiences but no accountability layer**, leaving room for a product that adds verification on top of a familiar "structured path" mental model. **The lane is narrower than it looked in September:** roadmap.sh sells AI courses and quizzes, and Boot.dev sells gamified backend learning with an AI tutor and is profitable (see section 9). The open lane is proof, not teaching.

---

## 6. Unique advantage (moat)

**Honest assessment (2026-10-11): there is no moat yet.** What exists is a head start and a few candidates for one. The competitor matrix estimates the head start per gap: defended own-code evidence about 6 to 12 months, team evidence 12+ months (hard because running teams is operational, not code), a results-driven mentor only 3 to 6 months (easy to copy).

- **Gated progression is copyable.** It is a design choice, not a technology. roadmap.sh or Boot.dev could add stricter gating in a sprint. The reasoning that they "won't retrofit it" is a guess, not evidence.
- **The mentor grounded in the learner's state** (live tools into progress, exam history, weak spots, mastery) took real work, but it is the same tool-use loop any competitor with an LLM and a progress table can build.
- **The verified-progression data** is a real moat only with thousands of graded learners and a credential nobody can fake. Today there are zero users and the multiple-choice exam can be faked.
- **The one asset that compounds is calibrated rubrics:** hand-written, human-validated grading criteria for spoken teach-back, checked against human graders. Calibration takes expert time that big players are slow to spend per topic. It has not been started beyond a spec and four sample rubrics.
- **Defended evidence and team evidence** are the candidates no competitor covers today. They become a moat only if employers value the evidence page, which is untested (experiment 3 in `docs/founder/validate-idea.md`).
- **Distribution is the real moat in this market,** and roadmap.sh and freeCodeCamp already own it. roadmap.sh is better treated as a channel than a rival: its users finish roadmaps with nothing to show.

## 7. Business model

Freemium SaaS, expanding later into a two-sided marketplace (developers prove skills → employers pay to find them who already have).

| Tier | Price | For | Includes |
|---|---|---|---|
| Free | $0 | Anyone starting out | Community, first roadmap layers, basic progress |
| Pro | $15/month | Developers actively learning | AI mentor, full roadmap, certificates |
| Teams | $60/seat/month (3-seat minimum) | Companies onboarding developers | Progress tracking, reports, bulk certs |
| Employer Access *(future)* | $299/month | Hiring managers/recruiters | Search verified profiles + progression data |
| Featured Company *(future)* | $599/month | Actively hiring companies | Above + visibility to developers on-platform |

Pricing logic: the original reasoning ("below Cursor and Copilot, covers Claude API cost") no longer holds. The mentor runs on Groq `gpt-oss-120b`, a heavy user costs roughly $1–2/month, so price is a **willingness-to-pay question, not a cost question**, and the anchors are Codecademy Plus $14.99 / Pro $19.99 a month, Boot.dev about $33 a month, and roadmap.sh's Team plan $10 per seat (checked 2026-10-11, sources in `docs/founder/competitor-matrix.md`). $15 is a hypothesis to test with a $29 early-access payment (`docs/strategy/OUTREACH_KIT.md`). Billing exists (Polar, sandbox-verified) but is switched off: everything is free during the pilot. Unit economics live in `docs/strategy/BUSINESS_MODEL.md`.

The employer-facing tiers are Phase 13+ and explicitly gated on reaching 500+ verified developer profiles first — there's no employer product worth selling without a real pool of verified supply.

---

## 8. Market

TODO: no sized TAM/SAM/SOM exists yet for this document — do you want me to build one from public data (e.g. number of self-taught/bootcamp developers per year, freeCodeCamp/roadmap.sh user counts as reference points), or is there a number you already have in mind?

**First niche to win:** one path, fully proven, before anything else. The plan (see `docs/engineering/ROADMAP_BUILD_PLAN.md`) is to validate the entire loop — roadmap, exam engine, AI mentor — on the **Backend Developer** path only, with real users, before seeding the other authored categories (172 tracks across 15 categories: Full Stack, Backend, AI/ML, DevOps, Mobile, GameDev, QA, Data Science, Database, Cloud, Cybersecurity, Blockchain, Web3, Quantum, Languages). No path is listed as coming soon any more: Frontend Developer, Data Structures & Algorithms, System Design and AI Agents Engineer were all authored on 2026-10-16 (the one that best matches the mid-level promise). Narrow first, wide once the mechanism is proven; thin tracks may be hidden rather than widened.

---

## 9. Competitors

| Competitor | What they do | How Vahoha differs |
|---|---|---|
| roadmap.sh | Community roadmaps (355K GitHub stars), AI courses, quizzes, a $10/seat Team plan; ships monthly | Progress is self-marked; nothing is defended. Bigger and free; better as a channel than a rival |
| Boot.dev | Gamified backend courses with an AI tutor (Boots), about $33/month; profitable, ships monthly | **Highest threat:** same buyer, and a "defend your project" mode would be a small step for them. Our edge: defended capstone and team evidence |
| Codecademy (Skillsoft) | Career paths, professional certifications from passing path exams, interview simulator, job-readiness checker; $14.99-$19.99/month | Closest to "verified", but proof is a completion certificate, not a defended project |
| Exercism, Frontend Mentor, Hyperskill | Free practice with human mentors; real designs with AI review; JetBrains project tracks with certification | Narrower (language practice, frontend only, IDE-based); none publish defended or team evidence |
| HackerRank (AI interviewer), CodeSignal | AI-assisted, rubric-graded developer assessment, sold to employers | They serve the employer side; a learner-side practice and verification product is adjacent, and they could extend into it |
| freeCodeCamp | Free curriculum + certificates, 10M+ users | Their certificate is completion-based; ours is a verified progression record backed by graded exams and per-layer weak-spot data |
| LeetCode | Algorithm grinding, disconnected from any curriculum | Ours ties problems (and exams) to the specific layer you're actively learning, not generic DSA |
| Generic AI chatbots (ChatGPT, Gemini) | Stateless Q&A, no memory of your learning journey | Our mentor has live tools into your actual progress, exam history, and weak spots — it's grounded in your data, not just the current prompt |
| Bootcamps (e.g. general coding bootcamps) | Paid, fixed-pace, cohort-based, expensive | Self-paced, far cheaper, and the "verified outcome" bootcamps sell as their pitch is something we can generate continuously per-user instead of per-cohort |

Note: freeCodeCamp/The Odin Project are lower threat because they are passive content with no gating, but they anchor willingness to pay at zero. Boot.dev is the real head-to-head competitor; Codecademy and roadmap.sh are medium threats. Full matrix with sources: `docs/founder/competitor-matrix.md`.

---

## 10. Traction & milestones

**What exists now (as of 2026-10-11):**
- The full learning loop is built and mounted: roadmap with server-side progress, exam engine (server-graded, answer keys server-side, shuffled and unseen-first questions, cooldown), AI mentor with tools into learner state, mastery map, teach-back (one-topic slice)
- Community platform (blogs, profiles, chat, auth); blog posts can be tagged to roadmap layers and appear in the layer drawer
- Coding Arena with sandboxed grading and community proposals
- Capstone: AI repository review, timed defense, public verifiable certificate
- Build Teams MVP: team record, merged-PR sync from GitHub, per-member defense, peer ratings, public evidence page (never run end to end)
- Connected layer: readiness (5 areas) on the progress page, mentor aware of team work, opt-in recruiter scorecard, XP ledger for every source
- Billing built on Polar and verified in sandbox; **not enforced**, everything is free
- Pilot analytics: 14 server-side event types and an admin funnel that follows a learner from signup to team defense
- 176 tracks in 16 categories (Frontend Developer now sits under Full Stack; it, Data Structures & Algorithms, System Design and AI Agents Engineer were authored 2026-10-16; no tracks are coming soon); exam-bank generator built, but banks still have to be seeded and hand-checked for the first track
- **Zero real users, zero revenue, zero interviews with target users**

**Next 90 days:** no new features. Hand-seed and check Backend Layers 1–3, run 15 interviews with self-taught backend developers, ask each for a $29 early-access payment, run the Wizard-of-Oz oral exam by hand, and read the funnel weekly. Day-60 gate and kill criteria are in `docs/strategy/STARTUP_REVIEW_2026-10.md` §8–9 and `docs/strategy/OUTREACH_KIT.md`.

**If the tests pass:** widen to 50 users on one path, then decide between B2C and instructor-led cohorts (bootcamps and universities) from the data. **If they fail:** treat the project as a portfolio piece; that outcome should be agreed before the experiment starts.

Build status lives in `docs/PILOT_STATUS.md` and `docs/engineering/ROADMAP_BUILD_PLAN.md`.

---

## 11. Metrics

The few numbers that actually define success, pulled from the unit-economics model in `docs/strategy/BUSINESS_MODEL.md`. The first one is measured by the pilot funnel (`GET /api/admin/funnel`); the rest need paying users and are unmeasured:

- **Layer 1 → Layer 2 completion rate** — the core product-health signal; if this is low, the loop isn't working regardless of anything else.
- **MRR growth rate** — target >15%/month once paid tiers are live; below 10% is a warning sign.
- **Monthly churn** — target <5%; 5–8% is a watch condition, >8% is critical.
- **AI cost per paying user** — about $1–2/month for a heavy user on Groq (estimate, from third-party rate data); alarm at ~$3. A looping tool-use bug can still spike one session.
- **CAC / LTV** — target CAC <$30, LTV >$150 (at $15/mo and 5% churn, LTV ≈ $300).

---

## 12. Long-term vision

Three to five years out, Vahoha is the verification layer between "I learned something" and "I can prove it" for developers — the platform recruiters trust the way they trust a real transcript, because every credential on it is backed by a graded exam and a mentor-observed learning history, not a self-reported claim.

That verified population is what unlocks the second half of the business: an employer-facing marketplace (search, screen, and hire against real verified progression data), screening-as-a-service for companies who want to test their own candidates through the same exam engine, and eventually per-seat licensing to bootcamps and universities who want a credible, data-backed outcomes story for their own students. All of it is downstream of one thing staying true: the credential has to mean something no one can fake. That's the whole bet.

---

## XP and the voice exam (ideas, not built)

Short versions of `docs/product/XP_SYSTEM.md` and `docs/product/VOICE_EXAM_SPEC.md`. Both stay frozen until pilot data says otherwise.

**XP.** Since 2026-10-10 every source goes through one ledger (`awardXp`, once per user and source): 50 XP for a first layer-exam pass (+25 at 90%+), each challenge's own XP on its first solve, 300 for a capstone, 300 for the first passed defense on a team. Hints still spend XP. Everything beyond that stays frozen. One rule governs every idea: **XP measures effort, never proof.** It can't unlock layers, skip exams, buy attempts or be bought with money, and mastery and verified results stay a separate number. Levels, XP decay, XP in mentor answers and an XP headline on public profiles are rejected. Streaks are the remaining candidate, and only if the pilot shows people don't return for Layer 2. Boot.dev already sells XP in this niche, so it is not a differentiator.

**Voice exam.** A spoken "teach-back" exam per layer: the learner explains the layer aloud, the examiner asks 2-3 one-at-a-time follow-ups, and the answer is graded against a hand-written rubric of concepts. Each credited concept must cite a quote that really appears in the learner's transcript, two independent grader runs are compared, and the app, not the model, decides pass/fail. Accent, fluency and pace are never graded. A soft gate in V1: the multiple-choice exam still unlocks the next layer, and the voice exam adds a "verified" status. A failed attempt feeds the mentor's weak spots and needs a 24-hour wait plus a mentor review before the retry. Build order starts text-only, then adds audio. Backend path first, one layer first. Not started; the biggest cost is authoring the rubrics, and no hard gate before human calibration (Cohen's kappa of 0.7 or more).

---

## Notes & ideas (not committed, not scoped)

**Build Teams (MVP built 2026-10-04, never run).** The idea below is now an MVP (see section 10); the open question is operational: can a hand-run team of strangers stay active for 6 weeks. Developers who share the same aim (for example "backend, mid-level in six months") are grouped, build a real production-grade project together, and some teams might go on to start a company. Only learners who passed a track's capstone would join, so every member has a verified baseline, and the platform already knows each member's strengths and gaps for matching. The startup is a possible outcome, not a feature, and the legal side (equity, IP) is out of scope. Validate with one hand-run team before any further product work. Details in `docs/product/FUTURE_IDEAS.md`.

**Onboarding (thinking, not scoped).** A brand-new user lands in a platform with many features and has no obvious first step. Onboarding exists to take a new user to a first win (read a layer, pass its exam, ask the mentor) and nothing wider, because the number that matters is whether people come back and start a second layer. It should stay small and be judged by the pilot funnel. Before building any of it, watch a few real people sign up. It also depends on two pilot blockers: real email sending and a seeded, hand-checked first exam.

**Recruiter filter (long-term).** A filtered list of developers for recruiters, ranked by verified results (exam scores, capstone and certificate, defense score, team evidence), with XP only as a small secondary number: XP measures effort, not proof. Needs real users first.

**Evidence profile and employer assessments (long-term).** A profile that shows each skill together with the evidence behind it, and later companies running their own build-and-evaluate assessments on the same engine. Both are future extensions of section 12, not current requirements.

Longer-form speculative concepts — Collaborative Build Teams, Sponsored Real Projects, Screening-as-a-Service, University/Bootcamp Licensing, Voice AI Teach-Back — are written up in detail in `docs/product/FUTURE_IDEAS.md`. None of them are in scope until the MVP loop above is validated with real users; they're kept there so the idea isn't lost, not because they're next.
