import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/auth`,
});

// POST /api/auth/signup -> { token, user }
export async function signup(data) {
  const res = await api.post("/signup", data);
  return res.data;
}

// POST /api/auth/login -> { token, user }
export async function login(data) {
  const res = await api.post("/login", data);
  return res.data;
}

// GET /api/auth/me -> user  (needs the token)
export async function getMe(token) {
  const res = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// PUT /api/auth/me -> updated user  (needs the token) — used by the Profile page
export async function updateMe(token, data) {
  const res = await api.put("/me", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
