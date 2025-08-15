import "./productFilters.css";

type Filters = {
  title: string;
  categoryId: number | null;
  price_min: number;
  price_max: number;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function ProductFilters({ filters, onChange }: Props) {
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
        <label htmlFor="Filters">Filters</label>
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
          <option value="1">Clothes</option>
          <option value="2">Electronics</option>
          <option value="3">Furniture</option>
          <option value="4">Shoes</option>
          <option value="5">Others</option>
        </select>
      </div>

      <div className="label-group">
        <label htmlFor="PriceMin">Price Min</label>
        <input
          id="PriceMin"
          type="number"
          placeholder="Precio min"
          value={filters.price_min}
          onChange={(e) =>
            onChange({ ...filters, price_min: Number(e.target.value) })
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
          value={filters.price_max}
          onChange={(e) =>
            onChange({ ...filters, price_max: Number(e.target.value) })
          }
          min={1}
        />
      </div>
    </div>
  );
}
