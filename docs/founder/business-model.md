# Business model: Vahoha

Status 2026-10-21: no revenue, no paying users, billing built but inert. Everything below is a hypothesis until the $15 test (`docs/strategy/OUTREACH_KIT.md`) says otherwise. Full detail: `docs/strategy/BUSINESS_MODEL.md` (partly ambitious, read its 2026-10-02 notes first).

## Who pays
The developer, not an employer. Employers are a later, unproven second side (`validate-idea.md` assumption 3).

## Revenue model

| Stream | Price | Status | Evidence it works |
|---|---|---|---|
| Free tier | $0 | Live in beta | Acquisition only |
| Pro, individual | $15/month (hypothesis) | Built on Polar, not enforced | None. Zero payers so far |
| Early-access test | $15 for 3 months, refundable | Needs the product made in Polar (`PILOT_STATUS.md` item 8) | This is the test |
| Capstone certificate / evidence page | Inside Pro | Gate exists in code (`canAccess`), inert | None |
| Recruiter access | Not priced | Opt-in scorecard built, closed to recruiters | None. Don't price yet |
| Teams (companies), Employer Access, sponsored Build Team projects | Old docs say $60/seat, $159/month, $2-5K per project | Not built | None. Ignore until Pro has payers |

## Pricing ideas to test
- **$15/month** as written. Compare Boot.dev $33/month, Codecademy Plus $14.99, roadmap.sh about $10 (`competitor-matrix.md`; roadmap.sh price TODO: confirm).
- **$5-9 or regional pricing.** The audience is often outside high-income countries (personas Mariam, Daniel). AI cost no longer forces $15.
- **One-off pass per capstone/defense** instead of a subscription. Users who get hired cancel anyway (`STARTUP_CRITIQUE_2026-10.md` risk 5), so a per-outcome price may fit better.
- **Free first two layers, paywall at layer 3** (planned, not enforced anywhere).
- Don't build several price points before there are payers.

## Costs

| Item | Monthly | Notes |
|---|---|---|
| Groq inference | $0 on free tier; about $1-2 per heavy user on paid (estimate) | Rates from a third-party summary. TODO: confirm on groq.com. Free tier already caused 413 errors on capstone review; paid tier needed before the pilot |
| Hosting (Render, Vercel) | $0-7+ | Render free sleeps when idle |
| MongoDB Atlas | $0-57 | Free tier covers the pilot |
| Redis | $15-30 | Required for queues and auth rate limits |
| Email (Resend) | TODO: confirm | Needs a verified vahoha.com domain |
| Domain and misc | about $20 | |
| Polar fee | TODO: confirm | Higher than Stripe's 2.9% + $0.30, as merchant of record |

**Fixed total before users: about $100-160/month** (`docs/strategy/BUSINESS_MODEL.md`).

### AI cost per user (what the code limits)
| Feature | Cap in code | Cost to measure |
|---|---|---|
| Mentor | 30 messages/day, 20-turn window | Tokens per message |
| Teach-back | 40/day, 10/min | Groq Whisper about $0.04 per audio hour plus grading tokens |
| Capstone review + defense | 3 attempts | Review and grading `usage` is stored in the DB |
| Exams | None (fixed question bank, no AI per attempt) | $0 |

TODO: price one real mentor day and one capstone review from the stored `usage` fields, then compare with $15. Until then, the worst case of about $1.50 per Pro user is an estimate.

## Unit economics, honest version
At $15 and a worst-case $1.50 AI cost, margin is not the problem. Acquiring and keeping payers is. At 100 Pro users the revenue is $1,500/month against about $150 fixed cost, so the model works only if the first payers appear.

## Later ideas
- Book Digest as a Pro feature (`docs/ideas/book-digest/README.md`). Its own doc keeps pricing out of scope; its cost is an offline LLM pass per book, not per user.
