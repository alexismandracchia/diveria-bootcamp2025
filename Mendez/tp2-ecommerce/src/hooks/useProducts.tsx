import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductService from "../services/ProductServices";
import type { IProduct } from "../types/ProductsTypes";

const productService = new ProductService();
const PRODUCTS_PER_PAGE = 10;

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("title") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const offset = (page - 1) * PRODUCTS_PER_PAGE;
        const response = await productService.getProducts(
          searchTerm,
          offset,
          PRODUCTS_PER_PAGE
        );
        setProducts(response.data);
  
        // Segundo request: traer todo para saber el total
        const allProducts = await productService.getProducts(searchTerm, 0, 0); 
        setTotalCount(allProducts.data.length);
  
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, [searchTerm, page]);
  

  // Usamos useCallback para evitar re-crear la función en cada render
  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);
  
  const handleDeleteFilter = useCallback(() => {
    searchParams.delete("title");
    setSearchParams(searchParams);
    setPage(1);
  }, [searchParams, setSearchParams]);

  const pageCount = useMemo(() => Math.ceil(totalCount / PRODUCTS_PER_PAGE), [totalCount]);

  return {
    products,
    isLoading,
    page,
    pageCount,
    searchTerm,
    handlePageChange,
    handleDeleteFilter,
  };
};