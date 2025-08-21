"use client";

import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

export function useAuthState() {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsAuthLoading(false)
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (email === "test@test.com" && password === "Test1234!") {
      const loggedUser = { id: "1", name: "Gabriel", email };
      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } else {
      throw new Error("Credenciales inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    isAuthLoading,
    login,
    logout,
  };
}
