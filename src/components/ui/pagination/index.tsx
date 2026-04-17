'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="admin-pagination">
      <button
        className="admin-btn admin-btn-ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <div className="admin-pagination-pages">
        {startPage > 1 && (
          <>
            <button className="admin-btn admin-btn-ghost" onClick={() => onPageChange(1)}>
              1
            </button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pages.map((page) => (
          <button
            key={page}
            className={`admin-btn admin-btn-ghost ${currentPage === page ? 'admin-btn-primary' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <button className="admin-btn admin-btn-ghost" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        className="admin-btn admin-btn-ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
}