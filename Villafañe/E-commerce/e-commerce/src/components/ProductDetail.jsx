import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { Card, Button, Badge } from 'react-bootstrap';
import './../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("There was an error loading the product details.", err);
      }
    };
    fetchSingleProduct(id);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center text-light py-5">
        Cargando producto...
      </div>
    );
  }

  return (
    <Card className="product-detail-card border-0">
      <div className="product-detail-img-wrap">
        <Card.Img
          variant="top"
          src={
            Array.isArray(product.images)
              ? product.images[0]
              : product.images || "https://via.placeholder.com/600x400?text=Sin+imagen"
          }
          alt={product?.title || "Producto"}
        />
      </div>
      <Card.Body className="bg-dark text-light d-flex flex-column">
        <div className="d-flex align-items-center mb-2 gap-2">
          <Card.Title className="fw-semibold mb-0 flex-grow-1">
            {product?.title}
          </Card.Title>
          {product?.category?.name && (
            <Badge className="category-badge">
              {product.category.name}
            </Badge>
          )}
          {product?.category?.image && (
            <img
              src={product.category.image}
              alt={product.category.name}
              className="category-img ms-2"
            />
          )}
        </div>
        <Card.Text className="text-secondary small mb-3 flex-grow-1">
          {product?.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-light">
            {typeof product?.price === "number"
              ? product.price.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                })
              : product?.price}
          </span>
          <Button
            variant="outline-warning"
            className="rounded-pill px-3 fw-semibold"
          >
            Comprar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}