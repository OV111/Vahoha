import { API_BASE_URL } from "../../constants/api";

export const fetchUserData = async (query, isAuthenticated = false) => {
  const trimmedQuery = query?.trim() || "";
  if (!trimmedQuery || !isAuthenticated) return [];

  try {
    const request = await fetch(
      `${API_BASE_URL}/search/users?q=${encodeURIComponent(trimmedQuery)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const response = await request.json();
    if (!request.ok) {
      console.error("Search API error:", response);
      return [];
    }

    return response.results ?? [];
  } catch (err) {
    console.error("Search API error:", err);
    return [];
  }
};

export const fetchCategoryData = async (query) => {
  const trimmedQuery = query?.trim();
  if (!trimmedQuery) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}/search/categories?q=${encodeURIComponent(trimmedQuery)}`,
    );

    const data = await res.json();

    if (!res.ok) return [];

    return data.results ?? [];
  } catch (err) {
    console.error("Search API error:", err);
    return [];
  }
};
