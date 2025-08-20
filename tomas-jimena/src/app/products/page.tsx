"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (err: any) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg">Explore our selection of test products.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p>Loadong products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && products.map(product => (
          <div key={product.id} className="border rounded p-4 flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" />
            <h2 className="font-semibold text-lg text-center">{product.title}</h2>
            <p className="text-gray-700 mt-2 text-center">${product.price}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
