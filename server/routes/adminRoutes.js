const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/adminController");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/auth");

// Base path: /api/admin  (mounted in server.js)

// Public — admin login
router.post("/login", adminLogin);

// All product management routes require a valid admin JWT.
router.get("/products", protect, adminOnly, getProducts);
router.post("/products", protect, adminOnly, createProduct);
router.put("/products/:id", protect, adminOnly, updateProduct);
router.delete("/products/:id", protect, adminOnly, deleteProduct);

module.exports = router;
