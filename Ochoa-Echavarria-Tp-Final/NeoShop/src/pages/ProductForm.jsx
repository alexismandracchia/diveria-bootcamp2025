// src/pages/ProductForm.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const initial = { title:'', price:'', description:'', category:'', brand:'', thumbnail:'' }

export default function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { fetchProductById, addItem, updateItem } = useApp()

  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return setValues(initial)
    fetchProductById(id).then(d => {
      setValues({
        title: d.title ?? '',
        price: d.price ?? '',
        description: d.description ?? '',
        category: d.category ?? '',
        brand: d.brand ?? '',
        thumbnail: d.thumbnail ?? ''
      })
    }).catch(()=>{})
  }, [id])

  const validate = () => {
    const e = {}
    if (!values.title.trim()) e.title = 'Requerido'
    if (!values.price || Number(values.price) <= 0) e.price = 'Debe ser > 0'
    if (!values.description.trim()) e.description = 'Requerido'
    if (!values.category.trim()) e.category = 'Requerido'
    if (!values.thumbnail.trim()) e.thumbnail = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return

    setSaving(true)
    const payload = {
      title: values.title.trim(),
      price: Number(values.price),
      description: values.description.trim(),
      category: values.category.trim(),
      brand: (values.brand || 'Generic').trim(),
      thumbnail: values.thumbnail.trim()
    }

    try {
      if (isEdit) {
        await updateItem(Number(id), payload)   // 👈 actualiza estado global
      } else {
        await addItem(payload)                  // 👈 agrega al estado global
      }
      navigate('/')                             // 👈 volvemos a la lista (que NO se pisa por el “salto”)
    } finally {
      setSaving(false)
    }
  }

  const onChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }))

  return (
    <div className="container mt-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">{isEdit ? 'Editar producto' : 'Crear producto'}</h4>
          <form className="row g-3" onSubmit={onSubmit} noValidate>
            {[
              { name: 'title', label: 'Título' },
              { name: 'price', label: 'Precio', type: 'number', step: '0.01' },
              { name: 'category', label: 'Categoría' },
              { name: 'brand', label: 'Marca (opcional)' },
              { name: 'thumbnail', label: 'URL Imagen' }
            ].map(f => (
              <div className="col-12 col-md-6" key={f.name}>
                <label className="form-label">{f.label}</label>
                <input className={`form-control ${errors[f.name] ? 'is-invalid' : ''}`}
                  name={f.name}
                  type={f.type || 'text'}
                  step={f.step}
                  value={values[f.name]}
                  onChange={onChange} />
                {errors[f.name] && <div className="invalid-feedback">{errors[f.name]}</div>}
              </div>
            ))}
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                name="description"
                rows="3"
                value={values.description}
                onChange={onChange} />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
