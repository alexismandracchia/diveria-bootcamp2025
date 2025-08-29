import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import ProductFilters from '../components/ProductFilter'

export default function Products() {
  const {
    items, total, page, limit, query, loading, error,
    setPage, setLimit, fetchItems,
    skipNextFetch, setSkipNextFetch, isAuthenticated
  } = useApp()

  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (skipNextFetch) {
      setSkipNextFetch(false);
      return;
    }
    fetchItems();
  }, [page, limit, query, skipNextFetch]);

  return (
    
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
          <ProductFilters />
        </div>

        <div className="col-12 col-lg-9">
          <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
            <button
              className="btn btn-outline-primary d-lg-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`bi bi-${showFilters ? 'x' : 'funnel'}`}></i> Filtros
            </button>

            <select className="form-select" style={{ maxWidth: 140 }} value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)) }}>
              {[6, 12, 18, 24].map(n => <option key={n} value={n}>{n} por página</option>)}
            </select>

            <span className="text-secondary small ms-auto">Mostrando: {items.length} de {total}</span>
          </div>

          {showFilters && (
            <div className="d-lg-none mb-4">
              <ProductFilters />
            </div>
          )}

          {!isAuthenticated && (
            <div className="alert alert-info d-flex align-items-center">
              <div>
                <strong>Modo de visualización:</strong> Inicia sesión para acceder a todas las funcionalidades de administración.
              </div>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="text-center py-4">Cargando...</div>}
          {!loading && items.length === 0 && <div className="text-center py-5">Sin resultados. Prueba con otros filtros.</div>}

          <div className="row g-3">
            {items.map(p => (
              <div className="col-12 col-sm-6 col-md-4" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Pagination total={total} page={page} limit={limit} onChange={(p) => setPage(p)} />
          </div>
        </div>
      </div>
    </div>
  )
}