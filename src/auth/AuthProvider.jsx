import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { mockLogin, mockGetProfile } from "../mocks/mockAuthApi";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE SESSION
  // =====================================================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    mockGetProfile()
      .then(user => {
        setMe({
          ...user,
          name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
          role: user.role || "user"
        });
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authUser");
        setMe(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================
  const login = useCallback(async (email, password) => {
    const res = await mockLogin(email, password);

    localStorage.setItem("accessToken", res.token);
    localStorage.setItem("authUser", JSON.stringify(res.user));

    setMe({
      ...res.user,
      name: `${res.user.first_name ?? ""} ${res.user.last_name ?? ""}`.trim(),
      role: res.user.role || "user"
    });

    return res;
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setMe(null);
  }, []);

  // =====================================================
  // ROLE
  // =====================================================
  const role = me?.role || "guest";

  const hasRole = useCallback(
    (allowed) =>
      Array.isArray(allowed)
        ? allowed.includes(role)
        : allowed === role,
    [role]
  );

  // =====================================================
  // VALUE
  // =====================================================
  const value = {
    me,
    role,
    loading,
    isLoggedIn: !!me,

    login,
    logout,
    hasRole,

    isAdmin: role === "admin",
    isSeller: role === "seller",
    isLandlord: role === "landlord",
    isAgent: role === "agent",
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// =====================================================
// HOOK
// =====================================================
export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}