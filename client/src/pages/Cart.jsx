import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PromoBanner from "../components/PromoBanner";
import { getCart, updateCartItem, removeCartItem } from "../api/cart";
import { savedItems } from "../data/products";

const trustBadges = [
  { icon: "🔒", title: "Secure payment", text: "Have you ever finally just" },
  { icon: "💬", title: "Customer support", text: "Have you ever finally just" },
  { icon: "🚚", title: "Free delivery", text: "Have you ever finally just" },
];

export default function Cart() {
  const [cart, setCart] = useState([]); // [{ product, quantity }]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    getCart()
      .then((data) => {
        if (!ignore) setCart(data);
      })
      .catch(() => {
        if (!ignore) setError("Something went wrong");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleQty = async (productId, quantity) => {
    try {
      await updateCartItem(productId, quantity);
      setCart((prev) =>
        prev.map((i) =>
          i.product._id === productId ? { ...i, quantity } : i
        )
      );
    } catch {
      /* ignore for now */
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      setCart((prev) => prev.filter((i) => i.product._id !== productId));
    } catch {
      /* ignore for now */
    }
  };

  const subtotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const discount = cart.length ? 60 : 0;
  const tax = cart.length ? 14 : 0;
  const total = subtotal - discount + tax;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        My cart ({cart.length})
      </h1>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* ---------- Cart items ---------- */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-white">
            {cart.length === 0 && (
              <p className="p-8 text-center text-gray-500">
                Your cart is empty.{" "}
                <Link to="/products" className="text-blue-600 hover:underline">
                  Browse products
                </Link>
              </p>
            )}

            {cart.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-gray-50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-2"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/product/${product._id}`}
                    className="font-medium text-gray-800 hover:text-blue-600"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-gray-400">
                    Category: {product.category || "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    In stock: {product.stock}
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <p className="font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <select
                    value={quantity}
                    onChange={(e) =>
                      handleQty(product._id, Number(e.target.value))
                    }
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        Qty: {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="p-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                ← Back to shop
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
                  {b.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{b.title}</p>
                  <p className="text-xs text-gray-400">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Order summary ---------- */}
        <div className="h-fit space-y-4">
          {/* Coupon */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <label className="text-sm text-gray-500">Have a coupon?</label>
            <div className="mt-2 flex overflow-hidden rounded-md border border-gray-300">
              <input
                placeholder="Add coupon"
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
              <button className="px-4 text-sm font-medium text-blue-600 hover:bg-gray-50">
                Apply
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal:</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount:</span>
                <span className="text-red-500">- ${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax:</span>
                <span className="text-green-600">+ ${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600">
              Checkout
            </button>
            <div className="mt-4 flex justify-center gap-2 text-2xl opacity-80">
              <span>💳</span>
              <span>🏦</span>
              <span>🅿️</span>
              <span>🍎</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Saved for later (display only) ---------- */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Saved for later</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex aspect-square items-center justify-center bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <p className="mt-2 font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </p>
              <p className="line-clamp-1 text-sm text-gray-500">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Promo banner ---------- */}
      <div className="mt-8">
        <PromoBanner />
      </div>
    </div>
  );
}
