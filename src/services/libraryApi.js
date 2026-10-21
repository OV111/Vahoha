import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

export const fetchLibraryResources = async (params = {}, signal) => {
  const url = new URL(`${API_BASE_URL}/library`);

  const { type, path, difficulty, topic, is_free, layer, q, page, limit } = params;

  if (type) {
    const types = Array.isArray(type) ? type : [type];
    types.forEach((t) => url.searchParams.append("type", t));
  }
  if (path) url.searchParams.set("path", path);
  if (difficulty) url.searchParams.set("difficulty", difficulty);
  if (topic) url.searchParams.set("topic", topic);
  if (is_free !== undefined && is_free !== null) url.searchParams.set("is_free", String(is_free));
  if (layer) url.searchParams.set("layer", layer);
  if (q) url.searchParams.set("q", q);
  if (page) url.searchParams.set("page", String(page));
  if (limit) url.searchParams.set("limit", String(limit));

  const res = await apiFetch(url.toString(), { signal });
  if (!res.ok) throw new Error("Failed to fetch library resources");
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch library resources");
  return { resources: data.data, pagination: data.pagination };
};

export const fetchLibraryResourceById = async (id) => {
  const res = await apiFetch(`${API_BASE_URL}/library/${id}`);
  if (!res.ok) throw new Error("Failed to fetch resource");
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch resource");
  return data.data;
};

export const fetchLibraryResourcesByLayer = async (layerId) => {
  const res = await apiFetch(`${API_BASE_URL}/library/layer/${layerId}`);
  if (!res.ok) throw new Error("Failed to fetch layer resources");
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch layer resources");
  return data.data;
};

export const fetchLibraryResourceCounts = async () => {
  const res = await apiFetch(`${API_BASE_URL}/library/counts`);
  if (!res.ok) throw new Error("Failed to fetch resource counts");
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch resource counts");
  return data.data;
};

export const fetchSavedResourceIds = async () => {
  try {
    const res = await apiFetch(`${API_BASE_URL}/library/saved-ids`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    return data.success ? new Set(data.ids) : new Set();
  } catch {
    return new Set();
  }
};

export const toggleSaveResource = async (id) => {
  const res = await apiFetch(`${API_BASE_URL}/library/${id}/save`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to toggle save");
  const data = await res.json();
  if (!data.success) throw new Error("Failed to toggle save");
  return data.saved;
};

// A book's digest, or null when it has none or this user may not see it yet.
export const fetchDigest = async (id, signal) => {
  const res = await apiFetch(`${API_BASE_URL}/api/library/${id}/digest`, { headers: authHeaders(), signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch digest");
  const data = await res.json();
  return data.success ? data.data : null;
};

export const setConceptKnown = async (id, conceptKey, known) => {
  const res = await apiFetch(`${API_BASE_URL}/api/library/${id}/digest/known/${conceptKey}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ known }),
  });
  if (!res.ok) throw new Error("Failed to save");
};

// Answers a concept's "check yourself" question; the server grades it.
export const submitConceptCheck = async (id, conceptKey, answerIndex) => {
  const res = await apiFetch(`${API_BASE_URL}/api/library/${id}/digest/check/${conceptKey}`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ answerIndex }),
  });
  if (!res.ok) throw new Error("Failed to check answer");
  const data = await res.json();
  return { correct: data.correct, answerIndex: data.answerIndex, explanation: data.explanation };
};
