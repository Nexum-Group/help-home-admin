'use client';

import { ServiceRequest } from '@/src/types/service';
import { formatStatus } from '@/src/utils/format-status';
import { formatDate } from '@/src/utils/format-date';

interface IRecentRequest {
  data: ServiceRequest[];
}

export default function RecentRequests({ data }: IRecentRequest) {
  if (data.length === 0) {
    return (
      <p className="dashboard-empty">Nenhuma solicitação recente</p>
    );
  }

  return (
    <div className="dashboard-list">
      {data.map((request) => (
        <a key={request.id} href={`/admin/requests/${request.id}/`} className="dashboard-list-item">
          <div className="dashboard-list-item-main">
            <span className="dashboard-list-item-title">{request.service_name}</span>
            <span className="dashboard-list-item-subtitle">{request.client?.name}</span>
          </div>
          <div className="dashboard-list-item-meta">
            <span className={`dashboard-list-item-status ${request.status}`}>
              {formatStatus(request.status)}
            </span>
            <span className="dashboard-list-item-date">{formatDate(request.scheduled_date)}</span>
          </div>
        </a>
      ))}
    </div>
  );
}