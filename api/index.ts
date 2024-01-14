import axios from "axios";
import process from "process";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.defaults.timeout = 5000;

api.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

export default api;
