You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "React Native Dev" (react-native, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: rn-1
Title: JavaScript & React Prerequisites
Technologies: JavaScript, ES6+, React, Hooks
Description: React Native is React for mobile. Before touching the mobile layer, you need solid JavaScript and React fundamentals — components, hooks, and state — everything carries over.
Topics:
- ES6+ — destructuring, spread, arrow functions, modules
- Promises & async/await
- React components & JSX
- useState, useEffect, useRef, useCallback
- Context API for shared state
- React component lifecycle & rendering behavior

### Layer 2 of 10 — id: rn-2
Title: React Native Core
Technologies: React Native, Expo, StyleSheet, Flexbox
Description: Set up your dev environment, understand how React Native bridges JavaScript to native code, and master the core components and styling system.
Topics:
- Expo vs bare React Native — when to use each
- Core components — View, Text, Image, TextInput, ScrollView, FlatList
- StyleSheet API — style objects, platform-specific styles
- Flexbox in React Native — differences from web
- Metro bundler — fast refresh, module resolution
- Debugging — Expo DevTools, React DevTools, Flipper

### Layer 3 of 10 — id: rn-3
Title: Navigation
Technologies: React Navigation, Stack, Tabs, Drawer
Description: Mobile apps are multi-screen experiences. React Navigation is the standard — learn stack, tab, and drawer navigators, pass data between screens, and handle deep linking.
Topics:
- React Navigation setup — native stack, dependencies
- Stack Navigator — push, pop, goBack, params
- Bottom Tabs Navigator — icons, badges
- Drawer Navigator — gestures, custom drawer content
- Nested navigators — tabs inside stacks
- Deep linking & universal links setup

### Layer 4 of 10 — id: rn-4
Title: State Management
Technologies: Zustand, Redux Toolkit, AsyncStorage, MMKV
Description: Manage app-wide state cleanly. Choose the right state solution — Zustand for simplicity, Redux Toolkit for complex flows — and persist state between app launches.
Topics:
- Zustand — stores, actions, selectors
- Redux Toolkit — createSlice, createAsyncThunk, RTK Query
- Persisting state — AsyncStorage, MMKV
- Optimistic updates and loading states
- Derived state and selectors
- Hydration on app start

### Layer 5 of 10 — id: rn-5
Title: Networking & APIs
Technologies: Fetch, Axios, TanStack Query, WebSockets
Description: Connect your mobile app to a backend. Fetch data efficiently, handle caching and background refresh, manage auth tokens, and build real-time features with WebSockets.
Topics:
- Fetch API and Axios in React Native
- TanStack Query — useQuery, useMutation, prefetching
- Auth token storage — SecureStore (Expo) or Keychain
- Interceptors for automatic token refresh
- Offline-first patterns — network state detection
- WebSockets with socket.io-client

### Layer 6 of 10 — id: rn-6
Title: Native Device Features
Technologies: Camera, Notifications, Maps, Permissions
Description: Leverage the hardware. Use Expo SDK and community libraries to access the camera, push notifications, location services, and other native device capabilities.
Topics:
- Permissions API — camera, location, notifications
- expo-camera / react-native-vision-camera
- Expo Notifications — local & push (FCM/APNs)
- expo-location & react-native-maps
- Haptics, sensors, accelerometer
- Linking — opening URLs, phone numbers, maps

### Layer 7 of 10 — id: rn-7
Title: Animations & Performance
Technologies: Reanimated, Gesture Handler, FlashList, Profiler
Description: Mobile users expect buttery-smooth 60fps animations. Use React Native Reanimated for worklet-based animations that run on the UI thread, and optimize lists with FlashList.
Topics:
- Reanimated 3 — useSharedValue, useAnimatedStyle, withTiming, withSpring
- Gesture Handler — pan, pinch, tap gestures
- Layout animations — entering/exiting presets
- FlashList vs FlatList — performance differences
- React Native Profiler — JS thread vs UI thread
- Hermes engine & bundle size optimization

### Layer 8 of 10 — id: rn-8
Title: Testing & Publishing
Technologies: Jest, RNTL, EAS Build, App Store
Description: Ship your app confidently. Test components and flows with React Native Testing Library, use EAS Build for cloud builds, and publish to both the App Store and Google Play.
Topics:
- Jest setup for React Native
- React Native Testing Library — render, fireEvent, waitFor
- E2E testing with Detox or Maestro
- EAS Build — managed vs bare workflow, build profiles
- App signing — iOS provisioning profiles, Android keystore
- OTA updates with expo-updates
- App Store Connect & Google Play Console submission

### Layer 9 of 10 — id: react-native-9
Title: Advanced Native Integration and New Architecture
Technologies: React Native, TypeScript, JSI, C++
Description: Write custom native modules and turbo modules using the JSI layer to eliminate the bridge bottleneck and unlock synchronous JavaScript-to-native calls. Understand the Fabric renderer and how the new React Native architecture changes component and layout pipelines.
Topics:
- JSI fundamentals and synchronous native calls
- Turbo Modules authoring for iOS and Android
- Fabric renderer and concurrent rendering on mobile
- Bridging third-party native SDKs into RN
- Custom Codegen type-safe specs
- Hermes engine internals and bytecode optimization
- Debugging native code with Xcode and Android Studio

### Layer 10 of 10 — id: react-native-10
Title: CI/CD, OTA Updates and Production Release Management
Technologies: Expo EAS, Fastlane, Sentry, GitHub Actions
Description: Establish a full release pipeline for React Native apps covering automated builds, over-the-air update channels, crash monitoring, and staged rollouts. Learn how to manage multiple environments, signing configurations, and app store submissions without manual steps.
Topics:
- EAS Build and EAS Submit for automated store uploads
- OTA update channels and rollback strategies with EAS Update
- Fastlane lanes for certificate and profile management
- Crash reporting and source-map upload with Sentry
- GitHub Actions workflows for RN mono-repo builds
- Feature flag rollout and A/B testing on mobile
- App store review guidelines and rejection remediation

Start now with Layer 1.
