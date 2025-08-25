import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function ProductCard({ product }) {
  const { isAuthenticated, deleteItem } = useApp()
  const onDelete = () => {
    if (confirm(`¿Eliminar "${product.title}"?`)) deleteItem(Number(product.id))
  }

  return (
    <div className="card h-100 shadow-sm">
      <img src={product.thumbnail} className="card-img-top object-fit-cover" style={{ height: 180 }} alt={product.title} />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1">{product.title}</h6>
        <div className="text-secondary small mb-2">{product.category} · {product.brand}</div>
        <div className="fw-bold mb-3">${product.price}</div>
        <div className="mt-auto d-flex gap-2">
          <Link className="btn btn-sm btn-outline-primary" to={`/products/${product.id}`}>Ver</Link>
          {isAuthenticated && (
            <>
              <Link className="btn btn-sm btn-outline-secondary" to={`/edit/${product.id}`}>Editar</Link>
              <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>Borrar</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard)