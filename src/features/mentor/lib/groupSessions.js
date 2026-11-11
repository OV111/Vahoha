import { SESSION_GROUP_LABELS } from "../../../../constants/mentor";

const DAY_MS = 86_400_000;

/**
 * Split chats into Pinned / Today / Yesterday / Previous 7 days / Older.
 *
 * Days are the learner's LOCAL calendar days, not rolling 24h windows: a chat from
 * 11pm last night is "Yesterday" at 8am, which is what people expect. Empty
 * groups are dropped. `sessions` keeps the server order inside each group.
 */
export function groupSessions(sessions, now = new Date()) {
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const bucketOf = (s) => {
    const ts = new Date(s.updatedAt ?? s.createdAt).getTime();
    // An unparseable date must not vanish from the list.
    if (Number.isNaN(ts)) return "older";
    if (ts >= startToday) return "today";
    if (ts >= startToday - DAY_MS) return "yesterday";
    if (ts >= startToday - 7 * DAY_MS) return "week";
    return "older";
  };

  const buckets = { pinned: [], today: [], yesterday: [], week: [], older: [] };
  for (const s of sessions) buckets[s.pinned ? "pinned" : bucketOf(s)].push(s);

  return Object.keys(buckets)
    .filter((key) => buckets[key].length > 0)
    .map((key) => ({ key, label: SESSION_GROUP_LABELS[key], sessions: buckets[key] }));
}
