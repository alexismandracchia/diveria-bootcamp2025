import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const PLACEHOLDER =
  'https://via.placeholder.com/800x500.png?text=Sin+imagen'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchProductById, items } = useApp()

  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [localOnly, setLocalOnly] = useState(false)
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER)

  useEffect(() => {
    let mounted = true
    setStatus('loading')
    setLocalOnly(false)
    setData(null)

    fetchProductById(id)
      .then((d) => {
        if (!mounted) return
        setData(d)
        setImgSrc(d?.thumbnail || d?.images?.[0] || PLACEHOLDER)
        setStatus('ready')
      })
      .catch(() => {
        if (!mounted) return
        // Si el server no lo tiene, intento con el estado local (p.ej. creado)
        const local = items.find(p => String(p.id) === String(id))
        if (local) {
          setData(local)
          setImgSrc(local?.thumbnail || local?.images?.[0] || PLACEHOLDER)
          setLocalOnly(true)
          setStatus('ready')
        } else {
          setStatus('error')
          // Redirigimos suave a la lista para no dejar pantalla vacía
          navigate('/', { replace: true, state: { notFound: true } })
        }
      })

    return () => { mounted = false }
  }, [id])

  if (status === 'loading') return <div className="py-5 text-center">Cargando...</div>
  if (!data) return null

  return (
    <div className="container justify-content-center mt-3 shadow p-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            src={imgSrc}
            className="img-fluid rounded d-flex m-auto"
            alt={data.title || 'Producto'}
            onError={() => setImgSrc(PLACEHOLDER)}
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <h3 className="mb-1">{data.title || 'Sin título'}</h3>

          {localOnly && (
            <div className="alert alert-warning py-2">
              Este producto existe solo en el estado local (la API no lo persiste).
              Si refrescás, puede no estar.
            </div>
          )}

          <div className="text-secondary mb-2">
            {(data.category || 'Sin categoría')} · {(data.brand || 'Genérico')}
          </div>
          <h4 className="text-primary mb-3">
            {data.price != null ? `$${data.price}` : '—'}
          </h4>
          <p>{data.description || 'Sin descripción'}</p>
          <div className="text-secondary small">
            Rating: {data.rating ?? '—'} · Stock: {data.stock ?? '—'}
          </div>

          <div className="mt-4 d-flex gap-2">
            <Link className="btn btn-outline-secondary" to={`/edit/${data.id}`}>Editar</Link>
            <Link className="btn btn-outline-dark" to="/">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
