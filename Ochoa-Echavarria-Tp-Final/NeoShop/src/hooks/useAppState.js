import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const API = 'https://dummyjson.com'

export default function useAppState() {
  //Auth
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth')) || false } catch { return false }
  })
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null } catch { return null }
  })

  // Estados
  const [items, setItems] = useState([]) 
  const [filteredItems, setFilteredItems] = useState([]) 
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    priceRange: null,
    minRating: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [skipNextFetch, setSkipNextFetch] = useState(false)
  const [useLocalData, setUseLocalData] = useState(false)

  const abortRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated))
    localStorage.setItem('user', JSON.stringify(user))
  }, [isAuthenticated, user])

  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || []
        const storedTotal = parseInt(localStorage.getItem('productsTotal')) || 0

        if (storedProducts.length > 0) {
          setItems(storedProducts)
          setFilteredItems(storedProducts)
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

  useEffect(() => {
    if (items.length > 0 && useLocalData) {
      localStorage.setItem('products', JSON.stringify(items))
      localStorage.setItem('productsTotal', total.toString())
    }
  }, [items, total, useLocalData])

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

  //Listado con paginación/búsqueda
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

    // Cancelar fetch previo si existe
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
      setFilteredItems(data.products || [])
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

  useEffect(() => {
    fetchItems()
  }, [page, limit, query, fetchItems])


  const changePage = useCallback((newPage) => {
    setPage(newPage)
    setSkipNextFetch(false)

    setUseLocalData(false)
  }, [])

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit)
    setPage(1)
    setSkipNextFetch(false)
    setUseLocalData(false)
  }, [])

  const changeQuery = useCallback((newQuery) => {
    setQuery(newQuery)
    setPage(1)
    setSkipNextFetch(false)
    setUseLocalData(false)
  }, [])

  const fetchProductById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const apiProduct = await fetchJson(`${API}/products/${Number(id)}`)
      return apiProduct
    } catch (apiError) {
      const localItem = items.find(item => item.id === Number(id))
      if (localItem) return localItem
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [items])

  const addItem = useCallback(async (newItem) => {
    const created = {
      ...newItem,
      id: -Date.now(),
      isLocal: true
    }

    setItems(prev => [created, ...prev])
    setFilteredItems(prev => [created, ...prev])
    setTotal(t => t + 1)
    setUseLocalData(true)
    setSkipNextFetch(true)

    return created
  }, [])

  const updateItem = useCallback(async (id, updatedData) => {
    const targetId = Number(id)

    setItems(prev => prev.map(p =>
      Number(p.id) === targetId
        ? { ...p, ...updatedData, isModified: true }
        : p
    ))
    setFilteredItems(prev => prev.map(p =>
      Number(p.id) === targetId
        ? { ...p, ...updatedData, isModified: true }
        : p
    ))
    setUseLocalData(true)
    setSkipNextFetch(true)

    return { id: targetId, ...updatedData }
  }, [])

  const deleteItem = useCallback(async (id) => {
    const targetId = Number(id)

    setItems(prev => prev.filter(p => Number(p.id) !== targetId))
    setFilteredItems(prev => prev.filter(p => Number(p.id) !== targetId))
    setTotal(t => Math.max(0, t - 1))
    setUseLocalData(true)
    setSkipNextFetch(true)
  }, [])

  const resetToAPIData = useCallback(() => {
    localStorage.removeItem('products')
    localStorage.removeItem('productsTotal')
    setUseLocalData(false)
    setItems([])
    setFilteredItems([])
    setTotal(0)
    setSkipNextFetch(false)
    fetchItems()
  }, [fetchItems])

  const applyFilters = useCallback((products, filters, searchQuery) => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const title = product.title ? product.title.toString().toLowerCase() : '';
        const description = product.description ? product.description.toString().toLowerCase() : '';
        const category = product.category ? product.category.toString().toLowerCase() : '';
        const brand = product.brand ? product.brand.toString().toLowerCase() : '';

        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query) ||
          brand.includes(query)
        );
      });
    }

    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category && product.category === filters.category
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(product =>
        product.brand && product.brand === filters.brand
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price != null &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(product =>
        product.rating != null &&
        product.rating >= filters.minRating
      );
    }

    return filtered;
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      if (useLocalData || query || Object.values(filters).some(val => val !== null)) {
        const filtered = applyFilters(items, filters, query);
        setFilteredItems(filtered);
      } else {
        setFilteredItems(items);
      }
    }
  }, [items, filters, query, applyFilters, useLocalData])

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      category: null,
      brand: null,
      priceRange: null,
      minRating: null
    });
    setQuery('');
  }, []);

  return useMemo(() => ({
    isAuthenticated,
    user,
    items: filteredItems,
    total,
    page,
    limit,
    query,
    filters,
    loading,
    error,
    useLocalData,
    skipNextFetch,

    // setters UI
    setPage: changePage,
    setLimit: changeLimit,
    setQuery: changeQuery,
    setFilters,
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
    clearFilters,

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
    resetToAPIData,
    filters,
    clearFilters
  ])
}