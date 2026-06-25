import { Link } from "react-router-dom";

// Simple breadcrumb. `items` = [{ label, to }] — last item shown as plain text.
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {isLast || !item.to ? (
              <span className="text-gray-400">{item.label}</span>
            ) : (
              <Link to={item.to} className="hover:text-blue-600">
                {item.label}
              </Link>
            )}
            {!isLast && <span className="text-gray-300">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
