# Frontend environment variables

Vite copies every `VITE_` variable into the bundle **at build time**. A wrong value
is not an error at runtime: it ships in every file and the app just sends its
requests to the wrong place. So `vite build` checks them first and refuses to
build a broken one (`scripts/checkViteEnv.js`, wired in `vite.config.js`).

Values come from `.env`, `.env.<mode>` (for example `.env.production`) and the
Vercel project settings (which override the files). None of them is a secret: they
are all readable in the browser.

| Variable | Required in production and staging | Example | If it is wrong |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | Yes, build fails without it | `https://api.example.com` | Missing: every request goes to `undefined/api/...`. Trailing slash: `//api/...`. `http://` from an https page: blocked as mixed content. A path: the backend serves from `/`, so every route 404s |
| `VITE_WS_URL` | Yes, build fails without it | `wss://api.example.com` | Missing: chat and notifications throw when they connect. `ws://` from an https page: blocked. A trailing slash works but is warned about |
| `VITE_GOOGLE_CLIENT_ID` | No, warning | `1234-abc.apps.googleusercontent.com` | Missing: the Google sign-in button fails |
| `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` | No, set both or neither | `phc_...` and `https://eu.i.posthog.com` | One without the other: analytics stay off (warning) |

## What the build check does

- **`production` and `staging`** (`vite build`, `vite build --mode staging`): every
  problem with the two URLs is an **error**. The build stops in about two seconds,
  before anything is bundled, and prints all problems at once. The other rows
  are warnings.
- **Anything else** (`vite` dev server, `--mode development`, tests): everything is
  a **warning**, and `http://` / `ws://` are fine for `localhost`. Dev never fails.
- `npm run build` runs Vite twice (the app, then the prerender build). Both check;
  only the first prints warnings, so you see each one once.
- Messages name the variable and what is wrong. They never print a value.

## Adding a variable

Add its rule to `checkViteEnv` in `scripts/checkViteEnv.js`, a test in
`src/lib/checkViteEnv.test.js`, and a row in the table above. If the app cannot
work without it, make it an error in strict modes; if only one feature breaks,
make it a warning.
