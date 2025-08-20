"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";


export default function Products() {
  const { items, loading, error, getItems } = useAppContext();


  useEffect(() => {
    getItems();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg">Explore our selection of test products.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && items.map(product => (
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
