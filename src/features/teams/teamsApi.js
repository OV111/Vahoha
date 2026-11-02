import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

/**
 * Thin client for /api/teams. Every call resolves to the response's `data` or
 * throws an Error carrying the server's message plus `status`, so the UI can
 * tell "not found" from "offline".
 */
const request = async (path, { method = "GET", body, auth = true } = {}) => {
  let res;
  try {
    res = await apiFetch(`${API_BASE_URL}/api/teams${path}`, {
      method,
      headers: {
        ...(auth ? authHeaders() : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      credentials: auth ? "include" : "omit",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw Object.assign(
      new Error("Couldn't reach the server. Check your connection."),
      { status: 0 },
    );
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw Object.assign(
      new Error(json?.message ?? "Something went wrong. Try again."),
      { status: res.status },
    );
  }
  return json.data;
};

const team = (teamId) => `/${encodeURIComponent(teamId)}`;

export const teamsApi = {
  mine: () => request("/mine"),
  mineAll: () => request("/mine/all"),
  myLevel: () => request("/me/level"),
  eligibility: () => request("/me/eligibility"),
  openTeams: (track) =>
    request(track ? `/open?track=${encodeURIComponent(track)}` : "/open"),
  start: (body) => request("/start", { method: "POST", body }),
  join: (teamId) => request(`${team(teamId)}/join`, { method: "POST" }),
  leave: (teamId) => request(`${team(teamId)}/leave`, { method: "POST" }),
  begin: (teamId) => request(`${team(teamId)}/begin`, { method: "POST" }),
  setTeamRepo: (teamId, repoUrl) =>
    request(`${team(teamId)}/repo`, { method: "PUT", body: { repoUrl } }),
  get: (teamId) => request(team(teamId)),
  contributions: (teamId) => request(`${team(teamId)}/contributions`),
  leaderboard: (track) =>
    request(track ? `/leaderboard?track=${encodeURIComponent(track)}` : "/leaderboard"),

  defense: (teamId) => request(`${team(teamId)}/defense`),
  startDefense: (teamId) =>
    request(`${team(teamId)}/defense/start`, { method: "POST" }),
  answerDefense: (teamId, body) =>
    request(`${team(teamId)}/defense/answer`, { method: "POST", body }),
  gradeDefense: (teamId) =>
    request(`${team(teamId)}/defense/grade`, { method: "POST" }),

  tasks: (teamId, { sprint, assignee } = {}) => {
    const q = new URLSearchParams();
    if (sprint) q.set("sprint", sprint);
    if (assignee) q.set("assignee", assignee);
    const qs = q.toString();
    return request(`${team(teamId)}/tasks${qs ? `?${qs}` : ""}`);
  },
  task: (teamId, key) => request(`${team(teamId)}/tasks/${key}`),
  createTask: (teamId, body) =>
    request(`${team(teamId)}/tasks`, { method: "POST", body }),
  updateTask: (teamId, key, body) =>
    request(`${team(teamId)}/tasks/${key}`, { method: "PATCH", body }),
  deleteTask: (teamId, key) =>
    request(`${team(teamId)}/tasks/${key}`, { method: "DELETE" }),
  comment: (teamId, key, body) =>
    request(`${team(teamId)}/tasks/${key}/comments`, { method: "POST", body: { body } }),
  syncBoard: (teamId) =>
    request(`${team(teamId)}/board/sync`, { method: "POST" }),
  pulse: (teamId) => request(`${team(teamId)}/pulse`),
  plan: (teamId) => request(`${team(teamId)}/ai/plan`),
  createPlan: (teamId, body) =>
    request(`${team(teamId)}/ai/plan`, { method: "POST", body }),
  acceptPlan: (teamId, planId, body) =>
    request(`${team(teamId)}/ai/plan/${encodeURIComponent(planId)}/accept`, { method: "POST", body }),
  discardPlan: (teamId, planId) =>
    request(`${team(teamId)}/ai/plan/${encodeURIComponent(planId)}`, { method: "DELETE" }),
  sprints: (teamId) => request(`${team(teamId)}/sprints`),
  createSprint: (teamId, body) =>
    request(`${team(teamId)}/sprints`, { method: "POST", body }),
  updateSprint: (teamId, sprintId, body) =>
    request(`${team(teamId)}/sprints/${encodeURIComponent(sprintId)}`, {
      method: "PATCH",
      body,
    }),

  myRatings: (teamId) => request(`${team(teamId)}/ratings/mine`),
  rate: (teamId, userId, body) =>
    request(`${team(teamId)}/ratings/${encodeURIComponent(userId)}`, {
      method: "PUT",
      body,
    }),

  // Admin only: the server answers 404/403 to everyone else.
  list: () => request("/"),
  adminOverview: () => request("/admin/overview"),
  searchUsers: (q) => request(`/admin/users?q=${encodeURIComponent(q)}`),
  create: (body) => request("/", { method: "POST", body }),
  setRepo: (teamId, repoUrl) =>
    request(`${team(teamId)}/repo`, { method: "PUT", body: { repoUrl } }),
  addMember: (teamId, body) =>
    request(`${team(teamId)}/members`, { method: "POST", body }),
  removeMember: (teamId, userId) =>
    request(`${team(teamId)}/members/${encodeURIComponent(userId)}`, {
      method: "DELETE",
    }),
  setStatus: (teamId, status) =>
    request(`${team(teamId)}/status`, { method: "PUT", body: { status } }),
  sync: (teamId) => request(`${team(teamId)}/sync`, { method: "POST" }),
  evidenceStatus: (teamId) => request(`${team(teamId)}/evidence`),
  issueEvidence: (teamId) =>
    request(`${team(teamId)}/evidence`, { method: "POST" }),
  revokeEvidence: (teamId, revoked) =>
    request(`${team(teamId)}/evidence/revocation`, {
      method: "PUT",
      body: { revoked },
    }),

  // Public: anyone with the link (a recruiter) can open it, so no auth header.
  evidence: (publicId) =>
    request(`/evidence/${encodeURIComponent(publicId)}`, { auth: false }),
};
