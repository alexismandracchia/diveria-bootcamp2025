import { useState, useEffect, useMemo } from 'react';
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
    const [maxProductPrice, setMaxProductPrice] = useState(1000);

    useEffect(() => {
        if (items.length > 0) {
            const calculatedMaxPrice = Math.max(...items.map(item => item.price), 1000);
            setMaxProductPrice(calculatedMaxPrice);

            if (!filters.priceRange) {
                setFilters(prev => ({
                    ...prev,
                    priceRange: [0, calculatedMaxPrice]
                }));
            }
        }
    }, [items]);

    useEffect(() => {
        if (items.length > 0) {
            const uniqueCategories = [...new Set(items.map(item => item.category))].filter(Boolean);
            const uniqueBrands = [...new Set(items.map(item => item.brand))].filter(Boolean);
            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
        }
    }, [items]);

    const currentMinPrice = useMemo(() => {
        return filters.priceRange?.[0] || 0;
    }, [filters.priceRange]);

    const currentMaxPrice = useMemo(() => {
        return filters.priceRange?.[1] || maxProductPrice;
    }, [filters.priceRange, maxProductPrice]);

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? null : category
        }));
    };

    const handleMinPriceChange = (e) => {
        const newMin = parseInt(e.target.value);
        const newMax = Math.max(newMin, currentMaxPrice);
        setFilters(prev => ({
            ...prev,
            priceRange: [newMin, newMax]
        }));
    };

    const handleMaxPriceChange = (e) => {
        const newMax = parseInt(e.target.value);
        const newMin = Math.min(currentMinPrice, newMax);
        setFilters(prev => ({
            ...prev,
            priceRange: [newMin, newMax]
        }));
    };

    const handleRatingChange = (rating) => {
        setFilters(prev => ({
            ...prev,
            minRating: prev.minRating === rating ? null : rating
        }));
    };

    const clearAllFilters = () => {
        clearFilters();
        setFilters(prev => ({
            ...prev,
            priceRange: [0, maxProductPrice]
        }));
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Filtros</h5>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={clearAllFilters}
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
                    <label className="form-label">Precio: ${currentMinPrice} - ${currentMaxPrice}</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={maxProductPrice}
                            value={currentMinPrice}
                            onChange={handleMinPriceChange}
                            style={{ flex: 1 }}
                        />
                        <span className="mx-2">-</span>
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max={maxProductPrice}
                            value={currentMaxPrice}
                            onChange={handleMaxPriceChange}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <small>${currentMinPrice}</small>
                        <small>${currentMaxPrice}</small>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <div className="btn-group-vertical w-100" role="group">
                        <button
                            type="button"
                            className={`btn btn-sm ${!filters.category ? 'btn-primary' : 'btn-outline-primary'} text-start`}
                            onClick={() => setFilters(prev => ({ ...prev, category: null }))}
                        >
                            Todas las categorías
                        </button>
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
                        <button
                            type="button"
                            className={`btn btn-sm ${!filters.minRating ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={() => setFilters(prev => ({ ...prev, minRating: null }))}
                        >
                            Todos
                        </button>
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
                        {filters.category || filters.brand || filters.minRating || (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < maxProductPrice))
                            ? 'Filtros aplicados'
                            : 'Todos los productos'}
                    </small>
                </div>
            </div>
        </div>
    );
}