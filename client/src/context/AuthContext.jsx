import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  // Only "loading" if we have a saved token that still needs to be verified.
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));

  // On first load, if a token exists, fetch the user to confirm it's still valid.
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (!saved) return; // nothing to verify

    let ignore = false;
    getMe(saved)
      .then((u) => {
        if (!ignore) setUser(u);
      })
      .catch(() => {
        // Token is invalid/expired — clear it.
        if (!ignore) {
          localStorage.removeItem("token");
          setToken("");
          setUser(null);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Called after a successful login/signup.
  const login = (newToken, userInfo) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // Update just the stored user info (e.g. after editing the profile).
  const updateUser = (userInfo) => setUser(userInfo);

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Small helper hook so components can do: const { user } = useAuth()
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
