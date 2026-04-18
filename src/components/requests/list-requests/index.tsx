'use client';

import { ServiceRequest } from '@/src/types/service';
import { getStatusBadgeClass } from '@/src/utils/badge-status-class';
import { formatDate } from '@/src/utils/format-date';
import { formatStatus } from '@/src/utils/format-status';
import Pagination from '@/src/components/ui/pagination';
import { UsersGridSkeleton, PaginationSkeleton } from '@/src/components/ui/skeleton';

interface ListRequestProps {
  data: ServiceRequest[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ListRequest({
  data,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: ListRequestProps) {
  if (loading) {
    return (
      <div>
        <UsersGridSkeleton count={12} gridClass="requests-grid" />
        <PaginationSkeleton />
      </div>
    );
  }

  if (error) return <p className="admin-error">Erro ao carregar solicitações</p>;

  return (
    <div>
      <div className="requests-grid">
        {data.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-card-header">
              <span className={`request-card-status ${request.status}`}>
                {formatStatus(request.status)}
              </span>
              <span className="request-card-date">{formatDate(request.scheduled_date)}</span>
            </div>

            <div className="request-card-service">
              <h3 className="request-card-service-name">{request.service_name}</h3>
              <p className="request-card-price">R$ {request.service_price}</p>
            </div>

            <div className="request-card-meta">
              <div className="request-card-meta-item">
                <span className="request-card-label">Cliente</span>
                <span className="request-card-value">{request.client?.name}</span>
              </div>
              <div className="request-card-meta-item">
                <span className="request-card-label">Prestador</span>
                <span className="request-card-value">{request.provider?.user?.name || 'A definir'}</span>
              </div>
            </div>

            <a href={`/admin/requests/${request.id}/`} className="request-card-link">
              Ver detalhes
            </a>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}