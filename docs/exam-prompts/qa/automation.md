You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Automation Engineer" (automation, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: automation-1
Title: Testing Fundamentals and QA Mindset
Technologies: Python, Pytest, Git, VS Code
Description: Understand the core principles of software testing, including test types, defect lifecycle, and QA goals. Build a solid Python foundation and set up a local testing environment.
Topics:
- Software testing principles
- Test types: unit, integration, E2E
- Defect lifecycle and severity
- Python basics for testers
- Git version control basics
- Test environment setup

### Layer 2 of 10 — id: automation-2
Title: Selenium WebDriver Basics
Technologies: Selenium, Python, ChromeDriver, Firefox
Description: Learn to drive browsers programmatically using Selenium WebDriver with Python bindings. Practice locating elements, interacting with forms, and handling dynamic content.
Topics:
- WebDriver setup and configuration
- Locator strategies: ID, CSS, XPath
- Browser interactions and navigation
- Form filling and submission
- Handling alerts and popups
- Implicit vs explicit waits

### Layer 3 of 10 — id: automation-3
Title: TestNG Framework and Test Organization
Technologies: TestNG, Java, Maven, IntelliJ IDEA
Description: Adopt TestNG as your test framework to organize, group, and prioritize tests effectively. Learn Java fundamentals needed to write structured TestNG test classes.
Topics:
- Java basics for testers
- TestNG annotations: @Test, @BeforeMethod, @AfterClass
- Test grouping and prioritization
- Data-driven testing with @DataProvider
- TestNG XML suite configuration
- Maven project structure

### Layer 4 of 10 — id: automation-4
Title: Page Object Model and Test Design Patterns
Technologies: Selenium, Python, POM, Pytest
Description: Apply the Page Object Model pattern to make your Selenium tests maintainable and readable. Learn to separate test logic from page interaction code.
Topics:
- Page Object Model design pattern
- BasePage class creation
- Separation of concerns in test code
- Reusable component objects
- Test data management
- Assertions and soft assertions

### Layer 5 of 10 — id: automation-5
Title: Playwright for Modern Web Automation
Technologies: Playwright, Python, TypeScript, Pytest-playwright
Description: Adopt Playwright as a modern, fast alternative to Selenium with built-in waits and multi-browser support. Learn its API for network interception, screenshots, and tracing.
Topics:
- Playwright installation and configuration
- Browser contexts and pages
- Auto-waiting mechanisms
- Network interception and mocking
- Screenshots, video, and trace recording
- Playwright fixtures with Pytest

### Layer 6 of 10 — id: automation-6
Title: API Testing and Integration
Technologies: Requests, Python, Pytest, JSON Schema
Description: Test REST APIs directly using the Python Requests library and integrate API assertions into your test suites. Understand request construction, response validation, and authentication patterns.
Topics:
- HTTP methods and status codes
- Requests library for Python
- JSON response validation
- JSON Schema validation
- Authentication: Basic, Bearer, API keys
- Combining API and UI test flows

### Layer 7 of 10 — id: automation-7
Title: Data-Driven Testing and Test Management
Technologies: Pytest, Python, CSV, Excel
Description: Drive test execution from external data sources like CSV, Excel, and databases to maximize coverage without code duplication. Integrate with test management tools to track results.
Topics:
- Parameterization with Pytest
- Reading test data from CSV and Excel
- Database-driven test data
- Test case tagging and filtering
- TestRail integration for results
- Test report generation with Allure

### Layer 8 of 10 — id: automation-8
Title: Cross-Browser and Visual Testing
Technologies: Playwright, BrowserStack, Percy, Selenium Grid
Description: Scale your tests across multiple browsers and devices using cloud grids and visual regression tools. Detect layout regressions automatically with screenshot comparison.
Topics:
- Playwright multi-browser configuration
- Selenium Grid architecture
- BrowserStack integration
- Visual regression testing concepts
- Percy for screenshot comparison
- Responsive design testing strategies

### Layer 9 of 10 — id: automation-9
Title: Advanced Patterns: Fixtures, Hooks, and Reporting
Technologies: Pytest, Python, Allure, Loguru
Description: Master advanced Pytest features including fixtures with scope, conftest organization, and custom hooks for pre/post test logic. Build rich, stakeholder-friendly HTML reports.
Topics:
- Pytest fixture scopes and dependency injection
- conftest.py organization strategies
- Custom Pytest plugins and hooks
- Structured logging in tests
- Allure steps and attachments
- Parallel test execution with pytest-xdist

### Layer 10 of 10 — id: automation-10
Title: CI/CD Integration and Production Pipeline
Technologies: GitHub Actions, Docker, Jenkins, Playwright
Description: Embed your automation suite into a CI/CD pipeline so tests run on every pull request and deployment. Containerize your test environment with Docker for consistent, reproducible runs.
Topics:
- GitHub Actions workflow authoring
- Dockerizing Playwright test suites
- Parallel test sharding in CI
- Test result artifacts and notifications
- Jenkins pipeline for legacy teams
- Flakiness detection and quarantine strategies

Start now with Layer 1.
