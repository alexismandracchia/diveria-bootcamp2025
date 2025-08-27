import React, { useCallback } from "react";
import Image from "next/image";
import { Badge, BadgeProps } from "../../badges/Badges";
import { GradientButton } from "../../buttons/Buttons";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export interface ProductRow {
  id: number;
  title: string;
  price: number;
  stock: number;
  status: string;
  thumbnail?: string;
}

interface ProductTableRowProps {
  product: ProductRow;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}

const getBadgeProps = (status: string): BadgeProps => {
  switch (status) {
    case "In Stock":
      return { textSuccess: status };
    case "Low Stock":
      return { textWarning: status };
    case "Out of Stock":
      return { textDanger: status };
    default:
      return {};
  }
};

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  onEdit,
  onRemove,
}) => {

  const handleEdit = useCallback(() => {
    if (onEdit) onEdit(product.id);
  }, [product.id, onEdit]);

  const handleRemove = useCallback(() => {
    if (onRemove) onRemove(product.id);
  }, [product.id, onRemove]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        {product.thumbnail && (
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={70}
            height={70}
          />
        )}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.title}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${product.price}
      </td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4">
        <Badge {...getBadgeProps(product.status)} />
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-1">
          <GradientButton
            onClick={handleEdit}
            className="p-2"
            colorFrom="from-green-500"
            colorVia="via-green-600"
            colorTo="to-green-700"
            focusColor="focus:ring-green-300"
            darkFocusColor="dark:focus:ring-green-800"
          >
            <FaEdit />
          </GradientButton>
          <GradientButton
            onClick={handleRemove}
            className="p-2"
            colorFrom="from-red-500"
            colorVia="via-red-600"
            colorTo="to-red-700"
            focusColor="focus:ring-red-300"
            darkFocusColor="dark:focus:ring-red-800"
          >
            <MdDelete />
          </GradientButton>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(ProductTableRow);
