import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

// Failed responses throw with the server's message and the HTTP status, so callers can tell
// a cooldown (429) from other failures. Network errors throw without a status.
const request = async (path, { method = "GET", body, keepalive } = {}) => {
  const res = await apiFetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json", ...authHeaders() } : authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
    keepalive,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message ?? "");
    err.status = res.status;
    throw err;
  }
  return data;
};

export const fetchRoadmapProgress = async () => (await request("/api/roadmaps/progress")).progress;

export const saveRoadmapProgress = (layerProgress, activePath) =>
  request("/api/roadmaps/progress", { method: "POST", body: { layerProgress, activePath } });

// `setup` is the Path Setup answers (skillLevel, goal, background, weeklyTime, about), when the panel sent them.
export const startRoadmapPath = (activePath, setup = {}) =>
  request("/api/roadmaps/start", {
    method: "POST",
    body: { activePath, ...setup },
  });

export const generateExam = (path, layer) =>
  request("/api/exams/generate", { method: "POST", body: { path, layer } });

export const answerExamQuestion = (attemptId, questionId, choice) =>
  request("/api/exams/answer", { method: "POST", body: { attemptId, questionId, choice } });

// keepalive: sent while the tab goes to the background, so the request must still go out.
export const reportExamLeave = (attemptId) =>
  request("/api/exams/leave", { method: "POST", body: { attemptId }, keepalive: true });

export const submitTeachBack = (path, layer, topic, answerText) =>
  request("/api/exams/submit-teach-back", { method: "POST", body: { path, layer, topic, answerText } });

export const submitTeachBackFollowUp = (sessionId, answerText) =>
  request("/api/exams/submit-teach-back-followup", { method: "POST", body: { sessionId, answerText } });
