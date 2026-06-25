import axios from "axios";

// Backend base URL comes from .env (VITE_API_URL), with a sensible default.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/products`,
});

// Attach the saved JWT so admin actions (create/update/delete) are authorized.
// GET requests are public, but sending the header anyway is harmless.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Map a MongoDB product document to the shape our UI components already use.
// `rating` and `freeShipping` are simple placeholders — the schema doesn't have
// those fields yet, but the cards were designed to show them, so we keep them.
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

// GET /api/products  (params can include { search, category })
export async function getProducts(params = {}) {
  const res = await api.get("/", { params });
  return res.data.map(mapProduct);
}

// GET /api/products/:id
export async function getProductById(id) {
  const res = await api.get(`/${id}`);
  return mapProduct(res.data);
}

// POST /api/products
export async function createProduct(data) {
  const res = await api.post("/", data);
  return res.data;
}

// PUT /api/products/:id
export async function updateProduct(id, data) {
  const res = await api.put(`/${id}`, data);
  return res.data;
}

// DELETE /api/products/:id
export async function deleteProduct(id) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
