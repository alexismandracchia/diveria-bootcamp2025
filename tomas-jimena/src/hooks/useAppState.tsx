import { useState, useEffect } from "react";
import axios from "axios";
import { Item, User, AppState } from "@/types/app.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAppState = (): AppState => {
  const [items, setItems] = useState<Item[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User, token: string) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const userData: User = {
        id: 1,
        name: username,
        password,
      };

      handleLogin(userData, data.token);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
      return false;
    } finally {
      setLoading(false);
      
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setItems([]);
    localStorage.removeItem("user");
  };

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Item[]>(`${API_URL}/products`);
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Item) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post<Item>(`${API_URL}/products`, item, {
        headers: { "Content-Type": "application/json" },
      });
      setItems((prev) => [...prev, data]);
    } catch (err: any) {
      setError(err.message || "Error al agregar producto");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item: Item) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put<Item>(
        `${API_URL}/products/${item.id}`,
        item,
        { headers: { "Content-Type": "application/json" } }
      );
      setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    } catch (err: any) {
      setError(err.message || "Error al actualizar producto");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      setError(err.message || "Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    isAuthenticated,
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
    getItems,
    addItem,
    updateItem,
    deleteItem,
    login,
  };
};
