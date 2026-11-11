// Display helpers for the mentor usage section. Every input comes from the API,
// so each one tolerates a missing or non-numeric value instead of throwing.

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const full = new Intl.NumberFormat("en");
const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const num = (v) => (Number.isFinite(v) ? v : 0);

export const formatCompact = (v) => compact.format(num(v));
export const formatFull = (v) => full.format(num(v));

/** "2026-11-11" -> "Nov 11". Parsed as a local date so the day never shifts. */
export const formatDay = (isoDay) => {
  const [y, m, d] = String(isoDay ?? "").split("-").map(Number);
  if (!y || !m || !d) return String(isoDay ?? "");
  return new Date(y, m - 1, d).toLocaleDateString("en", { month: "short", day: "numeric" });
};

export const formatClock = (iso) => {
  const t = new Date(iso);
  return Number.isNaN(t.getTime())
    ? ""
    : t.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" });
};

/** "in 5h 12m" until a future time; "soon" when it is already due. */
export const formatCountdown = (iso, now = Date.now()) => {
  const ms = new Date(iso).getTime() - now;
  if (!Number.isFinite(ms) || ms <= 60_000) return "soon";
  const mins = Math.round(ms / 60_000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `in ${h ? `${h}h ` : ""}${m}m`;
};

/** "3 hours ago", "yesterday". Empty string when the date is unusable. */
export const formatAgo = (iso, now = Date.now()) => {
  const diff = new Date(iso).getTime() - now;
  if (!Number.isFinite(diff)) return "";
  const abs = Math.abs(diff);
  if (abs < 60_000) return "just now";
  if (abs < 3_600_000) return relative.format(Math.round(diff / 60_000), "minute");
  if (abs < 86_400_000) return relative.format(Math.round(diff / 3_600_000), "hour");
  return relative.format(Math.round(diff / 86_400_000), "day");
};
