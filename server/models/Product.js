const mongoose = require("mongoose");

// Product schema — the shape of a product document in MongoDB.
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL or path string
  images: { type: [String], default: [] },
  description: { type: String },
  category: { type: String, default: "Automobiles" },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
