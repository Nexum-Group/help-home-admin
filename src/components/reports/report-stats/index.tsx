'use client';

import { useCurrentConfig } from '@/src/hooks/useConfig';
import { Report } from '@/src/types/report';
import { Skeleton } from '@/src/components/ui/skeleton';

interface IReportStats {
  reports?: Report;
}

export default function ReportStats({ reports }: IReportStats) {
  const { data: configs, isLoading } = useCurrentConfig();

  if (isLoading) {
    return (
      <div className="admin-stats">
        <div className="admin-stat">
          <Skeleton className="skeleton-stat-value" />
          <Skeleton className="skeleton-stat-label" />
        </div>
        <div className="admin-stat">
          <Skeleton className="skeleton-stat-value" />
          <Skeleton className="skeleton-stat-label" />
        </div>
        <div className="admin-stat">
          <Skeleton className="skeleton-stat-value" />
          <Skeleton className="skeleton-stat-label" />
        </div>
      </div>
    );
  }

  if (!reports) return null;

  return (
    <div className="admin-stats">
      <div className="admin-stat">
        <span className="admin-stat-value report-value">R$ {reports?.total_volume_value}</span>
        <span className="admin-stat-label">Volume total (mês)</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value report-value">R$ {reports?.platform_fee_value}</span>
        <span className="admin-stat-label">Taxa plataforma ({configs?.platform_fee}%)</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value report-value">{reports?.total_services_perfomed}</span>
        <span className="admin-stat-label">Serviços realizados</span>
      </div>
    </div>
  );
}