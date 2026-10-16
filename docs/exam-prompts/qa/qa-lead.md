You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "QA Lead" (qa-lead, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: qa-lead-1
Title: QA Leadership Foundations
Technologies: Jira, Confluence, Slack, Google Workspace
Description: Transition from individual contributor to QA leader by understanding the responsibilities, mindset shifts, and key competencies of a QA Lead. Learn to balance technical and people-management work.
Topics:
- QA Lead vs Senior QA engineer role differences
- Servant leadership in testing teams
- Quality advocacy at the organizational level
- Building credibility with development and product teams
- QA lead daily responsibilities
- Goal setting and OKRs for QA

### Layer 2 of 10 — id: qa-lead-2
Title: Test Strategy and Planning
Technologies: Confluence, Jira, Spreadsheets, TestRail
Description: Craft a comprehensive test strategy that aligns QA activities with business goals and technical architecture. Translate strategy into actionable test plans for individual releases.
Topics:
- Test strategy vs test plan differences
- Risk-based testing approach
- Test scope and coverage definition
- Test environment strategy
- Test data strategy
- Entry and exit criteria definition

### Layer 3 of 10 — id: qa-lead-3
Title: Building and Mentoring QA Teams
Technologies: Jira, Confluence, Slack, 1-on-1 frameworks
Description: Learn to recruit, onboard, and grow QA engineers by providing structured feedback, coaching, and career development support. Build psychological safety within your team.
Topics:
- QA engineer hiring: resume review, interview design
- Onboarding plan for new QA engineers
- Structured 1-on-1 meeting frameworks
- Providing actionable feedback (SBI model)
- Career laddering for QA engineers
- Building a learning culture in QA

### Layer 4 of 10 — id: qa-lead-4
Title: QA Metrics and Reporting
Technologies: Jira, Google Sheets, Tableau, TestRail
Description: Define and track meaningful QA metrics that demonstrate quality health and team effectiveness to stakeholders. Build executive-friendly dashboards that tell a story.
Topics:
- Leading vs lagging quality indicators
- Defect density and escape rate metrics
- Test coverage and automation ratio
- Cycle time and testing throughput
- Weekly and release QA status reports
- Data visualization for quality dashboards

### Layer 5 of 10 — id: qa-lead-5
Title: Agile QA Processes and Ceremony Ownership
Technologies: Jira, Confluence, Miro, Slack
Description: Optimize QA activities within Agile sprints by embedding quality earlier in the process. Facilitate QA-related ceremonies and ensure testing never becomes a sprint bottleneck.
Topics:
- Three Amigos sessions facilitation
- Definition of Ready and Done with QA criteria
- Sprint planning estimation for QA
- Shift-left testing in Agile teams
- Retrospective facilitation for quality improvement
- Managing testing debt in backlogs

### Layer 6 of 10 — id: qa-lead-6
Title: Test Automation Strategy and Governance
Technologies: Selenium, Playwright, CI/CD, Jira
Description: Define an automation strategy that balances ROI against maintenance cost. Govern automation quality so the framework remains reliable and grows sustainably.
Topics:
- Test automation pyramid and trophy strategies
- Build vs buy automation tool decisions
- Automation ROI calculation
- Automation code review standards
- Flaky test management and quarantine policy
- Automation ownership across teams

### Layer 7 of 10 — id: qa-lead-7
Title: Cross-Team Collaboration and Stakeholder Management
Technologies: Jira, Confluence, Slack, Google Slides
Description: Develop skills to influence without authority, manage stakeholder expectations, and build quality advocacy across product, engineering, and leadership teams.
Topics:
- Influencing without authority techniques
- Stakeholder mapping and communication plans
- Negotiating release dates and quality tradeoffs
- Presenting QA findings to executives
- Building trust with development team leads
- Escalation paths for critical quality issues

### Layer 8 of 10 — id: qa-lead-8
Title: Incident Management and Root Cause Analysis
Technologies: Jira, PagerDuty, Confluence, Grafana
Description: Lead post-incident quality reviews to extract learning and prevent recurrence. Build a blameless post-mortem culture that improves systems and processes.
Topics:
- Incident severity classification
- QA role during production incidents
- Blameless post-mortem methodology
- Root cause analysis techniques: 5 Whys, fishbone
- Corrective action tracking in Jira
- Detection gap analysis: why tests missed this

### Layer 9 of 10 — id: qa-lead-9
Title: Quality Culture and Continuous Improvement
Technologies: Confluence, Jira, Miro, Retrospective Tools
Description: Build a sustainable quality culture where quality is everyone responsibility, not just QA. Use continuous improvement frameworks to evolve your team processes over time.
Topics:
- Quality culture vs quality control mindset
- Quality champions program design
- Retrospective formats: 4Ls, start-stop-continue
- PDCA cycle for process improvement
- Quality OKRs and quarterly reviews
- Knowledge sharing and documentation culture

### Layer 10 of 10 — id: qa-lead-10
Title: QA Program Ownership and Strategic Leadership
Technologies: Jira, OKR Frameworks, Confluence, Tableau
Description: Own the QA program at an organizational level by setting multi-quarter strategy, managing budgets, building the team roadmap, and representing quality at the leadership table.
Topics:
- Annual QA roadmap planning
- Headcount planning and budget management
- QA tooling evaluation and procurement
- Building a testing center of excellence
- Reporting quality health to C-level executives
- QA team brand and recognition

Start now with Layer 1.
