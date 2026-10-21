<!-- /founder:user-interviews · 2026-10-04 · input: Build Teams for Vahoha, interview self-taught backend developers 0-3 years who want mid-level -->

# Interview script: Vahoha core (2026-10-21)

Goal: learn how developers decide they are ready, what they pay for, and what happened at their last job step. Ask for stories, not opinions. Reuses `docs/strategy/OUTREACH_KIT.md` (DM scripts, payment ask). The Build Teams plan follows below.

## Questions (about 25 minutes)
1. What do you do now, and how long have you written code?
2. Walk me through how you learned over the last three months. What did you use?
3. What have you paid for to learn or to get a job? Was it worth it?
4. Tell me about the last time you finished something and later found you hadn't understood it. How did you find out?
5. How do you decide you are ready to move to the next topic?
6. Where are you in the job search or promotion? What happened in your last interview or review?
7. What was the hardest part of that: knowing what to learn, being good enough, or getting interviews?
8. When did you last get feedback on your code from another person? What did they say?
9. What have you tried to fix this that didn't work? Why did you stop?
10. If you could change one thing about how you learn, what would it be?
11. Who else do you know in the same spot?
12. Is there anything you expected me to ask that I didn't?

Keep it neutral: no "would you use...", no feature names before question 12. The pitch and the payment ask come only after the questions (see the kit).

## Log template (one per interview)
```
# | date | source | role / years
Their words on the pain:
Paid for before (what, how much):
Last interview/review outcome:
Hardest part (Q7):
Tried and dropped (Q9):
Feedback on code (Q8):
Referral offered (Y/N):
Watched Layer 1 test, hesitations:
"Very disappointed" if gone? (very / somewhat / not):
Paid $15? (Y/N):
```
Roll the rows up in the tracker in `OUTREACH_KIT.md`. Red flags: "sounds cool", feature ideas, no story.

---


Assumption: none of these answers are known yet. Personas in `persona-gen.md` are hypotheses.

# Interview plan: Build Teams

## 1. Objectives (riskiest assumptions from validate-idea first)

| # | Hypothesis | Confirmed looks like | Rejected looks like |
|---|---|---|---|
| 1 | Juniors have tried and failed to get shared-codebase experience | They describe a specific recent attempt (open source PR, side project with friends) that stalled | "I haven't looked into it" or "solo projects are enough" |
| 2 | They would commit 6 to 8 hours a week for 6 weeks with strangers | They have a real weekly slot and finished a long project before | Every past group project died, and they blame time |
| 3 | A reviewed and defended record changes what employers do | They can name a rejection or interview where "no team experience" or "no proof" came up | They say hiring turns on LeetCode or referrals only |

## 2. Screening
- Must have: backend developer (Node, Python, Java, Go or similar), 0 to 3 years, self-taught or bootcamp, built at least one project with a database and an API, wants a mid-level role within about 12 months.
- Nice to have: applied to jobs in the last 6 months; has used GitHub PRs; works full time.
- Exclude: senior developers; front-end-only developers; friends and family; anyone who has already been pitched Vahoha.
- Where: r/learnprogramming and r/cscareerquestions (ask for 25 minutes, no pitch), dev Discords, LinkedIn search "junior backend developer" plus "open to work", Vahoha blog readers.
- Incentive: a $15 gift card or a free capstone review. Estimate: 8 people x $15 = $120.

## 3. Script (25 minutes)

**Opening (2 min)** Say: "Thanks for doing this. I am not selling anything. I am trying to understand how developers get from junior to mid-level. Bad news is more useful to me than good news, so please be blunt. Can I record this for my notes only?"

**Warm-up (3 min)**
1. "What do you do now, and how long have you been writing backend code?"
2. "What did you build most recently?"

**Problem (10 min)**
3. "Tell me about the last time you applied for a role above entry level. What happened?" Follow up: "What did they say or ask that you could not answer?"
4. "Tell me about the last time you worked on code with other people. How did it go?" Follow up: "Who reviewed your code?"
5. "When did you last try to join or start a project with other developers? What happened to it?" Follow up: "Why did it stop?"
6. "What have you done in the last 3 months to get closer to mid-level?" Follow up: "What did it cost in time or money?"
7. "How do you know today whether your code is good?" Follow up: "When was the last time someone told you it was not?"

**Solution (5 min)**
8. "If you could get team experience tomorrow, how would you try to get it?"
9. "What would make you quit a team project halfway?"
10. "What would a hiring manager need to see to believe you work well in a team?"

**Reaction (5 min)** Say: "Here is a concept. Four developers who passed the same backend capstone build one small project for six weeks. Each person's work is reviewed and they have to explain their own code. You get a page showing that record." Ask: "What is the first thing that worries you?" "Who would you not want on your team?" "When would you start, and what would you need to drop?" "What would you do if a teammate disappeared in week 3?"

**Closing (2 min)** Ask: "Who else is trying to move up from junior who I should talk to?" Commitment test: "Would you do a 20-minute test of this with me this week, or share your GitHub so I can build you a sample record?" Say: "Thank you. I will tell you what I learn."

## 4. Analysis
Track one row per interview.

| Interview | Recent failed attempt at team experience (Y/N) | Weekly hours free | Named a hiring obstacle (Y/N) | Took commitment step (Y/N) |
|---|---|---|---|---|

- Real pattern: 4 of 8 show the same behavior (not the same opinion).
- Build: at least 5 of 8 name a recent failed attempt and 4 take the commitment step.
- Pivot: they describe the problem but would not commit hours, so try the review exchange.
- Kill: fewer than 3 of 8 describe a recent attempt or hiring obstacle.

## 5. Red flags
Polite: "sounds cool," "I would definitely join," feature suggestions, no story about the last time.
Real: a specific story told with feeling, something already tried, "when can I start," an offered introduction.
