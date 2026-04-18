'use client';

import { NewsRegistereds as NewsRegisteredsType } from '@/src/types/report';
import { Skeleton } from '@/src/components/ui/skeleton';

interface INewsRegistered {
  data: NewsRegisteredsType[];
  isLoading: boolean;
  error: Error | null;
}

export default function NewsRegistereds({ data, isLoading, error }: INewsRegistered) {
  if (isLoading) {
    return (
      <div className="admin-card">
        <h2 className="admin-card-title">Novos cadastros (por semana)</h2>
        <div className="report-skeleton-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="skeleton-row" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="admin-error">Erro ao carregar informações</p>;

  if (!data.length) {
    return (
      <div className="admin-card">
        <h2 className="admin-card-title">Novos cadastros (por semana)</h2>
        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
          Nenhum dado disponível
        </p>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Novos cadastros (por semana)</h2>
      <div className="new-registereds-grid">
        {data.map((r) => (
          <div key={r.period} className="new-registered-card">
            <span className="new-registered-period">{r.period}</span>
            <div className="new-registered-stats">
              <div className="new-registered-stat">
                <span className="new-registered-value">{r.clients_count}</span>
                <span className="new-registered-label">Clientes</span>
              </div>
              <div className="new-registered-stat">
                <span className="new-registered-value">{r.providers_count}</span>
                <span className="new-registered-label">Prestadores</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}