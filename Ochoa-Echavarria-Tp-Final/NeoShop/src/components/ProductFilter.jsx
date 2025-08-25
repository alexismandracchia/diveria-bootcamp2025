import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ProductFilters() {
    const {
        items,
        query,
        setQuery,
        filters,
        setFilters,
        clearFilters
    } = useApp();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // Extraer categorías y marcas únicas de los productos
    useEffect(() => {
        if (items.length > 0) {
            const uniqueCategories = [...new Set(items.map(item => item.category))].filter(Boolean);
            const uniqueBrands = [...new Set(items.map(item => item.brand))].filter(Boolean);
            const maxPrice = Math.max(...items.map(item => item.price), 1000);

            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
            setPriceRange([0, maxPrice]);

            // Inicializar el rango de precios en los filtros si no está establecido
            if (!filters.priceRange) {
                setFilters(prev => ({
                    ...prev,
                    priceRange: [0, maxPrice]
                }));
            }
        }
    }, [items]);

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? null : category
        }));
    };

    const handlePriceChange = (min, max) => {
        setFilters(prev => ({
            ...prev,
            priceRange: [min, max]
        }));
    };

    const handleRatingChange = (rating) => {
        setFilters(prev => ({
            ...prev,
            minRating: prev.minRating === rating ? null : rating
        }));
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Filtros</h5>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={clearFilters}
                    >
                        Limpiar
                    </button>
                </div>

                <div className="mb-3">
                    <label htmlFor="search" className="form-label">Buscar</label>
                    <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio: ${filters.priceRange?.[0] || 0} - ${filters.priceRange?.[1] || 1000}</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={priceRange[1]}
                            value={filters.priceRange?.[0] || 0}
                            onChange={(e) => handlePriceChange(parseInt(e.target.value), filters.priceRange?.[1] || priceRange[1])}
                            style={{ flex: 1 }}
                        />
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={priceRange[1]}
                            value={filters.priceRange?.[1] || priceRange[1]}
                            onChange={(e) => handlePriceChange(filters.priceRange?.[0] || 0, parseInt(e.target.value))}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <small>${filters.priceRange?.[0] || 0}</small>
                        <small>${filters.priceRange?.[1] || priceRange[1]}</small>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <div className="btn-group-vertical w-100" role="group">
                        {categories.map(category => (
                            <button
                                key={category}
                                type="button"
                                className={`btn btn-sm ${filters.category === category ? 'btn-primary' : 'btn-outline-primary'} text-start`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {brands.length > 0 && (
                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <select
                            className="form-select"
                            value={filters.brand || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value || null }))}
                        >
                            <option value="">Todas las marcas</option>
                            {brands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Rating mínimo</label>
                    <div className="btn-group w-100" role="group">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                type="button"
                                className={`btn btn-sm ${filters.minRating === rating ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => handleRatingChange(rating)}
                            >
                                {rating}+ ⭐
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <small className="text-muted">
                        {filters.category || filters.brand || filters.minRating || (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < priceRange[1]))
                            ? 'Filtros aplicados'
                            : 'Todos los productos'}
                    </small>
                </div>
            </div>
        </div>
    );
}