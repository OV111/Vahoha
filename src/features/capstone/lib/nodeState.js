/**
 * What the capstone node at the end of a roadmap track shows, and whether it
 * may be opened. Pure, so the rule is unit-tested rather than eyeballed.
 *
 * The rule: the node is visible on EVERY track and opens the capstone page once
 * a capstone is published (the page shows the locked state until every layer
 * exam is passed). The server enforces the exam gate; this only decides
 * what to show.
 *
 * @param {object} p
 * @param {{trackId:string, briefTitle:string, summary?:string, published:boolean}|undefined} p.entry
 *        catalog entry: a capstone exists for the track (published or still a draft)
 * @param {boolean} p.isMember  logged in
 * @param {{state:string, eligibility:{passed:number,total:number}}|null} p.mine  this learner's overview row
 * @returns {{ kind: "coming_soon"|"locked"|"ready"|"in_progress"|"passed"|"failed",
 *             interactive: boolean, title: string, hint: string }}
 */
export const nodeState = ({ entry, isMember, mine }) => {
  if (!entry) {
    return {
      kind: "coming_soon",
      interactive: false,
      title: "Capstone project",
      hint: "A capstone for this track is being prepared.",
    };
  }

  // Written but not published yet: preview what is coming, never open it.
  if (!entry.published) {
    return {
      kind: "coming_soon",
      interactive: false,
      title: entry.briefTitle,
      hint: entry.summary ?? "This capstone is being finalised.",
    };
  }

  if (!isMember) {
    return {
      kind: "locked",
      interactive: false,
      title: entry.briefTitle,
      hint: "Log in and pass every layer test of this track to unlock it.",
    };
  }

  // Members: the server's overview row is the truth. Until it arrives (or if
  // it failed) the node stays closed rather than guessing.
  // Still openable: the capstone page itself shows the locked state and the
  // learner's progress, so the node leads there instead of being a dead end.
  if (!mine || mine.state === "locked") {
    const e = mine?.eligibility;
    return {
      kind: "locked",
      interactive: true,
      title: entry.briefTitle,
      hint: e
        ? `${e.passed}/${e.total} layer tests passed — pass them all to unlock.`
        : "Pass every layer test of this track to unlock it.",
    };
  }

  const HINTS = {
    ready:
      "All tests passed. Start your capstone: build it, ship it, defend it.",
    in_progress: "Your capstone is in progress. Pick up where you left off.",
    passed: "Approved. Open your capstone and certificate.",
    failed:
      "Sent back. Read the feedback and try again when the cooldown ends.",
  };
  return {
    kind: mine.state,
    interactive: true,
    title: entry.briefTitle,
    hint: HINTS[mine.state] ?? HINTS.ready,
  };
};
