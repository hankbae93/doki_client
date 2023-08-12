import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.defaults.timeout = 5000;

api.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

export default api;
