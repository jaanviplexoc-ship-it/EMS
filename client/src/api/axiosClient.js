import axios from "axios";
import { getToken, clearAuth } from "../utils/storage";

// Base URL comes from .env (VITE_API_BASE_URL). See .env.example.
// It must point at your running EmployeeApp.Api, including the "/api" segment,
// e.g. http://localhost:5000/api
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if we have one) to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the API ever returns 401 (expired/invalid token), log the user out
// and send them back to the login page.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuth();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
