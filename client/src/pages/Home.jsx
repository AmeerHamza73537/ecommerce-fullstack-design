import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import {
  sidebarCategories,
  deals,
  homeOutdoor,
  consumerElectronics,
  services,
  regions,
} from "../data/products";

import heroImg from "../assets/image1.jpeg";
import homeBanner from "../assets/image2.jpeg";
import elecBanner from "../assets/image3.jpeg";
import quoteBg from "../assets/img1.jpeg";

// ---- small helpers ----
function CountBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded bg-gray-700 text-sm font-semibold text-white">
        {value}
      </span>
      <span className="mt-1 text-[11px] text-gray-500">{label}</span>
    </div>
  );
}

// Mini product tile used in the "Home and outdoor" / "Consumer electronics" grids
function MiniTile({ item }) {
  return (
    <Link
      to="/products"
      className="flex items-center gap-3 border-b border-r border-gray-100 p-4 hover:bg-gray-50"
    >
      <div className="flex-1">
        <p className="text-sm text-gray-800">{item.title}</p>
        <p className="mt-1 text-xs text-gray-400">From USD {item.from}</p>
      </div>
      <img
        src={item.image}
        alt={item.title}
        className="h-14 w-14 shrink-0 object-contain"
      />
    </Link>
  );
}

// "Home and outdoor" style section with a side banner + mini grid
function CategorySection({ title, banner, bannerColor, items }) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <h2 className="px-4 pt-4 text-lg font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {/* Side banner */}
        <div
          className={`relative m-4 hidden overflow-hidden rounded-lg md:block ${bannerColor}`}
        >
          <img
            src={banner}
            alt={title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 flex flex-col justify-start p-4">
            <p className="max-w-[8rem] text-lg font-semibold text-gray-800">
              {title}
            </p>
            <Link
              to="/products"
              className="mt-3 w-fit rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow hover:bg-gray-50"
            >
              Source now
            </Link>
          </div>
        </div>
        {/* Mini tiles */}
        {items.map((item, i) => (
          <MiniTile key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      {/* ---------- Hero block ---------- */}
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="grid gap-4 lg:grid-cols-[200px_1fr_240px]">
          {/* Category sidebar (desktop only) */}
          <ul className="hidden text-sm lg:block">
            {sidebarCategories.map((c, i) => (
              <li key={c}>
                <Link
                  to="/products"
                  className={`block rounded px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 ${
                    i === 1 ? "bg-blue-50 font-medium text-blue-600" : "text-gray-600"
                  }`}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hero banner */}
          <Link to="/products" className="overflow-hidden rounded-lg">
            <img
              src={heroImg}
              alt="Latest trending electronic items"
              className="h-56 w-full object-cover sm:h-72 lg:h-full"
            />
          </Link>

          {/* Right column */}
          <div className="hidden flex-col gap-3 lg:flex">
            <div className="rounded-lg bg-sky-50 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-200 text-sky-700">
                  👤
                </span>
                <p className="text-sm text-gray-600">
                  Hi, user
                  <br />
                  let&apos;s get started
                </p>
              </div>
              <button className="mt-3 w-full rounded-md bg-blue-600 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                Join now
              </button>
              <button className="mt-2 w-full rounded-md bg-white py-1.5 text-xs font-medium text-blue-600 hover:bg-gray-50">
                Log in
              </button>
            </div>
            <div className="rounded-lg bg-orange-400 p-4 text-sm font-medium text-white">
              Get US $10 off with a new supplier
            </div>
            <div className="rounded-lg bg-teal-600 p-4 text-sm font-medium text-white">
              Send quotes with supplier preferences
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Deals and offers ---------- */}
      <section className="mt-5 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Info panel */}
          <div className="col-span-2 border-b border-r border-gray-100 p-4 md:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Deals and offers
            </h2>
            <p className="text-sm text-gray-400">Hygiene equipments</p>
            <div className="mt-4 flex gap-2">
              <CountBox value="04" label="Days" />
              <CountBox value="13" label="Hour" />
              <CountBox value="34" label="Min" />
              <CountBox value="56" label="Sec" />
            </div>
          </div>
          {/* Deal items */}
          {deals.map((d, i) => (
            <Link
              key={i}
              to="/products"
              className="flex flex-col items-center gap-2 border-b border-r border-gray-100 p-4 hover:bg-gray-50"
            >
              <img src={d.image} alt={d.title} className="h-20 w-20 object-contain" />
              <p className="text-sm text-gray-700">{d.title}</p>
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
                -{d.discount}%
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Category sections ---------- */}
      <div className="mt-5 space-y-5">
        <CategorySection
          title="Home and outdoor"
          banner={homeBanner}
          bannerColor="bg-amber-50"
          items={homeOutdoor}
        />
        <CategorySection
          title="Consumer electronics and gadgets"
          banner={elecBanner}
          bannerColor="bg-sky-50"
          items={consumerElectronics}
        />
      </div>

      {/* ---------- Quote request banner ---------- */}
      <section className="relative mt-5 overflow-hidden rounded-lg">
        <img
          src={quoteBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-700/90 to-blue-500/80" />
        <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2">
          <div className="text-white">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              An easy way to send requests to all suppliers
            </h2>
            <p className="mt-2 max-w-md text-sm text-blue-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          {/* Quote form card (UI only) */}
          <div className="rounded-lg bg-white p-5 shadow-lg lg:ml-auto lg:max-w-sm">
            <h3 className="font-semibold text-gray-800">Send quote to suppliers</h3>
            <textarea
              placeholder="What item you need?"
              className="mt-3 h-20 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Quantity"
                className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <select className="w-1/3 rounded-md border border-gray-300 px-2 py-2 text-sm focus:outline-none">
                <option>Pcs</option>
                <option>Box</option>
              </select>
            </div>
            <button className="mt-3 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Send inquiry
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Recommended items (fetched from the API) ---------- */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Recommended items</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(0, 10).map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group rounded-md border border-gray-200 bg-white p-3 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain transition group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 font-semibold text-gray-900">
                  ${p.price.toFixed(2)}
                </p>
                <p className="line-clamp-2 text-sm text-gray-400">{p.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Our extra services ---------- */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Our extra services</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="relative h-32">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/40" />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-800">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Suppliers by region ---------- */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Suppliers by region
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {regions.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-xl">{r.flag}</span>
              <div>
                <p className="text-gray-700">{r.name}</p>
                <p className="text-xs text-gray-400">{r.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
