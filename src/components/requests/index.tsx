'use client';

import FilterRequest from '@/src/components/requests/filter-request';
import ListRequest from '@/src/components/requests/list-requests';
import { useGetAllServices } from '@/src/hooks/useRequest';
import { ServiceStatus } from '@/src/types/services-status';
import { ServiceRequest } from '@/src/types/service';
import { ToolbarSkeleton } from '@/src/components/ui/skeleton';
import { useState } from 'react';

const ITEMS_PER_PAGE = 12;

export default function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | undefined>();
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllServices({
    search: searchTerm,
    status: serviceStatus,
    date,
    page: currentPage,
  });

  const response = data as { results?: ServiceRequest[]; count?: number } | undefined;
  const requests = response?.results || [];
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function handleSearch(term: string) {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  function handleServiceStatus(status: ServiceStatus) {
    setServiceStatus(status);
    setCurrentPage(1);
  }

  function handleDate(date: string) {
    setDate(date);
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
        <FilterRequest
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          statusFilter={serviceStatus}
          setStatusFilter={handleServiceStatus}
          dateFilter={date}
          setDateFilter={handleDate}
        />
      )}
      <div className="admin-results-info">
        <span>
          {totalCount} solicitação{totalCount !== 1 ? 'ões' : ''} encontrada
          {totalCount !== 1 ? 's' : ''}
        </span>
      </div>
      <ListRequest
        data={requests}
        loading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}