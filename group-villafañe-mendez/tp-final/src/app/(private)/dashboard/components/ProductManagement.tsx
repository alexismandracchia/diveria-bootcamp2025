"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

import GlassButton from "@/app/(private)/dashboard/components/GlassButton";
import GlassCard from "@/app/(private)/dashboard/components/GlassCard";

import TableProducts from "@/components/table/TableProducts";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import FullScreenError from "@/components/error/FullScreenErrors";
import DeleteProductModal from "@/components/modal/DeleteProductModal";
import ProductFormModal from "@/components/modal/ProductFormModal";

import type { Product, ProductRow } from "@/types/productTypes";
import { useLocalProducts } from "../../../../hooks/useLocalProducts";
import { useProductContext } from "../../../../context/ProductContext";

const ModalType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
} as const;

type ModalStateType = {
  type: keyof typeof ModalType | null;
  product: ProductRow | null;
};

export default function ProductManagement() {
  const router = useRouter();

  const [modal, setModal] = useState<ModalStateType>({
    type: null,
    product: null,
  });

  const {
    localProducts,
    addLocalProduct,
    updateLocalProduct,
    removeLocalProduct,
  } = useLocalProducts();

  const {
    products,
    total,
    pageNumber,
    pageSize,
    loading,
    error,
    setPageNumber,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductContext();

  const handleOpenModal = (
    type: keyof typeof ModalType,
    product?: ProductRow
  ) => {
    setModal({ type, product: product || null });
  };

  const handleCloseModal = () => {
    setModal({ type: null, product: null });
  };

  const combinedProducts = useMemo(
    () => [...products, ...localProducts],
    [products, localProducts]
  );

  const handleFormSubmit = async (
    data: Omit<Product, "id"> | Partial<Product>
  ) => {
    try {
      if (modal.type === ModalType.CREATE) {
        const response = await createProduct(data as Omit<Product, "id">);
        const newRow: ProductRow = {
          id: response.id,
          title: response.title,
          price: response.price,
          stock: response.stock,
          status: "In Stock",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
        };
        addLocalProduct(newRow);
      } else if (modal.type === ModalType.EDIT && modal.product) {
        await updateProduct(modal.product.id, data);
        updateLocalProduct(modal.product.id, data as Partial<ProductRow>);
      }
    } catch (e) {
      console.error("Failed to submit form:", e);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteConfirm = async () => {
    if (modal.product) {
      try {
        await deleteProduct(modal.product.id);
        removeLocalProduct(modal.product.id);
      } catch (e) {
        console.error("Failed to delete product:", e);
      } finally {
        handleCloseModal();
      }
    }
  };

  if (loading) return <FullScreenLoader message="Loading Products..." />;
  if (error) {
    return (
      <FullScreenError
        message={`Error fetching products: `}
        onRetry={() => router.refresh()}
      />
    );
  }

  return (
    <main className="min-h-dvh surface-0 text-strong">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-6">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-dim mt-1">Administrá tu catálogo</p>
          </div>

          {/* Botón Add Product (glass) */}
          <GlassButton
            onClick={() => handleOpenModal(ModalType.CREATE)}
            ariaLabel="Agregar producto"
            className="inline-flex items-center gap-2"
          >
            <FaPlus className="h-4 w-4" />
            Add Product
          </GlassButton>
        </div>

        
        <GlassCard className="p-0 overflow-hidden">
          <TableProducts
            products={combinedProducts}
            total={total + localProducts.length}
            page={pageNumber}
            pageSize={pageSize}
            onPageChange={setPageNumber}
            onEdit={(product) => handleOpenModal(ModalType.EDIT, product)}
            onRemove={(product) => handleOpenModal(ModalType.DELETE, product)}
          />
        </GlassCard>

        {/* Modales */}
        <DeleteProductModal
          isOpen={modal.type === ModalType.DELETE}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          productName={modal.product?.title || ""}
        />

        <ProductFormModal
          isOpen={
            modal.type === ModalType.CREATE || modal.type === ModalType.EDIT
          }
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          initialData={
            modal.type === "EDIT"
              ? {
                  title: modal.product?.title || "",
                  price: modal.product?.price || 0,
                  stock: modal.product?.stock || 0,
                }
              : null
          }
        />
      </div>
    </main>
  );
}
