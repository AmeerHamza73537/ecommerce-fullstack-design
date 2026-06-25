const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/auth");

// Base path: /api/products  (mounted in server.js)

// Public — anyone can browse products
router.get("/", getProducts);
router.get("/:id", getProductById);

// Write operations are admin-only.
// (The admin panel uses /api/admin/products; these remain as a fallback
//  but are now properly protected.)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
