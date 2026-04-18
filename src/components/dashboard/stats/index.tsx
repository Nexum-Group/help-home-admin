'use client';

import { DashboardData } from '@/src/types/dashboard';
import { Skeleton } from '@/src/components/ui/skeleton';

interface IStats {
  data: DashboardData | undefined;
}

export default function Stats({ data }: IStats) {
  if (!data) {
    return (
      <div className="admin-stats">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="admin-stat">
            <Skeleton className="skeleton-stat-lg" />
            <Skeleton className="skeleton-stat-sm" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="admin-stats">
      <div className="admin-stat">
        <span className="admin-stat-value dashboard-stat-users">{data.total_clients}</span>
        <span className="admin-stat-label">Clientes</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value dashboard-stat-providers">{data.total_providers}</span>
        <span className="admin-stat-label">Prestadores</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value dashboard-stat-requests">{data.total_requests}</span>
        <span className="admin-stat-label">Solicitações</span>
      </div>
      <div className="admin-stat">
        {data.total_volume !== null ? (
          <span className="admin-stat-value dashboard-stat-volume">
            R$ {data.total_volume.toFixed(2)}
          </span>
        ) : (
          <span className="admin-stat-value">N/A</span>
        )}
        <span className="admin-stat-label">Volume (mês)</span>
      </div>
    </div>
  );
}