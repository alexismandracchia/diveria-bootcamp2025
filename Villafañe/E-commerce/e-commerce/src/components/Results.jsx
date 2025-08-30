
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Results = ({ products }) => {
  if (!products.length) {
    return <div className="text-secondary py-5 text-center">No se encontraron productos.</div>;
  }

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {products.map((product) => {
        const imgSrc =
          product?.images?.[0] ||
          "https://via.placeholder.com/600x400?text=Sin+imagen";
        const price =
          typeof product.price === "number"
            ? product.price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              })
            : product.price;

        return (
          <Col key={product.id}>
            <Card className="h-100 border-0 card-dark">
              <div className="card-img-wrap">
                <Card.Img
                  variant="top"
                  src={imgSrc}
                  alt={product.title || "Producto"}
                  className="object-fit-cover"
                />
              </div>
              <Card.Body className="bg-dark text-light d-flex flex-column">
                <Card.Title className="fw-semibold mb-2">
                  {product.title}
                </Card.Title>
                <Card.Text className="text-secondary small mb-3 flex-grow-1">
                  {product.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-light">{price}</span>
                  <Button
                    as={Link}
                    to={`/items/${product.id}`}
                    variant="outline-danger"
                    className="rounded-pill px-3"
                  >
                    See more
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Results;
