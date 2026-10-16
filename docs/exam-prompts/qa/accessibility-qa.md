You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Accessibility Tester" (accessibility-qa, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: accessibility-qa-1
Title: Accessibility Fundamentals and WCAG
Technologies: WCAG, Browser, Confluence, Spreadsheets
Description: Build a foundation in web accessibility standards by studying WCAG 2.1 and understanding the four POUR principles. Learn about assistive technologies and who benefits from accessible design.
Topics:
- WCAG 2.1 POUR principles: Perceivable, Operable, Understandable, Robust
- WCAG conformance levels: A, AA, AAA
- Disability categories and assistive technologies
- Legal context: ADA, Section 508, EN 301 549
- Accessibility vs usability vs inclusive design
- Accessibility tree and semantics

### Layer 2 of 10 — id: accessibility-qa-2
Title: Screen Reader Testing with NVDA
Technologies: NVDA, Firefox, Chrome, HTML
Description: Learn to navigate and test web applications using NVDA, the most widely used free screen reader. Understand how screen readers interpret HTML and what makes content accessible to blind users.
Topics:
- NVDA installation and basic usage
- Browse mode vs forms mode in NVDA
- Navigating by headings, landmarks, and links
- Testing form field labels and error messages
- ARIA roles and their screen reader behavior
- NVDA speech viewer for debugging

### Layer 3 of 10 — id: accessibility-qa-3
Title: Keyboard Navigation Testing
Technologies: Browser, DevTools, WCAG, Axe
Description: Verify that all functionality is accessible using only a keyboard, which is required for both screen reader users and motor-impaired users. Test focus management, tab order, and keyboard traps.
Topics:
- Tab, Shift-Tab, Enter, Space, Arrow key navigation
- Focus visibility requirements
- Keyboard trap detection and testing
- Skip navigation links
- Modal dialog focus management
- Custom widget keyboard patterns from ARIA Authoring Practices

### Layer 4 of 10 — id: accessibility-qa-4
Title: Automated Accessibility Testing with axe
Technologies: axe, axe DevTools, Chrome, JavaScript
Description: Use the axe accessibility engine to automate detection of common WCAG violations. Understand the scope and limitations of automated accessibility testing.
Topics:
- axe-core rules and violation levels
- axe DevTools browser extension
- axe-playwright for E2E integration
- Understanding axe incomplete and inapplicable results
- Automated vs manual testing coverage
- axe reporting and issue triage

### Layer 5 of 10 — id: accessibility-qa-5
Title: Lighthouse Audits and Reporting
Technologies: Lighthouse, Chrome DevTools, axe, HTML Reports
Description: Use Google Lighthouse to perform automated accessibility audits and generate reports that communicate accessibility health to development teams. Track scores over time.
Topics:
- Lighthouse accessibility audit configuration
- Interpreting Lighthouse accessibility score
- Lighthouse CLI for automated runs
- Lighthouse CI for pipeline integration
- Combining Lighthouse with axe results
- Accessibility score trending

### Layer 6 of 10 — id: accessibility-qa-6
Title: Color, Contrast, and Visual Accessibility
Technologies: Colour Contrast Analyser, Axe, Figma, WCAG
Description: Test visual accessibility including color contrast ratios, use of color alone to convey information, and text sizing. Validate designs before development using design tool integrations.
Topics:
- WCAG 1.4.3 contrast ratio requirements
- Colour Contrast Analyser tool usage
- Testing non-text contrast (1.4.11)
- Color-only information violations
- Focus indicator contrast requirements
- Zoom and text resize testing to 200 percent

### Layer 7 of 10 — id: accessibility-qa-7
Title: Mobile Accessibility Testing
Technologies: TalkBack, VoiceOver, iOS, Android
Description: Test mobile applications for accessibility using iOS VoiceOver and Android TalkBack screen readers. Understand mobile-specific accessibility patterns and gestures.
Topics:
- VoiceOver gestures and navigation on iOS
- TalkBack gestures and navigation on Android
- Mobile accessibility element grouping
- Touch target size requirements (24x24 dp)
- Mobile form accessibility testing
- Switch access testing for motor impairments

### Layer 8 of 10 — id: accessibility-qa-8
Title: ARIA and Semantic HTML Validation
Technologies: NVDA, axe, DevTools, HTML
Description: Deeply understand ARIA roles, properties, and states and how they affect the accessibility tree. Test custom widgets for correct ARIA implementation and semantic HTML usage.
Topics:
- ARIA roles: landmark, widget, document structure
- ARIA properties: aria-label, aria-labelledby, aria-describedby
- ARIA states: aria-expanded, aria-selected, aria-checked
- Custom widget keyboard and ARIA patterns
- Accessibility tree inspection in DevTools
- Common ARIA misuse patterns

### Layer 9 of 10 — id: accessibility-qa-9
Title: Accessibility Test Automation Integration
Technologies: axe-playwright, Playwright, TypeScript, Allure
Description: Integrate accessibility testing into your E2E automation suite so every page is scanned during functional test runs. Build accessibility regression prevention into the CI pipeline.
Topics:
- axe-playwright setup and usage
- Per-page accessibility assertions in Playwright
- Custom axe rule configuration
- Accessibility violation reporting in Allure
- Baseline comparison for accessibility
- Scoping axe to specific components

### Layer 10 of 10 — id: accessibility-qa-10
Title: Accessibility Program and CI/CD Integration
Technologies: Lighthouse CI, axe, GitHub Actions, Confluence
Description: Build an accessibility program that prevents regressions at every stage of the SDLC using CI/CD gates, developer tooling, and stakeholder reporting. Champion accessibility culture in your organization.
Topics:
- Lighthouse CI in GitHub Actions
- Accessibility score gates blocking merge
- Developer accessibility tooling recommendations
- Voluntary Product Accessibility Template (VPAT)
- Accessibility roadmap and remediation planning
- Training developers and designers on accessibility

Start now with Layer 1.
