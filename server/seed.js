// Seed script — wipes the products collection and inserts sample data.
// Run with:  npm run seed

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");
const Product = require("./models/Product");

dotenv.config();

// Same DNS fix as config/db.js (see note there) — needed to resolve the Atlas SRV address.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Helper for simple placeholder images (deterministic per seed word)
const img = (seed) => `https://picsum.photos/seed/${seed}/400/400`;

const products = [
  // ---- Electronics ----
  {
    name: "Wireless Over-Ear Headphones",
    price: 79.99,
    image: img("headphones"),
    description: "Comfortable wireless headphones with deep bass and 30-hour battery life.",
    category: "Electronics",
    stock: 45,
  },
  {
    name: "Smart Watch Series 6",
    price: 149.99,
    image: img("smartwatch"),
    description: "Fitness tracking, heart-rate monitor, and notifications on your wrist.",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "4K Action Camera",
    price: 219.0,
    image: img("actioncam"),
    description: "Waterproof 4K action camera with image stabilization.",
    category: "Electronics",
    stock: 20,
  },
  {
    name: 'Ultrabook Laptop 15.6"',
    price: 899.0,
    image: img("laptop"),
    description: "Lightweight laptop with Core i7, 16GB RAM, and 512GB SSD.",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "Smartphone Pro Max 256GB",
    price: 1099.0,
    image: img("smartphone"),
    description: "Flagship smartphone with triple camera and OLED display.",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Bluetooth Portable Speaker",
    price: 39.99,
    image: img("speaker"),
    description: "Compact speaker with rich sound and 12-hour playtime.",
    category: "Electronics",
    stock: 60,
  },
  {
    name: "RGB Gaming Headset",
    price: 59.0,
    image: img("gamingheadset"),
    description: "Surround-sound gaming headset with noise-cancelling mic.",
    category: "Electronics",
    stock: 40,
  },
  {
    name: 'Tablet Air 10.9" Wi-Fi',
    price: 449.0,
    image: img("tablet"),
    description: "Slim tablet with a vivid display, great for work and play.",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "20000mAh Power Bank",
    price: 29.99,
    image: img("powerbank"),
    description: "Fast-charging power bank with dual USB outputs.",
    category: "Electronics",
    stock: 80,
  },

  // ---- Clothing ----
  {
    name: "Men's Cotton T-Shirt",
    price: 14.99,
    image: img("tshirt"),
    description: "Soft 100% cotton t-shirt available in multiple colors.",
    category: "Clothing",
    stock: 120,
  },
  {
    name: "Slim Fit Denim Jeans",
    price: 39.99,
    image: img("jeans"),
    description: "Classic slim-fit jeans with a comfortable stretch.",
    category: "Clothing",
    stock: 75,
  },
  {
    name: "Winter Puffer Jacket",
    price: 119.0,
    image: img("jacket"),
    description: "Warm, water-resistant puffer jacket for cold weather.",
    category: "Clothing",
    stock: 35,
  },
  {
    name: "Summer Casual Shorts",
    price: 24.99,
    image: img("shorts"),
    description: "Lightweight shorts perfect for warm days.",
    category: "Clothing",
    stock: 90,
  },
  {
    name: "Hooded Sweatshirt",
    price: 44.99,
    image: img("hoodie"),
    description: "Cozy fleece-lined hoodie with a front pocket.",
    category: "Clothing",
    stock: 65,
  },

  // ---- Accessories ----
  {
    name: "Leather Bifold Wallet",
    price: 29.99,
    image: img("wallet"),
    description: "Genuine leather wallet with multiple card slots.",
    category: "Accessories",
    stock: 100,
  },
  {
    name: "Travel Backpack 30L",
    price: 49.99,
    image: img("backpack"),
    description: "Durable backpack with laptop sleeve and many pockets.",
    category: "Accessories",
    stock: 55,
  },
  {
    name: "Analog Wrist Watch",
    price: 89.0,
    image: img("watch"),
    description: "Elegant analog watch with a stainless-steel strap.",
    category: "Accessories",
    stock: 28,
  },
  {
    name: "Polarized Sunglasses",
    price: 19.99,
    image: img("sunglasses"),
    description: "UV-protection polarized sunglasses with a classic frame.",
    category: "Accessories",
    stock: 110,
  },
  {
    name: "Canvas Tote Bag",
    price: 17.5,
    image: img("totebag"),
    description: "Reusable canvas tote bag for shopping and daily use.",
    category: "Accessories",
    stock: 95,
  },
  {
    name: "Leather Handbag",
    price: 89.0,
    image: img("handbag"),
    description: "Stylish leather handbag with adjustable strap.",
    category: "Accessories",
    stock: 22,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "ecommerce" });
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🧹 Cleared existing products");

    const inserted = await Product.insertMany(products);
    console.log(`🌱 Inserted ${inserted.length} products`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected");
  }
};

seed();
