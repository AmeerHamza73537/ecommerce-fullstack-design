import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateMe } from "../api/auth";
import { getCart, removeCartItem } from "../api/cart";

export default function Profile() {
  const { user, token, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Cart state
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  // Fetch cart on mount
  useEffect(() => {
    let ignore = false;
    getCart()
      .then((data) => {
        if (!ignore) setCart(data);
      })
      .catch(() => {
        if (!ignore) setCartError("Could not load cart items.");
      })
      .finally(() => {
        if (!ignore) setCartLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      setCart((prev) => prev.filter((i) => i.product._id !== productId));
    } catch {
      // silent fail — user can retry on the full Cart page
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const updated = await updateMe(token, { name, email });
      updateUser(updated);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  // Format account creation date if available
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const cartSubtotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Profile</h1>

      {/* -------- Summary card -------- */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow">
          {(user?.name || "?").charAt(0).toUpperCase()}
        </span>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {user?.role}
            </span>
            {joinDate && (
              <span className="text-xs text-gray-400">
                Member since {joinDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* -------- Edit form -------- */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Edit details
        </h2>

        {message && (
          <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            ✓ {message}
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>

      {/* -------- My Cart -------- */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-800">
            My Cart{" "}
            {!cartLoading && (
              <span className="ml-1 text-sm font-normal text-gray-400">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <Link
            to="/cart"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View full cart →
          </Link>
        </div>

        {cartLoading ? (
          <p className="p-5 text-sm text-gray-400">Loading cart…</p>
        ) : cartError ? (
          <p className="p-5 text-sm text-red-500">{cartError}</p>
        ) : cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-4xl">🛒</p>
            <p className="mt-2 text-sm text-gray-500">Your cart is empty.</p>
            <Link
              to="/products"
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-100">
              {cart.map(({ product, quantity }) => (
                <li
                  key={product._id}
                  className="flex items-center gap-4 px-5 py-3"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${product._id}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product._id}`}
                      className="block truncate text-sm font-medium text-gray-800 hover:text-blue-600"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {product.category || "—"} · Qty: {quantity}
                    </p>
                  </div>

                  {/* Price + remove */}
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="text-xs text-red-400 hover:text-red-600 transition"
                      aria-label={`Remove ${product.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Cart subtotal footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-base font-bold text-gray-900">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
