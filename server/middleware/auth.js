const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Checks for a "Authorization: Bearer <token>" header, verifies the JWT,
// and attaches the matching user (without the password) to req.user.
// Special case: the admin JWT carries { id: "admin", role: "admin" } and
// is not backed by a DB row — we attach a synthetic object for those.
const protect = async (req, res, next) => {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin token — no DB lookup needed.
    if (decoded.id === "admin" && decoded.role === "admin") {
      req.user = {
        _id: "admin",
        id: "admin",
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "",
        role: "admin",
      };
      return next();
    }

    // Regular user — fetch from DB (excludes the hashed password).
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Must run AFTER protect — only lets admins through.
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access only" });
};

module.exports = { protect, adminOnly };
