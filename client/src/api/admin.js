import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/admin`,
});

// Attach the admin JWT automatically to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// POST /api/admin/login  → { token, user }
export async function adminLogin(data) {
  const res = await api.post("/login", data);
  return res.data;
}

// ---- Product CRUD (admin-only) ----

// Reuses the same mapProduct shape as api/products.js so Admin.jsx
// doesn't need any view-layer changes.
const mapProduct = (p) => ({
  id: p._id,
  title: p.name,
  name: p.name,
  price: p.price,
  image: p.image,
  description: p.description,
  category: p.category,
  stock: p.stock,
  rating: 4.5,
  freeShipping: true,
});

// GET /api/admin/products
export async function adminGetProducts() {
  const res = await api.get("/products");
  return res.data.map(mapProduct);
}

// POST /api/admin/products
export async function adminCreateProduct(data) {
  const res = await api.post("/products", data);
  return res.data;
}

// PUT /api/admin/products/:id
export async function adminUpdateProduct(id, data) {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
}

// DELETE /api/admin/products/:id
export async function adminDeleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
