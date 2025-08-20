import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";
import { useEffect, useState} from "react";

export default function EditProductForm() {
  const { items, updateItem } = useAppState();
  const [productId, setProductId] = useState<number | "">("");
  const [productData, setProductData] = useState<Item | null>(null);

  useEffect(()=>{
    if (productId === "" || items.length === 0) {
      setProductData(null);
      return;
    }
    console.log("ID product:", productId);
    const foundProduct = items.find(item => item.id === Number(productId));
    console.log("Found product:", foundProduct);
    setProductData(foundProduct || null);

  },[productId, items])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData) return;

    const formData = new FormData(e.currentTarget);
    const updatedItem = {
      id: Number(formData.get("id")),
      title: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      image: undefined,
    };
    await updateItem(updatedItem);
    
    setProductId("");
    setProductData(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
        Editar producto
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
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-300">
            Nombre:
          </label>
          <input
            className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            id="name"
            name="name"
            value={productData?.title || ""}
            onChange={(e) =>
              setProductData((prev) => (prev ? { ...prev, title: e.target.value } : prev))
            }
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm font-medium text-gray-300">
            Precio:
          </label>
          <input
            className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            type="number"
            id="price"
            name="price"
            value={productData?.price || ""}
            onChange={(e) =>
              setProductData((prev) => (prev ? { ...prev, price: Number(e.target.value) } : prev))
            }
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-300">
            Descripción:
          </label>
          <textarea
            className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            id="description"
            name="description"
            rows={3}
            value={productData?.description || ""}
            onChange={(e) =>
              setProductData((prev) => (prev ? { ...prev, description: e.target.value } : prev))
            }
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-300">
            Categoría:
          </label>
          <input
            className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            id="category"
            name="category"
            value={productData?.category || ""}
            onChange={(e) =>
              setProductData((prev) => (prev ? { ...prev, category: e.target.value } : prev))
            }
            required
          />
        </div>
        <button type="submit" className="cursor-pointer bg-blue-500 text-white rounded py-2 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed" disabled={!productData}>
          Actualizar
        </button>
      </form>
    </div>
  );
}
