"use client";
import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
  pageSize: number;
}

const ProductTablePagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  total,
  pageSize,
}) => {
  const paginationItems = useMemo(() => {
    const items: Array<{ type: "page" | "ellipsis"; page?: number }> = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage > totalPages - 3) {
      start = Math.max(1, totalPages - (maxVisible - 1));
    }

    if (start > 1) {
      items.push({ type: "page", page: 1 });
      if (start > 2) items.push({ type: "ellipsis" });
    }

    for (let i = start; i <= end; i++) items.push({ type: "page", page: i });

    if (end < totalPages) {
      if (end < totalPages - 1) items.push({ type: "ellipsis" });
      items.push({ type: "page", page: totalPages });
    }

    return items;
  }, [currentPage, totalPages]);

  const clamp = (n: number) => Math.min(Math.max(n, 1), totalPages);

  return (
    <nav
      aria-label="Paginación"
      className="mt-4 flex items-center justify-between gap-3"
    >
      {/* Resumen izquierda */}
      <p className="text-sm text-dim">
        Mostrando {(currentPage - 1) * pageSize + 1}–
        {Math.min(currentPage * pageSize, total)} de {total}
      </p>

      {/* Controles móviles: solo anterior/siguiente */}
      <div className="flex flex-1 justify-end gap-2 sm:hidden">
        <button
          onClick={() => onPageChange(clamp(currentPage - 1))}
          disabled={currentPage === 1}
          className={`glass-icon ${currentPage === 1 ? "opacity-60 cursor-not-allowed" : "hover:bg-white/14 active:bg-white/20"}`}
          title="Anterior"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => onPageChange(clamp(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`glass-icon ${currentPage === totalPages ? "opacity-60 cursor-not-allowed" : "hover:bg-white/14 active:bg-white/20"}`}
          title="Siguiente"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Controles desktop: números + extremos */}
      <div className="hidden sm:flex sm:items-center">
        <ul className="flex items-center gap-2">
          {/* Prev */}
          <li>
            <button
              onClick={() => onPageChange(clamp(currentPage - 1))}
              disabled={currentPage === 1}
              className={`glass-icon ${currentPage === 1 ? "opacity-60 cursor-not-allowed" : "hover:bg-white/14 active:bg-white/20"}`}
              title="Anterior"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </li>

          
          {paginationItems.map((item, idx) => (
            <li key={`${item.type}-${item.page ?? idx}`}>
              {item.type === "ellipsis" ? (
                <span className="text-dim px-1">
                  <MoreHorizontal className="h-4 w-4 inline" aria-hidden="true" />
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(item.page!)}
                  aria-current={item.page === currentPage ? "page" : undefined}
                  className={`glass-button h-9 min-w-9 px-3 text-sm ${
                    item.page === currentPage
                      ? "bg-[rgba(255,255,255,0.16)] text-white ring-1 ring-[rgba(255,255,255,0.25)]"
                      : "text-soft"
                  }`}
                >
                  {item.page}
                </button>
              )}
            </li>
          ))}

          
          <li>
            <button
              onClick={() => onPageChange(clamp(currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`glass-icon ${currentPage === totalPages ? "opacity-60 cursor-not-allowed" : "hover:bg-white/14 active:bg-white/20"}`}
              title="Siguiente"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ProductTablePagination;
