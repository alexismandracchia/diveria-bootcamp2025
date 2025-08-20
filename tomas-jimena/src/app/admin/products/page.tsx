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
  <div className="flex gap-4 mb-4">
    <button onClick={() => setActiveTab("create")}>Crear</button>
    <button onClick={() => setActiveTab("edit")}>Editar</button>
    <button onClick={() => setActiveTab("delete")}>Borrar</button>
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
