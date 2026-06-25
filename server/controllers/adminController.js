const jwt = require("jsonwebtoken");

// Creates a JWT with role: "admin" — no DB involved.
const createAdminToken = () =>
  jwt.sign({ id: "admin", role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// POST /api/admin/login
// Compares submitted credentials against the values in process.env.
// No bcrypt — the security model here is the JWT itself + the fact that
// the credentials only live in the server's .env (never in the DB).
const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return res
      .status(500)
      .json({ message: "Admin credentials are not configured on the server." });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Case-insensitive email comparison.
  const emailMatch =
    email.trim().toLowerCase() ===
    process.env.ADMIN_EMAIL.trim().toLowerCase();
  const passwordMatch = password === process.env.ADMIN_PASSWORD;

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }

  const token = createAdminToken();
  const user = {
    id: "admin",
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    role: "admin",
  };

  res.json({ token, user });
};

module.exports = { adminLogin };
