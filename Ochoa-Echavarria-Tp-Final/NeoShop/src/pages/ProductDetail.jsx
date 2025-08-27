import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import '../assets/styles.css'

const PLACEHOLDER = 'https://via.placeholder.com/800x500/6c757d/ffffff?text=Imagen+no+disponible'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchProductById, items, isAuthenticated } = useApp()

  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [localOnly, setLocalOnly] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    let mounted = true
    setStatus('loading')
    setLocalOnly(false)

    fetchProductById(id)
      .then((product) => {
        if (!mounted) return
        setData(product)
        setStatus('ready')
        // Verificar si es local-only comparando con items de la lista
        const isLocal = !items.some(item => item.id === product.id && !item.isLocal)
        setLocalOnly(isLocal)
      })
      .catch(() => {
        if (!mounted) return
        setStatus('error')
        navigate('/', { replace: true, state: { notFound: true } })
      })

    return () => { mounted = false }
  }, [id, fetchProductById, items, navigate])

  const handleImageError = () => {
    setImageError(true)
  }

  // Función para obtener el valor numérico del rating
  const getRatingValue = () => {
    if (!data || !data.rating) return 0;

    // Si rating es un objeto, tomar la propiedad rating
    if (typeof data.rating === 'object' && data.rating !== null) {
      return data.rating.rating || 0;
    }

    // Si rating es un número, usarlo directamente
    return data.rating;
  }

  // Función para obtener el número de reviews
  const getReviewsCount = () => {
    if (!data) return 0;

    // Si reviews es un array, devolver su longitud
    if (Array.isArray(data.reviews)) {
      return data.reviews.length;
    }

    // Si reviews es un objeto, asumir que hay al menos 1 review
    if (typeof data.reviews === 'object' && data.reviews !== null) {
      return 1;
    }

    // Si es un número, usarlo directamente
    return data.reviews || 0;
  }


  if (status === 'error') return (
    <div className="product-detail-error">
      <div className="container">
        <div className="error-card text-center">
          <i className="bi bi-exclamation-triangle error-icon"></i>
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no está disponible o ha sido removido.</p>
          <div className="error-actions">
            <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
              <i className="bi bi-arrow-left"></i>
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (!data) return null

  const mainImage = imageError ? PLACEHOLDER :
    data.images && data.images.length > 0 ? data.images[currentImage] :
      data.thumbnail || PLACEHOLDER

  const images = data.images && data.images.length > 0 ? data.images :
    data.thumbnail ? [data.thumbnail] : []

  const ratingValue = getRatingValue()
  const reviewsCount = getReviewsCount()

  return (
    <div className="product-detail-container">
      <div className="container">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Productos</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/?category=${data.category}`}>{data.category}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {data.title}
            </li>
          </ol>
        </nav>

        <div className="product-detail-card">
          <div className="row g-5">
            {/* Columna de imágenes */}
            <div className="col-12 col-lg-6">
              <div className="product-gallery">
                <div className="main-image-container">
                  <img
                    src={mainImage}
                    className="main-image"
                    alt={data.title}
                    onError={handleImageError}
                    loading="eager"
                  />
                  {data.discountPercentage && (
                    <span className="discount-badge">
                      -{Math.round(data.discountPercentage)}%
                    </span>
                  )}
                  {localOnly && (
                    <span className="local-badge">
                      <i className="bi bi-info-circle"></i> Local
                    </span>
                  )}
                </div>

                <div className="image-thumbnails">
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail-btn ${currentImage === index ? 'active' : ''}`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img
                        src={image}
                        alt={`Vista ${index + 1} de ${data.title}`}
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna de información */}
            <div className="col-12 col-lg-6">
              <div className="product-info">
                {localOnly && (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle"></i>
                    Este producto existe solo en el estado local.
                  </div>
                )}

                <h1 className="product-title">{data.title}</h1>

                <div className="product-meta">
                  <span className="category-badge">{data.category}</span>
                  {data.brand && <span className="brand-text">por {data.brand}</span>}
                </div>

                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < Math.floor(ratingValue) ? '-fill' : ''}`}
                      ></i>
                    ))}
                    <span className="rating-value">({ratingValue.toFixed(1)})</span>
                  </div>
                  <span className="reviews">· {reviewsCount} reseñas</span>
                </div>

                <div className="product-price-section d-flex flex-row flex-wrap align-items-center">
                  {data.discountPercentage ? (
                    <>
                      <span className="current-price">
                        ${(data.price * (1 - data.discountPercentage / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">${data.price}</span>
                      <span className="discount-text">Ahorras {Math.round(data.discountPercentage)}%</span>
                    </>
                  ) : (
                    <span className="current-price">${data.price}</span>
                  )}
                </div>

                <div className="product-description">
                  <h5>Descripción</h5>
                  <p>{data.description || 'Sin descripción disponible.'}</p>
                </div>

                <div className="product-specs">
                  <div className="spec-item">
                    <i className="bi bi-box"></i>
                    <span>Stock: {data.stock || 0} unidades</span>
                  </div>
                  <div className="spec-item">
                    <i className="bi bi-upc-scan"></i>
                    <span>SKU: {data.id}</span>
                  </div>
                  {data.weight && (
                    <div className="spec-item">
                      <i className="bi bi-speedometer2"></i>
                      <span>Peso: {data.weight} kg</span>
                    </div>
                  )}
                </div>

                <div className="product-features">
                  <div className="feature">
                    <i className="bi bi-truck"></i>
                    <span>Envío gratis en pedidos mayores a $50</span>
                  </div>
                  <div className="feature">
                    <i className="bi bi-arrow-clockwise"></i>
                    <span>Devoluciones en 30 días</span>
                  </div>
                  <div className="feature">
                    <i className="bi bi-shield-check"></i>
                    <span>Garantía del fabricante</span>
                  </div>
                </div>

                <div className="product-actions">
                  <div className="action-buttons">
                    {isAuthenticated && (
                      <Link className="btn btn-outline-secondary" to={`/edit/${data.id}`}>
                        <i className="bi bi-pencil"></i>
                        Editar
                      </Link>
                    )}
                    <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
                      <i className="bi bi-arrow-left"></i>
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}