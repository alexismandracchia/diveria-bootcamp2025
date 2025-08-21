"use client";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Card from "@/components/ui/Card";
import React from "react";

function Products() {
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
          <Card key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default React.memo(Products);
