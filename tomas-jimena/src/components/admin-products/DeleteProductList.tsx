import { useState, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";
import Card from "../ui/Card";
import Button from "../ui/Button";
import StatusMessage from "../ui/StatusMessage";
import React from "react";

function DeleteProductForm() {
  const truncate = (s: string, n = 40) =>
    s.length > n ? s.slice(0, n - 1) + "…" : s;

  const { items, deleteItem, error, getItems, loading } = useAppState();
  const [productId, setProductId] = useState<number | "">("");
  const [productData, setProductData] = useState<Item | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (productId === "" || items.length === 0) {
      setProductData(null);
      return;
    }
    const foundProduct = items.find((item) => item.id === Number(productId));
    setProductData(foundProduct || null);
  }, [productId, items]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) return;

    await deleteItem(Number(productId));
    setSuccess("Producto eliminado");

    setTimeout(() => {
      setSuccess(null);
    }, 3000);

    setTimeout(() => {
      setProductId("");
      setProductData(null);
    }, 4000);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Borrar producto
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Select de producto */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-300">
              Producto:
            </label>
            <select
              value={productId || ""}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-800"
              required
            >
              <option value="">-- Seleccione un producto --</option>
              {items.map((item) => {
                const full = `${item.id} - ${item.title}`;
                const short = truncate(full, 40); // ajustá 40 a gusto
                return (
                  <option key={item.id} value={item.id} title={full}>
                    {short}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Vista previa del producto */}
          {productData && <Card product={productData} />}

          <Button type="submit" loading={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </form>
      </div>

      {error ? (
        <StatusMessage message={error} type="error" />
      ) : success ? (
        <StatusMessage message={success} type="success" />
      ) : null}
    </>
  );
}

export default React.memo(DeleteProductForm);
