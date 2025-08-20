import { useState, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";

export default function DeleteProductForm() {
    const { items, deleteItem } = useAppState();
    const [productId, setProductId] = useState<number | "">("");
    const [productData, setProductData] = useState<Item | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productId) return;
        await deleteItem(productId);
        setProductId("");
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
                <div key={productId} className="border rounded p-4 flex flex-col items-center">
                    <img src={productData?.image} alt={productData?.title} className="w-32 h-32 object-contain mb-4" />
                    <h2 className="font-semibold text-lg text-center">{productData?.title}</h2>
                    <p className="text-gray-700 mt-2 text-center">${productData?.price}</p>
                </div>
            )
        }
        <button type="submit" className="cursor-pointer bg-blue-500 text-white rounded py-2 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed" disabled={!productData}>
          Borrar
        </button>
      </form>
      </div>
    );
}