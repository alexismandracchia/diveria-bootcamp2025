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
      /**
   * Obtiene todos los productos con opción de filtrado
   * @param {Object} params - Parámetros de búsqueda
   * @param {string} params.title - Título a buscar
   * @param {number} params.price_min - Precio mínimo
   * @param {number} params.price_max - Precio máximo
   * @param {number} params.categoryId - ID de categoría
   * @param {number} params.offset - Paginación offset
   * @param {number} params.limit - Límite de resultados
   * @returns {Promise<Array>} Lista de productos
   */

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
                console.error('Error fetching paginated products:', error);
                throw error;
            }
        },

    /**
   * Busca productos por término de búsqueda
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Array>} Productos filtrados
   */

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
            console.error('Error al buscar los products: ', error);
        }
    },
};

const CategoryService = {
     /**
   * Obtiene todas las categorías
   * @returns {Promise<Array>} Lista de categorías
   */

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