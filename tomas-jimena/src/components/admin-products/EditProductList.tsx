import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import StatusMessage from "../ui/StatusMessage";
import React from "react";

function EditProductForm() {
  const truncate = (s: string, n = 40) =>
    s.length > n ? s.slice(0, n - 1) + "…" : s;

  const { getItems, items, updateItem, error, loading } = useAppState();
  const [productId, setProductId] = useState<number | "">("");
  const [productData, setProductData] = useState<Item | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (productId === "" || items.length === 0) {
      setProductData(null);
      setImageFile(null);
      setPreview(null);
      return;
    }
    const foundProduct = items.find((item) => item.id === Number(productId));
    setProductData(foundProduct || null);
    setPreview(foundProduct?.image || null);
    setImageFile(null);
  }, [productId, items]);

  useEffect(() => {
    getItems(); // trae todos los productos al cargar el formulario
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData) return;

    const formData = new FormData(e.currentTarget);
    const updatedItem: Item = {
      id: productData.id,
      title: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      image: preview || undefined,
    };

    await updateItem(updatedItem);
    setSuccess("Producto actualizado");
    setProductId("");
    setProductData(null);
    setImageFile(null);
    setPreview(null);

    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Editar producto
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
          {/* Campos del producto */}
          {productData && (
            <>
              <input type="hidden" name="id" value={productData.id} />

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">
                  Nombre:
                </label>
                <input
                  className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                  name="name"
                  value={productData.title}
                  onChange={(e) =>
                    setProductData((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">
                  Precio:
                </label>
                <input
                  className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData((prev) =>
                      prev ? { ...prev, price: Number(e.target.value) } : prev
                    )
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">
                  Descripción:
                </label>
                <textarea
                  className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  name="description"
                  rows={3}
                  value={productData.description}
                  onChange={(e) =>
                    setProductData((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  required
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">
                  Categoría:
                </label>
                <input
                  className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={(e) =>
                    setProductData((prev) =>
                      prev ? { ...prev, category: e.target.value } : prev
                    )
                  }
                  required
                />
              </div>

              {/* Drag & Drop imagen */}
              <div
                className="border-2 border-dashed p-4 rounded text-center cursor-pointer"
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto max-h-48"
                  />
                ) : (
                  <p>Arrastra la imagen o haz click para seleccionar</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </div>
            </>
          )}
          <Button type="submit" loading={loading}>
            {loading ? "Updating..." : "Update"}
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

export default React.memo(EditProductForm);
