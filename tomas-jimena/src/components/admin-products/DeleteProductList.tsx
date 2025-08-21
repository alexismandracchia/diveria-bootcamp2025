import { useState, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";
import Card from "../ui/Card";
import Button from "../ui/Button";
import StatusMessage from "../ui/StatusMessage";

export default function DeleteProductForm() {
    const { items, deleteItem, error } = useAppState();
    const [productId, setProductId] = useState<number | "">("");
    const [productData, setProductData] = useState<Item | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productId) return;
        await deleteItem(productId);
        setSuccess("Producto eliminado");
        setTimeout(() => {setSuccess(null);}, 4000);
        setTimeout(() => {
          setProductId("");
        }, 3000);
        };

    useEffect(() => {
        if (productId === "" || items.length === 0) {
            setProductData(null);
            return;
        }
        const foundProduct = items.find(item => item.id === Number(productId));
        setProductData(foundProduct || null);

    }, [productId, items]);

    return (
      <>
        <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
        Borrar producto
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="id" className="mb-1 text-sm font-medium text-gray-300">
            ID del producto:
          </label>
          <input
            className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            type="number"
            id="id"
            name="id"
            value={productId || ""}
            onChange={(e) => setProductId(Number(e.target.value))}
            required
          />
        </div>
        {
            productData && (
                <Card product={productData} />
            )
        }
        <Button type="submit" disabled={!productData}>
          Borrar
        </Button>
      </form>
      </div>
        { error ? <StatusMessage message={error} type="error" /> : success ? <StatusMessage message={success} type="success" /> : null}
    </>  );
}