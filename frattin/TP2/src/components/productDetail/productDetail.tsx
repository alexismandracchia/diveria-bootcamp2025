import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";

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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api
      .get<Product>(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <strong>{product?.price?.toFixed(2)}</strong>
      {product?.images?.map((img, i) => (
        <img key={i} src={img} alt={product.title} width={100} />
      ))}
    </div>
  );
}
