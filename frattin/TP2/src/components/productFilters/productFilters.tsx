import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import "./productFilters.css";

type Filters = {
  title: string;
  categoryId: number | null;
  price_min: number | null;
  price_max: number | null;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductFilters({ filters, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="filters-container">
      <div className="label-group">
        <label htmlFor="Title">Title</label>
        <input
          id="Title"
          type="text"
          placeholder="Search by title..."
          value={filters.title}
          onChange={(e) => onChange({ ...filters, title: e.target.value })}
        />
      </div>

      <div className="label-group">
        <label htmlFor="Filters">Categories</label>
        <select
          id="Filters"
          value={filters.categoryId ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              categoryId: e.target.value ? Number(e.target.value) : null,
            })
          }
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="label-group">
        <label htmlFor="PriceMin">Price Min</label>
        <input
          id="PriceMin"
          type="number"
          placeholder="Precio min"
          value={filters.price_min ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              price_min: e.target.value ? Number(e.target.value) : null,
            })
          }
          min={1}
        />
      </div>

      <div className="label-group">
        <label htmlFor="PriceMax">Price Max</label>
        <input
          id="PriceMax"
          type="number"
          placeholder="Precio max"
          value={filters.price_max ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              price_max: e.target.value ? Number(e.target.value) : null,
            })
          }
          min={1}
        />
      </div>
    </div>
  );
}
