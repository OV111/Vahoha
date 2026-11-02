/**
 * Pure: link GitHub pull requests to board tasks and decide how each card
 * moves. No database, no network (tests/unit/prLinks.unit.test.js).
 *
 * A PR links to a task when its title or branch names the task's key with the
 * team's prefix: "TA-12 login form", branch "feature/ta-12-login".
 */

// Merged beats open beats closed: one merged PR is enough to finish a task.
const STATE_RANK = { merged: 3, open: 2, closed: 1 };

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** @returns {number[]} task keys named in the PR title or branch, no duplicates */
export const extractTaskKeys = (prefix, title, branch) => {
  if (!prefix) return [];
  // Not \b before the prefix alone: "XTA-1" must not match "TA-1", but "feature/TA-1" must.
  const re = new RegExp(`(?:^|[^A-Za-z0-9])${escapeRegex(prefix)}-(\\d{1,7})(?![0-9])`, "gi");
  const keys = new Set();
  for (const text of [title ?? "", branch ?? ""]) {
    for (const m of text.matchAll(re)) keys.add(Number(m[1]));
  }
  return [...keys];
};

/**
 * Only PRs by active team members move cards, so a stranger's PR on a public
 * repo can't close the team's tasks.
 * @returns {Map<number, object>} task key -> the PR that decides it
 */
export const pickPullPerTask = (prefix, pulls, memberLogins) => {
  const logins = new Set(memberLogins.map((l) => l.toLowerCase()));
  const byKey = new Map();
  for (const pr of pulls) {
    if (!pr.authorLogin || !logins.has(pr.authorLogin.toLowerCase())) continue;
    for (const key of extractTaskKeys(prefix, pr.title, pr.branch)) {
      const current = byKey.get(key);
      const better =
        !current ||
        STATE_RANK[pr.state] > STATE_RANK[current.state] ||
        (STATE_RANK[pr.state] === STATE_RANK[current.state] && pr.number > current.number);
      if (better) byKey.set(key, pr);
    }
  }
  return byKey;
};

/**
 * @returns {{status: string, pr: object, doneAt: Date|null}|null} the change, or null if nothing changes.
 *   merged -> done (final). open -> in review. closed without merge -> back to in progress.
 */
export const planTaskUpdate = (task, pr) => {
  if (task.status === "done") return null; // done is final, whatever else happens on GitHub
  const link = { number: pr.number, state: pr.state, url: pr.url };

  let status = task.status;
  let doneAt = null;
  if (pr.state === "merged") {
    status = "done";
    doneAt = pr.mergedAt ?? null;
  } else if (pr.state === "open" && task.status !== "in_review") {
    status = "in_review";
  } else if (pr.state === "closed" && task.status === "in_review") {
    status = "in_progress";
  }

  const sameLink = task.pr && task.pr.number === link.number && task.pr.state === link.state && task.pr.url === link.url;
  if (status === task.status && sameLink) return null;
  return { status, pr: link, doneAt };
};
