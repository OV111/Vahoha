You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Ionic Developer" (ionic, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ionic-1
Title: Web & TypeScript Foundations
Technologies: TypeScript, HTML, CSS
Description: Ionic builds on web tech. Get comfortable with HTML, CSS and TypeScript before adding the framework.
Topics:
- HTML & semantic markup
- CSS & flexbox layout
- TypeScript types & interfaces
- Modules & tooling
- npm & the CLI
- The mobile web context

### Layer 2 of 10 — id: ionic-2
Title: Angular Fundamentals
Technologies: Angular, Components, RxJS
Description: Ionic's most common companion is Angular. Learn components, services and reactive data with RxJS.
Topics:
- Components & templates
- Services & dependency injection
- Angular Router
- Observables & RxJS basics
- Forms — template & reactive
- Modules & standalone components

### Layer 3 of 10 — id: ionic-3
Title: Ionic Framework & Components
Technologies: Ionic, UI Components, Theming
Description: Build native-looking mobile UIs with Ionic's component library that adapts to iOS and Android.
Topics:
- Ionic CLI & project setup
- Core UI components
- Platform-adaptive styling (iOS/MD)
- Theming with CSS variables
- Icons & typography
- Gestures & animations

### Layer 4 of 10 — id: ionic-4
Title: Navigation & Routing
Technologies: Routing, Tabs, Modals
Description: Structure your app's flows. Master Ionic navigation, tabs, modals and route parameters.
Topics:
- Angular Router with Ionic
- Tabs & nested routes
- Modals, popovers & alerts
- Passing & reading route params
- Navigation lifecycle hooks
- Deep linking

### Layer 5 of 10 — id: ionic-5
Title: State Management
Technologies: RxJS, Services, Signals
Description: Manage app state cleanly. Use services, RxJS and signals to keep your UI in sync with data.
Topics:
- Service-based state
- RxJS subjects & stores
- Angular signals
- Caching & sharing data
- Loading & error state
- When to add NgRx

### Layer 6 of 10 — id: ionic-6
Title: Native with Capacitor
Technologies: Capacitor, Native, Builds
Description: Turn your web app into a real native app. Use Capacitor to build for iOS and Android.
Topics:
- Capacitor architecture
- Adding iOS & Android platforms
- The native project bridge
- Live reload on device
- App configuration & icons/splash
- Building native binaries

### Layer 7 of 10 — id: ionic-7
Title: Device APIs & Plugins
Technologies: Plugins, Camera, Geolocation
Description: Access native device features. Use Capacitor plugins for camera, geolocation, storage and more.
Topics:
- Core Capacitor plugins
- Camera & photo gallery
- Geolocation & maps
- Local notifications
- Filesystem & preferences
- Writing a custom plugin

### Layer 8 of 10 — id: ionic-8
Title: Data, HTTP & Storage
Technologies: HttpClient, Storage, Auth
Description: Connect your app to a backend and persist data. Consume APIs, store data locally, and handle auth.
Topics:
- Angular HttpClient & interceptors
- REST API consumption
- Local storage with Ionic Storage / SQLite
- Authentication & token handling
- Offline caching
- Error & retry handling

### Layer 9 of 10 — id: ionic-9
Title: Testing & Debugging
Technologies: Jasmine, Karma, DevTools
Description: Keep your app reliable. Test Angular/Ionic code and debug on real devices.
Topics:
- Unit testing with Jasmine & Karma
- Testing components & services
- End-to-end testing
- Debugging with Chrome DevTools
- Native debugging on device
- Performance profiling

### Layer 10 of 10 — id: ionic-10
Title: Building & Publishing
Technologies: App Store, Play Store, CI/CD
Description: Release your Ionic app to the world. Build signed binaries and publish to the app stores.
Topics:
- Production builds & optimization
- Code signing — iOS & Android
- App store assets & metadata
- Appflow / CI for Ionic
- Over-the-air updates
- Submission & review

Start now with Layer 1.
