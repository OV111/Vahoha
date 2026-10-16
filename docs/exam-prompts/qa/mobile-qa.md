You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Mobile QA Engineer" (mobile-qa, category qa). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: mobile-qa-1
Title: Mobile Testing Fundamentals
Technologies: Android Studio, Xcode, ADB, iOS Simulator
Description: Understand the unique challenges of mobile testing across platforms, device types, and OS versions. Set up iOS and Android development environments for manual and automated testing.
Topics:
- Android vs iOS testing differences
- Mobile SDLC and release cycles
- ADB command line basics
- iOS Simulator and Android Emulator setup
- Device vs emulator testing tradeoffs
- Mobile-specific test types: gesture, orientation, interrupt

### Layer 2 of 10 — id: mobile-qa-2
Title: Appium Setup and Basic Automation
Technologies: Appium, Python, Android SDK, Desired Capabilities
Description: Install and configure Appium to automate mobile apps on Android using Python. Understand Desired Capabilities and how Appium communicates with devices.
Topics:
- Appium architecture overview
- Appium server setup and configuration
- Desired Capabilities for Android
- Finding elements with Appium Inspector
- Basic touch interactions
- Python Appium client library

### Layer 3 of 10 — id: mobile-qa-3
Title: XCTest for iOS Native Testing
Technologies: XCTest, Swift, Xcode, iOS Simulator
Description: Use Apple XCTest framework to write native UI tests for iOS applications in Swift. Learn how XCTest integrates with Xcode and the test runner.
Topics:
- XCTest framework structure
- XCUIApplication and element queries
- Assertions in XCTest
- XCTest performance metrics
- Xcode test schemes and plans
- Recording UI tests in Xcode

### Layer 4 of 10 — id: mobile-qa-4
Title: Espresso for Android Native Testing
Technologies: Espresso, Kotlin, Android Studio, JUnit
Description: Write fast, reliable Android UI tests using Google Espresso, which runs in-process for maximum speed. Learn Espresso matchers, actions, and assertions.
Topics:
- Espresso architecture and synchronization
- ViewMatchers, ViewActions, ViewAssertions
- Handling async operations with IdlingResource
- Espresso Intents for testing navigation
- Espresso Web for WebView testing
- Running Espresso tests on CI

### Layer 5 of 10 — id: mobile-qa-5
Title: BrowserStack and Real Device Testing
Technologies: BrowserStack, Appium, Python, REST API
Description: Run your mobile automation tests on thousands of real devices in the cloud using BrowserStack App Automate. Understand the economics and tradeoffs of real device testing.
Topics:
- BrowserStack App Automate setup
- Uploading apps to BrowserStack
- Desired Capabilities for BrowserStack
- Parallel test execution on real devices
- BrowserStack session logs and video
- Network simulation with BrowserStack

### Layer 6 of 10 — id: mobile-qa-6
Title: Mobile Test Design: Gestures and Interrupts
Technologies: Appium, Python, TouchAction, UIAutomator2
Description: Test mobile-specific interactions including complex gestures, deep links, push notifications, and interrupt handling. Validate that apps behave correctly under real-world conditions.
Topics:
- Implementing swipe, scroll, pinch with Appium
- Deep link testing automation
- Push notification testing strategies
- Incoming call and SMS interrupt testing
- Background and foreground app state testing
- Battery and network condition simulation

### Layer 7 of 10 — id: mobile-qa-7
Title: Mobile Performance and Battery Testing
Technologies: Android Profiler, Instruments, ADB, Appium
Description: Evaluate mobile app performance including startup time, frame rate, memory usage, and battery drain. Use platform-native profiling tools to identify performance regressions.
Topics:
- App launch time measurement
- Frame rate and jank detection
- Memory leak identification on mobile
- Battery drain testing methodology
- Android Profiler usage
- Xcode Instruments for iOS performance

### Layer 8 of 10 — id: mobile-qa-8
Title: Mobile Accessibility Testing
Technologies: TalkBack, VoiceOver, Accessibility Scanner, Appium
Description: Test mobile apps for accessibility compliance using screen readers and automated scanners. Ensure all interactive elements are reachable and describable.
Topics:
- TalkBack and VoiceOver screen reader testing
- Content descriptions and accessibility labels
- Touch target size requirements
- Color contrast for mobile
- Android Accessibility Scanner
- WCAG mobile success criteria

### Layer 9 of 10 — id: mobile-qa-9
Title: Page Object Model for Mobile Automation
Technologies: Appium, Python, Pytest, Allure
Description: Apply Page Object Model and screen object patterns to your Appium tests to create a maintainable and scalable mobile test framework. Add reporting and parallel execution.
Topics:
- Screen Object pattern for mobile
- BaseScreen class design
- Appium test fixtures with Pytest
- Parallel execution with pytest-xdist
- Allure reporting for mobile tests
- Test data management for mobile

### Layer 10 of 10 — id: mobile-qa-10
Title: CI/CD for Mobile and Release Automation
Technologies: GitHub Actions, BrowserStack, Fastlane, Docker
Description: Automate mobile build, sign, and test workflows in CI/CD pipelines so every commit triggers tests on real devices. Use Fastlane to manage app signing and deployment.
Topics:
- Fastlane for iOS and Android automation
- GitHub Actions mobile workflow
- App distribution to testers with Fastlane
- BrowserStack integration in CI
- Parallel sharding across real devices
- Mobile test result dashboards

Start now with Layer 1.
