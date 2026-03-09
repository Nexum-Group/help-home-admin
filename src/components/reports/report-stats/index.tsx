'use client';

import { useCurrentConfig } from '@/src/hooks/useConfig';
import { Report } from '@/src/types/report';

interface IReportStats {
  reports: Report;
}

export default function ReportStats({ reports }: IReportStats) {
  const { data: configs, isLoading, error } = useCurrentConfig();
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar informações</p>;
  return (
    <div className="admin-stats">
      <div className="admin-stat">
        <span className="admin-stat-value">R$ {reports?.total_volume_value}</span>
        <span className="admin-stat-label">Volume total (mês)</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value">R$ {reports?.platform_fee_value}</span>
        <span className="admin-stat-label">Taxa plataforma ({configs?.platform_fee}%)</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value">{reports?.total_services_perfomed}</span>
        <span className="admin-stat-label">Serviços realizados</span>
      </div>
    </div>
  );
}
