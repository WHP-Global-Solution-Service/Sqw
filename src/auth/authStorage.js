export const saveAuth = (payload) => {
  localStorage.setItem("authUser", JSON.stringify(payload.user));
  localStorage.setItem("accessToken", payload.accessToken);
};

export const clearAuth = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("accessToken");
};

export const getUser = () => {
  const u = localStorage.getItem("authUser");
  return u ? JSON.parse(u) : null;
};

export const getTokens = () => ({
  access: localStorage.getItem("accessToken"),
  refresh: null
});