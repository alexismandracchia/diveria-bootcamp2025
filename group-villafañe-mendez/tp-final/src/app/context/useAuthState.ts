'use client'

import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
} | null

export function useAuthState() {
  const [user, setUser] = useState<User>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    if (email === 'test@test.com' && password === '123456') {
      const loggedUser = { id: '1', name: 'Gabriel', email }
      setUser(loggedUser)
      setIsAuthenticated(true)
    } else {
      throw new Error('Credenciales inválidas')
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}
