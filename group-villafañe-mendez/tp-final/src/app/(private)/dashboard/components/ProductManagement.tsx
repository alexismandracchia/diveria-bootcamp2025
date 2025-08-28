"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

import { ShadowButton } from "@/components/buttons/Buttons";
import TableProducts, { ProductRow } from "@/components/table/TableProducts";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import FullScreenError from "@/components/error/FullScreenErrors";
import DeleteProductModal from "@/components/modal/DeleteProductModal";
import ProductFormModal from "@/components/modal/ProductFormModal";
import { Product } from "@/services/ProductServices";

import { useProductContext } from "./ProductContext";

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
  const [addProducts, setAddProducts] = useState<ProductRow[]>([]);

  const {
    products,
    total,
    pageNumber,
    pageSize,
    loading,
    error,
    setPageNumber,
    refetch,
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
        };

        setAddProducts((prev) => [...prev, newRow]);
      } else if (modal.type === ModalType.EDIT && modal.product) {
        await updateProduct(modal.product.id, data);
      }
      //refetch();
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
        refetch();
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
    <>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-5">
        <div className="flex justify-between  items-center py-0 mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ShadowButton
            className="p-2"
            colorFrom="from-green-500"
            colorVia="via-green-600"
            colorTo="to-green-700"
            onClick={() => handleOpenModal(ModalType.CREATE)}
          >
            <FaPlus />
            Add Product
          </ShadowButton>
        </div>
        <TableProducts
          products={[...products, ...addProducts]}
          total={total + addProducts.length}
          page={pageNumber}
          pageSize={pageSize}
          onPageChange={setPageNumber}
          onEdit={(product) => handleOpenModal(ModalType.EDIT, product)}
          onRemove={(product) => handleOpenModal(ModalType.DELETE, product)}
        />

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
    </>
  );
}
