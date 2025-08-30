import { useState, useCallback } from "react";
import type { ProductRow } from "@/types/productTypes";

export function useLocalProducts(initialProducts: ProductRow[] = []) {
  const [localProducts, setLocalProducts] = useState<ProductRow[]>(initialProducts);

  const addLocalProduct = useCallback((product: ProductRow) => {
    setLocalProducts((prev) => [...prev, product]);
  }, []);

  const updateLocalProduct = useCallback((id: number, data: Partial<ProductRow>) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }, []);

  const removeLocalProduct = useCallback((id: number) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    localProducts,
    addLocalProduct,
    updateLocalProduct,
    removeLocalProduct,
  };
}
