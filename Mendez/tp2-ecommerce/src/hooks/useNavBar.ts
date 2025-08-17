// src/hooks/useNavbar.ts

import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes"; // Asegúrate que la ruta sea correcta

export const useNavbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);
  
  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    handleDrawerClose(); // Cerramos el drawer al navegar
  }, [navigate, handleDrawerClose]);

  // Usamos useMemo para que esta transformación solo se ejecute si las rutas cambian.
  const menuItems = useMemo(() => {
    return routes
      .filter((r) => r.showInNav)
      .map((r) => ({
        path: r.path,
        title: r.path === "/" ? "HOME" : r.path.replace("/", "").toUpperCase(),
      }));
  }, []); // El array de dependencias está vacío porque `routes` es estático.

  return {
    mobileOpen,
    menuItems,
    handleDrawerToggle,
    handleDrawerClose,
    handleNavigate,
  };
};