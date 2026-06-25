const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Create a JWT that stores the user's id and lasts 7 days.
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Shape the user object we send back to the frontend (never the password).
const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ token: createToken(user._id), user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ token: createToken(user._id), user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET /api/auth/me  (protected — req.user is set by the protect middleware)
const getMe = async (req, res) => {
  res.json(publicUser(req.user));
};

// PUT /api/auth/me  (protected) — update the logged-in user's name/email
const updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.json(publicUser(user));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, login, getMe, updateMe };
