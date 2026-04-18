'use client';

import { useDashboard } from '@/src/hooks/useDashboard';
import Stats from './stats';
import RecentRequests from './recents-requests';
import NewProviders from './new-providers';
import { DetailPageSkeleton } from '@/src/components/ui/skeleton';

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <DetailPageSkeleton />;
  if (error) return <div className="admin-error">Erro ao carregar dashboard</div>;

  return (
    <div className="admin-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Visão geral do sistema</p>
      </div>

      <Stats data={data} />

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Solicitações Recentes</h2>
            <a href="/admin/requests" className="dashboard-card-link">Ver todas →</a>
          </div>
          <RecentRequests data={data?.recent_requests || []} />
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Novos Prestadores</h2>
            <a href="/admin/providers" className="dashboard-card-link">Ver todos →</a>
          </div>
          <NewProviders newProviders={data?.new_providers || []} />
        </div>
      </div>
    </div>
  );
}