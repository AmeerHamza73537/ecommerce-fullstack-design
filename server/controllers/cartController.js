const User = require("../models/User");

// GET /api/cart -> current user's cart with full product details
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    // Skip items whose product was deleted, and shape the response.
    const cart = user.cart
      .filter((item) => item.productId)
      .map((item) => ({ product: item.productId, quantity: item.quantity }));
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// POST /api/cart  body: { productId, quantity }
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const user = await User.findById(req.user._id);
    const existing = user.cart.find((i) => i.productId.toString() === productId);

    if (existing) {
      existing.quantity += quantity; // already in cart -> bump quantity
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// PUT /api/cart/:productId  body: { quantity }
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find(
      (i) => i.productId.toString() === req.params.productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }
    item.quantity = quantity;
    await user.save();
    res.json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// DELETE /api/cart/:productId
const removeCartItem = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (i) => i.productId.toString() !== req.params.productId
    );
    await user.save();
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
