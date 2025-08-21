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

  const [skipNextFetch, setSkipNextFetch] = useState(false)
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
          setUseLocalData(true)
        } else {
          fetchItems()
        }
      } catch (e) {
        console.error('Error loading products from localStorage:', e)
        fetchItems()
      }
    }

    loadProducts()
  }, [])

  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    if (items.length > 0 && useLocalData) {
      localStorage.setItem('products', JSON.stringify(items))
      localStorage.setItem('productsTotal', total.toString())
    }
  }, [items, total, useLocalData])

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

  const fetchJson = async (url, options) => {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    return res.json()
  }

  //Listado con paginación/búsqueda - Versión corregida
  const fetchItems = useCallback(async () => {
    if (skipNextFetch) {
      setSkipNextFetch(false)
      return
    }

    // Si estamos en modo datos locales, no hacer fetch a la API
    if (useLocalData) {
      console.log('Modo local activado, skipping API fetch')
      return
    }

    setLoading(true)
    setError(null)

    if (abortRef.current) {
      abortRef.current.abort()
    }
    abortRef.current = new AbortController()

    try {
      const skip = (page - 1) * limit
      const base = query
        ? `${API}/products/search?q=${encodeURIComponent(query)}`
        : `${API}/products`
      const sep = base.includes('?') ? '&' : '?'
      const url = `${base}${sep}limit=${limit}&skip=${skip}&select=title,price,thumbnail,category,brand,rating,stock`

      console.log('Fetching from API:', url)

      const data = await fetchJson(url, { signal: abortRef.current.signal })
      setItems(data.products || [])
      setTotal(data.total || 0)

    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e.message)
        console.error('Fetch error:', e)
      }
    } finally {
      setLoading(false)
    }
  }, [page, limit, query, skipNextFetch, useLocalData])

  // seEffect para fetch automático - Versión corregida
  useEffect(() => {
    fetchItems()
  }, [page, limit, query, fetchItems])

  // Setters mejorados para paginación
  const changePage = useCallback((newPage) => {
    setPage(newPage)
    setSkipNextFetch(false)
    // Al cambiar página, forzar modo API (no local)
    setUseLocalData(false)
  }, [])

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit)
    setPage(1)
    setSkipNextFetch(false)
    setUseLocalData(false) // Forzar modo API
  }, [])

  const changeQuery = useCallback((newQuery) => {
    setQuery(newQuery)
    setPage(1)
    setSkipNextFetch(false)
    setUseLocalData(false) // Forzar modo API
  }, [])

  const fetchProductById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      // Primero buscar en los items locales
      const localItem = items.find(item => item.id === Number(id))
      if (localItem) return localItem

      // Si no está en local, buscar en la API
      return await fetchJson(`${API}/products/${Number(id)}`)
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [items])

  const addItem = useCallback(async (newItem) => {
    // Crear un nuevo producto con ID único
    const created = {
      ...newItem,
      id: -Date.now(),
      isLocal: true
    }

    // Actualizar estado local
    setItems(prev => [created, ...prev])
    setTotal(t => t + 1)
    setUseLocalData(true)
    setSkipNextFetch(true) // Evitar fetch automático

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
    setUseLocalData(true)
    setSkipNextFetch(true) // Evitar fetch automático

    return { id: targetId, ...updatedData }
  }, [])

  const deleteItem = useCallback(async (id) => {
    const targetId = Number(id)

    // Eliminación del estado local
    setItems(prev => prev.filter(p => Number(p.id) !== targetId))
    setTotal(t => Math.max(0, t - 1))
    setUseLocalData(true)
    setSkipNextFetch(true) // Evitar fetch automático
  }, [])

  // Función para resetear y volver a cargar desde la API
  const resetToAPIData = useCallback(() => {
    localStorage.removeItem('products')
    localStorage.removeItem('productsTotal')
    setUseLocalData(false)
    setItems([])
    setTotal(0)
    setSkipNextFetch(false)
    fetchItems()
  }, [fetchItems])

  return useMemo(() => ({
    isAuthenticated,
    user,
    items,
    total,
    page,
    limit,
    query,
    loading,
    error,
    useLocalData,
    skipNextFetch,

    // setters UI - usar las versiones mejoradas
    setPage: changePage,
    setLimit: changeLimit,
    setQuery: changeQuery,
    setSkipNextFetch,

    // auth
    loginUser,
    logoutUser,

    // API/CRUD
    fetchItems,
    fetchProductById,
    addItem,
    updateItem,
    deleteItem,
    resetToAPIData,

    // función adicional para forzar fetch
    refreshData: () => {
      setUseLocalData(false)
      setSkipNextFetch(false)
      fetchItems()
    }
  }), [
    isAuthenticated,
    user,
    items,
    total,
    page,
    limit,
    query,
    loading,
    error,
    useLocalData,
    skipNextFetch,
    changePage,
    changeLimit,
    changeQuery,
    loginUser,
    logoutUser,
    fetchItems,
    fetchProductById,
    addItem,
    updateItem,
    deleteItem,
    resetToAPIData
  ])
}