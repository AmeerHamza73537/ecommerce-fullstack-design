// Simple star rating display. Shows filled / half / empty stars for a 0-5 value.
function Star({ type }) {
  // type: "full" | "half" | "empty"
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="half-grad">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
        fill={
          type === "full"
            ? "currentColor"
            : type === "half"
            ? "url(#half-grad)"
            : "none"
        }
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function StarRating({ rating = 0, reviews }) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) return "full";
    if (rating >= i - 0.5) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-1 text-amber-400">
      <div className="flex">
        {stars.map((type, i) => (
          <Star key={i} type={type} />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {rating.toFixed(1)}
        {reviews != null && <span> ({reviews.toLocaleString()})</span>}
      </span>
    </div>
  );
}
