import type { Product, ProductRow } from "@/types/productTypes";

export type Filters = {
  query: string;
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
};

export function extractCategories(all: Product[]): string[] {
  const set = new Set<string>();
  for (const p of all) {
    if (p.category) set.add(String(p.category));
  }
  return Array.from(set).sort();
}

export function priceBoundsFrom(all: Product[]) {
  if (!all.length) return { min: 0, max: 0 };
  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  for (const p of all) {
    if (typeof p.price === "number") {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    }
  }
  if (!isFinite(min)) min = 0;
  return { min, max };
}

export function hasActiveFilters(f: Filters) {
  return Boolean(
    (f.query && f.query.trim().length > 0) ||
      (f.categories && f.categories.length > 0) ||
      f.priceMin != null ||
      f.priceMax != null
  );
}

export function toRow(p: Product): ProductRow {
  const images = (p as any).images as string[] | undefined;
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    stock: p.stock,
    status: p.stock > 10 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Out of Stock",
    thumbnail: images && images.length ? images[0] : "",
  };
}

export function applyFilters(
  all: Product[],
  localRows: ProductRow[],
  f: Filters
): ProductRow[] {
  if (!hasActiveFilters(f)) return [];

  const q = f.query.trim().toLowerCase();
  const minP = f.priceMin ?? Number.NEGATIVE_INFINITY;
  const maxP = f.priceMax ?? Number.POSITIVE_INFINITY;
  const catSet = new Set(f.categories);

  const matches = all
    .filter((p) => {
      const byName = q ? p.title.toLowerCase().includes(q) : true;
      const byCat = catSet.size ? (p.category ? catSet.has(String(p.category)) : false) : true;
      const byPrice = typeof p.price === "number" && p.price >= minP && p.price <= maxP;
      return byName && byCat && byPrice;
    })
    .map(toRow);

  if (localRows.length && catSet.size === 0) {
    for (const lp of localRows) {
      const byName = q ? lp.title.toLowerCase().includes(q) : true;
      const byPrice =
        typeof lp.price === "number" && lp.price >= minP && lp.price <= maxP;
      if (byName && byPrice) matches.push(lp);
    }
  }

  return matches;
}

export function slicePage<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
