# Vahoha UX Audit

Date: 2026-10-15. Static code read only; the app was not run in a browser.

**Coverage.** About 30 of 257 frontend files were read in full: router, layouts, navbar and mobile menu, GetStarted, ForgotPassword, ResetPassword, OAuthSuccess, NotFound, Home, RoadmapPage, ExamPage, Settings, AiAgent (error handling only), ConfirmDialog and the toaster. Repo-wide greps cover the rest. Anything marked **(verify)** is inferred and needs a browser check. Capstone, teams, chat, challenges and billing were not read in depth.

**What is already good** (so we don't break it): the Settings dirty-bar, unsaved-changes blocker and Ctrl+S; ExamPage's `role="timer"`, `aria-live` warnings and retry-submit that keeps answers; the mobile menu's 44px targets and safe-area handling; the AI mentor's typed errors with retry; the invisible-hit-area pattern; and the skeleton plus empty states on Blogs.

## Flows mapped

| Flow | Path through the code |
|---|---|
| Visit | `/` Home → CTA → `/get-started` (guest) or `/my-profile` (signed in) |
| Sign up / log in | `/get-started?mode=signup\|login` (email, Google, GitHub) → `navigate("/")` |
| OAuth (GitHub) | `/oauth-success` → `init()` → `/` or `/get-started` |
| Forgot / reset | `/forgot-password` → email → `/reset-password?token=` → `/get-started` |
| Core: learn | `/roadmaps` (public) → pick category → track → layer → `/roadmaps/exam/:layerId` (protected) → result → `/roadmaps` |
| Core: mentor | `/ai-agent` (protected) |
| Settings | `/my-profile/settings` (dirty bar, blocker, delete account) |
| Guarded routes | `ProtectedLayout` → `ProtectedMyProfile` → `navigate("/get-started")` |

---

## A. Flows and steps

**A1. Every "go to login" link lands on the Create-account form.** (High, S)
- Where: `GetStarted.jsx:37` (`isSignedUp = mode !== "login"`). The links that omit `?mode=login` are `ForgotPassword.jsx:64,113` ("Back to login", "Sign in"), `ResetPassword.jsx:55` (redirect after a successful reset), `Navbar.jsx:36` (logout), `ProtectedMyProfile.jsx:11` and `OAuthSuccess.jsx:23`.
- Why it hurts: someone who just reset their password, logged out, or was bounced off a protected page sees "Create your account" with first/last name fields. They think they're in the wrong place or start a duplicate signup.
- Fix: add `?mode=login` to returning-user links (reset success, back-to-login, logout). Keep signup as the default only for the marketing CTAs.

**A2. The login redirect forgets where you were going.** (High, S)
- Where: `ProtectedMyProfile.jsx:11` redirects to `/get-started` with no state. `GetStarted.jsx:87` and `:138` always `navigate("/")`.
- Why it hurts: a guest clicks "Take exam" or opens a shared `/coding-challenges/xyz` link, signs in, and lands on Home. The main conversion path (roadmap → exam) ends in a dead end.
- Fix: pass `state: { from: location }` and `?mode=login` on redirect. After auth, `navigate(from ?? "/", { replace: true })`. For GitHub OAuth, keep the destination in a short-lived `sessionStorage` key or the OAuth `state` param.

**A3. A signed-in user's main CTA goes to the profile page, not to learning.** (Med, S)
- Where: `Home.jsx:61` (`auth ? "/my-profile" : ...`), labelled "Start your path →".
- Why it hurts: the label promises the roadmap and the destination is a profile page.
- Fix: send signed-in users to `/roadmaps`, or to their next step if `/progress` has one.

**A4. Onboarding asks five questions and saves one.** (Med, S for copy, M to fix properly)
- Where: `RoadmapPage.jsx:21-23`. The code comment says only `skillLevel` is persisted. The panel also asks goal, background, weekly time and track.
- Why it hurts: users answer questions that change nothing, and the toast says "your mentor will use this to calibrate."
- Fix: either persist the other answers (the backend is the larger part) or remove those questions until they're used.

**A5. Onboarding failure discards the user's answers.** (Med, S)
- Where: `RoadmapPage.jsx:27-29` calls `setPanelOpen(false)` whether or not the save worked. The toast then says "try Start Path again."
- Fix: keep the panel open on failure, show the error inline with a Retry button, and close only on success.

**A6. The pass screen auto-leaves after 3 seconds.** (Med, S)
- Where: `ExamPage.jsx:100-105`.
- Why it hurts: the user is reading their score, XP and the missed-topic list (including the Teach-back widget) when the page navigates away. There's no cancel.
- Fix: remove the timer and show a "Back to roadmap" primary button, or show a countdown the user can cancel. The ✅ moment should belong to the user.

**A7. Exam: Previous drops the answer you just picked.** (Med, S)
- Where: `ExamPage.jsx:390-394`. `handlePrev` doesn't save `selected` before moving back, so a choice made but not yet "Next"-ed is lost.
- Fix: persist `selected` into `answers` in `handlePrev` (same as `handleNext` does).

**A8. Exam: no way to skip, flag or jump between questions.** (Low, M)
- Where: `ExamPage.jsx:506`. Next is disabled until an option is chosen.
- Why it hurts: with a timer running, a stuck user can't move on and come back.
- Fix: allow "Skip", show a numbered question strip, and warn "N unanswered" on submit. Timer-expiry already submits partial answers.

---

## B. Missing or weak states

**B1. Route guard shows a blank page while checking auth.** (Med, S)
- Where: `ProtectedMyProfile.jsx:15-16` and `PublicOnlyRoute.jsx:7` return `null` while `isLoading`.
- Why it hurts: a returning user opening a deep link sees an empty `<main>` (navbar and footer only) until the refresh call returns. On a cold Render dyno that can take many seconds, with no feedback.
- Fix: render `<LoadingSuspense fill />` instead of `null`. Optionally, show "Waking up the server…" after about 4s.

**B2. All runtime errors render "404 Not found!".** (High, S)
- Where: `router.jsx:97` sets `errorElement: <NotFound />`, so a crash in any page, or a failed lazy chunk after a deploy, shows a 404.
- Why it hurts: users believe the page doesn't exist. Nobody reports "chunk load failed" as a 404. After each deploy, users with stale tabs will hit this.
- Fix: add a small `RouteError` component using `useRouteError()`. For a 404 response, show NotFound. Otherwise show "Something went wrong" with a Reload button (chunk errors → `location.reload()`).

**B3. The 404 page is a dead end and not readable by assistive tech.** (Med, S)
- Where: `NotFound.jsx` renders only two `FuzzyText` canvases (the component draws to `<canvas>`).
- Why it hurts: there's no link home and no real text. Screen readers get nothing, and users can't search or copy anything.
- Fix: keep the effect but add a visually-hidden `<h1>`, one sentence ("That page doesn't exist."), and links to Home and Roadmaps.

**B4. OAuth failure is silent.** (Med, S)
- Where: `OAuthSuccess.jsx:22-23` sends a failed login to `/get-started` with no message. The loading state is a bare `<p>`.
- Fix: navigate with `state: { error: "GitHub sign-in didn't complete. Try again." }` and show it in the auth banner. Use `<LoadingSuspense>` for the wait.

**B5. Settings profile load has no visible failure state.** (Med, S) **(verify)**
- Where: `Settings.jsx:165-167` calls `fetchProfile()` with no error handling in the page. If the store doesn't expose an error, a failed fetch likely leaves an empty form.
- Why it hurts: saving an empty form over a real profile is the worst case.
- Fix: surface `error` from `useProfileStore` with a Retry button, and disable save until `originalData` exists (the dirty check already needs it).

**B6. Stacked loaders on each page.** (Low, M)
- Where: route-level spinner (`MainLayout.jsx:31`, `LoadingSuspense`) and then page-level spinners/skeletons (ExamPage `Loader2`, Settings skeletons).
- Why it hurts: spinner → blank → skeleton looks like three loads.
- Fix: for the heaviest routes (roadmap, exam, settings), use a route-specific skeleton as the Suspense fallback.

**B7. Exam generation shows only "Loading your exam...".** (Low, S)
- Where: `ExamPage.jsx:322-330`. The questions come from an LLM call (`/api/exams/generate`), which can take many seconds.
- Fix: say "Generating your exam, this can take about 10 seconds," and show a Cancel/Back button.

---

## C. Copy and labels

**C1. Hero headline doesn't say what the product does.** (Med, S)
- Where: `Home.jsx:41`: "The Next Generation of Developer Learning." The `<meta description>` in `index.html` is much clearer: "earn your roadmap layer by layer. Pass a graded exam to unlock each step, with an AI mentor."
- Fix: use the meta description's idea in the hero, e.g. "Learn by proving it. Pass an exam to unlock each step of your developer roadmap." Keep "Built by devs, for devs" as a small line.

**C2. Password rules appear only after an error.** (High, S)
- Where: `GetStarted.jsx:283-293` (min 6 plus one of `!@#$%^&*()`), shown only on blur. `ResetPassword.jsx:89` has a placeholder hint, signup has none.
- Why it hurts: people type a normal password, tab out, get "Must include at least one symbol," and retype twice (password plus confirm).
- Fix: show a one-line hint under the field on signup ("6+ characters, including a symbol like !@#"). Consider replacing the symbol rule with a length minimum of 8+ (current NIST guidance prefers length over composition rules). That's a backend change too.

**C3. Errors are shown twice.** (Low, S)
- Where: `GetStarted.jsx:85-108` sets the banner and also calls `toast.error` with the same text.
- Fix: keep the inline banner (it's closer to the form and persists), drop the toast for form errors. Use toasts for success and transient events only.

**C4. Settings link fields all say "Enter URL".** (Low, S)
- Where: `Settings.jsx:473-512`.
- Fix: use specific placeholders ("github.com/username"). Also rename "Twitter" to "X (Twitter)" or match what profile pages display.

**C5. Mobile menu search says "Search posts..."** (Low, S)
- Where: `MobileMenu.jsx:87`. Clarify whether it searches posts only. If that's the case, the label is fine on desktop too.

**C6. Disabled "Start Path" explains itself only via `title`.** (Low, S)
- Where: `RoadmapPage.jsx:69-70`. Touch devices never show `title`.
- Fix: replace with visible helper text ("Pick a track to start") or hide the button until a track is selected.

---

## D. Visual consistency

**D1. Accent colour differs between sibling auth pages.** (Med, S)
- Where: GetStarted's submit and focus ring are `fuchsia-*`; ForgotPassword and ResetPassword use `purple-600` buttons, with fuchsia focus rings. The rest of the app uses purple.
- Fix: pick purple as the single accent (matches `CLAUDE.md` for Teams and the rest of the site) and apply it everywhere.

**D2. The input/label class strings are copy-pasted into 3 auth pages**, while `@/components/ui/field` (`INPUT_CLASS`) already exists and Settings uses it. (Med, M)
- Where: `GetStarted.jsx:14-22`, `ForgotPassword.jsx:6-9`, `ResetPassword.jsx:7-12`. The pasted copies have already drifted (`min-h-10` vs none, 44px eye button vs 16px).
- Fix: extract an `<AuthCard>` (card surface and heading), and a `<PasswordField>` (input, eye toggle, error). It also removes about 150 duplicated lines.

**D3. Card surfaces differ.** (Low, S)
- Where: GetStarted `dark:bg-neutral-800/60` and ForgotPassword/ResetPassword `dark:bg-zinc-900`. A white light-mode card exists in all three.
- Fix: covered by D2.

**D4. Light-mode styles look vestigial.** (Low, S) **(verify)**
- Where: `MainLayout.jsx:15` hard-codes `bg-black`, `index.html` defaults to dark, and `useThemeStore` is only used in 7 files. I found no theme toggle UI.
- Why it hurts: unused `bg-white`/`light` branches add noise and make "which theme is real?" unclear. If a stale `theme=light` is in localStorage, pages mix black shell and white cards.
- Fix: decide now. Either ship dark-only (strip light branches over time) or add a real toggle and fix MainLayout.

**D5. Viewport units are mixed.** (Low, S)
- Where: `ExamPage.jsx` uses `min-h-screen` (several screens), most of the app uses `min-h-dvh`. On iOS the address bar causes jumps with `vh`.
- Fix: use `min-h-dvh` everywhere. Also, exam pages inside `<main className="min-h-dvh">` plus navbar are always taller than the viewport, so the page scrolls even when it shouldn't.

---

## E. Accessibility

**E1. No "skip to content" link.** (Med, S)
- Where: `MainLayout.jsx`; the repo-wide grep finds none.
- Why it hurts: keyboard users tab through the whole navbar (many groups) on every page.
- Fix: add a visually-hidden link as the first child that becomes visible on focus, targeting `<main id="main">`.

**E2. Auth form errors aren't announced or linked.** (Med, S)
- Where: `GetStarted.jsx:166` banner lacks `role="alert"`. Inputs lack `aria-invalid` and `aria-describedby` (Settings' username field does it right). `ForgotPassword.jsx`/`ResetPassword.jsx` report errors only via toast.
- Fix: banner `role="alert"`, inputs `aria-invalid={!!errors.x}` and `aria-describedby="x-error"`, and give the error `<p>` that id. Put this in the shared `PasswordField` and `TextField` from D2.

**E3. `ConfirmDialog` has no focus trap or focus return.** (Med, M)
- Where: `ConfirmDialog.jsx`. It handles Esc and autofocuses Cancel (good), but Tab can leave the dialog, background scroll isn't locked, and focus isn't returned on close.
- Fix: use the native `<dialog>` with `showModal()` (built-in trap, Esc, backdrop, focus return), without a new library. The dialog is used for delete-account and unsaved-changes flows, so it matters.

**E4. Exam answer list uses `role="radio"` without radio keyboard behavior.** (Med, M)
- Where: `ExamPage.jsx:458-475`: each option is a tab stop, with no arrow-key movement.
- Fix: either use real `<input type="radio">` inside labels (simplest, arrow keys for free), or implement roving tabindex. Also add number-key shortcuts (1-4) and Enter for Next, which also helps timed exams.

**E5. Exam/leave confirmation uses `window.confirm`.** (Low, S)
- Where: `ExamPage.jsx:315`. `ConfirmDialog.jsx`'s own header comment says it replaces `window.confirm`.
- Fix: use `ConfirmDialog`. It's inconsistent today and the browser prompt reads as a warning.

**E6. Low contrast and tiny text.** (Med, M)
- Where: `text-neutral-600` on black is about 2.7:1 (fails 4.5:1), used for e.g. `ExamPage.jsx:138,149,163`. `text-neutral-500` on black is about 4.4:1, borderline. Repo-wide: 267 uses of `text-(neutral|zinc|gray)-(500|600|700)` in 85 files, and 197 uses of `text-[9-11px]` in 77 files.
- Fix: set a floor: body/secondary text at `neutral-400` or lighter on black, `neutral-500` only for decorative text, nothing under 12px for readable content. This also matches the existing "mobile text = desktop size" preference. Do it as one pass using a small set of text tokens.

**E7. `outline-none` used in 76 places.** (Med, M) **(verify)**
- Where: 50 files. Most pair it with a ring (GetStarted does), but I only checked a few. `focus-visible` appears in 101 places, so coverage is probably decent but uneven.
- Fix: grep each `outline-none` for a nearby `focus-visible:ring`/`focus:ring`. Add a global `:focus-visible` outline fallback in `index.css` so nothing is ever invisible.

**E8. Decorative loader/`aria-live` coverage is thin.** (Low, M)
- Where: `role="alert"`/`aria-live` appears in 23 files; toasts (Sonner) are live regions already, but inline async results (Settings "Saved", username availability, search results) don't announce.
- Fix: add `aria-live="polite"` to the username-status line and the SaveBar status.

**E9. GitHub OAuth button has no pending state, and the Google sign-in is a hidden-button hack.** (Med, S) **(verify)**
- Where: `GetStarted.jsx:392-410`. A custom button calls `.click()` on `div[role=button]` inside a `display:none` wrapper holding Google's real button. If Google's markup changes, or it hasn't rendered, the click silently does nothing.
- Fix: at minimum, guard with a toast if the element isn't found. Better, use Google's `useGoogleLogin` hook (same library), which gives a proper custom button with no DOM poking. For GitHub, set a `redirecting` state and disable both buttons to avoid double-clicks.

---

## F. Mobile and responsive

The navbar and mobile menu are solid. Remaining issues:

**F1. Start Path floating tab on touch screens.** (Low, S)
- Where: `RoadmapPage.jsx:72-79` is fixed at the right edge, `top-1/4`, and grows on hover (`hover:px-4`). Hover doesn't exist on touch, and it can overlap content on small screens.
- Fix: on mobile, make it a normal button in the page flow (under the track selector) or a bottom bar.

**F2. Signup stacks name fields on mobile, which is correct, but the form has 5 fields plus two OAuth buttons below the fold.** (Low, S)
- Fix: move the OAuth buttons above the form on mobile ("Continue with Google" first). Social login typically has the highest conversion.

**F3. Exam top bar and timer on narrow screens.** (Low, S) **(verify)**
- Where: `ExamPage.jsx:399-416`. Check wrap at 320px. Timer text is `text-sm` mono.

---

## G. Feedback gaps

**G1. Success toast on login is only 900ms.** (Low, S)
- Where: `GetStarted.jsx:85`. It's too short to read and the user is navigated anyway. Remove it; the route change is the feedback, or lengthen to default.

**G2. Reset password success relies on a timer.** (Low, S)
- Where: `ResetPassword.jsx:54-55`. `setTimeout(navigate, 1500)` isn't cleaned up. Show a success state with a "Sign in" button (see A1) rather than auto-redirecting.

**G3. Reset link validity only discovered on submit.** (Low, M)
- Where: `ResetPassword.jsx:25-39` only checks that a token exists. An expired token fails after the user has typed a new password.
- Fix: validate the token on mount with a cheap `GET`, if the backend supports it.

**G4. Default username is generated silently at signup.** (Low, S) **(verify)**
- Where: `GetStarted.jsx:51-58, 71`. `johndoe` could collide, and the user never sees it. Settings lets them change it, but it's their public URL.
- Fix: show the generated username on the post-signup screen, or on the first-run profile checklist.

**G5. Signup has no terms/privacy consent line.** (Low, S)
- Where: `GetStarted.jsx`. Routes `/terms` and `/privacy` exist but are not linked from signup.
- Fix: add "By creating an account you agree to the Terms and Privacy Policy" under the submit button.

---

## H. Performance users feel

**H1. Auth check blocks protected pages.** See B1. This is the main "slow" feeling on return visits.

**H2. Prerender handoff + `has-session` hack.** (Info)
- Where: `index.html`. The code deliberately hides the guest nav for returning users to avoid flicker. Good, but make sure `LoadingSuspense` in `MainLayout` doesn't flash *after* the handoff (verify on a throttled connection).

**H3. Hero CTAs fade in at 800ms.** (Low, S)
- Where: `Home.jsx:56-58` (`--delay: 800ms`). The primary action isn't clickable-looking for nearly a second on every visit.
- Fix: show CTAs immediately (no delay), animate only the headline. Respect `prefers-reduced-motion` (`RiseText.css` already does).

**H4. Several heavy dependencies on the roadmap path** (framer-motion, reactflow nodes in `rf/`). (Low, M) **(verify)**
- Fix: check the build output (`vite build` chunk sizes, or `rollup-plugin-visualizer`). Consider lazy-loading the roadmap graph only when selected. Don't optimize before measuring.

---

## Top 10 fixes by impact ÷ effort

| # | Fix | Issues | Impact | Effort |
|---|---|---|---|---|
| 1 | Add `?mode=login` to every returning-user link (reset success, back-to-login, logout, protected redirect) | A1 | High | S |
| 2 | Remember the destination through login (`from` state, then `navigate(from)`) | A2 | High | S |
| 3 | Real route error page instead of "404" for crashes and stale chunks | B2 | High | S |
| 4 | Show the password rule up front on signup | C2 | High | S |
| 5 | Replace `null` with a loader in the auth guards | B1, H1 | Med-High | S |
| 6 | Exam: don't auto-leave the pass screen; save answer on Previous | A6, A7 | Med | S |
| 7 | Keep the onboarding panel open on save failure; stop asking unused questions | A4, A5 | Med | S |
| 8 | 404 page: add real text and links home | B3 | Med | S |
| 9 | Auth forms: `role="alert"`, `aria-invalid`, `aria-describedby`; unify accent to purple (extract shared `AuthCard` / `PasswordField`) | E2, D1, D2 | Med | M |
| 10 | Skip link + exam answers as real radios with keyboard shortcuts | E1, E4 | Med | S-M |

Bigger items to schedule after those: the contrast/tiny-text pass (E6), `ConfirmDialog` → native `<dialog>` (E3), the theme decision (D4), and measuring bundle size (H4).

**Not covered here, worth a follow-up audit:** capstone, teams, chat, coding challenges, billing and the AI mentor UI beyond its error handling. Teams has never been run end to end, so real use will likely find more than code reading can.
