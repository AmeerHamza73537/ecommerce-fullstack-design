import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/cart`,
});

// Attach the saved JWT to every cart request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// GET /api/cart -> [{ product, quantity }]
export async function getCart() {
  const res = await api.get("/");
  return res.data;
}

// POST /api/cart
export async function addToCart(productId, quantity = 1) {
  const res = await api.post("/", { productId, quantity });
  return res.data;
}

// PUT /api/cart/:productId
export async function updateCartItem(productId, quantity) {
  const res = await api.put(`/${productId}`, { quantity });
  return res.data;
}

// DELETE /api/cart/:productId
export async function removeCartItem(productId) {
  const res = await api.delete(`/${productId}`);
  return res.data;
}
