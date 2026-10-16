You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Flutter Dev" (flutter, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: flutter-1
Title: Dart Fundamentals
Technologies: Dart, Null Safety, OOP, async/await
Description: Flutter apps are written in Dart. Learn Dart's syntax, type system with null safety, and async programming before building your first widget.
Topics:
- Variables, types, null safety — ?, !, late
- Functions — named params, arrow functions, closures
- OOP — classes, inheritance, mixins, interfaces
- Collections — List, Map, Set with generics
- Async — Future, async/await, Stream
- Error handling — try/catch, custom exceptions

### Layer 2 of 10 — id: flutter-2
Title: Flutter UI Fundamentals
Technologies: Widgets, Material 3, Flex Layout, Themes
Description: In Flutter, everything is a widget. Learn the widget tree, layout system, and Material Design 3 to build beautiful, responsive UIs from scratch.
Topics:
- Widget tree — StatelessWidget vs StatefulWidget
- Layout — Row, Column, Stack, Flex, Expanded, Padding
- Common widgets — Text, Container, Image, Icon, AppBar
- MaterialApp, Scaffold, ThemeData
- ListView, GridView, SingleChildScrollView
- Responsive design — MediaQuery, LayoutBuilder

### Layer 3 of 10 — id: flutter-3
Title: State Management
Technologies: Riverpod, Provider, setState, BLoC
Description: Flutter's reactive UI is powered by state. Learn when to use setState, Provider, and Riverpod 2.0 — the modern solution for scalable Flutter state management.
Topics:
- setState — when it's enough and when it's not
- Provider — ChangeNotifier, Consumer, context.watch
- Riverpod 2.0 — providers, notifiers, AsyncNotifier
- StateNotifier vs AsyncNotifier
- BLoC pattern — events, states, BlocBuilder
- Shared state patterns — dependency injection with Riverpod

### Layer 4 of 10 — id: flutter-4
Title: Navigation & Routing
Technologies: GoRouter, Navigator 2.0, Deep Links
Description: Learn Flutter's navigation system from the imperative Navigator API to the modern declarative GoRouter with deep linking support.
Topics:
- Navigator 1.0 — push, pop, named routes
- GoRouter — route definitions, path params, redirect guards
- Nested navigation — ShellRoute, bottom tabs
- Deep linking — Android intent filters, iOS URL schemes
- Auth guards — redirect to login if not authenticated
- Passing data between routes

### Layer 5 of 10 — id: flutter-5
Title: Networking & Firebase
Technologies: Dio, Firebase, Firestore, Cloud Functions
Description: Connect your Flutter app to backend services. Use Dio for typed HTTP requests, Firebase for real-time data and auth, and Firestore for a serverless database.
Topics:
- Dio — interceptors, timeouts, error handling
- JSON serialization — json_serializable, Freezed
- Firebase setup — FlutterFire CLI, platform config
- Firebase Auth — email/password, Google Sign-In
- Cloud Firestore — collections, queries, real-time listeners
- Cloud Storage for file uploads

### Layer 6 of 10 — id: flutter-6
Title: Local Storage & Native Features
Technologies: Hive, SharedPreferences, Camera, Notifications
Description: Access device capabilities — store data locally, use the camera, send push notifications, and leverage platform-specific native APIs.
Topics:
- SharedPreferences for simple key-value storage
- Hive or Isar for local structured data
- image_picker — camera & gallery access
- Firebase Cloud Messaging — push notifications
- flutter_local_notifications
- Permissions handling — permission_handler

### Layer 7 of 10 — id: flutter-7
Title: Testing & Performance
Technologies: flutter_test, integration_test, DevTools
Description: Test your widgets and user flows, then profile and optimize rendering performance using Flutter DevTools.
Topics:
- Unit tests — testing Riverpod providers, pure logic
- Widget tests — pumpWidget, finder, tap, enter text
- Integration tests with integration_test package
- Golden tests — visual regression snapshots
- Flutter DevTools — widget inspector, performance overlay
- const constructors, RepaintBoundary, lazy loading

### Layer 8 of 10 — id: flutter-8
Title: Publishing & CI/CD
Technologies: Fastlane, GitHub Actions, App Store, Play Store
Description: Ship your Flutter app to both stores. Automate builds and releases with Fastlane and GitHub Actions, and navigate the App Store and Play Store submission process.
Topics:
- App icons, splash screens — flutter_native_splash
- iOS — provisioning profiles, certificates, App Store Connect
- Android — keystore, Play Console, aab build
- Fastlane — match, gym, deliver, supply
- GitHub Actions for Flutter — build, test, deploy
- OTA updates with Shorebird

### Layer 9 of 10 — id: flutter-9
Title: Advanced Flutter - Custom Rendering and Multi-Platform Targets
Technologies: Flutter, Dart, Platform Channels, CanvasKit
Description: Go beyond standard widgets by implementing custom render objects and painters for pixel-perfect UI needs that the widget layer cannot express. Extend Flutter to desktop and web targets while bridging platform-specific native SDKs through platform channels.
Topics:
- Custom RenderObject and RenderBox from scratch
- CustomPainter and Canvas API for complex graphics
- Platform channels and MethodChannel for native SDK bridging
- Flutter Web with CanvasKit vs HTML renderer trade-offs
- Desktop window management and keyboard/mouse input handling
- FFI with dart:ffi for calling native C libraries
- Isolate communication for CPU-intensive render work

### Layer 10 of 10 — id: flutter-10
Title: Production Flutter Apps - Analytics, A/B Testing and Store Optimization
Technologies: Flutter, Firebase, Shorebird, Dart
Description: Operate Flutter apps in production by integrating crash reporting, event analytics, and controlled feature rollouts that let you validate changes without full store releases. Learn how to manage code-push updates, optimize store listings, and use data to drive product decisions.
Topics:
- Crash reporting and stack trace symbolication with Firebase Crashlytics
- Event analytics schema design and funnel tracking
- A/B testing experiments with Firebase Remote Config
- Shorebird code-push for Dart-layer OTA updates
- App Store and Play Store listing optimization (ASO)
- Staged rollouts and phased releases on both stores
- Compliance with store policies for data privacy and permissions

Start now with Layer 1.
