"use client";
import React from "react";
import ProductTableRow from "./components/ProductTableRow";
import ProductTablePagination from "../pagination/Pagination";
import { TableProductsProps } from "@/types/productTypes";

const TableProducts: React.FC<TableProductsProps> = ({
  products,
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  onEdit,
  onRemove,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full">
      {/* Sin ring/rounded aquí: la GlassCard ya lo hace */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-transparent">
            <tr className="text-soft text-xs uppercase tracking-wide border-b border-white/10">
              <th className="px-4 py-3 sm:px-6">Image</th>
              <th className="px-4 py-3 sm:px-6">Product</th>
              <th className="px-4 py-3 sm:px-6">Price</th>
              <th className="px-4 py-3 sm:px-6">Stock</th>
              <th className="px-4 py-3 sm:px-6">Status</th>
              <th className="px-4 py-3 sm:px-6 text-right">Action</th>
            </tr>
          </thead>

          {/* Zebra sutil; fondo base transparente para que se vea uniforme */}
          <tbody className="[&>tr:nth-child(even)]:bg-white/3">
            {products.map((product) => (
              <ProductTableRow
                key={`product-${product.id}`}
                product={product}
                onEdit={() => onEdit?.(product)}
                onRemove={() => onRemove?.(product)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <ProductTablePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          total={total}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default TableProducts;
