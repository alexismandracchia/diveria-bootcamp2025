import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/products",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
