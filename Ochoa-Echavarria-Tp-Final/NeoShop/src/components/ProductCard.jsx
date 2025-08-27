import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function ProductCard({ product }) {
  const { isAuthenticated, deleteItem } = useApp()
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const onDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`¿Eliminar "${product.title}"?`)) deleteItem(Number(product.id))
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const cardImage = imageError
    ? 'https://via.placeholder.com/300x180/6c757d/ffffff?text=Imagen+no+disponible'
    : product.thumbnail

  return (
    <div
      className="card h-100 product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img
          src={cardImage}
          className="card-img-top"
          alt={product.title}
          onError={handleImageError}
          loading="lazy"
        />
        {isHovered && (
          <div className="card-overlay d-flex justify-content-center">
            <Link
              className="btn btn-sm btn-primary overlay-btn"
              to={`/products/${product.id}`}
            >
              <i className="bi bi-eye me-1"></i>Ver detalles
            </Link>
          </div>
        )}
        {product.rating >= 2 && (
          <span className="badge bg-warning text-dark rating-badge">
            ⭐ {product.rating}
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1 text-truncate" title={product.title}>
          {product.title}
        </h6>

        <div className="text-secondary small mb-2">
          <span className="category-badge">{product.category}</span>
          {product.brand && <span className="brand-text"> · {product.brand}</span>}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold text-primary product-price">
            ${product.price}
          </span>
          {product.stock > 0 && (
            <span className={`badge stock-badge ${product.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
              {product.stock} en stock
            </span>
          )}
        </div>

        <div className="mt-auto d-flex gap-2 flex-wrap">
          <Link
            className="btn btn-sm btn-outline-primary action-btn"
            to={`/products/${product.id}`}
          >
            <i className="bi bi-eye me-1"></i>Ver
          </Link>
          {isAuthenticated && (
            <>
              <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                to={`/edit/${product.id}`}
              >
                <i className="bi bi-pencil me-1"></i>Editar
              </Link>
              <button
                className="btn btn-sm btn-outline-danger action-btn"
                onClick={onDelete}
              >
                <i className="bi bi-trash me-1"></i>Borrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard)