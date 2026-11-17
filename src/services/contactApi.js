import { API_BASE_URL } from "../../constants/api";

// Failed sends throw with the server's message and the field it rejected; network errors have no status.
export const sendContactMessage = async (form) => {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message ?? "Something went wrong.");
    err.status = res.status;
    err.field = body.field ?? null;
    throw err;
  }
};
