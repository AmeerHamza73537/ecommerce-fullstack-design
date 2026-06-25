import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";

// Reusable product card used on the Home and Listing (grid) pages.
export default function ProductCard({ product }) {
  const { id, title, price, oldPrice, rating, reviews, image, freeShipping } =
    product;

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-3">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-500">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 text-sm text-gray-500 group-hover:text-blue-600">
          {title}
        </h3>

        <div className="mt-auto space-y-2 pt-1">
          {freeShipping && (
            <span className="block w-fit text-xs font-medium text-green-600">
              Free Shipping
            </span>
          )}
          <AddToCartButton productId={id} className="w-full py-2" />
        </div>
      </div>
    </Link>
  );
}
