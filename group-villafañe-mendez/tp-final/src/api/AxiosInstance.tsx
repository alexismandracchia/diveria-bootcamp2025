import axios, { AxiosInstance } from "axios";

const BASE_URL ="https://dummyjson.com"; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error de servidor:", error.response.data);
    } else if (error.request) {
      console.error("No hubo respuesta del servidor");
    } else {
      console.error("Error inesperado:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;