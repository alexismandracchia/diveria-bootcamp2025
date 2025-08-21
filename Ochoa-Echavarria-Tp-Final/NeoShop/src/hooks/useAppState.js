import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const API = 'https://dummyjson.com'

export default function useAppState() {
  // --- Auth ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth')) || false } catch { return false }
  })
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null } catch { return null }
  })

  // --- Estado de productos/UI ---
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Para controlar cuándo debemos usar datos locales en lugar de hacer fetch
  const [useLocalData, setUseLocalData] = useState(false)

  const abortRef = useRef(null)

  // Persistencia auth
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated))
    localStorage.setItem('user', JSON.stringify(user))
  }, [isAuthenticated, user])

  // Cargar productos desde localStorage al inicializar
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || []
        const storedTotal = parseInt(localStorage.getItem('productsTotal')) || 0

        if (storedProducts.length > 0) {
          setItems(storedProducts)
          setTotal(storedTotal)
          setUseLocalData(true) // Usar datos locales en lugar de hacer fetch
        } else {
          // Si no hay datos locales, cargar desde API
          fetchItems()
        }
      } catch (e) {
        console.error('Error loading products from localStorage:', e)
        fetchItems() // Fallback a API si hay error
      }
    }

    loadProducts()
  }, [])

  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('products', JSON.stringify(items))
      localStorage.setItem('productsTotal', total.toString())
    }
  }, [items, total])

  // Auth simulada
  const DEMO = { email: 'admin@bootcamp.com', password: 'password', name: 'User' }

  const loginUser = useCallback(async (email, password) => {
    if (email === DEMO.email && password === DEMO.password) {
      setUser({ name: DEMO.name, email })
      setIsAuthenticated(true)
      return true
    }
    throw new Error('Credenciales inválidas')
  }, [])

  const logoutUser = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  // Helper fetch
  const fetchJson = async (url, options) => {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    return res.json()
  }

  // Listado con paginación/búsqueda
  const fetchItems = useCallback(async (opts = {}) => {
    // Si estamos usando datos locales, no hacer fetch
    if (useLocalData) return

    const p = opts.page ?? page
    const l = opts.limit ?? limit
    const q = opts.query ?? query
    const skip = (p - 1) * l

    setLoading(true)
    setError(null)
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    try {
      const base = q
        ? `${API}/products/search?q=${encodeURIComponent(q)}`
        : `${API}/products`
      const sep = base.includes('?') ? '&' : '?'
      const url = `${base}${sep}limit=${l}&skip=${skip}&select=title,price,thumbnail,category,brand,rating,stock`
      const data = await fetchJson(url, { signal: abortRef.current.signal })
      setItems(data.products || [])
      setTotal(data.total || 0)
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [page, limit, query, useLocalData])

  // Actualizar fetchItems cuando cambien los parámetros (solo si no estamos usando datos locales)
  useEffect(() => {
    if (!useLocalData) {
      fetchItems()
    }
  }, [page, limit, query, useLocalData, fetchItems])

  const fetchProductById = useCallback(async (id) => {
    setLoading(true); setError(null)
    try {
      // Primero buscar en los items locales
      const localItem = items.find(item => item.id === Number(id))
      if (localItem) return localItem

      // Si no está en local, buscar en la API
      return await fetchJson(`${API}/products/${Number(id)}`)
    } catch (e) {
      setError(e.message); throw e
    } finally {
      setLoading(false)
    }
  }, [items])

  const addItem = useCallback(async (newItem) => {
    // Crear un nuevo producto con ID único (usando timestamp negativo para evitar conflictos con la API)
    const created = {
      ...newItem,
      id: -Date.now(), // ID negativo único
      isLocal: true
    }

    // Actualizar estado local
    setItems(prev => [created, ...prev])
    setTotal(t => t + 1)
    setUseLocalData(true) // Cambiar a modo datos locales

    return created
  }, [])

  const updateItem = useCallback(async (id, updatedData) => {
    const targetId = Number(id)

    // Actualizar en estado local
    setItems(prev => prev.map(p =>
      Number(p.id) === targetId
        ? { ...p, ...updatedData, isModified: true }
        : p
    ))
    setUseLocalData(true) // Cambiar a modo datos locales

    return { id: targetId, ...updatedData }
  }, [])

  const deleteItem = useCallback(async (id) => {
    const targetId = Number(id)

    // Eliminación del estado local
    setItems(prev => prev.filter(p => Number(p.id) !== targetId))
    setTotal(t => Math.max(0, t - 1))
    setUseLocalData(true) // Cambiar a modo datos locales
  }, [])

  // Función para resetear y volver a cargar desde la API
  const resetToAPIData = useCallback(() => {
    localStorage.removeItem('products')
    localStorage.removeItem('productsTotal')
    setUseLocalData(false)
    setItems([])
    setTotal(0)
    fetchItems()
  }, [fetchItems])

  return useMemo(() => ({
    // estado
    isAuthenticated, user, items, total, page, limit, query, loading, error,
    useLocalData,
    // setters UI
    setPage, setLimit, setQuery,
    // auth
    loginUser, logoutUser,
    // API/CRUD
    fetchItems, fetchProductById, addItem, updateItem, deleteItem,
    resetToAPIData
  }), [
    isAuthenticated, user, items, total, page, limit, query, loading, error,
    useLocalData,
    loginUser, logoutUser, fetchItems, fetchProductById, addItem, updateItem, deleteItem,
    resetToAPIData
  ])
}