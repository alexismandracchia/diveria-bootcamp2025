import type { AxiosInstance, AxiosResponse } from "axios";
import api from "../api/axios";
import type { IProduct } from "../types/ProductsTypes";

class ProductService {
  private api: AxiosInstance; 

  constructor() {
    this.api = api;
  }

  getProducts(title: string, offset = 0, limit = 10): Promise<AxiosResponse<IProduct[]>> {
    return this.api.get("/", {
      params: { title, offset, limit },
    });
  }
  
  getProductById(id: number): Promise<AxiosResponse<IProduct>> {
    return this.api.get(`/${id}`);
  }
}

export default ProductService;
