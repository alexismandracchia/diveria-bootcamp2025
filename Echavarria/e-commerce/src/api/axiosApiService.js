import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const apiUrl = axios.create({

    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*interceptor para manejar errores globalmente */

apiUrl.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error: ', error);
        return Promise.reject(error);
    }
);

const ProductServices = {

    getProductById: async (id) => {
        try {
        // Validación básica del ID
            if (!id || isNaN(Number(id))) {
            throw new Error('ID de producto no válido');
        }

        const response = await apiUrl.get(`/products/${id}`);
        
        // Transformación de datos para asegurar consistencia
        const productData = response.data;
        
        return {
            id: productData.id,
            title: productData.title || 'Sin título',
            price: productData.price || 0,
            description: productData.description || 'Sin descripción disponible',
            images: Array.isArray(productData.images) 
            ? productData.images.filter(img => typeof img === 'string')
            : [],
            category: productData.category || { id: 0, name: 'Sin categoría', image: '' },
            rating: productData.rating || { rate: 4, count: 4 },
            creationAt: productData.creationAt,
            updatedAt: productData.updatedAt
        };
        } catch (error) {
            console.error(`Error al obtener producto con ID ${id}:`, error);
            throw error;
        }
    },

    getAllProducts: async({ title, price_min, price_max, categoryId, offset = 0, limit = 12 } = {}) => {
        const params = {
            title,
            price_min,
            price_max,
            categoryId,
            offset,
            limit
        };

        //eliminar parametros de tipo undefined
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        try {
            const response = await apiUrl.get('products', { params });
            return response.data;
        } catch (error) {
            console.error("Error al realizar el fetch de productos", error);
            throw error
        }
    },

    getPaginatedProducts: async (page = 1, limit = 10) => {
        try 
        {
            // Calculamos el offset basado en la página actual
            const offset = (page - 1) * limit;
            const response = await apiUrl.get(`/products?offset=${offset}&limit=${limit}`);
            
            // Para obtener el total de productos (algunas APIs devuelven este valor en headers)
            const totalResponse = await apiUrl.get('/products');
            const total = totalResponse.data.length;
            
            return {
                products: response.data,
                total: total
            };
        }catch (error) {
            console.error('Error fetching de productos paginados:', error);
            throw error;
        }
    },


    serchProducts: async (searchTerm) => {
        try {
            const allProducts = await apiUrl.get('/products');

            // filtramos los datps
            return allProducts.data.filter(product =>
                product.title.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) || 
                (product.category?.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } catch (error) {
            console.error('Error al buscar los productos: ', error);
        }
    },
};

const CategoryService = {

    getAllCategories : async () => {
        try {
            const response = apiUrl.get('/categories');
            return response.data;
        } catch (error) {
            console.error('Error al traer las categorias: ', error);
            throw error;
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = apiUrl.get(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la categoria: ', error);
            throw error
        }
    }
}

export { ProductServices, CategoryService };