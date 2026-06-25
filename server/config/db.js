const mongoose = require("mongoose");
const dns = require("dns");

// Use public DNS servers for resolving the MongoDB Atlas "mongodb+srv" address.
// Fixes the common "querySrv ECONNREFUSED" error that happens on some Windows /
// VPN setups where Node can't resolve SRV records via the system DNS.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Connect to MongoDB using the connection string in .env (MONGO_URL).
// dbName is set here so we don't have to edit the .env connection string.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "ecommerce" });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop the app if the DB can't connect
  }
};

module.exports = connectDB;
