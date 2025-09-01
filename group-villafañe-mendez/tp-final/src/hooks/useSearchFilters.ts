"use client";
import { useMemo, useState, useEffect } from "react";
import type { Product, ProductRow } from "@/types/productTypes";
import {
  Filters,
  hasActiveFilters,
  extractCategories,
  priceBoundsFrom,
  applyFilters,
  slicePage,
} from "@/components/filters/utils/productFiltering";

export function useSearchFilters(
  allProducts: Product[],
  localRows: ProductRow[],
  pageSize: number
) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    categories: [],
    priceMin: null,
    priceMax: null,
  });
  const [searchPage, setSearchPage] = useState(1);

  const active = useMemo(() => hasActiveFilters(filters), [filters]);


  const categoryOptions = useMemo(() => extractCategories(allProducts), [allProducts]);
  const priceBounds = useMemo(() => priceBoundsFrom(allProducts), [allProducts]);


  useEffect(() => {
    setSearchPage(1);
  }, [filters]);

  const filteredRows = useMemo(
    () => (active ? applyFilters(allProducts, localRows, filters) : []),
    [allProducts, localRows, filters, active]
  );

  const pagedFiltered = useMemo(
    () => (active ? slicePage(filteredRows, searchPage, pageSize) : []),
    [filteredRows, searchPage, pageSize, active]
  );

  const clearFilters = () =>
    setFilters({ query: "", categories: [], priceMin: null, priceMax: null });

  return {
    filters,
    setFilters,
    clearFilters,
    searchPage,
    setSearchPage,
    active,
    filteredRows,
    pagedFiltered,
    categoryOptions,
    priceBounds,
  };
}
