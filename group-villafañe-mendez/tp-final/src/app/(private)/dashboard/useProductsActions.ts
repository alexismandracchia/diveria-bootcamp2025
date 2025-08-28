import { useCallback, useState } from "react";
import { Product, ProductService } from "@/services/ProductServices";
import { useToast } from "@/context/ToastContext";

export const useProductActions = (productService: ProductService) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [errorAction, setErrorAction] = useState<Error | null>(null);
  const { showToast } = useToast();

  const createProduct = useCallback(async (data: Omit<Product, 'id'>) => {
    setLoadingAction(true);
    try {
      const newProduct = await productService.addProduct(data);
      showToast("successfully created product", "success");
      return newProduct;
    } catch (err) {
      setErrorAction(err instanceof Error ? err : new Error("Unknown error"));
      showToast("An error occurred while creating a product.");
      throw err;
    } finally {
      setLoadingAction(false);
    }
  }, [productService]);

  const updateProduct = useCallback(async (id: number, data: Partial<Product>) => {
    setLoadingAction(true);
    try {
      const response =  await productService.updateProduct(id, data);
      showToast("Product successfully edited", "success");
      console.log(response);
    } catch (err) {
      setErrorAction(err instanceof Error ? err : new Error("Unknown error"));
      showToast("There was an error editing the product");
    } finally {
      setLoadingAction(false);
    }
  }, [productService]);

  const deleteProduct = useCallback(async (id: number) => {
    setLoadingAction(true);
    try {
      const response = await productService.deleteProduct(id);
      showToast("product successfully removed", "success");
      console.log(response);
    } catch (err) {
      setErrorAction(err instanceof Error ? err : new Error("Unknown error"));
      showToast("The product could not be deleted")
    } finally {
      setLoadingAction(false);
    }
  }, [productService]);

  return { createProduct, updateProduct, deleteProduct, loadingAction, errorAction };
};
