const INTERVALS = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60, second: 1 };
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "3 minutes ago", "yesterday", … ; "recently" when the date is missing or invalid. */
export function formatTimeAgo(dateString) {
  if (!dateString) return "recently";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "recently";
  const seconds = Math.floor((Date.now() - date) / 1000);
  for (const unit in INTERVALS) {
    const value = Math.floor(seconds / INTERVALS[unit]);
    if (value >= 1) return rtf.format(-value, unit);
  }
  return "just now";
}

/** Active in the last minute counts as online. */
export function isOnlineByLastActive(dateString) {
  if (!dateString) return false;
  const lastActive = new Date(dateString);
  if (Number.isNaN(lastActive.getTime())) return false;
  const diff = Date.now() - lastActive.getTime();
  return diff >= 0 && diff < 60 * 1000;
}
