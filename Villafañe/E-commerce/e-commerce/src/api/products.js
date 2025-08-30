import { apiClient } from "./service";

export async function fetchAllProducts() {
    try {
        const response = await apiClient.get(`/products`);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
export async function fetchAllProductsSortedByPage(pageSize,pageNumber) {
    try {
        const response = await apiClient.get(`products?offset=${pageNumber}&limit=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
export async function fetchProductsByName(name) {
    try {
        const response = await apiClient.get(`/products/all?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by name:', error);
        throw error;
    }
}


export async function fetchProductById(productId) {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
}

export async function createProduct(name,price,description, categoryId,images) {
    try {
        const response = await apiClient.post('/products', {title,price,description,categoryId,images});
        return response.data;
    }catch (error) {
        console.error('Error creating product:', error);
        throw new Error(`Error creating event: ${error}`);
    }
}

export async function updateProduct(title,price) {
    try {
        const response = await apiClient.put(`/products/${productId}`, {title,price});
        return response.data;
    }catch (error) {
        console.error('Error updating product:', error);
        throw new Error(`Error updating event: ${error}`);
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    }catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(`Error deleting event: ${error}`);
    }
}