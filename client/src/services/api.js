import axios from "axios";

// Base API URL from environment variable (Vercel) or fallback to local backend
const rawBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
export const API_ROOT = rawBase.replace(/\/api\/?$/, "");

const API = axios.create({
  baseURL: rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`,
});

// Add JWT Token Automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getDoctorImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500";
  }
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_ROOT}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

export default API;