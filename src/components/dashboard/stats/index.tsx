import { DashboardData } from '@/src/types/dashboard';

interface IStats {
  data: DashboardData | undefined;
}
export default function Stats({ data }: IStats) {
  return (
    <div className="admin-stats">
      <div className="admin-stat">
        <span className="admin-stat-value">{data?.total_clients}</span>
        <span className="admin-stat-label">Usuários</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value">{data?.total_providers}</span>
        <span className="admin-stat-label">Prestadores</span>
      </div>
      <div className="admin-stat">
        <span className="admin-stat-value">{data?.total_requests}</span>
        <span className="admin-stat-label">Solicitações (mês)</span>
      </div>
      <div className="admin-stat">
        {data?.total_volume !== null ? (
          <span className="admin-stat-value">R$ {data?.total_volume.toFixed(2)}</span>
        ) : (
          <span className="admin-stat-value">N/A</span>
        )}
        <span className="admin-stat-label">Volume (mês)</span>
      </div>
    </div>
  );
}
