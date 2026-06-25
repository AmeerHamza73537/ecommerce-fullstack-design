import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a route element to require login.
// Pass adminOnly to also require an "admin" role.
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  // While we're checking a saved token, don't redirect yet.
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading...</div>
    );
  }

  // Not logged in -> go to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin on an admin-only route -> go home.
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
