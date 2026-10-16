You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Android Dev" (android, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: android-1
Title: Kotlin Fundamentals
Technologies: Kotlin, Coroutines, null safety, Extensions
Description: Kotlin is the official language for Android development. It's concise, null-safe, and has excellent coroutine support. Master it before writing your first Activity.
Topics:
- Variables — val/var, type inference, null safety ?, !!
- Functions — default params, extension functions, lambdas
- OOP — data classes, sealed classes, objects, companion
- Collections — List, Map, Set, higher-order functions
- Coroutines — suspend, launch, async/await, Flow
- Scope functions — let, run, apply, also, with

### Layer 2 of 10 — id: android-2
Title: Jetpack Compose UI
Technologies: Compose, Material 3, State, Modifiers
Description: Jetpack Compose is Android's modern declarative UI toolkit. Learn composable functions, the state-driven UI model, and Material Design 3 components.
Topics:
- Composable functions — @Composable, recomposition
- State — remember, mutableStateOf, State hoisting
- Layouts — Column, Row, Box, LazyColumn
- Modifiers — padding, size, clickable, clip
- Material 3 components — Scaffold, TopAppBar, Card, Button
- Side effects — LaunchedEffect, SideEffect, DisposableEffect

### Layer 3 of 10 — id: android-3
Title: Architecture — MVVM & Clean
Technologies: ViewModel, StateFlow, Hilt, UseCases
Description: Android apps need a clear architecture to stay maintainable. Learn MVVM with ViewModels, StateFlow, and dependency injection with Hilt.
Topics:
- ViewModel — surviving configuration changes, viewModelScope
- StateFlow & SharedFlow — collecting in Compose
- Repository pattern — data source abstraction
- Use cases — single-responsibility business logic
- Hilt — @HiltViewModel, @Inject, modules
- Clean Architecture layers — data, domain, presentation

### Layer 4 of 10 — id: android-4
Title: Local Storage — Room & DataStore
Technologies: Room, DataStore, SQLite, Migrations
Description: Persist data on the device with Room (SQLite ORM) for structured data and DataStore for preferences — both with full coroutine and Flow support.
Topics:
- Room — @Entity, @Dao, @Database, TypeConverters
- Room with Flow — reactive queries
- Database migrations — Migration, fallbackToDestructiveMigration
- DataStore Preferences — typed key-value store
- Proto DataStore — strongly-typed with protobuf
- Encrypted SharedPreferences for sensitive data

### Layer 5 of 10 — id: android-5
Title: Networking with Retrofit & Coroutines
Technologies: Retrofit, OkHttp, Kotlin Serialization, Coil
Description: Fetch data from the internet with Retrofit, parse JSON with Kotlin Serialization, cache images with Coil, and handle errors and loading states cleanly.
Topics:
- Retrofit — @GET/@POST, suspend functions, interface
- OkHttp interceptors — logging, auth headers
- Kotlin Serialization — @Serializable, custom serializers
- Sealed class Result<T> for API responses
- Coil for image loading in Compose
- Offline-first — combining URLSession with Room

### Layer 6 of 10 — id: android-6
Title: Navigation & Deep Links
Technologies: Navigation Compose, Deep Links, Bottom Nav
Description: Navigate between screens, pass arguments, and handle deep links with Jetpack Navigation for Compose.
Topics:
- Navigation Compose — NavHost, composable destinations
- Passing arguments — safeArgs, Parcelable, JSON
- Nested navigation graphs
- Bottom navigation bar with Navigation Compose
- Deep links — intent filters, navigation links
- Shared element transitions

### Layer 7 of 10 — id: android-7
Title: Testing Android Apps
Technologies: JUnit, Espresso, Compose Testing, Turbine
Description: Test your ViewModel logic with JUnit, your Compose UI with the Compose testing APIs, and your coroutine flows with Turbine.
Topics:
- JUnit 4/5 — unit testing ViewModels, use cases
- MockK for Kotlin mocking
- Turbine — testing StateFlow and Flow emissions
- Compose UI testing — composeTestRule, semantics, actions
- Room in-memory database for tests
- Robolectric vs instrumented tests

### Layer 8 of 10 — id: android-8
Title: Publishing to Google Play
Technologies: Gradle, ProGuard, Play Console, CI/CD
Description: Ship your Android app to the world. Configure Gradle for release builds, shrink code with R8/ProGuard, and automate deployment with GitHub Actions and Fastlane.
Topics:
- Gradle — build variants, product flavors, signing config
- R8/ProGuard — code shrinking and obfuscation
- App Bundle (AAB) vs APK
- Google Play Console — internal, alpha, beta, production tracks
- Fastlane supply — automated Play Store deployment
- GitHub Actions — build signed AAB, upload to Play

### Layer 9 of 10 — id: android-9
Title: Advanced Android - Background Processing and System Integration
Technologies: Kotlin, WorkManager, Jetpack Compose, Glance
Description: Build rich system integrations using WorkManager for guaranteed background tasks, advanced notification channels, and app widgets powered by the Glance API. Explore Wear OS fundamentals and understand how Android manages process priority and battery restrictions.
Topics:
- WorkManager chains, constraints, and expedited tasks
- Notification channels, rich notifications, and bubbles
- Foreground services and battery optimization compliance
- App widgets with Glance and RemoteViews
- Wear OS tile and complication development basics
- BroadcastReceiver and system event handling
- Doze mode, App Standby buckets, and JobScheduler interaction

### Layer 10 of 10 — id: android-10
Title: Production Android - Store Optimization, Billing and Feature Flags
Technologies: Kotlin, Play Billing, Firebase, Google Play
Description: Maximize app success on the Play Store by integrating Play Billing Library for subscriptions, using Firebase to run controlled experiments, and applying crash analytics to triage regressions before they reach a wide audience. Learn listing optimization tactics and phased rollout strategies.
Topics:
- Play Billing Library 6 - subscriptions and one-time products
- Purchase verification and server-side receipt validation
- Firebase Crashlytics ANR and crash triage workflow
- Remote Config feature flags and parameter hygiene
- A/B testing with Firebase A/B Testing and Grow experiments
- Play Store listing optimization - screenshots, short description, keywords
- Phased rollouts and halt-and-resume release management

Start now with Layer 1.
