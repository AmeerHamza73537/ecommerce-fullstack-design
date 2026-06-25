import { Link } from "react-router-dom";

// Blue "Super discount" banner reused on the Details and Cart pages.
export default function PromoBanner() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-gradient-to-r from-blue-600 to-sky-400 p-6 sm:flex-row sm:items-center">
      <div className="text-white">
        <h3 className="text-xl font-semibold">
          Super discount on more than 100 USD
        </h3>
        <p className="mt-1 text-sm text-blue-50">
          Have you ever finally just write dummy info
        </p>
      </div>
      <Link
        to="/products"
        className="shrink-0 rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
      >
        Shop now
      </Link>
    </div>
  );
}
