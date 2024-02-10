import axios from "axios";
import process from "process";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? "http://localhost:8000"
      : "https://api.doki-doki.shop",
});

api.defaults.timeout = 5000;

api.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

export default api;
