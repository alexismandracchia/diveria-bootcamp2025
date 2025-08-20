"use client"
import { useState } from "react";

import CreateProductForm from "@/components/admin-products/CreateProductForm";
import EditProductList from "@/components/admin-products/EditProductList";
import DeleteProductList from "@/components/admin-products/DeleteProductList";

export default function AdminProducts() {

    const [activeTab, setActiveTab] = useState<"create" | "edit" | "delete">("create");

  return (
    <main>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Product Managment
        </h1>
        <p className="text-lg ">
        </p>
      </section>

      <section className="w-full max-w-md">
<div>
  <div className="flex gap-1">
    <button onClick={() => setActiveTab("create")} className={`cursor-pointer px-4 py-2  rounded-xl rounded-b-none ${activeTab === "create" ? "bg-gray-500" : "bg-gray-700"}`}>Crear</button>
    <button onClick={() => setActiveTab("edit")} className={`cursor-pointer px-4 py-2  rounded-xl rounded-b-none ${activeTab === "edit" ? "bg-gray-500" : "bg-gray-700"}`}>Editar</button>
    <button onClick={() => setActiveTab("delete")} className={`cursor-pointer px-4 py-2  rounded-xl rounded-b-none ${activeTab === "delete" ? "bg-gray-500" : "bg-gray-700"}`}>Borrar</button>
  </div>

  <div className="tab-content">
    {activeTab === "create" && <CreateProductForm />}
    {activeTab === "edit" && <EditProductList />}
    {activeTab === "delete" && <DeleteProductList />}
  </div>
</div>
      </section>
    </main>
  );
}
