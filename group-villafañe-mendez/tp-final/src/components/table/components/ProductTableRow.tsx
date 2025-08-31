"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { Badge, BadgeProps } from "../../badges/Badges";
import GlassIconButton from "@/app/(private)/dashboard/components/GlassIconButton";
import type { ProductTableRowProps } from "@/types/productTypes";

const getBadgeProps = (status?: string): BadgeProps => {
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
  return (
    <tr className="transition-colors hover:bg-white/5">
      <td className="p-3 sm:p-4 align-middle">
  {product.thumbnail && (
    <div className="w-[12vw] h-[12vh] overflow-hidden rounded-xl ring-1 ring-white/10 flex items-center justify-center">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-contain w-full h-full"
      />
    </div>
  )}
</td>


      <td className="px-4 py-3 sm:px-6 sm:py-4 align-middle">
        <Link
          href={`/products/${product.id}`}
          className="text-strong hover:underline underline-offset-4"
        >
          {product.title}
        </Link>
      </td>

      <td className="px-4 py-3 sm:px-6 sm:py-4 align-middle">
        <span className="text-soft">${product.price}</span>
      </td>

      <td className="px-4 py-3 sm:px-6 sm:py-4 align-middle">
        <span className="text-soft">{product.stock}</span>
      </td>

      <td className="px-4 py-3 sm:px-6 sm:py-4 align-middle">
        <Badge {...getBadgeProps(product.status)} />
      </td>

      <td className="px-4 py-3 sm:px-6 sm:py-4 align-middle">
        <div className="flex justify-end gap-2">
          <GlassIconButton
            title="Editar"
            icon={<Pencil className="h-4 w-4" />}
            onClick={onEdit}
          />
          <GlassIconButton
            title="Eliminar"
            icon={<Trash className="h-4 w-4" />}
            onClick={onRemove}
          />
        </div>
      </td>
    </tr>
  );
};

export default React.memo(ProductTableRow);
