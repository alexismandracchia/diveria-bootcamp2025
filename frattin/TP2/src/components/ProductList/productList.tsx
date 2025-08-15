import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./productList.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductFilters from "../productFilters/productFilters";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

type Filters = {
  title: string;
  categoryId: number | null;
  price_min: number | null;
  price_max: number | null;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
    title: "",
    categoryId: null,
    price_min: null,
    price_max: null,
  });

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          marginRight: "1.5rem",
          transform: "scale(2)",
          zIndex: "1000",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          marginLeft: "1.5rem",
          transform: "scale(2)",
          zIndex: "1000",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilters(filters), 750);
    return () => clearTimeout(handler); // limpiar el timeout si filters cambia antes de 500ms
  }, [filters]);

  useEffect(() => {
    const params: any = {};
    if (filters.title) params.title = filters.title;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    params.price_min = filters.price_min != null ? filters.price_min : 1;
    params.price_max = filters.price_max != null ? filters.price_max : 999999;

    api
      .get<Product[]>("/products", { params })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [debouncedFilters]);

  if (loading) return <p>Searching products...</p>;

  function handdleClick(id: number) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="app-content">
      <ProductFilters filters={filters} onChange={setFilters} />

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Slider {...settings}>
              {product.images.map((img, i) => (
                <div key={i}>
                  <img
                    src={img}
                    alt={product.title}
                    onClick={() => handdleClick(product.id)}
                  />
                </div>
              ))}
            </Slider>
            <div className="text-content">
              <h3>{product.title}</h3>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
