You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "PWA Developer" (pwa-dev, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: pwa-dev-1
Title: Web Foundations
Technologies: HTML, CSS, HTTP
Description: A PWA is a website first. Solidify the HTML, CSS and HTTP foundations that everything else builds on.
Topics:
- Semantic HTML & accessibility
- Modern CSS layout
- HTTP, HTTPS & the request lifecycle
- The browser rendering pipeline
- DevTools fundamentals
- Why HTTPS is required for PWAs

### Layer 2 of 10 — id: pwa-dev-2
Title: Modern JavaScript
Technologies: JavaScript, ES Modules, Async
Description: PWAs are driven by JavaScript. Master modern language features and asynchronous patterns.
Topics:
- ES modules & bundling
- Promises & async/await
- Fetch API & JSON
- DOM & event handling
- The event loop
- Error handling

### Layer 3 of 10 — id: pwa-dev-3
Title: Responsive & App-Shell UI
Technologies: App Shell, Responsive, UX
Description: Make your web app feel native. Build a responsive app shell that loads instantly and adapts to any device.
Topics:
- The app-shell architecture
- Responsive & adaptive layout
- Touch-friendly UX
- Skeleton screens & perceived performance
- Safe areas & viewport
- Dark mode & theming

### Layer 4 of 10 — id: pwa-dev-4
Title: The Web App Manifest
Technologies: Manifest, Install, Icons
Description: Make your app installable. Configure the web app manifest so users can add it to their home screen.
Topics:
- manifest.json fields
- Icons & maskable icons
- Display modes & theme color
- The install prompt (beforeinstallprompt)
- Splash screens
- Installability criteria

### Layer 5 of 10 — id: pwa-dev-5
Title: Service Workers
Technologies: Service Workers, Lifecycle, Fetch
Description: The heart of every PWA. Master the service worker lifecycle and intercept network requests.
Topics:
- Registering a service worker
- Install, activate & fetch events
- The service worker lifecycle
- Intercepting requests
- Updating service workers safely
- Scope & limitations

### Layer 6 of 10 — id: pwa-dev-6
Title: Caching Strategies & Offline
Technologies: Cache API, Workbox, IndexedDB
Description: Make your app work offline. Apply caching strategies and store data locally for a resilient experience.
Topics:
- The Cache API
- Cache-first, network-first & stale-while-revalidate
- Precaching with Workbox
- IndexedDB for structured data
- Cache versioning & cleanup
- Offline UX patterns

### Layer 7 of 10 — id: pwa-dev-7
Title: Push Notifications & Background Sync
Technologies: Push API, Notifications, Background Sync
Description: Re-engage users like a native app. Add push notifications and sync data in the background.
Topics:
- The Notifications API
- Push API & web-push
- VAPID keys & subscriptions
- Background Sync
- Periodic Background Sync
- Notification UX & permissions

### Layer 8 of 10 — id: pwa-dev-8
Title: Device & Web APIs
Technologies: Web APIs, Geolocation, Capabilities
Description: Tap into device capabilities from the browser. Use the modern web platform APIs that close the gap with native.
Topics:
- Geolocation & device orientation
- Camera & media capture
- Web Share & clipboard
- File System Access
- Web Bluetooth & USB (overview)
- Feature detection & progressive enhancement

### Layer 9 of 10 — id: pwa-dev-9
Title: Performance & Lighthouse
Technologies: Lighthouse, Core Web Vitals, Optimization
Description: Fast is a feature. Measure and optimize your PWA against Core Web Vitals using Lighthouse.
Topics:
- Core Web Vitals — LCP, INP, CLS
- Auditing with Lighthouse
- Code splitting & lazy loading
- Image & asset optimization
- Preloading & resource hints
- Bundle analysis

### Layer 10 of 10 — id: pwa-dev-10
Title: Packaging & Deployment
Technologies: TWA, Hosting, CI/CD
Description: Ship your PWA everywhere. Deploy it, and optionally package it for the app stores.
Topics:
- Deploying to a CDN / static host
- HTTPS & service worker hosting rules
- Packaging for stores with PWABuilder / TWA
- Versioning & update strategy
- Analytics & monitoring
- CI/CD for web apps

Start now with Layer 1.
