# Moving the API to `api.vahoha.com`

**Why.** The site is on `vahoha.com` and the API on `devs-website.onrender.com`, so the login
cookie (`refreshToken`, set by the API) is a third-party cookie. Every browser on iOS (Safari,
and Chrome and Firefox there, which all use WebKit) blocks third-party cookies, whatever
`SameSite` says. The login works, but the cookie is never stored, so the first reload or return
to the tab logs the user out. Confirmed on an iPhone against production. Android browsers are
moving the same way.

**Fix.** Serve the API from a subdomain of the site, `api.vahoha.com`. Same registrable domain,
so the cookie becomes first-party. No code change is needed except the two URLs below.

**Not a proxy through Vercel.** Vercel rewrites cannot carry WebSockets (chat, notifications) and
can cut long AI streams. A subdomain has neither problem.

## Order matters

Flipping the URLs before the domain works takes the whole site down. Do the steps in this order.

1. **Render** → the `devs-website` service → Settings → Custom Domains → add `api.vahoha.com`.
2. **DNS** (wherever `vahoha.com` is managed): add `CNAME api → devs-website.onrender.com`.
3. Wait until Render shows the domain as verified and the certificate as issued (minutes).
4. Check `https://api.vahoha.com/healthz` answers `{"ok":true,...}` in a browser.
5. **Only now**, change the two lines in `.env.production` (and `.env.staging` if it should follow):
   ```
   VITE_API_BASE_URL=https://api.vahoha.com
   VITE_WS_URL=wss://api.vahoha.com
   ```
   Check any `VITE_API_BASE_URL` / `VITE_WS_URL` set in the Vercel project settings too: they
   override these files.
6. **GitHub** → the production OAuth app → set the callback URL to
   `https://api.vahoha.com/auth/github/callback`. Until then GitHub sign-in fails.
7. **Polar** → production webhook URL → `https://api.vahoha.com/api/billing/webhook`.
8. Deploy (push). Render keeps `FRONTEND_URL=https://vahoha.com` as it is: CORS and the
   cookie already allow the site's origin.
9. Optional, documentation only: the server URL in `backend/config/swagger.js` and the
   production line in `docs/engineering/DEPLOYMENT.md`.

The old `devs-website.onrender.com` address keeps working, so a failed step can be rolled back by
putting the old URLs back.

## What users will notice

- **Everyone logs in once more.** Their current session cookie belongs to the old host.
- **Cold starts are unchanged.** The free Render plan still sleeps after about 15 idle minutes.

## Check on a real device

1. iPhone, Safari, `https://vahoha.com`: log in, reload, switch to another app and come back.
   You should still be logged in.
2. Chat and notifications still connect (they use `wss://api.vahoha.com`).
3. GitHub sign-in and a Polar test payment still work.

## One thing to know about Safari

Safari limits the lifetime of cookies set by a subdomain whose DNS points (CNAME) at another
company, or whose IP address differs from the site's. That is the case here (Render serves the API,
Vercel the site), so Safari may cap the login cookie at **7 days**. The cookie is rotated each time
the app refreshes the session, so anyone who comes back within 7 days stays logged in
indefinitely. Someone away longer than a week logs in again. If that matters later, the way
around it is to serve the site and the API behind one provider (for example Cloudflare in front of
both).
