// Sets Cache-Control on a route, so the browser (and anything between) can reuse
// the response. Only for data that is the same for everyone and may be a little
// old: a public list, a catalogue. Never on a response that depends on the user
// (use scope "private" for those, or leave the header off), and never on a
// route with a kill switch that must work at once (a revoked public link).
//
//   router.get("/", cacheControl({ maxAge: 30, staleWhileRevalidate: 60 }), getBlogs);
//
// stale-while-revalidate lets the browser show the old copy instantly and
// refresh it in the background for the next visit.

/**
 * @param {{ maxAge: number, staleWhileRevalidate?: number, scope?: "public" | "private" }} options  seconds
 */
export const cacheControl =
  ({ maxAge, staleWhileRevalidate = 0, scope = "public" }) =>
  (req, res, next) => {
    // Only a read can be cached; a write passing through must never be.
    if (req.method === "GET" || req.method === "HEAD") {
      const swr = staleWhileRevalidate ? `, stale-while-revalidate=${staleWhileRevalidate}` : "";
      res.set("Cache-Control", `${scope}, max-age=${maxAge}${swr}`);
    }
    next();
  };
