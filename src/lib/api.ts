import axios from "axios";
export const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;
export const api = axios.create({
  baseURL: backendBaseUrl,
  withCredentials: false, // normal calls don’t use cookies
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
