"use client";
import React from "react";
import ProductTableRow, { ProductRow } from "./components/ProductTableRow";
import ProductTablePagination from "../pagination/Pagination";

export type { ProductRow };

export interface TableProductsProps {
  products: ProductRow[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (newPage: number) => void;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}

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
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onRemove={onRemove}
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
