const BASE_URL = "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export const AuthAPI = {
  check: () => apiFetch("/auth/check", { method: "GET" }),
  logout: () => apiFetch("/auth/logout", { method: "POST" }),
};

export const RecipesAPI = {
  list: () => apiFetch("/recipes", { method: "GET" }),
  get: (id) => apiFetch(`/recipes/${id}`, { method: "GET" }),
  create: (payload) =>
    apiFetch("/recipes", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) =>
    apiFetch(`/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiFetch(`/recipes/${id}`, { method: "DELETE" }),
};
