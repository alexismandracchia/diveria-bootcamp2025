import Modal from "@/components/modal/Modal";
import React, { useState, useEffect, useMemo } from "react";
import { ProductFormErrors, validateProductForm } from "@/lib/validators";
import { ShadowButton } from "../buttons/Buttons";
import { TextInput } from "../inputs/TextField";
import { Product } from "@/types/productTypes";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Omit<Product, "id"> | Partial<Product>) => void;
  initialData?: {
    title: string;
    price: number;
    stock: number;
  } | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
      });
    } else {
      setFormData({ title: "", price: 0, stock: 0 });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? parseFloat(value) || 0
          : name === "stock"
          ? Math.floor(Number(value)) || 0
          : value,
    }));
  };

  const validationErrors = useMemo(() => validateProductForm(formData), [formData]);
  const isValid = !validationErrors;
  
  useEffect(() => {
    setErrors(validationErrors || {});
  }, [validationErrors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); 
    if (!isValid) return;
    onSubmit(formData);
  };

  const isEditing = !!initialData;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Product" : "Create New Product"}
    >
      <form className="p-4 md:p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          id="title"
          label="Name"
          value={formData.title}
          placeholder="Enter product name"
          onChange={(e) => handleChange("title", e.target.value)}
          error={submitted ? errors.title : undefined}
        />

        <TextInput
          id="price"
          label="Price"
          type="number"
          value={formData.price.toString()}
          placeholder="0"
          onChange={(e) => handleChange("price", e.target.value)}
          error={submitted ? errors.price : undefined}
        />

        <TextInput
          id="stock"
          label="Stock"
          type="number"
          value={formData.stock.toString()}
          placeholder="0"
          onChange={(e) => handleChange("stock", e.target.value)}
          error={submitted ? errors.stock : undefined}
        />

        <ShadowButton type="submit" disabled={!isValid}>
          {isEditing ? "Save changes" : "Add new product"}
        </ShadowButton>
      </form>
    </Modal>
  );
};

export default ProductFormModal;