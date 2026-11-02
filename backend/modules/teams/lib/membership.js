/**
 * Pure: self-serve team rules (start, join, leave, set the repo, begin the
 * project). No database (tests/unit/membership.unit.test.js). Services call
 * these and turn a refusal into an HTTP error.
 */

import { MAX_RUNNING_TEAMS, MAX_TEAM_MEMBERS } from "../../../../constants/teams.js";
import { isTeamLead } from "./taskRules.js";

export const MIN_MEMBERS_TO_BEGIN = 2;

// A team that is still running; MAX_RUNNING_TEAMS caps how many one person is on.
export const RUNNING_STATUSES = ["forming", "active", "defending"];

const activeMembers = (team) => team.members.filter((m) => m.status === "active");
const same = (a, b) => a != null && b != null && String(a) === String(b);

/**
 * What stops this person from starting or joining a team.
 * @param {{githubLogin: string|null, passedTracks: object[], runningTeams: number}} me
 * @param {number|null} max  running teams allowed; null = no limit
 * @returns {string|null}
 */
export const eligibilityRefusal = (me, max = MAX_RUNNING_TEAMS) => {
  if (!me.passedTracks.length) return "Pass a capstone first";
  if (!me.githubLogin) return "Connect your GitHub account first: your pull requests are matched to it";
  if (max != null && me.runningTeams >= max) {
    return `You're on ${max} running ${max === 1 ? "team" : "teams"}, the most allowed. Leave one first`;
  }
  return null;
};

/** The creator, lead or co-lead runs a forming team's setup. */
export const canManageSetup = (team, userId) => same(team.createdBy, userId) || isTeamLead(team, userId);

/** @returns {string|null} */
export const joinRefusal = (team) => {
  if (team.status !== "forming") return "This team has started and isn't taking new members";
  if (activeMembers(team).length >= MAX_TEAM_MEMBERS) return `This team is full (${MAX_TEAM_MEMBERS} members)`;
  return null;
};

/** @returns {string|null} */
export const beginRefusal = (team) => {
  if (team.status !== "forming") return "This team has already started";
  if (activeMembers(team).length < MIN_MEMBERS_TO_BEGIN) return `A team needs at least ${MIN_MEMBERS_TO_BEGIN} members to start`;
  if (!team.repo) return "Set the team repository first";
  return null;
};

/** @returns {string|null} */
export const leaveRefusal = (team, userId) => {
  if (!activeMembers(team).some((m) => same(m.userId, userId))) return "You aren't on this team";
  if (!RUNNING_STATUSES.includes(team.status)) return "This team is finished, so its member list is part of the record";
  return null;
};

/**
 * A team repo must be owned by one of its members, so nobody points a team at
 * someone else's project. Owner and logins compare case-insensitively.
 * @returns {string|null}
 */
export const repoOwnerRefusal = (team, owner) => {
  const logins = activeMembers(team).map((m) => m.githubLogin.toLowerCase());
  if (!logins.includes(String(owner).toLowerCase())) return "The repository must belong to a team member's GitHub account";
  return null;
};
