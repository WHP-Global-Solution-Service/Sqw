import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false
});

// ============================
// REQUEST INTERCEPTOR
// ============================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================
// RESPONSE INTERCEPTOR
// ============================
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;