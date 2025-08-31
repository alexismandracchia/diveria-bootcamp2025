"use client";
import React, { useMemo } from "react";
import SearchTextInput from "./SearchTextInput";
import CategoryMultiSelect from "./CategoryMultiSelect";
import PriceInput from "./PriceInput";
import ClearButton from "./ClearButton";
import FiltersSummary from "./FiltersSummary";

export type SearchFilters = {
  query: string;
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
};

type Props = {
  value: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onClear?: () => void;
  categoryOptions?: string[];
  globalMinPrice?: number;
  globalMaxPrice?: number;
  className?: string;
};

const SearchFilterBar: React.FC<Props> = ({
  value,
  onChange,
  onClear,
  categoryOptions = [],
  globalMinPrice,
  globalMaxPrice,
  className = "",
}) => {
  const hasActiveFilters = useMemo(() => {
    const { query, categories, priceMin, priceMax } = value;
    return Boolean(
      (query && query.trim().length > 0) ||
        (categories && categories.length > 0) ||
        priceMin != null ||
        priceMax != null
    );
  }, [value]);

  return (
    <section
      className={`glass rounded-3xl p-4 md:p-5 border border-white/10 bg-gradient-to-b from-white/6 to-white/3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${className}`}
    >
      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.8fr_auto] gap-3 items-end">
        <SearchTextInput
          value={value.query}
          onChange={(query) => onChange({ ...value, query })}
        />

        <CategoryMultiSelect
          value={value.categories}
          options={categoryOptions}
          onChange={(categories) => onChange({ ...value, categories })}
        />

        <PriceInput
          label={`Min price`}
          value={value.priceMin}
          placeholder={globalMinPrice}
          onChange={(priceMin) => onChange({ ...value, priceMin })}
        />

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <PriceInput
              label={`Max price`}
              value={value.priceMax}
              placeholder={globalMaxPrice}
              onChange={(priceMax) => onChange({ ...value, priceMax })}
            />
          </div>
          <ClearButton disabled={!hasActiveFilters} onClick={onClear} />
        </div>
      </div>

      
      <FiltersSummary value={value} onClear={() => onClear?.()} className="mt-3" />
    </section>
  );
};

export default SearchFilterBar;
