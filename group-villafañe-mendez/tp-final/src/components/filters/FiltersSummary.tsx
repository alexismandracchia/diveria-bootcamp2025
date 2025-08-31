"use client";
import React from "react";
import type { SearchFilters } from "./SearchFilterBar";

type Props = {
  value: SearchFilters;
  onClear: () => void;
  className?: string;
};

const FiltersSummary: React.FC<Props> = ({ value, onClear, className = "" }) => {
  const { query, categories, priceMin, priceMax } = value;
  const pills: string[] = [];

  if (query?.trim()) pills.push(`Nombre: “${query.trim()}”`);
  if (categories?.length) pills.push(`Categorías: ${categories.join(", ")}`);
  if (priceMin != null) pills.push(`≥ $${priceMin}`);
  if (priceMax != null) pills.push(`≤ $${priceMax}`);

  if (!pills.length) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {pills.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="rounded-full border border-white/10 bg-white/5/60 backdrop-blur-md
                     px-3 py-1 text-xs text-strong shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          {t}
        </span>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-xs underline text-dim hover:text-strong"
      >
        Limpiar todo
      </button>
    </div>
  );
};

export default FiltersSummary;
