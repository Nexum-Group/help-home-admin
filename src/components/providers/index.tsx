'use client';

import FilterProviders from '@/src/components/providers/filter-providers';
import ListProviders from '@/src/components/providers/list-providers';
import { useGetAllProviders } from '@/src/hooks/useProvider';
import { ProviderStatus } from '@/src/types/provider-status';
import { useState } from 'react';

export default function Providers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ProviderStatus | string>('');
  const { data, isLoading, error } = useGetAllProviders(
    searchTerm,
    categoryFilter,
    statusFilter as ProviderStatus
  );

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  function handleCategoryFilter(categoryId: string) {
    setCategoryFilter(categoryId);
  }

  function handleStatusFilter(status: ProviderStatus | string) {
    setStatusFilter(status);
  }

  return (
    <div className="admin-content">
      <FilterProviders
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        setCategoryFilter={handleCategoryFilter}
        setSearchTerm={handleSearch}
        setStatusFilter={handleStatusFilter}
      />
      <ListProviders data={data || []} isLoading={isLoading} error={error} />
    </div>
  );
}
