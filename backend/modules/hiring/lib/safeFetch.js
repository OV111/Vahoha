import dns from "node:dns/promises";
import net from "node:net";
import { Buffer } from "node:buffer";

/**
 * Fetches a page a stranger typed into a form, without letting them aim our
 * server at itself (SSRF). Every hop's hostname is resolved first and refused
 * if ANY address is private, loopback, link-local or otherwise not public, so
 * "http://localhost", "http://169.254.169.254" (cloud metadata) or a public
 * name that resolves to 10.x all fail. Redirects are followed by hand so each
 * new host gets the same check. Only http(s) on the default ports.
 *
 * Known gap: DNS rebinding between our lookup and fetch's own lookup. The
 * window is milliseconds and the response is only scanned for a name, never
 * returned to the caller, so the payoff for an attacker is near zero.
 */

const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 5000;
const MAX_BYTES = 200_000;

const isPrivateV4 = (ip) => {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19))
  );
};

const isPrivateV6 = (ip) => {
  const v = ip.toLowerCase();
  if (v === "::" || v === "::1") return true;
  if (v.startsWith("::ffff:")) return isPrivateV4(v.slice(7));
  return /^(fc|fd|fe8|fe9|fea|feb|ff)/.test(v);
};

export const isPublicAddress = (ip) =>
  net.isIPv4(ip) ? !isPrivateV4(ip) : net.isIPv6(ip) ? !isPrivateV6(ip) : false;

const assertPublicUrl = async (url) => {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("scheme");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("port");
  if (url.username || url.password) throw new Error("credentials");
  const addresses = net.isIP(url.hostname)
    ? [{ address: url.hostname }]
    : await dns.lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || !addresses.every((a) => isPublicAddress(a.address))) throw new Error("private");
};

const readCapped = async (res) => {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.length;
  }
  reader.cancel().catch(() => {});
  return Buffer.concat(chunks).toString("utf8");
};

/**
 * @returns {Promise<{ ok: boolean, status?: number, finalUrl?: string, text?: string, error?: string }>}
 */
export const safeFetchPage = async (rawUrl) => {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return { ok: false, error: "invalid-url" };
  }
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      await assertPublicUrl(url);
      const res = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "VahohaBot/1.0 (company check)", accept: "text/html" },
      });
      if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
        url = new URL(res.headers.get("location"), url);
        continue;
      }
      const text = await readCapped(res);
      return { ok: res.status >= 200 && res.status < 400, status: res.status, finalUrl: url.href, text };
    }
    return { ok: false, error: "too-many-redirects" };
  } catch (err) {
    return { ok: false, error: err?.name === "TimeoutError" ? "timeout" : err?.message || "fetch-failed" };
  }
};
