// src/hooks/useProductDetail.ts

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductServices"; // Ajusta la ruta
import type { IProduct } from "../types/ProductsTypes";

// Instanciamos el servicio aquí para reutilizarlo.
const productService = new ProductService();

export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("No product ID provided.");
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productService.getProductById(Number(id));
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Could not find the requested product.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};