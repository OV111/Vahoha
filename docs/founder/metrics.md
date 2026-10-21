# Metrics: Vahoha

Pilot stage, zero paying users. Measure the few things that say whether people come back and whether anyone pays. Events are recorded server-side (`backend/services/eventService.js`); read them at `GET /api/admin/funnel?days=30` after `npm run admin:grant -- <email>`.

## North-star metric
**Share of new signups who return within 7 days and start a second layer.** Chosen in `docs/PILOT_STATUS.md`. It shows the loop (study, test, come back) works, which comes before payment. TODO: set a target after the first 15 users.

## 5 key metrics

| # | Metric | Definition | Source | Target |
|---|---|---|---|---|
| 1 | Activation | Signups who pick a path and start a layer test | `signup`, `path_selected`, `exam_started` | TODO: set after 15 users |
| 2 | First test pass rate | Share of first attempts that pass (pass mark 80) | `exam_submitted` with `passed` | TODO. Very low means bad question banks; very high means too easy |
| 3 | Week-1 return | Signups with an `active_day` on a later day within 7 days | `active_day` | TODO |
| 4 | Payment signal | Interviewees who pay the $15 test | Polar | At least 3 of 15 (`OUTREACH_KIT.md`) |
| 5 | Proof produced | Users who solve a challenge or pass a capstone | `challenge_solved`, `capstone_passed` | TODO. Zero capstone passers blocks Build Teams |

Also ask each interviewee "How would you feel if you couldn't use this anymore?" Aim for 40%+ "very disappointed" (`OUTREACH_KIT.md`).

## Caveats
- `active_day` means "opened the app" (login or token refresh), not "studied".
- The funnel loads the whole cohort in memory. Fine for hundreds of users, not thousands.
- With 13 accounts, percentages mean little. Read individual journeys.
- Don't track revenue, churn or CAC until there are payers.

## Weekly check (10 minutes)
1. Pull the 30-day funnel. Where do people stop?
2. Read 3 user journeys end to end.
3. Update the interview tracker and the payment count.
4. Write one decision for next week.
