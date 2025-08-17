// src/hooks/useSearchForm.ts

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { validateSearchTitle } from "../validations/validations"; // Asegúrate que la ruta sea correcta

const PRODUCTS_ROUTE = "/products";

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearchTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Limpiamos el error en cuanto el usuario empieza a escribir de nuevo
    if (error) {
      setError("");
    }
    setSearchTerm(e.target.value);
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSearchTitle(searchTerm);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    const query = searchTerm.trim();
    navigate(`${PRODUCTS_ROUTE}?title=${encodeURIComponent(query)}`);
  }, [searchTerm, navigate]);

  return {
    searchTerm,
    error,
    handleSearchTermChange,
    handleSubmit,
  };
};