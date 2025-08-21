import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

export default function Products() {
  const {
    items, total, page, limit, query, loading, error,
    setPage, setLimit, setQuery, fetchItems,
    skipNextFetch, setSkipNextFetch
  } = useApp()

  useEffect(() => {
    if (skipNextFetch) {
      setSkipNextFetch(false);  // consumimos el salto
      return;
    }
    fetchItems();
  }, [page, limit, query, skipNextFetch]);

  // ... resto igual (tu grilla, paginación, etc.)
  return (
    <>
      <div className="container mt-3">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <input
            className="form-control"
            style={{ maxWidth: 320 }}
            placeholder="Buscar (q)..."
            value={query}
            onChange={(e) => { setPage(1); setQuery(e.target.value) }}
          />
          <select className="form-select" style={{ maxWidth: 140 }} value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)) }}>
            {[6, 12, 18, 24].map(n => <option key={n} value={n}>{n} por página</option>)}
          </select>
          <span className="text-secondary small ms-auto">Total: {total}</span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="text-center py-4">Cargando...</div>}
        {!loading && items.length === 0 && <div className="text-center py-5">Sin resultados.</div>}

        <div className="row g-3">
          {items.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Pagination total={total} page={page} limit={limit} onChange={(p) => setPage(p)} />
        </div>
      </div>
    </>
  )
}
