import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { getUserFromToken, isTokenExpired } from "../utils/jwt";
import { getToken, setToken, clearAuth } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore session from a saved token (if still valid).
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      setUser(getUserFromToken(token));
    } else if (token) {
      clearAuth();
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const data = await authService.login({ email, password });
    setToken(data.token);
    const decodedUser = getUserFromToken(data.token);
    setUser(decodedUser);
    return decodedUser;
  }

  // Ready for the day /api/Auth/register exists on the backend.
  async function register(payload) {
    const data = await authService.register(payload);
    if (data?.token) {
      setToken(data.token);
      const decodedUser = getUserFromToken(data.token);
      setUser(decodedUser);
      return decodedUser;
    }
    return null;
  }

  function logout() {
    clearAuth();
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
