import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./productList.css"

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
  price_min: number;
  price_max: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
    title: "",
    categoryId: null,
    price_min: 0,
    price_max: 0,
  });

  useEffect(() => {
    const params: any = {};
    if (filters.title) params.title = filters.title;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.price_min) params.price_min = filters.price_min;
    if (filters.price_max) params.price_max = filters.price_max;

    api
      .get<Product[]>("/products", { params })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) return <p>Searching products...</p>;

  function handdleClick(id: number) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="app-content">
      <ProductFilters filters={filters} onChange={setFilters} />
      
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} onClick={() => handdleClick(product.id)}>
            <h3>{product.title}</h3>
            <p>{product.category.name}</p>
            {product?.images?.map((img, i) => (
              <img key={i} src={img} alt={product.title} width={100} />
            ))}{" "}
            <strong>${product.price.toFixed(2)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
