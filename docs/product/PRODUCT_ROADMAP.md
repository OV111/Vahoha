# Product roadmap (Now / Next / Later)

Rule from `CLAUDE.md`: fix and test what exists, deploy it, find users. No new big features before pilot data. Owners and detail for "Now" are in `docs/PILOT_STATUS.md`.

## Now: make the pilot possible
- One pilot track with Layers 1-3 banks re-seeded and every answer key hand-checked. TODO: confirm the track (backend, MERN or frontend).
- Real email sending (Resend, verified vahoha.com).
- Production env: GitHub OAuth app, `GITHUB_TOKEN`, Redis, Groq paid tier.
- Fix or hide the 25 challenges that fail in the production sandbox.
- Create the $15 product in Polar; run the full loop on production with a fresh account.
- Run Build Teams once end to end on a test repo.

## Next: after the first 15 interviews
- Fix the top 3 problems seen in demos.
- Save lesson progress server-side (lesson stage 3 in `LEARNING_SYSTEM.md`).
- More MERN lessons and labs for layers 1-3 (today: 2 lessons, 1 lab).
- Enforce Free/Pro gates only if payers appear; make the mentor limit plan-aware.
- Open security items M2, M4, M5, M7.
- Backend repository-layer refactor (A1-A7), after deploy.

## Later: only if the pilot supports it
- Voice exam backend (`VOICE_EXAM_SPEC.md`), after a hand-run oral exam test.
- Book Digest (`docs/ideas/book-digest/README.md`).
- Verification practice ideas (`VERIFICATION_PRACTICE_IDEAS.md`), more XP changes (`XP_SYSTEM.md`).
- Blog SEO prerender, more tracks and capstones, employer-side features, sponsored projects (`FUTURE_IDEAS.md`).

## Not doing
Webcam proctoring (ruled out), XP that unlocks layers or buys retries, new paths or awards before data.
