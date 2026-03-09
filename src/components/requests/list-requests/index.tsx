'use client';

import { ServiceRequest } from '@/src/types/service';
import { getStatusBadgeClass } from '@/src/utils/badge-status-class';
import { formatDate } from '@/src/utils/format-date';
import { formatStatus } from '@/src/utils/format-status';

interface IListRequest {
  data: ServiceRequest[];
  loading: boolean;
  error: Error | null;
}

export default function ListRequest({ data, loading, error }: IListRequest) {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar solicitações</p>;

  return (
    <div className="admin-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Prestador</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Status</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.client.name}</td>
              <td>{request.provider.user.name}</td>
              <td>{request.service_name}</td>
              <td>{formatDate(request.scheduled_date)}</td>
              <td>
                <span className={`admin-badge ${getStatusBadgeClass(request.status)}`}>
                  {formatStatus(request.status)}
                </span>
              </td>
              <td>R$ {request.service_price}</td>
              <td>
                <a href={`/admin/requests/${request.id}`} className="admin-btn admin-btn-ghost">
                  Ver
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
