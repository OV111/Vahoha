You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "iOS Dev" (ios, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ios-1
Title: Swift Fundamentals
Technologies: Swift, Optionals, Closures, Protocols
Description: Swift is Apple's powerful, type-safe language for iOS, macOS, and beyond. Learn its syntax, type system, protocol-oriented programming, and Swift concurrency.
Topics:
- Variables — let/var, type inference, optionals ?, !, guard let
- Functions — default params, closures, trailing closure syntax
- OOP — classes, structs, enums with associated values
- Protocols & extensions — protocol-oriented programming
- Error handling — throws, try/catch, Result type
- Swift Concurrency — async/await, actors, Task

### Layer 2 of 10 — id: ios-2
Title: SwiftUI Fundamentals
Technologies: SwiftUI, State, View, Modifiers
Description: SwiftUI is Apple's declarative UI framework. Learn to think in Views, understand the state-driven rendering model, and compose interfaces with modifiers.
Topics:
- View protocol — body, ViewBuilder
- State & data flow — @State, @Binding, @ObservedObject
- Layout — HStack, VStack, ZStack, LazyVStack, Grid
- Common views — Text, Image, Button, TextField, List, Form
- View modifiers — padding, background, cornerRadius, overlay
- Previews — #Preview macro, multiple variants

### Layer 3 of 10 — id: ios-3
Title: Architecture — MVVM & Combine
Technologies: ObservableObject, Combine, @Observable, Clean Arch
Description: Structure your SwiftUI apps for maintainability with MVVM, reactive data flow using Combine (or the new @Observable macro in iOS 17+), and clean separation of concerns.
Topics:
- ObservableObject + @StateObject / @EnvironmentObject
- @Observable macro — iOS 17+ simplified model
- Combine — Publisher, Subscriber, operators, AnyCancellable
- Repository pattern for data sources
- Dependency injection with protocols
- Swift Concurrency in ViewModels — Task, MainActor

### Layer 4 of 10 — id: ios-4
Title: Data Persistence — SwiftData & Core Data
Technologies: SwiftData, Core Data, CloudKit, UserDefaults
Description: Persist data locally on iOS with SwiftData (iOS 17+ modern ORM), Core Data for older targets, and UserDefaults/Keychain for lightweight storage.
Topics:
- SwiftData — @Model, ModelContainer, @Query, relationships
- Core Data — NSManagedObject, NSFetchRequest, NSPersistentContainer
- Migrations — lightweight vs heavy migrations
- CloudKit + Core Data for iCloud sync
- UserDefaults & AppStorage for preferences
- Keychain for secure credential storage

### Layer 5 of 10 — id: ios-5
Title: Networking & Async
Technologies: URLSession, async/await, Codable, Alamofire
Description: Fetch data from REST APIs using URLSession with Swift Concurrency. Decode with Codable, handle errors gracefully, and cache responses efficiently.
Topics:
- URLSession — data(from:), URLRequest, HTTPURLResponse
- Codable — Encodable/Decodable, CodingKeys, custom decoding
- Generic networking layer — APIClient protocol
- Alamofire — request, responseDecodable, interceptors
- Image loading — AsyncImage, Nuke, Kingfisher
- Offline-first — combining URLSession with SwiftData

### Layer 6 of 10 — id: ios-6
Title: Navigation & Advanced SwiftUI
Technologies: NavigationStack, NavigationSplitView, Animations, Custom Views
Description: Navigate between views using the modern NavigationStack API, build iPad-ready split views, and add fluid animations with SwiftUI's animation system.
Topics:
- NavigationStack — push/pop, NavigationPath
- NavigationSplitView — sidebar/detail for iPad
- Sheet, fullScreenCover, popover
- Custom animations — withAnimation, .animation(), matchedGeometryEffect
- Custom ViewModifiers and View extensions
- TabView & programmatic tab selection

### Layer 7 of 10 — id: ios-7
Title: Testing iOS Apps
Technologies: XCTest, Swift Testing, UI Testing, XCUITest
Description: Write unit, integration, and UI tests for your iOS app using XCTest and the new Swift Testing framework introduced in Xcode 16.
Topics:
- XCTest — XCTestCase, setUp/tearDown, XCTAssert
- Swift Testing — @Test, @Suite, #expect, async tests
- Testing ViewModels with mock repositories
- XCUITest — UI testing, accessibility identifiers
- Snapshot testing — SnapshotTesting library
- Code coverage in Xcode — measuring and improving

### Layer 8 of 10 — id: ios-8
Title: App Store Publishing
Technologies: Xcode Cloud, TestFlight, App Store Connect, Fastlane
Description: Ship your iOS app to the App Store. Configure code signing, test with TestFlight, automate with Xcode Cloud or Fastlane, and navigate the App Review process.
Topics:
- Code signing — certificates, provisioning profiles, Apple Developer
- App capabilities — Push Notifications, iCloud, In-App Purchases
- TestFlight — internal and external beta testing
- Xcode Cloud — CI/CD built into Xcode
- Fastlane match + deliver + pilot
- App Store metadata — screenshots, ASO, privacy labels
- App Review guidelines — common rejection reasons

### Layer 9 of 10 — id: ios-9
Title: Advanced iOS - Extensions, Widgets and Background Tasks
Technologies: Swift, SwiftUI, WidgetKit, BackgroundTasks
Description: Extend your iOS apps beyond the main process using WidgetKit for home and lock-screen surfaces, App Clips for instant experiences, and BGTaskScheduler for deferred background work. Implement push notifications with rich media payloads and notification service extensions.
Topics:
- WidgetKit timeline providers and widget families
- Lock Screen widgets and StandBy mode complications
- App Clips entitlements, size limits, and invocation URLs
- BGAppRefreshTask and BGProcessingTask scheduling
- Push notification service extensions for media attachments
- Share and action extensions with App Groups data sharing
- CallKit and notification content extensions

### Layer 10 of 10 — id: ios-10
Title: Production iOS - StoreKit 2, Analytics and App Store Optimization
Technologies: Swift, StoreKit 2, Firebase, Xcode Cloud
Description: Ship and monetize iOS apps professionally by implementing StoreKit 2 for modern in-app purchases and subscriptions, integrating crash reporting with symbolicated stack traces, and running hypothesis-driven A/B tests through Firebase. Master App Store Connect metrics and listing optimization to improve conversion and discoverability.
Topics:
- StoreKit 2 Transaction API and subscription lifecycle management
- Server-side receipt verification with App Store Server API
- Firebase Crashlytics dSYM upload and crash-free rate targets
- Firebase A/B Testing with Remote Config parameters
- App Store Connect analytics - impressions, conversion, retention
- App Store listing optimization - keywords, screenshots, preview videos
- Xcode Cloud workflows for TestFlight and phased App Store releases

Start now with Layer 1.
