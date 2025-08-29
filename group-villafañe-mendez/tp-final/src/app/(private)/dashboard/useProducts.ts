import { useState, useEffect, useCallback, useMemo } from "react";
import { ProductService, Product } from "@/services/ProductServices";
import axiosInstance from "@/api/AxiosInstance";
import { ProductRow } from "@/components/table/TableProducts";

const productService = new ProductService(axiosInstance);
const PAGE_SIZE = 10; 

const mapApiToProductRow = (product: Product): ProductRow => ({
  id: product.id,
  title: product.title,
  price: product.price,
  stock: product.stock, 
  status: product.availabilityStatus, 
  thumbnail: product.images?.[0] || "",
});

export const useProducts = () => {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * PAGE_SIZE;
      const response = await productService.getProducts(skip, PAGE_SIZE);
      
      const formattedProducts = response.products.map(mapApiToProductRow);
      
      setProducts(formattedProducts);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchProducts(pageNumber);
  }, [pageNumber, fetchProducts]);

  const totalPages = useMemo(() => Math.ceil(total / PAGE_SIZE), [total]);

  return {
    products,
    total,
    pageNumber,
    pageSize: PAGE_SIZE,
    totalPages,
    loading,
    error,
    setPageNumber, 
    refetch: () => fetchProducts(pageNumber),
  };
};