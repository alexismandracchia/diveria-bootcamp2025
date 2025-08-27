import React, { useMemo } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
  pageSize: number;
}

const ProductTablePagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange, total, pageSize }) => {
  
  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage > totalPages - 3) {
      start = Math.max(1, totalPages - (maxVisible - 1));
    }

    if (start > 1) {
      items.push({ type: 'page', page: 1 });
      if (start > 2) {
        items.push({ type: 'ellipsis' });
      }
    }

    for (let i = start; i <= end; i++) {
      items.push({ type: 'page', page: i });
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        items.push({ type: 'ellipsis' });
      }
      items.push({ type: 'page', page: totalPages });
    }

    return items;
  }, [currentPage, totalPages]);

  return (
    <nav className="flex items-center justify-between pt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, total)} of {total}
        </p>
        <div>
          <ul className="inline-flex -space-x-px rounded-md shadow-sm">
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Prev
              </button>
            </li>

            {paginationItems.map((item, index) => (
              <li key={`${item.type}-${item.page || index}`}>
                {item.type === 'ellipsis' ? (
                  <span className="px-2 py-1 text-gray-500">…</span>
                ) : (
                  <button
                    onClick={() => onPageChange(item.page!)}
                    className={`px-3 h-8 border border-gray-300 hover:bg-gray-100 ${
                      item.page === currentPage
                        ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                        : "bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {item.page}
                  </button>
                )}
              </li>
            ))}

            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ProductTablePagination;