import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import StarRating from "../components/StarRating";
import PromoBanner from "../components/PromoBanner";
import { getProductById } from "../api/products";
import AddToCartButton from "../components/AddToCartButton";
import { images } from "../data/products";

// "You may like" / "Related" are decorative placeholders (no related-products API yet).
const youMayLike = [
  { title: "Men Blazers Sets", price: "$7.00 - $99.50", image: images.jacket },
  { title: "Men Shirt Bkspy", price: "$7.00 - $99.50", image: images.shirt1 },
  { title: "Apple Watch Series", price: "$7.00 - $99.50", image: images.watch },
  { title: "Basketball Crew Socks", price: "$7.00 - $99.50", image: images.shorts },
  { title: "New Summer Men's", price: "$7.00 - $99.50", image: images.coat },
];

const tabs = ["Description", "Shipping"];

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    let ignore = false;
    getProductById(id)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setActiveImg(0);
          setError("");
        }
      })
      .catch(() => {
        if (!ignore) setError("Product not found");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  // Use product.images if available and has items, otherwise fall back to product.image
  const gallery = (product.images && product.images.length > 0)
    ? product.images
    : [product.image, product.image, product.image, product.image].filter(Boolean);

  const specs = [
    ["Price", `$${product.price.toFixed(2)}`],
    ["Category", product.category || "—"],
    ["In stock", product.stock],
    ["Type", "Classic"],
    ["Protection", "Refund Policy"],
    ["Warranty", "2 years full warranty"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: product.category || "Category", to: "/products" },
          { label: product.name },
        ]}
      />

      {/* ---------- Main product card ---------- */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Gallery */}
          <div>
            <div className="flex h-72 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-gray-50 p-1 ${
                      activeImg === i ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              ● {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
            <h1 className="mt-1 text-xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <div className="mt-2 text-sm text-gray-500">
              <span>{product.stock} in stock</span>
            </div>

            {/* Product price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>

            {/* Specs */}
            <table className="mt-4 w-full text-sm">
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k} className="align-top">
                    <td className="w-32 py-1.5 text-gray-400">{k}</td>
                    <td className="py-1.5 text-gray-700">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                productId={product.id}
                buyNow
                className="w-full py-2.5 sm:w-auto sm:px-10"
              />
              <AddToCartButton
                productId={product.id}
                className="w-full py-2.5 sm:w-auto sm:px-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Tabs + You may like ---------- */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Tab headers */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 px-4">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`-mb-px border-b-2 px-3 py-3 text-sm font-medium ${
                  activeTab === t
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5 text-sm text-gray-600">
            {activeTab === "Description" ? (
              <>
                <p>{product.description}</p>
                <table className="mt-4 w-full border border-gray-200 text-sm">
                  <tbody>
                    {[
                      ["Name", product.name],
                      ["Category", product.category || "—"],
                      ["Price", `$${product.price.toFixed(2)}`],
                      ["In stock", product.stock],
                    ].map(([k, v], i) => (
                      <tr key={k} className={i % 2 ? "bg-gray-50" : ""}>
                        <td className="border-r border-gray-200 px-3 py-2 text-gray-400">
                          {k}
                        </td>
                        <td className="px-3 py-2 text-gray-700">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>Lorem ipsum content for the “{activeTab}” tab goes here.</p>
            )}
          </div>
        </div>

        {/* You may like */}
        <aside className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-gray-800">You may like</h3>
          <ul className="space-y-4">
            {youMayLike.map((p, i) => (
              <li key={i}>
                <Link to="/products" className="flex gap-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-16 w-16 shrink-0 rounded-md border border-gray-100 object-contain p-1"
                  />
                  <div>
                    <p className="text-sm text-gray-700 hover:text-blue-600">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-400">{p.price}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ---------- Related products ---------- */}
      <section className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-semibold text-gray-800">Related products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {youMayLike.concat(youMayLike[0]).map((p, i) => (
            <Link
              key={i}
              to="/products"
              className="group rounded-md border border-gray-100 p-2 hover:shadow"
            >
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain transition group-hover:scale-105"
                />
              </div>
              <p className="mt-2 line-clamp-1 text-sm text-gray-700">{p.title}</p>
              <p className="text-xs text-gray-400">{p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Promo banner ---------- */}
      <div className="mt-5">
        <PromoBanner />
      </div>
    </div>
  );
}
