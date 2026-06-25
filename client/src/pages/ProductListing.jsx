import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import { getProducts } from "../api/products";
import AddToCartButton from "../components/AddToCartButton";
import { brands, features, conditions } from "../data/products";

const subCategories = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
  "Modern tech",
];

// Collapsible-looking filter group (static — heading + content)
function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({ label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-600">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
      {label}
    </label>
  );
}

// The whole sidebar — reused for desktop and the mobile drawer
function FiltersSidebar() {
  return (
    <div>
      <FilterGroup title="Category">
        <ul className="space-y-1 text-sm text-gray-600">
          {subCategories.map((c) => (
            <li key={c}>
              <Link to="/products" className="hover:text-blue-600">
                {c}
              </Link>
            </li>
          ))}
        </ul>
        <button className="mt-2 text-sm text-blue-600 hover:underline">
          See all
        </button>
      </FilterGroup>

      <FilterGroup title="Brands">
        {brands.map((b) => (
          <Checkbox key={b} label={b} />
        ))}
        <button className="mt-2 text-sm text-blue-600 hover:underline">
          See all
        </button>
      </FilterGroup>

      <FilterGroup title="Features">
        {features.map((f) => (
          <Checkbox key={f} label={f} />
        ))}
        <button className="mt-2 text-sm text-blue-600 hover:underline">
          See all
        </button>
      </FilterGroup>

      <FilterGroup title="Price range">
        <div className="mt-2 flex items-center gap-2">
          <input
            placeholder="Min"
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            placeholder="Max"
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button className="mt-3 w-full rounded-md border border-gray-300 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
          Apply
        </button>
      </FilterGroup>

      <FilterGroup title="Condition">
        {conditions.map((c, i) => (
          <label
            key={c}
            className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-600"
          >
            <input
              type="radio"
              name="condition"
              defaultChecked={i === 0}
              className="h-4 w-4 accent-blue-600"
            />
            {c}
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}

// List-view row
function ProductRow({ product }) {
  const { id, title, price, oldPrice, rating, stock, image, description, freeShipping } =
    product;
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row">
      <Link
        to={`/product/${id}`}
        className="flex h-44 w-full shrink-0 items-center justify-center bg-gray-50 sm:w-44"
      >
        <img src={image} alt={title} className="h-full w-full object-contain p-2" />
      </Link>
      <div className="flex flex-1 flex-col">
        <Link
          to={`/product/${id}`}
          className="text-base text-gray-800 hover:text-blue-600"
        >
          {title}
        </Link>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-xs text-orange-500">{stock} in stock</span>
          {freeShipping && (
            <span className="text-xs text-green-600">Free Shipping</span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 max-w-xl text-sm text-gray-400">
          {description}
        </p>
        <Link
          to={`/product/${id}`}
          className="mt-2 w-fit text-sm text-blue-600 hover:underline"
        >
          View details
        </Link>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xl font-semibold text-gray-900">${price.toFixed(2)}</p>
        {oldPrice && (
          <p className="text-sm text-gray-400 line-through">
            ${oldPrice.toFixed(2)}
          </p>
        )}
        <button className="mt-3 text-gray-300 hover:text-blue-600" aria-label="Save">
          ♡
        </button>
        <AddToCartButton productId={id} className="mt-3 w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default function ProductListing() {
  const [view, setView] = useState("list"); // "list" | "grid"
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Read the ?search= param from the URL (set by the navbar search bar)
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Fetch products whenever the search term changes
  useEffect(() => {
    let ignore = false;
    getProducts(search ? { search } : {})
      .then((data) => {
        if (!ignore) {
          setProducts(data);
          setError("");
        }
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
  }, [search]);

  const appliedTags = ["Samsung", "Apple", "Poco", "4 star", "Refurbished"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Clothings", to: "/products" },
          { label: "Men's wear", to: "/products" },
          { label: "Summer clothing" },
        ]}
      />

      <div className="mt-4 flex flex-col gap-5 lg:flex-row">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 lg:hidden"
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } w-full shrink-0 rounded-lg border border-gray-200 bg-white px-4 lg:block lg:w-60`}
        >
          <FiltersSidebar />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="mb-4 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{products.length}</span>{" "}
              items{" "}
              {search ? (
                <>
                  for <span className="font-medium">&quot;{search}&quot;</span>
                </>
              ) : (
                <span className="font-medium">in all products</span>
              )}
            </p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" /> Verified
                only
              </label>
              <select className="rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
              <div className="flex overflow-hidden rounded-md border border-gray-300">
                <button
                  onClick={() => setView("grid")}
                  className={`px-2 py-1.5 ${
                    view === "grid" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                  }`}
                  aria-label="Grid view"
                >
                  ▦
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-2 py-1.5 ${
                    view === "list" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                  }`}
                  aria-label="List view"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Applied filter tags */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {appliedTags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600"
              >
                {t}
                <button className="text-gray-400 hover:text-red-500">✕</button>
              </span>
            ))}
            <button className="text-xs font-medium text-blue-600 hover:underline">
              Clear all filter
            </button>
          </div>

          {/* Products */}
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white">
              {products.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <select className="rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none">
              <option>Show 10</option>
              <option>Show 20</option>
              <option>Show 50</option>
            </select>
            <div className="flex items-center gap-1">
              <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
                ‹
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    n === 1
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
