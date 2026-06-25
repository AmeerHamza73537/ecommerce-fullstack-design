import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../api/cart";

// Reusable cart button.
// - If the user isn't logged in, it sends them to /login.
// - Otherwise it adds the product to the cart (saved in the database).
// - With `buyNow`, it adds the item and goes straight to the cart page.
export default function AddToCartButton({ productId, className = "", buyNow = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e) => {
    // Cards are wrapped in a <Link>, so stop the click from navigating.
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      await addToCart(productId, 1);
      if (buyNow) {
        navigate("/cart"); // go straight to checkout
        return;
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch {
      // keep it simple — ignore errors for now
    } finally {
      setAdding(false);
    }
  };

  const color = buyNow
    ? "bg-orange-500 hover:bg-orange-600"
    : "bg-blue-600 hover:bg-blue-700";
  const base = `rounded-md ${color} text-sm font-medium text-white disabled:opacity-60`;

  const label = buyNow
    ? adding
      ? "Processing..."
      : "Buy Now"
    : added
    ? "Added ✓"
    : adding
    ? "Adding..."
    : "Add to Cart";

  return (
    <button onClick={handleClick} disabled={adding} className={`${base} ${className}`}>
      {label}
    </button>
  );
}
