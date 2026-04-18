'use client';

import FilterProviders from '@/src/components/providers/filter-providers';
import ListProviders from '@/src/components/providers/list-providers';
import { useGetAllProviders } from '@/src/hooks/useProvider';
import { ProviderStatus } from '@/src/types/provider-status';
import { ProviderWithServiceRequestsCount } from '@/src/types/provider';
import { ToolbarSkeleton } from '@/src/components/ui/skeleton';
import { useState } from 'react';

const ITEMS_PER_PAGE = 12;

export default function Providers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ProviderStatus | string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllProviders({
    search: searchTerm,
    categoryId: categoryFilter,
    status: statusFilter as ProviderStatus,
    page: currentPage,
  });

  const response = data as { results?: ProviderWithServiceRequestsCount[]; count?: number } | undefined;
  const providers = response?.results || [];
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function handleSearch(term: string) {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  function handleCategoryFilter(categoryId: string) {
    setCategoryFilter(categoryId);
    setCurrentPage(1);
  }

  function handleStatusFilter(status: ProviderStatus | string) {
    setStatusFilter(status);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="admin-content">
      {isLoading ? (
        <ToolbarSkeleton />
      ) : (
        <FilterProviders
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          setCategoryFilter={handleCategoryFilter}
          setSearchTerm={handleSearch}
          setStatusFilter={handleStatusFilter}
        />
      )}
      <div className="admin-results-info">
        <span>
          {totalCount} prestador{totalCount !== 1 ? 'es' : ''} encontrado
          {totalCount !== 1 ? 's' : ''}
        </span>
      </div>
      <ListProviders
        data={providers}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}