'use client';

import FilterRequest from '@/src/components/requests/filter-request';
import ListRequest from '@/src/components/requests/list-requests';
import { useGetAllServices } from '@/src/hooks/useRequest';
import { ServiceStatus } from '@/src/types/services-status';
import { ServiceRequest } from '@/src/types/service';
import { useState } from 'react';

export default function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | undefined>();
  const [date, setDate] = useState('');
  const { data, isLoading, error } = useGetAllServices(searchTerm, serviceStatus, date);

  const requests: ServiceRequest[] = Array.isArray(data) ? data : (data as { results?: ServiceRequest[] })?.results || [];

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  function handleServiceStatus(status: ServiceStatus) {
    setServiceStatus(status);
  }

  function handleDate(date: string) {
    setDate(date);
  }

  return (
    <div className="admin-content">
      <FilterRequest
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        statusFilter={serviceStatus}
        setStatusFilter={handleServiceStatus}
        dateFilter={date}
        setDateFilter={handleDate}
      />
      <ListRequest data={requests} loading={isLoading} error={error} />
    </div>
  );
}
