import { BaseService } from "./BaseService";
import { PATH } from "@/lib/common";

export interface Product {
  id: number; 
  title: string;
  description: string;
  price: number; 
  category?: string;           /* <-- dejo "?" provisional  */
  stock?: number;              /* <-- dejo "?" provisional  */
  availabilityStatus?: string; /* <-- dejo "?" provisional  */
  images?: string[];
}

export interface ApiPagination<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductService extends BaseService {
  async getProducts(skip = 0, limit = 30): Promise<ApiPagination<Product>> {
    const response = await this.http.get<ApiPagination<Product>>(
      PATH.PRODUCTS,
      {
        params: { skip, limit },
      }
    );
    return response.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await this.http.get<Product>(`${PATH.PRODUCTS}/${id}`);
    return response.data;
  }

  async searchProducts(
    query: string,
    skip = 0,
    limit = 30
  ): Promise<ApiPagination<Product>> {
    const response = await this.http.get<ApiPagination<Product>>(
      PATH.PRODUCTS + PATH.SEARCH,
      {
        params: { q: query, skip, limit },
      }
    );
    return response.data;
  }

  async getCategories(): Promise<string[]> {
    const response = await this.http.get<string[]>(
      PATH.PRODUCTS + PATH.CATEGORIES
    );
    return response.data;
  }

  async getProductsByCategory(
    category: string,
    skip = 0,
    limit = 30
  ): Promise<ApiPagination<Product>> {
    const response = await this.http.get<ApiPagination<Product>>(
      `${PATH.PRODUCTS + PATH.CATEGORIES}/${category}`,
      {
        params: { skip, limit },
      }
    );
    return response.data;
  }

  /*
  Añadir un nuevo producto, editarlo o eliminarlo, no lo añadirá al servidor.
  Simulará una petición y devolverá el nuevo producto creado con un nuevo id. 
  */
  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    const response = await this.http.post<Product>(
      PATH.PRODUCTS + PATH.ADD,
      product
    );
    return response.data;
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const response = await this.http.put<Product>(
      `${PATH.PRODUCTS}/${id}`,
      data
    );
    return response.data;
  }

  async deleteProduct(id: number): Promise<Product> {
    const response = await this.http.delete<Product>(`${PATH.PRODUCTS}/${id}`);
    return response.data;
  }
}
