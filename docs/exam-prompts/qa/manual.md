You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Manual Tester" (manual, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: manual-1
Title: QA Foundations and Testing Principles
Technologies: Jira, Confluence, Google Docs, Spreadsheets
Description: Establish a strong understanding of software quality assurance principles, methodologies, and the tester mindset. Learn the software development lifecycle and where QA fits in.
Topics:
- SDLC and STLC overview
- QA vs QC vs testing
- Testing principles and fallacies
- Agile and Scrum for QA
- Test planning and estimation
- Documentation standards

### Layer 2 of 10 — id: manual-2
Title: Test Case Design Techniques
Technologies: TestRail, Spreadsheets, Mind Maps, Confluence
Description: Learn systematic techniques for designing test cases that maximize coverage while minimizing redundancy. Apply equivalence partitioning, boundary analysis, and decision tables to real features.
Topics:
- Equivalence partitioning
- Boundary value analysis
- Decision table testing
- State transition testing
- Use case testing
- Exploratory testing heuristics

### Layer 3 of 10 — id: manual-3
Title: Jira for Bug Tracking and Project Management
Technologies: Jira, Confluence, Slack, Chrome DevTools
Description: Master Jira as a bug tracker and project management tool for Agile QA workflows. Learn to write high-quality bug reports that developers can act on immediately.
Topics:
- Jira project setup and configuration
- Writing effective bug reports
- Bug severity vs priority
- Jira workflows and transitions
- Linking bugs to test cases
- Sprint ceremonies from a QA perspective

### Layer 4 of 10 — id: manual-4
Title: TestRail for Test Management
Technologies: TestRail, Jira, Excel, CSV
Description: Use TestRail to organize test suites, manage test runs, and track test coverage over time. Learn to create meaningful test execution reports for stakeholders.
Topics:
- TestRail structure: projects, suites, sections
- Creating and organizing test cases
- Test run creation and assignment
- Milestones and release tracking
- Jira integration for traceability
- Test coverage reports and dashboards

### Layer 5 of 10 — id: manual-5
Title: API Testing with Postman
Technologies: Postman, REST, JSON, HTTP
Description: Learn to test REST APIs manually using Postman without writing code. Understand HTTP fundamentals, request construction, and how to validate API responses.
Topics:
- HTTP methods, headers, and status codes
- Postman workspace and collections
- Environment variables in Postman
- Writing Postman tests with JavaScript
- Authentication testing in Postman
- API documentation reading with Swagger

### Layer 6 of 10 — id: manual-6
Title: Database Testing with SQL
Technologies: SQL, MySQL, PostgreSQL, DBeaver
Description: Validate application data integrity by querying databases directly using SQL. Learn to verify that front-end actions produce correct database changes.
Topics:
- SQL SELECT, WHERE, JOIN basics
- Aggregation functions: COUNT, SUM, GROUP BY
- Data integrity and constraint validation
- Comparing UI data with DB records
- NULL handling and edge cases
- Using DBeaver as a database client

### Layer 7 of 10 — id: manual-7
Title: Regression and Smoke Testing Strategies
Technologies: TestRail, Jira, Postman, Spreadsheets
Description: Design efficient regression and smoke test suites that protect release quality without slowing delivery. Learn prioritization techniques based on risk and change impact.
Topics:
- Smoke vs sanity vs regression testing
- Risk-based test prioritization
- Regression suite maintenance
- Impact analysis for change requests
- Test coverage metrics
- Regression automation candidates

### Layer 8 of 10 — id: manual-8
Title: Exploratory Testing and Session-Based Testing
Technologies: Jira, Chrome DevTools, Loom, Mind Maps
Description: Go beyond scripted tests with structured exploratory testing techniques that uncover defects traditional test cases miss. Use session-based test management to bring discipline to exploration.
Topics:
- Exploratory testing vs scripted testing
- Test charters and session structure
- Heuristics: SFDPOT, FEW HICCUPPS
- Note-taking and bug capture during sessions
- Chrome DevTools for exploratory QA
- Reporting exploratory session results

### Layer 9 of 10 — id: manual-9
Title: Usability, Accessibility, and Cross-Browser Testing
Technologies: BrowserStack, WAVE, Jira, Lighthouse
Description: Expand your testing scope beyond functionality to cover usability, accessibility compliance, and cross-browser consistency. Learn to evaluate UI experiences and identify WCAG violations manually.
Topics:
- Usability heuristics - Nielsen 10
- WCAG 2.1 AA guidelines overview
- Manual accessibility checks
- Cross-browser testing strategies
- Mobile responsive testing
- Reporting usability and accessibility bugs

### Layer 10 of 10 — id: manual-10
Title: Release QA, Metrics, and Process Ownership
Technologies: Jira, TestRail, Confluence, Google Sheets
Description: Own the end-to-end quality process for a release cycle, from planning through sign-off. Build QA dashboards and metrics that communicate release health to stakeholders.
Topics:
- Release test planning and scheduling
- Entry and exit criteria definition
- QA sign-off process and checklists
- Defect density and escape rate metrics
- Stakeholder reporting dashboards
- Continuous improvement retrospectives

Start now with Layer 1.
