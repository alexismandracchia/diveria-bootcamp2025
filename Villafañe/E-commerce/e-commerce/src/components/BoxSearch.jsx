import React, { useState, useEffect, useMemo } from "react";
import { fetchAllProducts } from "../api/products";
import "./../styles/BoxSearch.css";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import Results from "./Results"; 

const BoxSearch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        if (mounted)
          setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        if (mounted)
          setError("No se pudieron cargar los productos. Intenta nuevamente.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const productsFiltered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.title?.toLowerCase().includes(term));
  }, [products, searchTerm]);

  return (
    <Container className="mt-4 boxsearch-container bg-dark text-light p-4 rounded-4">
      <h2 className="mb-3 fw-semibold text-light">Products</h2>

      <Form
        onSubmit={(e) => e.preventDefault()}
        className="mb-4"
        role="search"
        aria-label="Buscar productos por título"
      >
        <InputGroup>
          <InputGroup.Text className="bg-dark text-secondary border-secondary">
            🔎
          </InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Product name"
            className="bg-dark text-light border-secondary shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="outline-secondary"
              onClick={() => setSearchTerm("")}
              className="border-secondary"
            >
              Clean
            </Button>
          )}
        </InputGroup>
      </Form>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Results products={productsFiltered} />
      )}
    </Container>
  );
};

export default BoxSearch;