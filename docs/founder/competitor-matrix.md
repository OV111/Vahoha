<!-- /founder:competitor-matrix · 2026-10-11 · input: Vahoha: earned (not self-reported) developer learning: exam-gated roadmaps, teach-back, mastery, AI mentor with learner context, graded challenges, AI-reviewed capstone + timed defense + public certificate, Build Teams (merged PRs to public evidence), opt-in recruiter scorecard; free beta, Pro via Polar, $15 one-off test; compare roadmap.sh, Codecademy, Exercism, Frontend Mentor, Boot.dev and others -->

# Competitor matrix: Vahoha

Assumption: target customer is the persona from `persona-gen.md`: a self-taught or junior backend developer, 0 to 3 years in, trying to reach mid-level (Daniel).
Assumption: all Vahoha features are built but none has run with real users, so the Vahoha column says "Building".
Prices checked 2026-10-11 unless noted. Boot.dev's own page showed regional prices (Armenian dram), so its USD figure comes from a directory.

## 1. Market landscape

| Competitor | Founded / funding | Pricing (checked 2026-10-11) | Segment | Differentiator |
|---|---|---|---|---|
| [roadmap.sh](https://roadmap.sh) | Kamran Ahmed, full time; open-core project, 355K GitHub stars ([about](https://roadmap.sh/about)). Funding: Not found | Free tier; Pro price Not found on page; Team $10/seat/month billed yearly, 3 seats minimum ([premium](https://roadmap.sh/premium)) | Consumer, small teams | The standard, community-made developer roadmaps, now with AI courses, quizzes and a learning companion |
| [Boot.dev](https://www.boot.dev) | Lane Wagner. Mostly bootstrapped; one source says a $330K angel round in 2022, another says $0 raised ([sources disagree](https://app.dealroom.co/companies/bootdev), [Latka](https://getlatka.com/companies/boot.dev)). About $110K net monthly revenue in late 2023 ([podcast](https://startupsfortherestofus.com/episodes/episode-688-growing-boot-dev-from-6k-to-110k-in-monthly-revenue-in-15-months)) | $33/month or $399/year, checked 2026-10-08 by a [directory](https://www.techinterview.org/bootcamp_directory/p/boot-dev/); official [pricing page](https://www.boot.dev/pricing) shows regional prices | Consumer | Gamified backend courses with an AI tutor (Boots) |
| [Codecademy](https://www.codecademy.com) | Zach Sims. Skillsoft agreed to buy it for about $525M in cash and stock, Dec 2021 ([Business Wire](https://www.businesswire.com/news/home/20211221005804/en)) | Basic free; Plus $14.99/month or $11.99/month yearly; Pro $19.99/month or $15.99/month yearly ([pricing](https://www.codecademy.com/pricing)) | Consumer, enterprise via Skillsoft | Career paths with professional certifications, interview simulator and a job-readiness checker |
| [Exercism](https://exercism.org) | UK not-for-profit, no shareholders. Reported funding strain in 2024: about $7,500/month in donations ([Gigazine](https://gigazine.net/gsc_news/en/20240909-exercism-no-money-in-the-bank)) | Free; Insiders is a donation tier ([insiders](https://exercism.org/insiders)) | Consumer | Free language practice with human mentors |
| [Frontend Mentor](https://www.frontendmentor.io) | Matt Studdert, started 2018 ([blog](https://www.frontendmentor.io/guides/welcome-to-frontend-mentor)); CB Insights lists TinySeed as an investor ([CB Insights](https://www.cbinsights.com/company/frontend-mentor)) | Pro price Not found on page; monthly plan limits premium challenges to 2/month, yearly unlimited ([pro](https://www.frontendmentor.io/pro)) | Consumer, teams | Real designs to build, with AI code review and community feedback |
| [Hyperskill](https://hyperskill.org) | JetBrains Academy ([pricing](https://hyperskill.org/pricing)). Funding: owned by JetBrains | Premium €49.90/month or €399/year ([pricing](https://hyperskill.org/pricing)) | Consumer | Project-based tracks in JetBrains IDEs, with certification and an AI assistant |
| [CodeSignal](https://codesignal.com) (indirect) | Funding: Not found in this session | Not public, sales only ([review](https://www.selectsoftwarereviews.com/reviews/tech-assessment-codesignal)) | Enterprise (employers) | Validated coding assessments with a "Coding Score" used in hiring ([press](https://codesignal.com/newsroom/press-releases/codesignal-takes-technical-hiring-to-new-heights-with-enhanced-scoring-system-and-revolutionary-ai-insights/)) |

## 2. Feature comparison matrix

"No" means the feature is not listed on the pricing or feature pages checked. "Unknown" means I could not confirm either way.

| Feature | roadmap.sh | Boot.dev | Codecademy | Exercism | Frontend Mentor | Hyperskill | CodeSignal | Vahoha |
|---|---|---|---|---|---|---|---|---|
| Structured roadmaps / paths | Yes | Yes | Yes | Partial (language tracks) | No | Yes | No | Building |
| Progress gated by passing a test | No (self-marked) | Partial (lessons must pass) | Partial (certification exams) | Partial | No | Unknown | n/a | Building (layer exams) |
| Graded coding exercises | No | Yes | Yes | Yes | No | Yes | Yes | Building |
| AI tutor | Yes | Yes | Yes (full on Pro) | Partial (Insiders ChatGPT) | Partial (AI code review) | Yes | No | Building |
| AI tutor that uses the learner's test history and weak topics | Unknown | Unknown | Unknown | No | No | Unknown | No | Building |
| Human feedback on your code | No | No | No | Yes (mentors) | Yes (community) | No | No | Partial (admin review) |
| Real portfolio project | Partial (ideas) | Partial | Yes | No | Yes | Yes | No | Building (capstone) |
| Learner must explain or defend own code | No | Unknown | No | No | No | No | No | Building (timed defense) |
| Team project with merged PRs and peer review | No | No | No | No | No | No | No | Building (Build Teams) |
| Public, verifiable certificate or evidence | Unknown | Unknown | Yes (certificates) | No | No | Yes (certification) | Partial (shared with employers only) | Building |
| Employer-facing profile of verified results | No | No | Partial (job-readiness checker is learner-facing) | No | No | No | Yes (employer-run) | Building (opt-in scorecard) |
| Lowest paid price | Not found | $33/mo | $14.99/mo | Donation | Not found | €49.90/mo | Sales | Free beta, $15 one-off test |

## 3. Positioning gaps

**Gap 1: proof that you can explain your own code.**
- Missing: every learner platform checks whether code passes tests; none I found asks the learner to defend their own project under time limits and publishes the result.
- Why it matters: AI writes passing code, so "it passes" no longer shows skill. Employers already pay for assessment (CodeSignal), but learners can't bring their own verified result.
- Difficulty: medium. Vahoha already built capstone review plus defense.
- Head start: Estimate 6 to 12 months. Boot.dev and Codecademy have AI tutors and exam engines, so adding defense questions is a feature for them, but publishing a public, revocable record needs integrity rules and wording they haven't shown.

**Gap 2: team evidence for self-taught developers.**
- Missing: no competitor offers a team project with merged PRs, reviews and peer ratings that becomes a public page.
- Why it matters: "no teamwork experience" is the main pain for all three personas.
- Difficulty: high, and mostly operational (matching people, keeping them active). Buildspace ran cohort projects at scale and shut down in 2024 (see `validate-idea.md`).
- Head start: Estimate 12+ months, because the hard part is running cohorts, not code.

**Gap 3: a mentor driven by test results, not chat history.**
- Missing: AI tutors exist everywhere; I found no evidence that any of them use a learner's exam scores and weak topics to decide what to teach next.
- Why it matters: it turns a generic chatbot into a coach.
- Difficulty: low to medium. Vahoha has built it.
- Head start: Estimate 3 to 6 months. Boot.dev already tunes Boots with custom instructions ([Jan 2026](https://boot.dev/blog/news/bootdev-beat-2026-01)), so this is easy for them to copy.

## 4. Threat assessment

| Rank | Competitor | Threat | Why |
|---|---|---|---|
| 1 | Boot.dev | High | Same customer (backend, self-taught), profitable, ships monthly ([July 2026](https://www.boot.dev/blog/news/bootdev-beat-2026-07): DSA chapter, AI Agent and RAG course update), already has an AI tutor with an interview mode. Overlap: roadmap-like paths, graded exercises, AI tutor |
| 2 | Codecademy | Medium | Skillsoft resources and enterprise reach; professional certifications from passing all path exams, interview simulator, job-readiness checker ([pricing](https://www.codecademy.com/pricing)). Closest to "verified", but proof is a completion certificate, not a defended project |
| 3 | roadmap.sh | Medium | Huge audience (355K stars), ships every month ([changelog](https://roadmap.sh/changelog): AI Engineer overhaul Mar 2026, LeetCode roadmap Apr 2026), Team plan tracks skill gaps. Progress is self-marked today, but AI quizzes put it one step from gated progress |

Lower: Exercism (funding strain), Frontend Mentor (frontend only), Hyperskill (certification overlap, but JetBrains-focused), CodeSignal (sells to employers, not learners).

## 5. Strategic recommendations

**Position to own:** verified mid-level backend skill for self-taught juniors. "You finished the courses. Now prove you can build and defend it." Backend first, because that is where Boot.dev's paying users and the Daniel persona are, and where Vahoha's exam banks are being seeded.

**Feature to ship first:** the capstone defense with its public verify page. It fills gap 1, it is already built, and it is the artifact to show 5 hiring managers (experiment 3 in `validate-idea.md`). Teams and readiness only matter if employers value that page.

**Competitor to watch:** Boot.dev. Same buyer, monthly shipping, an AI tutor with interview instructions, and a portfolio angle. A "defend your project" mode would be a small step for them.

**Distribution note:** roadmap.sh is more channel than rival. Its users finish roadmaps with nothing to show. "Finished a roadmap.sh roadmap? Prove it" is a message, not a fight.
