import { BaseService } from "./BaseService";
import { PATH } from "@/lib/common";
import { Product, ProductDetail, ApiPagination } from "@/types/productTypes";

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

  async getProductById(id: number): Promise<ProductDetail> {
    const response = await this.http.get<ProductDetail>(`${PATH.PRODUCTS}/${id}`);
    console.log(response)
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
