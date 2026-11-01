// Helpers shared by the team admin page and panels.

export const activeMembers = (team) => team.members.filter((m) => m.status !== "left");
export const initials = (login) => login.slice(0, 2).toUpperCase();

/** Scroll target ids for the setup rail. */
export const SECTION = {
  repo: "admin-repo",
  members: "admin-members",
  sync: "admin-sync",
  evidence: "admin-evidence",
};
