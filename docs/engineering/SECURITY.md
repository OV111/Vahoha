# Security: Vahoha

> **Updated:** 2026-10-21. Written from the code (reading and grep, no penetration test). The original 2026-06-11 white-box audit is kept unchanged at the bottom as history.
> See also: [Architecture](ARCHITECTURE.md) · [API](API.md) · [AI](AI.md) · [Deployment](DEPLOYMENT.md) · [Billing](BILLING.md)

**Contents:** [How security works](#how-security-works) · [Known risks](#known-risks) · [Fixed](#fixed-since-the-june-audit) · [Fix order](#fix-order) · [Original audit](#original-audit-2026-06-11)

---

## How security works

| Area | What the code does | Where |
|---|---|---|
| **Passwords** | Hashed (bcrypt). Signup needs 6+ characters. OAuth-only accounts have `password: null` | `modules/auth` |
| **Access tokens** | JWT, 15 minutes, sent as a Bearer header, kept in memory in the browser. A refresh token presented as an access token is rejected | `middleware/authenticate.js`, `utils/jwtToken.js` |
| **Sessions** | Refresh token in an httpOnly, `Secure`, `SameSite=None` cookie. 30 idle days. A SHA-256 of the token id is stored server-side, rotated on every use, revocable. Reuse of an old token is refused | `refreshTokenService.js` |
| **Sign-in methods** | Password, Google ID token, GitHub OAuth, magic link. GitHub state is bound to a nonce. A provider sign-in cannot take over an unverified password account (`claimVerifiedEmail` wipes the password and revokes sessions) | `auth.controller.js` |
| **Login abuse** | 5 attempts per 15 minutes (per IP and per email), signup 10 per hour, reset and magic-link limiters. Redis counters with an in-memory fallback | `auth.routes.js` |
| **Authorization** | `authenticate` on most routes. `requireAdmin` re-reads `users.role` from the database on every request (not from the token) and answers **404**, not 403, to non-admins. Older profile, user and post controllers verify the token themselves | `middleware/requireAdmin.js` |
| **Object access** | Chat rooms check membership. Direct rooms need a mutual follow and no block. Capstone repo must belong to the learner's connected GitHub login. Team writes are admin-only | `chatService.js`, `capstone` |
| **Input validation** | Zod through the `validate` middleware on newer routes (auth, billing, capstone, teams, challenges, recruiter, contact, onboarding, account, mentor). Older community routes validate in the controller | `middleware/validate.js` |
| **Headers** | `helmet` (custom CSP for PostHog, blob workers), mounted after `/api-docs`. Vercel adds HSTS, `nosniff`, `X-Frame-Options: DENY`, COOP, Referrer-Policy | `app.js`, `vercel.json` |
| **CORS** | One origin (`FRONTEND_URL`), credentials on. WebSocket handshakes from other origins are refused | `app.js`, `websocket/origin.js` |
| **Proxy** | `trust proxy` is 1 (Render adds one hop), so `req.ip` is the client and limiters cannot be walked past with a spoofed header | `app.js` |
| **Secrets** | Read from environment variables. `.env*` files are gitignored (only `.env.example` is tracked). The server refuses to boot without the JWT secrets or `MONGO_URI`. Billing config fails closed: no webhook secret means every webhook is rejected (503) | `server.js`, `billingConfig.js` |
| **Webhooks** | Polar webhook signature checked over the raw body. Stale or replayed events are safe | `webhookService.js` |
| **Uploads** | Magic-byte check on uploads (`utils/fileSignature.js`). Files live on Cloudinary, only URLs in Mongo | `profile`, `chat` |
| **Code runner** | Submitted challenge code runs in an `isolated-vm` isolate (64 MB, 5 s). In production it fails closed if the addon is missing. The grading harness freezes intrinsics and takes the export name from the challenge, not the client | `runnerService.js` |
| **Exam integrity** | Answer keys stay server-side. No route accepts a client score (the old one was deleted). Layer order enforced at generate | `examEngineService.js` |
| **AI** | Untrusted repo text and attachments are fenced; the mentor's code output is capped by `SolutionGuard` | [AI](AI.md#guardrails) |
| **Data protection** | Account deletion endpoint with password and confirmation (`DELETE /deleteAccount`). Password hash is not returned from the profile route. Refresh tokens and reset tokens are stored hashed | `account`, `profile` |
| **Privacy** | Public evidence and the recruiter scorecard are opt-in. Team evidence names members, so consent is needed before it is issued | `recruiter`, `teams` |

---

## Known risks

Verified against the code on 2026-10-21. Ordered by severity.

| # | Risk | Severity | Detail | Fix |
|---|---|---|---|---|
| 1 | **Secrets rotation unconfirmed** | High | The June audit found live secrets in `.env`; whether they were rotated cannot be seen from code. A dev GitHub client secret was pasted into a chat, and a Polar sandbox token and secret were exposed in the past | Rotate all, then record it |
| 2 | **Code runner not independently reviewed** | High | Largest attack surface. The sandbox is `isolated-vm`; there has been no external review. If the native addon fails to build the runner refuses submissions in production (good), unless `ALLOW_UNSAFE_RUNNER=true` | Confirm the runner reports `isolated-vm` after every deploy; get a review before public traffic |
| 3 | **Dependency advisories** | High | `npm audit --omit=dev` reports high-severity advisories (for example `lodash`, `ip-address`, `minimatch`, `brace-expansion`, `nanoid`, `postcss`), some in transitive packages. The October audit also named `ws`, `path-to-regexp`, `express-rate-limit`, `qs` | `npm audit fix`, then review what remains. Add `npm audit` to CI |
| 4 | **WebSocket abuse** | Medium | No `maxPayload` on the `ws` server and no per-message size cap or rate limit. A socket stays open after its access token expires | Set `maxPayload`, cap message length, rate-limit per user, re-check token age |
| 5 | **Error text leaks** | Medium | About 15 handlers still return `error: err.message` (for example signup and the GitHub callback). There is no global error handler | One error middleware and typed errors; stop returning `err.message` |
| 6 | **Rate limits are per process** | Medium | Limiter stores for AI, billing and most routes are in memory, so a restart resets them and a second instance doubles them. Auth limits use Redis when available | Redis store before scaling out |
| 7 | **`/api-docs` is public in production** | Low | Swagger UI is mounted unconditionally and lists every route | Disable or gate it when `NODE_ENV=production` |
| 8 | **Mixed auth pattern** | Medium | `/my-profile`, `/users` and `POST /blogs` check the token inside each controller instead of with the `authenticate` middleware. One missed call is an open route. Chat controllers use their own local `authenticate` helper | Mount `authenticate` on those routers and remove the copies |
| 9 | **Two `POST /blogs` handlers** | Low | `blogs.routes.js` (authenticated) and `post.routes.js` (checks inside the controller) both register `POST /blogs`. `TODO: confirm` which one serves requests and delete the other | Delete the duplicate |
| 10 | **Draft posts and email exposure** | Low | From the October audit: draft blogs readable by id, the mutual-followers response includes email, `getClientIp` trusts the first `X-Forwarded-For` entry, `postsCount` is user-settable, few length limits on profile fields. `TODO: confirm` each is still open | Re-test, then fix |
| 11 | **Unverified email on password signup** | Low | Email is verified only through OAuth and magic link. `claimVerifiedEmail` handles the takeover case. `TODO: confirm` no password flow treats an unverified email as proof | Add email verification on password signup |
| 12 | **Sign-in message differences** | Low | Login says "Invalid email or password", but deliberately gives a different hint to a Google-only account, which reveals that an email is registered with Google | Accept, or return the same message |
| 13 | **Single-instance WebSocket state** | Low | The `rooms` map is in memory, so chat breaks under more than one instance | Redis pub/sub when scaling |
| 14 | **No monitoring** | Medium | No Sentry or alerting. A security incident would go unnoticed | Add error monitoring and log retention |
| 15 | **No security tests in CI** | Low | `npm run test:security` exists but CI runs only lint, build and unit tests | Add it to the workflow |

---

## Fixed since the June audit

| Was | Now |
|---|---|
| Chat IDOR and room squatting (any user reads any room) | Membership check, mutual-follow and block checks, room id must be the sorted pair |
| 7-day JWT, no revocation | 15-minute access token, rotating revocable refresh token |
| JWT in the OAuth redirect URL | Cookie plus redirect with no token |
| OAuth sign-in could take over an unverified account (M3) | `claimVerifiedEmail` wipes the unverified password and revokes sessions |
| GitHub login CSRF (M2) | State is a nonce (`createOAuthNonce`). `TODO: confirm` the binding by a test |
| NoSQL operator injection on auth routes | Zod schemas on auth routes |
| Route that accepted client exam scores (H1) | Deleted |
| Challenge grader could be forged (H2) | Harness hardened, export name from the challenge |
| Upload MIME trust (H4) | Magic-byte check |
| Password hash returned in the profile response (M1) | Removed |
| Capstone repo not tied to the learner (M6) | Repo owner must equal the connected GitHub login |
| Challenge HTML rendered with `dangerouslySetInnerHTML` (M4) | Challenge text goes through markdown (`challengeMarkdown`). Only `ThinkingSpinner.jsx` uses `dangerouslySetInnerHTML` |
| Plaintext session cookie, no `Secure` | httpOnly `Secure` cookie |
| No security headers | `helmet` plus Vercel headers |
| Unbounded LLM cost | Per-user burst and daily limits |

---

## Fix order

1. Rotate and record all secrets (risk 1).
2. Run `npm audit fix` and add `npm audit` and `test:security` to CI (risks 3, 15).
3. Verify the runner in production and book a review (risk 2).
4. Mount `authenticate` on `/my-profile`, `/users` and `/blogs`; delete the duplicate `POST /blogs` (risks 8, 9).
5. One error handler, no `err.message` in responses (risk 5).
6. WebSocket limits (risk 4).
7. Hide `/api-docs` in production (risk 7).
8. Redis-backed limiters and error monitoring before more than one instance or real traffic (risks 6, 13, 14).

---

# Original audit (2026-06-11)

> History. Everything above this heading is current; everything below is the June 2026 audit as written then, so statuses in it are out of date.

## Summary

I reviewed the Express/MongoDB backend, JWT auth, WebSocket chat, OAuth flows, and the React frontend. The single most urgent issue is that **live production secrets are sitting in `backend/.env`** — rotate those today regardless of anything else. Below are all findings, ordered by severity.

---

## Findings

### 🔴 CRITICAL — Live secrets exposed in `.env`

📍 **Location:** `backend/.env`

💥 **Attack scenario:** The file contains real, working credentials: a MongoDB Atlas connection string with username + password, the JWT signing secret, Cloudinary API secret, a Resend API key, and Gemini/Groq keys. A second commented-out DB URI with another password is also present. Anyone who obtains this file gets full read/write to the entire database, can forge any user's JWT (full account takeover of every account), upload/delete media, and send mail as you. The JWT secret leak alone means auth is completely broken — an attacker mints a token for any `id`.

🛡️ **Fix:**

1. **Rotate every credential now**: Atlas DB password, `JWT_Secret` (invalidates all existing tokens — acceptable), Cloudinary secret, Resend, Gemini, Groq, and the GitHub OAuth client secret.
2. Confirm the file is git-ignored and purge it from history if ever committed:
```bash
git rm --cached backend/.env
echo "backend/.env" >> .gitignore
# scrub history with git filter-repo if it was ever pushed
```
3. Generate a strong random JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
4. Move secrets to the host's secret manager (Render and Vercel env vars), never a file in the tree.

---

### 🔴 CRITICAL — Chat IDOR: any user can read any conversation

📍 **Location:** `backend/websocket/chatHandler.js` — `joinRoom`

💥 **Attack scenario:** `joinRoom` trusts the client-supplied `roomId` and `receiverId` with no check that the authenticated user is actually a member of that room. It even *overwrites* `members` to `[receiverId, senderId]` on join. An authenticated attacker sends `{type:"join_room", roomId:"<any room>", receiverId:"<self>"}` and immediately receives the full `message_history` for that room — reading private DMs between other users. Room IDs are likely derived from the two user IDs, so they're guessable.

🛡️ **Fix:** Before joining, load the room and verify membership; never overwrite `members` from client input.
```js
const room = await roomCollection.findOne({ _id: roomId.toString() });
if (room && !room.members.includes(senderId.toString())) {
  return ws.send(JSON.stringify({ type: "error", message: "Forbidden" }));
}
```
Derive `roomId` server-side from the sorted pair of user IDs and reject any room the user isn't part of.

---

### 🟠 HIGH — JWT delivers no revocation and `/verify-token` is trust-only

📍 **Location:** `backend/utils/jwtToken.js`, `backend/modules/auth/routes/auth.routes.js` — `GET /verify-token`

💥 **Attack scenario:** `/verify-token` only validates the signature and returns `{valid:true/false}` — it doesn't confirm the user still exists or isn't deleted/banned. Combined with 7-day tokens, no refresh, and no revocation/blacklist, a stolen token is valid for a week with no way to kill it. There's also no token versioning, so rotating the secret is your only revocation tool.

🛡️ **Fix:** Add short-lived access tokens (15 min) + refresh tokens stored httpOnly, include a `tokenVersion` claim you can bump per-user to revoke, and check the user exists/is active on every protected request.

---

### 🟠 HIGH — JWT delivered via URL query string on OAuth success

📍 **Location:** `backend/modules/auth/controllers/auth.controller.js:304` (GitHub callback), `src/components/feedback/OAuthSuccess.jsx`

💥 **Attack scenario:** GitHub callback redirects to `/oauth-success?token=<JWT>`. Tokens in URLs leak through browser history, the `Referer` header to any third-party resource on that page, server access logs, and proxy logs. Anyone who reads one of those gets a 7-day valid session.

🛡️ **Fix:** Set the token in an httpOnly, Secure, SameSite cookie server-side during the redirect, or POST it via a short-lived one-time code exchanged for the token. Never put JWTs in URLs.

---

### 🟠 HIGH — OAuth account auto-linking by email → account takeover

📍 **Location:** `backend/modules/auth/controllers/auth.controller.js:286` — `githubCallback` sign-in mode

💥 **Attack scenario:** Sign-in matches `{$or:[{githubId},{email: primaryEmail}]}`. If a victim registered with email/password, an attacker who creates a GitHub account using the victim's email address is handed the victim's existing account — no password needed. The `state`-based link flow (`modules/auth/controllers/auth.controller.js:196`) is also a base64 JWT with no CSRF/nonce protection, making it vulnerable to OAuth login-CSRF.

🛡️ **Fix:** Never auto-link accounts by email alone — require the logged-in user to explicitly link, or force email re-verification before merging. Use a signed, single-use `state` nonce for CSRF protection on the OAuth flow rather than embedding the JWT.

---

### 🟠 HIGH — NoSQL operator injection in login / forgot-password

📍 **Location:** `backend/modules/auth/controllers/auth.controller.js` — `login`, `forgotPassword`, `signUp`

💥 **Attack scenario:** `email` and `password` come straight from `req.body` into `users.findOne({ email })` without type validation. Sending `{"email": {"$gt": ""}}` makes Mongo match the first user in the collection. For `forgotPassword` this lets an attacker trigger a password reset against an arbitrary matched user. The pattern exists anywhere `req.body` fields flow directly into MongoDB queries.

🛡️ **Fix:** Validate and coerce all inputs to strings before querying. Add a schema validator (zod or Joi) on every route:
```js
if (typeof email !== "string" || typeof password !== "string")
  return res.status(400).json({ message: "Invalid input" });
```

---

### 🟠 HIGH — Broken/missing auth on `PUT /my-profile/` (updateLastActive) + inconsistent auth pattern

📍 **Location:** `backend/modules/profile/controllers/profile.controller.js:32`, `backend/modules/profile/routes/profile.routes.js`

💥 **Attack scenario:** `PUT /my-profile/` has no auth middleware and takes `id` directly from the request body. Any anonymous caller can write `lastActive` for any user ID. More broadly, none of the `/my-profile` routes mount the `authenticate` middleware — each controller re-implements token parsing inconsistently (`replace("Bearer ")` vs `split(" ")[1]`), creating gaps and inconsistencies.

🛡️ **Fix:** Apply the `authenticate` middleware to the entire `/my-profile` router and derive the user ID from `req.user._id`, never from the request body:
```js
// profile.routes.js
router.use(authenticate); // apply once for all routes

// modules/profile/controllers/profile.controller.js — updateLastActive
export const updateLastActive = async (req, res) => {
  const { lastActive } = req.body; // id comes from req.user._id
  const result = await updateLastActiveService(req.app.locals.db, req.user._id, lastActive);
  ...
};
```

---

### 🟡 MEDIUM — Insecure session cookie flags

📍 **Location:** `backend/modules/auth/routes/auth.routes.js:208` — login route

💥 **Attack scenario:** The session cookie is set with `secure: false` and stores the raw user ID as plaintext. Over plain HTTP the cookie travels in cleartext. Even though JWT is the primary auth mechanism, shipping `secure: false` in production enables interception and exposes internal user IDs unnecessarily.

🛡️ **Fix:**
```js
res.cookie("session", String(result.userId), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ← fix
  sameSite: "strict",
  maxAge: 60 * 60 * 1000,
  path: "/",
});
```

---

### 🟡 MEDIUM — Username enumeration via differentiated login error messages

📍 **Location:** `backend/modules/auth/controllers/auth.controller.js:110-122` — `login`

💥 **Attack scenario:** Login returns `404 "User is not Found!"` when the email doesn't exist, but `401 "Password is incorrect"` when it does. An attacker can enumerate which email addresses have registered accounts. (`forgotPassword` correctly uses a uniform message — match that behavior here.)

🛡️ **Fix:** Return a single generic `401 "Invalid email or password"` for both the not-found and wrong-password cases.

---

### 🟡 MEDIUM — Internal error messages leaked to clients

📍 **Location:** Throughout — `auth.routes.js:143`, most controllers return `error: err.message`

💥 **Attack scenario:** Raw `err.message` from Node.js/MongoDB driver is returned in JSON responses, disclosing schema names, driver versions, and internal logic to attackers.

🛡️ **Fix:** Log details server-side with a correlation ID; return only a generic message to the client:
```js
// Generic error handler
app.use((err, req, res, next) => {
  const id = crypto.randomUUID();
  console.error({ id, err });
  res.status(500).json({ message: "Internal server error", ref: id });
});
```
Remove all `error: err.message` from production response bodies.

---

### 🟡 MEDIUM — No rate limiting outside login/signup; Redis failure causes 500

📍 **Location:** `backend/modules/auth/routes/auth.routes.js`, `backend/modules/blogs/routes/blogs.routes.js`, WebSocket

💥 **Attack scenario:** `forgot-password`, `reset-password`, comment posting, blog creation, search, and the WebSocket have no rate limits — enabling password-reset email bombing, comment/blog spam, and brute-force of reset tokens. Additionally, the login/signup handlers call `redisConnection.get(...)` directly without the null guard used by `redisIncr`; if Redis is unavailable these routes throw and return 500, a self-inflicted DoS. `express-rate-limit` is installed but not applied globally.

🛡️ **Fix:** Apply `express-rate-limit` globally and with tighter limits on sensitive routes. Guard every direct Redis call with a null check:
```js
const count = redisConnection ? await redisConnection.get(key) : null;
```

---

### 🟡 MEDIUM — Missing security headers (no Helmet)

📍 **Location:** `backend/app.js`

💥 **Attack scenario:** No CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, or `Referrer-Policy`. This widens the blast radius of any XSS (no CSP to block execution), allows clickjacking, MIME-type sniffing, and referrer-based token leakage (compounded by the JWT-in-URL finding).

🛡️ **Fix:**
```js
import helmet from "helmet";
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
    },
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));
```

---

### 🟢 LOW — Swagger UI exposed publicly in production

📍 **Location:** `backend/app.js:23`

💥 **Attack scenario:** `/api-docs` serves a complete map of every endpoint, parameter name, and schema to any unauthenticated visitor, significantly lowering the cost of recon.

🛡️ **Fix:**
```js
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
```

---

### 🟢 LOW — `dangerouslySetInnerHTML` in ChallengeArena (future XSS risk)

📍 **Location:** `src/features/CodingChallenges/ChallengeArena.jsx` — lines 299, 308, 319, 480

💥 **Attack scenario:** HTML is injected from `challenge.description`, `challenge.task`, and `challenge.hints`. Currently this is static local data (low risk), but if challenge content ever becomes user- or DB-sourced this is a stored-XSS sink. An XSS here would steal the JWT straight out of `localStorage`.

🛡️ **Fix:** Sanitize with DOMPurify before injecting, or switch to `react-markdown` (already a dependency):
```js
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(challenge.description) }} />
```

---

## What's Done Well

- bcrypt at 13 rounds with correct salting.
- Password reset uses hashed single-use tokens with 1-hour expiry.
- `forgotPassword` returns a uniform response (no email enumeration).
- Regex search input is properly escaped in `searchService.js`.
- `ObjectId` validity is checked on most ID parameters.
- Comment deletion has a correct ownership check (author match).
- Login rate limiting exists for both IP and email axes via Redis.

---

## Priority Fix Order

| Priority | Finding | Effort |
|---|---|---|
| 1 | Rotate all secrets in `.env`, remove from tree | Low (ops) |
| 2 | Fix chat-room IDOR — verify membership before join | Low (code) |
| 3 | Stop putting JWTs in OAuth redirect URLs | Medium |
| 4 | Fix OAuth account auto-linking by email | Medium |
| 5 | Add input type validation to close NoSQL injection | Low (code) |
| 6 | Mount `authenticate` middleware consistently on all `/my-profile` routes | Low (code) |
| 7 | Add Helmet + security headers | Low (1 line) |
| 8 | Fix `secure: false` cookie flag | Trivial |
| 9 | Unify login error messages (stop username enumeration) | Trivial |
| 10 | Remove `error: err.message` from production responses | Low |
