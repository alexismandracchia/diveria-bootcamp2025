"use client";
import { createContext, useContext, ReactNode, FC } from "react";
import { ProductService } from "@/services/ProductServices";
import axiosInstance from "@/api/AxiosInstance";
import { useProducts } from "@/hooks/useProducts";
import { useProductActions } from "../hooks/useProductsActions"; 
import { Product , ProductRow } from "@/types/productTypes";

const productService = new ProductService(axiosInstance);

interface ProductContextType {
  products: ProductRow[]; 
  total: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: Error | null;
  setPageNumber: (page: number) => void;
  refetch: () => void;
  createProduct: (data: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    products,
    total,
    pageNumber,
    pageSize,
    loading,
    error,
    setPageNumber,
    refetch,
  } = useProducts();

  const { createProduct, updateProduct, deleteProduct } =
    useProductActions(productService);

  const value = {
    products,
    total,
    pageNumber,
    pageSize,
    loading,
    error,
    setPageNumber,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};