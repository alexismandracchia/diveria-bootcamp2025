"use client";
import { useEffect, useState } from "react";
import { ProductService } from "@/services/ProductServices";
import axiosInstance from "@/api/AxiosInstance";
import type { Product } from "@/types/productTypes";

export function useProductSearchPool(pageSizeChunk = 100) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allLoading, setAllLoading] = useState(false);
  const [allError, setAllError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    const svc = new ProductService(axiosInstance);

    const load = async () => {
      try {
        setAllLoading(true);
        setAllError(null);
        let skip = 0;
        let items: Product[] = [];

        const first = await svc.getProducts(skip, pageSizeChunk);
        items = (first.products ?? []) as unknown as Product[];
        const total = first.total ?? items.length;

        skip += pageSizeChunk;
        while (skip < total) {
          const next = await svc.getProducts(skip, pageSizeChunk);
          items = items.concat((next.products ?? []) as unknown as Product[]);
          skip += pageSizeChunk;
        }

        if (!cancelled) setAllProducts(items);
      } catch (e) {
        if (!cancelled) setAllError(e);
      } finally {
        if (!cancelled) setAllLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pageSizeChunk]);

  return { allProducts, allLoading, allError };
}
