import { API_BASE_URL, authHeaders, apiFetch } from "../../../../constants/api";

// Every function resolves to an AttemptView or Eligibility from lib/examStates.js.
const BASE = `${API_BASE_URL}/api/voice-exam`;

async function request(path, { method = "GET", body } = {}, fallback) {
  // FormData sets its own multipart Content-Type with the boundary.
  const isForm = body instanceof FormData;
  let res;
  try {
    res = await apiFetch(`${BASE}${path}`, {
      method,
      headers: {
        ...authHeaders(),
        ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
      },
      credentials: "include",
      ...(body ? { body: isForm ? body : JSON.stringify(body) } : {}),
    });
  } catch {
    // No status: the request never reached the server, so the same answer can be resent.
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success)
    throw Object.assign(new Error(json?.message ?? fallback), {
      status: res.status,
    });
  return json.data;
}

/** The signed-in user's verified layers: [{ layer, verifiedAt }]. */
export const fetchVerifiedLayers = () =>
  request("/verified", {}, "Couldn't load your verified layers.");

export const getEligibility = (layerId) =>
  request(
    `/layers/${encodeURIComponent(layerId)}/eligibility`,
    {},
    "Couldn't check if you can take this exam.",
  );

/** The exam still open on this layer (after a reload), or null. */
export const getLiveAttempt = (layerId) =>
  request(
    `/layers/${encodeURIComponent(layerId)}/attempt`,
    {},
    "Couldn't check for an open exam.",
  );

// Only PreExam starts an exam, and only after its consent box is ticked.
export const startAttempt = ({ layerId, path }) =>
  request(
    "/attempts",
    { method: "POST", body: { layerId, path, consent: true } },
    "Couldn't start the exam.",
  );

// Safari records mp4; the server checks the real format from the bytes anyway.
const extensionOf = (type = "") =>
  type.includes("mp4") ? "mp4" : type.includes("ogg") ? "ogg" : "webm";

// `turn` is { text } or { audio: Blob }, plus `turnKey`: the same key on a retry of the same answer.
export const submitTurn = (attemptId, { text, audio, turnKey }) => {
  if (audio) {
    const form = new FormData();
    form.append("turnKey", turnKey);
    form.append("audio", audio, `answer.${extensionOf(audio.type)}`);
    return request(
      `/attempts/${attemptId}/audio-turns`,
      { method: "POST", body: form },
      "Couldn't send your recording. Try again.",
    );
  }
  return request(
    `/attempts/${attemptId}/turns`,
    { method: "POST", body: { text, turnKey } },
    "Couldn't send your answer. Try again.",
  );
};

export const abandonAttempt = (attemptId) =>
  request(
    `/attempts/${attemptId}/abandon`,
    { method: "POST" },
    "Couldn't end the exam.",
  );
