import { Item, User } from "@/types/app.types";
import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAppState = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User | null) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setItems([]);
  };

  const getItems = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error("Error al obtener productos");
    const data: Item[] = await response.json();
    setItems(data);
  };

  const addItem = async (item: Item) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) throw new Error("Error al agregar producto");
    const newItem: Item = await response.json();
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateItem = async (item: Item) => {
    const response = await fetch(`${API_URL}/products/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) throw new Error("Error al actualizar producto");
    const updatedItem: Item = await response.json();
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === updatedItem.id ? updatedItem : prevItem
      )
    );
  };

  const deleteItem = async (id: number) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar producto");
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    console.log("Producto eliminado:", id);
  };

  return {
    items,
    isAuthenticated,
    user,
    handleLogin,
    handleLogout,
    getItems,
    addItem,
    updateItem,
    deleteItem
  };
};
