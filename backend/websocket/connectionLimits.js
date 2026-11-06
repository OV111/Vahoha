// Connection-level limits. messageLimiter.js covers traffic on an open socket; these
// cover the sockets themselves, which cost server memory even when silent.

// How long a connection may stay open without completing a signed-in handshake.
export const AUTH_DEADLINE_MS = 10_000;
// Only connections that have not signed in yet count, so a school or office sharing
// one IP is not penalised: a real client leaves this state within milliseconds.
export const MAX_PENDING_PER_IP = 10;
// Each browser tab can hold two sockets (notifications and chat).
export const MAX_SOCKETS_PER_USER = 12;

// The last entry is the one Render's proxy appended, the same hop `trust proxy` = 1
// picks in app.js. Earlier entries are whatever the client chose to send.
export const clientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  return forwarded ? forwarded.split(",").at(-1).trim() : req.socket.remoteAddress;
};

export function createPendingTracker(limit = MAX_PENDING_PER_IP) {
  const counts = new Map();
  const leavers = new WeakMap();

  return {
    hasRoom: (ip) => (counts.get(ip) ?? 0) < limit,
    /** Counts `conn` against `ip` until it signs in or closes, whichever comes first. */
    track: (conn, ip) => {
      counts.set(ip, (counts.get(ip) ?? 0) + 1);
      let counted = true;
      const leave = () => {
        if (!counted) return;
        counted = false;
        const left = counts.get(ip) - 1;
        if (left > 0) counts.set(ip, left);
        else counts.delete(ip);
      };
      leavers.set(conn, leave);
      conn.once("close", leave);
    },
    signedIn: (conn) => leavers.get(conn)?.(),
  };
}
