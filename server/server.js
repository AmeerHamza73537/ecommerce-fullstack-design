// Express server — Week 2: MongoDB + product CRUD APIs.

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Load variables from .env into process.env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // allow the React frontend (different port) to call the API
app.use(express.json()); // read JSON request bodies

// Health-check route — confirms the server is running
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Auth routes (signup / login / me)
app.use("/api/auth", authRoutes);

// Product CRUD routes
app.use("/api/products", productRoutes);

// Cart routes (protected)
app.use("/api/cart", cartRoutes);

// Admin routes (login + product management — admin-only)
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
